console.log ("client side javascript file is loaded")
const weatherForm = document.querySelector('form')
const search = document.querySelector ('input')
const messg1 = document.querySelector ('#messg1')
const messg2 = document.querySelector ('#messg2')




weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location =search.value

fetch('/weather?address=' + location ).then((response) => {
    response.json().then ((data) =>{
    if (data.error) {
        console.log(data.error)
        messg1.textContent = (data.error)
        messg2.textContent = ''
    } else {
        console.log(data.location)
        console.log(data.forecastdata)
        messg1.textContent = (data.location)
        messg2.textContent = (data.forecastdata)
    }
    })
})

})


  

