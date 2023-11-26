import { NavLink } from "react-router-dom";

import Button from "./button";

import { MdDynamicFeed } from "react-icons/md";
import { FaPlus, FaUser } from "react-icons/fa";

import "./nav.scss";

export default function Nav() {
  return (
    <nav className="nav_link_wrapper">
      <div className="nav_link">
        <NavLink to="/">
          <Button icon={<MdDynamicFeed />} text="Feed" />
        </NavLink>
      </div>
      <div className="nav_link">
        <NavLink to="/post/new">
          <Button icon={<FaPlus />} text="New" />
        </NavLink>
      </div>
      <div className="nav_link">
        <NavLink to="/user">
          <Button icon={<FaUser />} text="User" />
        </NavLink>
      </div>
    </nav>
  );
}
