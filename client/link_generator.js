'use strict';


// Create link that has info
var AP = 500;

// var create_link = function(link_owner_pub_key, pub_key, prv_key, identity) {
//     API.get_user_object(link_owner_pub_key, function(user) {
//         console.log("<link_generator.js>");
//         var user_obj = user.value;
//         console.log(user_obj.info_loc);
//         var info_location = user_obj.info_loc;
//
//         var keys = Object.keys(info_location);
//
//
//
//         var location = info_location[identity];
//         var block_num = location[0];
//         var txn_hash = location[1];
//
//         return API.transaction.create_request_txn(prv_key, pub_key, block_num, txn_hash, link_owner_pub_key);
//     });
// };

var request_link = function(block_num, txn_sig, identity, req_info) {
    var prv_key = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApXIIXmd6bMHiK7TtgD+l\nBMPUOKaz8hKGfAvPdPCUgTXd+i4MXjLrrrDgKu8ZhE7wxjI4v49Ldy/gnx4lkMSz\nEHTcFVj6zF8lMvcioyypTKH1hqyvH9KNkjCJS+ibx3vhHCdDiz1y09x9ju7+L8uI\n6pOu/EAC8S6YuLli+Relg+VQmhvxjyD0iFeBDtM2bZiHg5aMOqo9Oj09AxhSEhy+\nbyoO/cnutsYcOviu4zIu3kkHE/F+tfpqnfkG6afEmYsL9O5/IV5vRGnkarYDnXhC\nz6v8KZU98Gq8BEHbR4/IPZ1mJelHQ8mluUYDN0sMKUE55IlQNkDX/3cX+52A+Hio\nZwIDAQAB\n-----END PUBLIC KEY-----";
    var pub_key = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQClcgheZ3psweIr\ntO2AP6UEw9Q4prPyEoZ8C8908JSBNd36LgxeMuuusOAq7xmETvDGMji/j0t3L+Cf\nHiWQxLMQdNwVWPrMXyUy9yKjLKlMofWGrK8f0o2SMIlL6JvHe+EcJ0OLPXLT3H2O\n7v4vy4jqk678QALxLpi4uWL5F6WD5VCaG/GPIPSIV4EO0zZtmIeDlow6qj06PT0D\nGFISHL5vKg79ye62xhw6+K7jMi7eSQcT8X61+mqd+Qbpp8SZiwv07n8hXm9EaeRq\ntgOdeELPq/wplT3warwEQdtHj8g9nWYl6UdDyaW5RgM3SwwpQTnkiVA2QNf/dxf7\nnYD4eKhnAgMBAAECggEAUOdikEep5mUpZJYlTgHRgHMC5HEgrc/BVAeye0zqUgU1\nd5HtGmNsPRDhjh0+LSUtOL52YbaBANe40Ba95/1IU1PSC95nRmmAl1ui5IiCgabx\nmdn4CWe9My/o8+Xbx8EcY9gPf5ec/11jSPI1+sldOtjdSR1EUwymQi7l50lY9xXx\nEv0/O4h6ilatOmcqG4xaNELZE69FXwzR0q87rpi1EzxVXh51NooUnuNgB2v2cIiF\nXZqNnjd7IAAufa6Se4qzFPHgOrGfUaLKmYxKJR7p1tbRw1GbJ1U4Byoam41NPEkb\nrRaGR13LWWFCzMIXc6H4TEwxmzyzS645ZLAVbs9yAQKBgQDsNTXAgZhx86VzdtfV\ndjyFTXeQyLYxDeyK3Qw4CBNOi+te1TZ2Wpkj+wSsvWDnHMbcPVLR3aehQrTWA0nl\nM4ip/EMMFMls/tD3R2XWKmnrZSGv++NqWWsAJ/zqIf6Z1EMa5Qg/9ye4VbK7Hx1M\nobZXLACh2syLsuxJdRs29ml2dwKBgQCzTu34XRihGsG2jDBBYD0IeBf5WReBg7f1\nQH7CQJNw0JLYValtM2kUClZt7oIvHewSwvAgkbuDxN+eMWnipATScgxJaTpwzM06\n3+c3qa+EGmYv2hTDKLKK8FFz+i1K9skq/wpIoFB94gE6Ld32UEELgWmj8gamdvZh\ne1Bc7ripkQKBgGgUBgw9zjsfnV5kFjQjdgVSngV4uvagaQLC5ZhmzoMEmgBeODIs\nN2AoQeYPR/xtrJ3sk2qPnUYsC1xldJD+hRBJbA2NtzdEjDT5C8EzTRqApDhT59+7\naK9X71QHCJUldzAJjPoKYEET2b4jtphGhP6iD+FBdHF1tDGl3Qj5yHx/AoGARKdy\n/EaA+KZrBz8z9sQnekepPkK7ek55sADKyAu7qFVj9EsQPQyTLiYrI5pP5ER7sE9N\na9sAxhoqWMKovSt54S3jwHP2+VuhNOqn+CsTVexZtfa1PmglvIb5WQOwNeS576mJ\nQXeIejp/p8wKEZZ24TXiwfAYVcJ04aw6f+qzb9ECgYANQg+BpM2ZBqrO0nCSnvrr\ne7/ooUWuppM/+1wAPZGNjm6l8cUAWclhNMlHG8ZLIeT8lwn+/q0mW52rMtbcMGdE\nDP269SUyV6l/oEPmtmxYJh0TObdqODy/rl/9qePHhwp+RrYOFphqTF7rHZ72lg6d\nkZzua/Y0HcVV7vTX0JIQrg==\n-----END PRIVATE KEY-----";
    console.log(prv_key, pub_key, block_num, txn_sig, API.user.get_pub_key());
    API.transaction.create_request_txn(prv_key, pub_key, block_num, txn_sig, API.user.get_pub_key()).then(function(result) {
        console.log("request_link.........................");
        console.log(result);
        var b = result["b"];
        var req_txn = result['req_txn'];
        var serialized_request_txn = result['serialized_request_txn'];

        console.log(b);
        console.log(req_txn);
        console.log(serialized_request_txn);

        console.log(API.user.get_pub_key());

        API.chain.commit_txn(serialized_request_txn, function() {
            API.chain.get_request_txns_for_user(API.user.get_pub_key()).then(function(results){
                req_info['req_blk_num'] = results[results.length - 1].block_num;
                req_info['req_txn_sig'] = req_txn.signature;
            });
        });


    })
};

var answer_request = function(a, r, r_i, data_txn, request_txn) {
    var prv_key = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApXIIXmd6bMHiK7TtgD+l\nBMPUOKaz8hKGfAvPdPCUgTXd+i4MXjLrrrDgKu8ZhE7wxjI4v49Ldy/gnx4lkMSz\nEHTcFVj6zF8lMvcioyypTKH1hqyvH9KNkjCJS+ibx3vhHCdDiz1y09x9ju7+L8uI\n6pOu/EAC8S6YuLli+Relg+VQmhvxjyD0iFeBDtM2bZiHg5aMOqo9Oj09AxhSEhy+\nbyoO/cnutsYcOviu4zIu3kkHE/F+tfpqnfkG6afEmYsL9O5/IV5vRGnkarYDnXhC\nz6v8KZU98Gq8BEHbR4/IPZ1mJelHQ8mluUYDN0sMKUE55IlQNkDX/3cX+52A+Hio\nZwIDAQAB\n-----END PUBLIC KEY-----";
    var pub_key = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQClcgheZ3psweIr\ntO2AP6UEw9Q4prPyEoZ8C8908JSBNd36LgxeMuuusOAq7xmETvDGMji/j0t3L+Cf\nHiWQxLMQdNwVWPrMXyUy9yKjLKlMofWGrK8f0o2SMIlL6JvHe+EcJ0OLPXLT3H2O\n7v4vy4jqk678QALxLpi4uWL5F6WD5VCaG/GPIPSIV4EO0zZtmIeDlow6qj06PT0D\nGFISHL5vKg79ye62xhw6+K7jMi7eSQcT8X61+mqd+Qbpp8SZiwv07n8hXm9EaeRq\ntgOdeELPq/wplT3warwEQdtHj8g9nWYl6UdDyaW5RgM3SwwpQTnkiVA2QNf/dxf7\nnYD4eKhnAgMBAAECggEAUOdikEep5mUpZJYlTgHRgHMC5HEgrc/BVAeye0zqUgU1\nd5HtGmNsPRDhjh0+LSUtOL52YbaBANe40Ba95/1IU1PSC95nRmmAl1ui5IiCgabx\nmdn4CWe9My/o8+Xbx8EcY9gPf5ec/11jSPI1+sldOtjdSR1EUwymQi7l50lY9xXx\nEv0/O4h6ilatOmcqG4xaNELZE69FXwzR0q87rpi1EzxVXh51NooUnuNgB2v2cIiF\nXZqNnjd7IAAufa6Se4qzFPHgOrGfUaLKmYxKJR7p1tbRw1GbJ1U4Byoam41NPEkb\nrRaGR13LWWFCzMIXc6H4TEwxmzyzS645ZLAVbs9yAQKBgQDsNTXAgZhx86VzdtfV\ndjyFTXeQyLYxDeyK3Qw4CBNOi+te1TZ2Wpkj+wSsvWDnHMbcPVLR3aehQrTWA0nl\nM4ip/EMMFMls/tD3R2XWKmnrZSGv++NqWWsAJ/zqIf6Z1EMa5Qg/9ye4VbK7Hx1M\nobZXLACh2syLsuxJdRs29ml2dwKBgQCzTu34XRihGsG2jDBBYD0IeBf5WReBg7f1\nQH7CQJNw0JLYValtM2kUClZt7oIvHewSwvAgkbuDxN+eMWnipATScgxJaTpwzM06\n3+c3qa+EGmYv2hTDKLKK8FFz+i1K9skq/wpIoFB94gE6Ld32UEELgWmj8gamdvZh\ne1Bc7ripkQKBgGgUBgw9zjsfnV5kFjQjdgVSngV4uvagaQLC5ZhmzoMEmgBeODIs\nN2AoQeYPR/xtrJ3sk2qPnUYsC1xldJD+hRBJbA2NtzdEjDT5C8EzTRqApDhT59+7\naK9X71QHCJUldzAJjPoKYEET2b4jtphGhP6iD+FBdHF1tDGl3Qj5yHx/AoGARKdy\n/EaA+KZrBz8z9sQnekepPkK7ek55sADKyAu7qFVj9EsQPQyTLiYrI5pP5ER7sE9N\na9sAxhoqWMKovSt54S3jwHP2+VuhNOqn+CsTVexZtfa1PmglvIb5WQOwNeS576mJ\nQXeIejp/p8wKEZZ24TXiwfAYVcJ04aw6f+qzb9ECgYANQg+BpM2ZBqrO0nCSnvrr\ne7/ooUWuppM/+1wAPZGNjm6l8cUAWclhNMlHG8ZLIeT8lwn+/q0mW52rMtbcMGdE\nDP269SUyV6l/oEPmtmxYJh0TObdqODy/rl/9qePHhwp+RrYOFphqTF7rHZ72lg6d\nkZzua/Y0HcVV7vTX0JIQrg==\n-----END PRIVATE KEY-----";
    var info = {
        a,
        r,
        r_i,
    }
    API.transaction.create_answer_txn(prv_key, pub_key, info).then(function() {
        console.log("getnerated answer txn")
    })
}

