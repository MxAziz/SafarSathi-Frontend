import { getUserInfo } from "@/services/auth/getUserInfo";

export const dynamic = "force-dynamic";

const CommonDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const authData = await getUserInfo();

  return (
   <div></div>
  );
};

export default CommonDashboardLayout;