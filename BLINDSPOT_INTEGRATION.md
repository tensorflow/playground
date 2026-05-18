/* Vision Blind Spot Integration Module
 * 
 * This code should be added to src/playground.ts to integrate blind spot controls
 * Place this near the top of the file after imports and before makeGUI()
 */

// ============================================================================
// BLIND SPOT INTEGRATION ADDITIONS
// ============================================================================

// Add these imports at the top of playground.ts:
// import {VisionBlindSpot} from "./vision-blindspot";
// import {applyGradientBlindSpotMask, BlindSpotDatasetConfig} from "./blindspot-dataset";

// Add these global variables after the player and lineChart declarations:
let blindSpot: VisionBlindSpot = new VisionBlindSpot({
  centerX: 1.5,
  centerY: 0,
  radius: 0.4,
  showBlindSpot: false,
  fillMethod: 'predict'
});

let blindSpotEnabled = false;

// Add this function to handle blind spot checkbox:
function setupBlindSpotControls() {
  // Enable/disable blind spot
  d3.select("#enable-blindspot").on("change", function() {
    blindSpotEnabled = this.checked;
    blindSpot.updateConfig({ showBlindSpot: blindSpotEnabled });
    generateData();
    parametersChanged = true;
    reset();
  });
  d3.select("#enable-blindspot").property("checked", blindSpotEnabled);

  // Blind spot size slider
  let blindSpotSizeSlider = d3.select("#blindSpotSize").on("input", function() {
    let size = +this.value;
    d3.select("label[for='blindSpotSize'] .value").text(size.toFixed(2));
    blindSpot.updateConfig({ radius: size });
    if (blindSpotEnabled) {
      generateData();
      parametersChanged = true;
      reset();
    }
  });
  blindSpotSizeSlider.property("value", blindSpot.getConfig().radius);
  d3.select("label[for='blindSpotSize'] .value").text(blindSpot.getConfig().radius.toFixed(2));

  // Blind spot X position slider
  let blindSpotXSlider = d3.select("#blindSpotX").on("input", function() {
    let x = +this.value;
    d3.select("label[for='blindSpotX'] .value").text(x.toFixed(2));
    blindSpot.updateConfig({ centerX: x });
    if (blindSpotEnabled) {
      generateData();
      parametersChanged = true;
      reset();
    }
  });
  blindSpotXSlider.property("value", blindSpot.getConfig().centerX);
  d3.select("label[for='blindSpotX'] .value").text(blindSpot.getConfig().centerX.toFixed(2));

  // Blind spot Y position slider
  let blindSpotYSlider = d3.select("#blindSpotY").on("input", function() {
    let y = +this.value;
    d3.select("label[for='blindSpotY'] .value").text(y.toFixed(2));
    blindSpot.updateConfig({ centerY: y });
    if (blindSpotEnabled) {
      generateData();
      parametersChanged = true;
      reset();
    }
  });
  blindSpotYSlider.property("value", blindSpot.getConfig().centerY);
  d3.select("label[for='blindSpotY'] .value").text(blindSpot.getConfig().centerY.toFixed(2));

  // Blind spot fill method dropdown
  d3.select("#blindSpotFill").on("change", function() {
    let method = this.value as 'predict' | 'average' | 'context';
    blindSpot.updateConfig({ fillMethod: method });
    if (blindSpotEnabled) {
      generateData();
      parametersChanged = true;
      reset();
    }
  });
  d3.select("#blindSpotFill").property("value", blindSpot.getConfig().fillMethod);
}

// Modify the generateData function to apply blind spot masking:
// Replace the existing generateData function body with this enhanced version
function generateDataWithBlindSpot(firstTime = false) {
  if (!firstTime) {
    state.seed = Math.random().toFixed(5);
    state.serialize();
    userHasInteracted();
  }
  Math.seedrandom(state.seed);
  let numSamples = (state.problem === Problem.REGRESSION) ?
      NUM_SAMPLES_REGRESS : NUM_SAMPLES_CLASSIFY;
  let generator = state.problem === Problem.CLASSIFICATION ?
      state.dataset : state.regDataset;
  let data = generator(numSamples, state.noise / 100);
  
  // Apply blind spot masking if enabled
  if (blindSpotEnabled) {
    data = applyGradientBlindSpotMask({
      blindSpot: blindSpot,
      baseDatasetGenerator: generator
    }, numSamples, state.noise / 100);
  }
  
  shuffle(data);
  let splitIndex = Math.floor(data.length * state.percTrainData / 100);
  trainData = data.slice(0, splitIndex);
  testData = data.slice(splitIndex);
  heatMap.updatePoints(trainData);
  heatMap.updateTestPoints(state.showTestData ? testData : []);
}

// Add this line to makeGUI() after all other setup:
// setupBlindSpotControls();

// ============================================================================
// END BLIND SPOT INTEGRATION
// ============================================================================

/* INSTRUCTIONS FOR INTEGRATION:

1. At the top of src/playground.ts, add these imports:
   import {VisionBlindSpot} from "./vision-blindspot";
   import {applyGradientBlindSpotMask, BlindSpotDatasetConfig} from "./blindspot-dataset";

2. After the line: let lineChart = new AppendingLineChart(...)
   Add the global variables above

3. In the makeGUI() function, after all existing setup, call:
   setupBlindSpotControls();

4. Replace the existing generateData() function call in the code with 
   generateDataWithBlindSpot() or modify generateData() to use the 
   blind spot logic shown in generateDataWithBlindSpot()

5. Make sure the import of Problem type is available:
   import {Problem} from "./state";

After these changes, rebuild with: npm run build
Then test with: npm run serve
*/
