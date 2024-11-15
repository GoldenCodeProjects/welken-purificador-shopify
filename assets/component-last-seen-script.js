/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************************************!*\
  !*** ./src/scripts/components/last-seen.js ***!
  \*********************************************/
if (localStorage.getItem('visited')) {
    document
        .querySelector('.shopify-section.last-seen')
        .classList.remove('u-hide');
    const lastSeen = JSON.parse(localStorage.getItem('visited')).last_seen.reverse();
    const urls = lastSeen.map((item) => `${item.url}?section_id=individual-product`);
    Promise.all(urls.map((url) => fetch(url)))
        .then((responses) => Promise.all(responses
        .filter((response) => response.ok)
        .map((response) => response.text())))
        .then((data) => data.map((item) => new DOMParser()
        .parseFromString(item, 'text/html')
        .querySelector('.c-product-card')))
        .then((productsTemplates) => {
        const container = document.getElementById('containerLastSeen');
        container.append(...productsTemplates);
    });
}
else {
    document.querySelector('.shopify-section.last-seen').remove();
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LWxhc3Qtc2Vlbi1zY3JpcHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLFNBQVM7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaG9waWZ5LWNvcmUvLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL2xhc3Qtc2Vlbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Zpc2l0ZWQnKSkge1xuICAgIGRvY3VtZW50XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKCcuc2hvcGlmeS1zZWN0aW9uLmxhc3Qtc2VlbicpXG4gICAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKCd1LWhpZGUnKTtcbiAgICBjb25zdCBsYXN0U2VlbiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Zpc2l0ZWQnKSkubGFzdF9zZWVuLnJldmVyc2UoKTtcbiAgICBjb25zdCB1cmxzID0gbGFzdFNlZW4ubWFwKChpdGVtKSA9PiBgJHtpdGVtLnVybH0/c2VjdGlvbl9pZD1pbmRpdmlkdWFsLXByb2R1Y3RgKTtcbiAgICBQcm9taXNlLmFsbCh1cmxzLm1hcCgodXJsKSA9PiBmZXRjaCh1cmwpKSlcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlcykgPT4gUHJvbWlzZS5hbGwocmVzcG9uc2VzXG4gICAgICAgIC5maWx0ZXIoKHJlc3BvbnNlKSA9PiByZXNwb25zZS5vaylcbiAgICAgICAgLm1hcCgocmVzcG9uc2UpID0+IHJlc3BvbnNlLnRleHQoKSkpKVxuICAgICAgICAudGhlbigoZGF0YSkgPT4gZGF0YS5tYXAoKGl0ZW0pID0+IG5ldyBET01QYXJzZXIoKVxuICAgICAgICAucGFyc2VGcm9tU3RyaW5nKGl0ZW0sICd0ZXh0L2h0bWwnKVxuICAgICAgICAucXVlcnlTZWxlY3RvcignLmMtcHJvZHVjdC1jYXJkJykpKVxuICAgICAgICAudGhlbigocHJvZHVjdHNUZW1wbGF0ZXMpID0+IHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lckxhc3RTZWVuJyk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmQoLi4ucHJvZHVjdHNUZW1wbGF0ZXMpO1xuICAgIH0pO1xufVxuZWxzZSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNob3BpZnktc2VjdGlvbi5sYXN0LXNlZW4nKS5yZW1vdmUoKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==