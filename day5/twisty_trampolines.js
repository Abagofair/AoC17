const file = require('../utility.js');

file.getInputData('input.txt')
	.then((data) => {
		const input = data.toString().split('\r\n');
		console.log('steps to exit ', stepsToExitMaze(input));
	})
	.catch((err) => {
		console.log(err);
	});
	
	
function stepsToExitMaze(instructions) {
	let instructionPointer = 0;
	let count = 0;
	while (instructionPointer < instructions.length) {
		let jumpVal = parseInt(instructions[instructionPointer]);
		instructions[instructionPointer] = jumpVal + 1;
		instructionPointer += jumpVal;
		++count;
	}
	return count;
}