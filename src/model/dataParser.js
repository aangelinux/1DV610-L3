/**
 * @module Defines logic for parsing data into usable objects.
 */

import { RegionConfig } from "../config/regions"
import { PathConfig } from "../config/paths"

export class DataParser {
	#regex = /[^:_"a-z][,0-9]+/gm // Matches with digits only
	#regionConfig
	#pathConfig

	constructor() {
		this.#regionConfig = new RegionConfig()
		this.#pathConfig = new PathConfig()
	}

	/**
	 * Gets the user's choices and returns an array of parsed data.
	 * 
	 * @param {object} userChoices for dataset and filter.
	 * @returns {Array} containing data objects with name and value.
	 */
	async getParsedData(userChoices) {
		const dataset = userChoices.dataset
		const filter = userChoices.filter

		const filePath = this.#pathConfig.files[dataset]
		const rawData = await this._fetchDataFrom(filePath)
		const parsedData = this.#createArrayOf(rawData, filter)

		return parsedData
	}

	async _fetchDataFrom(url) {
		try {
			const response = await fetch(url)
			if (!response.ok) {
				throw new Error("Data couldn't be fetched", response.status)
			}

			const result = await response.json()
			return result
		} catch (error) {
			console.error(error.message)
		}
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