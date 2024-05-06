# Challenge 1 - Trapping sheeps

Your role is to figure out how many sheep you can trap in a given space.

You will be given a map indicating you where are fences and where is empty space.

About the map:
- `O` indicates a fence
- A whole in the fence allows the sheeps to run away
- Diagonal fence connections are allowed.
- A sheep takes one space (width = 1, height = 1)

For example, in the following map, you can trap 2 sheeps:
```
OOOO
O  O
OOOO
```


In that one, you can't trap any sheep, because the fence has a hole:
```
OOOOOOOOOO
O         
O        O
O        O
O        O
O        O
OOOOOOOOOO
```


Here are a few more examples:

```
// 20 sheeps
OOOOOOOOOO
O         
OOOOOOOO O
O      O O
O      OOO
O        O
OOOOOOOOOO
```

```
// 34 sheeps
OOOOOOOOOOO
O          O
OOOO  OO OO
O      O O
O      OOO
O        O
OOOOOOOOOO
```

```
// 1 sheep
 O
O O
 O
```

# Challenge 2 - Trapping rainwater

Let's take it to the third dimension!

You are no longer trying to trap sheeps, you are now trying to trap rainwater.

Given a 3d map of a (very cubic) terrain, calculate how much rainwater can get trapped

For example:

Here, 1 bloc of water can get trapped, in the middle
```
111
101
111
```

Here's a 3D-ish representation, with `x` representing the trapped water:
```
         ____________
        /   /   /   /|
       /   /   /   / |
      /---/---/---/  /
     /   /xxx/   /| /
    /   /xxx/   / |/
   /---/---/---/  /
  /   /   /   /| /
 /___/___/___/ |/
 |   |   |   | /
 |___|___|___|/  
```


Here are more examples:

```
// 10 blocs of water
33333
32223
32123
32223
33333
```

```
// 4 blocs of water
143132
321324
233231
```

```
// 4 blocs of water
133132
321323
333231
```

```
// 14 blocs of water
1213112
1341312
1381012
12131212
13131313
```

```
// 1 bloc of water
355
545
555
```

```
// 3 blocs of water
5551
5115
5155
5258
```

```
// 57 blocs of water
99999
92129
92829
92329
99999
```

# Challenge 3 - Trapping gaz

Now, same as above, but we are working with gaz, meaning that the the 'hole' should be plugged from all sides, including above.

You will be provided with a 3d map of the space, as follows:

```
OOO
OOO
OOO

OOO
O O
OOO

OOO
OOO
OOO
```

The layers are separated by empty lines (`\n\n`). The above example contains one unit of gaz.

```
// 2 units
OOO
OOO
OOO

OOO
O O
OOO

OOO
O O
OOO

OOO
OOO
OOO
```

```
// 0 units, the gaz can escape
OOO
OOO
OOO

OOO
  O
OOO

OOO
O O
OOO

OOO
OOO
OOO
```

```
// 3 units
OOOO
OOOO
OOOO

OOO
O  O
OOO

OOO
O O
OOO

OOO
OOO
OOO
```

```
// 0 units, the gaz can escape
OOOO
O OO
OOOO

OOO
O  O
OOO

OOO
O O
OOO

OOO
OOO
OOO
```

```
// 2 units
OOOO
O OO
OOOO

OOO
OO O
OOO

OOO
O O
OOO

OOO
OO 
OOO
```


# Challenge 4 - The 4th dimention

You made it for 2d and for 3d, for sure, you can calculate how much of 4d space you can trap inside a 4d figure... right?

```
// 1 unit
OOO OOO OOO
OOO OOO OOO
OOO OOO OOO
        
OOO OOO OOO
OOO O O OOO
OOO OOO OOO
        
OOO OOO OOO
OOO OOO OOO
OOO OOO OOO
```

```
// 0 units, the 4d gaz escaped!
OOO OOO OOO
OOO OOO OOO
OOO OOO OOO
        
OOO OOO OOO
OOO O O O O
OOO OOO OOO
        
OOO OOO OOO
OOO OOO OOO
OOO OOO OOO
```

```
// 0 units, the 4d gaz escaped!
OOO OOO OOO
OOO OOO OOO
OOO OOO OOO
        
OOO OOO OOO
OOO O   OOO
OOO OOO OOO
        
OOO OOO OOO
OOO OOO OOO
OOO OOO OOO
```

```
// 3 units
OOO OOO OOO
OOO OOO OOO
OOO OOO OOO
OOO OOO OOO

OOO OOO OOO
OOO O O OOO
OOO OOO OOO
OOO OOO OOO

OOO OOO OOO
OOO O O OOO
OOO O O OOO
OOO OOO OOO

OOO OOO OOO
OOO OOO OOO
OOO OOO OOO
OOO OOO OOO
```
