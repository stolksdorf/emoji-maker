const ReactDOMServer = require('react-dom/server');
const React = require('react');
const Headtags = require('vitreum/headtags.js');
let cache = {};
require('source-map-support/register');

module.exports = (props, opts={})=>{
	opts = Object.assign({render:true, cache:false}, opts);
	let component = '', headtags = '';
	const propsString = JSON.stringify(props);
	if(opts.cache && cache[propsString]) return cache[propsString];
	if(opts.render){
		delete require.cache[require.resolve('./bundle.js')];
		const Element = require('./bundle.js');
		if(!Object.keys(Element).length && typeof Element !== 'function'){
			throw new Error('main component was improperly built. Check the /build folder.');
		}
		component = ReactDOMServer.renderToString(React.createElement(Element, props));
		headtags = Headtags.generate();
	}
	const html = `<!DOCTYPE html>
<!-- Doctype HTML5 -->
<html lang='en'>
	<head>
		<meta charset='utf-8'>
		<meta name='viewport' content='width=device-width, initial-scale=1'>

		<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap" rel="stylesheet">
		<link rel='stylesheet' type='text/css' href='/slack-tools/main/bundle.css' />
		${headtags}
	</head>
	<body><main id='vitreum-root'>${component}</main></body>
	<script src='/slack-tools/libs.js'></script>
	<script src='/slack-tools/main/bundle.js'></script>
	<script>
		(function(){
			require('react-dom').hydrate(
				require('react').createElement(main, ${propsString}),
				document.getElementById('vitreum-root')
			);
		})();
	</script>
</html>`;
	if(opts.cache) cache[propsString] = html;
	return html;
};