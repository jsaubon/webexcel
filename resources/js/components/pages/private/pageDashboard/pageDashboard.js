import { Card, Form, Input, Table } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useState } from "react";
import { fetchData } from "../../../../axios";
import { LoadingOutlined } from "@ant-design/icons";

const PageDashboard = () => {
    const [excelResponse, setExcelResponse] = useState();
    const [updateLoading, setUpdateLoading] = useState(false);
    const handleUpdate = e => {
        let data = {
            [e.target.name]: e.target.value
        };
        setUpdateLoading(true);
        fetchData("POST", "api/webexcel", data).then(res => {
            // console.log(res);
            if (res.success) {
                setExcelResponse(res.data);
                setUpdateLoading(false);
            }
        });
    };
    return (
        <Card>
            <Title title={3}>Costs & Returns Breakout - Fiber & Hurd</Title>
            <Title level={4}>
                Break Even Ratio in Tons- Fiber & Hurd:{" "}
                {updateLoading ? (
                    <LoadingOutlined spin />
                ) : (
                    excelResponse && excelResponse[0]
                )}
            </Title>

            <Title title={3}>Update</Title>
            <Input
                placeholder="Stalk - Bale"
                type="number"
                name="e13"
                onChange={e => handleUpdate(e)}
            />
        </Card>
    );
};

export default PageDashboard;
