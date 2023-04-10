const fields = document.querySelectorAll("[required]")

function validateField(field) {
  // logica para verificar se existem erros
  function verifyErrors() {
    let foundError = false

    for (let error in field.validity) {
      // se não for customError
      // então verifica se tem erro
      if (field.validity[error] && !field.validity.valid) {
        foundError = error
      }
    }
    return foundError
  }

  function customMessage(typeError) {
    const messages = {
      password: {
        valueMissing: "Digite sua senha",
      },
      email: {
        valueMissing: "Digite o seu Email",
        typeMismatch: "Por favor, digite um email válido",
      },
    }

    return messages[field.type][typeError]
  }

  //Mensagem customizada
  function setCustomMessage(message) {
    const spanError = field.parentNode.querySelector("span.error")

    if (message) {
      spanError.classList.add("active")
      spanError.innerHTML = message
    } else {
      spanError.classList.remove("active")
      spanError.innerHTML = ""
    }
  }

  //Customizar mensagem
  return function () {
    const error = verifyErrors()

    if (error) {
      const message = customMessage(error)
      field.style.borderColor = "#ed3a5a"
      setCustomMessage(message)
    } else {
      field.style.borderColor = "#0af27a"
      setCustomMessage()
    }
  }
}

//Função que faz o campo entrar na logica das ações de mudanças.
function customValidation(event) {
  const field = event.target
  const validation = validateField(field)

  validation()
}

//Analisar quais campos estão invalidos
for (field of fields) {
  //Para quando o Campo é invalido
  field.addEventListener("invalid", (event) => {
    event.preventDefault()
    customValidation(event)
  })
  //Para quando o campo não foi preenchido
  field.addEventListener("blur", customValidation)
}

//Enviar formulario
document.querySelector("form").addEventListener("submit", (event) => {
  console.log("enviar o formulário")

  event.preventDefault()
})

//Função para animação do icone eye e troca de texto/password
function togglePassword() {
  document
    .querySelectorAll(".eye")
    .forEach((eye) => eye.classList.toggle("hide"))

  if (senha.getAttribute("type") == "password") {
    senha.setAttribute("type", "text")
  } else {
    senha.setAttribute("type", "password")
  }
}
