import router from "../router.js";

export class SuccessComponent extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const template = document.querySelector("#success-template");
    const content = template.content.cloneNode(true);
    const styles = document.createElement("style");

    this.root.appendChild(styles);
    this.root.appendChild(content);

    this.loadCSS(styles);
  }

  async loadCSS(styles) {
    try {
      const request = await fetch("/src/components/SuccessComponent.css");
      if (request.ok) {
        styles.textContent = await request.text();
      }
    } catch (error) {
      console.error("Failed to fetch CSS:", error);
    }
  }

  render() {
    const dismissButton = this.root.querySelector(".success__content-button");

    this.clickListener = (event) => {
      event.preventDefault();
      router.go("newsletter");
    };

    dismissButton.addEventListener("click", this.clickListener);
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    const dismissButton = this.root.querySelector(".success__content-button");

    dismissButton.removeEventListener("click", this.clickListener);
  }
}

customElements.define("success-component", SuccessComponent);
