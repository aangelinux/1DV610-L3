/**
 * @module Defines unit tests for DataParser.
 */

import { describe, test, expect } from "@jest/globals"
import { DataParser } from "../src/model/dataParser.js"
import { DataExtractor } from "../src/model/dataExtractor.js"
import { DataFilter } from "../src/model/dataFilter.js"
import PopulationData from "../public/data/population.json"

const northAmericaPop = [
	{
		name: "Canada",
		value: 40083
	},
	{
		name: "United States",
		value: 	336806
	},
	{
		name: "Bermuda",
		value: 65
	}
]

describe("DataExtractor", () => {
	test("fetches chosen dataset", async () => {
		const dataExtractor = new DataExtractor()
		const data = await dataExtractor.extract("Population")

		expect(data).toStrictEqual(PopulationData[1])
	})
})

describe("DataFilter", () => {
	test("filters through dataset based on filterKey", () => {
		const dataFilter = new DataFilter()

		
	})
})

describe("DataParser", () => {
	test("parses raw data into array of data objects", () => {
		const dataParser = new DataParser()
		const data = dataParser.parse(PopulationData.flat(), "Population")

		expect(data).toStrictEqual(northAmericaPop)
	})
})