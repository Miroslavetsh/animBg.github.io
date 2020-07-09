let canvas = document.querySelector("canvas"),
    ctx     = canvas.getContext('2d'),
 	w = window.innerWidth,
    h = window.innerHeight

canvas.width = w
canvas.height = h

// Animation

let mouse = {
	x: undefined,
	y: undefined,
}

window.addEventListener('mousemove', function (event) {
	mouse.x = event.x
	mouse.y = event.y
})

window.addEventListener('resize', function () {
	canvas.width = w
	canvas.height = h

	init()
})

function Circle(x, y, r, dx, dy, redc, greenc, bluec, op, fill) {
	this.x = x
	this.y = y
	this.r = r
	this.dx = dx
	this.dy = dy
	this.redc = redc
	this.greenc = greenc
	this.bluec = bluec
	this.op = op
	this.fill = fill 

	this.draw = function () {
		ctx.beginPath()
		ctx.strokeStyle = `rgba(${redc}, ${greenc}, ${bluec}, ${op})`
		ctx.fillStyle = `rgba(${redc}, ${greenc}, ${bluec}, ${op})`
		ctx.arc(this.x, this.y, this.r, Math.PI * 2, false)
		if (fill) ctx.fill()
		ctx.stroke()
	}

	this.update = function () {
		if (this.x > w - this.r || this.x < 0 + this.r) {
			this.dx = -this.dx
		}
		if(this.y > h - this.r || this.y < 0 + this.r) {
			this.dy = -this.dy
		}

		this.x += this.dx
		this.y += this.dy

		// Interractive

		if (mouse.x - this.x < r && mouse.x - this.x > -r && mouse.y - this.y < r && mouse.y - this.y > -r) {
			this.r += 3
		}else if (this.r > r){
			this.r -= 3 
		}

		this.draw()
	}
}

let	circleArray = []

function init() {
	circleArray = []

	for (let i = 0; i < 30; i++) {
		let  r = 20 + Math.random() * 50,
			 x = Math.random() * (w - r * 2) + r,
			 y = Math.random() * (h - r * 2) + r,
			 redc = 100 + Math.random() * 60,
			 greenc = 100 + Math.random() * 60,
			 bluec = 100 + Math.random() * 155,
			 op = Math.random(),
			 dx = (Math.random() - 0.5) * 2,
			 dy = (Math.random() - 0.5) * 2,
			 dr = (Math.random() - 0.5) * 2,
			 fill = Math.round(Math.random())

		circleArray.push(new Circle(x, y, r, dx, dy, redc, greenc, bluec, op, fill))
	}
	
}

init()

console.log(circleArray)

function animate() {
	requestAnimationFrame(animate)
	ctx.clearRect(0, 0, w, h)

	for (let i = 0; i < circleArray.length; i++) {
		circleArray[i].update()
	}
}

animate()












// Rectangles

// ctx.fillStyle = '#5794e5'
// ctx.fillRect(100, 200, 600, 800)


// Lines

// ctx.beginPath()
// ctx.moveTo(100, 50)
// ctx.lineTo(400, 500)
// ctx.lineTo(700, 200)
// ctx.strokeStyle = '#2d2d2d'
// ctx.stroke()


// Arc

//  Background

// for (let i = 0; i < 70; i++) {
	
// 	let x = Math.random() * w,
// 		y = Math.random() * h,
// 		r = Math.random() * 100,
// 		redc = Math.random() * 160,
// 		greenc = Math.random() * 160,
// 		bluec = Math.random() * 255,
// 		op = Math.random()

// 	ctx.beginPath()
// 	ctx.strokeStyle = `rgba(${redc}, ${greenc}, ${bluec}, ${op})`
// 	ctx.fillStyle = `rgba(${redc}, ${greenc}, ${bluec}, ${op})`
// 	ctx.arc(x, y, r, Math.PI * 2, false)
// 	ctx.fill()
// 	ctx.stroke()
// }