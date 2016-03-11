FINAL_FILES = public/lib/d3.min.js

.PHONY: all clean

all: $(FINAL_FILES)

clean:
	rm -rf -- $(FINAL_FILES) build

public/lib/d3.min.js: node_modules/d3/d3.min.js
	mkdir -p $(dir $@)
	cp -f $< $@
