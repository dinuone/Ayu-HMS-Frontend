import React, {useEffect, useState} from 'react';
import CustomTable from "../../../Components/CustomTable.jsx";
import {Button, message, Popconfirm, Space, Tag, Tooltip} from "antd";
import {DeleteOutlined, EyeFilled} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {globalSearch} from "../../../Utils/Search.js";
import api from "../../../Services/NetworkManager.js";

function PreviousVisits({patientId, highlightChitNumber}) {  // Add highlightChitNumber prop
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
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await api.get(`patient-visit/get-by-patient/${patientId}`);
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

    const handleSearch = () => {
        const result = globalSearch(tableData, searchText);
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
            // Filter implementation
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

    // Add rowClassName function to highlight matching rows
    const rowClassName = (record) => {
        return record.chit_number === highlightChitNumber ? 'highlight-row' : '';
    };

    const columns = [
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
                        icon={<EyeFilled/>}
                        color="default"
                        variant="solid"
                        size="small"
                    />
                </Space>
            )
        }
    ];

    return (
        <CustomTable
            columns={columns}
            data={filteredData}
            searchText={searchText}
            setSearchText={setSearchText}
            selectedRowKeys={selectedRowKeys}
            onRowSelectionChange={setSelectedRowKeys}
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
            rowClassName={rowClassName}  // Add rowClassName prop
        />
    );
}

export default PreviousVisits;