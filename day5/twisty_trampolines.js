const file = require('../utility.js');

file.getInputData('input.txt')
	.then((data) => {
		const input = data.toString().split('\r\n');
		console.log('steps to exit first half ', stepsToExitMaze(input));
		const lol = data.toString().split('\r\n');
		console.log('steps to exit second half ', stepsToExitMazeSecondHalf(lol));
	})
	.catch((err) => {
		console.log(err);
	});
	
	
function stepsToExitMaze(instructions) {
	let instructionPointer = 0;
	let count = 0;
	while (instructionPointer < instructions.length) {
		let offset = parseInt(instructions[instructionPointer]);
		instructions[instructionPointer] = offset + 1;
		instructionPointer += offset;
		++count;
	}
	return count;
}

function stepsToExitMazeSecondHalf(instructions) {
	let instructionPointer = 0;
	let count = 0;
	while (instructionPointer < instructions.length) {
		let offset = parseInt(instructions[instructionPointer]);
		
		if (offset >= 3)
			instructions[instructionPointer] = offset - 1;
		else
			instructions[instructionPointer] = offset + 1;
		
		instructionPointer += offset;
		++count;
	}
	return count;
}