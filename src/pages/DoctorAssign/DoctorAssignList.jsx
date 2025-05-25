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
import CrudService from "../../Services/CrudService.js";
import {globalSearch} from "../../Utils/Search.js";

const { Title } = Typography;
const crudService = CrudService('doctor-assign');

const DoctorAssignList = () => {
    const [tableData, setTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);
    const [clearButtonEnable, setClearButtonEnable] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [treartments, setTreatments] = useState([]);
    const [clinics,setClinics] = useState([]);


    const [filterValues, setFilterValues] = useState({
        status: "All",
        date:[],
        // add more in future as needed
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await crudService.fetchAll();
            setTableData(res.data.data);
            setFilteredData(res.data.data);
        } catch (error) {
            message.error(error.response?.data?.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    const fetchDoctors = async () => {
        try{
            const res = await api.get('/user/doctors-list');
            setDoctors(res.data.data);
        }catch(error){
            message.error(error.response?.data?.message || 'Operation failed');
        }
    };
    const fetchTreatments = async () => {
        try{
            const res = await api.get('/treatment/list');
            setTreatments(res.data.data);
        }catch(error){
            message.error(error.response?.data?.message || 'Operation failed');
        }
    }

    const fetchClinics = async () => {
        try{
            const res = await api.get('/clinic-category/list');
            setClinics(res.data.data);
        }catch(error){
            message.error(error.response?.data?.message || 'Operation failed');
        }
    }

    useEffect(() => {
        fetchData();
        fetchDoctors()
        fetchTreatments()
        fetchClinics()
    }, []);


    const handleDataSubmit = async (values) => {
        setModalLoading(true);
        try {
            if (selectedRecord) {
                await crudService.update(selectedRecord.id,values)
            } else {
                await crudService.create(values)
            }
            await fetchData();
            setModalVisible(false);
        } catch (error) {
            message.error(error.response?.data?.message || 'Operation failed');
        } finally {
            setModalLoading(false);
        }
    };

    const toggleStatus = async (id) => {
        try {
            await crudService.updateStatus(id)
            await fetchData();
        } catch (error) {
            message.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleBulkDelete = async () => {
        try {
            await crudService.deleteAll(selectedRowKeys)
            await fetchData();
            setSelectedRowKeys([]);
        } catch (error) {
            message.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const getSelectedRecord = async (id) => {
        try {
            const response = await crudService.getOne(id)
            setSelectedRecord(response.data.data);
            setModalVisible(true);
        } catch (error) {
            message.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        try {
            await crudService.delete(id)
            await fetchData();
        } catch (error) {
            message.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleSearch = () => {
        const result = globalSearch(tableData, searchText); // Use global search function
        setFilteredData(result);
    };

    const handleFilter = async () => {
        try {
            const payload = {
                from_date : dateRange[0],
                to_date : dateRange[1],
                is_active : statusFilter
            }
            const response = await crudService.filter(payload);
            setTableData(response.data.data);
            setFilteredData(response.data.data);
            setClearButtonEnable(true)
        } catch (error) {
            message.error(error.response?.data?.message || 'Operation failed');
        }

    }
    const clearFilter = () => {
        setFilterValues({
            status: 'All',
            date: [],
        });
        fetchData();
        setClearButtonEnable(false);
    };

    const handleExport = () => {
        exportToExcel(columns, filteredData, 'Disease Codes');
    };



    const columns = [
        {
            title: "Doctor's Name",
            dataIndex: 'name',
        },
        {
            title: 'Assign Unit',
            dataIndex: 'assign_unit',
        },
        {
            title: 'Clinic Categories',
            dataIndex: 'clinic_categories',
            render: (categories) => (
                <Space wrap>
                    {categories?.map(category => (
                        <Tag key={category.id} color="geekblue-inverse">
                            {category.name}
                        </Tag>
                    ))}
                </Space>
            ),
        },
        {
            title: 'Treatments',
            dataIndex: 'treatments',
            render: (treatments) => (
                <Space wrap>
                    {treatments?.map(treatment => (
                        <Tag key={treatment.id} color="geekblue-inverse">
                            {treatment.name}
                        </Tag>
                    ))}
                </Space>
            ),
        },
        {
            title: 'Schedule',
            dataIndex: 'days_and_shift',
            render: (days) => (
                <div style={{ maxWidth: 300 }}>
                    {days?.map((day, index) => (
                        <div key={index} style={{ marginBottom: 4 }}>
                            <Tag color="blue">{day.day}</Tag>
                            <span style={{ marginLeft: 8 }}>{day.shift}</span>
                        </div>
                    ))}
                </div>
            ),
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
            key: 'status',
            type: 'select',
            value: filterValues.status,
            placeholder: 'Filter by Status',
            options: [
                { label: 'All', value: 'All' },
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' },
            ],
            setValue: filterValues.status,
        },
        {
            key: 'date',
            type: 'dateRange',
            setValue: filterValues.date,
            value: filterValues.date,
        },
    ];

    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <Title level={3} style={{ color: "#495057" }}>
                            <FileAddFilled style={{ fontSize: 20, marginRight: 10 }} />
                            Assign Doctors to Clinics
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
                            Assign Clinic
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
                handleSearch={handleSearch}
                handleFilter={handleFilter}
                clearFilter={clearFilter}
                clearButtonEnable={clearButtonEnable}
                setFilters={(key, value) => {
                    setFilterValues(prev => ({
                        ...prev,
                        [key]: value
                    }));
                }}
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
                doctors={doctors}
                treatments={treartments}
                clinics={clinics}
            />
        </>
    );
};

export default DoctorAssignList;