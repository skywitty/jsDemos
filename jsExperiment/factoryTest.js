function A( name ){

  this.name = name;

}

function ObjectFactory(){

  var obj = {},

  Constructor = Array.prototype.shift.call( arguments );

  obj.__proto__ = typeof Constructor .prototype === 'number' ? Object.prototype : Constructor.prototype;

  var ret = Constructor.apply( obj, arguments );
  
  console.log(arguments);  

  return typeof ret === 'object' ? ret : obj;

}

var a = ObjectFactory( A, 'svenzeng' );

console.log ( a.name );  //svenzeng