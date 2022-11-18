import { createSignal, onCleanup } from "solid-js"

export const App = () => {
    const
        [count, setCount] = createSignal(0),
        timer = setInterval(() => {
            setCount(count() + 360)
            document.getElementById("solid-logo")?.style.setProperty("--solid-logo-rotation", `${count()}deg`)
            console.log(`Set Logo rotation to ${count()}deg.`)
        }, 1000)

    onCleanup(() => clearInterval(timer))

    return <>
        <div id="root">
            <img src="logo.svg" id="solid-logo" />
            <h1>Get started by editing 
                <code>src/App.tsx</code> and reloading! 
                Learn <a href="https://www.solidjs.com/guides/getting-started" target="_blank">Solid.js</a>!
            </h1>
        </div>
    </>
}
