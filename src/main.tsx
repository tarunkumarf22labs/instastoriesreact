import r2wc from "@r2wc/react-to-web-component"
import App from "./App"
const WebGreeting = r2wc(App)

customElements.define("f22-stories", WebGreeting)