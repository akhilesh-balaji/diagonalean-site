import { useState, useEffect } from "react";

export function useTheme() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "solarized-dark" : "solarized-light"
    );
  }, [dark]);

  return { dark, toggle: () => setDark((d) => !d) };
}
