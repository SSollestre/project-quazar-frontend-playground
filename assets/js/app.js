// If you want to use Phoenix channels, run `mix help phx.gen.channel`
// to get started and then uncomment the line below.
// import "./user_socket.js"

// You can include dependencies in two ways.
//
// The simplest option is to put them in assets/vendor and
// import them using relative paths:
//
//     import "../vendor/some-package.js"
//
// Alternatively, you can `npm install some-package --prefix assets` and import
// them using a path starting with the package name:
//
//     import "some-package"
//

// Include phoenix_html to handle method=PUT/DELETE in forms and buttons.
import "phoenix_html";
// Establish Phoenix Socket and LiveView configuration.
import { Socket } from "phoenix";
import { LiveSocket } from "phoenix_live_view";
import topbar from "../vendor/topbar";

// Define the LogKey hook
let Hooks = {};

Hooks.LogKey = {
  mounted() {
    console.log("Log has been mounted!");
    this.handleEvent("log-to-console", ({ key }) => {
      console.log("Key pressed:", key);
    });
  },
};

Hooks.MoveHook = {
  mounted() {
    let myElement = document.getElementById("circle");
    myElement.setAttribute("tabindex", "0");
    myElement.focus();
    myElement.addEventListener("blur", function () {
      myElement.focus();
    });
    console.log(myElement.tabIndex);
    console.log("circle mounted", myElement);
    let pressedKeys = new Set(); // Set to track pressed keys

    window.addEventListener("keydown", (e) => {
      if (!pressedKeys.has(e.key)) {
        console.log("Oooh he movin");
        pressedKeys.add(e.key); // Add pressed key to the set
        this.pushEvent("start_move", { key: e.key });
      }
    });

    window.addEventListener("keyup", (e) => {
      if (pressedKeys.has(e.key)) {
        pressedKeys.delete(e.key); // Remove released key from the set
        this.pushEvent("stop_move", { key: e.key });
      }
    });

    // Add event listener for the "click" event
    window.addEventListener("click", () => {
      this.pushEvent("shoot", {});
    });
  },
};

let csrfToken = document
  .querySelector("meta[name='csrf-token']")
  .getAttribute("content");
let liveSocket = new LiveSocket("/live", Socket, {
  hooks: Hooks, // Add the LogKey hook here
  longPollFallbackMs: 2500,
  params: { _csrf_token: csrfToken },
});

// Show progress bar on live navigation and form submits
topbar.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" });
window.addEventListener("phx:page-loading-start", (_info) => topbar.show(300));
window.addEventListener("phx:page-loading-stop", (_info) => topbar.hide());

// connect if there are any LiveViews on the page
liveSocket.connect();

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket;

// document.addEventListener("keydown", function (event) {
//   console.log("Key pressed:", event.key);
// });
