
//
// class for the processing of a string input
// to remove insecure tags
// and to run simple calculations,
//
// as well as the retrieving both
// the original
// and processed values
//
// and updating its value
//
class EnhancedTextValue {
  constructor(value){

    //
    // prevent access/alteration
    // of values directly
    //

    let originalValue = value;
    this.getOriginalValue = () => {
      return originalValue;
    };

    let processedValue = processValue(value);
    this.getValue = () => {
      return processedValue;
    };

    this.update = (newValue) => {
      if(newValue !== value){
        originalValue = newValue;
        processedValue = processValue(newValue);
      }
    };

  }
}

///////////////////////////////
// TAGS

//
// clean the HTML tags and run any calculations
//
function processValue(value){
  let pv = cleanHTMLTags(value);
  pv = runCalculations(pv);
  return pv;
}

//
// extremely barebones checks for security purposes
//
function cleanHTMLTags(value){
  let v = replaceScriptTags(value);
  v = replaceEventHandlers(v);
  return v;
}

//
// replace script tags with code tags
//
function replaceScriptTags(value){
  let v = value.replace(/<\s*script/g, "<code");
  v = v.replace(/<\/\s*script/g, "</code");
  return v;
}

//
// don't allow "onXXX" within tags
//
function replaceEventHandlers(value){
  // remove everything after the eventhandler
  return value.replace(/<([^>]+)\son[^\s]+=[^<]+>/g, "<$1>");
}

////////////////////////////
// CALCULATION

//
// parse starting value for simple math equations
//
function runCalculations(value){
  // number (operator number)+
  const regex = /\-?(\d+(\.\d+)?|\.\d+)(\s*[\+|\-]\s*\-?(\d+(\.\d+)?|\.\d+))+/g;
  const matches = value.match(regex);
  if(matches){
    let v = value;
    for(let match of matches){
      const result = evaluateCalculation(match);
      v = v.replace(match, result);
    }
    return v;
  }
  else{
    return value;
  }
}

//
// break up a calculation by parts
// and compute the value
//
function evaluateCalculation(expression){

  let exp = replaceDoubleNetagtives(expression);

  // split by operators
  const regex = /([\+\-])/g;
  const parts = exp.split(regex);

  if(parts.length === 1){
    return expression;
  }
  else{
    // this will alternate between number and operator
    let result = Number(parts[0]);
    let maxSig = sig(parts[0]);

    for(let i = 1; i< parts.length; i+=2){
      const operator = parts[i];
      const change = Number(parts[i+1]);

      const changeSig = sig(parts[i+1]);

      if(changeSig > maxSig){
        maxSig = changeSig;
      }

      if(operator === "+"){
        result += change;
      }
      else{
        result -= change;
      }
    }
    return roundDecimalDigits(result, maxSig);
  }
}

//
// replace "--" within a expression "+"
// this allows for easier splitting on operators
//
function replaceDoubleNetagtives(exp){
  const regex = /\-\-/g;
  return exp.replace(regex, "+");
}

//
// find the number of significant digits in the input
//
function sig(num){
  const point = num.indexOf(".");
  if(point >= 0){
    return num.length - (point + 1);
  }
  else{
    return 0;
  }
}

//
// correct for potential floating point issues
//
function roundDecimalDigits(num, digits){
  if(digits > 0){
    return +(Math.round(num + `e+${digits}`) + `e-${digits}`);
  }
  return num;
}

// EXPORT
module.exports = EnhancedTextValue;
