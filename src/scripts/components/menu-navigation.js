class MenuNavigation extends HTMLElement {
  constructor() {
    super()
    this.navigation = this.querySelector('.menu')
    this.closeBtn = this.querySelector('button')
    this.closeBtn &&
      this.closeBtn.addEventListener('click', this.close.bind(this))
  }

  open() {
    console.log('open')
    this.navigation.classList.toggle('-open')
    document.documentElement.style.overflow = 'hidden'
    document.body.appendChild(this.createOverlay())
  }

  close() {
    this.navigation.classList.toggle('-open')
    document.documentElement.style.overflow = 'visible'
    this.removeOverlay()
  }

  createOverlay() {
    const overlay = document.createElement('div')
    overlay.classList.add('overlay')
    overlay.addEventListener('click', this.close.bind(this))
    return overlay
  }

  removeOverlay() {
    const overlay = document.querySelector('.overlay')
    overlay && overlay.remove()
  }
}

customElements.define('menu-navigation', MenuNavigation)

class MenuOpen extends HTMLElement {
  constructor() {
    super()
    this.openBtn = this.querySelector('button')
    this.openBtn && this.openBtn.addEventListener('click', this.open.bind(this))
  }

  open() {
    document.querySelector('menu-navigation').open()
  }
}

customElements.define('menu-open', MenuOpen)
