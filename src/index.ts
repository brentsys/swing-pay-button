import {checkoutPageUrl, kashRequestServerEndpoint} from "./constants"
import {CreateRequestResponse, GraphQLResponse, PayRequest} from "./types"
import {GraphQLClient, gql} from 'graphql-request'

function requestPayment(event: any) {
  const {amountString, accountId} = this
  const amount = +amountString
  if (isNaN(amount)) {
    console.error("invalid amout value:", amountString)
    return
  }
  const transactionId = "xx112222"
  const pr: PayRequest = {amount, accountId, transactionId}
  generateKashRequest(pr)
    .then(id => {
      //console.log({id})
      location.href = checkoutPageUrl + `?id=${id}`
    })
    .catch(error => {
      alert(error)
    })
}

const mutation = gql`
  mutation MaskeKashRequest($params: RequestInput!) {
    createRequest(params: $params) {
      code
      success
      message
      id
    }
}
`


async function generateKashRequest(pr: PayRequest): Promise<string> {
  const graphQLClient = new GraphQLClient(kashRequestServerEndpoint)
  const result = await graphQLClient.request(mutation, {params: pr}) as CreateRequestResponse
  const response = result.createRequest
  if (!response.success) throw new Error(response.message)
  return response.id
}


(function () {
  const logoUrl = "https://storage.googleapis.com/kash_subdocs/sps/images/logo.png";
  const template = document.createElement('template');
  const innerHTML = `
  <!-- sample html for this button-->
  <div class="button" id="swing-pay-button">
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
  template.innerHTML = innerHTML;
  template.id = "pay-button"

  class HTMLPayButton extends HTMLElement {
    accountId?: string
    amountString?: string
    constructor() {
      super();
      this.attachShadow({mode: 'open'});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    getButton() {
      return this.shadowRoot.querySelector('#swing-pay-button')
    }

    getAccountId() {
      const button = this.getButton()
      return button.getAttribute("account-id")
    }

    connectedCallback() {
      this.accountId = this.getAttribute('data-account')
      this.amountString = this.getAttribute('data-amount')
      const button = this.getButton()
      button.addEventListener('click', requestPayment.bind(this))
    }

    disconnectedCallback() {
      console.info("===> disconnected callback")
      const button = this.getButton()
      button.removeEventListener('click', requestPayment.bind(this))
    }

  }

  window.customElements.define('swing-pay-button', HTMLPayButton);
})();
