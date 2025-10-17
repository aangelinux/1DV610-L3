/**
 * @module Defines unit tests for DataParser.
 */

import { describe, test, expect } from "@jest/globals"
import { DataParser } from "../src/model/dataParser.js"
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

describe("DataParser", () => {
	test("parses raw data into array of data objects", () => {
		const dataParser = new DataParser()
		const data = dataParser.parse(PopulationData.flat(), { dataset: "Population", filter: "North America" })

		expect(data).toStrictEqual(northAmericaPop)
	})
})