all: test build
build:
	npm run build
test:
	npm test
deploy: test build
	cd `git rev-parse --show-toplevel` && git push origin -f `git subtree split --prefix front-end/dist master`:gh-pages

