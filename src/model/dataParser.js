/**
 * @module Defines logic for parsing raw data into usable objects.
 */

import { RegionConfig } from "../config/regions"

export class DataParser {
	#regionConfig
	#scale = 100000 // divide data values by

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
			if (match && this.#isMatch(match, element)) {
				return this.#parseToObject(match, element)
			}
		}
	}

	#isMatch(match, element) { 
		// Check if match is the exact one before proceeding
		// because some region names include country names (ie Middle East, North Africa, Afghanistan)
		const input = match.input
		const parsedInput = JSON.parse(input)
		const country = parsedInput["country"]
		const name = country["value"]
		if (name !== element) {
			return false
		}
		return true
	}

	#parseToObject(data) {
		const input = data.input // Contains the name and value
		const parsedInput = JSON.parse(input)
		const country = parsedInput["country"]
		const name = country["value"]

		const value = parsedInput["value"]		
		if (value === "NA") {
			return  // Don't include countries without data
		}

		console.log(parsedInput, name, value)
		const valueInMillions = parseInt((value / this.#scale).toFixed())
		return { name, value: valueInMillions }
	}
}