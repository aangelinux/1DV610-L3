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

	async getDataFrom(choices) {
		const dataset = choices.dataset
		const filter = choices.filter

		const filePath = this.#pathConfig.files[dataset]
		const rawData = await this.#fetchDataFrom(filePath)
		const filteredData = this.#filterDataFrom(rawData, filter)
		const parsedData = this.#parseData(filteredData)
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

		this.#regionConfig.global.forEach((element) => {
			for (const dataObject of data) {
				const values = Object.values(dataObject)
				const match = JSON.stringify(values).match(element)

				if (match) {
					const input = match.input
					const regex = /[^:_"a-z][,0-9]+/gm
					const values = input.match(regex)
					const dataValue = values[0]

					dataArray.push({
						name: element,
						value: dataValue
					})

					break  // Once the correct country has been found, move on to the next
									// to ensure there are no duplicates
				}
			}
		})
		
		console.log(dataArray)
	}

	#parseData() {

	}
}