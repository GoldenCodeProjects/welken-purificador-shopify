/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/components/cart.ts":
/*!****************************************!*\
  !*** ./src/scripts/components/cart.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shopify_theme_cart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shopify/theme-cart */ "./node_modules/@shopify/theme-cart/theme-cart.js");
/* harmony import */ var _shopify_theme_currency__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shopify/theme-currency */ "./node_modules/@shopify/theme-currency/currency.js");
/* harmony import */ var toastify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! toastify-js */ "./node_modules/toastify-js/src/toastify.js");
/* harmony import */ var toastify_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(toastify_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var toastify_js_src_toastify_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! toastify-js/src/toastify.css */ "./node_modules/toastify-js/src/toastify.css");
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gsap/ScrollTrigger */ "./node_modules/gsap/ScrollTrigger.js");






gsap__WEBPACK_IMPORTED_MODULE_4__.gsap.registerPlugin(gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_5__.ScrollTrigger);
const deleteItemKey = (key) => {
    _shopify_theme_cart__WEBPACK_IMPORTED_MODULE_0__.removeItem(key)
        .then((cart) => {
        document.querySelector('cart-component').removeItem(key);
        toastify_js__WEBPACK_IMPORTED_MODULE_2___default()({
            text: 'Producto eliminado del carrito',
            duration: 3000,
            gravity: 'bottom',
            position: 'left',
            close: true,
        }).showToast();
    })
        .catch((error) => {
        console.error(error);
        toastify_js__WEBPACK_IMPORTED_MODULE_2___default()({
            text: 'Ya no es posible eliminar el producto',
            duration: 3000,
            gravity: 'bottom',
            position: 'left',
            close: true,
        }).showToast();
    })
        .finally(() => {
        document.querySelectorAll('cart-icon').forEach((icon) => {
            icon.calculateItems();
        });
    });
};
class CartComponent extends HTMLElement {
    constructor() {
        super();
        this.itemsElement = this.querySelector('#items');
        this.closeBtn = this.querySelector('button[close]');
        this.total = this.querySelector('#total');
        this.butnowBtn = this.querySelector('#buynow');
        this.titleElement = this.querySelector('h2');
        this.lineItemsElement = [];
        this.sideCartElement = this.querySelector('.cart');
        this.timeline = gsap__WEBPACK_IMPORTED_MODULE_4__.gsap.timeline();
    }
    connectedCallback() {
        this.total.innerText = _shopify_theme_currency__WEBPACK_IMPORTED_MODULE_1__.formatMoney(0);
        this.addEventListener('mousedown', (e) => e.target === this && this.close());
        this.closeBtn && this.closeBtn.addEventListener('click', () => this.close());
        this.renderSectionFromFetch();
    }
    open() {
        console.log('open');
        this.classList.add('-active');
        document.documentElement.style.overflow = 'hidden';
        this.timeline.clear(true);
        this.lineItemsElement = Array.from(document.querySelectorAll('.product-item')).reverse();
        this.cartAnimate();
    }
    cartAnimate() {
        this.timeline
            .fromTo(this.sideCartElement, {
            opacity: 0,
            background: 'transparent'
        }, {
            opacity: 1,
            duration: 1.2,
            ease: 'linear'
        })
            .fromTo([
            this.titleElement,
            ...this.lineItemsElement.splice(this.lineItemsElement.length - 3).reverse(),
            this.querySelector('.subtotal')
        ], {
            xPercent: 100
        }, {
            duration: 2,
            xPercent: 0,
            ease: 'elastic.out(1, 0.5)',
            stagger: {
                each: .3
            }
        }, '<.3')
            .fromTo(this.sideCartElement, {
            background: 'transparent'
        }, {
            background: 'white',
            duration: .7,
            ease: 'linear'
        }, '<');
    }
    close() {
        this.classList.remove('-active');
        document.documentElement.style.overflow = 'auto';
    }
    updateTotal() {
        _shopify_theme_cart__WEBPACK_IMPORTED_MODULE_0__.getState().then((state) => {
            this.total.innerText = _shopify_theme_currency__WEBPACK_IMPORTED_MODULE_1__.formatMoney(state.total_price);
            if (state.item_count > 0) {
                this.butnowBtn.classList.remove('-disabled');
                this.butnowBtn.setAttribute('href', '/checkout');
            }
            else {
                this.butnowBtn.classList.add('-disabled');
                this.butnowBtn.setAttribute('href', '#');
            }
        });
    }
    renderSectionFromFetch() {
        const url = `/cart?sections[]=products-items`;
        fetch(url)
            .then((response) => response.json())
            .then((html) => {
            html = html['products-items'];
            this.itemsElement.innerHTML = new DOMParser()
                .parseFromString(html, 'text/html')
                .querySelector('.shopify-section').innerHTML;
            this.lineItemsElement = Array.from(this.itemsElement.children);
            this.updateTotal();
        });
    }
    addItem() {
        toastify_js__WEBPACK_IMPORTED_MODULE_2___default()({
            text: 'Producto agregado al carrito',
            duration: 3000,
            gravity: 'bottom',
            position: 'left',
            close: true,
        }).showToast();
        this.renderSectionFromFetch();
    }
    updateItem(key, quantity) {
        const item = this.itemsElement.querySelector(`.product-item[data-key="${key}"]`);
        const quantityElement = item.querySelector('[quantity]');
        quantityElement.value = quantity;
        this.updateTotal();
    }
    removeItem(key) {
        this.itemsElement.querySelector(`.product-item[data-key="${key}"]`).remove();
        this.updateTotal();
    }
}
customElements.define('cart-component', CartComponent);
class CartIcon extends HTMLElement {
    constructor() {
        super();
        this.button = this.querySelector('button');
        this.quantity = this.querySelector('.data-quantity');
        this.itemsQuantity = 0;
        this.cartComponent = document.querySelector('cart-component');
    }
    connectedCallback() {
        this.calculateItems();
        this.button.addEventListener('click', () => {
            this.cartComponent.open();
        });
    }
    setItemsQuantity(quantity) {
        this.itemsQuantity = quantity;
        this.quantity.innerHTML = quantity;
    }
    calculateItems() {
        _shopify_theme_cart__WEBPACK_IMPORTED_MODULE_0__.getState().then((cart) => {
            this.setItemsQuantity(cart.item_count);
        });
    }
}
customElements.define('cart-icon', CartIcon);
class AddProductButton extends HTMLElement {
    constructor() {
        super();
        this.button = this.querySelector('button');
        this.cartComponent = document.querySelector('cart-component');
        this.icons = document.querySelectorAll('cart-icon');
    }
    connectedCallback() {
        this.button.addEventListener('click', this.addItem.bind(this));
    }
    addItem() {
        _shopify_theme_cart__WEBPACK_IMPORTED_MODULE_0__.addItem(Number(this.button.dataset.id))
            .then(this.onSuccess.bind(this))
            .catch(this.onError.bind(this))
            .finally(() => {
            this.icons.forEach((icon) => {
                console.log(icon);
                icon.calculateItems();
            });
        });
    }
    onSuccess(cart) {
        console.dir(cart);
        this.cartComponent.addItem();
        toastify_js__WEBPACK_IMPORTED_MODULE_2___default()({
            text: 'Producto agregado al carrito',
            duration: 3000,
            gravity: 'bottom',
            position: 'left',
            offset: { y: 120, x: 20 },
            close: true,
        }).showToast();
    }
    onError(error) {
        console.error(error);
        toastify_js__WEBPACK_IMPORTED_MODULE_2___default()({
            text: 'Ya no es posible agregar mas productos',
            duration: 3000,
            gravity: 'bottom',
            position: 'left',
            offset: { y: 120, x: 2 },
            close: true,
        }).showToast();
    }
}
customElements.define('add-product-button', AddProductButton);
class BuyNowButton extends AddProductButton {
    constructor() {
        super();
    }
    onSuccess(cart) {
        super.onSuccess(cart);
        location.href = '/checkout';
    }
    onError(error) {
        super.onError(error);
        location.href = '/checkout';
    }
}
customElements.define('buy-now-button', BuyNowButton);
class UpdateProduct extends HTMLElement {
    constructor() {
        super();
        this.upBtn = this.querySelector('button[up]');
        this.downBtn = this.querySelector('button[down]');
        this.quantity = this.querySelector('input');
        this.inputTarget = document.querySelector(`input${this.getAttribute('target')}`);
        this.max = this.getAttribute('max') ? Number(this.getAttribute('max')) : 100000;
    }
    connectedCallback() {
        this.upBtn.addEventListener('click', this.increment.bind(this));
        this.downBtn.addEventListener('click', this.decrement.bind(this));
        this.quantity.addEventListener('input', this.update.bind(this));
    }
    increment() {
        this.quantity.value = String(Math.min(Number(this.quantity.value) + 1, this.max));
        this.update();
    }
    decrement() {
        this.quantity.value = String(Math.max(Number(this.quantity.value) - 1, 1));
        this.update();
    }
    update() {
        this.inputTarget.value = this.quantity.value;
    }
}
customElements.define('update-quantity', UpdateProduct);
class RemoveProductButton extends HTMLElement {
    constructor() {
        super();
        this.button = this.querySelector('button');
        const key = this.dataset.key;
        this.button.addEventListener('click', deleteItemKey.bind(this, key));
    }
}
customElements.define('remove-product-button', RemoveProductButton);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"component-cart-script": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkshopify_core"] = self["webpackChunkshopify_core"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], function() { return __webpack_require__("./src/scripts/components/cart.ts"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsK0JBQStCLHdDQUF3QztXQUN2RTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDLG9IQUFvSCxpREFBaUQ7V0FDcks7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzdCQTtXQUNBO1dBQ0E7V0FDQSxlQUFlLDRCQUE0QjtXQUMzQyxlQUFlO1dBQ2YsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQSw4Q0FBOEM7O1dBRTlDO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsbUNBQW1DO1dBQ3BFO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVsREE7VUFDQTtVQUNBO1VBQ0EscUZBQXFGLGlFQUFpRTtVQUN0SiIsInNvdXJjZXMiOlsid2VicGFjazovL3Nob3BpZnktY29yZS8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvY2FydC50cyIsIndlYnBhY2s6Ly9zaG9waWZ5LWNvcmUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2hvcGlmeS1jb3JlL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vc2hvcGlmeS1jb3JlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3Nob3BpZnktY29yZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2hvcGlmeS1jb3JlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc2hvcGlmeS1jb3JlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2hvcGlmeS1jb3JlL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3Nob3BpZnktY29yZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3Nob3BpZnktY29yZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vc2hvcGlmeS1jb3JlL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjYXJ0IGZyb20gJ0BzaG9waWZ5L3RoZW1lLWNhcnQnO1xuaW1wb3J0ICogYXMgY3VycmVuY3kgZnJvbSAnQHNob3BpZnkvdGhlbWUtY3VycmVuY3knO1xuaW1wb3J0IFRvYXN0aWZ5IGZyb20gJ3RvYXN0aWZ5LWpzJztcbmltcG9ydCBcInRvYXN0aWZ5LWpzL3NyYy90b2FzdGlmeS5jc3NcIjtcbmltcG9ydCB7IGdzYXAgfSBmcm9tIFwiZ3NhcFwiO1xuaW1wb3J0IHsgU2Nyb2xsVHJpZ2dlciB9IGZyb20gXCJnc2FwL1Njcm9sbFRyaWdnZXJcIjtcbmdzYXAucmVnaXN0ZXJQbHVnaW4oU2Nyb2xsVHJpZ2dlcik7XG5jb25zdCBkZWxldGVJdGVtS2V5ID0gKGtleSkgPT4ge1xuICAgIGNhcnRcbiAgICAgICAgLnJlbW92ZUl0ZW0oa2V5KVxuICAgICAgICAudGhlbigoY2FydCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYXJ0LWNvbXBvbmVudCcpLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICAgICAgVG9hc3RpZnkoe1xuICAgICAgICAgICAgdGV4dDogJ1Byb2R1Y3RvIGVsaW1pbmFkbyBkZWwgY2Fycml0bycsXG4gICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICAgIGdyYXZpdHk6ICdib3R0b20nLFxuICAgICAgICAgICAgcG9zaXRpb246ICdsZWZ0JyxcbiAgICAgICAgICAgIGNsb3NlOiB0cnVlLFxuICAgICAgICB9KS5zaG93VG9hc3QoKTtcbiAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICBUb2FzdGlmeSh7XG4gICAgICAgICAgICB0ZXh0OiAnWWEgbm8gZXMgcG9zaWJsZSBlbGltaW5hciBlbCBwcm9kdWN0bycsXG4gICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICAgIGdyYXZpdHk6ICdib3R0b20nLFxuICAgICAgICAgICAgcG9zaXRpb246ICdsZWZ0JyxcbiAgICAgICAgICAgIGNsb3NlOiB0cnVlLFxuICAgICAgICB9KS5zaG93VG9hc3QoKTtcbiAgICB9KVxuICAgICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2NhcnQtaWNvbicpLmZvckVhY2goKGljb24pID0+IHtcbiAgICAgICAgICAgIGljb24uY2FsY3VsYXRlSXRlbXMoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuY2xhc3MgQ2FydENvbXBvbmVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5pdGVtc0VsZW1lbnQgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJyNpdGVtcycpO1xuICAgICAgICB0aGlzLmNsb3NlQnRuID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdidXR0b25bY2xvc2VdJyk7XG4gICAgICAgIHRoaXMudG90YWwgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJyN0b3RhbCcpO1xuICAgICAgICB0aGlzLmJ1dG5vd0J0biA9IHRoaXMucXVlcnlTZWxlY3RvcignI2J1eW5vdycpO1xuICAgICAgICB0aGlzLnRpdGxlRWxlbWVudCA9IHRoaXMucXVlcnlTZWxlY3RvcignaDInKTtcbiAgICAgICAgdGhpcy5saW5lSXRlbXNFbGVtZW50ID0gW107XG4gICAgICAgIHRoaXMuc2lkZUNhcnRFbGVtZW50ID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcuY2FydCcpO1xuICAgICAgICB0aGlzLnRpbWVsaW5lID0gZ3NhcC50aW1lbGluZSgpO1xuICAgIH1cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy50b3RhbC5pbm5lclRleHQgPSBjdXJyZW5jeS5mb3JtYXRNb25leSgwKTtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZSkgPT4gZS50YXJnZXQgPT09IHRoaXMgJiYgdGhpcy5jbG9zZSgpKTtcbiAgICAgICAgdGhpcy5jbG9zZUJ0biAmJiB0aGlzLmNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5jbG9zZSgpKTtcbiAgICAgICAgdGhpcy5yZW5kZXJTZWN0aW9uRnJvbUZldGNoKCk7XG4gICAgfVxuICAgIG9wZW4oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdvcGVuJyk7XG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnLWFjdGl2ZScpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICAgICAgdGhpcy50aW1lbGluZS5jbGVhcih0cnVlKTtcbiAgICAgICAgdGhpcy5saW5lSXRlbXNFbGVtZW50ID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdC1pdGVtJykpLnJldmVyc2UoKTtcbiAgICAgICAgdGhpcy5jYXJ0QW5pbWF0ZSgpO1xuICAgIH1cbiAgICBjYXJ0QW5pbWF0ZSgpIHtcbiAgICAgICAgdGhpcy50aW1lbGluZVxuICAgICAgICAgICAgLmZyb21Ubyh0aGlzLnNpZGVDYXJ0RWxlbWVudCwge1xuICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICd0cmFuc3BhcmVudCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxLjIsXG4gICAgICAgICAgICBlYXNlOiAnbGluZWFyJ1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmZyb21UbyhbXG4gICAgICAgICAgICB0aGlzLnRpdGxlRWxlbWVudCxcbiAgICAgICAgICAgIC4uLnRoaXMubGluZUl0ZW1zRWxlbWVudC5zcGxpY2UodGhpcy5saW5lSXRlbXNFbGVtZW50Lmxlbmd0aCAtIDMpLnJldmVyc2UoKSxcbiAgICAgICAgICAgIHRoaXMucXVlcnlTZWxlY3RvcignLnN1YnRvdGFsJylcbiAgICAgICAgXSwge1xuICAgICAgICAgICAgeFBlcmNlbnQ6IDEwMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkdXJhdGlvbjogMixcbiAgICAgICAgICAgIHhQZXJjZW50OiAwLFxuICAgICAgICAgICAgZWFzZTogJ2VsYXN0aWMub3V0KDEsIDAuNSknLFxuICAgICAgICAgICAgc3RhZ2dlcjoge1xuICAgICAgICAgICAgICAgIGVhY2g6IC4zXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sICc8LjMnKVxuICAgICAgICAgICAgLmZyb21Ubyh0aGlzLnNpZGVDYXJ0RWxlbWVudCwge1xuICAgICAgICAgICAgYmFja2dyb3VuZDogJ3RyYW5zcGFyZW50J1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgICAgICAgZHVyYXRpb246IC43LFxuICAgICAgICAgICAgZWFzZTogJ2xpbmVhcidcbiAgICAgICAgfSwgJzwnKTtcbiAgICB9XG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnLWFjdGl2ZScpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnYXV0byc7XG4gICAgfVxuICAgIHVwZGF0ZVRvdGFsKCkge1xuICAgICAgICBjYXJ0LmdldFN0YXRlKCkudGhlbigoc3RhdGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMudG90YWwuaW5uZXJUZXh0ID0gY3VycmVuY3kuZm9ybWF0TW9uZXkoc3RhdGUudG90YWxfcHJpY2UpO1xuICAgICAgICAgICAgaWYgKHN0YXRlLml0ZW1fY291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5idXRub3dCdG4uY2xhc3NMaXN0LnJlbW92ZSgnLWRpc2FibGVkJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5idXRub3dCdG4uc2V0QXR0cmlidXRlKCdocmVmJywgJy9jaGVja291dCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5idXRub3dCdG4uY2xhc3NMaXN0LmFkZCgnLWRpc2FibGVkJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5idXRub3dCdG4uc2V0QXR0cmlidXRlKCdocmVmJywgJyMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlbmRlclNlY3Rpb25Gcm9tRmV0Y2goKSB7XG4gICAgICAgIGNvbnN0IHVybCA9IGAvY2FydD9zZWN0aW9uc1tdPXByb2R1Y3RzLWl0ZW1zYDtcbiAgICAgICAgZmV0Y2godXJsKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAudGhlbigoaHRtbCkgPT4ge1xuICAgICAgICAgICAgaHRtbCA9IGh0bWxbJ3Byb2R1Y3RzLWl0ZW1zJ107XG4gICAgICAgICAgICB0aGlzLml0ZW1zRWxlbWVudC5pbm5lckhUTUwgPSBuZXcgRE9NUGFyc2VyKClcbiAgICAgICAgICAgICAgICAucGFyc2VGcm9tU3RyaW5nKGh0bWwsICd0ZXh0L2h0bWwnKVxuICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCcuc2hvcGlmeS1zZWN0aW9uJykuaW5uZXJIVE1MO1xuICAgICAgICAgICAgdGhpcy5saW5lSXRlbXNFbGVtZW50ID0gQXJyYXkuZnJvbSh0aGlzLml0ZW1zRWxlbWVudC5jaGlsZHJlbik7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRvdGFsKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhZGRJdGVtKCkge1xuICAgICAgICBUb2FzdGlmeSh7XG4gICAgICAgICAgICB0ZXh0OiAnUHJvZHVjdG8gYWdyZWdhZG8gYWwgY2Fycml0bycsXG4gICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICAgIGdyYXZpdHk6ICdib3R0b20nLFxuICAgICAgICAgICAgcG9zaXRpb246ICdsZWZ0JyxcbiAgICAgICAgICAgIGNsb3NlOiB0cnVlLFxuICAgICAgICB9KS5zaG93VG9hc3QoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJTZWN0aW9uRnJvbUZldGNoKCk7XG4gICAgfVxuICAgIHVwZGF0ZUl0ZW0oa2V5LCBxdWFudGl0eSkge1xuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5pdGVtc0VsZW1lbnQucXVlcnlTZWxlY3RvcihgLnByb2R1Y3QtaXRlbVtkYXRhLWtleT1cIiR7a2V5fVwiXWApO1xuICAgICAgICBjb25zdCBxdWFudGl0eUVsZW1lbnQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ1txdWFudGl0eV0nKTtcbiAgICAgICAgcXVhbnRpdHlFbGVtZW50LnZhbHVlID0gcXVhbnRpdHk7XG4gICAgICAgIHRoaXMudXBkYXRlVG90YWwoKTtcbiAgICB9XG4gICAgcmVtb3ZlSXRlbShrZXkpIHtcbiAgICAgICAgdGhpcy5pdGVtc0VsZW1lbnQucXVlcnlTZWxlY3RvcihgLnByb2R1Y3QtaXRlbVtkYXRhLWtleT1cIiR7a2V5fVwiXWApLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZVRvdGFsKCk7XG4gICAgfVxufVxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjYXJ0LWNvbXBvbmVudCcsIENhcnRDb21wb25lbnQpO1xuY2xhc3MgQ2FydEljb24gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYnV0dG9uID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5xdWFudGl0eSA9IHRoaXMucXVlcnlTZWxlY3RvcignLmRhdGEtcXVhbnRpdHknKTtcbiAgICAgICAgdGhpcy5pdGVtc1F1YW50aXR5ID0gMDtcbiAgICAgICAgdGhpcy5jYXJ0Q29tcG9uZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FydC1jb21wb25lbnQnKTtcbiAgICB9XG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlSXRlbXMoKTtcbiAgICAgICAgdGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhcnRDb21wb25lbnQub3BlbigpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2V0SXRlbXNRdWFudGl0eShxdWFudGl0eSkge1xuICAgICAgICB0aGlzLml0ZW1zUXVhbnRpdHkgPSBxdWFudGl0eTtcbiAgICAgICAgdGhpcy5xdWFudGl0eS5pbm5lckhUTUwgPSBxdWFudGl0eTtcbiAgICB9XG4gICAgY2FsY3VsYXRlSXRlbXMoKSB7XG4gICAgICAgIGNhcnQuZ2V0U3RhdGUoKS50aGVuKChjYXJ0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldEl0ZW1zUXVhbnRpdHkoY2FydC5pdGVtX2NvdW50KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjYXJ0LWljb24nLCBDYXJ0SWNvbik7XG5jbGFzcyBBZGRQcm9kdWN0QnV0dG9uIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmJ1dHRvbiA9IHRoaXMucXVlcnlTZWxlY3RvcignYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuY2FydENvbXBvbmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhcnQtY29tcG9uZW50Jyk7XG4gICAgICAgIHRoaXMuaWNvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdjYXJ0LWljb24nKTtcbiAgICB9XG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5hZGRJdGVtLmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBhZGRJdGVtKCkge1xuICAgICAgICBjYXJ0XG4gICAgICAgICAgICAuYWRkSXRlbShOdW1iZXIodGhpcy5idXR0b24uZGF0YXNldC5pZCkpXG4gICAgICAgICAgICAudGhlbih0aGlzLm9uU3VjY2Vzcy5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLmNhdGNoKHRoaXMub25FcnJvci5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pY29ucy5mb3JFYWNoKChpY29uKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaWNvbik7XG4gICAgICAgICAgICAgICAgaWNvbi5jYWxjdWxhdGVJdGVtcygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvblN1Y2Nlc3MoY2FydCkge1xuICAgICAgICBjb25zb2xlLmRpcihjYXJ0KTtcbiAgICAgICAgdGhpcy5jYXJ0Q29tcG9uZW50LmFkZEl0ZW0oKTtcbiAgICAgICAgVG9hc3RpZnkoe1xuICAgICAgICAgICAgdGV4dDogJ1Byb2R1Y3RvIGFncmVnYWRvIGFsIGNhcnJpdG8nLFxuICAgICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgICAgICBncmF2aXR5OiAnYm90dG9tJyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnbGVmdCcsXG4gICAgICAgICAgICBvZmZzZXQ6IHsgeTogMTIwLCB4OiAyMCB9LFxuICAgICAgICAgICAgY2xvc2U6IHRydWUsXG4gICAgICAgIH0pLnNob3dUb2FzdCgpO1xuICAgIH1cbiAgICBvbkVycm9yKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICBUb2FzdGlmeSh7XG4gICAgICAgICAgICB0ZXh0OiAnWWEgbm8gZXMgcG9zaWJsZSBhZ3JlZ2FyIG1hcyBwcm9kdWN0b3MnLFxuICAgICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgICAgICBncmF2aXR5OiAnYm90dG9tJyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnbGVmdCcsXG4gICAgICAgICAgICBvZmZzZXQ6IHsgeTogMTIwLCB4OiAyIH0sXG4gICAgICAgICAgICBjbG9zZTogdHJ1ZSxcbiAgICAgICAgfSkuc2hvd1RvYXN0KCk7XG4gICAgfVxufVxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdhZGQtcHJvZHVjdC1idXR0b24nLCBBZGRQcm9kdWN0QnV0dG9uKTtcbmNsYXNzIEJ1eU5vd0J1dHRvbiBleHRlbmRzIEFkZFByb2R1Y3RCdXR0b24ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cbiAgICBvblN1Y2Nlc3MoY2FydCkge1xuICAgICAgICBzdXBlci5vblN1Y2Nlc3MoY2FydCk7XG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnL2NoZWNrb3V0JztcbiAgICB9XG4gICAgb25FcnJvcihlcnJvcikge1xuICAgICAgICBzdXBlci5vbkVycm9yKGVycm9yKTtcbiAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcvY2hlY2tvdXQnO1xuICAgIH1cbn1cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnYnV5LW5vdy1idXR0b24nLCBCdXlOb3dCdXR0b24pO1xuY2xhc3MgVXBkYXRlUHJvZHVjdCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy51cEJ0biA9IHRoaXMucXVlcnlTZWxlY3RvcignYnV0dG9uW3VwXScpO1xuICAgICAgICB0aGlzLmRvd25CdG4gPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbltkb3duXScpO1xuICAgICAgICB0aGlzLnF1YW50aXR5ID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuICAgICAgICB0aGlzLmlucHV0VGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXQke3RoaXMuZ2V0QXR0cmlidXRlKCd0YXJnZXQnKX1gKTtcbiAgICAgICAgdGhpcy5tYXggPSB0aGlzLmdldEF0dHJpYnV0ZSgnbWF4JykgPyBOdW1iZXIodGhpcy5nZXRBdHRyaWJ1dGUoJ21heCcpKSA6IDEwMDAwMDtcbiAgICB9XG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMudXBCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmluY3JlbWVudC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5kb3duQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5kZWNyZW1lbnQuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMucXVhbnRpdHkuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgaW5jcmVtZW50KCkge1xuICAgICAgICB0aGlzLnF1YW50aXR5LnZhbHVlID0gU3RyaW5nKE1hdGgubWluKE51bWJlcih0aGlzLnF1YW50aXR5LnZhbHVlKSArIDEsIHRoaXMubWF4KSk7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIGRlY3JlbWVudCgpIHtcbiAgICAgICAgdGhpcy5xdWFudGl0eS52YWx1ZSA9IFN0cmluZyhNYXRoLm1heChOdW1iZXIodGhpcy5xdWFudGl0eS52YWx1ZSkgLSAxLCAxKSk7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5pbnB1dFRhcmdldC52YWx1ZSA9IHRoaXMucXVhbnRpdHkudmFsdWU7XG4gICAgfVxufVxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCd1cGRhdGUtcXVhbnRpdHknLCBVcGRhdGVQcm9kdWN0KTtcbmNsYXNzIFJlbW92ZVByb2R1Y3RCdXR0b24gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYnV0dG9uID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcbiAgICAgICAgY29uc3Qga2V5ID0gdGhpcy5kYXRhc2V0LmtleTtcbiAgICAgICAgdGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkZWxldGVJdGVtS2V5LmJpbmQodGhpcywga2V5KSk7XG4gICAgfVxufVxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdyZW1vdmUtcHJvZHVjdC1idXR0b24nLCBSZW1vdmVQcm9kdWN0QnV0dG9uKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSBmdW5jdGlvbihyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpIHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGNodW5rSWRzID0gZGVmZXJyZWRbaV1bMF07XG5cdFx0dmFyIGZuID0gZGVmZXJyZWRbaV1bMV07XG5cdFx0dmFyIHByaW9yaXR5ID0gZGVmZXJyZWRbaV1bMl07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pOyB9KSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImNvbXBvbmVudC1jYXJ0LXNjcmlwdFwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IGZ1bmN0aW9uKGNodW5rSWQpIHsgcmV0dXJuIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMDsgfTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSBmdW5jdGlvbihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkge1xuXHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuXHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuXHR2YXIgcnVudGltZSA9IGRhdGFbMl07XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZShmdW5jdGlvbihpZCkgeyByZXR1cm4gaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMDsgfSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rc2hvcGlmeV9jb3JlXCJdID0gc2VsZltcIndlYnBhY2tDaHVua3Nob3BpZnlfY29yZVwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yc1wiXSwgZnVuY3Rpb24oKSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL2NhcnQudHNcIik7IH0pXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9