import React from "react";
import ReactDOM from "react-dom";

import Backdrop from "./Backdrop";
import "./Modal.css";

const ModalOverlay = ({
  className,
  style,
  header,
  headerClass,
  onSubmit,
  contentClass,
  children,
  footerClass,
  footer,
  show,
}) => {
  const modalClasses = show
    ? `modal modal--open ${className}`
    : `modal ${className}`;

  const content = (
    <div className={modalClasses} style={style}>
      <header className={`modal__header ${headerClass}`}>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : (e) => e.preventDefault()}>
        <div className={`modal__content ${contentClass}`}>{children}</div>
        <footer className={`modal__footer ${footerClass}`}>{footer}</footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <>
      {props.show ? <Backdrop onClick={props.onCancel} /> : null}
      <ModalOverlay {...props} />
    </>
  );
};

export default Modal;
