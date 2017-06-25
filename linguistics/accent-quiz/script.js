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

var quiz = [
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
	[['', 'chews', ''], ['', 'choose', '']],
	[['', 'threw', ''], ['', 'through', '']],
	// ### Conditioned by succeeding consonant
	[['h', 'ave', ''], ['l', 'augh', '']],
	[['b', 'ad', ''], ['l', 'ad', '']],
	[['b', 'eg', ''], ['v', 'ague', '']],
	// ### Pre-/l/ breaking
	[['', 'real', ''], ['', 'reel', '']],
	[['d', 'ial', ''], ['t', 'ile', '']],
	[['b', 'oil', ''], ['r', 'oyal', '']],
	[['f', 'owl', ''], ['v', 'owel', '']]
];

var answers = {};

var currentItemIndex = 0;

function itemHTML (item) {
	p1 = item[0];
	w1 = p1[0] + '<strong>' + p1[1] + '</strong>' + p1[2];
	p2 = item[1];
	w2 = p2[0] + '<strong>' + p2[1] + '</strong>' + p2[2];
	return w1 + ', ' + w2;
}

function HTMLitem (item) {
	parts = item.split(', ');
	parts[0].replace('/', '');
	parts[1].replace('/', '');
	return [
		parts[0].split('<strong>'),
		parts[1].split('<strong>')
	];
}

function showIntro () {
	$('#intro').show();
	btnShowHideIntro = $('#btn-show-hide-intro');
	btnShowHideIntro.attr('value', 'Hide introduction');
	btnShowHideIntro.click(hideIntro);
}

function hideIntro () {
	$('#intro').hide();
	btnShowHideIntro = $('#btn-show-hide-intro');
	btnShowHideIntro.attr('value', 'Show introduction');
	btnShowHideIntro.click(showIntro);
}

function startQuiz () {
	$('#intro').hide();
	divShowHideIntro = $('#div-show-hide-intro');
	divShowHideIntro.append('<input id="btn-show-hide-intro" type="button" value="Show introduction">');
	$('#btn-show-hide-intro').click(showIntro);
	divQuiz = $('#div-quiz');
	divQuiz.empty();
	shuffle(quiz);
	divQuiz.append('<p id="p-quiz-item-no">Item ' + (currentItemIndex + 1) + '/' + quiz.length + '</p>');
	divQuiz.append('<p id="p-quiz-item">' + itemHTML(quiz[currentItemIndex]) + '</p>');
	divQuiz.append('<p id="p-quiz-answer"><input type="radio" id="answer-same" name="answer" value="same"> Same<br><input type="radio" id="answer-diff" name="answer" value="diff"> Different<br><input id="answer-idk" type="radio" name="answer" value="idk" checked> I don\'t know</p>');
	divQuiz.append('<p id="p-next-item"><input id="btn-next-item" type="button" value="Next"></p>');
	divQuiz.append('<p id="p-finish"><input id="btn-finish" type="button" value="Finish"></p>');
	$('#btn-next-item').click(nextItem);
	$('#btn-finish').click(finishQuiz);
}

function finishQuiz () {
	$('#div-quiz').hide();
	alert(JSON.stringify(answers));
}

function nextItem () {
	pQuizItem = $('#p-quiz-item');
	if ($('#answer-same').prop('checked', true)) {
		answers[quiz[currentItemIndex]] = true;
	}
	if ($('#answer-diff').prop('checked', true)) {
		answers[quiz[currentItemIndex]] = false;
	}
	currentItemIndex++;
	if (currentItemIndex < quiz.length) {
		pQuizItemNo = $('#p-quiz-item-no');
		pQuizItemNo.html('Item ' + (currentItemIndex + 1) + '/' + quiz.length + '</p>');
		pQuizItem.empty();
		pQuizItem.append(itemHTML(quiz[currentItemIndex]));
		$('#answer-idk').prop('checked', true);
	} else {
		finishQuiz();
	}
}

$(document).ready(function () {
	$('#btn-start').click(startQuiz);
});