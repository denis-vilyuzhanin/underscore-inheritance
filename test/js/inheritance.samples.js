
module('Samples');


test("simple object definition", function(){
    
    function A(){}
    A.prototype = _.inherit({
        foo: function(){return 'foo'}
    });
    
    var object = new A();
    
    equal(object.foo(), 'foo');
});


test("Super initialization.", function(){
    function A() {
        this.a = "A.a";
    }
    
    function B() {
        this.b = 'B.b';
    }
    
    function C() {
        A.call(this);
        B.call(this);
        this.c = 'C.c';
    }
    
    C.prototype = _.inherit(C, A, B);
    
    var object = new C();
    
    equal(object.a, 'A.a');
    equal(object.b, 'B.b');
    equal(object.c, 'C.c');
});

test("Wrapping super method", function(){
    function A() {
        
    }
    _.inherit(A, {
        foo: function(){return 'A'}
    });
    
    function B(){
        A.call(this);       
    }
    _.inherit(B, A, {
        foo : function() {
            return "[" + this.A.foo.call(this) + ']';
        }
    });
    
    var object = new B();
    equal(object.foo(), '[A]');
});

