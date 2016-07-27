var bodyParser = require( 'koa-bodyparser' );
var apiRouter = require( './router/api' );
var kstatic = require( 'koa-static' );
var ejs = require( 'koa-ejs' );
var path = require( 'path' );
var http = require( 'http' );
var koa = require( 'koa' );
var session = require('koa-session');
var config = require('./config');

var app = koa();
app.proxy = true;

process.title  = '';

ejs(app, {
  root: path.join( __dirname, 'views' ),
  viewExt: 'ejs',
  cache: false,
  layout: false,
  debug: true
});

app.use( session(app) );
app.use( kstatic( path.join(__dirname, '../public') ) );
app.use( bodyParser() );
app.use( apiRouter );

app.on('error', function(err){
  throw err;
})

app.listen( config.port, function(err){
  if(!err) console.log('Server start at http://localhost:%s', config.port)
  else throw err
} );

