(function (root) {
    "use strict";
    var regex = /\"[a-zA-Z0-9]*\"/g,
        separator = '£',
        seed = 0xABCD,
        dicts = {};
    
    function sortedByValue(obj) {
        var tuples = [],
            newObj = {},
            key;

        for (key in obj) { tuples.push([key, obj[key]]); }
        tuples.sort(function (a, b) { return b[1] - a[1]; });
        for (key in tuples) { newObj[tuples[key][0]] = tuples[key][1]; }
        return newObj;
    }
    
    function incChar(s) {
        var c = s[s.length - 1],
            p = s.substring(0, s.length - 1),
            nextId;
                
        if (typeof c === 'undefined') {
            nextId = 'a';
        } else if (c === 'z') {
            nextId = 'A';
        } else if (c === 'Z') {
            nextId = 'a';
            if (p !== '') {
                p = incChar(p);
            } else {
                p = 'a';
            }
        } else {
            nextId = String.fromCharCode(c.charCodeAt(0) + 1);
        }
        c = nextId;
        return p + c;
    }
    
    function createDict(s) {
        var dict = {},
            curId = '',
            m = s.match(regex),
            key,
            sbv;
        
        for (key in m) {
            if (m[key].length > (curId.length + 2)) {
                if (typeof dict[m[key]] !== 'undefined') {
                    dict[m[key]] += 1;
                } else {
                    dict[m[key]] = 0;
                }
            }
        }
        sbv = sortedByValue(dict);
        for (key in sbv) {
            curId = incChar(curId);
            sbv[key] = separator + curId + separator;
        }
        return sbv;
    }
    
    function compress(v, dict) {
        var id,
            re;
        for (id in dict) {
            re = new RegExp(id, 'g');
            v = v.replace(re, dict[id]);
        }
        return v;
    }

    function decompress(v, dict) {
        var id,
            re;
        for (id in dict) {
            re = new RegExp(dict[id], 'g');
            v = v.replace(re, id);
        }
        return v;
    }
    
    function JJLC() {
        this.compress = function (s, beautify) {
            var dict,
                res,
                h,
                sObject;
            
            if (typeof beautify === 'undefined') {
                sObject = JSON.parse(s);
                s = JSON.stringify(sObject);
            }
            
            dict = createDict(s);
            res = compress(s, dict);
            h = XXH(res, seed).toString(16);

            dicts[h] = dict;
            return res;
        };
        
        this.decompress = function (s) {
            var h = XXH(s, seed).toString(16);
            return decompress(s, dicts[h]);
        };
    }
    
    if (typeof define !== 'undefined' && define.amd) {
        // AMD / RequireJS
        define([], function () {
            return new JJLC();
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        // Node.js
        module.exports = new JJLC();
    } else {
        // Browser
        root.JJLC = new JJLC();
    }

}(this));