import express from 'express';
import cors from 'cors';
var Skb = require('skb');
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODE4ZGFhOTJmYjc0ZDAwMTFiZTgwODMiLCJ1c2VybmFtZSI6ImFpcmFrb2JyYTQ1QHlhbmRleC5ydSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNDc4MDIzODUwfQ.jJlaH1etB0vQBOWDI8nqrRCTWuqKurURTLDjdgA6yTM';
var skb = new Skb(token);
var convert = require('color-convert');
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
}

function getFIO (str) {
  if (typeof str[1] == 'string' && str[2] == undefined && str[3] == undefined && str[4] == undefined ) {
      if (digit(str[1], str[2], str[3])) {
        return str[1][0].toUpperCase()+ str[1].substring(1).toLowerCase();
      } else {
        return 'Invalid fullname';
      }
    } else
    if (typeof str[1] == 'string' && typeof str[2] == 'string' && str[3] == undefined && str[4] == undefined ) {
      if (digit(str[1], str[2], str[3])) {
              return str[2][0].toUpperCase()+ str[2].substring(1).toLowerCase() + ' ' + str[1].slice(0,1).toUpperCase() + '.';
            } else {
              return 'Invalid fullname';
            }
    } else
    if (typeof str[1] == 'string' && typeof str[2] == 'string' && typeof str[3] == 'string' && str[4] == undefined ) {
          if (digit(str[1], str[2], str[3])) {
                  return str[3][0].toUpperCase() + str[3].substring(1).toLowerCase() + ' ' + str[1].slice(0,1).toUpperCase() + '. ' + str[2].slice(0,1).toUpperCase() + '.';
                } else {
                  return 'Invalid fullname';
                }
        } else {
          return 'Invalid fullname';
        }
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
  }
}

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

app.get('/task2D',  function(req, res) {
  let color = req.query.color;
  const re = /#{0,1}([0-9a-f]){3,6}/gi;
  const re_rgb = /([\s\S]*)(rgb)(\()(\s*)([0-9]{1,3})(\s*)(,)(\s*)([0-9]{1,3})(\s*)(,)(\s*)([0-9]{1,3})(\s*)(\))/i; //(\d{2,2})\s*\,\s*(\d{2,2})\s*\)/ig; //@?(https?:)?(\/\/)?((\S*)[^\/]*\/)?([@_a-z0-9.]*)/i;
  const re_hsl = /[\s\S]*(hsl)\(\s*([0-9]{1,3})\s*,\s*%20*([0-9]{1,3})[%]{1}\s*,\s*%20*([0-9]{1,3})[%]{1}\s*\)/i;

  console.log('start_' + color);
  //console.log((255).toString(16));
  //if (color === 'hsl(195, 100, 50)') return res.send('#00bfff');
  //if (color === 'rgb(255, 0, 0)') return res.send('#ff0000');
  //if (color === 'rgb(128, 128, 128)') return res.send('#808080');
  //if (color === ' rgb( 0, 255 , 64 )') return res.send('#00ff40');

  if (color === undefined) {
    //console.log('Color = undefined_' + parseInt('ff', 16));
    return res.send('Invalid color');
  } else {
    color  = color.trim().toLowerCase();
    let reg = color.match(re);
    let rgb = color.match(re_rgb);
    let hsl0 = color.match(re_hsl);


    if (hsl0 !== null) {
      let hsl1 = convert.hsl.hex(hsl0[2],hsl0[3],hsl0[4].toLowerCase());
      return (hsl1)
    } else {
      console.log(hsl0);
      //console.log(convert.hsl.hex(hsl0[2],hsl0[3],hsl0[4]).toLowerCase());
      //return res.json(hsl0);
      /*if(!rgb[5].isNaN)*/ //console.log('_' + toHex('0','255','64'));
      if (rgb !== null) {
        //console.log(rgb.toString().slice(0, rgb[0].length));
        //if (rgb[2] === 'hsl') return res.send(Color(). .rgb(0, 191, 255).hslString());/*.rgb(rgb[5],rgb[9],rgb[13]))*/
        if (rgb[1])  return res.send('Invalid color');//rgb !== rgb.toString().slice(0, rgb[0].length)) return res.send('Invalid color');
        if((rgb[2] === 'rgb') && !(+rgb[5].isNaN) && !(+rgb[9].isNaN) && !(+rgb[13].isNaN) ) {
          //console.log('#' + parseInt('0' + rgb[5], 16) + parseInt(rgb[9], 16) + parseInt(rgb[13], 16));
          const ansHex = toHex(rgb[5],rgb[9],rgb[13]);
          if (ansHex) {
            console.log(ansHex);
            return res.send(ansHex);
          } else {
            return res.send('Invalid color');
          }
        }
      }


      if (reg === null) {
        return res.send('Invalid color');
      } else {
        reg = reg.toString();
      }

      if (reg.length != color.length) {
        //console.log('Color len != reg len ' + color.length + '_' + reg.length);
        return res.send('Invalid color');
      } else {
        const x = /#/;
        if (reg.match(x) !== null) {
          //console.log(reg.match(x) + 1);
          reg = reg.slice(1,reg.length);
          //return res.send('#' + reg);
        } else {
          //console.log(reg.match(x) + 2);
          //return res.send('#' + reg);
        }
        const len = reg.length;
        if (len === 3) {
          reg =  reg[0] + reg[0] + reg[1] + reg[1] + reg[2] + reg[2];
          //console.log('3 => 6 ' + reg);
          return res.send('#' + reg);
        }
        if (len === 6) {
          //console.log(' = 6 ' + reg);
          return res.send('#' + reg);
        } else {
          //console.log(' != 6 ' + reg);
          return res.send('Invalid color');
        }

        //res.send('Color = ' + color + ' \n' + reg);
      }
    }

  }
});

function toHex (c1, c2, c3) {
  if ((c1 < 0) || (c1 >255)) return false;
  c1 = (+c1).toString(16);
  //console.log(c1);
  if (c1.length != 2) {
    c1 = '0' + c1;
  }
  if ((c2 < 0) || (c2 >255)) return false;
  c2 = (+c2).toString(16);
  //console.log(c2);
  if (c2.length != 2) {
    c2 = '0' + c2;
  }
  if ((c3 < 0) || (c3 >255)) return false;
  c3 = (+c3).toString(16);
  //console.log(c3);
  if (c3.length != 2) {
    c3 = '0' + c3;
  }
  return '#' + c1 + c2 + c3;
}


/*{
  var color = req.query.color;
  var colorHex = color;
  var hex = new RegExp( /#{0,1}([0-9a-f]){3,}/ig );
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
      console.log('_ ' + can );
      if (can == "#") return res.send(colorHex.toString());
      if ((can !== null) && (can != "#")) {
        //res.send('Invalid color');
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

});*/

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});

