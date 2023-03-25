# 🧰 FILE SERVER APPLICATION with TYPESCRIPT, EXPRESS, NODE and POSTGRESQL

### Features

- Minimal
- TypeScript v5
- Testing with Jest
- Linting with Prettier
- Local development with Nodemon

### Key Dependencies
    - pg
node-postgres is a collection of node.js modules for interfacing with your PostgreSQL database. It has support for callbacks, promises, async/await, connection pooling, prepared statements, cursors, streaming results, C/C++ bindings, rich type parsing, and more! Just like PostgreSQL itself there are a lot of features: this documentation aims to get you up and running quickly and in the right direction. It also tries to provide guides for more advanced & edge-case topics allowing you to tap into the full power of PostgreSQL from node.js.

### Scripts

#### `npm run start:dev`

Starts the application in development using `nodemon` and `ts-node` to do hot reloading.

#### `npm run start`

Starts the app in production by first building the project with `npm run build`, and then executing the compiled JavaScript at `build/index.js`.

#### `npm run build`

Builds the app at `build`, cleaning the folder first.

#### `npm run test`

Runs the `jest` tests once.

#### `npm run test:dev`

Run the `jest` tests in watch mode, waiting for file changes.

#### `npm run prettier-format`

Format your code.

#### `npm run prettier-watch`

Format your code in watch mode, waiting for file changes.