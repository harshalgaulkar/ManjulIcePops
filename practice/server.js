const express = require('express')
const app = express()
const userRouter = require('./routes/user')
const productsRouter = require('./routes/products')

app.use(express.json())

app.use('/user', userRouter)
app.use('/products', productsRouter)

app.listen(4000,'localhost',() => {
    console.log('Server is Running on Port 4000')
})