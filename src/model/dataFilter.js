/**
 * @module Filters through datasets to find data matching the filter key.
 */

export class DataFilter {
	#filterConfig

	constructor(filterConfig) {
		this.#filterConfig = filterConfig
	}

	filter(data, filterKey) {
		let filteredData = []
		const region = this.#filterConfig.regions[filterKey]

		region.forEach((country) => {
			const match = this.#findMatch(data, country)
			if (match) {
				filteredData.push(match)
			}
		})

		return filteredData
	}

	#findMatch(data, country) {
		for (const object of data) {
			const match = JSON.stringify(object).match(country)
			if (match && this.#isMatch(match, country)) {
				return match
			}
		}
	}

	// Check if match is the correct one before proceeding
	// because some region names include countries
	// eg "Middle East, North Africa, Afghanistan & Pakistan"
	#isMatch(match, country) { 
		const input = match.input
		const inputObject = JSON.parse(input)
		const inputCountry = inputObject["country"]
		const countryName = inputCountry["value"]

		if (countryName === country) {
			return true
		}
		return false
	}
}
