/**
 * @module Configures available datasets.
 */

export class DatasetConfig {
	#DATASETS = {  // Fix
		Population: "Population",
		GDP: "GDP per capita",
		Emissions: "Emissions (CO2)"
	}

	#API = {
		"Population": "https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?format=json&date=2023&per_page=300",
		"GDP per capita": "https://api.worldbank.org/v2/country/all/indicator/NY.GDP.PCAP.CD?format=json&date=2023&per_page=300",
		"Emissions (CO2)": "https://api.worldbank.org/v2/country/all/indicator/EN.GHG.CO2.MT.CE.AR5?format=json&date=2023&per_page=300"
	}

	#FILES = {  // Backup if API fails
		"Population": "/data/population.json",
		"GDP per capita": "/data/gdp.json",
		"Emissions (CO2)": "/data/emissions.json"
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