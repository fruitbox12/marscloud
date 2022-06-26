import { ReactElement } from "react";
import { useRouter } from "next/router";
import { Heading } from "@chakra-ui/react";
import Layout from "../../components/layout";
import type { NextPageWithLayout } from "../_app";

const NewInstancePage: NextPageWithLayout = () => {
  return (
    <>
      <Heading>Create New Instance</Heading>
    </>
  );
};

NewInstancePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NewInstancePage;
