"use client";
import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useThemeStore } from "../../../../store/themeStore";
import Header from "@/components/Header";

const Profile = () => {
  const theme = useThemeStore((state) => state.theme);
  const [user, setUser] = useState({
    email: "",
    username: "",
    imagePath: "",
  });
  const [role,setRole] = useState("");

  const router = useRouter();

  const getUser = async () => {
    try {
      const token = Cookie.get("token");
      if (!token) return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IP_URL}/Auth/currentUser`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setRole(data.role);
      } else {
        console.error("Failed to fetch user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const logout = () => {
    Cookie.remove("token");
    router.push("/login");
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 px-4 py-6 sm:px-6 sm:py-8 md:px-12 md:py-10 lg:px-20 lg:py-12 xl:px-[90px] xl:py-[30px] 
      ${theme ? "bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white" : "bg-gradient-to-br from-white via-gray-100 to-gray-200 text-black"}`}
    >
      <Header />
      <div className="flex justify-center items-center mt-40">
        <div
          className={`w-full max-w-md p-8 rounded-3xl shadow-2xl backdrop-blur-lg 
          ${theme ? "bg-white/5 border border-white/10" : "bg-white/80 border border-gray-200"}`}
        >
          <div className="flex flex-col items-center text-center space-y-5">
            <div className="relative group">
              <img
                src={user.imagePath || "/images/defaultPoster.png"}
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover border-4 border-transparent group-hover:border-blue-500 transition duration-300"
              />
            </div>

            <h2 className="text-3xl font-bold tracking-wide">
              {user?.userName}
            </h2>

            <p className={`text-sm ${theme ? "text-gray-300" : "text-gray-500"}`}>{user.email}</p>
            {/* <p className={`text-sm ${theme ? "text-gray-300" : "text-gray-500"}`}>{role}</p> */}

            <button
              onClick={logout}
              className="mt-4 px-6 py-2 text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg hover:scale-105 transform transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
