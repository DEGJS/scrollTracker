import debounce from "./utils/debounce";
import { calculateOffset } from "./offsetCalculator";
import { publishElementScrollEvent, publishElementInViewportChangeEvent } from "./eventPublisher";

let scrollTracker = function(options) {

	const publishScrollEventsOptions = {
		never: 'never',
		inViewportOnly: 'inViewportOnly',
		always: 'always' 

	};

	let isInited = false,
		debouncedScrollHandler,
		trackedEls = [],
		settings, 
		defaultOptions = {
			debounceWait: 10
		},
		defaultElOptions = {
			publishScrollEvents: publishScrollEventsOptions.never,
			offset: null
		};

	function init() {
		if(isInited) {
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

		let oldIsInViewport = elInfo.isInViewport;

		elInfo.isInViewport = isElementInViewport(elRect, elInfo.offset);

		if(oldIsInViewport != elInfo.isInViewport) {
			publishElementInViewportChangeEvent(elInfo, elRect);
		}

		if(shouldPublishScrollEvent(elInfo)) {
			publishElementScrollEvent(elInfo, elRect);
		}
	}

	function isElementInViewport (elRect, offset) {
	    let topThreshold = (window.innerHeight || document.documentElement.clientHeight);
	    let bottomThreshold = 0;
	   
	   	if(offset) {
	   		if(offset.top) {
	   			topThreshold -= calculateOffset(elRect, offset.top);
	   		}
	   		if(offset.bottom) {
	   			bottomThreshold += calculateOffset(elRect, offset.bottom);
	   		}
	   	}

	    return (
	    	elRect.top < topThreshold &&
	    	elRect.bottom > bottomThreshold
	    );
	}

	function shouldPublishScrollEvent(elInfo) {
		return (
			elInfo.publishScrollEvents == publishScrollEventsOptions.always || 
			(
				elInfo.publishScrollEvents == publishScrollEventsOptions.inViewportOnly && 
				elInfo.isInViewport
			)
		);
	}

	function trackElement(el, elOptions = {}) {
		let mergedElOptions = Object.assign({}, defaultElOptions, elOptions);

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
		for(var i = 0; i < trackedEls.length; i++) {
			if(trackedEls[i].el === el) {
				trackedEls.splice(i, 1);
				break;
			}
		}

		if(trackedEls.length == 0) {
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
}

export default scrollTracker;