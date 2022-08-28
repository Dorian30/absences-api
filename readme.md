# 🚀 Crewmeister Challenge

This project was made Node. Read the readme for further instructions on running the project, project's conventions, tech stack, tech decisions.

Node was picked since it does well with concurrency.

## Summary

- [Context](#Context)
- [Tech Stack](#💻-tech-stack)
- [Product Requirements](#📝-product-requirements)
- [Improvements](#💡improvements)
- [Git Convention](#💬-convention)
- [How to run project locally](#⚙️-how-to-run-project-locally)
- [Folders structure](#🗂-folders-architecture)

## Context

At Crewmeister we like to work closely with our clients, listening to their demands and developing solutions for their problems. One of the most requested features is a way for company owners to manage sickness and vacations of employees.

We decided to implement this feature for our clients and we are calling it the Absence Manager.

[Heroku](https://absences-api.herokuapp.com/)

## 💻 Tech Stack

---

- Node
- Tests: Jest
- ESLint + Prettier + Husky + Staged-lint
- Typescript.
- Domain Driven Design

## 📝 Product Requirements

---

- [x] I want to see a list of absences including the names of the employees.
- [x] I want to see the first 10 absences, with the ability to paginate.
- [x] I want to see a total number of absences.
- [x] For each absence I want to see:
- [x] Member name.
- [x] Type of absence.
- [x] Period.
- [x] Member note (when available).
- [x] Status (can be 'Requested', 'Confirmed' or 'Rejected').
- [x] Admitter note (when available).
- [x] I want to filter absences by type.
- [x] I want to filter absences by date.
- [x] I want to see a loading state until the list is available.
- [x] I want to see an error state if the list is unavailable.
- [x] I want to see an empty state if there are no results.
- [x] I can generate an iCal file and import it into outlook. (Bonux)

## 💡Improvements

---

A list of nice to haves or technical and functional improvements to enhance the product or module on next iterations.

- **Paths:** Implement aliases for paths.
- **Types:** Improve some typescript interface.
- **Testing:** Add testing to the project, due to lack of time they weren't included yet.
- **Framework:** Implement a more robust framework like Nestjs for DDD.

## 💬 Convention

---

Following commitizen convention every commit is in active voice with one of these prefix: chore, feat, fix, docs, tests. For branch names the following convention is set:

`feat|fix|chore|tests/#ticket__description`

Commit messages have the following structure:

`feat|fix|chore|tests: [#ticket-number] summary`

For every ticket or task a branch is made and then a pull request open. Once is approved, it is merge through squash a merge to keep the commit tree clean.

## ⚙️ How to run project locally

In the project directory, you can run:

### `npm rund`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

it will reload if you make edits.\

### `npm start`

Runs the app in the production mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🗂 Folders Architecture

---

```
src
└──index.ts // Entry point
└──container // For dependency injection
│
└──controllers
│     └──index.ts
│     └──__tests__
│     └──Absences
│     └──Calendar
└──dtos // endpoint responses
│     └── index.ts
│     └── IAbsences
└───entities // Mocked data or db
└───interfaces // General app interfaces
└───services
│      └───index.ts
│      └───Absences
│      └───Members
│      └───Calendar
│           └── utils.ts
│           └──index.tsx
│
└───utils
│     └──index.ts // Entry point
│     └──__tests__
```
