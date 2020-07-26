window.onload = function () {

    let usersList = document.getElementById('users-list')
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(result => {
            return result.json()
        })
        .then(json => {
            json.forEach(user => {
                usersList += `<li>${user.email}</li>`
            })
        })
}