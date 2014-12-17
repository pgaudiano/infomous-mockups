VPATH = src:lib

.PHONY: readme update

all: sdk.js lib/jquery.js client gui readme

debug:
	make DEBUG=1

sdk = \
	  sdk.dev.js \
	  ga_tracker.dev.js \
	  events.dev.js \
	  cloud_flash.dev.js \
	  cloud_proxy.dev.js

sdk.js: $(sdk)

lib/jquery.js: \
	jquery-1.4.3.js \
	waypoints.js

client: \
	embed.js \
	infomous.js \
	infomous.css 

gui: \
	cloud_gui.js \
	cloud_gui.css \
	cloud_frame.js \
	cloud_frame.css

embed.js: \
	$(sdk) \
	lib/jquery.js \
	swfobject.js \
	embed.dev.js

infomous.js: infomous.dev.js
infomous.css: infomous.dev.css

cloud_gui.js: cloud_toolbar.dev.js
cloud_gui.css: cloud_toolbar.dev.css

cloud_frame.js: cloud_frame.dev.js
cloud_frame.css: cloud_frame.dev.css

%.js: 
	cat $^ > $@.cat
ifdef DEBUG
	cp $@.cat $@
else
	java -jar deploy/yuicompressor-2.4.7.jar --type js -o $@ $@.cat
endif
	rm $@.cat

%.css: 
	cat $^ > $@.cat
ifdef DEBUG
	cp $@.cat $@
else
	java -jar deploy/yuicompressor-2.4.7.jar --type css -o $@ $^
endif
	rm $@.cat

readme:
	svn info | grep 'URL\|Revision\|Rev\|Date' > readme

update:
	svn merge https://svn.infomous.com/dev/text_drupal/trunk/client .

export_id = client_export
export:
	svn export . $(export_id)
	rm -r \
		$(export_id)/deploy \
		$(export_id)/src \
		$(export_id)/makefile
	tar -czvf $(export_id).zip $(export_id)
	rm -r $(export_id)

clean:
	-rm \
		sdk.js \
		embed.js \
		infomous.js \
		infomous.css \
		cloud_gui.js \
		cloud_gui.css \
		cloud_frame.js \
		cloud_frame.css \
		lib/jquery.js

