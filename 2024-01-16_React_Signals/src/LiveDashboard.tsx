import styled from "styled-components";
import { Scatter } from "./dashboard-component.tsx/scatter";
import { Pie } from "./dashboard-component.tsx/pie";
import { Bar } from "./dashboard-component.tsx/bar";

const Container = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;

  color: white;
  padding: 30px;
`;

const PlotContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-flow: row wrap;
  border: 1px dashed #fff5;
  border-radius: 5px;
`;

export function LiveDashboard() {
  return (
    <Container>
      <h1>Live Dashboard ✨</h1>

      <PlotContainer>
        <div style={{ width: "20%", height: "50%" }}>
          <Bar></Bar>
        </div>
        <div style={{ width: "20%", height: "50%" }}>
          <Pie></Pie>
        </div>
        <div style={{ width: "20%", height: "50%" }}>
          <Scatter></Scatter>
        </div>
        <div style={{ width: "20%", height: "50%" }}>
          <Scatter></Scatter>
        </div>
        <div style={{ width: "20%", height: "50%" }}>
          <Bar></Bar>
        </div>
        <div style={{ width: "20%", height: "50%" }}>
          <Pie></Pie>
        </div>
        <div style={{ width: "20%", height: "50%" }}>
          <Scatter></Scatter>
        </div>
        <div style={{ width: "20%", height: "50%" }}>
          <Bar></Bar>
        </div>
        <div style={{ width: "20%", height: "50%" }}>
          <Scatter></Scatter>
        </div>
        <div style={{ width: "20%", height: "50%" }}>
          <Pie></Pie>
        </div>
      </PlotContainer>
    </Container>
  );
}
