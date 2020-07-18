import React, { useState, useEffect } from "react";
import {
    Modal,
    Form,
    Input,
    Upload,
    Row,
    Col,
    Anchor,
    Button,
    DatePicker,
    notification
} from "antd";
import {
    LoadingOutlined,
    PlusOutlined,
    PlayCircleOutlined,
    PlusCircleOutlined
} from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import moment from "moment";
import { fetchData } from "../../../../axios";
import { notificationErrors } from "../../../notificationErrors";

const ModalAddEditClient = ({
    showModalAddEditClient,
    toggleShowModalAddEditClient
}) => {
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [formSaveLoading, setFormSaveLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [clientInformation, setClientInformation] = useState({
        name: "",
        address: "",
        photo: undefined,
        contact_number: "",
        client_since: ""
    });
    let formAddEditClient;

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
    };

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener("load", () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    function beforeUpload(file) {
        const isJpgOrPng =
            file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("You can only upload JPG/PNG file!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("Image must smaller than 2MB!");
        }
        return isJpgOrPng && isLt2M;
    }

    const handleChange = info => {
        if (info.file.status === "uploading") {
            setLoadingUpload(true);
            return;
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                setImageUrl(imageUrl);
                setLoadingUpload(false);
                setClientInformation({
                    ...clientInformation,
                    photo: imageUrl
                });
            });
        }
    };

    const uploadButton = (
        <div>
            {loadingUpload ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const submitForm = e => {
        let data = e;
        data.client_since = data.client_since
            ? data.client_since.format("YYYY-MM-DD")
            : "";
        setFormSaveLoading(true);
        data["photo"] = clientInformation.photo;
        console.log(data);
        fetchData("POST", "api/client", data)
            .then(res => {
                console.log(res);
                if (res.success) {
                    notification.success({
                        message: "Client Saved Successfully"
                    });
                    setFormSaveLoading(false);
                }
            })
            .catch(err => {
                setFormSaveLoading(false);
                notificationErrors(err);
            });
    };

    return (
        <Modal
            title="Client Information"
            visible={showModalAddEditClient}
            onOk={e => formAddEditClient.submit()}
            onCancel={toggleShowModalAddEditClient}
            confirmLoading={formSaveLoading}
            width={"90%"}
            style={{ top: 20 }}
            okText="Save"
        >
            <Form
                {...layout}
                name="basic"
                onFinish={e => submitForm(e)}
                onFinishFailed={e => console.log(e)}
                ref={e => (formAddEditClient = e)}
                initialValues={clientInformation}
            >
                <Row>
                    <Col xs={24} md={4}>
                        <Text>Client Logo</Text>

                        <Upload
                            name="photo"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            customRequest={dummyRequest}
                            beforeUpload={beforeUpload}
                            onChange={e => handleChange(e)}
                        >
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt="avatar"
                                    style={{ width: "100%" }}
                                />
                            ) : (
                                uploadButton
                            )}
                        </Upload>
                    </Col>
                    <Col xs={24} md={8}>
                        <Text>Basic Information</Text>
                        <Form.Item
                            label="Client Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    min: 3,
                                    message: "Please input Client Name"
                                }
                            ]}
                            className="mb-15"
                        >
                            <Input name="name" />
                        </Form.Item>
                        <Form.Item
                            label="Address"
                            name="address"
                            className="mb-15"
                        >
                            <Input name="address" />
                        </Form.Item>
                        <Form.Item
                            label="Contact Number"
                            name="contact_number"
                            className="mb-15"
                        >
                            <Input name="contact_number" />
                        </Form.Item>
                        <Form.Item
                            label="Client Since"
                            name="client_since"
                            className="mb-15"
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                                format="YYYY-MM-DD"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <div>
                            <Text>
                                Other Information{" "}
                                <Button
                                    size="small"
                                    type="link"
                                    shape="circle"
                                    icon={<PlusCircleOutlined />}
                                />
                            </Text>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default ModalAddEditClient;
