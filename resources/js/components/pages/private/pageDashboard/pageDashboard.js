import { Card, Col, Form, Input, Row, Table } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../axios";
import { LoadingOutlined } from "@ant-design/icons";

const PageDashboard = () => {
    const [triggerUpdate, setTriggerUpdate] = useState(false);
    let timer = null;
    const handleUpdate = e => {
        clearTimeout(timer);
        setInputToUpdate(e.target);
        timer = setTimeout(() => {
            setTriggerUpdate(true);
        }, 1500);
    };
    useEffect(() => {
        if (triggerUpdate) {
            update();
        }
        return () => {};
    }, [triggerUpdate]);
    function update() {
        let data = {
            cell: $(inputToUpdate).attr("cell"),
            value: inputToUpdate.value
        };
        fetchData("POST", "api/webexcel", data).then(res => {
            if (res.success) {
                getInputsAndResultsByRange(
                    "Joshua testing!E13:E15",
                    "Joshua testing!S9:S11"
                );
                setTriggerUpdate(false);
            }
        });
    }
    useEffect(() => {
        getInputsAndResultsByRange(
            "Joshua testing!E13:E15",
            "Joshua testing!S9:S11"
        );
        return () => {};
    }, []);
    const [cellValues, setCellValues] = useState();
    const [resultsLoading, setResultsLoading] = useState(false);
    const getInputsAndResultsByRange = (inputs, results) => {
        let data = {
            action: "getInputsAndResultsByRange",
            inputs: inputs,
            results: results
        };
        setResultsLoading(true);
        fetchData("POST", "api/webexcel", data).then(res => {
            setCellValues(res.data);
            setResultsLoading(false);
        });
    };

    useEffect(() => {
        console.log(cellValues);
        return () => {};
    }, [cellValues]);

    const [inputToUpdate, setInputToUpdate] = useState();
    return (
        <>
            <Row>
                <Col xs={24} md={12}>
                    <Title>
                        Inputs {resultsLoading && <LoadingOutlined spin />}
                    </Title>
                    <h4>Stalk - Bale</h4>
                    <Input
                        type="number"
                        cell="E13"
                        placeholder={
                            cellValues
                                ? `Current Value ${cellValues.inputs[0][0]}`
                                : "Stalk - Bale"
                        }
                        onChange={e => handleUpdate(e)}
                    />{" "}
                    <h4>Long Fiber - 1st mill</h4>
                    <Input
                        type="number"
                        cell="E14"
                        placeholder={
                            cellValues
                                ? `Current Value ${cellValues.inputs[1][0]}`
                                : "Long Fiber - 1st mill"
                        }
                        onChange={e => handleUpdate(e)}
                    />{" "}
                    <h4>Hurd - 1st mill</h4>
                    <Input
                        type="number"
                        cell="E15"
                        placeholder={
                            cellValues
                                ? `Current Value ${cellValues.inputs[2][0]}`
                                : "Hurd - 1st mill"
                        }
                        onChange={e => handleUpdate(e)}
                    />{" "}
                </Col>
                <Col xs={24} md={12}>
                    <Title>
                        Results {resultsLoading && <LoadingOutlined spin />}
                    </Title>
                    {cellValues && (
                        <>
                            <h3>Costs & Returns Breakout - Fiber & Hurd </h3>
                            <p>
                                Margin - Fiber & Hurd- (E33) Year Depreciation:{" "}
                                {cellValues.results[2][0]} <br />
                                Margin - Fiber & Hurd - 1 Year Depreciation
                                Break Even: {cellValues.results[1][0]} <br />
                                Ratio - Fiber & Hurd: {
                                    cellValues.results[0][0]
                                }{" "}
                                <br />
                            </p>
                        </>
                    )}
                </Col>
            </Row>
        </>
    );
};

export default PageDashboard;
