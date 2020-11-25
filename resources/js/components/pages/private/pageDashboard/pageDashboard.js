import { Card, Form, Input, Table } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../axios";
import { LoadingOutlined } from "@ant-design/icons";

const PageDashboard = () => {
    const [excelResponse, setExcelResponse] = useState();
    const [updateLoading, setUpdateLoading] = useState(false);
    const [triggerUpdate, setTriggerUpdate] = useState(false);
    let inputE13;
    let timer = null;
    const handleUpdate = e => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            setTriggerUpdate(true);
        }, 1000);
    };
    useEffect(() => {
        if (triggerUpdate) {
            update();
        }
        return () => {};
    }, [triggerUpdate]);
    function update() {
        let data = {
            [inputE13.props.name]: inputE13.state.value
        };
        setUpdateLoading(true);
        fetchData("POST", "api/webexcel", data).then(res => {
            // console.log(res);
            if (res.success) {
                setExcelResponse(res.data);
                setUpdateLoading(false);
                setTriggerUpdate(false);
            }
        });
    }
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
                ref={e => (inputE13 = e)}
            />
        </Card>
    );
};

export default PageDashboard;
