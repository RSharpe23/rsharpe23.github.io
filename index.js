/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./index.js","vendors~index"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../public/img lazy recursive ^\\.\\/.*$":
/*!****************************************************!*\
  !*** ../public/img lazy ^\.\/.*$ namespace object ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./avatar.png\": [\n\t\t\"../public/img/avatar.png\"\n\t],\n\t\"./dashboard.jpg\": [\n\t\t\"../public/img/dashboard.jpg\",\n\t\t0\n\t],\n\t\"./default-work.svg\": [\n\t\t\"../public/img/default-work.svg\"\n\t],\n\t\"./fudi.jpg\": [\n\t\t\"../public/img/fudi.jpg\",\n\t\t1\n\t],\n\t\"./javascript.jpg\": [\n\t\t\"../public/img/javascript.jpg\",\n\t\t2\n\t],\n\t\"./laravel-invert.jpg\": [\n\t\t\"../public/img/laravel-invert.jpg\",\n\t\t3\n\t],\n\t\"./laravel.jpg\": [\n\t\t\"../public/img/laravel.jpg\",\n\t\t4\n\t],\n\t\"./odigo.jpg\": [\n\t\t\"../public/img/odigo.jpg\",\n\t\t5\n\t],\n\t\"./rsharpe-blog.jpg\": [\n\t\t\"../public/img/rsharpe-blog.jpg\",\n\t\t6\n\t],\n\t\"./rsharpe-page.jpg\": [\n\t\t\"../public/img/rsharpe-page.jpg\",\n\t\t7\n\t],\n\t\"./swedish-bitter.jpg\": [\n\t\t\"../public/img/swedish-bitter.jpg\",\n\t\t8\n\t],\n\t\"./voronina.jpg\": [\n\t\t\"../public/img/voronina.jpg\",\n\t\t9\n\t],\n\t\"./wordpress.jpg\": [\n\t\t\"../public/img/wordpress.jpg\",\n\t\t10\n\t]\n};\nfunction webpackAsyncContext(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\treturn Promise.resolve().then(function() {\n\t\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\t\te.code = 'MODULE_NOT_FOUND';\n\t\t\tthrow e;\n\t\t});\n\t}\n\n\tvar ids = map[req], id = ids[0];\n\treturn Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {\n\t\treturn __webpack_require__(id);\n\t});\n}\nwebpackAsyncContext.keys = function webpackAsyncContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackAsyncContext.id = \"../public/img lazy recursive ^\\\\.\\\\/.*$\";\nmodule.exports = webpackAsyncContext;\n\n//# sourceURL=webpack:///../public/img_lazy_^\\.\\/.*$_namespace_object?");

/***/ }),

/***/ "../public/img/avatar.png":
/*!********************************!*\
  !*** ../public/img/avatar.png ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"affcf001e7993562cbd05b4e1a684cd7.png\");\n\n//# sourceURL=webpack:///../public/img/avatar.png?");

/***/ }),

/***/ "../public/img/default-work.svg":
/*!**************************************!*\
  !*** ../public/img/default-work.svg ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"a604ab0c25af8debfb94875d3f5b37f3.svg\");\n\n//# sourceURL=webpack:///../public/img/default-work.svg?");

/***/ }),

/***/ "./actions/actionCreators.js":
/*!***********************************!*\
  !*** ./actions/actionCreators.js ***!
  \***********************************/
/*! exports provided: toggleHomeNavChevron, setProfile, addMenuByName, changeMenuIndex, addPage, addOrUpdateWorks, selectWork, resetCurrentPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toggleHomeNavChevron\", function() { return toggleHomeNavChevron; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setProfile\", function() { return setProfile; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addMenuByName\", function() { return addMenuByName; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"changeMenuIndex\", function() { return changeMenuIndex; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addPage\", function() { return addPage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addOrUpdateWorks\", function() { return addOrUpdateWorks; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"selectWork\", function() { return selectWork; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"resetCurrentPage\", function() { return resetCurrentPage; });\n/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actionTypes */ \"./actions/actionTypes.js\");\n\nfunction toggleHomeNavChevron(value) {\n  return {\n    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"TOGGLE_HOME_NAV_CHEVRON\"],\n    value\n  };\n}\nfunction setProfile(profile) {\n  return {\n    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"SET_PROFILE\"],\n    profile\n  };\n}\nfunction addMenuByName(name, menu) {\n  return {\n    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"ADD_MENU_BY_NAME\"],\n    name,\n    menu\n  };\n}\nfunction changeMenuIndex(menuName, newIndex) {\n  return {\n    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"CHANGE_MENU_INDEX\"],\n    menuName,\n    newIndex\n  };\n}\nfunction addPage(page) {\n  return {\n    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"ADD_PAGE\"],\n    page\n  };\n}\nfunction addOrUpdateWorks(works) {\n  return {\n    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"ADD_UPDATE_WORKS\"],\n    works\n  };\n}\nfunction selectWork(workData) {\n  return {\n    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"SELECT_WORK\"],\n    workData\n  };\n}\nfunction resetCurrentPage() {\n  return {\n    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"RESET_CURRENT_PAGE\"]\n  };\n}\n\n//# sourceURL=webpack:///./actions/actionCreators.js?");

/***/ }),

/***/ "./actions/actionTypes.js":
/*!********************************!*\
  !*** ./actions/actionTypes.js ***!
  \********************************/
/*! exports provided: SET_PROFILE, ADD_MENU_BY_NAME, CHANGE_MENU_INDEX, TOGGLE_HOME_NAV_CHEVRON, ADD_PAGE, ADD_UPDATE_WORKS, SELECT_WORK, RESET_CURRENT_PAGE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_PROFILE\", function() { return SET_PROFILE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ADD_MENU_BY_NAME\", function() { return ADD_MENU_BY_NAME; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CHANGE_MENU_INDEX\", function() { return CHANGE_MENU_INDEX; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TOGGLE_HOME_NAV_CHEVRON\", function() { return TOGGLE_HOME_NAV_CHEVRON; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ADD_PAGE\", function() { return ADD_PAGE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ADD_UPDATE_WORKS\", function() { return ADD_UPDATE_WORKS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SELECT_WORK\", function() { return SELECT_WORK; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RESET_CURRENT_PAGE\", function() { return RESET_CURRENT_PAGE; });\nconst SET_PROFILE = 'SET_PROFILE';\nconst ADD_MENU_BY_NAME = 'ADD_MENU_BY_NAME';\nconst CHANGE_MENU_INDEX = 'CHANGE_MENU_INDEX';\nconst TOGGLE_HOME_NAV_CHEVRON = 'TOGGLE_HOME_NAV_CHEVRON';\nconst ADD_PAGE = 'ADD_PAGE';\nconst ADD_UPDATE_WORKS = 'ADD_UPDATE_WORKS';\nconst SELECT_WORK = 'SELECT_WORK';\nconst RESET_CURRENT_PAGE = 'RESET_CURRENT_PAGE';\n\n//# sourceURL=webpack:///./actions/actionTypes.js?");

/***/ }),

/***/ "./components/App.js":
/*!***************************!*\
  !*** ./components/App.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _containers_HomeContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @containers/HomeContainer */ \"./containers/HomeContainer.js\");\n/* harmony import */ var _containers_PreviewContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @containers/PreviewContainer */ \"./containers/PreviewContainer.js\");\n/* eslint-disable import/no-unresolved */\n\n\n\n\nfunction App({\n  currentPage\n}) {\n  switch (currentPage) {\n    case 1:\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_HomeContainer__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null);\n\n    case 2:\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_PreviewContainer__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null);\n\n    default:\n      return null;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\n\n//# sourceURL=webpack:///./components/App.js?");

/***/ }),

/***/ "./components/Avatar.css":
/*!*******************************!*\
  !*** ./components/Avatar.css ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n    if(false) { var cssReload; }\n  \n\n//# sourceURL=webpack:///./components/Avatar.css?");

/***/ }),

/***/ "./components/Avatar.js":
/*!******************************!*\
  !*** ./components/Avatar.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _public_img_avatar_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @public/img/avatar.png */ \"../public/img/avatar.png\");\n/* harmony import */ var _Avatar_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Avatar.css */ \"./components/Avatar.css\");\n/* harmony import */ var _Avatar_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Avatar_css__WEBPACK_IMPORTED_MODULE_2__);\n/* eslint-disable import/no-unresolved */\n\n\n // Запись: url = defaultImg не подойдет, т.к. url - пустая строка, \n// а чтобы сработало присвоение по умолчанию, url должен быть undefined\n\nfunction Avatar({\n  className = 'Avatar ImgWrap',\n  url\n}) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: className\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n    href: \"/\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n    src: url || _public_img_avatar_png__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    alt: \"\\u0410\\u0432\\u0430\\u0442\\u0430\\u0440\\u043A\\u0430\"\n  })));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Avatar);\n\n//# sourceURL=webpack:///./components/Avatar.js?");

/***/ }),

/***/ "./components/Contacts.css":
/*!*********************************!*\
  !*** ./components/Contacts.css ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n    if(false) { var cssReload; }\n  \n\n//# sourceURL=webpack:///./components/Contacts.css?");

/***/ }),

/***/ "./components/Contacts.js":
/*!********************************!*\
  !*** ./components/Contacts.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils */ \"./utils.js\");\n/* harmony import */ var _containers_MenuContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @containers/MenuContainer */ \"./containers/MenuContainer.js\");\n/* harmony import */ var _Contacts_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Contacts.css */ \"./components/Contacts.css\");\n/* harmony import */ var _Contacts_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Contacts_css__WEBPACK_IMPORTED_MODULE_3__);\n/* eslint-disable import/no-unresolved */\n\n\n\n\n\nfunction Contacts({\n  data,\n  onLinkClick\n}) {\n  if (!data || Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"isEmptyObj\"])(data)) {\n    return null;\n  }\n\n  const {\n    title,\n    content\n  } = data;\n\n  const handleLinkClick = e => {\n    e.preventDefault();\n    onLinkClick && onLinkClick();\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"Screen Contacts\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", {\n    className: \"Screen-Title\"\n  }, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"Contacts-Content\",\n    dangerouslySetInnerHTML: Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"createMarkup\"])(content)\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_MenuContainer__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    name: \"contacts\",\n    className: \"Menu Contacts-Menu\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"Screen-LinkWrap\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n    href: \"#\",\n    onClick: handleLinkClick,\n    className: \"Screen-Link\"\n  }, \"\\u27F5 \\u041D\\u0430\\u0437\\u0430\\u0434 \\u043A \\u043F\\u043E\\u0440\\u0442\\u0444\\u043E\\u043B\\u0438\\u043E\")));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Contacts);\n\n//# sourceURL=webpack:///./components/Contacts.js?");

/***/ }),

/***/ "./components/Home.css":
/*!*****************************!*\
  !*** ./components/Home.css ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n    if(false) { var cssReload; }\n  \n\n//# sourceURL=webpack:///./components/Home.css?");

/***/ }),

/***/ "./components/Home.js":
/*!****************************!*\
  !*** ./components/Home.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _containers_HomeNavContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @containers/HomeNavContainer */ \"./containers/HomeNavContainer.js\");\n/* harmony import */ var _containers_PortfolioContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @containers/PortfolioContainer */ \"./containers/PortfolioContainer.js\");\n/* harmony import */ var _containers_ContactsContainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @containers/ContactsContainer */ \"./containers/ContactsContainer.js\");\n/* harmony import */ var _Home_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Home.css */ \"./components/Home.css\");\n/* harmony import */ var _Home_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Home_css__WEBPACK_IMPORTED_MODULE_4__);\n/* eslint-disable import/no-unresolved */\n\n\n\n\n\n\nfunction Home({\n  homeNavMenuIndex\n}) {\n  const renderScreen = () => {\n    switch (homeNavMenuIndex) {\n      case 0:\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_PortfolioContainer__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null);\n\n      case 1:\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_ContactsContainer__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null);\n\n      default:\n        return null;\n    }\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"container-fluid Home\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"row\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_HomeNavContainer__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"main\", {\n    className: \"col-md-9 ml-sm-auto\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"pl-lg-5 pl-xl-0 pr-lg-5\"\n  }, renderScreen()))));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\n\n//# sourceURL=webpack:///./components/Home.js?");

/***/ }),

/***/ "./components/HomeNav.js":
/*!*******************************!*\
  !*** ./components/HomeNav.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _containers_ProfileContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @containers/ProfileContainer */ \"./containers/ProfileContainer.js\");\n/* harmony import */ var _containers_MenuContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @containers/MenuContainer */ \"./containers/MenuContainer.js\");\n/* harmony import */ var _Nav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Nav */ \"./components/Nav.js\");\n/* eslint-disable import/no-unresolved */\n\n\n\n\n\nfunction HomeNav({\n  isActive,\n  onChevronToggle\n}) {\n  const getClass = () => {\n    let className = 'col-md-3 col-xl-2 Nav Home-Nav';\n\n    if (isActive) {\n      className += ' Home-Nav_active';\n    }\n\n    return className;\n  };\n\n  const getDate = () => {\n    return new Date().getFullYear();\n  };\n\n  const handleChevronClick = () => {\n    onChevronToggle && onChevronToggle(!isActive);\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Nav__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    className: getClass()\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"Nav-Area\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_ProfileContainer__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_MenuContainer__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    name: \"homeNav\",\n    className: \"Menu Nav-Menu\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"footer\", {\n    className: \"Nav-Footer\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, \"\\xA9 \", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n    href: \"/\",\n    className: \"Nav-Link\"\n  }, \"Roman Sharpe\"), \" \", getDate()))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"d-block d-md-none\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"Nav-Chevron\",\n    onClick: handleChevronClick\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n    className: \"icon-chevrons-right\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n    className: \"icon-chevrons-left\"\n  }))));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (HomeNav);\n\n//# sourceURL=webpack:///./components/HomeNav.js?");

/***/ }),

/***/ "./components/Menu.css":
/*!*****************************!*\
  !*** ./components/Menu.css ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n    if(false) { var cssReload; }\n  \n\n//# sourceURL=webpack:///./components/Menu.css?");

/***/ }),

/***/ "./components/Menu.js":
/*!****************************!*\
  !*** ./components/Menu.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils */ \"./utils.js\");\n/* harmony import */ var _Menu_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Menu.css */ \"./components/Menu.css\");\n/* harmony import */ var _Menu_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Menu_css__WEBPACK_IMPORTED_MODULE_2__);\n/* eslint-disable import/no-unresolved */\n\n\n\n\nfunction Menu({\n  className = 'Menu',\n  data,\n  activeIndex = -1,\n  onChange\n}) {\n  if (!data || Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"isEmptyObj\"])(data)) {\n    return null;\n  }\n\n  const getLinkClass = index => {\n    let linkClass = 'Menu-Link';\n\n    if (index === activeIndex) {\n      linkClass += ' Menu-Link_active';\n    }\n\n    return linkClass;\n  };\n\n  const handleLinkClick = (e, index) => {\n    if (~activeIndex) {\n      e.preventDefault();\n      onChange && onChange(index);\n    }\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", {\n    className: className\n  }, data.map((link, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n    key: link.id,\n    className: \"Menu-Item\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n    className: getLinkClass(index),\n    href: link.href,\n    target: link.target,\n    onClick: e => handleLinkClick(e, index),\n    dangerouslySetInnerHTML: Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"createMarkup\"])(link.text)\n  }))));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Menu);\n\n//# sourceURL=webpack:///./components/Menu.js?");

/***/ }),

/***/ "./components/Nav.css":
/*!****************************!*\
  !*** ./components/Nav.css ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n    if(false) { var cssReload; }\n  \n\n//# sourceURL=webpack:///./components/Nav.css?");

/***/ }),

/***/ "./components/Nav.js":
/*!***************************!*\
  !*** ./components/Nav.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Nav_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Nav.css */ \"./components/Nav.css\");\n/* harmony import */ var _Nav_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Nav_css__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nfunction Nav({\n  className = 'Nav',\n  children\n}) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"nav\", {\n    className: className\n  }, children);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Nav);\n\n//# sourceURL=webpack:///./components/Nav.js?");

/***/ }),

/***/ "./components/Portfolio.css":
/*!**********************************!*\
  !*** ./components/Portfolio.css ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n    if(false) { var cssReload; }\n  \n\n//# sourceURL=webpack:///./components/Portfolio.css?");

/***/ }),

/***/ "./components/Portfolio.js":
/*!*********************************!*\
  !*** ./components/Portfolio.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils */ \"./utils.js\");\n/* harmony import */ var _containers_MenuContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @containers/MenuContainer */ \"./containers/MenuContainer.js\");\n/* harmony import */ var _containers_WorkContainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @containers/WorkContainer */ \"./containers/WorkContainer.js\");\n/* harmony import */ var _Portfolio_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Portfolio.css */ \"./components/Portfolio.css\");\n/* harmony import */ var _Portfolio_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Portfolio_css__WEBPACK_IMPORTED_MODULE_4__);\n/* eslint-disable import/no-unresolved */\n\n\n\n\n\n\nfunction Portfolio({\n  data,\n  works,\n  onLinkClick\n}) {\n  if (!data || Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"isEmptyObj\"])(data)) {\n    return null;\n  }\n\n  const renderWorks = () => {\n    if (!works || Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"isEmptyObj\"])(works)) {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\", null, \"\\u0412 \\u043F\\u0440\\u043E\\u0446\\u0435\\u0441\\u0441\\u0435 :)\");\n    }\n\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"Portfolio-Area\"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"row\"\n    }, works.map(w => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"col-lg-6\",\n      key: w.id\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_WorkContainer__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n      className: \"Work Portfolio-Work\",\n      data: w\n    })))));\n  };\n\n  const handleLinkClick = e => {\n    e.preventDefault();\n    onLinkClick && onLinkClick();\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"Screen Portfolio\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", {\n    className: \"Screen-Title\"\n  }, data.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_MenuContainer__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    name: \"portfolio\",\n    className: \"Menu Portfolio-Menu\"\n  }), renderWorks(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"Screen-LinkWrap\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n    href: \"#\",\n    onClick: handleLinkClick,\n    className: \"Screen-Link\"\n  }, \"\\u0417\\u0430\\u043A\\u0430\\u0437\\u0430\\u0442\\u044C \\u0440\\u0430\\u0431\\u043E\\u0442\\u0443 \\u27F6\")));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Portfolio);\n\n//# sourceURL=webpack:///./components/Portfolio.js?");

/***/ }),

/***/ "./components/Preview.css":
/*!********************************!*\
  !*** ./components/Preview.css ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n    if(false) { var cssReload; }\n  \n\n//# sourceURL=webpack:///./components/Preview.css?");

/***/ }),

/***/ "./components/Preview.js":
/*!*******************************!*\
  !*** ./components/Preview.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils */ \"./utils.js\");\n/* harmony import */ var _containers_PreviewNavContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @containers/PreviewNavContainer */ \"./containers/PreviewNavContainer.js\");\n/* harmony import */ var _Preview_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Preview.css */ \"./components/Preview.css\");\n/* harmony import */ var _Preview_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Preview_css__WEBPACK_IMPORTED_MODULE_3__);\n/* eslint-disable import/no-unresolved */\n\n\n\n\n\nfunction Preview({\n  workData,\n  isMobile\n}) {\n  if (!workData || Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"isEmptyObj\"])(workData)) {\n    return null;\n  }\n\n  const getIframeClass = () => {\n    let className = 'Iframe';\n\n    if (isMobile) {\n      className += ' Iframe_mobile';\n    }\n\n    return className;\n  };\n\n  const {\n    daysPerDev,\n    price,\n    link\n  } = workData;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"Preview\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_PreviewNavContainer__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    daysPerDev: daysPerDev,\n    price: price\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"main\", {\n    className: \"Preview-Main\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"position-relative w-100 h-100\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"iframe\", {\n    src: link.href,\n    className: getIframeClass()\n  }))));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Preview);\n\n//# sourceURL=webpack:///./components/Preview.js?");

/***/ }),

/***/ "./components/PreviewNav.js":
/*!**********************************!*\
  !*** ./components/PreviewNav.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _containers_MenuContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @containers/MenuContainer */ \"./containers/MenuContainer.js\");\n/* harmony import */ var _Nav__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Nav */ \"./components/Nav.js\");\n/* eslint-disable import/no-unresolved */\n\n\n\n\nfunction PreviewNav({\n  daysPerDev,\n  price,\n  onLinkClick\n}) {\n  const handleLinkClick = (e, index) => {\n    e.preventDefault();\n    onLinkClick && onLinkClick(index);\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Nav__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    className: \"Nav Preview-Nav\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"container-fluid Nav-Inner\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n    href: \"#\",\n    className: \"Nav-Link\",\n    onClick: e => handleLinkClick(e, 0)\n  }, \"\\u27F5 \\u0414\\u0440\\u0443\\u0433\\u0438\\u0435 \\u0440\\u0430\\u0431\\u043E\\u0442\\u044B\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_MenuContainer__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    name: \"previewNav\",\n    className: \"d-none d-md-flex Menu Nav-Menu\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    className: \"mr-2 d-none d-md-inline\"\n  }, \"\\u0420\\u0430\\u0437\\u0440\\u0430\\u0431\\u043E\\u0442\\u043A\\u0430 \\u043E\\u0442 \", daysPerDev, \"x \\u0434\\u043D\\u0435\\u0439\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n    href: \"#\",\n    className: \"btn btn-success\",\n    onClick: e => handleLinkClick(e, 1)\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n    className: \"icon-embed2 Icon\"\n  }), \" \\u0417\\u0430\\u043A\\u0430\\u0437\\u0430\\u0442\\u044C $\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"strong\", null, price)))));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (PreviewNav);\n\n//# sourceURL=webpack:///./components/PreviewNav.js?");

/***/ }),

/***/ "./components/Profile.css":
/*!********************************!*\
  !*** ./components/Profile.css ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n    if(false) { var cssReload; }\n  \n\n//# sourceURL=webpack:///./components/Profile.css?");

/***/ }),

/***/ "./components/Profile.js":
/*!*******************************!*\
  !*** ./components/Profile.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils */ \"./utils.js\");\n/* harmony import */ var _Avatar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Avatar */ \"./components/Avatar.js\");\n/* harmony import */ var _Profile_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Profile.css */ \"./components/Profile.css\");\n/* harmony import */ var _Profile_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Profile_css__WEBPACK_IMPORTED_MODULE_3__);\n/* eslint-disable import/no-unresolved */\n\n\n\n\n\nfunction Profile({\n  data\n}) {\n  if (!data || Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"isEmptyObj\"])(data)) {\n    return null;\n  }\n\n  const {\n    photoUrl,\n    content,\n    link\n  } = data;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"Profile\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Avatar__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    className: \"Avatar Profile-Avatar ImgWrap\",\n    url: photoUrl\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"Profile-Content\",\n    dangerouslySetInnerHTML: Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"createMarkup\"])(content)\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n    href: link.href,\n    target: link.target,\n    rel: \"nofollow\",\n    className: \"btn btn-success Profile-Btn\",\n    dangerouslySetInnerHTML: Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"createMarkup\"])(link.text)\n  })));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Profile);\n\n//# sourceURL=webpack:///./components/Profile.js?");

/***/ }),

/***/ "./components/Work.css":
/*!*****************************!*\
  !*** ./components/Work.css ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n    if(false) { var cssReload; }\n  \n\n//# sourceURL=webpack:///./components/Work.css?");

/***/ }),

/***/ "./components/Work.js":
/*!****************************!*\
  !*** ./components/Work.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils */ \"./utils.js\");\n/* harmony import */ var _public_img_default_work_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @public/img/default-work.svg */ \"../public/img/default-work.svg\");\n/* harmony import */ var _Work_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Work.css */ \"./components/Work.css\");\n/* harmony import */ var _Work_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Work_css__WEBPACK_IMPORTED_MODULE_3__);\n/* eslint-disable import/no-unresolved */\n\n\n\n\n\nfunction Work({\n  className = 'Work',\n  data,\n  onClick\n}) {\n  if (!data || Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"isEmptyObj\"])(data)) {\n    return null;\n  }\n\n  const {\n    title,\n    content,\n    thumbnail,\n    price,\n    link\n  } = data;\n\n  const handleClick = e => {\n    e.preventDefault();\n\n    if (link.target === '_blank') {\n      window.open(link.href, '_blank');\n      return;\n    }\n\n    onClick && onClick(data);\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"figure\", {\n    className: className\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"a\", {\n    href: \"#\",\n    className: \"ImgWrap Work-Link\",\n    onClick: handleClick\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n    src: thumbnail,\n    alt: title\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"Work-Content\",\n    dangerouslySetInnerHTML: Object(_utils__WEBPACK_IMPORTED_MODULE_1__[\"createMarkup\"])(content)\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"figcaption\", {\n    className: \"Work-Caption\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", null, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", null, \"$\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"strong\", null, price))));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Work);\n\n//# sourceURL=webpack:///./components/Work.js?");

/***/ }),

/***/ "./containers/AppContainer.js":
/*!************************************!*\
  !*** ./containers/AppContainer.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"../node_modules/react-redux/es/index.js\");\n/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/App */ \"./components/App.js\");\n/* eslint-disable import/no-unresolved */\n\n\n\n\nfunction AppContainer(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_App__WEBPACK_IMPORTED_MODULE_2__[\"default\"], props);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(state => ({\n  currentPage: state.options.currentPage\n}))(AppContainer));\n\n//# sourceURL=webpack:///./containers/AppContainer.js?");

/***/ }),

/***/ "./containers/ContactsContainer.js":
/*!*****************************************!*\
  !*** ./containers/ContactsContainer.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"../node_modules/react-redux/es/index.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store */ \"./store.js\");\n/* harmony import */ var _models_stateApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @models/stateApi */ \"./models/stateApi.js\");\n/* harmony import */ var _models_DataStoreContacts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @models/DataStoreContacts */ \"./models/DataStoreContacts.js\");\n/* harmony import */ var _components_Contacts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @components/Contacts */ \"./components/Contacts.js\");\n/* harmony import */ var _actions_actionCreators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @actions/actionCreators */ \"./actions/actionCreators.js\");\n/* eslint-disable import/no-unresolved */\n\n\n\n\n\n\n\n\nclass ContactsContainer extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  render() {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Contacts__WEBPACK_IMPORTED_MODULE_5__[\"default\"], this.props);\n  } // eslint-disable-next-line class-methods-use-this\n\n\n  componentDidMount() {\n    _models_DataStoreContacts__WEBPACK_IMPORTED_MODULE_4__[\"default\"].request().then(({\n      page,\n      menu\n    }) => {\n      _store__WEBPACK_IMPORTED_MODULE_2__[\"default\"].dispatch(Object(_actions_actionCreators__WEBPACK_IMPORTED_MODULE_6__[\"addPage\"])(page));\n      _store__WEBPACK_IMPORTED_MODULE_2__[\"default\"].dispatch(Object(_actions_actionCreators__WEBPACK_IMPORTED_MODULE_6__[\"addMenuByName\"])('contacts', menu));\n    });\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(state => ({\n  data: Object(_models_stateApi__WEBPACK_IMPORTED_MODULE_3__[\"getContacts\"])(state)\n}), dispatch => ({\n  onLinkClick() {\n    dispatch(Object(_actions_actionCreators__WEBPACK_IMPORTED_MODULE_6__[\"changeMenuIndex\"])('homeNav', 0));\n  }\n\n}))(ContactsContainer));\n\n//# sourceURL=webpack:///./containers/ContactsContainer.js?");

/***/ }),

/***/ "./containers/HomeContainer.js":
/*!*************************************!*\
  !*** ./containers/HomeContainer.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"../node_modules/react-redux/es/index.js\");\n/* harmony import */ var _components_Home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/Home */ \"./components/Home.js\");\n/* eslint-disable import/no-unresolved */\n\n\n\n\nfunction HomeContainer(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Home__WEBPACK_IMPORTED_MODULE_2__[\"default\"], props);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(state => ({\n  homeNavMenuIndex: state.menusActivity.homeNav\n}))(HomeContainer));\n\n//# sourceURL=webpack:///./containers/HomeContainer.js?");

/***/ }),

/***/ "./containers/HomeNavContainer.js":
/*!****************************************!*\
  !*** ./containers/HomeNavContainer.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"../node_modules/react-redux/es/index.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store */ \"./store.js\");\n/* harmony import */ var _models_DataStoreHomeNav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @models/DataStoreHomeNav */ \"./models/DataStoreHomeNav.js\");\n/* harmony import */ var _components_HomeNav__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @components/HomeNav */ \"./components/HomeNav.js\");\n/* harmony import */ var _actions_actionCreators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @actions/actionCreators */ \"./actions/actionCreators.js\");\n/* eslint-disable import/no-unresolved */\n\n\n\n\n\n // Название компонента будет в любом случае тем, \n// которое указано во вторых скобках - HomeNav\n// export default connect(\n//   state => ({ \n//     isActive: state.options.isActiveHomeNav,\n//   }),\n//   dispatch => ({\n//     onChevronToggle(value) {\n//       dispatch(toggleHomeNavChevron(value));\n//     },\n//   })\n// )(HomeNav);\n\nclass HomeNavContainer extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  render() {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_HomeNav__WEBPACK_IMPORTED_MODULE_4__[\"default\"], this.props);\n  } // eslint-disable-next-line class-methods-use-this\n\n\n  componentDidMount() {\n    _models_DataStoreHomeNav__WEBPACK_IMPORTED_MODULE_3__[\"default\"].request().then(({\n      menu\n    }) => _store__WEBPACK_IMPORTED_MODULE_2__[\"default\"].dispatch(Object(_actions_actionCreators__WEBPACK_IMPORTED_MODULE_5__[\"addMenuByName\"])('homeNav', menu)));\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(state => ({\n  isActive: state.options.isActiveHomeNav\n}), dispatch => ({\n  onChevronToggle(value) {\n    dispatch(Object(_actions_actionCreators__WEBPACK_IMPORTED_MODULE_5__[\"toggleHomeNavChevron\"])(value));\n  }\n\n}))(HomeNavContainer));\n\n//# sourceURL=webpack:///./containers/HomeNavContainer.js?");

/***/ }),

/***/ "./containers/MenuContainer.js":
/*!*************************************!*\
  !*** ./containers/MenuContainer.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"../node_modules/react-redux/es/index.js\");\n/* harmony import */ var _actions_actionCreators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @actions/actionCreators */ \"./actions/actionCreators.js\");\n/* harmony import */ var _components_Menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @components/Menu */ \"./components/Menu.js\");\n/* eslint-disable import/no-unresolved */\n\n\n\n\n\nfunction MenuContainer(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Menu__WEBPACK_IMPORTED_MODULE_3__[\"default\"], props);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])((state, ownProps) => ({\n  data: state.menus[ownProps.name],\n  activeIndex: state.menusActivity[ownProps.name]\n}), (dispatch, ownProps) => ({\n  onChange(newIndex) {\n    dispatch(Object(_actions_actionCreators__WEBPACK_IMPORTED_MODULE_2__[\"changeMenuIndex\"])(ownProps.name, newIndex));\n  }\n\n}))(MenuContainer));\n\n//# sourceURL=webpack:///./containers/MenuContainer.js?");

/***/ }),

/***/ "./containers/PortfolioContainer.js":
/*!******************************************!*\
  !*** ./containers/PortfolioContainer.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"../node_modules/react-redux/es/index.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store */ \"./store.js\");\n/* harmony import */ var _models_stateApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @models/stateApi */ \"./models/stateApi.js\");\n/* harmony import */ var _models_DataStorePortfolio__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @models/DataStorePortfolio */ \"./models/DataStorePortfolio.js\");\n/* harmony import */ var _components_Portfolio__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @components/Portfolio */ \"./components/Portfolio.js\");\n/* harmony import */ var _actions_actionCreators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @actions/actionCreators */ \"./actions/actionCreators.js\");\n/* eslint-disable import/no-unresolved */\n\n\n\n\n\n\n\n\nclass PortfolioContainer extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  render() {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Portfolio__WEBPACK_IMPORTED_MODULE_5__[\"default\"], this.props);\n  } // eslint-disable-next-line class-methods-use-this\n\n\n  componentDidMount() {\n    _models_DataStorePortfolio__WEBPACK_IMPORTED_MODULE_4__[\"default\"].request().then(({\n      page,\n      menu,\n      works\n    }) => {\n      _store__WEBPACK_IMPORTED_MODULE_2__[\"default\"].dispatch(Object(_actions_actionCreators__WEBPACK_IMPORTED_MODULE_6__[\"addPage\"])(page));\n      _store__WEBPACK_IMPORTED_MODULE_2__[\"default\"].dispatch(Object(_actions_actionCreators__WEBPACK_IMPORTED_MODULE_6__[\"addMenuByName\"])('portfolio', menu));\n      _store__WEBPACK_IMPORTED_MODULE_2__[\"default\"].dispatch(Object(_actions_actionCreators__WEBPACK_IMPORTED_MODULE_6__[\"addOrUpdateWorks\"])(works));\n    });\n  }\n\n} // mapStateToProps может делать повторные рендеринги\n// если возвращается сложный объект. Читать про reselect!\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(state => ({\n  data: Object(_models_stateApi__WEBPACK_IMPORTED_MODULE_3__[\"getPortfolio\"])(state),\n  works: Object(_models_stateApi__WEBPACK_IMPORTED_MODULE_3__[\"getWorks\"])(state)\n}), dispatch => ({\n  onLinkClick() {\n    dispatch(Object(_actions_actionCreators__WEBPACK_IMPORTED_MODULE_6__[\"changeMenuIndex\"])('homeNav', 1));\n  }\n\n}))(PortfolioContainer));\n\n//# sourceURL=webpack:///./containers/PortfolioContainer.js?");

/***/ }),

/***/ "./containers/PreviewContainer.js":
/*!****************************************!*\
  !*** ./containers/PreviewContainer.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"../node_modules/react-redux/es/index.js\");\n/* harmony import */ var _components_Preview__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/Preview */ \"./components/Preview.js\");\n/* eslint-disable import/no-unresolved */\n\n\n\n\nfunction PreviewContainer(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Preview__WEBPACK_IMPORTED_MODULE_2__[\"default\"], props);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(state => ({\n  workData: state.options.workData,\n  isMobile: !!state.menusActivity.previewNav\n}))(PreviewContainer));\n\n//# sourceURL=webpack:///./containers/PreviewContainer.js?");

/***/ }),

/***/ "./containers/PreviewNavContainer.js":
/*!*******************************************!*\
  !*** ./containers/PreviewNavContainer.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"../node_modules/react-redux/es/index.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store */ \"./store.js\");\n/* harmony import */ var _models_DataStorePreviewNav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @models/DataStorePreviewNav */ \"./models/DataStorePreviewNav.js\");\n/* harmony import */ var _components_PreviewNav__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @components/PreviewNav */ \"./components/PreviewNav.js\");\n/* harmony import */ var _actions_actionCreators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @actions/actionCreators */ \"./actions/actionCreators.js\");\n/* eslint-disable import/no-unresolved */\n\n\n\n\n\n\n\nclass PreviewNavContainer extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  render() {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PreviewNav__WEBPACK_IMPORTED_MODULE_4__[\"default\"], this.props);\n  } // eslint-disable-next-line class-methods-use-this\n\n\n  componentDidMount() {\n    _models_DataStorePreviewNav__WEBPACK_IMPORTED_MODULE_3__[\"default\"].request().then(({\n      menu\n    }) => _store__WEBPACK_IMPORTED_MODULE_2__[\"default\"].dispatch(Object(_actions_actionCreators__WEBPACK_IMPORTED_MODULE_5__[\"addMenuByName\"])('previewNav', menu)));\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(null, dispatch => ({\n  onLinkClick(index) {\n    dispatch(Object(_actions_actionCreators__WEBPACK_IMPORTED_MODULE_5__[\"resetCurrentPage\"])());\n    dispatch(Object(_actions_actionCreators__WEBPACK_IMPORTED_MODULE_5__[\"changeMenuIndex\"])('homeNav', index));\n    dispatch(Object(_actions_actionCreators__WEBPACK_IMPORTED_MODULE_5__[\"changeMenuIndex\"])('previewNav', 0));\n  }\n\n}))(PreviewNavContainer));\n\n//# sourceURL=webpack:///./containers/PreviewNavContainer.js?");

/***/ }),

/***/ "./containers/ProfileContainer.js":
/*!****************************************!*\
  !*** ./containers/ProfileContainer.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"../node_modules/react-redux/es/index.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store */ \"./store.js\");\n/* harmony import */ var _models_DataStoreProfile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @models/DataStoreProfile */ \"./models/DataStoreProfile.js\");\n/* harmony import */ var _components_Profile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @components/Profile */ \"./components/Profile.js\");\n/* harmony import */ var _actions_actionCreators_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @actions/actionCreators.js */ \"./actions/actionCreators.js\");\n/* eslint-disable import/no-unresolved */\n\n\n\n\n\n\n\nclass ProfileContainer extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  render() {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Profile__WEBPACK_IMPORTED_MODULE_4__[\"default\"], this.props);\n  } // eslint-disable-next-line class-methods-use-this\n\n\n  componentDidMount() {\n    _models_DataStoreProfile__WEBPACK_IMPORTED_MODULE_3__[\"default\"].request().then(data => _store__WEBPACK_IMPORTED_MODULE_2__[\"default\"].dispatch(Object(_actions_actionCreators_js__WEBPACK_IMPORTED_MODULE_5__[\"setProfile\"])(data)));\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(state => ({\n  data: state.profile\n}))(ProfileContainer));\n\n//# sourceURL=webpack:///./containers/ProfileContainer.js?");

/***/ }),

/***/ "./containers/WorkContainer.js":
/*!*************************************!*\
  !*** ./containers/WorkContainer.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"../node_modules/react-redux/es/index.js\");\n/* harmony import */ var _actions_actionCreators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @actions/actionCreators */ \"./actions/actionCreators.js\");\n/* harmony import */ var _components_Work__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @components/Work */ \"./components/Work.js\");\n/* harmony import */ var _public_img_default_work_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @public/img/default-work.svg */ \"../public/img/default-work.svg\");\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n/* eslint-disable import/no-unresolved */\n\n\n\n // function WorkContainer(props) {\n//   return <Work {...props} />;\n// }\n\n\n\nclass WorkContainer extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      thumbnail: _public_img_default_work_svg__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\n    };\n  }\n\n  render() {\n    const data = { ...this.props.data,\n      thumbnail: this.state.thumbnail\n    };\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Work__WEBPACK_IMPORTED_MODULE_3__[\"default\"], _extends({}, this.props, {\n      data: data\n    }));\n  }\n\n  componentDidMount() {\n    __webpack_require__(\"../public/img lazy recursive ^\\\\.\\\\/.*$\")(`./${this.props.data.thumbnail}`).then(({\n      default: thumbnail\n    }) => {\n      thumbnail && this.setState({\n        thumbnail\n      });\n    });\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(null, dispatch => ({\n  onClick(workData) {\n    dispatch(Object(_actions_actionCreators__WEBPACK_IMPORTED_MODULE_2__[\"selectWork\"])(workData));\n  }\n\n}))(WorkContainer));\n\n//# sourceURL=webpack:///./containers/WorkContainer.js?");

/***/ }),

/***/ "./index.css":
/*!*******************!*\
  !*** ./index.css ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n    if(false) { var cssReload; }\n  \n\n//# sourceURL=webpack:///./index.css?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"../node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"../node_modules/react-redux/es/index.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./store */ \"./store.js\");\n/* harmony import */ var _containers_AppContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./containers/AppContainer */ \"./containers/AppContainer.js\");\n/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.min.css */ \"../node_modules/bootstrap/dist/css/bootstrap.min.css\");\n/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./index.css */ \"./index.css\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\nreact_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_2__[\"Provider\"], {\n  store: _store__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_AppContainer__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null)), document.getElementById('root')); // const state = {\n//   options: {\n//     currentPage: 1,\n//     isActiveHomeNav: false,\n//     selectedWork: null,\n//   }\n//   profile: {},\n//   works: [],\n//   pages: [],\n//   menus: {},\n//   menusActivity: {\n//     homeNav: 0,\n//     portfolio: 0,\n//     previewNav: 0,\n//   }\n// };\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./models/DataStore.js":
/*!*****************************!*\
  !*** ./models/DataStore.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ \"./utils.js\");\n// eslint-disable-next-line import/no-unresolved\n\n\nclass DataStore {\n  constructor(url, options) {\n    this.url = url;\n    this.options = options;\n  }\n\n  request(force = false) {\n    return new Promise(resolve => {\n      if (!force && this._data && !Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"isEmptyObj\"])(this._data)) {\n        resolve(this._data);\n        return;\n      }\n\n      fetch(this.url).then(response => resolve(this._data = response.json()));\n    });\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (DataStore);\n\n//# sourceURL=webpack:///./models/DataStore.js?");

/***/ }),

/***/ "./models/DataStoreContacts.js":
/*!*************************************!*\
  !*** ./models/DataStoreContacts.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DataStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DataStore */ \"./models/DataStore.js\");\n\n\nclass DataStoreContacts extends _DataStore__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor() {\n    super('', null);\n    this._data = {\n      page: {\n        id: 3,\n        slug: 'contacts',\n        title: 'Контакты',\n        content: '<p>Вы можете заказать у меня разработку проекта различной сложности;<br>для этого просто напишите мне на почту или в скайп.</p><p>Список моих основных контактов:</p>',\n        thumbnail: ''\n      },\n      menu: [{\n        id: 31,\n        href: 'mailto:roman.sharpe23@gmail.com?subject=https://rsharpe.github.io%20|%20Вопрос%20от%20пользователя',\n        text: '<i class=\"icon-envelop\"></i> roman.sharpe23@gmail.com',\n        target: '_self'\n      }, {\n        id: 32,\n        href: 'skype:live:c2c4fc2303dd2314?chat',\n        text: '<i class=\"icon-skype\"></i> Roman Sharpe',\n        target: '_self'\n      }, {\n        id: 33,\n        href: 'https://vk.com/id540030329',\n        text: '<i class=\"icon-vk\"></i> Роман Шарп',\n        target: '_blank'\n      }]\n    };\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new DataStoreContacts());\n\n//# sourceURL=webpack:///./models/DataStoreContacts.js?");

/***/ }),

/***/ "./models/DataStoreHomeNav.js":
/*!************************************!*\
  !*** ./models/DataStoreHomeNav.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DataStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DataStore */ \"./models/DataStore.js\");\n\n\nclass DataStoreHomeNav extends _DataStore__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor() {\n    super('', null);\n    this._data = {\n      menu: [{\n        id: 11,\n        href: '#',\n        text: 'Портфолио',\n        target: '_self'\n      }, {\n        id: 12,\n        href: '#',\n        text: 'Контакты',\n        target: '_self'\n      }]\n    };\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new DataStoreHomeNav());\n\n//# sourceURL=webpack:///./models/DataStoreHomeNav.js?");

/***/ }),

/***/ "./models/DataStorePortfolio.js":
/*!**************************************!*\
  !*** ./models/DataStorePortfolio.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DataStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DataStore */ \"./models/DataStore.js\");\n\n\nclass DataStorePortfolio extends _DataStore__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor() {\n    super('', null);\n    this._data = {\n      page: {\n        id: 2,\n        slug: 'portfolio',\n        title: 'Мои работы',\n        content: '',\n        thumbnail: ''\n      },\n      menu: [{\n        id: 21,\n        href: 7,\n        text: 'Все',\n        target: '_self'\n      }, {\n        id: 22,\n        href: 1,\n        text: 'Веб-сайты',\n        target: '_self'\n      }, {\n        id: 23,\n        href: 2,\n        text: 'Плагины',\n        target: '_self'\n      } // {\n      //   id: 24,\n      //   href: 4,\n      //   text: 'Моб. приложения',\n      //   target: '_self',\n      // },\n      ],\n      works: [{\n        id: 13,\n        type: 1,\n        title: 'React Dashboard - SPA',\n        content: '<p>Админка на React c использованием React Router, React Hooks, <a href=\"https://github.com/rsharpe23/react-dashboard\" target=\"_blank\" rel=\"nofollow\">webApi</a>. Основной функционал: авторизация, фильтры, поиск, пагинация, модель CRUD, парсинг данных для таблицы, роутинг, работы с формами, отправка файлов</p>',\n        thumbnail: 'dashboard.jpg',\n        price: 0,\n        daysPerDev: 0,\n        link: {\n          id: 0,\n          text: 'React Dashboard - SPA',\n          href: 'https://github.com/rsharpe23/react-dashboard',\n          target: '_blank'\n        }\n      }, {\n        id: 11,\n        type: 2,\n        title: 'webApi - http-клиент',\n        content: '<p>Пользовательский http-клиент для взаимодействия с веб-сервисом на бэкенде.</p>',\n        thumbnail: 'javascript.jpg',\n        price: 0,\n        daysPerDev: 0,\n        link: {\n          id: 0,\n          text: 'webApi - http-клиент',\n          href: 'https://github.com/rsharpe23/web-api',\n          target: '_blank'\n        }\n      }, {\n        id: 12,\n        type: 1,\n        title: 'Веб-сервис на Laravel',\n        content: '<p>Веб-сервис для клиент-серверного взаимодействия через rest-api и аутентификацией с помощью JWT</p>',\n        thumbnail: 'laravel-invert.jpg',\n        price: 0,\n        daysPerDev: 0,\n        link: {\n          id: 0,\n          text: 'Веб-сервис на Laravel',\n          href: 'https://github.com/rsharpe23/laravel-example',\n          target: '_blank'\n        }\n      }, {\n        id: 1,\n        type: 1,\n        title: 'Сбор трав «Шведская горечь»',\n        content: '<p>Верстка + интеграция на WordPress.<br>БЭМ-именование, адаптив, flexbox, анимации, счетчик цифр, табы.</p>',\n        thumbnail: 'swedish-bitter.jpg',\n        price: 100,\n        daysPerDev: 7,\n        link: {\n          id: 0,\n          text: 'Сбор трав «Шведская горечь»',\n          href: 'https://rsharpe23.github.io/portfolio/swedish-bitter/',\n          target: '_self'\n        }\n      }, {\n        id: 2,\n        type: 1,\n        title: 'Voronina — Food фотограф',\n        content: '<p>Верстка + интеграция на WordPress.<br>БЭМ-именование, анимации, адаптив. Плагины: fullpage, scrollpoint, anim-fx, parallax-fx.</p>',\n        thumbnail: 'voronina.jpg',\n        price: 70,\n        daysPerDev: 5,\n        link: {\n          id: 0,\n          text: 'Voronina — Food фотограф',\n          href: 'https://rsharpe23.github.io/portfolio/voronina/',\n          target: '_self'\n        }\n      }, {\n        id: 3,\n        type: 1,\n        title: 'Симпатичный лендинг',\n        content: '<p>Верстка страницы, БЭМ, анимации, адаптив, scrollpoint, anim-fx, video-player.</p>',\n        thumbnail: 'odigo.jpg',\n        price: 40,\n        daysPerDev: 3,\n        link: {\n          id: 0,\n          text: 'Симпатичный лендинг',\n          href: 'https://rsharpe23.github.io/portfolio/odigo/',\n          target: '_self'\n        }\n      }, {\n        id: 4,\n        type: 1,\n        title: 'RSharpe Blog',\n        content: '<p>Верстка 4x страниц + интеграция на WordPress.<br>Адаптив, пользовательские виджеты, пагинация, кнопоки «поделиться в соц. сетях»<br>SEO-оптимизация через плагин Yoast SEO.</p>',\n        thumbnail: 'rsharpe-blog.jpg',\n        price: 120,\n        daysPerDev: 7,\n        link: {\n          id: 0,\n          text: 'RSharpe Blog',\n          href: 'https://rsharpe-blog.ru/',\n          target: '_self'\n        }\n      }, {\n        id: 5,\n        type: 2,\n        title: 'Landing Page на WordPress',\n        content: '<p>Функционал Landing Page посредством WordPress Customizer, с возможностью удобного и быстрого наполнения контента в режиме рилтайм.</p>',\n        thumbnail: 'wordpress.jpg',\n        price: 40,\n        daysPerDev: 2,\n        link: {\n          id: 0,\n          text: 'Landing Page на WordPress',\n          href: 'https://stalking-reenlistme.000webhostapp.com/?autologin=1',\n          target: '_blank'\n        }\n      }, {\n        id: 6,\n        type: 2,\n        title: 'Fullpage - jQuery Plugin',\n        content: '<p>Плагин для постраничной прокрутки разделов сайта. Альтернатива с лицензией MIT для <a href=\"https://alvarotrigo.com/fullPage\" target=\"_blank\" rel=\"nofollow\">https://alvarotrigo.com/fullPage</a></p>',\n        thumbnail: 'javascript.jpg',\n        price: 0,\n        daysPerDev: 14,\n        link: {\n          id: 0,\n          text: 'Fullpage - jQuery Plugin',\n          href: 'https://github.com/rsharpe23/fullpage/',\n          target: '_blank'\n        }\n      }, {\n        id: 7,\n        type: 2,\n        title: 'Scrollpoint - jQuery Plugin',\n        content: '<p>Вызывает заданные функции при попадании необходимых DOM-элементов в область видимости экрана. Легковесная альтернатива <a href=\"http://imakewebthings.com/waypoints\" target=\"_blank\" rel=\"nofollow\">http://imakewebthings.com/waypoints</a><br>с уникальным функционалом.</p>',\n        thumbnail: 'javascript.jpg',\n        price: 0,\n        daysPerDev: 10,\n        link: {\n          id: 0,\n          text: 'Scrollpoint - jQuery Plugin',\n          href: 'https://github.com/rsharpe23/scrollpoint',\n          target: '_blank'\n        }\n      }, {\n        id: 8,\n        type: 2,\n        title: 'ParallaxFx - jQuery Plugin',\n        content: '<p>Плагин добавляет эффект «эхо» после прокрутки DOM-элементов на странице. Работает в связке со <a href=\"#\" target=\"_blank\" rel=\"nofollow\">Scrollpoint</a></p>',\n        thumbnail: 'javascript.jpg',\n        price: 0,\n        daysPerDev: 1,\n        link: {\n          id: 0,\n          text: 'ParallaxFx - jQuery Plugin',\n          href: 'https://github.com/rsharpe23/parallax-fx',\n          target: '_blank'\n        }\n      }, // {\n      //   id: 9,\n      //   type: 2,\n      //   title: 'AnimFx - jQuery Plugin',\n      //   content: '<p>Простой плагин, для выполнения оптимизированных анимационных эффектов на странице.</p>',\n      //   thumbnail: 'javascript.jpg',\n      //   price: 0,\n      //   daysPerDev: 1,\n      //   link: {\n      //     id: 0,\n      //     text: 'AnimFx - jQuery Plugin',\n      //     href: 'https://github.com/rsharpe23/anim-fx',\n      //     target: '_blank',\n      //   },\n      // },\n      {\n        id: 10,\n        type: 2,\n        title: 'RSh-ThemeMods - WordPress Plugin',\n        content: '<p>Плагин для импорта/экспорта настроек WordPress-темы. Позволяет сохранить и безопасно восстановить настройки темы, при потере данных.</p>',\n        thumbnail: 'wordpress.jpg',\n        price: 0,\n        daysPerDev: 3,\n        link: {\n          id: 0,\n          text: 'RSh-ThemeMods - WordPress Plugin',\n          href: 'https://github.com/rsharpe23/rsh-theme-mods',\n          target: '_blank'\n        }\n      }]\n    };\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new DataStorePortfolio());\n\n//# sourceURL=webpack:///./models/DataStorePortfolio.js?");

/***/ }),

/***/ "./models/DataStorePreviewNav.js":
/*!***************************************!*\
  !*** ./models/DataStorePreviewNav.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DataStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DataStore */ \"./models/DataStore.js\");\n\n\nclass DataStorePreviewNav extends _DataStore__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor() {\n    super('', null);\n    this._data = {\n      menu: [{\n        id: 41,\n        href: '#',\n        text: '<i class=\"icon-display\"></i>',\n        target: '_self'\n      }, {\n        id: 42,\n        href: '#',\n        text: '<i class=\"icon-mobile\"></i>',\n        target: '_self'\n      }]\n    };\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new DataStorePreviewNav());\n\n//# sourceURL=webpack:///./models/DataStorePreviewNav.js?");

/***/ }),

/***/ "./models/DataStoreProfile.js":
/*!************************************!*\
  !*** ./models/DataStoreProfile.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DataStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DataStore */ \"./models/DataStore.js\");\n\n\nclass DataStoreProfile extends _DataStore__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor() {\n    super('', null);\n    this._data = {\n      photoUrl: '',\n      content: '<p>Приветствую Вас!<br>Меня зовут Роман, я front-end разработчик</p>',\n      link: {\n        id: 0,\n        href: 'https://github.com/rsharpe23',\n        text: '<i class=\"icon-github Icon\"></i> Профиль GitHub',\n        target: '_blank'\n      }\n    };\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new DataStoreProfile());\n\n//# sourceURL=webpack:///./models/DataStoreProfile.js?");

/***/ }),

/***/ "./models/stateApi.js":
/*!****************************!*\
  !*** ./models/stateApi.js ***!
  \****************************/
/*! exports provided: getPortfolio, getContacts, getPage, getWorks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getPortfolio\", function() { return getPortfolio; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getContacts\", function() { return getContacts; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getPage\", function() { return getPage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getWorks\", function() { return getWorks; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ \"./utils.js\");\n// eslint-disable-next-line import/no-unresolved\n\nfunction getPortfolio({\n  pages\n}) {\n  return getPage(pages, 'portfolio');\n}\nfunction getContacts({\n  pages\n}) {\n  return getPage(pages, 'contacts');\n}\nfunction getPage(pages, slug) {\n  return pages.find(p => p.slug === slug);\n}\nfunction getWorks({\n  menus,\n  menusActivity,\n  works\n}) {\n  const menu = menus.portfolio;\n\n  if (!menu || Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"isEmptyObj\"])(menu)) {\n    return [];\n  }\n\n  const menuLink = menu[menusActivity.portfolio];\n  const worksType = +menuLink.href;\n  return works.filter(w => w.type & worksType);\n}\n\n//# sourceURL=webpack:///./models/stateApi.js?");

/***/ }),

/***/ "./reducers/menusActivityReducer.js":
/*!******************************************!*\
  !*** ./reducers/menusActivityReducer.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @actions/actionTypes */ \"./actions/actionTypes.js\");\n/* eslint-disable import/no-unresolved */\n\nconst initialState = {\n  homeNav: 0,\n  portfolio: 0,\n  previewNav: 0\n};\n\nfunction menusActivityReducer(state = initialState, action) {\n  if (action.type === _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"CHANGE_MENU_INDEX\"]) {\n    return { ...state,\n      [action.menuName]: action.newIndex\n    };\n  }\n\n  return state;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (menusActivityReducer);\n\n//# sourceURL=webpack:///./reducers/menusActivityReducer.js?");

/***/ }),

/***/ "./reducers/menusReducer.js":
/*!**********************************!*\
  !*** ./reducers/menusReducer.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @actions/actionTypes */ \"./actions/actionTypes.js\");\n/* eslint-disable import/no-unresolved */\n\n\nfunction menusReducer(state = {}, action) {\n  if (action.type === _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"ADD_MENU_BY_NAME\"]) {\n    // В Redux глубокое копирование данных делать не нужно\n    // https://stackoverflow.com/questions/43151622/in-redux-is-it-necessary-to-do-deep-copy\n    return { ...state,\n      [action.name]: action.menu\n    };\n  }\n\n  return state;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (menusReducer);\n\n//# sourceURL=webpack:///./reducers/menusReducer.js?");

/***/ }),

/***/ "./reducers/optionsReducer.js":
/*!************************************!*\
  !*** ./reducers/optionsReducer.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @actions/actionTypes */ \"./actions/actionTypes.js\");\n/* eslint-disable import/no-unresolved */\n\nconst initialState = {\n  currentPage: 1,\n  // только home и preview\n  isActiveHomeNav: false,\n  workData: null\n};\n\nfunction optionsReducer(state = initialState, action) {\n  switch (action.type) {\n    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"TOGGLE_HOME_NAV_CHEVRON\"]:\n      return { ...state,\n        isActiveHomeNav: action.value\n      };\n\n    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"SELECT_WORK\"]:\n      return { ...state,\n        currentPage: 2,\n        workData: action.workData\n      };\n\n    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"RESET_CURRENT_PAGE\"]:\n      return { ...state,\n        currentPage: 1,\n        workData: null\n      };\n\n    default:\n      return state;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (optionsReducer);\n\n//# sourceURL=webpack:///./reducers/optionsReducer.js?");

/***/ }),

/***/ "./reducers/pagesReducer.js":
/*!**********************************!*\
  !*** ./reducers/pagesReducer.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @actions/actionTypes */ \"./actions/actionTypes.js\");\n/* eslint-disable import/no-unresolved */\n\n\nfunction pagesReducer(state = [], action) {\n  if (action.type === _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"ADD_PAGE\"]) {\n    return [...state, { ...action.page\n    }];\n  }\n\n  return state;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (pagesReducer);\n\n//# sourceURL=webpack:///./reducers/pagesReducer.js?");

/***/ }),

/***/ "./reducers/profileReducer.js":
/*!************************************!*\
  !*** ./reducers/profileReducer.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @actions/actionTypes */ \"./actions/actionTypes.js\");\n/* eslint-disable import/no-unresolved */\n\n\nfunction profileReducer(state = {}, action) {\n  if (action.type === _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__[\"SET_PROFILE\"]) {\n    // Нет необходимости перезаписывать данные из предыдущего состояния, \n    // т.к. action.profile возвращает полностью новые данные\n    return action.profile;\n  }\n\n  return state;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (profileReducer);\n\n//# sourceURL=webpack:///./reducers/profileReducer.js?");

/***/ }),

/***/ "./reducers/rootReducer.js":
/*!*********************************!*\
  !*** ./reducers/rootReducer.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"../node_modules/redux/es/redux.js\");\n/* harmony import */ var _optionsReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./optionsReducer */ \"./reducers/optionsReducer.js\");\n/* harmony import */ var _profileReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profileReducer */ \"./reducers/profileReducer.js\");\n/* harmony import */ var _worksReducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./worksReducer */ \"./reducers/worksReducer.js\");\n/* harmony import */ var _pagesReducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pagesReducer */ \"./reducers/pagesReducer.js\");\n/* harmony import */ var _menusReducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./menusReducer */ \"./reducers/menusReducer.js\");\n/* harmony import */ var _menusActivityReducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./menusActivityReducer */ \"./reducers/menusActivityReducer.js\");\n\n\n\n\n\n\n\nconst rootReducer = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"combineReducers\"])({\n  options: _optionsReducer__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  profile: _profileReducer__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  works: _worksReducer__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  pages: _pagesReducer__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n  menus: _menusReducer__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n  menusActivity: _menusActivityReducer__WEBPACK_IMPORTED_MODULE_6__[\"default\"]\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (rootReducer);\n\n//# sourceURL=webpack:///./reducers/rootReducer.js?");

/***/ }),

/***/ "./reducers/worksReducer.js":
/*!**********************************!*\
  !*** ./reducers/worksReducer.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ \"./utils.js\");\n/* harmony import */ var _actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @actions/actionTypes */ \"./actions/actionTypes.js\");\n/* eslint-disable import/no-unresolved */\n\n\n\nfunction worksReducer(state = [], action) {\n  if (action.type === _actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__[\"ADD_UPDATE_WORKS\"]) {\n    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"merge\"])(state, action.works, 'id');\n  }\n\n  return state;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (worksReducer);\n\n//# sourceURL=webpack:///./reducers/worksReducer.js?");

/***/ }),

/***/ "./store.js":
/*!******************!*\
  !*** ./store.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"../node_modules/redux/es/redux.js\");\n/* harmony import */ var _reducers_rootReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @reducers/rootReducer */ \"./reducers/rootReducer.js\");\n/* eslint-disable import/no-unresolved */\n\n\nconst store = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"createStore\"])(_reducers_rootReducer__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (store);\n\n//# sourceURL=webpack:///./store.js?");

/***/ }),

/***/ "./utils.js":
/*!******************!*\
  !*** ./utils.js ***!
  \******************/
/*! exports provided: createMarkup, isEmptyObj, capitalize, merge */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createMarkup\", function() { return createMarkup; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isEmptyObj\", function() { return isEmptyObj; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"capitalize\", function() { return capitalize; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"merge\", function() { return merge; });\nfunction createMarkup(rawHtml) {\n  return {\n    __html: rawHtml\n  };\n}\nfunction isEmptyObj(value) {\n  return Object.keys(value).length === 0;\n}\nfunction capitalize(value) {\n  return value[0].toUpperCase() + value.slice(1);\n}\nfunction merge(arr1, arr2, prop) {\n  // Метод reduce вместо filter т.к. надо получить \n  // объект { n1: {...item}, n2: {...item}, ... }, \n  // а filter вернул бы [{ n1: {...item} }, { n2: {...item} }, ...]\n  const x = arr1.reduce((acc, item, index) => {\n    const value = arr2.find(i => i[prop] === item[prop]);\n\n    if (!!value) {\n      acc[index] = value;\n    }\n\n    return acc;\n  }, {});\n  const y = arr2.filter(item => !Object.values(x).find(i => i[prop] === item[prop]));\n  const result = arr1.concat(y);\n  Object.keys(x).forEach(key => result[key] = x[key]);\n  return result;\n} // С динамическими импортами в webpack есть проблемы, \n// поэтому лучше всего их использовать прямо в компоненте, \n// тогда все предупреждения сведутся к одному \"DevTools failed to parse SourceMap\"\n// export function importFile(file, mimeTime = 'img') {\n//   return new Promise((resolve, reject) => {\n//     if (!file) {\n//       reject(new Error('Invalid file'));\n//       return;\n//     }\n//     import(`@public/${mimeTime}/${file}`)\n//       .then(({ default: distFile }) => resolve(distFile));\n//   });\n// }\n\n//# sourceURL=webpack:///./utils.js?");

/***/ })

/******/ });