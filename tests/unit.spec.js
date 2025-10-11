/**
 * @module Defines unit tests for the application.
 */

import { describe, test, expect } from "@jest/globals"
import { DataParser } from "../src/utils/dataParser.js"

function testPopulation(region) {
	const dataParser = new DataParser()
	const data = dataParser.process({ dataset: "Population", filter: region })

	expect(data).toBe(Array)
	expect(data.length).toBeGreaterThanOrEqual(2)
	expect(data.length).toBeLessThanOrEqual(10)

	expect(data).toHaveProperty("name")
	expect(data).toHaveProperty("value")
	expect(data["name"]).toBeInstanceOf(String)
	expect(data["value"]).toBeInstanceOf(Number)
}

describe("Population dataset:", () => {
	test("Global", () => {
		testPopulation("Global")
	})
})