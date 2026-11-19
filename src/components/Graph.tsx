import { useState, useRef, useEffect } from "react";
import { GraphCanvas, darkTheme, lightTheme } from "reagraph";
import type { GraphCanvasRef } from "reagraph";

const REPO_BASE = "https://github.com/DiagonaLean/DiagonaLean/tree/main/DiagonaLean";

// Subproblems that live inside DiagonaLean/KAComm/<id> in the repo.
const KA_CHILD_IDS = [
  "KATermEq",
  "KATermEqBool",
  "LangEq",
  "LangEqBool",
  "ModelLe",
  "ModelLeBool",
  "TermEq",
  "TermEqBool",
];
const nodePath = (id: string) => (KA_CHILD_IDS.includes(id) ? `KAComm/${id}` : id);
const repoUrl = (id: string) => `${REPO_BASE}/${nodePath(id)}`;
const reductionsUrl = (sourceId: string) => `${REPO_BASE}/${nodePath(sourceId)}/Reductions`;

const solarizedDarkTheme = {
  ...darkTheme,
  canvas: {
    background: "#002b36",
    fog: "#073642",
  },
  node: {
    ...darkTheme.node,
    fill: "#268bd2",
    activeFill: "#2aa198",
    label: {
      color: "#839496",
      stroke: "#002b36",
      activeColor: "#93a1a1",
    },
  },
  ring: {
    fill: "#b58900",
    activeFill: "#cb4b16",
  },
  edge: {
    ...darkTheme.edge,
    fill: "#073642",
    activeFill: "#586e75",
    label: {
      ...darkTheme.edge.label,
      color: "#839496",
      stroke: "#002b36",
      activeColor: "#93a1a1",
    },
  },
  arrow: {
    fill: "#586e75",
    activeFill: "#93a1a1",
  },
  lasso: {
    background: "rgba(38, 139, 210, 0.1)",
    border: "#268bd2",
  },
};

const solarizedLightTheme = {
  ...lightTheme,
  canvas: {
    background: "#fdf6e3",
    fog: "#eee8d5",
  },
  node: {
    ...lightTheme.node,
    fill: "#268bd2",
    activeFill: "#2aa198",
    label: {
      color: "#657b83",
      stroke: "#fdf6e3",
      activeColor: "#073642",
    },
  },
  ring: {
    fill: "#b58900",
    activeFill: "#cb4b16",
  },
  edge: {
    ...lightTheme.edge,
    fill: "#93a1a1",
    activeFill: "#586e75",
    label: {
      ...lightTheme.edge.label,
      color: "#657b83",
      stroke: "#fdf6e3",
      activeColor: "#073642",
    },
  },
  arrow: {
    fill: "#93a1a1",
    activeFill: "#586e75",
  },
  lasso: {
    background: "rgba(38, 139, 210, 0.1)",
    border: "#268bd2",
  },
};

interface GraphNode {
  id: string;
  label: string;
}
interface GraphEdge {
  id: string;
  source: string;
  target: string;
  arrowPlacement?: "none" | "mid" | "end";
  /** false => not clickable, no pointer cursor */
  link?: boolean;
}

function bfsOrder(nodes: GraphNode[], edges: GraphEdge[]): GraphNode[] {
  const adj = new Map(nodes.map((n) => [n.id, [] as string[]]));
  edges.forEach((e) => adj.get(e.source)?.push(e.target));

  const roots = nodes.filter(
    (n) => !edges.some((e) => e.target === n.id)
  );

  const visited = new Set<string>();
  const order: GraphNode[] = [];
  let currentLevel = [...roots];

  while (currentLevel.length) {
    const nextLevel: GraphNode[] = [];
    for (const node of currentLevel) {
      if (visited.has(node.id)) continue;
      visited.add(node.id);
      order.push(node);
      adj.get(node.id)?.forEach((id) => {
        const next = nodes.find((n) => n.id === id);
        if (next && !visited.has(next.id)) nextLevel.push(next);
      });
    }
    currentLevel = nextLevel;
  }

  nodes.forEach((n) => { if (!visited.has(n.id)) order.push(n); });
  return order;
}

function bfsLevels(nodes: GraphNode[], edges: GraphEdge[]): GraphNode[][] {
  const adj = new Map(nodes.map((n) => [n.id, [] as string[]]));
  edges.forEach((e) => adj.get(e.source)?.push(e.target));

  const roots = nodes.filter((n) => !edges.some((e) => e.target === n.id));

  const visited = new Set<string>();
  const levels: GraphNode[][] = [];
  let currentLevel = [...roots];

  while (currentLevel.length) {
    const nextLevel: GraphNode[] = [];
    const levelNodes: GraphNode[] = [];
    for (const node of currentLevel) {
      if (visited.has(node.id)) continue;
      visited.add(node.id);
      levelNodes.push(node);
      adj.get(node.id)?.forEach((id) => {
        const next = nodes.find((n) => n.id === id);
        if (next && !visited.has(next.id)) nextLevel.push(next);
      });
    }
    if (levelNodes.length) levels.push(levelNodes);
    currentLevel = nextLevel;
  }

  nodes.forEach((n) => { if (!visited.has(n.id)) levels.push([n]); });
  return levels;
}

const nodes_: GraphNode[] = [
  { id: "Halt", label: "Halting Problem" },
  { id: "UTMHalt", label: "Universal Turing Machine Halting Problem" },
  { id: "BetaConv", label: "Beta Conversion" },
  { id: "KAComm", label: "Commutative Kleene Algebra" },
  { id: "KATermEq", label: "KA Term Equivalence" },
  { id: "KATermEqBool", label: "Boolean KA Term Equivalence" },
  { id: "LangEq", label: "Language Equivalence" },
  { id: "LangEqBool", label: "Boolean Language Equivalence" },
  { id: "ModelLe", label: "Model Inequality" },
  { id: "ModelLeBool", label: "Boolean Model Inequality" },
  { id: "TermEq", label: "Term Equivalence" },
  { id: "TermEqBool", label: "Boolean Term Equivalence" },
  { id: "MPCP", label: "Modified Post's Correspondence Problem" },
  { id: "PCP", label: "Post's Correspondence Problem" },
  { id: "SKIConv", label: "SKI Conversion" },
  { id: "MatMort", label: "3×3 Matrix Mortality" },
  { id: "AmbigCFG", label: "Ambiguity of CFGs" },
  { id: "EmpCFG", label: "Empty Intersection of CFGs" },
  { id: "Rice", label: "Rice's Theorem" },
];

const edges: GraphEdge[] = [
  { id: "Halt-UTMHalt", source: "Halt", target: "UTMHalt" },
  { id: "Halt-BetaConv", source: "Halt", target: "BetaConv" },
  // KAComm is only a hub: no arrow, and there is no Reductions folder to link to.
  { id: "Halt-KAComm", source: "Halt", target: "KAComm", arrowPlacement: "none", link: false },
  ...KA_CHILD_IDS.map((id) => ({ id: `KAComm-${id}`, source: "KAComm", target: id })),
  { id: "Halt-MPCP", source: "Halt", target: "MPCP" },
  { id: "Halt-PCP", source: "Halt", target: "PCP" },
  { id: "MPCP-PCP", source: "MPCP", target: "PCP" },
  { id: "Halt-SKIConv", source: "Halt", target: "SKIConv" },
  { id: "PCP-MatMort", source: "PCP", target: "MatMort" },
  { id: "PCP-AmbigCFG", source: "PCP", target: "AmbigCFG" },
  { id: "PCP-EmpCFG", source: "PCP", target: "EmpCFG" },
  { id: "Halt-Rice", source: "Halt", target: "Rice" },
];

const isLinkEdge = (edge: { id?: string }) =>
  edges.find((e) => e.id === edge?.id)?.link !== false;

const NODE_DELAY = 300; // ms between each node appearing

// KAComm hub: half the default node size (7) and the same colour as the edges.
const KACOMM_SIZE = 1;
const kacommFill = (dark: boolean) =>
  (dark ? solarizedDarkTheme : solarizedLightTheme).edge.fill;

export default function Graph({ dark = true }: { dark?: boolean }) {
  const nodes = bfsOrder(nodes_, edges);
  const levels = bfsLevels(nodes, edges);
  const [visibleLevel, setVisibleLevel] = useState(0);
  const graphRef = useRef<GraphCanvasRef | null>(null);
  // const [visibleCount, setVisibleCount] = useState(0);
  const [_activeNode, setActiveNode] = useState<string | null>(null);
  const [isHoveringNode, setIsHoveringNode] = useState(false);
  const [isHoveringEdge, setIsHoveringEdge] = useState(false);
  const [displayLabels, setDisplayLabels] = useState<Record<string, string>>(
    Object.fromEntries(nodes.map((n) => [n.id, n.id]))
  );
  const animationsRef = useRef<Record<string, ReturnType<typeof setInterval>>>({});

  useEffect(() => {
    if (visibleLevel >= levels.length) return;
    const timeout = setTimeout(() => {
      setVisibleLevel((l) => {
        const next = l + 1;
        setTimeout(() => {
          if (next === levels.length) {
            graphRef.current?.fitNodesInView();
          } else {
            graphRef.current?.centerGraph();
          }
        }, 100);
        return next;
      });
    }, visibleLevel === 0 ? 600 : NODE_DELAY);
    return () => clearTimeout(timeout);
  }, [visibleLevel]);

  const animateTo = (nodeId: string, from: string, to: string) => {
    if (animationsRef.current[nodeId]) clearInterval(animationsRef.current[nodeId]);
    let step = 0;
    const maxLen = Math.max(from.length, to.length);
    const interval = setInterval(() => {
      step++;
      const progress = step / maxLen;
      const currentLen = Math.round(progress * to.length);
      setDisplayLabels((prev) => ({
        ...prev,
        [nodeId]: to.slice(0, currentLen) || nodeId[0],
      }));
      if (step >= maxLen) clearInterval(animationsRef.current[nodeId]);
    }, 2);
    animationsRef.current[nodeId] = interval;
  };

  const expandNode = (node: any) => {
    const fullLabel = nodes.find((n) => n.id === node.id)?.label ?? node.id;
    animateTo(node.id, displayLabels[node.id] ?? node.id, fullLabel);
    setActiveNode(node.id);
  };

  const collapseNode = (node: any) => {
    const fullLabel = nodes.find((n) => n.id === node.id)?.label ?? node.id;
    animateTo(node.id, fullLabel, node.id);
    setActiveNode(null);
  };

  const handlePointerOver = (node: any) => {
    setIsHoveringNode(true);
    expandNode(node);
  };

  const handlePointerOut = (node: any) => {
    setIsHoveringNode(false);
    collapseNode(node);
  };
  const handleEdgePointerOver = (edge: any) => {
    if (isLinkEdge(edge)) setIsHoveringEdge(true);
  };
  const handleEdgePointerOut = () => setIsHoveringEdge(false);

  // const handleNodeClick = (node: any) => {
  //   if (activeNode === node.id) {
  //     collapseNode(node);
  //   } else {
  //     if (activeNode) {
  //       const prev = nodes.find((n) => n.id === activeNode);
  //       if (prev) collapseNode(prev);
  //     }
  //     expandNode(node);
  //   }
  // };
  const handleNodeClick = (node: any) => {
    window.open(repoUrl(node.id), "_blank", "noopener,noreferrer");
  };

  const handleEdgeClick = (edge: any) => {
    if (!isLinkEdge(edge)) return;
    window.open(reductionsUrl(edge.target), "_blank", "noopener,noreferrer");
  };

  const visibleNodes = levels.slice(0, visibleLevel).flat().map((n) => ({
    ...n,
    label: displayLabels[n.id] ?? n.id,
    ...(n.id === "KAComm" ? {
          // size: KACOMM_SIZE,
          fill: kacommFill(dark)
        } :
          {
          // size: 2*KACOMM_SIZE 
        }
       ),
  }));
  const visibleIds = new Set(visibleNodes.map((n) => n.id));
  const visibleEdges = edges.filter(
    (e) => visibleIds.has(e.source) && visibleIds.has(e.target)
  );

  return (
    <div
      className="w-full h-screen"
      style={{ cursor: isHoveringNode || isHoveringEdge ? "pointer" : "default" }}
    >
      <GraphCanvas
        nodes={visibleNodes}
        edges={visibleEdges}
        theme={dark ? solarizedDarkTheme : solarizedLightTheme}
        labelFontUrl="/fonts/IosevkaCharonMono-Regular.ttf"
        ref={graphRef}
        layoutType={"forceDirected2d"}
        onNodePointerOver={handlePointerOver}
        onNodePointerOut={handlePointerOut}
        onNodeClick={handleNodeClick}
        onEdgePointerOver={handleEdgePointerOver}
        onEdgePointerOut={handleEdgePointerOut}
        onEdgeClick={handleEdgeClick}
        draggable
      />
    </div>
  );
}

// without animations
// export default function Graph({ dark = true }: { dark?: boolean }) {
//   const [activeNode, setActiveNode] = useState<string | null>(null);
//
//
//   const nodesWithLabel = nodes.map((n) => ({
//     ...n,
//     label: activeNode === n.id ? n.label : n.id,
//   }));
//
//   return (
//     <div className="w-full h-screen">
//       <GraphCanvas
//         nodes={nodesWithLabel}
//         edges={edges}
//         theme={dark ? solarizedDarkTheme : solarizedLightTheme}
//         labelFontUrl="/fonts/IosevkaCharonMono-Regular.ttf"
//         onNodePointerOver={(node) => setActiveNode(node.id)}
//         onNodePointerOut={() => setActiveNode(null)}
//       />
//     </div>
//   );
// }
