import React, { useState } from 'react';
import { Button, Upload, message, Modal, Table } from 'antd';
import {SaveOutlined, UploadOutlined} from '@ant-design/icons';
import { importExcelFile } from "../Services/ExcelImport.js";

const ExcelImporter = ({ onDataParsed, onSubmit }) => {
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [importedData, setImportedData] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    // Utility function to convert string to snake_case
    const toSnakeCase = (str) =>
        str
            .replace(/\s+/g, '_')        // Replace spaces with underscores
            .replace(/[A-Z]/g, (m) => `${m.toLowerCase()}`) // Optional: handle camelCase
            .toLowerCase();

    // Function to transform object keys to snake_case
    const transformKeysToSnakeCase = (arr) => {
        return arr.map((obj) => {
            const newObj = {};
            for (let key in obj) {
                newObj[toSnakeCase(key)] = obj[key];
            }
            return newObj;
        });
    };

    // beforeUpload handler to validate and process the file
    const beforeUpload = async (file) => {
        const isExcel =
            file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            file.type === 'application/vnd.ms-excel';

        if (!isExcel) {
            message.error('Only Excel files are allowed!');
            return Upload.LIST_IGNORE;
        }

        setLoading(true);

        try {
            const jsonData = await importExcelFile(file);
            const snakeCaseData = transformKeysToSnakeCase(jsonData);
            setImportedData(snakeCaseData);
            setModalVisible(true);
            onDataParsed(snakeCaseData);
            setLoading(false);
        } catch (error) {
            message.error('Failed to read file');
            setLoading(false);
        }

        return false; // prevent upload
    };

    // Columns for the table
    const columns = importedData.length > 0 ? Object.keys(importedData[0]).map((key) => ({
        title: key.charAt(0).toUpperCase() + key.slice(1),
        dataIndex: key,
        key: key,
    })) : [];

    // Function to handle submitting the data to the backend API
    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            // Trigger the parent submit function
            if (onSubmit) {
                await onSubmit(importedData); // Pass data to the parent component
                setModalVisible(false);
                setImportedData([]);
            }
        } catch (error) {
            message.error('Failed to submit data');
        } finally {
            setSubmitting(false);
        }
    };

    // Function to handle cancelling the modal
    const handleCancel = () => {
        setModalVisible(false);
    };

    return (
        <>
            <Upload beforeUpload={beforeUpload} showUploadList={false}>
                <Button icon={<UploadOutlined />} loading={loading}>Import Excel</Button>
            </Upload>

            <Modal
                centered
                maskClosable={false}
                title="Imported Data"
                open={modalVisible}
                keyboard={false}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" variant="outlined" color="red" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        color="default"
                        variant="solid"
                        icon={<SaveOutlined/>}
                        loading={submitting}
                        onClick={handleSubmit}
                    >
                        Save
                    </Button>
                ]}
                width={1000}
            >
                <Table
                    dataSource={importedData}
                    columns={columns}
                    rowKey={(record, index) => index}
                    pagination={10}
                />
            </Modal>
        </>
    );
};

export default ExcelImporter;
