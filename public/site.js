
console.log('is it working?')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne  = document.querySelector('#firstMessage')
const messageTwo = document.querySelector('#secondMessage')

messageOne.textContent = search.value

weatherForm.addEventListener('submit',(event)=>{ // event object
    event.preventDefault() // to make the form not refresh always

    const location = search.value

    messageOne.textContent = 'loading...'
    messageTwo.textContent=''

    // console.log(location)
    // console.log('testing')

    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location)).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
            console.log(data.error)
           
        }
        else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
        console.log(data.location)
        console.log(data.forecast)
        }
    })
})

})