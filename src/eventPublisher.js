import eventAggregator from "DEGJS/eventAggregator";

const eventNamespace = 'scrollTracker',
		elementScrollEventName = 'elementScroll',
		elementInViewportChangeEventName = 'elementInViewportChange';

function createEventPayload(elInfo, elRect) {
	return {
		element: elInfo.el,
		rect: elRect,
		isInViewport: elInfo.isInViewport
	};
}

function publishEvent(eventName, payload) {
	let namespacedEventName = eventNamespace + '.' + eventName;
	let event = Object.assign({
		type: namespacedEventName
	}, payload);

	eventAggregator.publish(event);
}

function publishElementScrollEvent(elInfo, elRect) {
	publishEvent(
		elementScrollEventName,
		createEventPayload(elInfo, elRect)
	);
}

function publishElementInViewportChangeEvent(elInfo, elRect) {
	publishEvent(
		elementInViewportChangeEventName, 
		createEventPayload(elInfo, elRect)
	);
}

export { publishElementScrollEvent, publishElementInViewportChangeEvent };