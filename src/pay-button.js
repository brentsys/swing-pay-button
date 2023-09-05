(function () {
  const logoUrl = "https://storage.googleapis.com/kash_subdocs/sps/images/logo.png";
  const template = document.createElement('template');
  const html2 = `
  <link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
  <!-- sample html for this button-->
  <div class="button">
    Pay with Swing
    <div></div>
    <i><img src="${logoUrl}" alt="buttonpng" border="0" /> </i>
  </div>
  <!-- stylesheet for this button -->
  <style type="text/css">
    .button {
      backface-visibility: hidden;
    position: relative;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    background: #237db0;
    border-radius: 500px;
    border: 0px solid #444;
    border-width: 0px 0px 0px 0px;
    padding: 16px 15px 18px 84px;
      color: #fff;
    font-size: 19px;
    font-family: Helvetica Neue;
    font-weight: 900;
    font-style: normal
    }
    .button > div {
      color: #999;
    font-size: 10px;
    font-family: Helvetica Neue;
    font-weight: initial;
    font-style: normal;
    text-align: center;
    margin: 0px 0px 0px 0px
    }
    .button > i > img {
      width: 48px
    }
    .button > i {
      color: #e21;
    font-size: 1em;
    background: #fff;
    border-radius: 500px;
    border: 0px solid transparent;
    border-width: 0px 0px 0px 0px;
    padding: 8px 8px 8px 8px;
    margin: 6px 6px 6px 6px;
    position: absolute;
    top: 0px;
    left: 0px
    }
    .button > .ld {
      font-size: initial
    }
  </style>
  `;
  template.innerHTML = html2;

  class PayButton extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  window.customElements.define('swing-pay-button', PayButton);
})();