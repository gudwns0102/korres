import { useEffect, useState } from "react";

export function Async({
  children,
  fallback,
}: {
  children: Promise<React.ReactNode>;
  fallback?: React.ReactNode;
}) {
  const [state, setState] = useState<React.ReactNode>(undefined);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    children.then(setState).finally(() => setFetching(false));
  }, []);

  if (fetching) return fallback;

  return state;
}
