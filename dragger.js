//immediatelly invoked function, izolacja kontekstu, taki "namespace"
//@todo drop in columns https://stackoverflow.com/questions/4574978/jquery-ui-dropping-elements-only-in-special-areas
(function(global, jQuery){
    "use strict"
    //function constructor - po prostu funkcja, buduje obiekty
    var Kanban = function() {
        //tutaj this odnosi się do nowo tworzonego obiektu, te property maja osobne miesce dla kazdej instancji obiektu
        this.onItemUpdate= function(){};
        this.onItemCreate= function(){};
        this.onItemRemove= function(){};
        this.addButtonSelector= "";
    }
    //dostęp globalny
    global.Kanban = Kanban;
    
    //"dziedziczone" props i metody
    Kanban.prototype = {
        //te property i metody są w prototype ktory jest wspoldzielony miedzy instancjami obiektu
        //jak tu coś zmienisz to dotknie to wszystkie obiekty tej "klasy", siedzi w pamięci tylko raz
        todoColumnSelector: "#todo .body",
            
        //metodki
        attachAddButton: function(selector) {
            //jQuery jest tu dostępne dzięki domknięciu
            this.addButtonSelector = jQuery(selector);
            //workaround for click function
            var self = this;
            this.addButtonSelector.click(function(){
                console.log('clicked');
                //here this is points to clicked object
                //console.log(this);
                self.createNewItem();
            })
        },
        createNewItem: function() {
            var html = '<div class="item" ><div class="remove" >X</div><textarea class="item-content">Some content</textarea></div>';
            var addedItem = jQuery(this.todoColumnSelector).append(html);
            addedItem.find('.item-content').change(this.updateItemContent);
            addedItem.find('.remove').click(this.removeItem);
            this.onItemCreate();
        },
        
        updateItemContent: function(){
                console.log('item content changed');
                if(typeof this.onItemUpdate == "function") {
                     this.onItemUpdate();
                }
               
        },
        
        removeItem: function(){
            //this points to clicked item
            jQuery(this).parent('.item').remove();
            if(typeof this.onItemRemove == "function") {
                this.onItemRemove();    
            }
            
        },
    
        setOnItemUpdate: function(callback) {
            if(typeof callback != 'function') {
                throw Error('callback must be a function');
            }
            this.onItemUpdate = callback;
        },
            
        setOnItemCreate: function(callback) {
            if(typeof callback != 'function') {
                throw Error('callback must be a function');
            }
            this.onItemCreate = callback;
        },
            
        setOnItemRemove: function(callback) {
            if(typeof callback != 'function') {
                throw Error('callback must be a function');
            }
            this.onItemRemove = callback;
        }
    }
}(window == undefined ? this : window, $))

var kanban = new Kanban();
kanban.attachAddButton('#add-item');