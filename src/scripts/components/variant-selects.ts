class VariantSelects extends HTMLElement {
  private url: string = this.getAttribute('url') || '';

  private currentVariant: any = null;
  private section: string = this.getAttribute('section') || '';

  private variants = JSON.parse(this.getAttribute('variants'));

  optionsElements: HTMLSelectElement[] = Array.from(
    this.querySelectorAll('select')
  );

  constructor() {
    super()
    this.optionsElements.forEach((select) => {
      select.addEventListener('change', this.onOptionChange.bind(this))
    })
  }

  getCurrentVariant() {
    const options = this.optionsElements.map((select) => {
      return select.value
    })
    const variant = this.variants.find((variant) => {
      return variant.options.every((option) => {
        return options.includes(option)
      })
    })
    return variant
  }

  private onOptionChange(e: Event) {
    this.currentVariant = this.getCurrentVariant()

    this.toggleAddButton(true, 'Cargando', '-disabled')
    this.removeErrorMessage()

    if (!this.currentVariant.available) {
      this.updateURL()
      this.setUnavailable()
    } else {
      this.updateURL()
      this.updateVariantInput()
      this.renderProductInfo()
    }
  }

  /**
   * Change the url of the page to the current variant
   */
  updateURL() {
    if (!this.currentVariant) return
    window.history.replaceState(
      {},
      '',
      `${this.url}?variant=${this.currentVariant.id}`
    )
  }

  /**
   * Update the variant input with the current variant id
   */
  updateVariantInput() {
    const productForms = document.querySelectorAll(
      `#product-form-${this.section}, #product-form-installment`
    )
    productForms.forEach(productForm => {
      const input: HTMLInputElement = productForm.querySelector('input[name="id"]')
      input.value = this.currentVariant.id
      input.dispatchEvent(new Event('change', { bubbles: true }))
    })
  }

  removeErrorMessage() {
    const section = this.closest('section')
    if (!section) return
    const productForm: any = section.querySelector('product-form')
    if (productForm) productForm.handleErrorMessage(!this.currentVariant ? 'No disponible' : false)
  }

  /**
   *
   * @param {boolean} disable Disable the add to cart button and checkout button
   * @param {string} text Text to insert into the add to cart button
   * @param {string} modifyClass Class to add or remove
   */
  toggleAddButton(disable = true, text?: string ,modifyClass?: string) {
    const productForm = document.getElementById(`product-form-${this.section}`)
    if (!productForm) return
    const addButton = productForm.querySelector('button[name="add"]')
    if (!addButton) return

    disable ? addButton.setAttribute('disabled', 'disabled') : addButton.removeAttribute('disabled')
    if (!modifyClass) return
    disable ? addButton.classList.add(modifyClass) : addButton.classList.remove(modifyClass)

    if (text) {
      const addButtonText = addButton.querySelector('span')
      addButtonText.textContent = text
    }
  }

  setUnavailable() {
    const form = document.getElementById(
      `product-form-${this.section}`
    )
    const addButton = form.querySelector('[name="add"]')
    const addButtonText = form.querySelector('[name="add"] > span')
    const price = document.getElementById(`price-${this.dataset.section}`)
    if (!addButton) return
    addButtonText.textContent = 'Agotado'
    if (price) price.classList.add('u-hide')
  }

  renderProductInfo() {
    fetch(
      `${this.url}?variant=${this.currentVariant.id}&section_id=${this.section}`
    )
      .then((response) => response.text())
      .then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, 'text/html')
        const destination = document.querySelector(`#shopify-section-${this.section} .product_content`)
        const source = html.querySelector(`#shopify-section-${this.section} .product_content`)

        if (!destination || !source) return

        destination.querySelector('.product_price').innerHTML = source.querySelector('.product_price').innerHTML

        this.toggleAddButton(
          false,
          this.currentVariant.available ? 'Agregar al carrito' : 'Agotado',
          '-disabled'
        )
      })
  }
}

customElements.define('variant-selects', VariantSelects)
