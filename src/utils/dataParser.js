/**
 * @module Defines logic for extracting and parsing data into usable objects.
 */

import { RegionConfig } from "../config/regions"
import { PathConfig } from "../config/paths"

export class DataParser {
	#regionConfig
	#pathConfig

	constructor() {
		this.#regionConfig = new RegionConfig()
		this.#pathConfig = new PathConfig()
	}

	getDataFrom(choices) {
		const dataset = choices.dataset
		const filter = choices.filter

		const filePath = this.#pathConfig.files[dataset]

		const rawData = this.#fetchDataFrom(filePath)
		const filteredData = this.#filterDataFrom(rawData, filter)
		const parsedData = this.#parseData(filteredData)

		console.log("parsed data: ", parsedData)
	}

	async #fetchDataFrom(url) {
		try {
			const response = await fetch(url)
			if (!response.ok) {
				throw new Error("File could not be loaded", response.status)
			}

			const result = await response.json()
			return result
		} catch (error) {
			console.error(error.message)
		}
	}

	#filterDataFrom(data, filter) {

	}

	#parseData() {

	}
}