/**
 * @module Defines logic for parsing raw data into usable objects.
 */

import { RegionConfig } from "../config/regions"

export class DataParser {
	#regex = /[^:_"a-z][,0-9]+/gm // Matches with digits only
	#regionConfig

	constructor() {
		this.#regionConfig = new RegionConfig()
	}

	/**
	 * Parses raw datasets into usable data objects.
	 * 
	 * @param {object} data containing the dataset.
	 * @param {string} filter the region to filter the data by. 
	 * @returns {Array} containing data objects with name and value.
	 */
	parse(data, filter) {
		const parsedData = this.#createArrayOf(data, filter)
		return parsedData
	}

	#createArrayOf(data, filter) {
		let dataArray = []
		const chosenFilter = this.#regionConfig.regions[filter]

		chosenFilter.forEach((element) => {
			let matchingObject = this.#findMatch(element, data)
			if (matchingObject) {
				dataArray.push(matchingObject)
			}
		})

		return dataArray
	}

	#findMatch(element, rawData) {
		for (const dataObject of rawData) {
			// Data needs to be same type as the element (string) to match
			const match = JSON.stringify(dataObject).match(element) 
			if (match) {
				return this.#parseToObject(match)
			}
		}
	}

	#parseToObject(data) {
		const input = data.input // Contains the name and value
		const parsedInput = JSON.parse(input)
		const name = parsedInput["name"]
		const stringValue = parsedInput["value"]
		if (stringValue === "NA") {
			return  // Don't include countries without data
		}

		// Remove everything that isn't a digit or parsing wont work
		const trimmedValue = parsedInput["value"].trim().replaceAll(",", "")
		const value = parseInt(trimmedValue)

		return { name, value }
	}

	#sanitizeValue(stringValue) {
		
	}
}