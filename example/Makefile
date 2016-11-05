all: got.svg simpsons.svg

%.svg: %.yml
	../bin/family-tree $^ | dot -Tsvg > $@
