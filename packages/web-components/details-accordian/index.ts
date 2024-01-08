export class DetailsAccordian extends HTMLElement {
    details: NodeListOf<HTMLDetailsElement>;
    static register(tagName) {
      if ("customElements" in window) {
        customElements.define(tagName, DetailsAccordian);
      }
    }

    constructor() {
      super();

      if (this.shadowRoot) {
        // A Declarative Shadow Root exists!
        // wire up event listeners, references, etc.:
        alert('shadow root exists')

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
        <slot id='slot'></slot>
    `;
        // alert('shadow root does not exist')
      }
      this.details = this.querySelectorAll('details');
    }
  
    connectedCallback() {
      // Start here...
      console.log(this.details)

      this.setUpDetails();
    }

    setUpDetails() {
      this.details.forEach((detail) => {
        detail.querySelector('summary')?.addEventListener('click', (e) => {
          this.details.forEach((detail) => {
            if (detail !== (e.target as Element)?.parentNode) {
              detail.removeAttribute('open');
            }
          });
        });
      });
    }
  }
  
// DetailsAccordian.register('details-accordian');