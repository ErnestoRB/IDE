import Modal from "react-modal";
import { useLayoutStore } from "./stores/layout";
export function AppModal() {
  const [isModalOpen, closeModal, modalContent] = useLayoutStore((s) => [
    s.isModalOpen,
    s.closeModal,
    s.modalContent,
  ]);

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => closeModal()}
      contentLabel="Example Modal"
      overlayClassName="bg-white bg-opacity-20 w-full h-full fixed top-0 left-0"
      className="absolute top-0 left-1/2 -translate-x-1/2 focus:outline-none"
    >
      {modalContent}
    </Modal>
  );
}
