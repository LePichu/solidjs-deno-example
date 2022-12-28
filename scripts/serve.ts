import "./build.ts"
import { serve } from "esbuild"

await serve({
    port: 8000,
    servedir: "public"
}, {
    entryPoints: [
        "public/index.js"
    ]
})