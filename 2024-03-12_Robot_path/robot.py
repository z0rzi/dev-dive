import random
import sys

sequence = sys.argv[1]

print(sequence);

x = 0
y = 0

for i in range(1000):
    print("Robot is moving randomly")
    xory = "x" if random.random() > 0.5 else "y"
    if xory == "x":
        x += 1 if random.random() > 0.5 else -1
    else:
        y += 1 if random.random() > 0.5 else -1

    print(f"> {x};{y}")
