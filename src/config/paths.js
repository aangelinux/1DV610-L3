/**
 * @module Stores paths to static files and external APIs.
 */

export class PathConfig {
	#FILES = {
		"Population": "/data/population.json",
		"GDP": "",
		"Emissions": ""
	}

	#API = {
	}

	constructor() {
	}

	get files() {
		return this.#FILES
	}
}