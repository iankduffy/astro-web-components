export class SearchFilters extends HTMLElement {
    inputs: NodeListOf<Element>;
    static get observedAttributes() {
      return ['name'];
    }
    static register(tagName) {
      if ("customElements" in window) {
        customElements.define(tagName, SearchFilters);
      }
    }

    constructor() {
      super();
      if (this.shadowRoot) {
        // A Declarative Shadow Root exists!
        // wire up event listeners, references, etc.:

      } else {
        // A Declarative Shadow Root doesn't exist.
        // Create a new shadow root and populate it:
        const shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `
        <style>
            :host {
                display: block;
            } 

            summary {
                cursor: pointer;
            }
        </style>
        <slot></slot>

    `;
      }
      this.inputs = this.querySelectorAll('input');
    }
  
    connectedCallback() {
      console.log()
      this.setUpInputs();
    }

    get name() {
      return this.getAttribute('name');
    }

    setUpInputs() {
      this.inputs.forEach((input) => {
        if (this.isToggled(input as HTMLInputElement)) {
          (input as HTMLInputElement).checked = true;
        }
        input.addEventListener('change', (e) => {
          this.updateUrlParams(e.target as HTMLInputElement)
        });
      })
    }

    isToggled(input: HTMLInputElement) { 
      if (!this.name) return;
      const urlParams = new URLSearchParams(window.location.search);
      const currentParms = urlParams.get(this.name) ?? ''
      return currentParms.split(',').includes(input.value);
    }

    updateUrlParams(input: HTMLInputElement) {
      if (!this.name) {
        return;
      }
      const urlParams = new URLSearchParams(window.location.search);
      let currentParms;
      currentParms = urlParams.get(this.name) ?? ''

      if (input.checked) {
        currentParms += `,${input.value}`
      } else {
        currentParms = currentParms.split(',').filter((value) => value !== input.value).join(',');
      }

      if (currentParms === '') {
        urlParams.delete(this.name);
      } else {
        if (currentParms) {
          urlParams.set(this.name, currentParms);
        }
      }

      window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
    }
  }
  
  // SearchFilters.register('search-filters');