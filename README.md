# agvisor-ui

## What's in this generated project
### The basics
* .eslintrc.js
* .gitignore
* .npmignore
* .npmrc - Setup to allow the package-lock.json and default packages to ~ semver scope.  If the package-lock.json is causing you issues, set it to false in this file.
* server.js - Your main server file.  This is where everything starts from.
* bin/www.js - Script to start the server.
* src/config - Unified configuration system utilizing the [@monsantoit/config](https://artifactory.bayer.com/ui/packages/npm:%2F%2F@monsantoit%2Fconfig) module.
* test/* - Mocha test files
* package.json - Includes dependencies and scripts:
    * ```npm run dev``` - Starts your server locally, picks up changes automatically.
    * ```npm run start``` - Starts your server in production mode. May Require ```npm run package``` to build webpack
    * ```npm run lint``` - Runs the linter.
    * ```npm run lint:fix``` - Runs the linter which will automatically fix issues.
    * ```npm run test``` - Runs the linter, then the mocha tests.
    * ```npm run clean``` - Cleans up the public folder.
    * ```npm run package``` - Runs the webpack to prepare for a deployment.

### UI
We've setup a small React.JS page for you that uses the *@monsantoit/profile-client* library to get the current user information.
The project uses the *react-router* package.  The routes are in the *src/scripts/routes.jsx* file.

This project has also been configured with webpack hotloading.  Which means when you make a change to one of the Javascript files, you should see it reflected immediately in your browser **without** reloading.

We've guessed your cookie name, but you might have to change the cookie_name property sent into the navbar wrapper in the *src/scripts/main.jsx* file.

### Redux
There is a basic redux */src/scripts/store.js* file created, and the *react-redux Provider* component has been wired into the *react-router* configuration.

### Local Ocelot
To get valid ping credentials while running locally, you should run a local version of [ocelot](https://artifactory.bayer.com/ui/packages/npm:%2F%2F@monsantoit%2Fconfig).
```
npm i -g @monsantoit/ocelot
```

We've generated a agvisor-ui-ocelot.config.json file for you with a
basic configuration.  You can put this in your ~/.ocelot/routes folder, or
append the contents to your ~/.ocelot/routes file.

We've set the AuthProvider for this route to AzureAD. Make sure to edit the file
to include in your client id and secret. While you can hard code these values, it's
preferred to use vault to resolve them instead (see below).

#### Ocelot with vault

In your config, you could set:
```
"client_id": vault://secret/path/to/my/client/id
"client_secret": vault://secret/path/to/my/client/secret
```

Which will fetch the value `id`, under the vault path `secret/path/to/my/client`.
By default, this file is added to the `.gitignore`, but if you use vault for
configuration, feel free to check this file in to the project.

#### Symlink (Optional)
If using vault URIs, you can also symlink this to your routes folder. Using
symlinks will keep your local configuration in sync with the source:

Just enter the following:
``` bash
ln -s $PWD/agvisor-ui-ocelot-config.json ~/.ocelot/routes/agvisor-ui-ocelot-config.json
```





## Next Steps




## Lightning Express

See the [Lightning Express documentation](https://devtools.bayer.com/docs/phoenix/lightning-express) for a complete explanation of the tool. For this project, there are a few changes you will need to fill in before using.

In package.json, fill in:
* <teamId> with the papi group id for your development team (in prod)
* <teamsWebhookUrl> with the webhook for the Team channel you would like deployment notifications sent to (or remove it if you don't need nonprod notifications)
* <pipelineClientId> with the clientId used for your teams dedicated pipeline deployments (used for jenkins/github-actions/codebuild/etc. and prod deployments)

Then deploy:
* run your app locally and access it from the browser to generate `index.html`
* run `npm run nonProd:package` to build (webpack) the nonprod deployable
* run `npm run nonProd:create` once to initialize Lightning Express for your app. This is a one-time step. The `nonProd:create` step can be removed from your `package.json` once this runs successfully.
* run `npm run nonProd:deploy` to deploy your deployable to nonprod
* set up an ocelot route to reference your new project (see the instructions in the Setup section of the LE documentation)



## Documentation

Full documentation for the @monsantoit/config can be found at [https://config.phoenix-tools-np.io](https://config.phoenix-tools-np.io/).
