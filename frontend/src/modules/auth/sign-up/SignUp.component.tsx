import React, {
  useState,
  useContext,
  useCallback,
  FunctionComponent,
  ReactComponentElement,
} from 'react';
//v
import { Formik, FormikProps, FormikValues } from 'formik';
import { Button, Container, Form, Segment } from 'semantic-ui-react';
import Link from 'next/link';
import * as Yup from 'yup';
import { me } from '../+store/auth.actions';

import { graphql, ReactRelayContext, useMutation } from 'relay-hooks';
import LoadingIndicator from '../../common/loading-indicator';

import { useRouter } from 'next/router';
import resolveUserFragment from '../utils/resolve-user-fragment';
import { saveSession } from '../+store/auth.utils';
import settings from '../../../settings';

import TextControl from '../../common/form/text-control';
import FormError from '../../common/form/form-error';
import PasswordControl from '../../common/form/password-control';
import SIGN_UP_MUTATION, {
  SignUpMutation,
} from '../../../__generated__/SignUpMutation.graphql';

// import './sign-up.styles.less';

const Schema = Yup.object().shape({
  username: Yup.string()
    .lowercase()
    .required('Required'),
  password: Yup.string().required('Required'),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().required('Required'),
});

interface Values {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

graphql`
  mutation SignUpMutation($data: InputUser!) {
    signUp(data: $data)
  }
`;

const SignUpForm: FunctionComponent = () => {
  const router = useRouter();
  console.log('---router---', router);

  const [errors, setErrors] = useState<any>([]);
  const [loadingMsg, setLoadingMsg] = useState<string>('');

  const relayContext = useContext(ReactRelayContext) as any;
  const [signUp, { loading }] = useMutation<SignUpMutation>(SIGN_UP_MUTATION, {
    onCompleted: result => {
      const { redirect } = router.query;
      setErrors([]);
      console.log('************router.query: ', router.query);
      // console.log("***setErrors: ", setErrors)
      if (result.signUp && result.signUp.user) {
        setLoadingMsg('Redirecting...');
        const user = resolveUserFragment(relayContext, result.signUp.user);
        saveSession(user.username, user.firstName, user.lastName);
        console.log('***result.signUp', result.signUp);
        console.log('result.signup.user: ', result.signUp.user);
        console.log('***user: ', user);
        router.push((redirect as string) || settings.dashboardUri);

        console.log('settings.dashboardUri: ', settings.dashboardUri);
        console.log('me', me);
      }
    },
    onError: (signUpErrors: any) => {
      if (Array.isArray(signUpErrors)) {
        setErrors(signUpErrors.map((e: any) => e.message));
      } else if (signUpErrors) {
        setErrors([signUpErrors.message]);
      }
    },
  });

  const handleSubmit = useCallback(
    (values: Values) => {
      const { email, firstName, lastName, username, password } = Schema.cast(
        values,
      );
      signUp({
        variables: {
          data: {
            email,
            firstName,
            lastName,
            username,
            password,
          },
        },
      });
    },
    [signUp],
  );
  return (
    <Container>
      <Segment className="central-col">
        <LoadingIndicator
          loading={!!loadingMsg || loading}
          msg={loadingMsg || 'Creating...'}
        />
        <Formik
          initialValues={{
            username: '',
            password: '',
            lastName: '',
            firstName: '',
            email: '',
          }}
          validationSchema={Schema}
          onSubmit={handleSubmit}
        >
          {(
            formikProps: FormikProps<FormikValues>,
          ): ReactComponentElement<any> => (
            <Form onSubmit={formikProps.handleSubmit}>
              <h1>Sign Up</h1>
              <TextControl
                name="username"
                label="Username"
                icon="user outline"
                handleChange={formikProps.handleChange}
                handleBlur={formikProps.handleBlur}
                value={formikProps.values.username}
                error={formikProps.errors && formikProps.errors.username}
                touched={formikProps.touched && formikProps.touched.username}
                inputProps={{
                  autoCapitalize: 'none',
                  placeholder: 'username',
                  iconPosition: 'left',
                }}
              />
              <TextControl
                name="firstName"
                label="First Name"
                icon="user"
                handleChange={formikProps.handleChange}
                handleBlur={formikProps.handleBlur}
                value={formikProps.values.firstName}
                error={formikProps.errors && formikProps.errors.firstName}
                touched={formikProps.touched && formikProps.touched.firstName}
                inputProps={{
                  autoCapitalize: 'none',
                  placeholder: 'first name',
                  iconPosition: 'left',
                }}
              />
              <TextControl
                name="lastName"
                label="Last Name"
                icon="user"
                handleChange={formikProps.handleChange}
                handleBlur={formikProps.handleBlur}
                value={formikProps.values.lastName}
                error={formikProps.errors && formikProps.errors.lastName}
                touched={formikProps.touched && formikProps.touched.lastName}
                inputProps={{
                  autoCapitalize: 'none',
                  placeholder: 'last name',
                  iconPosition: 'left',
                }}
              />
              <TextControl
                name="email"
                label="Email"
                icon="envelope"
                handleChange={formikProps.handleChange}
                handleBlur={formikProps.handleBlur}
                value={formikProps.values.email}
                error={formikProps.errors && formikProps.errors.email}
                touched={formikProps.touched && formikProps.touched.email}
                inputProps={{
                  autoCapitalize: 'none',
                  placeholder: 'email',
                  iconPosition: 'left',
                }}
              />
              <PasswordControl
                name="password"
                label="Password"
                icon="lock"
                handleChange={formikProps.handleChange}
                handleBlur={formikProps.handleBlur}
                value={formikProps.values.password}
                error={formikProps.errors && formikProps.errors.password}
                touched={formikProps.touched && formikProps.touched.password}
                inputProps={{
                  autoCapitalize: 'none',
                  placeholder: 'Password',
                }}
              />

              {!!errors.length && <FormError errors={errors} />}
              <div className="form-button-group">
                <Link href="/auth/forgot">
                  <Button type="button" basic>
                    Forgot
                  </Button>
                </Link>
                <Link href="/auth/sign-in">
                  <Button type="button" basic>
                    Sign In
                  </Button>
                </Link>
                <Button primary className="form-button" type="submit">
                  Sign Up
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Segment>
    </Container>
  );
};

export default SignUpForm;
