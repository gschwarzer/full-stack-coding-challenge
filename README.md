# Backend Coding Challenge Instructions
"Problem to solve: Given a URL identify whether a technology is present on this page or website. You need to identify two technologies: Google Analytics and Dyn DNS. Here are their signatures:

```php
$ga_signatures = array( '.google-analytics.com/ga.js', 'ga.async = true;' ); // HTML lookup
```
```php
$dyn_signatures = array( 'dynect.net', 'dns.dyn.com' ); // DNS lookup
```

We will use a command line to run the script, passing the webpage to check as a command line argument. Here are some examples that we will run your script against, so be sure to try these out and verify that they
work as expected:

```
$ php tech_identifier.php google.com
```
```
$ php tech_identifier.php http://www.google.com
```
```
$ php tech_identifier.php http://facebook.com
```
```
$ php tech_identifier.php http://www.nytimes.com
```
```
$ php tech_identifier.php www.nytimes.com
```
```
$ php tech_identifier.php nytimes.com
```

For each input, your output should be:

```
Using GA: <yes/no>
```
```
Using Dyn: <yes/no>
```

No need to explicitly write tests, but please test your script on several sites on your own to make sure it works dependably and as expected. Design your code to be robust and scalable. New signatures for any technology may be added in the future. Comments are encouraged where you think necessary to explain your code and thought process."


# Frontend Coding Challenge Instructions
"For this coding challenge, you will be constructing a timeline to browse all the commands sent to student chromebooks during a classroom session. Commands are created by teachers and sent to a subset of students in their classroom (not always the same students). Your job is to build a frontend which closely resembles the designer mock (below). For the icons in the mock, feel free to use any webfont library that is served by a CDN. We used Font Awesome in our mock. Your javascript should expose a global function layoutCommands(session, commands, students, teachers) which receives 4 arguments. Each of these arguments are ensured to be objects of the structures (respectively):

```javascript
  session {
    startTime:123456789, // timestamp
    endTime:123456789 // timestamp 
  }

  commands [{
    timestamp:123456789,// timestamp
    commandName:'Lock', // human readable command commandType:'lock', // font awesome icon name without prefix
    createdBy:1, // teacher id
    sentTo:[67,89,100] //studentids
  }]

  students [{
    id:67,
    name:'JaneDoe' 
  }]

  teachers [{
    id:1,
    name:'Mrs.Teacher'
  }]
```

You can assume that teachers and students referenced by commands will always be provided in the `teachers` and `students` arguments. For this challenge, you do not need to worry about relative sizing/positioning of commands based on the time they were sent. All command blocks can be an equal distance away from each other and the session start/end markers. Commands should be in chronological order and its command should be a name of a font awesome icon. However, the detail bubble (containing the name and students) should only be shown when a command icon is clicked. If another command icon is clicked, it should close any other detail bubbles. The `(and # more)` section of the student name listing should reveal all names if clicked and should only be visible if more than 6 students are included in the command. Your frontend should closely resemble this designer mock:" [see frontend_challenge/mockup.png]
