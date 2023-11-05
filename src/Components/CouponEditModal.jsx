import { Form, Input, Upload, Button, Switch } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';


export default function CouponEditModal({ hideModal, couponId }) {

    const [form] = Form.useForm();
    const [couponData, setCouponData] = useState({});

    useEffect(() => {
        // Fetch coupon details based on couponId using Axios
        axios.get(`/my-coupons/${couponId}/`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("share-coupon-access-token")}`,
            },
        })
            .then((response) => {
                setCouponData(response.data);
                form.setFieldsValue(response.data);
                console.log(couponData)
            })
            .catch((error) => {
                console.error('Error fetching coupon details:', error);
            });
    }, [couponId, form]);

    const onFinish = (values) => {
        values.status = values.status === false ? "Closed" : "Active"

        console.log('Updated values:', values);

        axios.patch(`/my-coupons/${couponId}/`, values, {
            headers: {
                Authorization: `Token ${localStorage.getItem("share-coupon-access-token")}`,
            },
        })
            .then((response) => {
                console.log('Coupon updated:', response.data);
                hideModal();
            })
            .catch((error) => {
                console.error('Error updating coupon:', error);
            });
    };

    return (
        <Form
          form={form}
          name="couponForm"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please enter the title!' }]
            }
          >
            <Input />
          </Form.Item>
    
          <Form.Item
            label="Description"
            name="description"
          >
            <Input.TextArea />
          </Form.Item>
    
          {/* <Form.Item
            label="Image"
            name="image"
          >
            <Upload name="logo" listType="picture">
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item> */}
    
          <Form.Item
            label="Category"
            name="category"
          >
            <Input />
          </Form.Item>
    
          <Form.Item
            label="Status"
            name="status"
            valuePropName="checked"
          >
            <Switch checkedChildren="Active" unCheckedChildren="Closed" />
          </Form.Item>
    
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      );
}
