/**
 * @module Stores file paths.
 * @file src/config/files.js
 */

export class FileConfig {
	#DATASET_FILES = {
		"Population": "/data/population.json",
		"GDP": "",
		"Emissions": ""
	}

	constructor() {
	}

	get dataset_files() {
		return this.#DATASET_FILES
	}
}