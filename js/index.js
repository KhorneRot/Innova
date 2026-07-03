/* Archivo extraído de index.html */

    const productosCatalogo = [
        "Pintura Vinílica Mate Interior",
        "Pintura Acrílica Premium Exterior",
        "Esmalte Arquitectónico Base Solvente",
        "Impermeabilizante Acrílico Elastomérico",
        "Primario Anticorrosivo Alquidálico",
        "Esmalte Industrial de Secado Rápido",
        "Recubrimiento Epóxico 2K",
        "Poliuretano Alifático",
        "Pintura Alta Temperatura",
        "Pintura para Tráfico Base Solvente",
        "Pintura Demarcadora de Áreas",
        "Recubrimiento Antideslizante",
        "Esmalte para Mantenimiento General",
        "Sellador Vinílico",
        "Sellador Acrílico para Exterior",
        "Thinner / Reductor",
        "Fondo / Base Preparadora",
        "Wash Primer",
        "Recubrimiento para Piso Industrial",
        "Barniz Protector Transparente",
        "Recubrimiento de Alta Resistencia Química"
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
            descripcion: 'Proyectos residenciales y comerciales con acabados uniformes, cubrimiento confiable y excelente presentación.',
            producto: {
                badge: 'Producto destacado',
                titulo: 'Arquitectónica Premium',
                texto: 'Excelente poder cubriente, acabado uniforme y gran desempeño para proyectos residenciales y comerciales.',
                imagen: 'img/Princess_promo.png',
                enlace: 'productos.html',
                cta: 'Ver productos'
            },
            proyectos: [
                { titulo: 'Renovación residencial 01', texto: 'Desliza para ver el cambio del muro antes y después de aplicar la línea arquitectónica.', antes: 'img/Antes2.png', despues: 'img/Despues2.png' },
                { titulo: 'Renovación residencial 02', texto: 'Agrega aquí un segundo par de imágenes del antes y después para esta misma línea.', antes: 'img/Antes2.png', despues: 'img/Despues2.png' },
                { titulo: 'Renovación residencial 03', texto: 'Puedes seguir agregando más proyectos dentro del arreglo de la línea arquitectónica.', antes: 'img/Antes2.png', despues: 'img/Despues2.png' }
            ]
        },
        {
            nombre: 'Industrial',
            slug: 'industrial',
            badge: 'Línea industrial',
            color: '#cf3f38',
            descripcion: 'Recubrimientos para superficies de alta exigencia, con resistencia, protección y durabilidad en planta y obra.',
            producto: {
                badge: 'Producto destacado',
                titulo: 'Industrial Alta Resistencia',
                texto: 'Ideal para estructuras y superficies que requieren resistencia química, mecánica y larga vida útil.',
                imagen: 'img/producto-promocional.jpg',
                enlace: 'productos.html',
                cta: 'Ver productos'
            },
            proyectos: [
                { titulo: 'Proyecto industrial 01', texto: 'Reemplaza estas imágenes por tus ejemplos reales de la línea industrial.', antes: 'img/Antes2.png', despues: 'img/Despues2.png' },
                { titulo: 'Proyecto industrial 02', texto: 'Agrega más pares antes/después según los trabajos que quieras mostrar.', antes: 'img/Antes2.png', despues: 'img/Despues2.png' },
                { titulo: 'Proyecto industrial 03', texto: 'Este carrusel conserva siempre el mismo encuadre para el efecto cortina.', antes: 'img/Antes2.png', despues: 'img/Despues2.png' }
            ]
        },
        {
            nombre: 'Mantenimiento',
            slug: 'mantenimiento',
            badge: 'Línea mantenimiento',
            color: '#d4a514',
            descripcion: 'Soluciones para conservación, retoque y señalización, pensadas para mantener superficies protegidas y visibles.',
            producto: {
                badge: 'Producto destacado',
                titulo: 'Mantenimiento y Señalización',
                texto: 'Acabados prácticos y funcionales para retoque, mantenimiento preventivo y señalización de áreas.',
                imagen: 'img/producto-promocional.jpg',
                enlace: 'productos.html',
                cta: 'Ver productos'
            },
            proyectos: [
                { titulo: 'Proyecto de mantenimiento 01', texto: 'Sustituye estas rutas por los antes y después de la línea de mantenimiento.', antes: 'img/Antes2.png', despues: 'img/Despues2.png' },
                { titulo: 'Proyecto de mantenimiento 02', texto: 'La transición tipo cortina se mantiene aunque cambies de línea o de proyecto.', antes: 'img/Antes2.png', despues: 'img/Despues2.png' },
                { titulo: 'Proyecto de mantenimiento 03', texto: 'También puedes usar este espacio para señalización y repintado de áreas.', antes: 'img/Antes2.png', despues: 'img/Despues2.png' }
            ]
        }
    ];

    let activeLineIndex = 0;
    let activeProjectIndex = 0;
    let comparisonDragging = false;

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

    function setComparisonPosition(value) {
        const wrapper = document.getElementById('beforeAfterWrapper');
        const range = document.getElementById('comparisonRange');
        if (!wrapper || !range) return;
        const porcentaje = Math.min(100, Math.max(0, Number(value) || 0));
        wrapper.style.setProperty('--comparison-position', porcentaje + '%');
        range.value = porcentaje;
    }

    function actualizarComparadorDesdePointer(clientX) {
        const wrapper = document.getElementById('beforeAfterWrapper');
        if (!wrapper) return;
        const rect = wrapper.getBoundingClientRect();
        const porcentaje = ((clientX - rect.left) / rect.width) * 100;
        setComparisonPosition(porcentaje);
    }

    function renderLineCarousel() {
        const track = document.getElementById('lineCarouselTrack');
        if (!track) return;

        track.innerHTML = lineasSeccion.map((linea, index) => {
            const total = lineasSeccion.length;
            const diff = (index - activeLineIndex + total) % total;
            let stateClass = 'is-right';
            if (diff === 0) stateClass = 'is-center';
            else if (diff === total - 1) stateClass = 'is-left';

            return `
                <button type="button" class="line-3d-card ${stateClass}" data-line-index="${index}" aria-label="Mostrar línea ${linea.nombre}" style="--card-accent: ${linea.color};">
                    <span class="line-card-chip">Línea</span>
                    <strong class="line-card-title">${linea.nombre}</strong>
                    <span class="line-card-copy">${linea.descripcion}</span>
                </button>
            `;
        }).join('');

        track.querySelectorAll('.line-3d-card').forEach(card => {
            card.addEventListener('click', () => {
                const nextIndex = Number(card.dataset.lineIndex);
                if (Number.isNaN(nextIndex) || nextIndex === activeLineIndex) return;
                const direction = card.classList.contains('is-left') ? -1 : 1;
                activeLineIndex = nextIndex;
                activeProjectIndex = 0;
                renderLineCarousel();
                renderActiveLineContent(true, direction);
            });
        });
    }

    function renderActiveLineContent(animate = false, direction = 1) {
        const lineBox = document.getElementById('lineShowcaseBox');
        const activeLineBadge = document.getElementById('activeLineBadge');
        const activeLineTitle = document.getElementById('activeLineTitle');
        const activeProjectText = document.getElementById('activeProjectText');
        const beforeImage = document.getElementById('beforeImage');
        const afterImage = document.getElementById('afterImage');
        const pairCounter = document.getElementById('pairCounter');
        const projectDots = document.getElementById('projectDots');
        const promoBadge = document.getElementById('promoBadge');
        const promoTitle = document.getElementById('promoTitle');
        const promoText = document.getElementById('promoText');
        const promoImage = document.getElementById('promoImage');
        const promoLink = document.getElementById('promoLink');

        const linea = lineasSeccion[activeLineIndex];
        const proyecto = linea.proyectos[activeProjectIndex];

        if (lineBox) {
            lineBox.style.setProperty('--line-accent', linea.color);
        }

        if (activeLineBadge) activeLineBadge.textContent = linea.badge;
        if (activeLineTitle) activeLineTitle.textContent = linea.nombre;
        if (activeProjectText) activeProjectText.textContent = proyecto.texto;
        if (beforeImage) beforeImage.src = proyecto.antes;
        if (afterImage) afterImage.src = proyecto.despues;
        if (beforeImage) beforeImage.alt = `${linea.nombre} antes`;
        if (afterImage) afterImage.alt = `${linea.nombre} después`;
        if (pairCounter) pairCounter.textContent = `${activeProjectIndex + 1} / ${linea.proyectos.length}`;

        if (projectDots) {
            projectDots.innerHTML = linea.proyectos.map((item, index) => `
                <button type="button" class="project-dot ${index === activeProjectIndex ? 'active' : ''}" data-project-index="${index}" aria-label="Mostrar ${item.titulo}"></button>
            `).join('');

            projectDots.querySelectorAll('.project-dot').forEach(dot => {
                dot.addEventListener('click', () => {
                    const nextProject = Number(dot.dataset.projectIndex);
                    if (!Number.isNaN(nextProject)) {
                        activeProjectIndex = nextProject;
                        renderActiveLineContent();
                    }
                });
            });
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

        setComparisonPosition(50);

        if (animate) {
            animateLinePanels(direction);
        }
    }

    function cambiarLinea(direction) {
        activeLineIndex = (activeLineIndex + direction + lineasSeccion.length) % lineasSeccion.length;
        activeProjectIndex = 0;
        renderLineCarousel();
        renderActiveLineContent(true, direction);
    }

    function cambiarProyecto(direction) {
        const proyectos = lineasSeccion[activeLineIndex].proyectos;
        activeProjectIndex = (activeProjectIndex + direction + proyectos.length) % proyectos.length;
        renderActiveLineContent();
    }

    function initLineShowcase() {
        const track = document.getElementById('lineCarouselTrack');
        const wrapper = document.getElementById('beforeAfterWrapper');
        const range = document.getElementById('comparisonRange');
        const linePrevBtn = document.getElementById('linePrevBtn');
        const lineNextBtn = document.getElementById('lineNextBtn');
        const pairPrevBtn = document.getElementById('pairPrevBtn');
        const pairNextBtn = document.getElementById('pairNextBtn');

        if (!track || !wrapper || !range) return;

        renderLineCarousel();
        renderActiveLineContent(false);

        if (linePrevBtn) linePrevBtn.addEventListener('click', () => cambiarLinea(-1));
        if (lineNextBtn) lineNextBtn.addEventListener('click', () => cambiarLinea(1));
        if (pairPrevBtn) pairPrevBtn.addEventListener('click', () => cambiarProyecto(-1));
        if (pairNextBtn) pairNextBtn.addEventListener('click', () => cambiarProyecto(1));

        range.addEventListener('input', (event) => setComparisonPosition(event.target.value));

        wrapper.addEventListener('pointerdown', (event) => {
            comparisonDragging = true;
            wrapper.setPointerCapture(event.pointerId);
            actualizarComparadorDesdePointer(event.clientX);
        });

        wrapper.addEventListener('pointermove', (event) => {
            if (!comparisonDragging) return;
            actualizarComparadorDesdePointer(event.clientX);
        });

        const stopDragging = () => {
            comparisonDragging = false;
        };

        wrapper.addEventListener('pointerup', stopDragging);
        wrapper.addEventListener('pointercancel', stopDragging);
        wrapper.addEventListener('lostpointercapture', stopDragging);
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
