// HTML FRAMEWORK
function isPlainObject(value) {
	if (Object.prototype.toString.call(value) !== '[object Object]') {
		return false;
	}
	const prototype = Object.getPrototypeOf(value);
	return prototype === null || prototype === Object.prototype;
}
function h (tag, attrs, ...children) {
	const el = document.createElement(tag)
	if (isPlainObject(attrs)) {
		for (let k in attrs) {
			if (typeof attrs[k] === 'function') {
        // Event listener
        el.addEventListener(k, attrs[k])
      } else if (typeof attrs[k] === 'object') {
        // Object attribute
        for (let key in attrs[k]) {
          el[k][key] = attrs[k][key]
        }
      } else {
        // Attribute
        el.setAttribute(k, attrs[k])
      }
		}
	} else if (attrs) {
		children = [attrs].concat(children)
	}
	for (let child of children) el.append(child)
	return el
}
function render(query, el) {
	let target = document.querySelector(query)
	target.innerHTML = ''
	if (el instanceof Array) {
		for (e in el) {
			target.appendChild(el[e])
		}
	} else {
		target.appendChild(el)
	}
}

// Entry component
function entryEl(state, emit) {
	let thumbnail = `${state.display}/thumbnail.png`
	let display = `${state.display}/dist/index.html`
	return h('div', { class: 'item' },
		h('div', {
				'mouseover': onMouseOver,
				'mouseout': onMouseOut,
				'class': 'display',
				'data-url': display,
				'style': {
          backgroundSize: 'cover',
          backgroundImage: `url('${thumbnail}')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center'
        }
			}
		),

		h('p', { class: 'info' },
			h('a', { href: state.research, target: '_blank' }, 'research'),
			' ',
			h('a', { href: display, target: '_blank' }, 'full screen')
		)
	)
}
function onMouseOver(e) {
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    // Make sure to clean iframes (on mobile only) before adding a new one
    let items = document.querySelectorAll('.display')
    for (let i = 0; i < items.length; i++) {
      items[i].innerHTML = ''
    }
  }
  let target = e.target
  if (target.classList.contains('display')) {
    target.innerHTML = ''
    let url = `${target.dataset['url']}`
    let el = h('iframe', {
      src: url,
      style: { opacity: 0 },
      load: () => el.style.opacity = 1
    })
    target.appendChild(el)
  }
  return false
}
function onMouseOut(e) {
  let target = e.target
  if (target.tagName.toLowerCase() === 'iframe') {
    target.remove()
  }
  return false
}

window.onload = function() {
  let feedEl = h('div', { class: 'feedEl' })
  let entries = window.db.reverse()
  entries = entries.map((entry) => {
    return entryEl(entry)
  })
  render('.feed', entries)
}
