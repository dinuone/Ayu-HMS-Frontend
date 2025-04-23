import React, { useState, useEffect } from 'react';
import { message, Button, Popconfirm, Space, Tag, Row, Col, Switch, Typography, Tooltip } from 'antd';
import api from '../../Services/NetworkManager.js';
import {
    DeleteOutlined,
    EditOutlined,
    FileAddFilled,
    FileExcelOutlined,
    MedicineBoxOutlined,
    PlusOutlined, UsergroupAddOutlined
} from '@ant-design/icons';
import CustomTable from '../../Components/CustomTable.jsx';
import CreateOrUpdateModal from "./CreateOrUpdateModal.jsx";
import {exportToExcel} from "../../Services/ExcelExport.js";
import CrudService from "../../Services/CrudService.js";
import {globalSearch} from "../../Utils/Search.js";
import ExcelImporter from "../../Components/ExcelImporter.jsx";

const { Title } = Typography;
const crudService = CrudService('patient');

const PatientList = () => {
    const [tableData, setTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);
    const [clearButtonEnable, setClearButtonEnable] = useState(false);
    const [drugCategory, setDrugCategory] = useState([]);

    const [filterValues, setFilterValues] = useState({
        status: "All",
        date:[],
        drug_category:[]
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
        fetchDrugCategories()
    }, []);


    const fetchDrugCategories= async() =>{
        try {
            const res = await api.get(`/drug-category/list/${true}`);
            setDrugCategory(res.data.data);
        } catch (error) {
            message.error(error.response?.data?.message || 'Operation failed');
        }
    }


    const handleDataSubmit = async (values) => {
        setModalLoading(true);
        try {
            if (selectedRecord) {
                await crudService.update(selectedRecord.id,values);
            } else {
                await crudService.create(values);
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

    const submitExcelData = async (data) => {
        try {
            // Send the data to your backend API
            const response = await axios.post('/drug/bulk-import', { data });

            // Handle success
            if (response.status === 200) {
                message.success('Imported successfully');
                // Optionally refresh the data here
            }
        } catch (error) {
            message.error('Failed to import data');
        }
    };


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

    const columns = [
        {
            title: 'Drug Name',
            dataIndex: 'name',
        },
        {
            title: 'Unit Price',
            dataIndex: 'unit_price',
            render: (unit_price) => `LKR ${unit_price.toLocaleString()}`,
        },
        {
            title: 'Drug Category',
            dataIndex: 'drug_category',
            render: (category) => (
                <Tag color="geekblue-inverse">
                    {category.name}
                </Tag>
            ),
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
        },
        {
            title: 'Description',
            dataIndex: 'description',
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
            key: 'drug_category',
            type: 'select',
            mode:'multiple',
            value: filterValues.drug_category,
            placeholder: 'Filter by Drug Category',
            options: drugCategory.map(drugCtg => ({
                label: drugCtg.name,
                value: drugCtg.id
            })),
            setValue: filterValues.drug_category,
        },
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
                            <UsergroupAddOutlined style={{ fontSize: 20, marginRight: 10 }} />
                            Patients
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
                            Register New Patient
                        </Button>
                        <ExcelImporter
                            onDataParsed={(data) => {
                                console.log(data);
                            }}
                            onSubmit={submitExcelData}  // Pass submit logic to the child component
                        />
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
                drugCategories={drugCategory}
                onSubmit={handleDataSubmit}
                initialValues={selectedRecord}
                confirmLoading={modalLoading}
            />
        </>
    );
};

export default PatientList;