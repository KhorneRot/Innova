document.getElementById("btn_menu").addEventListener("click", mostrar_menu);

document.getElementById("closeM").addEventListener("click", ocultar_menu)

document.getElementById("closeC").addEventListener("click", ocultar_menu)

document.getElementById("back_menu").addEventListener("click", ocultar_menu)

nav = document.getElementById("nav");
background_menu = document.getElementById("back_menu");

function mostrar_menu(){
    nav.style.right = "0px";
    background_menu.style.display = "block";
}
function ocultar_menu(){
    nav.style.right = "-250px";
    background_menu.style.display = "none";
}



function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


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