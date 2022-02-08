# Golden Sample Angular App

This golden sample provides examples of the code structure, configuration, and best practices to use for developing your  Backbase journey.


## Table of Contents
* [What is app for](#what-is-app-for)
* [Requirements](#requirements)
* [Authentication details](#authentication-details)
* [Generate an application](#generate-an-application)
* [Generate a library](#generate-a-library)
* [Development server](#development-server)
* [Code scaffolding](#code-scaffolding)
* [Build](#build)
* [Tests](#tests)
* [Understand your workspace](#understand-your-workspace)
* [Running with docker](#running-with-docker)
* [Package as a runnable Docker container](#package-as-a-runnable-docker-container)
* [Further help](#further-help)





## What is the app for
- This project is a reference implementation to showcase best practices to use when building a new Angular SPA for Backbase components and libraries. The project is updated with the latest versions of the tools and libraries used. 
- This prototype includes the following:
    - Authentication
    - Enable support of the multiple languages
    - Integration with a theme
    - Using existing journey installed from local NPM repository
    - Configuration of the journeys
    - Configuration of the entitlements
    - Communication between journeys


## Recommendation
For the best experience, the following VSCode extensions for Nx and Jest should be installed. 

- [nrwl.angular-console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console): to find and run all the possible Nx Commands.J
- [firsttris.vscode-jest-runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner): to easily run the isolated test as you are developing. 

#### Important

On some AWS environments, due to specific WAF configuration, you might need to use `http://0.0.0.0:4200/` when accessing the app locally, in order to successfully authenticate.



## Authentication details

#### Prerequisites

- Go through the [documentation page](https://community.backbase.com/documentation/foundation_angular/latest/authenticate_users) first to avoid any confusion with implementing authentication in the modelless app

#### Important Info

The code that is used for authentication is not for production purposes, this is the example to understand the concepts lying under the hood.
Do not copy-paste anything related to the authentication to your banking application.

#### How to add authentication to your app

Check the example code in the `app.module.ts`, the related `AuthConfig` in the `environment.ts` files, and the `APP_INITIALIZER` provider logic.
Secure routes with `AuthGuard`s. We rely on <https://github.com/manfredsteyer/angular-oauth2-oidc>, check their documentation for more details.

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can also use Nx Console to generate libraries as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

After generating, use appropriate tags in both `nx.json` and `.eslintrs.json` to impose constraints on the dependency graph. [Nx Tags](https://nx.dev/structure/monorepo-tags)

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use Nx Console to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@backbase/mylib`.

After generating, use appropriate tags in both `nx.json` and `.eslintrs.json` to impose constraints on the dependency graph.[Nx Tags](https://nx.dev/structure/monorepo-tags)

## Development server

Run `ng serve my-app` for a dev server. Navigate to <http://localhost:4200/>. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Tests

### Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

### Running end-to-end tests

Run `npx playwright test`

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Running with docker

Run `ng build --configuration production` and then `docker-compose up` to startup the docker container with the application

## Package as a runnable Docker container

Run `ng build:docker` (after a successful build with `ng build`) to create a Docker image. Start a new container with `npm run start:docker`.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
