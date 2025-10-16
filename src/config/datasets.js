/**
 * @module Configures scales of and paths to datasets.
 */

export class DatasetConfig {
	#API = {
		"Population": "https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?format=json&date=2023&per_page=300",
		"GDP": "https://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CD?format=json&date=2023&per_page=300",
		"Emissions (CO2)": "https://api.worldbank.org/v2/country/all/indicator/EN.GHG.CO2.MT.CE.AR5?format=json&date=2023&per_page=300"
	}

	#FILES = {
		"Population": "/data/population.json",
		"GDP": "/data/gdp.json",
		"Emissions (CO2)": "/data/emissions.json"
	}

	#SCALES = {
		"Population": 1000,
		"GDP": 10000000,  // 10 million
		"Emissions (CO2)": 1
	}

	constructor() {
	}

	get api() {
		return this.#API
	}

	get files() {
		return this.#FILES
	}

	get scales() {
		return this.#SCALES
	}
}