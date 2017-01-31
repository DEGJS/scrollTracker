function getOffsetNumber(offset) {
	return parseInt(offset.replace(/\D/g,''));
}

function getOffsetUnits(offset) {
	return offset.replace(/\d/g,'');
}

function calculatePercentageOffset(elRect, offset) {
	let percentage = offset/100;
	return elRect.height * percentage;
}

function calculateViewportHeightOffset(offset) {
	let percentage = offset/100;				
	return document.documentElement.clientHeight*percentage;
}

function calculateOffset(elRect, offset) {
	if(typeof offset == 'number') {
		return offset;
	}
	
	if(typeof offset == 'string') {
		let offsetNumber = getOffsetNumber(offset);
		let offsetUnits = getOffsetUnits(offset);

		switch(offsetUnits) {
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

export { calculateOffset };