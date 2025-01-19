{
    const init = () => {
        const canvas = document.querySelector("canvas");
        const crc = canvas.getContext('2d');

        let canvasWidth = canvas.width = window.innerWidth;
        let canvasHeight = canvas.height = window.innerHeight;

        class Circle {
            constructor(x, y, radious) {
                this.x = x;
                this.y = y;
                this.radious = radious;
                this.speedX = 5;
                this.speedY = 5;
            }
            draw(crc) {
                crc.beginPath();
                crc.arc(this.x, this.y, this.radious, 0, Math.PI * 2);
                crc.strokeStyle = 'blue';
                crc.stroke();
            }
            update() {
                if (this.x + this.radious >= canvasWidth || this.x - this.radious <= 0) {
                    this.speedX = -this.speedX;
                }

                if (this.y + this.radious >= canvasHeight || this.y - this.radious <= 0) {
                    this.speedY = -this.speedY;
                }
                this.x += this.speedX;
                this.y += this.speedY;
            }
        }

        const circle = new Circle(1400, 200, 50);

        const fps = 1000 / 120;
        let time = 0
        let deltaTime = 0;
        let t = 0;

        const animate = (timeStamp) => {
            deltaTime = timeStamp - time;
            time = timeStamp;

            if (t > fps) {
                crc.clearRect(0, 0, canvasWidth, canvasHeight);
                circle.update();
                circle.draw(crc);
                t = 0;
            }
            t += 1;
            requestAnimationFrame(animate);
        }

        animate()
    }

    init();
}

