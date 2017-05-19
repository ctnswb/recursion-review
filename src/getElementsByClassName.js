var getElementsByClassName = function(className) {
  var results = [];

  function checkClassName(element) {
    if(element.classList && element.classList.contains(className)) {
      results.push(element);
    }

    var cNodes = element.childNodes;

    for(var i = 0; i < cNodes.length; i++) {
      checkClassName(cNodes[i]);
    }
  }
  checkClassName(document.body);

  return results;
};
