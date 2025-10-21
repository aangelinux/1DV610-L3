/**
 * @module Tests that the controller handles event flow correctly.
 */

import { describe, test, expect, jest, beforeEach } from "@jest/globals"
import { DatasetConfig } from "../src/config/datasets.js"
import { FilterConfig } from "../src/config/filters.js"
import { DataParser } from "../src/model/dataParser.js"
import { DataExtractor } from "../src/model/dataExtractor.js"
import { DataFilter } from "../src/model/dataFilter.js"
import { WorldExplorer } from "../src/controller/worldExplorer.js"

function construct() {
	const datasetConfig = new DatasetConfig()
	const filterConfig = new FilterConfig()
	
	const worldExplorer = new WorldExplorer({
		extractor: new DataExtractor(datasetConfig),
		filter: new DataFilter(filterConfig),
		parser: new DataParser(datasetConfig),
	})

	return worldExplorer
}

describe("WorldExplorer", () => {
	beforeEach(() => {
		document.body.innerHTML = `
			<div id="container"></div>
		`
	})

	test("appends controls to the DOM", () => {
		const worldExplorer = construct()
		const container = worldExplorer.container

		expect(worldExplorer).toHaveProperty("container")
		expect(container.hasChildNodes("<user-controls />")).toBeTruthy()
	})

	test("appends chart to the DOM", () => {
		const worldExplorer = construct()
		const container = worldExplorer.container

		expect(worldExplorer).toHaveProperty("container")
		expect(container.hasChildNodes("<chart-display />")).toBeTruthy()
	})

	test("appends table to the DOM", () => {
		const worldExplorer = construct()
		const container = worldExplorer.container

		expect(worldExplorer).toHaveProperty("container")
		expect(container.hasChildNodes("<table-display />")).toBeTruthy()
	})

	test("listens to choices-submitted event", () => {
		const worldExplorer = construct()
		const mockListener = jest.fn()
		worldExplorer.addEventListener("choices-submitted", mockListener)

		const event = new CustomEvent("choices-submitted", {
			detail: "",
			bubbles: true
		})
		worldExplorer.dispatchEvent(event)
		
		expect(mockListener).toHaveBeenCalledTimes(1)
	})
})