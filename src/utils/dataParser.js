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

	async process(choices) {
		const dataset = choices.dataset
		const filter = choices.filter

		const filePath = this.#pathConfig.files[dataset]
		const rawData = await this.#fetchDataFrom(filePath)
		const parsedData = this.#filter(rawData, filter)

		return parsedData
	}

	async #fetchDataFrom(url) {
		try {
			const response = await fetch(url)
			if (!response.ok) {
				throw new Error("Data could not be fetched", response.status)
			}

			const result = await response.json()
			return result
		} catch (error) {
			console.error(error.message)
		}
	}

	#filter(data, filter) {
		let parsedData = []
		const chosenFilter = this.#regionConfig.region[filter]

		chosenFilter.forEach((element) => {
			let parsedObject = this.#match(element, data)
			if (parsedObject) {
				parsedData.push(parsedObject)
			}
		})

		return parsedData
	}

	#match(element, data) {
		for (const dataObject of data) {
			const match = JSON.stringify(dataObject).match(element)
			if (match) {
				return this.#parse(match)
			}
		}
	}

	#parse(match) {
		const input = match.input
		const parsedInput = JSON.parse(input)
		if (parsedInput["value"] === "NA") {
			return  // Shouldn't include countries who don't have data
		}
		
		const value = parseInt(parsedInput["value"].trim().replaceAll(",", ""))
		const name = parsedInput["name"]

		return { name, value }
	}
}