/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************************************!*\
  !*** ./src/scripts/components/video-link.ts ***!
  \**********************************************/
class VideoLink extends HTMLElement {
    constructor() {
        super();
        this.videoType = this.getAttribute('video-type');
        this.videoId = this.getAttribute('video-id');
        this.coverUrl = this.getAttribute('cover-url') || null;
        this.attachShadow({ mode: 'open' });
    }
    getTemplate() {
        const template = document.createElement('template');
        template.innerHTML = `
      <div class="preset">
        <slot name="btn"></slot>
        ${this.coverUrl
            ? `<img src="${this.coverUrl}">`
            : '<slot name="placeholder"></slot>'}
      </div>
      <div class="video -hide"></div>
      ${this.getStyles()}
    `;
        return template;
    }
    getStyles() {
        return `
      <style>
        :host {
          display: block;
          position: relative;
          width: 100%;
          height: 100%;
          --color-primary: #fff;
          --color-bg: #ccc;
        }

        .preset {
          position: relative;
          width: 100%;
          height: 100%;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        .preset.-hide {
          opacity: 0;
          visibility: hidden;
        }

        .preset img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          pointer-events: none;
          position: relative;
          filter: blur(7px) saturate(0.6);
          z-index: 1;
          transition: filter 0.3s ease-in-out;
        }

        ::slotted(button) {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: block;
          z-index: 3;
          color: var(--color-primary) !important;
          transition: transform 0.3s linear, opacity 0.3s ease;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background-color: var(--color-bg) !important;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0.8;
          box-shadow: 0 0 7px 1px black;
        }

        ::slotted(button:hover) {
          transform: translate(-50%, -50%) scale(1.1);
          opacity: 1;
        }

        .video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          transition: opacity 0.3s ease-in-out;
          pointer-events: none;
          background-color: black;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .video.-hide {
          opacity: 0;
          visibility: hidden;
        }

        .video iframe {
          width: 100%;
          aspect-ratio: 16/9;
          max-height: 80%;
          pointer-events: auto;
          border: none;
        }
      </style>
    `;
    }
    render() {
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    }
    connectedCallback() {
        this.render();
        this.events();
    }
    events() {
        this.shadowRoot
            .querySelector('slot[name="btn"]')
            .addEventListener('click', () => {
            this.shadowRoot.querySelector('.preset').classList.add('-hide');
            const video = this.shadowRoot.querySelector('.video');
            video.classList.remove('-hide');
            video.innerHTML =
                this.videoType === 'youtube'
                    ? `
        <iframe src="https://www.youtube.com/embed/${this.videoId}?enablejsapi=1" class="js-youtube" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      `
                    : `
        <iframe src="https://player.vimeo.com/video/${this.videoId}" class="js-vimeo" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      `;
        });
    }
}
customElements.define('video-link', VideoLink);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LXZpZGVvLWxpbmstc2NyaXB0LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGNBQWM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLDJCQUEyQixjQUFjO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELGFBQWEsb0RBQW9EO0FBQ3RIO0FBQ0E7QUFDQSxzREFBc0QsYUFBYSxvQ0FBb0M7QUFDdkc7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2hvcGlmeS1jb3JlLy4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy92aWRlby1saW5rLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFZpZGVvTGluayBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy52aWRlb1R5cGUgPSB0aGlzLmdldEF0dHJpYnV0ZSgndmlkZW8tdHlwZScpO1xuICAgICAgICB0aGlzLnZpZGVvSWQgPSB0aGlzLmdldEF0dHJpYnV0ZSgndmlkZW8taWQnKTtcbiAgICAgICAgdGhpcy5jb3ZlclVybCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdjb3Zlci11cmwnKSB8fCBudWxsO1xuICAgICAgICB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICB9XG4gICAgZ2V0VGVtcGxhdGUoKSB7XG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgICAgICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdiBjbGFzcz1cInByZXNldFwiPlxuICAgICAgICA8c2xvdCBuYW1lPVwiYnRuXCI+PC9zbG90PlxuICAgICAgICAke3RoaXMuY292ZXJVcmxcbiAgICAgICAgICAgID8gYDxpbWcgc3JjPVwiJHt0aGlzLmNvdmVyVXJsfVwiPmBcbiAgICAgICAgICAgIDogJzxzbG90IG5hbWU9XCJwbGFjZWhvbGRlclwiPjwvc2xvdD4nfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwidmlkZW8gLWhpZGVcIj48L2Rpdj5cbiAgICAgICR7dGhpcy5nZXRTdHlsZXMoKX1cbiAgICBgO1xuICAgICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgfVxuICAgIGdldFN0eWxlcygpIHtcbiAgICAgICAgcmV0dXJuIGBcbiAgICAgIDxzdHlsZT5cbiAgICAgICAgOmhvc3Qge1xuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgLS1jb2xvci1wcmltYXJ5OiAjZmZmO1xuICAgICAgICAgIC0tY29sb3ItYmc6ICNjY2M7XG4gICAgICAgIH1cblxuICAgICAgICAucHJlc2V0IHtcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcyBlYXNlLCB2aXNpYmlsaXR5IDAuM3MgZWFzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5wcmVzZXQuLWhpZGUge1xuICAgICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgICAgICB9XG5cbiAgICAgICAgLnByZXNldCBpbWcge1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICAgICAgICBvYmplY3QtcG9zaXRpb246IGNlbnRlcjtcbiAgICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgZmlsdGVyOiBibHVyKDdweCkgc2F0dXJhdGUoMC42KTtcbiAgICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgICAgIHRyYW5zaXRpb246IGZpbHRlciAwLjNzIGVhc2UtaW4tb3V0O1xuICAgICAgICB9XG5cbiAgICAgICAgOjpzbG90dGVkKGJ1dHRvbikge1xuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICB0b3A6IDUwJTtcbiAgICAgICAgICBsZWZ0OiA1MCU7XG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgei1pbmRleDogMztcbiAgICAgICAgICBjb2xvcjogdmFyKC0tY29sb3ItcHJpbWFyeSkgIWltcG9ydGFudDtcbiAgICAgICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBsaW5lYXIsIG9wYWNpdHkgMC4zcyBlYXNlO1xuICAgICAgICAgIHdpZHRoOiAxMjBweDtcbiAgICAgICAgICBoZWlnaHQ6IDEyMHB4O1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvci1iZykgIWltcG9ydGFudDtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgb3BhY2l0eTogMC44O1xuICAgICAgICAgIGJveC1zaGFkb3c6IDAgMCA3cHggMXB4IGJsYWNrO1xuICAgICAgICB9XG5cbiAgICAgICAgOjpzbG90dGVkKGJ1dHRvbjpob3Zlcikge1xuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDEuMSk7XG4gICAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC52aWRlbyB7XG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICB6LWluZGV4OiAyO1xuICAgICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcyBlYXNlLWluLW91dDtcbiAgICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICAudmlkZW8uLWhpZGUge1xuICAgICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgICAgICB9XG5cbiAgICAgICAgLnZpZGVvIGlmcmFtZSB7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgYXNwZWN0LXJhdGlvOiAxNi85O1xuICAgICAgICAgIG1heC1oZWlnaHQ6IDgwJTtcbiAgICAgICAgICBwb2ludGVyLWV2ZW50czogYXV0bztcbiAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgIH1cbiAgICAgIDwvc3R5bGU+XG4gICAgYDtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGhpcy5nZXRUZW1wbGF0ZSgpLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgICB9XG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIHRoaXMuZXZlbnRzKCk7XG4gICAgfVxuICAgIGV2ZW50cygpIHtcbiAgICAgICAgdGhpcy5zaGFkb3dSb290XG4gICAgICAgICAgICAucXVlcnlTZWxlY3Rvcignc2xvdFtuYW1lPVwiYnRuXCJdJylcbiAgICAgICAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0JykuY2xhc3NMaXN0LmFkZCgnLWhpZGUnKTtcbiAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy52aWRlbycpO1xuICAgICAgICAgICAgdmlkZW8uY2xhc3NMaXN0LnJlbW92ZSgnLWhpZGUnKTtcbiAgICAgICAgICAgIHZpZGVvLmlubmVySFRNTCA9XG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb1R5cGUgPT09ICd5b3V0dWJlJ1xuICAgICAgICAgICAgICAgICAgICA/IGBcbiAgICAgICAgPGlmcmFtZSBzcmM9XCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8ke3RoaXMudmlkZW9JZH0/ZW5hYmxlanNhcGk9MVwiIGNsYXNzPVwianMteW91dHViZVwiIGFsbG93PVwiYXV0b3BsYXk7IGVuY3J5cHRlZC1tZWRpYVwiIGFsbG93ZnVsbHNjcmVlbj48L2lmcmFtZT5cbiAgICAgIGBcbiAgICAgICAgICAgICAgICAgICAgOiBgXG4gICAgICAgIDxpZnJhbWUgc3JjPVwiaHR0cHM6Ly9wbGF5ZXIudmltZW8uY29tL3ZpZGVvLyR7dGhpcy52aWRlb0lkfVwiIGNsYXNzPVwianMtdmltZW9cIiBhbGxvdz1cImF1dG9wbGF5OyBlbmNyeXB0ZWQtbWVkaWFcIiBhbGxvd2Z1bGxzY3JlZW4+PC9pZnJhbWU+XG4gICAgICBgO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3ZpZGVvLWxpbmsnLCBWaWRlb0xpbmspO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9