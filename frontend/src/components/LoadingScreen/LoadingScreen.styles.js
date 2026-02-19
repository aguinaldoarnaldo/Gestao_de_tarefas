import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

export const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 0.5s ease, visibility 0.5s ease;

  &.fade-out {
    opacity: 0;
    visibility: hidden;
  }
`;

export const LoadingContent = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const LogoPulse = styled.div`
  animation: ${pulse} 1.5s ease-in-out infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

const loading = keyframes`
  0% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
`;

export const LoadingBarContainer = styled.div`
  width: 200px;
  height: 4px;
  background-color: #ebecf0;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
`;

export const LoadingBar = styled.div`
  width: 100%;
  height: 100%;
  background-color: #0061ff;
  position: absolute;
  left: -100%;
  animation: ${loading} 1.5s infinite linear;
`;

export const LoadingText = styled.p`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 0.95rem;
  color: #44546F;
  font-weight: 500;
  letter-spacing: 0.5px;
  margin: 0;
`;
