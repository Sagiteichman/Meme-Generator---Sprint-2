'use strict'

let gCanvas = document.querySelector('canvas')
let gCtx = gCanvas.getContext('2d')

let imageUrl = 'imgs/meme-imgs (square)/1.jpg'
let text = 'Your Meme Text'

const inputText = document.querySelector('input[name="text-input-editor"]')
inputText.addEventListener('input', (event) => {
  text = event.target.value
  renderMeme(gCtx, imageUrl, text)
})

const uploadButton = document.querySelector('.gallery-nav-list button')
uploadButton.addEventListener('click', () => {
  const fileInput = document.createElement('input')
  fileInput.type = 'file'
  fileInput.accept = 'image/*'
  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0]
    if (file) {
      imageUrl = URL.createObjectURL(file)
      renderMeme(ctx, imageUrl, text)
    }
  })
  fileInput.click()
})


renderMeme(gCtx, imageUrl, text)

function renderMeme() {
  const image = new Image()
  image.src = imageUrl

  image.onload = () => {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
  }

  gCtx.drawImage(image, 0, 0, gCanvas.width, gCanvas.height)

  gCtx.font = '1em Arial'
  gCtx.fillStyle = 'white'
  gCtx.strokeStyle = 'black'
  gCtx.lineWidth = '2'
  gCtx.textAlign = 'center'

  const x = gCanvas.width / 2
  const y = 50

  gCtx.fillText(text, x, y)
  gCtx.strokeText(text, x, y)

}

function drawImgFromRemote(image) {
  const img = new Image()
  img.src = image.url
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
  }
} 