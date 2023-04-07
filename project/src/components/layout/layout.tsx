import { ReactNode, forwardRef } from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';

type LayoutProps = {
  children: ReactNode;
};

const Layout = forwardRef<HTMLHeadElement, LayoutProps>(
  (props, ref): JSX.Element => (
    <>
      <Header ref={ref} />
      {props.children}
      <Footer />
    </>
  )
);

Layout.displayName = 'Layout';

export default Layout;
