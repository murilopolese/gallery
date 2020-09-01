const marked = require('marked')
const fs = require('fs')

let mdFileName = process.argv[2]
let htmlFileName = process.argv[3]

if (!mdFileName || !htmlFileName) {
  console.log('Usage: node convert.js source_file.md output_file.html')
  return
}

async function getHtml(mdFile) {
  const renderer = {
    image(href, title, text) {
      if (text.indexOf('http') === 0) {
        return `
          <a href="${text}" target="_blank"><img src="${href}" alt="${text}" /></a>
        `
      } else {
        return `
          <img src="${href}" alt="${text}" />
        `
      }
    },
    link (href, title, text) {
      if (
        href.indexOf('youtube.com') !== -1
        || href.indexOf('youtube-nocookie.com') !== -1
      ) {
        return `<span class="embed"><iframe width="960" height="540" src="${href}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></span>`
      }
      if (href.indexOf('http') !== -1) {
        return `
          <a href="${href}" alt="${title}" target="_blank">${text}</a>
        `
      }
      return `
        <a href="${href}" alt="${title}">${text}</a>
      `
    }
  };

  marked.use({ renderer })

  let mdContents = fs.readFileSync(mdFile, 'utf-8')
  return marked(mdContents)
}
async function main() {
  let htmlContent = await getHtml(mdFileName)
  let tracking = ''
  if (process.env.NODE_ENV === 'production') {
    tracking = '<script async defer data-website-id="1c614f8d-3e4a-474f-ac31-bddb4b7780ae" src="http://umami.bananabanana.me/umami.js"></script>'
  }
  let template = `
  <!DOCTYPE html>
  <html lang="pt" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>Research / Pesquisa</title>
      <style>
        * { box-sizing: border-box; }
        body {
          margin: 0;
          padding: 2em;
          max-width: 760px;
          margin: 0 auto;
          line-height: 1.15em;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          background: #fff;
          color: #222;
          font-family: 'Inconsolata', monospace;
          padding-bottom: 20vh;
        }
        img {
          max-width: 100%;
          max-height: 350px;
        }
        p {
          margin: 0.5em 0;
        }
        row {
          max-width: 100%;
          overflow: hidden;
        }
        row p {
          display: flex;
          justify-content: space-around;
          margin: 0;
          padding: 0.5em 0;
        }
        row p a {
          display: inline-flex;
          padding: 1em;
        }
        row p .embed {
          display: inline-flex;
          margin: 1em;
          height: 250px;
        }
        iframe {
          max-width: 100% !important;
          max-height: 100% !important;
        }
        a:link {
          text-decoration: none;
          color: blue;
        }
        a:visited {
          color: navy;
        }
        .menu {
          list-style: none;
          padding: 0;
          margin: 0;
          width: 100%;
          display: flex;
          flex-diretion: row;
          justify-content: space-between;
        }
      </style>
      ${tracking}
    </head>
    <body>
      <ul class="menu">
        <li><a href="./index.html"><</a><span class="left"></li>
        <li><a href="http://gallery.bananabanana.me" target="_blank">gallery</a></li>
      </ul>
      ${htmlContent}
    </body>
    </html>
  `
  fs.writeFileSync(htmlFileName, template)
}

main()
