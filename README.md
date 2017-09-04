# onettwotrip-message-generator
Message generators, a test for OneTwoTrip!

Creates instances of Redis clients. One of them is a master that emits 'tasks',
the rest are minions that 'process' them, sometimes randomly detecting an 'error'.
Errors are saved to the database and can be read via --getErrors.

installation:
npm install -g

binary:
genmsg