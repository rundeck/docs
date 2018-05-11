include ../Makefile.inc

DIRS = 
CSS = style.css
DIST = dist
DATE = $(shell date "+%Y-%m-%dT%H:%M:%S%Z")
HRDATE = $(shell date "+%B %e %Y, %H:%M %Z")
DATE_YEAR = $(shell date "+%Y")
ifndef VERSION
VERSION=$(shell grep version.number= ../version.properties | cut -d= -f 2)
endif

ifndef TAG
TAG=$(shell grep version.tag= ../version.properties | cut -d= -f 2)
endif

ifneq ($(TAG),GA)
VERSION=$(VERSION)-$(TAG)
RVERSION=$(VERSION)-$(TAG)
else
RVERSION=$(VERSION)
endif


EDAM=groovy ../scripts/edam.groovy

.PHONY: html clean 

all : html resources

html: 
	mkdir -p $(DIST)/html
	$(EDAM) -o $(DIST)/html  -r -O 'recurseDirPatternIgnore=(dist|figures|temp)' -V "VERSION=$(RVERSION)" -V "DATE=$(DATE)" -V "HRDATE=$(HRDATE)" -V "DATE_YEAR=$(DATE_YEAR)"


resources :  $(CSS) ../figures/*.png
	mkdir -p $(DIST)/html/figures
	- cp ../figures/*.png $(DIST)/html/figures
	cp $(CSS) $(DIST)/html/

clean :
	rm -fr $(DIST)
