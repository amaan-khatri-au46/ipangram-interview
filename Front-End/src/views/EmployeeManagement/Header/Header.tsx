import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Popover } from "@mui/material";
import { TbLogout } from "react-icons/tb";
import {
  getUserDetails,
  removeToken,
} from "../../../utils/commonFunction/common";
import useUserRoleRoutes from "../../../utils/hooks/routes";
import { useAppDispatch } from "../../../store/store";
import { setRole } from "../../../store/slices/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<any>(null);

  const userRoleRoutes = useUserRoleRoutes();

  useEffect(() => {
    const roles = getUserDetails().payload.role;
    dispatch(setRole(roles));
  }, [dispatch]);

  return (
    <header className="shadow-sm text-white py-2 px-36">
      <div className="text-black w-full font-bold flex justify-between items-center">
        <div className="w-20">
          <img src="/img/logo/logo.png" alt="" />
        </div>
        <div className="cursor-pointer font-semibold text-sm flex items-center gap-8">
          {userRoleRoutes.map((page: any) => (
            <div
              key={page.title}
              onClick={() => navigate(page.route)}
              className={`cursor-pointer ${
                location.pathname === page.route ? "font-bold" : "font-normal"
              } ${location.pathname === page.route ? "active-link" : ""}`}
            >
              <p>{page.title}</p>
              {location.pathname === page.route && (
                <div
                  style={{
                    height: "2px",
                    background: "#18484F",
                    color: "#18484F",
                  }}
                ></div>
              )}
            </div>
          ))}
        </div>{" "}
        <div className="flex items-center gap-4 px-2">
          <Avatar
            className="w-10 h-10 cursor-pointer"
            src="/img/avatars/thumb.jpg"
            onClick={(event: any) => {
              setAnchorEl(event.currentTarget);
            }}
          />
          <div className="flexflex-col">
            <div>
              <p className="text-gray-500">
                {getUserDetails()?.payload?.username}
              </p>
            </div>
          </div>
        </div>
        <Popover
          id={anchorEl ? "simple-popover" : undefined}
          open={anchorEl}
          anchorEl={anchorEl}
          onClose={() => {
            setAnchorEl(null);
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div className="flex items-center gap-6 px-4">
            <Avatar alt="Remy Sharp" src="/img/avatars/thumb.jpg" />
            <div className="flex flex-col">
              <div>
                <p>{getUserDetails()?.payload?.username}</p>
              </div>
              <div className="font-light">
                <p>{getUserDetails()?.payload?.email}</p>
              </div>
            </div>
          </div>
          <div
            style={{ height: "0.5px" }}
            className="bg-gray-400 mt-4 w-full"
          ></div>
          <Button
            className="mr-2 border-none  w-full mb-2"
            startIcon={<TbLogout className="text-gray-400" />}
            onClick={() => {
              removeToken();
              navigate("/login");
            }}
          >
            <span className="ml-4 text-md text-gray-400">Sign Out</span>
          </Button>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
