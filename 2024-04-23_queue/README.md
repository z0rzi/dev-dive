Source / Inspiration: https://leetcode.com/problems/number-of-visible-people-in-a-queue/description/

---

There are n people standing in a queue, and they are numbered from `0` to `n - 1` in back-to-front order. You are given an array `heights` of distinct integers where `heights[i]` represents the height of the ith person.

# Challenge 1 - Who can I see?

A person can see another person in front of them in the queue if everybody in between is shorter than both of them. More formally, the `i`th person can see the `j`th person if `i < j` and `min(heights[i], heights[j]) > max(heights[i+1], heights[i+2], ..., heights[j-1])`.

You are the last one in the line, calculate how many people you can see.

```
countSeeablePeople([10, 3, 4, 5, 6, 10, 9]) // => 5
countSeeablePeople([6, 6, 5, 5, 5, 6, 5]) // => 1
countSeeablePeople([6, 5, 4, 5, 5, 6, 5, 10]) // => 2
```

# Challenge 2 - More accuracy

Now, this algorithm but not very accurate. For example, in the following situation: `[10, 2, 2, 2, 2, 2, 2, 2, 2]`, our algorithm would return `1`, but it is clear that the last person can see all of the queue (8 persons)

Update your algorithm so that the following is true:
```
countSeeablePeople([10, 2, 2, 2]) // => 3
countSeeablePeople([10, 2, 2, 10, 9]) // => 3
```

A bit more challenging:

```
countSeeablePeople([10, 9, 8, 7, 6, 6]) // => 2
//                      ^           ^

countSeeablePeople([1, 2, 3, 4, 5, 7]) // 2
//                     ^           ^

countSeeablePeople([1, 1, 1, 2, 3, 4, 5, 6]) // 6
//                     ^     ^  ^  ^  ^  ^

countSeeablePeople([10, 4, 5, 1, 1, 1, 4]) // 3 (or maybe 4?)
//                      ^  ^        ?  ^
```

# Challenge 3 - People spacing

Until now, we assumed that the distance between each person was the same.
Pass a new array in the parameters of your function to include the spacing between each person.

# Challenge 4 - Curvature of the earth

Now, let's add a bit of maths in there!

Now, your function should take in parameter the diameter of the earth, and take in account the curvature of the earth.

# Challenge 5 - Eye level

Although your algorithm works, it is not physically accurate. People don't see from the top of their head, they see from their eyes.

Add a parameter to your function which indicates, the distance between your eyes and the top of your head.

This parameter can be negative (in which case, the person has snail-like eyes! 🐌)

