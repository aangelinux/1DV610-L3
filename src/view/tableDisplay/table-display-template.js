export const template = document.createElement("template")
template.innerHTML =
`
<style>
	#table {
		display: none;
		justify-self: center;
		margin-top: 10px;
	}

	table {
		width: 500px;
		border: 2px solid black;
		border-collapse: collapse;
	}

	th, td {
		border: 1px solid black;
		padding: 10px;
	}
</style>

<div id="table">
	<table>
		<tr>
			<th id="name">Country / Region</th>
			<th id="dataset"></th>
		</tr>
	</table>
</div>
`