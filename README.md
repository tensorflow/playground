# Deep playground

Deep playground is an interactive visualization of neural networks, written in typescript using d3.js.
We use github issues for tracking new requests and bugs. Your feedback is highly appreciated!

**If you'd like to contribute, be sure to review the [contribution
guidelines](CONTRIBUTING).**

## Development

To run the visualization locally you just need a server to serve all the files from the `dist` directory. You can run `npm install` then `npm run serve` if you don't have one handy. To see the visualization, visit `http://localhost:8080/` on your browser.

When developing, use `npm run serve-watch`. This will start a static server and also watchers to automatically compile the typescript, html and css files
whenever they change.

To produce a minified javascript file for production, run `npm run build`.

To push to production: `git subtree push --prefix dist origin gh-pages`.

This is not an official Google product.

## Cloud Development

Create a free development environment for this neural network project in the cloud on [Nitrous.io](https://www.nitrous.io) by clicking the button below.

<a href="https://www.nitrous.io/quickstart">
  <img src="https://nitrous-image-icons.s3.amazonaws.com/quickstart.png" alt="Nitrous Quickstart" width=142 height=34>
</a>

In the IDE, start Tensorflow Playground via `Run > Start Tensorflow Playground` and access your site via `Preview > 8080`.
