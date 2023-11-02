# Solid.js + Deno Example:
This is an example to show how to use Solid.js with Deno. It uses ESBuild under the hood instead of Vite.

## Note
At the time of updating this (11/3/2023), this example does not support Live Reload or HMR of any sort, when I get time in future I'll get around to adding it. In the meantime, best bet is to setup a FS Watcher and Event over WebSockets for reloading yourself by referring to ESBuild Docs' Live Reload Section.

## Commands:
- `build`: Builds the `index.tsx` file and outputs it to `/public/index.js`.
- `serve`: Builds using `build` command and then serves the `public` directory to `localhost:8000`.

# License
Licensed under the [MIT License](./LICENSE).
