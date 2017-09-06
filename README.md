# onetwotrip-message-generator

[![Code Climate](https://codeclimate.com/github/aenglisc/onetwotrip-message-generator/badges/gpa.svg)](https://codeclimate.com/github/aenglisc/onetwotrip-message-generator)
[![Issue Count](https://codeclimate.com/github/aenglisc/onetwotrip-message-generator/badges/issue_count.svg)](https://codeclimate.com/github/aenglisc/onetwotrip-message-generator)
[![Build Status](https://travis-ci.org/aenglisc/onetwotrip-message-generator.svg?branch=master)](https://travis-ci.org/aenglisc/onetwotrip-message-generator)

Message generators, a test for OneTwoTrip!

Creates instances of Redis clients. One of them is a master that emits 'tasks',
the rest are minions that 'process' them, sometimes randomly detecting an 'error'.
Errors are saved to the database and can be read via --getErrors.

installation:
npm install -g

binary:
genmsg

<a href="https://asciinema.org/a/yYEblFYk0HTLbyqV0iw5phHaP" target="_blank"><img src="https://asciinema.org/a/yYEblFYk0HTLbyqV0iw5phHaP.png" /></a>
