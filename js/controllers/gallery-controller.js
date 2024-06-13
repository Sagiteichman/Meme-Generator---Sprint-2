function onInitGallery() {
  renderGallery()
}

function renderGallery() {
  let images = getImages()
  let imagesHTMLs = ''
  const elGalContainer = document.querySelector('.gallery-container')

  images.forEach((image, idx) => {
    const { id, url } = image
    imagesHTMLs += `<img data-id="${id}" src="${url}" onclick="onImageClicked('${id}')" alt="${idx + 1}"/>`
  })

  elGalContainer.innerHTML = imagesHTMLs
}

function onImageClicked(imageId) {
  imageClicked(imageId)
}