import express from 'express'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Router, Route, match, RouterContext } from 'react-router'
import routes from '../src/client/routes'

const app = express()

const DIST_DIR = path.resolve(__dirname + '/../dist')

app.use('/assets/', express.static(DIST_DIR + '/assets'))

app.get('*', function(req, res) {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    const body = renderToString(<RouterContext {...renderProps} />)
    res.send(`
      <!DOCTYPE html>
          <html>
            <head>
              <link href="//cdn.muicss.com/mui-0.6.5/css/mui.min.css" rel="stylesheet" type="text/css" />
            </head>
            <body>
              <div id="root">${body}</div>
              <script defer src="assets/app.js"></script>
            </body>
          </html>
          `)
  })
})

app.set('port', (process.env.PORT || 5000))

app.listen(app.get('port'), function() {
  console.log('Listening port ' + app.get('port'));
  console.log('You are in ' + process.env.NODE_ENV + ' environment');
});
