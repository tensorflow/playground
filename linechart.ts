
type Pair = [number, number];

type DataPoint = {
  x: number;
  y: number[];
}

/**
 * A multi-series line chart that allows you to append new data points
 * as data becomes available.
 */
export class AppendingLineChart {
  private numLines: number;
  private data: DataPoint[] = [];
  private svg: d3.Selection<any>;
  private xScale: d3.scale.Linear<number, number>;
  private yScale: d3.scale.Linear<number, number>;
  private paths: d3.Selection<any>[];
  private lineColors: string[];

  constructor(container: d3.Selection<any>, yDomain: Pair,
      lineColors: string[]) {
    this.lineColors = lineColors;
    this.numLines = lineColors.length;
    let node = <HTMLElement>container.node();
    let totalWidth = node.offsetWidth;
    let totalHeight = node.offsetHeight;
    let margin = {top: 0, right: 0, bottom: 0, left: 0};
    let width = totalWidth - margin.left - margin.right;
    let height = totalHeight - margin.top - margin.bottom;

    this.xScale = d3.scale.linear()
      .domain([0, 0])
      .range([0, width]);

    this.yScale = d3.scale.linear()
      .domain(yDomain)
      .range([height, 0]);

    this.svg = container.append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    this.paths = new Array(this.numLines);
    for (let i = 0; i < this.numLines; i++) {
      this.paths[i] = this.svg.append("path")
        .attr("class", "line")
        .style({
          "fill": "none",
          "stroke": lineColors[i],
          "stroke-width": "1.5px"
        });
    }
  }

  reset() {
    this.data = [];
    this.redraw();
  }

  addDataPoint(dataPoint: number[]) {
    if (dataPoint.length !== this.numLines) {
      throw Error("Length of dataPoint must equal number of lines");
    }
    this.data.push({x: this.data.length + 1, y: dataPoint});
    this.redraw();
  }

  private redraw() {
    // Adjust the x domain.
    this.xScale.domain([1, this.data.length]);

    // Adjust all the <path> elements (lines).
    let getPathMap = (lineIndex: number) => {
      return d3.svg.line<DataPoint>()
      .x(d => this.xScale(d.x))
      .y(d => this.yScale(d.y[lineIndex]));
    };
    for (let i = 0; i < this.numLines; i++) {
      this.paths[i].datum(this.data).attr("d", getPathMap(i));
    }
  }
}