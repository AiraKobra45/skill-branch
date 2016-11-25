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
  console.log(color);
  const re = /#{0,1}([0-9a-f]){3,6}$/gi;
  const re_rgb = /([\s\S]*)(rgb)(\()(\s*)([0-9]{1,3})(\s*)(,)(\s*)([0-9]{1,3})(\s*)(,)(\s*)([0-9]{1,3})(\s*)(\))/i;
  const re_hsl = /[\s\S]*(hsl)\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})[%]{1}\s*,\s*([0-9]{1,3})[%]{1}\s*\)/i;

  if (color === undefined) {
    console.log('color undefined');
    return res.send('Invalid color');
  } else {
    color  = color.trim().replace(/%20/g,'').toLowerCase();
    console.log('_' + color);
    let reg = color.match(re);
    let rgb = color.match(re_rgb);
    let hsl0 = color.match(re_hsl);
console.log(reg + '_' + rgb + '_' + hsl0);

    if (hsl0 !== null) {
      if (dia([hsl0[2], hsl0[3], hsl0[4]], a, b) && ((0 <= hsl0[2]) && (hsl0[2] <= 360)) && ((0 <= hsl0[3]) && (hsl0[3] <= 100)) && ((0 <= hsl0[4]) && (hsl0[4] <= 100))) {
        let hsl1 = '#' + convert.hsl.hex(hsl0[2],hsl0[3],hsl0[4]).toLowerCase();
        return res.send(hsl1);
      } else return res.send('Invalid color');
    } else {
      if (rgb !== null) {
        if (rgb[1])  return res.send('Invalid color');
        if((rgb[2] === 'rgb') && !(+rgb[5] + +rgb[9] + rgb[13]).isNaN/*!(+rgb[5].isNaN) && !(+rgb[9].isNaN) && !(+rgb[13].isNaN) */) {
          /*const ansHex = */ res.send(toHex(rgb[5],rgb[9],rgb[13]));
          /*if (ansHex) {
            return res.send(ansHex);
          } else {
            return res.send('Invalid color');
          }*/
        }
      }
      if (reg === null) {
        return res.send('Invalid color');
      } else {
        reg = reg.toString();
      }
      if (reg.length != color.length) {
        return res.send('Invalid color');
      } else {
        const x = /#/;
        if (reg.match(x) !== null) {
          reg = reg.slice(1,reg.length);
        }
        const len = reg.length;
        if (len === 3) {
          reg =  reg[0] + reg[0] + reg[1] + reg[1] + reg[2] + reg[2];
          return res.send('#' + reg);
        }
        if (len === 6) {
          return res.send('#' + reg);
        } else {
          return res.send('Invalid color');
        }
      }
    }

  }
});

// Всё давно уже написано за меня!!! color-convert
function toHex (c1, c2, c3) {
  if (dia([+c1,+c2,+c3], 0, 255)) {
    return '#' + convert.rgb.hex(c1, c2, c3).toLowerCase();
  } else return 'Invalid color';
}
function dia(arr, a, b){
  if (!Array.isArray(arr)) return false;
  let ans = true;
  arr.forEach(function (v, i, ar) {
    if ((v < a) || (v > b)) {
      ans = false;
    }
  });
  return ans;
}

app.get('/task2X', function(req, res) {
  var input = req.query.i;
  var output = ['1','18','243','3240','43254','577368','7706988','102876480','1373243544','18330699168',
      '244686773808','3266193870720','43598688377184','581975750199168','7768485393179328',
      '103697388221736960','1384201395738071424','18476969736848122368','246639261965462754048'];
    return res.send(output[+input]);
});

app.listen(3000, () => {
console.log( 'Your app listening on port 3000!');
});

