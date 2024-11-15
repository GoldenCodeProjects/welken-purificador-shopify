/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/base.scss":
/*!******************************!*\
  !*** ./src/styles/base.scss ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scripts/base.ts":
/*!*****************************!*\
  !*** ./src/scripts/base.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fortawesome_fontawesome_free_js_all_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fortawesome/fontawesome-free/js/all.js */ "./node_modules/@fortawesome/fontawesome-free/js/all.js");
/* harmony import */ var _fortawesome_fontawesome_free_js_all_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_free_js_all_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/modal */ "./src/scripts/components/modal.ts");
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_modal__WEBPACK_IMPORTED_MODULE_1__);


console.log('Hello from Theme Layout 👋.');
window.onload = () => {
    const cartElement = document.querySelector('cart-component');
    const hashUrl = window.location.hash;
    switch (hashUrl) {
        case '#cart':
            cartElement.open();
            break;
        case '#checkout':
            cartElement.openCheckout();
            break;
        default:
            break;
    }
    document.querySelector('component-loader').classList.remove('loading');
};
const fields = document.querySelectorAll('.c-field');
fields.forEach(field => {
    const label = field.querySelector('.c-field_label');
    const input = field.querySelector(`#${label.getAttribute('for')}`);
    field.addEventListener('click', () => {
        input && input.focus();
    });
});
/*
 * Shopify Common JS
 *
 */
class CountryProvinceSelector {
    constructor(country_domid, province_domid, options) {
        this.countryEl = document.getElementById(country_domid);
        this.provinceEl = document.getElementById(province_domid);
        this.provinceContainer = document.getElementById(options['hideElement'] || province_domid);
        window.Shopify.addListener(this.countryEl, 'change', window.Shopify.bind(this.countryHandler, this));
        this.initCountry();
        this.initProvince();
    }
    initCountry() {
        var value = this.countryEl.getAttribute('data-default');
        window.Shopify.setSelectorByValue(this.countryEl, value);
        this.countryHandler();
    }
    initProvince() {
        var value = this.provinceEl.getAttribute('data-default');
        if (value && this.provinceEl.options.length > 0) {
            window.Shopify.setSelectorByValue(this.provinceEl, value);
        }
    }
    countryHandler(e) {
        var opt = this.countryEl.options[this.countryEl.selectedIndex];
        var raw = opt.getAttribute('data-provinces');
        var provinces = JSON.parse(raw);
        this.clearOptions(this.provinceEl);
        if (provinces && provinces.length == 0) {
            this.provinceContainer.style.display = 'none';
        }
        else {
            for (var i = 0; i < provinces.length; i++) {
                var opt = document.createElement('option');
                opt.value = provinces[i][0];
                opt.innerHTML = provinces[i][1];
                this.provinceEl.appendChild(opt);
            }
            this.provinceContainer.style.display = '';
        }
    }
    clearOptions(selector) {
        while (selector.firstChild) {
            selector.removeChild(selector.firstChild);
        }
    }
    setOptions(selector, values) {
        for (var i = 0, count = values.length; i < values.length; i++) {
            var opt = document.createElement('option');
            opt.value = values[i];
            opt.innerHTML = values[i];
            selector.appendChild(opt);
        }
    }
}
class Shopify {
    constructor() {
        this.CountryProvinceSelector = CountryProvinceSelector;
    }
    bind(fn, scope) {
        return function () {
            return fn.apply(scope, arguments);
        };
    }
    setSelectorByValue(selector, value) {
        for (var i = 0, count = selector.options.length; i < count; i++) {
            var option = selector.options[i];
            if (value == option.value || value == option.innerHTML) {
                selector.selectedIndex = i;
                return i;
            }
        }
    }
    addListener(target, eventName, callback) {
        target.addEventListener
            ? target.addEventListener(eventName, callback, false)
            : target.attachEvent('on' + eventName, callback);
    }
    postLink(path, options, cb) {
        options = options || {};
        var method = options['method'] || 'post';
        var params = options['parameters'] || {};
        var form = document.createElement('form');
        form.setAttribute('method', method);
        form.setAttribute('action', path);
        for (var key in params) {
            var hiddenField = document.createElement('input');
            hiddenField.setAttribute('type', 'hidden');
            hiddenField.setAttribute('name', key);
            hiddenField.setAttribute('value', params[key]);
            form.appendChild(hiddenField);
        }
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
        if (cb) {
            cb();
        }
    }
}
window.Shopify = new Shopify();
// Policies
const policy_container = document.querySelector('.shopify-policy__container');
if (policy_container) {
    policy_container.querySelectorAll('table').forEach((table) => {
        const newTable = document.createElement('div');
        newTable.classList.add('responsive-table');
        table.append((document.createElement('caption').innerText = '-»'));
        newTable.innerHTML = table.outerHTML;
        table.parentNode.replaceChild(newTable, table);
    });
}


/***/ }),

/***/ "./src/scripts/components/modal.ts":
/*!*****************************************!*\
  !*** ./src/scripts/components/modal.ts ***!
  \*****************************************/
/***/ (function() {

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
/******/ 			"base": 0
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
/******/ 	__webpack_require__.O(undefined, ["vendors"], function() { return __webpack_require__("./src/scripts/base.ts"); })
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], function() { return __webpack_require__("./src/styles/base.scss"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztXQUVBLDhDQUE4Qzs7V0FFOUM7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxtQ0FBbUM7V0FDcEU7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWxEQTtVQUNBO1VBQ0E7VUFDQSwyREFBMkQsc0RBQXNEO1VBQ2pILHFGQUFxRix1REFBdUQ7VUFDNUkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaG9waWZ5LWNvcmUvLi9zcmMvc3R5bGVzL2Jhc2Uuc2Nzcz8wOTI3Iiwid2VicGFjazovL3Nob3BpZnktY29yZS8uL3NyYy9zY3JpcHRzL2Jhc2UudHMiLCJ3ZWJwYWNrOi8vc2hvcGlmeS1jb3JlLy4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9tb2RhbC50cyIsIndlYnBhY2s6Ly9zaG9waWZ5LWNvcmUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2hvcGlmeS1jb3JlL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vc2hvcGlmeS1jb3JlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3Nob3BpZnktY29yZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2hvcGlmeS1jb3JlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc2hvcGlmeS1jb3JlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2hvcGlmeS1jb3JlL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3Nob3BpZnktY29yZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3Nob3BpZnktY29yZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vc2hvcGlmeS1jb3JlL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlL2pzL2FsbC5qcyc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9tb2RhbCc7XG5jb25zb2xlLmxvZygnSGVsbG8gZnJvbSBUaGVtZSBMYXlvdXQg8J+Riy4nKTtcbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgY29uc3QgY2FydEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYXJ0LWNvbXBvbmVudCcpO1xuICAgIGNvbnN0IGhhc2hVcmwgPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcbiAgICBzd2l0Y2ggKGhhc2hVcmwpIHtcbiAgICAgICAgY2FzZSAnI2NhcnQnOlxuICAgICAgICAgICAgY2FydEVsZW1lbnQub3BlbigpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJyNjaGVja291dCc6XG4gICAgICAgICAgICBjYXJ0RWxlbWVudC5vcGVuQ2hlY2tvdXQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NvbXBvbmVudC1sb2FkZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkaW5nJyk7XG59O1xuY29uc3QgZmllbGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmMtZmllbGQnKTtcbmZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICBjb25zdCBsYWJlbCA9IGZpZWxkLnF1ZXJ5U2VsZWN0b3IoJy5jLWZpZWxkX2xhYmVsJyk7XG4gICAgY29uc3QgaW5wdXQgPSBmaWVsZC5xdWVyeVNlbGVjdG9yKGAjJHtsYWJlbC5nZXRBdHRyaWJ1dGUoJ2ZvcicpfWApO1xuICAgIGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBpbnB1dCAmJiBpbnB1dC5mb2N1cygpO1xuICAgIH0pO1xufSk7XG4vKlxuICogU2hvcGlmeSBDb21tb24gSlNcbiAqXG4gKi9cbmNsYXNzIENvdW50cnlQcm92aW5jZVNlbGVjdG9yIHtcbiAgICBjb25zdHJ1Y3Rvcihjb3VudHJ5X2RvbWlkLCBwcm92aW5jZV9kb21pZCwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLmNvdW50cnlFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvdW50cnlfZG9taWQpO1xuICAgICAgICB0aGlzLnByb3ZpbmNlRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwcm92aW5jZV9kb21pZCk7XG4gICAgICAgIHRoaXMucHJvdmluY2VDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChvcHRpb25zWydoaWRlRWxlbWVudCddIHx8IHByb3ZpbmNlX2RvbWlkKTtcbiAgICAgICAgd2luZG93LlNob3BpZnkuYWRkTGlzdGVuZXIodGhpcy5jb3VudHJ5RWwsICdjaGFuZ2UnLCB3aW5kb3cuU2hvcGlmeS5iaW5kKHRoaXMuY291bnRyeUhhbmRsZXIsIHRoaXMpKTtcbiAgICAgICAgdGhpcy5pbml0Q291bnRyeSgpO1xuICAgICAgICB0aGlzLmluaXRQcm92aW5jZSgpO1xuICAgIH1cbiAgICBpbml0Q291bnRyeSgpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5jb3VudHJ5RWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRlZmF1bHQnKTtcbiAgICAgICAgd2luZG93LlNob3BpZnkuc2V0U2VsZWN0b3JCeVZhbHVlKHRoaXMuY291bnRyeUVsLCB2YWx1ZSk7XG4gICAgICAgIHRoaXMuY291bnRyeUhhbmRsZXIoKTtcbiAgICB9XG4gICAgaW5pdFByb3ZpbmNlKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLnByb3ZpbmNlRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWRlZmF1bHQnKTtcbiAgICAgICAgaWYgKHZhbHVlICYmIHRoaXMucHJvdmluY2VFbC5vcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHdpbmRvdy5TaG9waWZ5LnNldFNlbGVjdG9yQnlWYWx1ZSh0aGlzLnByb3ZpbmNlRWwsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb3VudHJ5SGFuZGxlcihlKSB7XG4gICAgICAgIHZhciBvcHQgPSB0aGlzLmNvdW50cnlFbC5vcHRpb25zW3RoaXMuY291bnRyeUVsLnNlbGVjdGVkSW5kZXhdO1xuICAgICAgICB2YXIgcmF3ID0gb3B0LmdldEF0dHJpYnV0ZSgnZGF0YS1wcm92aW5jZXMnKTtcbiAgICAgICAgdmFyIHByb3ZpbmNlcyA9IEpTT04ucGFyc2UocmF3KTtcbiAgICAgICAgdGhpcy5jbGVhck9wdGlvbnModGhpcy5wcm92aW5jZUVsKTtcbiAgICAgICAgaWYgKHByb3ZpbmNlcyAmJiBwcm92aW5jZXMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHRoaXMucHJvdmluY2VDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvdmluY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICAgICAgICAgIG9wdC52YWx1ZSA9IHByb3ZpbmNlc1tpXVswXTtcbiAgICAgICAgICAgICAgICBvcHQuaW5uZXJIVE1MID0gcHJvdmluY2VzW2ldWzFdO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvdmluY2VFbC5hcHBlbmRDaGlsZChvcHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wcm92aW5jZUNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2xlYXJPcHRpb25zKHNlbGVjdG9yKSB7XG4gICAgICAgIHdoaWxlIChzZWxlY3Rvci5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBzZWxlY3Rvci5yZW1vdmVDaGlsZChzZWxlY3Rvci5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRPcHRpb25zKHNlbGVjdG9yLCB2YWx1ZXMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGNvdW50ID0gdmFsdWVzLmxlbmd0aDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIG9wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICAgICAgb3B0LnZhbHVlID0gdmFsdWVzW2ldO1xuICAgICAgICAgICAgb3B0LmlubmVySFRNTCA9IHZhbHVlc1tpXTtcbiAgICAgICAgICAgIHNlbGVjdG9yLmFwcGVuZENoaWxkKG9wdCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5jbGFzcyBTaG9waWZ5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5Db3VudHJ5UHJvdmluY2VTZWxlY3RvciA9IENvdW50cnlQcm92aW5jZVNlbGVjdG9yO1xuICAgIH1cbiAgICBiaW5kKGZuLCBzY29wZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHNjb3BlLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBzZXRTZWxlY3RvckJ5VmFsdWUoc2VsZWN0b3IsIHZhbHVlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBjb3VudCA9IHNlbGVjdG9yLm9wdGlvbnMubGVuZ3RoOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgdmFyIG9wdGlvbiA9IHNlbGVjdG9yLm9wdGlvbnNbaV07XG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gb3B0aW9uLnZhbHVlIHx8IHZhbHVlID09IG9wdGlvbi5pbm5lckhUTUwpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3Rvci5zZWxlY3RlZEluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBhZGRMaXN0ZW5lcih0YXJnZXQsIGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXJcbiAgICAgICAgICAgID8gdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBjYWxsYmFjaywgZmFsc2UpXG4gICAgICAgICAgICA6IHRhcmdldC5hdHRhY2hFdmVudCgnb24nICsgZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIHBvc3RMaW5rKHBhdGgsIG9wdGlvbnMsIGNiKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB2YXIgbWV0aG9kID0gb3B0aW9uc1snbWV0aG9kJ10gfHwgJ3Bvc3QnO1xuICAgICAgICB2YXIgcGFyYW1zID0gb3B0aW9uc1sncGFyYW1ldGVycyddIHx8IHt9O1xuICAgICAgICB2YXIgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICAgICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ21ldGhvZCcsIG1ldGhvZCk7XG4gICAgICAgIGZvcm0uc2V0QXR0cmlidXRlKCdhY3Rpb24nLCBwYXRoKTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHBhcmFtcykge1xuICAgICAgICAgICAgdmFyIGhpZGRlbkZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGhpZGRlbkZpZWxkLnNldEF0dHJpYnV0ZSgndHlwZScsICdoaWRkZW4nKTtcbiAgICAgICAgICAgIGhpZGRlbkZpZWxkLnNldEF0dHJpYnV0ZSgnbmFtZScsIGtleSk7XG4gICAgICAgICAgICBoaWRkZW5GaWVsZC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgcGFyYW1zW2tleV0pO1xuICAgICAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChoaWRkZW5GaWVsZCk7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb3JtKTtcbiAgICAgICAgZm9ybS5zdWJtaXQoKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChmb3JtKTtcbiAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICBjYigpO1xuICAgICAgICB9XG4gICAgfVxufVxud2luZG93LlNob3BpZnkgPSBuZXcgU2hvcGlmeSgpO1xuLy8gUG9saWNpZXNcbmNvbnN0IHBvbGljeV9jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hvcGlmeS1wb2xpY3lfX2NvbnRhaW5lcicpO1xuaWYgKHBvbGljeV9jb250YWluZXIpIHtcbiAgICBwb2xpY3lfY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RhYmxlJykuZm9yRWFjaCgodGFibGUpID0+IHtcbiAgICAgICAgY29uc3QgbmV3VGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbmV3VGFibGUuY2xhc3NMaXN0LmFkZCgncmVzcG9uc2l2ZS10YWJsZScpO1xuICAgICAgICB0YWJsZS5hcHBlbmQoKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhcHRpb24nKS5pbm5lclRleHQgPSAnLcK7JykpO1xuICAgICAgICBuZXdUYWJsZS5pbm5lckhUTUwgPSB0YWJsZS5vdXRlckhUTUw7XG4gICAgICAgIHRhYmxlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld1RhYmxlLCB0YWJsZSk7XG4gICAgfSk7XG59XG4iLCJjbGFzcyBNb2RhbCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jbG9zZUJ0bnMgPSBudWxsO1xuICAgICAgICB0aGlzLmlzT3BlbiA9IEJvb2xlYW4odGhpcy5nZXRBdHRyaWJ1dGUoJ29wZW4nKSk7XG4gICAgICAgIHRoaXMuaW5zZXJ0KHRoaXMuaW5uZXJIVE1MKTtcbiAgICB9XG4gICAgaW5zZXJ0KGNvbnRlbnQpIHtcbiAgICAgICAgdGhpcy5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZGlhbG9nXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJtb2RhbC1jbG9zZVwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiIGNsb3NlPlxuICAgICAgICAgICZ0aW1lcztcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgICR7Y29udGVudH1cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gICAgICAgIHRoaXMuY2xvc2VCdG5zID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b25bY2xvc2VdJyk7XG4gICAgfVxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgncm9sZScsICdkaWFsb2cnKTtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2FyaWEtbW9kYWwnLCAndHJ1ZScpO1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgICAgIHRoaXMuaXNPcGVuICYmIHRoaXMub3BlbigpO1xuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKSA9PiBlLnRhcmdldCA9PT0gdGhpcyAmJiB0aGlzLmNsb3NlKCkpO1xuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4gZS5rZXlDb2RlID09PSAyNyAmJiB0aGlzLmNsb3NlKCkpO1xuICAgICAgICB0aGlzLmNsb3NlQnRucy5mb3JFYWNoKChidG4pID0+IGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xvc2UuYmluZCh0aGlzKSkpO1xuICAgIH1cbiAgICBvcGVuKCkge1xuICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnLW9wZW4nKTtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnb3ZlcmZsb3c6IGhpZGRlbicpO1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuICAgIGNsb3NlKGUpIHtcbiAgICAgICAgaWYgKGUpXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnLW9wZW4nKTtcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgfVxufVxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjb21wb25lbnQtbW9kYWwnLCBNb2RhbCk7XG5jbGFzcyBPcGVuTW9kYWwgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RhcmdldCcpIHx8ICdjb21wb25lbnQtbW9kYWwnO1xuICAgICAgICB0aGlzLm1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnRhcmdldCk7XG4gICAgICAgIHRoaXMuYnV0dG9uID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcbiAgICB9XG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMubW9kYWwuaXNPcGVuID8gdGhpcy5tb2RhbC5jbG9zZSgpIDogdGhpcy5tb2RhbC5vcGVuKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnb3Blbi1tb2RhbCcsIE9wZW5Nb2RhbCk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gZnVuY3Rpb24ocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBjaHVua0lkcyA9IGRlZmVycmVkW2ldWzBdO1xuXHRcdHZhciBmbiA9IGRlZmVycmVkW2ldWzFdO1xuXHRcdHZhciBwcmlvcml0eSA9IGRlZmVycmVkW2ldWzJdO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeShmdW5jdGlvbihrZXkpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKTsgfSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJiYXNlXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gZnVuY3Rpb24oY2h1bmtJZCkgeyByZXR1cm4gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwOyB9O1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IGZ1bmN0aW9uKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSB7XG5cdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG5cdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG5cdHZhciBydW50aW1lID0gZGF0YVsyXTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKGZ1bmN0aW9uKGlkKSB7IHJldHVybiBpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwOyB9KSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtzaG9waWZ5X2NvcmVcIl0gPSBzZWxmW1wid2VicGFja0NodW5rc2hvcGlmeV9jb3JlXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yc1wiXSwgZnVuY3Rpb24oKSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc2NyaXB0cy9iYXNlLnRzXCIpOyB9KVxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzXCJdLCBmdW5jdGlvbigpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zdHlsZXMvYmFzZS5zY3NzXCIpOyB9KVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==