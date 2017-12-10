const file = require('../utility.js');

file.getInputData('input.txt')
	.then((data) => {
		const input = data.toString().split('\r\n');
		const invalid1 = countRepeatedWords(input);
		console.log(invalid1);
		const valid1 = input.length - invalid1;
		console.log('first half (repeated words) ', valid1, ' valid passphrases');
		//isnert suhioteshiop
		const invalid2 = countRepeatedWords(input, isAnagram);
		console.log(invalid2);
		const valid2 = input.length - invalid2;
		console.log('second half (anagram words) ', valid2, ' valid passphrases');
	})
	.catch((err) => {
		console.log(err);
	});
	
function isRepeatedWord(str, comparisonFunc) {
	let arr = str.split(' ');
	for (let i = 0; i < arr.length; ++i) {
		for (let j = 0; j < arr.length; ++j) {
			if (i !== j && comparisonFunc(arr[i], arr[j])) {
				console.log('arr[i] ', arr[i], ' ', ' arr[j] ', arr[j]);
				return true;
			}
		}
	}
	return false;
}

function isAnagram(w1, w2) {
	const w1_arr = w1.split('');
	const w2_arr = w2.split('');
	const lengths = {w1: w1_arr.length, w2: w2_arr.length};
	let count = 0;
	for (let i = 0; i < w1_arr.length; ++i) {
		for (let j = 0; j < w2_arr.length; ++j) {
			if (w1_arr[i] === w2_arr[j]) {
				++count;
				w2_arr.splice(j, 1);
			}
		}
	}
	return (count === lengths.w1 && count === lengths.w2);
}

function countRepeatedWords(strArr, comparisonFunc) {
	let count = 0;
	if (comparisonFunc === undefined)
		comparisonFunc = function(w1,w2) {return w1 === w2};
	for (let i = 0; i < strArr.length; ++i) {
		if (isRepeatedWord(strArr[i], comparisonFunc))
			++count;
	}
	return count;
}