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
import {normalRandom} from "./dataset";

function flatten(arr: any[], ret?: number[]): number[] {
  ret = (ret === undefined ? [] : ret);
  for (let i = 0; i < arr.length; ++i) {
    if (Array.isArray(arr[i])) {
      flatten(arr[i], ret);
    } else {
      ret.push(arr[i]);
    }
  }
  return ret;
}

export class Tensor {
  shape: number[];
  values: Float32Array;

  constructor(shape: number[], values: Float32Array) {
    assert(Tensor.sizeFromShape(shape) == values.length,
        "shape should match the length of values");
    this.shape = shape;
    this.values = values;
  }

  reshape<T extends Tensor>(newShape: number[]): T {
    assert(Tensor.sizeFromShape(this.shape) == Tensor.sizeFromShape(newShape),
        "new shape and old shape must have the same number of elements.");
    return Tensor.new(newShape, this.values) as T;
  }

  private static new(shape: number[], values: Float32Array) {
    switch (shape.length) {
      case 1:
        return new Tensor1D(shape as [number], values);
      case 2:
        return new Tensor2D(shape as [number, number], values);
      case 3:
        return new Tensor3D(shape as [number, number, number], values);
      case 4:
        return new Tensor4D(shape as [number, number, number, number], values);
      default:
        return new Tensor(shape, values);
    }
  }

  private static sizeFromShape(shape: number[]): number {
    let size = 1;
    for (let i = 0; i < shape.length; i++) {
      size *= shape[i];
    }
    return size;
  }

  static zeros<T extends Tensor>(shape: number[]): T {
    let values = new Float32Array(Tensor.sizeFromShape(shape));
    return Tensor.new(shape, values) as T;
  }

  static like<T extends Tensor>(another: T): T {
    return Tensor.new(another.shape, new Float32Array(another.values)) as T;
  }

  get rank(): number {
    return this.shape.length;
  }

  get size(): number {
    return Tensor.sizeFromShape(this.shape);
  }

  get(...locs: number[]) {
    let index = 0;
    let mul = 1;
    for (let i = locs.length - 1; i >= 0; --i) {
      index += mul * locs[i];
      mul *= this.shape[i];
    }
    return this.values[index];
  }

  set(value: number, ...locs: number[]) {
    let index = 0;
    let mul = 1;
    for (let i = locs.length - 1; i >= 0; --i) {
      index += mul * locs[i];
      mul *= this.shape[i];
    }
    this.values[index] = value;
  }

  toString(): string {
    // TODO(smilkov): Implement.
    return "";
  }
}

export class Tensor1D extends Tensor {
  shape: [number];

  constructor(shape: [number], values: Float32Array) {
    assert(shape.length == 1, "Shape should be of length 1");
    super(shape, values);
  }

  get(i: number): number {
    return this.values[i];
  }

  set(value: number, i: number) {
    this.values[i] = value;
  }
}

export class Tensor2D extends Tensor {
  shape: [number, number];

  constructor(shape: [number, number], values: Float32Array) {
    assert(shape.length == 2, "Shape should be of length 2");
    super(shape, values);
  }

  get(i: number, j: number) {
    return this.values[j + this.shape[1] * i];
  }

  set(value: number, i: number, j: number) {
    this.values[j + this.shape[1] * i] = value;
  }
}

export class Tensor3D extends Tensor {
  shape: [number, number, number];

  constructor(shape: [number, number, number], values: Float32Array) {
    assert(shape.length == 3, "Shape should be of length 3");
    super(shape, values);
  }

  get(i: number, j: number, k: number) {
    return this.values[k + this.shape[2] * j +
        this.shape[2] * this.shape[1] * i];
  }

  set(value: number, i: number, j: number, k: number) {
    this.values[k + this.shape[2] * j +
        this.shape[2] * this.shape[1] * i] = value;
  }
}

export class Tensor4D extends Tensor {
  shape: [number, number, number, number];

  constructor(shape: [number, number, number, number], values: Float32Array) {
    assert(shape.length == 4, "Shape should be of length 4");
    super(shape, values);
  }

  get(i: number, j: number, k: number, l: number) {
    let shape3Times2 = this.shape[3] * this.shape[2];
    return this.values[l + this.shape[3] * k +
        shape3Times2 * j +
        shape3Times2 * this.shape[1] * i];
  }

  set(value: number, i: number, j: number, k: number, l: number) {
    let shape3Times2 = this.shape[3] * this.shape[2];
    this.values[l + this.shape[3] * k +
        shape3Times2 * j +
        shape3Times2 * this.shape[1] * i] = value;
  }
}

function assert(expr: boolean, msg: string) {
  if (!expr) {
    throw new Error(msg);
  }
}

function vecTimesMat(a: Tensor1D, bMat: Tensor2D): Tensor1D {
  // Reshape the vector to a matrix.
  let aMat = a.reshape<Tensor2D>([1, a.shape[0]]);
  let cMat = matMul(aMat, bMat);
  // Reshape the result back to a vector.
  return cMat.reshape<Tensor1D>(a.shape);
}

function matTimesVec(aMat: Tensor2D, b: Tensor1D): Tensor1D {
  // Reshape the vector to a matrix.
  let bMat = b.reshape<Tensor2D>([b.shape[0], 1]);
  let cMat = matMul(aMat, bMat);
  // Reshape the result back to a vector.
  return cMat.reshape<Tensor1D>(b.shape);
}

function matMul(a: Tensor2D, b: Tensor2D): Tensor2D {
  assert(a.shape[1] == b.shape[0], "Inner dimensions must match");
  let c = Tensor.zeros<Tensor2D>([a.shape[0], b.shape[1]]);
  for (let i = 0; i < a.shape[0]; ++i) {
    for (let j = 0; j < b.shape[1]; ++j) {
      let sum = 0;
      for (let k = 0; k < a.shape[1]; ++k) {
        sum += a.get(i, k) * b.get(k, j);
      }
      c.set(sum, i, j);
    }
  }
  return c;
}

interface Operation {
  feedForward(x: Tensor): Tensor;
  backProp(dy: Tensor): Tensor;
  updateParams(): void;
}

class FCLayer implements Operation {
  weights: Tensor2D;
  biases: Tensor1D;
  dW: Tensor2D;
  x: Tensor1D;
  /** Number of accumulated err. derivatives since the last update. */
  numAccumulatedDers = 0;

  constructor(inputSize: number, outputSize: number) {
    // Initialize the weights to random gauss(0, 1).
    let values = new Float32Array(inputSize * outputSize);
    for (let i = 0; i < values.length; ++i) {
      values[i] = normalRandom();
    }
    this.weights = new Tensor2D([inputSize, outputSize], values);
  }

  feedForward(x: Tensor1D): Tensor1D {
    // Matrix multiply the input tensor by the weights.
    this.x = x;
    return vecTimesMat(x, this.weights);
  }

  /**
   * Return the error derivative with respect to the input.
   *
   * @param dy: Error derivative with respect to the output.
   */
  backProp(dy: Tensor1D): Tensor1D {
    let [inputSize, outputSize] = this.dW.shape;
    let dx = Tensor.zeros<Tensor1D>([inputSize]);
    for (let i = 0; i < inputSize; ++i) {
      let sum = 0;
      for (let j = 0; j < outputSize; ++j) {
        // dE/dx_i = sum_j dE/dy_j * dy_j/dx_i =
        //           sum_j dE/dy_j * w_ij
        sum += dy.get(j) * this.weights.get(i, j);
        let derWij = this.dW.get(i, j);
        // dE/dw_ij = dE/dy_j * dy_j/dw_ij
        //          = dE/dy_j * x_i
        this.dW.set(derWij + dy.get(j) * this.x.get(i),
            i, j);
      }
      dx.set(sum, i);
    }
    return dx;
  }

  updateParams() {
    // Use the derWeights.
    // TODO(smilkov): Implement.
  }
}

function logSumExp(tensor: Tensor1D): number {
  let xMax = Number.NEGATIVE_INFINITY;
  for (let i = 0; i < tensor.shape[0]; ++i) {
    xMax = Math.max(xMax, tensor.get(i));
  }
  let sum = 0;
  for (let i = 0; i < tensor.shape[0]; i++) {
    sum += Math.exp(tensor.get(i) - xMax);
  }
  return xMax + Math.log(sum);
}

class Activation implements Operation {
  x: Tensor;
  func: ActivationFunction;

  constructor(func: ActivationFunction) {
    this.func = func;
  }

  feedForward(x: Tensor): Tensor {
    this.x = x;
    let y = Tensor.zeros(x.shape);
    for (let i = 0; i < x.size; ++i) {
      y.values[i] = this.func.output(x.values[i]);
    }
    return y;
  }

  backProp(dy: Tensor): Tensor {
    // dE/dx_i = sum_j dE/dy_j * dy_j/dx_i
    //         = dE/dy_i * dy_i/dx_i
    let dx = Tensor.zeros(dy.shape);
    for (let i = 0; i < dx.size; ++i) {
      dx.values[i] = dy.values[i] * this.func.der(this.x.values[i]);
    }
    return dx;
  }

  updateParams() {

  }
}

class Softmax implements Operation {
  y: Tensor1D;

  feedForward(x: Tensor1D): Tensor1D {
    // Do it in log space for numerical stability.
    let logSum = logSumExp(x);
    this.y = Tensor.zeros<Tensor1D>(x.shape);
    for (let i = 0; i < x.shape[0]; ++i) {
      this.y.set(Math.exp(x.get(i) - logSum), i);
    }
    return this.y;
  }

  backProp(dy: Tensor1D): Tensor1D {
    // dE/dx_i = sum_j dE/dy_j * dy_j/dx_i
    let dx = Tensor.zeros<Tensor1D>(dy.shape);
    for (let i = 0; i < dx.shape[0]; ++i) {
      let sum = 0;
      for (let j = 0; j < dx.shape[0]; ++j) {
        sum += dy.get(j) * (i == j ?
          this.y.get(j) * (1 - this.y.get(j)) : -this.y.get(j) * this.y.get(i));
      }
      dx.set(sum, i);
    }
    return dx;
  }

  updateParams() {
    // TODO(smilkov): Implement.
  }
}

class ReLU extends Activation {
  constructor() {
    super(Activations.RELU);
  }
}

class TanH extends Activation {
  constructor() {
    super(Activations.TANH);
  }
}

class Sigmoid extends Activation {
  constructor() {
    super(Activations.SIGMOID);
  }
}

/**
 * A node in a neural network. Each node has a state
 * (total input, output, and their respectively derivatives) which changes
 * after every forward and back propagation run.
 */
export class Node {
  id: string;
  /** List of input links. */
  inputLinks: Link[] = [];
  bias = 0.1;
  /** List of output links. */
  outputs: Link[] = [];
  totalInput: number;
  output: number;
  /** Error derivative with respect to this node's output. */
  outputDer = 0;
  /** Error derivative with respect to this node's total input. */
  inputDer = 0;
  /**
   * Accumulated error derivative with respect to this node's total input since
   * the last update. This derivative equals dE/db where b is the node's
   * bias term.
   */
  accInputDer = 0;
  /**
   * Number of accumulated err. derivatives with respect to the total input
   * since the last update.
   */
  numAccumulatedDers = 0;
  /** Activation function that takes total input and returns node's output */
  activation: ActivationFunction;

  /**
   * Creates a new node with the provided id and activation function.
   */
  constructor(id: string, activation: ActivationFunction, initZero?: boolean) {
    this.id = id;
    this.activation = activation;
    if (initZero) {
      this.bias = 0;
    }
  }

  /** Recomputes the node's output and returns it. */
  updateOutput(): number {
    // Stores total input into the node.
    this.totalInput = this.bias;
    for (let j = 0; j < this.inputLinks.length; j++) {
      let link = this.inputLinks[j];
      this.totalInput += link.weight * link.source.output;
    }
    this.output = this.activation.output(this.totalInput);
    return this.output;
  }
}

/**
 * An error function and its derivative.
 */
export interface ErrorFunction {
  error: (output: number, target: number) => number;
  der: (output: number, target: number) => number;
}

/** A node's activation function and its derivative. */
export interface ActivationFunction {
  output: (input: number) => number;
  der: (input: number) => number;
}

/** Function that computes a penalty cost for a given weight in the network. */
export interface RegularizationFunction {
  output: (weight: number) => number;
  der: (weight: number) => number;
}

/** Built-in error functions */
export class Errors {
  public static SQUARE: ErrorFunction = {
    error: (output: number, target: number) =>
               0.5 * Math.pow(output - target, 2),
    der: (output: number, target: number) => output - target
  };
}

/** Polyfill for TANH */
(<any>Math).tanh = (<any>Math).tanh || function(x) {
  if (x === Infinity) {
    return 1;
  } else if (x === -Infinity) {
    return -1;
  } else {
    let e2x = Math.exp(2 * x);
    return (e2x - 1) / (e2x + 1);
  }
};

/** Built-in activation functions */
export class Activations {
  public static TANH: ActivationFunction = {
    output: x => (<any>Math).tanh(x),
    der: x => {
      let output = Activations.TANH.output(x);
      return 1 - output * output;
    }
  };
  public static RELU: ActivationFunction = {
    output: x => Math.max(0, x),
    der: x => x <= 0 ? 0 : 1
  };
  public static SIGMOID: ActivationFunction = {
    output: x => 1 / (1 + Math.exp(-x)),
    der: x => {
      let output = Activations.SIGMOID.output(x);
      return output * (1 - output);
    }
  };
  public static LINEAR: ActivationFunction = {
    output: x => x,
    der: x => 1
  };
}

/** Build-in regularization functions */
export class RegularizationFunction {
  public static L1: RegularizationFunction = {
    output: w => Math.abs(w),
    der: w => w < 0 ? -1 : 1
  };
  public static L2: RegularizationFunction = {
    output: w => 0.5 * w * w,
    der: w => w
  };
}

/**
 * A link in a neural network. Each link has a weight and a source and
 * destination node. Also it has an internal state (error derivative
 * with respect to a particular input) which gets updated after
 * a run of back propagation.
 */
export class Link {
  id: string;
  source: Node;
  dest: Node;
  weight = Math.random() - 0.5;
  /** Error derivative with respect to this weight. */
  errorDer = 0;
  /** Accumulated error derivative since the last update. */
  accErrorDer = 0;
  /** Number of accumulated derivatives since the last update. */
  numAccumulatedDers = 0;
  regularization: RegularizationFunction;

  /**
   * Constructs a link in the neural network initialized with random weight.
   *
   * @param source The source node.
   * @param dest The destination node.
   * @param regularization The regularization function that computes the
   *     penalty for this weight. If null, there will be no regularization.
   */
  constructor(source: Node, dest: Node,
      regularization: RegularizationFunction, initZero?: boolean) {
    this.id = source.id + "-" + dest.id;
    this.source = source;
    this.dest = dest;
    this.regularization = regularization;
    if (initZero) {
      this.weight = 0;
    }
  }
}

/**
 * Builds a neural network.
 *
 * @param networkShape The shape of the network. E.g. [1, 2, 3, 1] means
 *   the network will have one input node, 2 nodes in first hidden layer,
 *   3 nodes in second hidden layer and 1 output node.
 * @param activation The activation function of every hidden node.
 * @param outputActivation The activation function for the output nodes.
 * @param regularization The regularization function that computes a penalty
 *     for a given weight (parameter) in the network. If null, there will be
 *     no regularization.
 * @param inputIds List of ids for the input nodes.
 */
export function buildNetwork(
    networkShape: number[], activation: ActivationFunction,
    outputActivation: ActivationFunction,
    regularization: RegularizationFunction,
    inputIds: string[], initZero?: boolean): Node[][] {
  let numLayers = networkShape.length;
  let id = 1;
  /** List of layers, with each layer being a list of nodes. */
  let network: Node[][] = [];
  for (let layerIdx = 0; layerIdx < numLayers; layerIdx++) {
    let isOutputLayer = layerIdx === numLayers - 1;
    let isInputLayer = layerIdx === 0;
    let currentLayer: Node[] = [];
    network.push(currentLayer);
    let numNodes = networkShape[layerIdx];
    for (let i = 0; i < numNodes; i++) {
      let nodeId = id.toString();
      if (isInputLayer) {
        nodeId = inputIds[i];
      } else {
        id++;
      }
      let node = new Node(nodeId,
          isOutputLayer ? outputActivation : activation, initZero);
      currentLayer.push(node);
      if (layerIdx >= 1) {
        // Add links from nodes in the previous layer to this node.
        for (let j = 0; j < network[layerIdx - 1].length; j++) {
          let prevNode = network[layerIdx - 1][j];
          let link = new Link(prevNode, node, regularization, initZero);
          prevNode.outputs.push(link);
          node.inputLinks.push(link);
        }
      }
    }
  }
  return network;
}

/**
 * Runs a forward propagation of the provided input through the provided
 * network. This method modifies the internal state of the network - the
 * total input and output of each node in the network.
 *
 * @param network The neural network.
 * @param inputs The input array. Its length should match the number of input
 *     nodes in the network.
 * @return The final output of the network.
 */
export function forwardProp(network: Node[][], inputs: number[]): number {
  let inputLayer = network[0];
  if (inputs.length !== inputLayer.length) {
    throw new Error("The number of inputs must match the number of nodes in" +
        " the input layer");
  }
  // Update the input layer.
  for (let i = 0; i < inputLayer.length; i++) {
    let node = inputLayer[i];
    node.output = inputs[i];
  }
  for (let layerIdx = 1; layerIdx < network.length; layerIdx++) {
    let currentLayer = network[layerIdx];
    // Update all the nodes in this layer.
    for (let i = 0; i < currentLayer.length; i++) {
      let node = currentLayer[i];
      node.updateOutput();
    }
  }
  return network[network.length - 1][0].output;
}

/**
 * Runs a backward propagation using the provided target and the
 * computed output of the previous call to forward propagation.
 * This method modifies the internal state of the network - the error
 * derivatives with respect to each node, and each weight
 * in the network.
 */
export function backProp(network: Node[][], target: number,
    errorFunc: ErrorFunction): void {
  // The output node is a special case. We use the user-defined error
  // function for the derivative.
  let outputNode = network[network.length - 1][0];
  outputNode.outputDer = errorFunc.der(outputNode.output, target);

  // Go through the layers backwards.
  for (let layerIdx = network.length - 1; layerIdx >= 1; layerIdx--) {
    let currentLayer = network[layerIdx];
    // Compute the error derivative of each node with respect to:
    // 1) its total input
    // 2) each of its input weights.
    for (let i = 0; i < currentLayer.length; i++) {
      let node = currentLayer[i];
      node.inputDer = node.outputDer * node.activation.der(node.totalInput);
      node.accInputDer += node.inputDer;
      node.numAccumulatedDers++;
    }

    // Error derivative with respect to each weight coming into the node.
    for (let i = 0; i < currentLayer.length; i++) {
      let node = currentLayer[i];
      for (let j = 0; j < node.inputLinks.length; j++) {
        let link = node.inputLinks[j];
        link.errorDer = node.inputDer * link.source.output;
        link.accErrorDer += link.errorDer;
        link.numAccumulatedDers++;
      }
    }
    if (layerIdx === 1) {
      continue;
    }
    let prevLayer = network[layerIdx - 1];
    for (let i = 0; i < prevLayer.length; i++) {
      let node = prevLayer[i];
      // Compute the error derivative with respect to each node's output.
      node.outputDer = 0;
      for (let j = 0; j < node.outputs.length; j++) {
        let output = node.outputs[j];
        node.outputDer += output.weight * output.dest.inputDer;
      }
    }
  }
}

/**
 * Updates the weights of the network using the previously accumulated error
 * derivatives.
 */
export function updateWeights(network: Node[][], learningRate: number,
    regularizationRate: number) {
  for (let layerIdx = 1; layerIdx < network.length; layerIdx++) {
    let currentLayer = network[layerIdx];
    for (let i = 0; i < currentLayer.length; i++) {
      let node = currentLayer[i];
      // Update the node's bias.
      if (node.numAccumulatedDers > 0) {
        node.bias -= learningRate * node.accInputDer / node.numAccumulatedDers;
        node.accInputDer = 0;
        node.numAccumulatedDers = 0;
      }
      // Update the weights coming into this node.
      for (let j = 0; j < node.inputLinks.length; j++) {
        let link = node.inputLinks[j];
        let regulDer = link.regularization ?
            link.regularization.der(link.weight) : 0;
        if (link.numAccumulatedDers > 0) {
          link.weight -= (learningRate / link.numAccumulatedDers) *
            (link.accErrorDer + regularizationRate * regulDer);
          link.accErrorDer = 0;
          link.numAccumulatedDers = 0;
        }
      }
    }
  }
}

/** Iterates over every node in the network/ */
export function forEachNode(network: Node[][], ignoreInputs: boolean,
    accessor: (node: Node) => any) {
  for (let layerIdx = ignoreInputs ? 1 : 0;
      layerIdx < network.length;
      layerIdx++) {
    let currentLayer = network[layerIdx];
    for (let i = 0; i < currentLayer.length; i++) {
      let node = currentLayer[i];
      accessor(node);
    }
  }
}

/** Returns the output node in the network. */
export function getOutputNode(network: Node[][]) {
  return network[network.length - 1][0];
}
