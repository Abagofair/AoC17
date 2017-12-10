const file = require('../utility.js');

file.getInputData('input.txt')
	.then((data) => {
		const input = data.toString().split('\t');
		//convert values to numbers
		for (let i = 0; i < input.length; ++i) {
			input[i] = parseInt(input[i]);
		}
		console.log(getCyclesBeforeInfLoop(input));
	})
	.catch((err) => {
		console.log(err);
	});
	
function getCyclesBeforeInfLoop(banks) {
	let cycleCount = 0;
	let maxBlocks = 0;
	let prevStates = [];
	prevStates.push(banks.slice());
	let found = false;
	while (!found) {
		//find bank with most memory blocks
		let index = -1;
		for (let i = 0; i < banks.length; ++i) {
			if (banks[i] > maxBlocks) {
				maxBlocks = banks[i];
				index = i;
			}
		}
		//remove from bank
		banks[index++] = 0;
		//redistribute over banks from maxBank+1
		while (maxBlocks > 0) {
			if (index >= banks.length)
				index = (index % banks.length);		
			banks[index] += 1;
			++index;
			--maxBlocks;
		}
		//find duplicate redistribution config
		let i = 0;
		while (!found && i < prevStates.length) {
			if (compareBanks(prevStates[i], banks)) {
				found = true;
			}
			++i;
		}
		if (!found)
			prevStates.push(banks.slice());
		
		++cycleCount;
	}
	return cycleCount;
}

function compareBanks(b1, b2) {
	let count = 0;
	for (let i = 0; i < b1.length; ++i) {
		if (b1[i] === b2[i])
			++count;
		else
			return false;
	}
	return count === b1.length;
}