import Button from "./button";

import { NavLink, useLocation } from "react-router-dom";

import { MdDynamicFeed } from "react-icons/md";
import { FaPlus, FaUser } from "react-icons/fa";

import "./nav.scss";

export default function Nav() {
  const location = useLocation();

  return (
    <nav className="nav_link_wrapper">
      <div className="nav_link">
        <NavLink to="/">
          <Button
            icon={<MdDynamicFeed />}
            text="Feed"
            className={location.pathname === "/" ? "nav_active" : ""}
          />
        </NavLink>
      </div>
      <div className="nav_link">
        <NavLink to="/post/new">
          <Button
            icon={<FaPlus />}
            text="New"
            className={location.pathname === "/post/new" ? "nav_active" : ""}
          />
        </NavLink>
      </div>
      <div className="nav_link">
        <NavLink to="/user">
          <Button
            icon={<FaUser />}
            text="User"
            className={location.pathname === "/user" ? "nav_active" : ""}
          />
        </NavLink>
      </div>
    </nav>
  );
}
