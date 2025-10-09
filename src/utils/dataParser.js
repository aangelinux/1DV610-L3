/**
 * @module Defines logic for extracting and parsing data into usable objects.
 */

import { RegionConfig } from "../config/regions"
import { PathConfig } from "../config/paths"

export class DataParser {
	#regex = /[^:_"a-z][,0-9]+/gm
	#regionConfig
	#pathConfig

	constructor() {
		this.#regionConfig = new RegionConfig()
		this.#pathConfig = new PathConfig()
	}

	async getDataFrom(choices) {
		const dataset = choices.dataset
		const filter = choices.filter

		const filePath = this.#pathConfig.files[dataset]
		const rawData = await this.#fetchDataFrom(filePath)
		return this.#filterDataFrom(rawData, filter)
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
		let dataArray = []

		this.#regionConfig.region[filter].forEach((element) => {
			for (const dataObject of data) {
				const match = JSON.stringify(dataObject).match(element)

				if (match) {
					const input = match.input
					const parsedInput = JSON.parse(input)

					const value = parseInt(parsedInput["value"].trim().replaceAll(",", ""))
					const name = parsedInput["name"]

					dataArray.push({
						name,
						value
					})

					break  // When the country has been found move on to the next
									// to ensure there are no duplicates
				}
			}
		})
		
		return dataArray
	}

	#parseData() {

	}
}