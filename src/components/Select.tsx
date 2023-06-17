import { useState } from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  position: relative;
`;
const StyledLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 400;
  display: flex;
  gap: 8px;
`;
const StyledSelect = styled.select<Omit<SelectProps, "labelText">>`
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor === "light"
      ? theme.colors.primary
      : theme.colors.background};
  padding: 12px;
  width: 100%;
  appearance: none;
  color: ${({ theme }) => theme.colors.text.placeholder};
`;
const StyledSelectArrow = styled.div<{ isActive: boolean }>`
  position: absolute;
  pointer-events: none;
  width: 12px;
  height: 12px;
  rotate: ${({ isActive }) => (isActive ? "135deg" : "45deg")};
  top: 50%;
  transform: ${({ isActive }) =>
    isActive ? "translateY(100%)" : "translateY(-50%)"};
  border-top-width: 2px;
  border-top-style: solid;
  border-right-width: 2px;
  border-right-style: solid;
  transition: all 0.2s ease-in-out;
  right: 1rem;
  border-color: ${({ theme }) => theme.colors.border.medium};
`;
const StyledTip = styled.div`
  font-size: 0.875rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.placeholder};
`;
const StyledSelectWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
`;
export type SelectProps = {
  backgroundColor?: "dark" | "light";
  labelText: string;
  errors?: string;
  touched?: boolean;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<"select">, "type">;

export default function Select({
  backgroundColor = "light",
  labelText,
  errors,
  touched,
  children,
  ...props
}: SelectProps) {
  const [isDropdownActive, setDropdownActive] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownActive(!isDropdownActive);
  };
  return (
    <StyledWrapper>
      <StyledLabel htmlFor={props.id}>{labelText}</StyledLabel>
      <StyledSelectWrapper onClick={handleDropdownToggle}>
        <StyledSelect backgroundColor={backgroundColor} {...props}>
          {children}
        </StyledSelect>
        <StyledSelectArrow isActive={isDropdownActive} />
      </StyledSelectWrapper>
      <StyledTip>Tip: {touched && errors}</StyledTip>
    </StyledWrapper>
  );
}
