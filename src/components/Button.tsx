import { Link } from "react-router-dom";
import styled, { DefaultTheme, css } from "styled-components";

export type ButtonProps = {
  transparent?: boolean;
  children: React.ReactNode;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  fontSize?: keyof DefaultTheme["font"]["size"];
  to?: string;
} & React.ComponentPropsWithoutRef<"button">;

const StyledButtonCSS = ({
  theme,
  transparent,
  fontSize = "normal",
  margin,
}: { theme: DefaultTheme } & ButtonProps) => css`
  background-color: ${transparent ? "transparent" : theme.colors.secondary};
  color: ${transparent ? theme.colors.secondary : "white"};
  padding: 12px 16px;
  font-size: ${theme.font.size[fontSize]};
  width: fit-content;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: ${transparent ? `2px solid ${theme.colors.secondary}` : "none"};
  font-family: "SB Sans Interface", sans-serif;
  margin: ${margin
    ? `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`
    : ""};
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    filter: brightness(120%);
    scale: 1.1;
    box-shadow: 0 0 5px ${theme.colors.secondary};
  }
`;

const StyledButton = styled.button<ButtonProps>`
  ${StyledButtonCSS}
`;
const StyledLink = styled(Link)<ButtonProps>`
  ${StyledButtonCSS}
  text-decoration: none;
`;

export default function Button({ children, to, ...props }: ButtonProps) {
  return (
    <>
      {to ? (
        <StyledLink to={to}>{children}</StyledLink>
      ) : (
        <StyledButton {...props}>{children}</StyledButton>
      )}
    </>
  );
}
