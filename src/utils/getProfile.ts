"use server";

import { cookies } from "next/headers";

const getProfile = async (): Promise<any | null> => {
  const token = (await cookies()).get("accessToken")?.value;
  const res = await fetch(`${process.env.BASE_URL}/users/profile`, {
    next: {
      tags: ["profile"],
    },
    // cache: "force-cache",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const { data } = await res?.json();
  // console.log(data)
  return data;
};

export default getProfile;
