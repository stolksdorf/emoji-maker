require('./calibri2.less');
require('./main.less');
const React = require('react');

const {Title} = require('vitreum/headtags');
const pckg = require('../../package.json');


const HEIGHT = 200, WIDTH = 200;

//const test = require('./calibri.ttf');
//console.log(test)


function TextCanvas({text, size, lineheight, setDataURL, setSize}){
	//const Font = `bold ${size}px Ubuntu, 'Roboto Condensed',Roboto,Verdana,Arial, sans serif`;
	//const Font = `bold ${size}px Roboto, Comic sans`;
	//const Font = `bold ${size}px Calibri`;
	//const Font = `bold ${size}px Open Sans`;
	//const Font = `800 ${size}px Montserrat`;
	const Font = (size)=>`bold ${size}px calibri2`;


	const getMaxSize = (lines, size=70)=>{
		ctx.font = Font(size);
		const biggest = Math.max(...lines.map((text)=>ctx.measureText(text).width));
		if(biggest >= WIDTH-5) return size;
		return getMaxSize(lines, size+2);
	};

	const canvas = React.useRef(null);
	const [ctx, setCtx] = React.useState(null);

	React.useEffect(()=>{canvas.current && setCtx(canvas.current.getContext('2d'))}, [canvas]);
	React.useEffect(()=>{ctx && text && setSize(getMaxSize(text.split('\n')))}, [text]);

	if(ctx){
		ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

		// ctx.fillStyle = 'rgba(255,255,255,0.6';
		// ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);


		ctx.font = Font(size);
		ctx.fillStyle = '#000';
		ctx.textBaseline='middle';


		const lines = text.split('\n');

		//draw large shadow
		lines.map((line, idx)=>{
			const width = (WIDTH - ctx.measureText(line).width)/2;
			const height = HEIGHT/2 - ((lines.length-1)*lineheight/2) + idx*lineheight;

			ctx.shadowColor = "rgba(255,255,255)"
			ctx.shadowBlur = 80;
			ctx.fillText(line,width, height);
		});


		// Draw outline
		lines.map((line, idx)=>{
			const width = (WIDTH - ctx.measureText(line).width)/2;
			const height = HEIGHT/2 - ((lines.length-1)*lineheight/2) + idx*lineheight;

			ctx.shadowColor = "rgba(255,255,255)"
			ctx.shadowBlur = 10;
			ctx.shadowOffsetX = 3;
			ctx.shadowOffsetY = 3;
			ctx.fillText(line,width, height);
		});
		lines.map((line, idx)=>{
			const width = (WIDTH - ctx.measureText(line).width)/2;
			const height = HEIGHT/2 - ((lines.length-1)*lineheight/2) + idx*lineheight;

			ctx.shadowColor = "rgba(255,255,255)"
			ctx.shadowBlur = 10;
			ctx.shadowOffsetX = -3;
			ctx.shadowOffsetY = 3;
			ctx.fillText(line,width, height);
		});
		lines.map((line, idx)=>{
			const width = (WIDTH - ctx.measureText(line).width)/2;
			const height = HEIGHT/2 - ((lines.length-1)*lineheight/2) + idx*lineheight;

			ctx.shadowColor = "rgba(255,255,255)"
			ctx.shadowBlur = 10;
			ctx.shadowOffsetX = 3;
			ctx.shadowOffsetY = -3;
			ctx.fillText(line,width, height);
		});
		lines.map((line, idx)=>{
			const width = (WIDTH - ctx.measureText(line).width)/2;
			const height = HEIGHT/2 - ((lines.length-1)*lineheight/2) + idx*lineheight;

			ctx.shadowColor = "rgba(255,255,255)"
			ctx.shadowBlur = 10;
			ctx.shadowOffsetX = -3;
			ctx.shadowOffsetY = -3;
			ctx.fillText(line,width, height);
		});





		//draw text
		lines.map((line, idx)=>{
			const width = (WIDTH - ctx.measureText(line).width)/2;
			const height = HEIGHT/2 - ((lines.length-1)*lineheight/2) + idx*lineheight;

			ctx.shadowBlur = 0;
			ctx.fillText(line,width, height);
		})

		setDataURL(canvas.current.toDataURL('image/png'));
	};

	return <canvas ref={canvas} width={WIDTH} height={HEIGHT} />

}

const {Favicon} = require('vitreum/headtags');

function EmojiMaker(props){

	const [text, setText] = React.useState('');
	const [size, setSize] = React.useState(110);
	const [lineheight, setLineheight] = React.useState(60);

	const [dataURL, setDataURL] = React.useState('');


	return <div className='EmojiMaker'>
		<Favicon href={dataURL} />

		<h2>Slack Text Emoji Maker</h2>

		<div className='controls'>
			<div>

				<textarea value={text} onChange={(evt)=>setText(evt.target.value)} rows={3}/>
			</div>
			<div>
				<label>Size</label>
				<input type='range' min={50} max={200} value={size} onChange={(evt)=>setSize(evt.target.value)} />
				{size}
			</div>
			<div>
				<label>Spacing</label>
				<input type='range' min={40} max={120} value={lineheight} onChange={(evt)=>setLineheight(evt.target.value)} />
				{lineheight}
			</div>

		</div>

		<div className='render'>
			<TextCanvas {...{text, size, lineheight, setDataURL, setSize}} />
			<div className='example'>
				This is it used in text. <img className='sample' src={dataURL} /> Also the tab icon is updated.
			</div>
			<div className='example dark'>
				This is it used in text. <img className='sample' src={dataURL} /> Also the tab icon is updated.
			</div>

		</div>

		<div className='instructions'>
			<h3>instructions</h3>
			<ol>
				<li>Customize your text emoji</li>
				<li><a href={dataURL} target='_blank' download={`${text.replace('\n', '_')}.png`}>Download It</a></li>
				<li><a href='https://coolsville.slack.com/customize/emoji' target='_blank'>Add Emoji to Slack</a></li>
			</ol>
		</div>
	</div>
}


/*****************/

const transforms = require('./text.transforms.js');
function TextTransform(props){
	const [text, setText] = React.useState('dunk');

	return <div className='TextTransform'>
		<h2>Text Transform</h2>

		<textarea className='textEntry' onChange={(evt)=>setText(evt.target.value)} value={text} autoFocus />

		<div className='transforms'>
			{Object.entries(transforms).map(([name, func], idx)=>{
				const res = func(text)
				return <div key={idx}>
					<button onClick={()=>navigator.clipboard.writeText(res)}>copy</button>
					<input readOnly value={res} />
					<span>{name}</span>
				</div>
			})
			}
		</div>
	</div>
}



//////////////////


function Main({ ...props }){

	return <div className={`Main`} {...props}>
		<Title>Slack Tools v{pckg.version}</Title>
		<h1>Slack Tools v{pckg.version}</h1>

		<hr />
		<div className='group'>
			<EmojiMaker />
			<TextTransform />
		</div>
	</div>;
};

module.exports = Main;