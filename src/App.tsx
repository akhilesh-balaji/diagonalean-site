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
            <p className="text-base-content text-xl leading-relaxed text-justify font-thin">
              <span className="text-xl font-normal">
                DiagonaLean is a <span className="text-accent">foundational software research project</span> to develop the first
                fully <span className="text-accent">compositional</span>, <span className="text-accent">tactic-driven toolkit</span> for mechanising
                computability-theoretic reasoning in Lean 4. <br /><br />
              </span>

              The project will deliver a <span className="text-accent">reusable library</span> of certified <span className="text-tertiary">Turing and many-one reductions</span>, <span className="text-tertiary">diagonalisation arguments</span>, and <span className="text-tertiary">undecidability transfer theorems</span>, together
              with a <span className="text-tertiary">proof-search tactic</span> that automates the traversal of a registered
              reduction graph.<br /><br />

              The long-term aim is to make formal undecidability proofs
              in Lean as <span className="text-accent">modular and reusable</span> as existing algebraic or topological
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
