import { build } from "./build.ts"
import Server from "https://deno.land/x/lume@v1.12.0/core/server.ts"

onunload = () => {
    Deno.removeSync("./public/index.js")
    console.log("Exiting...")
}

build()

new Server({
    root: "./public",
    port: 3000
}).start()
