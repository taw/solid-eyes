import { createState, createEffect } from "solid-js";
import Eye from "./Eye.js";
import "./App.css";

export default function App() {
  function random_color() {
    let h = Math.random() * 360;
    let s = Math.round(50 + Math.random() * 50);
    let l = Math.round(30 + Math.random() * 40);
    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  function eye_distance(eye1, eye2) {
    let dx = eye1.x - eye2.x;
    let dy = eye1.y - eye2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function can_place_eye(new_eye) {
    return eyes.every(
      (eye) => eye_distance(eye, new_eye) >= eye.sz + new_eye.sz + 5
    );
  }

  function move(event) {
    let svg = document.getElementById("eyes");
    let rect = svg.getBoundingClientRect();
    setState({
      mx: event.pageX - rect.x,
      my: event.pageY - rect.y,
    })
  }

  let wh = window.innerHeight;
  let ww = window.innerWidth;

  const [state, setState] = createState({
    mx: Math.random() * ww,
    my: Math.random() * wh,
   });

  let eyes = [];

  [...Array.from({ length: 1000 })].forEach((_) => {
    let sz = 20 + Math.random() * 60;
    let x = sz + Math.random() * (ww - 2 * sz);
    let y = sz + Math.random() * (wh - 2 * sz);
    let color = random_color();
    let new_eye = { x, y, sz, color };
    if (can_place_eye(new_eye)) {
      eyes.push(new_eye);
    }
  });

  return (
    () =>
    <div class="App">
      <svg id="eyes" onMouseMove={move}>
        {
          <For each={eyes}>
            {
              (eye) => (
                <Eye x={eye.x} y={eye.y} sz={eye.sz} color={eye.color} fmx={() => state.mx} fmy={() => state.my} />
              )
            }
          </For>
        }
      </svg>
    </div>
  );
}
