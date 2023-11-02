// This prints out the contents of the payment token to the page.
document.addEventListener('DOMContentLoaded', function () {
    CollectJS.configure({
      'paymentType': 'cc',
      'callback': function (response) {
        document.getElementById("paymentTokenInfo").innerHTML =
          '<b>Payment Token:</b> ' + response.token +
          '<br><b>Card:</b> ' + response.card.number +
          '<br><b>BIN/EIN:</b> ' + response.card.bin +
          '<br><b>Expiration:</b> ' + response.card.exp +
          '<br><b>Hash:</b> ' + response.card.hash +
          '<br><b>Card Type:</b> ' + response.card.type +
          '<br><b>Check Account Name:</b> ' + response.check.name +
          '<br><b>Check Account Number:</b> ' + response.check.account +
          '<br><b>Check Account Hash:</b> ' + response.check.hash +
          '<br><b>Check Routing Number:</b> ' + response.check.aba;
      }
    });
  });