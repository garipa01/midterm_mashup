'use strict';
class Subject {
 
    constructor() {
        this.handlers = []
    }

    subscribe(fn) {
            this.handlers.push(fn);
        }
     
    unsubscribe(fn) {
        this.handlers = this.handlers.filter(
            function(item) {
                if (item !== fn) {
                    return item;
                }
            }
        );
    }
     
    publish(msg, someobj) {
        var scope = someobj || window;
        for (let fn of this.handlers) {
            fn(scope, msg)
        }
    }
}

class Friend extends Subject{
    constructor(first_name,last_name, picture, intrests){
        super()
        this.first_name = first_name
        this.last_name = last_name
        this.picture = picture
        this.intrests = intrests
    }
}

class FriendList extends Subject{
    constructor(){
        super()
        this.Friends = []
    }

    addItem(it) {
        this.Friends.push(it);
        let self = this;
        it.subscribe(function(a,b) {
            self.publish('adding_friend', self)
        });
        this.publish('newitem', this)
    }

    removeItem(it) {
        let idx = this.Friends.indexOf(it);
        if(idx > -1) {
            let it = this.Friends.splice(idx, 1)
        }
        this.publish('removed_friend', this)
    }
}