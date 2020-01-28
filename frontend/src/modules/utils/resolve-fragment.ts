import FragmentResolver from 'relay-hooks/lib/FragmentResolver';
import { RelayContext } from 'react-relay';

export default function resolveFragment<T>(
  relayContext: RelayContext,
  fragmentDef: any,
  fragmentRef: any,
): T {
  const resolver = new FragmentResolver(false);
  resolver.resolve(relayContext.environment, fragmentDef, fragmentRef);
  const user = resolver.getData();
  return user;
}
