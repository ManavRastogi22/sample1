function toggleResponse(response) {
    response.classList.contains('open') ?
      response.classList.remove('open') : response.classList.add('open')
  }

function copyToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.style.position = "fixed";
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.innerHTML = text;

  // Avoid scrolling to bottom
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  textArea.setSelectionRange(0, 99999);
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

function parseBrackets (query) {

  if (query.indexOf('{') > 0) {
      var vars = query.split('{');
      query = vars[0] + vars.slice(1).map(function (el) {
        var pair = el.split('}');
        return pair[0].startsWith('<span class="query_param">') ? el : '<span class="query_param">' + '{' + pair[0] + '}' + '</span>' +  pair[1];
      }).join('');
    }
  return query
}

function parseParams (query) {
  if (query.indexOf('&') > 0) {
      var vars = query.split('&');
      query = vars.map(function (el) {
        if (el.indexOf('=') > 0 && el.indexOf('href') < 0) {
          var pair = el.split('=');
          return pair[0] + '=' + '<span class="query_param">' + pair[1] + '</span>';
        } else {
          return el
        }
      }).join('&');
    }
  return query
}


function generateAPI() {
    var apiBlocks = document.getElementsByClassName('api');
    Array.prototype.forEach.call(apiBlocks, function (apiBlock) {
      var tools = document.createElement('div');
      tools.className = 'tools';

      if (apiBlock.parentNode.classList.contains('response')) {
        // response block
        var toggleImg = imgToggle();
        toggleImg.onclick = function() { toggleResponse(apiBlock.parentNode); };
        tools.appendChild(toggleImg);
        var copyAPI = imgCopy();
        copyAPI.onclick =  function() {
            copyToClipboard(apiBlock.children[0].innerText);
            };
        tools.appendChild(copyAPI);
      } else {
        // api block
        var code = apiBlock.getElementsByTagName('code')[0];
        if (!code) {
          return
        }
        var query = parseParams(code.innerHTML)
        query = parseBrackets(query);

        code.innerText = '';
        code.innerHTML = query;

        var img = imgCopy();
        img.onclick = function () {
          copyToClipboard(apiBlock.children[0].innerText);
        };
        tools.appendChild(img);
      }
      apiBlock.appendChild(tools);
  });
  var contentBlocks = document.getElementsByClassName('content');
  Array.prototype.forEach.call(contentBlocks, function (contentBlock) {
    var copyResponse = imgCopy();
    copyResponse.onclick =  function() {
        copyToClipboard(contentBlock.children[0].innerText);
        };
    contentBlock.appendChild(copyResponse);
  })
}

function imgToggle() {
    var button = document.createElement('button');
    button.className = 'tooltip-btn';
    var imgToggle = document.createElement('img');
    imgToggle.src = '/themes/openweathermap/assets/img/documentation/arrow_down.png';
    imgToggle.className = 'toggleImg';
    button.appendChild(imgToggle);
    return button
  }

function imgCopy() {
  var button = document.createElement('button');
  button.className = 'tooltip-btn';
  var toolTip = document.createElement('div');
  toolTip.className = 'tooltip-docs';
  toolTip.innerHTML = 'Copy';
  var imgCopy = document.createElement('img');
  imgCopy.src = '/themes/openweathermap/assets/img/documentation/copy.png';
  imgCopy.className = 'copy-img';
  button.appendChild(toolTip);
  button.appendChild(imgCopy);
  return button
  }

window.onload = function() {
    generateAPI();
  }
  
document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });
});  


