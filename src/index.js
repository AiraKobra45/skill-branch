import express from 'express';
import cors from 'cors';
var Skb = require('skb');
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODE4ZGFhOTJmYjc0ZDAwMTFiZTgwODMiLCJ1c2VybmFtZSI6ImFpcmFrb2JyYTQ1QHlhbmRleC5ydSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNDc4MDIzODUwfQ.jJlaH1etB0vQBOWDI8nqrRCTWuqKurURTLDjdgA6yTM';
var skb = new Skb(token);
//skb.taskHelloWorld('Любой ваш текст тут 777');
//import canonize from './canonize';

const app = express();
app.use(cors());

//var re = new RegExp(/([a-zA-Zа-яА-Я]*)?\s?([a-zA-Zа-яА-Я]*)?\s?([a-zA-Zа-яА-Я]*)?(\S+)?/);
var re = new RegExp( /\s*(\S+)?\s*(\S+)?\s*(\S+)?\s*(.+)?/i );
var a,b,c;

function getNum(num) {
	//  if (!isNaN(num) ) {
	//  	return Number(num);
	//  } else {
	//  	return 0;
	//  };
	return ( +num || 0 );
}

function digit ( a, b, c) {
  if ( ((a + b + c).match(/\d/) == null ) &&  ((a + b + c).match(/[_\/]/) == null ) )    {
    return true;
  } else {
    return false;
  }
};

function getFIO (str) {
  if (typeof str[1] == 'string' && str[2] == undefined && str[3] == undefined && str[4] == undefined ) {
      if (digit(str[1], str[2], str[3])) {
        return str[1][0].toUpperCase()+ str[1].substring(1).toLowerCase();
      } else {
        return 'Invalid fullname';
      };
    } else
    if (typeof str[1] == 'string' && typeof str[2] == 'string' && str[3] == undefined && str[4] == undefined ) {
      if (digit(str[1], str[2], str[3])) {
              return str[2][0].toUpperCase()+ str[2].substring(1).toLowerCase() + ' ' + str[1].slice(0,1).toUpperCase() + '.';
            } else {
              return 'Invalid fullname';
            };
    } else
    if (typeof str[1] == 'string' && typeof str[2] == 'string' && typeof str[3] == 'string' && str[4] == undefined ) {
          if (digit(str[1], str[2], str[3])) {
                  return str[3][0].toUpperCase() + str[3].substring(1).toLowerCase() + ' ' + str[1].slice(0,1).toUpperCase() + '. ' + str[2].slice(0,1).toUpperCase() + '.';
                } else {
                  return 'Invalid fullname';
                };
        } else {
          return 'Invalid fullname';
        };
}

function canonize (url){
  const re = new RegExp('@?(https?:)?(\/\/)?((\S*)[^\/]*\/)?([@_a-z0-9.]*)', 'i');
  var mat = url.match(re);
  //console.log(mat);
  const username = mat[5];

  if ( username.substring(0, 1) == '@' ) {
    return username;
  } else {
    return '@' + username;
  };
};

app.get('/task2A', function(req, res) {
  //  a = getNum(req.query.a);
  //  b = getNum(req.query.b);
  c = getNum(req.query.a) + getNum(req.query.b);//a + b;
  res.end('' + c );
});

app.get('/task2B', function(req, res) {
  const fio = req.query.fullname.match(re);
  console.log(fio);
  res.end( getFIO(fio));
});

app.get('/task2C', function(req, res) {
  const username = canonize(req.query.username);
  res.end( username );
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
})

