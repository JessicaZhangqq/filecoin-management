var json2xls = require('json2xls');
var fs = require('fs')
var json = [
  {
    "foo": 'bar',
    "qux": 'moo',
    "poo2": "123",
    "stux": new Date()
},
{
  "foo": 'bar',
  "qux": 'moo',
  "poo1": "123",
  "stux": new Date()
}
]

//export only the field 'poo'
var xls = json2xls(json,{
    fields: ['poo']
});

//export only the field 'poo' as string
var xls = json2xls(json
  // ,{
  //   fields: {poo:'string'}
// }
);

fs.writeFileSync('data.xlsx', xls, 'binary');
// var jsonstr='{"name":"John", "age":30, "car":null}'
// var str1 = JSON.stringify(json)
// console.log(json)
// console.log(str1)
// console.log(jsonstr)
