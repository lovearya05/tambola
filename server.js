const express = require("express")
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

app.use("/sample", require("./controller/sample"))


app.listen(port, () => {
    console.log(`Listening to the port at ${port}`)
})