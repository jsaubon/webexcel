import React, { useEffect, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout, Breadcrumb } from "antd";
import LayoutHeader from "./layoutHeader";
import LayoutFooter from "./layoutFooter";
import PageUsers from "../pages/private/pageUsers/pageUsers";
import PageDashboard from "../pages/private/pageDashboard/pageDashboard";

const LayoutContent = () => {
    const { Content } = Layout;

    return (
        <Layout className="layout">
            <LayoutHeader />
            <Content
                className="site-layout"
                style={{ padding: "0 50px", marginTop: 64 }}
            >
                <div
                    className="site-layout-background"
                    style={{ padding: 24, minHeight: 380 }}
                >
                    <Switch>
                        <Route
                            exact
                            path="/dashboard"
                            component={PageDashboard}
                        />
                        <Route exact path="/users" component={PageUsers} />
                        <Route path="/" exact>
                            <Redirect to="/dashboard" />
                        </Route>
                    </Switch>
                </div>
            </Content>
            <LayoutFooter />
        </Layout>
    );
};

export default LayoutContent;
