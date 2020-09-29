



"use strict"
//-------------------------------------------variables-------------------------------------------

const servicesLink = document.querySelectorAll(".list-services__link"),
      modal = document.querySelector('.modal'),
      modalContent = document.querySelector('.modal__content'),
      modalClose = document.querySelectorAll('.modal__close');  

//-------------------------------------------functions-modal-------------------------------------------

function modalShow (content){
    modal.classList.add('active');
    modalContent.innerHTML= `${content}`;
};

function modalHide (){
    modal.classList.remove('active');
};

//-------------------------------------------logics-modal-------------------------------------------

servicesLink.forEach((element, i) => {
    element.addEventListener('click', ()=>{
        if (element.getAttribute('id') == `card${i+1}`) {
            modalShow(`card${i+1}`);
        }
    });
});

modalClose.forEach(element=>{
    window.addEventListener('click', (e)=>{
        if(e.target == element || e.target == modal){
            modalHide();
        }
    });
});