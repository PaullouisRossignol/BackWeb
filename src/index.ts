//dependancies
import bodyparser = require('body-parser')
import session = require('express-session')
import path = require('path')
import express = require('express')

const app = express();
const port: string = process.env.PORT || '8080'

//public path for img, js and css
app.use(express.static(path.join(__dirname, '/../public')))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded())

//views path for response rendering
app.set('views', __dirname + "/../views")
app.set('view engine', 'ejs')


app.get('/', function(req, res, next) {
  res.render('index', { name: 'Toto' });
});

app.listen(port, (err: Error) => {
  if (err) throw err
  console.log(`Server is running on http://localhost:${port}`)
})

