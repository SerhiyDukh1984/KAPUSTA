import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { useFormik } from 'formik';
import { registerUser, loginUser } from 'redux/auth/authOperations';
import { getAuthError, getAuthLoading } from 'redux/auth/AuthSelector';
// import { toast } from 'react-toastify';
import * as Yup from 'yup';
import s from './Auth.module.css';
import Loader from 'components/Loader/Loader';

export const Auth = () => {
  const isLoading = useSelector(getAuthLoading);
  const error = useSelector(getAuthError);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
    },

    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email')
        .required('This is a required field'),
      password: Yup.string()
        .min(7, 'Min length 7')
        .required('This is a required field'),
    }),
  });

  const handleSubmitRegister = e => {
    e.preventDefault();
    if (formik.errors.email || formik.errors.password) {
      alert('Please enter correct data');
      // toast.error('Please, enter correct data!', {
      //   autoClose: 2000,
      //   theme: 'colored',
      // });
      return;
    }
    dispatch(
      registerUser({
        email: formik.values.email,
        password: formik.values.password,
      })
    );

    reset();
  };

  const handleSubmitLogin = e => {
    e.preventDefault();
    if (formik.errors.email || formik.errors.password) {
      alert('Please enter correct data');
      // toast.error('Please, enter correct data!', {
      //   autoClose: 2000,
      //   theme: 'colored',
      // });
      return;
    }

    dispatch(
      loginUser({
        email: formik.values.email,
        password: formik.values.password,
      })
    );

    reset();
  };

  const reset = () => {
    formik.values.email = '';
    formik.values.password = '';
  };

  return (
    <>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        <p className={s.itemForGoogle}>
          You can log in with your Google Account:
        </p>
        <button className={s.google} type="button">
          Google
        </button>
        <p className={s.item}>
          Or log in using an email and password, after registering:
        </p>
        <div className={s.wrapper}>
          <label className={s.text} htmlFor="email">
            {formik.touched.email && formik.errors.email && (
              <span className={s.span}>*</span>
            )}
            Email:
          </label>
          <input
            className={s.input}
            type="email"
            name="email"
            id="email"
            placeholder="your@email.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <p className={s.error}>
            {formik.touched.email && formik.errors.email && formik.errors.email}
          </p>
        </div>
        <div className={s.wrapperPassword}>
          <label className={s.text} htmlFor="password">
            {formik.touched.password && formik.errors.password && (
              <span className={s.span}>*</span>
            )}
            Password:
          </label>
          <input
            className={s.input}
            type="password"
            name="password"
            id="password"
            placeholder="your password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <p className={s.error}>
            {formik.touched.password &&
              formik.errors.password &&
              formik.errors.password}
          </p>
        </div>
        <>
          <div className={s.wrapperButtons}>
            <button
              className={s.buttonSubmit}
              type="submit"
              onClick={handleSubmitLogin}
            >
              LOG IN
            </button>
            <button
              className={s.button}
              type="submit"
              onClick={handleSubmitRegister}
            >
              REGISTRATION
            </button>
          </div>
        </>
      </form>
      {isLoading && <Loader />}
      {console.log(error)}
      {error === 'Request failed with status code 400' && (
        <div className={s.notificationError}>
          Sorry, but your data isn't correct. Try again
        </div>
      )}
      {error === 'Request failed with status code 409' && (
        <div className={s.notificationError}>
          Sorry, but provided email already exists. If it's your account, click
          log in
        </div>
      )}
      {error === 'Request failed with status code 403' && (
        <div className={s.notificationError}>
          Sorry, but email doesn't exist / password is wrong
        </div>
      )}
    </>
  );
};
