import { ReactElement } from "react";
import Layout from "../components/layout";
import type { NextPageWithLayout } from "./_app";

const InstancesPage: NextPageWithLayout = () => {
  return <p>Hello new page</p>;
};

InstancesPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default InstancesPage;
