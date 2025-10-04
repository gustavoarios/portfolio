document.addEventListener('DOMContentLoaded', () => {
  const navbarCollapse = document.getElementById('navbarNav');
  const navbarToggler = document.querySelector('.navbar-toggler');

  // Cerrar el menú al hacer clic fuera de él
  document.addEventListener('click', (event) => {
    const isClickInsideMenu = navbarCollapse.contains(event.target);
    const isClickOnToggler = navbarToggler.contains(event.target);

    if (!isClickInsideMenu && !isClickOnToggler && navbarCollapse.classList.contains('show')) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false
      });
      bsCollapse.hide();
    }
  });
});

// para la redimension suave de los contenidos de cobertura

document.addEventListener("DOMContentLoaded", function () {
  const botones = document.querySelectorAll('.btn-cobertura');
  const contenidos = document.querySelectorAll('.contenido-cobertura[data-cobertura]');
  const wrapper = document.querySelector('.cobertura-contenidos');

  function ocultarTodos() {
    contenidos.forEach(div => div.style.display = 'none');
  }

  function mostrarContenido(tipo) {
    ocultarTodos();
    const div = document.querySelector('.contenido-cobertura[data-cobertura="' + tipo + '"]');
    if (div) div.style.display = 'block';

    // Activa la animación suave
    wrapper.classList.add('activo');
    // Si querés que se colapse al ocultar, podés sacar la clase cuando no hay nada visible
    // (opcional, si solo hay uno visible a la vez, no hace falta)
  }

  botones.forEach(boton => {
    boton.addEventListener('click', function () {
      mostrarContenido(this.id.replace('btn-', ''));
    });
  });

  // Oculta todos al cargar y activa la animación
  ocultarTodos();
  wrapper.classList.add('activo');
});

// Configuración EmailJS
emailjs.init("9-38LuSOAnGUvLuOp"); // Tu Public Key

// Manejo del formulario de contacto
document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector('.formulario-contacto');
    
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btnEnviar = document.querySelector('.btn-enviar');
            const textoOriginal = btnEnviar.textContent;
            btnEnviar.textContent = 'Enviando...';
            btnEnviar.disabled = true;
            
            const templateParams = {
                to_email: 'gustavoadonairios@gmail.com',
                from_name: document.getElementById('nombre').value,
                from_email: document.getElementById('email').value,
                phone: document.getElementById('telefono').value,
                subject: document.getElementById('asunto').value,
                message: document.getElementById('mensaje').value
            };
            
            emailjs.send('service_portfolio', 'template_j7isemc', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('¡Mensaje enviado correctamente! Te responderé pronto.');
                    formulario.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    alert('Error al enviar el mensaje. Por favor intenta nuevamente.');
                })
                .finally(function() {
                    btnEnviar.textContent = textoOriginal;
                    btnEnviar.disabled = false;
                });
        });
    }
});
