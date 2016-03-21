# Deep playground

Deep playground is an interactive visualization of neural networks, written in typescript using d3.js.
We use github issues for tracking new requests and bugs. Your feedback is highly appreciated!

## Development

To run the visualization locally, first run `npm install` to install the development dependencies.
Then run `npm run watch` to start a watcher that automatically compiles the typescript files to a bundled js,
whenever they change. Finally, run `npm run serve` which starts an HTTP server serving all files in the `public` folder.
To see the visualization, visit `http://localhost:8080/` on your browser.
To produce a minified javascript file for production, run `npm run build`.

This is not an official Google product.
