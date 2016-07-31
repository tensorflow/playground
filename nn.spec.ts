import {Tensor, Tensor1D, Tensor3D, Tensor4D} from "./nn";

describe("Tensor", () => {
  it("Tensors of arbitrary size", () => {
    // [1, 2, 3]
    let t = new Tensor([3], new Float32Array([1, 2, 3]));
    expect(t.rank).toBe(1);
    expect(t.size).toBe(3);
    expect(t.values).toEqual(new Float32Array([1, 2, 3]));
    expect(t.get(0)).toBe(1);
    expect(t.get(1)).toBe(2);
    expect(t.get(2)).toBe(3);
    // Out of bounds indexing.
    expect(t.get(0, 0)).toBeUndefined();

    // [[1, 2, 3]]
    t = new Tensor([1, 3], new Float32Array([1, 2, 3]));
    expect(t.rank).toBe(2);
    expect(t.size).toBe(3);
    expect(t.get(0, 0)).toBe(1);
    expect(t.get(0, 1)).toBe(2);
    expect(t.get(0, 2)).toBe(3);
    // Out of bounds indexing.
    expect(t.get(0, 0, 0)).toBeUndefined();

    // [[1, 2, 3],
    //  [4, 5, 6]]
    t = new Tensor([2, 3], new Float32Array([1, 2, 3, 4, 5, 6]));
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
    expect(() => new Tensor([1, 2], new Float32Array([1]))).toThrowError();
  });

  it("Tensors of explicit size", () => {
    let t = new Tensor1D([3], new Float32Array([5, 3, 2]));
    expect(t.rank).toBe(1);
    expect(t.shape).toEqual([3]);
    expect(t.get(1)).toBe(3);

    // Size mismatch.
    expect(() => new Tensor1D([1, 2], new Float32Array([1, 2])))
      .toThrowError("Shape should be of length 1");

    expect(() => new Tensor3D([1, 2, 3, 5], new Float32Array([1, 2])))
       .toThrowError("Shape should be of length 3");

    let t4 = new Tensor4D([1, 2, 1, 2], new Float32Array([1, 2, 3, 4]));
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
  });
});

describe("1D Tensor", () => {
});