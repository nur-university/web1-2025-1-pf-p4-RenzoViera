document.addEventListener('DOMContentLoaded', () => {
  const botonPerfil = document.querySelector('.boton-perfil');
  const menuPerfil = document.querySelector('.menu-perfil');

  botonPerfil.addEventListener('click', (e) => {
    e.preventDefault();

    if (menuPerfil.style.display === 'block') {
      menuPerfil.style.display = 'none';
      botonPerfil.setAttribute('aria-expanded', 'false');
    } else {
      menuPerfil.style.display = 'block';
      botonPerfil.setAttribute('aria-expanded', 'true');
    }
  });

  document.addEventListener('click', (e) => {
    if (!menuPerfil.contains(e.target) && !botonPerfil.contains(e.target)) {
      menuPerfil.style.display = 'none';
      botonPerfil.setAttribute('aria-expanded', 'false');
    }
  });
});