/**
 * @module Configures keys the user can filter by.
 */

export class FilterConfig {
	#GLOBAL = [
		"East Asia & Pacific",
		"Europe & Central Asia",
		"Latin America & Caribbean",
		"Middle East, North Africa, Afghanistan & Pakistan",
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
		"Russian Federation",
		"Turkiye",
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
		"Venezuela, RB",
		"Chile",
		"Guatemala",
		"Ecuador",
		"Bolivia"
	]

	#MEA = [
		"Pakistan",
		"Egypt, Arab Rep.",
		"Iran, Islamic Rep.",
		"Algeria",
		"Iraq",
		"Afghanistan",
		"Yemen, Rep.",
		"Morocco",
		"Saudi Arabia",
		"Syrian Arab Republic"
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
		"Congo, Dem. Rep.",
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

	get filters() {
		return {
			"Global": this.#GLOBAL,
			"East Asia & Pacific": this.#EAS,
			"Europe & Central Asia": this.#ECS,
			"Latin America & Caribbean": this.#LCN,
			"Middle East & North Africa": this.#MEA,
			"North America": this.#NAC,
			"South Asia": this.#SAS,
			"Sub-Saharan Africa": this.#SSF
		}
	}
}