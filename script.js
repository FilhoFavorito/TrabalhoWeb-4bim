const frm = document.querySelector("form")      // obtém elementos da página
const dvQuadro = document.querySelector("#divQuadro")

frm.addEventListener("submit", (e) => {
  e.preventDefault()                            // evita envio do form

  const tarefa = frm.inTarefa.value             // obtém o conteúdo digitado

  const h5 = document.createElement("h5")       // cria o elemento HTML h5
  const texto = document.createTextNode(tarefa) // cria um texto
  h5.appendChild(texto)                         // define que texto será filho de h5
  dvQuadro.appendChild(h5)                      // e que h5 será filho de divQuadro

  frm.inTarefa.value = ""                       // limpa o campo de edição
  frm.inTarefa.focus()                          // joga o cursor neste campo
})

frm.btSelecionar.addEventListener("click", () => { //ouvindo botão "selecionar"
  const tarefas = document.querySelectorAll("h5")  //seleciona todas as tags h5 e retorna um array delas

  if (tarefas.length == 0) { //verifica se o array está vazio
    alert("Não há tarefas para selecionar")        //retorna um alert se estiver vazio
    return                                        
  }

  let aux = -1                   //variavel de contagem

 
  for (let i = 0; i < tarefas.length; i++) { //percorre todas as tarefas
    
    if (tarefas[i].className == "tarefa-selecionada") {  //verifica se a tarefa atual está selecionada
      tarefas[i].className = "tarefa-normal"      //muda o nome da classe para "tarefa-normal"
      aux = i                                     
      break                      //sai do loop                 
    }
  }

  
  if (aux == tarefas.length - 1) {
    aux = -1
  }

  tarefas[aux + 1].className = "tarefa-selecionada"  //define uma tarefa como selecionada
})

frm.btRetirar.addEventListener("click", () => { //ouvindo botão "retirar"
  const tarefas = document.querySelectorAll("h5") //seleciona todas as tags h5 e retorna um array delas

  let aux = -1               

  
  tarefas.forEach((tarefa, i) => { //percorre o array de tarefas
    if (tarefa.className == "tarefa-selecionada") {  //verifica se a tarefa está selecionada
      aux = i //recebe a posição da tarefa selecionada
      console.log(i) //mostra a posição da tarefa no console 
    }
  })

  if (aux == -1) {             
    alert("Selecione uma tarefa para removê-la...") //dá um alert comandando a seleção de uma tarefa
    return
  }

  if (confirm(`Confirma Exclusão de "${tarefas[aux].innerText}"?`)) { //pede confirmação para a exclusão da tarefa
    dvQuadro.removeChild(tarefas[aux])        //exclui a tarefa
  }
})

frm.btGravar.addEventListener("click", () => { //ouvindo botão "Gravar"
  const tarefas = document.querySelectorAll("h5")  //seleciona todas as tags h5 e retorna um array delas

  if (tarefas.length == 0) { //verifica se existem tarefas para serem salvas
    alert("Não há tarefas para serem salvas")      //caso não haja nenhuma, retorna um alert
    return                                         
  }

  let dados = ""                            //cria variavel onde serão guardadas as tarefas
  tarefas.forEach(tarefa => { //percorre o array de tarefas
    dados += tarefa.innerText + ";"         //adiciona o texto de cada tarefa a dados com ";" no final
  })

  
  localStorage.setItem("tarefasDia", dados.slice(0, -1)) //guarda dentro de tarefasDia os dados pegos

  
  if (localStorage.getItem("tarefasDia")) { //retona um alert assim que termina de armazenar
    alert("Ok! Tarefas Salvas")
  }
})

window.addEventListener("load", () => { //ouvindo o carregar da página
  
  if (localStorage.getItem("tarefasDia")) { //se existirem tarefas salvas
    
    const dados = localStorage.getItem("tarefasDia").split(";") //cria uma const dados com todos as tarefas

    // percorre os dados armazenados em localStorage
    dados.forEach(dado => { //percorre todos os dados
      const h5 = document.createElement("h5")     //cria um elemento h5 para cada tarefa 
      const texto = document.createTextNode(dado)  //pega o texo de cada tarefa
      h5.appendChild(texto)                      //adiciona o texto de cada tarefa à tag h5
      dvQuadro.appendChild(h5)                   //adicionar cada tag h5 ao campo de tarefas
    })
  }
})