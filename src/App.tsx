import Graph from "./components/Graph";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="flex w-full h-screen bg-base-100">
        {/* <div className="flex-1 flex items-center justify-center"> */}
        {/*   <h1 className="text-6xl font-bold text-secondary"> */}
        {/*     <span className="opacity-40 text-base-content">⊢</span>{" "} */}
        {/*     <span className="text-primary">Diagona</span>Lean */}
        {/*   </h1> */}
        {/* </div> */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-6 max-w-2xl text-center">
            <h1 className="text-6xl font-bold text-secondary">
              <span className="opacity-40 text-base-content">⊢</span>{" "}
              <span className="text-primary">Diagona</span>Lean
            </h1>
            <p className="text-base-content text-lg leading-relaxed text-justify font-thin">
              <span className="text-xl font-normal">
                DiagonaLean is a foundational software research project to develop the first
                fully compositional, tactic-driven toolkit for mechanising
                computability-theoretic reasoning in Lean 4. <br /><br />
              </span>

              The project will deliver a reusable library of certified Turing and many-one reductions,
              diagonalisation arguments, and undecidability transfer theorems, together
              with a proof-search tactic that automates the traversal of a registered
              reduction graph.<br /><br />

              The long-term aim is to make formal undecidability proofs
              in Lean as modular and reusable as existing algebraic or topological
              reasoning libraries.<br /><br />
            </p>
          </div>
        </div>

        <div className="relative w-1/2 h-full">
          <Graph dark={true} />
        </div>
      </div>
    </>
  );
}
