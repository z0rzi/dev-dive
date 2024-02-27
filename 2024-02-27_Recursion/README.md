# Recursion

⭐ Get ready to dive into the fascinating world of recursion at our next DevDive event! 🚀

Recursion is a powerful concept in programming that allows a function to call itself, enabling elegant and efficient solutions to complex problems. It is widely used in various algorithms and data structures, such as tree traversal, sorting, and searching.

Join us as we explore the fundamentals of recursion and learn how to harness its power to solve real-world problems. Whether you're a beginner or an experienced developer, this event is for you!

## 🔬 Learning Steps

Recursion in 100 seconds
-> https://www.youtube.com/watch?v=rf60MejMz3E

By the end of this event, you'll have a solid understanding of recursion and its applications, allowing you to write more efficient and elegant code. Don't miss out on this opportunity to expand your programming skills! 🌈💻

Remember to bring your enthusiasm and questions! Let's learn and grow together. 🎉

# DevDive Recursion Kata

Welcome to the DevDive Recursion Kata! In this kata, we will explore the concept of recursion and its applications in solving various problems. Recursion is a powerful technique that involves solving a problem by breaking it down into smaller, simpler instances of the same problem.

## Challenge 1: Max( Array )

Write a recursive function `max(n)` that finds the maximum value in an array of number.

Example:

```
max([1, 5, 2, 75, 3, 83, 45, 53]) => 83
```

An additional rule: You should not declare any variable in the body of the function!

## Challenge 2: Recursive Countdown

Examples:

```typescript
countdown(0); // returns [ 0 ]
countdown(-1)(); // returns [ 1, 0 ] The countdown is recursive
countdown(-2)()(); // returns [ 2, 1, 0 ]
countdown(-3)()()(); // returns [ 3, 2, 1, 0 ]
countdown(5); // returns [ 0 ]
```

The array, containing the countdown history, is returned only when the countdown reaches zero. If the countdown is not zero, a function is returned, decreasing by one the countdown.

More examples:

```typescript
countdown(-2)(+1); // returns [ 2, 0 ] This can also go forward, skipping a step
countdown(-5)()()()()(); // returns [ 5, 4, 3, 2, 1, 0 ]
countdown(-5)(+2)()(); // returns [ 5, 2, 1, 0 ] This skips two steps
countdown(-5)()(+2)(); // returns [ 5, 4, 1, 0 ] This skips two steps
countdown(-5)(+1)()(+1); // returns [ 5, 3, 2, 0 ]
countdown(-5)(+20); // returns [ 5, 0 ]

countdown(-1)(-1)(); // returns [ 1, 1, 0 ] The countdown can go backward, repeating a step
countdown(-1)(-1)(-1)(); // returns [ 1, 1, 1, 0 ]
countdown(-2)()(-1)(); // returns [ 2, 1, 1, 0 ]
countdown(-1)(-3)()()(); // returns [ 1, 3, 2, 1, 0 ]

countdown(-3)(-5)()(+2)(-1)()()(); //returns [ 3, 7, 6, 3, 3, 2, 1, 0 ] Mixing forward and backward
```

## Challenge 3: Fuzzy matching

Your task here is to build a fuzzy matcher.

Given a list of text, and a search, it should identify which item is the best match for the search

A few example:

```typescript
searchMatch('readme', [
    '2024-01-30_Typescript_Types/README.md',
    '2024-01-30_Typescript_Types/index.html',
    '2024-01-30_Typescript_Types/package.json',
    '2024-01-30_Typescript_Types/src/FormBuilder.ts',
    '2024-01-30_Typescript_Types/src/index.ts',
    '2024-01-30_Typescript_Types/tsconfig.json',
    '2024-02-13_Regular_Expressions/README.md',
    '2024-02-13_Regular_Expressions/challenge_1/input.txt',
    '2024-02-13_Regular_Expressions/challenge_1/output.txt',
    '2024-02-13_Regular_Expressions/challenge_2/input.txt',
    '2024-02-13_Regular_Expressions/challenge_2/output.txt',
    '2024-02-13_Regular_Expressions/challenge_3/input.html',
    '2024-02-13_Regular_Expressions/challenge_3/output.md',
    '2024-02-27_Recursion/README.md',
]);
// => [
//     '2024-01-30_Typescript_Types/README.md',
//     '2024-02-13_Regular_Expressions/README.md',
//     '2024-02-27_Recursion/README.md',
// ]

searchMatch('recureadme', [
    '2024-01-30_Typescript_Types/README.md',
    '2024-01-30_Typescript_Types/index.html',
    '2024-01-30_Typescript_Types/package.json',
    '2024-01-30_Typescript_Types/src/FormBuilder.ts',
    '2024-01-30_Typescript_Types/src/index.ts',
    '2024-01-30_Typescript_Types/tsconfig.json',
    '2024-02-13_Regular_Expressions/README.md',
    '2024-02-13_Regular_Expressions/challenge_1/input.txt',
    '2024-02-13_Regular_Expressions/challenge_1/output.txt',
    '2024-02-13_Regular_Expressions/challenge_2/input.txt',
    '2024-02-13_Regular_Expressions/challenge_2/output.txt',
    '2024-02-13_Regular_Expressions/challenge_3/input.html',
    '2024-02-13_Regular_Expressions/challenge_3/output.md',
    '2024-02-27_Recursion/README.md',
]);
// => [
//     '2024-02-27_Recursion/README.md',
// ]

searchMatch('13.txt', [
    '2024-01-30_Typescript_Types/README.md',
    '2024-01-30_Typescript_Types/index.html',
    '2024-01-30_Typescript_Types/package.json',
    '2024-01-30_Typescript_Types/src/FormBuilder.ts',
    '2024-01-30_Typescript_Types/src/index.ts',
    '2024-01-30_Typescript_Types/tsconfig.json',
    '2024-02-13_Regular_Expressions/README.md',
    '2024-02-13_Regular_Expressions/challenge_1/input.txt',
    '2024-02-13_Regular_Expressions/challenge_1/output.txt',
    '2024-02-13_Regular_Expressions/challenge_2/input.txt',
    '2024-02-13_Regular_Expressions/challenge_2/output.txt',
    '2024-02-13_Regular_Expressions/challenge_3/input.html',
    '2024-02-13_Regular_Expressions/challenge_3/output.md',
    '2024-02-27_Recursion/README.md',
]);
// => [
//    '2024-02-13_Regular_Expressions/challenge_1/input.txt',
//    '2024-02-13_Regular_Expressions/challenge_1/output.txt',
//    '2024-02-13_Regular_Expressions/challenge_2/input.txt',
//    '2024-02-13_Regular_Expressions/challenge_2/output.txt',
// ]
```

---

A few additional rules to implement if you still have time:

- Single characters cannot be matched:
```txt
'abc' matches 'alphabet/abc/hello'
                        ^^^
BUT

'abc' DOES NOT match 'alphabet/barcelona/cup', because the matches are isolated.
                      ^        ^         ^
```

- The output array should be ordered, best matches first:
    - The fewer clusters, the better the match is:
        ```typescript
            s = 'abcdefg'

            'abc/fdsq/defg' is a better match than 'ab/cde/fg'
             ^^^      ^^^^                          ^^ ^^^ ^^
        ```
    
    - The closer to the end of the string the matches are, the better it is
        ```typescript
            s = 'abcdefg'

            'abc/fdsq/abcdefg.txt' is a better match than 'abcdefg/document.docx'
                      ^^^^^^^                              ^^^^^^^
        ```
