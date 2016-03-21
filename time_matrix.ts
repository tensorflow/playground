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

/** Settings for the time matrix visualization */
export interface TimeMatrixSettings {
  [key: string]: any;
  /** Vertical padding between rows. */
  ypadding?: number;
  /** The height of the individual rectangle. */
  rectHeight?: number;
  /** The width of the individual rectangle. */
  rectWidth?: number;
  /** Horizontal margin for the labels of every row. */
  labelMargin?: number;
  /** Vertical margin between weights of different nodes. */
  betweenLabelMargin?: number;
  /** Vertical margin at the top of the visulization. */
  marginTop?: number;
}

/**
 * Arbitrary large number so the user can scroll horizontally
 * when the timeline gets too long.
 */
// TODO(smilkov): Compute and expand the width of the svg on runtime.
const WIDTH = 8000;

export interface TimeLabel {
  mainLabel: string;
  subLabels: string[];
}

/**
 * A timeline visualization of the derivatives of the network weights.
 * Every weight is represented as a row, while columns denote time.
 * Weights coming out of the same node are grouped together and vertically
 * separated from another group.
 */
export class TimeMatrix {
  numColumns = 0;

  private settings: TimeMatrixSettings = {
    ypadding: 3,
    rectHeight: 6,
    rectWidth: 2,
    labelMargin: 30,
    betweenLabelMargin: 15,
    marginTop: 5
  };
  private svg: d3.Selection<any>;
  private labels: TimeLabel[];
  private numRows = 0;

  constructor(container: d3.Selection<any>, labels: TimeLabel[],
      userSettings?: TimeMatrixSettings) {
    // Empty the container.
    container.selectAll("*").remove();

    if (userSettings != null) {
      // overwrite the defaults with the user-specified settings.
      for (let prop in userSettings) {
        this.settings[prop] = userSettings[prop];
      }
    }
    this.labels = labels;

    // Draw the labels.
    this.svg = container.append("svg");
    let labelsG = this.svg.append("g").attr("class", "labels");
    let y = this.settings.marginTop;
    for (let i = 0; i < labels.length; i++) {
      let label = labels[i];
      for (let j = 0; j < label.subLabels.length; j++) {
        let text = (j === 0 ? label.mainLabel + "➝" : "") +
            label.subLabels[j];
        labelsG.append("text")
          .attr({
            x: this.settings.labelMargin,
            y: y
          })
          .text(text);
        y += this.settings.rectHeight + this.settings.ypadding;
        this.numRows++;
      }
      let lineY = y - this.settings.rectHeight - this.settings.ypadding +
          this.settings.betweenLabelMargin;
      labelsG.append("line").attr({
        x1: 0,
        y1: lineY,
        x2: WIDTH,
        y2: lineY
      }).style({
        "stroke": "#999",
        "stroke-width": "1px"
      });
      y += this.settings.betweenLabelMargin;
    }
    this.svg.attr({
       width: WIDTH,
       height: y + 10
    });
  }

  addColumn(values: number[]) {
    if (values.length !== this.numRows) {
      throw Error("The number of provided values much match the number" +
          " of rows");
    }

    let [min, max] = d3.extent(values);
    let range = Math.max(Math.abs(min), Math.abs(max));
    let colorScale = d3.scale.linear<string>()
      .domain([-range, 0, range])
      .range(["orange", "white", "blue"])
      .clamp(true);

    let valueIndex = 0;
    let column = this.svg.append("g").attr("class", "column");
    let x = this.settings.labelMargin + 2 +
        this.numColumns * this.settings.rectWidth;
    let y = this.settings.marginTop;
    for (let i = 0; i < this.labels.length; i++) {
      let label = this.labels[i];
      for (let j = 0; j < label.subLabels.length; j++) {
        column.append("rect").attr({
          x: x,
          y: y,
          width: this.settings.rectWidth,
          height: this.settings.rectHeight,
        }).style({
          fill: colorScale(values[valueIndex]),
          stroke: "none"
        });
        y += this.settings.rectHeight + this.settings.ypadding;
        valueIndex++;
      }
      y += this.settings.betweenLabelMargin;
    }
    this.numColumns++;
  }
}
