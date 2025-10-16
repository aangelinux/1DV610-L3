/**
 * @module Defines logic for parsing raw data into usable objects.
 */

import { FilterConfig } from "../config/filters.js"
import { DatasetConfig } from "../config/datasets.js"

export class DataParser {
	#filterConfig
	#datasetConfig
	#currentDataset

	constructor() {
		this.#filterConfig = new FilterConfig()
		this.#datasetConfig = new DatasetConfig()
	}

	/**
	 * Parses raw datasets into usable data objects.
	 * 
	 * @param {object} data containing the dataset.
	 * @param {string} filter the region to filter the data by. 
	 * @returns {Array} containing data objects with name and value.
	 */
	parse(data, choices) {
		this.#currentDataset = choices.dataset
		const filter = choices.filter

		const parsedData = this.#createArrayOf(data, filter)
		return parsedData
	}

	#createArrayOf(data, filter) {
		let dataArray = []
		const chosenFilter = this.#filterConfig.regions[filter]

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
				const object = this.#parseToObject(match)
				const name = this.#getName(object)
				if (this.#isMatch(name, element)) {
					const value = this.#parseValue(object)
					return this.#createObject(name, value)
				}
			}
		}
	}

	#parseToObject(match) {
		const input = match.input
		const parsedInput = JSON.parse(input)
		return parsedInput
	}

	#getName(object) {
		const country = object["country"]
		const name = country["value"]
		return name
	}

	#isMatch(name, element) { 
		// Check if match is the exact one before proceeding
		// because some region names include countries
		// ie "Middle East, North Africa, Afghanistan & Pakistan"
		if (name !== element) {
			return false
		}
		return true
	}

	#parseValue(object) {
		const value = object["value"]
		if (value === "NA") {
			return  // Don't include countries without data
		}
		const scale = this.#datasetConfig.scales[this.#currentDataset]
		const parsedValue = parseInt((value / scale).toFixed())

		return parsedValue
	}

	#createObject(name, value) {
		return { name, value }
	}
}