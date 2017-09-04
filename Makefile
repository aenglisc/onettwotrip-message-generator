install:
	npm install

build:
	rm -rf dist
	npm run build

start:
	npm run babel-node -- src/bin/app.js

lint:
	npm run eslint .

publish:
	npm publish

.PHONY: test