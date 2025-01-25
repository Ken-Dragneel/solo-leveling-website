document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll(".additional-nav ul li");
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            document.querySelector(".additional-nav ul li.active").classList.remove("active");
            item.classList.add("active");
        });
    });
    const system = document.getElementById('system');

    const TOTAL = 10;
    const petalArray = [];
    let mouseX = 0;

    // Load petals on image load
    const petalImg = new Image();
    petalImg.src = 'https://djjjk9bjm164h.cloudfront.net/petal.png';
    petalImg.onload = () => {
        for (let i = 0; i < TOTAL; i++) {
            petalArray.push(new Petal());
        }
        render();
    };

    // Track mouse movement
    function touchHandler(e) {
        mouseX = (e.clientX || e.touches[0].clientX) / window.innerWidth;
    }

    window.addEventListener('mousemove', touchHandler);
    window.addEventListener('touchmove', touchHandler);

    // Petal class using div elements
    class Petal {
        constructor() {
            // Create the petal element
            this.element = document.createElement('div');
            this.element.classList.add('petal');
            system.appendChild(this.element);

            this.x = Math.random() * window.innerWidth;
            this.y = (Math.random() * window.innerHeight * 2) - window.innerHeight;
            this.w = 25 + Math.random() * 15;
            this.h = 20 + Math.random() * 10;
            this.opacity = this.w / 40;
            this.flip = Math.random();

            this.xSpeed = 1.5 + Math.random() * 2;
            this.ySpeed = 1 + Math.random() * 1;
            this.flipSpeed = Math.random() * 0.03;

            // Set the initial styles for the petal
            this.element.style.width = `${this.w}px`;
            this.element.style.height = `${this.h}px`;
            this.element.style.opacity = this.opacity;
            this.element.style.transform = `rotate(${Math.random() * 360}deg)`;
        }

        draw() {
            if (this.y > window.innerHeight || this.x > window.innerWidth) {
                this.x = -petalImg.width;
                this.y = (Math.random() * window.innerHeight * 2) - window.innerHeight;
                this.xSpeed = 1.5 + Math.random() * 2;
                this.ySpeed = 1 + Math.random() * 1;
                this.flip = Math.random();
            }

            // Update the position and rotation of the petal
            this.element.style.left = `${this.x}px`;
            this.element.style.top = `${this.y}px`;

            // Update the size with some dynamic scaling
            this.element.style.width = `${this.w * (0.6 + (Math.abs(Math.cos(this.flip)) / 3))}px`;
            this.element.style.height = `${this.h * (0.8 + (Math.abs(Math.sin(this.flip)) / 5))}px`;


        }

        animate() {
            this.x += this.xSpeed + mouseX * 5;
            this.y += this.ySpeed + mouseX * 2;
            this.flip += this.flipSpeed;
            this.draw();
        }
    }

    function render() {
        petalArray.forEach(petal => petal.animate());
        window.requestAnimationFrame(render);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        system.style.width = window.innerWidth + 'px';
        system.style.height = window.innerHeight + 'px';
    });

});
