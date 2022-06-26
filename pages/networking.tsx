import { ReactElement } from "react";
import Layout from "../components/layout";
import type { NextPageWithLayout } from "./_app";

const NetworkingPage: NextPageWithLayout = () => {
  return <p>Networking</p>;
};

NetworkingPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NetworkingPage;
