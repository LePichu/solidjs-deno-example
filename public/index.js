import { template as _$template } from "https://esm.sh/solid-js@1.4.8/web";
import { createComponent as _$createComponent } from "https://esm.sh/solid-js@1.4.8/web";

const _tmpl$ = /*#__PURE__*/_$template(`<div id="root"><img src="logo.svg" id="solid-logo"><h1>Get started by editing <code>src/index.tsx</code> and reloading! Learn <a href="https://www.solidjs.com/guides/getting-started" target="_blank">Solid.js</a>!</h1></div>`, 9);

import { createSignal, onCleanup } from "https://esm.sh/solid-js@1.4.8";
import { render } from "https://esm.sh/solid-js@1.4.8/web";

const App = () => {
  const [count, setCount] = createSignal(0),
        timer = setInterval(() => {
    setCount(count() + 360);
    document.getElementById("solid-logo")?.style.setProperty("--solid-logo-rotation", `${count()}deg`);
  }, 1000);
  onCleanup(() => clearInterval(timer));
  return _tmpl$.cloneNode(true);
};

render(() => _$createComponent(App, {}), document.body);