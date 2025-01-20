{
    const init = () => {
        const canvas = document.querySelector("canvas");
        const crc = canvas.getContext('2d');

        const canvasWidth = canvas.width = window.innerWidth;
        const canvasHeight = canvas.height = window.innerHeight;
        const canvasOffsetTop = canvas.offsetTop;
        const canvasOffsetLeft = canvas.offsetLeft;

        const mousePosition = {
            x: undefined,
            y: undefined
        }

        window.addEventListener("mousemove", (event) => {
            mousePosition.x = event.x;
            mousePosition.y = event.y;

        });

        class Circle {
            constructor(x, y, radious) {
                this.radiousAcceleration = 3;
                this.radiousMax = 40;
                this.x = Math.random() * (x - radious * 4) + radious * 2;
                this.y = Math.random() * (y - radious * 4) + radious * 2;
                this.radious = Math.random() * radious + this.radiousAcceleration;
                this.radiousInit = this.radious;
                this.speedX = Math.random() * 5 - 2.5;
                this.speedY = Math.random() * 5 - 2.5;
                this.colorValue = Math.floor(Math.random() * 255);
                this.color = `hsl(${this.colorValue}, 100%, 50%)`;
            }

            draw(crc) {
                crc.beginPath();
                crc.arc(this.x, this.y, this.radious, 0, Math.PI * 2);
                crc.strokeStyle = 'red';
                crc.fillStyle = this.color;
                crc.fill();
                crc.stroke();
            }
            update() {
                //this.colorValue += 1;
                //this.color = `hsl(${this.colorValue}, 100%, 50%)`;  
                if (this.x + this.radious >= canvasWidth || this.x - this.radious <= 0) {
                    this.speedX = -this.speedX;
                }

                if (this.y + this.radious >= canvasHeight || this.y - this.radious <= 0) {
                    this.speedY = -this.speedY;
                }

                this.x += this.speedX;
                this.y += this.speedY;

                let dX = this.x - mousePosition.x;
                let dY = this.y - mousePosition.y;
                const distance = Math.sqrt(dX**2 + dY**2)
                if (distance <= 100 && this.radious <= this.radiousInit + this.radiousMax) {
                    this.radious += this.radiousAcceleration;
                } else if (this.radious >= this.radiousInit && distance > 100) {
                    this.radious -= this.radiousAcceleration;
                }
            }
        }

        let circles = [];

        for (let i = 0; i < 1000; i++) {
            circles[i] = new Circle(canvasWidth, canvasHeight, 10);
        }

        const fps = 1000 / 120;
        let time = 0
        let t = 0;


        const animate = (timeStamp) => {
            const deltaTime = timeStamp - time;
            time = timeStamp;

            if (t > fps) {
                //crc.clearRect(0, 0, canvasWidth, canvasHeight);
                crc.fillStyle = 'rgba(0, 0, 0, 0.3';
                crc.fillRect(0, 0, canvasWidth, canvasHeight);

                circles.forEach(circle => {
                    circle.update();
                    circle.draw(crc);

                });

                t = 0;
            } else {
                t += deltaTime;
            }

            requestAnimationFrame(animate);
        }

        animate(0)
    }

    init();
}

