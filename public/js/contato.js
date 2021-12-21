const html = {
    get(element) {
        return document.getElementById(element);
    }
}

const state = {
    name: html.get("name"),
    phone: html.get("phone"),
    email: html.get("email"),

    errorName: html.get("error-name"),
    errorPhone: html.get("error-phone"),
    errorEmail: html.get("error-email"),
}

const errors = {
    name: '',
    phone: '',
    email: '',
}

function insertOpenContact() {
    if(validation()) {
        let newContact = {
            nome: state.name.value,
            telefone: state.phone.value,
            email: state.email.value
        }
    
        api.post("/contato", newContact)
        .then(response => {
            if(response.request.status === 200){
                swal.fire("Sucesso!", "Dados salvos com sucesso.", "success");
                clearAll();
            }
        }).catch(error => {
            swal.fire("Atenção!", "Não foi possível realizar a sua solicitação.", "warning");
            console.log(error);
        })
    } else {
        swal.fire(
            "Atenção!", 
            `
                <p>${errors.name}</p>
                <p>${errors.phone}</p>
                <p>${errors.email}</p>
            `, 
            "warning"
        );

    }
}

function validation() {
    if(!state.name.value) {
        errors.name = 'O campo Nome é obrigatório.'
    } else {
        errors.name = ''
    }

    if(!state.phone.value) {
        errors.phone = 'O campo Telefone é obrigatório.'
    } else {
        errors.phone = ''
    }

    if(!emailValidate(state.email.value)) {
        errors.email = 'E-mail inválido'
    } else {
        errors.email = ''
    }

    return !errors.name && !errors.phone && !errors.email;
}


function emailValidate(email) {
    let re = /\S+@\S+\.\S+/;

    if(!re.test(email)) {
        return false;
    } else {
        return true;
    }
}

// limpa tudo
function clearAll(){
    state.name.value = '';
    state.phone.value = '';
    state.email.value = '';
}