import React, { useRef } from "react";
import { styled } from "@mui/system";
import { CSSTransition } from "react-transition-group";

type FadeInProps = {
  transitionDuration: string;
  exitTransitionDuration: string;
};

const FadeIn = styled("div")<FadeInProps>(
  ({ transitionDuration, exitTransitionDuration }) => ({
    "&.fade-enter": {
      opacity: 0,
    },
    "&.fade-enter-active": {
      opacity: 1,
      transition: `opacity ${transitionDuration}`,
    },
    "&.fade-exit": {
      opacity: 1,
    },
    "&.fade-exit-active": {
      opacity: 0,
      transition: `opacity ${exitTransitionDuration}`,
    },
  })
);

type FadeTransitionProps = {
  show: boolean;
  transitionDuration?: number;
  exitTransitionDuration?: number;
  children: React.ReactNode;
};

const convertToSeconds = (milliseconds: number): string => {
  const seconds = milliseconds / 1000;
  return `${seconds}s`;
};

const FadeTransition: React.FC<FadeTransitionProps> = ({
  show,
  transitionDuration = 500,
  exitTransitionDuration = 500,
  children,
}) => {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={show}
      timeout={{ enter: transitionDuration, exit: exitTransitionDuration }}
      classNames="fade"
      unmountOnExit
    >
      <FadeIn
        ref={nodeRef}
        transitionDuration={convertToSeconds(transitionDuration)}
        exitTransitionDuration={convertToSeconds(exitTransitionDuration)}
      >
        {children}
      </FadeIn>
    </CSSTransition>
  );
};

export default FadeTransition;
