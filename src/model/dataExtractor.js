/**
 * @module Fetches datasets.
 */

export class DataExtractor {
	#datasetConfig

	constructor(datasetConfig) {
		this.#datasetConfig = datasetConfig
	}

	async extract(dataset) {
		try {
			const data = await this.#tryApiThenFiles(dataset)
			return data
		} catch (error) {
			console.error(error)
			return ""
		}
	}

	async #tryApiThenFiles(dataset) {
		try {
			const url = this.#datasetConfig.api[dataset]
			return await this.#fetch(url)
		} catch (error) {
			console.error(error)
			const url = this.#datasetConfig.files[dataset]
			return await this.#fetch(url)
		}
	}

	async #fetch(url) {
		const response = await fetch(url)
		this.#validateResponse(response)

		const result = await response.json()
		this.#validateResult(result)
		const data = result[1] // Second object in result contains data
		this.#validateResult(data)

		return data
	}

	#validateResponse(response) {
		if (!response.ok) {
			throw new Error(`Data couldn't be fetched, status: ${response.status}`)
		}
	}

	#validateResult(result) {
		if (!result || !Array.isArray(result) || result.length < 1) {
			throw new Error(`Data was corrupted: ${result}`)
		}
	}
}