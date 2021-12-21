const html = {
    get(element) {
        return document.getElementById(element);
    }
}

const state = {
    name: html.get("name"),
    comment: html.get("comment"),
    commentsList: document.querySelector('#comments-list'),

    errorName: html.get("error-name"),
    errorComment: html.get("error-comment"),
}

const errors = {
    name: '',
    comment: '',
}

function getAll() {
    api.get("/comentarios")
    .then(response => {
        let res = response.data;

        for(let i = 0; i < res.length; i++) {
            state.commentsList
            .innerHTML += `
            <div class="col-4 mb-4">
                <div class="card-comment">
                    <span>
                    <h3>${res[i].nome}</h3>
                    <p>${res[i].comentario}</p>
                    </span>
                </div>
            </div>
            `
        }
    })
    .catch(error => {
        swal.fire("Erro!", "Não foi possível realizar a sua solicitação.", "error");
        console.log(error);
    }) 
}

// insere um novo registro
function insertNewComment() {
    if(validation()) {
        let newComment = {
            nome: state.name.value,
            comentario: state.comment.value
        }
    
        api.post("/comentarios", newComment)
        .then(response => {
            if(response.request.status === 200){
                swal.fire("Sucesso!", "Dados salvos com sucesso.", "success");
                clearAll();
                getAll();
            }
        }).catch(error => {
            swal.fire("Atenção!", "Não foi possível realizar a sua solicitação.", "warning");
        })
    } else {
        swal.fire(
            "Atenção!", 
            `
                <p>${errors.name}</p>
                <p>${errors.comment}</p>
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

    if(!state.comment.value) {
        errors.comment = 'O campo Comentário é obrigatório.'
    } else {
        errors.comment = ''
    }

    return !errors.name && !errors.comment;
}

// limpa tudo
function clearAll(){
    state.commentsList.innerHTML = "";
    state.name.value = '';
    state.comment.value = '';
}

getAll();