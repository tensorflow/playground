/* Copyright 2016 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
==============================================================================*/

/// <reference path="typings/browser.d.ts" />
/// <reference path="seedrandom.d.ts" />

import * as nn from "./nn";
import {HeatMap, reduceMatrix} from "./heatmap";
import {TimeMatrix, TimeLabel} from "./time_matrix";
import {
  State,
  datasets,
  activations,
  regularizations,
  getKeyFromValue
} from "./state";
import {Example2D, shuffle} from "./dataset";

const RECT_SIZE = 30;
const NUM_SAMPLES = 500;
const DENSITY = 100;

interface InputFeature {
  f: (x: number, y: number) => number;
  label?: string;
}

const INPUTS: {[name: string]: InputFeature} = {
  "x": {f: (x, y) => x, label: "X"},
  "y": {f: (x, y) => y, label: "Y"},
  "xSquared": {f: (x, y) => x * x, label: "X^2"},
  "ySquared": {f: (x, y) => y * y,  label: "Y^2"},
  "xTimesY": {f: (x, y) => x * y, label: "XY"},
  "sinX": {f: (x, y) => Math.sin(x), label: "sin(X)"},
  "sinY": {f: (x, y) => Math.sin(y), label: "sin(Y)"},
};

let learningRates: {[key: string]: number} = {
  "l=0.001": 0.001,
  "l=0.01": 0.01,
  "l=0.1": 0.1,
  "l=1": 1,
  "l=10": 10
};

let regularizationRates: {[key: string]: number} = {
  "r=0.001": 0.001,
  "r=0.01": 0.01,
  "r=0.1": 0.1,
  "r=1": 1,
  "r=10": 10
};

class Player {
  private timerIndex = 0;
  private isPlaying = false;
  private callback: (isPlaying: boolean) => void = null;

  /** Plays/pauses the player. */
  playOrPause() {
    if (this.isPlaying) {
      this.isPlaying = false;
      this.pause();
    } else {
      this.isPlaying = true;
      this.play();
    }
  }

  onPlayPause(callback: (isPlaying: boolean) => void) {
    this.callback = callback;
  }

  play() {
    this.pause();
    this.isPlaying = true;
    if (this.callback) {
      this.callback(this.isPlaying);
    }
    this.start(this.timerIndex);
  }

  pause() {
    this.timerIndex++;
    this.isPlaying = false;
    if (this.callback) {
      this.callback(this.isPlaying);
    }
  }

  private start(localTimerIndex: number) {
    d3.timer(() => {
      if (localTimerIndex < this.timerIndex) {
        return true;  // Done.
      }
      oneStep();
      return false;  // Not done.
    }, 0);
  }
}

let state = State.deserializeState();
let boundary: {[id: string]: number[][]} = {};
let selectedNodeId: string = null;
// Plot the heatmap.
let xDomain: [number, number] = [-6, 6];
let heatMap =
    new HeatMap(300, DENSITY, xDomain, xDomain, d3.select("#heatmap"),
        {showAxes: true});
let linkWidthScale = d3.scale.linear()
  .domain([0, 5])
  .range([1, 10])
  .clamp(true);
let colorScale = d3.scale.linear<string>()
                     .domain([-1, 0, 1])
                     .range(["#f59322", "#e8eaeb", "#0877bd"])
                     .clamp(true);
let iter = 0;
let trainData: Example2D[] = [];
let testData: Example2D[] = [];
let network: nn.Node[][] = null;
let accuracyTrain = 0;
let accuracyTest = 0;
let player = new Player();

function makeGUI() {

  d3.select("#reset-button").on("click", () => {
    // Change the seed.
    state.seed = Math.random().toFixed(5);
    Math.seedrandom(state.seed);
    reset();
    d3.select("#play-pause-button");
  });

  d3.select("#play-pause-button").on("click", function () {
    // Change the button's content.
    player.playOrPause();
  });

  player.onPlayPause(isPlaying => {
    d3.select("#play-pause-button").classed("playing", isPlaying);
  });

  d3.select("#next-step-button").on("click", () => {
    player.pause();
    oneStep();
  });

  let dataThumbnails = d3.selectAll(".data-thumbnail");
  dataThumbnails.on("click", function() {
    let newDataset = datasets[this.dataset.dataset];
    if (newDataset === state.dataset) {
      return; // No-op.
    }
    state.dataset =  newDataset;
    dataThumbnails.classed("selected", false);
    d3.select(this).classed("selected", true);
    reset();
  });

  let datasetKey = getKeyFromValue(datasets, state.dataset);
  // Select the dataset according to the current state.
  d3.select(`.data-thumbnail[data-dataset=${datasetKey}]`)
    .classed("selected", true);

  d3.select("#add-layers").on("click", () => {
    if (state.numHiddenLayers >= 6) {
      return;
    }
    state.networkShape[state.numHiddenLayers] = 2;
    state.numHiddenLayers++;
    reset();
  });

  d3.select("#remove-layers").on("click", () => {
    if (state.numHiddenLayers <= 0) {
      return;
    }
    state.numHiddenLayers--;
    state.networkShape.splice(state.numHiddenLayers);
    reset();
  });

  let showTestData = d3.select("#show-test-data").on("change", function() {
    state.showTestData = this.checked;
    state.serialize();
    heatMap.updateTestPoints(state.showTestData ? testData : []);
  });
  // Check/uncheck the checkbox according to the current state.
  showTestData.property("checked", state.showTestData);

  let discretize = d3.select("#discretize").on("change", function() {
    state.discretize = this.checked;
    state.serialize();
    updateUI();
  });
  // Check/uncheck the checbox according to the current state.
  discretize.property("checked", state.discretize);

  let percTrain = d3.select("#percTrainData").on("input", function() {
    state.percTrainData = this.value;
    d3.select("label[for='percTrainData'] .value").text(this.value);
    reset();
  });
  percTrain.property("value", state.percTrainData);
  d3.select("label[for='percTrainData'] .value").text(state.percTrainData);

  let noise = d3.select("#noise").on("input", function() {
    state.noise = this.value;
    d3.select("label[for='noise'] .value").text(this.value);
    reset();
  });
  noise.property("value", state.noise);
  d3.select("label[for='noise'] .value").text(state.noise);

  let batchSize = d3.select("#batchSize").on("input", function() {
    state.batchSize = this.value;
    d3.select("label[for='batchSize'] .value").text(this.value);
    reset();
  });
  batchSize.property("value", state.batchSize);
  d3.select("label[for='batchSize'] .value").text(state.batchSize);

  let activationDropdown = d3.select("#activations").on("change", function() {
    state.activation = activations[this.value];
    reset();
  });
  activationDropdown.property("value",
      getKeyFromValue(activations, state.activation));

  let learningRate = d3.select("#learningRate").on("change", function() {
    state.learningRate = +this.value;
    reset();
  });
  learningRate.property("value", state.learningRate);

  let regularDropdown = d3.select("#regularizations").on("change",
      function() {
    state.regularization = regularizations[this.value];
    reset();
  });
  regularDropdown.property("value",
      getKeyFromValue(regularizations, state.regularization));

  let regularRate = d3.select("#regularRate").on("change", function() {
    state.regularizationRate = +this.value;
    reset();
  });
  regularRate.property("value", state.regularizationRate);

  // Add scale to the gradient color map.
  let x = d3.scale.linear().domain([-1, 1]).range([0, 144]);
  let xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickValues([-1, 0, 1])
    .tickFormat(d3.format("d"));
  d3.select("#colormap g.core").append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0,10)")
    .call(xAxis);

  // Listen for css-responsive changes and redraw the svg network.
  // d3.select("#main-part").on("transitionend", () => {
  //   drawNetwork(network);
  //   updateUI(true);
  // });
}

function updateWeightsUI(network: nn.Node[][], container: d3.Selection<any>) {
  let values: number[] = [];
  for (let layerIdx = 1; layerIdx < network.length; layerIdx++) {
    let currentLayer = network[layerIdx];
    // Update all the nodes in this layer.
    for (let i = 0; i < currentLayer.length; i++) {
      let node = currentLayer[i];
      for (let j = 0; j < node.inputs.length; j++) {
        let input = node.inputs[j];
        values.push(-input.storedErrorDer);
        d3.select(`#link${input.source.id}-${input.dest.id}`)
            .style({
              "stroke-dashoffset": -iter / 3,
              "stroke-width": linkWidthScale(Math.abs(input.weight)),
              "stroke": colorScale(input.weight)
            })
            .datum(input);
      }
    }
  }
}

function drawNode(cx: number, cy: number, nodeId: string, isInput: boolean,
    container: d3.Selection<any>) {
  let x = cx - RECT_SIZE / 2;
  let y = cy - RECT_SIZE / 2;

  let nodeGroup = container.append("g")
    .attr({
      "class": "node",
      "id": `node${nodeId}`,
      "transform": `translate(${x},${y})`
    });

  // Draw the main rectangle.
  nodeGroup.append("rect")
    .attr({
      x: 0,
      y: 0,
      width: RECT_SIZE,
      height: RECT_SIZE,
    });
  let activeOrNotClass = state[nodeId] ? "active" : "inactive";
  if (isInput) {
    let label = INPUTS[nodeId].label != null ?
        INPUTS[nodeId].label : nodeId;
    // Draw the input label.
    let text = nodeGroup.append("text").attr({
      class: "main-label",
      x: -10,
      y: RECT_SIZE / 2, "text-anchor": "end"
    });
    let a = label.split("^");
    text.append("tspan").text(a[0]);
    if (a[1]) {
      text.append("tspan")
        .attr("baseline-shift", "super")
        .style("font-size", "9px")
        .text(a[1]);
    }
    nodeGroup.classed(activeOrNotClass, true);
  }

  // Draw the node's canvas.
  let div = d3.select("#network").insert("div", ":first-child")
    .attr({
      "id": `canvas-${nodeId}`,
      "class": "canvas"
    })
    .style({
      position: "absolute",
      left: `${x + 3}px`,
      top: `${y + 3}px`
    })
    .on("mouseenter", function() {
      selectedNodeId = nodeId;
      div.classed("hovered", true);
      nodeGroup.classed("hovered", true);
      updateDecisionBoundary(network, false);
      heatMap.updateBackground(boundary[nodeId], state.discretize);
    })
    .on("mouseleave", function() {
      selectedNodeId = null;
      div.classed("hovered", false);
      nodeGroup.classed("hovered", false);
      updateDecisionBoundary(network, false);
      heatMap.updateBackground(boundary[nn.getOutputNode(network).id],
          state.discretize);
    });
  if (isInput) {
    div.on("click", function() {
      state[nodeId] = !state[nodeId];
      reset();
    });
    div.style("cursor", "pointer");
  }
  if (isInput) {
    div.classed(activeOrNotClass, true);
  }
  let nodeHeatMap = new HeatMap(RECT_SIZE, DENSITY / 10, xDomain,
      xDomain, div, {noSvg: true});
  div.datum({heatmap: nodeHeatMap, id: nodeId});

}

// Draw network
function drawNetwork(network: nn.Node[][]): void {
  var nodeWidth = 34;
  var leftPadding = 120;
  var height = 400;
  var width;

  var layerData = network.map(function(layer: any, i) {
    layer.index = i;
    layer.key = i === (network.length - 1) ? "l:o" : "l:" + i;
    return layer;
  }).slice(0, -1);
  console.log(layerData);

  var html = d3.select("#network");

  // Get the width of the svg container.
  var padding = 3;
  var co = <HTMLDivElement> d3.select(".column.output").node();
  var cf = <HTMLDivElement> d3.select(".column.features").node();
  width = co.offsetLeft - cf.offsetLeft;
  html.style("width", width + "px");

  var layerXScale = d3.scale.linear()
      .domain([0, layerData.length])
      .range([leftPadding, width]);

  var neuronYScale = d3.scale.linear()
      .domain([0, 7])
      .range([nodeWidth / 2, height]);

  const duration = 300;

  var stage = html;
  var bracket = d3.select(".hidden-layers .bracket");

  //
  // layers
  //
  var layer = html.selectAll(".layer.active").data(layerData, (d: any) => d.key);

  var layerEnter = layer.enter().append("div")
      .attr("class", "layer active")
      .style("position", "absolute")
      .style("opacity", 0)
      .style("top", "0")
      .style("left", function(d, i) { return layerXScale(i) + "px"; });
  var layerHasEntered = !layerEnter[0].every((d) => d === null);

  layerEnter.transition("enter").duration(duration).delay(duration)
      .style("opacity", 1)
      .style("top", "0px")
      .style("left", function(d, i) { return layerXScale(i) + "px"; });

  var layerExit = layer.exit()
      .classed("active", false);
  var layerHasExited = false;
  layerExit[0].forEach(function(d) { layerHasExited = true; });

  layerExit.transition("exit").duration(duration)
      .style("opacity", 0).remove();

  var layerUpdate = layer;
  layerUpdate.transition("update").duration(duration).delay(() => layerHasExited ? duration : 0)
      .style("left", function(d, i) { return layerXScale(i) + "px"; });

  console.log(layerHasExited, "exit");
  console.log(layerHasEntered, "enter");

  // Plus Minus Neurons
  var plusMinusNeuronsEnter = layerEnter.append("div")
    .attr("class", "plus-minus-neurons")
    .style("display", (d, i) => (i === 0 || d.key === "output") ? "none" : "block" );

  plusMinusNeuronsEnter.append("button")
      .attr("class", "mdl-button mdl-js-button mdl-button--icon")
      .on("click", addNeuron)
    .append("i")
      .attr("class", "material-icons")
      .text("add");

  plusMinusNeuronsEnter.append("button")
      .attr("class", "mdl-button mdl-js-button mdl-button--icon")
      .on("click", removeNeuron)
    .append("i")
      .attr("class", "material-icons")
      .text("remove");

  plusMinusNeuronsEnter.append("div")
      .attr("class", "num-neurons-label");

  var plusMinusNeuronsUpdate = layerUpdate.select(".num-neurons-label")
      .text(function(d: any) {
        let suffix = d.length > 1 ? "s" : "";
        return d.length + " neuron" + suffix;
      });

  bracket
    .transition().duration(duration).delay(() => layerHasExited ? duration : 0)
      .style("opacity", () => layerData.length > 2 ? 1 : 0)
      .style("width", (d) => layerXScale(layerData.length - 1) - layerXScale(1) + 60 + "px" )

  //
  // nodes
  //

  var nodeData = [];
  network.forEach(function(layer: any, i) {
    layer.forEach(function(node: any, j) {
      node.key = layer.key + ",n:" + j;
      node.layerIndex = layer.index;
      node.index = j;
      nodeData.push(node);
    });
  });

  var node = html.selectAll(".node.active").data((d) => nodeData, (d: any) => d.key);
  var nodeEnter = node.enter().append("div")
      .style("top", (d) => neuronYScale(d.index) + "px")
      .style("left", (d) => layerXScale(d.layerIndex) + "px")
      .style("display", (d) => d.key.indexOf("l:o") === 0 ? "none" : "")
      .style("opacity", 0)
      .attr("class", "node canvas active")
      .attr("id", (d) => "canvas-" + d.id)
      .style("width", "0px")
      .style("height", "0px")
      .each(function(d: any) {
        d.heatmap = new HeatMap(RECT_SIZE, DENSITY / 10, xDomain,
          xDomain, d3.select(this), {noSvg: true});
      });

  nodeEnter.transition().duration(duration).delay(() => layerHasEntered ? duration : 0)//.ease("cubic-out")
      .style("width", nodeWidth + "px")
      .style("height", nodeWidth + "px")
      .style("opacity", 1);

  var nodeExit = node.exit()
      .classed("active", false)
    .transition().duration(duration)//.ease("quad-in")
      .style("opacity", 0)
      .style("width", "0px")
      .style("height", "0px")
      .remove();

  node.transition("position").duration(duration).delay(() => layerHasExited ? duration : 0)
      .style("top", (d) => neuronYScale(d.index) + "px")
      .style("left", (d) => layerXScale(d.layerIndex) + "px");

  var nodeUpdate = node;

  //
  // Links
  //
  var linkData = [];
  nodeData.forEach(function(node, i) {
    node.outputs.forEach(function(link: any, k) {
      link.key = link.source.key + "->" + link.dest.key;
      linkData.push(link);
    });
  });

  var columnWidth = layerXScale(1) - layerXScale(0);

  var originDiagonal = d3.svg.diagonal()
      .source(function(d: any) { return { y: (layerXScale(d.dest.layerIndex) + layerXScale(d.dest.layerIndex)) / 2, x: (neuronYScale(d.dest.index) + neuronYScale(d.dest.index)) / 2 }; })
      .target(function(d: any) { return { y: (layerXScale(d.dest.layerIndex) + layerXScale(d.dest.layerIndex)) / 2, x: (neuronYScale(d.dest.index) + neuronYScale(d.dest.index)) / 2}; })
      .projection(function(d) { return [d.y, d.x]; });

  var diagonal = d3.svg.diagonal()
      .source(function(d: any) { return { y: layerXScale(d.source.layerIndex), x: neuronYScale(d.source.index)}; })
      .target(function(d: any) { return { y: layerXScale(d.dest.layerIndex), x: neuronYScale(d.dest.index)}; })
      .projection(function(d) { return [d.y, d.x]; });

  var svg = d3.select("#network-svg");
  var link = svg.selectAll(".link").data((d) => linkData, function(d: any) { return d.key; });
  var linkEnter = link.enter().append("path")
      .attr("class", "link")
      .attr("d", (layerHasExited ? originDiagonal : diagonal))
      .attr("id", (d) => "link" + d.source.id + "-" + d.dest.id)
      .style("opacity", 0)

  linkEnter.transition("enter").duration(duration).delay(() => layerHasEntered || layerHasExited ? duration : 0)
      .attr("d", diagonal)
      .style("opacity", 1);

  link.exit().transition().duration(duration)
      .style("opacity", 0)
      // .attr("d", originDiagonal)
      .remove();

  link.transition("update").duration(duration).delay(() => layerHasExited ? duration : 0)
      .attr("d", diagonal);

  // Hiding for now
  let calloutThumb = d3.select(".callout.thumbnail").style("display", "none");
  let calloutWeights = d3.select(".callout.weights").style("display", "none");

  // Utils
  function addNeuron(d, i) {
    let numNeurons = state.networkShape[i - 1];
    if (numNeurons >= 8) {
      return;
    }
    state.networkShape[i - 1]++;
    reset();
  }

  function removeNeuron(d, i) {
    let numNeurons = state.networkShape[i - 1];
    if (numNeurons <= 1) {
      return;
    }
    state.networkShape[i - 1]--;
    reset();
  }

  // var link = nodeUpdate.selectAll(".link")
  //     .data((d: any) => d.outputs, (d: any) => d.id );
  // var linkEnter = link.enter().append("g").attr("class", "link");
  // link.exit().transition().duration(duration).style("opacity", 0).remove();
  // var linkUpdate = link;
  //
  // linkEnter.append("line")
  //     .attr("x1", 0)
  //     .attr("x2", 50)
  //     .attr("y1", 0)
  //     .attr("y2", 0)

  // Map of all node coordinates.
  // let node2coord: {[id: string]: {cx: number, cy: number}} = {};
  // let container = svg.append("g")
  //   .classed("core", true)
  //   .attr("transform", `translate(${padding},${padding})`);
  // // Draw the network layer by layer.
  // let numLayers = network.length;
  // let featureWidth = 118;
  // let layerScale = d3.scale.ordinal<number, number>()
  //     .domain(d3.range(1, numLayers - 1))
  //     .rangePoints([featureWidth, width - RECT_SIZE], 0.7);
  // let nodeIndexScale = (nodeIndex: number) => nodeIndex * (RECT_SIZE + 25);
  //
  //

  // let idWithCallout = null;
  // let targetIdWithCallout = null;
  //
  // // Draw the input layer separately.
  // let cx = RECT_SIZE / 2 + 50;
  // let nodeIds = Object.keys(INPUTS);
  // let maxY = nodeIndexScale(nodeIds.length);
  // nodeIds.forEach((nodeId, i) => {
  //   let cy = nodeIndexScale(i) + RECT_SIZE / 2;
  //   node2coord[nodeId] = {cx: cx, cy: cy};
  //   drawNode(cx, cy, nodeId, true, container);
  // });
  //
  // // Draw the intermediate layers.
  // for (let layerIdx = 1; layerIdx < numLayers - 1; layerIdx++) {
  //   let numNodes = network[layerIdx].length;
  //   let cx = layerScale(layerIdx) + RECT_SIZE / 2;
  //   maxY = Math.max(maxY, nodeIndexScale(numNodes));
  //   addPlusMinusControl(layerScale(layerIdx), layerIdx);
  //   for (let i = 0; i < numNodes; i++) {
  //     let node = network[layerIdx][i];
  //     let cy = nodeIndexScale(i) + RECT_SIZE / 2;
  //     node2coord[node.id] = {cx: cx, cy: cy};
  //     drawNode(cx, cy, node.id, false, container);
  //
  //     // Show callout to thumbnails.
  //     let numNodes = network[layerIdx].length;
  //     let nextNumNodes = network[layerIdx + 1].length;
  //     if (idWithCallout == null &&
  //         i === numNodes - 1 &&
  //         nextNumNodes <= numNodes) {
  //       calloutThumb.style({
  //         display: null,
  //         top: `${20 + 3 + cy}px`,
  //         left: `${cx}px`
  //       });
  //       idWithCallout = node.id;
  //     }
  //
  //     // Draw links.
  //     for (let j = 0; j < node.inputs.length; j++) {
  //       let input = node.inputs[j];
  //       let path: SVGPathElement = <any> drawLink(input, node2coord, network,
  //           container, j === 0, j, node.inputs.length).node();
  //       // Show callout to weights.
  //       let prevLayer = network[layerIdx - 1];
  //       let lastNodePrevLayer = prevLayer[prevLayer.length - 1];
  //       if (targetIdWithCallout == null &&
  //           i === numNodes - 1 &&
  //           input.source.id === lastNodePrevLayer.id &&
  //           (input.source.id !== idWithCallout || numLayers <= 5) &&
  //           input.dest.id !== idWithCallout &&
  //           prevLayer.length >= numNodes) {
  //         let midPoint = path.getPointAtLength(path.getTotalLength() * 0.7);
  //         calloutWeights.style({
  //           display: null,
  //           top: `${midPoint.y + 5}px`,
  //           left: `${midPoint.x + 3}px`
  //         });
  //         targetIdWithCallout = input.dest.id;
  //       }
  //     }
  //   }
  // }
  //
  // // Draw the output node separately.
  // cx = width + RECT_SIZE / 2;
  // let node = network[numLayers - 1][0];
  // let cy = nodeIndexScale(0) + RECT_SIZE / 2;
  // node2coord[node.id] = {cx: cx, cy: cy};
  // // Draw links.
  // for (let i = 0; i < node.inputs.length; i++) {
  //   let input = node.inputs[i];
  //   drawLink(input, node2coord, network, container, i === 0, i,
  //       node.inputs.length);
  // }
  // // Adjust the height of the svg.
  // svg.attr("height", maxY);
  //
  // // Adjust the height of the features column.
  // let height = Math.max(
  //   getRelativeHeight(calloutThumb),
  //   getRelativeHeight(calloutWeights),
  //   getRelativeHeight(d3.select("#network"))
  // );
  // d3.select(".column.features").style("height", height + "px");
}

function getRelativeHeight(selection: d3.Selection<any>) {
  let node = <HTMLAnchorElement> selection.node();
  return node.offsetHeight + node.offsetTop;
}

// function addPlusMinusControl(x: number, layerIdx: number) {
//   let div = d3.select("#network").append("div")
//     .classed("plus-minus-neurons", true)
//     .style("left", `${x - 10}px`);
//
//   let i = layerIdx - 1;
//   let firstRow = div.append("div");
//   firstRow.append("button")
//       .attr("class", "mdl-button mdl-js-button mdl-button--icon")
//       .on("click", () => {
//         let numNeurons = state.networkShape[i];
//         if (numNeurons >= 8) {
//           return;
//         }
//         state.networkShape[i]++;
//         reset();
//       })
//     .append("i")
//       .attr("class", "material-icons")
//       .text("add");
//
//   firstRow.append("button")
//       .attr("class", "mdl-button mdl-js-button mdl-button--icon")
//       .on("click", () => {
//         let numNeurons = state.networkShape[i];
//         if (numNeurons <= 1) {
//           return;
//         }
//         state.networkShape[i]--;
//         reset();
//       })
//     .append("i")
//       .attr("class", "material-icons")
//       .text("remove");
//
//   let suffix = state.networkShape[i] > 1 ? "s" : "";
//   div.append("div").text(
//     state.networkShape[i] + " neuron" + suffix
//   );
// }

// function drawLink(
  //   input: nn.Link, node2coord: {[id: string]: {cx: number, cy: number}},
  //   network: nn.Node[][], container: d3.Selection<any>,
  //   isFirst: boolean, index: number, length: number) {
  // let line = container.append("path");
  // let source = node2coord[input.source.id];
  // let dest = node2coord[input.dest.id];
  // let datum = {
  //   source: {y: source.cx + RECT_SIZE / 2 + 2, x: source.cy },
  //   target: {y: dest.cx - RECT_SIZE / 2, x: dest.cy + ((index - (length - 1) / 2) / length) * 12 }
  // };
  // let diagonal = d3.svg.diagonal().projection(d => [d.y, d.x]);
  // line.attr({
  //   "marker-start": "url(#markerArrow)",
  //   class: "link",
  //   id: "link" + input.source.id + "-" + input.dest.id,
  //   d: diagonal(datum, 0)
  // });
  // return line;
// }

/**
 * Given a neural network, it asks the network for the output (prediction)
 * of every node in the network using inputs sampled on a square grid.
 * It returns a map where each key is the node ID and the value is a square
 * matrix of the outputs of the network for each input in the grid respectively.
 */
function updateDecisionBoundary(network: nn.Node[][], firstTime: boolean) {
  if (firstTime) {
    boundary = {};
    nn.forEachNode(network, true, node => {
      boundary[node.id] = new Array(DENSITY);
    });
    // Go through all predefined inputs.
    for (let nodeId in INPUTS) {
      boundary[nodeId] = new Array(DENSITY);
    }
  }
  let xScale = d3.scale.linear().domain([0, DENSITY - 1]).range(xDomain);
  let yScale = d3.scale.linear().domain([DENSITY - 1, 0]).range(xDomain);

  let i = 0, j = 0;
  for (i = 0; i < DENSITY; i++) {
    if (firstTime) {
      nn.forEachNode(network, true, node => {
        boundary[node.id][i] = new Array(DENSITY);
      });
      // Go through all predefined inputs.
      for (let nodeId in INPUTS) {
        boundary[nodeId][i] = new Array(DENSITY);
      }
    }
    for (j = 0; j < DENSITY; j++) {
      // 1 for points inside the circle, and 0 for points outside the circle.
      let x = xScale(i);
      let y = yScale(j);
      let input = constructInput(x, y);
      nn.forwardProp(network, input);
      nn.forEachNode(network, true, node => {
        boundary[node.id][i][j] = node.output;
      });
      if (firstTime) {
        // Go through all predefined inputs.
        for (let nodeId in INPUTS) {
          boundary[nodeId][i][j] = INPUTS[nodeId].f(x, y);
        }
      }
    }
  }
}

function getAccuracy(network: nn.Node[][], dataPoints: Example2D[]): number {
  let numCorrect = 0;
  for (let i = 0; i < dataPoints.length; i++) {
    let dataPoint = dataPoints[i];
    let input = constructInput(dataPoint.x, dataPoint.y);
    let output = nn.forwardProp(network, input);
    output = output >= 0 ? 1 : -1;
    if (output === dataPoint.label) {
      numCorrect++;
    }
  }
  return numCorrect / dataPoints.length;
}

function updateUI(firstStep = false) {
  // Update the links visually.
  // updateWeightsUI(network, d3.select("g.core"));
  // Get the decision boundary of the network.
  updateDecisionBoundary(network, firstStep);
  let selectedId = selectedNodeId != null ?
      selectedNodeId : nn.getOutputNode(network).id;
  heatMap.updateBackground(boundary[selectedId], state.discretize);

  // Update all decision boundaries.
  d3.select("#network").selectAll("div.canvas")
      .each(function(data: {heatmap: HeatMap, id: string}) {
        //TODO shan remove
        if(data.heatmap && boundary[data.id]) {
    data.heatmap.updateBackground(reduceMatrix(boundary[data.id], 10),
        state.discretize);
      }
  });

  function zeroPad(n: number): string {
    let pad = "000000";
    return (pad + n).slice(-pad.length);
  }

  function addCommas(s: string): string {
    return s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function toPercentage(n: number): string {
    return (n * 100).toFixed(1) + "%";
  }

  // Update accuracy and iteration number.
  d3.select("#accuracy-train").text(toPercentage(accuracyTrain));
  d3.select("#accuracy-test").text(toPercentage(accuracyTest));
  d3.select("#iter-number").text(addCommas(zeroPad(iter)));
}

function constructInputIds(): string[] {
  let result: string[] = [];
  for (let inputName in INPUTS) {
    if (state[inputName]) {
      result.push(inputName);
    }
  }
  return result;
}

function constructInput(x: number, y: number): number[] {
  let input: number[] = [];
  for (let inputName in INPUTS) {
    if (state[inputName]) {
      input.push(INPUTS[inputName].f(x, y));
    }
  }
  return input;
}

function oneStep(): void {
  iter++;
  trainData.forEach((point, i) => {
    let input = constructInput(point.x, point.y);
    nn.forwardProp(network, input);
    nn.backProp(network, point.label, nn.Errors.SQUARE);
    if ((i + 1) % state.batchSize === 0) {
      nn.updateWeights(network, state.learningRate, state.regularizationRate);
    }
  });
  // Compute the accuracy.
  accuracyTrain = getAccuracy(network, trainData);
  accuracyTest = getAccuracy(network, testData);
  updateUI();
  nn.resetStoredErrorDer(network);
}

export function getOutputWeights(network: nn.Node[][]): number[] {
  let weights: number[] = [];
  for (let layerIdx = 0; layerIdx < network.length - 1; layerIdx++) {
    let currentLayer = network[layerIdx];
    for (let i = 0; i < currentLayer.length; i++) {
      let node = currentLayer[i];
      for (let j = 0; j < node.outputs.length; j++) {
        let output = node.outputs[j];
        weights.push(output.weight);
      }
    }
  }
  return weights;
}

export function getOutputLabels(network: nn.Node[][]): TimeLabel[] {
  let labels: TimeLabel[] = [];
  for (let layerIdx = 0; layerIdx < network.length - 1; layerIdx++) {
    let currentLayer = network[layerIdx];
    for (let i = 0; i < currentLayer.length; i++) {
      let node = currentLayer[i];
      let label: TimeLabel = {
        mainLabel: node.id,
        subLabels: []
      };
      for (let j = 0; j < node.outputs.length; j++) {
        let output = node.outputs[j];
        label.subLabels.push(output.dest.id);
      }
      labels.push(label);
    }
  }
  return labels;
}

function reset() {
  state.serialize();
  player.pause();

  let suffix = state.numHiddenLayers !== 1 ? "s" : "";
  d3.select("#layers-label").text("Hidden layer" + suffix);
  d3.select("#num-layers").text(state.numHiddenLayers);

  // Make a simple network.
  iter = 0;
  let numInputs = constructInput(0 , 0).length;
  let shape = [numInputs].concat(state.networkShape).concat([1]);
  let data = state.dataset(NUM_SAMPLES, state.noise / 100);
  // Shuffle the data in-place.
  shuffle(data);
  // Split into train and test data.
  let splitIndex = Math.floor(NUM_SAMPLES * state.percTrainData / 100);
  trainData = data.slice(0, splitIndex);
  testData = data.slice(splitIndex);
  heatMap.updatePoints(trainData);
  heatMap.updateTestPoints(state.showTestData ? testData : []);

  network = nn.buildNetwork(shape, state.activation, nn.Activations.TANH,
      state.regularization, constructInputIds());

  accuracyTrain = getAccuracy(network, trainData);
  accuracyTest = getAccuracy(network, testData);

  drawNetwork(network);
  updateUI(true);
};

function initTutorial() {
  let tutorial = d3.select("#tutorial");
  tutorial.style("width", document.body.clientWidth - 385 + "px");
  // Replace tutorial text.
  if (state.tutorial != null) {
    d3.html(`tutorials/${state.tutorial}.html`, (err, htmlFragment) => {
      if (err) {
        throw err;
      }
      (<any>tutorial.node()).appendChild(htmlFragment);
    });
  }
}

function drawDatasetThumbnails() {
  for (var dataset in datasets) {
    let canvas:any = document.querySelector("canvas[data-dataset=" + dataset + "]");
    let w = 100;
    let h = 100;
    canvas.setAttribute("width", w)
    canvas.setAttribute("height", h)
    var context = canvas.getContext("2d");
    let data = datasets[dataset](200, 0);
    data.forEach(function(d) {
      context.fillStyle = colorScale(d.label);
      context.fillRect(w * (d.x + 6) / 12, h * (d.y + 6) / 12, 4, 4);
    });
  }
}

drawDatasetThumbnails();
initTutorial();
makeGUI();
reset();
