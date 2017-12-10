const file = require('../utility.js');

file.getInputData('input.txt')
	.then((data) => {
		const input = data.toString().split('\r\n');
		const invalid = countRepeatedWords(input);
		const valid = input.length - invalid;
		console.log(valid);
	})
	.catch((err) => {
		console.log(err);
	});
	
function checkIfRepeatedWord(str) {
	let arr = str.split(' ');
	for (let i = 0; i < arr.length; ++i) {
		for (let j = 0; j < arr.length; ++j) {
			if (i !== j && arr[i] === arr[j]) {
				return true;
			}
		}
	}
	return false;
}

function countRepeatedWords(strArr) {
	let count = 0;
	for (let i = 0; i < strArr.length; ++i) {
		if (checkIfRepeatedWord(strArr[i]))
			++count;
	}
	return count;
}