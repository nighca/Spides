exports.jsonToString = function(obj){  
    return JSON.stringify(obj);
};

exports.stringToJSON = function(str){  
    return JSON.parse(str);  
};

function isArray(obj) {   
  return Object.prototype.toString.call(obj) === '[object Array]';    
}

function parse(obj){
    if(typeof obj !== "object"){
        console.log("*", obj);
        return obj.toString();
    }

    var result = '';

    if(isArray(obj)){
        for(var i=0;i<obj.length;i++){
            result += parse(obj[i]);
        }
        return result;
    }

    result += '<' + (obj.tagName ? obj.tagName : 'div') + ' ';
    for (var attrName in obj) {
        if (attrName !== 'tagName' && attrName !== 'content') {
            result += attrName + '="' + obj[attrName] + '" ';
        }
    }
    result += '>\n';
    result += obj.content ? parse(obj.content) : '';
    result += '\n</' + (obj.tagName ? obj.tagName : 'div') + '>\n';

    return result;
}

exports.jsonToHtml = function(obj){
    return parse(obj);
}