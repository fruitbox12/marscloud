import { ReactElement } from "react";
import Layout from "../components/layout";
import type { NextPageWithLayout } from "./_app";

const VolumesPage: NextPageWithLayout = () => {
  return <p>Volumes</p>;
};

VolumesPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default VolumesPage;
