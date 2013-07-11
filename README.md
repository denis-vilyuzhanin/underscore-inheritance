Inheritance for underscore.js
======================================
You are not satisfied by standart `_.extend` function from underscore.js. You don't like prototyping approach and 
you want to build your application in classic OOP way. 
So this extension for underscore.js helps you to do this.

Extension makes similars thing that `_.extend` function do. But it is more advanced.
It supports different rules which give you more control in building object models.
Like:
* Parent never overrides methods of child. This is possible when you use `_.extend` function
* It copies all methods into prototype of new object. So changing in parents doesn't affect children.
* It stores references to parent prototypes. So you always can get overridden implementation. if you even have multiple inheritance.

It has compact syntax and you don't need to get prototype of each object you are inheriting your object from. 
You can use it constructors. 
Look at this. This code inherits object Child from Parent1 and Parent2
``````
_.inherit(Child, Parent1, Parent2);
``````
It is simple, isn't it. 

It is simple define new objects

`````
function Person(name) {
    this.name = name;
}
_.inherit(Person, {
    sayHello: function(){return "Hello. I'm " + this.name + ".";}
});
var person = new Person("Denis");
alert(person.sayHello());
`````````

And it is easy to extend and to override.

````````
function Tourist(name, country) {
    Person.call(this, name);
    this.country = countery;
}
_.inherit(Tourist, Person, {
    sayHello: function(){
        return this.Person.sayHello.call(this) + " I'm from " + this.country;
    }
});
var tourist = new Tourist("Denis", "Ukraine");
alert(person.sayHello());
`````````

