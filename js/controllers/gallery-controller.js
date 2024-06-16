let gMouseDown = false;

function getTagsHTML() {
  let tagsHTML = "";
  const sortedTags = Object.entries(gAllTags)
    .sort((a, b) => b[1] - a[1])
    .map((tag) => tag[0]);

  const slicedTags = gIsTagsExpanded ? sortedTags : sortedTags.slice(0, 4);

  slicedTags.forEach((tag) => {
    tagsHTML += `<span style="font-size: ${
      gBaseFontSize + (gTagClickCount[tag] ?? 0)
    }" class="tag ${tag}" onclick="setFilter('${tag}')">${tag}</span>`;
  });

  if (!gIsTagsExpanded) {
    tagsHTML += `<span class="tag" onclick="toggleTags()">more...</span>`;
  }

  return tagsHTML;
}

function renderGallery() {
  let images = getImages();
  console.log("images", images);
  const elGalContainer = document.querySelector(".gallery-container");
  const filteredImages = gFilterBy.tag
    ? images.filter((image) => {
        return image.tags.some((t) => t.includes(gFilterBy.tag));
      })
    : images;

  let imagesHTMLs = "";
  filteredImages.forEach((image, idx) => {
    const { id, url } = image;
    imagesHTMLs += `<img data-id="${id}" src="${url}" onclick="onImageClicked(${id})" alt="${
      idx + 1
    }"/>`;
  });

  elGalContainer.innerHTML = imagesHTMLs;

  document.querySelector(".tags-container").innerHTML = getTagsHTML();

  openGallery();
}

function onImageClicked(imageId) {
  imageClicked(imageId);
}

function openGallery() {
  const editor = document.getElementById("editor-section");
  const memes = document.getElementById("memes-section");
  editor.classList.add("hide");
  memes.classList.add("hide");
  const gallery = document.getElementById("gallery-section");
  gallery.classList.remove("hide");
}

function onInitGallery() {
  openGallery();
  renderGallery();
}

function setFilter(value) {
  saveTag(value.toLowerCase());
  renderGallery();
}

function toggleTags() {
  gIsTagsExpanded = !gIsTagsExpanded;
  renderGallery();
}

document.getElementById("search-bar").oninput = function (event) {
  const value = event.target.value;
  gFilterBy.tag = value;
  renderGallery();
};
