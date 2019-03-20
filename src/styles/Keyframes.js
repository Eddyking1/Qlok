import { keyframes } from 'styled-components';

export const KeyFrameSidebar = keyframes`
  0% {
    opacity: 0;
    width: 0%;
  }
  100% {
    opacity: 1;
  }
`;

export const KeyFrameSidebarIn = keyframes`
  0% {
    opacity: 1;
  }

  95% {
    opacity: 0;
    width: 0;
  }

  100% {
    display: none;
    opacity: 0;
    width: 0;
  }
`;

export const KeyFrameSidebarFade = keyframes`
  0% {
    background: rgba(0,0,0,0);
  }

  95% {
    background: rgba(0,0,0,0);
  }
  100% {
    display: none;
    width: 0;
  }
`;
