/**
 * @module Defines logic for parsing raw data into usable objects.
 */

export class DataParser {
	#datasetConfig
	#currentDataset

	constructor(datasetConfig) {
		this.#datasetConfig = datasetConfig
	}

	parse(data, dataset) {
		this.#currentDataset = dataset
		const parsedData = this.#createArrayOf(data)
		return parsedData
	}

	#createArrayOf(data) {
		let parsedData = []

		data.forEach((dataElement) => {
			const parsedObject = this.#createObject(dataElement)
			if (parsedObject) {
				parsedData.push(parsedObject)
			}
		})

		return parsedData
	}

	#createObject(dataElement) {
		const input = this.#parseInput(dataElement)
		const name = this.#getName(input)
		const value = this.#getValue(input)
		if (!value) {
			return
		}
		return { name, value }
	}

	#parseInput(dataElement) {
		const input = dataElement.input
		const parsedInput = JSON.parse(input)
		return parsedInput
	}

	#getName(input) {
		const country = input["country"]
		const name = country["value"]
		return name
	}

	#getValue(input) {
		const value = input["value"]
		if (value === null) {
			return  // Don't include countries without data
		}

		const scale = this.#datasetConfig.scales[this.#currentDataset]
		const parsedValue = parseInt((value / scale).toFixed())
		return parsedValue
	}
}