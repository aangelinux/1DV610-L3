/**
 * @module Starts the application.
 */

import { DataParser } from "./model/dataParser.js"
import { DataExtractor } from "./model/dataExtractor.js"
import { DataFilter } from "./model/dataFilter.js"
import { DatasetConfig } from "./config/datasets.js"
import { FilterConfig } from "./config/filters.js"
import { WorldExplorer } from "./controller/worldExplorer"

function start() {
	const datasetConfig = new DatasetConfig()
	const filterConfig = new FilterConfig()
	
	const dependencies = {
		extractor: new DataExtractor(datasetConfig),
		filter: new DataFilter(filterConfig),
		parser: new DataParser(datasetConfig),
	}

	new WorldExplorer(dependencies)
}

start()