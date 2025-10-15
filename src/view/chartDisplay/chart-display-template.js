export const template = document.createElement("template")
template.innerHTML =
`
<style>
	:host {
		font-family: "Lexend Light";
		color: black;
	}

	#chart {
		width: 700px;
		min-height: 400px;
		height: auto;
	}

	#info {
		display: none;
		margin-top: 55px;
		font-size: .8rem;
	}

	#info p {
		margin: 5px;
	}
</style>

<div>
	<div id="chart"></div>
	<div id="info">
		<p id="updated">Last updated (data): 2023</p>
		<p id="source">Source: World Bank Open Data</p>
	</div>
</div>
`