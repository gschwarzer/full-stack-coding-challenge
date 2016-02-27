//Global layoutCommands function
function layoutCommands(session, commands, students, teachers) {
	buildTimeline.init(session, commands, students, teachers);
}

//Build Timeline Object
var buildTimeline = {
	session: {}, 
	commands: [], 
	students: [], 
	teachers: [],
	$timeline: $('#timeline'),
	
	init: function(session, commands, students, teachers) {
		this.session = session;
		this.commands = commands;
		this.students = students;
		this.teachers = teachers;
		
		//Add end event block to DOM
		this.addStartEndEventBlock('end');
		
		//Add all command event blocks to DOM
		this.addEventBlocks();
		
		//Add start event block to DOM
		this.addStartEndEventBlock('start');
		
		//Attach event listeners
		this.attachEventListeners();
	},
	
	addStartEndEventBlock: function(eventType) {
		this.$timeline.append(
			'<div class="event">'+
				'<div class="time">'+this.convertTimestamp(this.session[eventType+'Time'])+'</div>'+
				'<div class="circle '+eventType+'"></div>'+
				'<div class="detail">Class session '+eventType+'ed</div>'+
			'</div>'
		);
	},
	
	addEventBlocks: function() {
		//Sort commands array by object timestamp in reverse order
		this.commands.sort(function(a, b) {
			if (a.timestamp < b.timestamp) {
				return 1;
			} else if (a.timestamp > b.timestamp) {
				return -1;
			} else {
				return 0;
			}
		});
		
		//Loop through commands array and add event blocks to DOM
		for (var i = 0; i < this.commands.length; i++) {
			this.$timeline.append(
				'<div class="event">'+
					'<div class="time">'+this.convertTimestamp(this.commands[i].timestamp)+'</div>'+
					'<div class="circle"><i class="fa fa-'+this.commands[i].commandType+'"></i></div>'+
					'<div class="bubble">'+
						'<h3>'+this.commands[i].commandName+'</h3>'+
						'<p>Sent by '+this.convertIdToName(this.commands[i].createdBy, this.teachers)+'</p>'+
						'<h4>Sent to '+(this.commands[i].sentTo.length === 1 ? '1 Student' : this.commands[i].sentTo.length+' Students')+'</h4>'+
						'<p>'+this.showStudents(this.commands[i].sentTo, this.students)+'</p>'+
					'</div>'+
				'</div>'
			);
		}
	},
	
	attachEventListeners: function() {
		//Add click event listener function to icon circles which will hide all bubbles and then show the one for the icon clicked
		$('div.circle:not(.end):not(.start)').on('click', function() {
			$('div.bubble').hide();
			$(this).parent().find('div.bubble').show();
		});
		
		//Add click event listener function to "(and # more)" link which will replace the link with the other student names
		$('a.remaining-students').on('click', function(e) {
			e.preventDefault();
			var remainingStudentsStr = $(this).data('remainingStudents');
			$(this).after(remainingStudentsStr).remove();
		});
	},
	
	//Convert unix timestamp to time of day
	convertTimestamp: function(timestamp) {
		var dateObj = new Date(timestamp * 1000),
			hours = (dateObj.getHours() > 12 ? (dateObj.getHours() - 12).toString() : dateObj.getHours().toString()),
			minutes = (dateObj.getMinutes() < 9 ? '0'+dateObj.getMinutes().toString() : dateObj.getMinutes().toString()),
			ampm = (dateObj.getHours() < 12 ? 'am' : 'pm'),
			timeString = hours+'.'+minutes+ampm;
		
		return timeString;
	},
	
	//Convert teacher or student ID to name
	convertIdToName: function(id, array) {
		return $.grep(array, function(obj) { return obj.id === id; })[0].name;
	},
	
	//Return list of comma separated student names and "(and # more)" link if more than 6 students
	showStudents: function(sentToArr, studentsArr) {
		var studentsStr = '',
			remainingStudentsStr = '',
			i = 0,
			numStudents = sentToArr.length,
			countTo = (numStudents > 6 ? 6 : numStudents);
		
		for (i; i < numStudents; i++) {
			if (i < countTo) {
				if (i !== 0) {
					studentsStr += ', ';
				}
				
				studentsStr += this.convertIdToName(sentToArr[i], studentsArr);
			
			} else {
				remainingStudentsStr += ', '+this.convertIdToName(sentToArr[i], studentsArr);
			}
		}
		
		if (numStudents > 6) {
			studentsStr += '<a href="#" class="remaining-students" data-remaining-students="'+remainingStudentsStr+'">(and '+(numStudents - countTo).toString()+' more)</a>';
		}
		
		return studentsStr;
	}
};

//Run layoutCommands function on page load
$(document).ready(function(){
	layoutCommands(session, commands, students, teachers);
});