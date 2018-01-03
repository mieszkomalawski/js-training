(function(global, $){
    var Greetr = function(firstname, lastname, language) {
        return new Greetr.init(firstname, lastname, language);
    }
    
    // these vars are private 
    var supportedLanges = ['en', 'es'];
    
    var greetings = {
        en: "Hello",
        es: "Hola"
    };
    
    var formalGreetings = {
        en: "Greetings",
        es: "Saludos"
    };
    
    //methods inside protorype are public
    Greetr.prototype = {
        fullname: function() {
            return this.firstName + ' ' + this.lastName;
        },
        
        validate: function() {
            if(supportedLanges.indexOf(this.language) === -1) {
                throw "Invalid language";
            }
        },
        
        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },
        
        formalGreeting: function() {
            return formalGreetings[this.language] + ' ' + this.firstName + '!';
        },
        
        greet: function(formal) {
            var msg;
            
            if(formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }
            
            if(console) {
                console.log(msg);
            }
            
            return this;
        },
        
        setLang: function(newLang) {
            this.language = newLang;
            this.validate();
            return this;
        }
    
    };
    
    Greetr.init = function(firstname, lastname, language){
        var self = this;
        self.firstName = firstname || '';
        self.lastName = lastname || '';
        self.language = language || 'en';
    }
    
    Greetr.init.prototype = Greetr.prototype;
    
    global.Greetr = global.G$ = Greetr;
}(window, $))