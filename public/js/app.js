console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
weatherForm.addEventListener('submit', (res) => {
    res.preventDefault()
    const val = search.value
    // console.log(val);
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""


    fetch(`/weather?city=${val}`)
        .then(res => {
            res.json()
                .then(data => {
                    if (data.error) {
                        // return console.log("error : ", data.error);
                        messageOne.textContent = data.error
                        // messageTwo.textContent = "2"
                    } else {
                        // return console.log("Location : " + data.location + "\nPrecipitation Probability : " + data.precipProbability + "%");
                        messageOne.textContent = data.location
                        messageTwo.textContent = data.precipProbability
                    }
                })
                .catch(e => console.log(e))
        })
        .catch(e => console.log(e))

})