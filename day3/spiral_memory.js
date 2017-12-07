const util = require('util');

function createSpiralMemory(numOfMemoryLocations) {
	const firstNode = {
		value: 1,
		right: null,
		up: null,
		left: null,
		down: null
	};
	let inputLocation = numOfMemoryLocations;
	let currentLocation = 1;
	let baseDecrement = 1;
	let decrement = 1;
	let increments = 0;
	let currentNode = {};
	let prevNode = firstNode;
	const direction = {
		right: true,
		up: false,
		down: false,
		left: false
	};
	//build base spiral without multiple connections
	while (currentLocation !== inputLocation) {
		++currentLocation;
		if (direction.right) {
			currentNode = {
				value: currentLocation,
				right: null,
				up: null,
				left: prevNode,
				down: null
			};
			prevNode.right = currentNode;
		}
		else if (direction.up) {
			currentNode = {
				value: currentLocation,
				right: null,
				up: null,
				left: null,
				down: prevNode
			};
			prevNode.up = currentNode;
		}
		else if (direction.left) {
			currentNode = {
				value: currentLocation,
				right: prevNode,
				up: null,
				left: null,
				down: null
			};
			prevNode.left = currentNode;
		}
		else if (direction.down) {
			currentNode = {
				value: currentLocation,
				right: null,
				up: prevNode,
				left: null,
				down: null
			};
			prevNode.down = currentNode;
		}
		prevNode = currentNode;
		--decrement;
		if (decrement === 0) {
			if 		(direction.right) 	{ direction.right =  false;  direction.up    = true; 	}
			else if (direction.up) 		{ direction.up 	  =  false;  direction.left  = true; 	}
			else if (direction.left) 	{ direction.left  =  false;  direction.down  = true; 	}
			else if (direction.down) 	{ direction.down  =  false;  direction.right = true; 	}
			decrement = baseDecrement;
			++increments;
			if (increments === 2) {
				++baseDecrement;
				increments = 0;
				decrement = baseDecrement;
			}
		}
	}
	
	prevNode = firstNode;
	currentLocation = 1;
	let searchLimit = 3;
	let searchCount = 0;
	let steps = [];
	//map the memory connections
	while (currentLocation <= inputLocation) {
		//find the first possible connection for current node
		if (prevNode.right !== null) {
			if (prevNode.right.up !== null) {
				if (prevNode.right.up.left !== null) {
					prevNode.up = prevNode.right.up.left !== (null || prevNode.value) ? prevNode.right.up.left : null;
				}
			}
			if (prevNode.right.down !== null) {
				if (prevNode.right.down.left !== null) {
					prevNode.down = prevNode.right.down.left !== (null || prevNode.value) ? prevNode.right.down.left : null;
				}
			}

		}
		if (prevNode.up !== null) {
			if (prevNode.up.left !== null) {
				if (prevNode.up.left.down !== null) {
					prevNode.left = prevNode.up.left.down !== (null || prevNode.value) ? prevNode.up.left.down : null;
				}
			}
			if (prevNode.up.right !== null) {
				if (prevNode.up.right.down !== null) {
					prevNode.right = prevNode.up.right.down !== (null || prevNode.value) ? prevNode.up.right.down : null;
				}
			}
		}
		if (prevNode.left !== null) {
			if (prevNode.left.up !== null) {
				if (prevNode.left.up.right !== null) {
					prevNode.up = prevNode.left.up.right !== (null || prevNode.value) ? prevNode.left.up.right : null;
				}
			}
			if (prevNode.left.down !== null) {
				if (prevNode.left.down.right !== null) {
					prevNode.down = prevNode.left.down.right !== (null || prevNode.value) ? prevNode.left.down.right : null;
				}
			}	
		}
		if (prevNode.down !== null) {
			if (prevNode.down.right !== null) {
				if (prevNode.down.right.up !== null) {
					prevNode.right = prevNode.down.right.up !== (null || prevNode.value) ? prevNode.down.right.up : null;
				}
			}
			if (prevNode.down.left !== null) {
				if (prevNode.down.left.up !== null) {
					prevNode.left = prevNode.down.left.up !== (null || prevNode.value) ? prevNode.down.left.up : null;
				}
			}
		}
		//increment location and take the next node which isnt null
		++currentLocation;
		if (prevNode.right !== null && prevNode.right.value === currentLocation) {
			prevNode = prevNode.right;
		}
		else if (prevNode.up !== null && prevNode.up.value === currentLocation) {
			prevNode = prevNode.up;
		}
		else if (prevNode.left !== null && prevNode.left.value === currentLocation) {
			prevNode = prevNode.left;
		}
		else if (prevNode.down !== null && prevNode.down.value === currentLocation) {
			prevNode = prevNode.down;
		}
	}
	
	return { 
		baseNode: firstNode,
		lastNode: currentNode 
	};
}

function findSmallestRoute(baseSpiralNode) {
	let found = false;
	let stepCounter = 0;
	currentNode = baseSpiralNode;
	let newNode;
	min = baseSpiralNode.value;;
	while (!found) {
		if (currentNode.right !== null && currentNode.right.value < min) {
			min = currentNode.right.value;
			newNode = currentNode.right;
		}
		if (currentNode.left !== null && currentNode.left.value < min) {
			min = currentNode.left.value;
			newNode = currentNode.left;
		}
		if (currentNode.up !== null && currentNode.up.value < min) {
			min = currentNode.up.value;
			newNode = currentNode.up;
		}
		if (currentNode.down !== null && currentNode.down.value < min) {
			min = currentNode.down.value;
			newNode = currentNode.down;
		}
		currentNode = newNode;
		++stepCounter;
		if (currentNode.value === 1)
			found = true;
	}
	return stepCounter;
}
let locations = 361527;
let spiralMemoryNodes = createSpiralMemory(locations);
console.log('stepCount: ', findSmallestRoute(spiralMemoryNodes.lastNode));