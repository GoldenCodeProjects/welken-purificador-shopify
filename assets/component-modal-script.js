/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!*****************************************!*\
  !*** ./src/scripts/components/modal.ts ***!
  \*****************************************/
class Modal extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false;
        this.closeBtns = null;
        this.isOpen = Boolean(this.getAttribute('open'));
        this.insert(this.innerHTML);
    }
    insert(content) {
        this.innerHTML = `
      <div class="modal-dialog">
        <button class="modal-close" aria-label="Close" close>
          &times;
        </button>
        ${content}
      </div>
    `;
        this.closeBtns = this.querySelectorAll('button[close]');
    }
    connectedCallback() {
        this.setAttribute('role', 'dialog');
        this.setAttribute('aria-modal', 'true');
        this.setAttribute('aria-hidden', 'false');
        this.setAttribute('tabindex', '-1');
        this.isOpen && this.open();
        this.addEventListener('mousedown', (e) => e.target === this && this.close());
        this.addEventListener('keydown', (e) => e.keyCode === 27 && this.close());
        this.closeBtns.forEach((btn) => btn.addEventListener('click', this.close.bind(this)));
    }
    open() {
        this.isOpen = true;
        this.classList.add('-open');
        document.documentElement.setAttribute('aria-hidden', 'true');
        document.body.setAttribute('style', 'overflow: hidden');
        this.focus();
    }
    close(e) {
        if (e)
            e.preventDefault();
        this.isOpen = false;
        this.classList.remove('-open');
        document.documentElement.removeAttribute('aria-hidden');
        document.body.removeAttribute('style');
    }
}
customElements.define('component-modal', Modal);
class OpenModal extends HTMLElement {
    constructor() {
        super();
        this.target = this.getAttribute('target') || 'component-modal';
        this.modal = document.querySelector(this.target);
        this.button = this.querySelector('button');
    }
    connectedCallback() {
        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            this.modal.isOpen ? this.modal.close() : this.modal.open();
        });
    }
}
customElements.define('open-modal', OpenModal);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LW1vZGFsLXNjcmlwdC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Nob3BpZnktY29yZS8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvbW9kYWwudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgTW9kYWwgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2xvc2VCdG5zID0gbnVsbDtcbiAgICAgICAgdGhpcy5pc09wZW4gPSBCb29sZWFuKHRoaXMuZ2V0QXR0cmlidXRlKCdvcGVuJykpO1xuICAgICAgICB0aGlzLmluc2VydCh0aGlzLmlubmVySFRNTCk7XG4gICAgfVxuICAgIGluc2VydChjb250ZW50KSB7XG4gICAgICAgIHRoaXMuaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWRpYWxvZ1wiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwibW9kYWwtY2xvc2VcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIiBjbG9zZT5cbiAgICAgICAgICAmdGltZXM7XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAke2NvbnRlbnR9XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICAgICAgICB0aGlzLmNsb3NlQnRucyA9IHRoaXMucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uW2Nsb3NlXScpO1xuICAgIH1cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnZGlhbG9nJyk7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdhcmlhLW1vZGFsJywgJ3RydWUnKTtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpO1xuICAgICAgICB0aGlzLmlzT3BlbiAmJiB0aGlzLm9wZW4oKTtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZSkgPT4gZS50YXJnZXQgPT09IHRoaXMgJiYgdGhpcy5jbG9zZSgpKTtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IGUua2V5Q29kZSA9PT0gMjcgJiYgdGhpcy5jbG9zZSgpKTtcbiAgICAgICAgdGhpcy5jbG9zZUJ0bnMuZm9yRWFjaCgoYnRuKSA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsb3NlLmJpbmQodGhpcykpKTtcbiAgICB9XG4gICAgb3BlbigpIHtcbiAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJy1vcGVuJyk7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ292ZXJmbG93OiBoaWRkZW4nKTtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cbiAgICBjbG9zZShlKSB7XG4gICAgICAgIGlmIChlKVxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJy1vcGVuJyk7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgIH1cbn1cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY29tcG9uZW50LW1vZGFsJywgTW9kYWwpO1xuY2xhc3MgT3Blbk1vZGFsIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnRhcmdldCA9IHRoaXMuZ2V0QXR0cmlidXRlKCd0YXJnZXQnKSB8fCAnY29tcG9uZW50LW1vZGFsJztcbiAgICAgICAgdGhpcy5tb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy50YXJnZXQpO1xuICAgICAgICB0aGlzLmJ1dHRvbiA9IHRoaXMucXVlcnlTZWxlY3RvcignYnV0dG9uJyk7XG4gICAgfVxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLm1vZGFsLmlzT3BlbiA/IHRoaXMubW9kYWwuY2xvc2UoKSA6IHRoaXMubW9kYWwub3BlbigpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ29wZW4tbW9kYWwnLCBPcGVuTW9kYWwpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9