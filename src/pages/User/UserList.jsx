import React, { useState, useEffect } from 'react';
import {message, Button, Popconfirm, Space, Tag, Row, Col, Switch, Typography, Tooltip, Modal} from 'antd';
import api from '../../Services/NetworkManager.js';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleFilled,
    KeyOutlined,
    PlusOutlined, SecurityScanOutlined,
    TeamOutlined
} from '@ant-design/icons';
import CustomTable from '../../Components/CustomTable.jsx';
import CreateOrUpdateModal from "./CreateOrUpdateModal.jsx";
import CrudService from "../../Services/CrudService.js";
import {globalSearch} from "../../Utils/Search.js";

const { confirm } = Modal;
const { Title } = Typography;
const crudService = CrudService('user');

const UserList = () => {
    const [tableData, setTableData] = useState([]);
    const [branches, setBranches] = useState([]);
    const [roles, setRoles] = useState([]);

    const [filteredData, setFilteredData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [dateRange, setDateRange] = useState([]);
    const navigate = useNavigate();

    //user create update
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);

    const [filterValues, setFilterValues] = useState({
        status: "All",
        role: null,
        branch: null,
        date:[]
        // add more in future as needed
    });

    const handleDataSubmit = async (values) => {
        setModalLoading(true);
        try {
            if (selectedUser) {
                await crudService.update(selectedUser.id,values);
            } else {
                await crudService.create(values);
            }
            setModalVisible(false);
            await fetchUsers();
        } catch (error) {
            message.error(error.response?.data?.data?.message || 'Operation failed');
        } finally {
            setModalLoading(false);
            setSelectedUser(null);
        }
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await crudService.fetchAll();
            setTableData(res.data.data);
            setFilteredData(res.data.data);
        } catch (error) {
            message.error(error.response?.data?.data?.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await crudService.delete(id);
            await fetchUsers();
        } catch (error){
            message.error(error.response?.data?.data?.message || 'Operation failed');
        }
    };

    const getSelectedRecord = async (id) => {
        try {
            const response = await crudService.getOne(id);
            setSelectedUser(response.data.data);
            setModalVisible(true);
        } catch (error){
            message.error(error.response?.data?.data?.message || 'Operation failed');
        }
    };

    const fetchBranches = async () => {
        try {
            const res = await api.get('/user/branch-list');
            setBranches(res.data.data);
        } catch (error) {
            message.error(error.response?.data?.data?.message || 'Operation failed');
        }
    }

    const fetchRoles = async () => {
        try {
            const res = await api.get('/user/role-list');
            setRoles(res.data.data);
        } catch (error) {
            message.error(error.response?.data?.data?.message || 'Operation failed');
        }
    }

    const handleBulkDelete = async () => {
        try {
            await crudService.deleteAll(selectedRowKeys)
            await fetchUsers();
            setSelectedRowKeys([]);
        } catch (error){
            message.error(error.response?.data?.data?.message || 'Operation failed');
        }
    };

    const toggleStatus = async (id) => {
        try {
            await crudService.updateStatus(id);
            await fetchUsers();
        } catch (error) {
            const errorMessage = error.response?.data?.data?.message || 'Operation failed';
            message.error(errorMessage);
        }
    }

    const showPromiseConfirm = () => {
        confirm({
            title: 'Do you want to reset password?',
            icon: <ExclamationCircleFilled />,
            content: 'new password is "user@#123"',
            onOk() {
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {},
        });
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

                        <Tooltip title={isSuperAdmin ? 'Locked' : 'Reset Password'} placement="bottom" >
                            <Button type="text" color="default" icon={<SecurityScanOutlined />}
                                    disabled={isSuperAdmin}
                                    onClick={showPromiseConfirm}/>
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
            value: filterValues.role,
            placeholder: 'Filter by Role',
            options: [
                { label: 'All Roles', value: 'All' },
                ...roles.map(role => ({ label: role.name, value: role.id }))
            ],
        },
        {
            key: 'branch',
            type: 'select',
            mode:'multiple',
            placeholder: 'Select Branch',
            value: filterValues.branch,
            options: branches.map(branch => ({
                label: branch.name,
                value: branch.id
            }))
        },
        {
            key: 'status',
            type: 'select',
            value: filterValues.status,
            placeholder: 'Filter by Status',
            options: [
                { label: 'All Statuses', value: 'All' },
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' },
            ],
        },
        {
            key: 'date',
            type: 'dateRange',
            setValue: filterValues.date,
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
        const result = globalSearch(tableData, searchText); // Use global search function
        setFilteredData(result);
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
                    setFilters={(key, value) => {
                        setFilterValues(prev => ({
                            ...prev,
                            [key]: value
                        }));
                    }}
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
