import type { ReactElement } from 'react';

const NoSSR = ({ children }: { children: ReactElement }) => {
  return children;
};
export default NoSSR;
