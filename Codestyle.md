# Code Style Guide

## General Principles

- Use clear, descriptive names for variables, functions, and classes.
- Write self-documenting code; add comments where necessary.
- Keep functions small and focused on a single task.
- Avoid code duplication; use reusable components and functions.

## File & Folder Structure

- Organize files by feature or domain.
- Use `camelCase` for file and folder names, except for React components (`PascalCase`).

## JavaScript/TypeScript

- Use `const` and `let` instead of `var`.
- Prefer arrow functions for callbacks and anonymous functions.
- Use strict equality (`===` and `!==`).
- Always handle errors in asynchronous code.
- Use template literals for string concatenation.

## React

- Use functional components and hooks.
- Name components with `PascalCase`.
- Keep component files under 300 lines.
- Separate presentational and container components.

## CSS/SCSS

- Use BEM naming convention for classes.
- Prefer CSS modules or styled-components for scoped styles.
- Avoid inline styles except for dynamic values.

## Linting & Formatting

- Use ESLint and Prettier for code consistency.
- Run linters before committing code.
- Fix all warnings and errors before merging.

## Git

- Use meaningful commit messages.
- Create feature branches for new work.
- Rebase and squash commits before merging to `main`.

---

_Last updated: 2024-06_
