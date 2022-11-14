// deno-lint-ignore-file no-explicit-any
// This is a Temporary Fix, I'll patch this up properly later
export {}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [ elemName: string ]: any
        }
        interface ElementClass {
            render: any
        }
    }
}