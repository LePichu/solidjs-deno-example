import { transform } from "https://esm.sh/@babel/standalone@7.19.2"
import babelPresetSolid from "https://esm.sh/babel-preset-solid@1.5.5"

export function build() {
    const code = transform(Deno.readTextFileSync("./src/index.tsx"), {
        presets: [babelPresetSolid]
    }).code!
        .replaceAll('from "solid-js"', 'from "https://esm.sh/solid-js@1.4.8/web"')
        .replaceAll('from "solid-js/web"', 'from "https://esm.sh/solid-js@1.4.8/web"')
    
    Deno.writeTextFile("./public/index.js", code!)
}

build()