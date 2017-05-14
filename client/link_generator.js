'use strict';


// Create link that has info
var AP = 500;

var create_link = function(link_owner_pub_key, pub_key, prv_key) {
    API.get_user_object(link_owner_pub_key, function(user) {
        console.log("<link_generator.js>");
        var user_obj = user.value;
        console.log(user_obj.info_loc);
        var info_location = user_obj.info_loc;

        var keys = Object.keys(info_location);

        var ops = [];

        for (var i = 0; i < keys.length; i++) {
            var location = info_location[keys[i]];
            var block_num = location[0];
            var txn_hash = location[1];

            ops.push(API.transaction.create_request_txn(prv_key, pub_key, block_num, txn_hash, link_owner_pub_key));
        }

        Promise.all(ops).then(function(results) {

        });


        // var results = User.process_serialized_txns_for_render(User.obj, prv_key);
        // var locations = [];
        // for (let i = 0; i < results.length; i++) {
        //     console.log(results[i]);
        //
        // }

    });
};

var request_link = function(block_num, txn_sig, identity) {
    console.log(block_num);
}


