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

