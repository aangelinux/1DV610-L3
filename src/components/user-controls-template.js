export const template = document.createElement("template")
template.innerHTML =
`
<style>
	.container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-evenly;
		gap: 20px;
		width: 500px;
	}

	.dropdown {
		position: relative;
		font-family: Segoe UI;
	}

	.dropbtn {
		background-color: #4CAF50;
		color: white;
		padding: 16px;
		font-size: 16px;
		border: none;
		cursor: pointer;
		min-width: 200px;
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

	.buttons {
	}

	/* Specific styles */

	#region {
		display: none;
	}
</style>


<div class="container">

	<div class="dropdown">
		<button class="dropbtn">Dataset</button>
		<div class="dropdown-content">
			<p>Population</p>
			<p>GDP</p>
			<p>CO2 Emissions</p>
		</div>
	</div>

	<div class="dropdown">
		<button class="dropbtn">Filter</button>
		<div class="dropdown-content">
			<p>Global</p>
			<p>Region</p>
		</div>
	</div>

	<div class="dropdown" id="region">
		<button class="dropbtn">Region</button>
		<div class="dropdown-content">
			<p>North America</p>
			<p>South America</p>
			<p>Europe</p>
			<p>Africa</p>
			<p>Middle East</p>
			<p>Asia</p>
			<p>Oceania</p>
		</div>
	</div>

	<div class="buttons">
		<button class="chartbtn">Bar Chart</button>
		<button class="chartbtn">Line Graph</button>
		<button class="chartbtn">Pie Chart</button>
	</div>

</div>
`