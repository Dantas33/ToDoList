const button = document.querySelector('.button-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-task')

let minhaListaDeItens = []

function adicionarNovaTarefa() {
    if (input.value.trim() === '') {
        return
    }


    minhaListaDeItens.push({
        tarefa: input.value,
        concluida: false
    })

    input.value = ''

    mostrarTarefas()
}

function mostrarTarefas() {
    let novaLi = '';

    minhaListaDeItens.forEach((item, index) => {
        novaLi = novaLi + `
        <li class="task ${item.concluida && "done"}">
            <img src="./img/checked.png" alt="check-na-tarefa" onClick="concluirTarefa(${index})">
            <p>${item.tarefa}</p>
            <img src="./img/trash.png" alt="tarefa-para-o-lixo" onClick="deletarItem(${index})">
        </li>
        `
    })

    listaCompleta.innerHTML = novaLi

    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))



}

function concluirTarefa(index) {

    minhaListaDeItens[index].concluida = !minhaListaDeItens[index].concluida

    mostrarTarefas()
}

function deletarItem(index) {
    minhaListaDeItens.splice(index, 1)

    mostrarTarefas()

}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    if (tarefasDoLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    }

    mostrarTarefas()

}

recarregarTarefas()

button.addEventListener('click', adicionarNovaTarefa);
input.addEventListener('keydown', function (event){
    if (event.key === 'Enter') {
        adicionarNovaTarefa();
    }
});




