/**
 * @module Filters through datasets and saves data that matches the key.
 */

export class DataFilter {
	#filterConfig

	constructor(filterConfig) {
		this.#filterConfig = filterConfig
	}

	filter(data, key) {
		let filteredData = []
		const filter = this.#filterConfig.filters[key]

		filter.forEach((country) => {
			const match = this.#findMatch(data, country)
			if (match) {
				filteredData.push(match)
			}
		})

		return filteredData
	}

	#findMatch(data, country) {
		for (const object of data) {
			if (this.#isMatch(object, country)) {
				return object
			}
		}
	}

	#isMatch(object, country) { 
		const objectCountry = object["country"]
		const objectCountryName = objectCountry["value"]
		
		return objectCountryName === country
	}
}
