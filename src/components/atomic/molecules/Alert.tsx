
  import { useImperativeHandle } from "react";
  import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@heroui/modal";
import { forwardRef } from "@heroui/system";
import { Button } from "@heroui/button";

  interface AlertProps {
    title: string;
    description?: string;
    onCloseCallback: (confirmed: boolean) => void;
  }
  
  const Alert = forwardRef(({ title, description, onCloseCallback }: Readonly<AlertProps>, ref) => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  
    useImperativeHandle(ref, () => ({
      onOpen,
      onClose,
    }));
  
    const handleConfirm = () => {
      onClose();
      onCloseCallback(true);
    };
  
    const handleCancel = () => {
      onClose();
      onCloseCallback(false);
    };
  
    return (
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        radius="lg"
        size="md"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <p>{description}</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={handleCancel}>
                  Cancelar
                </Button>
                <Button className="bg-danger" onPress={handleConfirm}>
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  });
  
  export default Alert;
  