

function isObject(txt: any) {
    return txt !== null && typeof txt === 'object' && !Array.isArray(txt);
  }

  export {isObject}