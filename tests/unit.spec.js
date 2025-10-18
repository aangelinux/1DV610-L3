/**
 * @module Defines unit tests for DataParser.
 */

import { describe, test, expect, jest } from "@jest/globals"
import { DataParser } from "../src/model/dataParser.js"
import { DataExtractor } from "../src/model/dataExtractor.js"
import { DataFilter } from "../src/model/dataFilter.js"

import { mockPopulationData } from "./__mocks__/population.js"
import { MockFilterConfig } from "./__mocks__/filters.js"
import { MockDatasetConfig } from "./__mocks__/datasets.js"

describe("DataExtractor", () => {
	test("fetches and returns dataset", async () => {
		const mockDatasetConfig = new MockDatasetConfig()
		const dataExtractor = new DataExtractor(mockDatasetConfig)

		global.fetch = jest.fn(() => 
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(mockPopulationData),
			})
		)
		const data = await dataExtractor.extract("Population")
		expect(data).toStrictEqual = mockPopulationData[1]
	})

	test("throws error if fetch fails", async () => {

	})

	test("throws error if data is corrupted", async () => {

	})
})

describe("DataFilter", () => {
	test("filters through dataset and returns matching data", () => {
		const mockFilterConfig = new MockFilterConfig()
		const dataFilter = new DataFilter(mockFilterConfig)

    const expectedData = [
			["Burundi"], ["Burkina Faso"], ["Cabo Verde"]
    ]

		const data = dataFilter.filter(mockPopulationData[1].flat(), "Africa")
		expect(data).toContainEqual(expectedData)
	})

	test("excludes countries/regions that are not strictly equal", () => {

	})
})

describe("DataParser", () => {
	test("parses raw data into array of objects", () => {

	})

	test("excludes countries/regions without data", () => {

	})
})