module.exports = function(dependencies) {
    const client = dependencies['redis'];

    client.on('ready', function () {
        console.log('Redis is now ready');
    });

    client.on('error', function (err) {
        console.log('Redis is dead: ' + err);
    });


    const save_user_info = function(pub_key, info_key, info_val) {
        return new Promise(function(resolve, reject){
            client.hset(pub_key, info_key, info_val, function(err, reply){
               resolve(reply);
            });
        });
    };

    const get_user_info = function(pub_key) {
        return new Promise(function(resolve, reject){
            client.hgetall(pub_key, function(err,reply){
                resolve(reply);
            });
        });
    };

    return {
        save_user_info,
        get_user_info,
    };
};