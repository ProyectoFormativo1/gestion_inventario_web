import React, { forwardRef, useImperativeHandle } from "react";
  import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure
} from "@heroui/modal";

type Size = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";

interface DialogProps {
    title: string,
    content?: React.ReactNode;
    size?: Size;
}

const Dialog = forwardRef(({ title, content, size = "md" }: Readonly<DialogProps>, ref) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  useImperativeHandle(ref, () => ({
    onOpen,
    onClose,
  }));

  return (
    <Modal size={size} isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {title}
            </ModalHeader>
            <ModalBody>
              {content}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
});

export default Dialog;