/*
  This file is full of functions to be used internally throughought the library
*/

export function log(message: string, errorValue?: 'error' | 'warn' | 'success') {
    let color;
    if(errorValue == 'error') color = `\x1b[31m`
    if(errorValue == 'warn') color = `\x1b[1m\x1b[33m`
    if(errorValue == 'success') color = `\92[32m`
    console.log(`${color}${message}\x1b[1m\x1b[37m`)
}