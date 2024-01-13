import { styled } from "styled-components";

const Container = styled.nav`
  position: relative;
  background-color: #fff;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: left;

  padding: 0 30px;
  box-sizing: border-box;
`;

const Stats = styled.div`
  position: absolute;
  right: 30px;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
`;

export function Nav() {
  return (
    <Container>
      <h1>DevDive!</h1>

      <Stats>
        <button>Unstick</button>
        <span>Updates per minute: ???</span>
      </Stats>
    </Container>
  );
}
