MAKEFLAGS = -j1

export BABEL_ENV = test

.PHONY: clean install install-app

install: clean install-app

clean:
	./shell/clean-app.sh

install:
	node ./shell/install-app.js
