let canvas = document.querySelector("canvas"),
    ctx     = canvas.getContext('2d'),
 	w = window.innerWidth,
    h = window.innerHeight,
    gravity = 1,
    friction = 0.6,
    interract = false,
    gravitation = false,
    buttonGravity = document.querySelector('#gravity')
    buttonInterract = document.querySelector('#interract')
    buttonRestart = document.querySelector('#restart')


canvas.width = w
canvas.height = h

window.addEventListener('resize', function () {
	canvas.width = w
	canvas.height = h

	init()
})

buttonGravity.addEventListener('click', function (event) {
	event.preventDefault()

	gravitation = !gravitation
})

buttonInterract.addEventListener('click', function (event) {
	event.preventDefault()

	interract = !interract
})


buttonRestart.addEventListener('click', function (event) {
	event.preventDefault()

	init()
})

let mouse = {
	x: undefined,
	y: undefined,
}

window.addEventListener('mousemove', function (event) {
	mouse.x = event.x
	mouse.y = event.y
})

function Ball(x, y, r, dx, dy, redc, greenc, bluec, op, fill) {
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

		if (interract) {
			this.interractivity()
		}

		// Gravity

		if (gravitation) {
			if(this.y + this.r + this.dy > h) {
				this.dy = -this.dy * friction
			}else {
				this.dy += gravity
			}
			this.y += this.dy
		}

		// draw function to update

		this.draw()
	}

	this.interractivity = function interractivity() {
		if (mouse.x - this.x < r + 20 && mouse.x - this.x > -r - 20 && mouse.y - this.y < r + 20 && mouse.y - this.y > -r - 20) {
			this.r += 3
		}else if (this.r > r || this.r >= 200){
			this.r -= 3 
		}
	}
}

let	ballArray = []

function init() {
	ballArray = []

	for (let i = 0; i < 100; i++) {
		let  r = 20 + Math.random() * 40,
			 x = Math.random() * (w - r * 2) + r,
			 y = Math.random() * (h - r * 2) + r,
			 yG = Math.random() * (h / 2 - r * 2) + r,
			 redc = 100 + Math.random() * 60,
			 greenc = 100 + Math.random() * 60,
			 bluec = 100 + Math.random() * 155,
			 op = Math.random(),
			 dx = (Math.random() - 0.5) * 2,
			 dy = (Math.random() - 0.5) * 2,
			 dyG = r * Math.random() / 4,
			 fill = Math.round(Math.random())

		ballArray.push(new Ball(x, y, r, dx, dy, redc, greenc, bluec, op, fill))
		
		if (gravitation) {
			ballArray.push(new Ball(x, yG, r, dx, dyG, redc, greenc, bluec, op, fill))
		}
	}
	
}

init()

function animate() {
	requestAnimationFrame(animate)
	ctx.clearRect(0, 0, w, h)

	for (var i = 0; i < ballArray.length; i++) {
		ballArray[i].update()
	}
}

animate()
