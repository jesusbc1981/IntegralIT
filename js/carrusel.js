document.addEventListener('DOMContentLoaded', function() {
    // La variable currentStep debe estar dentro del DOMContentLoaded para inicializarse
    // correctamente al cargar la página, pero las funciones deben ser globales.
    let currentStep = 1;
    let touchStartX = 0;
    const TOTAL_CARDS = 4; // Define el número total de tarjetas para limitar la navegacion

    // --- Funciones de navegación (Globales para HTML Events) ---

    // 1. FUNCION nextCard (Siguiente)
    window.nextCard = function() {
        // Detener si ya estamos en la última tarjeta
        if (currentStep >= TOTAL_CARDS) {
            return;
        }

        const currentCard = document.getElementById(`card-${currentStep}`);
        const nextCardEl = document.getElementById(`card-${currentStep + 1}`);
        const nextCard2El = document.getElementById(`card-${currentStep + 2}`);
        const previousCardEl = document.getElementById(`card-${currentStep - 1}`);
        const dots = document.querySelectorAll('.dot');
        
        currentStep++; // Avanzamos el paso

        // Resetea los puntos y activa el punto de la tarjeta actual
        dots.forEach(dot => dot.classList.remove('active-dot'));
        const activeCardDots = document.querySelector(`#card-${currentStep} .card-navigation div span:nth-child(${currentStep})`);
        if (activeCardDots) {
            activeCardDots.classList.add('active-dot');
        }

        // Mueve la tarjeta actual (principal) a 'anterior'
        if (currentCard) {
            currentCard.classList.remove('principal');
            currentCard.classList.add('anterior');
        }

        // Mueve la siguiente tarjeta (siguiente) a 'principal'
        if (nextCardEl) {
            nextCardEl.classList.remove('siguiente');
            nextCardEl.classList.add('principal');
        }

        // Mueve la siguiente siguiente (siguiente2) a 'siguiente'
        if (nextCard2El) {
            nextCard2El.classList.remove('siguiente2');
            nextCard2El.classList.add('siguiente');
        }

        // Si existe la anterior, la mueve de 'anterior' a 'anterior2'
        if (previousCardEl) {
            previousCardEl.classList.remove('anterior');
            previousCardEl.classList.add('anterior2');
            // Oculta el div transparente para navegación a la derecha (si está en la segunda tarjeta o mas)
            document.getElementById('div-transparent-next')?.classList.add('ocultar'); 
        }
        
        // Muestra el div transparente para navegación a la izquierda
        document.getElementById('div-transparent-previous')?.classList.remove('ocultar');
        
        // Oculta el div de navegación a la derecha si llegamos a la última tarjeta
        if (currentStep === TOTAL_CARDS) {
            document.getElementById('div-transparent-next')?.classList.add('ocultar');
        }
    }


    // 2. FUNCION previousCard (Anterior)
    window.previousCard = function() {
        // Detener si ya estamos en la primera tarjeta
        if (currentStep <= 1) {
            return;
        }

        const currentCard = document.getElementById(`card-${currentStep}`);
        const nextCardEl = document.getElementById(`card-${currentStep + 1}`);
        const previousCardEl = document.getElementById(`card-${currentStep - 1}`);
        const previousCard2El = document.getElementById(`card-${currentStep - 2}`);
        const dots = document.querySelectorAll('.dot');
        
        currentStep--; // Retrocedemos el paso

        // Resetea los puntos y activa el punto de la tarjeta actual
        dots.forEach(dot => dot.classList.remove('active-dot'));
        const activeCardDots = document.querySelector(`#card-${currentStep} .card-navigation div span:nth-child(${currentStep})`);
        if (activeCardDots) {
            activeCardDots.classList.add('active-dot');
        }

        // Mueve la tarjeta actual (principal) a 'siguiente'
        if (currentCard) {
            currentCard.classList.remove('principal');
            currentCard.classList.add('siguiente');
        }

        // Mueve la anterior tarjeta (anterior) a 'principal'
        if (previousCardEl) {
            previousCardEl.classList.remove('anterior');
            previousCardEl.classList.add('principal');
        }

        // Mueve la anterior anterior (anterior2) a 'anterior'
        if (previousCard2El) {
            previousCard2El.classList.remove('anterior2');
            previousCard2El.classList.add('anterior');
        }

        // Mueve la siguiente tarjeta (siguiente) a 'siguiente2'
        if (nextCardEl) {
            nextCardEl.classList.remove('siguiente');
            nextCardEl.classList.add('siguiente2');
        }

        // Muestra el div transparente para navegación a la derecha
        document.getElementById('div-transparent-next')?.classList.remove('ocultar');

        // Oculta el div de navegación a la izquierda si llegamos a la primera tarjeta
        if (currentStep === 1) {
            document.getElementById('div-transparent-previous')?.classList.add('ocultar');
        }
    }

    // --- Funcionalidad de Arrastre (Swipe) ---

    // 3. FUNCION onTouchStart
    window.onTouchStart = function(event) {
        touchStartX = event.changedTouches[0].clientX;
    }

    // 4. FUNCION onTouchEnd
    window.onTouchEnd = function(event) {
        const touchEndX = event.changedTouches[0].clientX;
        const deltaX = touchStartX - touchEndX; // Positivo si desliza hacia la izquierda (nextCard)
        const SWIPE_THRESHOLD = 50; // Mínimo de píxeles para que se considere un swipe

        // Deslizar hacia la izquierda (mover a la siguiente tarjeta)
        if (deltaX > SWIPE_THRESHOLD && currentStep < TOTAL_CARDS) {
            window.nextCard(); 
        } 
        // Deslizar hacia la derecha (mover a la tarjeta anterior)
        else if (deltaX < -SWIPE_THRESHOLD && currentStep > 1) {
            window.previousCard(); 
        }
    }

});