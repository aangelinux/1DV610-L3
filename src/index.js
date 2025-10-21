/**
 * @module Starts the application.
 */

import { DatasetConfig } from "./config/datasets.js"
import { FilterConfig } from "./config/filters.js"
import { DataExtractor } from "./model/dataExtractor.js"
import { DataFilter } from "./model/dataFilter.js"
import { DataParser } from "./model/dataParser.js"
import { WorldExplorer } from "./controller/worldExplorer"

function main() {
	const datasetConfig = new DatasetConfig()
	const filterConfig = new FilterConfig()
	
	new WorldExplorer({
		extractor: new DataExtractor(datasetConfig),
		filter: new DataFilter(filterConfig),
		parser: new DataParser(datasetConfig),
	})
}

main()