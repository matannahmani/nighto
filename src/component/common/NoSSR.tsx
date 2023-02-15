import { ReactElement, ReactNode, useEffect, useState } from 'react';

const NoSSR = ({ children }: { children: ReactElement }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return children;
};
export default NoSSR;
