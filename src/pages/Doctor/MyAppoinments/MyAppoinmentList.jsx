import { useState, useEffect } from 'react';
import { message, Button, Popconfirm, Space, Tag, Row, Col, Switch, Typography, Tooltip } from 'antd';

import {
    DeleteOutlined,
    EyeFilled,
    FileExcelOutlined,
    PlusOutlined,
} from '@ant-design/icons';


import {useNavigate} from "react-router-dom";
import {FaHospitalUser} from "react-icons/fa";
import CrudService from "../../../Services/CrudService.js";
import {globalSearch} from "../../../Utils/Search.js";
import {exportToExcel} from "../../../Services/ExcelExport.js";
import CustomTable from "../../../Components/CustomTable.jsx";
import api from "../../../Services/NetworkManager.js";



const { Title } = Typography;
const crudService = CrudService('patient-visit');

const MyAppoinmentList = () => {
    const navigate = useNavigate()
    const [tableData, setTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [clearButtonEnable, setClearButtonEnable] = useState(false);

    const [filterValues, setFilterValues] = useState({
        status: "All",
        date:[],
        patient_type:[]
        // add more in future as needed
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await api.get('patient-visit/get-patient-visits-for-doctor');
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


    const toggleStatus = async (id) => {
        try {
            await crudService.updateStatus(id);
            await fetchData();
        } catch (error) {
            message.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleBulkDelete = async () => {
        try {
            await crudService.deleteAll(selectedRowKeys);
            await fetchData();
            setSelectedRowKeys([]);
        } catch (error) {
            message.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const getSelectedRecord = async (id) => {
        try {
            const response = await crudService.getOne(id);
            setSelectedRecord(response.data.data);
            setModalVisible(true);
        } catch (error) {
            message.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        try {
            await crudService.delete(id);
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
                from_date : filterValues.date[0],
                to_date : filterValues.date[1],
                is_active : filterValues.status,
                category_ids : filterValues.drug_category
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
            drug_category: []
        });
        fetchData();
        setClearButtonEnable(false);
    };


    const navigateToVisitPage = (patientRegNo) => {
        navigate(`/patient-visit/${patientRegNo}`)
    }


    const handleExport = () => {
        const flatData = filteredData.map(item => ({
            name: item.name,
            unit_price: item.unit_price,
            drug_category: item.drug_category?.name || '',
            brand: item.brand,
            description: item.description || '',
            is_active: item.is_active ? 'Active' : 'Inactive',
            created_at: item.created_at,
        }));

        const exportColumns = [
            { title: 'Drug Name', dataIndex: 'name' },
            { title: 'Unit Price', dataIndex: 'unit_price' },
            { title: 'Drug Category', dataIndex: 'drug_category' },
            { title: 'Brand', dataIndex: 'brand' },
            { title: 'Description', dataIndex: 'description' },
            { title: 'Status', dataIndex: 'is_active' },
            { title: 'Created At', dataIndex: 'created_at' }
        ];

        exportToExcel(exportColumns, flatData, 'Drugs');
    };

    const viewAppointment = (visitId) => {
        console.log(visitId)
        navigate(`/view-appointment/${visitId}`)
    }

    const columns = [
        {
            title: "Registration No",
            dataIndex: "patient_reg_no",
            render: (record) => (
                <strong>{record}</strong>
            )
        },
        {
            title: 'Chit No',
            dataIndex: 'chit_number',
            render: (record) => (
                <strong>{record}</strong>
            )
        },
        {
            title: "Patient Name",
            dataIndex: 'patient_name',
        },
        {
            title: 'Nic No',
            dataIndex: 'nic_number',
        },

        {
            title: 'Visit Type',
            dataIndex: 'patient_type',
            render:(record) => (
                <Tag color={record  === "Normal" ? 'purple-inverse' : 'orange-inverse'}>{record}</Tag>
            )
        },
        {
            title: 'Assigned To',
            dataIndex: 'visit_type',
            render:(record) => (
                <Tag color={record  === "Clinic" ? 'default' : 'red'}>
                    <strong>{record}</strong>
                </Tag>
            )
        },

        {
            title: 'Status',
            dataIndex: 'status',
            render: (status) => (
                <Tag color="processing">
                    <strong>{status}</strong>
                </Tag>
            ),
        },
        {
            title: 'Visit Date',
            dataIndex: 'visit_date',
        },
        {
            title: 'Actions',
            render: (_, record) => (
                <Space>
                    <Button
                        onClick={() => {viewAppointment(record.id)}}
                        icon={<EyeFilled/>}
                        color="default"
                        variant="solid" size="small">

                    </Button>
                    <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Tooltip title="Delete Record">
                            <Button type="text" danger icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>

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

    const handleCreateSuccess = (identifier) => {
        setModalVisible(false);
        console.log(identifier);
        // Handle the identifier (NIC or QR data) here
        // if (identifier.length === 12 || identifier.length === 10) { // Basic NIC validation
        //     navigate(`/patient-visit/new?nic=${identifier}`);
        // } else {
        //     // Assume it's QR data
        //     navigate(`/patient-visit/new?qr=${identifier}`);
        // }
    };


    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <Title level={3} style={{ color: "#495057" }}>
                            <FaHospitalUser style={{ fontSize: 20, marginRight: 10 }} />
                            My Appointments
                        </Title>
                    </Col>
                    <Col>


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


        </>
    );
};

export default MyAppoinmentList;