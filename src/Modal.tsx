import { useEffect, useRef, FunctionComponent, MutableRefObject } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

const Modal: FunctionComponent = ({ children }) => {
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  } //create div is not existing

  useEffect(() => {
    if (!modalRoot || !elRef.current) {
      return;
    }

    modalRoot.appendChild(elRef.current);
    return () => {
      if (elRef.current) {
        modalRoot.removeChild(elRef.current); //effect cleanup
      }
    };
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
