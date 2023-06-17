import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import * as Yup from "yup";
import { Field, FieldArray, Formik, FormikProps } from "formik";
import TextInput from "../components/TextInput";
import Select from "../components/Select";
import deleteIconSrc from "../assets/icons/trashcan.png";
import successIconSrc from "../assets/icons/success.png";
import errorIconSrc from "../assets/icons/error.png";

const StyledMainWrapper = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.primary};
  margin-top: ${({ theme }) => theme.margin.medium};
  padding: ${({ theme }) => theme.margin.largest};
  margin-left: auto;
  margin-right: auto;
  border-radius: ${({ theme }) => theme.borderRadius.large};
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
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.margin.medium};
  }
`;
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
const StyledControls = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.margin.medium};
  margin-top: ${({ theme }) => theme.margin.medium};
`;
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
const SuccessModalTitle = styled.p`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  width: 100%;
  font-size: ${({ theme }) => theme.font.size.large};
`;
const ErrorModalCloseButton = styled.button`
  background-color: ${({ theme }) => theme.colors.border.light};
  border-radius: 50%;
  width: 30px;
  border: none;
  cursor: pointer;
  height: 30px;
  color: ${({ theme }) => theme.colors.border.dark};
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    filter: brightness(120%);
    scale: 1.1;
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.border.light};
  }
`;
const ErrorModalButtonWrapper = styled.div`
  width: fit-content;
  margin: 0 0 0 auto;
`;

const validationSchema = Yup.object({
  nickName: Yup.string()
    .max(30, "Максимум 30 символов")
    .matches(/[\d\w]+/gi, "Только буквы и цифры"),
  name: Yup.string()
    .max(50, "Максимум 50 символов")
    .matches(/[\w]+/gi, "Только буквы"),
  sername: Yup.string()
    .max(50, "Максимум 50 символов")
    .matches(/[\w]+/gi, "Только буквы"),
  sex: Yup.mixed().oneOf(["man", "woman"]),
  advantages: Yup.array().of(Yup.string()),
  checkbox: Yup.array().of(Yup.string()),
  radio: Yup.mixed().oneOf(["1", "2", "3"]),
  about: Yup.string().max(200, "Макисимальная длина 200 символов"),
});

const initialValues = {
  nickName: "",
  name: "",
  sername: "",
  sex: "",
  advantages: ["", "", ""],
  checkbox: [""],
  radio: "1",
  about: "",
};

export default function Form() {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [isModalActive, setModalActive] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const { phone, email } = location.state;

  const handleSubmit = async (values: typeof initialValues) => {
    const formatted = {
      ...values,
      checkbox: values.checkbox.filter(Boolean).map(Number),
      phone,
      email,
      radio: +values.radio,
    };
    console.log(formatted);
    const res = await fetch(
      "https://api.sbercloud.ru/content/v1/bootcamp/frontend",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formatted),
      }
    );
    console.log(res);
    const data = await res.json();
    console.log(data);
    if (data.status === "success") {
      setIsSuccess(true);
    } else {
      setIsError(true);
    }
    setModalActive(true);
  };

  if (!location.state) return <Navigate to={"/"} />;

  return (
    <StyledMainWrapper>
      {isModalActive && (
        <StyledModalWrapper onClick={() => setModalActive(false)}>
          <StyledModal>
            {isSuccess ? (
              <>
                <SuccessModalTitle style={{ justifyContent: "center" }}>
                  Форма успешно отправлена
                </SuccessModalTitle>
                <img
                  src={successIconSrc}
                  width={80}
                  height={80}
                  alt="success"
                />
                <Button to="/">На главную</Button>
              </>
            ) : isError ? (
              <>
                <SuccessModalTitle>
                  Ошибка
                  <ErrorModalCloseButton onClick={() => setModalActive(false)}>
                    X
                  </ErrorModalCloseButton>
                </SuccessModalTitle>
                <img src={errorIconSrc} width={80} height={80} alt="error" />
                <ErrorModalButtonWrapper>
                  <Button>Закрыть</Button>
                </ErrorModalButtonWrapper>
              </>
            ) : (
              "Something went wrong"
            )}
          </StyledModal>
        </StyledModalWrapper>
      )}
      <RangePage page={page} setPage={setPage} />

      <StyledFormWrapper>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <>
              <FormPage page={page} setPage={setPage} {...props} />
              <StyledControls>
                <Button
                  id="button-back"
                  type="button"
                  transparent
                  onClick={() => setPage(page > 1 ? page - 1 : 1)}
                >
                  Назад
                </Button>
                {page === 3 ? (
                  <Button
                    id="button-send"
                    type="submit"
                    onClick={() => props.submitForm()}
                  >
                    Отправить
                  </Button>
                ) : (
                  <Button
                    id="button-next"
                    type="button"
                    onClick={() => setPage(page < 3 ? page + 1 : 3)}
                  >
                    Далее
                  </Button>
                )}
              </StyledControls>
            </>
          )}
        </Formik>
      </StyledFormWrapper>
    </StyledMainWrapper>
  );
}

type PageProps = {
  page: number;
  setPage: (page: number) => void;
};

const StyledAdvantageWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.margin.medium};
`;

const StyledAdvantagesMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.margin.small};
`;

const StyledField = styled(Field)`
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 12px;
  max-width: 300px;
  width: 100%;
  color: ${({ theme }) => theme.colors.text.placeholder};
`;
const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 300px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;
const StyledDeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    filter: drop-shadow(0 0 1px rgb(236, 57, 57));
    scale: 1.1;
  }
`;
const StyledCheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.margin.small};
`;
const StyledCheckboxTitle = styled.p`
  font-size: ${({ theme }) => theme.font.size.small};
`;
const StyledCheckboxLabel = styled.label`
  display: flex;
  gap: ${({ theme }) => theme.margin.small};
  font-size: ${({ theme }) => theme.font.size.small};
`;
const StyledTextareaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.margin.small};
`;
const StyledTextareaLabel = styled.label`
  display: flex;
  gap: ${({ theme }) => theme.margin.small};
  font-size: ${({ theme }) => theme.font.size.small};
`;
const StyledTextarea = styled(Field)`
  padding: ${({ theme }) => theme.margin.small};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border-color: ${({ theme }) => theme.colors.border.medium};
  max-width: 100%;
  min-height: 40px;
  min-width: 100px;
  width: 100%;
`;
const StyledCounterWrapper = styled.div`
  width: 100%;
  position: relative;
`;
const StyledCounter = styled.span`
  position: absolute;
  right: 10px;
  bottom: 10px;
`;
const StyledTextareaTip = styled.p`
  display: flex;
  gap: ${({ theme }) => theme.margin.small};
  font-size: ${({ theme }) => theme.font.size.extraSmall};
`;
function FormPage({
  page,
  ...props
}: PageProps & FormikProps<typeof initialValues>) {
  switch (page) {
    case 1:
      return (
        <StyledForm onSubmit={props.handleSubmit}>
          <TextInput
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            touched={props.touched.nickName}
            value={props.values.nickName}
            name="nickName"
            errors={props.errors.nickName}
            placeholder="Placeholder"
            labelText="Nickname"
            id="field-nickname"
          />
          <TextInput
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            touched={props.touched.name}
            value={props.values.name}
            name="name"
            errors={props.errors.name}
            placeholder="Placeholder"
            labelText="Name"
            id="field-name"
          />
          <TextInput
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            touched={props.touched.sername}
            value={props.values.sername}
            name="sername"
            errors={props.errors.sername}
            placeholder="Placeholder"
            labelText="Sername"
            id="field-sername"
          />
          <Select
            labelText="Sex"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            touched={props.touched.sex}
            value={props.values.sex}
            name="sex"
            errors={props.errors.sex}
            id="field-sex"
          >
            <option value={""} disabled>
              Не выбрано
            </option>
            <option value="man">Man</option>
            <option value="woman">Woman</option>
          </Select>
        </StyledForm>
      );
    case 2:
      return (
        <>
          <p>Advantages</p>
          <StyledAdvantagesMainWrapper>
            <FieldArray name="advantages">
              {({ remove, push }) => (
                <>
                  {props.values.advantages.length > 0 &&
                    props.values.advantages.map((_, index) => (
                      <StyledAdvantageWrapper key={index}>
                        <StyledWrapper>
                          <StyledField
                            name={`advantages.${index}`}
                            type="text"
                            id={`field-advantages-${index + 1}`}
                            placeholder="Placeholder"
                          />
                        </StyledWrapper>
                        <StyledDeleteButton
                          type="button"
                          className="secondary"
                          id={`button-remove-${index + 1}`}
                          onClick={() => remove(index)}
                        >
                          <img src={deleteIconSrc} alt="delete" />
                        </StyledDeleteButton>
                      </StyledAdvantageWrapper>
                    ))}
                  <Button
                    type="button"
                    transparent
                    className="secondary"
                    id="button add"
                    fontSize="large"
                    onClick={() => push("")}
                  >
                    +
                  </Button>
                </>
              )}
            </FieldArray>
          </StyledAdvantagesMainWrapper>
          <StyledCheckboxWrapper>
            <StyledCheckboxTitle>Checkbox group</StyledCheckboxTitle>
            <StyledCheckboxLabel>
              <Field type="checkbox" name="checkbox" value="1" />1
            </StyledCheckboxLabel>
            <StyledCheckboxLabel>
              <Field type="checkbox" name="checkbox" value="2" />2
            </StyledCheckboxLabel>
            <StyledCheckboxLabel>
              <Field type="checkbox" name="checkbox" value="3" />3
            </StyledCheckboxLabel>
          </StyledCheckboxWrapper>
          <StyledCheckboxWrapper>
            <StyledCheckboxTitle>Radio group</StyledCheckboxTitle>
            <StyledCheckboxLabel>
              <Field type="radio" name="radio" value="1" />1
            </StyledCheckboxLabel>
            <StyledCheckboxLabel>
              <Field type="radio" name="radio" value="2" />2
            </StyledCheckboxLabel>
            <StyledCheckboxLabel>
              <Field type="radio" name="radio" value="3" />3
            </StyledCheckboxLabel>
          </StyledCheckboxWrapper>
        </>
      );
    case 3:
      return (
        <StyledTextareaWrapper>
          <StyledTextareaLabel>About</StyledTextareaLabel>
          <StyledCounterWrapper>
            <StyledTextarea
              as="textarea"
              name="about"
              value={props.values.about}
              onChange={props.handleChange}
              placeholder="Placeholder"
            />
            <StyledCounter>
              {props.values.about.replace(/\s+/g, "").length}
            </StyledCounter>
          </StyledCounterWrapper>
          <StyledTextareaTip>Tip: {props.errors.about}</StyledTextareaTip>
        </StyledTextareaWrapper>
      );
    default:
      return "Wrong page";
  }
}
type isActive = { isActive?: boolean };

const StyledRangeWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.margin.medium};
`;
const StyledRangeCircle = styled.div<isActive>`
  width: 16px;
  height: 16px;
  scale: 1.1;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  &:hover {
    scale: 1.3;
  }
  cursor: pointer;
  border-radius: 50%;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.secondary : theme.colors.border.dark};
`;
const StyledRangeCircleInner = styled.div`
  width: 4px;
  height: 4px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
`;
const StyledRangeCheckMark = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
`;
const StyledRangeText = styled.span<isActive>`
  position: relative;
  top: 20px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.secondary : theme.colors.text};
`;
const StyledRangeConnection = styled.div<isActive>`
  flex: 1;
  height: 8px;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.secondary : theme.colors.border.light};
`;

function RangePage({ page, setPage }: PageProps) {
  switch (page) {
    case 1:
      return (
        <StyledRangeWrapper>
          <StyledRangeCircle isActive onClick={() => setPage(1)}>
            <StyledRangeCircleInner />
            <StyledRangeText isActive>1</StyledRangeText>
          </StyledRangeCircle>
          <StyledRangeConnection />
          <StyledRangeCircle onClick={() => setPage(2)}>
            <StyledRangeText>2</StyledRangeText>
          </StyledRangeCircle>
          <StyledRangeConnection />
          <StyledRangeCircle onClick={() => setPage(3)}>
            <StyledRangeText>3</StyledRangeText>
          </StyledRangeCircle>
        </StyledRangeWrapper>
      );
    case 2:
      return (
        <StyledRangeWrapper>
          <StyledRangeCircle isActive onClick={() => setPage(1)}>
            <StyledRangeCheckMark>🗸</StyledRangeCheckMark>
            <StyledRangeText isActive>1</StyledRangeText>
          </StyledRangeCircle>
          <StyledRangeConnection isActive />
          <StyledRangeCircle isActive onClick={() => setPage(2)}>
            <StyledRangeCircleInner />
            <StyledRangeText isActive>2</StyledRangeText>
          </StyledRangeCircle>
          <StyledRangeConnection />
          <StyledRangeCircle onClick={() => setPage(3)}>
            <StyledRangeText>3</StyledRangeText>
          </StyledRangeCircle>
        </StyledRangeWrapper>
      );
    case 3:
      return (
        <StyledRangeWrapper>
          <StyledRangeCircle isActive onClick={() => setPage(1)}>
            <StyledRangeCheckMark>🗸</StyledRangeCheckMark>
            <StyledRangeText isActive>1</StyledRangeText>
          </StyledRangeCircle>
          <StyledRangeConnection isActive />
          <StyledRangeCircle isActive onClick={() => setPage(2)}>
            <StyledRangeCheckMark>🗸</StyledRangeCheckMark>
            <StyledRangeText isActive>2</StyledRangeText>
          </StyledRangeCircle>
          <StyledRangeConnection isActive />
          <StyledRangeCircle isActive onClick={() => setPage(3)}>
            <StyledRangeCircleInner />
            <StyledRangeText isActive>3</StyledRangeText>
          </StyledRangeCircle>
        </StyledRangeWrapper>
      );
    default:
      return "Wrong page";
  }
}
