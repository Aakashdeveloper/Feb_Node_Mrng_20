var fs = require('fs');

//overwrite
/*fs.writeFile('test1.txt','Hi From NodeJs Second',function(err){
    if(err) throw err;
    console.log('File created')
})
// Add new to existing
fs.appendFile('test1.txt','Hi From NodeJs third \n',function(err){
    if(err) throw err;
    console.log('File created')
})
fs.readFile('test1.txt','utf-8',function(err,data){
    if(err) throw err;
    console.log(data)
})


fs.readFile('db.json','utf-8',function(err,data){
    if(err) throw err;
    console.log(data)
})


fs.unlink('text1.txt',function(err){
    if(err) throw err
    console.log('File Deleted')
})
*/

fs.rename('db.json','db1.json',function(err){
    if(err) throw err
    console.log('File Renamed')
})