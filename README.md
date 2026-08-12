## 📌 Project Overview

**TensorFlow Playground** (also known as *Deep Playground*) is a browser-based, interactive visualization tool for understanding how neural networks learn. You can configure layers, neurons, activation functions, learning rates, and datasets — all in real time, directly in your browser.

It was built to make neural networks more approachable and intuitive for learners and practitioners alike, with zero setup required.

> 🎯 **Goal:** Demystify neural networks through live, interactive experimentation — no code needed.

> ⚠️ **Disclaimer:** This is **not an official Google product**. It is an open-source project maintained by the community under the Apache 2.0 License.

---

## 🤝 Contributing

Contributions are welcome! We use **GitHub Issues** for tracking new feature requests and bugs — your feedback is highly appreciated.

**Before submitting a PR, please review the [Contribution Guidelines](CONTRIBUTING.md).**

Steps to contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add: your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## ✨ Features

- 🔵🟠 **Color-coded weights & activations** — orange = negative, blue = positive
- 🧩 **Configurable architecture** — add/remove layers and neurons on the fly
- ⚙️ **Tunable hyperparameters** — learning rate, regularization, activation functions
- 📊 **Multiple datasets** — circle, XOR, Gaussian, spiral
- 🔁 **Real-time training loop** — watch the decision boundary evolve epoch by epoch
- 🔗 **Shareable URLs** — save your exact configuration and share it

---

## 🔄 How It Works

```
Select Dataset → Configure Architecture → Set Hyperparameters → Train → Observe Decision Boundary
```

1️⃣ **Dataset Selection** — Choose from 4 toy datasets (Circle, XOR, Gaussian, Spiral) with adjustable noise and train/test split.

2️⃣ **Network Architecture** — Drag to add/remove hidden layers and neurons. Choose input features (X₁, X₂, X₁², X₂², X₁X₂, sin(X₁), sin(X₂)).

3️⃣ **Hyperparameter Config** — Set learning rate, activation function (ReLU, Tanh, Sigmoid, Linear), regularization type (L1/L2) and rate.

4️⃣ **Training** — Hit ▶ to start. Weights update in real time using backpropagation. The output plane visualizes the learned decision boundary live.

5️⃣ **Evaluation** — Monitor train loss and test loss as training progresses. Experiment to see how overfitting and underfitting look in practice.

---

## 🗂️ Repository Structure

```
playground/
│
├── src/                    # TypeScript source files
│   ├── playground.ts       # Main entry — UI wiring & training loop
│   ├── nn.ts               # Tiny neural network library (forward + backprop)
│   ├── dataset.ts          # Dataset generators (circle, XOR, Gaussian, spiral)
│   ├── heatmap.ts          # D3-based heatmap renderer
│   └── state.ts            # App state management & URL serialization
│
├── dist/                   # Compiled & bundled output (served via gh-pages)
├── css/                    # Stylesheets
├── index.html              # Main HTML entry point
├── package.json            # Node dependencies & npm scripts
├── tsconfig.json           # TypeScript config
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js ≥ 14.x
- npm

### Run Locally

```bash
# Clone the repo
git clone https://github.com/tensorflow/playground.git
cd playground

# 1. Install dependencies
npm i

# 2. Compile the app into the dist/ directory
npm run build

# 3. Serve from dist/ and open in browser
npm run serve
```

### ⚡ Fast Dev Mode (Hot Reload)

For a faster edit-refresh cycle during development:

```bash
npm run serve-watch
```

This starts an HTTP server and **automatically re-compiles** TypeScript, HTML, and CSS files on every save — no manual rebuild needed.

Open `http://localhost:8080` in your browser.

### 🚢 For Owners — Push to Production

```bash
git subtree push --prefix dist origin gh-pages
```

This deploys the compiled `dist/` directory directly to GitHub Pages.

---

## 🧠 Key Concepts Demonstrated

- **Forward propagation** — how inputs flow through layers to produce a prediction
- **Backpropagation** — how gradients flow backward to update weights
- **Activation functions** — how ReLU, Tanh, and Sigmoid affect learning dynamics
- **Regularization** — L1 vs L2 and their effect on weight magnitude and sparsity
- **Overfitting** — visible when test loss diverges from train loss
- **Feature engineering** — how non-linear input features help separate complex boundaries
- **Learning rate sensitivity** — too high = divergence, too low = slow convergence

---

## 🛠️ Tech Stack

| Tool | Role |
|:---|:---|
| **TypeScript** | Core application logic and neural network implementation |
| **D3.js** | Real-time data visualization and SVG rendering |
| **Node.js / npm** | Build tooling and dependency management |
| **GitHub Pages** | Static hosting for the live demo |

---

## 📚 Further Reading

- [Neural Networks and Deep Learning](http://neuralnetworksanddeeplearning.com/) — Michael Nielsen
- [Deep Learning](https://www.deeplearningbook.org/) — Goodfellow, Bengio & Courville
- [Chris Olah's articles on neural networks](https://colah.github.io/)
- [TensorFlow — for real-world ML](https://tensorflow.org)

---
