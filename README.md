# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

-   [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

# Build

```sh
npm run build
```

The `.env` file is required. Example of `.env`:

```
VITE_BASE_ID_URL="http://localhost:3001"
VITE_BASE_BE_URL="http://localhost:3000"
```

# CHANGELOG

## v0.0.1-alpha

-   [x] Add header
-   [x] Add main container
-   [x] Add footer

## v0.0.2-alpha

-   [x] Notes scroll under the footer, header and search
-   [x] Does not show user name on `logout` button upon sign up

## v0.0.3-alpha

-   [x] Add styles for error message to sign up/sign in modals
-   [x] Add error text to sign in modal. Do not close upon error, just show it
-   [x] Add error text to sign up modal. Do not close upon error, just show it
-   [x] After adding new note with missing title, UI does not show any newly added notes after that
-   [x] UI does not respond to backend errors properly, e.g. when sign up existing user
-   [x] Review dependencies in package.json
