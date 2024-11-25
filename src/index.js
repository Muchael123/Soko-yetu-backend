import express, { json, urlencoded } from 'express'
import authRoutes from './routes/auth/index.js'
import productsRoutes from './routes/products/index.js'
import multer from "multer";
import morgan from 'morgan';
import serverless from "serverless-http";

const upload = multer()
const app = express()
const port = 3000
const apiBasePath = '/api/v1'

app.use(json());
app.use(upload.any());
app.use(urlencoded({ extended: true }));
app.use(morgan('combined',{
  skip: function (req, res) { return res.statusCode === 400 }
}))




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(`${apiBasePath}/auth`, authRoutes)
app.use(`${apiBasePath}/products`, productsRoutes)

  
if (process.env.NODE_ENV === "dev") {
  app.listen(port, () => {
      console.log('App Running on port', port)
  });
}
export const handler = serverless(app);