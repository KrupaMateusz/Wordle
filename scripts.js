const wordsTab=[
    'world',
    'hello',
    'react',
    'swamp',
    'mouth',
    'phone',
    'swing',
    'cramp',
    'bones',
    'screw',
    'sword',
    'flame',
    'death',
    'mouse'
]



let currentRow = 1
let currentCol = 0
let classCode = "row"+currentRow+"col"+currentCol
let box = document.querySelector(`.${classCode}`)
let letterObj = {}
let userWord = []

const deleteLetter = function(){
    if(box){
        box.innerHTML = ""
        userWord.pop()
        if(currentCol>0){
            currentCol--
            classCode = "row"+currentRow+"col"+currentCol
            box = document.querySelector(`.${classCode}`)
        }

    }
}

const inputLetter = function(letter){
    currentCol++
    classCode = "row"+currentRow+"col"+currentCol
    box = document.querySelector(`.${classCode}`)
    box.innerHTML = letter.toUpperCase()
    letterObj = {char: letter, currBox: classCode}
    userWord.push(letterObj)
}

const validation = function(){
    for(let i=0; i<5; i++){
        userWord.forEach(({char, currBox})=>{
            let columnNumb = parseInt(currBox[7])
            console.log(columnNumb)
            if(char===word[i] && i+1===columnNumb){
                let chosenBox = document.querySelector(`.${currBox}`)
                chosenBox.classList.toggle("correctLetter")
                chosenBox.classList.toggle("scaleUp")
                setTimeout(()=>{chosenBox.classList.toggle("scaleUp"),chosenBox.classList.toggle("scaleDown")}, 500);
            }else if(char===word[i] && i+1!==columnNumb){
                let chosenBox = document.querySelector(`.${currBox}`)
                chosenBox.classList.toggle("correctLetterWrongPlace")
                chosenBox.classList.toggle("scaleUp")
                setTimeout(()=>{chosenBox.classList.toggle("scaleUp"),chosenBox.classList.toggle("scaleDown")}, 500);
            }
        })
    }
}


const funcRand = ()=>{ 
    return wordsTab[Math.floor(Math.random()*14)]
}
const word = funcRand()
console.log(word)

document.addEventListener('keydown', (event) => {
    let name = event.key
    let code  = event.code
    if(code==="Backspace"){
        deleteLetter()
    }else{
        inputLetter(name)
    }
    console.log(userWord)
    if(currentCol===5){
        validation()
    }
    
    })