all: got.svg simpsons.svg potter.svg

open: all
	open *.svg -a "Google Chrome"

%.svg: %.yml
	../bin/family-tree $^ > $@
