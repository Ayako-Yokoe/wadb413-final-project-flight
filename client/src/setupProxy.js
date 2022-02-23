const { createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app){
    app.use(
        ['api/v1', '/api/*'],
        // createProxyMiddleware({ target: "http://localhost:8080"})
        createProxyMiddleware({ target: "https://final-project-flight.herokuapp.com/"})
    )
}



// api/v1 or /api/v1
// /api/* or api/*