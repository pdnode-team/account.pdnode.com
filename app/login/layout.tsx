// app/login/layout.tsx
import { ReactNode } from "react";

export const metadata = {
    title: "Pdnode | Login",
    description: "Login to your account.",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
    return <>{children}</>; // 只包裹页面内容
}
