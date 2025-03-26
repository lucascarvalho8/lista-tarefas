// Obtém referências aos elementos do DOM
const tasklist = document.getElementById("taskList"); // Lista de tarefas
const taskInput = document.getElementById("taskInput"); // Input para nova tarefa
const searchInput = document.getElementById("searchInput"); // Input de pesquisa
const searchIcon = document.querySelector(".search-icon"); // Ícone de pesquisa

// Função para adicionar uma nova tarefa
function addTask() {
    const taskText = taskInput.value.trim(); // Obtém e limpa o texto da tarefa
    
    // Verifica se o texto não está vazio
    if (taskText !== "") {
        const maxText = taskText.substring(0, 35); // Limita o texto a 35 caracteres

        // Cria um novo elemento de lista (li) para a tarefa
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${maxText}</span>
            <button class="editButton" onClick="editTask(this)">Editar</button>
            <button class="deleteButton" onClick="deleteTask(this)">Remover</button>
        `;
        
        tasklist.appendChild(li); // Adiciona a nova tarefa à lista
        taskInput.value = ""; // Limpa o campo de input
    }
}

// Função para editar uma tarefa existente
function editTask(button) {
    const li = button.parentElement; // Obtém o elemento li pai
    const span = li.querySelector("span"); // Obtém o elemento span com o texto
    const newText = prompt("Editar tarefa:", span.textContent); // Abre prompt para edição
    
    // Verifica se o usuário não cancelou e o texto não está vazio
    if (newText !== null && newText.trim() !== "") {
        span.textContent = newText.trim(); // Atualiza o texto da tarefa
    }
}

// Função para remover uma tarefa
function deleteTask(button) {
    const li = button.parentElement; // Obtém o elemento li pai
    tasklist.removeChild(li); // Remove a tarefa da lista
}

// Função para pesquisar tarefas
function searchTasks() {
    const searchTerm = searchInput.value.toLowerCase(); // Obtém o termo de pesquisa em minúsculas
    const tasks = tasklist.getElementsByTagName("li"); // Obtém todas as tarefas
    
    // Percorre todas as tarefas
    for (let task of tasks) {
        const taskText = task.querySelector("span").textContent.toLowerCase(); // Obtém o texto da tarefa
        
        // Mostra ou esconde a tarefa baseado no termo de pesquisa
        if (taskText.includes(searchTerm)) {
            task.style.display = "flex"; // Mostra a tarefa se corresponder
        } else {
            task.style.display = "none"; // Esconde a tarefa se não corresponder
        }
    }
}

// Adiciona event listeners para a pesquisa
searchInput.addEventListener("keyup", searchTasks); // Pesquisa ao digitar
searchIcon.addEventListener("click", searchTasks); // Pesquisa ao clicar no ícone

// Permite adicionar tarefa pressionando Enter
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") { // Verifica se a tecla pressionada foi Enter
        addTask(); // Chama a função para adicionar tarefa
    }
});