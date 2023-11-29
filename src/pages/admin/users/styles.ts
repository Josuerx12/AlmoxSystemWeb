import styled, { keyframes } from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 1.5rem;
  width: 90%;
  margin: auto;
`;

export const ContainerOfExternalButtonCommands = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  gap: 0.625rem;
`;

const shimmer = keyframes`
  0% {
    background-position: -200%;
  }
  100% {
    background-position: 200%;
  }
`;

export const SkeletonRow = styled.div`
  height: 400px;
  width: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;
