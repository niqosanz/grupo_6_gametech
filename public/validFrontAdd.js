var form = document.getElementById('addProductForm')
var buttonSend = document.querySelector('#sendInformation');

console.log(buttonSend.classList)

form.name.addEventListener('keyup', function(event){
    buttonSend.classList.add('disabled')
    
    let mensaje = event.target.value;
    
    
    if(mensaje.length <5){
        console.log(buttonSend.classList)
        buttonSend.classList.toggle('disabled');

}else {
    buttonSend.classList.replace('disabled','new')
    console.log(buttonSend.classList) ;
    

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
