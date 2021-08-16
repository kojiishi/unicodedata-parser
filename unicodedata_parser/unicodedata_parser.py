#!/usr/bin/env python3
import collections
import enum
import re
import urllib.request


def u_hex(value):
    return f'{value:04X}'


def u_enc(c, encoding):
    code = 0
    for byte in c.encode(encoding, 'ignore'):
        code = code * 256 + byte
    return u_hex(code) if code else ''


def _read_unicode_data_lines(name):
    url = f'https://www.unicode.org/Public/UNIDATA/{name}.txt'
    with urllib.request.urlopen(url) as response:
        body = response.read().decode('utf-8')
    return body.splitlines()


BidiBrackets = collections.namedtuple('BidiBrackets', ['pair', 'type'])


class EmojiType(enum.Flag):
    Emoji = enum.auto()
    Emoji_Presentation = enum.auto()
    Emoji_Modifier = enum.auto()
    Emoji_Modifier_Base = enum.auto()
    Emoji_Component = enum.auto()
    Extended_Pictographic = enum.auto()


class UnicodeDataParser(object):
    """Parse [Unicode character database] data files.

    This class parses data in the [Unicode character database].

    By default, it downloads the data files from
    <https://www.unicode.org/Public/UNIDATA/>.
    Custom loader can be used by the constructor argument.

    [Unicode character database]: https://unicode.org/reports/tr44/
    """
    def __init__(self, read_lines=_read_unicode_data_lines):
        self._read_lines = read_lines

    def bidi_brackets(self):
        def convert_bidi_brackets_value(value):
            assert len(value) == 2
            return BidiBrackets(int(value[0], 16), value[1])

        return self.parse('BidiBrackets', convert_bidi_brackets_value)

    def blocks(self):
        return self.parse('Blocks')

    def emoji(self):
        dict = {}

        def setter(code, value):
            value |= dict.get(code, EmojiType(0))
            dict[code] = value

        lines = self._read_lines('emoji/emoji-data')
        self.parse_lines(lines, setter, converter=lambda v: EmojiType[v])
        return dict

    def line_break(self):
        return self.parse('LineBreak')

    def scripts(self):
        return self.parse('Scripts')

    def script_extensions(self):
        return self.parse('ScriptExtensions', lambda v: v.split())

    def vertical_orientation(self):
        return self.parse('VerticalOrientation')

    def parse(self, name, converter=None):
        lines = self._read_lines(name)
        return self.dict_from_lines(lines, converter)

    @staticmethod
    def dict_from_lines(lines, converter=None):
        dict = {}

        def setter(code, value):
            dict[code] = value

        UnicodeDataParser.parse_lines(lines, setter, converter=converter)
        return dict

    @staticmethod
    def parse_lines(lines, setter, converter=None):
        for line in lines:
            # Skip comments.
            line = re.sub(r'\s*#.*', '', line)
            if not line:
                continue
            # Data columns are separated by ';'.
            columns = re.split(r'\s*;\s*', line)
            assert len(columns) >= 2
            value = columns[1] if len(columns) == 2 else columns[1:]
            if converter:
                value = converter(value)

            # `columns[0]` is a code point or a range of code points.
            code = columns[0]
            codeRange = code.split('..')
            if len(codeRange) == 1:
                code = int(code, 16)
                setter(code, value)
            elif len(codeRange) == 2:
                min = int(codeRange[0], 16)
                max = int(codeRange[1], 16)
                for code in range(min, max + 1):
                    setter(code, value)
            else:
                assert False

    @staticmethod
    def hex(value):
        return u_hex(value)
