import { getCookies } from "@/services/auth/tokenHandler";
import PublicNavbar from "./PublicNavbar";
import { getUserInfo } from "@/services/auth/getUserInfo";

const NavbarWrapper = async () => {
  const accessToken = (await getCookies("accessToken")) || null;

  const authData = await getUserInfo();
  return (
    <PublicNavbar authData={authData} accessToken={accessToken as string} />
  );
};

export default NavbarWrapper;