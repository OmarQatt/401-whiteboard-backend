'use strict'

const express = require('express')
const cors = require('cors')
const app = express()
const errorHandler = require('./error-handlers/500');
app.use(cors())


app.get('/', (req, res) => {
res.status(200).json({
    message: 'Hello your in the homepage',
    code: '200'
})
})

app.use(errorHandler);

function start(port) {
    app.listen(port, () => console.log('listening on port ' + port))
}


module.exports = {
    start
};
