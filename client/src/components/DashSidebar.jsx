import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { CgProfile } from "react-icons/cg";
import { FaSignOutAlt, FaUsers } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { signOutSuccess,signOutFailure } from "../redux/user/userSlice";
import { useSelector } from "react-redux";

export default function DashSidebar() {
  const dispatch=useDispatch();
  const {currentUser}=useSelector((state)=>state.user);
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get("tab");
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);
  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(signOutFailure(data.message));
      } else {
        dispatch(signOutSuccess(data));
      }
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };
  return (
    <Sidebar className="w-full md:w-56">
      <SidebarItems>
        <SidebarItemGroup>
          <Link to={"/dashboard?tab=profile"}>
            <SidebarItem
              active={tab === "profile"}
              label={currentUser.isAdmin ? 'Admin':"user"}
              labelColor="dark"
              icon={CgProfile}
              as='div'
            >
              Profile
            </SidebarItem>
          </Link>
          {currentUser.isAdmin && (
             <Link to={"/dashboard?tab=posts"}>
             <SidebarItem
               active={tab === "posts"}
               icon={HiDocumentText}
               as='div'
             >
               Posts
             </SidebarItem>
           </Link>
          )}
          {currentUser.isAdmin && (
             <Link to={"/dashboard?tab=users"}>
             <SidebarItem
               active={tab === "users"}
               icon={FaUsers}
               as='div'
             >
               Users
             </SidebarItem>
           </Link>
          )}
          <SidebarItem onClick={handleSignout} icon={FaSignOutAlt} >Sign Out</SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
