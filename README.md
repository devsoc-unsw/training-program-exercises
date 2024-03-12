<p align="center" style="padding: 0">
  <picture>
    <source media="(prefers-color-scheme: light)" srcset="./img/fullTransparent.svg">
    <img width='300' alt="DevSoc Logo" src="./img/fullInvertTransparent.svg">
  </picture>
</p>

# 🏔️ Training Program Exercises

This repository contains a selection of exercises intended for 2024 DevSoc Trainees. The exercises aim to develop basic web development skills, in HTML/CSS/JS and React.

## Getting Started

Before continuing please ensure that you have the following installed on your machine:

- Node
- Git

Clone this repository:

```sh
git clone https://github.com/TAS-scorchedshadow/training-program-exercises.git
```

Explore all the exercise on offer on our [Guide](https://tas-scorchedshadow.github.io/training-program-exercises/book).

## Contributing

When adding a new exercise

1. Inside **exercises**, create a new directory to contain the starter code.
2. Inside **exercise-solutions**, create a new directory to contain the solutions, this should have the same name as the directory in exercises.
3. Create a markdown file with the exercise instructions inside the **book/src** and add it to **book/src/SUMMARY.md**.

Please check that the book will render properly by running the following command in the root directory:

```sh
mdbook build book --open
```

If the book has been updated correctly a new webpage will open in your browser. You will need to have `mdbook` installed which can be done by following the [installation documentation](https://rust-lang.github.io/mdBook/guide/installation.html#installing-the-latest-master-version).

Alternatively you can use the `serve` command, which will build your book and start a local web server:

```sh
mdbook serve book --open
```
