// Navegación suave
document.addEventListener("DOMContentLoaded", function () {
	// Smooth scrolling para enlaces de anclaje
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute("href"));
			if (target) {
				target.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			}
		});
	});

	// Solo aplicar animaciones en pantallas grandes
	const isLargeScreen = window.innerWidth > 768;

	if (isLargeScreen) {
		// Animaciones al hacer scroll (solo en pantallas grandes)
		const observerOptions = {
			threshold: 0.1,
			rootMargin: "0px 0px -50px 0px",
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.style.animationDelay = "0.2s";
					entry.target.style.animation = "fadeInUp 0.4s ease forwards";
				}
			});
		}, observerOptions);

		// Observar elementos para animaciones
		document.querySelectorAll(".feature, .thumbnail").forEach((el) => {
			observer.observe(el);
		});

		// Efecto parallax ligero en el hero (solo en pantallas grandes)
		window.addEventListener("scroll", () => {
			const scrolled = window.pageYOffset;
			const parallax = document.querySelector(".hero");
			if (parallax) {
				const speed = scrolled * 0.2; // Reducido de 0.5 a 0.2
				parallax.style.transform = `translateY(${speed}px)`;
			}
		});
	} else {
		// En pantallas pequeñas, mostrar elementos inmediatamente
		document.querySelectorAll(".feature, .thumbnail").forEach((el) => {
			el.style.opacity = "1";
			el.style.transform = "translateY(0)";
		});
	}
});

// Animaciones CSS
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .feature, .thumbnail {
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    /* En móviles, mostrar elementos sin animación */
    @media (max-width: 768px) {
        .feature, .thumbnail {
            opacity: 1 !important;
            transform: translateY(0) !important;
            animation: none !important;
        }
        
        .hero {
            transform: none !important;
        }
    }
`;
document.head.appendChild(style);
