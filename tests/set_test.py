import pytest

import unicodedata_reader as ur


def test_set_add_remove():
    s = ur.Set()
    s.add(1)
    s.add(3)
    s.add(5)
    assert 1 in s
    assert 3 in s
    assert 5 in s
    s.remove(3)
    assert 3 not in s
    s.remove(3)


def test_set_iter():
    s = ur.Set()
    s.add(1)
    s.add(5)
    assert list(s) == [1, 5]


def test_set_ior():
    s = ur.Set()
    s.add(1)
    s1 = ur.Set()
    s1.add(5)
    s |= s1
    assert (list(s), [1, 5])


def test_set_general_category():
    reader = ur.UnicodeDataReader()
    l = ur.Set.general_category('L', reader)
    lu = ur.Set.general_category('Lu', reader)
    assert 0x0041 in l
    assert 0x0041 in lu
    assert 0x0061 in l
    assert 0x0061 not in lu


def test_set_scripts_han():
    reader = ur.UnicodeDataReader()
    han = ur.Set.scripts('Han', reader)
    # https://github.com/unicode-org/unicodetools/issues/770#issuecomment-2041110463
    assert 0x2B739 in han  # Added in Unicode 15.0
    assert 0x323AF in han  # Added in Unicode 15.0
    assert 0x31350 in han  # Added in Unicode 15.0
    assert 0x2EBF0 in han  # Added in Unicode 15.1
    assert 0x2EE5D in han  # Added in Unicode 15.1


def test_set_scripts_hira():
    reader = ur.UnicodeDataReader()
    hira = ur.Set.scripts('Hiragana', reader)
    assert 0x3041 in hira


def test_set_script_extensions():
    reader = ur.UnicodeDataReader()
    kana = ur.Set.script_extensions('Kana', reader)
    assert 0x20 not in kana
    assert 0x3031 in kana
    hira = ur.Set.script_extensions('Hira', reader)
    assert 0x3031 in hira