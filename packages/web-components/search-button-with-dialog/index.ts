
export class SearchButtonWithDialog extends HTMLElement {
    button: HTMLButtonElement | null;
    dialog: HTMLDialogElement | null;
    static register(tagName) {
      if ("customElements" in window) {
        customElements.define(tagName, SearchButtonWithDialog);
      }
    }

    constructor() {
      super();
      this.button = this.querySelector('button');
      this.dialog = this.querySelector('dialog');
    }
  
    connectedCallback() {
      // Start here...
      this.button?.addEventListener('click', (e) => {this.dialog?.showModal()})
      this.dialog?.addEventListener('click', (e) => {this.closeDialog(e)}) 

    }

    closeDialog(e: Event) {
        if (e.target !== this.dialog?.children[0]) {
            this.dialog?.close()
        }
    }
  }
