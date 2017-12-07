const spiral = require('./spiral_memory_1st_half');

let input = 23;
spiralNodes = spiral.createSpiralMemory(input);
//baseNode
function findValueLargerThanInput(firstNode, input) {
	let currentLocation = 1;
	let currentNode = firstNode;
	while (currentLocation <= input) {
		if (currentNode.right !== null && currentNode.right.value === (currentLocation + 1)) {
			let newValue = 0;
			newValue += currentNode.value;
			if (currentNode.up !== null && currentNode.up.value < currentNode.value) {
				newValue += currentNode.up.value;
				if (currentNode.up.right !== null && currentNode.up.right.value < currentNode.value) {
					newValue += currentNode.up.right.value;
					if (currentNode.up.right.right !== null && currentNode.up.right.right.value < currentNode.value) {
						newValue += currentNode.up.right.right.value;
					}
				}
			}
			currentNode = currentNode.right;
			currentNode.value = newValue;
		}
		else if (currentNode.up !== null && currentNode.up.value === (currentLocation + 1)) {
			let newValue = 0;
			newValue += currentNode.value;
			if (currentNode.down !== null && currentNode.down.value < currentNode.value) {
				newValue += currentNode.down.value;
				if (currentNode.down.left !== null && currentNode.down.left.value < currentNode.value) {
					newValue += currentNode.down.left.value;
					if (currentNode.down.left.left !== null && currentNode.down.left.left.value < currentNode.value) {
						newValue += currentNode.down.left.left.value;
					}
				}
			}
			currentNode = currentNode.up;
			currentNode.value = newValue;
		}
		else if (currentNode.left !== null && currentNode.left.value === (currentLocation + 1)) {
			let newValue = 0;
			newValue += currentNode.value;
			if (currentNode.left !== null && currentNode.left.value < currentNode.value) {
				newValue += currentNode.left.value;
				if (currentNode.left.up !== null && currentNode.left.up.value < currentNode.value) {
					newValue += currentNode.left.up.value;
					if (currentNode.left.up.up !== null && currentNode.left.up.up.value < currentNode.value) {
						newValue += currentNode.left.up.up.value;
					}
				}
			}
			currentNode = currentNode.left;
			currentNode.value = newValue;
		}
		else if (currentNode.down !== null && currentNode.down.value === (currentLocation + 1)) {
			let newValue = 0;
			newValue += currentNode.value;
			if (currentNode.right !== null && currentNode.right.value < currentNode.value) {
				newValue += currentNode.right.value;
				if (currentNode.right.down !== null && currentNode.right.down.value < currentNode.value) {
					newValue += currentNode.right.down.value;
					if (currentNode.right.down.down !== null && currentNode.right.down.down.value < currentNode.value) {
						newValue += currentNode.right.down.down.value;
					}
				}
			}
			currentNode = currentNode.down;
			currentNode.value = newValue;
		}
		console.log('START ', currentNode);
		++currentLocation;
	}
}

findValueLargerThanInput(spiralNodes.baseNode, input);