/**
 * @module Fetches data from an API.
 */

export class DataExtractor {
	#datasetConfig

	constructor(datasetConfig) {
		this.#datasetConfig = datasetConfig
	}

	async extract(dataset) {
		try {
			const data = await this.#tryFetch(dataset)
			return data
		} catch (error) {
			console.error(error)
			return ""
		}
	}

	async #tryFetch(dataset) {
		try {
			const url = this.#datasetConfig.api[dataset]
			return await this.#fetch(url)
		} catch (error) {
			const url = this.#datasetConfig.files[dataset]
			return await this.#fetch(url)
		}
	}

	async #fetch(url) {
		const response = await fetch(url)
		this.#validateResponse(response)

		const result = await response.json()
		const data = result[1]
		this.#validateData(data)

		return data
	}

	#validateResponse(response) {
		if (!response.ok) {
			throw new Error("Data couldn't be fetched.")
		}
	}

	#validateData(data) {
		if (!data || !Array.isArray(data) || data.length === 0) {
			throw new Error("Data was corrupted.")
		}
	}
}