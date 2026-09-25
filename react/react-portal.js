/*
React Portal allows us to render a component into a different DOM node outside its parent component's DOM hierarchy, while the component still remains part of the same React tree.

The most common use cases are modals, dialogs, tooltips, dropdowns, and overlays where we want to avoid CSS issues like overflow: hidden or z-index.

Example:

index.html

<body>
  <div id="root"></div>
  <div id="modal-root"></div>
</body>

2. Modal component
*/
import { createPortal } from "react-dom";

function Modal({ children, onClose }) {
  return createPortal(
    <div className="modal-overlay">
      <div className="modal">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
}

import { useState } from "react";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <h2>Hello from Portal</h2>
          <p>This modal is rendered outside #root.</p>
        </Modal>
      )}
    </>
  );
}
