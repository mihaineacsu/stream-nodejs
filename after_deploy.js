var models = require('./models'),
    fs = require('fs'),
    async = require('async');

var User = models.User,
    Item = models.Item,
    Pin = models.Pin,
    Follow = models.Follow;

module.exports = function(){
    async.series([
        function(cb){
            User.create({username: 'admin', avatar_url: 'admin.jpg'}, function(){
                User.create({username: 'Andrew', avatar_url: 'https://github.com/identicons/jasonlong.png'});
                User.create({username: 'Sergey', avatar_url: 'https://avatars0.githubusercontent.com/u/4436860?v=3&s=96'});
                User.create({username: 'Thomas', avatar_url: 'https://avatars0.githubusercontent.com/u/125464?v=3&s=96'});
                cb(null);
            });
        },
        function(cb){
           var mediaFiles = fs.readdirSync('./media/');
           mediaFiles.forEach(function(fileName){
                Item.create({user: 0, image_url: fileName}, function(err, newArticle){
                    if (err){
                        return console.log(err);
                    }
                });
            });
            cb(null);
        },
        function(cb){
            Pin.as_activity({user: 1, item: 1});
            Pin.as_activity({user: 1, item: 2});
            Pin.as_activity({user: 1, item: 3});
            Pin.as_activity({user: 1, item: 4});
            Pin.as_activity({user: 2, item: 6});
            Pin.as_activity({user: 1, item: 5});
            Pin.as_activity({user: 1, item: 7});
            Pin.as_activity({user: 3, item: 9});
            Pin.as_activity({user: 3, item: 8});
            Pin.as_activity({user: 3, item: 4});
            cb(null);
        },
        function(cb){
            Follow.as_activity({user: 1, target: 2});
            Follow.as_activity({user: 1, target: 3});
            Follow.as_activity({user: 2, target: 1});
            Follow.as_activity({user: 2, target: 3});
        }
    ]);
};
