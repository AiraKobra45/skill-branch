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

app.get('/task2D', function(req, res) {
  var color = req.query.color;
  var colorHex = color;
  var hex = new RegExp( /([0-9a-f]){3,6}/ig );
  console.log('Start. Color = ' + colorHex);
  if (typeof(colorHex) === 'undefined') {
    console.log('*_1_');
    //console.log(typeof (color));
    res.send('Invalid color');
  } else {
    colorHex = colorHex.toLowerCase().trim();
    var colorHexSec = colorHex;
    colorHex = colorHex.match(hex);
    console.log('RegExp value: ' + colorHex);
    if ( colorHex === null) {
      console.log('*_2_');
      //console.log('*: if != null  ' + color.match(hex)) ;
      //console.log(color.match(hex)  + '***');
      res.send('Invalid color');
    } else {
      let can = colorHexSec.toString().match(/[^0-9a-f]/);
      console.log('_ ' + can);
      if ((can !== null) && (can != "#")) {
        res.send('Invalid color');
      } else {
        let can1 = color.trim();
        console.log(can1);
        if ((can1.length > 7) ) return res.send('Invalid color');
        colorHex = colorHex.toString();
        //console.log('*: if == null  ' + color.match(hex)) ;
        if (colorHex.length === 6) {
          console.log('*_3_');
          //console.log(color);
          res.end('#' + colorHex);
        } else {
          if (colorHex.length === 3) {
            console.log('*_4_');
            colorHex = colorHex[0] + colorHex[0] + colorHex[1] + colorHex[1] + colorHex[2] + colorHex[2];
            res.end('#' + colorHex);
          } else {
            console.log('*_5_');
            res.send('Invalid color');
          }

        }
      }
    }
  }

});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});

