import React from "react";
import { NavLink } from "react-router-dom";
import { Badge, Nav, NavItem, NavLink as RsNavLink } from "reactstrap";
import classNames from "classnames";
import nav from "./_nav";

import SidebarFooter from "./../SidebarFooter";
import SidebarForm from "./../SidebarForm";
import SidebarHeader from "./../SidebarHeader";
import SidebarMinimizer from "./../SidebarMinimizer";

const Sidebar: React.FC = props => {
  const handleClick = e => {
    e.preventDefault();
    e.target.parentElement.classList.toggle("open");
  };

  const activeRoute = (routeName, properties) => {
    return properties.location.pathname.indexOf(routeName) > -1
      ? "nav-item nav-dropdown open"
      : "nav-item nav-dropdown";
  };

  // badge addon to NavItem
  const badgeAddon = badgeItem => {
    if (badgeItem) {
      const classes = classNames(badgeItem.class);
      return (
        <Badge className={classes} color={badgeItem.variant}>
          {badgeItem.text}
        </Badge>
      );
    }

    return null;
  };

  // simple wrapper for nav-title item
  const wrapper = item => {
    return item.wrapper && item.wrapper.element
      ? React.createElement(
          item.wrapper.element,
          item.wrapper.attributes,
          item.name
        )
      : item.name;
  };

  // nav list section title
  const navTitle = (title, key) => {
    const classes = classNames("nav-title", title.class);
    return (
      <li key={key} className={classes}>
        {wrapper(title)}{" "}
      </li>
    );
  };

  // nav list divider
  const navListDivider = (divider, key) => {
    const classes = classNames("divider", divider.class);
    return <li key={key} className={classes} />;
  };

  // nav item with nav link
  const navItem = (item, key) => {
    const classes = {
      item: classNames(item.class),
      link: classNames(
        "nav-link",
        item.variant ? `nav-link-${item.variant}` : ""
      ),
      icon: classNames(item.icon)
    };
    return navLink(item, key, classes);
  };

  // nav link
  const navLink = (item, key, classes) => {
    const url = item.url ? item.url : "";
    return (
      <NavItem key={key} className={classes.item}>
        {isExternal(url) ? (
          <RsNavLink href={url} className={classes.link} active>
            <i className={classes.icon} />
            {item.name}
            {badgeAddon(item.badge)}
          </RsNavLink>
        ) : (
          <NavLink to={url} className={classes.link} activeClassName="active">
            <i className={classes.icon} />
            {item.name}
            {badgeAddon(item.badge)}
          </NavLink>
        )}
      </NavItem>
    );
  };

  // nav dropdown
  const navDropdown = (item, key) => {
    return (
      <li key={key} className={activeRoute(item.url, props)}>
        <a
          className="nav-link nav-dropdown-toggle"
          href="#"
          onClick={handleClick}
        >
          <i className={item.icon} />
          {item.name}
        </a>
        <ul className="nav-dropdown-items">{navList(item.children)}</ul>
      </li>
    );
  };

  // nav type
  const navType = (item, idx) =>
    item.title
      ? navTitle(item, idx)
      : item.divider
      ? navListDivider(item, idx)
      : item.children
      ? navDropdown(item, idx)
      : navItem(item, idx);

  // nav list
  const navList = items => {
    return items.map((item, index) => navType(item, index));
  };

  const isExternal = url => {
    const link = url ? url.substring(0, 4) : "";
    return link === "http";
  };

  // sidebar-nav root
  return (
    <div className="sidebar">
      <SidebarHeader />
      <SidebarForm />
      <nav className="sidebar-nav">
        <Nav>{navList(nav.items)}</Nav>
      </nav>
      <SidebarFooter />
      <SidebarMinimizer />
    </div>
  );
};

export default Sidebar;
