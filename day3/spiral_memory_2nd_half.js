const spiral = require('./spiral_memory_1st_half');

let input = 361527;
spiralNodes = spiral.createSpiralMemory(input);
//baseNode
function findValueLargerThanInput(firstNode, input) {
	let currentLocation = 1;
	let currentNode = firstNode;
	let found = false;
	currentNode.newValue = currentNode.value;
	while (currentLocation <= input && !found) {
		if (currentNode.right !== null && currentNode.right.value === (currentLocation + 1)) {
			let newValue = 0;
			newValue += currentNode.newValue;
			if (currentNode.up !== null && currentNode.up.value <= currentLocation) {
				newValue += currentNode.up.newValue;
				if (currentNode.up.right !== null && currentNode.up.right.value <= currentLocation) {
					newValue += currentNode.up.right.newValue;
					if (currentNode.up.right.right !== null && currentNode.up.right.right.value <= currentLocation) {
						newValue += currentNode.up.right.right.newValue;
					}
				}
			}
			currentNode = currentNode.right;
			currentNode.newValue = newValue;
		}
		else if (currentNode.up !== null && currentNode.up.value === (currentLocation + 1)) {
			let newValue = 0;
			newValue += currentNode.newValue;
			if (currentNode.left !== null && currentNode.left.value <= currentLocation) {
				newValue += currentNode.left.newValue;
				if (currentNode.left.up !== null && currentNode.left.up.value <= currentLocation) {
					newValue += currentNode.left.up.newValue;
					if (currentNode.left.up.up !== null && currentNode.left.up.up.value <= currentLocation) {
						newValue += currentNode.left.up.up.newValue;
					}
				}
			}
			currentNode = currentNode.up;
			currentNode.newValue = newValue;
		}
		else if (currentNode.left !== null && currentNode.left.value === (currentLocation + 1)) {
			let newValue = 0;
			newValue += currentNode.newValue;
			if (currentNode.down !== null && currentNode.down.value <= currentLocation) {
				newValue += currentNode.down.newValue;
				if (currentNode.down.left !== null && currentNode.down.left.value <= currentLocation) {
					newValue += currentNode.down.left.newValue;
					if (currentNode.down.left.left !== null && currentNode.down.left.left.value <= currentLocation) {
						newValue += currentNode.down.left.left.newValue;
					}
				}
			}
			currentNode = currentNode.left;
			currentNode.newValue = newValue;
		}
		else if (currentNode.down !== null && currentNode.down.value === (currentLocation + 1)) {
			let newValue = 0;
			newValue += currentNode.newValue;
			if (currentNode.right !== null && currentNode.right.value <= currentLocation) {
				newValue += currentNode.right.newValue;
				if (currentNode.right.down !== null && currentNode.right.down.value <= currentLocation) {
					newValue += currentNode.right.down.newValue;
					if (currentNode.right.down.down !== null && currentNode.right.down.down.value <= currentLocation) {
						newValue += currentNode.right.down.down.newValue;
					}
				}
			}
			currentNode = currentNode.down;
			currentNode.newValue = newValue;
		}
		++currentLocation;
		if (currentNode.newValue > input)
			found = true;
	}
	return currentNode.newValue;
}

console.log(findValueLargerThanInput(spiralNodes.baseNode, input));