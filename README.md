This is an implementation of the github user search api. A deployed version can be found at https://github-user-search-seven.vercel.app/

## Description

Why does a user search another user on github? 

Most likely she is interested in a repo she saw somewhere and she doesn't remember the name of the repo but remembers more or less the author.

She might need to make more searches to refine her results. 

The application shows the search results in a way such that the user can get the most relavant details at first sight. The user doens't need to click around to get the search details

This differ from the [Github Search Page](https://github.com/search) where only the results' names are shown which makes it difficult to understand how popular (and therefore how likely) a result is.

## Implementation

- Maintanability and easyness to extent it later on are the two key factors with which the application has been developed 

- TDD. TDD helps achieving a high level of modularization and high trust in the code.

- BEM. Each component has been modularized following a simil BEM approach.

- Isolation. Isolation is another key factor priviledged in the development. It becomes most relevant when handling network requests.  They are managed by a single saga component that prevents the network logic from being scattered all over the code. The network layer is one step above the application layer, which is not aware of what happens at the network level.

- Redux. Last but not least, Redux has been used as a state management component. Redux makes the overall application state and logic centralized and flexible for later modifications.

## Build & Run 

Modify the *.env.local* file.

**.env.local**

```shell
GITHUB_CLIENT_SECRET=<your git hub token>
```

```bash
$ npm run build

$ npm run start
```

## Test
```bash
$ npm run test
```


