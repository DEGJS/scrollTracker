# ScrollTracker
ScrollTracker tracks one or more DOM elements in relation to the viewport as the user scrolls within a web page. Events are fired when these elements enter and exit the viewport (and, optionally, whenever a scroll event occurs). You can subscribe to these events in order to perform actions based on an element's position relative to the viewport.

## Install
ScrollTracker is an ES6 module. Consequently, you'll need an ES6 transpiler ([Babel](https://babeljs.io) is a nice one) and a module loader ([SystemJS](https://github.com/systemjs/systemjs) will do the job) as part of your Javascript workflow.

If you're already using the [JSPM package manager](http://jspm.io) for your project, you can install ScrollTracker with the following command:

```
$ jspm install github:DEGJS/scrollTracker
```

## Usage
Import and create an instance of ScrollTracker, track an element, and perform an action when the element is scrolled into the viewport.
```js
import scrollTracker from "DEGJS/scrollTracker";
import eventAggregator from "DEGJS/eventAggregator";

//subscribe to scrollTracker's elementInViewportChange event
eventAggregator.subscribe('scrollTracker.elementInViewportChange', 
	onElementInViewportChange);

//our instance of scrollTracker
let scrollTrackerInst = scrollTracker();

//the element we will track
let elToTrack = document.querySelector('#element-to-track');

//track the element
scrollTrackerInst.trackElement(elToTrack);

//our elementInViewportChange event handler
function onElementInViewportChange(e) {
	//do something based on whether the element is currently within the viewport
	console.log(e.isInViewport);
}
```


## Parameters

### options
Type: `Object`   
Options for the ScrollTracker instance. Includes the following properties:

#### options.debounceWait
Type: `Number`
Default: `10`
The minimum number of milliseconds between invocations of ScrollTracker's scroll event handler. Scroll events are debounced for performance reasons.

## Methods

### .trackElement(element, elOptions)
Tracks an element. ScrollTracker will publish events for this element.

#### element 
Type: `Element`  
The element to track.

#### elOptions   
Type: `Object`
Options for tracking an element.

##### elOptions.publishScrollEvents
Type: `String`
Default: `never`
Specifies when ScrollTracker should publish scroll events for a tracked element. Possible values include:
+ `never`: scroll events will never be published for the tracked element
+ `inViewportOnly`: scroll events will only be published when the tracked element is within the viewport
+ `always`: scroll events will be published for the tracked element always

For performance reasons, the default value is `never`

##### elOptions.offset
Type: `Object`  
Default: `null` 
Offset options for modifying the top and bottom viewport thresholds. The offset object can have the following properties:

###### elOptions.offset.top
Type: `Number` or `String`
The amount to offset the top of the tracked element from the bottom of the viewport when scrollTracker determines whether the element is within the viewport. `Number` values will be interpreted as pixels. `String` values can be interpreted as either a percentage of the element's height (i.e., `"50%"`) or as a percentage of the viewport's height (i.e., `"50vh"`).

###### elOptions.offset.bottom
Type: `Number` or `String`
The amount to offset the bottom of the tracked element from the top of the viewport when scrollTracker determines whether the element is within the viewport. `Number` values will be interpreted as pixels. `String` values can be interpreted as either a percentage of the element's height (i.e., `"50%"`) or as a percentage of the viewport's height (i.e., `"50vh"`).

### .untrackElement(element)
Untracks an element. ScrollTracker will cease to publish events for the element.

#### element
Type: `Element`
The element to untrack.

### .destroy()
Destroys the instance of ScrollTracker. All tracked elements will be untracked.

## Events

### elementInViewportChange
The event that is published when a tracked element enters or leaves the viewport

### elementScroll
The event that is published when a tracked element 

### Event Object
Each published event is accompanied by an event object with the following properties:

#### eventObject.element
Type: `Element`
The tracked element

#### eventObject.rect
Type: `Object`
An object describing the size and position of the tracked element relative to the viewport. This is the same object returned from [Element.getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect).

#### eventObject.isInViewport
Type: `Boolean`
Whether or not the tracked element is within the viewport.

## Browser Support

ScrollTracker depends on the following browser APIs:
+ [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

To support legacy browsers, you'll need to include polyfills for the above APIs.
