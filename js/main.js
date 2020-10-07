


"use strict"
//-------------------------------------------variables-------------------------------------------

const servicesLink = document.querySelectorAll(".list-services__link"),
    modal = document.querySelector('.modal'),
    modalContent = document.querySelector('.modal__content'),
    modalClose = document.querySelectorAll('.modal__close'),
    bodyScroll = document.querySelector('body'),
    btnModal = document.querySelectorAll('.btn-modal');



let forms = document.querySelectorAll('form');

//-------------------------------------------functions-modal-------------------------------------------

function modalShow(content) {
    modal.classList.add('active');
    modalContent.innerHTML = `${content}`;
    bodyScroll.classList.add('hide');
};

function modalHide() {
    modalClose.forEach(element => {
        window.addEventListener('click', (e) => {
            if (e.target == element || e.target == modal) {
                modal.classList.remove('active');
                bodyScroll.classList.remove('hide');
            }
        });
    });
};

//-------------------------------------------logics-modal-------------------------------------------


servicesLink.forEach((element, i) => {
    element.addEventListener('click', () => {
        if (element.getAttribute('id') == `card${i + 1}` && element.getAttribute('id') !== `card9`) {
            const XML = new XMLHttpRequest;

            XML.open('GET', 'js/DB.json');
            XML.setRequestHeader('Content-type', 'Application/json; charset=utf-8');
            XML.send();
            XML.addEventListener('load', () => {
                if (XML.readyState == 4 && XML.status == 200) {
                    const data = JSON.parse(XML.response);
                    modalShow(data.speciality[i]);
                };
            });
        } else {
            const XML = new XMLHttpRequest;

            XML.open('GET', 'js/DB.json');
            XML.setRequestHeader('Content-type', 'Application/json; charset=utf-8');
            XML.send();
            XML.addEventListener('load', () => {
                if (XML.readyState == 4 && XML.status == 200) {
                    const data = JSON.parse(XML.response);
                    modalShow(data.form);
                };
            });
        };
    });
});

btnModal.forEach(element => {
    element.addEventListener('click', () => {
        const XML = new XMLHttpRequest;

        XML.open('GET', 'js/DB.json');
        XML.setRequestHeader('Content-type', 'Application/json; charset=utf-8');
        XML.send();
        XML.addEventListener('load', () => {
            if (XML.readyState == 4 && XML.status == 200) {
                const data = JSON.parse(XML.response);
                modalShow(data.form);
            };
        });
        setTimeout(() => {
            forms = document.querySelectorAll('form');
            forms.forEach(form=>{
                postData(form);
            });
        }, 1000);
    })
});
modalHide();
'use strict';


const btnLeft = document.querySelector('.slider__btn-left'),
    btnRight = document.querySelector('.slider__btn-right'),
    slides = document.querySelector('.slider__slides'),
    slide = document.querySelectorAll('.slider__slide');

let src = [],
    inner =[];

slide.forEach((e, i) => {
    src[i] = e.children[0].src;
    inner[i] = e.children[1].outerHTML;
    e.remove();
});


let step = 0;
let offset = 0;


src.forEach(() => {
    let div = document.createElement('div');
    div.classList.add('slider__slide');
    div.innerHTML = `<img src="${src[step]}">${inner[step]}`;
    div.style.left = offset * 220 + 'px';
    slides.append(div);
    if (step == src.length - 1) {
        step = 0;
    } else {
        step++;
    }

    if (offset != 6) {
        offset++;
    }
});



function addElementLeft() {
    let div = document.createElement('div');
    div.classList.add('slider__slide');
    div.innerHTML = `<img src="${src[step]}">${inner[step]}`;
    div.style.left = offset * 220 + 'px';
    slides.append(div);
    if (step == src.length - 1) {
        step = 0;
    } else {
        step++;
    }
};


function addElementRight() {
    if (step == 0) {
        step = src.length - 1;
    } else {
        --step;
    }
    let div = document.createElement('div');
    div.classList.add('slider__slide');
    div.innerHTML = `<img src="${src[step]}">${inner[step]}`;
    div.style.left = '-220px';
    slides.prepend(div);
};



function left (){
    btnRight.onclick = null;
    let slide2 = document.querySelectorAll('.slider__slide');
    slide2.forEach(e => {
        e.style.transform = `translate(${Number(e.style.transform.slice(10, -3)) - 220}px)`;
    });
    setTimeout(() => {
        slide2[0].remove();
        addElementLeft();
        btnRight.onclick = left;
    }, 520);


};

function right() {
    btnLeft.onclick = null;
    addElementRight();
    setTimeout(() => {
            let slide2 = document.querySelectorAll('.slider__slide');
            slide2.forEach(e => {
                e.style.transform = `translate(${Number(e.style.transform.slice(10, -3)) + 220}px)`;
            });
            slide2[slide2.length - 1].remove();
            setTimeout(() => {
                btnLeft.onclick = right;
            }, 510);
        
    }, 10);
}

btnLeft.onclick = right;
btnRight.onclick = left;


'use strict';

function postData(form){
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const xml = new XMLHttpRequest();
        xml.open('POST', 'server.php');
        xml.setRequestHeader('Content-type', 'aplication/json');
        const formData =new FormData(form),
              object = {};
        
        formData.forEach((value, key)=>{
            object[key] = value;
        });
        xml.send(JSON.stringify(object));

        xml.addEventListener('load', ()=>{
            if(xml.status === 200){
                form.reset();
                console.log(xml.response);
            }
        });
    });
}

forms.forEach(form=>{
    postData(form);
});

btnModal.forEach(element => {
    element.addEventListener('click', () => {
        setTimeout(() => {
            forms = document.querySelectorAll('form');
        }, 1000);
    })
});