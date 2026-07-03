/* Archivo extraído de productos.html */

        function handleNavbar() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 40) {
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
                const elementVisible = 90;

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

        function limpiarResaltados() {
            document.querySelectorAll('.product-card').forEach(card => {
                card.classList.remove('product-found');
            });
        }

        function obtenerMensajeProducto(nombreProducto) {
            return `Hola, estoy interesado en el producto "${nombreProducto}". ¿Podrían brindarme más información técnica, presentaciones disponibles y opciones de compra?`;
        }

        function obtenerSugerencias(termino) {
            const productos = document.querySelectorAll('.product-card');
            const sugerencias = [];
            const vistos = new Set();

            productos.forEach(producto => {
                const nombre = producto.querySelector('h4')?.textContent || '';
                const textoBusqueda = normalizarTexto(producto.dataset.search || producto.innerText);

                if (textoBusqueda.includes(termino) && !vistos.has(nombre)) {
                    vistos.add(nombre);
                    sugerencias.push({
                        nombre,
                        elemento: producto
                    });
                }
            });

            return sugerencias.slice(0, 6);
        }

        function mostrarSugerencias(inputId, suggestionsId) {
            const input = document.getElementById(inputId);
            const suggestionsBox = document.getElementById(suggestionsId);

            if (!input || !suggestionsBox) return;

            const termino = normalizarTexto(input.value);
            suggestionsBox.innerHTML = '';

            if (!termino) {
                suggestionsBox.classList.remove('show');
                return;
            }

            const sugerencias = obtenerSugerencias(termino);

            if (!sugerencias.length) {
                suggestionsBox.classList.remove('show');
                return;
            }

            sugerencias.forEach((sugerencia, index) => {
                const item = document.createElement('div');
                item.className = 'suggestion-item';
                if (index === 0) item.classList.add('active-suggestion');
                item.textContent = sugerencia.nombre;

                item.addEventListener('click', () => {
                    input.value = sugerencia.nombre;
                    suggestionsBox.classList.remove('show');
                    irAProducto(sugerencia.elemento);

                    if (window.innerWidth <= 992 && suggestionsId === 'mobileSearchSuggestions') {
                        closeMobileSearch();
                    }
                });

                suggestionsBox.appendChild(item);
            });

            suggestionsBox.classList.add('show');
        }

        function irAProducto(productoEncontrado) {
            if (!productoEncontrado) return;

            limpiarResaltados();
            productoEncontrado.classList.add('product-found');

            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const y = productoEncontrado.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 24;

            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });

            setTimeout(() => {
                productoEncontrado.classList.remove('product-found');
            }, 5000);
        }

        function buscarProducto(inputId = 'productSearch', suggestionsId = 'searchSuggestions') {
            const input = document.getElementById(inputId);
            const termino = input ? normalizarTexto(input.value) : '';
            const productos = document.querySelectorAll('.product-card');
            const suggestionsBox = document.getElementById(suggestionsId);

            limpiarResaltados();

            if (suggestionsBox) {
                suggestionsBox.classList.remove('show');
            }

            if (!termino) return;

            let productoEncontrado = null;

            productos.forEach(producto => {
                const textoBusqueda = normalizarTexto(producto.dataset.search || producto.innerText);
                if (!productoEncontrado && textoBusqueda.includes(termino)) {
                    productoEncontrado = producto;
                }
            });

            if (productoEncontrado) {
                irAProducto(productoEncontrado);

                if (window.innerWidth <= 992 && inputId === 'mobileProductSearch') {
                    closeMobileSearch();
                }
            }
        }

        function cargarBusquedaDesdeURL() {
            const params = new URLSearchParams(window.location.search);
            const termino = params.get('buscar');

            if (!termino) return;

            const desktopInput = document.getElementById('productSearch');
            const mobileInput = document.getElementById('mobileProductSearch');

            if (desktopInput) desktopInput.value = termino;
            if (mobileInput) mobileInput.value = termino;

            setTimeout(() => {
                buscarProducto('productSearch', 'searchSuggestions');
                history.replaceState({}, document.title, window.location.pathname);
            }, 250);
        }

        function agregarBotonesContacto() {
            const tarjetas = document.querySelectorAll('.product-card');

            tarjetas.forEach(tarjeta => {
                if (tarjeta.querySelector('.product-actions')) return;

                const nombreProducto = tarjeta.querySelector('h4')?.textContent?.trim();
                if (!nombreProducto) return;

                const mensaje = obtenerMensajeProducto(nombreProducto);

                const acciones = document.createElement('div');
                acciones.className = 'product-actions';

                const botonFormulario = document.createElement('a');
                botonFormulario.className = 'product-action-btn form-btn';
                botonFormulario.href = `index.html?producto=${encodeURIComponent(nombreProducto)}`;
                botonFormulario.textContent = 'Solicitar info';

                const botonWhatsapp = document.createElement('a');
                botonWhatsapp.className = 'product-action-btn whatsapp-btn-card';
                botonWhatsapp.href = `https://wa.me/525546192932?text=${encodeURIComponent(mensaje)}`;
                botonWhatsapp.target = '_blank';
                botonWhatsapp.rel = 'noopener noreferrer';
                botonWhatsapp.textContent = 'WhatsApp';

                acciones.appendChild(botonFormulario);
                acciones.appendChild(botonWhatsapp);

                tarjeta.appendChild(acciones);
            });
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
                    buscarProducto(inputId, suggestionsId);
                }
            }

            if (e.key === 'Escape') {
                suggestionsBox.classList.remove('show');
                closeMobileMenu();
                closeMobileSearch();
            }
        }

        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const searchToggleBtn = document.getElementById('searchToggleBtn');
        const mobileSearchPanel = document.getElementById('mobileSearchPanel');
        const productSearchInput = document.getElementById('productSearch');
        const searchSuggestions = document.getElementById('searchSuggestions');
        const mobileProductSearchInput = document.getElementById('mobileProductSearch');
        const mobileSearchSuggestions = document.getElementById('mobileSearchSuggestions');

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

        if (productSearchInput) {
            productSearchInput.addEventListener('input', () => mostrarSugerencias('productSearch', 'searchSuggestions'));
            productSearchInput.addEventListener('keydown', (e) => manejarTeclasBusqueda(e, 'productSearch', 'searchSuggestions'));
        }

        if (mobileProductSearchInput) {
            mobileProductSearchInput.addEventListener('input', () => mostrarSugerencias('mobileProductSearch', 'mobileSearchSuggestions'));
            mobileProductSearchInput.addEventListener('keydown', (e) => manejarTeclasBusqueda(e, 'mobileProductSearch', 'mobileSearchSuggestions'));
        }

        window.addEventListener('scroll', () => {
            handleNavbar();
            reveal();

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
            agregarBotonesContacto();
            reveal();
            cargarBusquedaDesdeURL();
        });

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
    
