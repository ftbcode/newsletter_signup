const router = {
  init: () => {
    const root = document.querySelector("#root");
    const content = document.createElement("newsletter-component");

    root.appendChild(content);
  },
  go: (route) => {
    let pageElement = null;
    const root = document.querySelector("#root");

    switch (route) {
      case "success":
        pageElement = document.createElement("success-component");
        break;
      case "newsletter":
        pageElement = document.createElement("newsletter-component");
        break;
      default:
        pageElement = document.createElement("newsletter-component");
        break;
    }

    root.replaceChildren(pageElement);
  },
};

export default router;
