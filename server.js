'use strict'

const express = require('express')
const cors = require('cors')
const app = express()
const errorHandler = require('./error-handlers/500');
const errorHandler2 = require('./error-handlers/404');
const postRouter = require('./routes/post.route')
app.use(cors())
app.use(express.json())
app.use(postRouter)

app.get('/', (req, res) => {
res.status(200).json({
    message: 'Hello your in the homepage',
    code: '200'
})
})

app.use(errorHandler);
app.use(errorHandler2);
function start(port) {
    app.listen(port, () => console.log('listening on port ' + port))
}


module.exports = {
    start,
    app
};
