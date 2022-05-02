/*Top Links*/
const navigation = document.querySelector('nav');
const allLinks = navigation.querySelectorAll('a');

allLinks.forEach((link) => {
  link.addEventListener("click", (e)=>{

    const clickedPage = e.target.innerText.toLowerCase();

    for (let i = 0; i < allLinks.length; i++) {
      let page = allLinks[i].innerText.toLowerCase();

      if(clickedPage === page){
        document.querySelector(`.${page}`).style.opacity = 1;
        document.querySelector(`.${page}`).style.height = "100%";

      } else {
        document.querySelector(`.${page}`).style.opacity = 0;
        document.querySelector(`.${page}`).style.height = "0";

      }
    }

  });
});

/*Project Links*/
const projNavigation = document.querySelector('.proj-links');
const allProjLinks = projNavigation.querySelectorAll('a');

allProjLinks.forEach((projLink)=> {
  projLink.addEventListener("click", (e)=>{

    const clickedProject = e.target.innerText.toLowerCase().replace(/\s/g,"-");

    for (let i = 0; i < allProjLinks.length; i++) {
      let proj = allProjLinks[i].innerText.toLowerCase().replace(/\s/g,"-");

      if(clickedProject === proj){
        document.querySelector(`.${proj}`).style.opacity = 1;
        document.querySelector(`.${proj}`).style.height = "100%";

      } else {
        document.querySelector(`.${proj}`).style.opacity = 0;
        document.querySelector(`.${proj}`).style.height = "0";

      }
    }

  });
});

/*Burger Menu Links*/

const bMenu = document.querySelector('.burger-menu');
const menu = document.querySelector('nav > ul');

bMenu.addEventListener("click", ()=>{

  menu.classList.toggle('open-menu');

});


window.addEventListener("resize", (e)=>{

  if(e.target.innerWidth > 768){
    menu.classList.remove('open-menu');
  }

})
