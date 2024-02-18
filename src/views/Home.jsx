import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import LoginImage450 from "../assets/images/banner-image-450.png"; // desktop;
import LoginImage300 from "../assets/images/banner-image-300.png"; // tablet;
import LoginImage350 from "../assets/images/banner-image-350.png"; // mobile;
import ChatAppLogo from "../assets/images/chat-app-logo.png";
import InputField from "../components/common/InputField";
import Button from "../components/common/Button";
import { useFormik } from "formik";
import { userLoginSchema, userSignupSchema } from "../validation/validation";
import Alert from "../components/common/Alert";
import { userRegistration, userLogin } from "../services/user";
import { useNavigate } from "react-router-dom";
import { _setSecureLs } from "../utils/storage";

function Home() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [formState, setFormState] = useState(false);
  const [alert, setAlert] = useState({
    status: false,
    title: "",
    desc: "",
    type: "",
  });
  const alertRef = useRef(null);
  const inputRef = useRef(null);

  const handleAlertClose = () => {
    setAlert((prevState) => {
      return {
        ...prevState,
        status: false,
      };
    });
  };

  const handleNavSignUpClick = () => {
    handleAlertClose();
    setFormState(true);
  };
  const handleNavLoginClick = () => {
    handleAlertClose();
    setFormState(false);
  };

  const handleUserSignUp = async (values, resetForm) => {
    try {
      const response = await userRegistration(values, selectedFile);
      setAlert((prevState) => {
        return {
          ...prevState,
          status: true,
          title: "Account Registered Successfully",
          desc: response?.data?.message,
          type: "success",
        };
      });
      setFormState(false);
    } catch (error) {
      setAlert((prevState) => {
        return {
          ...prevState,
          status: true,
          title: "Unable To Register Account",
          desc: error?.response?.data?.message,
          type: "error",
        };
      });
      console.log(error, "error frontend");
    }
    resetForm();
  };
  const handleUserLogin = async (values, resetForm) => {
    try {
      const response = await userLogin(values);
      setAlert((prevState) => {
        return {
          ...prevState,
          status: true,
          title: "Account Verify Successfully",
          desc: response?.data?.message,
          type: "success",
        };
      });
      _setSecureLs("auth", {
        user: response?.data?.loggedInUser,
        token: response?.data?.token,
      });
      navigate("chat/1");
    } catch (error) {
      setAlert((prevState) => {
        return {
          ...prevState,
          status: true,
          title: "Unable To Login",
          desc: error?.response?.data?.message,
          type: "error",
        };
      });
      console.log(error, "error frontend");
    }
    resetForm();
  };

  const handleFileChange = (event) => {
    console.log("file changing...");
    const fileInput = event.currentTarget;
    const file = fileInput.files[0];
    setSelectedFile(file);
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: formState ? userSignupSchema : userLoginSchema,
    onSubmit: (values, { resetForm }) =>
      !formState ? handleUserLogin(values, resetForm) : handleUserSignUp(values, resetForm),
  });

  return (
    <div className="home">
      <div className="home__image">
        <div className="home__image__text">
          <h1>Connecting...,</h1>
          <h3>The people around the World</h3>
        </div>
        <div className="home__image__wrapper">
          <img
            src={LoginImage350}
            srcSet={`${LoginImage350} 350w, ${LoginImage300} 300w, ${LoginImage450} 450w`}
            sizes="(max-width: 599.98px) 83.33vw, (max-width: 999.98px) 39.06vw, 450px"
            alt="banner-image-mobile.png"
          />
        </div>
      </div>
      <div className="home__form">
        <div className="home__form__logo">
          <img src={ChatAppLogo} width="150px" height="120px" alt="app-logo" />
        </div>
        <h3>Login To Start Conversation</h3>

        <form onSubmit={formik.handleSubmit}>
          <CSSTransition in={alert?.status} nodeRef={alertRef} timeout={500} classNames="signup-field" unmountOnExit>
            <div ref={alertRef}>
              <Alert
                alertTitle={alert?.title}
                alertDescription={alert?.desc}
                type={alert?.type}
                handleClose={handleAlertClose}
                hideAlertBox={alert?.status}
              />
            </div>
          </CSSTransition>
          <div className="form__navigation">
            <div className={`form__navigation__nav ${formState ? "active__nav" : ""}`} onClick={handleNavSignUpClick}>
              <p>Sign Up</p>
            </div>
            <div className={`form__navigation__nav ${!formState ? "active__nav" : ""}`} onClick={handleNavLoginClick}>
              <p>Login</p>
            </div>
          </div>
          <CSSTransition in={formState} nodeRef={inputRef} timeout={500} classNames="signup-field" unmountOnExit>
            <div className="from-group" ref={inputRef}>
              <InputField
                type="text"
                placeholder="Full Name"
                name="fullName"
                errorMsg={formik.touched.fullName && formik.errors.fullName}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                value={formik.values.fullName}
              />
              <input type="file" name="profile" onChange={handleFileChange} accept="image/*" />
            </div>
          </CSSTransition>
          <div className="from-group">
            <InputField
              type="email"
              placeholder="Email"
              errorMsg={formik.touched.email && formik.errors.email}
              name="email"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              touched={formik.touched.email}
              value={formik.values.email}
            />
          </div>
          <div className="from-group">
            <InputField
              type="password"
              placeholder="Password"
              errorMsg={formik.touched.password && formik.errors.password}
              name="password"
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </div>
          <Button type="submit">{!formState ? "Login" : "Sign Up"}</Button>
        </form>
      </div>
    </div>
  );
}

export default Home;
