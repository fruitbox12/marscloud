import { FC, ReactNode } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Link } from "@chakra-ui/react";

type SiderbarLinkProps = {
  children: ReactNode;
  href: string;
};

const SiderbarLink: FC<SiderbarLinkProps> = ({ children, href }) => {
  const router = useRouter();
  const isActive =
    router.asPath.split("/")[1] === href.split("/")[1] ? true : false;
  const bg = isActive ? "rgba(250,250,250,.2);" : "";
  const fontWeight = isActive ? "600" : "500";
  const hover = {
    _hover: { bg: isActive ? "rgba(250,250,250,.2);" : "#0a1b3d" },
  };

  return (
    <NextLink href={href} passHref>
      <Link variant="sidebar" bg={bg} _hover={hover} fontWeight={fontWeight}>
        {children}
      </Link>
    </NextLink>
  );
};

export default SiderbarLink;
