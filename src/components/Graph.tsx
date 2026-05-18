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
  { id: "1", label: "Node 1" },
  { id: "2", label: "Node 2" },
  { id: "3", label: "Node 3" },
];

const edges = [
  { id: "1-2", source: "1", target: "2" },
  { id: "2-3", source: "2", target: "3" },
];

export default function Graph({ dark = true }: { dark?: boolean }) {
  return (
    <div className="w-full h-screen">
      <GraphCanvas
        nodes={nodes}
        edges={edges}
        theme={dark ? solarizedDarkTheme : solarizedLightTheme}
        labelFontUrl="/fonts/IosevkaCharonMono-Regular.ttf"
      />
    </div>
  );
}
