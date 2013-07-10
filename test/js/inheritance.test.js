module('underscore extention');

test('extended underscore', function(){
    ok(_.inherit, 'Underscore extended');
});

test('inherit returns destination prototype', function(){
    var objectPrototype = {};
    strictEqual(_.inherit(objectPrototype, {}), objectPrototype, "Return object prototype as result");
});

test('inherit returns destination prototype for functions', function(){
    function A() {}
    var originPrototype = A.prototype;
    A.prototype = _.inherit(A, {});
    
    strictEqual(A.prototype, originPrototype, "Prototype can not be replaced");

});


module('Anonymous Definition');

test('single Annonymous parent', function(){
    function A() {
        
    }
    A.prototype.fooA = function(){};
    var fooA = A.prototype.fooA;
    var originPrototypeA = A.prototype;
    
    var Defintion = {
        fooX : function(){}
    };
    _.inherit(A, Defintion);
    
    var object = new A();
    
    strictEqual(A.prototype, originPrototypeA, "Prototype object isn't replaced");
    strictEqual(A.prototype.fooX, Defintion.fooX, 'Object prototype inherit attribute');
    strictEqual(A.prototype.fooA, fooA, 'Own function is still in prototype');
    strictEqual(object.fooX, Defintion.fooX, 'Object inherit attribute');
    
});

module('Object Inheritance');

test('Inherit Single Object', function(){
    function A() {}
    A.prototype.fooA = function(){};
    
    function B(){}
    B.prototype.fooB = function(){};
    var fooB = B.prototype.fooB;
    var originPrototypeB = B.prototype
    
    _.inherit(B, A);
    
    var object = new B();
    
    strictEqual(B.prototype, originPrototypeB, "Prototype object isn't replaced");
    strictEqual(B.prototype.fooB, fooB, 'Own function is still in prototype');
    strictEqual(B.prototype.fooA, A.prototype.fooA, 'Object prototype inherit attribute');
    strictEqual(object.fooA, A.prototype.fooA, 'Object inherit attribute from A');
    strictEqual(object.fooA, B.prototype.fooA, 'Object inherit attribute from A. But it is stored in prototype of B');
});


test('Inherit Two Objects', function(){
    function A() {}
    A.prototype.fooA = function(){};
    
    function B(){}
    B.prototype.fooB = function(){};

    function C(){}
    C.prototype.fooC = function(){};
    var fooC = C.prototype.fooC;
    var originPrototypeC = C.prototype;
    
    _.inherit(C, B, A);
    
    var object = new C();
    
    strictEqual(C.prototype, originPrototypeC, "Prototype object isn't replaced");
    strictEqual(C.prototype.fooC, fooC, 'Own function is still in prototype');
    strictEqual(C.prototype.fooA, A.prototype.fooA, 'Object prototype inherit attribute from A');
    strictEqual(C.prototype.fooB, B.prototype.fooB, 'Object prototype inherit attribute from B');
    
    strictEqual(object.fooA, A.prototype.fooA, 'Object inherit attribute from A');
    strictEqual(object.fooB, B.prototype.fooB, 'Object inherit attribute from B');
    strictEqual(object.fooA, C.prototype.fooA, 'Object inherit attribute from A. But it is stored in prototype of C');
    strictEqual(object.fooB, C.prototype.fooB, 'Object inherit attribute from B. But it is stored in prototype of C');
});


test('Inherit Object and anonymous defintion', function(){
    function A() {}
    A.prototype.fooA = function(){};
    
    var Defintion = {
        fooX : function(){}
    };

    function C(){}
    C.prototype.fooC = function(){};
    var fooC = C.prototype.fooC;
    var originPrototypeC = C.prototype;
    
    _.inherit(C, A, Defintion);
    
    var object = new C();
    
    strictEqual(C.prototype, originPrototypeC, "Prototype object isn't replaced");
    strictEqual(C.prototype.fooC, fooC, 'Own function is still in prototype');
    strictEqual(C.prototype.fooA, A.prototype.fooA, 'Object prototype inherit attribute from A');
    strictEqual(C.prototype.fooX, Defintion.fooX, 'Object prototype inherit attribute');
    
    strictEqual(object.fooA, A.prototype.fooA, 'Object inherit attribute from A');
    strictEqual(object.fooX, Defintion.fooX, 'Object inherit attribute ');
    strictEqual(object.fooA, C.prototype.fooA, 'Object inherit attribute from A. But it is stored in prototype of C');
});


module("Attribute overriding");

test("Destination can't be override", function(){
    function A() {};
    A.prototype.foo = function(){};
    var originFoo = A.prototype.foo;
    
    var Definition = {
        foo : function(){}
    };
    
    _.inherit(A, Definition);
    strictEqual(A.prototype.foo, originFoo, 'Origin method can not be overriden');
});

test("Override by anonymous definition", function() {
    function A() {}
    A.prototype.foo = function(){};
    
    var Definition = {
        foo: function(){}
    };
    function B(){}
    
    _.inherit(B, A, Definition);
    
    strictEqual(B.prototype.foo, Definition.foo, 'Attribute is overrded');
    
});

test("Override", function() {
    function A() {}
    A.prototype.foo = function(){};
    
    function B() {}
    B.prototype.foo = function(){};
    
    function C(){}
    
    _.inherit(C, B, A);
    
    strictEqual(C.prototype.foo, A.prototype.foo, 'Attribute must be overrided by last prototype');
});

module("Super implenetation");

test("Get super implenetation by index", function(){
    function A(){};
    A.prototype.foo = function(){return 'A.foo'};
    
    function B(){};
    B.prototype.foo = function(){return 'B.foo'};
    
    function C(){};
    
    _.inherit(C, B, A, {
        foo: function(){return 'foo'}
    });
    
    var object = new C();
    
    equal(object.foo(), 'foo', 'anonymous super is last');
    
    equal(C.prototype.supers[0].foo.call(object),'B.foo', 'B is first super');
    equal(C.prototype.supers[1].foo.call(object),'A.foo', 'A is second super');
    equal(C.prototype.supers[2].foo.call(object),'foo', 'Anonymous implementation is last');
    
});

test("Get super by name", function(){
    function A(){};
    A.prototype.foo = function(){return 'A.foo'};
    
    function B(){};
    B.prototype.foo = function(){return 'B.foo'};
    
    function C(){};
    
    _.inherit(C, B, A);
    
    var object = new C();
    
    equal('A.foo', object.foo(), 'A is last super');
    
    equal(C.prototype.B.foo.call(object),'B.foo', 'B is first super');
    equal(C.prototype.A.foo.call(object),'A.foo', 'A is second super');
    
});
