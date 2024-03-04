// dados do canvas
var myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext("2d");
const height = myCanvas.clientHeight;
const width = myCanvas.clientWidth;

// config
let num_particulas;
let particulas = [];

// class
class Particula {
	constructor(x, y, r, vel_x, vel_y, color) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.vel_x = vel_x;
		this.vel_y = vel_y;
		this.color = color;
	}
	print() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);		//x,y,r,ang inicial, 0.00-2.00 *pi
		ctx.fillStyle = this.color;
		ctx.fill();
	}
	move() {
		this.x += this.vel_x;
		this.y += this.vel_y;
		this.print();
	}
}

// input range
const in_range = document.getElementById("range");
const txt_qtd_particulas = document.getElementById("qtd_particulas");
txt_qtd_particulas.textContent = in_range.value;
num_particulas = in_range.value;

in_range.addEventListener('input', ()=> {
	txt_qtd_particulas.textContent = in_range.value;
})

function clearFrame() {
	ctx.beginPath();
	ctx.rect(0, 0, width, height);
	ctx.fillStyle = "white";
	ctx.fill();
}

function start() {
	const colors = [
		"red", 
		"orange",
		"yellow",
		"green",
		"blue",
		"purple",
		"pink",
		"black",
		"gray"];
	
	clearFrame();
	
	// geração das particulas
	for(let i = 0; i < num_particulas; i++) {
		let r = Math.floor(Math.random() * 6) + 1;
		let x = Math.floor(Math.random() * width);
		let y = Math.floor(Math.random() * height);
		
		let color = Math.floor(Math.random() * colors.length);
		
		// evita a geração na borda
		if(x < (0 + r)) x = r;
		if(x > (width - r)) x = width - r;
		if(y < (0 + r)) y = r;
		if(y > (height - r)) y = height - r;
		
		// define velocidade
		let vel_x = Math.floor(Math.random() * 4) + 1;
		let vel_y = Math.floor(Math.random() * 4) + 1;
		
		// define sentido
		if(Math.random() > 0.5) vel_x *= -1;
		if(Math.random() < 0.5) vel_y *= -1;
		
		const obj = new Particula(x, y, r, vel_x, vel_y, colors[color]);
		obj.print();
		
		particulas.push(obj);
	}
}
start();

// btn atualizar
const btn_atualizar = document.getElementById("btn_atualizar");

btn_atualizar.addEventListener('click', ()=> {
	num_particulas = in_range.value;
	particulas = [];
	clearFrame();
	start();
})

// atualiza o frame
setInterval(()=>{
	clearFrame();
	
	for(let i = 0; i < particulas.length; i++) {
		let {x, y, r} = particulas[i];
		
		if(x < (0 + r) || x > (width - r)) {
			particulas[i].vel_x *= -1;
		}
		if(y < (0 + r) || y > (height - r)) {
			particulas[i].vel_y *= -1;
		}
		
		particulas[i].move();
	}
}, 20);