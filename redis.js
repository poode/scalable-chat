const redis = require('redis');
const {promisify} = require('util');
const {ip} = require('./config');

/* Promisify all with bluebird
const redis = require('redis');
bluebird.promisifyAll(redis);
*/

const client = redis.createClient({
                                    host: ip,
                                    port: 6379
});

const getAsync = promisify(client.get).bind(client);
const lrangeAsync = promisify(client.lrange).bind(client);

function setRedisVariable(key, val,expire){
    if(!expire)client.set(key, JSON.stringify(val));
    else client.set(key, JSON.stringify(val), 'EX', expire );
}

function getRedisVariable(key){
    return getAsync(key).then(function(res) {
        return JSON.parse(res);
    }).catch(function(err){
        console.log("REDIS FAILED:"+err.message);
    });
}

function pushRedisVariable(key, val){
    client.rpush(key, val);
}

function getRedisList(key){
    return lrangeAsync(key, 0, -1).then(function(res) {
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

function increment(key){
    client.incr(key);
}

//operation is limited to 64 bit signed integers
function decrement(key){
    client.decr(key);
}



exports.setRedisVariable = setRedisVariable;
exports.getRedisVariable = getRedisVariable;
exports.pushRedisVariable = pushRedisVariable;
exports.popRedisVariable = popRedisVariable;
exports.getRedisList = getRedisList;
exports.clearList = clearList;
exports.increment = increment;
exports.decrement = decrement;