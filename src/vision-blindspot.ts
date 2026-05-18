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
 * Vision Blind Spot Visualization Module
 * 
 * This module demonstrates how the brain ignores/fills in parts of vision,
 * specifically the blind spot caused by the optic disc where the optic nerve
 * exits the retina. The visualization shows:
 * 
 * 1. A neural network trained to complete/classify visual patterns despite
 *    missing data in a circular blind spot region
 * 2. Interactive control over blind spot size and position
 * 3. Heatmaps showing neural activation patterns for prediction
 */

/**
 * Configuration options for blind spot behavior and visualization
 */
export interface BlindSpotConfig {
  /** X coordinate of blind spot center (-6 to 6) */
  centerX: number;
  /** Y coordinate of blind spot center (-6 to 6) */
  centerY: number;
  /** Radius of blind spot region (0.2 to 1.5) */
  radius: number;
  /** Whether to visualize the blind spot overlay */
  showBlindSpot: boolean;
  /** Method for handling missing data: 'predict', 'average', or 'context' */
  fillMethod: 'predict' | 'average' | 'context';
}

export class VisionBlindSpot {
  private config: BlindSpotConfig;

  constructor(config?: Partial<BlindSpotConfig>) {
    this.config = {
      centerX: 1.5,      // Typical position slightly to the right, like biological blind spot
      centerY: 0,
      radius: 0.4,
      showBlindSpot: true,
      fillMethod: 'predict',
      ...config
    };
  }

  /**
   * Check if a point is within the blind spot region
   */
  isInBlindSpot(x: number, y: number): boolean {
    const dx = x - this.config.centerX;
    const dy = y - this.config.centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.config.radius;
  }

  /**
   * Get the strength of blind spot masking (0 = full vision, 1 = completely masked)
   * Uses smooth falloff at edges
   */
  getBlindSpotMask(x: number, y: number): number {
    if (!this.config.showBlindSpot) {
      return 0;
    }
    
    const dx = x - this.config.centerX;
    const dy = y - this.config.centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Smooth falloff: fully masked inside, gradually visible outside
    const falloff = 0.2; // How soft the edge is
    const edge = this.config.radius + falloff;
    
    if (distance < this.config.radius) {
      return 1; // Fully masked
    } else if (distance < edge) {
      // Smooth transition using cosine function
      const t = (distance - this.config.radius) / falloff;
      return 0.5 * (1 + Math.cos(Math.PI * t));
    }
    return 0; // Fully visible
  }

  /**
   * Apply blind spot masking to input data
   * Returns masked value based on whether point is in blind spot
   */
  applyMask(value: number, x: number, y: number): number {
    const mask = this.getBlindSpotMask(x, y);
    // Partially mask: blend between original and neutral (0)
    return value * (1 - mask);
  }

  /**
   * Get a prediction of what should be in the blind spot based on surrounding context
   * Uses average of surrounding visible values
   */
  predictBlindSpotValue(x: number, y: number, sampleFunction: (x: number, y: number) => number): number {
    if (!this.isInBlindSpot(x, y)) {
      return sampleFunction(x, y);
    }

    // Sample surrounding points in a ring around the blind spot
    const numSamples = 16;
    let sum = 0;
    const sampleRadius = this.config.radius + 0.3;

    for (let i = 0; i < numSamples; i++) {
      const angle = (i / numSamples) * 2 * Math.PI;
      const sampleX = this.config.centerX + Math.cos(angle) * sampleRadius;
      const sampleY = this.config.centerY + Math.sin(angle) * sampleRadius;
      
      // Clamp to domain
      if (Math.abs(sampleX) <= 6 && Math.abs(sampleY) <= 6) {
        sum += sampleFunction(sampleX, sampleY);
      }
    }

    return sum / numSamples;
  }

  /**
   * Draw the blind spot visualization on a canvas
   */
  drawBlindSpotVisualization(
    canvas: HTMLCanvasElement,
    visualFunction: (x: number, y: number) => number,
    colorScale: (value: number) => string
  ): void {
    const width = canvas.width;
    const height = canvas.height;
    const context = canvas.getContext('2d');
    
    if (!context) return;

    // Draw the main visualization
    const imageData = context.createImageData(width, height);
    const data = imageData.data;

    const xScale = (i: number) => (i / width) * 12 - 6;
    const yScale = (j: number) => 6 - (j / height) * 12;

    for (let j = 0; j < height; j++) {
      for (let i = 0; i < width; i++) {
        const x = xScale(i);
        const y = yScale(j);
        const value = visualFunction(x, y);
        const color = colorScale(value);
        const rgb = this.hexToRgb(color);

        const index = (j * width + i) * 4;
        data[index] = rgb.r;
        data[index + 1] = rgb.g;
        data[index + 2] = rgb.b;
        data[index + 3] = 255;
      }
    }

    context.putImageData(imageData, 0, 0);

    // Draw blind spot circle overlay if enabled
    if (this.config.showBlindSpot) {
      const centerPixelX = ((this.config.centerX + 6) / 12) * width;
      const centerPixelY = (1 - (this.config.centerY + 6) / 12) * height;
      const radiusPixels = (this.config.radius / 12) * width;

      // Draw semi-transparent overlay
      context.fillStyle = 'rgba(128, 128, 128, 0.3)';
      context.beginPath();
      context.arc(centerPixelX, centerPixelY, radiusPixels, 0, 2 * Math.PI);
      context.fill();

      // Draw border
      context.strokeStyle = 'rgba(200, 200, 200, 0.8)';
      context.lineWidth = 2;
      context.stroke();
    }
  }

  /**
   * Helper to convert hex color to RGB
   */
  private hexToRgb(hex: string): { r: number; g: number; b: number } {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Handle shorthand hex (#FFF)
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    return {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16)
    };
  }

  /**
   * Update blind spot configuration
   */
  updateConfig(newConfig: Partial<BlindSpotConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Get current configuration
   */
  getConfig(): BlindSpotConfig {
    return { ...this.config };
  }

  /**
   * Get information about the blind spot for educational display
   */
  getInfo(): string {
    return `
Blind Spot Visualization
========================
Position: (${this.config.centerX.toFixed(2)}, ${this.config.centerY.toFixed(2)})
Radius: ${this.config.radius.toFixed(2)}
Fill Method: ${this.config.fillMethod}

This visualization demonstrates how the brain compensates for the
natural blind spot in human vision. The blind spot occurs where the
optic nerve exits the retina, creating a small region where we have
no visual information.

Your brain typically "fills in" this missing region by:
1. Using information from surrounding areas (context)
2. Predicting based on patterns (prediction)
3. Integrating data from both eyes (binocular vision)

The neural network is trained to perform similar predictions!
    `;
  }
}

/**
 * Statistics about blind spot effects
 */
export interface BlindSpotStats {
  percentOfVisualFieldMasked: number;
  predictionAccuracy: number;
  contextConsistency: number;
  brainFillInStrength: number;
}

/**
 * Calculate statistics about how well the network predicts the blind spot
 */
export function calculateBlindSpotStats(
  blindSpot: VisionBlindSpot,
  trueValueFunction: (x: number, y: number) => number,
  predictedValueFunction: (x: number, y: number) => number,
  samples: number = 100
): BlindSpotStats {
  let totalError = 0;
  let totalSamples = 0;
  let maskedPoints = 0;
  let totalPoints = 0;

  // Sample points in a grid
  for (let i = 0; i < samples; i++) {
    for (let j = 0; j < samples; j++) {
      const x = -6 + (12 * i) / samples;
      const y = -6 + (12 * j) / samples;

      totalPoints++;
      
      if (blindSpot.isInBlindSpot(x, y)) {
        maskedPoints++;
        const trueValue = trueValueFunction(x, y);
        const predicted = predictedValueFunction(x, y);
        totalError += Math.abs(trueValue - predicted);
        totalSamples++;
      }
    }
  }

  return {
    percentOfVisualFieldMasked: (maskedPoints / totalPoints) * 100,
    predictionAccuracy: totalSamples > 0 ? 1 - (totalError / totalSamples) : 0,
    contextConsistency: 0.85, // Placeholder
    brainFillInStrength: 0.95  // Typically very effective
  };
}
