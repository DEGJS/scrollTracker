import scrollTracker from "DEGJS/scrollTracker";
import eventAggregator from "DEGJS/eventAggregator";

let demo = function() {

	let examples, 
		scrollTrackerInst;

	function init() {
		examples = createExamples();

		scrollTrackerInst = scrollTracker();

		eventAggregator.subscribe('scrollTracker.elementScroll', onElementScroll);
		eventAggregator.subscribe('scrollTracker.elementInViewportChange', onElementInViewportChange);

		
		examples.forEach(runExample);
	}

	function createExamples() {
		return [
			{
				element: document.querySelector('#example1-tracked-el'),
				options: {},
				onElementInViewportChange: updateBodyBackground
			},
			{
				element: document.querySelector('#example2-tracked-el'),
				options: {
					offset: {
						top: "50%",
						bottom: "50%"
					}
				},
				onElementInViewportChange: updateBodyBackground
			},
			{
				element: document.querySelector('#example3-tracked-el'),
				options: {
					publishScrollEvents: "inViewportOnly"
				},
				onElementScroll: updateElementOpacity
			}
		];
	}

	function onElementScroll(e) {
		let example = getExample(e.element);
		if(example.onElementScroll)
			example.onElementScroll(e);
	}

	function onElementInViewportChange(e) {
		let example = getExample(e.element);
		if(example.onElementInViewportChange)
			example.onElementInViewportChange(e);
	}

	function getExample(el) {
		let exampleIndex = el.getAttribute('data-example-index');
		return examples[exampleIndex - 1];
	}

	function updateElementOpacity(e) {
		let ratio = e.rect.top / document.documentElement.clientHeight;
		let opacity = ratio > .5 ? 1 - ratio : ratio * 2;
		e.element.style.opacity = opacity;
	}

	function updateBodyBackground(e) {
		if(e.isInViewport) {
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

export default demo();