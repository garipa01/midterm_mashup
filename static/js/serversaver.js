"use strict";
class serversaver {
    constructor(model, key){
        this.key = key
        let self = this
        model.subscribe(function(list, key){
            self.save(list)
        })
        console.log("get request")
        fetch('/getlist')
        .then(function(response){return response.text()})
            .then(function(text){
                return JSON.parse(text)    
            }).then(function(list){self.restoreList(list,model)})
    }
    save(list){
        let config = {}
        config.method = "POST"
        config.body = JSON.stringify(list.Items)
        config.headers = {"Content-Type":"application/json", "Accept" : "application/json"}
        fetch("/savelist", config)
        .then(function(response){return response.status})
        .then(function(status){
            if(status != 200){
                alert("List not saved!")
            }
        })
    }


    restoreList(list, model){
        if(list != null)        
            var friendict = JSON.parse(list)
            console.log(friendict)
            for(let i = 0; i < friendict.length; i++){
                var friend = friendict[i]
                console.log(friend)
                var restoredfriend = new Friend(friend.first_name, friend.last_name, friend.picture, friend.intrests)
                model.addItem(restoredfriend)
            }
        }
}