let form = document.getElementById('addProductForm')
form.name.addEventListener('keyup', function(event){
    let mensaje = event.target.value;
    if(mensaje.length <=5){
        let buttonSend = document.querySelector('#sendInformation');

        buttonSend.addEventListener('click',function(event){
        
            event.preventDefault()
         
        console.log(event.target.value)
    })
}

});
    
