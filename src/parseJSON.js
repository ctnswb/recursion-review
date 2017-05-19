// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {

  json = json.replace(/ /g, "");

  // " string
  if (json[0] === '"') {
    return json.substring(1,json.length-1);
  }

  // [ array // '[]'
  else if (json[0] === '[') {
    var results = [];
    var array = json.substring(1, json.length-1).split(',');
    for (var i = 0 ; i < array.length ; i++ ) {
      results.push(parseJSON(array[i]));
    }
    return results;
  }

  // { object
    else if (json[0] === '{') {
      var results = {};
      /*
      var object = json.substring(1, json.length-1).split(',');
      for (var i = 0 ; i < object.length ; i++) {
        var property = object[i].split(':');
        var propKey = property[0].substring(1, property[0].length-1); // substring(0, .LENGTH)
        var propVal = parseJSON(property[1]);
        results[propKey] = propVal;
      }
      */

      var first = json.split('"',2);
      var key = first[1].substring(1, first[0].length-1);
      var value = json.
      return results;
    }

  // number
  else if (isNaN(json) === false) {
    return + json;
  }

  // null
  else if (json === 'null'){
    return null;
  }

 // boolean
  else if (json === 'false'){
    return false;
  }

  else if (json === 'true'){
    return true;
  }


};
