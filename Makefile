include Makefile.inc

DIRS = en
ifndef VERSION
VERSION=$(shell grep ^version.number= version.properties | cut -d= -f 2)
endif

ifndef TAG
TAG=$(shell grep ^version.tag= version.properties | cut -d= -f 2)
endif

ifndef RELDATE
RELDATE=$(shell grep ^version.date= version.properties | cut -d= -f 2)
endif

ifneq ($(TAG),GA)
RVERSION=$(VERSION)-$(TAG)
else
RVERSION=$(VERSION)
endif
VERSION_FULL=$(VERSION)-$(RELDATE)

.PHONY: all clean

dist/rundeck-docs-$(RVERSION).zip: all
	mkdir -p dist
	for i in $(DIRS) ; do \
		if [ "$$i" != "en" ] ; then \
		mkdir en/dist/html/$$i ; \
		cp -r $$i/dist/html/* en/dist/html/$$i/ ; \
		fi \
	done ;
	cd en/dist && zip -r ../../dist/$(@F) *

all: $(DIRS)
	for i in $^ ; do \
	$(MAKE) VERSION=$(VERSION) TAG=$(TAG) VERSION_FULL=$(VERSION_FULL) -C $$i ; \
	done ;

clean: $(DIRS)
	for i in $^ ; do \
	$(MAKE) VERSION=$(VERSION) TAG=$(TAG) VERSION_FULL=$(VERSION_FULL) -C $$i clean ; \
	done ;
	rm -rf dist

notes: en/history/toc.conf

_dl/RELEASE-$(RVERSION).md:
	mkdir -p _dl
	curl -f -o $@ https://raw.githubusercontent.com/rundeck/rundeck/v$(RVERSION)/RELEASE.md

_dl/CHANGELOG-$(RVERSION).md:
	mkdir -p _dl
	curl -f -o $@ https://raw.githubusercontent.com/rundeck/rundeck/v$(RVERSION)/CHANGELOG.md

en/history/version-$(RVERSION).md: _dl/RELEASE-$(RVERSION).md
	( $(ECHO) "% Version $(RVERSION)" ; \
        $(ECHO) "%" $(shell whoami) ; \
        $(ECHO) "%" $(shell date "+%m/%d/%Y") ; \
        $(ECHO) ; ) >$@
	cat $< >>$@

	perl  -i -p -e "s#http://rundeck.org/docs/#../#" $@
	perl  -i -p -e "s#http://rundeck.org/$(RVERSION)/#../#" $@

en/history/changelog.md: _dl/CHANGELOG-$(RVERSION).md
	( $(ECHO) "% Changelog" ; \
        $(ECHO) "%" $(shell whoami) ; \
        $(ECHO) "%" $(shell date "+%m/%d/%Y") ; \
        $(ECHO) ; ) >$@
	cat $< >> $@

en/history/toc.conf: en/history/version-$(RVERSION).md en/history/changelog.md
	$(ECHO) "1:changelog.md:Changelog ($(shell date "+%Y-%m-%d"))" > $@.new
	$(ECHO) "1:version-$(RVERSION).md:Version $(RVERSION) ($(shell date "+%Y-%m-%d"))" >> $@.new
	test -f $@ && ( grep -v -q "$(RVERSION)" $@ && \
		grep -v "Changelog" $@ >> $@.new && \
		mv $@.new $@ ) || (  mv $@.new $@ )
