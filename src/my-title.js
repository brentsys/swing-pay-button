(function() {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      h1 {
        font-size: 2.5rem;
        color: hotpink;
        font-family: monospace;
        text-align: center;
        text-decoration: pink solid underline;
        text-decoration-skip: ink;
      }
    </style>
    <h1>Hello Alligator!</h1>
  `

  class MyTitle extends HTMLElement {
    constructor(){
      super()
      this.attachShadow({mode: 'open'})
      this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
  }

  window.customElements.define('my-title', MyTitle);
})();