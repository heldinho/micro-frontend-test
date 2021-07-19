import React from "react";

export default function App() {
  const [list, setList] = React.useState([]);

  function add(e) {
    if (e.keyCode === 13) {
      setList([...list, { text: e.target.value }]);
    }
  }

  return (
    <>
      <h1>React Todo List</h1>
      <input type="text" onKeyUp={add} />
      <pre>{JSON.stringify(list, undefined, 2)}</pre>
    </>
  );
}
