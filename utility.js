const fs = require('fs');

exports.getInputData = function(fileName) {
	return new Promise((resolve, reject) => {
		fs.readFile(fileName, (err, data) => {
			if (err) 
				reject(err);
			else
				resolve(data);	
		});
	});
};
