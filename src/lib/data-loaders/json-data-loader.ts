/**
 * Centralized JSON Data Loader
 *
 * This module provides a unified way to load JSON data files with consistent
 * error handling and type safety across the application.
 */

import fs from 'fs/promises';
import path from 'path';

/**
 * Generic JSON data loader with error handling
 *
 * @param fileName - Name of the JSON file (e.g., 'backpacking.json', 'wedding.json')
 * @param dataPath - Optional custom path relative to public/data (default: '')
 * @returns Parsed JSON data or null if file doesn't exist or parsing fails
 *
 * @example
 * ```ts
 * const data = await loadJsonData<BackpackingData>('backpacking.json');
 * if (data) {
 *   // Use data
 * }
 * ```
 */
export async function loadJsonData<T>(
  fileName: string,
  dataPath: string = ''
): Promise<T | null> {
  try {
    const filePath = path.join(
      process.cwd(),
      'public/data',
      dataPath,
      fileName
    );
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent) as T;
  } catch (error) {
    console.error(`Error loading ${fileName}:`, error);
    return null;
  }
}

/**
 * Synchronous version of JSON data loader (for use in non-async contexts)
 *
 * @param fileName - Name of the JSON file
 * @param dataPath - Optional custom path relative to public/data
 * @returns Parsed JSON data or null if file doesn't exist or parsing fails
 */
export function loadJsonDataSync<T>(
  fileName: string,
  dataPath: string = ''
): T | null {
  try {
    const filePath = path.join(
      process.cwd(),
      'public/data',
      dataPath,
      fileName
    );
    const fileContent = require('fs').readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent) as T;
  } catch (error) {
    console.error(`Error loading ${fileName}:`, error);
    return null;
  }
}

// Removed specialized loaders - use loadJsonData directly with type parameters
