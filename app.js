//strict mode?
//"use strict";
function c() {
    //outer context is global
    console.log(myVar);
}

function a() {
    //outer context of b i as 
    function b() {
        console.log(myVar);
    }
    var myVar = 2;
    b();
}

function hello(name) {
    name = name || 'No name provided';
    console.log('Hello ' + name);
}

function a() {
    //points to global window object
    console.log(this);//
    //modify global state
    this.foo = "bar"
}


var myVar = 1;
a();
console.log(foo);
hello();

//fucntion can have properties - functions are objects
hello.foo = 'bar';

//objects are passed by reference always
//primitives are passed by value always
var obj1 = new Object();
var obj2 = {
    foo: function() {
    //refers to this object
        console.log();
    }
};

//objects can be also made this way
function Person() {
    this.firstName= "miechu";
    this.lastName= "mala";
}

//add method to all object of this type - saves memory
Person.prototype.getFullName = function() {
    console.log(this.firstName + " " + this.lastName);
}

//creates new object from function constructor
var miechu = new Person();

//or this 

var Person = {
    firstname: "default",
    lastname: "default",
    greet: function() {
        console.log("Hi " + this.firstname + " " + this.lastname);
    }
}

//Person is miechu2 prototype
var miechu2 = Object.create(Person);

//immediatelly invoked function
//uzywane aby izolować context - np: w bibliotekach
(
    function(name) {
        console.log('Hello ' + name);
    }('MIechu')
)


//closue has access to variables in outer env

function greet(whattosay) {
    //closure has access to outer var
    return function(name) {
        console.log(whattosay + name);
    }
} 

function something() {
    arr = [];
    for(var i = 0; i < 3; i++) {
        arr.push(function(){
            //i will be always 3 becouse it is evaluated when outer function is done
            console.log(i);
        });
    }
    
    return arr;
}

//binding - default function param
function limiterSimplified(limit) {
    return function(limit, item) {
        return item > limit;
        //bind first param
    }.bind(this, limit);
}

var arr = [1,2,3];

function mapArr(arr, fn) {
    var newArr = [];
    for(var i = 0; i < arr.length; i++) {
        newArr.push(
            fn(arr[i])
        );
    }
    
    return newArr;

}



var result = mapArr(arr, limiterSimplified(1));
console.log(result);

