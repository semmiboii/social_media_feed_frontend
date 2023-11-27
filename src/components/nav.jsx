import { NavLink } from "react-router-dom";

import Button from "./button";

import { MdDynamicFeed } from "react-icons/md";
import { FaPlus, FaUser } from "react-icons/fa";

import "./nav.scss";
import { useState } from "react";

export default function Nav() {
  const [homeIsActive, setHomeIsActive] = useState(false);
  const [newPostIsActive, setNewPostIsActive] = useState(false);
  const [userIsActive, setUserIsActive] = useState(false);

  return (
    <nav className="nav_link_wrapper">
      <div className="nav_link">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? setHomeIsActive(true) : setHomeIsActive(false)
          }
        >
          <Button
            icon={<MdDynamicFeed />}
            text="Feed"
            className={homeIsActive && "nav_active"}
          />
        </NavLink>
      </div>
      <div className="nav_link">
        <NavLink
          to="/post/new"
          className={({ isActive }) =>
            isActive ? setNewPostIsActive(true) : setNewPostIsActive(false)
          }
        >
          <Button
            icon={<FaPlus />}
            text="New"
            className={newPostIsActive && "nav_active"}
          />
        </NavLink>
      </div>
      <div className="nav_link">
        <NavLink
          to="/user"
          className={({ isActive }) =>
            isActive ? setUserIsActive(true) : setUserIsActive(false)
          }
        >
          <Button
            icon={<FaUser />}
            text="User"
            className={userIsActive && "nav_active"}
          />
        </NavLink>
      </div>
    </nav>
  );
}
