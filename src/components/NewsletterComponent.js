import router from "../router.js";

export class NewsletterComponent extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "open" });

    const template = document.querySelector("#newsletter-template");
    const content = template.content.cloneNode(true);
    const styles = document.createElement("style");

    this.root.appendChild(styles);
    this.root.appendChild(content);

    this.loadCSS(styles);
  }

  async loadCSS(styles) {
    try {
      const request = await fetch("./src/components/NewsletterComponent.css");
      if (request.ok) {
        styles.textContent = await request.text();
      }
    } catch (error) {
      console.error("Failed to fetch CSS:", error);
    }
  }

  render() {
    const inputField = this.root.querySelector(".main__content-email-input");
    const errorMessage = this.root.querySelector(".main__content-email-error");
    const newsletterButton = this.root.querySelector(".main__content-button");

    newsletterButton.disabled = true;

    this.inputListener = (event) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isEmailValid = emailRegex.test(event.target.value);

      if (!isEmailValid) {
        inputField.classList.add("main__content-email-input--error");
        errorMessage.classList.add("main__content-email-error--active");
      } else {
        inputField.classList.remove("main__content-email-input--error");
        errorMessage.classList.remove("main__content-email-error--active");
        newsletterButton.disabled = !isEmailValid;
      }
    };

    this.keypressListener = (event) => {
      if (event.key == "Enter" && !newsletterButton.disabled) {
        router.go("success");
      }
    };

    this.clickListener = (event) => {
      event.preventDefault();
      router.go("success");
    };

    inputField.addEventListener("input", this.inputListener);
    inputField.addEventListener("keypress", this.keypressListener);
    newsletterButton.addEventListener("click", this.clickListener);
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    const inputField = this.root.querySelector(".main__content-email-input");
    const newsletterButton = this.root.querySelector(".main__content-button");

    inputField.removeEventListener("input", this.inputListener);
    inputField.removeEventListener("keypress", this.keypressListener);
    newsletterButton.removeEventListener("click", this.clickListener);
  }
}

customElements.define("newsletter-component", NewsletterComponent);
