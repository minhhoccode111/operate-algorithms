import { memo, useCallback, useMemo, useState } from "react";
import travails from "./methods/travails";

const Header = memo(function Header() {
  return (
    <header className="text-4xl">
      <h1 className="">Operate Algorithms</h1>
    </header>
  );
});

const Footer = memo(function Footer() {
  return (
    <footer className="">
      <p className="text-2xl text-center">
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
  );
});

function App() {
  const [mode, setMode] = useState(null);
  const clickChangeMode = useCallback((type) => setMode(type), []);
  const board = useMemo(() => {
    return Array.from({ length: 8 }, () =>
      Array.from({ length: 8 }, () => Math.random()),
    );
  }, []);
  const [startPosition, setStartPosition] = useState(null);
  const [endPosition, setEndPosition] = useState(null);
  const [steps, setSteps] = useState(null);
  const [piece, setPiece] = useState("knight");
  const handleSetPiece = useCallback((newPiece) => {
    setSteps(null);
    setPiece(newPiece);
  }, []);
  return (
    <>
      <Header />
      <nav className=""></nav>
      <main className="flex-1">
        <section className="">
          <header className="">
            <h2 className="text-2xl">Chess Pieces Travails</h2>
          </header>
          <article className="">
            {/* setting */}
            <ul className="flex flex-wrap gap-4 p-4 items-center justify-center">
              <li className="">
                <button
                  onClick={() => {
                    clickChangeMode("place-start");
                    setStartPosition(null);
                    setSteps(null);
                  }}
                  className="border px-4 rounded-lg border-slate-700"
                >
                  Place start
                </button>
              </li>
              <li className="">
                <button
                  onClick={() => {
                    clickChangeMode("place-end");
                    setEndPosition(null);
                    setSteps(null);
                  }}
                  className="border px-4 rounded-lg border-slate-700"
                >
                  Place end
                </button>
              </li>
              <li className="">
                <button
                  disabled={
                    startPosition === null ||
                    endPosition === null ||
                    steps?.length === 1
                  }
                  className="disabled:opacity-50 disabled:cursor-not-allowed border px-4 rounded-lg border-slate-700"
                  onClick={() => {
                    // e.g. ['[5:7]', '[7:6]', '[6:4]', '[7:2]', '[6:0]'];
                    setSteps(
                      travails(startPosition, endPosition, piece).map(
                        (res) => "[" + res.join(":") + "]",
                      ),
                    );
                  }}
                >
                  Travails
                </button>
              </li>
              <li className="">
                <button
                  onClick={() => {
                    const row = Math.floor(Math.random() * 8);
                    const col = Math.floor(Math.random() * 8);
                    // only place randomly if not the same as end position
                    if ([row, col].toString() !== endPosition?.toString())
                      setStartPosition([row, col]);
                    setSteps(null);
                  }}
                  className="border px-4 rounded-lg border-slate-700"
                >
                  Random place start
                </button>
              </li>
              <li className="">
                <button
                  onClick={() => {
                    const row = Math.floor(Math.random() * 8);
                    const col = Math.floor(Math.random() * 8);
                    // only place randomly if not the same as knight position
                    if ([row, col].toString() !== startPosition?.toString())
                      setEndPosition([row, col]);
                    setSteps(null);
                  }}
                  className="border px-4 rounded-lg border-slate-700"
                >
                  Random place end
                </button>
              </li>
              <li className="">
                <button
                  onClick={() => {
                    setStartPosition(null);
                    setEndPosition(null);
                    setMode(null);
                    setSteps(null);
                  }}
                  className="border px-4 rounded-lg border-slate-700"
                >
                  Clear
                </button>
              </li>
            </ul>
            <hr className="" />
            <ul className="flex flex-wrap gap-4 p-4 items-center justify-center">
              <li className="">
                <button
                  onClick={() => handleSetPiece("knight")}
                  className="border px-4 rounded-lg border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={piece === "knight"}
                >
                  Knight
                </button>
              </li>
              <li className="">
                <button
                  onClick={() => handleSetPiece("rook")}
                  className="border px-4 rounded-lg border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={piece === "rook"}
                >
                  Rook
                </button>
              </li>
              <li className="">
                <button
                  onClick={() => handleSetPiece("queen")}
                  className="border px-4 rounded-lg border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={piece === "queen"}
                >
                  Queen
                </button>
              </li>
              <li className="">
                <button
                  onClick={() => handleSetPiece("bishop")}
                  className="border px-4 rounded-lg border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={piece === "bishop"}
                >
                  Bishop
                </button>
              </li>
              <li className="">
                <button
                  onClick={() => handleSetPiece("king")}
                  className="border px-4 rounded-lg border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={piece === "king"}
                >
                  King
                </button>
              </li>
            </ul>
            {/* board, use col-start and row-start to specify its positions on the board */}
            <div className="grid grid-cols-8 grid-rows-8 h-96 w-96 p-4 m-4 border mx-auto">
              {board.map((array, row) =>
                array.map((item, col) => {
                  let isDisabled = false;
                  // disable buttons if mode === null or that position already place knight or end position
                  if (
                    mode === null ||
                    [row, col].toString() === startPosition?.toString() ||
                    [row, col].toString() === endPosition?.toString()
                  )
                    isDisabled = true;
                  let isStartPosition =
                    [row, col].toString() === startPosition?.toString();
                  let isEndPosition =
                    [row, col].toString() === endPosition?.toString();

                  let isBlack = (row + col) % 2 === 1;
                  return (
                    <button
                      disabled={isDisabled}
                      onClick={() => {
                        if (mode === "place-start") {
                          setStartPosition([row, col]);
                          setMode(null);
                        } else {
                          setEndPosition([row, col]);
                          setMode(null);
                        }
                      }}
                      key={item}
                      className={
                        "w-full h-full border border-gray-900 disabled:opacity-75 flex items-center justify-center font-bold text-xl" +
                        " " +
                        (isStartPosition
                          ? "bg-green-400"
                          : isEndPosition
                            ? "bg-red-400"
                            : isBlack
                              ? "bg-slate-400 text-white"
                              : "bg-white")
                      }
                    >
                      {steps?.indexOf(`[${row}:${col}]`) > -1
                        ? steps.indexOf(`[${row}:${col}]`)
                        : ""}
                    </button>
                  );
                }),
              )}
            </div>
          </article>
          <article className="flex flex-col gap-4 items-center justify-between">
            <p className="">Mode: {mode?.replace("-", " ")}</p>
            <p className="">Piece: {piece}</p>
            {/* <p className="">
              Start position:{" "}
              {startPosition && "[" + startPosition.join(":") + "]"}
            </p>
            <p className="">
              End position: {endPosition && "[" + endPosition.join(":") + "]"}
            </p>
            <p className="">Steps: {steps?.join(" - ")}</p> */}
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
