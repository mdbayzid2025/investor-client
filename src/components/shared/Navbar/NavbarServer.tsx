import getProfile from "@/utils/getProfile";
import { Navbar } from "./Navbar";

export default async function NavServer() {  
  const profile = await getProfile();
  
  return <Navbar profile={profile}/>;
}
