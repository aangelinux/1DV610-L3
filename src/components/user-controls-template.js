export const template = document.createElement("template")
template.innerHTML =
`
<style>
	:host {
		font-family: Segoe UI;
	}

	.dropdown-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-evenly;
		width: 800px;
	}

	.dropdown {
		position: relative;
	}

	.dropbtn {
		background-color: #4CAF50;
		color: white;
		padding: 13px;
		font-size: 16px;
		font-family: Segoe UI;
		border: none;
		cursor: pointer;
		min-width: 200px;
		border-radius: 2px;
	}

	.dropdown-content {
		display: none;
		position: absolute;
		background-color: #f9f9f9;
		min-width: 200px;
		box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
	}

	.dropdown-content p {
		color: black;
		padding: 12px 16px;
		text-decoration: none;
		display: block;
		cursor: pointer;
	}

	.dropdown-content p:hover {
		background-color: #f1f1f1;
	}

	.dropdown:hover .dropdown-content {
		display: block;
	}

	.dropdown:hover .dropbtn {
		background-color: #3e8e41;
	}

	/* -------------- Buttons --------------- */

	.button-container {
		margin-top: 20px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 800px;
		gap: 10px;
		justify-content: center;
	}

	.chartbtn {
		background-color: white;
		color: black;
		padding: 10px;
		font-size: 16px;
		font-family: Segoe UI;
		border: 2px solid #3e8e41;
		cursor: pointer;
		min-width: 150px;
		border-radius: 5px;
	}

	.chartbtn:hover {
		box-shadow:0 8px 16px 0 rgba(0,0,0,0.6)
	}
</style>


<div class="dropdown-container">
	<div class="dropdown">
		<button class="dropbtn">Dataset</button>
		<div class="dropdown-content" id="dataset">
			<p>Population</p>
			<p>GDP</p>
			<p>Emissions</p>
		</div>
	</div>

	<div class="dropdown">
		<button class="dropbtn">Filter</button>
		<div class="dropdown-content" id="filter">
			<p>Global</p>
			<p>East Asia & Pacific</p>
			<p>Europe & Central Asia</p>
			<p>Latin America & Caribbean</p>
			<p>Middle East & North Africa</p>
			<p>North America</p>
			<p>South Asia</p>
			<p>Sub-Saharan Africa</p>
		</div>
	</div>
</div>


<div class="button-container">
	<button class="chartbtn" id="bar">Bar Chart</button>
	<button class="chartbtn" id="line">Line Graph</button>
	<button class="chartbtn" id="pie">Pie Chart</button>
</div>
`