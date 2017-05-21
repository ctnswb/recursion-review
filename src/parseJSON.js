//basic tests
var basicTests = [
  '[]',
  '{"foo": ""}',
  '{}',
  '{"foo": "bar"}',
  '["one", "two"]',
  '{"a": "b", "c": "d"}',
  '[null,false,true]',
  '{"foo": true, "bar": false, "baz": null}',
  '[1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999]',
  '{"boolean, true": true, "boolean, false": false, "null": null }'
  ];

//basic nesting
var basicNesting = [
  '{"a":{"b":"c"}}',
  '{"a":["b", "c"]}',
  '[{"a":"b"}, {"c":"d"}]',
  '{"a":[],"c": {}, "b": true}',
  '[[[["foo"]]]]',
  '{"a":[],"c": {"a": "b"}, "b": true}',
  '{"a":[],"c": {"a": [1 , 3, 4], "b": "c"}, "b": [{"a":"ethn"}, {"h":"aeua"}]}',
  '{ "a": "a1", "b" : "b1", "c" : 25, "d" : { "dd": "dd1", "ee" : "ee1", "ff" : "ff1", "gg" :  "gg1" }, "e": [ { "hh" : "hh1", "ii": "4" }, { "jj" : "jjj", "kk": "555-4567" } ] }'
  ];

//escaping
var escaping = [
  '["\\\\\\"\\"a\\""]',
  '["and you can\'t escape thi\s"]'
  ];


// everything
var everything = [
  '{"CoreletAPIVersion":2,"CoreletType":"standalone",' +
    '"documentation":"A corelet that provides the capability to upload' +
    ' a folderâ€™s contents into a userâ€™s locker.","functions":[' +
    '{"documentation":"Displays a dialog box that allows user to ' +
    'select a folder on the local system.","name":' +
    '"ShowBrowseDialog","parameters":[{"documentation":"The ' +
    'callback function for results.","name":"callback","required":' +
    'true,"type":"callback"}]},{"documentation":"Uploads all mp3 files' +
    ' in the folder provided.","name":"UploadFolder","parameters":' +
    '[{"documentation":"The path to upload mp3 files from."' +
    ',"name":"path","required":true,"type":"string"},{"documentation":' +
    ' "The callback function for progress.","name":"callback",' +
    '"required":true,"type":"callback"}]},{"documentation":"Returns' +
    ' the server name to the current locker service.",' +
    '"name":"GetLockerService","parameters":[]},{"documentation":' +
    '"Changes the name of the locker service.","name":"SetLockerSer' +
    'vice","parameters":[{"documentation":"The value of the locker' +
    ' service to set active.","name":"LockerService","required":true' +
    ',"type":"string"}]},{"documentation":"Downloads locker files to' +
    ' the suggested folder.","name":"DownloadFile","parameters":[{"' +
    'documentation":"The origin path of the locker file.",' +
    '"name":"path","required":true,"type":"string"},{"documentation"' +
    ':"The Window destination path of the locker file.",' +
    '"name":"destination","required":true,"type":"integer"},{"docum' +
    'entation":"The callback function for progress.","name":' +
    '"callback","required":true,"type":"callback"}]}],' +
    '"name":"LockerUploader","version":{"major":0,' +
    '"micro":1,"minor":0},"versionString":"0.0.1"}',

  '{ "firstName": "John", "lastName" : "Smith", "age" : ' +
    '25, "address" : { "streetAddress": "21 2nd Street", ' +
    '"city" : "New York", "state" : "NY", "postalCode" : ' +
    ' "10021" }, "phoneNumber": [ { "type" : "home", ' +
    '"number": "212 555-1234" }, { "type" : "fax", ' +
    '"number": "646 555-4567" } ] }',

  '{\r\n' +
    '          "glossary": {\n' +
    '              "title": "example glossary",\n\r' +
    '      \t\t"GlossDiv": {\r\n' +
    '                  "title": "S",\r\n' +
    '      \t\t\t"GlossList": {\r\n' +
    '                      "GlossEntry": {\r\n' +
    '                          "ID": "SGML",\r\n' +
    '      \t\t\t\t\t"SortAs": "SGML",\r\n' +
    '      \t\t\t\t\t"GlossTerm": "Standard Generalized ' +
    'Markup Language",\r\n' +
    '      \t\t\t\t\t"Acronym": "SGML",\r\n' +
    '      \t\t\t\t\t"Abbrev": "ISO 8879:1986",\r\n' +
    '      \t\t\t\t\t"GlossDef": {\r\n' +
    '                              "para": "A meta-markup language,' +
    ' used to create markup languages such as DocBook.",\r\n' +
    '      \t\t\t\t\t\t"GlossSeeAlso": ["GML", "XML"]\r\n' +
    '                          },\r\n' +
    '      \t\t\t\t\t"GlossSee": "markup"\r\n' +
    '                      }\r\n' +
    '                  }\r\n' +
    '              }\r\n' +
    '          }\r\n' +
    '      }\r\n'
  ];



var parseJSON = function(json) {  //this function returns an array of the split items to parse
  function splitOnSeparatingCommas () {
        var inQuote = false; // false means the character is not inside quotes
        var inBracket = 0; // value of 0 means the character is not inside a bracket
        var inCurly = 0; // value of 0 means the character is not inside a curly brace
        var commas = []; //indexes of all commas to separate json on
        for (var i = 1 ; i < json.length -1 ; i++) { //don't loop through the first and last {} or [])
          if (json[i] === ',') { // if the character is a comma
            if (!inQuote && inBracket === 0 && inCurly === 0 ) {
              //  if its not inside an expression, add the index to the commas array
              commas.push(i);
            }
          } else if (json[i] === '"') {
            inQuote = !inQuote;
          } else if (json[i] === '{') { // open bracket means its going inside
            inBracket++;
          } else if (json[i] === '}') { // close bracket means its leaving
            inBracket--;
          } else if (json[i] === '[') { //entering curly expression
            inCurly++;
          } else if (json[i] === ']') { //leaving curly expression
            inCurly--;
          }
        }
        var previousCommaIndex = 1;
        var splitObj = [];
        var pair = "";
        for (var i = 0 ; i < commas.length ; i++) {
          pair = json.substring(previousCommaIndex,commas[i]).trim();
          splitObj.push(pair);
          previousCommaIndex = commas[i]+1; //start next index after the comma
        }
        pair = json.substring(previousCommaIndex, json.length-1).trim(); // get the last pair to the end of json
        splitObj.push(pair);
        return splitObj;
      } // end of splitOnSeparatingCommas function
  if (json[0] === '{') {  // if its an object
    var results = {};
    if (json === '{}') { //returns an empty object
      return results;
    }
    var splitObj = splitOnSeparatingCommas();
    for (var i = 0 ; i < splitObj.length ; i++) { //split each pair into [key, value]
      var colonIndex = splitObj[i].indexOf(':'); //get index of first :
      var beforeColon = splitObj[i].substring(0, colonIndex).trim(); // get rid of extra white space before colon
      var key = beforeColon.substring(1,beforeColon.length-1); // get key from inside quotes
      var val = splitObj[i].substring(colonIndex+1, splitObj[i].length).trim();
      results[key] = parseJSON(val);
    }
    return results;
  }
  if (json[0] === '[') { // [ array // '[]'
    var results = [];
    if (json === '[]') { //returns an empty array
      return results;
    }
    var array = splitOnSeparatingCommas();
    for (var i = 0 ; i < array.length ; i++ ) {
      results.push(parseJSON(array[i].trim()));
    }
    return results;
  }
  else if (json[0] === '"') {  // " string
    return json.substring(1,json.length-1);
  }
  else if (isNaN(json) === false) {    // number
    return + json;
  }
  else if (json === 'null'){ //null
    return null;
  }
  else if (json === 'false'){ //boolean
    return false;
  }
  else if (json === 'true'){
    return true;
  }
};



console.log('Basic Tests:');
for (var i = 0 ; i < basicTests.length ; i++) {
  console.log("test "+i+": "+(JSON.stringify(JSON.parse(basicTests[i]))===JSON.stringify(parseJSON(basicTests[i]))));
}

console.log('Basic Nesting:');
for (var i = 0 ; i < basicNesting.length ; i++) {
  console.log('---------------------------');
  console.log("test "+i+": "+(JSON.stringify(JSON.parse(basicNesting[i]))===JSON.stringify(parseJSON(basicNesting[i]))));
}

console.log('Escaping:');
for (var i = 0 ; i < escaping.length ; i++) {
  console.log("test "+i+": "+(JSON.stringify(JSON.parse(escaping[i]))===JSON.stringify(parseJSON(escaping[i]))));
}

console.log('Everything:');
for (var i = 0 ; i < everything.length ; i++) {
  console.log("test "+i+": "+(JSON.stringify(JSON.parse(everything[i]))===JSON.stringify(parseJSON(everything[i]))));
}