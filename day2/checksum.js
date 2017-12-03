const file = require('../utility.js');

file.getInputData('input.txt')
	.then((data) => {
		let input = parseInputString(data.toString());
		console.log('first  half ', calcChecksum(input));
		console.log('second half ', calcEvenDivisibleSum(input));
	})
	.catch((err) => {
		console.log(err);
	});
//parse	
function parseInputString(str) {
	let output = [];
	let arr = [];
	let val = "";
	for (let i = 0; i < str.length; ++i) {
		let ch = str.charAt(i);
		if (ch === '\t' || ch === '\n' || i+1 === str.length) {
			val = parseInt(val);
			if (ch === '\n') {
				arr.push(val);
				output.push(arr);
				arr = [];
			}
			else if (i+1 === str.length) {
				val += ch;
				arr.push(val);
				output.push(arr);
			}
			else {
				arr.push(val);
			}
			
			val = "";
		}
		else {
			val += ch;
		}
	}
	return output;
}
//first
function calcChecksum(arr) {
	let sum = 0;
	let max = 0;
	let min = 99999999;
	//row
	for (let i = 0; i < arr.length; ++i) {
		//find min/max from value
		for (let j = 0; j < arr[i].length; ++j) {
			let val = arr[i][j];
			max = val > max ? val : max;
			min = val < min ? val : min;
		}
		sum += (max - min);
		max = 0;
		min = 99999999;
	}
	return sum;
}
//second
function calcEvenDivisibleSum(arr) {
	let sum = 0;
	//row
	for (let i = 0; i < arr.length; ++i) {
		//first value
		for (let j = 0; j < arr[i].length; ++j) {
			//second value
			for (let v = 0; v < arr[i].length; ++v) {
				//is divisible and not itself
				if (arr[i][j] % arr[i][v] === 0 && arr[i][j] !== arr[i][v]) {
					sum += (arr[i][j] / arr[i][v]);
				}
			}
		}
	}
	return sum;
}
