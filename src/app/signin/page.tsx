"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../../firebase.config";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { encrypt } from "@/lib/helpers/encrypt";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [callbackUrl, setCallbackUrl] = useState("/");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const callbackUrlParam = urlParams.get("callbackUrl");
    setCallbackUrl(
      callbackUrlParam ? decodeURIComponent(callbackUrlParam) : "/"
    );
  }, []);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !email.includes("@") || !password) {
      toast.error("Please provide a valid email and password.");
      return;
    }
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const db = getFirestore();
      const userDocRef = doc(db, "users", user.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        localStorage.setItem("userCommands", JSON.stringify(userData.commands));
        localStorage.setItem("username", encrypt(userData.username));
        router.push(callbackUrl);
        await toast.success("Logged in successfully");
      } else {
        toast.error("User document does not exist. Please contact support.");
      }

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error("Invalid email or password");
      setError(error.message);
    }
  };
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <p className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            Asoriba Slack Commands
          </p>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Sign In
              </h1>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  disabled={loading}
                  onClick={handleLogin}
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
