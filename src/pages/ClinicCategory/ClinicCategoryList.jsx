import React, { useState, useEffect } from 'react';
import { message, Button, Popconfirm, Space, Tag, Row, Col, Switch, Typography, Tooltip } from 'antd';
import api from '../../Services/NetworkManager.js';
import {
    DeleteOutlined,
    EditOutlined,
    FileAddFilled,
    FileExcelOutlined,
    MedicineBoxOutlined,
    PlusOutlined
} from '@ant-design/icons';
import CustomTable from '../../Components/CustomTable.jsx';
import CreateOrUpdateModal from "./CreateOrUpdateModal.jsx";
import {exportToExcel} from "../../Services/ExcelExport.js";

const { Title } = Typography;

const ClinicCategoryList = () => {
    const [tableData, setTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [dateRange, setDateRange] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);
    const [clearButtonEnable, setClearButtonEnable] = useState(false);
    const [dayFilter, setdayFilter] = useState(null)

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await api.get('/clinic-category/list');
            setTableData(res.data.data);
            setFilteredData(res.data.data);
        } catch (error) {
            message.error(error.response?.data?.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);





    const handleDataSubmit = async (values) => {
        setModalLoading(true);
        try {
            const payload = {
                ...values,
                available_days: values.available_days.join(',') // e.g., "mon,tue,fri"
            };

            if (selectedRecord) {
                await api.put(`/clinic-category/update/${selectedRecord.id}`, payload);
            } else {
                await api.post('/clinic-category/create', payload);
            }
            fetchData();
            setModalVisible(false);
        } catch (error) {
            message.error(error.response?.data?.message || 'Operation failed');
        } finally {
            setModalLoading(false);
        }
    };

    const toggleStatus = async (id) => {
        try {
            await api.get(`/clinic-category/update-status/${id}`);
            fetchData();
        } catch (error) {
            message.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleBulkDelete = async () => {
        try {
            await api.post(`/clinic-category/delete-all`, selectedRowKeys);
            fetchData();
            setSelectedRowKeys([]);
        } catch (error) {
            message.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const getSelectedRecord = async (id) => {
        try {
            const response = await api.get(`/clinic-category/get/${id}`);
            setSelectedRecord(response.data.data);
            setModalVisible(true);
        } catch (error) {
            message.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/clinic-category/delete/${id}`);
            fetchData();
        } catch (error) {
            message.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleSearch = () => {
        if (searchText.trim().length <= 1) {
            setFilteredData(tableData); // reset to all if empty
            return;
        }

        const filtered = tableData.filter((item) =>
            Object.values(item).some((field) =>
                String(field).toLowerCase().includes(searchText.toLowerCase())
            )
        );
        setFilteredData(filtered);
    };

    const handleFilter = async () => {
        try {
            const payload = {
                from_date : dateRange[0],
                to_date : dateRange[1],
                is_active : statusFilter,
                available_days : dayFilter
            }
            const response = await api.post(`/clinic-category/filter`, payload);
            setTableData(response.data.data);
            setFilteredData(response.data.data);
            setClearButtonEnable(true)
        } catch (error) {
            message.error(error.response?.data?.message || 'Operation failed');
        }

    }

    const clearFilter = () => {
        setDateRange([])
        setStatusFilter(null)
        fetchData();
        setClearButtonEnable(false)
    }


    const handleExport = () => {
        exportToExcel(columns, filteredData, 'Clinic Category');
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Available Days',
            dataIndex: 'available_days',
            render: (record) => {

                const days = Array.isArray(record) ? record : record.split(',');

                return (
                    <>
                        {days.map((day) => (
                            <Tag key={day} color='geekblue-inverse' >
                                {day}
                            </Tag>
                        ))}
                    </>
                );
            }
        },

        {
            title: 'Status',
            dataIndex: 'is_active',
            render: (isActive) => (
                <Tag color={isActive ? 'green' : 'volcano'}>
                    {isActive ? 'Active' : 'Inactive'}
                </Tag>
            ),
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
        },
        {
            title: 'Actions',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Status Update">
                        <Switch
                            checked={record.is_active}
                            onChange={() => toggleStatus(record.id)}
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Tooltip title="Delete Record">
                            <Button type="text" danger icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>
                    <Tooltip title="Edit Record">
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() => getSelectedRecord(record.id)}
                        />
                    </Tooltip>
                </Space>
            )
        }
    ];

    const filters = [
        {
            key: 'available_days',
            type: 'select',
            value: dayFilter,
            placeholder: 'Filter by Day',
            mode:'multiple',
            options: [
                { label: 'Mon', value: 'Mon' },
                { label: 'Tue', value: 'Tue' },
                { label: 'Wed', value: 'Wed' },
                { label: 'Thu', value: 'Thu' },
                { label: 'Fri', value: 'Fri' },
                { label: 'Sat', value: 'Sat' },
                { label: 'Sun', value: 'Sun' },
            ],
            setValue: setdayFilter,
        },
        {
            key: 'status',
            type: 'select',
            value: statusFilter,
            placeholder: 'Filter by Status',
            options: [
                { label: 'All', value: 'All' },
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' },
            ],
            setValue: setStatusFilter,
        },
        {
            key: 'date',
            type: 'dateRange',
            setValue: setDateRange,
        },
    ];

    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <Title level={3} style={{ color: "#495057" }}>
                            <MedicineBoxOutlined style={{ fontSize: 20, marginRight: 10 }} />
                            Clinic Categories
                        </Title>
                    </Col>
                    <Col>
                        <Button
                            color="default"
                            variant="solid"
                            icon={<PlusOutlined />}
                            onClick={() => {
                                setSelectedRecord(null);
                                setModalVisible(true);
                            }}
                        >
                            Create Clinic Category
                        </Button>
                        <Button
                            disabled={tableData.length === 0}
                            variant="outlined"
                            color="green"
                            icon={<FileExcelOutlined />}
                            onClick={handleExport}
                            style={{ marginLeft: '10px' }}
                        >
                            Export to Excel
                        </Button>
                    </Col>
                </Row>
            </div>

            <CustomTable
                columns={columns}
                data={filteredData}
                searchText={searchText}
                setSearchText={setSearchText}
                filters={filters}
                selectedRowKeys={selectedRowKeys}
                onRowSelectionChange={setSelectedRowKeys}
                onDelete={handleDelete}
                onBulkDelete={handleBulkDelete}
                loading={loading}
                dateRange={dateRange}
                setDateRange={setDateRange}
                handleSearch={handleSearch}
                handleFilter={handleFilter}
                clearFilter={clearFilter}
                clearButtonEnable={clearButtonEnable}
                setFilters={(key, value) => key === 'status' ? setStatusFilter(value) : setdayFilter(value)}
            />

            <CreateOrUpdateModal
                visible={modalVisible}
                onCancel={() => {
                    setSelectedRecord(null);
                    setModalVisible(false);
                }}
                onSubmit={handleDataSubmit}
                initialValues={selectedRecord}
                confirmLoading={modalLoading}
            />
        </>
    );
};

export default ClinicCategoryList;