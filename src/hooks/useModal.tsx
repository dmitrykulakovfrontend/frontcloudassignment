import { useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

export default function useModal() {
  const [isModalActive, setModalActive] = useState(false);
  const modal = [isModalActive, setModalActive] as const;
  function openModal() {
    setModalActive(true);
  }
  function closeModal() {
    setModalActive(false);
  }
  function toggleModal() {
    setModalActive(!isModalActive);
  }
  return {
    closeModal,
    openModal,
    toggleModal,
    modal,
  };
}

const StyledModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.border.dark};
`;
const StyledModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  width: 50%;
  height: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${({ theme }) => theme.margin.medium};
  align-items: center;
  gap: ${({ theme }) => theme.margin.medium};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 80%;
  }
`;

type ModalProps = {
  children: React.ReactNode;
  modalMeta: readonly [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};

export function Modal({ children, modalMeta }: ModalProps) {
  const [isActive, setIsActive] = modalMeta;

  return isActive
    ? createPortal(
        <StyledModalWrapper
          onClick={() => setIsActive(false)}
          onKeyUp={(e) => console.log(e.key)}
        >
          <StyledModal
            onClick={(e) => e.type === "click" && e.stopPropagation()}
          >
            {children}
          </StyledModal>
        </StyledModalWrapper>,
        document.body
      )
    : "";
}
