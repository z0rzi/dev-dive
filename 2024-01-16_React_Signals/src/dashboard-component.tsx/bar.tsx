import { useEffect, useState } from "react";
import { Bar as BarPlot } from "react-chartjs-2";
import { fetchBarPoints } from "./utils";

export function Bar() {
  // adding dataset state
  const [dataset, setDataset] = useState([] as [number, number][]);

  useEffect(() => {
    const delay = Math.random() * 5000;

    const timer = setTimeout(() => {
      fetchBarPoints().then((newDataset) => {
        setDataset(newDataset);
      });
    }, delay);

    return () => clearInterval(timer);
  });

  return (
    <div>
      <BarPlot
        data={{
          labels: dataset.map((point) => String.fromCharCode(point[0])),
          datasets: [
            {
              label: "Bar Dataset",
              data: dataset,
            },
          ],
        }}
      ></BarPlot>
    </div>
  );
}
