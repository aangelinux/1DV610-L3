/**
 * @module Defines unit tests for the application.
 */

import { describe, test, expect, jest } from "@jest/globals"
import { DataParser } from "../src/utils/dataParser.js"
import PopulationData from "../public/data/population.json"
import GDPData from "../public/data/gdp.json"
import EmissionsData from "../public/data/emissions.json"

async function testPopulation(region) {	
	const dataParser = new DataParser()
	jest.spyOn(dataParser, "_fetchDataFrom").mockResolvedValue(PopulationData)
	const data = await dataParser.process({ dataset: "Population", filter: region })
	validate(data)
}

async function testGDP(region) {	
	const dataParser = new DataParser()
	jest.spyOn(dataParser, "_fetchDataFrom").mockResolvedValue(GDPData)
	const data = await dataParser.process({ dataset: "GDP", filter: region })
	validate(data)
}

async function testEmissions(region) {	
	const dataParser = new DataParser()
	jest.spyOn(dataParser, "_fetchDataFrom").mockResolvedValue(EmissionsData)
	const data = await dataParser.process({ dataset: "Emissions", filter: region })
	validate(data)
}

function validate(data) {
	expect(data).toBeInstanceOf(Array)
	expect(() => { data.forEach((object) => {
			object["name"]
		}).toBeInstanceOf(String)})
	expect(() => { data.forEach((object) => {
			object["value"]
		}).toBeInstanceOf(Number)})
		
	expect(data.length).toBeGreaterThanOrEqual(2)
	expect(data.length).toBeLessThanOrEqual(10)
}

describe("Population dataset:", () => {
	test("Global", async () => {
		await testPopulation("Global")
	})

	test("East Asia & Pacific", async () => {
		await testPopulation("East Asia & Pacific")
	})

	test("Europe & Central Asia", async () => {
		await testPopulation("Europe & Central Asia")
	})

	test("Latin America & Caribbean", async () => {
		await testPopulation("Latin America & Caribbean")
	})

	test("Middle East & North Africa", async () => {
		await testPopulation("Middle East & North Africa")
	})

	test("North America", async () => {
		await testPopulation("North America")
	})

	test("South Asia", async () => {
		await testPopulation("South Asia")
	})

	test("Sub-Saharan Africa", async () => {
		await testPopulation("Sub-Saharan Africa")
	})
})

describe("GDP dataset:", () => {
	test("Global", async () => {
		await testGDP("Global")
	})

	test("East Asia & Pacific", async () => {
		await testGDP("East Asia & Pacific")
	})

	test("Europe & Central Asia", async () => {
		await testGDP("Europe & Central Asia")
	})

	test("Latin America & Caribbean", async () => {
		await testGDP("Latin America & Caribbean")
	})

	test("Middle East & North Africa", async () => {
		await testGDP("Middle East & North Africa")
	})

	test("North America", async () => {
		await testGDP("North America")
	})

	test("South Asia", async () => {
		await testGDP("South Asia")
	})

	test("Sub-Saharan Africa", async () => {
		await testGDP("Sub-Saharan Africa")
	})
})

describe("Emissions dataset:", () => {
	test("Global", async () => {
		await testEmissions("Global")
	})

	test("East Asia & Pacific", async () => {
		await testEmissions("East Asia & Pacific")
	})

	test("Europe & Central Asia", async () => {
		await testEmissions("Europe & Central Asia")
	})

	test("Latin America & Caribbean", async () => {
		await testEmissions("Latin America & Caribbean")
	})

	test("Middle East & North Africa", async () => {
		await testEmissions("Middle East & North Africa")
	})

	test("North America", async () => {
		await testEmissions("North America")
	})

	test("South Asia", async () => {
		await testEmissions("South Asia")
	})

	test("Sub-Saharan Africa", async () => {
		await testEmissions("Sub-Saharan Africa")
	})
})