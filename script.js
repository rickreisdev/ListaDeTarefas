const localStorageKey = 'to-do-list-rr'

function validaNewTask() {
    let inputValue = document.getElementById('input_task').value
    const semEspaco = inputValue.trim();

    let values = JSON.parse(localStorage.getItem(localStorageKey)
        || '[]')

    let existe = values.find(x => x.desc.trim() === semEspaco)
    return !!existe
}

function newTask() {
    let input = document.getElementById('input_task')
    input.style.border = ''

    if (!input.value) {
        input.style.border = '1px solid red'
        alert('Digite alguma task para inserir na lista!')
    } else if (validaNewTask()) {
        alert('Já existe uma tarefa com esta descrição!')
    }
    else {
        const inputValue = input.value.trim();

        let values = JSON.parse(localStorage.getItem(localStorageKey)
            || '[]')
        values.push({
            desc: input.value
        })
        localStorage.setItem(localStorageKey, JSON.stringify(values))
        showTask()
    }
    input.value = ''
}

function showTask() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]')

    let list = document.getElementById('to-do-list')
    list.innerHTML = ''

    for (let i = 0; i < values.length; i++) {
        list.innerHTML +=
            ` 
        <li>
            ${values[i]['desc']}
            <button id ='btnDone' onclick = 'doneTask("${values[i]['desc']}")' title="Marcar a tarefa como concluída">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                </svg>
            </button>
        </li> 
        `
    }
}

function doneTask(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || '[]')

    let index = values.findIndex(x => x.desc == data)

    values.splice(index, 1)
    localStorage.setItem(localStorageKey, JSON.stringify(values))
    showTask()
}

function showCurrentYear() {
    let year = new Date().getFullYear()
    document.getElementById('year').innerHTML = year
}

showTask()
showCurrentYear()