//import twit API
var Twit = require('twit');

//import request 
var request = require('request');

//initialize quote and author variables
var quote, author;

//get consumer and access keys and secrets from config file
var config = require('./config');

//declare new Twit object using keys stored in config
var T = new Twit(config);

//get quote
request('http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en',gotQuote);

//callback function, assigns quote and author and posts tweet
function gotQuote(error, response,body){
	//parse JSON data
	var jsonData = JSON.parse(body);
	//assign quote and author
	quote = jsonData.quoteText;
	author = jsonData.quoteAuthor;
	//case when author is empty string
	if(author === '')
		author = 'unknown'
	//params object containing tweet to be posted
	var params = {
	status: quote + '\n-' + author
	}
	//call Tweet function with quote and author as argument
	tweet(params);
}

//called from gotQuote callback function
function tweet(params){
 	T.post('statuses/update', params, dataReceived);

	//callback function once tweet was posted
	function dataReceived(err, data, response) {
  	};
}






