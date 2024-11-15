/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!***************************************************!*\
  !*** ./src/scripts/components/variant-selects.ts ***!
  \***************************************************/
class VariantSelects extends HTMLElement {
    constructor() {
        super();
        this.url = this.getAttribute('url') || '';
        this.currentVariant = null;
        this.section = this.getAttribute('section') || '';
        this.variants = JSON.parse(this.getAttribute('variants'));
        this.optionsElements = Array.from(this.querySelectorAll('select'));
        this.optionsElements.forEach((select) => {
            select.addEventListener('change', this.onOptionChange.bind(this));
        });
    }
    getCurrentVariant() {
        const options = this.optionsElements.map((select) => {
            return select.value;
        });
        const variant = this.variants.find((variant) => {
            return variant.options.every((option) => {
                return options.includes(option);
            });
        });
        return variant;
    }
    onOptionChange(e) {
        this.currentVariant = this.getCurrentVariant();
        this.toggleAddButton(true, 'Cargando', '-disabled');
        this.removeErrorMessage();
        if (!this.currentVariant.available) {
            this.updateURL();
            this.setUnavailable();
        }
        else {
            this.updateURL();
            this.updateVariantInput();
            this.renderProductInfo();
        }
    }
    /**
     * Change the url of the page to the current variant
     */
    updateURL() {
        if (!this.currentVariant)
            return;
        window.history.replaceState({}, '', `${this.url}?variant=${this.currentVariant.id}`);
    }
    /**
     * Update the variant input with the current variant id
     */
    updateVariantInput() {
        const productForms = document.querySelectorAll(`#product-form-${this.section}, #product-form-installment`);
        productForms.forEach(productForm => {
            const input = productForm.querySelector('input[name="id"]');
            input.value = this.currentVariant.id;
            input.dispatchEvent(new Event('change', { bubbles: true }));
        });
    }
    removeErrorMessage() {
        const section = this.closest('section');
        if (!section)
            return;
        const productForm = section.querySelector('product-form');
        if (productForm)
            productForm.handleErrorMessage(!this.currentVariant ? 'No disponible' : false);
    }
    /**
     *
     * @param {boolean} disable Disable the add to cart button and checkout button
     * @param {string} text Text to insert into the add to cart button
     * @param {string} modifyClass Class to add or remove
     */
    toggleAddButton(disable = true, text, modifyClass) {
        const productForm = document.getElementById(`product-form-${this.section}`);
        if (!productForm)
            return;
        const addButton = productForm.querySelector('button[name="add"]');
        if (!addButton)
            return;
        disable ? addButton.setAttribute('disabled', 'disabled') : addButton.removeAttribute('disabled');
        if (!modifyClass)
            return;
        disable ? addButton.classList.add(modifyClass) : addButton.classList.remove(modifyClass);
        if (text) {
            const addButtonText = addButton.querySelector('span');
            addButtonText.textContent = text;
        }
    }
    setUnavailable() {
        const form = document.getElementById(`product-form-${this.section}`);
        const addButton = form.querySelector('[name="add"]');
        const addButtonText = form.querySelector('[name="add"] > span');
        const price = document.getElementById(`price-${this.dataset.section}`);
        if (!addButton)
            return;
        addButtonText.textContent = 'Agotado';
        if (price)
            price.classList.add('u-hide');
    }
    renderProductInfo() {
        fetch(`${this.url}?variant=${this.currentVariant.id}&section_id=${this.section}`)
            .then((response) => response.text())
            .then((responseText) => {
            const html = new DOMParser().parseFromString(responseText, 'text/html');
            const destination = document.querySelector(`#shopify-section-${this.section} .product_content`);
            const source = html.querySelector(`#shopify-section-${this.section} .product_content`);
            if (!destination || !source)
                return;
            destination.querySelector('.product_price').innerHTML = source.querySelector('.product_price').innerHTML;
            this.toggleAddButton(false, this.currentVariant.available ? 'Agregar al carrito' : 'Agotado', '-disabled');
        });
    }
}
customElements.define('variant-selects', VariantSelects);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LXZhcmlhbnQtc2VsZWN0cy1zY3JpcHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFNBQVMsU0FBUyxXQUFXLHVCQUF1QjtBQUMxRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0VBQXdFLGFBQWE7QUFDckY7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELGVBQWU7QUFDckUsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVM7QUFDeEIsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0Esb0VBQW9FLGFBQWE7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELGFBQWE7QUFDMUU7QUFDQTtBQUNBLHVEQUF1RCxxQkFBcUI7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUyxXQUFXLHVCQUF1QixjQUFjLGFBQWE7QUFDdkY7QUFDQTtBQUNBO0FBQ0EsMkVBQTJFLGNBQWM7QUFDekYsa0VBQWtFLGNBQWM7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2hvcGlmeS1jb3JlLy4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy92YXJpYW50LXNlbGVjdHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgVmFyaWFudFNlbGVjdHMgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudXJsID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3VybCcpIHx8ICcnO1xuICAgICAgICB0aGlzLmN1cnJlbnRWYXJpYW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5zZWN0aW9uID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3NlY3Rpb24nKSB8fCAnJztcbiAgICAgICAgdGhpcy52YXJpYW50cyA9IEpTT04ucGFyc2UodGhpcy5nZXRBdHRyaWJ1dGUoJ3ZhcmlhbnRzJykpO1xuICAgICAgICB0aGlzLm9wdGlvbnNFbGVtZW50cyA9IEFycmF5LmZyb20odGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdzZWxlY3QnKSk7XG4gICAgICAgIHRoaXMub3B0aW9uc0VsZW1lbnRzLmZvckVhY2goKHNlbGVjdCkgPT4ge1xuICAgICAgICAgICAgc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMub25PcHRpb25DaGFuZ2UuYmluZCh0aGlzKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRDdXJyZW50VmFyaWFudCgpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9uc0VsZW1lbnRzLm1hcCgoc2VsZWN0KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0LnZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgdmFyaWFudCA9IHRoaXMudmFyaWFudHMuZmluZCgodmFyaWFudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHZhcmlhbnQub3B0aW9ucy5ldmVyeSgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMuaW5jbHVkZXMob3B0aW9uKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHZhcmlhbnQ7XG4gICAgfVxuICAgIG9uT3B0aW9uQ2hhbmdlKGUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VmFyaWFudCA9IHRoaXMuZ2V0Q3VycmVudFZhcmlhbnQoKTtcbiAgICAgICAgdGhpcy50b2dnbGVBZGRCdXR0b24odHJ1ZSwgJ0NhcmdhbmRvJywgJy1kaXNhYmxlZCcpO1xuICAgICAgICB0aGlzLnJlbW92ZUVycm9yTWVzc2FnZSgpO1xuICAgICAgICBpZiAoIXRoaXMuY3VycmVudFZhcmlhbnQuYXZhaWxhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVVSTCgpO1xuICAgICAgICAgICAgdGhpcy5zZXRVbmF2YWlsYWJsZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVVUkwoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmFyaWFudElucHV0KCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclByb2R1Y3RJbmZvKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hhbmdlIHRoZSB1cmwgb2YgdGhlIHBhZ2UgdG8gdGhlIGN1cnJlbnQgdmFyaWFudFxuICAgICAqL1xuICAgIHVwZGF0ZVVSTCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmN1cnJlbnRWYXJpYW50KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sICcnLCBgJHt0aGlzLnVybH0/dmFyaWFudD0ke3RoaXMuY3VycmVudFZhcmlhbnQuaWR9YCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgdmFyaWFudCBpbnB1dCB3aXRoIHRoZSBjdXJyZW50IHZhcmlhbnQgaWRcbiAgICAgKi9cbiAgICB1cGRhdGVWYXJpYW50SW5wdXQoKSB7XG4gICAgICAgIGNvbnN0IHByb2R1Y3RGb3JtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCNwcm9kdWN0LWZvcm0tJHt0aGlzLnNlY3Rpb259LCAjcHJvZHVjdC1mb3JtLWluc3RhbGxtZW50YCk7XG4gICAgICAgIHByb2R1Y3RGb3Jtcy5mb3JFYWNoKHByb2R1Y3RGb3JtID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gcHJvZHVjdEZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cImlkXCJdJyk7XG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHRoaXMuY3VycmVudFZhcmlhbnQuaWQ7XG4gICAgICAgICAgICBpbnB1dC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJywgeyBidWJibGVzOiB0cnVlIH0pKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlbW92ZUVycm9yTWVzc2FnZSgpIHtcbiAgICAgICAgY29uc3Qgc2VjdGlvbiA9IHRoaXMuY2xvc2VzdCgnc2VjdGlvbicpO1xuICAgICAgICBpZiAoIXNlY3Rpb24pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHByb2R1Y3RGb3JtID0gc2VjdGlvbi5xdWVyeVNlbGVjdG9yKCdwcm9kdWN0LWZvcm0nKTtcbiAgICAgICAgaWYgKHByb2R1Y3RGb3JtKVxuICAgICAgICAgICAgcHJvZHVjdEZvcm0uaGFuZGxlRXJyb3JNZXNzYWdlKCF0aGlzLmN1cnJlbnRWYXJpYW50ID8gJ05vIGRpc3BvbmlibGUnIDogZmFsc2UpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZSBEaXNhYmxlIHRoZSBhZGQgdG8gY2FydCBidXR0b24gYW5kIGNoZWNrb3V0IGJ1dHRvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IFRleHQgdG8gaW5zZXJ0IGludG8gdGhlIGFkZCB0byBjYXJ0IGJ1dHRvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtb2RpZnlDbGFzcyBDbGFzcyB0byBhZGQgb3IgcmVtb3ZlXG4gICAgICovXG4gICAgdG9nZ2xlQWRkQnV0dG9uKGRpc2FibGUgPSB0cnVlLCB0ZXh0LCBtb2RpZnlDbGFzcykge1xuICAgICAgICBjb25zdCBwcm9kdWN0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBwcm9kdWN0LWZvcm0tJHt0aGlzLnNlY3Rpb259YCk7XG4gICAgICAgIGlmICghcHJvZHVjdEZvcm0pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IGFkZEJ1dHRvbiA9IHByb2R1Y3RGb3JtLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbltuYW1lPVwiYWRkXCJdJyk7XG4gICAgICAgIGlmICghYWRkQnV0dG9uKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBkaXNhYmxlID8gYWRkQnV0dG9uLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKSA6IGFkZEJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgICAgIGlmICghbW9kaWZ5Q2xhc3MpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGRpc2FibGUgPyBhZGRCdXR0b24uY2xhc3NMaXN0LmFkZChtb2RpZnlDbGFzcykgOiBhZGRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShtb2RpZnlDbGFzcyk7XG4gICAgICAgIGlmICh0ZXh0KSB7XG4gICAgICAgICAgICBjb25zdCBhZGRCdXR0b25UZXh0ID0gYWRkQnV0dG9uLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKTtcbiAgICAgICAgICAgIGFkZEJ1dHRvblRleHQudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldFVuYXZhaWxhYmxlKCkge1xuICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHByb2R1Y3QtZm9ybS0ke3RoaXMuc2VjdGlvbn1gKTtcbiAgICAgICAgY29uc3QgYWRkQnV0dG9uID0gZm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cImFkZFwiXScpO1xuICAgICAgICBjb25zdCBhZGRCdXR0b25UZXh0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cImFkZFwiXSA+IHNwYW4nKTtcbiAgICAgICAgY29uc3QgcHJpY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcHJpY2UtJHt0aGlzLmRhdGFzZXQuc2VjdGlvbn1gKTtcbiAgICAgICAgaWYgKCFhZGRCdXR0b24pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGFkZEJ1dHRvblRleHQudGV4dENvbnRlbnQgPSAnQWdvdGFkbyc7XG4gICAgICAgIGlmIChwcmljZSlcbiAgICAgICAgICAgIHByaWNlLmNsYXNzTGlzdC5hZGQoJ3UtaGlkZScpO1xuICAgIH1cbiAgICByZW5kZXJQcm9kdWN0SW5mbygpIHtcbiAgICAgICAgZmV0Y2goYCR7dGhpcy51cmx9P3ZhcmlhbnQ9JHt0aGlzLmN1cnJlbnRWYXJpYW50LmlkfSZzZWN0aW9uX2lkPSR7dGhpcy5zZWN0aW9ufWApXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLnRleHQoKSlcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZVRleHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGh0bWwgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKHJlc3BvbnNlVGV4dCwgJ3RleHQvaHRtbCcpO1xuICAgICAgICAgICAgY29uc3QgZGVzdGluYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjc2hvcGlmeS1zZWN0aW9uLSR7dGhpcy5zZWN0aW9ufSAucHJvZHVjdF9jb250ZW50YCk7XG4gICAgICAgICAgICBjb25zdCBzb3VyY2UgPSBodG1sLnF1ZXJ5U2VsZWN0b3IoYCNzaG9waWZ5LXNlY3Rpb24tJHt0aGlzLnNlY3Rpb259IC5wcm9kdWN0X2NvbnRlbnRgKTtcbiAgICAgICAgICAgIGlmICghZGVzdGluYXRpb24gfHwgIXNvdXJjZSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBkZXN0aW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdF9wcmljZScpLmlubmVySFRNTCA9IHNvdXJjZS5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdF9wcmljZScpLmlubmVySFRNTDtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlQWRkQnV0dG9uKGZhbHNlLCB0aGlzLmN1cnJlbnRWYXJpYW50LmF2YWlsYWJsZSA/ICdBZ3JlZ2FyIGFsIGNhcnJpdG8nIDogJ0Fnb3RhZG8nLCAnLWRpc2FibGVkJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgndmFyaWFudC1zZWxlY3RzJywgVmFyaWFudFNlbGVjdHMpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9