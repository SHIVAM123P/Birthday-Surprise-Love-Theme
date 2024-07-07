document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.element');
    const messageDiv = document.getElementById('message');
    const messageText = document.getElementById('message-text');
    const music = document.getElementById('background-music');
    const startButton = document.getElementById('startButton');
    const whatsappButton = document.getElementById('whatsappButton'); // Added WhatsApp button

    let musicStarted = false; // Flag to track if music has started

    // Click event listener for each love note element
    elements.forEach(element => {
        element.addEventListener('click', () => {
            const message = element.getAttribute('data-message');
            const iconSrc = element.getAttribute('data-icon');

            messageText.textContent = message;
            messageDiv.style.backgroundImage = `url(${iconSrc})`;

            // Play a sound effect
            playSoundEffect('sound-effect.mp3'); // Replace 'sound-effect.mp3' with your sound file path

            messageDiv.classList.add('show');

            // Adding background color change effect
            document.body.style.background = getRandomGradient();

            // Hide the message after a few seconds
            setTimeout(() => {
                messageDiv.classList.remove('show');
            }, 2000);
        });
    });

    // Click event listener for the Start button
    startButton.addEventListener('click', () => {
        const h1Element = document.querySelector('h1');
        if (h1Element) {
            h1Element.textContent = "Happiest Birthday Jaan!";
        }

        // Start music if not already started
        if (!musicStarted) {
            music.play();
            musicStarted = true;
        }
    });

    // Click event listener for the WhatsApp button
    whatsappButton.addEventListener('click', () => {
        // Replace with the actual URL you want to share
        const shareUrl = 'https://your-site-name.netlify.app';

        // Use the WhatsApp API to share the URL
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`);
    });

    // Function to play a sound effect
    function playSoundEffect(soundUrl) {
        const sound = new Audio(soundUrl);
        sound.volume = 0.5; // Adjust volume if needed
        sound.play();
    }

    // Function to generate a random gradient background
    function getRandomGradient() {
        const gradients = [
            'linear-gradient(to right, #ffecd2, #fcb69f)',
            'linear-gradient(to right, #fbc2eb, #a6c1ee)',
            'linear-gradient(to right, #ff9a9e, #fecfef)',
            'linear-gradient(to right, #f6d365, #fda085)',
            'linear-gradient(to right, #84fab0, #8fd3f4)'
        ];
        return gradients[Math.floor(Math.random() * gradients.length)];
    }

    // Particle animation setup
    const canvas = document.getElementById('animationCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = 'rgba(255, 182, 193, 0.8)';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.1;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize particles
    function init() {
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            particles.push(new Particle(x, y));
        }
    }

    // Update and draw particles
    function handleParticles() {
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].size <= 0.3) {
                particles.splice(i, 1);
                i--;
            }
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleParticles();
        requestAnimationFrame(animate);
    }

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Start animation and initialization
    init();
    animate();
});
