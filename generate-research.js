const fs = require('fs')
const copy = require('ncp')
const marked = require('marked')

const paperFolder = './papers'
const researchFolder = './research'

function filterContent(files) {
  return files.filter((file) => {
    return file.indexOf('.md') !== -1
  })
}

function style() {
  return `
:root {
  font-size: 2vh;
}
* {
  box-sizing: border-box;
}
body {
  font-family: monospace;
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-size: 1.2rem;
}
img {
  max-width: 100%;
}
p {
  overflow: hidden;
  text-overflow: ellipsis;
}
.images {
  display: flex;
  justify-content: center;
}
.images figure {
  display: flex;
  flex-direction: column;
  transition: all 0.25s;
  margin: 0;
}
.images figure img {
  padding: 0.5rem;
}
.images figure figcaption {
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  font-style: italic;
  color: #999;
  padding: 0.5rem 0;
}
  `
}

function adjustImagesSize() {
  return `
<script>
window.onload = function() {
  let imageRows = document.querySelectorAll('.images')
  for (let row of imageRows) {
    let images = row.querySelectorAll('img')
    let sum = 0
    let widths = []
    for (let image of images) {
      let width = image.naturalWidth
      let height = image.naturalHeight
      let normalizedWidth = width / height
      widths.push(normalizedWidth)
      sum += normalizedWidth
    }
    let proportions = widths.map(function(normalizedWidth) {
      return normalizedWidth / sum
    })
    let figures = row.querySelectorAll('figure')
    for (let i = 0; i < figures.length; i++) {
      let figure = figures[i]
      figure.style.width = proportions[i]*100 + "%"
    }
  }
}
</script>
`
}

function template(html) {
  return `
    <!DOCTYPE html>
    <html lang="pt" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>Research / Pesquisa</title>
        <style>${style()}</style>
      </head>
      <body>
        <p><a href="./index.html"><</a></p>
        ${html}
        ${adjustImagesSize()}
      </body>
      </html>
    `
}

const renderer = {
  paragraph (text) {
    if (text.indexOf('<img') !== -1) {
      return `<div class="images">${text}</div>`
    } else {
      return `<p>${text}</a>`
    }
  },
  image (href, title, text) {
    return `
    <figure>
      <img src="${href}" alt="${text}" />
      <figcaption>${text}</figcaption>
    </figure>
    `
  },
};

marked.use({ renderer })

let files = fs.readdirSync(paperFolder)
files = filterContent(files)

let contents = files.map((file) => {
  return fs.readFileSync(`${paperFolder}/${file}`).toString()
})

files.forEach((file, i) => {
  let fileName = file.split('.')[0].toLowerCase()
  let html = template(marked(contents[i]))
  fs.writeFileSync(`${researchFolder}/${fileName}.html`, html)
})

copy('./papers/media', './research/media')
