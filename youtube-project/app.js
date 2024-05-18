const express = require('express')
const app = express()

app.listen(7777)

const userRouter = require('./routes/user')
const channelRouter = require('./routes/channel')

app.use('/', userRouter)
app.use('/channels', channelRouter)