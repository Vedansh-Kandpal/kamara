require("./db/connection")
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

const app = require('./app')







const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log(`App running on port ${port}.....`);
})

