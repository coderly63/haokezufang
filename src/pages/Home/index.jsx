import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { TabBar } from "antd-mobile";

import Index from "../Index";
import List from "../List";
import News from "../News";
import Profile from "../Profile";
import "./index.css";
export default function Home(props) {
  const [selectedTab, setSelectedTab] = useState(props.location.pathname);
  useEffect(() => {
    setSelectedTab(props.location.pathname);
  }, [props.location.pathname]);
  const tabItems = [
    {
      title: "首页",
      key: "/home/index",
      icon: "icon-ind",
    },
    {
      title: "找房",
      key: "/home/list",
      icon: "icon-findHouse",
    },
    {
      title: "咨询",
      key: "/home/news",
      icon: "icon-infom",
    },
    {
      title: "我的",
      key: "/home/profile",
      icon: "icon-my",
    },
  ];
  return (
    <div className="home">
      <Switch>
        <Route path="/home/index" component={Index}></Route>
        <Route path="/home/list" component={List}></Route>
        <Route path="/home/news" component={News}></Route>
        <Route path="/home/profile" component={Profile}></Route>
        <Redirect to="/home/index" />
      </Switch>
      <div>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="green"
          barTintColor="white"
          noRenderContent
        >
          {tabItems.map((item) => (
            <TabBar.Item
              title={item.title}
              key={item.key}
              icon={<i className={`iconfont ${item.icon}`}></i>}
              selectedIcon={<i className={`iconfont ${item.icon}`}></i>}
              selected={selectedTab.indexOf(item.key) !== -1}
              onPress={() => {
                if (props.location.pathname.indexOf(item.key) === -1) {
                  setSelectedTab(item.key);
                  props.history.push(item.key);
                }
              }}
              data-seed="logId"
            ></TabBar.Item>
          ))}
        </TabBar>
      </div>
      <div></div>
    </div>
  );
}
