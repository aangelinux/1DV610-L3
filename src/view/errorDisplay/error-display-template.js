export const template = document.createElement("template")
template.innerHTML = 
`
<style>
	#error {
		display: none;
	}

	#error p {
		justify-self: center;
	}

	#error img {
		margin: auto;
		display: block;
		width: 70%;
	}
</style>

<div id="error">
	<p>Something went wrong... Please accept this cat as a token of my regret.</p>
	<img src="/images/cat.webp" alt="Cat"/>
</div>
` 