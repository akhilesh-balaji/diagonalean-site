import Graph from "./components/Graph";
import Navbar from "./components/Navbar";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { dark, toggle } = useTheme();
  return (
    <>
      <Navbar dark={dark} onToggle={toggle} />
      <div className="flex flex-col-reverse md:flex-row w-full min-h-screen bg-base-100">
        {/* Text */}
        <div className="flex-1 flex items-center justify-center px-6 py-16 md:py-0">
          <div className="flex flex-col items-center justify-center gap-6 w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary">
              <span className="opacity-40 text-base-content">⊢</span>{" "}
              <span className="text-primary">Diagona</span>Lean
            </h1>
            <p className="text-base-content text-sm sm:text-base xl:text-xl leading-relaxed text-justify">
              <span className="font-normal">
                DiagonaLean is a{" "}
                <span className="text-secondary">foundational software research project</span>{" "}
                to develop the first fully{" "}
                <span className="text-secondary">compositional</span>,{" "}
                <span className="text-secondary">tactic-driven toolkit</span> for mechanising
                computability-theoretic reasoning in Lean 4.{" "}
                <br /><br />
              </span>
              The project will deliver a{" "}
              <span className="text-secondary">reusable library</span> of certified{" "}
              <span className="text-tertiary">Turing and many-one reductions</span>,{" "}
              <span className="text-tertiary">diagonalisation arguments</span>, and{" "}
              <span className="text-tertiary">undecidability transfer theorems</span>,
              together with a{" "}
              <span className="text-tertiary">proof-search tactic</span> that automates
              the traversal of a registered reduction graph.
              <br /><br />
              The long-term aim is to make formal undecidability proofs in Lean as{" "}
              <span className="text-secondary">modular and reusable</span> as existing algebraic
              or topological reasoning libraries.
              <br /><br />
            </p>
          </div>
        </div>

        {/* Graph */}
        <div className="relative w-full h-[50vh] md:w-1/2 md:h-screen mt-20 md:my-0">
          <Graph dark={dark} />
        </div>
      </div>
    </>
  );
}
