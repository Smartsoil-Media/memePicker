import { catsData } from '/data.js'

const radioDiv = document.getElementById('emotion-radios')
const subHeadingEl = document.getElementById('sub-heading')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const getImgButton = document.getElementById('get-image-btn')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const closeBtn = document.getElementById('meme-modal-close-btn')


closeBtn.addEventListener('click', closeModel)
getImgButton.addEventListener('click', renderCat)
radioDiv.addEventListener('change', highlightCheckedOption)


function highlightCheckedOption(e){
    const radioArray = document.getElementsByClassName('radio')
   for (let radio of radioArray) {
       radio.classList.remove('highlight')
   }
   document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModel() {
    memeModal.style.display = 'none'
}

function renderCat() {
    const catObject = getSingleCatObject()
    memeModalInner.innerHTML =  
    `<img 
    class="cat-img" 
    src="./images/${catObject.image}"
    alt="${catObject.alt}"
    >`
    memeModal.style.display = 'flex'

}

function getSingleCatObject() {
    const catsArray = getMatchingCatsArray()

    if (catsArray.length === 1) {
        return catsArray[0]
    }
    else {
        let randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}

function getMatchingCatsArray() {
    if (document.querySelector('input[type="radio"]:checked')) {
        const seclectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        const matchingCatsArray = catsData.filter(function(cat){

            if (isGif) {
                return cat.emotionTags.includes(seclectedEmotion) && cat.isGif

            } 
            else {
                return cat.emotionTags.includes(seclectedEmotion)
            }

        }) 
        return matchingCatsArray
    }
    else {
        subHeadingEl.innerText = "You need to selection an emotion"
    }

}


    
function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats){
        for (let emotion of cat.emotionTags) {

            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionRadios(cats){
    const emotions = getEmotionsArray(cats)
    let radioHTML = ''
    for (let emotion of emotions) {
        radioHTML += `
        <div class="radio">
            <label for="${emotion}" >${emotion}</label>
                <input
                type="radio"
                id="${emotion}"
                value="${emotion}"
                name="emotions"
                >
        </div>`
    }
    radioDiv.innerHTML = radioHTML
}

renderEmotionRadios(catsData)





