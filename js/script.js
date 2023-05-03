window.addEventListener("load", () => {
    init();
  });
  
  const init = () => {
    // Prompt user for name
    let userName = prompt("Please enter your name:");
  
    // Keep prompting until the user enters a valid name
    while (!userName) {
      userName = prompt("Please enter your name:");
    }
  
    // Set the user name in the header
    document.getElementById("userName").innerHTML = `Welcome, <b>${userName}</b>!`;
  
    // Add event listeners
    // document.getElementById("addTaskButton").addEventListener("click", handleSubmit);
    // document.getElementById("updateTaskButton").addEventListener("click", handleUpdate);
    // document.getElementById("cancelTaskButton").addEventListener("click", handleCancel);
    // document.getElementById("searchTaskButton").addEventListener("click", handleSearch);
    // document.getElementById("searchTaskInput").addEventListener("keyup", handleSearch);
  
    // Show todos from local storage
    document.getElementById("time").innerHTML = dayjs().format('dddd, MMMM D, YYYY h:mm A')
    showTodos();
  }
  
  
  
   
  
  const setTodosInLocalStorage = (newTodos) =>{
      localStorage.setItem("todos", JSON.stringify(newTodos));
  }
  
  const showOutput = (output) => {
      document.getElementById("output").innerHTML = output; 
  }
  const getInputFieldValue = (id) => document.getElementById(id).value;
  
  const setFieldValue = (fieldId, value) => {
      document.getElementById(fieldId).value = value;
  }
  
  const emptyFieldValues = () => {
      document.getElementById("title").value = ""
      document.getElementById("location").value = ""
      document.getElementById("description").value = ""
  }
  const getRandomId = () => Math.random().toString(36).slice(2);
  
  
  
  setInterval( ()=>{
      document.getElementById("top-nav").innerHTML = dayjs().format("dddd MM-DD-YYYY hh:mm:ss")
  },1000)
  
  
  const handleSubmit = () => {
    event.preventDefault();
    let title = getInputFieldValue("title");
    let location = getInputFieldValue("location");
    let description = getInputFieldValue("description");
  
    title = title.trim();
    location = location.trim();
    description = description.trim();
  
    if (title.length < 3) {
      showNotification("Please enter your title correctly.", "error");
      return;
    }
    if (location.length < 3) {
      showNotification("Please enter your location correctly.", "error");
      return;
    }
    if (description.length < 3) {
      showNotification("Please enter your description correctly.", "error");
      return;
    }
    const todo = {
      title,
      location,
      description,
      id: getRandomId(),
      dateCreated: new Date().getTime(),
      status: "active",
    };
  
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    showNotification("A new task has been added successfully!", "success");
    emptyFieldValues();
    showTodos();
  };
  
  
  
  const showTodos = () => {
    // clearOutput()
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
  
    if (todos.length === 0) {
      showOutput("<h5>HURRAY! No tasks available. Click the 'Add Task' button to add a new task.</h5>");
      return;
    }
  
    const tableStart = '<div class="table-responsive table-bordered table-striped"><table class="table">';
    const tableEnd = "</table></div>";
  
    const tableHead =
      "<thead><tr><th>#</th><th>Title</th><th>Location</th><th>Description</th><th>Action</th></tr></thead>";
  
    let tableBody = "";
  
    for (let i = 0; i < todos.length; i++) {
      const todo = todos[i];
      console.log(todo.id);
      tableBody += `
        <tr>
          <th scope="row">${i + 1}</th>
          <td>${todo.title}</td>
          <td>${todo.location}</td>
          <td>${todo.description}</td>
          <td>
            <button class="btn btn-sm btn-info" data-value="${todo.id}" onclick="editTodo(event)">Edit</button>
            <button class="btn btn-sm btn-danger ms-2" data-value="${todo.id}" onclick="deleteTodo(event)">Delete</button>
          </td>
        </tr>
      `;
    }
  
    const table = tableStart + tableHead + "<tbody>" + tableBody + "</tbody>" + tableEnd;
    showOutput(table);
  };
  
  
  
  const deleteTodo = (event) => {
    let todoId = event.target.getAttribute('data-value')
    const todos = JSON.parse(localStorage.getItem("todos"));
    
    let todosAfterDelete = todos.filter((todo) => {
      return todo.id !== todoId
    })
  
    localStorage.setItem("todos", JSON.stringify(todosAfterDelete))
    showNotification("A todo has been successfully deleted", "success");
    showTodos();
  
  }
  const editTodo = (event) => {
    let todoId = event.target.getAttribute('data-value')
    const todos = JSON.parse(localStorage.getItem("todos"));
    
    let todo = todos.find((todo) => {
      return todo.id === todoId
    })
  
    const { title, location, description} = todo
  
    setFieldValue("title",title)
    setFieldValue("location",location)
    setFieldValue("description",description)
  
    localStorage.setItem("todoForEdit", JSON.stringify(todo))
  
    document.getElementById("addTaskButton").style.display = "none"
    document.getElementById("updateTaskButton").style.display = "block"
  }
  
  const handleEdit = () => {
    event.preventDefault()
    const todoForEdit = JSON.parse(localStorage.getItem("todoForEdit"))
    
    let updatedTitle = getInputFieldValue("title")
    let updatedLocation = getInputFieldValue("location")
    let updatedDescription = getInputFieldValue("description")
  
    const updatedTodo = { ...todoForEdit, title: updatedTitle, location: updatedLocation, description: updatedDescription}
    updatedTodo.dateModified = new Date().getTime()
  
    const todos = JSON.parse(localStorage.getItem("todos"))
    const updatedTodos = todos.map(todo => {
      if (todo.id === updatedTodo.id) {
        return updatedTodo
      }
      return todo
    })
  
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
    showNotification("A todo has been successfully updated", "success");
    document.getElementById("addTaskButton").style.display = "block"
    document.getElementById("updateTaskButton").style.display = "none"
    emptyFieldValues();
    showTodos();
  }
  
  function showNotification(msg, type) {
      let color = "";
      switch (type) {
        case "success":
          color = "linear-gradient(to right, #a8e063, #56ab2f)";
          break;
        case "error":
          color = "linear-gradient(to right, #f11523, #7a0b23)";
          break;
        case "warning":
          color = "linear-gradient(to right, #fcb045, #fd1d1d, #833ab4)";
          break;
        case "info":
          color = "linear-gradient(to right, #4DA0B0, #D39D38)";
          break;
        default:
          color = "linear-gradient(to right, #00b09b, #96c93d)";
          break;
      }
      Toastify({
        text: msg,
        duration: 3000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: color,
        },
      }).showToast();
    }
    
    let now = new Date();
    document.getElementById("year").innerHTML =  now.getFullYear()
