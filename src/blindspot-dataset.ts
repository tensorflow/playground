/* Copyright 2016 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
Limitations under the License.
==============================================================================*/

/**
 * Blind Spot Dataset Module
 * 
 * Provides dataset generation functions that apply blind spot masking
 * to demonstrate how neural networks learn to predict missing visual information.
 */

import {Example2D} from "./dataset";
import {VisionBlindSpot} from "./vision-blindspot";

/**
 * Configuration for blind spot dataset generation
 */
export interface BlindSpotDatasetConfig {
  /** The blind spot instance to apply masking with */
  blindSpot: VisionBlindSpot;
  /** Base dataset generator function */
  baseDatasetGenerator: (numSamples: number, noiseLevel: number) => Example2D[];
}

/**
 * Applies a gradient mask to blind spot with blending strategy.
 * Returns a dataset where:
 * - Points outside blind spot: original labels
 * - Points inside blind spot: gradually masked from edges to center
 * - 40% of masked data is included for learning
 * 
 * This strategy allows the network to learn patterns from surrounding context
 * while still having some examples of masked data to understand what's missing.
 */
export function applyGradientBlindSpotMask(
  config: BlindSpotDatasetConfig,
  numSamples: number,
  noiseLevel: number
): Example2D[] {
  const baseData = config.baseDatasetGenerator(numSamples, noiseLevel);
  
  return baseData.map(point => {
    const maskStrength = config.blindSpot.getBlindSpotMask(point.x, point.y);
    
    // Apply gradient masking: strong masking at center, weak at edges
    // This creates a smooth transition zone
    return {
      x: point.x,
      y: point.y,
      label: point.label * (1 - maskStrength)
    };
  });
}

/**
 * Blend original and masked datasets for better training.
 * Creates a mix of fully visible and masked data, helping the network
 * learn both the original patterns and how to predict masked regions.
 * 
 * @param originalData - Original unmasked dataset
 * @param maskedData - Gradient-masked dataset
 * @param maskRatio - Ratio of masked data (0-1). Default 0.4 means 40% masked, 60% original
 * @returns Combined dataset with blend of both
 */
export function blendDatasets(
  originalData: Example2D[],
  maskedData: Example2D[],
  maskRatio: number = 0.4
): Example2D[] {
  if (maskRatio < 0 || maskRatio > 1) {
    throw new Error('maskRatio must be between 0 and 1');
  }
  
  if (originalData.length !== maskedData.length) {
    throw new Error('Original and masked datasets must have the same length');
  }

  const numMasked = Math.floor(originalData.length * maskRatio);
  const result: Example2D[] = [];
  
  // Add original data first
  result.push(...originalData.slice(0, originalData.length - numMasked));
  
  // Add masked data
  result.push(...maskedData.slice(maskedData.length - numMasked));
  
  return result;
}

/**
 * Generate statistics about how the blind spot affects the dataset
 * 
 * @param config - Blind spot configuration
 * @param dataset - Dataset to analyze
 * @returns Statistics object with masking information
 */
export function getBlindSpotDatasetStats(
  config: BlindSpotDatasetConfig,
  dataset: Example2D[]
): {
  totalPoints: number;
  maskedPoints: number;
  percentMasked: number;
  avgLabelMagnitudeUnmasked: number;
  avgLabelMagnitudeMasked: number;
} {
  if (!dataset || dataset.length === 0) {
    throw new Error('Dataset must not be empty');
  }

  let maskedCount = 0;
  let unmaskedCount = 0;
  let maskedLabelSum = 0;
  let unmaskedLabelSum = 0;

  for (const point of dataset) {
    if (config.blindSpot.isInBlindSpot(point.x, point.y)) {
      maskedCount++;
      maskedLabelSum += Math.abs(point.label);
    } else {
      unmaskedCount++;
      unmaskedLabelSum += Math.abs(point.label);
    }
  }

  return {
    totalPoints: dataset.length,
    maskedPoints: maskedCount,
    percentMasked: (maskedCount / dataset.length) * 100,
    avgLabelMagnitudeUnmasked: unmaskedCount > 0 ? unmaskedLabelSum / unmaskedCount : 0,
    avgLabelMagnitudeMasked: maskedCount > 0 ? maskedLabelSum / maskedCount : 0
  };
}
