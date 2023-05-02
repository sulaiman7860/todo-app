const outputValue = (outputId, output) => {
    document.getElementById(outputId).innerHTML = output
}

const showOutput = (output) => {
    document.getElementById("output").innerHTML = output
}

function inputValue(fieldId) {
    return document.getElementById(fieldId).value;
}

function emptyFieldValues() {
    document.getElementById("title").value = ""
    document.getElementById("location").value = ""
    document.getElementById("description").value = ""
}


const randomId = () => {
    return Math.random().toString(36).slice(2)
}

const handleSubmit = () => {
    event.preventDefault()

    let title = inputValue("title"), location = inputValue("location"), description = inputValue("description")

    title = title.trim()
    location = location.trim()
    description = description.trim()
    
    if (title.length < 3) {
        showToast("Please Enter Your Title Correctly", "error")
        return
    }
    if (location.length < 3) {
        showToast("Please Enter Your Location Correctly", "error")
        return
    }
    if (description.length < 8) {
        showToast("Please Enter Your Description Correctly", "error")
        return
    }
    
    let todo = {title, location, description}
    
    todo.id = randomId()
    todo.dateCreated = new Date().getTime()
    todo.status = "active"
    
    const todos = JSON.parse(localStorage.getItem("todos")) || []
    
    todos.push(todo)
    
    localStorage.setItem("todos", JSON.stringify(todos))
    
    showToast("A new Todo has been successfully added", "success")
    showTodos()
    emptyFieldValues()
}

const showTodos = () => {
    clearOutput()
    
    const todos = JSON.parse(localStorage.getItem("todos")) || []
    console.log(todos.length)

    if (!todos.length) {
        showOutput("<h5 class='text-center'>HURRY! No task available. Use Add Task button to add your task</h5>")
        return;
    }
    
    let startingCode = '<div class="table-responsive"><table class="table table-hover">'
    let headCode = '<thead><tr><th scope="col">#</th><th scope="col">Title</th><th scope="col">Location</th><th scope="col">Description</th><th scope="col">Action</th></tr></thead>'
    
    let endingCode = '</table></div>'
    
    let bodyCode = ''

   for (let i = 0; i < todos.length; i++) {
     //  bodyCode += `<tr><th scope="row"> ${i +1} </th><td>${todo.title}</td><td>${todo.location}</td><td>${todo.description}</td><td><button class="btn btn-info">Edit</button><button class="btn btn-danger text-light ms-2">Delete</button></td></tr>`
     
     bodyCode += '<tr><th scope="row">'+ (i +1) +'</th><td>'+todos[i].title + '</td><td>' + todos[i].location + '</td><td>'+ todos[i].description +'</td><td></td></tr>'
    }
    
    let table = startingCode + headCode + "<tbody>" + bodyCode + "</tbody>" + endingCode
    
    console.log(table)
    
    showOutput(table)
}

// --------------------------------------------------------------------------------------------------
function showToast(msg, type) {
    let bgColor 
    switch (type) {
        case "error":
            bgColor = "linear-gradient(to right, #1a2a6c, #b21f1f, #f64f59)"
            break;
            case "success":
                bgColor = "linear-gradient(to right, #12c2e9, #c471ed, #f64f59)"
                break;
                default:
                    bgColor = "#000"
                    break;
                }
                
                Toastify({
        text: msg,
        duration: 3000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        style: {
            background: bgColor,
        },
    }).showToast();
}

const askUserName = () => {
    let userName = prompt("Please Enter Your Name")
    if (!userName) {
        outputValue("userName", "Hi, User!")
    } else {
        outputValue("userName", `Hi, <b>${userName}</b>!`)

    }
}

window.onload = () => {
    askUserName()
    outputValue("time", dayjs().format('dddd, MMMM D, YYYY h:mm A'))
    showTodos()
    outputValue("year", dayjs().year())
}

const clearOutput = () => {
    document.getElementById("output").innerHTML = ""
}
