import NavbarWrapper from "@/components/shared/NavbarWrapper";
import PublicFooter from "@/components/shared/PublicFooter";

const CommonLayout = ({ children } : { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <NavbarWrapper />
            <main className="grow">
                {children}
            </main>
            <PublicFooter/>
        </div>
    );
};

export default CommonLayout;