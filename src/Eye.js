import "./Eye.css";

export default function Eye({x,y,sz,color,fmx,fmy}) {
  return () => {
    let mx = fmx();
    let my = fmy();
    let max_eye_movement = 0.3 * sz;
    let dx = mx !== null ? mx - x : 0;
    let dy = my !== null ? my - y : 0;
    let dl = Math.max(0.000001, Math.sqrt(dx * dx + dy * dy));
    let displacement = Math.min(max_eye_movement, dl);
    let rx = x + (dx / dl) * displacement;
    let ry = y + (dy / dl) * displacement;

    return (
      <g>
        <circle class="eye1" cx={x} cy={y} r={sz} />
        <circle
          class="eye2"
          cx={rx}
          cy={ry}
          r={sz * 0.5}
          style={`fill: ${color}`}
        />
        <circle class="eye3" cx={rx} cy={ry} r={sz * 0.2} />
      </g>
    );
  }
}
