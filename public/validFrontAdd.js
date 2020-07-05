var form = document.getElementById('addProductForm')
var buttonSend = document.querySelector('#sendInformation');

console.log(buttonSend.classList)

form.name.addEventListener('keyup', function(event){
    event.target.classList.add('is-invalid')
    buttonSend.disabled =true;
    
    let mensaje = event.target.value;
    
    
    if(mensaje.length <5){
        buttonSend.disabled =true;

}else {
    event.target.classList.replace('is-invalid','is-valid'),
    buttonSend.disabled =false;
    

}

});

form.description.addEventListener('keyup', function(event){
    let mensaje = event.target.value;

    event.target.classList.add('is-invalid')
    
    if(mensaje.length <20){
        event.target.classList.replace('is-valid','is-invalid');

}else {
    event.target.classList.replace('is-invalid','is-valid') ;
    

}

});
