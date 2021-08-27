const u${PROP_NAME}Values = [$VALUE_LIST];
const u${PROP_NAME}AsInt = (function () {
  const bytes = atob("$BASE64");
  const len = bytes.length;
  const entries = []
  let value = 0;
  for (let i = 0; i < len; ++i) {
    const byte = bytes.charCodeAt(i);
    if (byte & 0x80) {
      value |= byte & 0x7F;
      value <<= 7;
      continue;
    }
    value |= byte;
    entries.push((value >> $VALUE_BITS) + 1);
    entries.push(value & $VALUE_MASK);
    value = 0;
  }
  return function (c) {
    for (let i = 0; i < entries.length; i += 2) {
      c -= entries[i];
      if (c < 0)
        return entries[i + 1];
    }
  }
})();
function u${PROP_NAME}(c) { return u${PROP_NAME}Values[u${PROP_NAME}AsInt(c)]; }
