
PORT=8080
EDITOR=code

dev:	
	code . &>/dev/null &
	python2 -m SimpleHTTPServer $(PORT) &
	google-chrome 'localhost:8080'

