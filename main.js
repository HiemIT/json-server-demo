const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const queryString = require('query-string');
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
    req.body.updateAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})


router.render = (req, res) => {
// Check GET with pagination
// If yes, custom output
  console.log(res.query)
  const headers = res.getHeaders()

  const totalCountHeader = headers['x-total-count']
   
  if(req.method === 'GET' && totalCountHeader){
    const parsed = queryString.parse(req._parsedUrl.query);
    console.log(parsed._page)
    console.log(parsed._limit)

      
    const result ={
      data: res.locals.data,
      pagination: {
        _page: Number.parseInt(parsed._page),
        _limit: Number.parseInt(parsed._limit),
        _totalCount: Number.parseInt(totalCountHeader),
      }
    }

    return res.jsonp(result)
  }

  res.jsonp(res.locals.data)
}

// Use default router
server.use('/api',router)
const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log('JSON Server is running')
})