
import jieba
from glob import glob
from typing import Dict, List, Set, Tuple, Optional, ClassVar
import math
import re

import marko
import frontmatter
from bs4 import BeautifulSoup


files = glob("**/*.md", recursive=True)

class Word(object):

    def __init__(self, repr):
        self.repr = repr
        self.files = {}
    def found_in_file(self, file):
        if file in self.files:
            self.files[file] += 1
        else:
            self.files[file] = 1

    def size_of_files(self):
        return len(self.files.keys())
    
    def count_in_file(self, file):
        if file in self.files:
            return self.files[file]
        return 0

class File(object):
    
    def __init__(self, name):
        self.name = name
        self.wc = 0
        self.words = set()

    def word(self, word):
        self.wc += 1
        self.words.add(word)

class Repository(object):

    def __init__(self):
        self.files = {}
        self.words = {}
    
    def found_word(self, file, word) -> None:
        if not (file in self.files):
            self.files[file] = File(file)
        self.files[file].word(word)
        if word in self.words:
            self.words[word].found_in_file(file)
        else:
            self.words[word] = Word(word)
            self.words[word].found_in_file(file)

    def size_of_files(self) -> int:
        return len(self.files.keys())

    def tfidf(self, file):

        if not (file in self.files):
            return None
        
        fileObj = self.files[file]

        words = {}

        for word in fileObj.words:
            if word in words:
                continue;
            wordObj = self.words[word]
            tf = wordObj.count_in_file(file) / fileObj.wc
            idf = math.log(len(self.files) / (wordObj.size_of_files() + 1), 10)
            words[word] = tf*idf

        return sorted(words.items(), key=lambda x: x[1], reverse=True)[0:10]

r = Repository()

SKIPPED=re.compile("^[`\+\-\*·。，：_~\[\]\$\<\>\|《》！\,\’.]+$")

LINK=re.compile("!?\[(.*)\]\((.*)\)")

STOPWORDS = set([
    '的',
    '是',
    '也',
    '吧',
    '个',
    '在',
    '要',
    '了',
    '这个',
    '那个',
    '从',
    "对",
    "但",
    "可是",
    "并且",
    "好",
    "你",
    "一个",
    "这",
    "那",
    "我",
    "我们",
    "们",

    "to",
    "of",
    "from",
    "and",
    "but",
    "then",
    "if",

    "in",
    "on",

    "for",
    "as",
    "vs",
    "ve",
    "have",
    "can",
    "will",
    "do",
    "should",

    "am",
    "is",
    "are",
    "be",
    "was",
    "were",

    "a",
    "an",
    "the",
    "i",
    "you",
    "he",
    "she",
    "it",
    "me",
    "him",
    "her",
    "my",
    "your",
    "his",
    "we",
    "us",
    "they",
    "them",
    "our",
    "their",
    "this",
    "that",
    "there",
    "these",
    "those",
    "s",
    "some",
    "any",
    "none"
])

def filter_text(lines: str) -> str:
    try:        
        text = frontmatter.loads(lines).content
        lines = text
    except Exception as e:
        print(lines)
        print(e)

    plain_html = marko.convert(lines)

    soup = BeautifulSoup(plain_html, features='html.parser')

    for el in soup.find_all('pre'):
        el.extract()

    return soup.get_text()

for file in files:
    with open(file,encoding='utf-8') as f:
        text = filter_text(f.read())
        
        s = jieba.cut(text)
        for word in s:
            if SKIPPED.match(word):
                continue
            if word.lower() in STOPWORDS:
                continue
            r.found_word(file, word.lower())

for file in r.files:
    print(file, r.tfidf(file))