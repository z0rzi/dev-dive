# Writing assistant

You are provided with a text with typos (`./chX.txt`) and a dictionary (`./dictionary.txt`).

You can find the corrected version of the file in `./corrected.txt`, to check your results.

To simplify the exercise, the typos respect a few base rules:
- There is never more than one typo per word.
- There is no typo on words smaller than 5 characters.
- There is no typo on words containing non-letter character
- A typo is always a letter replacement ("Jello" instead of "Hello")
- A typo is never a missing letter or an added letter. (So, no "Helo", or "Helllo")

## Challenge 1 - Finding the typos

Read the file `./ch1.txt`, and find all the typos present in this file. Meaning, all words of 5 letters or more which are not present in the dictionary.

Be aware that all the words in the dictionary are in lowercase, and some words in the articles might be capitalized.

## Challenge 2 - Correcting the typos

Now that you found the typos, you will have to correct them. Compare the result with the file `./article.txt`
Make sure to maintain the case of the words.

## Challenge 3 - Be aware of the letter proximity

When you meet a word with a typo, some corrections are more probable than others.

For example, if you meet the word `'lpve'`, it was most likely meant to be the word `'love'`, and not `'live'`, because `o` and `p` are next to eatchother on the keyboard.

You can use the file `./keyboard-proximity.txt` to help you.

Read the file `./ch3.txt`, and correct it in the right way.

Warning, typos are now made on words of length 3 and 4.

## Challenge 4 - Transposed letters

A typo can now be a transposition of letters. For example, `Hlelo` instead of `Hello` (`e` <=> `l`), or `Milseading` instead of `Misleading` (`l` <=> `s`).

Correct the file `./ch4.txt`

There cannot be a transposition and a letter mistype in the same word.

## Challenge 5 - Forgotten space

Sometimes, the space is forgotten, and 2 words are stuck together.

- No more than 2 words can be stuck together.
- The stuck words never have typos.
- Both of the words are always of length 3 or more.

Correct the file `./ch5.txt`
