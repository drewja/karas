
PORT=8000
EDITOR=code

dev:	
	code . &>/dev/null &
	python2 -m SimpleHTTPServer $(PORT) ./dist &

