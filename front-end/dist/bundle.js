/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _profile = __webpack_require__(2);

	var _profile2 = _interopRequireDefault(_profile);

	var _prismjs = __webpack_require__(3);

	var _prismjs2 = _interopRequireDefault(_prismjs);

	__webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	document.addEventListener("DOMContentLoaded", function () {
	  document.getElementById('container').innerHTML = _profile2.default.load();
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _prismjs = __webpack_require__(3);

	var _prismjs2 = _interopRequireDefault(_prismjs);

	__webpack_require__(4);

	var _profile = __webpack_require__(5);

	var _profile2 = _interopRequireDefault(_profile);

	var _autolinker = __webpack_require__(6);

	var _autolinker2 = _interopRequireDefault(_autolinker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Profile = function () {
	  function Profile() {
	    var attrs = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    _classCallCheck(this, Profile);

	    this.name = attrs.name;
	    this.title = attrs.title;
	  }

	  _createClass(Profile, null, [{
	    key: 'load',
	    value: function load() {
	      return _autolinker2.default.link(_prismjs2.default.highlight(_profile2.default, _prismjs2.default.languages.ruby));
	    }
	  }]);

	  return Profile;
	}();

	exports.default = Profile;

/***/ },
/* 3 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/* **********************************************
	     Begin prism-core.js
	********************************************** */

	var _self = (typeof window !== 'undefined')
		? window   // if in browser
		: (
			(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
			? self // if in worker
			: {}   // if in node js
		);

	/**
	 * Prism: Lightweight, robust, elegant syntax highlighting
	 * MIT license http://www.opensource.org/licenses/mit-license.php/
	 * @author Lea Verou http://lea.verou.me
	 */

	var Prism = (function(){

	// Private helper vars
	var lang = /\blang(?:uage)?-(\w+)\b/i;
	var uniqueId = 0;

	var _ = _self.Prism = {
		util: {
			encode: function (tokens) {
				if (tokens instanceof Token) {
					return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
				} else if (_.util.type(tokens) === 'Array') {
					return tokens.map(_.util.encode);
				} else {
					return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
				}
			},

			type: function (o) {
				return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
			},

			objId: function (obj) {
				if (!obj['__id']) {
					Object.defineProperty(obj, '__id', { value: ++uniqueId });
				}
				return obj['__id'];
			},

			// Deep clone a language definition (e.g. to extend it)
			clone: function (o) {
				var type = _.util.type(o);

				switch (type) {
					case 'Object':
						var clone = {};

						for (var key in o) {
							if (o.hasOwnProperty(key)) {
								clone[key] = _.util.clone(o[key]);
							}
						}

						return clone;

					case 'Array':
						// Check for existence for IE8
						return o.map && o.map(function(v) { return _.util.clone(v); });
				}

				return o;
			}
		},

		languages: {
			extend: function (id, redef) {
				var lang = _.util.clone(_.languages[id]);

				for (var key in redef) {
					lang[key] = redef[key];
				}

				return lang;
			},

			/**
			 * Insert a token before another token in a language literal
			 * As this needs to recreate the object (we cannot actually insert before keys in object literals),
			 * we cannot just provide an object, we need anobject and a key.
			 * @param inside The key (or language id) of the parent
			 * @param before The key to insert before. If not provided, the function appends instead.
			 * @param insert Object with the key/value pairs to insert
			 * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
			 */
			insertBefore: function (inside, before, insert, root) {
				root = root || _.languages;
				var grammar = root[inside];

				if (arguments.length == 2) {
					insert = arguments[1];

					for (var newToken in insert) {
						if (insert.hasOwnProperty(newToken)) {
							grammar[newToken] = insert[newToken];
						}
					}

					return grammar;
				}

				var ret = {};

				for (var token in grammar) {

					if (grammar.hasOwnProperty(token)) {

						if (token == before) {

							for (var newToken in insert) {

								if (insert.hasOwnProperty(newToken)) {
									ret[newToken] = insert[newToken];
								}
							}
						}

						ret[token] = grammar[token];
					}
				}

				// Update references in other language definitions
				_.languages.DFS(_.languages, function(key, value) {
					if (value === root[inside] && key != inside) {
						this[key] = ret;
					}
				});

				return root[inside] = ret;
			},

			// Traverse a language definition with Depth First Search
			DFS: function(o, callback, type, visited) {
				visited = visited || {};
				for (var i in o) {
					if (o.hasOwnProperty(i)) {
						callback.call(o, i, o[i], type || i);

						if (_.util.type(o[i]) === 'Object' && !visited[_.util.objId(o[i])]) {
							visited[_.util.objId(o[i])] = true;
							_.languages.DFS(o[i], callback, null, visited);
						}
						else if (_.util.type(o[i]) === 'Array' && !visited[_.util.objId(o[i])]) {
							visited[_.util.objId(o[i])] = true;
							_.languages.DFS(o[i], callback, i, visited);
						}
					}
				}
			}
		},
		plugins: {},

		highlightAll: function(async, callback) {
			var env = {
				callback: callback,
				selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
			};

			_.hooks.run("before-highlightall", env);

			var elements = env.elements || document.querySelectorAll(env.selector);

			for (var i=0, element; element = elements[i++];) {
				_.highlightElement(element, async === true, env.callback);
			}
		},

		highlightElement: function(element, async, callback) {
			// Find language
			var language, grammar, parent = element;

			while (parent && !lang.test(parent.className)) {
				parent = parent.parentNode;
			}

			if (parent) {
				language = (parent.className.match(lang) || [,''])[1].toLowerCase();
				grammar = _.languages[language];
			}

			// Set language on the element, if not present
			element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

			// Set language on the parent, for styling
			parent = element.parentNode;

			if (/pre/i.test(parent.nodeName)) {
				parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
			}

			var code = element.textContent;

			var env = {
				element: element,
				language: language,
				grammar: grammar,
				code: code
			};

			_.hooks.run('before-sanity-check', env);

			if (!env.code || !env.grammar) {
				_.hooks.run('complete', env);
				return;
			}

			_.hooks.run('before-highlight', env);

			if (async && _self.Worker) {
				var worker = new Worker(_.filename);

				worker.onmessage = function(evt) {
					env.highlightedCode = evt.data;

					_.hooks.run('before-insert', env);

					env.element.innerHTML = env.highlightedCode;

					callback && callback.call(env.element);
					_.hooks.run('after-highlight', env);
					_.hooks.run('complete', env);
				};

				worker.postMessage(JSON.stringify({
					language: env.language,
					code: env.code,
					immediateClose: true
				}));
			}
			else {
				env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

				_.hooks.run('before-insert', env);

				env.element.innerHTML = env.highlightedCode;

				callback && callback.call(element);

				_.hooks.run('after-highlight', env);
				_.hooks.run('complete', env);
			}
		},

		highlight: function (text, grammar, language) {
			var tokens = _.tokenize(text, grammar);
			return Token.stringify(_.util.encode(tokens), language);
		},

		tokenize: function(text, grammar, language) {
			var Token = _.Token;

			var strarr = [text];

			var rest = grammar.rest;

			if (rest) {
				for (var token in rest) {
					grammar[token] = rest[token];
				}

				delete grammar.rest;
			}

			tokenloop: for (var token in grammar) {
				if(!grammar.hasOwnProperty(token) || !grammar[token]) {
					continue;
				}

				var patterns = grammar[token];
				patterns = (_.util.type(patterns) === "Array") ? patterns : [patterns];

				for (var j = 0; j < patterns.length; ++j) {
					var pattern = patterns[j],
						inside = pattern.inside,
						lookbehind = !!pattern.lookbehind,
						greedy = !!pattern.greedy,
						lookbehindLength = 0,
						alias = pattern.alias;

					pattern = pattern.pattern || pattern;

					for (var i=0; i<strarr.length; i++) { // Don’t cache length as it changes during the loop

						var str = strarr[i];

						if (strarr.length > text.length) {
							// Something went terribly wrong, ABORT, ABORT!
							break tokenloop;
						}

						if (str instanceof Token) {
							continue;
						}

						pattern.lastIndex = 0;

						var match = pattern.exec(str),
						    delNum = 1;

						// Greedy patterns can override/remove up to two previously matched tokens
						if (!match && greedy && i != strarr.length - 1) {
							// Reconstruct the original text using the next two tokens
							var nextToken = strarr[i + 1].matchedStr || strarr[i + 1],
							    combStr = str + nextToken;

							if (i < strarr.length - 2) {
								combStr += strarr[i + 2].matchedStr || strarr[i + 2];
							}

							// Try the pattern again on the reconstructed text
							pattern.lastIndex = 0;
							match = pattern.exec(combStr);
							if (!match) {
								continue;
							}

							var from = match.index + (lookbehind ? match[1].length : 0);
							// To be a valid candidate, the new match has to start inside of str
							if (from >= str.length) {
								continue;
							}
							var to = match.index + match[0].length,
							    len = str.length + nextToken.length;

							// Number of tokens to delete and replace with the new match
							delNum = 3;

							if (to <= len) {
								if (strarr[i + 1].greedy) {
									continue;
								}
								delNum = 2;
								combStr = combStr.slice(0, len);
							}
							str = combStr;
						}

						if (!match) {
							continue;
						}

						if(lookbehind) {
							lookbehindLength = match[1].length;
						}

						var from = match.index + lookbehindLength,
						    match = match[0].slice(lookbehindLength),
						    to = from + match.length,
						    before = str.slice(0, from),
						    after = str.slice(to);

						var args = [i, delNum];

						if (before) {
							args.push(before);
						}

						var wrapped = new Token(token, inside? _.tokenize(match, inside) : match, alias, match, greedy);

						args.push(wrapped);

						if (after) {
							args.push(after);
						}

						Array.prototype.splice.apply(strarr, args);
					}
				}
			}

			return strarr;
		},

		hooks: {
			all: {},

			add: function (name, callback) {
				var hooks = _.hooks.all;

				hooks[name] = hooks[name] || [];

				hooks[name].push(callback);
			},

			run: function (name, env) {
				var callbacks = _.hooks.all[name];

				if (!callbacks || !callbacks.length) {
					return;
				}

				for (var i=0, callback; callback = callbacks[i++];) {
					callback(env);
				}
			}
		}
	};

	var Token = _.Token = function(type, content, alias, matchedStr, greedy) {
		this.type = type;
		this.content = content;
		this.alias = alias;
		// Copy of the full string this token was created from
		this.matchedStr = matchedStr || null;
		this.greedy = !!greedy;
	};

	Token.stringify = function(o, language, parent) {
		if (typeof o == 'string') {
			return o;
		}

		if (_.util.type(o) === 'Array') {
			return o.map(function(element) {
				return Token.stringify(element, language, o);
			}).join('');
		}

		var env = {
			type: o.type,
			content: Token.stringify(o.content, language, parent),
			tag: 'span',
			classes: ['token', o.type],
			attributes: {},
			language: language,
			parent: parent
		};

		if (env.type == 'comment') {
			env.attributes['spellcheck'] = 'true';
		}

		if (o.alias) {
			var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
			Array.prototype.push.apply(env.classes, aliases);
		}

		_.hooks.run('wrap', env);

		var attributes = '';

		for (var name in env.attributes) {
			attributes += (attributes ? ' ' : '') + name + '="' + (env.attributes[name] || '') + '"';
		}

		return '<' + env.tag + ' class="' + env.classes.join(' ') + '" ' + attributes + '>' + env.content + '</' + env.tag + '>';

	};

	if (!_self.document) {
		if (!_self.addEventListener) {
			// in Node.js
			return _self.Prism;
		}
	 	// In worker
		_self.addEventListener('message', function(evt) {
			var message = JSON.parse(evt.data),
			    lang = message.language,
			    code = message.code,
			    immediateClose = message.immediateClose;

			_self.postMessage(_.highlight(code, _.languages[lang], lang));
			if (immediateClose) {
				_self.close();
			}
		}, false);

		return _self.Prism;
	}

	//Get current script and highlight
	var script = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();

	if (script) {
		_.filename = script.src;

		if (document.addEventListener && !script.hasAttribute('data-manual')) {
			if(document.readyState !== "loading") {
				requestAnimationFrame(_.highlightAll, 0);
			}
			else {
				document.addEventListener('DOMContentLoaded', _.highlightAll);
			}
		}
	}

	return _self.Prism;

	})();

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = Prism;
	}

	// hack for components to work correctly in node.js
	if (typeof global !== 'undefined') {
		global.Prism = Prism;
	}


	/* **********************************************
	     Begin prism-markup.js
	********************************************** */

	Prism.languages.markup = {
		'comment': /<!--[\w\W]*?-->/,
		'prolog': /<\?[\w\W]+?\?>/,
		'doctype': /<!DOCTYPE[\w\W]+?>/,
		'cdata': /<!\[CDATA\[[\w\W]*?]]>/i,
		'tag': {
			pattern: /<\/?(?!\d)[^\s>\/=.$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
			inside: {
				'tag': {
					pattern: /^<\/?[^\s>\/]+/i,
					inside: {
						'punctuation': /^<\/?/,
						'namespace': /^[^\s>\/:]+:/
					}
				},
				'attr-value': {
					pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
					inside: {
						'punctuation': /[=>"']/
					}
				},
				'punctuation': /\/?>/,
				'attr-name': {
					pattern: /[^\s>\/]+/,
					inside: {
						'namespace': /^[^\s>\/:]+:/
					}
				}

			}
		},
		'entity': /&#?[\da-z]{1,8};/i
	};

	// Plugin to make entity title show the real entity, idea by Roman Komarov
	Prism.hooks.add('wrap', function(env) {

		if (env.type === 'entity') {
			env.attributes['title'] = env.content.replace(/&amp;/, '&');
		}
	});

	Prism.languages.xml = Prism.languages.markup;
	Prism.languages.html = Prism.languages.markup;
	Prism.languages.mathml = Prism.languages.markup;
	Prism.languages.svg = Prism.languages.markup;


	/* **********************************************
	     Begin prism-css.js
	********************************************** */

	Prism.languages.css = {
		'comment': /\/\*[\w\W]*?\*\//,
		'atrule': {
			pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
			inside: {
				'rule': /@[\w-]+/
				// See rest below
			}
		},
		'url': /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
		'selector': /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
		'string': /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,
		'property': /(\b|\B)[\w-]+(?=\s*:)/i,
		'important': /\B!important\b/i,
		'function': /[-a-z0-9]+(?=\()/i,
		'punctuation': /[(){};:]/
	};

	Prism.languages.css['atrule'].inside.rest = Prism.util.clone(Prism.languages.css);

	if (Prism.languages.markup) {
		Prism.languages.insertBefore('markup', 'tag', {
			'style': {
				pattern: /(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,
				lookbehind: true,
				inside: Prism.languages.css,
				alias: 'language-css'
			}
		});
		
		Prism.languages.insertBefore('inside', 'attr-value', {
			'style-attr': {
				pattern: /\s*style=("|').*?\1/i,
				inside: {
					'attr-name': {
						pattern: /^\s*style/i,
						inside: Prism.languages.markup.tag.inside
					},
					'punctuation': /^\s*=\s*['"]|['"]\s*$/,
					'attr-value': {
						pattern: /.+/i,
						inside: Prism.languages.css
					}
				},
				alias: 'language-css'
			}
		}, Prism.languages.markup.tag);
	}

	/* **********************************************
	     Begin prism-clike.js
	********************************************** */

	Prism.languages.clike = {
		'comment': [
			{
				pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
				lookbehind: true
			},
			{
				pattern: /(^|[^\\:])\/\/.*/,
				lookbehind: true
			}
		],
		'string': {
			pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
			greedy: true
		},
		'class-name': {
			pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
			lookbehind: true,
			inside: {
				punctuation: /(\.|\\)/
			}
		},
		'keyword': /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
		'boolean': /\b(true|false)\b/,
		'function': /[a-z0-9_]+(?=\()/i,
		'number': /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
		'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
		'punctuation': /[{}[\];(),.:]/
	};


	/* **********************************************
	     Begin prism-javascript.js
	********************************************** */

	Prism.languages.javascript = Prism.languages.extend('clike', {
		'keyword': /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
		'number': /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
		// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
		'function': /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i
	});

	Prism.languages.insertBefore('javascript', 'keyword', {
		'regex': {
			pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
			lookbehind: true,
			greedy: true
		}
	});

	Prism.languages.insertBefore('javascript', 'string', {
		'template-string': {
			pattern: /`(?:\\\\|\\?[^\\])*?`/,
			greedy: true,
			inside: {
				'interpolation': {
					pattern: /\$\{[^}]+\}/,
					inside: {
						'interpolation-punctuation': {
							pattern: /^\$\{|\}$/,
							alias: 'punctuation'
						},
						rest: Prism.languages.javascript
					}
				},
				'string': /[\s\S]+/
			}
		}
	});

	if (Prism.languages.markup) {
		Prism.languages.insertBefore('markup', 'tag', {
			'script': {
				pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
				lookbehind: true,
				inside: Prism.languages.javascript,
				alias: 'language-javascript'
			}
		});
	}

	Prism.languages.js = Prism.languages.javascript;

	/* **********************************************
	     Begin prism-file-highlight.js
	********************************************** */

	(function () {
		if (typeof self === 'undefined' || !self.Prism || !self.document || !document.querySelector) {
			return;
		}

		self.Prism.fileHighlight = function() {

			var Extensions = {
				'js': 'javascript',
				'py': 'python',
				'rb': 'ruby',
				'ps1': 'powershell',
				'psm1': 'powershell',
				'sh': 'bash',
				'bat': 'batch',
				'h': 'c',
				'tex': 'latex'
			};

			if(Array.prototype.forEach) { // Check to prevent error in IE8
				Array.prototype.slice.call(document.querySelectorAll('pre[data-src]')).forEach(function (pre) {
					var src = pre.getAttribute('data-src');

					var language, parent = pre;
					var lang = /\blang(?:uage)?-(?!\*)(\w+)\b/i;
					while (parent && !lang.test(parent.className)) {
						parent = parent.parentNode;
					}

					if (parent) {
						language = (pre.className.match(lang) || [, ''])[1];
					}

					if (!language) {
						var extension = (src.match(/\.(\w+)$/) || [, ''])[1];
						language = Extensions[extension] || extension;
					}

					var code = document.createElement('code');
					code.className = 'language-' + language;

					pre.textContent = '';

					code.textContent = 'Loading…';

					pre.appendChild(code);

					var xhr = new XMLHttpRequest();

					xhr.open('GET', src, true);

					xhr.onreadystatechange = function () {
						if (xhr.readyState == 4) {

							if (xhr.status < 400 && xhr.responseText) {
								code.textContent = xhr.responseText;

								Prism.highlightElement(code);
							}
							else if (xhr.status >= 400) {
								code.textContent = '✖ Error ' + xhr.status + ' while fetching file: ' + xhr.statusText;
							}
							else {
								code.textContent = '✖ Error: File does not exist or is empty';
							}
						}
					};

					xhr.send(null);
				});
			}

		};

		document.addEventListener('DOMContentLoaded', self.Prism.fileHighlight);

	})();

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * Original by Samuel Flores
	 *
	 * Adds the following new token classes:
	 * 		constant, builtin, variable, symbol, regex
	 */
	(function(Prism) {
		Prism.languages.ruby = Prism.languages.extend('clike', {
			'comment': /#(?!\{[^\r\n]*?\}).*/,
			'keyword': /\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/
		});

		var interpolation = {
			pattern: /#\{[^}]+\}/,
			inside: {
				'delimiter': {
					pattern: /^#\{|\}$/,
					alias: 'tag'
				},
				rest: Prism.util.clone(Prism.languages.ruby)
			}
		};

		Prism.languages.insertBefore('ruby', 'keyword', {
			'regex': [
				{
					pattern: /%r([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1[gim]{0,3}/,
					inside: {
						'interpolation': interpolation
					}
				},
				{
					pattern: /%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/,
					inside: {
						'interpolation': interpolation
					}
				},
				{
					// Here we need to specifically allow interpolation
					pattern: /%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,
					inside: {
						'interpolation': interpolation
					}
				},
				{
					pattern: /%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/,
					inside: {
						'interpolation': interpolation
					}
				},
				{
					pattern: /%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/,
					inside: {
						'interpolation': interpolation
					}
				},
				{
					pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,
					lookbehind: true
				}
			],
			'variable': /[@$]+[a-zA-Z_][a-zA-Z_0-9]*(?:[?!]|\b)/,
			'symbol': /:[a-zA-Z_][a-zA-Z_0-9]*(?:[?!]|\b)/
		});

		Prism.languages.insertBefore('ruby', 'number', {
			'builtin': /\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
			'constant': /\b[A-Z][a-zA-Z_0-9]*(?:[?!]|\b)/
		});

		Prism.languages.ruby.string = [
			{
				pattern: /%[qQiIwWxs]?([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1/,
				inside: {
					'interpolation': interpolation
				}
			},
			{
				pattern: /%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/,
				inside: {
					'interpolation': interpolation
				}
			},
			{
				// Here we need to specifically allow interpolation
				pattern: /%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,
				inside: {
					'interpolation': interpolation
				}
			},
			{
				pattern: /%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/,
				inside: {
					'interpolation': interpolation
				}
			},
			{
				pattern: /%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/,
				inside: {
					'interpolation': interpolation
				}
			},
			{
				pattern: /("|')(#\{[^}]+\}|\\(?:\r?\n|\r)|\\?.)*?\1/,
				inside: {
					'interpolation': interpolation
				}
			}
		];
	}(Prism));

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "# encoding: UTF-8\n# frozen-string-literal: true\n#\n# =================================\n# The Curriculum Vitae of Cam Huynh\n# =================================\n\nDeveloperRepository.find_by_name(\"Cam Huynh\").inspect\n\n{\n  profile: {\n    name: \"Cam Huynh\",\n    handler: @huynhquancam,\n    title: \"Software Engineer\",\n    location: {\n      city: \"Saigon\",\n      country: \"Vietnam\"\n    },\n    gender: :male,\n    contact: {\n      email: [\n        \"cam@hqc.me\",\n        \"huynhquancam@gmail.com\"\n      ],\n      website: \"https://hqc.io\"\n    }\n  },\n  education: {\n    degree: \"Bachelor of Engineering in Computer Science\",\n    university: \"Industrial University of Ho Chi Minh City (IUH)\"\n  },\n  experience: [\n    {\n      company: \"FootballAddicts\",\n      website: \"http://footballaddicts.com\",\n      title: \"Back-end Developer\",\n      from: \"Sep 2016\",\n      to: :present\n    },\n    {\n      company: \"Dadadee\",\n      website: \"https://dadadee.com\",\n      title: \"Lead Back-end Engineer\",\n      from: \"May 2015\",\n      to: \"March 2016\"\n    },\n    {\n      company: \"ITViec\",\n      website: \"https://itviec.com\",\n      title: \"Ruby Developer\",\n      from: \"Jan 2015\",\n      to: \"May 2015\"\n    },\n    {\n      company: \"FutureWorkz\",\n      website: \"http://futureworkz.com\",\n      title: \"Lead Software Engineer\",\n      from: \"July 2012\",\n      to: \"Dec 2014\"\n    }\n  ],\n  projects: [\n    {\n      name: \"bootstrap_validator_rails\",\n      url: \"https://github.com/huynhquancam/bootstrap_validator_rails\",\n      tags: [:validator, :bootstrap, :rails],\n      technologies: [:Rubygems, :Bootstrap3, :Rails]\n    },\n    {\n      name: \"docebo_ruby\",\n      description: \"Ruby wrapper for Docebo API\",\n      url: \"https://github.com/huynhquancam/docebo_ruby\",\n      tags: [:api, :docebo],\n      technologies: [:RestClient, :Ruby, :RubyGems]\n    },\n    {\n      name: \"chat_stack\",\n      description: \"Chat stack = RESTFul API + WebSocket\",\n      url: \"https://github.com/huynhquancam/chat-stack\",\n      tags: [:chat, :restful],\n      technologies: [:WebSocket, :Ruby, :Node]\n    },\n    {\n      name: \"heroku-gitbook-buildpack\",\n      description: \"Heroku Buildpack for Gitbook\",\n      url: \"https://github.com/huynhquancam/heroku-buildpack-gitbook\",\n      tags: [:heroku, :buildpack, :gitbook],\n      technologies: [:Node]\n    },\n    {\n      name: \"dotfiles\",\n      description: \"My personal terminal setup\",\n      url: \"https://github.com/huynhquancam/dotfiles\",\n      tags: [:dotfiles, :vimrc],\n      technologies: [:VimL, :Bash]\n    }\n  ]\n}\n\n# Thanks for viewing!\n# Source code can be found on [Github](https://github.com/huynhquancam/rbcv)\n# Copyright 2016 by @huynhquancam\n"

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * Autolinker.js
	 * 0.27.0
	 *
	 * Copyright(c) 2016 Gregory Jacobs <greg@greg-jacobs.com>
	 * MIT License
	 *
	 * https://github.com/gregjacobs/Autolinker.js
	 */
	;(function(root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = factory();
	  } else {
	    root.Autolinker = factory();
	  }
	}(this, function() {
	/**
	 * @class Autolinker
	 * @extends Object
	 *
	 * Utility class used to process a given string of text, and wrap the matches in
	 * the appropriate anchor (&lt;a&gt;) tags to turn them into links.
	 *
	 * Any of the configuration options may be provided in an Object (map) provided
	 * to the Autolinker constructor, which will configure how the {@link #link link()}
	 * method will process the links.
	 *
	 * For example:
	 *
	 *     var autolinker = new Autolinker( {
	 *         newWindow : false,
	 *         truncate  : 30
	 *     } );
	 *
	 *     var html = autolinker.link( "Joe went to www.yahoo.com" );
	 *     // produces: 'Joe went to <a href="http://www.yahoo.com">yahoo.com</a>'
	 *
	 *
	 * The {@link #static-link static link()} method may also be used to inline
	 * options into a single call, which may be more convenient for one-off uses.
	 * For example:
	 *
	 *     var html = Autolinker.link( "Joe went to www.yahoo.com", {
	 *         newWindow : false,
	 *         truncate  : 30
	 *     } );
	 *     // produces: 'Joe went to <a href="http://www.yahoo.com">yahoo.com</a>'
	 *
	 *
	 * ## Custom Replacements of Links
	 *
	 * If the configuration options do not provide enough flexibility, a {@link #replaceFn}
	 * may be provided to fully customize the output of Autolinker. This function is
	 * called once for each URL/Email/Phone#/Twitter Handle/Hashtag match that is
	 * encountered.
	 *
	 * For example:
	 *
	 *     var input = "...";  // string with URLs, Email Addresses, Phone #s, Twitter Handles, and Hashtags
	 *
	 *     var linkedText = Autolinker.link( input, {
	 *         replaceFn : function( autolinker, match ) {
	 *             console.log( "href = ", match.getAnchorHref() );
	 *             console.log( "text = ", match.getAnchorText() );
	 *
	 *             switch( match.getType() ) {
	 *                 case 'url' :
	 *                     console.log( "url: ", match.getUrl() );
	 *
	 *                     if( match.getUrl().indexOf( 'mysite.com' ) === -1 ) {
	 *                         var tag = autolinker.getTagBuilder().build( match );  // returns an `Autolinker.HtmlTag` instance, which provides mutator methods for easy changes
	 *                         tag.setAttr( 'rel', 'nofollow' );
	 *                         tag.addClass( 'external-link' );
	 *
	 *                         return tag;
	 *
	 *                     } else {
	 *                         return true;  // let Autolinker perform its normal anchor tag replacement
	 *                     }
	 *
	 *                 case 'email' :
	 *                     var email = match.getEmail();
	 *                     console.log( "email: ", email );
	 *
	 *                     if( email === "my@own.address" ) {
	 *                         return false;  // don't auto-link this particular email address; leave as-is
	 *                     } else {
	 *                         return;  // no return value will have Autolinker perform its normal anchor tag replacement (same as returning `true`)
	 *                     }
	 *
	 *                 case 'phone' :
	 *                     var phoneNumber = match.getPhoneNumber();
	 *                     console.log( phoneNumber );
	 *
	 *                     return '<a href="http://newplace.to.link.phone.numbers.to/">' + phoneNumber + '</a>';
	 *
	 *                 case 'twitter' :
	 *                     var twitterHandle = match.getTwitterHandle();
	 *                     console.log( twitterHandle );
	 *
	 *                     return '<a href="http://newplace.to.link.twitter.handles.to/">' + twitterHandle + '</a>';
	 *
	 *                 case 'hashtag' :
	 *                     var hashtag = match.getHashtag();
	 *                     console.log( hashtag );
	 *
	 *                     return '<a href="http://newplace.to.link.hashtag.handles.to/">' + hashtag + '</a>';
	 *             }
	 *         }
	 *     } );
	 *
	 *
	 * The function may return the following values:
	 *
	 * - `true` (Boolean): Allow Autolinker to replace the match as it normally
	 *   would.
	 * - `false` (Boolean): Do not replace the current match at all - leave as-is.
	 * - Any String: If a string is returned from the function, the string will be
	 *   used directly as the replacement HTML for the match.
	 * - An {@link Autolinker.HtmlTag} instance, which can be used to build/modify
	 *   an HTML tag before writing out its HTML text.
	 *
	 * @constructor
	 * @param {Object} [cfg] The configuration options for the Autolinker instance,
	 *   specified in an Object (map).
	 */
	var Autolinker = function( cfg ) {
		cfg = cfg || {};

		this.version = Autolinker.version;

		this.urls = this.normalizeUrlsCfg( cfg.urls );
		this.email = typeof cfg.email === 'boolean' ? cfg.email : true;
		this.twitter = typeof cfg.twitter === 'boolean' ? cfg.twitter : true;
		this.phone = typeof cfg.phone === 'boolean' ? cfg.phone : true;
		this.hashtag = cfg.hashtag || false;
		this.newWindow = typeof cfg.newWindow === 'boolean' ? cfg.newWindow : true;
		this.stripPrefix = typeof cfg.stripPrefix === 'boolean' ? cfg.stripPrefix : true;

		// Validate the value of the `hashtag` cfg.
		var hashtag = this.hashtag;
		if( hashtag !== false && hashtag !== 'twitter' && hashtag !== 'facebook' && hashtag !== 'instagram' ) {
			throw new Error( "invalid `hashtag` cfg - see docs" );
		}

		this.truncate = this.normalizeTruncateCfg( cfg.truncate );
		this.className = cfg.className || '';
		this.replaceFn = cfg.replaceFn || null;

		this.htmlParser = null;
		this.matchers = null;
		this.tagBuilder = null;
	};



	/**
	 * Automatically links URLs, Email addresses, Phone Numbers, Twitter handles,
	 * and Hashtags found in the given chunk of HTML. Does not link URLs found
	 * within HTML tags.
	 *
	 * For instance, if given the text: `You should go to http://www.yahoo.com`,
	 * then the result will be `You should go to &lt;a href="http://www.yahoo.com"&gt;http://www.yahoo.com&lt;/a&gt;`
	 *
	 * Example:
	 *
	 *     var linkedText = Autolinker.link( "Go to google.com", { newWindow: false } );
	 *     // Produces: "Go to <a href="http://google.com">google.com</a>"
	 *
	 * @static
	 * @param {String} textOrHtml The HTML or text to find matches within (depending
	 *   on if the {@link #urls}, {@link #email}, {@link #phone}, {@link #twitter},
	 *   and {@link #hashtag} options are enabled).
	 * @param {Object} [options] Any of the configuration options for the Autolinker
	 *   class, specified in an Object (map). See the class description for an
	 *   example call.
	 * @return {String} The HTML text, with matches automatically linked.
	 */
	Autolinker.link = function( textOrHtml, options ) {
		var autolinker = new Autolinker( options );
		return autolinker.link( textOrHtml );
	};


	/**
	 * @static
	 * @property {String} version (readonly)
	 *
	 * The Autolinker version number in the form major.minor.patch
	 *
	 * Ex: 0.25.1
	 */
	Autolinker.version = '0.27.0';


	Autolinker.prototype = {
		constructor : Autolinker,  // fix constructor property

		/**
		 * @cfg {Boolean/Object} [urls=true]
		 *
		 * `true` if URLs should be automatically linked, `false` if they should not
		 * be.
		 *
		 * This option also accepts an Object form with 3 properties, to allow for
		 * more customization of what exactly gets linked. All default to `true`:
		 *
		 * @param {Boolean} schemeMatches `true` to match URLs found prefixed with a
		 *   scheme, i.e. `http://google.com`, or `other+scheme://google.com`,
		 *   `false` to prevent these types of matches.
		 * @param {Boolean} wwwMatches `true` to match urls found prefixed with
		 *   `'www.'`, i.e. `www.google.com`. `false` to prevent these types of
		 *   matches. Note that if the URL had a prefixed scheme, and
		 *   `schemeMatches` is true, it will still be linked.
		 * @param {Boolean} tldMatches `true` to match URLs with known top level
		 *   domains (.com, .net, etc.) that are not prefixed with a scheme or
		 *   `'www.'`. This option attempts to match anything that looks like a URL
		 *   in the given text. Ex: `google.com`, `asdf.org/?page=1`, etc. `false`
		 *   to prevent these types of matches.
		 */

		/**
		 * @cfg {Boolean} [email=true]
		 *
		 * `true` if email addresses should be automatically linked, `false` if they
		 * should not be.
		 */

		/**
		 * @cfg {Boolean} [twitter=true]
		 *
		 * `true` if Twitter handles ("@example") should be automatically linked,
		 * `false` if they should not be.
		 */

		/**
		 * @cfg {Boolean} [phone=true]
		 *
		 * `true` if Phone numbers ("(555)555-5555") should be automatically linked,
		 * `false` if they should not be.
		 */

		/**
		 * @cfg {Boolean/String} [hashtag=false]
		 *
		 * A string for the service name to have hashtags (ex: "#myHashtag")
		 * auto-linked to. The currently-supported values are:
		 *
		 * - 'twitter'
		 * - 'facebook'
		 * - 'instagram'
		 *
		 * Pass `false` to skip auto-linking of hashtags.
		 */

		/**
		 * @cfg {Boolean} [newWindow=true]
		 *
		 * `true` if the links should open in a new window, `false` otherwise.
		 */

		/**
		 * @cfg {Boolean} [stripPrefix=true]
		 *
		 * `true` if 'http://' or 'https://' and/or the 'www.' should be stripped
		 * from the beginning of URL links' text, `false` otherwise.
		 */

		/**
		 * @cfg {Number/Object} [truncate=0]
		 *
		 * ## Number Form
		 *
		 * A number for how many characters matched text should be truncated to
		 * inside the text of a link. If the matched text is over this number of
		 * characters, it will be truncated to this length by adding a two period
		 * ellipsis ('..') to the end of the string.
		 *
		 * For example: A url like 'http://www.yahoo.com/some/long/path/to/a/file'
		 * truncated to 25 characters might look something like this:
		 * 'yahoo.com/some/long/pat..'
		 *
		 * Example Usage:
		 *
		 *     truncate: 25
		 *
		 *
		 *  Defaults to `0` for "no truncation."
		 *
		 *
		 * ## Object Form
		 *
		 * An Object may also be provided with two properties: `length` (Number) and
		 * `location` (String). `location` may be one of the following: 'end'
		 * (default), 'middle', or 'smart'.
		 *
		 * Example Usage:
		 *
		 *     truncate: { length: 25, location: 'middle' }
		 *
		 * @cfg {Number} [truncate.length=0] How many characters to allow before
		 *   truncation will occur. Defaults to `0` for "no truncation."
		 * @cfg {"end"/"middle"/"smart"} [truncate.location="end"]
		 *
		 * - 'end' (default): will truncate up to the number of characters, and then
		 *   add an ellipsis at the end. Ex: 'yahoo.com/some/long/pat..'
		 * - 'middle': will truncate and add the ellipsis in the middle. Ex:
		 *   'yahoo.com/s..th/to/a/file'
		 * - 'smart': for URLs where the algorithm attempts to strip out unnecessary
		 *   parts first (such as the 'www.', then URL scheme, hash, etc.),
		 *   attempting to make the URL human-readable before looking for a good
		 *   point to insert the ellipsis if it is still too long. Ex:
		 *   'yahoo.com/some..to/a/file'. For more details, see
		 *   {@link Autolinker.truncate.TruncateSmart}.
		 */

		/**
		 * @cfg {String} className
		 *
		 * A CSS class name to add to the generated links. This class will be added
		 * to all links, as well as this class plus match suffixes for styling
		 * url/email/phone/twitter/hashtag links differently.
		 *
		 * For example, if this config is provided as "myLink", then:
		 *
		 * - URL links will have the CSS classes: "myLink myLink-url"
		 * - Email links will have the CSS classes: "myLink myLink-email", and
		 * - Twitter links will have the CSS classes: "myLink myLink-twitter"
		 * - Phone links will have the CSS classes: "myLink myLink-phone"
		 * - Hashtag links will have the CSS classes: "myLink myLink-hashtag"
		 */

		/**
		 * @cfg {Function} replaceFn
		 *
		 * A function to individually process each match found in the input string.
		 *
		 * See the class's description for usage.
		 *
		 * This function is called with the following parameters:
		 *
		 * @cfg {Autolinker} replaceFn.autolinker The Autolinker instance, which may
		 *   be used to retrieve child objects from (such as the instance's
		 *   {@link #getTagBuilder tag builder}).
		 * @cfg {Autolinker.match.Match} replaceFn.match The Match instance which
		 *   can be used to retrieve information about the match that the `replaceFn`
		 *   is currently processing. See {@link Autolinker.match.Match} subclasses
		 *   for details.
		 */


		/**
		 * @property {String} version (readonly)
		 *
		 * The Autolinker version number in the form major.minor.patch
		 *
		 * Ex: 0.25.1
		 */

		/**
		 * @private
		 * @property {Autolinker.htmlParser.HtmlParser} htmlParser
		 *
		 * The HtmlParser instance used to skip over HTML tags, while finding text
		 * nodes to process. This is lazily instantiated in the {@link #getHtmlParser}
		 * method.
		 */

		/**
		 * @private
		 * @property {Autolinker.matcher.Matcher[]} matchers
		 *
		 * The {@link Autolinker.matcher.Matcher} instances for this Autolinker
		 * instance.
		 *
		 * This is lazily created in {@link #getMatchers}.
		 */

		/**
		 * @private
		 * @property {Autolinker.AnchorTagBuilder} tagBuilder
		 *
		 * The AnchorTagBuilder instance used to build match replacement anchor tags.
		 * Note: this is lazily instantiated in the {@link #getTagBuilder} method.
		 */


		/**
		 * Normalizes the {@link #urls} config into an Object with 3 properties:
		 * `schemeMatches`, `wwwMatches`, and `tldMatches`, all Booleans.
		 *
		 * See {@link #urls} config for details.
		 *
		 * @private
		 * @param {Boolean/Object} urls
		 * @return {Object}
		 */
		normalizeUrlsCfg : function( urls ) {
			if( urls == null ) urls = true;  // default to `true`

			if( typeof urls === 'boolean' ) {
				return { schemeMatches: urls, wwwMatches: urls, tldMatches: urls };

			} else {  // object form
				return {
					schemeMatches : typeof urls.schemeMatches === 'boolean' ? urls.schemeMatches : true,
					wwwMatches    : typeof urls.wwwMatches === 'boolean'    ? urls.wwwMatches    : true,
					tldMatches    : typeof urls.tldMatches === 'boolean'    ? urls.tldMatches    : true
				};
			}
		},


		/**
		 * Normalizes the {@link #truncate} config into an Object with 2 properties:
		 * `length` (Number), and `location` (String).
		 *
		 * See {@link #truncate} config for details.
		 *
		 * @private
		 * @param {Number/Object} truncate
		 * @return {Object}
		 */
		normalizeTruncateCfg : function( truncate ) {
			if( typeof truncate === 'number' ) {
				return { length: truncate, location: 'end' };

			} else {  // object, or undefined/null
				return Autolinker.Util.defaults( truncate || {}, {
					length   : Number.POSITIVE_INFINITY,
					location : 'end'
				} );
			}
		},


		/**
		 * Parses the input `textOrHtml` looking for URLs, email addresses, phone
		 * numbers, username handles, and hashtags (depending on the configuration
		 * of the Autolinker instance), and returns an array of {@link Autolinker.match.Match}
		 * objects describing those matches.
		 *
		 * This method is used by the {@link #link} method, but can also be used to
		 * simply do parsing of the input in order to discover what kinds of links
		 * there are and how many.
		 *
		 * @param {String} textOrHtml The HTML or text to find matches within
		 *   (depending on if the {@link #urls}, {@link #email}, {@link #phone},
		 *   {@link #twitter}, and {@link #hashtag} options are enabled).
		 * @return {Autolinker.match.Match[]} The array of Matches found in the
		 *   given input `textOrHtml`.
		 */
		parse : function( textOrHtml ) {
			var htmlParser = this.getHtmlParser(),
			    htmlNodes = htmlParser.parse( textOrHtml ),
			    anchorTagStackCount = 0,  // used to only process text around anchor tags, and any inner text/html they may have;
			    matches = [];

			// Find all matches within the `textOrHtml` (but not matches that are
			// already nested within <a> tags)
			for( var i = 0, len = htmlNodes.length; i < len; i++ ) {
				var node = htmlNodes[ i ],
				    nodeType = node.getType();

				if( nodeType === 'element' && node.getTagName() === 'a' ) {  // Process HTML anchor element nodes in the input `textOrHtml` to find out when we're within an <a> tag
					if( !node.isClosing() ) {  // it's the start <a> tag
						anchorTagStackCount++;
					} else {  // it's the end </a> tag
						anchorTagStackCount = Math.max( anchorTagStackCount - 1, 0 );  // attempt to handle extraneous </a> tags by making sure the stack count never goes below 0
					}

				} else if( nodeType === 'text' && anchorTagStackCount === 0 ) {  // Process text nodes that are not within an <a> tag
					var textNodeMatches = this.parseText( node.getText(), node.getOffset() );

					matches.push.apply( matches, textNodeMatches );
				}
			}


			// After we have found all matches, remove subsequent matches that
			// overlap with a previous match. This can happen for instance with URLs,
			// where the url 'google.com/#link' would match '#link' as a hashtag.
			matches = this.compactMatches( matches );

			// And finally, remove matches for match types that have been turned
			// off. We needed to have all match types turned on initially so that
			// things like hashtags could be filtered out if they were really just
			// part of a URL match (for instance, as a named anchor).
			matches = this.removeUnwantedMatches( matches );

			return matches;
		},


		/**
		 * After we have found all matches, we need to remove subsequent matches
		 * that overlap with a previous match. This can happen for instance with
		 * URLs, where the url 'google.com/#link' would match '#link' as a hashtag.
		 *
		 * @private
		 * @param {Autolinker.match.Match[]} matches
		 * @return {Autolinker.match.Match[]}
		 */
		compactMatches : function( matches ) {
			// First, the matches need to be sorted in order of offset
			matches.sort( function( a, b ) { return a.getOffset() - b.getOffset(); } );

			for( var i = 0; i < matches.length - 1; i++ ) {
				var match = matches[ i ],
				    endIdx = match.getOffset() + match.getMatchedText().length;

				// Remove subsequent matches that overlap with the current match
				while( i + 1 < matches.length && matches[ i + 1 ].getOffset() <= endIdx ) {
					matches.splice( i + 1, 1 );
				}
			}

			return matches;
		},


		/**
		 * Removes matches for matchers that were turned off in the options. For
		 * example, if {@link #hashtag hashtags} were not to be matched, we'll
		 * remove them from the `matches` array here.
		 *
		 * @private
		 * @param {Autolinker.match.Match[]} matches The array of matches to remove
		 *   the unwanted matches from. Note: this array is mutated for the
		 *   removals.
		 * @return {Autolinker.match.Match[]} The mutated input `matches` array.
		 */
		removeUnwantedMatches : function( matches ) {
			var remove = Autolinker.Util.remove;

			if( !this.hashtag ) remove( matches, function( match ) { return match.getType() === 'hashtag'; } );
			if( !this.email )   remove( matches, function( match ) { return match.getType() === 'email'; } );
			if( !this.phone )   remove( matches, function( match ) { return match.getType() === 'phone'; } );
			if( !this.twitter ) remove( matches, function( match ) { return match.getType() === 'twitter'; } );
			if( !this.urls.schemeMatches ) {
				remove( matches, function( m ) { return m.getType() === 'url' && m.getUrlMatchType() === 'scheme'; } );
			}
			if( !this.urls.wwwMatches ) {
				remove( matches, function( m ) { return m.getType() === 'url' && m.getUrlMatchType() === 'www'; } );
			}
			if( !this.urls.tldMatches ) {
				remove( matches, function( m ) { return m.getType() === 'url' && m.getUrlMatchType() === 'tld'; } );
			}

			return matches;
		},


		/**
		 * Parses the input `text` looking for URLs, email addresses, phone
		 * numbers, username handles, and hashtags (depending on the configuration
		 * of the Autolinker instance), and returns an array of {@link Autolinker.match.Match}
		 * objects describing those matches.
		 *
		 * This method processes a **non-HTML string**, and is used to parse and
		 * match within the text nodes of an HTML string. This method is used
		 * internally by {@link #parse}.
		 *
		 * @private
		 * @param {String} text The text to find matches within (depending on if the
		 *   {@link #urls}, {@link #email}, {@link #phone}, {@link #twitter}, and
		 *   {@link #hashtag} options are enabled). This must be a non-HTML string.
		 * @param {Number} [offset=0] The offset of the text node within the
		 *   original string. This is used when parsing with the {@link #parse}
		 *   method to generate correct offsets within the {@link Autolinker.match.Match}
		 *   instances, but may be omitted if calling this method publicly.
		 * @return {Autolinker.match.Match[]} The array of Matches found in the
		 *   given input `text`.
		 */
		parseText : function( text, offset ) {
			offset = offset || 0;
			var matchers = this.getMatchers(),
			    matches = [];

			for( var i = 0, numMatchers = matchers.length; i < numMatchers; i++ ) {
				var textMatches = matchers[ i ].parseMatches( text );

				// Correct the offset of each of the matches. They are originally
				// the offset of the match within the provided text node, but we
				// need to correct them to be relative to the original HTML input
				// string (i.e. the one provided to #parse).
				for( var j = 0, numTextMatches = textMatches.length; j < numTextMatches; j++ ) {
					textMatches[ j ].setOffset( offset + textMatches[ j ].getOffset() );
				}

				matches.push.apply( matches, textMatches );
			}
			return matches;
		},


		/**
		 * Automatically links URLs, Email addresses, Phone numbers, Twitter
		 * handles, and Hashtags found in the given chunk of HTML. Does not link
		 * URLs found within HTML tags.
		 *
		 * For instance, if given the text: `You should go to http://www.yahoo.com`,
		 * then the result will be `You should go to
		 * &lt;a href="http://www.yahoo.com"&gt;http://www.yahoo.com&lt;/a&gt;`
		 *
		 * This method finds the text around any HTML elements in the input
		 * `textOrHtml`, which will be the text that is processed. Any original HTML
		 * elements will be left as-is, as well as the text that is already wrapped
		 * in anchor (&lt;a&gt;) tags.
		 *
		 * @param {String} textOrHtml The HTML or text to autolink matches within
		 *   (depending on if the {@link #urls}, {@link #email}, {@link #phone},
		 *   {@link #twitter}, and {@link #hashtag} options are enabled).
		 * @return {String} The HTML, with matches automatically linked.
		 */
		link : function( textOrHtml ) {
			if( !textOrHtml ) { return ""; }  // handle `null` and `undefined`

			var matches = this.parse( textOrHtml ),
				newHtml = [],
				lastIndex = 0;

			for( var i = 0, len = matches.length; i < len; i++ ) {
				var match = matches[ i ];

				newHtml.push( textOrHtml.substring( lastIndex, match.getOffset() ) );
				newHtml.push( this.createMatchReturnVal( match ) );

				lastIndex = match.getOffset() + match.getMatchedText().length;
			}
			newHtml.push( textOrHtml.substring( lastIndex ) );  // handle the text after the last match

			return newHtml.join( '' );
		},


		/**
		 * Creates the return string value for a given match in the input string.
		 *
		 * This method handles the {@link #replaceFn}, if one was provided.
		 *
		 * @private
		 * @param {Autolinker.match.Match} match The Match object that represents
		 *   the match.
		 * @return {String} The string that the `match` should be replaced with.
		 *   This is usually the anchor tag string, but may be the `matchStr` itself
		 *   if the match is not to be replaced.
		 */
		createMatchReturnVal : function( match ) {
			// Handle a custom `replaceFn` being provided
			var replaceFnResult;
			if( this.replaceFn ) {
				replaceFnResult = this.replaceFn.call( this, this, match );  // Autolinker instance is the context, and the first arg
			}

			if( typeof replaceFnResult === 'string' ) {
				return replaceFnResult;  // `replaceFn` returned a string, use that

			} else if( replaceFnResult === false ) {
				return match.getMatchedText();  // no replacement for the match

			} else if( replaceFnResult instanceof Autolinker.HtmlTag ) {
				return replaceFnResult.toAnchorString();

			} else {  // replaceFnResult === true, or no/unknown return value from function
				// Perform Autolinker's default anchor tag generation
				var anchorTag = match.buildTag();  // returns an Autolinker.HtmlTag instance

				return anchorTag.toAnchorString();
			}
		},


		/**
		 * Lazily instantiates and returns the {@link #htmlParser} instance for this
		 * Autolinker instance.
		 *
		 * @protected
		 * @return {Autolinker.htmlParser.HtmlParser}
		 */
		getHtmlParser : function() {
			var htmlParser = this.htmlParser;

			if( !htmlParser ) {
				htmlParser = this.htmlParser = new Autolinker.htmlParser.HtmlParser();
			}

			return htmlParser;
		},


		/**
		 * Lazily instantiates and returns the {@link Autolinker.matcher.Matcher}
		 * instances for this Autolinker instance.
		 *
		 * @protected
		 * @return {Autolinker.matcher.Matcher[]}
		 */
		getMatchers : function() {
			if( !this.matchers ) {
				var matchersNs = Autolinker.matcher,
				    tagBuilder = this.getTagBuilder();

				var matchers = [
					new matchersNs.Hashtag( { tagBuilder: tagBuilder, serviceName: this.hashtag } ),
					new matchersNs.Email( { tagBuilder: tagBuilder } ),
					new matchersNs.Phone( { tagBuilder: tagBuilder } ),
					new matchersNs.Twitter( { tagBuilder: tagBuilder } ),
					new matchersNs.Url( { tagBuilder: tagBuilder, stripPrefix: this.stripPrefix } )
				];

				return ( this.matchers = matchers );

			} else {
				return this.matchers;
			}
		},


		/**
		 * Returns the {@link #tagBuilder} instance for this Autolinker instance, lazily instantiating it
		 * if it does not yet exist.
		 *
		 * This method may be used in a {@link #replaceFn} to generate the {@link Autolinker.HtmlTag HtmlTag} instance that
		 * Autolinker would normally generate, and then allow for modifications before returning it. For example:
		 *
		 *     var html = Autolinker.link( "Test google.com", {
		 *         replaceFn : function( autolinker, match ) {
		 *             var tag = autolinker.getTagBuilder().build( match );  // returns an {@link Autolinker.HtmlTag} instance
		 *             tag.setAttr( 'rel', 'nofollow' );
		 *
		 *             return tag;
		 *         }
		 *     } );
		 *
		 *     // generated html:
		 *     //   Test <a href="http://google.com" target="_blank" rel="nofollow">google.com</a>
		 *
		 * @return {Autolinker.AnchorTagBuilder}
		 */
		getTagBuilder : function() {
			var tagBuilder = this.tagBuilder;

			if( !tagBuilder ) {
				tagBuilder = this.tagBuilder = new Autolinker.AnchorTagBuilder( {
					newWindow   : this.newWindow,
					truncate    : this.truncate,
					className   : this.className
				} );
			}

			return tagBuilder;
		}

	};


	// Autolinker Namespaces

	Autolinker.match = {};
	Autolinker.matcher = {};
	Autolinker.htmlParser = {};
	Autolinker.truncate = {};

	/*global Autolinker */
	/*jshint eqnull:true, boss:true */
	/**
	 * @class Autolinker.Util
	 * @singleton
	 *
	 * A few utility methods for Autolinker.
	 */
	Autolinker.Util = {

		/**
		 * @property {Function} abstractMethod
		 *
		 * A function object which represents an abstract method.
		 */
		abstractMethod : function() { throw "abstract"; },


		/**
		 * @private
		 * @property {RegExp} trimRegex
		 *
		 * The regular expression used to trim the leading and trailing whitespace
		 * from a string.
		 */
		trimRegex : /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,


		/**
		 * Assigns (shallow copies) the properties of `src` onto `dest`.
		 *
		 * @param {Object} dest The destination object.
		 * @param {Object} src The source object.
		 * @return {Object} The destination object (`dest`)
		 */
		assign : function( dest, src ) {
			for( var prop in src ) {
				if( src.hasOwnProperty( prop ) ) {
					dest[ prop ] = src[ prop ];
				}
			}

			return dest;
		},


		/**
		 * Assigns (shallow copies) the properties of `src` onto `dest`, if the
		 * corresponding property on `dest` === `undefined`.
		 *
		 * @param {Object} dest The destination object.
		 * @param {Object} src The source object.
		 * @return {Object} The destination object (`dest`)
		 */
		defaults : function( dest, src ) {
			for( var prop in src ) {
				if( src.hasOwnProperty( prop ) && dest[ prop ] === undefined ) {
					dest[ prop ] = src[ prop ];
				}
			}

			return dest;
		},


		/**
		 * Extends `superclass` to create a new subclass, adding the `protoProps` to the new subclass's prototype.
		 *
		 * @param {Function} superclass The constructor function for the superclass.
		 * @param {Object} protoProps The methods/properties to add to the subclass's prototype. This may contain the
		 *   special property `constructor`, which will be used as the new subclass's constructor function.
		 * @return {Function} The new subclass function.
		 */
		extend : function( superclass, protoProps ) {
			var superclassProto = superclass.prototype;

			var F = function() {};
			F.prototype = superclassProto;

			var subclass;
			if( protoProps.hasOwnProperty( 'constructor' ) ) {
				subclass = protoProps.constructor;
			} else {
				subclass = function() { superclassProto.constructor.apply( this, arguments ); };
			}

			var subclassProto = subclass.prototype = new F();  // set up prototype chain
			subclassProto.constructor = subclass;  // fix constructor property
			subclassProto.superclass = superclassProto;

			delete protoProps.constructor;  // don't re-assign constructor property to the prototype, since a new function may have been created (`subclass`), which is now already there
			Autolinker.Util.assign( subclassProto, protoProps );

			return subclass;
		},


		/**
		 * Truncates the `str` at `len - ellipsisChars.length`, and adds the `ellipsisChars` to the
		 * end of the string (by default, two periods: '..'). If the `str` length does not exceed
		 * `len`, the string will be returned unchanged.
		 *
		 * @param {String} str The string to truncate and add an ellipsis to.
		 * @param {Number} truncateLen The length to truncate the string at.
		 * @param {String} [ellipsisChars=..] The ellipsis character(s) to add to the end of `str`
		 *   when truncated. Defaults to '..'
		 */
		ellipsis : function( str, truncateLen, ellipsisChars ) {
			if( str.length > truncateLen ) {
				ellipsisChars = ( ellipsisChars == null ) ? '..' : ellipsisChars;
				str = str.substring( 0, truncateLen - ellipsisChars.length ) + ellipsisChars;
			}
			return str;
		},


		/**
		 * Supports `Array.prototype.indexOf()` functionality for old IE (IE8 and below).
		 *
		 * @param {Array} arr The array to find an element of.
		 * @param {*} element The element to find in the array, and return the index of.
		 * @return {Number} The index of the `element`, or -1 if it was not found.
		 */
		indexOf : function( arr, element ) {
			if( Array.prototype.indexOf ) {
				return arr.indexOf( element );

			} else {
				for( var i = 0, len = arr.length; i < len; i++ ) {
					if( arr[ i ] === element ) return i;
				}
				return -1;
			}
		},


		/**
		 * Removes array elements based on a filtering function. Mutates the input
		 * array.
		 *
		 * Using this instead of the ES5 Array.prototype.filter() function, to allow
		 * Autolinker compatibility with IE8, and also to prevent creating many new
		 * arrays in memory for filtering.
		 *
		 * @param {Array} arr The array to remove elements from. This array is
		 *   mutated.
		 * @param {Function} fn A function which should return `true` to
		 *   remove an element.
		 * @return {Array} The mutated input `arr`.
		 */
		remove : function( arr, fn ) {
			for( var i = arr.length - 1; i >= 0; i-- ) {
				if( fn( arr[ i ] ) === true ) {
					arr.splice( i, 1 );
				}
			}
		},


		/**
		 * Performs the functionality of what modern browsers do when `String.prototype.split()` is called
		 * with a regular expression that contains capturing parenthesis.
		 *
		 * For example:
		 *
		 *     // Modern browsers:
		 *     "a,b,c".split( /(,)/ );  // --> [ 'a', ',', 'b', ',', 'c' ]
		 *
		 *     // Old IE (including IE8):
		 *     "a,b,c".split( /(,)/ );  // --> [ 'a', 'b', 'c' ]
		 *
		 * This method emulates the functionality of modern browsers for the old IE case.
		 *
		 * @param {String} str The string to split.
		 * @param {RegExp} splitRegex The regular expression to split the input `str` on. The splitting
		 *   character(s) will be spliced into the array, as in the "modern browsers" example in the
		 *   description of this method.
		 *   Note #1: the supplied regular expression **must** have the 'g' flag specified.
		 *   Note #2: for simplicity's sake, the regular expression does not need
		 *   to contain capturing parenthesis - it will be assumed that any match has them.
		 * @return {String[]} The split array of strings, with the splitting character(s) included.
		 */
		splitAndCapture : function( str, splitRegex ) {
			if( !splitRegex.global ) throw new Error( "`splitRegex` must have the 'g' flag set" );

			var result = [],
			    lastIdx = 0,
			    match;

			while( match = splitRegex.exec( str ) ) {
				result.push( str.substring( lastIdx, match.index ) );
				result.push( match[ 0 ] );  // push the splitting char(s)

				lastIdx = match.index + match[ 0 ].length;
			}
			result.push( str.substring( lastIdx ) );

			return result;
		},


		/**
		 * Trims the leading and trailing whitespace from a string.
		 *
		 * @param {String} str The string to trim.
		 * @return {String}
		 */
		trim : function( str ) {
			return str.replace( this.trimRegex, '' );
		}

	};
	/*global Autolinker */
	/*jshint boss:true */
	/**
	 * @class Autolinker.HtmlTag
	 * @extends Object
	 *
	 * Represents an HTML tag, which can be used to easily build/modify HTML tags programmatically.
	 *
	 * Autolinker uses this abstraction to create HTML tags, and then write them out as strings. You may also use
	 * this class in your code, especially within a {@link Autolinker#replaceFn replaceFn}.
	 *
	 * ## Examples
	 *
	 * Example instantiation:
	 *
	 *     var tag = new Autolinker.HtmlTag( {
	 *         tagName : 'a',
	 *         attrs   : { 'href': 'http://google.com', 'class': 'external-link' },
	 *         innerHtml : 'Google'
	 *     } );
	 *
	 *     tag.toAnchorString();  // <a href="http://google.com" class="external-link">Google</a>
	 *
	 *     // Individual accessor methods
	 *     tag.getTagName();                 // 'a'
	 *     tag.getAttr( 'href' );            // 'http://google.com'
	 *     tag.hasClass( 'external-link' );  // true
	 *
	 *
	 * Using mutator methods (which may be used in combination with instantiation config properties):
	 *
	 *     var tag = new Autolinker.HtmlTag();
	 *     tag.setTagName( 'a' );
	 *     tag.setAttr( 'href', 'http://google.com' );
	 *     tag.addClass( 'external-link' );
	 *     tag.setInnerHtml( 'Google' );
	 *
	 *     tag.getTagName();                 // 'a'
	 *     tag.getAttr( 'href' );            // 'http://google.com'
	 *     tag.hasClass( 'external-link' );  // true
	 *
	 *     tag.toAnchorString();  // <a href="http://google.com" class="external-link">Google</a>
	 *
	 *
	 * ## Example use within a {@link Autolinker#replaceFn replaceFn}
	 *
	 *     var html = Autolinker.link( "Test google.com", {
	 *         replaceFn : function( autolinker, match ) {
	 *             var tag = match.buildTag();  // returns an {@link Autolinker.HtmlTag} instance, configured with the Match's href and anchor text
	 *             tag.setAttr( 'rel', 'nofollow' );
	 *
	 *             return tag;
	 *         }
	 *     } );
	 *
	 *     // generated html:
	 *     //   Test <a href="http://google.com" target="_blank" rel="nofollow">google.com</a>
	 *
	 *
	 * ## Example use with a new tag for the replacement
	 *
	 *     var html = Autolinker.link( "Test google.com", {
	 *         replaceFn : function( autolinker, match ) {
	 *             var tag = new Autolinker.HtmlTag( {
	 *                 tagName : 'button',
	 *                 attrs   : { 'title': 'Load URL: ' + match.getAnchorHref() },
	 *                 innerHtml : 'Load URL: ' + match.getAnchorText()
	 *             } );
	 *
	 *             return tag;
	 *         }
	 *     } );
	 *
	 *     // generated html:
	 *     //   Test <button title="Load URL: http://google.com">Load URL: google.com</button>
	 */
	Autolinker.HtmlTag = Autolinker.Util.extend( Object, {

		/**
		 * @cfg {String} tagName
		 *
		 * The tag name. Ex: 'a', 'button', etc.
		 *
		 * Not required at instantiation time, but should be set using {@link #setTagName} before {@link #toAnchorString}
		 * is executed.
		 */

		/**
		 * @cfg {Object.<String, String>} attrs
		 *
		 * An key/value Object (map) of attributes to create the tag with. The keys are the attribute names, and the
		 * values are the attribute values.
		 */

		/**
		 * @cfg {String} innerHtml
		 *
		 * The inner HTML for the tag.
		 *
		 * Note the camel case name on `innerHtml`. Acronyms are camelCased in this utility (such as not to run into the acronym
		 * naming inconsistency that the DOM developers created with `XMLHttpRequest`). You may alternatively use {@link #innerHTML}
		 * if you prefer, but this one is recommended.
		 */

		/**
		 * @cfg {String} innerHTML
		 *
		 * Alias of {@link #innerHtml}, accepted for consistency with the browser DOM api, but prefer the camelCased version
		 * for acronym names.
		 */


		/**
		 * @protected
		 * @property {RegExp} whitespaceRegex
		 *
		 * Regular expression used to match whitespace in a string of CSS classes.
		 */
		whitespaceRegex : /\s+/,


		/**
		 * @constructor
		 * @param {Object} [cfg] The configuration properties for this class, in an Object (map)
		 */
		constructor : function( cfg ) {
			Autolinker.Util.assign( this, cfg );

			this.innerHtml = this.innerHtml || this.innerHTML;  // accept either the camelCased form or the fully capitalized acronym
		},


		/**
		 * Sets the tag name that will be used to generate the tag with.
		 *
		 * @param {String} tagName
		 * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
		 */
		setTagName : function( tagName ) {
			this.tagName = tagName;
			return this;
		},


		/**
		 * Retrieves the tag name.
		 *
		 * @return {String}
		 */
		getTagName : function() {
			return this.tagName || "";
		},


		/**
		 * Sets an attribute on the HtmlTag.
		 *
		 * @param {String} attrName The attribute name to set.
		 * @param {String} attrValue The attribute value to set.
		 * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
		 */
		setAttr : function( attrName, attrValue ) {
			var tagAttrs = this.getAttrs();
			tagAttrs[ attrName ] = attrValue;

			return this;
		},


		/**
		 * Retrieves an attribute from the HtmlTag. If the attribute does not exist, returns `undefined`.
		 *
		 * @param {String} attrName The attribute name to retrieve.
		 * @return {String} The attribute's value, or `undefined` if it does not exist on the HtmlTag.
		 */
		getAttr : function( attrName ) {
			return this.getAttrs()[ attrName ];
		},


		/**
		 * Sets one or more attributes on the HtmlTag.
		 *
		 * @param {Object.<String, String>} attrs A key/value Object (map) of the attributes to set.
		 * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
		 */
		setAttrs : function( attrs ) {
			var tagAttrs = this.getAttrs();
			Autolinker.Util.assign( tagAttrs, attrs );

			return this;
		},


		/**
		 * Retrieves the attributes Object (map) for the HtmlTag.
		 *
		 * @return {Object.<String, String>} A key/value object of the attributes for the HtmlTag.
		 */
		getAttrs : function() {
			return this.attrs || ( this.attrs = {} );
		},


		/**
		 * Sets the provided `cssClass`, overwriting any current CSS classes on the HtmlTag.
		 *
		 * @param {String} cssClass One or more space-separated CSS classes to set (overwrite).
		 * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
		 */
		setClass : function( cssClass ) {
			return this.setAttr( 'class', cssClass );
		},


		/**
		 * Convenience method to add one or more CSS classes to the HtmlTag. Will not add duplicate CSS classes.
		 *
		 * @param {String} cssClass One or more space-separated CSS classes to add.
		 * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
		 */
		addClass : function( cssClass ) {
			var classAttr = this.getClass(),
			    whitespaceRegex = this.whitespaceRegex,
			    indexOf = Autolinker.Util.indexOf,  // to support IE8 and below
			    classes = ( !classAttr ) ? [] : classAttr.split( whitespaceRegex ),
			    newClasses = cssClass.split( whitespaceRegex ),
			    newClass;

			while( newClass = newClasses.shift() ) {
				if( indexOf( classes, newClass ) === -1 ) {
					classes.push( newClass );
				}
			}

			this.getAttrs()[ 'class' ] = classes.join( " " );
			return this;
		},


		/**
		 * Convenience method to remove one or more CSS classes from the HtmlTag.
		 *
		 * @param {String} cssClass One or more space-separated CSS classes to remove.
		 * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
		 */
		removeClass : function( cssClass ) {
			var classAttr = this.getClass(),
			    whitespaceRegex = this.whitespaceRegex,
			    indexOf = Autolinker.Util.indexOf,  // to support IE8 and below
			    classes = ( !classAttr ) ? [] : classAttr.split( whitespaceRegex ),
			    removeClasses = cssClass.split( whitespaceRegex ),
			    removeClass;

			while( classes.length && ( removeClass = removeClasses.shift() ) ) {
				var idx = indexOf( classes, removeClass );
				if( idx !== -1 ) {
					classes.splice( idx, 1 );
				}
			}

			this.getAttrs()[ 'class' ] = classes.join( " " );
			return this;
		},


		/**
		 * Convenience method to retrieve the CSS class(es) for the HtmlTag, which will each be separated by spaces when
		 * there are multiple.
		 *
		 * @return {String}
		 */
		getClass : function() {
			return this.getAttrs()[ 'class' ] || "";
		},


		/**
		 * Convenience method to check if the tag has a CSS class or not.
		 *
		 * @param {String} cssClass The CSS class to check for.
		 * @return {Boolean} `true` if the HtmlTag has the CSS class, `false` otherwise.
		 */
		hasClass : function( cssClass ) {
			return ( ' ' + this.getClass() + ' ' ).indexOf( ' ' + cssClass + ' ' ) !== -1;
		},


		/**
		 * Sets the inner HTML for the tag.
		 *
		 * @param {String} html The inner HTML to set.
		 * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
		 */
		setInnerHtml : function( html ) {
			this.innerHtml = html;

			return this;
		},


		/**
		 * Retrieves the inner HTML for the tag.
		 *
		 * @return {String}
		 */
		getInnerHtml : function() {
			return this.innerHtml || "";
		},


		/**
		 * Override of superclass method used to generate the HTML string for the tag.
		 *
		 * @return {String}
		 */
		toAnchorString : function() {
			var tagName = this.getTagName(),
			    attrsStr = this.buildAttrsStr();

			attrsStr = ( attrsStr ) ? ' ' + attrsStr : '';  // prepend a space if there are actually attributes

			return [ '<', tagName, attrsStr, '>', this.getInnerHtml(), '</', tagName, '>' ].join( "" );
		},


		/**
		 * Support method for {@link #toAnchorString}, returns the string space-separated key="value" pairs, used to populate
		 * the stringified HtmlTag.
		 *
		 * @protected
		 * @return {String} Example return: `attr1="value1" attr2="value2"`
		 */
		buildAttrsStr : function() {
			if( !this.attrs ) return "";  // no `attrs` Object (map) has been set, return empty string

			var attrs = this.getAttrs(),
			    attrsArr = [];

			for( var prop in attrs ) {
				if( attrs.hasOwnProperty( prop ) ) {
					attrsArr.push( prop + '="' + attrs[ prop ] + '"' );
				}
			}
			return attrsArr.join( " " );
		}

	} );

	/*global Autolinker */
	/**
	 * @class Autolinker.RegexLib
	 * @singleton
	 *
	 * Builds and stores a library of the common regular expressions used by the
	 * Autolinker utility.
	 *
	 * Other regular expressions may exist ad-hoc, but these are generally the
	 * regular expressions that are shared between source files.
	 */
	Autolinker.RegexLib = (function() {

		/**
		 * The string form of a regular expression that would match all of the
		 * alphabetic ("letter") chars in the unicode character set when placed in a
		 * RegExp character class (`[]`). This includes all international alphabetic
		 * characters.
		 *
		 * These would be the characters matched by unicode regex engines `\p{L}`
		 * escape ("all letters").
		 *
		 * Taken from the XRegExp library: http://xregexp.com/
		 * Specifically: http://xregexp.com/v/3.0.0/unicode-categories.js
		 *
		 * @private
		 * @type {String}
		 */
		var alphaCharsStr = 'A-Za-z\\xAA\\xB5\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC';

		/**
		 * The string form of a regular expression that would match all of the
		 * decimal number chars in the unicode character set when placed in a RegExp
		 * character class (`[]`).
		 *
		 * These would be the characters matched by unicode regex engines `\p{Nd}`
		 * escape ("all decimal numbers")
		 *
		 * Taken from the XRegExp library: http://xregexp.com/
		 * Specifically: http://xregexp.com/v/3.0.0/unicode-categories.js
		 *
		 * @private
		 * @type {String}
		 */
		var decimalNumbersStr = '0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19';


		// See documentation below
		var alphaNumericCharsStr = alphaCharsStr + decimalNumbersStr;


		// See documentation below
		var domainNameRegex = new RegExp( '[' + alphaNumericCharsStr + '.\\-]*[' + alphaNumericCharsStr + '\\-]' );


		// See documentation below
		var tldRegex = /(?:travelersinsurance|sandvikcoromant|kerryproperties|cancerresearch|weatherchannel|kerrylogistics|spreadbetting|international|wolterskluwer|lifeinsurance|construction|pamperedchef|scholarships|versicherung|bridgestone|creditunion|kerryhotels|investments|productions|blackfriday|enterprises|lamborghini|photography|motorcycles|williamhill|playstation|contractors|barclaycard|accountants|redumbrella|engineering|management|telefonica|protection|consulting|tatamotors|creditcard|vlaanderen|schaeffler|associates|properties|foundation|republican|bnpparibas|boehringer|eurovision|extraspace|industries|immobilien|university|technology|volkswagen|healthcare|restaurant|cuisinella|vistaprint|apartments|accountant|travelers|homedepot|institute|vacations|furniture|fresenius|insurance|christmas|bloomberg|solutions|barcelona|firestone|financial|kuokgroup|fairwinds|community|passagens|goldpoint|equipment|lifestyle|yodobashi|aquarelle|marketing|analytics|education|amsterdam|statefarm|melbourne|allfinanz|directory|microsoft|stockholm|montblanc|accenture|lancaster|landrover|everbank|istanbul|graphics|grainger|ipiranga|softbank|attorney|pharmacy|saarland|catering|airforce|yokohama|mortgage|frontier|mutuelle|stcgroup|memorial|pictures|football|symantec|cipriani|ventures|telecity|cityeats|verisign|flsmidth|boutique|cleaning|firmdale|clinique|clothing|redstone|infiniti|deloitte|feedback|services|broadway|plumbing|commbank|training|barclays|exchange|computer|brussels|software|delivery|barefoot|builders|business|bargains|engineer|holdings|download|security|helsinki|lighting|movistar|discount|hdfcbank|supplies|marriott|property|diamonds|capetown|partners|democrat|jpmorgan|bradesco|budapest|rexroth|zuerich|shriram|academy|science|support|youtube|singles|surgery|alibaba|statoil|dentist|schwarz|android|cruises|cricket|digital|markets|starhub|systems|courses|coupons|netbank|country|domains|corsica|network|neustar|realtor|lincoln|limited|schmidt|yamaxun|cooking|contact|auction|spiegel|liaison|leclerc|latrobe|lasalle|abogado|compare|lanxess|exposed|express|company|cologne|college|avianca|lacaixa|fashion|recipes|ferrero|komatsu|storage|wanggou|clubmed|sandvik|fishing|fitness|bauhaus|kitchen|flights|florist|flowers|watches|weather|temasek|samsung|bentley|forsale|channel|theater|frogans|theatre|okinawa|website|tickets|jewelry|gallery|tiffany|iselect|shiksha|brother|organic|wedding|genting|toshiba|origins|philips|hyundai|hotmail|hoteles|hosting|rentals|windows|cartier|bugatti|holiday|careers|whoswho|hitachi|panerai|caravan|reviews|guitars|capital|trading|hamburg|hangout|finance|stream|family|abbott|health|review|travel|report|hermes|hiphop|gratis|career|toyota|hockey|dating|repair|google|social|soccer|reisen|global|otsuka|giving|unicom|casino|photos|center|broker|rocher|orange|bostik|garden|insure|ryukyu|bharti|safety|physio|sakura|oracle|online|jaguar|gallup|piaget|tienda|futbol|pictet|joburg|webcam|berlin|office|juegos|kaufen|chanel|chrome|xihuan|church|tennis|circle|kinder|flickr|bayern|claims|clinic|viajes|nowruz|xperia|norton|yachts|studio|coffee|camera|sanofi|nissan|author|expert|events|comsec|lawyer|tattoo|viking|estate|villas|condos|realty|yandex|energy|emerck|virgin|vision|durban|living|school|coupon|london|taobao|natura|taipei|nagoya|luxury|walter|aramco|sydney|madrid|credit|maison|makeup|schule|market|anquan|direct|design|swatch|suzuki|alsace|vuelos|dental|alipay|voyage|shouji|voting|airtel|mutual|degree|supply|agency|museum|mobily|dealer|monash|select|mormon|active|moscow|racing|datsun|quebec|nissay|rodeo|email|gifts|works|photo|chloe|edeka|cheap|earth|vista|tushu|koeln|glass|shoes|globo|tunes|gmail|nokia|space|kyoto|black|ricoh|seven|lamer|sener|epson|cisco|praxi|trust|citic|crown|shell|lease|green|legal|lexus|ninja|tatar|gripe|nikon|group|video|wales|autos|gucci|party|nexus|guide|linde|adult|parts|amica|lixil|boats|azure|loans|locus|cymru|lotte|lotto|stada|click|poker|quest|dabur|lupin|nadex|paris|faith|dance|canon|place|gives|trade|skype|rocks|mango|cloud|boots|smile|final|swiss|homes|honda|media|horse|cards|deals|watch|bosch|house|pizza|miami|osaka|tours|total|xerox|coach|sucks|style|delta|toray|iinet|tools|money|codes|beats|tokyo|salon|archi|movie|baidu|study|actor|yahoo|store|apple|world|forex|today|bible|tmall|tirol|irish|tires|forum|reise|vegas|vodka|sharp|omega|weber|jetzt|audio|promo|build|bingo|chase|gallo|drive|dubai|rehab|press|solar|sale|beer|bbva|bank|band|auto|sapo|sarl|saxo|audi|asia|arte|arpa|army|yoga|ally|zara|scor|scot|sexy|seat|zero|seek|aero|adac|zone|aarp|maif|meet|meme|menu|surf|mini|mobi|mtpc|porn|desi|star|ltda|name|talk|navy|love|loan|live|link|news|limo|like|spot|life|nico|lidl|lgbt|land|taxi|team|tech|kred|kpmg|sony|song|kiwi|kddi|jprs|jobs|sohu|java|itau|tips|info|immo|icbc|hsbc|town|host|page|toys|here|help|pars|haus|guru|guge|tube|goog|golf|gold|sncf|gmbh|gift|ggee|gent|gbiz|game|vana|pics|fund|ford|ping|pink|fish|film|fast|farm|play|fans|fail|plus|skin|pohl|fage|moda|post|erni|dvag|prod|doha|prof|docs|viva|diet|luxe|site|dell|sina|dclk|show|qpon|date|vote|cyou|voto|read|coop|cool|wang|club|city|chat|cern|cash|reit|rent|casa|cars|care|camp|rest|call|cafe|weir|wien|rich|wiki|buzz|wine|book|bond|room|work|rsvp|shia|ruhr|blue|bing|shaw|bike|safe|xbox|best|pwc|mtn|lds|aig|boo|fyi|nra|nrw|ntt|car|gal|obi|zip|aeg|vin|how|one|ong|onl|dad|ooo|bet|esq|org|htc|bar|uol|ibm|ovh|gdn|ice|icu|uno|gea|ifm|bot|top|wtf|lol|day|pet|eus|wtc|ubs|tvs|aco|ing|ltd|ink|tab|abb|afl|cat|int|pid|pin|bid|cba|gle|com|cbn|ads|man|wed|ceb|gmo|sky|ist|gmx|tui|mba|fan|ski|iwc|app|pro|med|ceo|jcb|jcp|goo|dev|men|aaa|meo|pub|jlc|bom|jll|gop|jmp|mil|got|gov|win|jot|mma|joy|trv|red|cfa|cfd|bio|moe|moi|mom|ren|biz|aws|xin|bbc|dnp|buy|kfh|mov|thd|xyz|fit|kia|rio|rip|kim|dog|vet|nyc|bcg|mtr|bcn|bms|bmw|run|bzh|rwe|tel|stc|axa|kpn|fly|krd|cab|bnl|foo|crs|eat|tci|sap|srl|nec|sas|net|cal|sbs|sfr|sca|scb|csc|edu|new|xxx|hiv|fox|wme|ngo|nhk|vip|sex|frl|lat|yun|law|you|tax|soy|sew|om|ac|hu|se|sc|sg|sh|sb|sa|rw|ru|rs|ro|re|qa|py|si|pw|pt|ps|sj|sk|pr|pn|pm|pl|sl|sm|pk|sn|ph|so|pg|pf|pe|pa|zw|nz|nu|nr|np|no|nl|ni|ng|nf|sr|ne|st|nc|na|mz|my|mx|mw|mv|mu|mt|ms|mr|mq|mp|mo|su|mn|mm|ml|mk|mh|mg|me|sv|md|mc|sx|sy|ma|ly|lv|sz|lu|lt|ls|lr|lk|li|lc|lb|la|tc|kz|td|ky|kw|kr|kp|kn|km|ki|kh|tf|tg|th|kg|ke|jp|jo|jm|je|it|is|ir|tj|tk|tl|tm|iq|tn|to|io|in|im|il|ie|ad|sd|ht|hr|hn|hm|tr|hk|gy|gw|gu|gt|gs|gr|gq|tt|gp|gn|gm|gl|tv|gi|tw|tz|ua|gh|ug|uk|gg|gf|ge|gd|us|uy|uz|va|gb|ga|vc|ve|fr|fo|fm|fk|fj|vg|vi|fi|eu|et|es|er|eg|ee|ec|dz|do|dm|dk|vn|dj|de|cz|cy|cx|cw|vu|cv|cu|cr|co|cn|cm|cl|ck|ci|ch|cg|cf|cd|cc|ca|wf|bz|by|bw|bv|bt|bs|br|bo|bn|bm|bj|bi|ws|bh|bg|bf|be|bd|bb|ba|az|ax|aw|au|at|as|ye|ar|aq|ao|am|al|yt|ai|za|ag|af|ae|zm|id)\b/;


		return {

			/**
			 * The string form of a regular expression that would match all of the
			 * letters and decimal number chars in the unicode character set when placed
			 * in a RegExp character class (`[]`).
			 *
			 * These would be the characters matched by unicode regex engines `[\p{L}\p{Nd}]`
			 * escape ("all letters and decimal numbers")
			 *
			 * @property {String} alphaNumericCharsStr
			 */
			alphaNumericCharsStr : alphaNumericCharsStr,

			/**
			 * A regular expression to match domain names of a URL or email address.
			 * Ex: 'google', 'yahoo', 'some-other-company', etc.
			 *
			 * @property {RegExp} domainNameRegex
			 */
			domainNameRegex : domainNameRegex,

			/**
			 * A regular expression to match top level domains (TLDs) for a URL or
			 * email address. Ex: 'com', 'org', 'net', etc.
			 *
			 * @property {RegExp} tldRegex
			 */
			tldRegex : tldRegex

		};


	}() );
	/*global Autolinker */
	/*jshint sub:true */
	/**
	 * @protected
	 * @class Autolinker.AnchorTagBuilder
	 * @extends Object
	 *
	 * Builds anchor (&lt;a&gt;) tags for the Autolinker utility when a match is
	 * found.
	 *
	 * Normally this class is instantiated, configured, and used internally by an
	 * {@link Autolinker} instance, but may actually be retrieved in a {@link Autolinker#replaceFn replaceFn}
	 * to create {@link Autolinker.HtmlTag HtmlTag} instances which may be modified
	 * before returning from the {@link Autolinker#replaceFn replaceFn}. For
	 * example:
	 *
	 *     var html = Autolinker.link( "Test google.com", {
	 *         replaceFn : function( autolinker, match ) {
	 *             var tag = autolinker.getTagBuilder().build( match );  // returns an {@link Autolinker.HtmlTag} instance
	 *             tag.setAttr( 'rel', 'nofollow' );
	 *
	 *             return tag;
	 *         }
	 *     } );
	 *
	 *     // generated html:
	 *     //   Test <a href="http://google.com" target="_blank" rel="nofollow">google.com</a>
	 */
	Autolinker.AnchorTagBuilder = Autolinker.Util.extend( Object, {

		/**
		 * @cfg {Boolean} newWindow
		 * @inheritdoc Autolinker#newWindow
		 */

		/**
		 * @cfg {Object} truncate
		 * @inheritdoc Autolinker#truncate
		 */

		/**
		 * @cfg {String} className
		 * @inheritdoc Autolinker#className
		 */


		/**
		 * @constructor
		 * @param {Object} [cfg] The configuration options for the AnchorTagBuilder instance, specified in an Object (map).
		 */
		constructor : function( cfg ) {
			Autolinker.Util.assign( this, cfg );
		},


		/**
		 * Generates the actual anchor (&lt;a&gt;) tag to use in place of the
		 * matched text, via its `match` object.
		 *
		 * @param {Autolinker.match.Match} match The Match instance to generate an
		 *   anchor tag from.
		 * @return {Autolinker.HtmlTag} The HtmlTag instance for the anchor tag.
		 */
		build : function( match ) {
			return new Autolinker.HtmlTag( {
				tagName   : 'a',
				attrs     : this.createAttrs( match.getType(), match.getAnchorHref() ),
				innerHtml : this.processAnchorText( match.getAnchorText() )
			} );
		},


		/**
		 * Creates the Object (map) of the HTML attributes for the anchor (&lt;a&gt;)
		 *   tag being generated.
		 *
		 * @protected
		 * @param {"url"/"email"/"phone"/"twitter"/"hashtag"} matchType The type of
		 *   match that an anchor tag is being generated for.
		 * @param {String} anchorHref The href for the anchor tag.
		 * @return {Object} A key/value Object (map) of the anchor tag's attributes.
		 */
		createAttrs : function( matchType, anchorHref ) {
			var attrs = {
				'href' : anchorHref  // we'll always have the `href` attribute
			};

			var cssClass = this.createCssClass( matchType );
			if( cssClass ) {
				attrs[ 'class' ] = cssClass;
			}
			if( this.newWindow ) {
				attrs[ 'target' ] = "_blank";
				attrs[ 'rel' ] = "noopener noreferrer";
			}

			return attrs;
		},


		/**
		 * Creates the CSS class that will be used for a given anchor tag, based on
		 * the `matchType` and the {@link #className} config.
		 *
		 * @private
		 * @param {"url"/"email"/"phone"/"twitter"/"hashtag"} matchType The type of
		 *   match that an anchor tag is being generated for.
		 * @return {String} The CSS class string for the link. Example return:
		 *   "myLink myLink-url". If no {@link #className} was configured, returns
		 *   an empty string.
		 */
		createCssClass : function( matchType ) {
			var className = this.className;

			if( !className )
				return "";
			else
				return className + " " + className + "-" + matchType;  // ex: "myLink myLink-url", "myLink myLink-email", "myLink myLink-phone", "myLink myLink-twitter", or "myLink myLink-hashtag"
		},


		/**
		 * Processes the `anchorText` by truncating the text according to the
		 * {@link #truncate} config.
		 *
		 * @private
		 * @param {String} anchorText The anchor tag's text (i.e. what will be
		 *   displayed).
		 * @return {String} The processed `anchorText`.
		 */
		processAnchorText : function( anchorText ) {
			anchorText = this.doTruncate( anchorText );

			return anchorText;
		},


		/**
		 * Performs the truncation of the `anchorText` based on the {@link #truncate}
		 * option. If the `anchorText` is longer than the length specified by the
		 * {@link #truncate} option, the truncation is performed based on the
		 * `location` property. See {@link #truncate} for details.
		 *
		 * @private
		 * @param {String} anchorText The anchor tag's text (i.e. what will be
		 *   displayed).
		 * @return {String} The truncated anchor text.
		 */
		doTruncate : function( anchorText ) {
			var truncate = this.truncate;
			if( !truncate || !truncate.length ) return anchorText;

			var truncateLength = truncate.length,
				truncateLocation = truncate.location;

			if( truncateLocation === 'smart' ) {
				return Autolinker.truncate.TruncateSmart( anchorText, truncateLength, '..' );

			} else if( truncateLocation === 'middle' ) {
				return Autolinker.truncate.TruncateMiddle( anchorText, truncateLength, '..' );

			} else {
				return Autolinker.truncate.TruncateEnd( anchorText, truncateLength, '..' );
			}
		}

	} );

	/*global Autolinker */
	/**
	 * @class Autolinker.htmlParser.HtmlParser
	 * @extends Object
	 *
	 * An HTML parser implementation which simply walks an HTML string and returns an array of
	 * {@link Autolinker.htmlParser.HtmlNode HtmlNodes} that represent the basic HTML structure of the input string.
	 *
	 * Autolinker uses this to only link URLs/emails/Twitter handles within text nodes, effectively ignoring / "walking
	 * around" HTML tags.
	 */
	Autolinker.htmlParser.HtmlParser = Autolinker.Util.extend( Object, {

		/**
		 * @private
		 * @property {RegExp} htmlRegex
		 *
		 * The regular expression used to pull out HTML tags from a string. Handles namespaced HTML tags and
		 * attribute names, as specified by http://www.w3.org/TR/html-markup/syntax.html.
		 *
		 * Capturing groups:
		 *
		 * 1. The "!DOCTYPE" tag name, if a tag is a &lt;!DOCTYPE&gt; tag.
		 * 2. If it is an end tag, this group will have the '/'.
		 * 3. If it is a comment tag, this group will hold the comment text (i.e.
		 *    the text inside the `&lt;!--` and `--&gt;`.
		 * 4. The tag name for all tags (other than the &lt;!DOCTYPE&gt; tag)
		 */
		htmlRegex : (function() {
			var commentTagRegex = /!--([\s\S]+?)--/,
			    tagNameRegex = /[0-9a-zA-Z][0-9a-zA-Z:]*/,
			    attrNameRegex = /[^\s"'>\/=\x00-\x1F\x7F]+/,   // the unicode range accounts for excluding control chars, and the delete char
			    attrValueRegex = /(?:"[^"]*?"|'[^']*?'|[^'"=<>`\s]+)/, // double quoted, single quoted, or unquoted attribute values
			    nameEqualsValueRegex = attrNameRegex.source + '(?:\\s*=\\s*' + attrValueRegex.source + ')?';  // optional '=[value]'

			return new RegExp( [
				// for <!DOCTYPE> tag. Ex: <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">)
				'(?:',
					'<(!DOCTYPE)',  // *** Capturing Group 1 - If it's a doctype tag

						// Zero or more attributes following the tag name
						'(?:',
							'\\s+',  // one or more whitespace chars before an attribute

							// Either:
							// A. attr="value", or
							// B. "value" alone (To cover example doctype tag: <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">)
							'(?:', nameEqualsValueRegex, '|', attrValueRegex.source + ')',
						')*',
					'>',
				')',

				'|',

				// All other HTML tags (i.e. tags that are not <!DOCTYPE>)
				'(?:',
					'<(/)?',  // Beginning of a tag or comment. Either '<' for a start tag, or '</' for an end tag.
					          // *** Capturing Group 2: The slash or an empty string. Slash ('/') for end tag, empty string for start or self-closing tag.

						'(?:',
							commentTagRegex.source,  // *** Capturing Group 3 - A Comment Tag's Text

							'|',

							'(?:',

								// *** Capturing Group 4 - The tag name
								'(' + tagNameRegex.source + ')',

								// Zero or more attributes following the tag name
								'(?:',
									'(?:\\s+|\\b)',        // any number of whitespace chars before an attribute. NOTE: Using \s* here throws Chrome into an infinite loop for some reason, so using \s+|\b instead
									nameEqualsValueRegex,  // attr="value" (with optional ="value" part)
								')*',

								'\\s*/?',  // any trailing spaces and optional '/' before the closing '>'

							')',
						')',
					'>',
				')'
			].join( "" ), 'gi' );
		} )(),

		/**
		 * @private
		 * @property {RegExp} htmlCharacterEntitiesRegex
		 *
		 * The regular expression that matches common HTML character entities.
		 *
		 * Ignoring &amp; as it could be part of a query string -- handling it separately.
		 */
		htmlCharacterEntitiesRegex: /(&nbsp;|&#160;|&lt;|&#60;|&gt;|&#62;|&quot;|&#34;|&#39;)/gi,


		/**
		 * Parses an HTML string and returns a simple array of {@link Autolinker.htmlParser.HtmlNode HtmlNodes}
		 * to represent the HTML structure of the input string.
		 *
		 * @param {String} html The HTML to parse.
		 * @return {Autolinker.htmlParser.HtmlNode[]}
		 */
		parse : function( html ) {
			var htmlRegex = this.htmlRegex,
			    currentResult,
			    lastIndex = 0,
			    textAndEntityNodes,
			    nodes = [];  // will be the result of the method

			while( ( currentResult = htmlRegex.exec( html ) ) !== null ) {
				var tagText = currentResult[ 0 ],
				    commentText = currentResult[ 3 ], // if we've matched a comment
				    tagName = currentResult[ 1 ] || currentResult[ 4 ],  // The <!DOCTYPE> tag (ex: "!DOCTYPE"), or another tag (ex: "a" or "img")
				    isClosingTag = !!currentResult[ 2 ],
				    offset = currentResult.index,
				    inBetweenTagsText = html.substring( lastIndex, offset );

				// Push TextNodes and EntityNodes for any text found between tags
				if( inBetweenTagsText ) {
					textAndEntityNodes = this.parseTextAndEntityNodes( lastIndex, inBetweenTagsText );
					nodes.push.apply( nodes, textAndEntityNodes );
				}

				// Push the CommentNode or ElementNode
				if( commentText ) {
					nodes.push( this.createCommentNode( offset, tagText, commentText ) );
				} else {
					nodes.push( this.createElementNode( offset, tagText, tagName, isClosingTag ) );
				}

				lastIndex = offset + tagText.length;
			}

			// Process any remaining text after the last HTML element. Will process all of the text if there were no HTML elements.
			if( lastIndex < html.length ) {
				var text = html.substring( lastIndex );

				// Push TextNodes and EntityNodes for any text found between tags
				if( text ) {
					textAndEntityNodes = this.parseTextAndEntityNodes( lastIndex, text );
					nodes.push.apply( nodes, textAndEntityNodes );
				}
			}

			return nodes;
		},


		/**
		 * Parses text and HTML entity nodes from a given string. The input string
		 * should not have any HTML tags (elements) within it.
		 *
		 * @private
		 * @param {Number} offset The offset of the text node match within the
		 *   original HTML string.
		 * @param {String} text The string of text to parse. This is from an HTML
		 *   text node.
		 * @return {Autolinker.htmlParser.HtmlNode[]} An array of HtmlNodes to
		 *   represent the {@link Autolinker.htmlParser.TextNode TextNodes} and
		 *   {@link Autolinker.htmlParser.EntityNode EntityNodes} found.
		 */
		parseTextAndEntityNodes : function( offset, text ) {
			var nodes = [],
			    textAndEntityTokens = Autolinker.Util.splitAndCapture( text, this.htmlCharacterEntitiesRegex );  // split at HTML entities, but include the HTML entities in the results array

			// Every even numbered token is a TextNode, and every odd numbered token is an EntityNode
			// For example: an input `text` of "Test &quot;this&quot; today" would turn into the
			//   `textAndEntityTokens`: [ 'Test ', '&quot;', 'this', '&quot;', ' today' ]
			for( var i = 0, len = textAndEntityTokens.length; i < len; i += 2 ) {
				var textToken = textAndEntityTokens[ i ],
				    entityToken = textAndEntityTokens[ i + 1 ];

				if( textToken ) {
					nodes.push( this.createTextNode( offset, textToken ) );
					offset += textToken.length;
				}
				if( entityToken ) {
					nodes.push( this.createEntityNode( offset, entityToken ) );
					offset += entityToken.length;
				}
			}
			return nodes;
		},


		/**
		 * Factory method to create an {@link Autolinker.htmlParser.CommentNode CommentNode}.
		 *
		 * @private
		 * @param {Number} offset The offset of the match within the original HTML
		 *   string.
		 * @param {String} tagText The full text of the tag (comment) that was
		 *   matched, including its &lt;!-- and --&gt;.
		 * @param {String} commentText The full text of the comment that was matched.
		 */
		createCommentNode : function( offset, tagText, commentText ) {
			return new Autolinker.htmlParser.CommentNode( {
				offset : offset,
				text   : tagText,
				comment: Autolinker.Util.trim( commentText )
			} );
		},


		/**
		 * Factory method to create an {@link Autolinker.htmlParser.ElementNode ElementNode}.
		 *
		 * @private
		 * @param {Number} offset The offset of the match within the original HTML
		 *   string.
		 * @param {String} tagText The full text of the tag (element) that was
		 *   matched, including its attributes.
		 * @param {String} tagName The name of the tag. Ex: An &lt;img&gt; tag would
		 *   be passed to this method as "img".
		 * @param {Boolean} isClosingTag `true` if it's a closing tag, false
		 *   otherwise.
		 * @return {Autolinker.htmlParser.ElementNode}
		 */
		createElementNode : function( offset, tagText, tagName, isClosingTag ) {
			return new Autolinker.htmlParser.ElementNode( {
				offset  : offset,
				text    : tagText,
				tagName : tagName.toLowerCase(),
				closing : isClosingTag
			} );
		},


		/**
		 * Factory method to create a {@link Autolinker.htmlParser.EntityNode EntityNode}.
		 *
		 * @private
		 * @param {Number} offset The offset of the match within the original HTML
		 *   string.
		 * @param {String} text The text that was matched for the HTML entity (such
		 *   as '&amp;nbsp;').
		 * @return {Autolinker.htmlParser.EntityNode}
		 */
		createEntityNode : function( offset, text ) {
			return new Autolinker.htmlParser.EntityNode( { offset: offset, text: text } );
		},


		/**
		 * Factory method to create a {@link Autolinker.htmlParser.TextNode TextNode}.
		 *
		 * @private
		 * @param {Number} offset The offset of the match within the original HTML
		 *   string.
		 * @param {String} text The text that was matched.
		 * @return {Autolinker.htmlParser.TextNode}
		 */
		createTextNode : function( offset, text ) {
			return new Autolinker.htmlParser.TextNode( { offset: offset, text: text } );
		}

	} );
	/*global Autolinker */
	/**
	 * @abstract
	 * @class Autolinker.htmlParser.HtmlNode
	 *
	 * Represents an HTML node found in an input string. An HTML node is one of the
	 * following:
	 *
	 * 1. An {@link Autolinker.htmlParser.ElementNode ElementNode}, which represents
	 *    HTML tags.
	 * 2. A {@link Autolinker.htmlParser.CommentNode CommentNode}, which represents
	 *    HTML comments.
	 * 3. A {@link Autolinker.htmlParser.TextNode TextNode}, which represents text
	 *    outside or within HTML tags.
	 * 4. A {@link Autolinker.htmlParser.EntityNode EntityNode}, which represents
	 *    one of the known HTML entities that Autolinker looks for. This includes
	 *    common ones such as &amp;quot; and &amp;nbsp;
	 */
	Autolinker.htmlParser.HtmlNode = Autolinker.Util.extend( Object, {

		/**
		 * @cfg {Number} offset (required)
		 *
		 * The offset of the HTML node in the original text that was parsed.
		 */
		offset : undefined,

		/**
		 * @cfg {String} text (required)
		 *
		 * The text that was matched for the HtmlNode.
		 *
		 * - In the case of an {@link Autolinker.htmlParser.ElementNode ElementNode},
		 *   this will be the tag's text.
		 * - In the case of an {@link Autolinker.htmlParser.CommentNode CommentNode},
		 *   this will be the comment's text.
		 * - In the case of a {@link Autolinker.htmlParser.TextNode TextNode}, this
		 *   will be the text itself.
		 * - In the case of a {@link Autolinker.htmlParser.EntityNode EntityNode},
		 *   this will be the text of the HTML entity.
		 */
		text : undefined,


		/**
		 * @constructor
		 * @param {Object} cfg The configuration properties for the Match instance,
		 * specified in an Object (map).
		 */
		constructor : function( cfg ) {
			Autolinker.Util.assign( this, cfg );

			if( this.offset == null ) throw new Error( '`offset` cfg required' );
			if( this.text == null ) throw new Error( '`text` cfg required' );
		},


		/**
		 * Returns a string name for the type of node that this class represents.
		 *
		 * @abstract
		 * @return {String}
		 */
		getType : Autolinker.Util.abstractMethod,


		/**
		 * Retrieves the {@link #offset} of the HtmlNode. This is the offset of the
		 * HTML node in the original string that was parsed.
		 *
		 * @return {Number}
		 */
		getOffset : function() {
			return this.offset;
		},


		/**
		 * Retrieves the {@link #text} for the HtmlNode.
		 *
		 * @return {String}
		 */
		getText : function() {
			return this.text;
		}

	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.htmlParser.CommentNode
	 * @extends Autolinker.htmlParser.HtmlNode
	 *
	 * Represents an HTML comment node that has been parsed by the
	 * {@link Autolinker.htmlParser.HtmlParser}.
	 *
	 * See this class's superclass ({@link Autolinker.htmlParser.HtmlNode}) for more
	 * details.
	 */
	Autolinker.htmlParser.CommentNode = Autolinker.Util.extend( Autolinker.htmlParser.HtmlNode, {

		/**
		 * @cfg {String} comment (required)
		 *
		 * The text inside the comment tag. This text is stripped of any leading or
		 * trailing whitespace.
		 */
		comment : '',


		/**
		 * Returns a string name for the type of node that this class represents.
		 *
		 * @return {String}
		 */
		getType : function() {
			return 'comment';
		},


		/**
		 * Returns the comment inside the comment tag.
		 *
		 * @return {String}
		 */
		getComment : function() {
			return this.comment;
		}

	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.htmlParser.ElementNode
	 * @extends Autolinker.htmlParser.HtmlNode
	 *
	 * Represents an HTML element node that has been parsed by the {@link Autolinker.htmlParser.HtmlParser}.
	 *
	 * See this class's superclass ({@link Autolinker.htmlParser.HtmlNode}) for more
	 * details.
	 */
	Autolinker.htmlParser.ElementNode = Autolinker.Util.extend( Autolinker.htmlParser.HtmlNode, {

		/**
		 * @cfg {String} tagName (required)
		 *
		 * The name of the tag that was matched.
		 */
		tagName : '',

		/**
		 * @cfg {Boolean} closing (required)
		 *
		 * `true` if the element (tag) is a closing tag, `false` if its an opening
		 * tag.
		 */
		closing : false,


		/**
		 * Returns a string name for the type of node that this class represents.
		 *
		 * @return {String}
		 */
		getType : function() {
			return 'element';
		},


		/**
		 * Returns the HTML element's (tag's) name. Ex: for an &lt;img&gt; tag,
		 * returns "img".
		 *
		 * @return {String}
		 */
		getTagName : function() {
			return this.tagName;
		},


		/**
		 * Determines if the HTML element (tag) is a closing tag. Ex: &lt;div&gt;
		 * returns `false`, while &lt;/div&gt; returns `true`.
		 *
		 * @return {Boolean}
		 */
		isClosing : function() {
			return this.closing;
		}

	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.htmlParser.EntityNode
	 * @extends Autolinker.htmlParser.HtmlNode
	 *
	 * Represents a known HTML entity node that has been parsed by the {@link Autolinker.htmlParser.HtmlParser}.
	 * Ex: '&amp;nbsp;', or '&amp#160;' (which will be retrievable from the {@link #getText}
	 * method.
	 *
	 * Note that this class will only be returned from the HtmlParser for the set of
	 * checked HTML entity nodes  defined by the {@link Autolinker.htmlParser.HtmlParser#htmlCharacterEntitiesRegex}.
	 *
	 * See this class's superclass ({@link Autolinker.htmlParser.HtmlNode}) for more
	 * details.
	 */
	Autolinker.htmlParser.EntityNode = Autolinker.Util.extend( Autolinker.htmlParser.HtmlNode, {

		/**
		 * Returns a string name for the type of node that this class represents.
		 *
		 * @return {String}
		 */
		getType : function() {
			return 'entity';
		}

	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.htmlParser.TextNode
	 * @extends Autolinker.htmlParser.HtmlNode
	 *
	 * Represents a text node that has been parsed by the {@link Autolinker.htmlParser.HtmlParser}.
	 *
	 * See this class's superclass ({@link Autolinker.htmlParser.HtmlNode}) for more
	 * details.
	 */
	Autolinker.htmlParser.TextNode = Autolinker.Util.extend( Autolinker.htmlParser.HtmlNode, {

		/**
		 * Returns a string name for the type of node that this class represents.
		 *
		 * @return {String}
		 */
		getType : function() {
			return 'text';
		}

	} );
	/*global Autolinker */
	/**
	 * @abstract
	 * @class Autolinker.match.Match
	 *
	 * Represents a match found in an input string which should be Autolinked. A Match object is what is provided in a
	 * {@link Autolinker#replaceFn replaceFn}, and may be used to query for details about the match.
	 *
	 * For example:
	 *
	 *     var input = "...";  // string with URLs, Email Addresses, and Twitter Handles
	 *
	 *     var linkedText = Autolinker.link( input, {
	 *         replaceFn : function( autolinker, match ) {
	 *             console.log( "href = ", match.getAnchorHref() );
	 *             console.log( "text = ", match.getAnchorText() );
	 *
	 *             switch( match.getType() ) {
	 *                 case 'url' :
	 *                     console.log( "url: ", match.getUrl() );
	 *
	 *                 case 'email' :
	 *                     console.log( "email: ", match.getEmail() );
	 *
	 *                 case 'twitter' :
	 *                     console.log( "twitter: ", match.getTwitterHandle() );
	 *             }
	 *         }
	 *     } );
	 *
	 * See the {@link Autolinker} class for more details on using the {@link Autolinker#replaceFn replaceFn}.
	 */
	Autolinker.match.Match = Autolinker.Util.extend( Object, {

		/**
		 * @cfg {Autolinker.AnchorTagBuilder} tagBuilder (required)
		 *
		 * Reference to the AnchorTagBuilder instance to use to generate an anchor
		 * tag for the Match.
		 */

		/**
		 * @cfg {String} matchedText (required)
		 *
		 * The original text that was matched by the {@link Autolinker.matcher.Matcher}.
		 */

		/**
		 * @cfg {Number} offset (required)
		 *
		 * The offset of where the match was made in the input string.
		 */


		/**
		 * @constructor
		 * @param {Object} cfg The configuration properties for the Match
		 *   instance, specified in an Object (map).
		 */
		constructor : function( cfg ) {
			if( cfg.tagBuilder == null ) throw new Error( '`tagBuilder` cfg required' );
			if( cfg.matchedText == null ) throw new Error( '`matchedText` cfg required' );
			if( cfg.offset == null ) throw new Error( '`offset` cfg required' );

			this.tagBuilder = cfg.tagBuilder;
			this.matchedText = cfg.matchedText;
			this.offset = cfg.offset;
		},


		/**
		 * Returns a string name for the type of match that this class represents.
		 *
		 * @abstract
		 * @return {String}
		 */
		getType : Autolinker.Util.abstractMethod,


		/**
		 * Returns the original text that was matched.
		 *
		 * @return {String}
		 */
		getMatchedText : function() {
			return this.matchedText;
		},


		/**
		 * Sets the {@link #offset} of where the match was made in the input string.
		 *
		 * A {@link Autolinker.matcher.Matcher} will be fed only HTML text nodes,
		 * and will therefore set an original offset that is relative to the HTML
		 * text node itself. However, we want this offset to be relative to the full
		 * HTML input string, and thus if using {@link Autolinker#parse} (rather
		 * than calling a {@link Autolinker.matcher.Matcher} directly), then this
		 * offset is corrected after the Matcher itself has done its job.
		 *
		 * @param {Number} offset
		 */
		setOffset : function( offset ) {
			this.offset = offset;
		},


		/**
		 * Returns the offset of where the match was made in the input string. This
		 * is the 0-based index of the match.
		 *
		 * @return {Number}
		 */
		getOffset : function() {
			return this.offset;
		},


		/**
		 * Returns the anchor href that should be generated for the match.
		 *
		 * @abstract
		 * @return {String}
		 */
		getAnchorHref : Autolinker.Util.abstractMethod,


		/**
		 * Returns the anchor text that should be generated for the match.
		 *
		 * @abstract
		 * @return {String}
		 */
		getAnchorText : Autolinker.Util.abstractMethod,


		/**
		 * Builds and returns an {@link Autolinker.HtmlTag} instance based on the
		 * Match.
		 *
		 * This can be used to easily generate anchor tags from matches, and either
		 * return their HTML string, or modify them before doing so.
		 *
		 * Example Usage:
		 *
		 *     var tag = match.buildTag();
		 *     tag.addClass( 'cordova-link' );
		 *     tag.setAttr( 'target', '_system' );
		 *
		 *     tag.toAnchorString();  // <a href="http://google.com" class="cordova-link" target="_system">Google</a>
		 */
		buildTag : function() {
			return this.tagBuilder.build( this );
		}

	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.match.Email
	 * @extends Autolinker.match.Match
	 *
	 * Represents a Email match found in an input string which should be Autolinked.
	 *
	 * See this class's superclass ({@link Autolinker.match.Match}) for more details.
	 */
	Autolinker.match.Email = Autolinker.Util.extend( Autolinker.match.Match, {

		/**
		 * @cfg {String} email (required)
		 *
		 * The email address that was matched.
		 */


		/**
		 * @constructor
		 * @param {Object} cfg The configuration properties for the Match
		 *   instance, specified in an Object (map).
		 */
		constructor : function( cfg ) {
			Autolinker.match.Match.prototype.constructor.call( this, cfg );

			if( !cfg.email ) throw new Error( '`email` cfg required' );

			this.email = cfg.email;
		},


		/**
		 * Returns a string name for the type of match that this class represents.
		 *
		 * @return {String}
		 */
		getType : function() {
			return 'email';
		},


		/**
		 * Returns the email address that was matched.
		 *
		 * @return {String}
		 */
		getEmail : function() {
			return this.email;
		},


		/**
		 * Returns the anchor href that should be generated for the match.
		 *
		 * @return {String}
		 */
		getAnchorHref : function() {
			return 'mailto:' + this.email;
		},


		/**
		 * Returns the anchor text that should be generated for the match.
		 *
		 * @return {String}
		 */
		getAnchorText : function() {
			return this.email;
		}

	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.match.Hashtag
	 * @extends Autolinker.match.Match
	 *
	 * Represents a Hashtag match found in an input string which should be
	 * Autolinked.
	 *
	 * See this class's superclass ({@link Autolinker.match.Match}) for more
	 * details.
	 */
	Autolinker.match.Hashtag = Autolinker.Util.extend( Autolinker.match.Match, {

		/**
		 * @cfg {String} serviceName
		 *
		 * The service to point hashtag matches to. See {@link Autolinker#hashtag}
		 * for available values.
		 */

		/**
		 * @cfg {String} hashtag (required)
		 *
		 * The Hashtag that was matched, without the '#'.
		 */


		/**
		 * @constructor
		 * @param {Object} cfg The configuration properties for the Match
		 *   instance, specified in an Object (map).
		 */
		constructor : function( cfg ) {
			Autolinker.match.Match.prototype.constructor.call( this, cfg );

			// TODO: if( !serviceName ) throw new Error( '`serviceName` cfg required' );
			if( !cfg.hashtag ) throw new Error( '`hashtag` cfg required' );

			this.serviceName = cfg.serviceName;
			this.hashtag = cfg.hashtag;
		},


		/**
		 * Returns the type of match that this class represents.
		 *
		 * @return {String}
		 */
		getType : function() {
			return 'hashtag';
		},


		/**
		 * Returns the configured {@link #serviceName} to point the Hashtag to.
		 * Ex: 'facebook', 'twitter'.
		 *
		 * @return {String}
		 */
		getServiceName : function() {
			return this.serviceName;
		},


		/**
		 * Returns the matched hashtag, without the '#' character.
		 *
		 * @return {String}
		 */
		getHashtag : function() {
			return this.hashtag;
		},


		/**
		 * Returns the anchor href that should be generated for the match.
		 *
		 * @return {String}
		 */
		getAnchorHref : function() {
			var serviceName = this.serviceName,
			    hashtag = this.hashtag;

			switch( serviceName ) {
				case 'twitter' :
					return 'https://twitter.com/hashtag/' + hashtag;
				case 'facebook' :
					return 'https://www.facebook.com/hashtag/' + hashtag;
				case 'instagram' :
					return 'https://instagram.com/explore/tags/' + hashtag;

				default :  // Shouldn't happen because Autolinker's constructor should block any invalid values, but just in case.
					throw new Error( 'Unknown service name to point hashtag to: ', serviceName );
			}
		},


		/**
		 * Returns the anchor text that should be generated for the match.
		 *
		 * @return {String}
		 */
		getAnchorText : function() {
			return '#' + this.hashtag;
		}

	} );

	/*global Autolinker */
	/**
	 * @class Autolinker.match.Phone
	 * @extends Autolinker.match.Match
	 *
	 * Represents a Phone number match found in an input string which should be
	 * Autolinked.
	 *
	 * See this class's superclass ({@link Autolinker.match.Match}) for more
	 * details.
	 */
	Autolinker.match.Phone = Autolinker.Util.extend( Autolinker.match.Match, {

		/**
		 * @protected
		 * @property {String} number (required)
		 *
		 * The phone number that was matched, without any delimiter characters.
		 *
		 * Note: This is a string to allow for prefixed 0's.
		 */

		/**
		 * @protected
		 * @property  {Boolean} plusSign (required)
		 *
		 * `true` if the matched phone number started with a '+' sign. We'll include
		 * it in the `tel:` URL if so, as this is needed for international numbers.
		 *
		 * Ex: '+1 (123) 456 7879'
		 */


		/**
		 * @constructor
		 * @param {Object} cfg The configuration properties for the Match
		 *   instance, specified in an Object (map).
		 */
		constructor : function( cfg ) {
			Autolinker.match.Match.prototype.constructor.call( this, cfg );

			if( !cfg.number ) throw new Error( '`number` cfg required' );
			if( cfg.plusSign == null ) throw new Error( '`plusSign` cfg required' );

			this.number = cfg.number;
			this.plusSign = cfg.plusSign;
		},


		/**
		 * Returns a string name for the type of match that this class represents.
		 *
		 * @return {String}
		 */
		getType : function() {
			return 'phone';
		},


		/**
		 * Returns the phone number that was matched as a string, without any
		 * delimiter characters.
		 *
		 * Note: This is a string to allow for prefixed 0's.
		 *
		 * @return {String}
		 */
		getNumber: function() {
			return this.number;
		},


		/**
		 * Returns the anchor href that should be generated for the match.
		 *
		 * @return {String}
		 */
		getAnchorHref : function() {
			return 'tel:' + ( this.plusSign ? '+' : '' ) + this.number;
		},


		/**
		 * Returns the anchor text that should be generated for the match.
		 *
		 * @return {String}
		 */
		getAnchorText : function() {
			return this.matchedText;
		}

	} );

	/*global Autolinker */
	/**
	 * @class Autolinker.match.Twitter
	 * @extends Autolinker.match.Match
	 *
	 * Represents a Twitter match found in an input string which should be Autolinked.
	 *
	 * See this class's superclass ({@link Autolinker.match.Match}) for more details.
	 */
	Autolinker.match.Twitter = Autolinker.Util.extend( Autolinker.match.Match, {

		/**
		 * @cfg {String} twitterHandle (required)
		 *
		 * The Twitter handle that was matched, without the '@' character.
		 */


		/**
		 * @constructor
		 * @param {Object} cfg The configuration properties for the Match
		 *   instance, specified in an Object (map).
		 */
		constructor : function( cfg) {
			Autolinker.match.Match.prototype.constructor.call( this, cfg );

			if( !cfg.twitterHandle ) throw new Error( '`twitterHandle` cfg required' );

			this.twitterHandle = cfg.twitterHandle;
		},


		/**
		 * Returns the type of match that this class represents.
		 *
		 * @return {String}
		 */
		getType : function() {
			return 'twitter';
		},


		/**
		 * Returns the twitter handle, without the '@' character.
		 *
		 * @return {String}
		 */
		getTwitterHandle : function() {
			return this.twitterHandle;
		},


		/**
		 * Returns the anchor href that should be generated for the match.
		 *
		 * @return {String}
		 */
		getAnchorHref : function() {
			return 'https://twitter.com/' + this.twitterHandle;
		},


		/**
		 * Returns the anchor text that should be generated for the match.
		 *
		 * @return {String}
		 */
		getAnchorText : function() {
			return '@' + this.twitterHandle;
		}

	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.match.Url
	 * @extends Autolinker.match.Match
	 *
	 * Represents a Url match found in an input string which should be Autolinked.
	 *
	 * See this class's superclass ({@link Autolinker.match.Match}) for more details.
	 */
	Autolinker.match.Url = Autolinker.Util.extend( Autolinker.match.Match, {

		/**
		 * @cfg {String} url (required)
		 *
		 * The url that was matched.
		 */

		/**
		 * @cfg {"scheme"/"www"/"tld"} urlMatchType (required)
		 *
		 * The type of URL match that this class represents. This helps to determine
		 * if the match was made in the original text with a prefixed scheme (ex:
		 * 'http://www.google.com'), a prefixed 'www' (ex: 'www.google.com'), or
		 * was matched by a known top-level domain (ex: 'google.com').
		 */

		/**
		 * @cfg {Boolean} protocolUrlMatch (required)
		 *
		 * `true` if the URL is a match which already has a protocol (i.e.
		 * 'http://'), `false` if the match was from a 'www' or known TLD match.
		 */

		/**
		 * @cfg {Boolean} protocolRelativeMatch (required)
		 *
		 * `true` if the URL is a protocol-relative match. A protocol-relative match
		 * is a URL that starts with '//', and will be either http:// or https://
		 * based on the protocol that the site is loaded under.
		 */

		/**
		 * @cfg {Boolean} stripPrefix (required)
		 * @inheritdoc Autolinker#cfg-stripPrefix
		 */


		/**
		 * @constructor
		 * @param {Object} cfg The configuration properties for the Match
		 *   instance, specified in an Object (map).
		 */
		constructor : function( cfg ) {
			Autolinker.match.Match.prototype.constructor.call( this, cfg );

			if( cfg.urlMatchType !== 'scheme' && cfg.urlMatchType !== 'www' && cfg.urlMatchType !== 'tld' ) throw new Error( '`urlMatchType` cfg must be one of: "scheme", "www", or "tld"' );
			if( !cfg.url ) throw new Error( '`url` cfg required' );
			if( cfg.protocolUrlMatch == null ) throw new Error( '`protocolUrlMatch` cfg required' );
			if( cfg.protocolRelativeMatch == null ) throw new Error( '`protocolRelativeMatch` cfg required' );
			if( cfg.stripPrefix == null ) throw new Error( '`stripPrefix` cfg required' );

			this.urlMatchType = cfg.urlMatchType;
			this.url = cfg.url;
			this.protocolUrlMatch = cfg.protocolUrlMatch;
			this.protocolRelativeMatch = cfg.protocolRelativeMatch;
			this.stripPrefix = cfg.stripPrefix;
		},


		/**
		 * @private
		 * @property {RegExp} urlPrefixRegex
		 *
		 * A regular expression used to remove the 'http://' or 'https://' and/or the 'www.' from URLs.
		 */
		urlPrefixRegex: /^(https?:\/\/)?(www\.)?/i,

		/**
		 * @private
		 * @property {RegExp} protocolRelativeRegex
		 *
		 * The regular expression used to remove the protocol-relative '//' from the {@link #url} string, for purposes
		 * of {@link #getAnchorText}. A protocol-relative URL is, for example, "//yahoo.com"
		 */
		protocolRelativeRegex : /^\/\//,

		/**
		 * @private
		 * @property {Boolean} protocolPrepended
		 *
		 * Will be set to `true` if the 'http://' protocol has been prepended to the {@link #url} (because the
		 * {@link #url} did not have a protocol)
		 */
		protocolPrepended : false,


		/**
		 * Returns a string name for the type of match that this class represents.
		 *
		 * @return {String}
		 */
		getType : function() {
			return 'url';
		},


		/**
		 * Returns a string name for the type of URL match that this class
		 * represents.
		 *
		 * This helps to determine if the match was made in the original text with a
		 * prefixed scheme (ex: 'http://www.google.com'), a prefixed 'www' (ex:
		 * 'www.google.com'), or was matched by a known top-level domain (ex:
		 * 'google.com').
		 *
		 * @return {"scheme"/"www"/"tld"}
		 */
		getUrlMatchType : function() {
			return this.urlMatchType;
		},


		/**
		 * Returns the url that was matched, assuming the protocol to be 'http://' if the original
		 * match was missing a protocol.
		 *
		 * @return {String}
		 */
		getUrl : function() {
			var url = this.url;

			// if the url string doesn't begin with a protocol, assume 'http://'
			if( !this.protocolRelativeMatch && !this.protocolUrlMatch && !this.protocolPrepended ) {
				url = this.url = 'http://' + url;

				this.protocolPrepended = true;
			}

			return url;
		},


		/**
		 * Returns the anchor href that should be generated for the match.
		 *
		 * @return {String}
		 */
		getAnchorHref : function() {
			var url = this.getUrl();

			return url.replace( /&amp;/g, '&' );  // any &amp;'s in the URL should be converted back to '&' if they were displayed as &amp; in the source html
		},


		/**
		 * Returns the anchor text that should be generated for the match.
		 *
		 * @return {String}
		 */
		getAnchorText : function() {
			var anchorText = this.getMatchedText();

			if( this.protocolRelativeMatch ) {
				// Strip off any protocol-relative '//' from the anchor text
				anchorText = this.stripProtocolRelativePrefix( anchorText );
			}
			if( this.stripPrefix ) {
				anchorText = this.stripUrlPrefix( anchorText );
			}
			anchorText = this.removeTrailingSlash( anchorText );  // remove trailing slash, if there is one

			return anchorText;
		},


		// ---------------------------------------

		// Utility Functionality

		/**
		 * Strips the URL prefix (such as "http://" or "https://") from the given text.
		 *
		 * @private
		 * @param {String} text The text of the anchor that is being generated, for which to strip off the
		 *   url prefix (such as stripping off "http://")
		 * @return {String} The `anchorText`, with the prefix stripped.
		 */
		stripUrlPrefix : function( text ) {
			return text.replace( this.urlPrefixRegex, '' );
		},


		/**
		 * Strips any protocol-relative '//' from the anchor text.
		 *
		 * @private
		 * @param {String} text The text of the anchor that is being generated, for which to strip off the
		 *   protocol-relative prefix (such as stripping off "//")
		 * @return {String} The `anchorText`, with the protocol-relative prefix stripped.
		 */
		stripProtocolRelativePrefix : function( text ) {
			return text.replace( this.protocolRelativeRegex, '' );
		},


		/**
		 * Removes any trailing slash from the given `anchorText`, in preparation for the text to be displayed.
		 *
		 * @private
		 * @param {String} anchorText The text of the anchor that is being generated, for which to remove any trailing
		 *   slash ('/') that may exist.
		 * @return {String} The `anchorText`, with the trailing slash removed.
		 */
		removeTrailingSlash : function( anchorText ) {
			if( anchorText.charAt( anchorText.length - 1 ) === '/' ) {
				anchorText = anchorText.slice( 0, -1 );
			}
			return anchorText;
		}

	} );
	/*global Autolinker */
	/**
	 * @abstract
	 * @class Autolinker.matcher.Matcher
	 *
	 * An abstract class and interface for individual matchers to find matches in
	 * an input string with linkified versions of them.
	 *
	 * Note that Matchers do not take HTML into account - they must be fed the text
	 * nodes of any HTML string, which is handled by {@link Autolinker#parse}.
	 */
	Autolinker.matcher.Matcher = Autolinker.Util.extend( Object, {

		/**
		 * @cfg {Autolinker.AnchorTagBuilder} tagBuilder (required)
		 *
		 * Reference to the AnchorTagBuilder instance to use to generate HTML tags
		 * for {@link Autolinker.match.Match Matches}.
		 */


		/**
		 * @constructor
		 * @param {Object} cfg The configuration properties for the Matcher
		 *   instance, specified in an Object (map).
		 */
		constructor : function( cfg ) {
			if( !cfg.tagBuilder ) throw new Error( '`tagBuilder` cfg required' );

			this.tagBuilder = cfg.tagBuilder;
		},


		/**
		 * Parses the input `text` and returns the array of {@link Autolinker.match.Match Matches}
		 * for the matcher.
		 *
		 * @abstract
		 * @param {String} text The text to scan and replace matches in.
		 * @return {Autolinker.match.Match[]}
		 */
		parseMatches : Autolinker.Util.abstractMethod

	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.matcher.Email
	 * @extends Autolinker.matcher.Matcher
	 *
	 * Matcher to find email matches in an input string.
	 *
	 * See this class's superclass ({@link Autolinker.matcher.Matcher}) for more details.
	 */
	Autolinker.matcher.Email = Autolinker.Util.extend( Autolinker.matcher.Matcher, {

		/**
		 * The regular expression to match email addresses. Example match:
		 *
		 *     person@place.com
		 *
		 * @private
		 * @property {RegExp} matcherRegex
		 */
		matcherRegex : (function() {
			var alphaNumericChars = Autolinker.RegexLib.alphaNumericCharsStr,
			    emailRegex = new RegExp( '[' + alphaNumericChars + '\\-_\';:&=+$.,]+@' ),  // something@ for email addresses (a.k.a. local-part)
				domainNameRegex = Autolinker.RegexLib.domainNameRegex,
				tldRegex = Autolinker.RegexLib.tldRegex;  // match our known top level domains (TLDs)

			return new RegExp( [
				emailRegex.source,
				domainNameRegex.source,
				'\\.', tldRegex.source   // '.com', '.net', etc
			].join( "" ), 'gi' );
		} )(),


		/**
		 * @inheritdoc
		 */
		parseMatches : function( text ) {
			var matcherRegex = this.matcherRegex,
			    tagBuilder = this.tagBuilder,
			    matches = [],
			    match;

			while( ( match = matcherRegex.exec( text ) ) !== null ) {
				var matchedText = match[ 0 ];

				matches.push( new Autolinker.match.Email( {
					tagBuilder  : tagBuilder,
					matchedText : matchedText,
					offset      : match.index,
					email       : matchedText
				} ) );
			}

			return matches;
		}

	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.matcher.Hashtag
	 * @extends Autolinker.matcher.Matcher
	 *
	 * Matcher to find Hashtag matches in an input string.
	 */
	Autolinker.matcher.Hashtag = Autolinker.Util.extend( Autolinker.matcher.Matcher, {

		/**
		 * @cfg {String} serviceName
		 *
		 * The service to point hashtag matches to. See {@link Autolinker#hashtag}
		 * for available values.
		 */


		/**
		 * The regular expression to match Hashtags. Example match:
		 *
		 *     #asdf
		 *
		 * @private
		 * @property {RegExp} matcherRegex
		 */
		matcherRegex : new RegExp( '#[_' + Autolinker.RegexLib.alphaNumericCharsStr + ']{1,139}', 'g' ),

		/**
		 * The regular expression to use to check the character before a username match to
		 * make sure we didn't accidentally match an email address.
		 *
		 * For example, the string "asdf@asdf.com" should not match "@asdf" as a username.
		 *
		 * @private
		 * @property {RegExp} nonWordCharRegex
		 */
		nonWordCharRegex : new RegExp( '[^' + Autolinker.RegexLib.alphaNumericCharsStr + ']' ),


		/**
		 * @constructor
		 * @param {Object} cfg The configuration properties for the Match instance,
		 *   specified in an Object (map).
		 */
		constructor : function( cfg ) {
			Autolinker.matcher.Matcher.prototype.constructor.call( this, cfg );

			this.serviceName = cfg.serviceName;
		},


		/**
		 * @inheritdoc
		 */
		parseMatches : function( text ) {
			var matcherRegex = this.matcherRegex,
			    nonWordCharRegex = this.nonWordCharRegex,
			    serviceName = this.serviceName,
			    tagBuilder = this.tagBuilder,
			    matches = [],
			    match;

			while( ( match = matcherRegex.exec( text ) ) !== null ) {
				var offset = match.index,
				    prevChar = text.charAt( offset - 1 );

				// If we found the match at the beginning of the string, or we found the match
				// and there is a whitespace char in front of it (meaning it is not a '#' char
				// in the middle of a word), then it is a hashtag match.
				if( offset === 0 || nonWordCharRegex.test( prevChar ) ) {
					var matchedText = match[ 0 ],
					    hashtag = match[ 0 ].slice( 1 );  // strip off the '#' character at the beginning

					matches.push( new Autolinker.match.Hashtag( {
						tagBuilder  : tagBuilder,
						matchedText : matchedText,
						offset      : offset,
						serviceName : serviceName,
						hashtag     : hashtag
					} ) );
				}
			}

			return matches;
		}

	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.matcher.Phone
	 * @extends Autolinker.matcher.Matcher
	 *
	 * Matcher to find Phone number matches in an input string.
	 *
	 * See this class's superclass ({@link Autolinker.matcher.Matcher}) for more
	 * details.
	 */
	Autolinker.matcher.Phone = Autolinker.Util.extend( Autolinker.matcher.Matcher, {

		/**
		 * The regular expression to match Phone numbers. Example match:
		 *
		 *     (123) 456-7890
		 *
		 * This regular expression has the following capturing groups:
		 *
		 * 1. The prefixed '+' sign, if there is one.
		 *
		 * @private
		 * @property {RegExp} matcherRegex
		 */
		matcherRegex : /(?:(\+)?\d{1,3}[-\040.])?\(?\d{3}\)?[-\040.]?\d{3}[-\040.]\d{4}/g,  // ex: (123) 456-7890, 123 456 7890, 123-456-7890, etc.

		/**
		 * @inheritdoc
		 */
		parseMatches : function( text ) {
			var matcherRegex = this.matcherRegex,
			    tagBuilder = this.tagBuilder,
			    matches = [],
			    match;

			while( ( match = matcherRegex.exec( text ) ) !== null ) {
				// Remove non-numeric values from phone number string
				var matchedText = match[ 0 ],
				    cleanNumber = matchedText.replace( /\D/g, '' ),  // strip out non-digit characters
				    plusSign = !!match[ 1 ];  // match[ 1 ] is the prefixed plus sign, if there is one

				matches.push( new Autolinker.match.Phone( {
					tagBuilder  : tagBuilder,
					matchedText : matchedText,
					offset      : match.index,
					number      : cleanNumber,
					plusSign    : plusSign
				} ) );
			}

			return matches;
		}

	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.matcher.Twitter
	 * @extends Autolinker.matcher.Matcher
	 *
	 * Matcher to find/replace username matches in an input string.
	 */
	Autolinker.matcher.Twitter = Autolinker.Util.extend( Autolinker.matcher.Matcher, {

		/**
		 * The regular expression to match username handles. Example match:
		 *
		 *     @asdf
		 *
		 * @private
		 * @property {RegExp} matcherRegex
		 */
		matcherRegex : new RegExp( '@[_' + Autolinker.RegexLib.alphaNumericCharsStr + ']{1,20}', 'g' ),

		/**
		 * The regular expression to use to check the character before a username match to
		 * make sure we didn't accidentally match an email address.
		 *
		 * For example, the string "asdf@asdf.com" should not match "@asdf" as a username.
		 *
		 * @private
		 * @property {RegExp} nonWordCharRegex
		 */
		nonWordCharRegex : new RegExp( '[^' + Autolinker.RegexLib.alphaNumericCharsStr + ']' ),


		/**
		 * @inheritdoc
		 */
		parseMatches : function( text ) {
			var matcherRegex = this.matcherRegex,
			    nonWordCharRegex = this.nonWordCharRegex,
			    tagBuilder = this.tagBuilder,
			    matches = [],
			    match;

			while( ( match = matcherRegex.exec( text ) ) !== null ) {
				var offset = match.index,
				    prevChar = text.charAt( offset - 1 );

				// If we found the match at the beginning of the string, or we found the match
				// and there is a whitespace char in front of it (meaning it is not an email
				// address), then it is a username match.
				if( offset === 0 || nonWordCharRegex.test( prevChar ) ) {
					var matchedText = match[ 0 ],
					    twitterHandle = match[ 0 ].slice( 1 );  // strip off the '@' character at the beginning

					matches.push( new Autolinker.match.Twitter( {
						tagBuilder    : tagBuilder,
						matchedText   : matchedText,
						offset        : offset,
						twitterHandle : twitterHandle
					} ) );
				}
			}

			return matches;
		}

	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.matcher.Url
	 * @extends Autolinker.matcher.Matcher
	 *
	 * Matcher to find URL matches in an input string.
	 *
	 * See this class's superclass ({@link Autolinker.matcher.Matcher}) for more details.
	 */
	Autolinker.matcher.Url = Autolinker.Util.extend( Autolinker.matcher.Matcher, {

		/**
		 * @cfg {Boolean} stripPrefix (required)
		 * @inheritdoc Autolinker#stripPrefix
		 */


		/**
		 * @private
		 * @property {RegExp} matcherRegex
		 *
		 * The regular expression to match URLs with an optional scheme, port
		 * number, path, query string, and hash anchor.
		 *
		 * Example matches:
		 *
		 *     http://google.com
		 *     www.google.com
		 *     google.com/path/to/file?q1=1&q2=2#myAnchor
		 *
		 *
		 * This regular expression will have the following capturing groups:
		 *
		 * 1.  Group that matches a scheme-prefixed URL (i.e. 'http://google.com').
		 *     This is used to match scheme URLs with just a single word, such as
		 *     'http://localhost', where we won't double check that the domain name
		 *     has at least one dot ('.') in it.
		 * 2.  Group that matches a 'www.' prefixed URL. This is only matched if the
		 *     'www.' text was not prefixed by a scheme (i.e.: not prefixed by
		 *     'http://', 'ftp:', etc.)
		 * 3.  A protocol-relative ('//') match for the case of a 'www.' prefixed
		 *     URL. Will be an empty string if it is not a protocol-relative match.
		 *     We need to know the character before the '//' in order to determine
		 *     if it is a valid match or the // was in a string we don't want to
		 *     auto-link.
		 * 4.  Group that matches a known TLD (top level domain), when a scheme
		 *     or 'www.'-prefixed domain is not matched.
		 * 5.  A protocol-relative ('//') match for the case of a known TLD prefixed
		 *     URL. Will be an empty string if it is not a protocol-relative match.
		 *     See #3 for more info.
		 */
		matcherRegex : (function() {
			var schemeRegex = /(?:[A-Za-z][-.+A-Za-z0-9]*:(?![A-Za-z][-.+A-Za-z0-9]*:\/\/)(?!\d+\/?)(?:\/\/)?)/,  // match protocol, allow in format "http://" or "mailto:". However, do not match the first part of something like 'link:http://www.google.com' (i.e. don't match "link:"). Also, make sure we don't interpret 'google.com:8000' as if 'google.com' was a protocol here (i.e. ignore a trailing port number in this regex)
			    wwwRegex = /(?:www\.)/,                  // starting with 'www.'
			    domainNameRegex = Autolinker.RegexLib.domainNameRegex,
			    tldRegex = Autolinker.RegexLib.tldRegex,  // match our known top level domains (TLDs)
			    alphaNumericCharsStr = Autolinker.RegexLib.alphaNumericCharsStr,

			    // Allow optional path, query string, and hash anchor, not ending in the following characters: "?!:,.;"
			    // http://blog.codinghorror.com/the-problem-with-urls/
			    urlSuffixRegex = new RegExp( '[' + alphaNumericCharsStr + '\\-+&@#/%=~_()|\'$*\\[\\]?!:,.;]*[' + alphaNumericCharsStr + '\\-+&@#/%=~_()|\'$*\\[\\]]' );

			return new RegExp( [
				'(?:', // parens to cover match for scheme (optional), and domain
					'(',  // *** Capturing group $1, for a scheme-prefixed url (ex: http://google.com)
						schemeRegex.source,
						domainNameRegex.source,
					')',

					'|',

					'(',  // *** Capturing group $2, for a 'www.' prefixed url (ex: www.google.com)
						'(//)?',  // *** Capturing group $3 for an optional protocol-relative URL. Must be at the beginning of the string or start with a non-word character (handled later)
						wwwRegex.source,
						domainNameRegex.source,
					')',

					'|',

					'(',  // *** Capturing group $4, for known a TLD url (ex: google.com)
						'(//)?',  // *** Capturing group $5 for an optional protocol-relative URL. Must be at the beginning of the string or start with a non-word character (handled later)
						domainNameRegex.source + '\\.',
						tldRegex.source,
					')',
				')',

				'(?:' + urlSuffixRegex.source + ')?'  // match for path, query string, and/or hash anchor - optional
			].join( "" ), 'gi' );
		} )(),


		/**
		 * A regular expression to use to check the character before a protocol-relative
		 * URL match. We don't want to match a protocol-relative URL if it is part
		 * of another word.
		 *
		 * For example, we want to match something like "Go to: //google.com",
		 * but we don't want to match something like "abc//google.com"
		 *
		 * This regular expression is used to test the character before the '//'.
		 *
		 * @private
		 * @type {RegExp} wordCharRegExp
		 */
		wordCharRegExp : /\w/,


		/**
		 * The regular expression to match opening parenthesis in a URL match.
		 *
		 * This is to determine if we have unbalanced parenthesis in the URL, and to
		 * drop the final parenthesis that was matched if so.
		 *
		 * Ex: The text "(check out: wikipedia.com/something_(disambiguation))"
		 * should only autolink the inner "wikipedia.com/something_(disambiguation)"
		 * part, so if we find that we have unbalanced parenthesis, we will drop the
		 * last one for the match.
		 *
		 * @private
		 * @property {RegExp}
		 */
		openParensRe : /\(/g,

		/**
		 * The regular expression to match closing parenthesis in a URL match. See
		 * {@link #openParensRe} for more information.
		 *
		 * @private
		 * @property {RegExp}
		 */
		closeParensRe : /\)/g,


		/**
		 * @constructor
		 * @param {Object} cfg The configuration properties for the Match instance,
		 *   specified in an Object (map).
		 */
		constructor : function( cfg ) {
			Autolinker.matcher.Matcher.prototype.constructor.call( this, cfg );

			this.stripPrefix = cfg.stripPrefix;

			if( this.stripPrefix == null ) throw new Error( '`stripPrefix` cfg required' );
		},


		/**
		 * @inheritdoc
		 */
		parseMatches : function( text ) {
			var matcherRegex = this.matcherRegex,
			    stripPrefix = this.stripPrefix,
			    tagBuilder = this.tagBuilder,
			    matches = [],
			    match;

			while( ( match = matcherRegex.exec( text ) ) !== null ) {
				var matchStr = match[ 0 ],
				    schemeUrlMatch = match[ 1 ],
				    wwwUrlMatch = match[ 2 ],
				    wwwProtocolRelativeMatch = match[ 3 ],
				    //tldUrlMatch = match[ 4 ],  -- not needed at the moment
				    tldProtocolRelativeMatch = match[ 5 ],
				    offset = match.index,
				    protocolRelativeMatch = wwwProtocolRelativeMatch || tldProtocolRelativeMatch,
					prevChar = text.charAt( offset - 1 );

				if( !Autolinker.matcher.UrlMatchValidator.isValid( matchStr, schemeUrlMatch ) ) {
					continue;
				}

				// If the match is preceded by an '@' character, then it is either
				// an email address or a username. Skip these types of matches.
				if( offset > 0 && prevChar === '@' ) {
					continue;
				}

				// If it's a protocol-relative '//' match, but the character before the '//'
				// was a word character (i.e. a letter/number), then we found the '//' in the
				// middle of another word (such as "asdf//asdf.com"). In this case, skip the
				// match.
				if( offset > 0 && protocolRelativeMatch && this.wordCharRegExp.test( prevChar ) ) {
					continue;
				}

				// Handle a closing parenthesis at the end of the match, and exclude
				// it if there is not a matching open parenthesis in the match
				// itself.
				if( this.matchHasUnbalancedClosingParen( matchStr ) ) {
					matchStr = matchStr.substr( 0, matchStr.length - 1 );  // remove the trailing ")"
				} else {
					// Handle an invalid character after the TLD
					var pos = this.matchHasInvalidCharAfterTld( matchStr, schemeUrlMatch );
					if( pos > -1 ) {
						matchStr = matchStr.substr( 0, pos ); // remove the trailing invalid chars
					}
				}

				var urlMatchType = schemeUrlMatch ? 'scheme' : ( wwwUrlMatch ? 'www' : 'tld' ),
				    protocolUrlMatch = !!schemeUrlMatch;

				matches.push( new Autolinker.match.Url( {
					tagBuilder            : tagBuilder,
					matchedText           : matchStr,
					offset                : offset,
					urlMatchType          : urlMatchType,
					url                   : matchStr,
					protocolUrlMatch      : protocolUrlMatch,
					protocolRelativeMatch : !!protocolRelativeMatch,
					stripPrefix           : stripPrefix
				} ) );
			}

			return matches;
		},


		/**
		 * Determines if a match found has an unmatched closing parenthesis. If so,
		 * this parenthesis will be removed from the match itself, and appended
		 * after the generated anchor tag.
		 *
		 * A match may have an extra closing parenthesis at the end of the match
		 * because the regular expression must include parenthesis for URLs such as
		 * "wikipedia.com/something_(disambiguation)", which should be auto-linked.
		 *
		 * However, an extra parenthesis *will* be included when the URL itself is
		 * wrapped in parenthesis, such as in the case of "(wikipedia.com/something_(disambiguation))".
		 * In this case, the last closing parenthesis should *not* be part of the
		 * URL itself, and this method will return `true`.
		 *
		 * @private
		 * @param {String} matchStr The full match string from the {@link #matcherRegex}.
		 * @return {Boolean} `true` if there is an unbalanced closing parenthesis at
		 *   the end of the `matchStr`, `false` otherwise.
		 */
		matchHasUnbalancedClosingParen : function( matchStr ) {
			var lastChar = matchStr.charAt( matchStr.length - 1 );

			if( lastChar === ')' ) {
				var openParensMatch = matchStr.match( this.openParensRe ),
				    closeParensMatch = matchStr.match( this.closeParensRe ),
				    numOpenParens = ( openParensMatch && openParensMatch.length ) || 0,
				    numCloseParens = ( closeParensMatch && closeParensMatch.length ) || 0;

				if( numOpenParens < numCloseParens ) {
					return true;
				}
			}

			return false;
		},


		/**
		 * Determine if there's an invalid character after the TLD in a URL. Valid
		 * characters after TLD are ':/?#'. Exclude scheme matched URLs from this
		 * check.
		 *
		 * @private
		 * @param {String} urlMatch The matched URL, if there was one. Will be an
		 *   empty string if the match is not a URL match.
		 * @param {String} schemeUrlMatch The match URL string for a scheme
		 *   match. Ex: 'http://yahoo.com'. This is used to match something like
		 *   'http://localhost', where we won't double check that the domain name
		 *   has at least one '.' in it.
		 * @return {Number} the position where the invalid character was found. If
		 *   no such character was found, returns -1
		 */
		matchHasInvalidCharAfterTld : function( urlMatch, schemeUrlMatch ) {
			if( !urlMatch ) {
				return -1;
			}

			var offset = 0;
			if ( schemeUrlMatch ) {
				offset = urlMatch.indexOf(':');
				urlMatch = urlMatch.slice(offset);
			}

			var re = /^((.?\/\/)?[A-Za-z0-9\u00C0-\u017F\.\-]*[A-Za-z0-9\u00C0-\u017F\-]\.[A-Za-z]+)/;
			var res = re.exec( urlMatch );
			if ( res === null ) {
				return -1;
			}

			offset += res[1].length;
			urlMatch = urlMatch.slice(res[1].length);
			if (/^[^.A-Za-z:\/?#]/.test(urlMatch)) {
				return offset;
			}

			return -1;
		}

	} );
	/*global Autolinker */
	/*jshint scripturl:true */
	/**
	 * @private
	 * @class Autolinker.matcher.UrlMatchValidator
	 * @singleton
	 *
	 * Used by Autolinker to filter out false URL positives from the
	 * {@link Autolinker.matcher.Url UrlMatcher}.
	 *
	 * Due to the limitations of regular expressions (including the missing feature
	 * of look-behinds in JS regular expressions), we cannot always determine the
	 * validity of a given match. This class applies a bit of additional logic to
	 * filter out any false positives that have been matched by the
	 * {@link Autolinker.matcher.Url UrlMatcher}.
	 */
	Autolinker.matcher.UrlMatchValidator = {

		/**
		 * Regex to test for a full protocol, with the two trailing slashes. Ex: 'http://'
		 *
		 * @private
		 * @property {RegExp} hasFullProtocolRegex
		 */
		hasFullProtocolRegex : /^[A-Za-z][-.+A-Za-z0-9]*:\/\//,

		/**
		 * Regex to find the URI scheme, such as 'mailto:'.
		 *
		 * This is used to filter out 'javascript:' and 'vbscript:' schemes.
		 *
		 * @private
		 * @property {RegExp} uriSchemeRegex
		 */
		uriSchemeRegex : /^[A-Za-z][-.+A-Za-z0-9]*:/,

		/**
		 * Regex to determine if at least one word char exists after the protocol (i.e. after the ':')
		 *
		 * @private
		 * @property {RegExp} hasWordCharAfterProtocolRegex
		 */
		hasWordCharAfterProtocolRegex : /:[^\s]*?[A-Za-z\u00C0-\u017F]/,


		/**
		 * Determines if a given URL match found by the {@link Autolinker.matcher.Url UrlMatcher}
		 * is valid. Will return `false` for:
		 *
		 * 1) URL matches which do not have at least have one period ('.') in the
		 *    domain name (effectively skipping over matches like "abc:def").
		 *    However, URL matches with a protocol will be allowed (ex: 'http://localhost')
		 * 2) URL matches which do not have at least one word character in the
		 *    domain name (effectively skipping over matches like "git:1.0").
		 * 3) A protocol-relative url match (a URL beginning with '//') whose
		 *    previous character is a word character (effectively skipping over
		 *    strings like "abc//google.com")
		 *
		 * Otherwise, returns `true`.
		 *
		 * @param {String} urlMatch The matched URL, if there was one. Will be an
		 *   empty string if the match is not a URL match.
		 * @param {String} protocolUrlMatch The match URL string for a protocol
		 *   match. Ex: 'http://yahoo.com'. This is used to match something like
		 *   'http://localhost', where we won't double check that the domain name
		 *   has at least one '.' in it.
		 * @return {Boolean} `true` if the match given is valid and should be
		 *   processed, or `false` if the match is invalid and/or should just not be
		 *   processed.
		 */
		isValid : function( urlMatch, protocolUrlMatch ) {
			if(
				( protocolUrlMatch && !this.isValidUriScheme( protocolUrlMatch ) ) ||
				this.urlMatchDoesNotHaveProtocolOrDot( urlMatch, protocolUrlMatch ) ||    // At least one period ('.') must exist in the URL match for us to consider it an actual URL, *unless* it was a full protocol match (like 'http://localhost')
				this.urlMatchDoesNotHaveAtLeastOneWordChar( urlMatch, protocolUrlMatch )  // At least one letter character must exist in the domain name after a protocol match. Ex: skip over something like "git:1.0"
			) {
				return false;
			}

			return true;
		},


		/**
		 * Determines if the URI scheme is a valid scheme to be autolinked. Returns
		 * `false` if the scheme is 'javascript:' or 'vbscript:'
		 *
		 * @private
		 * @param {String} uriSchemeMatch The match URL string for a full URI scheme
		 *   match. Ex: 'http://yahoo.com' or 'mailto:a@a.com'.
		 * @return {Boolean} `true` if the scheme is a valid one, `false` otherwise.
		 */
		isValidUriScheme : function( uriSchemeMatch ) {
			var uriScheme = uriSchemeMatch.match( this.uriSchemeRegex )[ 0 ].toLowerCase();

			return ( uriScheme !== 'javascript:' && uriScheme !== 'vbscript:' );
		},


		/**
		 * Determines if a URL match does not have either:
		 *
		 * a) a full protocol (i.e. 'http://'), or
		 * b) at least one dot ('.') in the domain name (for a non-full-protocol
		 *    match).
		 *
		 * Either situation is considered an invalid URL (ex: 'git:d' does not have
		 * either the '://' part, or at least one dot in the domain name. If the
		 * match was 'git:abc.com', we would consider this valid.)
		 *
		 * @private
		 * @param {String} urlMatch The matched URL, if there was one. Will be an
		 *   empty string if the match is not a URL match.
		 * @param {String} protocolUrlMatch The match URL string for a protocol
		 *   match. Ex: 'http://yahoo.com'. This is used to match something like
		 *   'http://localhost', where we won't double check that the domain name
		 *   has at least one '.' in it.
		 * @return {Boolean} `true` if the URL match does not have a full protocol,
		 *   or at least one dot ('.') in a non-full-protocol match.
		 */
		urlMatchDoesNotHaveProtocolOrDot : function( urlMatch, protocolUrlMatch ) {
			return ( !!urlMatch && ( !protocolUrlMatch || !this.hasFullProtocolRegex.test( protocolUrlMatch ) ) && urlMatch.indexOf( '.' ) === -1 );
		},


		/**
		 * Determines if a URL match does not have at least one word character after
		 * the protocol (i.e. in the domain name).
		 *
		 * At least one letter character must exist in the domain name after a
		 * protocol match. Ex: skip over something like "git:1.0"
		 *
		 * @private
		 * @param {String} urlMatch The matched URL, if there was one. Will be an
		 *   empty string if the match is not a URL match.
		 * @param {String} protocolUrlMatch The match URL string for a protocol
		 *   match. Ex: 'http://yahoo.com'. This is used to know whether or not we
		 *   have a protocol in the URL string, in order to check for a word
		 *   character after the protocol separator (':').
		 * @return {Boolean} `true` if the URL match does not have at least one word
		 *   character in it after the protocol, `false` otherwise.
		 */
		urlMatchDoesNotHaveAtLeastOneWordChar : function( urlMatch, protocolUrlMatch ) {
			if( urlMatch && protocolUrlMatch ) {
				return !this.hasWordCharAfterProtocolRegex.test( urlMatch );
			} else {
				return false;
			}
		}

	};
	/*global Autolinker */
	/**
	 * A truncation feature where the ellipsis will be placed at the end of the URL.
	 *
	 * @param {String} anchorText
	 * @param {Number} truncateLen The maximum length of the truncated output URL string.
	 * @param {String} ellipsisChars The characters to place within the url, e.g. "..".
	 * @return {String} The truncated URL.
	 */
	Autolinker.truncate.TruncateEnd = function(anchorText, truncateLen, ellipsisChars){
		return Autolinker.Util.ellipsis( anchorText, truncateLen, ellipsisChars );
	};

	/*global Autolinker */
	/**
	 * Date: 2015-10-05
	 * Author: Kasper Søfren <soefritz@gmail.com> (https://github.com/kafoso)
	 *
	 * A truncation feature, where the ellipsis will be placed in the dead-center of the URL.
	 *
	 * @param {String} url             A URL.
	 * @param {Number} truncateLen     The maximum length of the truncated output URL string.
	 * @param {String} ellipsisChars   The characters to place within the url, e.g. "..".
	 * @return {String} The truncated URL.
	 */
	Autolinker.truncate.TruncateMiddle = function(url, truncateLen, ellipsisChars){
	  if (url.length <= truncateLen) {
	    return url;
	  }
	  var availableLength = truncateLen - ellipsisChars.length;
	  var end = "";
	  if (availableLength > 0) {
	    end = url.substr((-1)*Math.floor(availableLength/2));
	  }
	  return (url.substr(0, Math.ceil(availableLength/2)) + ellipsisChars + end).substr(0, truncateLen);
	};

	/*global Autolinker */
	/**
	 * Date: 2015-10-05
	 * Author: Kasper Søfren <soefritz@gmail.com> (https://github.com/kafoso)
	 *
	 * A truncation feature, where the ellipsis will be placed at a section within
	 * the URL making it still somewhat human readable.
	 *
	 * @param {String} url						 A URL.
	 * @param {Number} truncateLen		 The maximum length of the truncated output URL string.
	 * @param {String} ellipsisChars	 The characters to place within the url, e.g. "..".
	 * @return {String} The truncated URL.
	 */
	Autolinker.truncate.TruncateSmart = function(url, truncateLen, ellipsisChars){
		var parse_url = function(url){ // Functionality inspired by PHP function of same name
			var urlObj = {};
			var urlSub = url;
			var match = urlSub.match(/^([a-z]+):\/\//i);
			if (match) {
				urlObj.scheme = match[1];
				urlSub = urlSub.substr(match[0].length);
			}
			match = urlSub.match(/^(.*?)(?=(\?|#|\/|$))/i);
			if (match) {
				urlObj.host = match[1];
				urlSub = urlSub.substr(match[0].length);
			}
			match = urlSub.match(/^\/(.*?)(?=(\?|#|$))/i);
			if (match) {
				urlObj.path = match[1];
				urlSub = urlSub.substr(match[0].length);
			}
			match = urlSub.match(/^\?(.*?)(?=(#|$))/i);
			if (match) {
				urlObj.query = match[1];
				urlSub = urlSub.substr(match[0].length);
			}
			match = urlSub.match(/^#(.*?)$/i);
			if (match) {
				urlObj.fragment = match[1];
				//urlSub = urlSub.substr(match[0].length);  -- not used. Uncomment if adding another block.
			}
			return urlObj;
		};

		var buildUrl = function(urlObj){
			var url = "";
			if (urlObj.scheme && urlObj.host) {
				url += urlObj.scheme + "://";
			}
			if (urlObj.host) {
				url += urlObj.host;
			}
			if (urlObj.path) {
				url += "/" + urlObj.path;
			}
			if (urlObj.query) {
				url += "?" + urlObj.query;
			}
			if (urlObj.fragment) {
				url += "#" + urlObj.fragment;
			}
			return url;
		};

		var buildSegment = function(segment, remainingAvailableLength){
			var remainingAvailableLengthHalf = remainingAvailableLength/ 2,
					startOffset = Math.ceil(remainingAvailableLengthHalf),
					endOffset = (-1)*Math.floor(remainingAvailableLengthHalf),
					end = "";
			if (endOffset < 0) {
				end = segment.substr(endOffset);
			}
			return segment.substr(0, startOffset) + ellipsisChars + end;
		};
		if (url.length <= truncateLen) {
			return url;
		}
		var availableLength = truncateLen - ellipsisChars.length;
		var urlObj = parse_url(url);
		// Clean up the URL
		if (urlObj.query) {
			var matchQuery = urlObj.query.match(/^(.*?)(?=(\?|\#))(.*?)$/i);
			if (matchQuery) {
				// Malformed URL; two or more "?". Removed any content behind the 2nd.
				urlObj.query = urlObj.query.substr(0, matchQuery[1].length);
				url = buildUrl(urlObj);
			}
		}
		if (url.length <= truncateLen) {
			return url;
		}
		if (urlObj.host) {
			urlObj.host = urlObj.host.replace(/^www\./, "");
			url = buildUrl(urlObj);
		}
		if (url.length <= truncateLen) {
			return url;
		}
		// Process and build the URL
		var str = "";
		if (urlObj.host) {
			str += urlObj.host;
		}
		if (str.length >= availableLength) {
			if (urlObj.host.length == truncateLen) {
				return (urlObj.host.substr(0, (truncateLen - ellipsisChars.length)) + ellipsisChars).substr(0, truncateLen);
			}
			return buildSegment(str, availableLength).substr(0, truncateLen);
		}
		var pathAndQuery = "";
		if (urlObj.path) {
			pathAndQuery += "/" + urlObj.path;
		}
		if (urlObj.query) {
			pathAndQuery += "?" + urlObj.query;
		}
		if (pathAndQuery) {
			if ((str+pathAndQuery).length >= availableLength) {
				if ((str+pathAndQuery).length == truncateLen) {
					return (str + pathAndQuery).substr(0, truncateLen);
				}
				var remainingAvailableLength = availableLength - str.length;
				return (str + buildSegment(pathAndQuery, remainingAvailableLength)).substr(0, truncateLen);
			} else {
				str += pathAndQuery;
			}
		}
		if (urlObj.fragment) {
			var fragment = "#"+urlObj.fragment;
			if ((str+fragment).length >= availableLength) {
				if ((str+fragment).length == truncateLen) {
					return (str + fragment).substr(0, truncateLen);
				}
				var remainingAvailableLength2 = availableLength - str.length;
				return (str + buildSegment(fragment, remainingAvailableLength2)).substr(0, truncateLen);
			} else {
				str += fragment;
			}
		}
		if (urlObj.scheme && urlObj.host) {
			var scheme = urlObj.scheme + "://";
			if ((str+scheme).length < availableLength) {
				return (scheme + str).substr(0, truncateLen);
			}
		}
		if (str.length <= truncateLen) {
			return str;
		}
		var end = "";
		if (availableLength > 0) {
			end = str.substr((-1)*Math.floor(availableLength/2));
		}
		return (str.substr(0, Math.ceil(availableLength/2)) + ellipsisChars + end).substr(0, truncateLen);
	};

	return Autolinker;
	}));


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./app.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./app.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports


	// module
	exports.push([module.id, "body {\n  font-size: 100%;\n  line-height: 100%;\n  font-family: monospace;\n  background: #fdf6e3;\n  color: #657b83;\n  padding: 0 20px;\n  -webkit-text-size-adjust: none; }\n\ndiv, ul, li {\n  box-sizing: border-box; }\n\na {\n  color: inherit; }\n\nh1.page-title {\n  background-color: #4f6c73;\n  color: white;\n  margin: 0;\n  padding: 25px 20px;\n  border: 0;\n  outline: none;\n  display: block;\n  width: 100%;\n  box-sizing: border-box;\n  font-family: monospace;\n  font-size: 20pt; }\n\n#container {\n  display: block;\n  overflow-x: auto;\n  padding: 0.5em;\n  background: #fdf6e3;\n  color: #2aa198;\n  font-size: 12pt; }\n\ncode {\n  background: none;\n  text-align: left;\n  white-space: pre;\n  word-spacing: normal;\n  word-break: normal;\n  word-wrap: normal;\n  line-height: 1.5;\n  -moz-tab-size: 4;\n  -o-tab-size: 4;\n  tab-size: 4;\n  -webkit-hyphens: none;\n  -moz-hyphens: none;\n  -ms-hyphens: none;\n  hyphens: none; }\n\n.token.comment {\n  color: #839496; }\n\n.token.string {\n  color: #b58900; }\n\n.token.symbol {\n  color: #dc322f; }\n\n.token.constant {\n  color: #268bd2; }\n\n.token.function {\n  color: #d33682; }\n\n.token.variable {\n  color: #d33682; }\n", ""]);

	// exports


/***/ },
/* 9 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);