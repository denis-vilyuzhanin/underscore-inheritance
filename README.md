#Inheritance extention for underscoreJS

You want build your application in classic OOP way or you don't like prototyping approach.
So this extension helps you to do that.

Extension makes similars thing that `_.extend` function do. But it is more advanced.
It supports different rules which give you more control in building object models.

It has compact syntax and you don't need to get prototype of each object from which you are inheriting your object. 
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

And it is easy extends and override.

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


 

