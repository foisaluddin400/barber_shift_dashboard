import { LuBell } from "react-icons/lu";
import profilee from "../../../src/assets/header/profileLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useRef, useState } from "react";
import { Drawer, Radio, Space } from "antd";
import dashboard from "../../assets/routerImg/dashboard.png";
import categorie from "../../assets/routerImg/categorie.png";
import create from "../../assets/routerImg/create.png";
import settings from "../../assets/routerImg/settings.png";
import subscription from "../../assets/routerImg/subscription.png";
import user from "../../assets/routerImg/user.png";
import logo from "../../assets/header/logo.png";

import { FaChevronRight } from "react-icons/fa";

import { IoIosLogIn } from "react-icons/io";

const items = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: dashboard,
    link: "/",
  },
  {
    key: "userManagement",
    label: "User Management",
    icon: user,
    link: "/dashboard/UserManagement",
  },
  {
    key: "creatorManagement",
    label: "Creator Management",
    icon: create,
    link: "/dashboard/CreatorManagement",
  },
  {
    key: "categoriesManagement",
    label: "Categories Management",
    icon: categorie,
    link: "/dashboard/CategoriesManagement/Categories",
    children: [
      {
        key: "categoriesManagement",
        label: "Categories",
        link: "/dashboard/CategoriesManagement/Categories",
      },
      {
        key: "subcategory",
        label: "Subcategory",
        link: "/dashboard/CategoriesManagement/Subcategory",
      },
    ],
  },
  {
    key: "subscription",
    label: "Subscription",
    icon: subscription,
    link: "/dashboard/Subscription",
  },
  {
    key: "profile",
    label: "Settings",
    icon: settings,
    link: "/dashboard/Settings/profile",
    children: [
      {
        key: "profile",
        label: "Profile",
        link: "/dashboard/Settings/profile",
      },
      {
        key: "terms",
        label: "Terms & Condition",
        link: "/dashboard/Settings/Terms&Condition",
      },
      {
        key: "privacy",
        label: "Privacy Policy",
        link: "/dashboard/Settings/PrivacyPolicy",
      },
      {
        key: "faq",
        label: "FAQ",
        link: "/dashboard/Settings/FAQ",
      },
    ],
  },
];

const Header = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [expandedKeys, setExpandedKeys] = useState([]);
  const navigate = useNavigate();
 

  const contentRef = useRef({});
  

  const onParentClick = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const onClick = (key) => {
    setSelectedKey(key);
  };

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="bg-[#AB684D] text-white pt-5">
      <div className="flex justify-between">
        <div className="lg:hidden ">
          <div className="py-3 pl-4">
            <div onClick={showDrawer} className="text-3xl ">
              <FaBars />
            </div>
          </div>
        </div>
        <div></div>
        <div className="flex gap-8 p-1 px-6">
          <div className="relative">
            <Link to={"/dashboard/Settings/notification"}>
              <div className="w-[45px] h-[45px] flex items-center justify-center text-xl rounded-full bg-white text-black ">
                <span>
                  <LuBell />
                </span>
              </div>
            </Link>

            <Space>
              <Radio.Group value={placement} onChange={onChange}></Radio.Group>
            </Space>
            <Drawer
              placement={placement}
              closable={false}
              onClose={onClose}
              open={open}
              key={placement}
            >
              <div className="bg-black h-screen -m-6">
                <div className="custom-sidebar-logo flex justify-center ">
                  <img src={logo} alt="Logo" className="w-[160px]" />
                </div>

                <div className="menu-items">
                {items.map((item) => (
                    <div key={item.key}>
                      <Link
                        to={item.link}
                        className={`menu-item my-4 mx-5 py-3 px-3 flex items-center cursor-pointer ${
                          selectedKey === item.key
                            ? "bg-[#EDC4C5] rounded-md"
                            : "bg-white rounded-md hover:bg-gray-200"
                        }`}
                        onClick={(e) => {
                          if (item.children) {
                            e.preventDefault(); 
                            onParentClick(item.key); 
                          } else {
                            setSelectedKey(item.key);
                            onClose(); 
                          }
                        }}
                      >
                        <img
                          src={item.icon}
                          alt={item.label}
                          className="w-5 h-5 mr-3"
                        />
                        <span className="block w-full text-black">
                          {item.label}
                        </span>

                        
                        {item.children && (
                          <FaChevronRight
                            className={`ml-auto transform transition-all duration-300 ${
                              expandedKeys.includes(item.key) ? "rotate-90" : ""
                            }`}
                          />
                        )}
                      </Link>

                      {item.children && (
                        <div
                          className={`children-menu bg-white  -my-2 mx-5  text-black transition-all duration-300 ${
                            expandedKeys.includes(item.key) ? "expanded" : ""
                          }`}
                          style={{
                            maxHeight: expandedKeys.includes(item.key)
                              ? `${
                                  contentRef.current[item.key]?.scrollHeight
                                }px`
                              : "0",
                          }}
                          ref={(el) => (contentRef.current[item.key] = el)}
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.key}
                              to={child.link}
                              className={`menu-item p-4  flex items-center cursor-pointer ${
                                selectedKey === child.key
                                  ? "bg-[#EDC4C5]"
                                  : "hover:bg-gray-200"
                              }`}
                              onClick={() => {
                                setSelectedKey(child.key); 
                                setExpandedKeys([]); // Collapse all expanded items
                                onClose(); // Close the drawer navigation
                              }}
                            >
                              <span className="block w-full text-black">
                                {child.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

               
                <div className="custom-sidebar-footer absolute bottom-0 w-full p-4 ">
                  <button
                    onClick={handleLogout}
                    className="w-full flex bg-white text-start rounded-md text-black p-3"
                  >
                    <span className="text-2xl">
                      <IoIosLogIn />
                    </span>
                    <span className="ml-3">Log Out</span>
                  </button>
                </div>
              </div>
            </Drawer>

            <span className="absolute top-0 right-0 -mr-2  w-5 h-5 bg-white text-black text-xs flex items-center justify-center rounded-full">
              0
            </span>
          </div>

          <Link to={"/dashboard/Settings/profile"}>
            <div className="flex gap-3">
              <div>
                <img
                  className="w-[45px] h-[45px]"
                  src={profilee}
                  alt="profile"
                />
              </div>
              <div className="text-end">
                <h3>{ "Loading..."}</h3>
                <h4 className="text-sm">Admin</h4>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
