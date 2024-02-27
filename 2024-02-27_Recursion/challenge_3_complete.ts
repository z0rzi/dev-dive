/**
 * Finds all the positions of a character in a string.
 * Case insensitive.
 */
function charPos(cara: string, str: string) {
  const positions = [] as number[];
  for (let i = 0; i < str.length; i++) {
    if (str[i].toLowerCase() === cara.toLowerCase()) {
      positions.push(i);
    }
  }
  return positions;
}

function isMatch(
  search: string,
  item: string,
  clusterSize = 0,
  score = 0
): number {
  if (search.length === 0) {
    // The search string is empty, this is a match!
    return score;
  }

  const idxs = charPos(search[0], item);
  if (!idxs.length) {
    // The next character is not found in the item.
    // This is not a match
    return -1;
  }

  /** Contains all the scores >= 0 */
  const allScores = [] as number[];

  for (const idx of idxs) {
    // looping through all possible indexes of the next character

    if (clusterSize === 1 && idx !== 0) {
      // we don't accept a cluster of 1
      continue;
    }

    // adding more score if the match is at the end of the string
    const eofScore = 100 - (item.length - idx);

    // adding more score if this is a big cluster
    const clusterScore = clusterSize * 5;

    // Calling the function on the next character
    const newScore = isMatch(
      search.slice(1),
      item.slice(idx + 1),
      idx === 0 ? clusterSize + 1 : 1,
      score + eofScore + clusterScore
    );

    if (newScore >= 0) {
      allScores.push(newScore);
    }
  }

  if (allScores.length) {
    // We only keep the best score
    return Math.max(...allScores);
  }

  return -1;
}

function searchMatch(search: string, items: string[]) {
  const matches = [] as [number, string][];

  for (const item of items) {
    const score = isMatch(search, item);
    if (score >= 0) {
      matches.push([score, item]);
    }
  }

  matches.sort((a, b) => b[0] - a[0]);

  return matches;
}

const res = searchMatch("remd", [
  "2023-01-30_Typescript_types/",
  "2023-10-17_Decorators/",
  "2023-10-17_Decorators/README.md",
  "2023-10-17_Decorators/package.json",
  "2023-10-17_Decorators/src/",
  "2023-10-17_Decorators/src/index.ts",
  "2023-10-17_Decorators/src/middlewares.ts",
  "2023-10-17_Decorators/src/userController.ts",
  "2023-10-17_Decorators/src/userModel.ts",
  "2023-10-17_Decorators/src/userRoutes.ts",
  "2023-10-17_Decorators/src/users.json",
  "2023-10-17_Decorators/tsconfig.json",
  "2023-10-31_State_Management/",
  "2023-10-31_State_Management/README.md",
  "2023-10-31_State_Management/package.json",
  "2023-10-31_State_Management/src/",
  "2023-10-31_State_Management/src/Character.ts",
  "2023-10-31_State_Management/src/Map.ts",
  "2023-10-31_State_Management/src/Plot.ts",
  "2023-10-31_State_Management/src/Position.ts",
  "2023-10-31_State_Management/src/Room.ts",
  "2023-10-31_State_Management/src/Seed.ts",
  "2023-10-31_State_Management/src/index.ts",
  "2023-10-31_State_Management/tsconfig.json",
  "2023-11-14_Event_Loop/",
  "2023-11-14_Event_Loop/README.md",
  "2024-01-16_React_Signals/",
  "2024-01-16_React_Signals/README.md",
  "2024-01-16_React_Signals/package-lock.json",
  "2024-01-16_React_Signals/package.json",
  "2024-01-16_React_Signals/public/",
  "2024-01-16_React_Signals/public/favicon.ico",
  "2024-01-16_React_Signals/public/index.html",
  "2024-01-16_React_Signals/public/logo192.png",
  "2024-01-16_React_Signals/public/logo512.png",
  "2024-01-16_React_Signals/public/manifest.json",
  "2024-01-16_React_Signals/public/robots.txt",
  "2024-01-16_React_Signals/src/",
  "2024-01-16_React_Signals/src/App.css",
  "2024-01-16_React_Signals/src/App.test.tsx",
  "2024-01-16_React_Signals/src/App.tsx",
  "2024-01-16_React_Signals/src/LiveDashboard.tsx",
  "2024-01-16_React_Signals/src/Nav.tsx",
  "2024-01-16_React_Signals/src/dashboard-component.tsx/",
  "2024-01-16_React_Signals/src/dashboard-component.tsx/bar.tsx",
  "2024-01-16_React_Signals/src/dashboard-component.tsx/pie.tsx",
  "2024-01-16_React_Signals/src/dashboard-component.tsx/scatter.tsx",
  "2024-01-16_React_Signals/src/dashboard-component.tsx/utils.ts",
  "2024-01-16_React_Signals/src/index.css",
  "2024-01-16_React_Signals/src/index.tsx",
  "2024-01-16_React_Signals/src/logo.svg",
  "2024-01-16_React_Signals/src/react-app-env.d.ts",
  "2024-01-16_React_Signals/src/reportWebVitals.ts",
  "2024-01-16_React_Signals/src/setupTests.ts",
  "2024-01-16_React_Signals/tsconfig.json",
  "2024-01-30_Typescript_Types/",
  "2024-01-30_Typescript_Types/README.md",
  "2024-01-30_Typescript_Types/index.html",
  "2024-01-30_Typescript_Types/package.json",
  "2024-01-30_Typescript_Types/src/",
  "2024-01-30_Typescript_Types/src/FormBuilder.ts",
  "2024-01-30_Typescript_Types/src/index.ts",
  "2024-01-30_Typescript_Types/tsconfig.json",
  "2024-02-13_Regular_Expressions/",
  "2024-02-13_Regular_Expressions/README.md",
  "2024-02-13_Regular_Expressions/challenge_1/",
  "2024-02-13_Regular_Expressions/challenge_1/input.txt",
  "2024-02-13_Regular_Expressions/challenge_1/output.txt",
  "2024-02-13_Regular_Expressions/challenge_2/",
  "2024-02-13_Regular_Expressions/challenge_2/input.txt",
  "2024-02-13_Regular_Expressions/challenge_2/output.txt",
  "2024-02-13_Regular_Expressions/challenge_3/",
  "2024-02-13_Regular_Expressions/challenge_3/input.html",
  "2024-02-13_Regular_Expressions/challenge_3/output.md",
  "2024-02-13_Regular_Expressions/diff.sh",
  "2024-02-27_Recursion/",
  "2024-02-27_Recursion/README.md",
  "2024-02-27_Recursion/challenge_1.ts",
  "2024-02-27_Recursion/challenge_2.ts",
  "2024-02-27_Recursion/challenge_3.ts",
  "LICENSE",
  "README.md",
  "README.template.md",
]);
for (const line of res) {
  console.log(line);
}
