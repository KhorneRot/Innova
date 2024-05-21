// menu burger

document.getElementById("btn_menu").addEventListener("click", mostrar_menu);

document.getElementById("closeM").addEventListener("click", ocultar_menu)

document.getElementById("closeC").addEventListener("click", ocultar_menu)

document.getElementById("back_menu").addEventListener("click", ocultar_menu)

nav = document.getElementById("nav");
background_menu = document.getElementById("back_menu");

function mostrar_menu(){
    nav.style.right = "0px";
    background_menu.style.display = "block";
    document.body.style.overflow = "hidden";
}
function ocultar_menu(){
    nav.style.right = "-350px";
    background_menu.style.display = "none";
    document.body.style.overflow = "auto"; // Reactivar el desplazamiento
}


// ir arriba
function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

// productos
  document.addEventListener("DOMContentLoaded", function() {
    const titulos = document.querySelectorAll(".acordeon .titulo");
  
    titulos.forEach(function(titulo) {
      titulo.addEventListener("click", function() {
        this.parentElement.classList.toggle("activo");
        const icono = this.querySelector(".accordion-icon");
        icono.classList.toggle("rotate");
      });
    });
  });

// Seccion de productos

function openModal() {
  document.getElementById("myModal").style.display = "block";
  document.body.style.overflow = "hidden"; // Desactivar el desplazamiento
}

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  document.getElementById("myModal").style.display = "none";
  document.body.style.overflow = "auto"; // Reactivar el desplazamiento
}

window.onclick = function(event) {
  if (event.target == document.getElementById("myModal")) {
    document.getElementById("myModal").style.display = "none";
    document.body.style.overflow = "auto"; // Reactivar el desplazamiento
  }
}
