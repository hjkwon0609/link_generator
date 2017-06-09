'use strict';


// Create link that has info
var AP = 500;
var link_generator_server = 'http://localhost:4000';

// TODO: move to disk
var info_map = new Map();

const request_link = function(block_num, txn_sig, key, identity, req_info) {
    var pub_key = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApXIIXmd6bMHiK7TtgD+l\nBMPUOKaz8hKGfAvPdPCUgTXd+i4MXjLrrrDgKu8ZhE7wxjI4v49Ldy/gnx4lkMSz\nEHTcFVj6zF8lMvcioyypTKH1hqyvH9KNkjCJS+ibx3vhHCdDiz1y09x9ju7+L8uI\n6pOu/EAC8S6YuLli+Relg+VQmhvxjyD0iFeBDtM2bZiHg5aMOqo9Oj09AxhSEhy+\nbyoO/cnutsYcOviu4zIu3kkHE/F+tfpqnfkG6afEmYsL9O5/IV5vRGnkarYDnXhC\nz6v8KZU98Gq8BEHbR4/IPZ1mJelHQ8mluUYDN0sMKUE55IlQNkDX/3cX+52A+Hio\nZwIDAQAB\n-----END PUBLIC KEY-----";
    var prv_key = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQClcgheZ3psweIr\ntO2AP6UEw9Q4prPyEoZ8C8908JSBNd36LgxeMuuusOAq7xmETvDGMji/j0t3L+Cf\nHiWQxLMQdNwVWPrMXyUy9yKjLKlMofWGrK8f0o2SMIlL6JvHe+EcJ0OLPXLT3H2O\n7v4vy4jqk678QALxLpi4uWL5F6WD5VCaG/GPIPSIV4EO0zZtmIeDlow6qj06PT0D\nGFISHL5vKg79ye62xhw6+K7jMi7eSQcT8X61+mqd+Qbpp8SZiwv07n8hXm9EaeRq\ntgOdeELPq/wplT3warwEQdtHj8g9nWYl6UdDyaW5RgM3SwwpQTnkiVA2QNf/dxf7\nnYD4eKhnAgMBAAECggEAUOdikEep5mUpZJYlTgHRgHMC5HEgrc/BVAeye0zqUgU1\nd5HtGmNsPRDhjh0+LSUtOL52YbaBANe40Ba95/1IU1PSC95nRmmAl1ui5IiCgabx\nmdn4CWe9My/o8+Xbx8EcY9gPf5ec/11jSPI1+sldOtjdSR1EUwymQi7l50lY9xXx\nEv0/O4h6ilatOmcqG4xaNELZE69FXwzR0q87rpi1EzxVXh51NooUnuNgB2v2cIiF\nXZqNnjd7IAAufa6Se4qzFPHgOrGfUaLKmYxKJR7p1tbRw1GbJ1U4Byoam41NPEkb\nrRaGR13LWWFCzMIXc6H4TEwxmzyzS645ZLAVbs9yAQKBgQDsNTXAgZhx86VzdtfV\ndjyFTXeQyLYxDeyK3Qw4CBNOi+te1TZ2Wpkj+wSsvWDnHMbcPVLR3aehQrTWA0nl\nM4ip/EMMFMls/tD3R2XWKmnrZSGv++NqWWsAJ/zqIf6Z1EMa5Qg/9ye4VbK7Hx1M\nobZXLACh2syLsuxJdRs29ml2dwKBgQCzTu34XRihGsG2jDBBYD0IeBf5WReBg7f1\nQH7CQJNw0JLYValtM2kUClZt7oIvHewSwvAgkbuDxN+eMWnipATScgxJaTpwzM06\n3+c3qa+EGmYv2hTDKLKK8FFz+i1K9skq/wpIoFB94gE6Ld32UEELgWmj8gamdvZh\ne1Bc7ripkQKBgGgUBgw9zjsfnV5kFjQjdgVSngV4uvagaQLC5ZhmzoMEmgBeODIs\nN2AoQeYPR/xtrJ3sk2qPnUYsC1xldJD+hRBJbA2NtzdEjDT5C8EzTRqApDhT59+7\naK9X71QHCJUldzAJjPoKYEET2b4jtphGhP6iD+FBdHF1tDGl3Qj5yHx/AoGARKdy\n/EaA+KZrBz8z9sQnekepPkK7ek55sADKyAu7qFVj9EsQPQyTLiYrI5pP5ER7sE9N\na9sAxhoqWMKovSt54S3jwHP2+VuhNOqn+CsTVexZtfa1PmglvIb5WQOwNeS576mJ\nQXeIejp/p8wKEZZ24TXiwfAYVcJ04aw6f+qzb9ECgYANQg+BpM2ZBqrO0nCSnvrr\ne7/ooUWuppM/+1wAPZGNjm6l8cUAWclhNMlHG8ZLIeT8lwn+/q0mW52rMtbcMGdE\nDP269SUyV6l/oEPmtmxYJh0TObdqODy/rl/9qePHhwp+RrYOFphqTF7rHZ72lg6d\nkZzua/Y0HcVV7vTX0JIQrg==\n-----END PRIVATE KEY-----";

    API.transaction.create_request_txn(prv_key, pub_key, block_num, txn_sig, identity).then(function(result) {
        var b = result["b"];
        var req_txn = result['req_txn'];
        var serialized_request_txn = result['serialized_request_txn'];

        $.post("/txn/new-txn", {
            txn: serialized_request_txn
        }).done(
            function(response) {
                console.log(API.user.get_pub_key());
                setTimeout(function() {
                    API.chain.get_verification_txns_for_user(API.user.get_pub_key(), 1 /* Request */, function(results){
                        console.log("link_generator.js - request link");
                        console.log(results);
                        if (results.length != 0) {
                            req_info['req_blk_num'] = results[results.length - 1].block_num;
                            req_info['req_txn_sig'] = req_txn.signature;

                            info_map[prv_key] = [key, identity];
                        }
                    });
                }, 5000);
            }
        );
    })
};

const answer_request = function(info) {
    var pub_key = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApXIIXmd6bMHiK7TtgD+l\nBMPUOKaz8hKGfAvPdPCUgTXd+i4MXjLrrrDgKu8ZhE7wxjI4v49Ldy/gnx4lkMSz\nEHTcFVj6zF8lMvcioyypTKH1hqyvH9KNkjCJS+ibx3vhHCdDiz1y09x9ju7+L8uI\n6pOu/EAC8S6YuLli+Relg+VQmhvxjyD0iFeBDtM2bZiHg5aMOqo9Oj09AxhSEhy+\nbyoO/cnutsYcOviu4zIu3kkHE/F+tfpqnfkG6afEmYsL9O5/IV5vRGnkarYDnXhC\nz6v8KZU98Gq8BEHbR4/IPZ1mJelHQ8mluUYDN0sMKUE55IlQNkDX/3cX+52A+Hio\nZwIDAQAB\n-----END PUBLIC KEY-----";
    var prv_key = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQClcgheZ3psweIr\ntO2AP6UEw9Q4prPyEoZ8C8908JSBNd36LgxeMuuusOAq7xmETvDGMji/j0t3L+Cf\nHiWQxLMQdNwVWPrMXyUy9yKjLKlMofWGrK8f0o2SMIlL6JvHe+EcJ0OLPXLT3H2O\n7v4vy4jqk678QALxLpi4uWL5F6WD5VCaG/GPIPSIV4EO0zZtmIeDlow6qj06PT0D\nGFISHL5vKg79ye62xhw6+K7jMi7eSQcT8X61+mqd+Qbpp8SZiwv07n8hXm9EaeRq\ntgOdeELPq/wplT3warwEQdtHj8g9nWYl6UdDyaW5RgM3SwwpQTnkiVA2QNf/dxf7\nnYD4eKhnAgMBAAECggEAUOdikEep5mUpZJYlTgHRgHMC5HEgrc/BVAeye0zqUgU1\nd5HtGmNsPRDhjh0+LSUtOL52YbaBANe40Ba95/1IU1PSC95nRmmAl1ui5IiCgabx\nmdn4CWe9My/o8+Xbx8EcY9gPf5ec/11jSPI1+sldOtjdSR1EUwymQi7l50lY9xXx\nEv0/O4h6ilatOmcqG4xaNELZE69FXwzR0q87rpi1EzxVXh51NooUnuNgB2v2cIiF\nXZqNnjd7IAAufa6Se4qzFPHgOrGfUaLKmYxKJR7p1tbRw1GbJ1U4Byoam41NPEkb\nrRaGR13LWWFCzMIXc6H4TEwxmzyzS645ZLAVbs9yAQKBgQDsNTXAgZhx86VzdtfV\ndjyFTXeQyLYxDeyK3Qw4CBNOi+te1TZ2Wpkj+wSsvWDnHMbcPVLR3aehQrTWA0nl\nM4ip/EMMFMls/tD3R2XWKmnrZSGv++NqWWsAJ/zqIf6Z1EMa5Qg/9ye4VbK7Hx1M\nobZXLACh2syLsuxJdRs29ml2dwKBgQCzTu34XRihGsG2jDBBYD0IeBf5WReBg7f1\nQH7CQJNw0JLYValtM2kUClZt7oIvHewSwvAgkbuDxN+eMWnipATScgxJaTpwzM06\n3+c3qa+EGmYv2hTDKLKK8FFz+i1K9skq/wpIoFB94gE6Ld32UEELgWmj8gamdvZh\ne1Bc7ripkQKBgGgUBgw9zjsfnV5kFjQjdgVSngV4uvagaQLC5ZhmzoMEmgBeODIs\nN2AoQeYPR/xtrJ3sk2qPnUYsC1xldJD+hRBJbA2NtzdEjDT5C8EzTRqApDhT59+7\naK9X71QHCJUldzAJjPoKYEET2b4jtphGhP6iD+FBdHF1tDGl3Qj5yHx/AoGARKdy\n/EaA+KZrBz8z9sQnekepPkK7ek55sADKyAu7qFVj9EsQPQyTLiYrI5pP5ER7sE9N\na9sAxhoqWMKovSt54S3jwHP2+VuhNOqn+CsTVexZtfa1PmglvIb5WQOwNeS576mJ\nQXeIejp/p8wKEZZ24TXiwfAYVcJ04aw6f+qzb9ECgYANQg+BpM2ZBqrO0nCSnvrr\ne7/ooUWuppM/+1wAPZGNjm6l8cUAWclhNMlHG8ZLIeT8lwn+/q0mW52rMtbcMGdE\nDP269SUyV6l/oEPmtmxYJh0TObdqODy/rl/9qePHhwp+RrYOFphqTF7rHZ72lg6d\nkZzua/Y0HcVV7vTX0JIQrg==\n-----END PRIVATE KEY-----";
    API.transaction.create_answer_txn(prv_key, pub_key, info).then(function(result) {
        var ans_txn = result['ans_txn'];
        var serialized_ans_txn = result['serialized_ans_txn'];

        $.post("/txn/new-txn", {
            txn: serialized_ans_txn
        }).done(
            function(response) {
                setTimeout(function() {
                    API.chain.get_verification_txns_for_user(API.user.get_pub_key(), 2 /* Answer */, function(results){
                        if (results.length != 0) {
                            // TODO: need to check if answer req is the right one
                            let info = info_map[prv_key];
                            let info_key = info[0];
                            let info_val = info[1];

                            $.post({
                                url : link_generator_server + "/add_new_user_info",
                                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                                data : {
                                    pub_key,
                                    info_key,
                                    info_val,
                                },
                                transformRequest: function(obj) {
                                    var str = [];
                                    for(var p in obj)
                                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                    return str.join("&");
                                },
                                success : function(result, status, xhr) {
                                    console.log("Successfully fetched txn from the chain");
                                    if (result != undefined) {
                                        cb(result);
                                    }
                                    console.log(result);
                                }
                            });
                        }
                    });
                }, 5000);
            }
        );
    });
};

const create_link = function(pub_key){
    console.log('<link_generator.js>: ' + pub_key);
    $.post({
        url: link_generator_server + "/create_new_link",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data : {
            pub_key,
        },
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        },
        success : function(result, status, xhr) {
            console.log("Successfully fetched txn from the chain");
            if (result != undefined) {
                cb(result);
            }
            console.log(result);
        }
    });
    // db.link_created_for_user(pub_key);
    return link_generator_server + "/user_info_page/" + encodeURIComponent(pub_key);
}

