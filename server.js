const axios = require('axios')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('raboti')
})

app.listen(port, () => console.log(`server is running on port ${port}...`))


function pingServer() {
  let url = 'https://mojtermin.onrender.com'
  let randomNumber = Math.floor(Math.random() * 9 + 1)
  axios(url, { signal: AbortSignal.timeout(10000) })
    .then(res => {
      console.log(res.status, url, '- next in', randomNumber, 'mins')
      setTimeout(pingServer, 1000 * 60 * randomNumber)
    })
    .catch(err => {
      console.log(err.code, url, ' - next in', 1, 'min')
      setTimeout(pingServer, 60000)
    })
}

pingServer()