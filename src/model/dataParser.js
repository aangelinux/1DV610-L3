/**
 * @module Parses raw data into usable objects.
 */

export class DataParser {
	#datasetConfig
	#dataset

	constructor(datasetConfig) {
		this.#datasetConfig = datasetConfig
	}

	parse(data, dataset) {
		this.#dataset = dataset
		const parsedData = this.#createArrayOf(data)
		return parsedData
	}

	#createArrayOf(data) {
		let dataObjects = []

		data.forEach((element) => {
			const object = this.#createObject(element)
			if (object) {
				dataObjects.push(object)
			}
		})

		return dataObjects
	}

	#createObject(data) {
		const name = this.#getName(data)
		const value = this.#getValue(data)
		if (!value) {
			return
		}
		return { name, value }
	}

	#getName(data) {
		const country = data["country"]
		const name = country["value"]
		return name
	}

	#getValue(data) {
		const value = data["value"]
		if (value === null) {
			return  // Don't include countries without data
		}

		const scale = this.#datasetConfig.scales[this.#dataset]
		const scaledValue = parseInt((value / scale).toFixed())
		return scaledValue
	}
}