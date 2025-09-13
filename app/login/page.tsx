"use client"
// pages/login.tsx
import { pb } from "@/lib/pocketbase"; // 确保你有一个 pb 实例导出

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isEmail = (str: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(str);
    };

    useEffect(() => {
        if (pb.authStore.isValid) {
            router.push("/");

        }
    }, []);

    const submitLogin = async () => {
        if (!isEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        } else if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        } else if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            setDisabled(true);
            await pb.collection("users").authWithPassword(email, password);
            router.push("/");
        } catch (err: any) {
            console.error(err);
            setError(err.message);
            setDisabled(false);
        }
    };

    return (
        <>
            <main className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-4xl font-bold mb-4">Login</h1>
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
                        No account? <a href="/register" className="text-blue-500">Register</a>
                    </div>

                    {error && <div className="mb-4 text-red-500">{error}</div>}

                    <button
                        type="button"
                        disabled={disabled}
                        onClick={submitLogin}
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
                    >
                        Login
                    </button>
                </form>
            </main>
        </>
    );
}
