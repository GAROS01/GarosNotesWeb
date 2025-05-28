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

	// Mostrar todos los elementos inmediatamente sin animaciones
	document.querySelectorAll(".feature, .thumbnail").forEach((el) => {
		el.style.opacity = "1";
		el.style.transform = "translateY(0)";
	});
});

// CSS para asegurar que no hay animaciones
const style = document.createElement("style");
style.textContent = `
    /* Eliminar todas las animaciones de scroll */
    .feature, .thumbnail {
        opacity: 1 !important;
        transform: translateY(0) !important;
        animation: none !important;
        transition: none !important;
    }
    
    /* Eliminar efecto parallax del hero */
    .hero {
        transform: none !important;
    }
`;
document.head.appendChild(style);
