const express = require('express')
const app = express()
const userRouter = require('./routes/user')
const productsRouter = require('./routes/products')
const inventoryRouter = require('./routes/inventory')
const employeeRouter = require('./routes/employees')
const productionBatchesRouter = require('./routes/productionBatches')
app.use(express.json())

app.use('/user', userRouter)
app.use('/products', productsRouter)
app.use('/inventory', inventoryRouter)
app.use('/employee', employeeRouter)
app.use('/production-batches', productionBatchesRouter)

app.listen(4000,'localhost',() => {
    console.log('Server is Running on Port 4000')
})