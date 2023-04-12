import Head from "next/head";
import "../styles/globals.css";
import App, { AppProps } from "next/app";
import React from "react";
import useDevice, { DeviceType } from "../hooks/useDeviceType";

export default function MyApp({ Component, pageProps }: AppProps) {
  const { device } = useDevice();

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Next.js PWA Example</title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <AppContext.Provider
        value={{
          device,
        }}
      >
        <Component {...pageProps} />
      </AppContext.Provider>
    </>
  );
}

export const AppContext = React.createContext({
  // db: undefined as Firestore | undefined,
  // auth: undefined as Auth | undefined,
  // fireStoreHelper: undefined as FireStoreHelper | undefined,
  device: DeviceType.Smartphone,
  // user: new MyUser(),
  // userConfig: UserConfig.constructEmpty(),
  // patients: [] as Patient[],
});
