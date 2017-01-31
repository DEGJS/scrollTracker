!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["1"], [], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("2", [], function (_export) {
	/* */
	"use strict";

	var debounce;
	return {
		setters: [],
		execute: function () {
			debounce = function debounce(func, wait, immediate) {
				var timeout;
				return function () {
					var context = this,
					    args = arguments;
					var later = function later() {
						timeout = null;
						if (!immediate) func.apply(context, args);
					};
					var callNow = immediate && !timeout;
					clearTimeout(timeout);
					timeout = setTimeout(later, wait);
					if (callNow) func.apply(context, args);
				};
			};

			_export("default", debounce);
		}
	};
});

$__System.register('3', [], function (_export) {
	/* */
	'use strict';

	function getOffsetNumber(offset) {
		return parseInt(offset.replace(/\D/g, ''));
	}

	function getOffsetUnits(offset) {
		return offset.replace(/\d/g, '');
	}

	function calculatePercentageOffset(elRect, offset) {
		var percentage = offset / 100;
		return elRect.height * percentage;
	}

	function calculateViewportHeightOffset(offset) {
		var percentage = offset / 100;
		return document.documentElement.clientHeight * percentage;
	}

	function calculateOffset(elRect, offset) {
		if (typeof offset == 'number') {
			return offset;
		}

		if (typeof offset == 'string') {
			var offsetNumber = getOffsetNumber(offset);
			var offsetUnits = getOffsetUnits(offset);

			switch (offsetUnits) {
				case "%":
					return calculatePercentageOffset(elRect, offsetNumber);
				case "vh":
					return calculateViewportHeightOffset(offsetNumber);
				default:
					return offsetNumber;
			}
		}

		return 0;
	}

	return {
		setters: [],
		execute: function () {
			_export('calculateOffset', calculateOffset);
		}
	};
});

$__System.register('4', ['5'], function (_export) {
	/* */
	'use strict';

	var eventAggregator, eventNamespace, elementScrollEventName, elementInViewportChangeEventName;

	function createEventPayload(elInfo, elRect) {
		return {
			element: elInfo.el,
			rect: elRect,
			isInViewport: elInfo.isInViewport
		};
	}

	function publishEvent(eventName, payload) {
		var namespacedEventName = eventNamespace + '.' + eventName;
		var event = Object.assign({
			type: namespacedEventName
		}, payload);

		eventAggregator.publish(event);
	}

	function publishElementScrollEvent(elInfo, elRect) {
		publishEvent(elementScrollEventName, createEventPayload(elInfo, elRect));
	}

	function publishElementInViewportChangeEvent(elInfo, elRect) {
		publishEvent(elementInViewportChangeEventName, createEventPayload(elInfo, elRect));
	}

	return {
		setters: [function (_) {
			eventAggregator = _['default'];
		}],
		execute: function () {
			eventNamespace = 'scrollTracker';
			elementScrollEventName = 'elementScroll';
			elementInViewportChangeEventName = 'elementInViewportChange';

			_export('publishElementScrollEvent', publishElementScrollEvent);

			_export('publishElementInViewportChangeEvent', publishElementInViewportChangeEvent);
		}
	};
});

$__System.register("6", ["2", "3", "4"], function (_export) {
	/* */
	"use strict";

	var debounce, calculateOffset, publishElementScrollEvent, publishElementInViewportChangeEvent, scrollTracker;
	return {
		setters: [function (_) {
			debounce = _["default"];
		}, function (_2) {
			calculateOffset = _2.calculateOffset;
		}, function (_3) {
			publishElementScrollEvent = _3.publishElementScrollEvent;
			publishElementInViewportChangeEvent = _3.publishElementInViewportChangeEvent;
		}],
		execute: function () {
			scrollTracker = function scrollTracker(options) {

				var publishScrollEventsOptions = {
					never: 'never',
					inViewportOnly: 'inViewportOnly',
					always: 'always'

				};

				var isInited = false,
				    debouncedScrollHandler = undefined,
				    trackedEls = [],
				    settings = undefined,
				    defaultOptions = {
					debounceWait: 10
				},
				    defaultElOptions = {
					publishScrollEvents: publishScrollEventsOptions.never,
					offset: null
				};

				function init() {
					if (isInited) {
						return;
					}

					isInited = true;
					settings = Object.assign({}, defaultOptions, options);
					bindScrollEvent();
				}

				function bindScrollEvent() {
					debouncedScrollHandler = debounce(handleScroll, settings.debounceWait);
					window.addEventListener('scroll', debouncedScrollHandler);
				}

				function unbindScrollEvent() {
					window.removeEventListener('scroll', debouncedScrollHandler);
				}

				function handleScroll() {
					trackedEls.forEach(handleScrollForEl);
				}

				function handleScrollForEl(elInfo) {
					var elRect = elInfo.el.getBoundingClientRect();

					var oldIsInViewport = elInfo.isInViewport;

					elInfo.isInViewport = isElementInViewport(elRect, elInfo.offset);

					if (oldIsInViewport != elInfo.isInViewport) {
						publishElementInViewportChangeEvent(elInfo, elRect);
					}

					if (shouldPublishScrollEvent(elInfo)) {
						publishElementScrollEvent(elInfo, elRect);
					}
				}

				function isElementInViewport(elRect, offset) {
					var topThreshold = window.innerHeight || document.documentElement.clientHeight;
					var bottomThreshold = 0;

					if (offset) {
						if (offset.top) {
							topThreshold -= calculateOffset(elRect, offset.top);
						}
						if (offset.bottom) {
							bottomThreshold += calculateOffset(elRect, offset.bottom);
						}
					}

					return elRect.top < topThreshold && elRect.bottom > bottomThreshold;
				}

				function shouldPublishScrollEvent(elInfo) {
					return elInfo.publishScrollEvents == publishScrollEventsOptions.always || elInfo.publishScrollEvents == publishScrollEventsOptions.inViewportOnly && elInfo.isInViewport;
				}

				function trackElement(el) {
					var elOptions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

					var mergedElOptions = Object.assign({}, defaultElOptions, elOptions);

					trackedEls.push({
						el: el,
						isInViewport: false,
						offset: mergedElOptions.offset,
						publishScrollEvents: mergedElOptions.publishScrollEvents
					});

					handleScrollForEl(trackedEls[trackedEls.length - 1]);

					init();
				}

				function untrackElement(el) {
					for (var i = 0; i < trackedEls.length; i++) {
						if (trackedEls[i].el === el) {
							trackedEls.splice(i, 1);
							break;
						}
					}

					if (trackedEls.length == 0) {
						unbindScrollEvent();
					}
				}

				function destroy() {
					isInited = false;
					trackedEls = [];
					debouncedScrollHandler = null;
					settings = null;
					unbindScrollEvent();
				}

				return {
					trackElement: trackElement,
					untrackElement: untrackElement,
					destroy: destroy
				};
			};

			_export("default", scrollTracker);
		}
	};
});

$__System.register("7", ["6"], function (_export) {
  "use strict";

  return {
    setters: [function (_) {
      for (var _key in _) {
        if (_key !== "default") _export(_key, _[_key]);
      }

      _export("default", _["default"]);
    }],
    execute: function () {}
  };
});

$__System.register("8", [], function (_export) {
  /* */
  "use strict";

  var eventAggregator, instance;
  return {
    setters: [],
    execute: function () {
      eventAggregator = function eventAggregator() {
        var listeners = {};

        function subscribe(eventType, listener) {
          if (typeof listeners[eventType] == "undefined") {
            listeners[eventType] = [];
          }

          listeners[eventType].push(listener);
        }

        function unsubscribe(eventType, listener) {
          if (listeners[eventType] instanceof Array) {
            var index = listeners[eventType].indexOf(listener);
            if (index >= 0) listeners[eventType].splice(index, 1);
          }
        }

        function publish(evt) {
          var _this = this;

          if (typeof evt == "string") {
            evt = { type: evt };
          }
          if (!evt.target) {
            evt.target = this;
          }

          if (!evt.type) {
            //falsy
            throw new Error("Event object missing 'type' property.");
          }

          if (listeners[evt.type] instanceof Array) {
            listeners[evt.type].forEach(function (listener) {
              listener.call(_this, evt);
            });
          }
        }

        return {
          subscribe: subscribe,
          unsubscribe: unsubscribe,
          publish: publish
        };
      };

      instance = eventAggregator();

      _export("default", instance);
    }
  };
});

$__System.register("5", ["8"], function (_export) {
  "use strict";

  return {
    setters: [function (_) {
      for (var _key in _) {
        if (_key !== "default") _export(_key, _[_key]);
      }

      _export("default", _["default"]);
    }],
    execute: function () {}
  };
});

$__System.register("1", ["5", "7"], function (_export) {
	"use strict";

	var eventAggregator, scrollTracker, demo;
	return {
		setters: [function (_2) {
			eventAggregator = _2["default"];
		}, function (_) {
			scrollTracker = _["default"];
		}],
		execute: function () {
			demo = function demo() {

				var examples = undefined,
				    scrollTrackerInst = undefined;

				function init() {
					examples = createExamples();

					scrollTrackerInst = scrollTracker();

					eventAggregator.subscribe('scrollTracker.elementScroll', onElementScroll);
					eventAggregator.subscribe('scrollTracker.elementInViewportChange', onElementInViewportChange);

					examples.forEach(runExample);
				}

				function createExamples() {
					return [{
						element: document.querySelector('#example1-tracked-el'),
						options: {},
						onElementInViewportChange: updateBodyBackground
					}, {
						element: document.querySelector('#example2-tracked-el'),
						options: {
							offset: {
								top: "50%",
								bottom: "50%"
							}
						},
						onElementInViewportChange: updateBodyBackground
					}, {
						element: document.querySelector('#example3-tracked-el'),
						options: {
							publishScrollEvents: "inViewportOnly"
						},
						onElementScroll: updateElementOpacity
					}];
				}

				function onElementScroll(e) {
					var example = getExample(e.element);
					if (example.onElementScroll) example.onElementScroll(e);
				}

				function onElementInViewportChange(e) {
					var example = getExample(e.element);
					if (example.onElementInViewportChange) example.onElementInViewportChange(e);
				}

				function getExample(el) {
					var exampleIndex = el.getAttribute('data-example-index');
					return examples[exampleIndex - 1];
				}

				function updateElementOpacity(e) {
					var ratio = e.rect.top / document.documentElement.clientHeight;
					var opacity = ratio > .5 ? 1 - ratio : ratio * 2;
					e.element.style.opacity = opacity;
				}

				function updateBodyBackground(e) {
					if (e.isInViewport) {
						document.body.classList.add('blue');
					} else {
						document.body.classList.remove('blue');
					}
				}

				function runExample(example) {
					scrollTrackerInst.trackElement(example.element, example.options);
				}

				init();
			};

			_export("default", demo());
		}
	};
});

})
(function(factory) {
  factory();
});