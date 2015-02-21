# JJLC
Javascript Json Live Compression

JJLC allow you to compress json files. It automatically create map with the JSON Schema and save lot of size due to redondance of schema in JSON.

* Very useful to save lot of size when you store json in localStorage.
* Remove multiple space in JSON

### Version
1.0

### Installation

add to your html file

```html
<script src="dist/jjlc.min.js"></script>
```

### Usage

* basic usage
```js
//compress
var compressed = JJLC.compress(testString);
localStorage.setItem('data', compressed);
//decompress
var compressedLS = localStorage.getItem('data');
var decompressed = JJLC.decompress(compressedLS);
```

### How It works

####Compress

* create map with JSON schema and repetition in JSON string 

```js
{
'"firstname"' : 2,
'"fullAddress"' : 1,
'"id"' : 4
}
```

* sort map to use little key for more use string

```js
{
'"id"' : 4,
'"firstname"' : 2,
'"fullAddress"' : 1
}
```

* replace number with generated keys

```js
{
'"id"' : "£a£",
'"firstname"' : "£b£",
'"fullAddress"' : "£c£"
}
```

* replace all key by value in javascript

```js
 {"$schema":"http://json-schema.org/draft-04/schema#",£r£:£s£,£b£:"A product from Acme's catalog",£a£:£p£,£q£:[{£e£:{£b£:"The unique identifier for a product",£a£:£g£},£f£:{£b£:"Name of the product",£a£:£c£},£d£:{£a£:£o£,£i£:0,£j£:true},£k£:{£a£:£l£,£m£:{£a£:£c£},£n£:1,£h£:true}},{£e£:{£b£:"The unique identifier for a product",£a£:£g£},£f£:{£b£:"Name of the product",£a£:£c£},£d£:{£a£:£o£,£i£:0,£j£:true},£k£:{£a£:£l£,£m£:{£a£:£c£},£n£:1,£h£:true}}],£t£:[£e£,£f£,£d£]}
```

* hash result and save the map corresponding to this hash

```js
{'KachgdiLk45dKJ' : {
'"id"' : "£a£",
'"firstname"' : "£b£",
'"fullAddress"' : "£c£"
}
}
```

####Decompress

* hash compressed data and get the map corresponding to this hash

```js
{'KachgdiLk45dKJ' : {
'"id"' : "£a£",
'"firstname"' : "£b£",
'"fullAddress"' : "£c£"
}
}
```

* replace all value by key in javascript

```js
 {"$schema":"http://json-schema.org/draft-04/schema#","title":"Product","description":"A product from Acme's catalog","type":"object","products":[{"id":{"description":"The unique identifier for a product","type":"integer"},"name":{"description":"Name of the product","type":"string"},"price":{"type":"number","minimum":0,"exclusiveMinimum":true},"tags":{"type":"array","items":{"type":"string"},"minItems":1,"uniqueItems":true}},{"id":{"description":"The unique identifier for a product","type":"integer"},"name":{"description":"Name of the product","type":"string"},"price":{"type":"number","minimum":0,"exclusiveMinimum":true},"tags":{"type":"array","items":{"type":"string"},"minItems":1,"uniqueItems":true}}],"required":["id","name","price"]}
 ```

###Results

```
COMPRESS
initial size : 1065 c
compressed size : 469 c
win : 596 c
win : 56.0%
DECOMPRESS
execution : 17 milliseconds
```

License
----

MIT
