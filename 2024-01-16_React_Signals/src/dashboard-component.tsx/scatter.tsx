import { useEffect, useState } from "react";
import { Scatter as ScatterPlot } from "react-chartjs-2";
import { fetchScatterPoints } from "./utils";

export function Scatter() {
  // adding dataset state
  const [dataset, setDataset] = useState([] as { x: number; y: number }[]);

  useEffect(() => {
    if (Math.random() < 0.1) {
      // I'm stuck...
      return;
    }

    const delay = Math.random() * 5000;

    const timer = setTimeout(() => {
      // recreating a random dataset
      fetchScatterPoints().then((newDataset) => {
        setDataset(newDataset);
      });
    }, delay);

    return () => clearInterval(timer);
  });

  return (
    <div>
      <ScatterPlot
        data={{
          datasets: [
            {
              label: "Scatter Dataset",
              data: dataset,
            },
          ],
        }}
      ></ScatterPlot>
    </div>
  );
}
