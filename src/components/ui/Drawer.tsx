import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  side?: "start" | "end";
}

export function Drawer({ isOpen, onClose, title, children, side = "end" }: DrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const sideClass = side === "end" ? "end-0" : "start-0";
  const initialX = side === "end" ? "100%" : "-100%";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={title}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-forest-950/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: initialX }}
            animate={{ x: 0 }}
            exit={{ x: initialX }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className={`absolute top-0 ${sideClass} h-full w-full max-w-md overflow-y-auto bg-parchment-100 dark:bg-forest-900 shadow-2xl`}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-forest-900/10 dark:border-parchment-100/10 bg-parchment-100 dark:bg-forest-900 px-5 py-4">
              <h2 className="font-display text-lg font-semibold text-forest-900 dark:text-parchment-100">
                {title}
              </h2>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-2 text-ink-600 hover:bg-forest-900/5 dark:text-parchment-100 dark:hover:bg-parchment-100/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
