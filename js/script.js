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
