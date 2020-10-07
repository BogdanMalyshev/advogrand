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