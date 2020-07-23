let formulario = document.querySelector('form.login');



formulario.addEventListener('submit',function(e){
    let campoEmail = document.querySelector('input.email');
    let campoPassword = document.querySelector('input.password');
    let mensajeErrorEmail = document.querySelector('p.mensajeErrorEmail');
    let mensajeErrorPassword = document.querySelector('p.mensajeErrorPassword');

    if(campoEmail.value == ''){

        mensajeErrorEmail.innerText = 'Campo Email vacío. Debe ingresar un Correo Válido o Registrado.'
        mensajeErrorPassword.innerText = ''
        e.preventDefault();


    }else{

        if(campoPassword.value == '' || campoPassword.value.length <8){

    
            mensajeErrorPassword.innerText = 'Campo Password está vacío. Debe ingresar una contraseña válida de al menos 8 caracteres.'
            mensajeErrorEmail.innerText = ''

            e.preventDefault();
    
        }else{

        }
    }


})