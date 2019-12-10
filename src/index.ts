//dependancies
import bodyparser = require('body-parser')
import session = require('express-session')
import path = require('path')
import express = require('express')
import user, {UserHandler} from './user'
import mongoAccess from './mongoAccess'
import { MetricsHandler, Metric } from './metrics'
const app = express();
const port: string = process.env.PORT || '8080'
const mgAccess: mongoAccess = new mongoAccess("mongodb://localhost:27017/")
const UserHd:UserHandler = new UserHandler(mgAccess)
const MetricHD: MetricsHandler = new MetricsHandler(mgAccess)
//public path for img, js and css
app.use(express.static(path.join(__dirname, '/../public')))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded())

//views path for response rendering
app.set('views', __dirname + "/../views")
app.set('view engine', 'ejs')


app.get('/', (req: any, res: any)  =>  {
  res.render('index', { name: 'Toto' })
})

app.get('/getUsers', (req: any, res: any)  => {
    UserHd.getUsers((err: Error | null, result: any) => {
    if (err) throw err
    res.json(result)
    //to give the response
    res.end()
   })
 })
 app.get('/getUser/:email', (req: any, res: any)  => {
  UserHd.getUser(req.params.email, (err: Error | null, result: any) => {
  if (err) throw err
  res.json(result)
  //to give the response
  res.end()
 })
})
 app.get('/getMetric/:id', (req: any, res: any)  => {
  MetricHD.getMetric(req.params.id, (err: Error | null, result: any) => {
  if (err) throw err
  res.json(result)
  //to give the response
  res.end()
 })
})
app.get('/getMetrics',(req: any, res: any)  => {
  MetricHD.getMetrics((err: Error | null, result: any) => {
    if (err) throw err
    res.json(result)
    //to give the response
    res.end()
   })
 })
app.listen(port, (err: Error) => {
  if (err) throw err
  console.log(`Server is running on http://localhost:${port}`)
})

