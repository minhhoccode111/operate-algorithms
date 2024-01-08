import { useCallback, useMemo, useState } from "react";
import travails from "./methods/travails";

function App() {
  const [mode, setMode] = useState(null);
  const clickChangeMode = useCallback((type) => setMode(type), []);
  const board = useMemo(() => {
    return Array.from({ length: 8 }, () =>
      Array.from({ length: 8 }, () => Math.random()),
    );
  }, []);
  const [knightPosition, setKnightPosition] = useState(null);
  const [endPosition, setEndPosition] = useState(null);
  const [steps, setSteps] = useState([]);

  return (
    <>
      <header className="">
        <h1 className="">Operate Algorithms</h1>
      </header>
      <nav className=""></nav>
      <main className="">
        <section className="">
          <header className="">
            <h2 className="">Knight Travails</h2>
          </header>
          <article className="">
            {/* setting */}
            <ul className="flex gap-4">
              <li className="border p-4 rounded-lg border-slate-700">
                <button
                  onClick={() => {
                    clickChangeMode("place-knight");
                    setKnightPosition(null);
                  }}
                  className=""
                >
                  place knight
                </button>
              </li>
              <li className="border p-4 rounded-lg border-slate-700">
                <button
                  onClick={() => {
                    clickChangeMode("place-end");
                    setEndPosition(null);
                  }}
                  className=""
                >
                  place end
                </button>
              </li>
              <li className="border p-4 rounded-lg border-slate-700">
                <button
                  disabled={knightPosition === null || endPosition === null}
                  className="disabled:opacity-50"
                >
                  travails
                </button>
              </li>
              <li className="border p-4 rounded-lg border-slate-700">
                <button
                  onClick={() => {
                    const row = Math.floor(Math.random() * 8);
                    const col = Math.floor(Math.random() * 8);
                    if ([row, col].toString() !== endPosition?.toString())
                      setKnightPosition([row, col]); // TODO
                  }}
                  className=""
                >
                  random place knight
                </button>
              </li>
              <li className="border p-4 rounded-lg border-slate-700">
                <button
                  onClick={() => {
                    setKnightPosition(null);
                    setEndPosition(null);
                    setMode(null);
                  }}
                  className=""
                >
                  clear
                </button>
              </li>
            </ul>
            {/* board, use col-start and row-start to specify its positions on the board */}
            <div className="grid grid-cols-8 grid-rows-8 h-96 w-96 p-4 m-12">
              {board.map((array, row) =>
                array.map((item, col) => {
                  let isDisabled = false;
                  // disable buttons if mode === null or that position already place knight or end position
                  if (
                    mode === null ||
                    [row, col].toString() === knightPosition?.toString() ||
                    [row, col].toString() === endPosition?.toString()
                  )
                    isDisabled = true;
                  let isKnightPosition =
                    [row, col].toString() === knightPosition?.toString();
                  let isEndPosition =
                    [row, col].toString() === endPosition?.toString();
                  return (
                    <button
                      disabled={isDisabled}
                      onClick={() => {
                        if (mode === "place-knight") {
                          setKnightPosition([row, col]);
                          setMode(null);
                        } else {
                          setEndPosition([row, col]);
                          setMode(null);
                        }
                      }}
                      key={item}
                      className={
                        "w-full h-full border disabled:opacity-75 disabled:border-black" +
                        " " +
                        (isKnightPosition
                          ? "bg-gray-500"
                          : isEndPosition
                            ? "bg-red-500"
                            : "")
                      }
                    ></button>
                  );
                }),
              )}
            </div>
          </article>
          <article className="">
            <p className="">current mode: {mode}</p>
            <p className="">
              current knight position:{" "}
              {knightPosition && knightPosition.toString()}
            </p>
            <p className="">
              current end position: {endPosition && endPosition.toString()}
            </p>
          </article>
        </section>
      </main>
      <footer className="">
        <p className="text-2xl">
          Made with <span className="text-red-300">love</span> by{" "}
          <a
            href="https://github.com/minhhoccode111/"
            target="_blank"
            rel="noreferrer"
            className="transition-all underline decoration-dotted hover:decoration-solid text-sky-500"
          >
            minhhoccode111
          </a>
          .
        </p>
      </footer>
    </>
  );
}

export default App;
