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

// Sistema de tabs para educación
document.addEventListener("DOMContentLoaded", function () {
  const btnEducacion = document.getElementById('btn-educacion');
  const btnCertificaciones = document.getElementById('btn-certificaciones');
  const contenidoEducacion = document.getElementById('contenido-educacion');
  const contenidoCertificaciones = document.getElementById('contenido-certificaciones');

  function mostrarEducacion() {
    // Mostrar educación, ocultar certificaciones
    contenidoEducacion.style.display = 'block';
    contenidoCertificaciones.style.display = 'none';
    
    // Actualizar estados de botones
    btnEducacion.classList.add('active');
    btnCertificaciones.classList.remove('active');
  }

  function mostrarCertificaciones() {
    // Mostrar certificaciones, ocultar educación
    contenidoEducacion.style.display = 'none';
    contenidoCertificaciones.style.display = 'block';
    
    // Actualizar estados de botones
    btnEducacion.classList.remove('active');
    btnCertificaciones.classList.add('active');
  }

  // Event listeners
  if (btnEducacion && btnCertificaciones) {
    btnEducacion.addEventListener('click', mostrarEducacion);
    btnCertificaciones.addEventListener('click', mostrarCertificaciones);
    
    // Mostrar educación por defecto
    mostrarEducacion();
  }
});

/* helper: fetch con timeout usando AbortController */
async function fetchWithTimeout(url, options = {}, timeout = 10000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const resp = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(id);
        return resp;
    } catch (err) {
        clearTimeout(id);
        throw err;
    }
}

/* reemplazo del handler de descarga del CV para usar fetchWithTimeout y manejo de errores */
document.addEventListener("DOMContentLoaded", function () {
    const cvLink = document.getElementById('cv-link');
    if (cvLink) {
        cvLink.addEventListener('click', async function (e) {
            const url = this.getAttribute('href');
            const filename = this.getAttribute('download') || (url ? url.split('/').pop() : 'CV.pdf');
            if (!url) return;

            try {
                e.preventDefault();
                // timeout en ms (ajustá si querés más tiempo)
                const resp = await fetchWithTimeout(url, { cache: 'no-store' }, 12000);
                if (!resp.ok) {
                    // respuesta 4xx/5xx
                    console.error('Download failed', resp.status, resp.statusText);
                    alert('No se pudo descargar el archivo (error del servidor). Intenta nuevamente más tarde.');
                    return;
                }
                const blob = await resp.blob();
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = blobUrl;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(blobUrl);
            } catch (err) {
                if (err.name === 'AbortError') {
                    console.error('Request timeout', err);
                    alert('La descarga tardó demasiado y se canceló. Verifica tu conexión y vuelve a intentar.');
                } else {
                    console.error('Download error', err);
                    alert('Ocurrió un error al intentar descargar el archivo. Revisa la consola para más detalles.');
                    // fallback: abrir en nueva pestaña por si el navegador puede manejarlo
                    try { window.open(url, '_blank', 'noopener'); } catch (e) { /* noop */ }
                }
            }
        });
    }
});

// Animación on-scroll para .sobremi-wrapper (IntersectionObserver + fallback)
document.addEventListener('DOMContentLoaded', function () {
    const target = document.querySelector('.sobremi-wrapper');
    if (!target) return;

    function markInView() {
        target.classList.add('in-view');
    }

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    markInView();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 }); // 20% visible
        io.observe(target);
    } else {
        // Fallback simple: on scroll check bounding rect
        function onScrollCheck() {
            const rect = target.getBoundingClientRect();
            const vh = window.innerHeight || document.documentElement.clientHeight;
            if (rect.top <= vh * 0.85) {
                markInView();
                window.removeEventListener('scroll', onScrollCheck);
            }
        }
        window.addEventListener('scroll', onScrollCheck, { passive: true });
        // comprobar inmediatamente en caso de que ya esté visible
        onScrollCheck();
    }
});
