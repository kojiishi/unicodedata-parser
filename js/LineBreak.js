const uLineBreakAsInt = (function () {
  const bytes = atob("hAABAkMEiEAFBgcICQoIBwsMCAkNDg0PhFBNgQgGjQgLCQyOCAsBEQiCQBKMQBMLCoEJCFQIFAcIAUgKCVQVCIIUB4EUC4sIFI8IFIHnCBQVgRQVFEgUgwiBVAgUCBWPSKcAE4VAgxOGAINIVoFIDQiBVoMIFggWiUgW70iDANJIFpJIVpdIDQFWSAkWlgABAAhACEAGAINWjReBVoFXSIUWglCBCIEKTUiFAAYAgQaVCIoAhFAKUIEIALEIBgiDABAIgkBIQAiBQEiEUIlIFkgAjkiNAFasCIUACIZWhFCQCIQAgUgNBghWAEmKSIFACIQACIEACIIAVocIFowIgQBWCBaFCIIWjwgWUIJWg0CUSItAEJAAmkiBAAiIQAiDAIRIQEGEUIgIgQAWg0hWSFaKSBaDCBYIgRaBSFYACIMAVkBWgQAIg1YAgVZIFoEIQFaEUEhKgggKCAlIAFaBABaCSIFWSFaKSBaDCBZIFkgWSFYAFoIAgVZAVoEAgRYAgxaBSBYIgxaEUECBCAAIhFaBABaECBaBCBaKSBaDCBZIFoIIVgAIg0AWgQAWgQBWCIcWSEBWhFAICYMWCIJAFoEAFoNIVkhWikgWgwgWSBaCCFYACIMAVkBWgQCDFoEAgVZIFoEIQFaEUINIhFYACBaCSIEWgQgWgUiBFkgWCBZIgRZIgRaBCIEWhUiBVoIAgRaBABaBQFYIglYAhlaEUIQICQiCFoIAg0gWgQgWiwgWh0hWAAiDABaBABaBQIMWQBaBCFYIVkhAVoRQgxYVhAiBABWDSBaBCBaLCBaESBaCCFYACIMAFoEAFoFAgxZAglZIFkhAVoRQFkgAhVaBQIQIFoEIFpQIQAiDABaBABaBQEiBVoEIAIRIQFaEUIQICoJIFoEAFohIgRaLSBaECBYIVoMIgRYAgVaCQBYAFoNAglaEUFZACIVWnFiBVgmHGAiEUEGSFlgWGBaCGBaLWBYYFosYVoIYFhgWgxgWhFBWgViPVgiBVQhVE1UBE4IGEwgGgQhAgkiEUIRIAQAIAAgACxELEUCDSBaRSIFWhkABggABQIIIhQAWkUAWQYJIAIJIFkhVARWCCFOSFp9YhFBBgUifWIRQgliSSBYIghYIVpdIr1mjWqtbpAgWgUhWgwgWCBaBSFaUCBaBSFaQCBaBSFaDCBYIFoFIVocIFpwIFoFIVqEIVoEACAGNCIEWjEiCVqpIVoJIVgGCvwgBjEgLEYEWpQiBAYUIgxaISIFAhBaJCIEAQYQWiEhAhVaGCBaBCBZAhVapWEEcGAEIAQlYVoRQglaESIJWSEZBFQhGCIEAEwCEUIJWrAiDFoIIQJBIAAiCFqJIhFaPCBaFQIFWhUCBVgiBFkaEUI5YVoIYhRaVWIFWjFiCVoRQGIEWWJsIggBWSJ8YFo4YVgCEUIJWhFCCVoZYVo8AmBaCAJcdh0Aeg12BFoRfQR+BQYRfhACEH0EWgQCOSIYASIRQgkiSYIVAYYNWk0iJQIEWggGEUIEWgQiEUJFIQYQIgxaVCFaFCINWgQAIigCBSACCSABIgQAIghbfSIYAE5ZAE4EAgYpIVoJIVpJIVoJIVoNIFggWCBYIFo8IVpoIFocIFoZIVoJIFokIVoEIFoMIFQgWgwETgQEiACNAARNBJFQIRwuBBwsHVEiBJQFDggATg0oIRxRcgkgNCxGBHIVIAQqBQQiBASaBSBaEQEhWFINICxEUCIFUg0gLERaGCIEWgwkKhkkKgUkKSQoJCocJkACHFoEICggUgQgKhAgUSAmESFSDSBSTSFSCCBRIFAiFVIFIhFSHCBRIgVaEVJtIFAgUlQgUCFSBCFRIFIEIFAgUSQgUgUgUSIFUSBQIFAiCVAgUggiBVIFIVIRIFIEIFIIIFIYIVEiBVEhUSFSISFRIVIYIFIEIFIUIFIwIFJcIJYtICxELEYJIFIMIX4YICxHiCIFfmQiMFoUIihbPFAilVIFIkhSFCIdUSIFUhEhUCIMUg0hUSFSBSFRIVIFIgRRIFEiBVIdIgVSECBSHSIFfCFRIFIFIVIFIX1QfCIEfJ1+MCIEfgUgUCBSOCFQIgRQIFB9UCFQIFIcIH45IVI4IhV+BVB8IgR8UX4EUX1QfVIEfCBSBSFQfglSCHxRfJx9Ug1+BCF+BZ6QIFIEIgkcIRh+BCAsRCxELEQsRCxELEQsRjlSYCAsRjwgLEQsRCxELEQsRgckICxELEQsRCxELEQsRCxELEQsRCxELEZ8ICxELEY9ICxGBqwiCFIxIVo9IFoGrSIEASIIWBoEBCAYBkkgWCIIWCFabSIMWCAGGVgCLCIQWgwgWgwgWgwgWgwgWgwgWgwgWgwgWgwgWj0CGR4NBCAELAUhHSEcLEQsRCxELEYFBBghBCEGCCGSBAQhBC4NBCAEIQYEIRgsRCxELEQsRAZBWjF8WrB+FVupfjFaHXwFRXxxfCxELEQsRCxELEV8LEQsRCxELERwLUYRfgkCCHwCCH1yBHxYoHygfKB8oHyiMHyiPHygfKB8ogl8ogl9oVkCBXB8cKB8oHygfKB8ojB8ojx8oHygfKIJfKIJfaIFfHChcH4IWlR8Wrl8WqV+FFh+HaI8fFpNfg1Sbt1+fSNKKHxyEux+BFpsfhBaWSEGBhggBBgGHSIRQSIlWlwiBQAiEQI9IQKdIQAiCAYNW5QiCFkgWCBaCCItWh0gAgQgAgUgAiwiCAIFIAIEWg0gKCIJWmUhVRoNWQJhIiECDVkGEUIJWiECESBVIAIRQjUiDQEGLCIYAhRYIjhmBFoFAlx2GAB6CX4EBgV8WAYRfgVZfh1iEUIIYFpQghkCEFoEBAINBQFaEX1YfgQGxGItWghiFCIIAQYEIQIRWgkhWgkhWgkiEFoMIFoMIFp1IgVa5CINAAUBWhFCCVimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKimNKoVWixqBVpgbgVaH/2uY/1aB/1+DCIVWggiCFhcAhFcIhhcWghcWFxZXFlcWhFe5CIdWgbUIEQunSFaaSIMWCI9WhUgKgQiHQA1RTUYLESWCVodAgh8LEQsRCxELEQsRCxELEQsRXwsRgx8RHxEWXEYfCxELEQsRg18WHwkKH4FWgggWwwhWJhYGXwkKXwsRXxEfEYUfXIEfBo0fCx8Rjh8LHxEfC1ELURwfhGiWH1yPH4EWgl9Wgl9Wgl9WgR+BFgoJgR9JFoMIhFaBACwUVoVIFoxI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");
  const len = bytes.length;
  const entries = []
  let value = 0;
  for (let i = 0; i < len; ++i) {
    const byte = bytes.charCodeAt(i);
    if (byte & 0x80) {
      value = (value | (byte & 0x7F)) << 7;
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
const uLineBreakValues = ["CM","BA","LF","BK","CR","SP","EX","QU","AL","PR","PO","OP","CP","IS","HY","SY","NU","CL","NL","GL","AI","BB","XX","HL","SA","JL","JV","JT","NS","AK","VI","ID","AS","VF","ZW","ZWJ","B2","IN","WJ","EB","CJ","H2","H3","SG","CB","AP","RI","EM"];
function uLineBreak(c) { return uLineBreakValues[uLineBreakAsInt(c)]; }
