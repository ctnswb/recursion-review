// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // numbers
  if (obj === null) {
    return "null";
  } else if (typeof obj === 'string') {
      return '"' + obj + '"';
  } else if (Array.isArray(obj)) {
      var a = [];
      for (var i = 0 ; i < obj.length ; i++) {
        a.push(stringifyJSON(obj[i]));
      }
      return "[" + a.join() + "]";
  } else if (typeof obj === 'object') {
      var o = [];
      for (var key in obj) {
        if(typeof obj[key] === 'function' || typeof obj[key] === 'undefined') {
          continue;
        }
        o.push(stringifyJSON(key) + ':'+ stringifyJSON(obj[key]));
      }
      return "{" + o.join() + "}";
  } else {
      return '' + obj;
  }
};


