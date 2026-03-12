import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%   { transform: scale(1);    opacity: 0.9; }
  50%  { transform: scale(1.12); opacity: 1;   }
  100% { transform: scale(1);    opacity: 0.9; }
`;

const shimmer = keyframes`
  0%   { left: -100%; }
  60%  { left: 100%;  }
  100% { left: 100%;  }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0);    }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const dot = keyframes`
  0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
  40%            { opacity: 1;   transform: scale(1);   }
`;

export const LoadingContainer = styled.div`
  position: fixed;
  inset: 0;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.5s;

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
  gap: 28px;
  animation: ${fadeInUp} 0.5s ease-out;
`;

export const LogoPulse = styled.div`
  width: 90px;
  height: 90px;
  background: linear-gradient(135deg, #0d2137, #2a7de1);
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  box-shadow: 0 20px 40px rgba(13, 33, 55, 0.25);
  animation: ${pulse} 2s ease-in-out infinite;
`;

export const BrandName = styled.h1`
  font-family: 'Outfit', 'Inter', sans-serif;
  font-size: 2rem;
  font-weight: 900;
  color: #0d2137;
  margin: 0;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #0d2137, #2a7de1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const LoadingBarContainer = styled.div`
  width: 220px;
  height: 5px;
  background: rgba(0, 97, 255, 0.12);
  border-radius: 100px;
  overflow: hidden;
  position: relative;
`;

export const LoadingBar = styled.div`
  width: 60%;
  height: 100%;
  background: linear-gradient(90deg, #0061ff, #8b5cf6);
  border-radius: 100px;
  position: absolute;
  left: -100%;
  animation: ${shimmer} 1.6s infinite ease-in-out;
`;

export const DotsRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const Dot = styled.span`
  width: 8px;
  height: 8px;
  background: #0061ff;
  border-radius: 50%;
  display: inline-block;
  animation: ${dot} 1.4s ease-in-out infinite;

  &:nth-child(2) { animation-delay: 0.2s; background: #4f8eff; }
  &:nth-child(3) { animation-delay: 0.4s; background: #8b5cf6; }
`;

export const LoadingText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #64748b;
  font-weight: 600;
  margin: 0;
  letter-spacing: 0.01em;
`;
