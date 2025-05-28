class Carousel {
	constructor() {
		this.track = document.getElementById("carouselTrack");
		this.slides = document.querySelectorAll(".carousel-slide");
		this.prevBtn = document.getElementById("prevBtn");
		this.nextBtn = document.getElementById("nextBtn");
		this.indicators = document.querySelectorAll(".indicator");
		this.thumbnails = document.querySelectorAll(".thumbnail");

		this.currentSlide = 0;
		this.totalSlides = this.slides.length;
		this.autoPlayInterval = null;

		this.init();
	}

	init() {
		this.setupEventListeners();
		this.startAutoPlay();
	}

	setupEventListeners() {
		// Botones de navegación
		this.nextBtn.addEventListener("click", () => this.nextSlide());
		this.prevBtn.addEventListener("click", () => this.prevSlide());

		// Indicadores
		this.indicators.forEach((indicator, index) => {
			indicator.addEventListener("click", () => this.goToSlide(index));
		});

		// Miniaturas
		this.thumbnails.forEach((thumbnail, index) => {
			thumbnail.addEventListener("click", () => this.goToSlide(index));
		});

		// Navegación con teclado
		document.addEventListener("keydown", (e) => {
			if (e.key === "ArrowLeft") {
				this.prevSlide();
			} else if (e.key === "ArrowRight") {
				this.nextSlide();
			}
		});

		// Pausar auto-play al hacer hover
		const carouselContainer = document.querySelector(".carousel-container");
		carouselContainer.addEventListener("mouseenter", () => this.stopAutoPlay());
		carouselContainer.addEventListener("mouseleave", () => this.startAutoPlay());
	}

	updateCarousel(slideIndex) {
		// Remover clases activas
		this.slides.forEach((slide) => slide.classList.remove("active"));
		this.indicators.forEach((indicator) => indicator.classList.remove("active"));
		this.thumbnails.forEach((thumbnail) => thumbnail.classList.remove("active"));

		// Agregar clases activas
		this.slides[slideIndex].classList.add("active");
		this.indicators[slideIndex].classList.add("active");
		this.thumbnails[slideIndex].classList.add("active");

		// Mover el track
		this.track.style.transform = `translateX(-${slideIndex * 100}%)`;

		this.currentSlide = slideIndex;
	}

	nextSlide() {
		const next = (this.currentSlide + 1) % this.totalSlides;
		this.goToSlide(next);
	}

	prevSlide() {
		const prev = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
		this.goToSlide(prev);
	}

	goToSlide(slideIndex) {
		this.updateCarousel(slideIndex);
		this.resetAutoPlay();
	}

	startAutoPlay() {
		this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
	}

	stopAutoPlay() {
		if (this.autoPlayInterval) {
			clearInterval(this.autoPlayInterval);
			this.autoPlayInterval = null;
		}
	}

	resetAutoPlay() {
		this.stopAutoPlay();
		this.startAutoPlay();
	}
}

// Inicializar el carrusel cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
	new Carousel();
});
