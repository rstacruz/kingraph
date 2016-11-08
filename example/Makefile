all: got.svg simpsons.svg

open: all
	open *.svg -a "Google Chrome"

%.svg: %.yml
	../bin/family-tree $^ > $@
