import { useState, useRef } from "react";
import { GraphCanvas, darkTheme, lightTheme } from "reagraph";

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

const nodes = [
  { id: "AP", label: "Acceptance Problem" },
  { id: "MPCP", label: "Modified Post's Correspondence Problem" },
  { id: "PCP", label: "Post's Correspondence Problem" },
  { id: "RT", label: "Rice's Theorem" },
  { id: "ACFG", label: "Ambiguity of CFGs" },
  { id: "CFLC", label: "CFL Containment" },
  { id: "EICFL", label: "Empty Intersection of CFLs" },
];

const edges = [
  { id: "AP-RT", source: "AP", target: "RT" },
  { id: "AP-MPCP", source: "AP", target: "MPCP" },
  { id: "MPCP-PCP", source: "MPCP", target: "PCP" },
  { id: "PCP-ACFG", source: "PCP", target: "ACFG" },
  { id: "PCP-CFLC", source: "PCP", target: "CFLC" },
  { id: "PCP-EICFL", source: "PCP", target: "EICFL" },
];

export default function Graph({ dark = true }: { dark?: boolean }) {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [isHoveringNode, setIsHoveringNode] = useState(false);
  const [displayLabels, setDisplayLabels] = useState<Record<string, string>>(
    Object.fromEntries(nodes.map((n) => [n.id, n.id]))
  );
  const animationsRef = useRef<Record<string, ReturnType<typeof setInterval>>>({});

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

  // Touch: tap to expand, tap again to collapse
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

  const nodesWithLabel = nodes.map((n) => ({
    ...n,
    label: displayLabels[n.id] ?? n.id,
  }));

  return (
    <div
      className="w-full h-screen"
      style={{ cursor: isHoveringNode ? "pointer" : "default" }}
    >
      <GraphCanvas
        nodes={nodesWithLabel}
        edges={edges}
        theme={dark ? solarizedDarkTheme : solarizedLightTheme}
        labelFontUrl="/fonts/IosevkaCharonMono-Regular.ttf"
        onNodePointerOver={handlePointerOver}
        onNodePointerOut={handlePointerOut}
        onNodeClick={handleNodeClick}
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

