import "./LoginRegister.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useForm, SubmitHandler } from "react-hook-form";
import auth from "../../firebase/firebaseConfig";
import {
  useAuthSignInWithEmailAndPassword,
  useAuthCreateUserWithEmailAndPassword,
  useAuthUpdateProfile,
} from "@react-query-firebase/auth";
import axios from "axios";
import { User } from "firebase/auth";

import { useQueryClient } from "react-query";

type SignUpInputs = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
type SignInInputs = {
  email: string;
  password: string;
};

export default function LoginRegister() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpInputs>();
  const {
    register: registerIn,
    handleSubmit: handleSubmitIn,
    // watch: watchIn,
    formState: { errors: errorsIn },
  } = useForm<SignInInputs>();
  const singInMutation = useAuthSignInWithEmailAndPassword(auth, {
    onError(error) {
      console.log(error);
    },
  });
  const signUpMutation = useAuthCreateUserWithEmailAndPassword(auth, {
    onError(error) {
      console.log(error);
    },
  });
  const profileUpdateMutation = useAuthUpdateProfile();

  const handleSignUp: SubmitHandler<SignUpInputs> = async (data) => {
    await signUpMutation.mutateAsync(data);
    await profileUpdateMutation.mutateAsync({
      user: auth.currentUser as User,
      displayName: data.fullName, // optional
    });
    if (auth.currentUser?.email !== "mushfiq.admin@admin.com") {
      await axios.post(
        `${
          import.meta.env.PROD ? "/" : "http://127.0.0.1:3000/"
        }api/inboxes/inbox`,
        {
          sender: auth.currentUser?.email,
          receiver: "mushfiq.admin@admin.com",
        }
      );
      queryClient.invalidateQueries({
        queryKey: ["api", "inbox_list_with_overview", auth.currentUser?.email],
      });
      // console.log(inbox);
    }
  };

  const handleSignIn: SubmitHandler<SignInInputs> = (data) => {
    singInMutation.mutate(data);
  };
  return (
    <HelmetProvider>
      <div className="container pb-5 mb-sm-4">
        <Helmet>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
            integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N"
            crossOrigin="anonymous"
          />
          <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
            rel="stylesheet"
          />

          <link rel="stylesheet" href={"#"} />
        </Helmet>
        <div className="row pt-5">
          <div className="col-md-6 pt-sm-3">
            <div className="card">
              <div className="card-body">
                <h2 className="h4 mb-5">Sign in</h2>
                {/* <div className="d-sm-flex align-items-center py-3">
                  <h3 className="h6 font-weight-semibold opacity-70 mb-3 mb-sm-2 mr-sm-3">
                    With social account:
                  </h3>
                  <div>
                    <a
                      className="social-btn sb-facebook mr-2 mb-2"
                      href="#"
                      data-toggle="tooltip"
                      title=""
                      data-original-title="Sign in with Facebook"
                    >
                      <i className="fa fa-facebook" />
                    </a>
                    <a
                      className="social-btn sb-twitter mr-2 mb-2"
                      href="#"
                      data-toggle="tooltip"
                      title=""
                      data-original-title="Sign in with Twitter"
                    >
                      <i className="fa fa-twitter" />
                    </a>
                    <a
                      className="social-btn sb-linkedin mr-2 mb-2"
                      href="#"
                      data-toggle="tooltip"
                      title=""
                      data-original-title="Sign in with LinkedIn"
                    >
                      <i className="fa fa-linkedin" />
                    </a>
                  </div>
                </div> */}
                {/* <hr /> */}
                {/* <h3 className="h6 font-weight-semibold opacity-70 pt-4 pb-2">
                  Or using form below
                </h3> */}
                <form
                  className="needs-validation"
                  noValidate={true}
                  onSubmit={handleSubmitIn(handleSignIn)}
                >
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-mail"
                        >
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </span>
                    </div>
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Email"
                      required={true}
                      {...registerIn("email", {
                        required: "Please enter your email!",
                        validate: {
                          matchPattern: (v) =>
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                              v
                            ) || "Email address must be a valid address!",
                        },
                      })}
                    />
                    <div
                      className={`invalid-feedback ${
                        errorsIn?.email && "d-block"
                      }`}
                    >
                      {errorsIn.email?.message}
                    </div>
                  </div>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-lock"
                        >
                          <rect
                            x={3}
                            y={11}
                            width={18}
                            height={11}
                            rx={2}
                            ry={2}
                          />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </span>
                    </div>
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Password"
                      required={true}
                      {...registerIn("password", {
                        required: "Please enter your password!",
                      })}
                    />
                    <div
                      className={`invalid-feedback ${
                        errorsIn?.password && "d-block"
                      }`}
                    >
                      {errorsIn.password?.message}
                    </div>
                  </div>
                  <div className="d-flex flex-wrap justify-content-between">
                    <div className="custom-control custom-checkbox">
                      <input
                        className="custom-control-input"
                        type="checkbox"
                        defaultChecked={true}
                        id="remember_me"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="remember_me"
                      >
                        Remember me
                      </label>
                    </div>
                    <a
                      className="nav-link-inline font-size-sm"
                      href="account-password-recovery.html"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <hr className="mt-4" />
                  <div className="text-right pt-4">
                    <button className="btn btn-primary" type="submit">
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6 pt-5 pt-sm-3">
            <h2 className="h4 mb-3">No account? Sign up</h2>
            <p className="text-muted mb-4">
              Registration takes less than a minute but gives you full control
              over your orders.
            </p>
            <form
              className="needs-validation"
              noValidate={true}
              onSubmit={handleSubmit(handleSignUp)}
            >
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="reg-fn">Full Name</label>
                    <input
                      className="form-control"
                      type="text"
                      required={true}
                      // name="fullName"
                      id="reg-fn"
                      {...register("fullName", { required: true })}
                    />
                    <div
                      className={`invalid-feedback ${
                        errors.fullName && "d-block"
                      }`}
                    >
                      Please enter your full name!
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="reg-email">E-mail Address</label>
                    <input
                      className="form-control"
                      type="email"
                      required={true}
                      // name="email"
                      id="reg-email"
                      {...register("email", {
                        required: "Please enter your email!",
                        validate: {
                          matchPattern: (v) =>
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                              v
                            ) || "Email address must be a valid address!",
                        },
                      })}
                    />
                    <div
                      className={`invalid-feedback ${
                        errors?.email && "d-block"
                      }`}
                    >
                      {errors.email?.message}
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="reg-password">Password</label>
                    <input
                      className="form-control"
                      type="password"
                      required={true}
                      // name="password"
                      id="reg-password"
                      {...register("password", { required: true })}
                    />
                    <div
                      className={`invalid-feedback ${
                        errors.password && "d-block"
                      }`}
                    >
                      Please enter password!
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="reg-password-confirm">
                      Confirm Password
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      required={true}
                      // name="confirmPassword"
                      id="reg-password-confirm"
                      {...register("confirmPassword", {
                        required: "Please enter confirm password!",
                        validate: (val) => {
                          if (watch("password") !== val) {
                            return "Passwords do not match!";
                          }
                        },
                      })}
                    />
                    <div
                      className={`invalid-feedback ${
                        errors?.confirmPassword && "d-block"
                      }`}
                    >
                      {errors?.confirmPassword?.message}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <button
                  className="btn btn-primary"
                  type="submit"
                  // onClick={handleSignUp}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}
