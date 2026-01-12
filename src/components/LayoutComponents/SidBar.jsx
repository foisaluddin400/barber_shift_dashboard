import logo from "../../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaChevronRight, FaUserAstronaut, FaUserTie } from "react-icons/fa";
import { IoIosLogIn, IoMdCut } from "react-icons/io";
import { logout } from "../../page/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbUserCircle } from "react-icons/tb";
import {
  MdOutlineReport,
  MdOutlineSettings,
  MdOutlineWorkspacePremium,
} from "react-icons/md";
import { RiShieldUserLine } from "react-icons/ri";
import { BsSubstack } from "react-icons/bs";
import { HiSupport } from "react-icons/hi";

const items = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <LuLayoutDashboard />,
    link: "/",
  },
  {
    key: "barberOwner",
    label: "Barber owner",
    icon: <FaUserTie />,
    link: "/dashboard/barberOwner",
  },

  {
    key: "customer",
    label: "Customer",
    icon: <TbUserCircle />,
    link: "/dashboard/customer",
  },
  {
    key: "report",
    label: "User Report",
    icon: <MdOutlineReport />,
    link: "/dashboard/userReport",
  },
  {
    key: "premium",
    label: "Premium Subscribers",
    icon: <MdOutlineWorkspacePremium />,
    link: "/dashboard/premiumSubscribers",
  },
  {
    key: "admin",
    label: "Administrator",
    icon: <RiShieldUserLine />,
    link: "/dashboard/admin",
  },
  {
    key: "barber",
    label: "Barber",
    icon: <IoMdCut />,
    link: "/dashboard/barber",
  },
  {
    key: "adPromotion",
    label: "Ad Promotional",
    icon: <FaUserAstronaut />,
    link: "/dashboard/adPromotion",
  },

  {
    key: "subscription",
    label: "Subscription",
    icon: <BsSubstack />,
    link: "/dashboard/subscription",
  },
  {
    key: "support",
    label: "Support",
    icon: <HiSupport />,
    link: "/dashboard/support",
  },
  {
    key: "settings",
    label: "Settings",
    icon: <MdOutlineSettings />,
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

const SidBar = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [expandedKeys, setExpandedKeys] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const contentRef = useRef({});
  const dispatch = useDispatch();

  useEffect(() => {
    const currentPath = location.pathname;

    let activeParent = null;

    items.forEach((item) => {
      if (item.link === currentPath) {
        activeParent = item;
      } else if (
        item.children &&
        item.children.some((child) => child.link === currentPath)
      ) {
        activeParent = item;
      }
    });

    if (activeParent) {
      setSelectedKey(
        activeParent.children
          ? activeParent.children.find((child) => child.link === currentPath)
              ?.key || activeParent.key
          : activeParent.key
      );

      if (activeParent.children && !expandedKeys.includes(activeParent.key)) {
        setExpandedKeys([...expandedKeys, activeParent.key]);
      }
    }
  }, [location]);

  const onParentClick = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  // Logout Function
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="custom-sidebar  bg-[#AB684D]">
      <div className="custom-sidebar-logo flex justify-center">
        <div>
          <div className="flex justify-center">
            <img src={logo} alt="Logo" className="w-[40px]" />
          </div>
          <h1 className="text-white italic">Barber Time</h1>
        </div>
      </div>
      <div className="menu-items">
        {items.map((item) => {
          const isSettingsActive =
            item.key === "settings" &&
            item.children.some((child) => child.link === location.pathname);

          const isCreatorActive =
            item.key === "creatorManagement" &&
            item.children.some((child) => child.link === location.pathname);

          const isCategoriesActive =
            item.key === "categoriesManagement" &&
            item.children.some((child) => child.link === location.pathname);

          return (
            <div key={item.key}>
              <Link
                to={item.link}
                className={`menu-item my-4 mx-3 py-3 px-3 flex items-center cursor-pointer ${
                  selectedKey === item.key ||
                  isSettingsActive ||
                  isCreatorActive ||
                  isCategoriesActive
                    ? "bg-[#D17C51] text-[white] rounded-tr-md rounded-br-md"
                    : "bg-white text-[#AB684D] rounded-tr-md rounded-br-md hover:bg-gray-200"
                }`}
                onClick={(e) => {
                  if (item.children) {
                    e.preventDefault();
                    onParentClick(item.key);
                  } else {
                    setSelectedKey(item.key);
                  }
                }}
              >
                <h1 className="mr-3">{item.icon}</h1>
                <span className="block w-full ">{item.label}</span>
                {/* Show dropdown arrow if children exist */}
                {item.children && (
                  <FaChevronRight
                    className={`ml-auto transform transition-all duration-300 ${
                      expandedKeys.includes(item.key) ? "rotate-90" : ""
                    }`}
                  />
                )}
              </Link>

              {/* Show children menu if expanded */}
              {item.children && (
                <div
                  className={`children-menu bg-white -my-2 mx-3 transition-all duration-300 ${
                    expandedKeys.includes(item.key) ? "expanded" : ""
                  }`}
                  style={{
                    maxHeight: expandedKeys.includes(item.key)
                      ? `${contentRef.current[item.key]?.scrollHeight}px`
                      : "0",
                  }}
                  ref={(el) => (contentRef.current[item.key] = el)}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.key}
                      to={child.link}
                      className={`menu-item p-4 flex items-center cursor-pointer ${
                        selectedKey === child.key
                          ? "bg-[#D17C51] text-white"
                          : "hover:bg-gray-200"
                      }`}
                      onClick={() => {
                        setSelectedKey(child.key); // Set the selected key for children
                        setExpandedKeys([]); // Close all expanded items
                      }}
                    >
                      <span className="block w-full ">{child.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Logout Button */}
      <div className="  w-full p-4 px-3">
        <button
          onClick={handleLogout}
          className="w-full flex bg-[white] text-[#AB684D] text-start rounded-tr-md rounded-br-md  p-3"
        >
          <span className="text-2xl">
            <IoIosLogIn />
          </span>
          <span className="ml-3">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default SidBar;
