      
      
              tailwind.config = {
                darkMode: 'class',
                theme: {
                    extend: {
                        colors: {
                            primary: {
                                light: '#4f46e5',
                                dark: '#7c3aed'
                            },
                            secondary: {
                                light: '#10b981',
                                dark: '#34d399'
                            }
                        },
                        animation: {
                            'float': 'float 6s ease-in-out infinite',
                            'float-reverse': 'float-reverse 8s ease-in-out infinite',
                            'spin-slow': 'spin 20s linear infinite'
                        },
                        keyframes: {
                            float: {
                                '0%, 100%': { transform: 'translateY(0)' },
                                '50%': { transform: 'translateY(-20px)' }
                            },
                            'float-reverse': {
                                '0%, 100%': { transform: 'translateY(0)' },
                                '50%': { transform: 'translateY(20px)' }
                            }
                        }
                    }
                }
            }
      
      
      // Dark mode toggle
        const toggleDarkMode = document.getElementById('toggleDarkMode');
        const toggleDarkModeMobile = document.getElementById('toggleDarkModeMobile');
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        // Check for saved user preference or system preference
        if (localStorage.getItem('darkMode') === 'true' || 
            (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.body.classList.add('dark');
            toggleDarkMode.innerHTML = '<i class="fas fa-sun text-yellow-300"></i>';
        }
        
        // Toggle dark mode
        function toggleDarkModeHandler() {
            document.body.classList.toggle('dark');
            const isDark = document.body.classList.contains('dark');
            localStorage.setItem('darkMode', isDark);
            
            if (isDark) {
                toggleDarkMode.innerHTML = '<i class="fas fa-sun text-yellow-300"></i>';
            } else {
                toggleDarkMode.innerHTML = '<i class="fas fa-moon text-gray-700"></i>';
            }
        }
        
        toggleDarkMode.addEventListener('click', toggleDarkModeHandler);
        toggleDarkModeMobile.addEventListener('click', toggleDarkModeHandler);
        
        // Mobile menu toggle
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Highlight active nav link on scroll
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= (sectionTop - 150)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active-nav');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active-nav');
                }
            });
        });
        
        // Animate counters
        const counters = document.querySelectorAll('.counter');
        const speed = 200;
        
        function animateCounters() {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(animateCounters, 1);
                } else {
                    counter.innerText = target;
                }
            });
        }
        
        // Initialize counters when section is in view
        const statsSection = document.querySelector('section.bg-gradient-to-r');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
        
        // Simple Three.js scene for hero section
         // Starfield background animation
  function initStarfield() {
    const container = document.getElementById('starfield-container');
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const starsGeometry = new THREE.BufferGeometry();
    const starVertices = [];

    for (let i = 0; i < 1000; i++) {
      starVertices.push((Math.random() - 0.5) * 1000);
      starVertices.push((Math.random() - 0.5) * 1000);
      starVertices.push((Math.random() - 0.5) * 1000);
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff });
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    function animate() {
      requestAnimationFrame(animate);
      starField.rotation.y += 0.0005;
      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    });
  }

  // Globe animation (your original code)
  function initThreeJS() {
    const container = document.getElementById('threejs-container');
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.5,
      wireframe: true
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const dotGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const dotMaterial = new THREE.MeshBasicMaterial({ color: 0x10b981 });

    for (let i = 0; i < 50; i++) {
      const dot = new THREE.Mesh(dotGeometry, dotMaterial);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 5.2;
      dot.position.x = radius * Math.sin(phi) * Math.cos(theta);
      dot.position.y = radius * Math.sin(phi) * Math.sin(theta);
      dot.position.z = radius * Math.cos(phi);
      scene.add(dot);
    }

    camera.position.z = 10;

    function animate() {
      requestAnimationFrame(animate);
      sphere.rotation.x += 0.001;
      sphere.rotation.y += 0.002;
      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    });
  }

  // Run both animations
  initStarfield();
  initThreeJS();
        // Initialize Three.js when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            initThreeJS();
            
            // Initialize GSAP animations
            gsap.registerPlugin(ScrollTrigger);
            
            // Animate elements on scroll
            gsap.utils.toArray('.timeline-item').forEach((item, i) => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                    opacity: 0,
                    x: -50,
                    duration: 0.8,
                    delay: i * 0.2
                });
            });
            
            // Animate service cards
            gsap.utils.toArray('.card-hover').forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    delay: i * 0.1
                });
            });
            
            // Animate project cards
            gsap.utils.toArray('.project-card').forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    delay: i * 0.15
                });
            });
            
            // Animate testimonial cards
            gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    delay: i * 0.1
                });
            });
        });