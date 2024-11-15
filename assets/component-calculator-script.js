/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/components/calculator.ts":
/*!**********************************************!*\
  !*** ./src/scripts/components/calculator.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var toolcool_range_slider_dist_plugins_tcrs_binding_labels_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! toolcool-range-slider/dist/plugins/tcrs-binding-labels.min.js */ "./node_modules/toolcool-range-slider/dist/plugins/tcrs-binding-labels.min.js");
/* harmony import */ var toolcool_range_slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! toolcool-range-slider */ "./node_modules/toolcool-range-slider/dist/toolcool-range-slider.min.js");


class CalculadoraAhorro {
    constructor(precioPorGarrafon, garrafonesPorSemana) {
        this.precioPorGarrafon = 45;
        this.garrafonesPorSemana = 10;
        // Constantes
        this.semanasPorAño = 52;
        this.mesesPorAño = 12;
        // Costos de los cartuchos
        this.costoCartuchoA = 1090; // Costo en pesos del cartucho que se cambia cada 6 meses
        this.costoCartuchoB = 1590; // Costo en pesos del cartucho que se cambia cada 19 meses
        // Frecuencias de reemplazo
        this.mesesEntreReemplazosA = 6;
        this.mesesEntreReemplazosB = 19;
        this.precioPorGarrafon = precioPorGarrafon;
        this.garrafonesPorSemana = garrafonesPorSemana;
    }
    get reemplazosAnualesA() {
        return this.mesesPorAño / this.mesesEntreReemplazosA;
    }
    get costoAnualA() {
        return this.costoCartuchoA * this.reemplazosAnualesA;
    }
    get reemplazosAnualesB() {
        return this.mesesPorAño / this.mesesEntreReemplazosB;
    }
    get costoAnualB() {
        return this.costoCartuchoB * this.reemplazosAnualesB;
    }
    get costoAnualPurificador() {
        return this.costoAnualA + this.costoAnualB;
    }
    get costoAnualGarrafones() {
        return this.precioPorGarrafon * this.garrafonesPorSemana * this.semanasPorAño;
    }
    calcularAhorroAnual() {
        // Verificar si el usuario estaría ahorrando
        if (this.costoAnualPurificador >= this.costoAnualGarrafones) {
            throw new Error('Con los datos ingresados, no estarías ahorrando dinero.');
        }
        // Cálculo del ahorro anual
        const ahorroAnual = this.costoAnualGarrafones - this.costoAnualPurificador;
        return ahorroAnual;
    }
}
class ComponentCalculator extends HTMLElement {
    constructor() {
        super();
        this.inputCostEl = document.getElementById('cost');
        this.quantityEl = document.querySelector('tc-range-slider#quantity');
        this.resultValueEl = document.querySelector('.result__value');
        this.precioPorGarrafon = this.inputCostEl.value ? Number(this.inputCostEl.value) : 45;
        this.garrafonesPorSemana = 10;
        this.handleInputCost = (event) => {
            const target = event.target;
            this.precioPorGarrafon = Number(target.value);
            this.calcularAhorro();
        };
        this.handleInputQuantity = (event) => {
            const value = event['detail'].value;
            this.garrafonesPorSemana = Number(value);
            this.calcularAhorro();
        };
    }
    connectedCallback() {
        this.inputCostEl.addEventListener('input', this.handleInputCost);
        this.quantityEl.addEventListener('change', this.handleInputQuantity);
        this.calcularAhorro();
    }
    numberToCurrency(value) {
        const roundedValue = Math.round(value);
        return roundedValue.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 0,
        });
    }
    calcularAhorro() {
        try {
            if (!this.precioPorGarrafon || !this.garrafonesPorSemana) {
                return this.resultValueEl.textContent = this.numberToCurrency(0);
            }
            const calculadora = new CalculadoraAhorro(this.precioPorGarrafon, this.garrafonesPorSemana);
            const ahorroAnual = calculadora.calcularAhorroAnual();
            this.resultValueEl.textContent = this.numberToCurrency(ahorroAnual);
        }
        catch (error) {
            this.resultValueEl.textContent = this.numberToCurrency(0);
        }
    }
}
customElements.define('component-calculator', ComponentCalculator);


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
/******/ 			"component-calculator-script": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], function() { return __webpack_require__("./src/scripts/components/calculator.ts"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LWNhbGN1bGF0b3Itc2NyaXB0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBdUU7QUFDeEM7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQyxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUM1RkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esa0JBQWtCLHFCQUFxQjtXQUN2QyxvSEFBb0gsaURBQWlEO1dBQ3JLO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0M3QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQSw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUEsOENBQThDOztXQUU5QztXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLG1DQUFtQztXQUNwRTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFbERBO1VBQ0E7VUFDQTtVQUNBLHFGQUFxRix1RUFBdUU7VUFDNUoiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaG9waWZ5LWNvcmUvLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL2NhbGN1bGF0b3IudHMiLCJ3ZWJwYWNrOi8vc2hvcGlmeS1jb3JlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Nob3BpZnktY29yZS93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL3Nob3BpZnktY29yZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2hvcGlmeS1jb3JlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc2hvcGlmeS1jb3JlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc2hvcGlmeS1jb3JlL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3Nob3BpZnktY29yZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3Nob3BpZnktY29yZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vc2hvcGlmeS1jb3JlL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3Rvb2xjb29sLXJhbmdlLXNsaWRlci9kaXN0L3BsdWdpbnMvdGNycy1iaW5kaW5nLWxhYmVscy5taW4uanMnO1xuaW1wb3J0ICd0b29sY29vbC1yYW5nZS1zbGlkZXInO1xuY2xhc3MgQ2FsY3VsYWRvcmFBaG9ycm8ge1xuICAgIGNvbnN0cnVjdG9yKHByZWNpb1BvckdhcnJhZm9uLCBnYXJyYWZvbmVzUG9yU2VtYW5hKSB7XG4gICAgICAgIHRoaXMucHJlY2lvUG9yR2FycmFmb24gPSA0NTtcbiAgICAgICAgdGhpcy5nYXJyYWZvbmVzUG9yU2VtYW5hID0gMTA7XG4gICAgICAgIC8vIENvbnN0YW50ZXNcbiAgICAgICAgdGhpcy5zZW1hbmFzUG9yQcOxbyA9IDUyO1xuICAgICAgICB0aGlzLm1lc2VzUG9yQcOxbyA9IDEyO1xuICAgICAgICAvLyBDb3N0b3MgZGUgbG9zIGNhcnR1Y2hvc1xuICAgICAgICB0aGlzLmNvc3RvQ2FydHVjaG9BID0gMTA5MDsgLy8gQ29zdG8gZW4gcGVzb3MgZGVsIGNhcnR1Y2hvIHF1ZSBzZSBjYW1iaWEgY2FkYSA2IG1lc2VzXG4gICAgICAgIHRoaXMuY29zdG9DYXJ0dWNob0IgPSAxNTkwOyAvLyBDb3N0byBlbiBwZXNvcyBkZWwgY2FydHVjaG8gcXVlIHNlIGNhbWJpYSBjYWRhIDE5IG1lc2VzXG4gICAgICAgIC8vIEZyZWN1ZW5jaWFzIGRlIHJlZW1wbGF6b1xuICAgICAgICB0aGlzLm1lc2VzRW50cmVSZWVtcGxhem9zQSA9IDY7XG4gICAgICAgIHRoaXMubWVzZXNFbnRyZVJlZW1wbGF6b3NCID0gMTk7XG4gICAgICAgIHRoaXMucHJlY2lvUG9yR2FycmFmb24gPSBwcmVjaW9Qb3JHYXJyYWZvbjtcbiAgICAgICAgdGhpcy5nYXJyYWZvbmVzUG9yU2VtYW5hID0gZ2FycmFmb25lc1BvclNlbWFuYTtcbiAgICB9XG4gICAgZ2V0IHJlZW1wbGF6b3NBbnVhbGVzQSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVzZXNQb3JBw7FvIC8gdGhpcy5tZXNlc0VudHJlUmVlbXBsYXpvc0E7XG4gICAgfVxuICAgIGdldCBjb3N0b0FudWFsQSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29zdG9DYXJ0dWNob0EgKiB0aGlzLnJlZW1wbGF6b3NBbnVhbGVzQTtcbiAgICB9XG4gICAgZ2V0IHJlZW1wbGF6b3NBbnVhbGVzQigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVzZXNQb3JBw7FvIC8gdGhpcy5tZXNlc0VudHJlUmVlbXBsYXpvc0I7XG4gICAgfVxuICAgIGdldCBjb3N0b0FudWFsQigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29zdG9DYXJ0dWNob0IgKiB0aGlzLnJlZW1wbGF6b3NBbnVhbGVzQjtcbiAgICB9XG4gICAgZ2V0IGNvc3RvQW51YWxQdXJpZmljYWRvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29zdG9BbnVhbEEgKyB0aGlzLmNvc3RvQW51YWxCO1xuICAgIH1cbiAgICBnZXQgY29zdG9BbnVhbEdhcnJhZm9uZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByZWNpb1BvckdhcnJhZm9uICogdGhpcy5nYXJyYWZvbmVzUG9yU2VtYW5hICogdGhpcy5zZW1hbmFzUG9yQcOxbztcbiAgICB9XG4gICAgY2FsY3VsYXJBaG9ycm9BbnVhbCgpIHtcbiAgICAgICAgLy8gVmVyaWZpY2FyIHNpIGVsIHVzdWFyaW8gZXN0YXLDrWEgYWhvcnJhbmRvXG4gICAgICAgIGlmICh0aGlzLmNvc3RvQW51YWxQdXJpZmljYWRvciA+PSB0aGlzLmNvc3RvQW51YWxHYXJyYWZvbmVzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbiBsb3MgZGF0b3MgaW5ncmVzYWRvcywgbm8gZXN0YXLDrWFzIGFob3JyYW5kbyBkaW5lcm8uJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ8OhbGN1bG8gZGVsIGFob3JybyBhbnVhbFxuICAgICAgICBjb25zdCBhaG9ycm9BbnVhbCA9IHRoaXMuY29zdG9BbnVhbEdhcnJhZm9uZXMgLSB0aGlzLmNvc3RvQW51YWxQdXJpZmljYWRvcjtcbiAgICAgICAgcmV0dXJuIGFob3Jyb0FudWFsO1xuICAgIH1cbn1cbmNsYXNzIENvbXBvbmVudENhbGN1bGF0b3IgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaW5wdXRDb3N0RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29zdCcpO1xuICAgICAgICB0aGlzLnF1YW50aXR5RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0Yy1yYW5nZS1zbGlkZXIjcXVhbnRpdHknKTtcbiAgICAgICAgdGhpcy5yZXN1bHRWYWx1ZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3VsdF9fdmFsdWUnKTtcbiAgICAgICAgdGhpcy5wcmVjaW9Qb3JHYXJyYWZvbiA9IHRoaXMuaW5wdXRDb3N0RWwudmFsdWUgPyBOdW1iZXIodGhpcy5pbnB1dENvc3RFbC52YWx1ZSkgOiA0NTtcbiAgICAgICAgdGhpcy5nYXJyYWZvbmVzUG9yU2VtYW5hID0gMTA7XG4gICAgICAgIHRoaXMuaGFuZGxlSW5wdXRDb3N0ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICB0aGlzLnByZWNpb1BvckdhcnJhZm9uID0gTnVtYmVyKHRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGFyQWhvcnJvKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaGFuZGxlSW5wdXRRdWFudGl0eSA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBldmVudFsnZGV0YWlsJ10udmFsdWU7XG4gICAgICAgICAgICB0aGlzLmdhcnJhZm9uZXNQb3JTZW1hbmEgPSBOdW1iZXIodmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhckFob3JybygpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5pbnB1dENvc3RFbC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHRoaXMuaGFuZGxlSW5wdXRDb3N0KTtcbiAgICAgICAgdGhpcy5xdWFudGl0eUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuaGFuZGxlSW5wdXRRdWFudGl0eSk7XG4gICAgICAgIHRoaXMuY2FsY3VsYXJBaG9ycm8oKTtcbiAgICB9XG4gICAgbnVtYmVyVG9DdXJyZW5jeSh2YWx1ZSkge1xuICAgICAgICBjb25zdCByb3VuZGVkVmFsdWUgPSBNYXRoLnJvdW5kKHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHJvdW5kZWRWYWx1ZS50b0xvY2FsZVN0cmluZygnZXMtTVgnLCB7XG4gICAgICAgICAgICBzdHlsZTogJ2N1cnJlbmN5JyxcbiAgICAgICAgICAgIGN1cnJlbmN5OiAnTVhOJyxcbiAgICAgICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNhbGN1bGFyQWhvcnJvKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnByZWNpb1BvckdhcnJhZm9uIHx8ICF0aGlzLmdhcnJhZm9uZXNQb3JTZW1hbmEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZXN1bHRWYWx1ZUVsLnRleHRDb250ZW50ID0gdGhpcy5udW1iZXJUb0N1cnJlbmN5KDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY2FsY3VsYWRvcmEgPSBuZXcgQ2FsY3VsYWRvcmFBaG9ycm8odGhpcy5wcmVjaW9Qb3JHYXJyYWZvbiwgdGhpcy5nYXJyYWZvbmVzUG9yU2VtYW5hKTtcbiAgICAgICAgICAgIGNvbnN0IGFob3Jyb0FudWFsID0gY2FsY3VsYWRvcmEuY2FsY3VsYXJBaG9ycm9BbnVhbCgpO1xuICAgICAgICAgICAgdGhpcy5yZXN1bHRWYWx1ZUVsLnRleHRDb250ZW50ID0gdGhpcy5udW1iZXJUb0N1cnJlbmN5KGFob3Jyb0FudWFsKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMucmVzdWx0VmFsdWVFbC50ZXh0Q29udGVudCA9IHRoaXMubnVtYmVyVG9DdXJyZW5jeSgwKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY29tcG9uZW50LWNhbGN1bGF0b3InLCBDb21wb25lbnRDYWxjdWxhdG9yKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSBmdW5jdGlvbihyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpIHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGNodW5rSWRzID0gZGVmZXJyZWRbaV1bMF07XG5cdFx0dmFyIGZuID0gZGVmZXJyZWRbaV1bMV07XG5cdFx0dmFyIHByaW9yaXR5ID0gZGVmZXJyZWRbaV1bMl07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pOyB9KSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiY29tcG9uZW50LWNhbGN1bGF0b3Itc2NyaXB0XCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gZnVuY3Rpb24oY2h1bmtJZCkgeyByZXR1cm4gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwOyB9O1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IGZ1bmN0aW9uKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSB7XG5cdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG5cdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG5cdHZhciBydW50aW1lID0gZGF0YVsyXTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKGZ1bmN0aW9uKGlkKSB7IHJldHVybiBpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwOyB9KSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtzaG9waWZ5X2NvcmVcIl0gPSBzZWxmW1wid2VicGFja0NodW5rc2hvcGlmeV9jb3JlXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzXCJdLCBmdW5jdGlvbigpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvY2FsY3VsYXRvci50c1wiKTsgfSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=