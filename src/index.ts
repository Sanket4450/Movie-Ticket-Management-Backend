import dotenv from 'dotenv'
dotenv.config()

import app from './app'

const port = process.env.PORT || 9091

app.listen(port, () => {
  console.log(`Server is listening on PORT: ${port}`)
})
