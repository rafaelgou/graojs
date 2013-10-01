/**
 * @author Pedro Nasser
 */

// PROTOTYPE 
function Class () {}
var m;
for (m=0;m<100000;m++)
Class.prototype['method'+m] = function () { console.log('lol'); };
 
console.time('prototype');
 
var i;
for (i=0;i<10000000;i++)
new Class;
 
console.timeEnd('prototype');
 
// OBJECT CREATE
 
var klass = {}
var m;
for (m=0;m<100000;m++)
klass['method'+m] = function () { console.log('lol'); };
 
console.time('literal');
 
var i;
for (i=0;i<10000000;i++)
Object.create(klass);
 
console.timeEnd('literal');