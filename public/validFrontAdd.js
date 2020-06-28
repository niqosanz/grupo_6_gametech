var form = document.getElementById('addProductForm')
var buttonSend = document.getElementById('sendInformation');
console.log(form)

form.name.addEventListener('keyup', function(event){
    let mensaje = event.target.value;
    event.target.classList.add('is-invalid')
    
    if(mensaje.length <5){
        console.log(event.target.value)
        event.target.classList.replace('is-valid','is-invalid');

}else {
    event.target.classList.replace('is-invalid','is-valid') ;
    

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
