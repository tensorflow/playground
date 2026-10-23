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
  /** Optimizer state: momentum/RMSProp accumulator for the bias. */
  biasMoment1 = 0;
  /** Optimizer state: Adam second-moment accumulator for the bias. */
  biasMoment2 = 0;
  /** Dropout mask for the most recent forward pass (1 = kept, 0 = dropped). */
  dropoutMask = 1;

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
    this.output = this.activation.output(this.totalInput) * this.dropoutMask;
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
(Math as any).tanh = (Math as any).tanh || function(x) {
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
    output: x => (Math as any).tanh(x),
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
  public static LEAKY_RELU: ActivationFunction = {
    output: x => x >= 0 ? x : 0.01 * x,
    der: x => x >= 0 ? 1 : 0.01
  };
  public static ELU: ActivationFunction = {
    output: x => x >= 0 ? x : Math.exp(x) - 1,
    der: x => x >= 0 ? 1 : Math.exp(x)
  };
  public static SWISH: ActivationFunction = {
    output: x => x / (1 + Math.exp(-x)),
    der: x => {
      let sigmoid = 1 / (1 + Math.exp(-x));
      let swish = x * sigmoid;
      return swish + sigmoid * (1 - swish);
    }
  };
}

/** Supported weight-update strategies. */
export type OptimizerType = "sgd" | "momentum" | "rmsprop" | "adam";

/** Configuration for the weight-update step. */
export interface OptimizerConfig {
  type: OptimizerType;
  /** Current optimization step, 1-indexed. Used for Adam's bias correction. */
  t: number;
  momentum?: number;
  beta1?: number;
  beta2?: number;
  epsilon?: number;
  /** Maximum allowed L2 norm of any single gradient; 0 disables clipping. */
  gradientClip?: number;
  /** Multiplicative learning-rate decay applied once per call (0 disables). */
  learningRateDecay?: number;
}

const DEFAULT_OPTIMIZER: OptimizerConfig = {type: "sgd", t: 1};

/**
 * Computes the actual step to apply to a parameter given its averaged
 * gradient, using the requested optimizer. Mutates the per-parameter
 * moment1/moment2 accumulators in place.
 */
function computeStep(grad: number, learningRate: number,
    state: {moment1: number, moment2: number}, config: OptimizerConfig):
    number {
  if (config.gradientClip && config.gradientClip > 0) {
    let clip = config.gradientClip;
    if (grad > clip) {
      grad = clip;
    } else if (grad < -clip) {
      grad = -clip;
    }
  }
  switch (config.type) {
    case "momentum": {
      let momentum = config.momentum != null ? config.momentum : 0.9;
      state.moment1 = momentum * state.moment1 + grad;
      return learningRate * state.moment1;
    }
    case "rmsprop": {
      let decay = config.beta2 != null ? config.beta2 : 0.9;
      let epsilon = config.epsilon != null ? config.epsilon : 1e-8;
      state.moment2 = decay * state.moment2 + (1 - decay) * grad * grad;
      return learningRate * grad / (Math.sqrt(state.moment2) + epsilon);
    }
    case "adam": {
      let beta1 = config.beta1 != null ? config.beta1 : 0.9;
      let beta2 = config.beta2 != null ? config.beta2 : 0.999;
      let epsilon = config.epsilon != null ? config.epsilon : 1e-8;
      state.moment1 = beta1 * state.moment1 + (1 - beta1) * grad;
      state.moment2 = beta2 * state.moment2 + (1 - beta2) * grad * grad;
      let mHat = state.moment1 / (1 - Math.pow(beta1, config.t));
      let vHat = state.moment2 / (1 - Math.pow(beta2, config.t));
      return learningRate * mHat / (Math.sqrt(vHat) + epsilon);
    }
    default:
      return learningRate * grad;
  }
}

/** Build-in regularization functions */
export class RegularizationFunction {
  public static L1: RegularizationFunction = {
    output: w => Math.abs(w),
    der: w => w < 0 ? -1 : (w > 0 ? 1 : 0)
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
  isDead = false;
  /** Error derivative with respect to this weight. */
  errorDer = 0;
  /** Accumulated error derivative since the last update. */
  accErrorDer = 0;
  /** Number of accumulated derivatives since the last update. */
  numAccumulatedDers = 0;
  regularization: RegularizationFunction;
  /** Optimizer state: momentum/RMSProp accumulator (first moment). */
  moment1 = 0;
  /** Optimizer state: Adam second-moment accumulator. */
  moment2 = 0;

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
export function forwardProp(network: Node[][], inputs: number[],
    dropoutRate = 0, isTraining = false, rng: () => number = Math.random):
    number {
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
  let lastLayerIdx = network.length - 1;
  for (let layerIdx = 1; layerIdx < network.length; layerIdx++) {
    let currentLayer = network[layerIdx];
    // Dropout only ever applies to hidden layers, and only while training.
    let applyDropout = isTraining && dropoutRate > 0 && layerIdx !== lastLayerIdx;
    // Update all the nodes in this layer.
    for (let i = 0; i < currentLayer.length; i++) {
      let node = currentLayer[i];
      if (applyDropout) {
        node.dropoutMask = rng() < dropoutRate ? 0 : 1 / (1 - dropoutRate);
      } else {
        node.dropoutMask = 1;
      }
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
        if (link.isDead) {
          continue;
        }
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
    regularizationRate: number, optimizer: OptimizerConfig = DEFAULT_OPTIMIZER) {
  if (optimizer.learningRateDecay && optimizer.learningRateDecay > 0) {
    learningRate = learningRate /
        (1 + optimizer.learningRateDecay * (optimizer.t - 1));
  }
  for (let layerIdx = 1; layerIdx < network.length; layerIdx++) {
    let currentLayer = network[layerIdx];
    for (let i = 0; i < currentLayer.length; i++) {
      let node = currentLayer[i];
      // Update the node's bias.
      if (node.numAccumulatedDers > 0) {
        let grad = node.accInputDer / node.numAccumulatedDers;
        node.bias -= computeStepAndUpdate(node, grad, learningRate, optimizer);
        node.accInputDer = 0;
        node.numAccumulatedDers = 0;
      }
      // Update the weights coming into this node.
      for (let j = 0; j < node.inputLinks.length; j++) {
        let link = node.inputLinks[j];
        if (link.isDead) {
          continue;
        }
        let regulDer = link.regularization ?
            link.regularization.der(link.weight) : 0;
        if (link.numAccumulatedDers > 0) {
          let grad = link.accErrorDer / link.numAccumulatedDers;
          // Update the weight based on dE/dw using the configured optimizer.
          link.weight -= computeLinkStepAndUpdate(link, grad, learningRate,
              optimizer);
          // Further update the weight based on regularization (plain SGD
          // step on the penalty term, independent of the optimizer above).
          let newLinkWeight = link.weight -
              (learningRate * regularizationRate) * regulDer;
          if (link.regularization === RegularizationFunction.L1 &&
              link.weight * newLinkWeight < 0) {
            // The weight crossed 0 due to the regularization term. Set it to 0.
            link.weight = 0;
            link.isDead = true;
          } else {
            link.weight = newLinkWeight;
          }
          link.accErrorDer = 0;
          link.numAccumulatedDers = 0;
        }
      }
    }
  }
}

/** Applies computeStep against a node's own moment accumulators. */
function computeStepAndUpdate(node: Node, grad: number, learningRate: number,
    optimizer: OptimizerConfig): number {
  let state = {moment1: node.biasMoment1, moment2: node.biasMoment2};
  let step = computeStep(grad, learningRate, state, optimizer);
  node.biasMoment1 = state.moment1;
  node.biasMoment2 = state.moment2;
  return step;
}

/** Applies computeStep against a link's own moment accumulators. */
function computeLinkStepAndUpdate(link: Link, grad: number,
    learningRate: number, optimizer: OptimizerConfig): number {
  let state = {moment1: link.moment1, moment2: link.moment2};
  let step = computeStep(grad, learningRate, state, optimizer);
  link.moment1 = state.moment1;
  link.moment2 = state.moment2;
  return step;
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

/** Plain-data shape of a trained network, safe to JSON.stringify/parse. */
export interface SerializedNetwork {
  /** Format version, bumped if the shape of this export ever changes. */
  version: 1;
  shape: number[];
  /** Per-layer, per-node bias (input layer omitted, has no bias). */
  biases: number[][];
  /** Per-link weight, in the same order buildNetwork() creates links. */
  weights: number[][][];
}

/** Serializes a network's weights and biases to a plain-data object. */
export function serializeNetwork(network: Node[][]): SerializedNetwork {
  let shape = network.map(layer => layer.length);
  let biases: number[][] = [];
  let weights: number[][][] = [];
  for (let layerIdx = 1; layerIdx < network.length; layerIdx++) {
    let layerBiases: number[] = [];
    let layerWeights: number[][] = [];
    for (let node of network[layerIdx]) {
      layerBiases.push(node.bias);
      layerWeights.push(node.inputLinks.map(link => link.weight));
    }
    biases.push(layerBiases);
    weights.push(layerWeights);
  }
  return {version: 1, shape, biases, weights};
}

/**
 * Loads previously-serialized weights/biases into a network of matching
 * shape. Throws if the shapes don't match, rather than silently applying a
 * mismatched subset of values.
 */
export function deserializeNetwork(network: Node[][],
    data: SerializedNetwork): void {
  let shape = network.map(layer => layer.length);
  if (!data || data.version !== 1 || !Array.isArray(data.shape) ||
      data.shape.length !== shape.length ||
      data.shape.some((n, i) => n !== shape[i])) {
    throw new Error("Saved model shape does not match the current network " +
        "shape; adjust the number of layers/nodes to match before loading.");
  }
  for (let layerIdx = 1; layerIdx < network.length; layerIdx++) {
    let layerBiases = data.biases[layerIdx - 1];
    let layerWeights = data.weights[layerIdx - 1];
    let layer = network[layerIdx];
    for (let i = 0; i < layer.length; i++) {
      let node = layer[i];
      let bias = layerBiases[i];
      if (typeof bias !== "number" || !isFinite(bias)) {
        throw new Error("Saved model contains an invalid bias value.");
      }
      node.bias = bias;
      let nodeWeights = layerWeights[i];
      for (let j = 0; j < node.inputLinks.length; j++) {
        let weight = nodeWeights[j];
        if (typeof weight !== "number" || !isFinite(weight)) {
          throw new Error("Saved model contains an invalid weight value.");
        }
        node.inputLinks[j].weight = weight;
        node.inputLinks[j].isDead = false;
      }
    }
  }
}

/**
 * Tracks validation loss across calls and reports whether training should
 * stop: true once the loss has failed to improve by more than `minDelta`
 * for `patience` consecutive checks.
 */
export class EarlyStopping {
  private best = Infinity;
  private numBadChecks = 0;

  constructor(private patience = 10, private minDelta = 1e-4) {}

  /** Call once per evaluation interval with the latest validation loss. */
  shouldStop(validationLoss: number): boolean {
    if (validationLoss < this.best - this.minDelta) {
      this.best = validationLoss;
      this.numBadChecks = 0;
    } else {
      this.numBadChecks++;
    }
    return this.numBadChecks >= this.patience;
  }

  reset(): void {
    this.best = Infinity;
    this.numBadChecks = 0;
  }
}
