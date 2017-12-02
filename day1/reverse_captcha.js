const file = require('../utility.js');
const test = '12131415';
file.getInputData('input.txt')
	.then((data) => {
		console.log('first ', traverseSum(data.toString(), 1));
		console.log('second ', traverseSum(data.toString(), data.toString().length/2));
	})
	.catch((err) => {
		console.log(err);
	});

//first and second half
function traverseSum(str, skip) {
	let sum = 0;
	for (let i = 0; i < str.length; ++i) {
		let index = i % str.length;
		let d1 = parseInt(str.charAt(index));
		index = (index + skip) % str.length; 
		let d2 = parseInt(str.charAt(index));
		
		if (d1 === d2) {
			sum += d1;
		}
	}
	return sum;
}

