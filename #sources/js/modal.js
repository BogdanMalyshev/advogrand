"use strict"
//-------------------------------------------variables-------------------------------------------

const servicesLink = document.querySelectorAll(".list-services__link"),
      modal = document.querySelector('.modal'),
      modalContent = document.querySelector('.modal__content'),
      modalClose = document.querySelectorAll('.modal__close'),
      bodyScroll = document.querySelector('body'),
      btnModal = document.querySelectorAll('.btn-modal');  

//-------------------------------------------functions-modal-------------------------------------------

function modalShow (content){
    modal.classList.add('active');
    modalContent.innerHTML= `${content}`;

};

function modalHide (){
    modalClose.forEach(element=>{
        window.addEventListener('click', (e)=>{
            if(e.target == element || e.target == modal){
            modal.classList.remove('active');
            // bodyScroll.classList.remove('hide');
            }
        });
    });
};

//-------------------------------------------logics-modal-------------------------------------------


servicesLink.forEach((element, i) => {
    element.addEventListener('click', ()=>{
        if (element.getAttribute('id') == `card${i + 1}` && element.getAttribute('id') !== `card9`) {
            const XML = new XMLHttpRequest;

            XML.open('GET', 'js/DB.json');
            XML.setRequestHeader('Content-type', 'Application/json; charset=utf-8');
            XML.send();
            XML.addEventListener('load', () => {
                if (XML.readyState == 4 && XML.status == 200) {
                    const data = JSON.parse(XML.response);
                    modalShow (data.speciality[i]);
                };
            });
        }else{
            const XML = new XMLHttpRequest;

            XML.open('GET', 'js/DB.json');
            XML.setRequestHeader('Content-type', 'Application/json; charset=utf-8');
            XML.send();
            XML.addEventListener('load', () => {
                if (XML.readyState == 4 && XML.status == 200) {
                    const data = JSON.parse(XML.response);
                    modalShow (data.form);
                };
            });
        };
    });
});

btnModal.forEach(element=>{
  element.addEventListener('click', ()=>{
    const XML = new XMLHttpRequest;

    XML.open('GET', 'js/DB.json');
    XML.setRequestHeader('Content-type', 'Application/json; charset=utf-8');
    XML.send();
    XML.addEventListener('load', () => {
        if (XML.readyState == 4 && XML.status == 200) {
            const data = JSON.parse(XML.response);
            modalShow (data.form);
        };
    });
  })  
});
modalHide();