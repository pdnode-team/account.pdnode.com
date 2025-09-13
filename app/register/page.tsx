// app/register/page.tsx
"use client";

import { pb } from "@/lib/pocketbase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Register() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isEmail = (str: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);

    useEffect(() => {
        if (pb.authStore.isValid) {
            router.push("/");

        }
    }, []);
    const submitRegister = async () => {
        if (!isEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        } else if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        } else if (password !== passwordConfirm) {
            setError("Passwords do not match.");
            return;
        } else if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            setDisabled(true);
            // 创建用户
            await pb.collection("users").create({
                email,
                password,
                passwordConfirm: passwordConfirm,
            });
            // 注册完成后直接登录
            await pb.collection("users").authWithPassword(email, password);
            router.push("/");
        } catch (err: any) {
            console.error(err);
            setError(err.message);
            setDisabled(false);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold mb-4">Register</h1>
            <form className="w-full max-w-sm">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        id="passwordConfirm"
                        type="password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>

                <div className="mb-4">
                    Already have an account? <a href="/login" className="text-blue-500">Login</a>
                </div>

                {error && <div className="mb-4 text-red-500">{error}</div>}

                <button
                    type="button"
                    disabled={disabled}
                    onClick={submitRegister}
                    className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 disabled:bg-gray-400"
                >
                    Register
                </button>
            </form>
        </main>
    );
}
