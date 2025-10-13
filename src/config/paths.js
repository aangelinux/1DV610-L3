/**
 * @module Stores paths to static files and external APIs.
 */

export class PathConfig {
	#FILES = {
		"Population": "/data/population.json",
		"GDP": "/data/gdp.json",
		"Emissions (CO2)": "/data/emissions.json"
	}

	#API = {
	}

	constructor() {
	}

	get files() {
		return this.#FILES
	}
}