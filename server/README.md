# AI Teaching Assistant Server

This is the server for the AI Teaching Assistant bot. It's a school assignment for PRG-8.

## Getting Started

First, clone the repository and navigate into the server directory.

```bash
git clone <repository-url>
cd ai-teaching-assistant-server
```

Next, install the dependencies.

```bash
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the server in development mode. It uses `tsx` to watch for file changes and automatically restart the server.

### `npm run prod`

Runs the server in production mode.

## Dependencies

This project uses several dependencies:

- `@langchain/core` and `@langchain/openai` for interacting with language models.
- `express` for building the server.
- `cors` for handling Cross-Origin Resource Sharing.
- `axios` for making HTTP requests.
- `chalk` for adding color to console logs.

## Dev Dependencies

This project uses several development dependencies:

- `cross-env` for setting environment variables.
- `tsx` for running TypeScript files.
- `nodemon` for automatically restarting the server during development.
- `eslint` and `typescript-eslint` for linting.
- `@types/*` packages for adding TypeScript type definitions.

Please refer to the [`package.json`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Ffaroeq33%2Fcode%2Fprg-8%2Fserver%2Fpackage.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/home/faroeq33/code/prg-8/server/package.json") file for the complete list of dependencies and their versions.

## Environment Variables

This project uses environment variables for configuration. These are stored in a `.env` file. You'll need to create your own `.env` file in the root of the project. The `.env` file should look something like this:

```env
NODE_ENV=development
```

Replace `development` with `production` when running in production mode.

## Author

This project was created by Faroeq.