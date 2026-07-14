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

        let ultimoElementoModal = null;

        function crearModalProducto() {
            if (document.getElementById('productModal')) return;

            const modal = document.createElement('div');
            modal.className = 'product-modal';
            modal.id = 'productModal';
            modal.setAttribute('aria-hidden', 'true');

            modal.innerHTML = `
                <div class="product-modal-backdrop" data-modal-close></div>
                <section class="product-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="productModalTitle">
                    <button class="product-modal-close" type="button" aria-label="Cerrar detalles" data-modal-close>&times;</button>
                    <div class="product-modal-layout">
                        <div class="product-modal-visual">
                            <img class="product-modal-image" alt="" src="">
                        </div>
                        <div class="product-modal-info">
                            <span class="product-modal-category"></span>
                            <h2 id="productModalTitle"></h2>
                            <p class="product-modal-summary"></p>

                            <div class="product-modal-meta"></div>

                            <div class="product-modal-docs"></div>
                            <div class="product-modal-actions"></div>

                            <div class="product-modal-description">
                                <h3>Información del producto</h3>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </section>
            `;

            document.body.appendChild(modal);

            modal.querySelectorAll('[data-modal-close]').forEach(elemento => {
                elemento.addEventListener('click', cerrarModalProducto);
            });
        }

        function obtenerTextoMeta(tarjeta, etiqueta) {
            const items = [...tarjeta.querySelectorAll('.meta-item')];
            const item = items.find(meta => normalizarTexto(meta.querySelector('strong')?.textContent || '') === normalizarTexto(etiqueta));
            return item?.querySelector('span')?.textContent?.trim() || '';
        }

        function abrirModalProducto(tarjeta) {
            const modal = document.getElementById('productModal');
            if (!modal || !tarjeta) return;

            ultimoElementoModal = tarjeta;

            const nombre = tarjeta.querySelector('h4')?.textContent?.trim() || 'Producto';
            const resumen = tarjeta.querySelector(':scope > p')?.textContent?.trim() || '';
            const descripcion = tarjeta.querySelector('.product-detail p')?.textContent?.trim() || resumen;
            const categoria = obtenerTextoMeta(tarjeta, 'Categoría');
            const presentaciones = obtenerTextoMeta(tarjeta, 'Presentaciones');
            const imagen = tarjeta.querySelector('.product-image');
            const enlaceTecnico = tarjeta.querySelector('.product-doc-btn.tech');
            const enlaceSeguridad = tarjeta.querySelector('.product-doc-btn.safety');
            const mensaje = obtenerMensajeProducto(nombre);

            const modalImage = modal.querySelector('.product-modal-image');
            modalImage.src = imagen?.getAttribute('src') || '';
            modalImage.alt = imagen?.getAttribute('alt') || nombre;
            modalImage.closest('.product-modal-visual').classList.toggle('without-image', !imagen?.getAttribute('src'));

            modal.querySelector('#productModalTitle').textContent = nombre;
            modal.querySelector('.product-modal-summary').textContent = resumen;

            const categoriaBadge = modal.querySelector('.product-modal-category');
            categoriaBadge.textContent = categoria || 'Catálogo de productos';
            categoriaBadge.className = 'product-modal-category';
            ['red', 'yellow', 'green', 'dark'].forEach(clase => {
                if (tarjeta.classList.contains(clase)) categoriaBadge.classList.add(clase);
            });

            const meta = modal.querySelector('.product-modal-meta');
            meta.innerHTML = '';

            if (presentaciones) {
                const itemPresentaciones = document.createElement('div');
                itemPresentaciones.className = 'product-modal-meta-item';
                itemPresentaciones.innerHTML = '<strong>Presentaciones</strong>';
                const valor = document.createElement('span');
                valor.textContent = presentaciones;
                itemPresentaciones.appendChild(valor);
                meta.appendChild(itemPresentaciones);
            }

            if (categoria) {
                const itemCategoria = document.createElement('div');
                itemCategoria.className = 'product-modal-meta-item';
                itemCategoria.innerHTML = '<strong>Categoría</strong>';
                const valor = document.createElement('span');
                valor.textContent = categoria;
                itemCategoria.appendChild(valor);
                meta.appendChild(itemCategoria);
            }

            modal.querySelector('.product-modal-description p').textContent = descripcion;

            const documentos = modal.querySelector('.product-modal-docs');
            documentos.innerHTML = '';

            if (enlaceTecnico?.getAttribute('href')) {
                const ficha = document.createElement('a');
                ficha.className = 'product-modal-doc tech';
                ficha.href = enlaceTecnico.getAttribute('href');
                ficha.target = '_blank';
                ficha.rel = 'noopener noreferrer';
                ficha.textContent = 'Ver hoja técnica';
                documentos.appendChild(ficha);
            }

            if (enlaceSeguridad?.getAttribute('href')) {
                const hds = document.createElement('a');
                hds.className = 'product-modal-doc safety';
                hds.href = enlaceSeguridad.getAttribute('href');
                hds.target = '_blank';
                hds.rel = 'noopener noreferrer';
                hds.textContent = 'Ver hoja de seguridad';
                documentos.appendChild(hds);
            }

            const acciones = modal.querySelector('.product-modal-actions');
            acciones.innerHTML = '';

            const contacto = document.createElement('a');
            contacto.className = 'product-modal-action contact';
            contacto.href = `index.html?producto=${encodeURIComponent(nombre)}#contacto`;
            contacto.textContent = 'Solicitar información';

            const whatsapp = document.createElement('a');
            whatsapp.className = 'product-modal-action whatsapp';
            whatsapp.href = `https://wa.me/525546192932?text=${encodeURIComponent(mensaje)}`;
            whatsapp.target = '_blank';
            whatsapp.rel = 'noopener noreferrer';
            whatsapp.textContent = 'Contactar por WhatsApp';

            acciones.appendChild(contacto);
            acciones.appendChild(whatsapp);

            modal.classList.add('show');
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('product-modal-open');
            actualizarBloqueoScroll();

            requestAnimationFrame(() => {
                modal.querySelector('.product-modal-close')?.focus();
            });
        }

        function cerrarModalProducto() {
            const modal = document.getElementById('productModal');
            if (!modal || !modal.classList.contains('show')) return;

            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('product-modal-open');
            actualizarBloqueoScroll();

            if (ultimoElementoModal) {
                ultimoElementoModal.focus({ preventScroll: true });
            }
        }

        const consultaModalMovil = window.matchMedia('(max-width: 700px)');

        function modalProductoDisponible() {
            return consultaModalMovil.matches;
        }

        function actualizarModalSegunPantalla() {
            document.querySelectorAll('.product-card').forEach(tarjeta => {
                const disponible = modalProductoDisponible();

                tarjeta.classList.toggle('product-card-modal-trigger', disponible);

                if (disponible) {
                    tarjeta.setAttribute('role', 'button');
                    tarjeta.setAttribute('tabindex', '0');
                    tarjeta.setAttribute('aria-label', `Ver detalles de ${tarjeta.querySelector('h4')?.textContent?.trim() || 'este producto'}`);
                } else {
                    tarjeta.removeAttribute('role');
                    tarjeta.removeAttribute('tabindex');
                    tarjeta.removeAttribute('aria-label');
                }
            });

            if (!modalProductoDisponible()) {
                cerrarModalProducto();
            }
        }

        function activarModalEnTarjetas() {
            crearModalProducto();

            document.querySelectorAll('.product-card').forEach(tarjeta => {
                tarjeta.addEventListener('click', evento => {
                    if (!modalProductoDisponible()) return;
                    if (evento.target.closest('a, button, summary, details')) return;
                    abrirModalProducto(tarjeta);
                });

                tarjeta.addEventListener('keydown', evento => {
                    if (!modalProductoDisponible()) return;
                    if (evento.key === 'Enter' || evento.key === ' ') {
                        evento.preventDefault();
                        abrirModalProducto(tarjeta);
                    }
                });
            });

            actualizarModalSegunPantalla();

            if (typeof consultaModalMovil.addEventListener === 'function') {
                consultaModalMovil.addEventListener('change', actualizarModalSegunPantalla);
            } else {
                consultaModalMovil.addListener(actualizarModalSegunPantalla);
            }
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
            const modalAbierto = document.body.classList.contains('product-modal-open');

            // La búsqueda móvil no bloquea el desplazamiento. Esto evita saltos y
            // cierres involuntarios cuando aparece el teclado del celular.
            document.body.style.overflow = (modalAbierto || (window.innerWidth <= 992 && menuAbierto)) ? 'hidden' : '';
        }

        function actualizarPosicionBusquedaMovil() {
            if (!mobileSearchPanel || window.innerWidth > 992) return;

            const navbar = document.querySelector('.navbar');
            if (!navbar) return;

            const navbarBottom = Math.max(0, navbar.getBoundingClientRect().bottom);
            mobileSearchPanel.style.setProperty('--mobile-search-top', `${navbarBottom + 8}px`);
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
            actualizarPosicionBusquedaMovil();

            mobileSearchPanel.classList.toggle('show', willOpen);
            searchToggleBtn.classList.toggle('active', willOpen);
            searchToggleBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
            actualizarBloqueoScroll();

            if (willOpen && mobileProductSearchInput) {
                window.setTimeout(() => {
                    try {
                        mobileProductSearchInput.focus({ preventScroll: true });
                    } catch (error) {
                        mobileProductSearchInput.focus();
                    }
                }, 80);
            }
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

                // Mantener el buscador abierto al aparecer el teclado o al hacer
                // pequeños desplazamientos. Solo se actualiza su posición.
                if (mobileSearchPanel?.classList.contains('show')) {
                    actualizarPosicionBusquedaMovil();
                }
            }
        }, { passive: true });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 992) {
                closeMobileMenu();
                closeMobileSearch();
            } else {
                actualizarPosicionBusquedaMovil();
                actualizarBloqueoScroll();
            }
        });

        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', actualizarPosicionBusquedaMovil);
            window.visualViewport.addEventListener('scroll', actualizarPosicionBusquedaMovil);
        }

        window.addEventListener('load', () => {
            handleNavbar();
            agregarBotonesContacto();
            activarModalEnTarjetas();
            reveal();
            cargarBusquedaDesdeURL();
        });

        document.addEventListener('keydown', evento => {
            if (evento.key === 'Escape') {
                cerrarModalProducto();
            }
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
    
