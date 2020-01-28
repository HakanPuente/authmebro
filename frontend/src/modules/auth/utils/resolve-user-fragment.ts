import USER_FRAGMENT, {
  AuthInitUserFragment,
} from '../../../__generated__/AuthInitUserFragment.graphql';
import FragmentResolver from 'relay-hooks/lib/FragmentResolver';

export default function resolveUserFragment(
  relayContext: any,
  userFragmentRef: any,
): AuthInitUserFragment {
  const resolver = new FragmentResolver(false);
  resolver.resolve(relayContext.environment, USER_FRAGMENT, userFragmentRef);
  const user = resolver.getData();
  return user;
}
