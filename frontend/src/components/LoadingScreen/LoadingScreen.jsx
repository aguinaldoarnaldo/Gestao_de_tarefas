import React from 'react';
import { CheckCircle } from 'lucide-react';
import {
  LoadingContainer,
  LoadingContent,
  LogoPulse,
  BrandName,
  LoadingBarContainer,
  LoadingBar,
  DotsRow,
  Dot,
  LoadingText
} from './LoadingScreen.styles';

const LoadingScreen = ({ fadeOut, message }) => {
  return (
    <LoadingContainer className={fadeOut ? 'fade-out' : ''}>
      <LoadingContent>
        <LogoPulse>
          <CheckCircle size={44} color="white" />
        </LogoPulse>

        <BrandName>TaskFlow</BrandName>

        <LoadingBarContainer>
          <LoadingBar />
        </LoadingBarContainer>

        <DotsRow>
          <Dot />
          <Dot />
          <Dot />
        </DotsRow>

        <LoadingText>
          {message || 'Preparando seu espaço de trabalho...'}
        </LoadingText>
      </LoadingContent>
    </LoadingContainer>
  );
};

export default LoadingScreen;
