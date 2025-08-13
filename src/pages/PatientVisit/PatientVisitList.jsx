import { useState, useEffect } from 'react';
import { message, Button, Popconfirm, Space, Tag, Row, Col, Switch, Typography, Tooltip } from 'antd';
import api from '../../Services/NetworkManager.js';
import {
    CheckCircleFilled,
    DeleteOutlined,
    EditOutlined, EyeFilled, EyeOutlined,
    FileExcelOutlined,
    PlusOutlined, UsergroupAddOutlined
} from '@ant-design/icons';
import CustomTable from '../../Components/CustomTable.jsx';
import {exportToExcel} from "../../Services/ExcelExport.js";
import CrudService from "../../Services/CrudService.js";
import {globalSearch} from "../../Utils/Search.js";
import ExcelImporter from "../../Components/ExcelImporter.jsx";
import {useNavigate} from "react-router-dom";
import {FaHospitalUser} from "react-icons/fa";
import CreateVisitModal from "./CreateVisitModal.jsx";


const { Title } = Typography;
const crudService = CrudService('patient-visit');

const PatientVisitList = () => {
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
            const res = await crudService.fetchAll();
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
            patient_reg_no: item.patient_reg_no,
            patient_name: item.patient_name,
            nic_number: item.nic_number || '',
            doctor_name: item.doctor_name,
            patient_type: item.patient_type || '',
            visit_type: item.visit_type,
            chit_number: item.chit_number,
            status: item.status,
            visit_date: item.visit_date,
        }));

        const exportColumns = [
            { title: 'Registration No', dataIndex: 'patient_reg_no' },
            { title: 'patient_name', dataIndex: 'patient_name' },
            { title: 'Nic No', dataIndex: 'nic_number' },
            { title: 'Doctor', dataIndex: 'doctor_name' },
            { title: 'Visit Type', dataIndex: 'patient_type' },
            { title: 'Assigned To', dataIndex: 'visit_type' },
            { title: 'Chit No', dataIndex: 'chit_number' },
            { title: 'Status', dataIndex: 'status' },
            { title: 'Visit Date', dataIndex: 'visit_date' }
        ];

        exportToExcel(exportColumns, flatData, 'Patient_Visit');
    };

    const viewPatientRecord = (visitId) => {
        console.log(visitId)
        navigate(`/view-patient-visit/${visitId}`)
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
            title: "Patient Name",
            dataIndex: 'patient_name',
        },
        {
            title: 'Nic No',
            dataIndex: 'nic_number',
        },
        {
            title: "Doctor",
            dataIndex: 'doctor_name',
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
            title: 'Chit No',
            dataIndex: 'chit_number',
            render: (record) => (
                <strong>{record}</strong>
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
                        onClick={() => {viewPatientRecord(record.id)}}
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

    const  handleCreateSuccess = async (identifier) => {
        setModalVisible(false);
        console.log("Visita Data ::::::::::::")
        console.log(identifier);
        if(identifier){
            const response = await api.get(`patient-visit/check-account/${identifier.contact_no}`);
            console.log(response)
            if(response.data.data.account_exisit){
                const regNo = response.data.data.patient_reg_no;
                navigate(`/patient-visit/${regNo}`)
            }else{
                message.error("cannot found patient account, please register a new patient");
            }
        }

        // Handle the identifier (NIC or QR data) here
        // if (identifier.length === 12 || identifier.length === 10) { // Basic NIC validation
        //
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
                            Patients Visit
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
                            style={{ marginRight: '10px' }}
                        >
                            Create New Visit
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

            <CreateVisitModal
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                onSuccess={handleCreateSuccess}
            />
        </>
    );
};

export default PatientVisitList;