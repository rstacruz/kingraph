all: got.svg simpsons.svg got_houses.svg

open: all
	open *.svg -a "Google Chrome"

%.svg: %.yml
	../bin/family-tree $^ | dot -Tsvg > $@
