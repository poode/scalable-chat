const redis = require('redis');
const util = require('util');
const {ip} = require('./config');



const client = redis.createClient({
                                    host: ip,
                                    port: 6379
});

function setRedisVariable(key, val,noExpire){
    if(noExpire)client.set(key, JSON.stringify(val));
    else client.set(key, JSON.stringify(val), 'EX', 300 );
}

async function getRedisVariable(key){
    return await client.getAsync(key).then(function(res) {
        return JSON.parse(res);
    }).catch(function(err){
        console.log("REDIS FAILED:"+err.message);
    });
}

function pushRedisVariable(key, val){
    client.rpush(key, val);
}

async function getRedisList(key){
    return await client.lrangeAsync(key, 0, -1).then(function(res) {
        return res;
    }).catch(function(err){
        console.log(err.message);
    });
}

function popRedisVariable(key){
    client.lpop(key);
}


function clearList(key){
    client.del(key);
}



exports.setRedisVariable = setRedisVariable;
exports.getRedisVariable = getRedisVariable;
exports.pushRedisVariable = pushRedisVariable;
exports.popRedisVariable = popRedisVariable;
exports.getRedisList = getRedisList;
exports.clearList = clearList;