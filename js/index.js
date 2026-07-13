/* Archivo extraído de index.html */

    const productosCatalogo = [
        "PINTURA VINIL-ACRÍLICA VINIREC",
        "PINTURA VINIL-ACRÍLICA INNOVAMAX",
        "PINTURA VINIL-ACRÍLICA KOLORS",
        "PINTURA VINIL-ACRÍLICA ACRIDEL",
        "PINTURA VINIL-ACRÍLICA PRINCESS ESPECIAL",
        "PINTURA VINIL-ACRÍLICA PRINCESS E ANTIBACTERIAL",
        "IMPERMEABILIZANTE ACRÍLICO ELASTOMÉRICO 3 AÑOS",
        "IMPERMEABILIZANTE ACRÍLICO ELASTOMÉRICO 5 AÑOS",
        "IMPERMEABILIZANTE ACRÍLICO ELASTOMÉRICO 7 AÑOS",
        "IMPERMEABILIZANTE ACRÍLICO ELASTOMÉRICO 10 AÑOS",
        "IMPERMEABILIZANTE FIBRATADO",
        "PASTA TEXTURIZADA",
        "PEGATIROL",
        "PEGAYESO",
        "RESINA MULTIUSOS",
        "SELLADOR VINÍLICO 5X1",
        "SELLADOR VINÍLICO ENTINTABLE",
        "ESMALTE BASE AGUA",
        "RECUBRIMIENTO INTUMESCENTE",
        "ESMALTE MARTILLADO",
        "ALUMINIO ALTA TEMPERATURA",
        "ESMALTE ACRÍLICO",
        "ESMALTE DE HORNEO ALQUIDAL",
        "POLIURETANO ALTOS SÓLIDOS",
        "PRIMARIO EPÓXICO",
        "PRIMER DE POLIURETANO",
        "RECUBRIMIENTO DE POLIURETANO DE 2 COMPONENTES AL 10%",
        "SISTEMA EPÓXICO MAX PARA PISO",
        "SISTEMA EPÓXICO MAX PARA METAL",
        "RECUBRIMIENTO ALTOS SÓLIDOS BLANCO",
        "PRIMARIO FOSFATO DE ZINC EPOXI-POLIAMIDA (C.F.E. P-19 NORMA)",
        "INTUMESCENTE CONTRA INCENDIOS (C.F.E. P-32 NORMA)",
        "PRIMARIO EPOXI-CICLOALIFÁTICO DE ALTOS SÓLIDOS (C.F.E. P-33 NORMA)",
        "PRIMARIO EPOXI-AMINA DE ALTOS SÓLIDOS",
        "PEMEX RP-4B MODIFICADO",
        "PRIMARIO ORGÁNICO DE ZINC EPÓXICO-POLIAMIDA (C.F.E. P-9 NORMA)",
        "PEMEX RA-26 MODIFICADO",
        "PEMEX RA-28 MODIFICADO",
        "ACABADO POLIURETANO MODIFICADO DE ALTOS SÓLIDOS CFE-A29",
        "PINTURA PARA CANCHAS",
        "PINTURA PARA SEÑALAMIENTO BASE AGUA",
        "RECUBRIMIENTO ANTIGRAFITI",
        "ESMALTE DE HULE CLORADO",
        "ESMALTE INNOVAREL SECADO RÁPIDO",
        "ESMALTE LUSTRASOL SECADO NORMAL",
        "ESMALTE LUSTRASOL SECADO RÁPIDO",
        "ESMALTE INNOVAREL SECADO NORMAL",
        "ESMALTE SECADO RÁPIDO METÁLICOS",
        "PINTURA PARA ALBERCA",
        "PINTURA PARA PISO",
        "PRIMARIO DE SECADO RÁPIDO",
        "PINTURA PARA SEÑALAMIENTO BASE SOLVENTE"
    ];

    function calcularPintura() {
        const area = parseFloat(document.getElementById('area').value);
        const coats = parseFloat(document.getElementById('coats').value);
        const surfaceFactor = parseFloat(document.getElementById('surface').value);
        const rendimiento = parseFloat(document.getElementById('product').value);
        const presentacion = parseFloat(document.getElementById('presentation').value);

        if (!area || area <= 0) {
            document.getElementById('litrosResultado').textContent = 'Ingresa un área válida';
            document.getElementById('envasesResultado').textContent = '--';
            document.getElementById('totalCompraResultado').textContent = '--';
            return;
        }

        const merma = 1.10;
        const litrosNecesarios = ((area / rendimiento) * coats * surfaceFactor) * merma;
        const litrosRedondeados = Math.ceil(litrosNecesarios * 100) / 100;

        const envases = Math.ceil(litrosNecesarios / presentacion);
        const totalCompra = envases * presentacion;

        document.getElementById('litrosResultado').textContent = litrosRedondeados.toFixed(2) + ' L';
        document.getElementById('envasesResultado').textContent = envases + ' envase(s) de ' + presentacion + ' L';
        document.getElementById('totalCompraResultado').textContent = totalCompra.toFixed(2) + ' L';
    }



    const lineasSeccion = [
        {
            nombre: 'Arquitectónica',
            slug: 'arquitectonica',
            badge: 'Línea arquitectónica',
            color: '#2f9a48',
            descripcion: 'Acabados decorativos y funcionales para muros, fachadas, impermeabilización y superficies arquitectónicas.',
            descripcionExtendida: 'Una línea pensada para proyectos residenciales, comerciales e institucionales que requieren buena apariencia, protección, rendimiento y soluciones complementarias para preparación de superficie.',
            tags: ['Interiores', 'Exteriores', 'Impermeabilización', 'Selladores', 'Texturizados'],
            metricas: [
                { numero: '18', label: 'productos en catálogo' },
                { numero: '3', label: 'familias principales' },
                { numero: '1L–200L', label: 'presentaciones' }
            ],
            producto: {
                badge: 'Soluciones arquitectónicas',
                titulo: 'Línea Arquitectónica',
                texto: 'Vinil-acrílicas, impermeabilizantes, selladores y productos especiales para interiores y exteriores.',
                imagen: 'img/Princess_promo.png',
                enlace: 'productos.html#arquitectonica',
                cta: 'Ver línea completa',
                caracteristicas: ['Excelente presentación visual', 'Opciones para preparación y acabado', 'Productos para obra nueva y mantenimiento']
            }
        },
        {
            nombre: 'Industrial',
            slug: 'industrial',
            badge: 'Línea industrial',
            color: '#cf3f38',
            descripcion: 'Recubrimientos para protección de superficies metálicas, pisos, equipos y estructuras expuestas a alta exigencia.',
            descripcionExtendida: 'Diseñada para plantas, talleres, estructuras, equipos y proyectos donde el desempeño del recubrimiento es clave: resistencia, protección anticorrosiva, durabilidad y sistemas especializados.',
            tags: ['Epóxicos', 'Poliuretanos', 'Primarios', 'Altos sólidos', 'Protección anticorrosiva'],
            metricas: [
                { numero: '21', label: 'productos en catálogo' },
                { numero: '2', label: 'bases disponibles' },
                { numero: 'CFE', label: 'sistemas especializados' }
            ],
            producto: {
                badge: 'Protección industrial',
                titulo: 'Línea Industrial',
                texto: 'Primarios, epóxicos, poliuretanos, sistemas para piso, intumescentes y recubrimientos de alto desempeño.',
                imagen: 'img/Productos/Productos_especiales_19L.png',
                enlace: 'productos.html#industrial',
                cta: 'Ver línea completa',
                caracteristicas: ['Sistemas para ambientes exigentes', 'Opciones base agua y base solvente', 'Enfoque en protección y durabilidad']
            }
        },
        {
            nombre: 'Mantenimiento',
            slug: 'mantenimiento',
            badge: 'Mantenimiento y señalización',
            color: '#d4a514',
            descripcion: 'Soluciones para conservación, repintado, señalización, pisos, canchas, albercas y áreas de tránsito.',
            descripcionExtendida: 'Una línea práctica para mantener áreas operativas, visibles y protegidas, con productos orientados a retoque, señalamiento, pintura para piso, canchas y necesidades de mantenimiento general.',
            tags: ['Señalamiento', 'Pisos', 'Albercas', 'Canchas', 'Esmaltes'],
            metricas: [
                { numero: '13', label: 'productos en catálogo' },
                { numero: '2', label: 'bases disponibles' },
                { numero: 'Alta', label: 'visibilidad operativa' }
            ],
            producto: {
                badge: 'Mantenimiento operativo',
                titulo: 'Mantenimiento y Señalización',
                texto: 'Pinturas para señalamiento, pisos, canchas, albercas y esmaltes de mantenimiento para conservar áreas en buen estado.',
                imagen: 'img/Productos/trafico.png',
                enlace: 'productos.html#mantenimiento',
                cta: 'Ver línea completa',
                caracteristicas: ['Aplicaciones para áreas de tránsito', 'Opciones para repintado y conservación', 'Productos para operación y mantenimiento']
            }
        }
    ];

    let activeLineIndex = 0;

    function animateLinePanels(direction = 1) {
        const lineContentGrid = document.getElementById('lineContentGrid');
        if (!lineContentGrid) return;
        lineContentGrid.classList.remove('is-animating');
        lineContentGrid.removeAttribute('data-direction');
        void lineContentGrid.offsetWidth;
        lineContentGrid.setAttribute('data-direction', direction < 0 ? 'prev' : 'next');
        lineContentGrid.classList.add('is-animating');
        window.clearTimeout(animateLinePanels.timeoutId);
        animateLinePanels.timeoutId = window.setTimeout(() => {
            lineContentGrid.classList.remove('is-animating');
            lineContentGrid.removeAttribute('data-direction');
        }, 520);
    }

    function renderLineCarousel() {
        const track = document.getElementById('lineCarouselTrack');
        if (!track) return;

        track.innerHTML = lineasSeccion.map((linea, index) => `
            <button
                type="button"
                class="line-tab-button ${index === activeLineIndex ? 'is-active' : ''}"
                data-line-index="${index}"
                role="tab"
                aria-selected="${index === activeLineIndex ? 'true' : 'false'}"
                aria-label="Mostrar línea ${linea.nombre}"
                style="--card-accent: ${linea.color};"
            >
                <span class="line-tab-index">0${index + 1}</span>
                <span class="line-tab-text">
                    <strong>${linea.nombre}</strong>
                    <small>${linea.badge}</small>
                </span>
            </button>
        `).join('');

        track.querySelectorAll('.line-tab-button').forEach(card => {
            card.addEventListener('click', () => {
                const nextIndex = Number(card.dataset.lineIndex);
                if (Number.isNaN(nextIndex) || nextIndex === activeLineIndex) return;
                const direction = nextIndex > activeLineIndex ? 1 : -1;
                activeLineIndex = nextIndex;
                renderLineCarousel();
                renderActiveLineContent(true, direction);
            });
        });
    }

    function renderActiveLineContent(animate = false, direction = 1) {
        const lineBox = document.getElementById('lineShowcaseBox');
        const activeLineBadge = document.getElementById('activeLineBadge');
        const activeLineTitle = document.getElementById('activeLineTitle');
        const activeLineDescription = document.getElementById('activeLineDescription');
        const lineMetrics = document.getElementById('lineMetrics');
        const lineTags = document.getElementById('lineTags');
        const promoBadge = document.getElementById('promoBadge');
        const promoTitle = document.getElementById('promoTitle');
        const promoText = document.getElementById('promoText');
        const promoImage = document.getElementById('promoImage');
        const promoLink = document.getElementById('promoLink');
        const lineFeatureList = document.getElementById('lineFeatureList');
        const lineCatalogLink = document.getElementById('lineCatalogLink');
        const lineQuoteLink = document.getElementById('lineQuoteLink');

        const linea = lineasSeccion[activeLineIndex];

        if (lineBox) {
            lineBox.style.setProperty('--line-accent', linea.color);
        }

        if (activeLineBadge) activeLineBadge.textContent = linea.badge;
        if (activeLineTitle) activeLineTitle.textContent = linea.nombre;
        if (activeLineDescription) activeLineDescription.textContent = linea.descripcionExtendida;

        if (lineMetrics) {
            lineMetrics.innerHTML = linea.metricas.map(item => `
                <div class="line-metric">
                    <strong>${item.numero}</strong>
                    <span>${item.label}</span>
                </div>
            `).join('');
        }

        if (lineTags) {
            lineTags.innerHTML = linea.tags.map(tag => `<span>${tag}</span>`).join('');
        }

        if (promoBadge) promoBadge.textContent = linea.producto.badge;
        if (promoTitle) promoTitle.textContent = linea.producto.titulo;
        if (promoText) promoText.textContent = linea.producto.texto;
        if (promoImage) {
            promoImage.src = linea.producto.imagen;
            promoImage.alt = linea.producto.titulo;
        }
        if (promoLink) {
            promoLink.href = linea.producto.enlace;
            promoLink.textContent = linea.producto.cta;
        }
        if (lineCatalogLink) lineCatalogLink.href = linea.producto.enlace;
        if (lineQuoteLink) lineQuoteLink.href = '#contacto';
        if (lineFeatureList) {
            lineFeatureList.innerHTML = linea.producto.caracteristicas.map(item => `<li>${item}</li>`).join('');
        }

        if (animate) {
            animateLinePanels(direction);
        }
    }

    function cambiarLinea(direction) {
        activeLineIndex = (activeLineIndex + direction + lineasSeccion.length) % lineasSeccion.length;
        renderLineCarousel();
        renderActiveLineContent(true, direction);
    }

    function initLineShowcase() {
        const track = document.getElementById('lineCarouselTrack');
        const linePrevBtn = document.getElementById('linePrevBtn');
        const lineNextBtn = document.getElementById('lineNextBtn');

        if (!track) return;

        renderLineCarousel();
        renderActiveLineContent(false);

        if (linePrevBtn) linePrevBtn.addEventListener('click', () => cambiarLinea(-1));
        if (lineNextBtn) lineNextBtn.addEventListener('click', () => cambiarLinea(1));

        track.addEventListener('keydown', (e) => {
            if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
            e.preventDefault();
            cambiarLinea(e.key === 'ArrowRight' ? 1 : -1);
            const activeButton = track.querySelector('.line-tab-button.is-active');
            if (activeButton) activeButton.focus();
        });
    }

    function initPantoneGallery() {
        const slider = document.getElementById('pantoneSlider');
        if (!slider) return;

        const slides = [...slider.querySelectorAll('.pantone-slide')];
        const thumbs = [...slider.querySelectorAll('.pantone-thumb')];
        const prevBtn = document.getElementById('pantonePrevBtn');
        const nextBtn = document.getElementById('pantoneNextBtn');
        const counter = document.getElementById('pantoneSlideCounter');
        const name = document.getElementById('pantoneSlideName');
        let current = 0;
        let autoplayId;

        function showSlide(index) {
            if (!slides.length) return;
            current = (index + slides.length) % slides.length;

            slides.forEach((slide, i) => {
                slide.classList.toggle('is-active', i === current);
            });

            thumbs.forEach((thumb, i) => {
                thumb.classList.toggle('is-active', i === current);
                thumb.setAttribute('aria-pressed', i === current ? 'true' : 'false');
            });

            const activeSlide = slides[current];
            if (counter) counter.textContent = String(current + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
            if (name) name.textContent = `${activeSlide.dataset.title} · ${activeSlide.dataset.color}`;
        }

        function nextSlide() {
            showSlide(current + 1);
        }

        function prevSlide() {
            showSlide(current - 1);
        }

        function startAutoplay() {
            stopAutoplay();
            autoplayId = window.setInterval(nextSlide, 4800);
        }

        function stopAutoplay() {
            if (autoplayId) window.clearInterval(autoplayId);
        }

        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoplay(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoplay(); });

        thumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                showSlide(Number(thumb.dataset.slide));
                startAutoplay();
            });
        });

        slider.addEventListener('mouseenter', stopAutoplay);
        slider.addEventListener('mouseleave', startAutoplay);
        slider.addEventListener('focusin', stopAutoplay);
        slider.addEventListener('focusout', startAutoplay);

        showSlide(0);
        startAutoplay();
    }




    function handleNavbar() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    function reveal() {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    function normalizarTexto(texto) {
        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    function obtenerMensajeProducto(nombreProducto) {
        return `Hola, estoy interesado en el producto "${nombreProducto}". ¿Podrían brindarme más información técnica, presentaciones disponibles y opciones de compra?`;
    }

    function cargarProductoEnFormulario() {
        const params = new URLSearchParams(window.location.search);
        const producto = params.get('producto');
        const mensajeInput = document.getElementById('contactMessage');
        const formulario = document.querySelector('.contact-form');
        const navbar = document.querySelector('.navbar');

        if (!producto || !mensajeInput || !formulario) return;

        mensajeInput.value = obtenerMensajeProducto(producto);

        const ajustarScrollFormulario = () => {
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const margenExtra = window.innerWidth <= 768 ? 16 : 20;
            const destino = mensajeInput.getBoundingClientRect().top + window.pageYOffset - navbarHeight - margenExtra;

            window.scrollTo({
                top: Math.max(destino, 0),
                behavior: 'smooth'
            });
        };

        [250, 700, 1300, 2000].forEach(tiempo => {
            setTimeout(ajustarScrollFormulario, tiempo);
        });

        setTimeout(() => {
            ajustarScrollFormulario();
            mensajeInput.focus({ preventScroll: true });
        }, 2200);
    }

    function obtenerSugerenciasInicio(termino) {
        const terminoNormalizado = normalizarTexto(termino);
        return productosCatalogo
            .filter(nombre => normalizarTexto(nombre).includes(terminoNormalizado))
            .slice(0, 6);
    }

    function mostrarSugerenciasInicio(inputId, suggestionsId) {
        const input = document.getElementById(inputId);
        const suggestionsBox = document.getElementById(suggestionsId);

        if (!input || !suggestionsBox) return;

        const termino = input.value.trim();

        suggestionsBox.innerHTML = '';

        if (!termino) {
            suggestionsBox.classList.remove('show');
            return;
        }

        const sugerencias = obtenerSugerenciasInicio(termino);

        if (!sugerencias.length) {
            suggestionsBox.classList.remove('show');
            return;
        }

        sugerencias.forEach((sugerencia, index) => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            if (index === 0) item.classList.add('active-suggestion');
            item.textContent = sugerencia;

            item.addEventListener('click', () => {
                input.value = sugerencia;
                suggestionsBox.classList.remove('show');
                buscarProductoEnCatalogo(inputId, suggestionsId);
            });

            suggestionsBox.appendChild(item);
        });

        suggestionsBox.classList.add('show');
    }

    function buscarProductoEnCatalogo(inputId = 'productSearch', suggestionsId = 'searchSuggestions') {
        const input = document.getElementById(inputId);
        const suggestionsBox = document.getElementById(suggestionsId);

        if (!input) return;

        const termino = input.value.trim();

        if (suggestionsBox) {
            suggestionsBox.classList.remove('show');
        }

        if (!termino) return;

        window.location.href = 'productos.html?buscar=' + encodeURIComponent(termino);
    }

    function manejarTeclasBusqueda(e, inputId, suggestionsId) {
        const suggestionsBox = document.getElementById(suggestionsId);
        if (!suggestionsBox) return;

        const items = [...suggestionsBox.querySelectorAll('.suggestion-item')];
        const currentIndex = items.findIndex(item => item.classList.contains('active-suggestion'));

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (!items.length) return;
            const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
            items.forEach(item => item.classList.remove('active-suggestion'));
            items[nextIndex].classList.add('active-suggestion');
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (!items.length) return;
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
            items.forEach(item => item.classList.remove('active-suggestion'));
            items[prevIndex].classList.add('active-suggestion');
        }

        if (e.key === 'Enter') {
            e.preventDefault();
            const activeItem = suggestionsBox.querySelector('.suggestion-item.active-suggestion');
            if (activeItem) {
                activeItem.click();
            } else {
                buscarProductoEnCatalogo(inputId, suggestionsId);
            }
        }

        if (e.key === 'Escape') {
            suggestionsBox.classList.remove('show');
            closeMobileMenu();
            closeMobileSearch();
        }
    }

    const pantoneTooltip = document.getElementById('pantoneTooltip');
    const pantoneCards = document.querySelectorAll('.pantone-card');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const searchToggleBtn = document.getElementById('searchToggleBtn');
    const mobileSearchPanel = document.getElementById('mobileSearchPanel');

    function actualizarBloqueoScroll() {
        const menuAbierto = mobileMenu && mobileMenu.classList.contains('show');
        const searchAbierta = mobileSearchPanel && mobileSearchPanel.classList.contains('show');
        document.body.style.overflow = (window.innerWidth <= 992 && (menuAbierto || searchAbierta)) ? 'hidden' : '';
    }

    function closeMobileMenu() {
        if (!hamburgerBtn || !mobileMenu) return;
        mobileMenu.classList.remove('show');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        actualizarBloqueoScroll();
    }

    function toggleMobileMenu() {
        if (!hamburgerBtn || !mobileMenu) return;
        const willOpen = !mobileMenu.classList.contains('show');

        closeMobileSearch();

        mobileMenu.classList.toggle('show', willOpen);
        hamburgerBtn.classList.toggle('active', willOpen);
        hamburgerBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        actualizarBloqueoScroll();
    }

    function closeMobileSearch() {
        if (!searchToggleBtn || !mobileSearchPanel) return;
        mobileSearchPanel.classList.remove('show');
        searchToggleBtn.classList.remove('active');
        searchToggleBtn.setAttribute('aria-expanded', 'false');
        actualizarBloqueoScroll();
    }

    function toggleMobileSearch() {
        if (!searchToggleBtn || !mobileSearchPanel) return;
        const willOpen = !mobileSearchPanel.classList.contains('show');

        closeMobileMenu();

        mobileSearchPanel.classList.toggle('show', willOpen);
        searchToggleBtn.classList.toggle('active', willOpen);
        searchToggleBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        actualizarBloqueoScroll();
    }

    pantoneCards.forEach(card => {
        const label = card.querySelector('.pantone-code')?.textContent?.trim() || '';

        card.addEventListener('mouseenter', () => {
            if (!pantoneTooltip) return;
            pantoneTooltip.textContent = label;
            pantoneTooltip.classList.add('show');
        });

        card.addEventListener('mousemove', (e) => {
            if (!pantoneTooltip) return;
            pantoneTooltip.style.left = (e.clientX + 18) + 'px';
            pantoneTooltip.style.top = (e.clientY - 18) + 'px';
        });

        card.addEventListener('mouseleave', () => {
            if (!pantoneTooltip) return;
            pantoneTooltip.classList.remove('show');
        });
    });

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    if (searchToggleBtn) {
        searchToggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileSearch();
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                closeMobileMenu();
            }
        });
    });

    window.addEventListener('scroll', () => {
        handleNavbar();
        reveal();
        if (pantoneTooltip) {
            pantoneTooltip.classList.remove('show');
        }
        if (window.innerWidth <= 992) {
            closeMobileMenu();
            closeMobileSearch();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            closeMobileMenu();
            closeMobileSearch();
        } else {
            actualizarBloqueoScroll();
        }
    });

    window.addEventListener('load', () => {
        handleNavbar();
        cargarProductoEnFormulario();
        initLineShowcase();
        initPantoneGallery();

        const heroReveals = document.querySelectorAll('.hero .reveal');
        heroReveals.forEach(element => element.classList.remove('active'));

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                heroReveals.forEach(element => element.classList.add('active'));
                reveal();
            });
        });
    });

    const productSearchInput = document.getElementById('productSearch');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const mobileProductSearchInput = document.getElementById('mobileProductSearch');
    const mobileSearchSuggestions = document.getElementById('mobileSearchSuggestions');

    if (productSearchInput) {
        productSearchInput.addEventListener('input', () => mostrarSugerenciasInicio('productSearch', 'searchSuggestions'));
        productSearchInput.addEventListener('keydown', (e) => manejarTeclasBusqueda(e, 'productSearch', 'searchSuggestions'));
    }

    if (mobileProductSearchInput) {
        mobileProductSearchInput.addEventListener('input', () => mostrarSugerenciasInicio('mobileProductSearch', 'mobileSearchSuggestions'));
        mobileProductSearchInput.addEventListener('keydown', (e) => manejarTeclasBusqueda(e, 'mobileProductSearch', 'mobileSearchSuggestions'));
    }

    document.addEventListener('click', function(e) {
        const desktopSearch = document.querySelector('.desktop-search');
        const mobileSearchInside = document.querySelector('.mobile-search-panel');

        if (desktopSearch && !desktopSearch.contains(e.target) && searchSuggestions) {
            searchSuggestions.classList.remove('show');
        }

        if (mobileSearchInside && searchToggleBtn && !mobileSearchInside.contains(e.target) && !searchToggleBtn.contains(e.target)) {
            if (mobileSearchSuggestions) {
                mobileSearchSuggestions.classList.remove('show');
            }
            if (window.innerWidth <= 992) {
                closeMobileSearch();
            }
        }

        if (window.innerWidth <= 992 && mobileMenu && hamburgerBtn) {
            if (!mobileMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });
