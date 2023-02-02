import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps, AppType } from "next/app";
import { api } from "../utils/api";
import Layout from "../components/Layout";
import "../styles/globals.css";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: AppType<object> = ({
  Component,
  pageProps,
}: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  const pageWithLayout = getLayout(<Component {...pageProps} />) as JSX.Element;

  return <>{pageWithLayout}</>;
};

export default api.withTRPC(MyApp);
