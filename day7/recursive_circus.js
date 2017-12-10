const file = require('../utility.js');

file.getInputData('input.txt')
	.then((data) => {
		const input = data.toString().split('\r\n');
		let towers = parseInput(input);
		console.log(findBottomTower(towers));
	})
	.catch((err) => {
		console.log(err);
	});
	
function parseInput(arr) {
	let towers = [];
	for (let i = 0; i < arr.length; ++i) {
		let tower = {
			base: "",
			weight: 0,
			subTowers: []
		};
		let towerInfo = arr[i].match(/\w+/g);
		tower.base = towerInfo[0];
		tower.weight = towerInfo[1];
		for (let j = 2; j < towerInfo.length; ++j) {
			tower.subTowers.push(towerInfo[j]);
		}
		towers.push(tower);
	}
	return towers;
}

function findBottomTower(towers) {
	for (let i = 0; i < towers.length; ++i) {
		let found = false;
		let j = 0;
		while (!found && j < towers.length) {
			if (i !== j && towers[j].subTowers.length !== 0 && towers[j].subTowers.includes(towers[i].base)) {
				found = true;
			}
			++j;
		}
		if (j === towers.length)
			return towers[i].base;
	}
}