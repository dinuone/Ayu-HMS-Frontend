import React, { useState, useEffect } from 'react';
import {message, Button, Popconfirm, Space, Tag, Row, Col, Switch, Typography, Tooltip} from 'antd';
import api from '../../Services/NetworkManager.js';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import {DeleteOutlined, EditOutlined, PlusOutlined, TeamOutlined} from '@ant-design/icons';
import CustomTable from '../../Components/CustomTable.jsx';
import CreateOrUpdateModal from "./CreateOrUpdateModal.jsx";

const { Title } = Typography;

const UserList = () => {
    const [tableData, setTableData] = useState([]);
    const [branches, setBranches] = useState([]);
    const [roles, setRoles] = useState([]);

    const [filteredData, setFilteredData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [roleFilter, setRoleFilter] = useState(null);
    const [statusFilter, setStatusFilter] = useState('All');
    const [dateRange, setDateRange] = useState([]);
    const navigate = useNavigate();

    //user create update
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);

    const handleDataSubmit = async (values) => {
        setModalLoading(true);
        try {
            if (selectedUser) {
                await api.put(`/user/update/${selectedUser.id}`, values);
            } else {
                await api.post('/user/create', values);
                console.log(response)

            }
            setModalVisible(false);
            fetchUsers();
        } catch (error) {
            console.log(error)
            const errorMessage = error.response?.data?.data?.message || 'Operation failed';
            message.error(errorMessage);
        } finally {
            setModalLoading(false);
            setSelectedUser(null);
        }
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await api.get('/user/list');
            setTableData(res.data.data);
            setFilteredData(res.data.data);
        } catch (error) {
            console.log(error);
            const errorMessage = error.response?.data?.data?.message || 'Operation failed';
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/user/delete/${id}`);
            fetchUsers();
        } catch (error){
            const errorMessage = error.response?.data?.data?.message || 'Operation failed';
            message.error(errorMessage);
        }
    };

    const getSelectedRecord = async (id) => {
        try {
            const response = await api.get(`/user/get/${id}`);
            setSelectedUser(response.data.data);
            setModalVisible(true);
        } catch (error){
            const errorMessage = error.response?.data?.data?.message || 'Operation failed';
            message.error(errorMessage);
        }
    };

    const fetchBranches = async () => {
        try {
            const res = await api.get('/user/branch-list');
            setBranches(res.data.data);
        } catch (error) {
            console.log(error);
            const errorMessage = error.response?.data?.data?.message || 'Operation failed';
            message.error(errorMessage);
        }
    }

    const fetchRoles = async () => {
        try {
            const res = await api.get('/user/role-list');
            setRoles(res.data.data);
        } catch (error) {
            console.log(error);
            const errorMessage = error.response?.data?.data?.message || 'Operation failed';
            message.error(errorMessage);
        }
    }

    const handleBulkDelete = async () => {
        try {
            await api.post(`/user/delete-all`, selectedRowKeys)
            fetchUsers();
            setSelectedRowKeys([]);
        } catch (error){
            const errorMessage = error.response?.data?.data?.message || 'Operation failed';
            message.error(errorMessage);
        }
    };

    const toggleStatus = async (id) => {
        try {
            await api.get(`/user/update-status/${id}`);
            fetchUsers();
        } catch (error) {
            const errorMessage = error.response?.data?.data?.message || 'Operation failed';
            message.error(errorMessage);
        }
    };


    const columns = [
        {
            title: 'First Name',
            dataIndex: 'first_name',
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
        },
        {
            title: 'Username',
            dataIndex: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Branch',
            dataIndex: 'branch',
            render: (branchList) => (
                <>
                    {branchList.map(branch => (
                        <Tag color="geekblue-inverse" key={branch.id}>{branch.name}</Tag>
                    ))}
                </>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'is_active',
            render: (isActive) => (
                <Tag color={isActive ? 'green' : 'volcano'}>{isActive ? 'Active' : 'Inactive'}</Tag>
            ),
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
        },
        {
            title: 'Actions',
            render: (_, record) => {
                const isSuperAdmin = record.role === 'SuperAdmin';

                return(
                    <Space>
                        <Tooltip title={isSuperAdmin ? 'Locked' : 'Status Update'} placement="bottom" >
                            <Switch
                                disabled={isSuperAdmin}
                                checked={record.is_active}
                                onChange={() => toggleStatus(record.id)}
                            />
                        </Tooltip>

                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                            <Tooltip title={isSuperAdmin ? 'Locked' : 'Delete Record'} placement="bottom" >
                                <Button
                                    disabled={isSuperAdmin}
                                    type="text" danger
                                    icon={<DeleteOutlined />}  />
                            </Tooltip>
                        </Popconfirm>

                        <Tooltip title={isSuperAdmin ? 'Locked' : 'Edit Record'} placement="bottom" >
                            <Button type="text" color="default" icon={<EditOutlined />}
                                    disabled={isSuperAdmin}
                                    onClick={() => {
                                        getSelectedRecord(record.id);

                                    }}/>
                        </Tooltip>


                    </Space>
                )
            }
        }
    ];

    const filters = [
        {
            key: 'role',
            type: 'select',
            value: roleFilter,
            placeholder: 'Filter by Role',
            options: [
                { label: 'All Roles', value: '' },
                { label: 'Admin', value: 'admin' },
                { label: 'User', value: 'user' },
            ],
            setValue: setRoleFilter,
        },
        {
            key: 'status',
            type: 'select',
            value: statusFilter,
            placeholder: 'Filter by Status',
            options: [
                { label: 'All Statuses', value: '' },
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

    const handleCancel = () => {
        setSelectedUser(null); // Clear the selected user
        setModalVisible(false);
    };


    const handleClearFilters = () => {
        setRoleFilter('');
        setStatusFilter('');
        setDateRange([]);
        setSearchText('');
        fetchUsers();
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

    useEffect(() => {
        fetchUsers();
        fetchBranches()
        fetchRoles()
    }, []);

    return (
        <>
            <div style={{ marginBottom: '16px' }}>
                {/* Row Layout: Title on left, Create User button on right */}
                <Row justify="space-between" align="middle">
                    <Col>
                        <Title level={3} style={{ color: "#495057" }}>
                            <span style={{fontSize:"20px", marginRight:"10px"}}><TeamOutlined/></span>
                            Users
                        </Title>
                    </Col>
                    <Col>
                        <Button icon={<PlusOutlined />} variant="solid" color="default"
                                onClick={() => {
                                    setSelectedUser(null);
                                    setModalVisible(true);
                                }}>
                            Create User
                        </Button>
                    </Col>
                </Row>
            </div>

            <div className="user-list">
                <CustomTable
                    columns={columns}
                    data={filteredData}
                    searchText={searchText}
                    setSearchText={setSearchText}
                    filters={filters}
                    selectedRowKeys={selectedRowKeys}
                    onRowSelectionChange={(keys) => setSelectedRowKeys(keys)}
                    onDelete={handleDelete}
                    onBulkDelete={handleBulkDelete}
                    loading={loading}
                    handleClearFilters={handleClearFilters}
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                    handleSearch={handleSearch}
                />
            </div>

            <CreateOrUpdateModal
                visible={modalVisible}
                onCancel={handleCancel}
                branches={branches}
                roles={roles}
                onSubmit={handleDataSubmit}
                initialValues={selectedUser}
                confirmLoading={modalLoading}
            />
        </>
    );
};

export default UserList;
