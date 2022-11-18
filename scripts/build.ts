import { build } from "https://deno.land/x/esbuild@v0.15.13/mod.js"
import * as IM from "npm:esbuild-plugin-import-map"
import { solidPlugin } from "npm:esbuild-plugin-solid"
import { httpImports } from "https://deno.land/x/esbuild_plugin_http_imports@v1.2.4/index.ts"

IM.load(JSON.parse(Deno.readTextFileSync("./import_map.json")))

await build({
    entryPoints: [ 
        "src/index.tsx",
    ],
    bundle: true,
    allowOverwrite: true,
    outfile: "public/index.js",
    platform: "browser",
    external: ["solid-js/web"],
    format: "esm",
    target: "esnext",
    plugins: [
        IM.plugin(),
        solidPlugin()
    ]
})

await build({
    entryPoints: [ 
        "public/index.js",
    ],
    bundle: true,
    allowOverwrite: true,
    outfile: "public/index.js",
    platform: "browser",
    format: "esm",
    target: "esnext",
    plugins: [
        IM.plugin()    
    ]
})

await build({
    entryPoints: [ 
        "public/index.js",
    ],
    bundle: true,
    allowOverwrite: true,
    outfile: "public/index.js",
    platform: "browser",
    format: "esm",
    target: "esnext",
    plugins: [
        {
            name: "exit-on-end",
            setup(build) {
                build.onEnd(() => Deno.exit())
            }
        },
        httpImports({
            defaultToJavascriptIfNothingElseFound: true
        })        
    ]
})