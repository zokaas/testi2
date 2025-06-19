_NOTE: use pnpm as package manager, not npm_

### To run an application, run these commands

```
pnpm i
npx nx run-many --target=build --all
npx nx dev [app-name]
```

### Creating a new Application

Inside /apps, run

```
pnpx create-remix@latest --template remix-run/remix/templates/vite
```

Follow the prompts, do not initialize a new git repo here

### To create a new folder inside /packages

Create the folder, cd into it, run

```
pnpm init
```

Install necessary dependencies eg:

```
pnpm add --filter [new-folder] react
pnpm add --filter [new-folder] typescript -D
```

Inside packages/[new-folder], create a tsconfig.json file to handle compilation output

```
{
"compilerOptions": {
"jsx": "react-jsx",
"allowJs": true,
"esModuleInterop": true,
"allowSyntheticDefaultImports": true,
"module": "commonjs",
"outDir": "./dist"
},
"include": ["."],
"exclude": ["dist", "node_modules", "**/*.spec.ts"]
}
```

add build script to /packages/[new-folder] package.json file

```
"scripts": {
"build": "rm -rf dist && tsc",
"test": "echo \"Error: no test specified\" && exit 1"
}
```

Export the components from [new-folder]/index.ts

to build the new folder, run

```
pnpm --filter [folder-name] build
```

### register the new /packages/[new-folder] inside apps

To register the shared folder in a newly created application, run

```
pnpm add [new-folder] --filter [appname] --workspace
```

more info about this setup can be found in this blog post:
[https://blog.logrocket.com/building-nx-monorepos-remix/]

### KYC BUILD
pnpm --filter ui-components build
pnpm i
npx nx run-many --target=build --all
npx nx dev kyc

## Docker related commands
### Build KYC
NOTE: Check dockerfile to see which commands are invoked
```bash
docker build --build-arg APP_TO_BUILD=kyc --target runner -t remix-app-kyc:21 .
```
### Run KYC with Env variable (and ports) set
NOTE: Check tag as *1* is probably not the right one
NOTE2: It is also possible to run this ferom Docker dashboard
```bash
docker run -it -e STRAPI_BASE_URL='https://strapi.858251697328.aws.opr-finance.com' -p 5001:5000  --name=test_container_with_env remix-app-kyc:1
```