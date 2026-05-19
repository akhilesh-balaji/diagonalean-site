import { useState, useRef, useEffect } from "react";
import { GraphCanvas, darkTheme, lightTheme } from "reagraph";
import type { GraphCanvasRef } from "reagraph";

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

interface GraphNode { id: string; label: string; }
interface GraphEdge { id: string; source: string; target: string; }

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

const nodes_ = [
  { id: "HP", label: "Halting Problem" },
  { id: "AP", label: "Acceptance Problem" },
  { id: "RT", label: "Rice's Theorem" },
  { id: "MPCP", label: "Modified Post's Correspondence Problem" },
  { id: "PCP", label: "Post's Correspondence Problem" },
  { id: "ACFG", label: "Ambiguity of CFGs" },
  { id: "CFLC", label: "CFL Containment" },
  { id: "EICFL", label: "Empty Intersection of CFLs" },
];

const edges = [
  { id: "HP-AP", source: "HP", target: "AP" },
  { id: "AP-RT", source: "AP", target: "RT" },
  { id: "HP-MPCP", source: "HP", target: "MPCP" },
  { id: "MPCP-PCP", source: "MPCP", target: "PCP" },
  { id: "PCP-ACFG", source: "PCP", target: "ACFG" },
  { id: "PCP-CFLC", source: "PCP", target: "CFLC" },
  { id: "PCP-EICFL", source: "PCP", target: "EICFL" },
];

const NODE_DELAY = 300; // ms between each node appearing

export default function Graph({ dark = true }: { dark?: boolean }) {
  const nodes = bfsOrder(nodes_, edges);
  const levels = bfsLevels(nodes, edges);
  const [visibleLevel, setVisibleLevel] = useState(0);
  const graphRef = useRef<GraphCanvasRef | null>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [isHoveringNode, setIsHoveringNode] = useState(false);
  const [displayLabels, setDisplayLabels] = useState<Record<string, string>>(
    Object.fromEntries(nodes.map((n) => [n.id, n.id]))
  );
  const animationsRef = useRef<Record<string, ReturnType<typeof setInterval>>>({});

  // Intro: reveal nodes one by one
  // useEffect(() => {
  //   if (visibleCount >= nodes.length) return;
  //   const timeout = setTimeout(() => {
  //     setVisibleCount((c) => c + 1);
  //   }, visibleCount === 0 ? 600 : NODE_DELAY);
  //   return () => clearTimeout(timeout);
  // }, [visibleCount]);

  // Fit view after all nodes are visible
  // useEffect(() => {
  //   if (visibleCount === nodes.length) {
  //     setTimeout(() => graphRef.current?.fitNodesInView(), 100);
  //   }
  // }, [visibleCount]);

  // useEffect(() => {
  //   if (visibleCount >= nodes.length) return;
  //   const timeout = setTimeout(() => {
  //     setVisibleCount((c) => {
  //       const next = c + 1;
  //       setTimeout(() => {
  //         if (next === nodes.length) {
  //           graphRef.current?.fitNodesInView();
  //         } else {
  //           graphRef.current?.centerGraph();
  //         }
  //       }, 100);
  //       return next;
  //     });
  //   }, visibleCount === 0 ? 600 : NODE_DELAY);
  //   return () => clearTimeout(timeout);
  // }, [visibleCount]);

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

  const handleNodeClick = (node: any) => {
    if (activeNode === node.id) {
      collapseNode(node);
    } else {
      if (activeNode) {
        const prev = nodes.find((n) => n.id === activeNode);
        if (prev) collapseNode(prev);
      }
      expandNode(node);
    }
  };

  const visibleNodes = levels.slice(0, visibleLevel).flat().map((n) => ({
    ...n,
    label: displayLabels[n.id] ?? n.id,
  }));
  const visibleIds = new Set(visibleNodes.map((n) => n.id));
  const visibleEdges = edges.filter(
    (e) => visibleIds.has(e.source) && visibleIds.has(e.target)
  );

  return (
    <div
      className="w-full h-screen"
      style={{ cursor: isHoveringNode ? "pointer" : "default" }}
    >
      <GraphCanvas
        nodes={visibleNodes}
        edges={visibleEdges}
        theme={dark ? solarizedDarkTheme : solarizedLightTheme}
        labelFontUrl="/fonts/IosevkaCharonMono-Regular.ttf"
        ref={graphRef}
        onNodePointerOver={handlePointerOver}
        onNodePointerOut={handlePointerOut}
        onNodeClick={handleNodeClick}
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

