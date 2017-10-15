function shuffle(a) {
	var j, x;
	for (var i = a.length; i != 0; i--) {
		j = Math.floor(Math.random() * i);
		x = a[i - 1];
		a[i - 1] = a[j];
		a[j] = x;
	}
}

function capitalize(s) {
	return s.charAt(0).toUpperCase() + s.slice(1);
}

function capitalize_words(s) {
	var words = s.split(' ');
	var capitalized_words = words.map(function(word) {
		return word.charAt(0).toUpperCase() + word.slice(1);
	});
	return capitalized_words.join(' ');
}

var state = {
	index: 0,
	playing: false,
	
	species: function () {
		return species_list[this.index];
	},

	prev: function () {
		this.index--;
		if (this.index == -1) {
			this.index = species_list.length - 1;
		}
		infa.update_species_info();
	},

	next: function () {
		this.index++;
		if (this.index == species_list.length) {
			this.index = 0;
		}
		infa.update_species_info();
	},

	reshuffle: function () {
		shuffle(species_list);
		this.index = 0;
	}
		
};

var infa = {
	
	auto_move: function() {
		state.next();
		if ('Notification' in window) {
			if (Notification.permission == 'granted') {
				var note = new Notification(state.species().com_name_f());
				setTimeout(note.close.bind(note), 10000);
			} else if (Notification.permission !== 'denied') {
				Notification.requestPermission(function(permission) {
					if (permission == 'granted') {
						var note = new Notification(state.species().com_name_f());
						setTimeout(note.close.bind(note), 10000);
					}
				});
			}
		}
	},
	
	update_species_info: function() {
		this.audio.src = state.species().audio_uri();
		if (state.playing) {
			this.audio.play();
		}
		this.heading.innerHTML = state.species().com_name_f() + ', <i>' + state.species().sci_name_f() + '</i>';
		this.img.src = state.species().img_uri();
		this.attr.innerHTML = 'Song recorded by ' + state.species().rec_author + ', available at <a href="http://www.xeno-canto.org/' + state.species().rec_number + '">xeno-canto</a>';
		window.document.title = state.species().com_name_f();
	},

	update_button_labels: function() {
		if (state.playing) {
			this.btn_pp.innerHTML = 'Pause';
		} else {
			this.btn_pp.innerHTML = 'Play';
		}
	},

	play: function() {
		this.audio.play();
		this.btn_pp.removeEventListener('click', this.play.bind(this));
		this.btn_pp.addEventListener('click', this.pause.bind(this));
		state.playing = true;
		this.update_button_labels();		
	},

	pause: function() {
		this.audio.pause();
		this.btn_pp.removeEventListener('click', this.pause.bind(this));
		this.btn_pp.addEventListener('click', this.play.bind(this));
		state.playing = false;
		this.update_button_labels();
	},

	init: function() {

		state.reshuffle();
				
		this.btn_prev = document.getElementById('btn-prev');
		this.btn_prev.addEventListener('click', state.prev.bind(state));
		
		this.btn_next = document.getElementById('btn-next');
		this.btn_next.addEventListener('click', state.next.bind(state));
		
		this.btn_pp = document.getElementById('btn-pp');
	
		this.audio = document.getElementById('audio');
		this.audio.addEventListener('ended', this.auto_move.bind(this));
		
		this.heading = document.getElementById('heading');
		this.img = document.getElementById('img');
		this.attr = document.getElementById('attr');
	
		this.pause();
		this.update_species_info();
		Notification.requestPermission(function(permission) {
			if (permission == 'granted') {
				var note = new Notification(state.species().com_name_f());
				setTimeout(note.close.bind(note), 10000);
			}
		});
	
	},

};

document.addEventListener('DOMContentLoaded', infa.init.bind(infa));