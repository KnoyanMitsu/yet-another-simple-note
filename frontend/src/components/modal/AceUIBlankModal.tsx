import React, { useState, useEffect } from "react";
import { X, EllipsisVerticalIcon } from "lucide-react";

export type MenuItem = {
  title: string;
  onClick: () => void;
  style?: "dangerous" | "normal";
};

type AceUIBlankModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  listMenu?: MenuItem[];
  menuPopup?: boolean;
};

function AceUIBlankModal({
  isOpen,
  onClose,
  children,
  listMenu = [],
  menuPopup = false,
}: AceUIBlankModalProps) {
  const [render, setRender] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRender(true);
      setIsClosing(false);
      setPopup(false);
    } else if (render) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setRender(false);
        setIsClosing(false);
      }, 250); // Matches the exit animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen, render]);

  if (!render) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 ${
          isClosing ? "animate-modal-overlay-out" : "animate-modal-overlay"
        }`}
        onClick={onClose}
      >
        <div
          className={`relative bg-background rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-secondary ${
            isClosing ? "animate-modal-content-out" : "animate-modal-content"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {popup && (
            <div className="absolute flex flex-col p-2 top-16 right-8 min-w-32 z-20 rounded-2xl shadow-xl bg-background/90 backdrop-blur-md">
              {listMenu.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={`text-left w-full px-4 py-2 hover:bg-secondary hover:text-primary rounded-lg transition-colors font-medium ${item.style === "dangerous" && "text-red-400"}`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          )}
          <div className="flex absolute p-1 bg-background/80 backdrop-blur-sm z-10 top-4 right-4 rounded-full shadow-sm">
            {menuPopup && (
              <button
                onClick={() => setPopup(!popup)}
                className=" p-2 text-text/60 hover:text-primary hover:bg-secondary rounded-full transition-all"
                aria-label="Menu"
              >
                <EllipsisVerticalIcon size={20} className="stroke-3" />
              </button>
            )}
            <button
              onClick={onClose}
              className=" p-2 text-text/60 hover:text-primary hover:bg-secondary rounded-full transition-all"
              aria-label="Close"
            >
              <X size={20} className="stroke-3" />
            </button>
          </div>

          <div className="p-8 overflow-y-auto">{children}</div>
        </div>
      </div>
    </>
  );
}

export default AceUIBlankModal;
