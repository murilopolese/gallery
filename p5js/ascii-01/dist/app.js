// FRAMEWORK
function h (tag, attrs, ...children) {
	const el = document.createElement(tag)
	if (typeof attrs === 'object') {
		for (let k in attrs) {
			if (typeof attrs[k] === 'function') el.addEventListener(k, attrs[k])
			else el.setAttribute(k, attrs[k])
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

let state = {
  columns: 80,
  rows: 80,
  grid: [ [ null ] ],
  current: 0,
  renderings: [
    (x, y) => ( x + y ),
    (x, y) => (Math.hypot(x, y)),
    (x, y) => (Math.hypot( x-(state.rows/2), y-(state.columns/2) )),
    (x, y) => (2*Math.hypot( x-(state.rows/2), y-(state.columns/2) )),
    (x, y) => ((2+Math.sin((x+y)/Math.PI))*Math.hypot( x-(state.rows/2), y-(state.columns/2) ))
  ]
}

function updateGrid(state) {
  for (let y = 0; y < state.rows; y++) {
    state.grid[y] = []
    for (let x = 0; x < state.columns; x++) {
      state.grid[y][x] = String.fromCharCode(
        parseInt(state.renderings[state.current](x, y))
      )
    }
  }
}

window.onload = main

function main() {
  updateGrid(state)
  render('body', Layout(state))
}

function Row(row) {
  return h('div', { class: 'row' },
    ...row.map(Cell)
  )
}

function Cell(cell) {
  return h('div', {
    class: 'cell',
    click: () => {
      console.log('click')
      state.current += 1
      state.current %= state.renderings.length
      updateGrid(state)
      render('body', Layout(state))
    }
  }, cell)
}

function Layout(state) {
  return h('div', { id: 'display' },
    ...state.grid.map(Row)
  )
}
