import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles
} from "@material-ui/core";
import React from "react";
import { Route, Link } from "react-router-dom";

import Main from "./Main";
import Products from "./Products";
import Orders from "./Orders";
import UsersList from "./Users/list";
import Reviews from "./Reviews";
import Questions from "./Questions";
import UserDetail from "./Users/detail";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: 100,
    flexShrink: 0
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  link: {
    textDecoration: "none",
    color: "#000"
  }
}));

interface Menu {
  path: string;
  name: string;
  exact?: boolean;
  component: (props: any) => JSX.Element;
  show_sidebar: boolean;
}

const MENUES: Menu[] = [
  { path: "/", name: "홈", exact: true, component: Main, show_sidebar: true },
  {
    path: "/products",
    name: "상품관리",
    component: Products,
    show_sidebar: true
  },
  { path: "/orders", name: "주문관리", component: Orders, show_sidebar: true },
  {
    path: "/users",
    name: "사용자관리",
    exact: true,
    component: UsersList,
    show_sidebar: true
  },
  {
    path: "/users/:id",
    name: "사용자상세",
    component: UserDetail,
    show_sidebar: false
  },
  {
    path: "/reviews",
    name: "후기관리",
    component: Reviews,
    show_sidebar: true
  },
  {
    path: "/questions",
    name: "문의관리",
    component: Questions,
    show_sidebar: true
  }
];

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Drawer variant="permanent" className={classes.drawer}>
        <List>
          {MENUES.filter(menu => menu.show_sidebar).map((menu, i) => {
            return (
              <ListItem key={i}>
                <ListItemText>
                  <Link className={classes.link} to={menu.path}>
                    {menu.name}
                  </Link>
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <main className={classes.content}>
        {MENUES.map((menu, i) => {
          return (
            <Route
              key={i}
              exact={menu.exact}
              path={menu.path}
              component={menu.component}
            />
          );
        })}
      </main>
    </div>
  );
};

export default Home;
