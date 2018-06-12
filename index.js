const express = require('express')
const app = express()

app.use(express.static('public'))

app.listen(8000, () => console.log('Timer server listening on: http://localhost:8000?time=300'))
