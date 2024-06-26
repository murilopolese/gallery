const fs = require('fs')
const RSS = require('rss')

const config = {
  title: 'Murilo Polese - Gallery',
  description: "In Recreating the Past, I studied computational art from the past decades and recreated these works with contemporary techniques to gain aesthetic, analytical and technical knowledge. Since then I continue learning from the past, present and future. (Never graduate!)",
  feed_url: 'http://gallery.bananabanana.me/rss.xml',
  site_url: 'http://gallery.bananabanana.me',
  language: 'en',
  categories: ['Poetic','Computation','Art'],
  ttl: '60'
}
const feed = new RSS(config)

let db = require('./db.js')

db.forEach((item) => {
  feed.item({
    title:  item.title,
    description: `
      <h1>${item.title}</h1>
      <img width="100%" alt="${item.title}" src="http://gallery.bananabanana.me/${item.display}/thumbnail.png" />
      <p><a href="http://gallery.bananabanana.me/${item.research}">Research</a></p>
    `,
    url: `http://gallery.bananabanana.me/${item.display}/dist/index.html`, // link to the item
    guid: item.title, // optional - defaults to url
    categories: config.categories, // optional - array of item categories
    author: 'Murilo', // optional - defaults to feed author property
    date: item.date, // any format that js Date can parse.
  })
})

fs.writeFileSync('rss.xml', feed.xml())
