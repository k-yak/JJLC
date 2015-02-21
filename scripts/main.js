(function (jjlc) {
    "use strict";
    
    var testString = '{' +
        '"$schema": "http://json-schema.org/draft-04/schema#",' +
        '"title": "Product",'  +
        '"description": "A product from Acme\'s catalog",'  +
        '"type": "object",'  +
        '"products": [{'  +
        '    "id": {'  +
        '        "description": "The unique identifier for a product",'  +
        '        "type": "integer"'  +
        '    },'  +
        '    "name": {'  +
        '        "description": "Name of the product",'  +
        '        "type": "string"'  +
        '    },'  +
        '    "price": {'  +
        '        "type": "number",'  +
        '        "minimum": 0,'  +
        '        "exclusiveMinimum": true'  +
        '    },'  +
        '    "tags": {'  +
        '        "type": "array",'  +
        '        "items": {'  +
        '            "type": "string"'  +
        '        },'  +
        '        "minItems": 1,'  +
        '        "uniqueItems": true'  +
        '    }'  +
        '},{'  +
        '    "id": {'  +
        '        "description": "The unique identifier for a product",'  +
        '        "type": "integer"'  +
        '    },'  +
        '    "name": {'  +
        '        "description": "Name of the product",'  +
        '        "type": "string"'  +
        '    },'  +
        '    "price": {'  +
        '        "type": "number",'  +
        '        "minimum": 0,'  +
        '        "exclusiveMinimum": true'  +
        '    },'  +
        '    "tags": {'  +
        '        "type": "array",'  +
        '        "items": {'  +
        '            "type": "string"'  +
        '        },'  +
        '        "minItems": 1,'  +
        '        "uniqueItems": true'  +
        '    }'  +
        '}],'  +
        '"required": ["id", "name", "price"]'  +
        '}';
    
    var l = testString.length;
    var start = new Date().getTime();
    console.log('COMPRESS');
    var compressed = JJLC.compress(testString);;

    console.log('initial size : ' + l);
    console.log('compressed size : ' + compressed.length);
    console.log('win : ' + (l - compressed.length) + ' car');
    console.log('win : ' + ((l - compressed.length) / l * 100).toPrecision(3) + '%');

    console.log('DECOMPRESS');

    var decompressed = JJLC.decompress(compressed);
    var end = new Date().getTime();
    var time = end - start;
    
    console.log(decompressed);
    console.log('execution : ' + time + ' milliseconds');
}());