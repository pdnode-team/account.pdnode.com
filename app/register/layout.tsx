// app/login/layout.tsx
import { ReactNode } from "react";

export const metadata = {
    title: "Pdnode | Register",
    description: "Create a new account.",
};

export default function RegisterLayout({ children }: { children: ReactNode }) {
    return <>{children}</>; // 只包裹页面内容
}
