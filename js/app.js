document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    
    const cursor = document.getElementById('custom-cursor');
    const cursorImg = cursor.querySelector('img');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const interactiveElements = document.querySelectorAll('.interactive');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorImg.style.transform = 'scale(1.2)';
        });
        el.addEventListener('mouseleave', () => {
            cursorImg.style.transform = 'scale(1)';
        });
    });

    
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-menu-link');

    const openMenu = () => {
        mobileMenu.classList.remove('translate-x-full');
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden'; 
    };

    const closeMenu = () => {
        mobileMenu.classList.add('translate-x-full');
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    };

    menuBtn.addEventListener('click', openMenu);
    closeMenuBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const desktopNavLinks = document.querySelectorAll('.nav-desktop-link');

    const openTab = (tabId) => {
        if (!tabId) return;
        tabButtons.forEach(btn => {
            if(btn.dataset.tab === tabId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        tabContents.forEach(content => {
            if(content.id === tabId) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    };

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            openTab(button.dataset.tab);
        });
    });

    desktopNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Solo previene si el link es un ancla en la misma página
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault(); 
                const tabId = link.dataset.tab;
                openTab(tabId);
                
                const servicesSection = document.getElementById('services');
                if (servicesSection) {
                    servicesSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Revisa si hay una tab guardada de otra página (para el footer)
    const targetTabFromOtherPage = sessionStorage.getItem('targetTab');
    if (targetTabFromOtherPage) {
        openTab(targetTabFromOtherPage);
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        sessionStorage.removeItem('targetTab');
    }


    
    const accordionsMobile = document.querySelectorAll('.accordion-header-services');
    accordionsMobile.forEach(acc => {
        acc.addEventListener('click', () => {
            
            const isOpening = !acc.classList.contains('active');

            accordionsMobile.forEach(other => {
                if (other !== acc) other.classList.remove('active');
            });
            
            acc.classList.toggle('active');

            if (isOpening) {
                setTimeout(() => {
                    acc.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300); 
            }
        });
    });

    
    const accordionsNav = document.querySelectorAll('.accordion-header-nav');
    accordionsNav.forEach(acc => {
        acc.addEventListener('click', () => {
            
            accordionsNav.forEach(other => {
                if(other !== acc) other.classList.remove('active');
            });
            
            
            acc.classList.toggle('active');
        });
    });

    
    const navSubmenuLinks = document.querySelectorAll('.nav-submenu-link');
    const mainAccordions = document.querySelectorAll('.accordion-header-services');

    const openAccordionMobile = (tabId) => {
        if (!tabId) return;
        const targetAccordion = document.querySelector(`.accordion-header-services[data-tab-mobile="${tabId}"]`);
        
        mainAccordions.forEach(acc => {
            acc.classList.remove('active');
        });

        if (targetAccordion) {
            targetAccordion.classList.add('active');
            setTimeout(() => {
                targetAccordion.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 400); 
        }
    };


    navSubmenuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTab = link.dataset.tabMobile; 
            
            closeMenu();
            openAccordionMobile(targetTab);
        });
    });

    // Revisa si hay una tab móvil guardada de otra página
    const targetTabMobileFromOtherPage = sessionStorage.getItem('targetTabMobile');
    if (targetTabMobileFromOtherPage) {
        openAccordionMobile(targetTabMobileFromOtherPage);
        sessionStorage.removeItem('targetTabMobile');
    }
    
    const accordionsFaq = document.querySelectorAll('.accordion-header-faq');
    accordionsFaq.forEach(acc => {
        acc.addEventListener('click', () => {
            
            accordionsFaq.forEach(other => {
                if(other !== acc) other.classList.remove('active');
            });
            
            
            acc.classList.toggle('active');
        });
    });

    
    
    
    gsap.to(".animate-on-load", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2, 
        ease: 'power2.out'
    });

    
    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach(section => {
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 85%', 
                toggleActions: 'play none none none' 
            },
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power2.out'
        });
    });

    // Script para los enlaces del footer que van a tabs
    const footerNavLinks = document.querySelectorAll('footer .nav-desktop-link');
    footerNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault(); 
                const tabId = link.dataset.tab;
                openTab(tabId);
                
                const servicesSection = document.getElementById('services');
                if (servicesSection) {
                    servicesSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // --- INICIO: Lógica del Ojo Interactivo ---
    // Reemplazamos la lógica por la de la versión final
    const pupil = document.querySelector('.pupil');
    const eye = document.querySelector('.eye');

    // Solo ejecutar si los elementos existen
    if (eye && pupil) { 
        document.addEventListener('mousemove', (event) => {
            
            // 1. Obtiene la caja de dimensiones y posición del OJO
            const eyeRect = eye.getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;


            // 2. Obtiene la posición del cursor
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            // 3. Calcula la diferencia (delta) entre el cursor y el centro del OJO
            const deltaX = mouseX - eyeCenterX;
            const deltaY = mouseY - eyeCenterY;

            // 4. Calcula el ángulo
            const angle = Math.atan2(deltaY, deltaX);

            // 5. Define qué tan lejos se puede mover la PUPILA
            // Límite Horizontal = (Ancho Ojo / 2) - (Ancho Pupila / 2) -> (180/2) - (60/2) = 60
            const maxMoveHorizontal = (eye.offsetWidth / 2) - (pupil.offsetWidth / 2) - 5; // -5 de margen
            
            // Límite Vertical = (Alto Ojo / 2) - (Alto Pupila / 2) -> (120/2) - (60/2) = 30
            const maxMoveVertical = (eye.offsetHeight / 2) - (pupil.offsetHeight / 2) - 5; // -5 de margen
            
            // 6. Calcula la nueva posición X e Y para la PUPILA
            const pupilX = Math.cos(angle) * maxMoveHorizontal;
            const pupilY = Math.sin(angle) * maxMoveVertical;

            // 7. Aplica la transformación CSS a la PUPILA
            // (Combinando el centrado con el movimiento)
            pupil.style.transform = `translate(-50%, -50%) translate(${pupilX}px, ${pupilY}px)`;
        });
    }
    // --- FIN: Lógica del Ojo Interactivo ---

    // -----------------------------------------------------------------
    // --- INICIO: CÓDIGO PARA CARGAR CONTENIDO DEL CMS ---
    // -----------------------------------------------------------------

    // Función para añadir 'cache-busting' a la URL
    const fetchData = (url) => {
        // Añadimos un timestamp para evitar problemas de caché
        // CAMBIO: Añadimos una barra inclinada (/) al inicio de la URL
        const cacheBustUrl = `/${url}?v=${new Date().getTime()}`;
        return fetch(cacheBustUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al cargar ${url}: ${response.statusText}`);
                }
                return response.json();
            })
            .catch(error => console.error(error));
    };

    // ---- RENDERIZAR PORTADA (HERO) ----
    const renderHero = (data) => {
        if(!data) return;
        document.getElementById('hero-titulo').innerText = data.titulo || 'Bienvenida';
        document.getElementById('hero-descripcion').innerText = data.descripcion || '...';
    };

    // ---- RENDERIZAR 'SOBRE MÍ' ----
    const renderAbout = (data) => {
        if(!data) return;
        const container = document.getElementById('about-content');
        // Reemplaza saltos de línea del textarea con <br>
        const p1 = (data.parrafo_1 || '').replace(/\n/g, '<br>');
        const p2 = (data.parrafo_2 || '').replace(/\n/g, '<br>');
        
        container.innerHTML = `
            <p class="text-text-light mb-4 leading-relaxed text-justify">${p1}</p>
            <p class="text-text-light leading-relaxed text-justify">${p2}</p>
        `;
    };

    // ---- RENDERIZAR PRECIO (con oferta) ----
    const renderPrice = (precio, precioAntiguo) => {
        if (precioAntiguo && precioAntiguo.trim() !== '') {
            // Si hay precio de oferta
            return `<p class="font-bold text-md text-red-600 mt-2">${precio} <span class="text-sm text-gray-500 line-through ml-1">${precioAntiguo}</span></p>`;
        }
        // Precio normal
        return `<p class="font-bold text-md text-gold mt-2">${precio}</p>`;
    };
    
    const renderPriceMobile = (precio, precioAntiguo) => {
        if (precioAntiguo && precioAntiguo.trim() !== '') {
            return `<p class="font-bold text-sm text-red-600 mt-2">${precio} <span class="text-xs text-gray-500 line-through ml-1">${precioAntiguo}</span></p>`;
        }
        return `<p class="font-bold text-sm text-gold mt-2">${precio}</p>`;
    };

    // ---- RENDERIZAR SERVICIOS: DISEÑO DE MIRADA ----
    const renderServiciosMirada = (items) => {
        if(!items || items.length === 0) return;
        const desktopContainer = document.getElementById('servicios-mirada-desktop');
        const mobileContainer = document.getElementById('servicios-mirada-mobile');

        // Dividir items en dos columnas para desktop
        const mid = Math.ceil(items.length / 2);
        const col1 = items.slice(0, mid);
        const col2 = items.slice(mid);

        // Renderizar Desktop
        let desktopHtml = '<div class="space-y-6">'; // Columna 1
        col1.forEach(item => {
            desktopHtml += `
                <div class="flex space-x-4 items-start">
                    <img src="${item.imagen || 'https://placehold.co/96x96/D4A3A8/4A3A3A?text=Lili'}" alt="${item.nombre}" class="w-24 h-24 rounded-full object-cover shadow-md flex-shrink-0 transform transition-transform duration-300 hover:scale-110" loading="lazy">
                    <div>
                        <h4 class="font-bold text-lg text-title">${item.nombre}</h4>
                        <p class="text-sm text-text-light mt-1">${item.descripcion}</p>
                        ${renderPrice(item.precio, item.precio_antiguo)}
                    </div>
                </div>
            `;
        });
        desktopHtml += '</div><div class="space-y-6">'; // Columna 2
        col2.forEach(item => {
            desktopHtml += `
                <div class="flex space-x-4 items-start">
                    <img src="${item.imagen || 'https://placehold.co/96x96/D4A3A8/4A3A3A?text=Lili'}" alt="${item.nombre}" class="w-24 h-24 rounded-full object-cover shadow-md flex-shrink-0 transform transition-transform duration-300 hover:scale-110" loading="lazy">
                    <div>
                        <h4 class="font-bold text-lg text-title">${item.nombre}</h4>
                        <p class="text-sm text-text-light mt-1">${item.descripcion}</p>
                        ${renderPrice(item.precio, item.precio_antiguo)}
                    </div>
                </div>
            `;
        });
        desktopHtml += '</div>';
        desktopContainer.innerHTML = desktopHtml;
        desktopContainer.classList.remove('cms-loading');

        // Renderizar Mobile
        let mobileHtml = '';
        items.forEach(item => {
            mobileHtml += `
                <div class="flex space-x-4 items-start">
                    <img src="${item.imagen || 'https://placehold.co/80x80/D4A3A8/4A3A3A?text=Lili'}" alt="${item.nombre}" class="w-20 h-20 rounded-full object-cover shadow-md flex-shrink-0 transform transition-transform duration-300 hover:scale-110" loading="lazy">
                    <div>
                        <h4 class="font-bold text-md text-title">${item.nombre}</h4>
                        <p class="text-sm text-text-light mt-1">${item.descripcion}</p>
                        ${renderPriceMobile(item.precio, item.precio_antiguo)}
                    </div>
                </div>
            `;
        });
        mobileContainer.innerHTML = mobileHtml;
        mobileContainer.classList.remove('cms-loading');
    };

    // ---- RENDERIZAR SERVICIOS: LISTAS SIMPLES (CEJAS, UÑAS) ----
    const renderServiciosLista = (items, desktopCol1Id, desktopCol2Id, mobileId, nombreWidget) => {
        if(!items || items.length === 0) return;
        const desktopCol1 = document.getElementById(desktopCol1Id);
        const desktopCol2 = document.getElementById(desktopCol2Id);
        const mobileUl = document.getElementById(mobileId);

        let col1Html = '';
        let col2Html = '';
        let mobileHtml = '';
        
        // Dividir para desktop (ej. 9 items -> 5 en col1, 4 en col2)
        const mid = Math.ceil(items.length / 2);
        
        items.forEach((item, index) => {
            // Reemplaza \n con <br> si el widget es 'text' (para Uñas)
            const nombreHtml = (nombreWidget === 'text') 
                ? (item.nombre || '').replace(/\n/g, '<br>')
                : (item.nombre || '');
                
            const liHtml = `
                <li class="flex justify-between border-b pb-2">
                    <span>${nombreHtml}</span> <span class="font-semibold text-gold text-right pl-4">${item.precio}</span>
                </li>
            `;
            const liHtmlMobile = `
                <li class="flex justify-between">
                    <span>${nombreHtml}</span> <span class="font-semibold text-gold text-right pl-4">${item.precio}</span>
                </li>
            `;
            
            if (index < mid) {
                col1Html += liHtml;
            } else {
                col2Html += liHtml;
            }
            mobileHtml += liHtmlMobile;
        });
        
        desktopCol1.innerHTML = col1Html;
        desktopCol1.classList.remove('cms-loading');
        desktopCol2.innerHTML = col2Html;
        mobileUl.innerHTML = mobileHtml;
        mobileUl.classList.remove('cms-loading');
    };

    // ---- RENDERIZAR SERVICIOS: LISTAS COMPLEJAS (FACIALES, MICRO) ----
    const renderServiciosComplejos = (items, desktopId, mobileId) => {
        if(!items || items.length === 0) return;
        const desktopContainer = document.getElementById(desktopId);
        const mobileContainer = document.getElementById(mobileId);
        
        let desktopHtml = '';
        let mobileHtml = '';

        items.forEach(item => {
            desktopHtml += `
                <div>
                    <div class="flex justify-between items-baseline">
                        <h4 class="font-bold text-lg text-title">${item.nombre}</h4>
                        ${renderPrice(item.precio, item.precio_antiguo)}
                    </div>
                    <p class="text-sm text-text-light mt-1">${(item.descripcion || '').replace(/\n/g, '<br>')}</p>
                </div>
            `;
            
            mobileHtml += `
                <div>
                    <div class="flex justify-between items-baseline">
                        <h4 class="font-bold text-md text-title">${item.nombre}</h4>
                        ${renderPriceMobile(item.precio, item.precio_antiguo)}
                    </div>
                    <p class="text-sm text-text-light mt-1">${(item.descripcion || '').replace(/\n/g, '<br>')}</p>
                </div>
            `;
        });

        desktopContainer.innerHTML = desktopHtml;
        desktopContainer.classList.remove('cms-loading');
        mobileContainer.innerHTML = mobileHtml;
        mobileContainer.classList.remove('cms-loading');
    };

    // ---- RENDERIZAR FAQ ----
    const renderFaq = (items) => {
        if(!items || items.length === 0) return;
        const container = document.getElementById('faq-list');
        let html = '';

        items.forEach(item => {
            // Usamos la librería 'marked' para convertir Markdown a HTML
            const respuestaHtml = typeof marked !== 'undefined' ? marked.parse(item.respuesta || '') : item.respuesta;
            
            html += `
                <div class="bg-white rounded-lg shadow-sm">
                    <button class="accordion-header-faq w-full text-left p-5 flex justify-between items-center interactive">
                        <span class="text-lg font-semibold text-title">${item.pregunta}</span>
                        <span class="accordion-icon text-2xl text-brand-dark transition-transform duration-300">&#43;</span>
                    </button>
                    <div class="accordion-content-faq text-text-light">
                        ${respuestaHtml}
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
        container.classList.remove('cms-loading');
        
        // RE-INICIALIZAR los listeners del acordeón de FAQ
        const newAccordionsFaq = container.querySelectorAll('.accordion-header-faq');
        newAccordionsFaq.forEach(acc => {
            acc.addEventListener('click', () => {
                newAccordionsFaq.forEach(other => {
                    if(other !== acc) other.classList.remove('active');
                });
                acc.classList.toggle('active');
            });
        });
    };

    // ---- FUNCIÓN PRINCIPAL PARA CARGAR TODO ----
    async function loadCmsData() {
        try {
            // Cargar textos de páginas
            const [heroData, aboutData] = await Promise.all([
                fetchData('data/pagina_portada.json'),
                fetchData('data/pagina_sobre_mi.json')
            ]);
            renderHero(heroData);
            renderAbout(aboutData);
        
            // Cargar todos los servicios
            const [miradaData, cejasData, unasData, facialesData, microData] = await Promise.all([
                fetchData('data/servicios_mirada.json'),
                fetchData('data/servicios_cejas.json'),
                fetchData('data/servicios_unas.json'),
                fetchData('data/servicios_faciales.json'),
                fetchData('data/servicios_micro.json')
            ]);
            
            renderServiciosMirada(miradaData ? miradaData.items : []);
            renderServiciosLista(cejasData ? cejasData.items : [], 'servicios-cejas-col1-desktop', 'servicios-cejas-col2-desktop', 'servicios-cejas-mobile', 'string');
            renderServiciosLista(unasData ? unasData.items : [], 'servicios-unas-col1-desktop', 'servicios-unas-col2-desktop', 'servicios-unas-mobile', 'text'); 
            renderServiciosComplejos(facialesData ? facialesData.items : [], 'servicios-faciales-desktop', 'servicios-faciales-mobile');
            renderServiciosComplejos(microData ? microData.items : [], 'servicios-micro-desktop', 'servicios-micro-mobile');
            
            // Cargar FAQ
            const faqData = await fetchData('data/faq.json');
            renderFaq(faqData ? faqData.items : []);

        } catch (error) {
            console.error("Error cargando el contenido del CMS:", error);
            // Opcional: Mostrar un error al usuario
        }
    }

    // Iniciar la carga de datos
    loadCmsData();

    // -----------------------------------------------------------------
    // --- FIN: CÓDIGO PARA CARGAR CONTENIDO DEL CMS ---
    // -----------------------------------------------------------------

});