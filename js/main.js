document.addEventListener('DOMContentLoaded', () => {
    // 1. Menú de Navegación Responsivo (Hamburguesa)
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            // Alterna la clase 'active' para mostrar/ocultar el menú (definida en CSS)
            mainNav.classList.toggle('active');
            
            // Mejora de accesibilidad
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
            navToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }
});