// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/upload.js":[function(require,module,exports) {
var labelUpload = document.querySelector('.form__label_load');
var inputUpload = document.querySelector('.form__input_file-load');
var imageUpload = document.querySelector('#imgLoad');
var showUpload = document.querySelector('.show-upload');
var titleUpload = document.querySelector('.show-upload__tite');
var formatUpload = document.querySelector('.show-upload__format');
var deleteUpload = document.querySelector('.show-upload__icon-delete');
var formButton = document.querySelector('.form__button');
var completedText = document.querySelector('.form__completed-text');
var wasPostForm = false; // function load image

inputUpload.addEventListener('change', function (e) {
  var file = e.target.value;
  var fortam = file.split('.');
  var fullTitle = file.replace(/^.*[\\\/]/, '');
  var subTitle = fullTitle.split('.'); // на хосте должен коректно работать, в сборщике Parcel - надо настраивать статику.

  imageUpload.setAttribute('src', "./img/".concat(fullTitle));
  titleUpload.textContent = subTitle[0];
  formatUpload.textContent = fortam[1];
  formButton.removeAttribute('disabled');
});
labelUpload.addEventListener('click', function () {
  showUpload.style.opacity = 1;
}); // function clear image

deleteUpload.addEventListener('click', function (e) {
  e.preventDefault();
  imageUpload.setAttribute('src', './img/uploadDef.png');
  titleUpload.textContent = '';
  formatUpload.textContent = '';
  showUpload.style.opacity = 0;
  formButton.setAttribute('disabled', true);
  completedText.style.display = 'none';
  wasPostForm = false;
}); // post file

formButton.addEventListener('click', function (e) {
  e.preventDefault();
  wasPostForm = true;
  formButton.setAttribute('disabled', true);

  if (wasPostForm) {
    completedText.style.display = 'flex';
  } else {
    completedText.style.display = 'none';
  }
});
},{}],"js/validate.js":[function(require,module,exports) {
var allInputs = document.querySelectorAll('.form__element');
var inputName = document.querySelector('#inputName');
var selectGender = document.querySelector('#selectGender');
var inputCountry = document.querySelector('#inputCountry');
var inputCity = document.querySelector('#inputCity');
var inputBirth = document.querySelector('#inputBirth');
var secondGroup = document.querySelector('.form__element-group_second');
var uploadGroup = document.querySelector('.form__element-group_upload');
var showUpload = document.querySelector('.show-upload');
var inputNameValid = false;
var selectGenderValid = false;
var inputCountryValid = false;
var inputCityValid = false;
var inputBirthValid = false; // onblur delete success valid classes

allInputs.forEach(function (item) {
  item.addEventListener('blur', function () {
    if (item.classList.contains('form__input_valid')) {
      item.classList.remove('form__input_valid');
    }
  });
}); // input name

inputName.addEventListener('focus', function (e) {
  var currentValue = e.target.value;

  if (!currentValue) {
    inputName.classList.add('form__input_not-valid');
  }
});
inputName.addEventListener('input', checkNameValid);

function checkNameValid(e) {
  var currentValue = e.target.value;

  if (currentValue.length >= 2) {
    inputName.classList.remove('form__input_not-valid');
    inputName.classList.add('form__input_valid');
    inputNameValid = true;
    checkerFirstGroup();
  }

  if (currentValue.length < 2) {
    inputName.classList.remove('form__input_valid');
    inputName.classList.add('form__input_not-valid');
    inputNameValid = false;
    checkerFirstGroup();
  }
} // select gender


selectGender.addEventListener('focus', function (e) {
  var currentValue = e.target.value;

  if (currentValue === 'default') {
    selectGender.classList.remove('form__input_valid');
    selectGender.classList.add('form__input_not-valid');
  }
});
selectGender.addEventListener('input', selectValid);

function selectValid(e) {
  var currentValue = e.target.value;

  if (currentValue === 'default') {
    selectGender.classList.remove('form__input_valid');
    selectGender.classList.add('form__input_not-valid');
    selectGenderValid = false;
    checkerFirstGroup();
  } else {
    selectGender.classList.remove('form__input_not-valid');
    selectGender.classList.add('form__input_valid');
    selectGenderValid = true;
    checkerFirstGroup();
  }
} // function checker if first group input === true ? second group flex : none 


function checkerFirstGroup() {
  if (inputNameValid && selectGenderValid) {
    secondGroup.style.display = 'flex';
  } else {
    secondGroup.style.display = 'none';
  }
} // input Country


inputCountry.addEventListener('focus', function (e) {
  var currentValue = e.target.value;

  if (!currentValue) {
    inputCountry.classList.add('form__input_not-valid');
  }
});
inputCountry.addEventListener('input', chekCountryValid);

function chekCountryValid(e) {
  var currentValue = e.target.value;

  if (currentValue.length >= 2) {
    inputCountry.classList.remove('form__input_not-valid');
    inputCountry.classList.add('form__input_valid');
    inputCountryValid = true;
  }

  if (currentValue.length < 2) {
    inputCountry.classList.remove('form__input_valid');
    inputCountry.classList.add('form__input_not-valid');
    inputCountryValid = false;
  }
} // input Country


inputCity.addEventListener('focus', function (e) {
  var currentValue = e.target.value;

  if (!currentValue) {
    inputCity.classList.add('form__input_not-valid');
  }
});
inputCity.addEventListener('input', chekCityValid);

function chekCityValid(e) {
  var currentValue = e.target.value;

  if (currentValue.length >= 2) {
    inputCity.classList.remove('form__input_not-valid');
    inputCity.classList.add('form__input_valid');
    inputCityValid = true;
  }

  if (currentValue.length < 2) {
    inputCity.classList.remove('form__input_valid');
    inputCity.classList.add('form__input_not-valid');
    inputCityValid = false;
  }
} // input birth


inputBirth.addEventListener('focus', function (e) {
  var currentValue = e.target.value;

  if (!currentValue) {
    inputBirth.classList.add('form__input_not-valid');
  }
});
inputBirth.addEventListener('input', checkerBirth); // check valid input birth

function checkerBirth(e) {
  var currentValue = e.target.value;
  var dotLetter = '.';
  var fullBirthMask = []; // started hell DRY... need code review

  if (currentValue[0]) {
    fullBirthMask = [currentValue[0]].join('');
    inputBirth.value = fullBirthMask;
  }

  if (currentValue[0] && currentValue[1]) {
    fullBirthMask = [currentValue[0], currentValue[1], dotLetter].join('');
    inputBirth.value = fullBirthMask;
  }

  if (currentValue[0] && currentValue[1] && currentValue[2] && currentValue[3]) {
    fullBirthMask = [currentValue[0], currentValue[1], dotLetter, currentValue[3]].join('');
    inputBirth.value = fullBirthMask;
  }

  if (currentValue[0] && currentValue[1] && currentValue[2] && currentValue[3] && currentValue[4]) {
    fullBirthMask = [currentValue[0], currentValue[1], dotLetter, currentValue[3], currentValue[4], dotLetter].join('');
    inputBirth.value = fullBirthMask;
  }

  if (currentValue[0] && currentValue[1] && currentValue[2] && currentValue[3] && currentValue[4] && currentValue[5]) {
    fullBirthMask = [currentValue[0], currentValue[1], dotLetter, currentValue[3], currentValue[4], dotLetter, currentValue[6]].join('');
    inputBirth.value = fullBirthMask;
  }

  if (currentValue[0] && currentValue[1] && currentValue[2] && currentValue[3] && currentValue[4] && currentValue[5] && currentValue[6]) {
    fullBirthMask = [currentValue[0], currentValue[1], dotLetter, currentValue[3], currentValue[4], dotLetter, currentValue[6], currentValue[7]].join('');
    inputBirth.value = fullBirthMask;
  }

  if (currentValue[0] && currentValue[1] && currentValue[2] && currentValue[3] && currentValue[4] && currentValue[5] && currentValue[6] && currentValue[7] && currentValue[8]) {
    fullBirthMask = [currentValue[0], currentValue[1], dotLetter, currentValue[3], currentValue[4], dotLetter, currentValue[6], currentValue[7], currentValue[8], currentValue[9]].join('');
    inputBirth.value = fullBirthMask;
  }

  if (inputBirth.value.length < 10 || currentValue[0] >= 4 || currentValue[0] >= 3 && currentValue[1] >= 2 || currentValue[3] > 1 || currentValue[4] > 2 || currentValue[6] > 3 || currentValue[6] >= 2 && currentValue[7] > 0 || currentValue[6] == 1 && currentValue[7] < 9 || currentValue[6] >= 2 && currentValue[8] > 1 || currentValue[6] >= 2 && currentValue[8] >= 1 && currentValue[9] > 1) {
    inputBirth.classList.remove('form__input_valid');
    inputBirth.classList.add('form__input_not-valid');
    inputBirthValid = false;
    checkerSecondGroup();
    return false;
  }

  inputBirth.classList.remove('form__input_not-valid');
  inputBirth.classList.add('form__input_valid');
  inputBirthValid = true;
  checkerSecondGroup();
} // function checker second group


function checkerSecondGroup() {
  if (inputCountryValid && inputCityValid && inputBirthValid) {
    uploadGroup.style.display = 'flex';
    showUpload.style.display = 'flex';
  } else {
    uploadGroup.style.display = 'none';
    showUpload.style.display = 'none';
  }
}
},{}],"js/navigation.js":[function(require,module,exports) {
var links = document.querySelectorAll('.header__link');
links.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    var linkHREF = link.getAttribute('href');
    document.querySelector(linkHREF).scrollIntoView({
      behavior: 'smooth',
      block: "start"
    });
  });
});
},{}],"js/slider.js":[function(require,module,exports) {
// DOM elements
var leftArrow = document.querySelector('.slider__arrow_left');
var rigthArrow = document.querySelector('.slider__arrow_rigth');
var leftDot = document.querySelector('.slider__dot_left');
var middleDot = document.querySelector('.slider__dot_middle');
var rigthDot = document.querySelector('.slider__dot_rigth'); // all dots navigation

var dots = document.querySelectorAll('.slider__dot'); // Length array images in slider

var allImages = document.querySelectorAll('.slider__item'); // size (width) one image in slider 

var widthImage = document.querySelector('.slider__wrapper-element').clientWidth; // wrapper all images

var sliderElementsBlock = document.querySelector('.slider__elements'); // start position slider images

var startPosition = 0;
var currentActiveDot = 0; // prev arrow slide

leftArrow.addEventListener('click', function (e) {
  if (startPosition <= 0) {
    sliderElementsBlock.style.left = allImages.length * widthImage + 'px';
    startPosition = allImages.length * widthImage;
  }

  if (currentActiveDot === 0) {
    currentActiveDot = allImages.length;
  }

  startPosition -= widthImage;
  sliderElementsBlock.style.left = -startPosition + 'px';
  currentActiveDot--;
  dots.forEach(function (dot, indexDot) {
    dot.classList.remove('slider__dot_active');

    if (currentActiveDot === indexDot) {
      dot.classList.add('slider__dot_active');
    }
  });
}); // next arrow slide

rigthArrow.addEventListener('click', function (e) {
  startPosition += widthImage;
  sliderElementsBlock.style.left = -startPosition + 'px';
  currentActiveDot++;

  if (currentActiveDot >= allImages.length) {
    currentActiveDot = 0;
  }

  if (startPosition >= allImages.length * widthImage) {
    sliderElementsBlock.style.left = 0 + 'px';
    startPosition = 0;
  }

  dots.forEach(function (dot, indexDot) {
    dot.classList.remove('slider__dot_active');

    if (currentActiveDot === indexDot) {
      dot.classList.add('slider__dot_active');
    }
  });
}); // for correct check resize window 

window.addEventListener('resize', function () {
  widthImage = document.querySelector('.slider__wrapper-element').clientWidth;
}); // function dot-change element 

dots.forEach(function (item, index) {
  item.addEventListener('click', function (e) {
    e.preventDefault();
    dots.forEach(function (subItem) {
      return subItem.classList.remove('slider__dot_active');
    });
    item.classList.add('slider__dot_active');
    sliderElementsBlock.style.left = -(index * widthImage) + 'px';
    startPosition = index * widthImage;
  });
});
},{}],"js/app.js":[function(require,module,exports) {
"use strict";

require("./upload");

require("./validate");

require("./navigation");

require("./slider");
},{"./upload":"js/upload.js","./validate":"js/validate.js","./navigation":"js/navigation.js","./slider":"js/slider.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51243" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.js.map