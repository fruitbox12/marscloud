import { ReactElement } from "react";
import { Stack } from "@chakra-ui/react";
import Layout from "../../components/layout";
import type { NextPageWithLayout } from "../_app";
import SelectImage from "../../components/select-image";
import SelectPlan from "../../components/select-plan";

const NewInstancePage: NextPageWithLayout = () => {
  return (
    <Stack spacing={16}>
      <SelectImage />
      <SelectPlan />
    </Stack>
  );
};

NewInstancePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NewInstancePage;
