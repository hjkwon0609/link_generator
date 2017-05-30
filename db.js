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

    const link_created_for_user = function(pub_key) {
        return new Promise(function(resolve, reject){
            client.hget(pub_key, 'link_generated', function(err, reply){
                var count = reply;
                if (count === null){
                    count = 1;
                } else {
                    count++;
                }
                client.hset(pub_key, 'link_generated', count, function(err, reply){
                   resolve(reply);
                });
            });
        });
    };

    const get_num_links_per_user = function(pub_key) {
        return new Promise(function(resolve, reject){
            client.hget(pub_key, 'link_generated', function(err, reply){
                var count = reply;
                if (count === null){
                    count = 0;
                }
                resolve(count);
            });
        });
    };

    const link_viewed = function(pub_key) {
        return new Promise(function(resolve, reject){
            client.hget(pub_key, 'link_viewed', function(err, reply){
                var count = reply;
                if (count === null){
                    count = 1;
                } else {
                    count++;
                }
                client.hset(pub_key, 'link_viewed', count, function(err, reply){
                    resolve(reply);
                });
            });
        });
    };

    const get_num_links_viewed_per_user = function(pub_key) {
        return new Promise(function(resolve, reject){
            client.hget(pub_key, 'link_viewed', function(err, reply){
                var count = reply;
                if (count === null){
                    count = 0;
                }
                resolve(count);
            });
        });
    };

    return {
        save_user_info,
        get_user_info,
        link_created_for_user,
        get_num_links_per_user,
        link_viewed,
        get_num_links_viewed_per_user,
    };
};