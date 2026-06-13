# Wolfram Web Graphics
Export Wolfram Language Plots and Graphics to a web friendly format.

## JS Runtime
Inline the built JS directly:
```html
<!-- ... -->
<!--
	Import libs based on found tags, populate SSR placeholders and hydrate
	event listeners
-->
<script type="module" src="wgx-runtime.js" ></script>
<!-- ... -->
<div id="some-plot"
	data-wgx-ssr-endpoint='/api/plot/'
	data-wgx-ssr-params='a=1&b=2'
	data-wgx-ssr-body='{"a": 1}'
></div>
<!-- ... -->
```

## React Runtime (Future)
```tsx
import WGX from "@wgx/react-runtime"

// WGX.Runtime provider exposes runtime methods and styles
// WGX.Element fetches HTML and hydrates itself
function Main() {
	return(
		<WGX.Runtime>
			<WGX.Element
				endpoint="/api/plot/"
				config={{
					params: {x: 1},
					body: JSON.stringify({y: 2})
				}} />
			<WGX.Element html={preFetched} />
		</WGX.Runtime>
	)
}
```
