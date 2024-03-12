#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("Usage: %s <sequence>\n", argv[0]);
        return 1;
    }

    char *sequence = argv[1];

    printf("%s\n", sequence);

    int x = 0;
    int y = 0;

    srand(time(NULL));

    for (int i = 0; i < 1000; i++) {
        printf("Robot is moving randomly\n");
        char xory = (rand() > RAND_MAX / 2) ? 'x' : 'y';
        if (xory == 'x') {
            x += (rand() > RAND_MAX / 2) ? 1 : -1;
        } else {
            y += (rand() > RAND_MAX / 2) ? 1 : -1;
        }

        printf("> %d;%d\n", x, y);
    }

    return 0;
}
