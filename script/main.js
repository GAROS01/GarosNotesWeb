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

    // Solo aplicar animaciones muy sutiles en pantallas grandes para las miniaturas
    const isLargeScreen = window.innerWidth > 768;
    
    if (isLargeScreen) {
        // Animaciones muy sutiles solo para las miniaturas
        const observerOptions = {
            threshold: 0.3,
            rootMargin: "0px 0px -20px 0px",
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = "0.1s";
                    entry.target.style.animation = "fadeInSubtle 0.3s ease forwards";
                }
            });
        }, observerOptions);

        // Solo observar las miniaturas para animaciones muy sutiles
        document.querySelectorAll(".thumbnail").forEach((el) => {
            observer.observe(el);
        });

        // Efecto parallax muy ligero en el hero (solo en pantallas grandes)
        window.addEventListener("scroll", () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector(".hero");
            if (parallax) {
                const speed = scrolled * 0.1;
                parallax.style.transform = `translateY(${speed}px)`;
            }
        });
    }

    // Mostrar todas las características inmediatamente sin animación en todos los tamaños
    document.querySelectorAll(".feature").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
    });

    // Mostrar miniaturas inmediatamente en móviles
    if (!isLargeScreen) {
        document.querySelectorAll(".thumbnail").forEach((el) => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        });
    }
});

// Animaciones CSS muy sutiles solo para miniaturas
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeInSubtle {
        from {
            opacity: 0.7;
            transform: translateY(5px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Solo las miniaturas tendrán animación inicial en pantallas grandes */
    .thumbnail {
        opacity: 0;
        transition: opacity 0.2s ease, transform 0.2s ease;
    }
    
    /* Las características se muestran inmediatamente siempre */
    .feature {
        opacity: 1 !important;
        transform: translateY(0) !important;
        animation: none !important;
    }
    
    /* En móviles, mostrar todo sin animación */
    @media (max-width: 768px) {
        .thumbnail {
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
