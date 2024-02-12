# Regular Expressions

⭐ This week, we're going to talk about Regular Expressions!

Regular Expressions are an essential tool for developers as they provide a powerful way to search, manipulate, and validate text patterns.

Whether you're working with data validation, text parsing, or searching for specific patterns in a large dataset, Regular Expressions can greatly simplify your tasks and improve your productivity.

Join us for an exciting exploration about Regular Expressions and discover how they can enhance your development skills and make your coding life easier! ✨✨✨

🔬 Learning Steps
- What is RegExp?
-> https://www.youtube.com/watch?v=sXQxhojSdZM

- Learn Regular Expressions In 20 Minutes
-> https://www.youtube.com/watch?v=rhzKDrUiJVk

- Cheat sheet
-> https://coderpad.io/regular-expression-cheat-sheet/


## The Kata

For each challenge, you are provided with an input file, and an output file. Your goal is to write a function which will take the input file as an input, and return what is present in the output file.

You may use the programming language of your choice.

### Challenge 1: Extracting URLs

In this challenge, you will write a regular expression to extract URLs from a given text. The URLs should match the following criteria:

- The URL should start with either `http://` or `https://`.
- The domain name should consist of letters, numbers, hyphens, and periods.
- The URL may contain a path, which should start with a forward slash (`/`) and can consist of letters, numbers, hyphens, and forward slashes.

Write a function `extractURLs(text)` that takes a text as input and returns an array of URLs found in the text.

Example usage:

```javascript
console.log(extractURLs('Visit our website at http://www.example.com or https://example.com/path')); // ['http://www.example.com', 'https://example.com/path']
console.log(extractURLs('Check out this URL: http://www.example.com')); // ['http://www.example.com']
```

### Challenge 2: Formatting Phone Numbers

In this challenge, you will write a regular expression to format phone numbers in a given text. The phone numbers should match the following criteria:

- The phone number should consist of 9 digits.
- The phone number may be found in different formats:
    - Spanish phone numbers `123456789`, `123-456-789`, `+34 123456789`, `123.456.789`.
    - French phone numbers `06 77 63 62 12`, `0783924718`, `+33 6 63 77 65 43`, `+33 7.77.63.56.34`
    - UK phone numbers: `01234 567890`, `+44 1234 567890`, `+44-1234-567890`

- The formatted phone number should be in the following formats:
    - Spanish phone numbers `+34 603 432 433`
    - French phone numbers `+33 6 77 34 21 45`
    - UK phone numbers: `+44 1234 321423`

- Any phone number which has a country code not from spain, france, or the UK should be formatted as `+XX XXXXXXXXXXX`

Write a function `formatPhoneNumbers(text)` that takes a text as input and returns the text with all phone numbers formatted according to the criteria.

Example usage:

```javascript
console.log(formatPhoneNumbers('Call me at 603433431 or +33677636544')); // 'Call me at +34 603 433 431 or +33 6 77 63 65 44'
console.log(formatPhoneNumbers('Contact us at 603-433-431')); // 'Contact us at +34 603 433 431
console.log(formatPhoneNumbers('For more informations about the product N°378492738, Call us at 01234567890')); // 'For more informations about the product N°378492738, Call us at +44 1234 567890'
```

To avoid mistaking a phone number with any other long number present in the text, make sure that the number is preceded by a blank character (use [lookbehind](https://javascript.info/regexp-lookahead-lookbehind#lookbehind))

### Challenge 3: HTML to markdown

In this challenge, you will use regular expressions to parse an HTML document, and transform it to Markdown.

- The HTML tag should start with an opening angle bracket (`<`), followed by the tag name, and end with a closing angle bracket (`>`).
- The tag name should consist of letters, numbers, hyphens, and / or underscores.
- The HTML tag may contain attributes, which are enclosed in double quotes (`"`).

Write a function `html2md(html)` that takes an HTML document as input and returns a markdown document as the output


Example usage:

```javascript
console.log(html2md('<h1>Welcome to my website</h1><p>This is a paragraph</p>')); // '# Welcome to my website\n\nThis is a paragraph'
console.log(extractHTMLTags('<a href="https://www.example.com">Visit our website</a>')); // [Visit our website](https://www.example.com)
```

**Notes**:
To make this challenge simpler, we guarantee that no tags will be nested, except for `<b></b>`, `<a></a>` and `<i></i>`, which can appear in `<hN></hN>` and `<p></p>` tags.
