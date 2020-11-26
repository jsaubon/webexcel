import { Card, Form, Input, Table } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../axios";
import { LoadingOutlined } from "@ant-design/icons";

const PageDashboard = () => {
    const [excelResponse, setExcelResponse] = useState({
        S11: "",
        S10: "",
        S9: ""
    });
    const [updateLoading, setUpdateLoading] = useState({
        S11: false,
        S10: false,
        S9: false
    });
    const [triggerUpdate, setTriggerUpdate] = useState(false);
    let timer = null;
    const handleUpdate = e => {
        clearTimeout(timer);
        setInputToUpdate(e.target);
        timer = setTimeout(() => {
            setTriggerUpdate(true);
        }, 2000);
    };
    useEffect(() => {
        if (triggerUpdate) {
            update();
        }
        return () => {};
    }, [triggerUpdate]);
    function update() {
        console.log($(inputToUpdate.value));
        let data = {
            cell: $(inputToUpdate).attr("cell"),
            result_cell: $(inputToUpdate).attr("resultCell"),
            value: inputToUpdate.value
        };
        console.log(data);
        setUpdateLoading({ ...updateLoading, [data.result_cell]: true });
        fetchData("POST", "api/webexcel", data).then(res => {
            console.log(res);
            if (res.success) {
                setExcelResponse({
                    ...excelResponse,
                    [data.result_cell]: res.data[0]
                });
                // setUpdateLoading(false);
                setUpdateLoading({
                    ...updateLoading,
                    [data.result_cell]: false
                });
                setTriggerUpdate(false);
            }
        });
    }

    const [inputToUpdate, setInputToUpdate] = useState();
    return (
        <>
            <Card>
                <Title title={3}>Costs & Returns Breakout - Fiber & Hurd</Title>
                <Title title={3}>Stalk - Bale</Title>
                <Input
                    placeholder="Stalk - Bale"
                    type="number"
                    cell="E13"
                    resultCell="S11"
                    onChange={e => handleUpdate(e)}
                />{" "}
                <br />
                <br />
                <Title level={4}>
                    Break Even Ratio in Tons- Fiber & Hurd:{" "}
                    {updateLoading.S11 ? (
                        <LoadingOutlined spin />
                    ) : (
                        excelResponse.S11
                    )}
                </Title>
            </Card>
            <Card>
                <Title title={3}>Long Fiber - 1st mill</Title>
                <Input
                    placeholder="Long Fiber - 1st mill"
                    type="number"
                    cell="E14"
                    resultCell="S9"
                    onChange={e => handleUpdate(e)}
                />{" "}
                <br />
                <br />
                <Title level={4}>
                    Margin - Fiber & Hurd - 1 Year Depreciation:
                    {updateLoading.S9 ? (
                        <LoadingOutlined spin />
                    ) : (
                        excelResponse.S9
                    )}
                </Title>
            </Card>

            <Card>
                <Title title={3}>Hurd - 1st mill</Title>
                <Input
                    placeholder="Hurd - 1st mill"
                    type="number"
                    cell="E15"
                    resultCell="S10"
                    onChange={e => handleUpdate(e)}
                />{" "}
                <br />
                <br />
                <Title level={4}>
                    Margin - Fiber & Hurd - 1 Year Depreciation:
                    {updateLoading.S10 ? (
                        <LoadingOutlined spin />
                    ) : (
                        excelResponse.S10
                    )}
                </Title>
            </Card>
        </>
    );
};

export default PageDashboard;
