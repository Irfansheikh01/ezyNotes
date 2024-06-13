const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();

const app = express()
const port = 5000

// app.use(cors(
//   {
//     origin: ["https://ezynotes.vercel.app"],
//     methods: ["POST", "GET"],
//     credentials: true
// }
// ))
app.use(express.json())

//Available Routs
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`EzyNotes backend listening at localhost: ${port}`)
})