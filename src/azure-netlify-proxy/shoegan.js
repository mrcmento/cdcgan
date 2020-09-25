const { call } = require('file-loader');
const request = require('request');


exports.handler = function(event, context, callback) {

    const azureFuncUrl = 'https://shoegan.azurewebsites.net/api/shoegan?imageclass='

    const imageclass = event.queryStringParameters.imageclass

    if(!!imageclass) {
        switch (event.httpMethod) {
            case 'GET':
                request(azureFuncUrl + imageclass, (err, res, body) => {
                    if (err) {
                        callback("Azure Function not reachable")           
                    }
                    callback(null, {
                        statusCode: 200,
                        body: body
                        }
                    )
                });
                break
            default:
                callback("invalid call")
            }
    } else {
        callback("please provide imageclass")
    }
}