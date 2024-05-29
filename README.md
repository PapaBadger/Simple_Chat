# Simple_Chat
ITP Semester Project, BIF 2

05.05.24 : 15:21

Installed composer into our project to allow us to host the server. 
To start the server you need to open xampp shell, move to this directory: 
cd htdocs\Simple_Chat\backend && php businesslogic/websocketServer.php

and the server should start!

21.03.24 : 11:39
changed index.html to index.php

includes profile.php

fixed navbar and connected index.php with profile.php

created navbar.php --> navbar now via include

21.03.24 : 10:30 
Added previous Ajax homework to the project as the backend structure will help with implementation of
chat logic. It is currently not hooked into index.html

Further websockets will be needed for communication between users, more research needed.
Some functions were deleted from the original homework

Person changed to User.

Furthermore I removed the queries as those are not neccesary in their original form.
