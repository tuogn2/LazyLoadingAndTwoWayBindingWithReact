import React from 'react';
import { Modal, Input, Form } from 'antd'; 

const AddDataModal = ({ visible, onCancel, onAdd, form }) => {

  const handleAdd = () => {
    form.validateFields((errors, values) => {
      if (!errors) {
        onAdd(values); 
        form.resetFields(); 
      } else {
        console.log('Validate Failed:', errors);
      }
    });
  };

  return (
    <Modal
      title="Add New Data"
      visible={visible}
      onOk={handleAdd}
      onCancel={onCancel}
      okText="Add"
      cancelText="Cancel"
    >
      <Form
        form={form}
        layout="vertical"
        name="addDataForm"
        initialValues={{ name: '', gender: '', hometown: '' }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          {form.getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your name!' }],
            initialValue: '',
          })(<Input placeholder="Enter your name" />)}
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: 'Please input gender!' }]}
        >
          {form.getFieldDecorator('gender', {
            rules: [{ required: true, message: 'Please input gender!' }],
            initialValue: '',
          })(<Input placeholder="Enter gender" />)}
        </Form.Item>

        <Form.Item
          name="hometown"
          label="Hometown"
          rules={[{ required: true, message: 'Please input your hometown!' }]}
        >
          {form.getFieldDecorator('hometown', {
            rules: [{ required: true, message: 'Please input your hometown!' }],
            initialValue: '',
          })(<Input placeholder="Enter hometown" />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create()(AddDataModal);
