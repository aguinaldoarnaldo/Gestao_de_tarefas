import React from 'react';
import { Columns } from 'lucide-react';
import {
  LoadingContainer,
  LoadingContent,
  LogoPulse,
  LoadingBarContainer,
  LoadingBar,
  LoadingText
} from './LoadingScreen.styles';

const LoadingScreen = ({ fadeOut }) => {
  return (
    <LoadingContainer className={fadeOut ? 'fade-out' : ''}>
      <LoadingContent>
        <LogoPulse>
          <Columns size={48} color="#0061ff" />
        </LogoPulse>
        <LoadingBarContainer>
          <LoadingBar />
        </LoadingBarContainer>
        <LoadingText>Preparando seu espaço de trabalho...</LoadingText>
      </LoadingContent>
    </LoadingContainer>
  );
};

export default LoadingScreen;
