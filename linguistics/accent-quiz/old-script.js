
function swapIndices (a, i1, i2) {
	var t = a[i1];
	a[i1] = a[i2];
	a[i2] = t;
}

function shuffle (a) {
	for (var i = a.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		swapIndices(a, i, j);
	}
}

var items = [[], [[
	// # Consonants
	[['', 'ladder', ''], ['', 'latter', '']], // flapping
	// ## Dental fricatives
	// ### Th-fronting
	[['', 'fin', ''], ['', 'thin', '']],
	[['c', 'over', ''], ['m', 'other', '']],
	// ### Th-stopping
	[['', 'thin', ''], ['', 'tin', '']],
	[['', 'den', ''], ['', 'then', '']],
	// ## Consonant clusters
	// ### Assimilation
	[['Br', 'adford', ''], ['C', 'atford', '']],
	[['', 'ch', 'eer'], ['', 't', 'ree']],
	// ### Complexification
	[['', 'prince', ''], ['', 'prints', '']],
	// ### Simplification
	// #### Clusters beginning with /h/
	[['', 'which', ''], ['', 'witch', '']],
	[['', 'Hugh', ''], ['', 'yew', '']],
	// #### Ng-coalescence
	[['sin', 'g', ''], ['va', 'gue', '']],
	[['f', 'inger', ''], ['s', 'inger', '']],
	// #### Clusters ending with /j/
	// ##### Yod-dropping
	[['', 'loot', ''], ['', 'lute', '']],
	[['', 'toon', ''], ['', 'tune', '']],
	[['', 'dew', ''], ['', 'do', '']],
	[['', 'new', ''], ['ca', 'noe', '']],
	[['', 'pew', ''], ['', 'poo', '']],
	[['', 'mo', 've'], ['', 'mu', 'sic']],
	// #### Yod-coalescence
	[['', 'choose', ''], ['', 'Tues', 'day']],
	[['', 'dew', ''], ['', 'Jew', '']],
	// # Vowels
	// ## Mergers
	[['f', 'oot', ''], ['str', 'ut', '']],
	[['g', 'ood', ''], ['m', 'ood', '']],
	// ## Primary splits
	// ### Conditioned by preceding consonant
	[['', 'chew', ''], ['', 'choo', ' choo']],
	[['', 'threw', ''], ['', 'through', '']],
	// ### Conditioned by succeeding consonant
	[['b', 'eg', ''], ['v', 'ague', '']],
	// ### Pre-/l/ breaking
	[['', 'real', ''], ['', 'reel', '']],
	[['d', 'ial', ''], ['t', 'ile', '']],
	[['b', 'oil', ''], ['r', 'oyal', '']],
	[['f', 'owl', ''], ['v', 'owel', '']]
], []];

function reprItem (item) {
	p1 = item[0];
	w1 = p1[0] + '<strong>' + p1[1] + '</strong>' + p1[2];
	p2 = item[1];
	w2 = p2[0] + '<strong>' + p2[1] + '</strong>' + p2[2];
	return w1 + ', ' + w2;
}

function unreprItem (item) {
	parts = item.split(', ');
	parts[0].replace('/', '');
	parts[1].replace('/', '');
	return [
		parts[0].split('<strong>'),
		parts[1].split('<strong>')
	];
}

function startQuiz (e) {
	alert('Yo!');
}

function handleLoad (e) {
	alert("i");
	btnStart = document.getElementById('btn-start');
	btnStart.addEventListener('click', startQuiz, false)
}

window.addEventListener('load', handleLoad, false);