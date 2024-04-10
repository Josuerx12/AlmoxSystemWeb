import { useMemo } from "react";
import { IOrderTracking } from "../interfaces/ordertTraking";

export function useFilterOrders(orders?: IOrderTracking[]) {
  const newOrders = useMemo(
    () => orders?.filter((i) => i.state === 0),
    [orders]
  );
  const quarentineOrders = useMemo(
    () => orders?.filter((i) => i.state === 2),
    [orders]
  );
  const collectedOrders = useMemo(
    () => orders?.filter((i) => i.state === 5 && i.collected),
    [orders]
  );
  const recicledOrders = useMemo(
    () => orders?.filter((i) => i.state === 4),
    [orders]
  );

  return { newOrders, quarentineOrders, collectedOrders, recicledOrders };
}
