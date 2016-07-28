
// Service Example
// -------------------
// just mock data

function random(min, max){
  return Math.floor(Math.random() * ( max - min + 1 )) + min;
}


var i = 0;
var instance = [];
while( (i++) < 1008 ) {
  instance.push({
    id: ''+i,
    name: 'instance ' + i,
    status: '正常',
    engine: 'MySQL 5.9',
    createTime: +new Date()
  })
}

instance.get = function(id){
  var found;
  instance.some(function( blog ){
    if( blog.id == id){
      found = blog
      return true
    }
  })
  return found
}


var limit = 20;

function getList( param ){
  var page =  parseInt(param.page || 1, 10);
  var offset = ( page -1) * limit;
  return Promise.resolve({
    page: page,
    total: instance.length,
    instance:instance.slice(offset, offset + limit),
    success: true,
    result: instance.slice(offset, offset + limit)
  })
}


function get( param ){
  return Promise.resolve( instance.get(param.id) )
}

function update( param ){
  var blog = instance.get( param.id );
  Object.assign(blog, param)

  blog.time = +new Date()

  return Promise.resolve( blog )

}

function create( param ){
  param.id = i++;
  param.time = +new Date();
  instance.unshift(param)
  if(instance.length > 2048) instance = instance.slice(0,2048);
  return Promise.resolve(  param  );
}

function remove( param ){
  var index = instance.indexOf( (blog) => blog.id == param.id )
  instance.splice( index, 1 );
  Promise.resolve( param );
}

module.exports = {
  getList: getList,
  get: get,
  update: update,
  remove: remove,
  create: create
}
