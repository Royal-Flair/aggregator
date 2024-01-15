import { ReactNode } from "react";
import Bottombar from "./BottomBar";

interface DashboardLayoutProps {
    children: ReactNode;
}

const Layout: React.FC<DashboardLayoutProps> = ({ children  }) => {
    return (
        <>
            {children}
            <Bottombar />
        </>
    );
};

export default Layout;