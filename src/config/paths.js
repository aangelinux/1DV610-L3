/**
 * @module Configures paths to static files and external APIs.
 */

export class PathConfig {
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

	constructor() {
	}

	get api() {
		return this.#API
	}

	get files() {
		return this.#FILES
	}
}