const modal = document.querySelector('.modal');
const tarefa = document.getElementById('tarefa');
const lista = document.querySelector('.lista-tarefas');
const botaoSalvar = document.getElementById('inserirTarefa');
const radio = document.querySelector('#task');
const tarefaAdicionada = document.getElementById('frase');



let tasks;
let id;

const getTasks = () => JSON.parse(localStorage.getItem('dbtasks'))?? []; 
const setTasks = () => localStorage.setItem('dbtasks',JSON.stringify(tasks));  


function loadTasks() {
    tasks = getTasks();
    lista.innerHTML = '';
    console.log(tasks);
    tasks.forEach((item,index) => {
        inserirTarefa(item,index);
    })
}

loadTasks();


function abrirModal(){
    modal.classList.add('active');
    tarefa.value = '';

    modal.onclick = e => {
        if(e.target.className.indexOf('modal') != -1) {
            modal.classList.remove('active');
        }
}
}

function inserirTarefa(item,index){
    let tarefaAdd = document.createElement('div');
    tarefaAdd.classList.add('tarefas');

    tarefaAdd.innerHTML = `
    <label onclick="riscar(${index})" id="frase"><input type="checkbox">${item.tarefa}</label>
    <button onclick="deletar(${index})"><i class="bx bxs-trash xs"></i></button>
    `
    lista.appendChild(tarefaAdd);   
}

botaoSalvar.onclick = () => {  // no clique do botao pegue o evento e verifique:
    {
    if(tarefa.value == ''){               // se o campo esta vazio ::::aguarde
        return;        
    }     
    else
        tasks.push({'tarefa':tarefa.value})   // se nao pega o valor do que foi digitado e empurra pro localStorage como JSON
    setTasks();
    modal.classList.remove('active');

    loadTasks();

 }
}

function deletar(index){
    tasks.splice(index, 1);   // exclui o item do array ...sabendo qual item é pelo index(indice ) passado
    setTasks();
    loadTasks();
}

modal.addEventListener('keydown', e =>{    //pegar o evento da tecla Enter ao ser pressionado no Modal 
    if(e.key === 'Enter'){
        botaoSalvar.onclick();
    }
})






