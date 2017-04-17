all: got.svg simpsons.svg potter.svg got.png simpsons.png potter.png modernfamily.png

open: all
	open *.svg -a "Google Chrome"

%.png: %.yml
	../bin/kingraph $^ -F png > $@
%.svg: %.yml
	../bin/kingraph $^ -F svg > $@
