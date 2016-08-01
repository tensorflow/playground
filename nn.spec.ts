import {Tensor, Tensor1D, Tensor2D, Tensor3D, Tensor4D, ReLU, TanH,
  Sigmoid, FC, Softmax, CrossEntropyCost} from "./nn";

describe("Tensor", () => {
  it("Tensors of arbitrary size", () => {
    // [1, 2, 3]
    let t = Tensor.make([3], [1, 2, 3]);
    expect(t instanceof Tensor1D).toBe(true);
    expect(t.rank).toBe(1);
    expect(t.size).toBe(3);
    expect(t.values).toEqual(new Float32Array([1, 2, 3]));
    expect(t.get(0)).toBe(1);
    expect(t.get(1)).toBe(2);
    expect(t.get(2)).toBe(3);
    // Out of bounds indexing.
    expect(t.get(4)).toBeUndefined();

    // [[1, 2, 3]]
    t = Tensor.make([1, 3], [1, 2, 3]);
    expect(t instanceof Tensor2D).toBe(true);
    expect(t.rank).toBe(2);
    expect(t.size).toBe(3);
    expect(t.get(0, 0)).toBe(1);
    expect(t.get(0, 1)).toBe(2);
    expect(t.get(0, 2)).toBe(3);
    // Out of bounds indexing.
    expect(t.get(4)).toBeUndefined();

    // [[1, 2, 3],
    //  [4, 5, 6]]
    t = Tensor.make([2, 3], [1, 2, 3, 4, 5, 6]);
    expect(t instanceof Tensor2D).toBe(true);
    expect(t.rank).toBe(2);
    expect(t.size).toBe(6);
    expect(t.get(0, 0)).toBe(1);
    expect(t.get(0, 1)).toBe(2);
    expect(t.get(0, 2)).toBe(3);
    expect(t.get(1, 0)).toBe(4);
    expect(t.get(1, 1)).toBe(5);
    expect(t.get(1, 2)).toBe(6);
    // Out of bounds indexing.
    expect(t.get(5, 3)).toBeUndefined();

    // Shape mismatch with the values.
    expect(() => Tensor.make([1, 2], [1])).toThrowError();
  });

  it("Tensors of explicit size", () => {
    let t = new Tensor1D([5, 3, 2]);
    expect(t.rank).toBe(1);
    expect(t.shape).toEqual([3]);
    expect(t.get(1)).toBe(3);

    expect(() => new Tensor3D([1, 2, 3, 5], [1, 2]))
       .toThrowError("Shape should be of length 3");

    let t4 = new Tensor4D([1, 2, 1, 2], [1, 2, 3, 4]);
    expect(t4.get(0, 0, 0, 0)).toBe(1);
    expect(t4.get(0, 0, 0, 1)).toBe(2);
    expect(t4.get(0, 1, 0, 0)).toBe(3);
    expect(t4.get(0, 1, 0, 1)).toBe(4);

    let t4_like = Tensor.like(t4);
    // Change t4.
    t4.set(10, 0, 0, 0, 1);
    expect(t4.get(0, 0, 0, 1)).toBe(10);
    // Make suree t4_like hasn't changed.
    expect(t4_like.get(0, 0, 0, 1)).toBe(2);

    // Tensor of zeros.
    let z = Tensor.zeros([3, 4, 2]) as Tensor3D;
    expect(z.rank).toBe(3);
    expect(z.size).toBe(24);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        for (let k = 0; k < 2; k++) {
          expect(z.get(i, j, k)).toBe(0);
        }
      }
    }

    // Reshaping tensors.
    let a = Tensor.make([2, 3], [1, 2, 3, 4, 5, 6]);
    let b = a.reshape([3, 2, 1]);
    expect(a.get(1, 2)).toBe(6);

    // Modify the reshaped tensor.
    b.set(10, 2, 1, 0);
    // Make sure the original tensor is also modified.
    expect(a.get(1, 2)).toBe(10);
  });
});

describe("Operations", () => {
  it("ReLU", () => {
    let op = new ReLU();
    let x = Tensor.make([2, 3], [3, 0, -1, 2, 9, -5]);
    let y = op.feedForward(x);
    expect(y.values).toEqual(new Float32Array([3, 0, 0, 2, 9, 0]));
  });

  it("TanH", () => {
    let op = new TanH();
    let x = Tensor.make([3], [3, 0, -3]);
    let y = op.feedForward(x);
    expect(y.get(0)).toBeCloseTo(0.99505475, 6);
    expect(y.get(1)).toBeCloseTo(0, 6);
    expect(y.get(2)).toBeCloseTo(-0.99505475, 6);
  });

  it("Sigmoid", () => {
    let op = new Sigmoid();
    let x = Tensor.make([3], [3, 0, -3]);
    let y = op.feedForward(x);
    expect(y.get(0)).toBeCloseTo(0.9525741268, 6);
    expect(y.get(1)).toBeCloseTo(0.5, 6);
    expect(y.get(2)).toBeCloseTo(0.0474258731, 6);
  });

  it("Fully connected", () => {
    let weights = new Tensor2D([3, 2], [1, 4, 2, 3, 0, 2]);
    let op = new FC(3, 2, weights);
    let x = new Tensor1D([1, 2, 3]);
    let y = op.feedForward(x);
    expect(y.get(0)).toBe(5);
    expect(y.get(1)).toBe(16);

    // Weights don't match the input/output size.
    expect(() => new FC(2, 3, weights)).toThrowError();

    // Back prop.
    let dy = Tensor.make<Tensor1D>([2], [2, 3]);
    let dx = op.backProp(dy);
    expect(dx.get(0)).toBe(14);
    expect(dx.get(1)).toBe(13);
    expect(dx.get(2)).toBe(6);
    expect(op.numAccumulatedDers).toBe(1);
    expect(op.dW.get(0, 0)).toBe(x.get(0) * dy.get(0));
    expect(op.dW.get(2, 1)).toBe(x.get(2) * dy.get(1));

    // Run backprop again.
    op.backProp(dy);
    expect(op.dW.get(0, 0)).toBe(2 * x.get(0) * dy.get(0));
    expect(op.dW.get(2, 1)).toBe(2 * x.get(2) * dy.get(1));
    expect(op.numAccumulatedDers).toBe(2);

    // dy doesn't match the output size.
    dy = Tensor.zerosLike(x);
    expect(() => op.backProp(dy)).toThrowError();
  });

  it("Softmax", () => {
    let op = new Softmax();
    let y = op.feedForward(new Tensor1D([2, 1, 3]));
    expect(y.get(0)).toBeCloseTo(0.24472847, 6);
    expect(y.get(1)).toBeCloseTo(0.09003057, 6);
    expect(y.get(2)).toBeCloseTo(0.66524095, 6);
    expect(y.get(0) + y.get(1) + y.get(2)).toBeCloseTo(1, 6);

    // Overflow test.
    y = op.feedForward(new Tensor1D([10000, 10000]));
    expect(y.get(0)).toBeCloseTo(0.5, 6);
    expect(y.get(1)).toBeCloseTo(0.5, 6);

    // Underflow test.
    y = op.feedForward(new Tensor1D([-10000, -10000]));
    expect(y.get(0)).toBeCloseTo(0.5, 6);
    expect(y.get(1)).toBeCloseTo(0.5, 6);

    // Back prop.
    let dy = new Tensor1D([1, 2]);
    y = op.feedForward(new Tensor1D([1, 2]));
    let dx = op.backProp(dy);
    expect(dx.get(0)).toBeCloseTo(
      dy.get(0) * y.get(0) * (1 - y.get(0)) +
      dy.get(1) * y.get(1) * (0 - y.get(0))
    , 6);
    expect(dx.get(1)).toBeCloseTo(
      dy.get(0) * y.get(0) * (0 - y.get(1)) +
      dy.get(1) * y.get(1) * (1 - y.get(1))
    , 6);

    // Huge difference between probabilities.
    y = op.feedForward(new Tensor1D([-10000, +10000]));
    expect(y.get(0)).toBeCloseTo(0.0, 6);
    expect(y.get(1)).toBeCloseTo(1, 6);
  });

  it("Softmax with cross entropy", () => {
    // Verify that when having softmax + cross entropy,
    // dE/dx = y - t, which is the theoretical result.
    let x = new Tensor1D([1, 2, 3]);
    let softmax = new Softmax();
    let logits = softmax.feedForward(x);
    let cost = new CrossEntropyCost();
    let target = new Tensor1D([0.3, 0.6, 0.1]);
    let dy = cost.backProp(logits, target);
    let dx = softmax.backProp(dy);

    expect(dx.get(0)).toBeCloseTo(logits.get(0) - target.get(0), 6);
    expect(dx.get(1)).toBeCloseTo(logits.get(1) - target.get(1), 6);
    expect(dx.get(2)).toBeCloseTo(logits.get(2) - target.get(2), 6);
  });
});