document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const generalMessage = document.getElementById('form-general-message');

    // --- Definición de Expresiones Regulares ---
    // RegEx para validar el formato de un email básico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    // RegEx para validar el nombre (solo letras, espacios, tildes y guiones)
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]{2,}$/; 

    // --- Función para mostrar/ocultar errores en cada campo ---
    function displayError(fieldId, message) {
        const inputElement = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + '-error');
        const formGroup = inputElement.closest('.form-group');

        errorElement.textContent = message;
        if (message) {
            formGroup.classList.add('invalid');
        } else {
            formGroup.classList.remove('invalid');
        }
    }
    
    // --- Función de Validación Principal ---
    function validateForm() {
        let isValid = true;
        generalMessage.textContent = '';
        generalMessage.classList.remove('success');

        // 1. VALIDACIÓN DEL NOMBRE
        const nombre = document.getElementById('nombre').value.trim();
        if (nombre.length < 2) {
            displayError('nombre', 'El nombre es obligatorio y debe tener al menos 2 caracteres.');
            isValid = false;
        } else if (!nameRegex.test(nombre)) {
            displayError('nombre', 'El nombre solo puede contener letras y espacios.');
            isValid = false;
        } else {
            displayError('nombre', '');
        }

        // 2. VALIDACIÓN DEL EMAIL
        const email = document.getElementById('email').value.trim();
        if (email === '') {
            displayError('email', 'El correo electrónico es obligatorio.');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            displayError('email', 'Por favor, introduce un formato de email válido (ej: usuario@dominio.es).');
            isValid = false;
        } else {
            displayError('email', '');
        }

        // 3. VALIDACIÓN DEL SERVICIO (SELECT)
        const servicio = document.getElementById('servicio').value;
        if (servicio === '') {
            displayError('servicio', 'Debes seleccionar un asunto o servicio.');
            isValid = false;
        } else {
            displayError('servicio', '');
        }

        // 4. VALIDACIÓN DEL MENSAJE (Longitud mínima)
        const mensaje = document.getElementById('mensaje').value.trim();
        if (mensaje.length < 15) {
            displayError('mensaje', 'El mensaje es obligatorio y debe contener al menos 15 caracteres para ser descriptivo.');
            isValid = false;
        } else {
            displayError('mensaje', '');
        }

        return isValid;
    }

    // --- Event Listener para el ENVÍO del Formulario ---
    form.addEventListener('submit', function(event) {
        // Detener el envío del formulario (para que no vaya a 'action="#"')
        event.preventDefault(); 
        
        // Limpiar mensajes anteriores
        generalMessage.textContent = '';
        generalMessage.classList.remove('success');

        // Validar todos los campos
        const isFormValid = validateForm();

        if (isFormValid) {
            // Si la validación es exitosa (es solo de prueba, no se envía a un servidor real)
            
            generalMessage.textContent = '¡Validación Exitosa! El formulario está listo para enviarse (Prueba completada).';
            generalMessage.classList.add('success');

            // --- Simulación de Envío (Aquí iría tu código AJAX real) ---
            
            // Opcional: Deshabilitar el botón y simular carga
            const submitButton = document.getElementById('submitButton');
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';

            setTimeout(() => {
                // Restaurar y limpiar después de 3 segundos
                submitButton.disabled = false;
                submitButton.textContent = 'Enviar Mensaje';
                form.reset();
                setTimeout(() => {
                    generalMessage.textContent = '';
                    generalMessage.classList.remove('success');
                }, 4000);
            }, 3000);

        } else {
            // Si la validación falla
            generalMessage.textContent = 'Por favor, corrige los campos marcados en rojo.';
            generalMessage.style.color = '#dc3545';
            
            // Enfocar el primer campo con error
            const firstError = document.querySelector('.form-group.invalid input, .form-group.invalid select, .form-group.invalid textarea');
            if(firstError) {
                firstError.focus();
            }
        }
    });
});