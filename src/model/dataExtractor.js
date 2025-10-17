/**
 * @module Defines logic for extracting data.
 */

export class DataExtractor {
	#datasetConfig

	constructor(datasetConfig) {
		this.#datasetConfig = datasetConfig
	}

	async extract(dataset) {
		let data
		let path
		
		try {
			path = this.#datasetConfig.api[dataset]
			data = await this.#fetchDataFrom(path)
		} catch (error) {
			console.log(error.message)
			path = this.#datasetConfig.files[dataset]
			data = await this.#fetchDataFrom(path)
		}
		return data
	}

	async #fetchDataFrom(url) {
		const response = await fetch(url)
		if (!response.ok) {
			throw new Error("Data couldn't be fetched.", response.status)
		}

		const result = await response.json()
		return result[1]  // second object in array contains the data
	}
}