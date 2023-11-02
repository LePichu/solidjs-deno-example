import { context } from "esbuild"
import { httpImports } from "esbuild-plugin-http-imports"
import { SolidPlugin } from "esbuild-plugin-solidjs-deno"
import Server from "https://deno.land/x/lume@v1.19.2/core/server.ts"

const isDev = Deno.args.includes("--dev")

const ctx = await context({
    entryPoints: [
        "src/index.tsx"
    ],
    bundle: true,
    minify: !isDev,
    sourcemap: isDev,
    outfile: "public/index.js",
    plugins: [
        SolidPlugin(),
        // @ts-ignore "Hope it works :)"
        httpImports()
    ],
    format: "esm",
    target: "esnext",
    platform: "browser"
})

isDev ? (async () => {
    await ctx.watch()
    console.log("Watching for changes...")
    const server = new Server({
        port: 3000,
        root: `${Deno.cwd()}/public`
    })

    server.start()
    console.log("Server started at http://localhost:3000")
})() : (async () => {
    await ctx.rebuild()
    await ctx.dispose()
    console.log("Build complete!")
    Deno.exit(0)
})()
