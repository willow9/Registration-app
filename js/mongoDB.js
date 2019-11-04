const webhookUrl =
  'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/mongocrud-bgxqf/service/http/incoming_webhook/';

function get() {
  return $.ajax({
    url: webhookUrl + 'getAll',
    dataType: 'json',
    type: 'get'
  });
}

function post(dataToSend) {
  return $.ajax({
    async: true,
    url: webhookUrl + 'addCustomer',
    dataType: 'json',
    type: 'POST',
    contentType: 'application/json',
    data: dataToSend
  });
}

function getId() {
  return $.ajax({
    url: webhookUrl + 'getId',
    dataType: 'json',
    type: 'GET',
    global: false,
    async: false,
    success: function(data) {
      return data;
    }
  }).responseText;
}

function put(dataToSend) {
  return $.ajax({
    url: webhookUrl + 'updateStatus',
    dataType: 'json',
    type: 'POST',
    contentType: 'application/json',
    data: dataToSend
  });
}
