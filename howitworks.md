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

* save the map corresponding to this compressed json in localStorage

```js
{
'"id"' : "£a£",
'"firstname"' : "£b£",
'"fullAddress"' : "£c£"
}
```

####Decompress

* get the map corresponding to this compressed json in localStorage

```js
{
'"id"' : "£a£",
'"firstname"' : "£b£",
'"fullAddress"' : "£c£"
}
```

* replace all value by key in javascript

```js
 {"$schema":"http://json-schema.org/draft-04/schema#","title":"Product","description":"A product from Acme's catalog","type":"object","products":[{"id":{"description":"The unique identifier for a product","type":"integer"},"name":{"description":"Name of the product","type":"string"},"price":{"type":"number","minimum":0,"exclusiveMinimum":true},"tags":{"type":"array","items":{"type":"string"},"minItems":1,"uniqueItems":true}},{"id":{"description":"The unique identifier for a product","type":"integer"},"name":{"description":"Name of the product","type":"string"},"price":{"type":"number","minimum":0,"exclusiveMinimum":true},"tags":{"type":"array","items":{"type":"string"},"minItems":1,"uniqueItems":true}}],"required":["id","name","price"]}
```
