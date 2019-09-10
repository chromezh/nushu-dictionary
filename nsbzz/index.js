"use strict";

function HTMLEncode(input) {
	var x = document.createElement('p');
	x.innerText = input;
	return x.innerHTML;
}

var dictmap;

fetch('https://nushuscript.org/nsbzzzd/table.json')
.then(function(response) { return response.json(); })
.then(function(res) {
	dictmap = buildIndex(res);
});

function buildIndex(dictarr) {
	return dictarr.reduce(function(obj, x) {
		var id = x[0], romanization = x[1], chars = x[2];
		for (var i = 0, n = chars.length; i < n; i++) {
			var oldVal = obj[chars[i]];
			if (!oldVal)
				obj[chars[i]] = [[id, romanization]];
			else
				obj[chars[i]].push([id, romanization]);
		}
		return obj;
	}, {});
}

function makeImg(input) {
	var id = input[0], romanization = input[1];
	return '<img id="' + id + '" alt="' + romanization + '" src="https://nushuscript.org/nsbzzzd/img/' + id + '.png"/>';
}

function processChar(ys) {
	return dictmap[ys] ?
	HTMLEncode(ys) + dictmap[ys].map(makeImg).join('') :
	HTMLEncode(ys);
}

function handleConvert() {
	boxSelect.innerHTML = boxInput.value.split('').map(processChar).join('');
}
