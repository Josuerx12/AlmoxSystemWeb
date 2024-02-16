import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -200%;
  }
  100% {
    background-position: 200%;
  }
`;

export const SkeletonCard = styled.div`
  height: 300px;
  width: 90%;
  margin: auto;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 5px;
`;
