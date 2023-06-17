import styled from "styled-components";

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
const StyledInput = styled.input<Omit<TextInputProps, "labelText">>`
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor === "light"
      ? theme.colors.primary
      : theme.colors.background};
  padding: 12px;
  max-width: 300px;
  width: 100%;
  color: ${({ theme }) => theme.colors.text.placeholder};
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
} & Omit<React.ComponentPropsWithoutRef<"input">, "type">;

export default function TextInput({
  backgroundColor = "light",
  labelText,
  errors,
  touched,
  noErrors,
  noLabel,
  ...props
}: TextInputProps) {
  return (
    <StyledWrapper>
      {noLabel ? "" : <StyledLabel htmlFor={props.id}>{labelText}</StyledLabel>}
      <StyledInput type="text" backgroundColor={backgroundColor} {...props} />
      {noErrors ? "" : <StyledTip>Tip: {touched && errors}</StyledTip>}
    </StyledWrapper>
  );
}
