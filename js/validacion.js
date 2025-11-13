document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const errorMessageDiv = document.getElementById('error-message');

    if (form) {
        form.addEventListener('submit', function(event) {
            // Previene el envío por defecto del formulario (necesario para la validación JS)
            event.preventDefault(); 
            
            errorMessageDiv.textContent = ''; // Limpiar mensajes de error previos
            let errors = [];

            // Obtener valores de los campos
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const servicio = document.getElementById('servicio').value;
            const mensaje = document.getElementById('mensaje').value.trim();

            // 1. Comprobación de campos vacíos
            if (nombre === '') {
                errors.push('El campo Nombre es obligatorio.');
            }
            if (email === '') {
                errors.push('El campo Correo Electrónico es obligatorio.');
            }
            if (servicio === '') {
                errors.push('Debe seleccionar un Asunto/Servicio.');
            }
            if (mensaje === '') {
                errors.push('El campo Mensaje es obligatorio.');
            }

            // 2. Validación de formato de email (Regex)
            // Expresión regular para un formato de email básico: nombre@dominio.extensión
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email !== '' && !emailRegex.test(email)) {
                errors.push('El formato del correo electrónico no es válido.');
            }
            
            // 3. Resultado de la validación
            if (errors.length > 0) {
                // Mostrar errores si los hay
                errorMessageDiv.innerHTML = '<ul>' + errors.map(err => `<li>${err}</li>`).join('') + '</ul>';
                // Opcional: enfocar el primer campo con error
                if (nombre === '') document.getElementById('nombre').focus();
                
            } else {
                // Si la validación es exitosa:
                errorMessageDiv.textContent = '¡Formulario validado! Procesando el envío...';
                errorMessageDiv.style.color = 'green';
                
                // En un proyecto real, aquí iría el código AJAX para enviar los datos al servidor.
                // Por ahora, simulamos el envío:
                setTimeout(() => {
                    alert('Gracias por tu mensaje, Integral TI se pondrá en contacto pronto.');
                    form.reset(); // Limpiar el formulario
                    errorMessageDiv.textContent = '';
                }, 1500);
            }
        });
    }
});