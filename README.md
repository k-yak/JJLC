# JJLC
Javascript Json Live Compression for localStorage

JJLC allow you to compress json files and save it in localStorage. It automatically create map with the JSON Schema and save lot of size due to redondance of schema in JSON.

* Very useful to save lot of size when you store json in localStorage.
* Remove multiple space in JSON

### Version
1.1

### Demo
http://k-yak.github.io/JJLC/

### Installation

add to your html file

```html
<script src="dist/jjlc.min.js"></script>
```

### Usage

* basic usage
```js
//compress
var compressed = JJLC.setItem('test', json);
//decompress
var decompressed = JJLC.getItem('test');
```
* setItem option
```js
//by default setItem check if your json is well formated and remove extra space
//if it doesn't setItem can fail
//so you can bypass this verification with
var compressed = JJLC.setItem('test', json, 'no-beautify');
//decompress
var decompressed = JJLC.getItem('test');
```
```js
//use local dict previously check with setDict with dont-store-dict option
var compressed = JJLC.setItem('test', json, 'local-dict');
//decompress
var decompressed = JJLC.getItem('test');
```
* manage dictionaries
```js
var dict = JJLC.getDict('key');
//basic usage
JJLC.setDict('key', dict);
//don't use localStorage to store dictionary, but a simple variable
JJLC.setDict('key', dict, 'no-localstorage');
```

###Expert mode
The objective is to save even more space, saving dictionary directly in a javascript file

* Step  1
Create dictionary with your huge json.
```js
    var compressed = JJLC.setItem('testStr', tst_s);
    var dict = JSON.stringify(JJLC.getDict('testStr'));
    console.log(dict);
```
* Step 2 : copy/paste in your main.js file, in a dict variable, and use it
```js
    var dict =  {"\"type\":":"£a£","\"description\":":"£b£","\"id\":":"£c£","\"name\":":"£d£","\"price\":":"£e£","\"minimum\":":"£f£","\"exclusiveMinimum\":":"£g£","\"tags\":":"£h£","\"items\":":"£i£","\"minItems\":":"£j£","\"uniqueItems\":":"£k£","\"products\":":"£l£","\"title\":":"£m£","\"required\":":"£n£"};
    
    //compress
    JJLC.setDict('test', dict, 'no-localstorage');
	var compressed = JJLC.setItem('test', json, 'local-dict');
	//decompress
	var decompressed = JJLC.getItem('test');
```


###Results

####little file 
```
COMPRESS
initial size : 1065 c
compressed size : 796 c
win : 269 c
win : 25.3%
DECOMPRESS
execution : 12 milliseconds
```

####big file
```
COMPRESS
initial size : 342359 c
compressed size : 201528 c
win : 140831 c
win : 41.1%
DECOMPRESS
execution : 89 milliseconds
```

####little file - expert mode
```
COMPRESS
initial size : 1065 c
compressed size : 501 c
win : 564 c
win : 53.0%
DECOMPRESS
8 milliseconds
```
License
----

MIT
