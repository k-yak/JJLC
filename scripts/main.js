(function (jjlc) {
    "use strict";
    
    var tst_s = '{' +
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
    
    var l = tst_s.length;
    var start = new Date().getTime();
    console.log('COMPRESS');
    var compressed = JJLC.setItem('testStr', tst_s);

    var dict = JSON.stringify(JJLC.getDict('testStr'));    
    var size = compressed.length + dict.length;

    console.log('initial size : ' + l + ' c');
    console.log('compressed size : ' + size + ' c');
    console.log('win : ' + (l - size) + ' c');
    console.log('win : ' + ((l - size) / l * 100).toPrecision(3) + '%');
    console.log('DECOMPRESS');
    
    var decompressed = JJLC.getItem('testStr');
    var end = new Date().getTime();
    var time = end - start;
    console.log('execution : ' + time + ' milliseconds');
    
    //console.log(decompressed);
}());