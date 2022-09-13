const wordsTab=[
    'world',
    'mices',
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
    'mouse',
    'sweat',
    'swole'
]


const funcRand = ()=>{return wordsTab[Math.floor(Math.random()*16)]}
const word = funcRand()

const closeModalButtons = document.querySelectorAll("[data-close-button]")
const overlay = document.querySelector("#overlay")


function openModal(modal){
    if (modal==null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal){
    console.log(modal)
    if (modal==null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
    window.location.reload()
}

closeModalButtons.forEach(button=>{
    button.addEventListener("click", ()=>{
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

let trueTab = [false, false, false, false, false]

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

const winChecker = function(trueOrFalseTab){
    for(let n=0; n<trueOrFalseTab.length; n++){
        if(trueOrFalseTab[n]===false) return false
    }
    return true
}

const validation = function(){
    for(let i=0; i<5; i++){
    userWord.forEach(({char, currBox})=>{
        let columnNumb = parseInt(currBox[7])
        console.log(columnNumb)
        if(char===word[i] && i+1===columnNumb){
            let chosenBox = document.querySelector(`.${currBox}`)
            trueTab[i]=true
            chosenBox.style.backgroundColor="#2EB114" 
            chosenBox.classList.toggle("scaleUp")
            setTimeout(()=>{chosenBox.classList.toggle("scaleUp"),chosenBox.classList.toggle("scaleDown")}, 250);
        }else if(char===word[i] && i+1!==columnNumb){
            let chosenBox = document.querySelector(`.${currBox}`)
            chosenBox.style.backgroundColor="#B8A929"
            chosenBox.classList.toggle("scaleUp")
            setTimeout(()=>{chosenBox.classList.toggle("scaleUp"),chosenBox.classList.toggle("scaleDown")}, 250);
        }else{
            let chosenBox = document.querySelector(`.${currBox}`)
            chosenBox.classList.toggle("scaleUp")
            setTimeout(()=>{chosenBox.classList.toggle("scaleUp"),chosenBox.classList.toggle("scaleDown")}, 250);
        }
    })
}
if(winChecker(trueTab)){
    const modal = document.querySelector("#modal-win")
    openModal(modal)
}else if(currentRow<6){
    currentCol=0
    currentRow++
}else{
    const paragraf = document.querySelector(".correct-word")
    paragraf.innerHTML=`The correct word was ${word}`
    const modal = document.querySelector("#modal-lose")
    openModal(modal)
}
}


document.addEventListener('keydown', (event) => {
    let name = event.key
    let code  = event.code
    if(code==="Backspace"){
        deleteLetter()
    }else if(name.length>1){
        return 
    }else{
        inputLetter(name)
    }
    console.log(userWord)
    if(currentCol===5){
        validation()
    }
    
    })