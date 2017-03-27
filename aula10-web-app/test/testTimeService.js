'use strict'

const timeService = require('./../timeService')

module.exports.textParseTime = function(test) {
    const arg = '2013-08-10T18:10:15.474Z'
    const actual = timeService.parseTime(arg)
    const expect = {
        hour: '19', 
        minute: '10',
        second: '15'
    }
    test.deepEqual(actual, expect)
    test.done()
}

module.exports.textUnixtime = function(test) {
    const arg = '2013-08-10T18:10:15.474Z'
    const actual = timeService.unixTime(arg)
    const expect = {
        unixtime: '1376158215474'
    }
    test.deepEqual(actual, expect)
    test.done()
}