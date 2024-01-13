import { useEffect, useState } from "react";
import { Pie as PiePlot } from "react-chartjs-2";
import { fetchPiePoints } from "./utils";

export function Pie() {
  // adding dataset state
  const [dataset, setDataset] = useState([] as number[]);

  useEffect(() => {
    const delay = Math.random() * 5000;

    const timer = setTimeout(() => {
      // recreating a random dataset
      fetchPiePoints().then((newDataset) => {
        setDataset(newDataset);
      });
    }, delay);

    return () => clearInterval(timer);
  })

  return (
    <div>
      <PiePlot
        data={{
          datasets: [
            {
              data: dataset,
            },
          ],
        }}
      ></PiePlot>
    </div>
  );
}
