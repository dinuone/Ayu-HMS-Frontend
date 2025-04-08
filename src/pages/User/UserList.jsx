import React, { useState, useEffect } from 'react';
import {message, Button, Popconfirm, Space, Tag, Row, Col, Switch, Typography, Tooltip} from 'antd';
import api from '../../Services/NetworkManager.js';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import CustomTable from '../../Components/CustomTable.jsx';
import CreateOrUpdateModal from "./CreateOrUpdateModal.jsx";

const { Title } = Typography;

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [branches, setBranches] = useState([]);
    const [roles, setRoles] = useState([]);

    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
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
                message.success('User updated successfully');
            } else {
                const response = await api.post('/user/create', values);
                console.log(response)
                message.success(response.data.data.message);
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
            setUsers(res.data.data);
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
            const response = await api.delete(`/user/delete/${id}`);
            message.success(response.data.data.message);
            fetchUsers();
        } catch (error){
            const errorMessage = error.response?.data?.data?.message || 'Operation failed';
            message.error(errorMessage);
        }
    };

    const fetchBranches = async () => {
        try {
            const res = await api.get('/branch/list');
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
            const response = await Promise.all(selectedRowKeys.map(id => api.delete(`api/user/delete/${id}`)));
            message.success(response.data.data.message);
            fetchUsers();
            setSelectedRowKeys([]);
        } catch (error){
            const errorMessage = error.response?.data?.data?.message || 'Operation failed';
            message.error(errorMessage);
        }
    };

    const toggleStatus = async (id, isActive) => {
        try {
            await api.put(`/user/status-toggle/${id}`, { is_active: isActive });
            message.success(`User ${isActive ? 'activated' : 'deactivated'} successfully`);
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
            title: 'Actions',
            render: (_, record) => {
                const isSuperAdmin = record.role === 'SuperAdmin';

                return(
                    <Space>
                        <Popconfirm title="Sure to update status?" onConfirm={() => handleDelete(record.id)}>
                            <Switch
                                disabled={isSuperAdmin}
                                checked={record.is_active}
                                onChange={(checked) => toggleStatus(record.id, checked)}
                            />
                        </Popconfirm>

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
                                        setSelectedUser(record);
                                        setModalVisible(true);
                                    }} />
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

    const handleFilterApply = () => {
        setFilteredUsers(users.filter((user) => {
            const matchesRole = roleFilter ? user.role === roleFilter : true;
            const matchesStatus = statusFilter ? (statusFilter === 'active' ? user.is_active : !user.is_active) : true;
            const matchesDateRange = dateRange.length ? moment(user.created_at).isBetween(dateRange[0], dateRange[1], null, '[]') : true;
            return matchesRole && matchesStatus && matchesDateRange;
        }));
    };

    const handleClearFilters = () => {
        setRoleFilter('');
        setStatusFilter('');
        setDateRange([]);
        setSearchText('');
        fetchUsers();
    };

    const handleSearch = () => {
        if (searchText) {
            setFilteredUsers(users.filter(user =>
                user.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
                user.last_name.toLowerCase().includes(searchText.toLowerCase()) ||
                user.email.toLowerCase().includes(searchText.toLowerCase())
            ));
        } else {
            setFilteredUsers(users);  // Show all users when search is cleared
        }
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
                            Users
                        </Title>
                    </Col>
                    <Col>
                        <Button icon={<PlusOutlined />} variant="solid" color="blue"
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
                    data={filteredUsers.length ? filteredUsers : users}
                    searchText={searchText}
                    setSearchText={setSearchText}
                    filters={filters}
                    setFilters={(key, value) => key === 'role' ? setRoleFilter(value) : setStatusFilter(value)}
                    selectedRowKeys={selectedRowKeys}
                    onRowSelectionChange={(keys) => setSelectedRowKeys(keys)}
                    onDelete={handleDelete}
                    onBulkDelete={handleBulkDelete}
                    loading={loading}
                    handleFilterApply={handleFilterApply}
                    handleClearFilters={handleClearFilters}
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                    handleSearch={handleSearch}
                />
            </div>

            <CreateOrUpdateModal
                visible={modalVisible}
                onCancel={() => {
                    setModalVisible(false);
                    setSelectedUser(null);
                }}
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
