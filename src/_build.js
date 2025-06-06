import { writeFileSync } from "node:fs";
import base from './base.json' with { type: "json" };

import {palette} from "./Lunar.palette.js";

const themes = [
	{
		name: 'Dark Pink',
		type: 'dark',
		palette,
	},
];

const build = (obj, palette) => {
	for (let k in obj) {
		if (typeof obj[k] === 'object') {
			if (obj[k].length === undefined) build(obj[k], palette);
			else obj[k].forEach((i) => build(i, palette));
		} else if (typeof obj[k] === 'string' && obj[k].startsWith('$')) {
			const s = obj[k].substring(1).split('%');
			const color = palette[s[0]];
			const alpha = s[1] ? s[1] : '';
			obj[k] = `${color}${alpha}`;
		}
	}
};

themes.forEach((theme) => {
	const out = JSON.parse(JSON.stringify(base));
	build(out, theme.palette);

	out.name = theme.name;
	out.type = theme.type;


	writeFileSync(
		`./themes/${theme.name.split(' ').join('')}.json`,
		JSON.stringify(out, null, 2)
	);
});
