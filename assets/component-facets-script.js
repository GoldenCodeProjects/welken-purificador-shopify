/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/components/facets.js":
/*!******************************************!*\
  !*** ./src/scripts/components/facets.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var dile_checkbox_dile_checkbox_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dile-checkbox/dile-checkbox.js */ "./node_modules/dile-checkbox/dile-checkbox.js");
/* harmony import */ var paper_range_slider_paper_range_slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! paper-range-slider/paper-range-slider */ "./node_modules/paper-range-slider/paper-range-slider.js");
/* harmony import */ var _mat3e_ux_stars__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mat3e-ux/stars */ "./node_modules/@mat3e-ux/stars/index.js");
/* harmony import */ var _utils_debounce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../utils/debounce */ "./src/scripts/utils/debounce.js");




const addListeners = () => {
    // Change inputs on checkbox change
    document.querySelectorAll('dile-checkbox[data-target]').forEach((checkbox) => checkbox.addEventListener('dile-checkbox-changed', (event) => {
        const checkbox = document.getElementById(event.target.dataset.target);
        checkbox.checked = event.detail;
    }));
    // Update inputs on change slider
    document
        .querySelector('paper-range-slider')
        .addEventListener('updateValues', (customEvent) => {
        const slider = customEvent.detail.this;
        document.getElementById(slider.dataset.inputMin).value = slider.valueMin;
        document.getElementById(slider.dataset.inputMax).value = slider.valueMax;
    });
};
class FacetFiltersForm extends HTMLElement {
    constructor() {
        super();
        this.onActiveFilterClick = this.onActiveFilterClick.bind(this);
        this.debouncedOnSubmit = (0,_utils_debounce__WEBPACK_IMPORTED_MODULE_3__.debounce)((event) => {
            event.preventDefault();
            this.onSubmitHandler(event);
        }, 500);
        const typeOfInputs = [
            'submit',
            'change',
            'input',
            'dile-checkbox-changed',
            'updateValues',
        ];
        typeOfInputs.forEach((type) => this.querySelector('form').addEventListener(type, this.debouncedOnSubmit.bind(this)));
        const facetWrapper = this.querySelector('#FacetsWrapperDesktop');
        if (facetWrapper)
            facetWrapper.addEventListener('keyup', onKeyUpEscape);
        const screen = matchMedia('(max-width: 993px)');
        screen.onchange = (event) => {
            if (event.matches) {
                document.getElementById('FacetFiltersForm').classList.add('-mobile');
            }
            else {
                document.getElementById('FacetFiltersForm').classList.remove('-mobile');
            }
        };
        if (document.documentElement.clientWidth <= 993) {
            document.getElementById('FacetFiltersForm').classList.add('-mobile');
        }
    }
    static setListeners() {
        const onHistoryChange = (event) => {
            const searchParams = event.state
                ? event.state.searchParams
                : FacetFiltersForm.searchParamsInitial;
            if (searchParams === FacetFiltersForm.searchParamsPrev)
                return;
            FacetFiltersForm.renderPage(searchParams, null, false);
        };
        window.addEventListener('popstate', onHistoryChange);
    }
    static toggleActiveFacets(disable = true) {
        document.querySelectorAll('.js-facet-remove').forEach((element) => {
            element.classList.toggle('disabled', disable);
        });
    }
    static renderPage(searchParams, event, updateURLHash = true) {
        FacetFiltersForm.searchParamsPrev = searchParams;
        const sections = FacetFiltersForm.getSections();
        const countContainer = document.getElementById('ProductCount');
        const countContainerDesktop = document.getElementById('ProductCountDesktop');
        document.getElementById('products-grid').classList.add('-loading');
        if (countContainer) {
            countContainer.classList.add('-loading');
        }
        if (countContainerDesktop) {
            countContainerDesktop.classList.add('-loading');
        }
        sections.forEach((section) => {
            const url = `${window.location.pathname}?section_id=${section.section}&${searchParams}`;
            const filterDataUrl = (element) => element.url === url;
            FacetFiltersForm.filterData.some(filterDataUrl)
                ? FacetFiltersForm.renderSectionFromCache(filterDataUrl, event)
                : FacetFiltersForm.renderSectionFromFetch(url, event);
        });
        if (updateURLHash)
            FacetFiltersForm.updateURLHash(searchParams);
    }
    static renderSectionFromFetch(url, event) {
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
            const html = responseText;
            FacetFiltersForm.filterData = [
                ...FacetFiltersForm.filterData,
                { html, url },
            ];
            FacetFiltersForm.renderFilters(html, event);
            FacetFiltersForm.renderProductGridContainer(html);
            FacetFiltersForm.renderProductCount(html);
            document.getElementById('products-grid').classList.remove('-loading');
        });
    }
    static renderSectionFromCache(filterDataUrl, event) {
        const html = FacetFiltersForm.filterData.find(filterDataUrl).html;
        FacetFiltersForm.renderFilters(html, event);
        FacetFiltersForm.renderProductGridContainer(html);
        FacetFiltersForm.renderProductCount(html);
        document.getElementById('products-grid').classList.remove('-loading');
    }
    static renderProductGridContainer(html) {
        document.getElementById('products-grid').innerHTML = new DOMParser()
            .parseFromString(html, 'text/html')
            .getElementById('products-grid').innerHTML;
    }
    static renderProductCount(html) {
        const count = new DOMParser()
            .parseFromString(html, 'text/html')
            .getElementById('ProductCount').innerHTML;
        const container = document.getElementById('ProductCount');
        const containerDesktop = document.getElementById('ProductCountDesktop');
        container.innerHTML = count;
        container.classList.remove('-loading');
        if (containerDesktop) {
            containerDesktop.innerHTML = count;
            containerDesktop.classList.remove(-'loading');
        }
    }
    static renderFilters(html, event) {
        const parsedHTML = new DOMParser().parseFromString(html, 'text/html');
        const facetDetailsElements = parsedHTML.querySelectorAll('#FacetFiltersForm .filter-group[input-type]');
        const matchesIndex = (element) => {
            const jsFilter = event
                ? event.target.closest('.filter-group[input-type]')
                : undefined;
            return jsFilter ? element.dataset.index === jsFilter.dataset.index : false;
        };
        const facetsToRender = Array.from(facetDetailsElements).filter((element) => !matchesIndex(element));
        const countsToRender = Array.from(facetDetailsElements).find(matchesIndex);
        facetsToRender.forEach((element) => {
            document.querySelector(`.filter-group[data-index="${element.dataset.index}"]`).innerHTML = element.innerHTML;
        });
        FacetFiltersForm.renderActiveFacets(parsedHTML);
        FacetFiltersForm.renderAdditionalElements(parsedHTML);
        addListeners();
        if (countsToRender)
            FacetFiltersForm.renderCounts(countsToRender, event.target.closest('.filter-group[input-type]'));
    }
    static renderActiveFacets(html) {
        const activeFacetElementSelectors = [
            '.active-filters',
            '.active-filters-mobile',
        ];
        activeFacetElementSelectors.forEach((selector) => {
            const activeFacetsElement = html.querySelector(selector);
            if (!activeFacetsElement)
                return;
            document.querySelector(selector).innerHTML = activeFacetsElement.innerHTML;
        });
        FacetFiltersForm.toggleActiveFacets(false);
    }
    static renderAdditionalElements(html) {
        const elementSelectors = ['.sorting'];
        elementSelectors.forEach((selector) => {
            if (!html.querySelector(selector))
                return;
            document.querySelector(selector).innerHTML =
                html.querySelector(selector).innerHTML;
        });
        //document.getElementById('FacetFiltersFormMobile').closest('menu-drawer').bindEvents();
    }
    static renderCounts(source, target) {
        const targetElements = target.querySelectorAll('.filter-group_summary-selected, .group-display_header');
        const sourceElements = source.querySelectorAll('.filter-group_summary-selected, .group-display_header');
        if (!targetElements || !sourceElements)
            return;
        Array.from(targetElements).forEach((element, index) => {
            element.outerHTML = sourceElements[index].outerHTML;
        });
    }
    static updateURLHash(searchParams) {
        history.pushState({ searchParams }, '', `${window.location.pathname}${searchParams && '?'.concat(searchParams)}`);
    }
    static getSections() {
        return [
            {
                section: document.getElementById('products-grid').dataset.id,
            },
        ];
    }
    onSubmitHandler(event) {
        const formData = new FormData(event.target.closest('form'));
        const searchParams = new URLSearchParams(formData).toString();
        FacetFiltersForm.renderPage(searchParams, event);
    }
    onActiveFilterClick(event) {
        event.preventDefault();
        FacetFiltersForm.toggleActiveFacets();
        const url = event.currentTarget.href.indexOf('?') == -1
            ? ''
            : event.currentTarget.href.slice(event.currentTarget.href.indexOf('?') + 1);
        FacetFiltersForm.renderPage(url);
    }
}
FacetFiltersForm.filterData = [];
FacetFiltersForm.searchParamsInitial = window.location.search.slice(1);
FacetFiltersForm.searchParamsPrev = window.location.search.slice(1);
customElements.define('facet-filters-form', FacetFiltersForm);
FacetFiltersForm.setListeners();
addListeners();
class openFilter extends HTMLElement {
    constructor() {
        super();
        this.button = this.querySelector('button');
        this.form = document.querySelector('facet-filters-form');
        this.button.addEventListener('click', this.open.bind(this));
    }
    open(event) {
        event.preventDefault();
        this.form.querySelector('form').classList.toggle('-open');
    }
}
customElements.define('open-filter', openFilter);
class FacetRemove extends HTMLElement {
    constructor() {
        super();
        this.querySelector('a').addEventListener('click', (event) => {
            event.preventDefault();
            const form = this.closest('facet-filters-form') ||
                document.querySelector('facet-filters-form');
            form.onActiveFilterClick(event);
        });
    }
}
customElements.define('facet-remove', FacetRemove);
class ViewType extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          gap: 0.5rem;
          position: relative;
          width: fit-content;
          height: auto;
          --color-btn-bg: rgba(0, 0, 0, 1);
          --color-btn-text: rgba(255, 255, 255, 1);
        }
        :host([hidden]) {
          display: none;
        }
      </style>
      <slot></slot>
    `;
        this.buttons = this.querySelectorAll('button');
        this.buttons.forEach((button) => button.addEventListener('click', this.onButtonClick.bind(this, button)));
    }
    onButtonClick(button, event) {
        event.preventDefault();
        this.buttons.forEach((button) => button.classList.remove('-active'));
        button.classList.add('-active');
        /** @type {string} */
        const viewType = button.dataset.viewType;
        this.changeGridType(viewType);
        this.saveViewType(viewType);
    }
    getViewType() {
        return localStorage.getItem('viewType') || 'grid';
    }
    saveViewType(viewType) {
        localStorage.setItem('viewType', viewType);
    }
    changeGridType(gridType) {
        if (gridType === 'grid') {
            this.setGridType();
        }
        else {
            this.setListType();
        }
    }
    setGridType() {
        document.querySelector('#products-grid').classList.add('-grid');
        document.querySelector('#products-grid').classList.remove('-list');
    }
    setListType() {
        document.querySelector('#products-grid').classList.remove('-grid');
        document.querySelector('#products-grid').classList.add('-list');
    }
    connectedCallback() {
        const actualType = this.getViewType();
        this.changeGridType(actualType);
        this.buttons.forEach((button) => button.dataset.viewType === actualType &&
            button.classList.add('-active'));
    }
}
customElements.define('view-type', ViewType);


/***/ }),

/***/ "./src/scripts/utils/debounce.js":
/*!***************************************!*\
  !*** ./src/scripts/utils/debounce.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "debounce": function() { return /* binding */ debounce; }
/* harmony export */ });
/**
 * This function is used to debounce any event.
 * A debounce function is a function that is called only once after a specified time.
 * You cant call the function immediately after it is debounced.
 * It will wait until the time has passed and then call the function.
 * @param {Function} fn Function to debounce
 * @param {*} wait Time to wait before calling function
 * @returns The debounced function
 */
function debounce(fn, wait) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), wait);
    };
}


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
/******/ 			"component-facets-script": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], function() { return __webpack_require__("./src/scripts/components/facets.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LWZhY2V0cy1zY3JpcHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXdDO0FBQ087QUFDdEI7QUFDc0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHlEQUFRO0FBQ3pDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHlCQUF5QixjQUFjLGdCQUFnQixHQUFHLGFBQWE7QUFDbEc7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsV0FBVztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRUFBZ0Usc0JBQXNCO0FBQ3RGLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSw0QkFBNEIsY0FBYyxTQUFTLHlCQUF5QixFQUFFLHlDQUF5QztBQUN2SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixjQUFjO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixRQUFRO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMxU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsVUFBVTtBQUNyQixXQUFXLEdBQUc7QUFDZDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNmQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsK0JBQStCLHdDQUF3QztXQUN2RTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDLG9IQUFvSCxpREFBaUQ7V0FDcks7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzdCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQSw4Q0FBOEM7O1dBRTlDO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsbUNBQW1DO1dBQ3BFO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVsREE7VUFDQTtVQUNBO1VBQ0EscUZBQXFGLG1FQUFtRTtVQUN4SiIsInNvdXJjZXMiOlsid2VicGFjazovL3Nob3BpZnktY29yZS8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvZmFjZXRzLmpzIiwid2VicGFjazovL3Nob3BpZnktY29yZS8uL3NyYy9zY3JpcHRzL3V0aWxzL2RlYm91bmNlLmpzIiwid2VicGFjazovL3Nob3BpZnktY29yZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zaG9waWZ5LWNvcmUvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9zaG9waWZ5LWNvcmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Nob3BpZnktY29yZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Nob3BpZnktY29yZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Nob3BpZnktY29yZS93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9zaG9waWZ5LWNvcmUvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9zaG9waWZ5LWNvcmUvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3Nob3BpZnktY29yZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdkaWxlLWNoZWNrYm94L2RpbGUtY2hlY2tib3guanMnO1xuaW1wb3J0ICdwYXBlci1yYW5nZS1zbGlkZXIvcGFwZXItcmFuZ2Utc2xpZGVyJztcbmltcG9ydCAnQG1hdDNlLXV4L3N0YXJzJztcbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAnLi8uLi91dGlscy9kZWJvdW5jZSc7XG5jb25zdCBhZGRMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gICAgLy8gQ2hhbmdlIGlucHV0cyBvbiBjaGVja2JveCBjaGFuZ2VcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdkaWxlLWNoZWNrYm94W2RhdGEtdGFyZ2V0XScpLmZvckVhY2goKGNoZWNrYm94KSA9PiBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdkaWxlLWNoZWNrYm94LWNoYW5nZWQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChldmVudC50YXJnZXQuZGF0YXNldC50YXJnZXQpO1xuICAgICAgICBjaGVja2JveC5jaGVja2VkID0gZXZlbnQuZGV0YWlsO1xuICAgIH0pKTtcbiAgICAvLyBVcGRhdGUgaW5wdXRzIG9uIGNoYW5nZSBzbGlkZXJcbiAgICBkb2N1bWVudFxuICAgICAgICAucXVlcnlTZWxlY3RvcigncGFwZXItcmFuZ2Utc2xpZGVyJylcbiAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ3VwZGF0ZVZhbHVlcycsIChjdXN0b21FdmVudCkgPT4ge1xuICAgICAgICBjb25zdCBzbGlkZXIgPSBjdXN0b21FdmVudC5kZXRhaWwudGhpcztcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2xpZGVyLmRhdGFzZXQuaW5wdXRNaW4pLnZhbHVlID0gc2xpZGVyLnZhbHVlTWluO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzbGlkZXIuZGF0YXNldC5pbnB1dE1heCkudmFsdWUgPSBzbGlkZXIudmFsdWVNYXg7XG4gICAgfSk7XG59O1xuY2xhc3MgRmFjZXRGaWx0ZXJzRm9ybSBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5vbkFjdGl2ZUZpbHRlckNsaWNrID0gdGhpcy5vbkFjdGl2ZUZpbHRlckNsaWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZGVib3VuY2VkT25TdWJtaXQgPSBkZWJvdW5jZSgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLm9uU3VibWl0SGFuZGxlcihldmVudCk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgICAgIGNvbnN0IHR5cGVPZklucHV0cyA9IFtcbiAgICAgICAgICAgICdzdWJtaXQnLFxuICAgICAgICAgICAgJ2NoYW5nZScsXG4gICAgICAgICAgICAnaW5wdXQnLFxuICAgICAgICAgICAgJ2RpbGUtY2hlY2tib3gtY2hhbmdlZCcsXG4gICAgICAgICAgICAndXBkYXRlVmFsdWVzJyxcbiAgICAgICAgXTtcbiAgICAgICAgdHlwZU9mSW5wdXRzLmZvckVhY2goKHR5cGUpID0+IHRoaXMucXVlcnlTZWxlY3RvcignZm9ybScpLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgdGhpcy5kZWJvdW5jZWRPblN1Ym1pdC5iaW5kKHRoaXMpKSk7XG4gICAgICAgIGNvbnN0IGZhY2V0V3JhcHBlciA9IHRoaXMucXVlcnlTZWxlY3RvcignI0ZhY2V0c1dyYXBwZXJEZXNrdG9wJyk7XG4gICAgICAgIGlmIChmYWNldFdyYXBwZXIpXG4gICAgICAgICAgICBmYWNldFdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBvbktleVVwRXNjYXBlKTtcbiAgICAgICAgY29uc3Qgc2NyZWVuID0gbWF0Y2hNZWRpYSgnKG1heC13aWR0aDogOTkzcHgpJyk7XG4gICAgICAgIHNjcmVlbi5vbmNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50Lm1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnRmFjZXRGaWx0ZXJzRm9ybScpLmNsYXNzTGlzdC5hZGQoJy1tb2JpbGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdGYWNldEZpbHRlcnNGb3JtJykuY2xhc3NMaXN0LnJlbW92ZSgnLW1vYmlsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIDw9IDk5Mykge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0ZhY2V0RmlsdGVyc0Zvcm0nKS5jbGFzc0xpc3QuYWRkKCctbW9iaWxlJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIHNldExpc3RlbmVycygpIHtcbiAgICAgICAgY29uc3Qgb25IaXN0b3J5Q2hhbmdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSBldmVudC5zdGF0ZVxuICAgICAgICAgICAgICAgID8gZXZlbnQuc3RhdGUuc2VhcmNoUGFyYW1zXG4gICAgICAgICAgICAgICAgOiBGYWNldEZpbHRlcnNGb3JtLnNlYXJjaFBhcmFtc0luaXRpYWw7XG4gICAgICAgICAgICBpZiAoc2VhcmNoUGFyYW1zID09PSBGYWNldEZpbHRlcnNGb3JtLnNlYXJjaFBhcmFtc1ByZXYpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgRmFjZXRGaWx0ZXJzRm9ybS5yZW5kZXJQYWdlKHNlYXJjaFBhcmFtcywgbnVsbCwgZmFsc2UpO1xuICAgICAgICB9O1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCBvbkhpc3RvcnlDaGFuZ2UpO1xuICAgIH1cbiAgICBzdGF0aWMgdG9nZ2xlQWN0aXZlRmFjZXRzKGRpc2FibGUgPSB0cnVlKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1mYWNldC1yZW1vdmUnKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2Rpc2FibGVkJywgZGlzYWJsZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdGF0aWMgcmVuZGVyUGFnZShzZWFyY2hQYXJhbXMsIGV2ZW50LCB1cGRhdGVVUkxIYXNoID0gdHJ1ZSkge1xuICAgICAgICBGYWNldEZpbHRlcnNGb3JtLnNlYXJjaFBhcmFtc1ByZXYgPSBzZWFyY2hQYXJhbXM7XG4gICAgICAgIGNvbnN0IHNlY3Rpb25zID0gRmFjZXRGaWx0ZXJzRm9ybS5nZXRTZWN0aW9ucygpO1xuICAgICAgICBjb25zdCBjb3VudENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdQcm9kdWN0Q291bnQnKTtcbiAgICAgICAgY29uc3QgY291bnRDb250YWluZXJEZXNrdG9wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1Byb2R1Y3RDb3VudERlc2t0b3AnKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2R1Y3RzLWdyaWQnKS5jbGFzc0xpc3QuYWRkKCctbG9hZGluZycpO1xuICAgICAgICBpZiAoY291bnRDb250YWluZXIpIHtcbiAgICAgICAgICAgIGNvdW50Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJy1sb2FkaW5nJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvdW50Q29udGFpbmVyRGVza3RvcCkge1xuICAgICAgICAgICAgY291bnRDb250YWluZXJEZXNrdG9wLmNsYXNzTGlzdC5hZGQoJy1sb2FkaW5nJyk7XG4gICAgICAgIH1cbiAgICAgICAgc2VjdGlvbnMuZm9yRWFjaCgoc2VjdGlvbikgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXJsID0gYCR7d2luZG93LmxvY2F0aW9uLnBhdGhuYW1lfT9zZWN0aW9uX2lkPSR7c2VjdGlvbi5zZWN0aW9ufSYke3NlYXJjaFBhcmFtc31gO1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyRGF0YVVybCA9IChlbGVtZW50KSA9PiBlbGVtZW50LnVybCA9PT0gdXJsO1xuICAgICAgICAgICAgRmFjZXRGaWx0ZXJzRm9ybS5maWx0ZXJEYXRhLnNvbWUoZmlsdGVyRGF0YVVybClcbiAgICAgICAgICAgICAgICA/IEZhY2V0RmlsdGVyc0Zvcm0ucmVuZGVyU2VjdGlvbkZyb21DYWNoZShmaWx0ZXJEYXRhVXJsLCBldmVudClcbiAgICAgICAgICAgICAgICA6IEZhY2V0RmlsdGVyc0Zvcm0ucmVuZGVyU2VjdGlvbkZyb21GZXRjaCh1cmwsIGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh1cGRhdGVVUkxIYXNoKVxuICAgICAgICAgICAgRmFjZXRGaWx0ZXJzRm9ybS51cGRhdGVVUkxIYXNoKHNlYXJjaFBhcmFtcyk7XG4gICAgfVxuICAgIHN0YXRpYyByZW5kZXJTZWN0aW9uRnJvbUZldGNoKHVybCwgZXZlbnQpIHtcbiAgICAgICAgZmV0Y2godXJsKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS50ZXh0KCkpXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2VUZXh0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBodG1sID0gcmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgRmFjZXRGaWx0ZXJzRm9ybS5maWx0ZXJEYXRhID0gW1xuICAgICAgICAgICAgICAgIC4uLkZhY2V0RmlsdGVyc0Zvcm0uZmlsdGVyRGF0YSxcbiAgICAgICAgICAgICAgICB7IGh0bWwsIHVybCB9LFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIEZhY2V0RmlsdGVyc0Zvcm0ucmVuZGVyRmlsdGVycyhodG1sLCBldmVudCk7XG4gICAgICAgICAgICBGYWNldEZpbHRlcnNGb3JtLnJlbmRlclByb2R1Y3RHcmlkQ29udGFpbmVyKGh0bWwpO1xuICAgICAgICAgICAgRmFjZXRGaWx0ZXJzRm9ybS5yZW5kZXJQcm9kdWN0Q291bnQoaHRtbCk7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZHVjdHMtZ3JpZCcpLmNsYXNzTGlzdC5yZW1vdmUoJy1sb2FkaW5nJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdGF0aWMgcmVuZGVyU2VjdGlvbkZyb21DYWNoZShmaWx0ZXJEYXRhVXJsLCBldmVudCkge1xuICAgICAgICBjb25zdCBodG1sID0gRmFjZXRGaWx0ZXJzRm9ybS5maWx0ZXJEYXRhLmZpbmQoZmlsdGVyRGF0YVVybCkuaHRtbDtcbiAgICAgICAgRmFjZXRGaWx0ZXJzRm9ybS5yZW5kZXJGaWx0ZXJzKGh0bWwsIGV2ZW50KTtcbiAgICAgICAgRmFjZXRGaWx0ZXJzRm9ybS5yZW5kZXJQcm9kdWN0R3JpZENvbnRhaW5lcihodG1sKTtcbiAgICAgICAgRmFjZXRGaWx0ZXJzRm9ybS5yZW5kZXJQcm9kdWN0Q291bnQoaHRtbCk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9kdWN0cy1ncmlkJykuY2xhc3NMaXN0LnJlbW92ZSgnLWxvYWRpbmcnKTtcbiAgICB9XG4gICAgc3RhdGljIHJlbmRlclByb2R1Y3RHcmlkQ29udGFpbmVyKGh0bWwpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2R1Y3RzLWdyaWQnKS5pbm5lckhUTUwgPSBuZXcgRE9NUGFyc2VyKClcbiAgICAgICAgICAgIC5wYXJzZUZyb21TdHJpbmcoaHRtbCwgJ3RleHQvaHRtbCcpXG4gICAgICAgICAgICAuZ2V0RWxlbWVudEJ5SWQoJ3Byb2R1Y3RzLWdyaWQnKS5pbm5lckhUTUw7XG4gICAgfVxuICAgIHN0YXRpYyByZW5kZXJQcm9kdWN0Q291bnQoaHRtbCkge1xuICAgICAgICBjb25zdCBjb3VudCA9IG5ldyBET01QYXJzZXIoKVxuICAgICAgICAgICAgLnBhcnNlRnJvbVN0cmluZyhodG1sLCAndGV4dC9odG1sJylcbiAgICAgICAgICAgIC5nZXRFbGVtZW50QnlJZCgnUHJvZHVjdENvdW50JykuaW5uZXJIVE1MO1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnUHJvZHVjdENvdW50Jyk7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckRlc2t0b3AgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnUHJvZHVjdENvdW50RGVza3RvcCcpO1xuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gY291bnQ7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCctbG9hZGluZycpO1xuICAgICAgICBpZiAoY29udGFpbmVyRGVza3RvcCkge1xuICAgICAgICAgICAgY29udGFpbmVyRGVza3RvcC5pbm5lckhUTUwgPSBjb3VudDtcbiAgICAgICAgICAgIGNvbnRhaW5lckRlc2t0b3AuY2xhc3NMaXN0LnJlbW92ZSgtJ2xvYWRpbmcnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgcmVuZGVyRmlsdGVycyhodG1sLCBldmVudCkge1xuICAgICAgICBjb25zdCBwYXJzZWRIVE1MID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhodG1sLCAndGV4dC9odG1sJyk7XG4gICAgICAgIGNvbnN0IGZhY2V0RGV0YWlsc0VsZW1lbnRzID0gcGFyc2VkSFRNTC5xdWVyeVNlbGVjdG9yQWxsKCcjRmFjZXRGaWx0ZXJzRm9ybSAuZmlsdGVyLWdyb3VwW2lucHV0LXR5cGVdJyk7XG4gICAgICAgIGNvbnN0IG1hdGNoZXNJbmRleCA9IChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBqc0ZpbHRlciA9IGV2ZW50XG4gICAgICAgICAgICAgICAgPyBldmVudC50YXJnZXQuY2xvc2VzdCgnLmZpbHRlci1ncm91cFtpbnB1dC10eXBlXScpXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICByZXR1cm4ganNGaWx0ZXIgPyBlbGVtZW50LmRhdGFzZXQuaW5kZXggPT09IGpzRmlsdGVyLmRhdGFzZXQuaW5kZXggOiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZmFjZXRzVG9SZW5kZXIgPSBBcnJheS5mcm9tKGZhY2V0RGV0YWlsc0VsZW1lbnRzKS5maWx0ZXIoKGVsZW1lbnQpID0+ICFtYXRjaGVzSW5kZXgoZWxlbWVudCkpO1xuICAgICAgICBjb25zdCBjb3VudHNUb1JlbmRlciA9IEFycmF5LmZyb20oZmFjZXREZXRhaWxzRWxlbWVudHMpLmZpbmQobWF0Y2hlc0luZGV4KTtcbiAgICAgICAgZmFjZXRzVG9SZW5kZXIuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmZpbHRlci1ncm91cFtkYXRhLWluZGV4PVwiJHtlbGVtZW50LmRhdGFzZXQuaW5kZXh9XCJdYCkuaW5uZXJIVE1MID0gZWxlbWVudC5pbm5lckhUTUw7XG4gICAgICAgIH0pO1xuICAgICAgICBGYWNldEZpbHRlcnNGb3JtLnJlbmRlckFjdGl2ZUZhY2V0cyhwYXJzZWRIVE1MKTtcbiAgICAgICAgRmFjZXRGaWx0ZXJzRm9ybS5yZW5kZXJBZGRpdGlvbmFsRWxlbWVudHMocGFyc2VkSFRNTCk7XG4gICAgICAgIGFkZExpc3RlbmVycygpO1xuICAgICAgICBpZiAoY291bnRzVG9SZW5kZXIpXG4gICAgICAgICAgICBGYWNldEZpbHRlcnNGb3JtLnJlbmRlckNvdW50cyhjb3VudHNUb1JlbmRlciwgZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5maWx0ZXItZ3JvdXBbaW5wdXQtdHlwZV0nKSk7XG4gICAgfVxuICAgIHN0YXRpYyByZW5kZXJBY3RpdmVGYWNldHMoaHRtbCkge1xuICAgICAgICBjb25zdCBhY3RpdmVGYWNldEVsZW1lbnRTZWxlY3RvcnMgPSBbXG4gICAgICAgICAgICAnLmFjdGl2ZS1maWx0ZXJzJyxcbiAgICAgICAgICAgICcuYWN0aXZlLWZpbHRlcnMtbW9iaWxlJyxcbiAgICAgICAgXTtcbiAgICAgICAgYWN0aXZlRmFjZXRFbGVtZW50U2VsZWN0b3JzLmZvckVhY2goKHNlbGVjdG9yKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhY3RpdmVGYWNldHNFbGVtZW50ID0gaHRtbC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGlmICghYWN0aXZlRmFjZXRzRWxlbWVudClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKS5pbm5lckhUTUwgPSBhY3RpdmVGYWNldHNFbGVtZW50LmlubmVySFRNTDtcbiAgICAgICAgfSk7XG4gICAgICAgIEZhY2V0RmlsdGVyc0Zvcm0udG9nZ2xlQWN0aXZlRmFjZXRzKGZhbHNlKTtcbiAgICB9XG4gICAgc3RhdGljIHJlbmRlckFkZGl0aW9uYWxFbGVtZW50cyhodG1sKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRTZWxlY3RvcnMgPSBbJy5zb3J0aW5nJ107XG4gICAgICAgIGVsZW1lbnRTZWxlY3RvcnMuZm9yRWFjaCgoc2VsZWN0b3IpID0+IHtcbiAgICAgICAgICAgIGlmICghaHRtbC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKS5pbm5lckhUTUwgPVxuICAgICAgICAgICAgICAgIGh0bWwucXVlcnlTZWxlY3RvcihzZWxlY3RvcikuaW5uZXJIVE1MO1xuICAgICAgICB9KTtcbiAgICAgICAgLy9kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnRmFjZXRGaWx0ZXJzRm9ybU1vYmlsZScpLmNsb3Nlc3QoJ21lbnUtZHJhd2VyJykuYmluZEV2ZW50cygpO1xuICAgIH1cbiAgICBzdGF0aWMgcmVuZGVyQ291bnRzKHNvdXJjZSwgdGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnRzID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5maWx0ZXItZ3JvdXBfc3VtbWFyeS1zZWxlY3RlZCwgLmdyb3VwLWRpc3BsYXlfaGVhZGVyJyk7XG4gICAgICAgIGNvbnN0IHNvdXJjZUVsZW1lbnRzID0gc291cmNlLnF1ZXJ5U2VsZWN0b3JBbGwoJy5maWx0ZXItZ3JvdXBfc3VtbWFyeS1zZWxlY3RlZCwgLmdyb3VwLWRpc3BsYXlfaGVhZGVyJyk7XG4gICAgICAgIGlmICghdGFyZ2V0RWxlbWVudHMgfHwgIXNvdXJjZUVsZW1lbnRzKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBBcnJheS5mcm9tKHRhcmdldEVsZW1lbnRzKS5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudC5vdXRlckhUTUwgPSBzb3VyY2VFbGVtZW50c1tpbmRleF0ub3V0ZXJIVE1MO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIHVwZGF0ZVVSTEhhc2goc2VhcmNoUGFyYW1zKSB7XG4gICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHsgc2VhcmNoUGFyYW1zIH0sICcnLCBgJHt3aW5kb3cubG9jYXRpb24ucGF0aG5hbWV9JHtzZWFyY2hQYXJhbXMgJiYgJz8nLmNvbmNhdChzZWFyY2hQYXJhbXMpfWApO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0U2VjdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VjdGlvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2R1Y3RzLWdyaWQnKS5kYXRhc2V0LmlkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXTtcbiAgICB9XG4gICAgb25TdWJtaXRIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGV2ZW50LnRhcmdldC5jbG9zZXN0KCdmb3JtJykpO1xuICAgICAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKGZvcm1EYXRhKS50b1N0cmluZygpO1xuICAgICAgICBGYWNldEZpbHRlcnNGb3JtLnJlbmRlclBhZ2Uoc2VhcmNoUGFyYW1zLCBldmVudCk7XG4gICAgfVxuICAgIG9uQWN0aXZlRmlsdGVyQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgRmFjZXRGaWx0ZXJzRm9ybS50b2dnbGVBY3RpdmVGYWNldHMoKTtcbiAgICAgICAgY29uc3QgdXJsID0gZXZlbnQuY3VycmVudFRhcmdldC5ocmVmLmluZGV4T2YoJz8nKSA9PSAtMVxuICAgICAgICAgICAgPyAnJ1xuICAgICAgICAgICAgOiBldmVudC5jdXJyZW50VGFyZ2V0LmhyZWYuc2xpY2UoZXZlbnQuY3VycmVudFRhcmdldC5ocmVmLmluZGV4T2YoJz8nKSArIDEpO1xuICAgICAgICBGYWNldEZpbHRlcnNGb3JtLnJlbmRlclBhZ2UodXJsKTtcbiAgICB9XG59XG5GYWNldEZpbHRlcnNGb3JtLmZpbHRlckRhdGEgPSBbXTtcbkZhY2V0RmlsdGVyc0Zvcm0uc2VhcmNoUGFyYW1zSW5pdGlhbCA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc2xpY2UoMSk7XG5GYWNldEZpbHRlcnNGb3JtLnNlYXJjaFBhcmFtc1ByZXYgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnNsaWNlKDEpO1xuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdmYWNldC1maWx0ZXJzLWZvcm0nLCBGYWNldEZpbHRlcnNGb3JtKTtcbkZhY2V0RmlsdGVyc0Zvcm0uc2V0TGlzdGVuZXJzKCk7XG5hZGRMaXN0ZW5lcnMoKTtcbmNsYXNzIG9wZW5GaWx0ZXIgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYnV0dG9uID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcbiAgICAgICAgdGhpcy5mb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZmFjZXQtZmlsdGVycy1mb3JtJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vcGVuLmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBvcGVuKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yKCdmb3JtJykuY2xhc3NMaXN0LnRvZ2dsZSgnLW9wZW4nKTtcbiAgICB9XG59XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ29wZW4tZmlsdGVyJywgb3BlbkZpbHRlcik7XG5jbGFzcyBGYWNldFJlbW92ZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5xdWVyeVNlbGVjdG9yKCdhJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBmb3JtID0gdGhpcy5jbG9zZXN0KCdmYWNldC1maWx0ZXJzLWZvcm0nKSB8fFxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2ZhY2V0LWZpbHRlcnMtZm9ybScpO1xuICAgICAgICAgICAgZm9ybS5vbkFjdGl2ZUZpbHRlckNsaWNrKGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdmYWNldC1yZW1vdmUnLCBGYWNldFJlbW92ZSk7XG5jbGFzcyBWaWV3VHlwZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG4gICAgICAgIHRoaXMuc2hhZG93Um9vdC5pbm5lckhUTUwgPSBgXG4gICAgICA8c3R5bGU+XG4gICAgICAgIDpob3N0IHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGdhcDogMC41cmVtO1xuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICB3aWR0aDogZml0LWNvbnRlbnQ7XG4gICAgICAgICAgaGVpZ2h0OiBhdXRvO1xuICAgICAgICAgIC0tY29sb3ItYnRuLWJnOiByZ2JhKDAsIDAsIDAsIDEpO1xuICAgICAgICAgIC0tY29sb3ItYnRuLXRleHQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgOmhvc3QoW2hpZGRlbl0pIHtcbiAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICB9XG4gICAgICA8L3N0eWxlPlxuICAgICAgPHNsb3Q+PC9zbG90PlxuICAgIGA7XG4gICAgICAgIHRoaXMuYnV0dG9ucyA9IHRoaXMucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25CdXR0b25DbGljay5iaW5kKHRoaXMsIGJ1dHRvbikpKTtcbiAgICB9XG4gICAgb25CdXR0b25DbGljayhidXR0b24sIGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IGJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCctYWN0aXZlJykpO1xuICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnLWFjdGl2ZScpO1xuICAgICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgICAgY29uc3Qgdmlld1R5cGUgPSBidXR0b24uZGF0YXNldC52aWV3VHlwZTtcbiAgICAgICAgdGhpcy5jaGFuZ2VHcmlkVHlwZSh2aWV3VHlwZSk7XG4gICAgICAgIHRoaXMuc2F2ZVZpZXdUeXBlKHZpZXdUeXBlKTtcbiAgICB9XG4gICAgZ2V0Vmlld1R5cGUoKSB7XG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndmlld1R5cGUnKSB8fCAnZ3JpZCc7XG4gICAgfVxuICAgIHNhdmVWaWV3VHlwZSh2aWV3VHlwZSkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndmlld1R5cGUnLCB2aWV3VHlwZSk7XG4gICAgfVxuICAgIGNoYW5nZUdyaWRUeXBlKGdyaWRUeXBlKSB7XG4gICAgICAgIGlmIChncmlkVHlwZSA9PT0gJ2dyaWQnKSB7XG4gICAgICAgICAgICB0aGlzLnNldEdyaWRUeXBlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldExpc3RUeXBlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0R3JpZFR5cGUoKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9kdWN0cy1ncmlkJykuY2xhc3NMaXN0LmFkZCgnLWdyaWQnKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3RzLWdyaWQnKS5jbGFzc0xpc3QucmVtb3ZlKCctbGlzdCcpO1xuICAgIH1cbiAgICBzZXRMaXN0VHlwZSgpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2R1Y3RzLWdyaWQnKS5jbGFzc0xpc3QucmVtb3ZlKCctZ3JpZCcpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvZHVjdHMtZ3JpZCcpLmNsYXNzTGlzdC5hZGQoJy1saXN0Jyk7XG4gICAgfVxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICBjb25zdCBhY3R1YWxUeXBlID0gdGhpcy5nZXRWaWV3VHlwZSgpO1xuICAgICAgICB0aGlzLmNoYW5nZUdyaWRUeXBlKGFjdHVhbFR5cGUpO1xuICAgICAgICB0aGlzLmJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiBidXR0b24uZGF0YXNldC52aWV3VHlwZSA9PT0gYWN0dWFsVHlwZSAmJlxuICAgICAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJy1hY3RpdmUnKSk7XG4gICAgfVxufVxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCd2aWV3LXR5cGUnLCBWaWV3VHlwZSk7XG4iLCIvKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBkZWJvdW5jZSBhbnkgZXZlbnQuXG4gKiBBIGRlYm91bmNlIGZ1bmN0aW9uIGlzIGEgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgb25seSBvbmNlIGFmdGVyIGEgc3BlY2lmaWVkIHRpbWUuXG4gKiBZb3UgY2FudCBjYWxsIHRoZSBmdW5jdGlvbiBpbW1lZGlhdGVseSBhZnRlciBpdCBpcyBkZWJvdW5jZWQuXG4gKiBJdCB3aWxsIHdhaXQgdW50aWwgdGhlIHRpbWUgaGFzIHBhc3NlZCBhbmQgdGhlbiBjYWxsIHRoZSBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGRlYm91bmNlXG4gKiBAcGFyYW0geyp9IHdhaXQgVGltZSB0byB3YWl0IGJlZm9yZSBjYWxsaW5nIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyBUaGUgZGVib3VuY2VkIGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWJvdW5jZShmbiwgd2FpdCkge1xuICAgIGxldCB0aW1lcjtcbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IGZuLmFwcGx5KHRoaXMsIGFyZ3MpLCB3YWl0KTtcbiAgICB9O1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IGZ1bmN0aW9uKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgY2h1bmtJZHMgPSBkZWZlcnJlZFtpXVswXTtcblx0XHR2YXIgZm4gPSBkZWZlcnJlZFtpXVsxXTtcblx0XHR2YXIgcHJpb3JpdHkgPSBkZWZlcnJlZFtpXVsyXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoZnVuY3Rpb24oa2V5KSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSk7IH0pKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJjb21wb25lbnQtZmFjZXRzLXNjcmlwdFwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IGZ1bmN0aW9uKGNodW5rSWQpIHsgcmV0dXJuIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMDsgfTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSBmdW5jdGlvbihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkge1xuXHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuXHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuXHR2YXIgcnVudGltZSA9IGRhdGFbMl07XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZShmdW5jdGlvbihpZCkgeyByZXR1cm4gaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMDsgfSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rc2hvcGlmeV9jb3JlXCJdID0gc2VsZltcIndlYnBhY2tDaHVua3Nob3BpZnlfY29yZVwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9yc1wiXSwgZnVuY3Rpb24oKSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL2ZhY2V0cy5qc1wiKTsgfSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=