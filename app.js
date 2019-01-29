const express = require('express')

const app = express()

// Everything in public can be access (example: http://localhost:3000/images/space1.jpg)
// Example:
app.use(express.static('public'))

// All the views are inside the folder '/views'
app.set('views', __dirname + '/views')
// Configure Express to have HBS as a view engine
app.set('view engine', 'hbs')


// Route: GET /
app.get('/', (req,res) => {
  let hour = new Date().getHours()
  let min = new Date().getMinutes()
  // Render '/views/index.hbs'
  //        '/views' => because of `app.set('views', __dirname + '/views')`
  //                    '.hbs' => because of `app.set('view engine', 'hbs')`
  res.render('index', {
    variable1: 'Test', // the views has a variable variable1
    variable2: 'The answer is <strong>42</strong>',  // the views has a variable variable2
    hour, // the same as `hour:hour`
    min,  // the same as `min:min`
    isMorning: hour <= 11,
    isAfternoon: hour >= 12 && hour <= 17,
    isEvening: hour >= 18,
  })
})

// Route: GET /about
app.get('/about', (req,res) => {
  res.render('about', {
    isConnected: true
    // layout: 'about-layout' // use the layout `about-layout.hbs`
  })
})

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}

// Route: GET /gallery
app.get('/gallery', (req,res) => {
  let pictures = ['space1','space2','space3','night1','night2']
  shuffle(pictures)
  res.render('gallery', {pictures:pictures})
})


// Launch the server on port 3000
app.listen(3000, () => {
  console.log("Server launched and accessible on http://localhost:3000/")
})