"use strict";
var nn = require("./nn");
var heatmap_1 = require("./heatmap");
var time_matrix_1 = require("./time_matrix");
var state_1 = require("./state");
var dataset_1 = require("./dataset");
var RECT_SIZE = 30;
var NUM_SAMPLES = 500;
var DENSITY = 100;
var HUMAN_NUM = ["no", "one", "two", "three", "four", "five", "six",
    "seven", "eight", "nine", "ten"];
var INPUTS = {
    "x": { f: function (x, y) { return x; }, label: "X" },
    "y": { f: function (x, y) { return y; }, label: "Y" },
    "xSquared": { f: function (x, y) { return x * x; }, label: "X^2" },
    "ySquared": { f: function (x, y) { return y * y; }, label: "Y^2" },
    "xTimesY": { f: function (x, y) { return x * y; }, label: "XY" },
    "sinX": { f: function (x, y) { return Math.sin(x); }, label: "sin(X)" },
    "sinY": { f: function (x, y) { return Math.sin(y); }, label: "sin(Y)" },
};
var learningRates = {
    "l=0.001": 0.001,
    "l=0.01": 0.01,
    "l=0.1": 0.1,
    "l=1": 1,
    "l=10": 10
};
var regularizationRates = {
    "r=0.001": 0.001,
    "r=0.01": 0.01,
    "r=0.1": 0.1,
    "r=1": 1,
    "r=10": 10
};
var Player = (function () {
    function Player() {
        this.timerIndex = 0;
        this.isPlaying = false;
        this.callback = null;
    }
    Player.prototype.playOrPause = function () {
        if (this.isPlaying) {
            this.isPlaying = false;
            this.pause();
        }
        else {
            this.isPlaying = true;
            this.play();
        }
    };
    Player.prototype.onPlayPause = function (callback) {
        this.callback = callback;
    };
    Player.prototype.play = function () {
        this.pause();
        this.isPlaying = true;
        if (this.callback) {
            this.callback(this.isPlaying);
        }
        this.start(this.timerIndex);
    };
    Player.prototype.pause = function () {
        this.timerIndex++;
        this.isPlaying = false;
        if (this.callback) {
            this.callback(this.isPlaying);
        }
    };
    Player.prototype.start = function (localTimerIndex) {
        var _this = this;
        d3.timer(function () {
            if (localTimerIndex < _this.timerIndex) {
                return true;
            }
            oneStep();
            return false;
        }, 0);
    };
    return Player;
}());
var state = state_1.State.deserializeState();
var boundary = {};
var selectedNodeId = null;
var xDomain = [-1, 1];
var heatMap = new heatmap_1.HeatMap(300, DENSITY, xDomain, xDomain, d3.select("#heatmap"));
var linkWidthScale = d3.scale.linear()
    .domain([0, 5])
    .range([1, 10])
    .clamp(true);
var colorScale = d3.scale.linear()
    .domain([-1, 0, 1])
    .range(["#f59322", "#e8eaeb", "#0877bd"])
    .clamp(true);
var iter = 0;
var trainData = [];
var testData = [];
var network = null;
var timeMatrix = null;
var accuracyTrain = 0;
var accuracyTest = 0;
var player = new Player();
function makeGUI() {
    d3.select("#reset-button").on("click", function () {
        state.seed = Math.random().toFixed(5);
        Math.seedrandom(state.seed);
        reset();
        d3.select("#play-pause-button");
    });
    d3.select("#play-pause-button").on("click", function () {
        player.playOrPause();
    });
    player.onPlayPause(function (isPlaying) {
        d3.select("#play-pause-button").classed("playing", isPlaying);
    });
    d3.select("#next-step-button").on("click", function () {
        player.pause();
        oneStep();
    });
    var dataThumbnails = d3.selectAll(".data-thumbnail");
    dataThumbnails.on("click", function () {
        var newDataset = state_1.datasets[this.dataset.dataset];
        if (newDataset === state.dataset) {
            return;
        }
        state.dataset = newDataset;
        dataThumbnails.classed("selected", false);
        d3.select(this).classed("selected", true);
        reset();
    });
    var datasetKey = state_1.getKeyFromValue(state_1.datasets, state.dataset);
    d3.select(".data-thumbnail[data-dataset=" + datasetKey + "]")
        .classed("selected", true);
    d3.select("#add-layers").on("click", function () {
        if (state.numHiddenLayers >= 6) {
            return;
        }
        state.networkShape[state.numHiddenLayers] = 2;
        state.numHiddenLayers++;
        reset();
    });
    d3.select("#remove-layers").on("click", function () {
        if (state.numHiddenLayers <= 0) {
            return;
        }
        state.numHiddenLayers--;
        state.networkShape.splice(state.numHiddenLayers);
        reset();
    });
    var showTestData = d3.select("#show-test-data").on("change", function () {
        state.showTestData = this.checked;
        state.serialize();
        heatMap.updateTestPoints(state.showTestData ? testData : []);
    });
    showTestData.property("checked", state.showTestData);
    var discretize = d3.select("#discretize").on("change", function () {
        state.discretize = this.checked;
        state.serialize();
        updateUI();
    });
    discretize.property("checked", state.discretize);
    var percTrain = d3.select("#percTrainData").on("change", function () {
        state.percTrainData = this.value;
        reset();
    });
    percTrain.property("value", state.percTrainData);
    var noise = d3.select("#noise").on("change", function () {
        state.noise = this.value;
        reset();
    });
    noise.property("value", state.noise);
    var batchSize = d3.select("#batchSize").on("change", function () {
        state.batchSize = this.value;
        reset();
    });
    batchSize.property("value", state.batchSize);
    var activationDropdown = d3.select("#activations").on("change", function () {
        state.activation = state_1.activations[this.value];
        reset();
    });
    activationDropdown.property("value", state_1.getKeyFromValue(state_1.activations, state.activation));
    var learningRate = d3.select("#learningRate").on("change", function () {
        state.learningRate = +this.value;
        reset();
    });
    learningRate.property("value", state.learningRate);
    var regularDropdown = d3.select("#regularizations").on("change", function () {
        state.regularization = state_1.regularizations[this.value];
        reset();
    });
    regularDropdown.property("value", state_1.getKeyFromValue(state_1.regularizations, state.regularization));
    var regularRate = d3.select("#regularRate").on("change", function () {
        state.regularizationRate = +this.value;
        reset();
    });
    regularRate.property("value", state.regularizationRate);
}
function updateWeightsUI(network, container) {
    var values = [];
    for (var layerIdx = 1; layerIdx < network.length; layerIdx++) {
        var currentLayer = network[layerIdx];
        for (var i = 0; i < currentLayer.length; i++) {
            var node = currentLayer[i];
            for (var j = 0; j < node.inputs.length; j++) {
                var input = node.inputs[j];
                values.push(-input.storedErrorDer);
                container.select("#link" + input.source.id + "-" + input.dest.id)
                    .style({
                    "stroke-width": linkWidthScale(Math.abs(input.weight)),
                    "stroke": colorScale(input.weight)
                })
                    .datum(input);
            }
        }
    }
    if (state.collectStats && iter > 0) {
        timeMatrix.addColumn(values);
    }
}
function drawNode(cx, cy, nodeId, isInput, container) {
    var x = cx - RECT_SIZE / 2;
    var y = cy - RECT_SIZE / 2;
    var nodeGroup = container.append("g")
        .attr({
        "class": "node",
        "id": "node" + nodeId,
        "transform": "translate(" + x + "," + y + ")"
    });
    nodeGroup.append("rect")
        .attr({
        x: 0,
        y: 0,
        width: RECT_SIZE,
        height: RECT_SIZE,
    });
    var activeOrNotClass = state[nodeId] ? "active" : "inactive";
    if (isInput) {
        var label = INPUTS[nodeId].label != null ?
            INPUTS[nodeId].label : nodeId;
        var text = nodeGroup.append("text").attr({
            class: "main-label",
            x: -10,
            y: RECT_SIZE / 2, "text-anchor": "end"
        });
        var a = label.split("^");
        text.append("tspan").text(a[0]);
        if (a[1]) {
            text.append("tspan")
                .attr("baseline-shift", "super")
                .style("font-size", "9px")
                .text(a[1]);
        }
        nodeGroup.classed(activeOrNotClass, true);
    }
    var div = d3.select("#network").insert("div", ":first-child")
        .attr({
        "id": "canvas-" + nodeId,
        "class": "canvas"
    })
        .style({
        position: "absolute",
        left: (x + 3) + "px",
        top: (y + 3) + "px"
    })
        .on("mouseenter", function () {
        selectedNodeId = nodeId;
        d3.select("#node-output").text("node " + nodeId);
        div.classed("hovered", true);
        nodeGroup.classed("hovered", true);
        updateDecisionBoundary(network, false);
        heatMap.updateBackground(boundary[nodeId], state.discretize);
    })
        .on("mouseleave", function () {
        selectedNodeId = null;
        d3.select("#node-output").text("the network");
        div.classed("hovered", false);
        nodeGroup.classed("hovered", false);
        updateDecisionBoundary(network, false);
        heatMap.updateBackground(boundary[nn.getOutputNode(network).id], state.discretize);
    });
    if (isInput) {
        div.on("click", function () {
            state[nodeId] = !state[nodeId];
            reset();
        });
        div.style("cursor", "pointer");
    }
    if (isInput) {
        div.classed(activeOrNotClass, true);
    }
    var nodeHeatMap = new heatmap_1.HeatMap(RECT_SIZE, DENSITY / 10, xDomain, xDomain, div, { noSvg: true });
    div.datum({ heatmap: nodeHeatMap, id: nodeId });
}
function drawNetwork(network) {
    var svg = d3.select("#svg");
    svg.select("g.core").remove();
    d3.select("#network").selectAll("div").remove();
    var boundingRect = svg.node().getBoundingClientRect();
    var padding = 3;
    var width = boundingRect.width - padding;
    var node2coord = {};
    var container = svg.append("g")
        .classed("core", true)
        .attr("transform", "translate(" + padding + "," + padding + ")");
    var numLayers = network.length;
    var featureWidth = 118;
    var layerScale = d3.scale.ordinal()
        .domain(d3.range(1, numLayers - 1))
        .rangePoints([featureWidth, width - RECT_SIZE], 0.7);
    var nodeIndexScale = function (nodeIndex) { return nodeIndex * (RECT_SIZE + 25); };
    var cx = RECT_SIZE / 2 + 50;
    var nodeIds = Object.keys(INPUTS);
    var maxY = nodeIndexScale(nodeIds.length);
    nodeIds.forEach(function (nodeId, i) {
        var cy = nodeIndexScale(i) + RECT_SIZE / 2;
        node2coord[nodeId] = { cx: cx, cy: cy };
        drawNode(cx, cy, nodeId, true, container);
    });
    for (var layerIdx_1 = 1; layerIdx_1 < numLayers - 1; layerIdx_1++) {
        var numNodes = network[layerIdx_1].length;
        var cx_1 = layerScale(layerIdx_1) + RECT_SIZE / 2;
        maxY = Math.max(maxY, nodeIndexScale(numNodes));
        addPlusMinusControl(layerScale(layerIdx_1), layerIdx_1);
        for (var i = 0; i < numNodes; i++) {
            var node_1 = network[layerIdx_1][i];
            var cy_1 = nodeIndexScale(i) + RECT_SIZE / 2;
            node2coord[node_1.id] = { cx: cx_1, cy: cy_1 };
            drawNode(cx_1, cy_1, node_1.id, false, container);
            for (var i_1 = 0; i_1 < node_1.inputs.length; i_1++) {
                var input = node_1.inputs[i_1];
                drawLink(input, node2coord, network, container, i_1 === 0);
            }
        }
    }
    var layerIdx = numLayers - 1;
    cx = width + RECT_SIZE / 2;
    var node = network[layerIdx][0];
    var cy = nodeIndexScale(0) + RECT_SIZE / 2;
    node2coord[node.id] = { cx: cx, cy: cy };
    for (var i = 0; i < node.inputs.length; i++) {
        var input = node.inputs[i];
        drawLink(input, node2coord, network, container, i === 0);
    }
    svg.attr("height", maxY);
}
function addPlusMinusControl(x, layerIdx) {
    var div = d3.select("#network").append("div")
        .classed("plus-minus-neurons", true)
        .style("left", (x - 10) + "px");
    var i = layerIdx - 1;
    var firstRow = div.append("div").style("display", "flex");
    firstRow.append("button")
        .classed("button", true)
        .on("click", function () {
        var numNeurons = state.networkShape[i];
        if (numNeurons >= 8) {
            return;
        }
        state.networkShape[i]++;
        reset();
    })
        .append("i")
        .attr("class", "material-icons")
        .text("add");
    firstRow.append("button")
        .classed("button", true)
        .on("click", function () {
        var numNeurons = state.networkShape[i];
        if (numNeurons <= 1) {
            return;
        }
        state.networkShape[i]--;
        reset();
    })
        .append("i")
        .attr("class", "material-icons")
        .text("remove");
    var suffix = state.networkShape[i] > 1 ? "s" : "";
    div.append("div").text(state.networkShape[i] + " neuron" + suffix);
}
function drawLink(input, node2coord, network, container, isFirst) {
    var line = container.append("path");
    var source = node2coord[input.source.id];
    var dest = node2coord[input.dest.id];
    var datum = {
        source: { y: source.cx + RECT_SIZE / 2, x: source.cy },
        target: { y: dest.cx - RECT_SIZE / 2 - 10, x: dest.cy }
    };
    var diagonal = d3.svg.diagonal().projection(function (d) { return [d.y, d.x]; });
    line.attr({
        "marker-end": "url(#markerArrow)",
        class: "link",
        id: "link" + input.source.id + "-" + input.dest.id,
        d: diagonal(datum, 0)
    });
}
function updateDecisionBoundary(network, firstTime) {
    if (firstTime) {
        boundary = {};
        nn.forEachNode(network, true, function (node) {
            boundary[node.id] = new Array(DENSITY);
        });
        for (var nodeId in INPUTS) {
            boundary[nodeId] = new Array(DENSITY);
        }
    }
    var xScale = d3.scale.linear().domain([0, DENSITY - 1]).range(xDomain);
    var yScale = d3.scale.linear().domain([DENSITY - 1, 0]).range(xDomain);
    var i = 0, j = 0;
    for (i = 0; i < DENSITY; i++) {
        if (firstTime) {
            nn.forEachNode(network, true, function (node) {
                boundary[node.id][i] = new Array(DENSITY);
            });
            for (var nodeId in INPUTS) {
                boundary[nodeId][i] = new Array(DENSITY);
            }
        }
        for (j = 0; j < DENSITY; j++) {
            var x = xScale(i);
            var y = yScale(j);
            var input = constructInput(x, y);
            nn.forwardProp(network, input);
            nn.forEachNode(network, true, function (node) {
                boundary[node.id][i][j] = node.output;
            });
            if (firstTime) {
                for (var nodeId in INPUTS) {
                    boundary[nodeId][i][j] = INPUTS[nodeId].f(x, y);
                }
            }
        }
    }
}
function getAccuracy(network, dataPoints) {
    var numCorrect = 0;
    for (var i = 0; i < dataPoints.length; i++) {
        var dataPoint = dataPoints[i];
        var input = constructInput(dataPoint.x, dataPoint.y);
        var output = nn.forwardProp(network, input);
        output = output >= 0.5 ? 1 : 0;
        if (output === dataPoint.label) {
            numCorrect++;
        }
    }
    return numCorrect / dataPoints.length;
}
function updateUI(firstStep) {
    if (firstStep === void 0) { firstStep = false; }
    updateWeightsUI(network, d3.select("g.core"));
    updateDecisionBoundary(network, firstStep);
    var selectedId = selectedNodeId != null ?
        selectedNodeId : nn.getOutputNode(network).id;
    heatMap.updateBackground(boundary[selectedId], state.discretize);
    d3.select("#network").selectAll("div.canvas")
        .each(function (data) {
        data.heatmap.updateBackground(heatmap_1.reduceMatrix(boundary[data.id], 10), state.discretize);
    });
    function zeroPad(n) {
        var pad = "000000";
        return (pad + n).slice(-pad.length);
    }
    function addCommas(s) {
        return s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    function toPercentage(n) {
        return (n * 100).toFixed(1) + "%";
    }
    d3.select("#accuracy-train").text(toPercentage(accuracyTrain));
    d3.select("#accuracy-test").text(toPercentage(accuracyTest));
    d3.select("#iter-number").text(addCommas(zeroPad(iter)));
}
function constructInputIds() {
    var result = [];
    for (var inputName in INPUTS) {
        if (state[inputName]) {
            result.push(inputName);
        }
    }
    return result;
}
function constructInput(x, y) {
    var input = [];
    for (var inputName in INPUTS) {
        if (state[inputName]) {
            input.push(INPUTS[inputName].f(x, y));
        }
    }
    return input;
}
function oneStep() {
    iter++;
    trainData.forEach(function (point, i) {
        var input = constructInput(point.x, point.y);
        nn.forwardProp(network, input);
        nn.backProp(network, point.label, nn.Errors.SQUARE);
        if ((i + 1) % state.batchSize === 0) {
            nn.updateWeights(network, state.learningRate, state.regularizationRate);
        }
    });
    accuracyTrain = getAccuracy(network, trainData);
    accuracyTest = getAccuracy(network, testData);
    updateUI();
    nn.resetStoredErrorDer(network);
}
function getOutputWeights(network) {
    var weights = [];
    for (var layerIdx = 0; layerIdx < network.length - 1; layerIdx++) {
        var currentLayer = network[layerIdx];
        for (var i = 0; i < currentLayer.length; i++) {
            var node = currentLayer[i];
            for (var j = 0; j < node.outputs.length; j++) {
                var output = node.outputs[j];
                weights.push(output.weight);
            }
        }
    }
    return weights;
}
exports.getOutputWeights = getOutputWeights;
function getOutputLabels(network) {
    var labels = [];
    for (var layerIdx = 0; layerIdx < network.length - 1; layerIdx++) {
        var currentLayer = network[layerIdx];
        for (var i = 0; i < currentLayer.length; i++) {
            var node = currentLayer[i];
            var label = {
                mainLabel: node.id,
                subLabels: []
            };
            for (var j = 0; j < node.outputs.length; j++) {
                var output = node.outputs[j];
                label.subLabels.push(output.dest.id);
            }
            labels.push(label);
        }
    }
    return labels;
}
exports.getOutputLabels = getOutputLabels;
function reset() {
    state.serialize();
    player.pause();
    var suffix = state.numHiddenLayers !== 1 ? "s" : "";
    d3.select("#num-layers").text(HUMAN_NUM[state.numHiddenLayers] + " hidden layer" + suffix);
    iter = 0;
    var numInputs = constructInput(0, 0).length;
    var shape = [numInputs].concat(state.networkShape).concat([1]);
    var data = state.dataset(NUM_SAMPLES, state.noise / 100);
    dataset_1.shuffle(data);
    var splitIndex = Math.floor(NUM_SAMPLES * state.percTrainData / 100);
    trainData = data.slice(0, splitIndex);
    testData = data.slice(splitIndex);
    heatMap.updatePoints(trainData);
    heatMap.updateTestPoints(state.showTestData ? testData : []);
    network = nn.buildNetwork(shape, state.activation, nn.Activations.SIGMOID, state.regularization, constructInputIds());
    timeMatrix = new time_matrix_1.TimeMatrix(d3.select("#time-matrix"), getOutputLabels(network));
    accuracyTrain = getAccuracy(network, trainData);
    accuracyTest = getAccuracy(network, testData);
    drawNetwork(network);
    d3.select("#time-matrix-container")
        .style("display", state.collectStats || timeMatrix.numColumns > 0 ?
        "block" : "none");
    updateUI(true);
}
;
function initTutorial() {
    var tutorial = d3.select("#tutorial");
    tutorial.style("width", document.body.clientWidth - 385 + "px");
    if (state.tutorial != null) {
        d3.html("tutorials/" + state.tutorial + ".html", function (err, htmlFragment) {
            if (err) {
                throw err;
            }
            tutorial.node().appendChild(htmlFragment);
        });
    }
}
initTutorial();
makeGUI();
reset();
