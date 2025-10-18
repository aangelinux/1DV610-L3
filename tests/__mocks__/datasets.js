export class MockDatasetConfig {
	#API = {
		"Population": "",
		"GDP per capita": "",
		"Emissions (CO2)": ""
	}

	#FILES = {
		"Population": "",
		"GDP per capita": "",
		"Emissions (CO2)": ""
	}


	#SCALES = {
		"Population": 1000,
		"GDP per capita": 1,
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