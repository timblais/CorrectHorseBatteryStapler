document.querySelector('.gen').addEventListener('click', generate)

document.querySelectorAll('.checkbox').forEach(element => element.addEventListener('click', checkOff)) //note that on refresh the checkbox isn't resetting, so will need to address this in the future

function checkOff(e){
    if(e.currentTarget.value == 'unchecked'){
        e.currentTarget.value = 'checked'
    }else if(e.currentTarget.value == 'checked'){
        e.currentTarget.value = 'unchecked'
    }
}

async function generate(){

let capital = false
let numbers = false
let symbols = false
let words = 4

if (document.querySelector('#cap').value == "checked"){
    capital = true
}
if (document.querySelector('#addNum').value == "checked"){
    numbers = true
}
if (document.querySelector('#addSym').value == "checked"){
    symbols = true
}
if (document.querySelector('#maxWords').value != ''){
    words = Number(document.querySelector('#maxWords').value)
}

let wordArray = []

async function getWords(){
    for (let i = 1; i <= words; i++){
        let length 
        let rando = Math.floor(Math.random()*40)
            if(rando < 10){
                length = 4
            }else if(rando >=10 && rando <20){
                length = 5
            }else if(rando >=20 && rando <30){
                length = 6
            }else if(rando >=30 && rando <40){
                length = 7
            }
    
        await fetch(`https://random-word-api.herokuapp.com/word?number=1&swear=0&length=${length}`)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(data)
            wordArray.push(data[0])
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
    }
}

await getWords()

let finalArray = []

if(numbers == true || symbols == true){
    for (let i = 1; i <= words; i++){
        let randNum = Math.floor(Math.random()* 10)
        let randSym
        let randGen = Math.floor(Math.random()* 8)
        if(randGen == 0){
            randSym = "!"
        }else if(randGen == 1){
            randSym = "@"
        }else if(randGen == 2){
            randSym = "#"
        }else if(randGen == 3){
            randSym = "$"
        }else if(randGen == 4){
            randSym = "%"
        }else if(randGen == 5){
            randSym = "^"
        }else if(randGen == 6){
            randSym = "&"
        }else if(randGen == 7){
            randSym = "*"
        }
    
        if(numbers == true && symbols == true){
            if(i % 2 == 0){
                wordArray.splice(i,0,randNum)
                finalArray.push(wordArray.shift())
            }else if (i % 2 != 0){
                wordArray.splice(i,0,randSym)
                finalArray.push(wordArray.shift())
            }
        }else if(numbers == true){
            wordArray.splice(i,0,randNum)
            finalArray.push(wordArray.shift())
        }else if(symbols == true){
            wordArray.splice(i,0,randSym)
            finalArray.push(wordArray.shift())
        }
    }
}

let finalString = finalArray.concat(wordArray).join('')

if (capital == true){
    finalString[0].toUpperCase()
}

document.querySelector('.result').innerText = finalString


console.log(wordArray)
console.log(words)
console.log(finalArray)
console.log(finalString)










}