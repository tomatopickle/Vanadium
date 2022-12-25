import { useState } from "preact/hooks";
import ui from '../ui/index.tsx';

interface CounterProps {
  start: number;
}

export default function Counter(props: CounterProps) {
  const [count, setCount] = useState(props.start);
  return (
    <div class="flex gap-2 w-full">
      <p class="flex-grow-1 font-bold text-xl">{count}</p>
      <button class={ui.btn} onClick={() => setCount(count - 1)}>-1</button>
      <button class={ui.btn} onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
