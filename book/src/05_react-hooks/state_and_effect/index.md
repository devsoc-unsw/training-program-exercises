# `useState` and `useEffect`

React components, by themselves, are self-contained - they are basically "just
functions", when React decides to render a certain component the corresponding
function just gets called. This is great for representing complex, potentially
repetitive HTML into simpler, reusable parts, but by themselves React components
are not interactive.

Consider the scenario where we want to record how many times a button has been
clicked. We can set up the layout pretty easily within React:

```jsx
const App = () => {
  return (
    <>
      <h1>Number of presses: 0</h1>
      <button>Press me!</button>
    </>
  );
};
```

But how do we keep track of the number of button presses? If we try to put the
variable for the number of presses inside our `App` function itself:

```jsx
const App = () => {
  let presses = 0;

  return (
    <>
      <h1>Number of presses: {presses}</h1>
      <button onClick={() => { presses += 1; }}>Press me!</button>
    </>
  );
};
```

But this doesn't work, because whenever React renders `App`, the function gets
called and `presses` gets reset back to 0! What do we do in this case, how do
we get React to "remember" certain variables as they get rendered over and over
again?

We can also try making `presses` a global variable:

```jsx
let presses = 0;

const App = () => {
  // Exact same code from last example
};
```

While this would work, imagine if *every* variable that we want React to "remember"
was made into a global variable. It's not necessarily a problem if we have one or
two components, but large-scale apps often have hundreds, if not *thousands*, of
components that depend on each other. You would need tens of thousands of global
variables in total, which can cause headaches - you'd need to make sure the names
don't clash, and you'd need to keep track of which components are using which
variables.

Furthermore, making variables that anyone can change (in programmer-speak, **mutable**)
global is a generally bad idea™️. Because any piece of code in our codebase can access
these global variables by definition, it's very possible that we could accidentally
write code that changes a global variable we're not meant to touch, causing very
hard-to-detect bugs.

Fortunately, React has a solution that is much cleaner.

## Introducing `useState`

`useState` is React's answer. From the [official React guide](https://react.dev/reference/react/hooks):

> **State lets a component "remember" information like user input.** For example,
> a form component can use state to store the input value, while an image gallery
> component can use state to store the selected image index.

This is exactly what we want! Let us rewrite our original example using `useState`:

```jsx
import { useState } from "react";

const App = () => {
  let [presses, setPresses] = useState(0);

  return (
    <>
      <h1>Number of presses: {presses}</h1>
      <button onClick={() => setPresses(presses + 1)}>Press me!</button>
    </>
  )
};
```

Notice a few things with `useState`:
- It takes in an argument, which is *the initial value of the variable* when the
  component first renders.
- It returns an *array*, where the 0th element is a variable that contains the
  value of `presses` itself, and the 1st element is a function that alters the
  value of `presses` (which we refer to as `setPresses`).

Copy and paste the above code into a default React app and see it work! `presses`
is "remembered" between renders, and as we click the button the heading changes,
incrementing `presses` with every click.

## Another problem, and introducing `useEffect`

React components are *pure* by default - in other words, if we give a component
the same arguments, it will always return the same output. But what happens if
we don't want that, and we want our components to interact with the outside world
in some way?

For example, let's say we wanted to create a component that updated the webpage's
title:

```jsx
const App = () => {
  let [name, setName] = useState("");

  // We want to set the page's title to be `name` whenever we edit our input
  return (
    <>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)} />
    </>
  );
};
```

The problem here is that `App` doesn't have access to the webpage's title, since
React is only "painting" components onto the screen. Each page's title is actually
controlled by the *browser* itself, which is an external API.

The solution here is to use `useEffect`, which allows us to interact with the
outside world!

```jsx
import { useEffect, useState } from "react";

const App = () => {
  let [name, setName] = useState("");

  // Call this function every time our component renders or updates
  useEffect(() => {
    document.title = `Hello ${name}`;
  });

  return (
    <>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)} />
    </>
  );
};
```

`useEffect` takes in a function, and runs that function every time the component
it's in needs to render or update. This works, but the function is called more
times than necessary - what if we had some other variable that wasn't `name` change?
Why do we need to update the webpage's title if `name` isn't changed?

`useEffect` actually takes in a *second* argument - the **dependency array**. This
is a list of variables that the function inside `useEffect` depends on - in other
words, the function should *only* run if any variable in the dependency array changes
since the last render. Because the function inside our `useEffect` call only depends
on `name`, we can put `[name]` as our second argument:

```jsx
const App = () => {
  // ...
  useEffect(() => {
    document.title = `Hello, ${name}`;
  }, [name]);
  // ...
};
```

> When looking at React code in the future, you may encounter something like this, where
> an empty array is provided as the second argument to `useEffect`:
> 
> ```jsx
> useEffect(() => { /* ... */ }, []);
> ```
>
> This is an example of what's known as a programming **idiom** - similar to an English
> idiom, where it's a piece of code that's *common* and understood to mean something
> that's *not immediately obvious* when looked at literally.
> 
> In an empty array, nothing ever changes between renders because nothing is available
> inside the array to *be* changed. Thus, this "idiom" basically allows us to call a
> function *once*, at the *very first render of a component*.
