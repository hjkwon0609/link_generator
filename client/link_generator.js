'use strict';

// Create link that has info

var create_link = function(pub_key, prv_key) {
    API.get_user_object(pub_key, function(user) {
        console.log("<link_generator.js>");
        let user_obj = user.value;
        console.log(user_obj);
        console.log(Object.keys(user_obj.info_loc));


        // let keys = Object.keys(info_locations);
        // for (let i = 0; i < keys.length; i++) {
        //     console.log("Key: " + keys[i]);
        // }
        // var results = User.process_serialized_txns_for_render(User.obj, prv_key);
        // var locations = [];
        // for (let i = 0; i < results.length; i++) {
        //     console.log(results[i]);
        //
        // }

    });
};