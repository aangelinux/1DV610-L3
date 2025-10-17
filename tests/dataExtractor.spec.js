/**
 * @module Defines unit tests for DataExtractor.
 */

import { describe, test, expect } from "@jest/globals"
import { DataExtractor } from "../src/model/dataExtractor.js"
import PopulationData from "../public/data/population.json"

describe("DataExtractor", () => {
	test("fetches chosen dataset", async () => {
		const dataExtractor = new DataExtractor()
		const data = await dataExtractor.extract("Population")

		expect(data).toStrictEqual(PopulationData[1])
	})
})