//Layout Variables for Testing
var session = {
	startTime:1455094800, // timestamp
	endTime:1455102000 // timestamp 
};

var commands = [{
	timestamp:1455098400,// timestamp
	commandName:'Lock', // human readable command 
	commandType:'lock', // font awesome icon name without prefix
	createdBy:1, // teacher id
	sentTo:[80] //studentids
},{
	timestamp:1455096600,// timestamp
	commandName:'Reboot', // human readable command 
	commandType:'paper-plane-o', // font awesome icon name without prefix
	createdBy:2, // teacher id
	sentTo:[67,68,69,70,75,80,89] //studentids
},{
	timestamp:1455100200,// timestamp
	commandName:'Comment', // human readable command 
	commandType:'comment-o', // font awesome icon name without prefix
	createdBy:1, // teacher id
	sentTo:[67,89,100] //studentids
}];
	
var students = [{
	id:67,
	name:'Jane' 
},{
	id:68,
	name:'John' 
},{
	id:69,
	name:'Mike' 
},{
	id:70,
	name:'Eric' 
},{
	id:75,
	name:'Test' 
},{
	id:80,
	name:'Jeff' 
},{
	id:89,
	name:'Gabe' 
},{
	id:100,
	name:'Chris' 
}];

var teachers = [{
	id:1,
	name:'Mrs. Teacher' 
},{
	id:2,
	name:'Mr. TA' 
}];