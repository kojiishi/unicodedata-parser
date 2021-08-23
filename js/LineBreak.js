const uLineBreakValues = ["CM","BA","LF","BK","CR","SP","EX","QU","AL","PR","PO","OP","CP","IS","HY","SY","NU","CL","NL","GL","AI","BB","XX","HL","SA","JL","JV","JT","NS","ZW","ZWJ","B2","IN","WJ","ID","EB","CJ","H2","H3","SG","CB","RI","EM"];
const uLineBreakAsInt = (function () {
  const bytes = atob("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JiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJiWNJoVWixqBVpgbgVaH/2eY/1aB/2KDCIVWggiCFhcAhFcIhhcWghcWFxZXFlcWhFe4SIgWgbUIEQuHVp9IVppIk1aFSAoIVodADVFNRgsRIIJWh0CCIgsRCxELEQsRCxELEQsRCxFiCxGDIhEiERZcRiILEQsRCxGDYhYiCQoigVaCCBbDCFYhFgZiCQpiCxFiESIRhSJcgSIGjSILIhGOIgsiESILUQtRHCKEZJYiXI8igRaCYlaCYlaCYlaBIoEWCgmBIkkWgwiEVoEAKBRWhUgWjEgWiQgWSBaHCFaGSJBWvQiCFoEBgVaWCIEW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");
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
    entries.push((value >> 6) + 1);
    entries.push(value & 63);
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
function uLineBreak(c) { return uLineBreakValues[uLineBreakAsInt(c)]; }
