/**
 * @module Defines logic for extracting data.
 */

import { PathConfig } from "../config/paths"

export class DataExtractor {
	#pathConfig

	constructor() {
		this.#pathConfig = new PathConfig()
	}

	async extract(dataset) {
		const path = this.#pathConfig.files[dataset]
		const data = await this.#fetchDataFrom(path)
		return data
	}

	async #fetchDataFrom(url) {
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
}