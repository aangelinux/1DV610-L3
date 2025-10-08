/**
 * @module Stores configuration rules for regions.
 */

export class RegionConfig {
	#GLOBAL = [
		"East Asia & Pacific",
		"Europe & Central Asia",
		"Latin America & Caribbean",
		"Middle East & North Africa",
		"North America",
		"South Asia",
		"Sub-Saharan Africa"
	]

	#EAS = [
		"China",
		"Indonesia",
		"Japan",
		"Philippines",
		"Viet Nam",
		"Thailand",
		"Myanmar",
		"Korea, Rep.",  // South
		"Malaysia",
		"Australia"
	]

	#ECS = [
		"Russian Fed",
		"Türkiye",
		"Germany",
		"United Kingdom",
		"France",
		"Italy",
		"Spain",
		"Ukraine",
		"Poland",
		"Sweden"
	]

	#LCN = [
		"Brazil",
		"Mexico",
		"Colombia",
		"Argentina",
		"Peru",
		"Venezuela",
		"Chile",
		"Guatemala",
		"Ecuador",
		"Bolivia"
	]

	#MEA = [
		"Pakistan",
		"Egypt",
		"Iran",
		"Algeria",
		"Iraq",
		"Afghanistan",
		"Yemen, Rep.",
		"Morocco",
		"Saudi Arabia",
		"Syria"
	]

	#NAC = [
		"Canada",
		"United States",
		"Bermuda"
	]

	#SAS = [
		"Bangladesh",
		"Bhutan",
		"India",
		"Maldives",
		"Nepal",
		"Sri Lanka"
	]

	#SSF = [
		"Nigeria",
		"Ethiopia",
		"Congo, Dem.",
		"Tanzania",
		"South Africa",
		"Kenya",
		"Sudan",
		"Uganda",
		"Angola",
		"Mozambique"
	]

	constructor() {
	}

	get global() {
		return this.#GLOBAL
	}

	get eas() {
		return this.#EAS
	}

	get ecs() {
		return this.#ECS
	}

	get lcn() {
		return this.#LCN
	}

	get mea() {
		return this.#MEA
	}

	get nac() {
		return this.#NAC
	}

	get sas() {
		return this.#SAS
	}

	get ssf() {
		return this.#SSF
	}
}