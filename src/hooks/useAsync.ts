import { useCallback, useEffect, useState } from "react";
import _ from "lodash";

export function useAsync<T, A extends Array<any>>(
  asyncFunction: (...args: A) => Promise<T>,
  {
    variables,
    pause,
  }: {
    pause?: boolean;
    variables: A;
  },
): [{ data: T | null; fetching: boolean; error: Error | null }, () => void] {
  const [fetching, setFetching] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [latsetVariables, setLatestVariables] = useState<A | null>(null);

  const execute = useCallback(async (...variables: A) => {
    setFetching(true);

    try {
      setLatestVariables(variables);
      setData(await asyncFunction(...variables));
    } catch (e) {
      console.log(e);
      if (e instanceof Error) setError(e);
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    if (pause || fetching || _.isEqual(latsetVariables, variables)) return;
    execute(...variables);
  }, [pause, fetching, variables, latsetVariables, execute]);

  return [{ data, fetching, error }, execute];
}
