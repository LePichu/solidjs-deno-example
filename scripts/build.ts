import { build } from "esbuild"
import { load, plugin } from "esbuild-plugin-import-map"
import { solidPlugin } from "esbuild-plugin-solid"
import { httpImports } from "esbuild-plugin-http-imports"
import { green, bold } from "https://deno.land/std@0.170.0/fmt/colors.ts"

const WATCH = Deno.args.join().includes("--watch")

const   MAP = JSON.parse(Deno.readTextFileSync("./import_map.json"))
        MAP.imports["solid-js"] = "https://cdn.skypack.dev/solid-js"
        MAP.imports["solid-js/web"] = "https://cdn.skypack.dev/solid-js/web" 

load(MAP)

export async function build_project() {
    const TIME_START = new Date()

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
            plugin(),
            solidPlugin()
        ],
        incremental: WATCH,
        watch: WATCH
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
            plugin()
        ],
        incremental: WATCH,
        watch: WATCH
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
                    build.onEnd((build) => {
                        const TIME_END = new Date()
                        const TIME_DIFF = new Date().setTime(TIME_END.getTime() - TIME_START.getTime())
                        console.log(`${bold("[✅]")} Finished Building in ${green(`${TIME_DIFF.toString()} milliseconds`)}.`)
                        if(build.errors.length > 0) console.log(build.errors)
                        if(!WATCH) Deno.exit(0)
                    })
                }
            },
            // @ts-ignore - works fine
            httpImports({
                defaultToJavascriptIfNothingElseFound: true
            })
        ],
        incremental: WATCH,
        watch: WATCH
    })
}

build_project()
