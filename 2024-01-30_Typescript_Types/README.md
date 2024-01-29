# Understanding the TypeScript type system

🌟 Join us for an exciting exploration into the world of TypeScript and the use of types! 🚀

Whether you're a beginner or an advanced developer, this event is for you! We'll dive deep into the power of types in TypeScript and how they can enhance your development experience.

🔬 Learning Steps
- Understanding the Basics of TypeScript
-> https://youtu.be/ahCwqrYpIuM?t=314&si=ZyVXRIbYreAG6Bvp

- TypeScript Handbook: Advanced Types
-> https://www.typescriptlang.org/docs/handbook/2/types-from-types.html

- Utility types
-> https://www.youtube.com/watch?v=hWww6L3vI5A

- TypeScript Deep Dive
-> https://basarat.gitbook.io/typescript

Whether you're just starting with TypeScript or looking to level up your skills, this event will provide valuable insights and practical knowledge. Don't miss out on this opportunity to expand your TypeScript expertise! 🎉
Remember to bring your enthusiasm and questions! Let's learn and grow together. 🌈💻

# The Kata

You are provided with a `FormBuilder` class. This class has been written by someone who doesn't know anything about typescript types, and who clearly doesn't have time to lose with writing so-called "clean code".

Thankfully, you are here to save the day!

## Step 1
Your role will be to figure out what the code does, and remove **all** `any`, and **all** non-null assertion operators (`!` at the end of variables)

## Step 2
Change the code however you like so that the external user of the FormBuilder class doesn't have to infer the type when getting the form values:

```typescript
const myForm = new FormBuilder('form-container');

myForm.addField('date-of-birth', {
    type: 'date',
    label: 'Your date of Birth',
});

// Here, value should automatically be of the type `Date | null`, not `Date | number | string | null`
const value = myForm.getFieldValue('date-of-birth');
```

## Step 3
When using `setFieldValue()`, the function should only accept the proper type as the second argument:

```typescript
const myForm = new FormBuilder('form-container');

myForm.addField('date-of-birth', {
    type: 'date',
    label: 'Your date of Birth',
});

myForm.setFieldValue('date-of-birth', '1997')
//                                    ^
//                                    Error - A Date was expected, but a string was received.
```

# About the code

Although you shouldn't need it, you can run the code using:

```bash
npm run build
npm run serve
```

---

## Reminders

```typescript
class MyClass {
    constructor (private property: number) {}
}

// Is the same as

class MyClass {
    private property: number;

    constructor(prop: number) {
        this.property = prop;
    }
}
```

Here are a few type examples, to refresh your memories:
```typescript
// Basic types
const var: Date | number | string | null;

const array: (typeof var)[];

const bool: boolean;

const obj: {[key: string]: Date};
// Same as
const obj2: Record<string, Date>;

const func: (num1: number, num2: number) => number;

// Type alias
type Person = {
    name: string;
    age: number;
    residence: {
        address: string;
        city: string;
        country: string;
    }
}

function getPersonResidence(person: Person): Person['residence'] {
    return person.residence
}

// Generics
type FetchResponse<TData> {
    success: boolean;
    data: TData;
    timestamp: Date;
}

async function fetchData<TData extends number | string = number | string>(address: string): Promise<FetchResponse<TData>> {
    return fetch(address, options);
}

fetchData<Date>('/api/get-data')
// |
// '-> Will cause an error because Date is not 'number' | 'string'

const res = await fetchData<number>('/api/get-data');
const data = res.data;
// |
// '-> data will be of the type `number`

const res = await fetchData('/api/get-data');
const data = res.data;
// |
// '-> data will be of the type `number | string`


```

---

Happy coding!
