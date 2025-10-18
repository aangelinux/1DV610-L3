/**
 * @module Defines unit tests for DataParser.
 */

import { describe, test, expect, jest } from "@jest/globals"
import { DataParser } from "../src/model/dataParser.js"
import { DataExtractor } from "../src/model/dataExtractor.js"
import { DataFilter } from "../src/model/dataFilter.js"
import { DatasetConfig } from "../src/config/datasets.js"

import { MockFilterConfig } from "./__mocks__/filters.js"
import { mockFetchedData, mockFilteredData, mockParsedData } from "./__mocks__/data.js"

describe("DataExtractor", () => {
	test("fetches and returns dataset", async () => {
		const datasetConfig = new DatasetConfig()
		const dataExtractor = new DataExtractor(datasetConfig)
		global.fetch = jest.fn(() => 
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(mockFetchedData)}))
		const data = await dataExtractor.extract("Population")

		expect(data).toStrictEqual(mockFetchedData[1])
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
		const data = dataFilter.filter(mockFetchedData[1].flat(), "Africa")

		expect(data).toStrictEqual(mockFilteredData)
	})

	test("excludes countries/regions that are not strictly equal", () => {

	})
})

describe("DataParser", () => {
	test("parses fetched data into array of data objects", () => {
		const datasetConfig = new DatasetConfig()
		const dataParser = new DataParser(datasetConfig)
		const data = dataParser.parse(mockFilteredData.flat(), "Population")

		expect(data).toStrictEqual(mockParsedData)
	})

	test("excludes countries/regions without data", () => {

	})
})