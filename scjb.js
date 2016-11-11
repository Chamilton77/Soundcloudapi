//the jukebox object has all of the methods needed for the 
//object to run.
function Jukebox(){
//SC.initalize connects to soundcloud through the api
//this. anything is set up for the variables to call in later functions
//playlist holds the array of songs, song index gets the first song out 
//of the array.	
	SC.initialize({
	    client_id: 'f665fc458615b821cdf1a26b6d1657f6'
	});
	this.playlist = null;
	var _this = this;
	this.currentSongindex = 0; 
	this.currentSongStream = null;
	this.currentSongObject = null;
//get tracks gets the music from soundcloud based on the parameter passed
//in which for mine is dubstep
	SC.get("/tracks",{
		q: "dubstep"
	}).then(function(response){
		console.log(response);
		_this.playlist = response;
		_this.currentSongObject = _this.playlist[_this.currentSongindex];
		_this.currentSongStream = SC.stream('/tracks/' + _this.currentSongObject.id);
	});
//this function sets up and calls the play function to play the music
	this.play = function(){
		_this.currentSongStream.then(function(player){
			player.play();
		});
	}
//this function makes the pause function and calls it	
	this.pause = function(){
		_this.currentSongStream.then(function(player){
			player.pause();
		});
	}
//This gets the new info from the object in the array and passes the 
//information to the html page to change the text
 	this.changeInfo = function(){
		$('#songn').html(_this.currentSongObject.title);
		$('#artist').html('<a target="_blank" href="'+ _this.currentSongObject.permalink_url +'">'+ _this.currentSongObject.permalink_url +'</a>');
		$('#descript').html(_this.currentSongObject.description);
		$('#genre').html(_this.currentSongObject.genre);
		$('#releasedate').html(_this.currentSongObject.created_at);
		$('#cover').attr("src", _this.currentSongObject.artwork_url);
	};	
//This function sets up the next song to play when you hit the next button
	this.nextSong = function() {   
		this.currentSongindex++;
		this.currentSongObject = this.playlist[this.currentSongindex];
		this.currentSongStream = SC.stream('/tracks/' + _this.currentSongObject.id);
		this.play();
	};
//this function call the previous song and sets it up to play
	this.prevSong = function() {   
		this.currentSongindex--;
		this.currentSongObject = this.playlist[this.currentSongindex];
		this.currentSongStream = SC.stream('/tracks/' + _this.currentSongObject.id);
		this.play();
	};
};
//this is where all the functions are called to make the object work
//play makes it so it calls the play function. The next and previous
//functions both change the index and change the info when 
//the song is changed
$(document).ready(function(){
	var play1 = new Jukebox();
	$('#play').click(function(){
		play1.play();
		play1.changeInfo();
	});
	$('#pause').click(function(){
		play1.pause();
	});
	$('#next').click(function(){
		play1.nextSong();
		play1.changeInfo();
	});
	$('#prev').click(function(){
		play1.prevSong();
		play1.changeInfo();
	});
});

