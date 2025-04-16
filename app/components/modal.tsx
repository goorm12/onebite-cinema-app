"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }: { children: ReactNode }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({
        top: 0,
      });
      console.log(dialogRef.current);
    }
  }, []);
  return createPortal(
    <dialog
      ref={dialogRef}
      className="bg-black text-white mx-auto w-[500px] px-5 py-5 rounded-lg my-5 border-none "
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          dialogRef.current?.close();
          router.back();
        }
      }}
    >
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLDialogElement
  );
};

export default Modal;
