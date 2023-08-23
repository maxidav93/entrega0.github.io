const signupform = document.querySelector('#signupForm')
signupForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const name = document.querySelector("#name").value
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value

    const users = JSON.parse(localStorage.getItem("users")) || []
    const estaRegistrado = users.find(users => users.email === email)
    if(estaRegistrado){
    return alert("El usuario ya está registrado")
    }
    users.push({ name: name, email: email, password: password})
    localStorage.setItem("users", JSON.stringify(users))
    alert("registro exitoso")
    window.location.href = "login.html"

})