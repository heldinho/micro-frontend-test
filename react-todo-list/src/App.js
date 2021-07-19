import React from "react";
import Parcel from "single-spa-react/parcel";

export default function App() {
  const [list, setList] = React.useState([]);
  const input = React.useRef(null);

  function add(e) {
    if (e.keyCode === 13) {
      setList([...list, { text: e.target.value }]);
      dispatchEvent(
        new CustomEvent("@atlas/react-todo-list/add-task", {
          detail: {
            text: e.target.value,
          },
        })
      );
      input.current.value = "";
    }
  }

  return (
    <>
      <Parcel config={() => System.import("@atlas/vue-todo-list")} />
      <h1>React Todo List</h1>
      <input ref={input} type="text" onKeyUp={add} />
      <pre>{JSON.stringify(list, undefined, 2)}</pre>
    </>
  );
}
