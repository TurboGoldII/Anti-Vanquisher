const getReadOnlyObject = function (object) {
  var result = null;

  if (Array.isArray(object)) {
    result = [];
  } else if (typeof object === 'object') {
    result = {};
  } else {
    return object;
  }

  for (var prop in object) {
    var v = object[prop];

    if (typeof v === 'object') {
      if (!v) {
        v = null;
      }
      else {
        v = getReadOnlyObject(v);
      }
    }

    Object.defineProperty(result, prop, {
      value: v,
      writable: false,
      enumerable: true,
      configurable: false
    });
  }

  return result;
};