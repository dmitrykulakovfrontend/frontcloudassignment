import { Link } from "react-router-dom";
import styled, { DefaultTheme } from "styled-components";

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

const StyledButton = styled.button<ButtonProps>`
  background-color: ${({ theme, transparent }) =>
    transparent ? "transparent" : theme.colors.secondary};
  color: ${({ theme, transparent }) =>
    transparent ? theme.colors.secondary : "white"};
  padding: 12px 16px;
  font-size: ${({ theme, fontSize = "normal" }) => theme.font.size[fontSize]};
  width: fit-content;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: ${({ theme, transparent }) =>
    transparent ? `2px solid ${theme.colors.secondary}` : "none"};
  font-family: "SB Sans Interface", sans-serif;
  margin: ${({ margin }) =>
    margin
      ? `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`
      : ""};
  &:hover {
    cursor: pointer;
  }
`;
const StyledLink = styled(Link)<ButtonProps>`
  background-color: ${({ theme, transparent }) =>
    transparent ? "transparent" : theme.colors.secondary};
  color: ${({ theme, transparent }) =>
    transparent ? theme.colors.secondary : "white"};
  padding: 12px 16px;
  font-size: ${({ theme, fontSize = "normal" }) => theme.font.size[fontSize]};
  width: fit-content;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: ${({ theme, transparent }) =>
    transparent ? `2px solid ${theme.colors.secondary}` : "none"};
  font-family: "SB Sans Interface", sans-serif;
  margin: ${({ margin }) =>
    margin
      ? `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`
      : ""};
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
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
