import styled, { DefaultTheme, css } from "styled-components";
import InputMask from "react-input-mask";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;
const StyledLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 400;
  display: flex;
  gap: 8px;
`;
type StyledInputProps = Omit<TextInputProps, "labelText">;
const StyledInputCSS = ({
  theme,
  backgroundColor,
}: { theme: DefaultTheme } & StyledInputProps) => css`
  padding: 0.5rem;
  border-radius: ${theme.borderRadius.small};
  border: 1px solid ${theme.colors.border.medium};
  background-color: ${backgroundColor === "light"
    ? theme.colors.primary
    : theme.colors.background};
  padding: 12px;
  max-width: 300px;
  width: 100%;
  color: ${theme.colors.text.placeholder};
`;
const StyledInput = styled.input<StyledInputProps>`
  ${StyledInputCSS}
`;
const StyledMaskInput = styled(InputMask)<StyledInputProps>`
  ${StyledInputCSS}
`;
const StyledTip = styled.div`
  font-size: 0.875rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.placeholder};
`;
export type TextInputProps = {
  backgroundColor?: "dark" | "light";
  labelText: string;
  errors?: string;
  touched?: boolean;
  noErrors?: boolean;
  noLabel?: boolean;
  mask?: string;
} & React.ComponentPropsWithoutRef<"input">;

export default function TextInput({
  backgroundColor = "light",
  labelText,
  errors,
  touched,
  noErrors,
  noLabel,
  mask,
  ...props
}: TextInputProps) {
  return (
    <StyledWrapper>
      {noLabel ? "" : <StyledLabel htmlFor={props.id}>{labelText}</StyledLabel>}
      {mask ? (
        <StyledMaskInput
          mask={mask}
          type="text"
          backgroundColor={backgroundColor}
          {...props}
        />
      ) : (
        <StyledInput type="text" backgroundColor={backgroundColor} {...props} />
      )}
      {noErrors ? "" : <StyledTip>Tip: {touched && errors}</StyledTip>}
    </StyledWrapper>
  );
}
