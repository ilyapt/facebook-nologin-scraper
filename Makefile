all: node_modules
	npm run build
	npm run test

node_modules: package.json
	npm i

clean:
	rm -rf node_modules lib/*
