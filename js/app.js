let cardsBottoms = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube'];
let openCards = []; 
let matchedCards = [];
let currentBottoms = [];
let star = 3;
let counter = 0;
let oneFlip = true;

var timeCurrent = setInterval(countTimer, 1000);
var totalSeconds = 0;
function countTimer() {
   totalSeconds++;
   var hour = Math.floor(totalSeconds /3600);
   var minute = Math.floor((totalSeconds - hour*3600)/60);
   var seconds = totalSeconds - (hour*3600 + minute*60);

   document.getElementById("timer").innerHTML = hour + ":" + minute + ":" + seconds;
}

function resetTimer() {
	clearInterval(timeCurrent);
	totalSeconds = 0;
	timeCurrent = setInterval(countTimer, 1000);
}

 function newGame() {
 	let cards = $('.card');
 	cards.removeClass('match open show'); 

 	let newCardsBottoms = shuffle(cardsBottoms);

 	currentBottoms = cards.children();
 	currentBottoms.removeClass('fa-diamond fa-paper-plane-o fa-anchor fa-bolt fa-cube fa-leaf fa-bicycle fa-bomb');
 	currentBottoms.each( function(index, item) {
 		$(item).addClass(newCardsBottoms[index]); 
 	});
 	openCards = []; 
 	matchedCards = [];
 	star = 3;
 	counter = 0;
 	oneFlip = true;
 	$('.moves').text(0);
 	$('.fa-star').css('color','#000');
 	clearInterval(timeCurrent);
 }

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function showSymbol(card) {
	card.addClass('open show');
}

function hideSymbol(card) {
	card.removeClass('open show');
}

function keepOpenOnMatch(card) {
	card.addClass('match');
	card.removeClass('open show');
}

function showWinnigMessage() {
	let modelWin = $('#winningModel');
	let hours = Math.floor(totalSeconds /3600);
    let minutes = Math.floor((totalSeconds - hours*3600)/60);
    let seconds = totalSeconds - (hours*3600 + minutes*60);
    var playAgain = confirm('You got '+star+' star(s) in\n' +hours+' hour(s) '+minutes+' minute(s) and '+seconds+' second(s).');
    if(playAgain == true){
    	newGame();
    }else{
    	alert("Goodbye! Have a great Day!")
    }
}

function addToOpen(card) {
	let cardPic=card.children('i').attr('class').split(' ')[1];
	openCards.push(cardPic);
}

function increaseCounter() {
	counter += 1;
	$('.moves').text(counter);
	if (counter===30) { 
		$('#third-star').css('color','#fefefe');
		star=2;
	} else if (counter===40) {
		$('#second-star').css('color','#fefefe');
		star=1;
	} else if (counter>60) {
		$('#first-star').css('color','#fefefe');
		star=0;
	}
}

function checkMatch() {
	if (openCards.length==2) { 
		if (openCards[0]==openCards[1]) { 
			keepOpenOnMatch($('.card:has(.'+openCards[0]+')'));
			matchedCards.push(openCards[0]);
			if (matchedCards.length===8) {
			 	clearInterval(timeCurrent);
			 	showWinnigMessage();	
			  }
		} else {
			hideSymbol($('.card:has(.'+openCards[0]+')'));
			hideSymbol($('.card:has(.'+openCards[1]+')'));
		}
		openCards=[];
	} 
}

$('.card').click( function(event) {
	if (oneFlip) {
		resetTimer();
		oneFlip = false;
	}
	let card = $(event.target); 
	if (!card.hasClass('match') && !card.hasClass('show')) {
		if (openCards.length<=1) {
			showSymbol(card);
			addToOpen(card);
			increaseCounter();
			setTimeout(checkMatch,1000);
		}
	}
});

$('.restart').click(newGame);

$(document).ready(newGame);

$('.close').click(function() {
    $('.model').css('display', 'none');
});

window.onclick = function(event) {
    $('.model').css('display', 'none');
};

$('.play').click(newGame);

$('.no-play').click(function() {
    $('.model').css('display', 'none');
    clearInterval(timeCurrent);
});


