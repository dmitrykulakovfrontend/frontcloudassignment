import styled from "styled-components";
import userIconSrc from "../assets/icons/user.jpg";
import linkIconSrc from "../assets/icons/interface.svg";
import { Formik } from "formik";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
const StyledMainWrapper = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.primary};
  margin-top: ${({ theme }) => theme.margin.medium};
  padding: ${({ theme }) => theme.margin.medium};
  margin-left: auto;
  margin-right: auto;
  border-top-right-radius: ${({ theme }) => theme.borderRadius.medium};
  border-top-left-radius: ${({ theme }) => theme.borderRadius.medium};
  max-width: 900px;
  width: 100%;
  /* 
    calculating minimal height from top and bottom margins, so it would shrink until it reaches the minimal content height
    min function allows it grow up until 700px
  */
  min-height: min(
    calc(100% - ${({ theme }) => `${parseInt(theme.margin.medium) * 2}px`}),
    700px
  );
`;

export default function Index() {
  return (
    <StyledMainWrapper>
      <UserSection />
      <FormSection />
    </StyledMainWrapper>
  );
}
const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.margin.medium};
  padding-top: ${({ theme }) => theme.margin.medium};
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.margin.medium};
`;

const validationSchema = Yup.object({
  phone: Yup.string()
    .length(18, "Неправильный формат номера")
    .required("Обязательное поле"),
  email: Yup.string()
    .email("Неправильный формат почты")
    .matches(/.+@.+\..+/gi, "Неправильный формат почты")
    .required("Обязательное поле"),
});

const initialValues = { phone: "", email: "" };
function FormSection() {
  const navigate = useNavigate();
  return (
    <StyledFormWrapper>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          navigate("/create", {
            state: values,
          });
        }}
      >
        {(props) => (
          <StyledForm onSubmit={props.handleSubmit}>
            <TextInput
              onChange={(e) => {
                const isFirstChar = e.target.value.length === 1;
                let value = e.target.value.slice(isFirstChar ? 0 : 4);
                if (
                  // React doesn't see inputType in typescript, but it does exists
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (e as any).nativeEvent.inputType === "deleteContentBackward"
                ) {
                  let lastCharacter = value[value.length - 1] || "";
                  // while lastCharacter is not a number, delete it
                  while (lastCharacter !== "" && !lastCharacter.match(/\d/)) {
                    value = value.slice(0, -1);
                    lastCharacter = value[value.length - 1];
                  }
                  props.setFieldValue("phone", "+7 (" + value);
                  return;
                }
                const match = value.match(/[0-9]+/gi);
                if (!match) {
                  props.setFieldValue("phone", "+7 (");
                  return;
                }
                const phoneNumber = match.join("");
                const areaCode = phoneNumber.slice(0, 3);
                const firstPart = phoneNumber.slice(3, 6);
                const secondPart = phoneNumber.slice(6, 8);
                const thirdPart = phoneNumber.slice(8, 10);
                const formatted = `+7 ${
                  areaCode
                    ? areaCode.length === 3
                      ? "(" + areaCode + ")"
                      : "(" + areaCode.trim()
                    : ""
                }${firstPart ? " " + firstPart : ""}${
                  secondPart ? "-" + secondPart : ""
                }${thirdPart ? "-" + thirdPart : ""}`;
                props.setFieldValue("phone", formatted);
              }}
              onBlur={props.handleBlur}
              touched={props.touched.phone}
              value={props.values.phone}
              name="phone"
              errors={props.errors.phone}
              placeholder="+7 (999) 999-99-99"
              labelText="Номер телефона"
              backgroundColor="dark"
            />
            <TextInput
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              errors={props.errors.email}
              touched={props.touched.email}
              value={props.values.email}
              name="email"
              labelText="Email"
              placeholder="tim.jennings@example.com"
              backgroundColor="dark"
            />

            <Button
              id="button-start"
              margin={{ top: 24, left: 0, right: 0, bottom: 0 }}
              type="submit"
            >
              Начать
            </Button>
          </StyledForm>
        )}
      </Formik>
    </StyledFormWrapper>
  );
}

const StyledUserSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.margin.medium};
  padding-bottom: ${({ theme }) => theme.margin.medium};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;
const StyledUserImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;
const StyledUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.margin.small};
`;
const StyledUserLinksNav = styled.nav`
  display: flex;
`;
const StyledUserLinksList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
`;
const StyledUserName = styled.p`
  font-size: ${({ theme }) => theme.font.size.large};
  font-weight: 600;
`;
const StyledUserListItem = styled.li``;
const StyledUserLink = styled.a`
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.margin.small};
  text-decoration: none;
  font-size: ${({ theme }) => theme.font.size.extraSmall};
`;
const StyledUserLinkIcon = styled.img`
  width: 12.6px;
  height: 11.2px;
`;

function UserSection() {
  return (
    <StyledUserSection>
      <StyledUserImage
        src={userIconSrc}
        alt="User icon"
        width={80}
        height={80}
      />
      <StyledUserInfo>
        <StyledUserName>Дмитрий Кулаков</StyledUserName>
        <StyledUserLinksNav>
          <StyledUserLinksList>
            <StyledUserListItem>
              <StyledUserLink href="https://t.me/dmitrykulakovfrontend">
                <StyledUserLinkIcon
                  src={linkIconSrc}
                  alt=""
                  width={12.6}
                  height={11.2}
                ></StyledUserLinkIcon>
                Telegram
              </StyledUserLink>
            </StyledUserListItem>
            <StyledUserListItem>
              <StyledUserLink href="https://github.com/dmitrykulakovfrontend">
                <StyledUserLinkIcon
                  src={linkIconSrc}
                  alt=""
                  width={12.6}
                  height={11.2}
                ></StyledUserLinkIcon>
                GitHub
              </StyledUserLink>
            </StyledUserListItem>
            <StyledUserListItem>
              <StyledUserLink href="https://docs.google.com/document/d/1f-Ir0AuFUl_3cZ7j0MaU79ELQw6cPc5N/edit?usp=sharing&ouid=115853125830824829365&rtpof=true&sd=true">
                <StyledUserLinkIcon
                  src={linkIconSrc}
                  alt=""
                  width={12.6}
                  height={11.2}
                ></StyledUserLinkIcon>
                Resume
              </StyledUserLink>
            </StyledUserListItem>
          </StyledUserLinksList>
        </StyledUserLinksNav>
      </StyledUserInfo>
    </StyledUserSection>
  );
}
