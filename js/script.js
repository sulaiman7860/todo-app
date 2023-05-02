const output = (outputId, output) => {
    document.getElementById(outputId).innerHTML = output
}

function inputValue(fieldId) {
    return document.getElementById(fieldId).value;
}

const askUserName = () => {
    let userName = prompt("Please Enter Your Name")
    if (!userName) {
        output("userName", "Hi, User!")
    } else {
        output("userName", `Hi, <b>${userName}</b>!`)

    }
}

window.onload = () => {
    askUserName()
    output("time", dayjs().format('dddd, MMMM D, YYYY h:mm A'))

    output("year", dayjs().year())
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
}

const randomId = () => {
    return Math.random().toString(36).slice(2)
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
