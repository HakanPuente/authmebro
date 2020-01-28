import { Formik, FormikProps, FormikValues } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {
  FunctionComponent,
  ReactComponentElement,
  useCallback,
  useContext,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { graphql, ReactRelayContext, useMutation } from 'relay-hooks';
import { Button, Container, Form, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import { me } from '../+store/auth.actions';
import { saveSession } from '../+store/auth.utils';
import settings from '../../../settings';
import TOKEN_AUTH_MUTATION, {
  SignInTokenAuthMutation,
} from '../../../__generated__/SignInTokenAuthMutation.graphql';
import FormError from '../../common/form/form-error';
import PasswordControl from '../../common/form/password-control';
import TextControl from '../../common/form/text-control';
import LoadingIndicator from '../../common/loading-indicator';
import resolveUserFragment from '../utils/resolve-user-fragment';
import './sign-in.styles.less';

const Schema = Yup.object().shape({
  username: Yup.string()
    .lowercase()
    .required('Required'),
  password: Yup.string().required('Required'),
});

interface Values {
  username: string;
  password: string;
}

interface Props {
  defaultUsername?: string;
}

graphql`
  mutation SignInTokenAuthMutation($input: ObtainJSONWebTokenInput!) {
    tokenAuth(input: $input) {
      token
      refreshToken
      user {
        ...AuthInitUserFragment
      }
    }
  }
`;

const SignInForm: FunctionComponent<Props> = (props: Props) => {
  const { defaultUsername } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const [errors, setErrors] = useState<any>([]);
  const [loadingMsg, setLoadingMsg] = useState<string>('');

  const relayContext = useContext(ReactRelayContext) as any;
  const [signIn, { loading }] = useMutation<SignInTokenAuthMutation>(
    TOKEN_AUTH_MUTATION,
    {
      onCompleted: result => {
        const { redirect } = router.query;
        setErrors([]);
        if (
          result.tokenAuth &&
          result.tokenAuth.user &&
          result.tokenAuth.token &&
          result.tokenAuth.refreshToken
        ) {
          setLoadingMsg('Redirecting ...');
          const user = resolveUserFragment(relayContext, result.tokenAuth.user);
          saveSession(
            user.username,
            result.tokenAuth.token,
            result.tokenAuth.refreshToken,
          );
          router.push((redirect as string) || settings.dashboardUri);
          dispatch(me(user));
        }
      },
      onError: (signInErrors: any) => {
        if (Array.isArray(signInErrors)) {
          setErrors(signInErrors.map((e: any) => e.message));
        } else if (signInErrors) {
          setErrors([signInErrors.message]);
        }
      },
    },
  );

  const handleSubmit = useCallback(
    (values: Values) => {
      const { password, username } = Schema.cast(values);
      signIn({
        variables: {
          input: {
            username,
            password,
          },
        },
      });
    },
    [signIn],
  );
  // const loadingMsg = useSelector(
  //   (state: RootState) => state.auth.signIn.loadingMsg,
  // );
  // const errorMsg = useSelector(
  //   (state: RootState) => state.auth.signIn.errorMsg,
  // );
  return (
    <Container>
      <Segment className="central-col">
        <LoadingIndicator
          loading={!!loadingMsg || loading}
          msg={loadingMsg || 'Authenticating ...'}
        />
        <Formik
          initialValues={{
            username: defaultUsername || '',
            password: '',
          }}
          validationSchema={Schema}
          onSubmit={handleSubmit}
        >
          {(
            formikProps: FormikProps<FormikValues>,
          ): ReactComponentElement<any> => (
            <Form onSubmit={formikProps.handleSubmit}>
              <h1>Sign In</h1>
              <TextControl
                name="username"
                label="Username"
                icon="user"
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
                <Link href="/auth/sign-up">
                  <Button type="button" basic>
                    Sign Up
                  </Button>
                </Link>
                <Button primary className="form-button" type="submit">
                  Sign In
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Segment>
    </Container>
  );
};

export default SignInForm;
