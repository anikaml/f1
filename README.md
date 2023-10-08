# F1 Stats App

Explore Formula 1 Insights with this GitHub repository!

![Screenshot](https://github.com/anikaniescierewicz/f1/blob/main/public/f1screen.png?raw=true)

Live demo: **[f1.anikamlodzianowski.com](https://f1.anikamlodzianowski.com)**

This project offers a comprehensive look at Formula 1 statistics, including constructor wins, driver wins, and unique circuits.

With an interactive timelapse map, you can visualize when and where each race took place.

Additionally, there's a handy selector for choosing your preferred start and end dates to focus on specific time ranges. Dive into the world of F1 with this engaging and informative project.

Check out my other projects at my personal portfolio website **[anikamlodzianowski.com](https://anikamlodzianowski.com)**

## Tech stack

Tech stack consists of the following:

* React
* Vite
* TypeScript
* Material-UI
* d3 (world map and bar chart)
* Jest (unit testing)
* @testing-library/react (integration tests)
* GraphQL client (AWS Amplify via Apollo Client)
* AWS (S3, CloudFront, CodeBuild, CertificateManager, Lambda, IAM, Route53)

### Getting Started with Vite

This project was bootstrapped with [Vite](https://vitejs.dev/guide/).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run lint`

Runs ESLint against all applicable files.\
Open [ESLint](https://eslint.org/) for more information.

### `npm run compile`

Invoke the TypeScript compiler.\
Open [tsc](https://www.typescriptlang.org/docs/handbook/compiler-options.html) for more information.

### `npm test`

Launches the test runner.\
See the section about [running tests](https://jestjs.io/docs/tutorial-react) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

Open [Building for Production](https://vitejs.dev/guide/build.html) for more information.

### `npm run preview`

Preview the build production locally after running `npm run build`.\

## AWS Infrastructure

Validate a template:

```bash
aws cloudformation validate-template --template-body file://infrastructure/cloudformation/dev/dev-s3.yml --profile f1
```

Create new stack:

```bash
aws cloudformation create-stack --stack-name dev-s3 --template-body file://infrastructure/cloudformation/dev/dev-s3.yml --profile f1
```

Create new stack with IAM capabilities:

```bash
aws cloudformation create-stack --stack-name dev-cache-setter-lambda --template-body file://infrastructure/cloudformation/dev/dev-cache-setter-lambda.yml --profile f1 --capabilities CAPABILITY_NAMED_IAM
```

Update stack with IAM capabilities:

```bash
aws cloudformation update-stack --stack-name dev-cache-setter-lambda --template-body file://infrastructure/cloudformation/dev/dev-cache-setter-lambda.yml --profile f1 --capabilities CAPABILITY_NAMED_IAM
```

## GraphQL API

### Types

To generate new types:

```bash
amplify codegen
```
