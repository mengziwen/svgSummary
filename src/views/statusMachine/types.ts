import {GenNonDuplicateID} from '@/util/public';

export class Status{
	constructor(x?: number, y?: number) {
		this.id = GenNonDuplicateID();
		this.x = x||20;
		this.y = y||20;
		this.width = 100;
		this.height = 100;
		this.name = '双击编辑';
		this.level = 0;
		this.parent = '';
		this.type = 'STATE';
		this.category = '0';
		this.in = '';
		this.out = '';
		this.active = '0';
	}
	id: string;
	x: number;
	y: number;
	width: number;
	height: number;
	name: string;
	level: number;
	//普通，一对多，多对一
	type: string;
	//普通，首尾
	category: string;
	in: string;
	out: string;
	active: string;
	parent: string;
}

export class Line {
	constructor() {
		this.id = GenNonDuplicateID();
		this.x1 = 0;
		this.y1 = 0;
		this.x2 = 0;
		this.y2 = 0;
		this.from = {};
		this.to = {};
		this.name = '双击编辑';
		this.active = '0';
	}
	id: string;
	//起始块左上角相对位移比例
	x1: number;
	y1: number;
	//终点块左上角相对位移比例
	x2: number;
	y2: number;
	//起始块
	from: any;
	//终点块
	to: any;
	name: string;
	active: string;
}