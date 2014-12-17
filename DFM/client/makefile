VPATH = src:lib

all: client sdk.js cloud_gui

debug:
	make DEBUG=1

client: \
	embed.js \
	infomous.js \
	infomous.css \
	cloud_frame.css

sdk = \
	  sdk.dev.js \
      ga_tracker.dev.js \
      event_dispatcher.dev.js \
	  cloud_frame.dev.js \
      cloud_proxy.dev.js

embed.js: \
	$(sdk) \
	swfobject.js \
	embed.dev.js 

infomous.css: infomous.dev.css
infomous.js: \
	jqsvg.js \
	infomous.dev.js

sdk.js: \
	$(sdk)

cloud_frame.css: cloud_frame.dev.css

cloud_gui: cloud_gui.js cloud_gui.css
cloud_gui.js: cloud_toolbar.dev.js
cloud_gui.css: cloud_toolbar.dev.css

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

clean:
	-rm \
		embed.js \
		infomous.js \
		infomous.css \
		sdk.js \
		cloud_gui.js \
		cloud_gui.css \
		cloud_frame.css

