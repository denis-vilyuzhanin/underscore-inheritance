
function DANDSOFT_ORG_UNDERSCORE_INHERITANCE(_) {
    var slice = Array.prototype.slice;
    var each = _.each;
        
    function inherit(destination) {
        var objectPrototype = getObjectPrototype(destination);
        var inheritedAttributes = {};
        var supers = [];
        each(slice.call(arguments, 1), function(source) {
            if (source) {
                var sourcePrototype = getObjectPrototype(source);
                supers.push(sourcePrototype);
                for (var prop in sourcePrototype) {
                    if (!(prop in objectPrototype)) {
                        inheritedAttributes[prop] = sourcePrototype[prop];
                    }
                }
                if (_.isFunction(source, sourcePrototype)) {
                    inheritedAttributes[getFunctionName(source)] = sourcePrototype;
                }
                
            }
        });  
        _.extend(objectPrototype, inheritedAttributes);
        objectPrototype.supers = supers;
        return objectPrototype;
    }
    
    function getObjectPrototype(object) {
        return _.isFunction(object) ? object.prototype : object;
    }
    
    function getFunctionName(func) {
        if (func.name) {
            return func.name;
        }
        return func.toString().match(/^function\s*([^\s(]+)/)[1];
    }
    
    _.mixin({
        inherit : inherit
    });    
}

DANDSOFT_ORG_UNDERSCORE_INHERITANCE(_);