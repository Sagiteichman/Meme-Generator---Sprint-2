function renderGallery() {
  let images = getImages();
  let imagesHTMLs = "";
  const elGalContainer = document.querySelector(".gallery-container");

  images.forEach((image, idx) => {
    const { id, url } = image;
    imagesHTMLs += `<img data-id="${id}" src="${url}" onclick="onImageClicked('${id}')" alt="${
      idx + 1
    }"/>`;
  });

  elGalContainer.innerHTML = imagesHTMLs;
  openGallery();
}

function onImageClicked(imageId) {
  imageClicked(imageId);
}

function openGallery() {
  const editor = document.getElementById("editor-section");
  editor.style.display = "none";
  const gallery = document.getElementById("gallery-section");
  gallery.style.display = "grid";
}
