# Github Repositories Search

This is a web application built with React that allows users to search for GitHub repositories and view the search results in a table.

## Features
The following features were implemented in this project, in the specified order:

- Caching the search results to avoid unnecessary API calls.

- Presenting a simple loading/error state to the user.

- Sorting the table by columns, pagination, and changing the number of rows displayed.

- Updating the current URL on query change or table sort, so the same results are shown on page refresh.

- Firing API requests only when the user stopped typing, to avoid hitting the GitHub rate limits.

## Technologies
The following technologies were used in this project:

- React
- TypeScript
- React Router
- React Query
- Jest
- React Testing Library
- Semantic UI React
- husky
- prettier / eslint
- GitHub Actions

## Explaining decision

In this section few arguments what and why I used.

#### React Query

- React-Query is designed to work with server state management and caching, so it allows you to easily fetch and cache data from APIs
- This project is really low so react-query makes it easier to set up and maintain than for example Redux
- React-Query focuses on managing data, rather than application state

#### Pre-commit

The main purpose of using pre-commit hooks is to improve the quality and consistency of code and to catch errors before they are committed to the repository.

#### GitHub Actions

Actually this is simple why I decided to make this, it's just a code base improvement and make sure your code is ready for deploy. In my case I have eslint and test runner in my repo after pull request open and merge to master.

#### Sorting, search, pagination

- default value in search is because in the API ?q param is required, it's to discuss with UX what approach we should make in this case, because in this case sending a request on visit your page isn't good thing
- sorting locally is because in the API we can't sort for each fields there are only stars, forks etc
- pagination is delegated to the API and actually it's okay because why I shouldn't use this when API allows this

## Git flow 

When you would like start with my project keep in mind about linear git history, what does that mean? Here a example of your flow:

- fetch repo data
- create feature branch from main
- coding and pushing to your branch
- open pull request
- make sure you rebased with main
- code review 
- squash your commits, if you made crucial change don't squash all of them
- again make sure about rebase
- check github actions aren't failed
- merge to main

Commit messages partially in this convention: https://www.conventionalcommits.org/en/v1.0.0/

## Potential improvements

#### Cache

Although our project includes a client-side cache, our API receives low traffic, making it a suitable scenario to implement a caching server like Redis. By storing API responses in the cache, we can enhance the performance of the API. However, it is important to configure the caching server to retain the cached data for a specific period of time before it is automatically removed.

#### Our data is light

In my case I have to deal with really light data but in the API we have tons of keys let's imagine we need list all of them in the table it might be performance problem. My idea is we can use [virtual-table](https://codesandbox.io/s/github/tanstack/table/tree/main/examples/react/virtualized-rows?from-embed=&file=/src/main.tsx). You have keep in mind client side cache need also memory what if the use will have many cards in the browser? I hope you got me :) 

#### Table refactor

In my mind is a table refactor for create a reusable table component kind of table builder no matter what kind of data you will provide. It's cool I created reusable pagination component and custom hook for managing table, but there is still field to make this code better. <strong>I guess Atomic Design would be appreciated</strong>.  


#### Error handling 

Displaying messages from API not static messages. Maybe something with [this](https://www.npmjs.com/package/react-error-boundary)? 

#### Sentry

I think it's obvious why I need this if it will be real life product, just real-time error monitoring and production protector.

#### Translations

Not in this case but why I have to keep strict english version of my product? What about for example Polish version? There is I guess two the most popular approaches (JSON files or translate products like Google Cloud Translation API)

#### API properties key

Our api returns snake case keys in objects, but on the frontend I'm using camelCase, because it's public api I can't deal with this but maybe using Axios I can create wrapper for parsing keys from response to camel case? To be discus...

#### TDD

Next time make your code with TDD approach :)

## Next TODO's

- install react-query debug console
- debounce for pagination
- install form library and yup for better form management and validation
- improve debounce, because now it's debounced even data is in the cache
- better loadings now if data is loading table jumping, maybe kind of placeholder data in the table like [this](https://zalog.ro/placeholder-loading/) 
- better error handling, if you pass big number in per_page query params API returns error message
- using [snackbars](https://evandromacedo.github.io/react-simple-snackbar/) notify user what happened in your app
- add search term to the query params
- let's think about start your project and how to configure husky automatically

## How to run

Clone the repository:

```shell
git clone https://github.com/korczivo/github-repositories-search.git
```

Make sure you have nvm and you're using correct version of node (check .nvmrc file). Install node and use.

```shell
cd github-repositories-search
nvm use
```

Install and run

```shell
yarn install
yarn dev
```

Build production 
```shell
yarn build
```

Run tests
```shell
yarn test
or
yarn test:watch
```

If you want to coding with me make sure your husky is working locally
```shell
npx husky & yarn install
chmod ug+x .husky/*
chmod ug+x .git/hooks/*
```

## Demo

Vercel deployment [here](https://github-repositories-search-delta.vercel.app/).
