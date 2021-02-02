const mbHelper = require('./mountebank-helper');
const settings = require('./settings');

function addService() {
  const response_1 = { message: "hello world" }
  const response_2 = { message: "Results"}

  const stubs = [{
    predicates: [{
      equals: {
        method: "GET",
        "path": "/"
      },
    }],
    responses: [{
      is: {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(response_1)
      }
    }]
  },
  {
    predicates: [{
      equals: {
        method: "GET",
        "path": "/banks"
      },
    }],
    responses: [{
      is: {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(response_2)
      }
    }]
  }];

  const imposter = {
    port: settings.hello_service_port,
    protocol: 'http',
    stubs: stubs
  };
  return mbHelper.postImposter(imposter);
}
module.exports = { addService };
