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
                this.radious = Math.random() * radious + 10;
                this.speedX = Math.random() * 5 - 2.5;
                this.speedY = Math.random() * 5 - 2.5;
                // this.circles = [];
                // this.#initialize();
            }
            // #initialize() {
            //     for (let i = 0; i < 10; i++) {
            //         this.circles[i] = {
            //             this.circles = new Circle();
            //         };

            //     }


            // }
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

        const fps = 1000 / 120;
        let time = 0
        let t = 0;

        let circles = [];

        for (let i = 0; i < 20; i++) {
            circles[i] = new Circle(500, 500, 20);
        }

        console.log(circles)

        const animate = (timeStamp) => {
            const deltaTime = timeStamp - time;
            time = timeStamp;

            if (t > fps) {
                crc.clearRect(0, 0, canvasWidth, canvasHeight);
                circles.forEach(circle => {
                    circle.update();
                    circle.draw(crc);
                });

                // circle.update();
                // circle.draw(crc);
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

