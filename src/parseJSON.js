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
  '{"a":[1, 3],"c": {"aeu":[]}, "b": true}',
  '[[[["foo"]]]]'
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


var parseJSON = function(json) {

 if (json[0] === '{') {
      var results = {};

      //returns an empty object
      if (json === '{}'){
        return results;
      }

      //find first :
      var firstColonIndex = json.indexOf(':');

      if (json[firstColonIndex+1] === '{' ){
        // check for nested object
        var k = json.substring(2, firstColonIndex-1);
        var v = json.substring(firstColonIndex+1, json.length-1);
        results[k] = parseJSON(v);
      } else if (json[firstColonIndex+1] === '[' && json[json.length-2] === ']') {

        // check for nested array
        var k = json.substring(2, firstColonIndex-1);
        var v = json.substring(firstColonIndex+1, json.length-1);
        results[k] = parseJSON(v);
      } else {
        //no nesting here
        var splitObj = json.substring(1, json.length-1).split(/,"|,\s"/);
        for (var i = 0 ; i < splitObj.length ; i++) {
          //split each pair into [key, value]
          var pair = splitObj[i].split(':');
          var k;

          var v;
          //check for first quote
          if (pair[0][0] === '"'){
            //start at 1 index
            k = pair[0].substring(1, pair[0].length-1);
          } else {
            //start at 0 index
            k = pair[0].substring(0, pair[0].length-1);
          }
          v = pair[1].trim();
          //console.log('k:'+k);
          //console.log('v:'+v);
          results[k] = parseJSON(v);
        }

      }

      return results;
    }



  // [ array // '[]'
  if (json[0] === '[') {

    var results = [];

    //returns an empty array
    if (json === '[]') {
      return results;
    }

    var array = json.substring(1, json.length-1).split(',');
   // console.log('array:'+array);
    for (var i = 0 ; i < array.length ; i++ ) {
     //console.log('index'+i+':'+ array[i].trim());
      results.push(parseJSON(array[i].trim()));
    }
    //console.log(results);
    return results;
  }

  // " string
  else if (json[0] === '"') {
    return json.substring(1,json.length-1);
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


console.log('Basic Tests:');
for (var i = 0 ; i < basicTests.length ; i++) {
  console.log("test "+i+": "+(JSON.stringify(JSON.parse(basicTests[i]))===JSON.stringify(parseJSON(basicTests[i]))));
}

console.log('Basic Nesting:');
for (var i = 0 ; i < basicNesting.length ; i++) {
  //console.log('---------------------------');
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