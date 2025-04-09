import React from 'react';
import { Table, Button, Select, Space, Popconfirm, Input, Row, Col, DatePicker } from 'antd';
import { DeleteOutlined, FilterOutlined, ClearOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const { Option } = Select;

const CustomTable = ({
                         columns,
                         data,
                         searchText,
                         setSearchText,
                         filters,
                         setFilters,
                         onRowSelectionChange,
                         selectedRowKeys,
                         onDelete,
                         onBulkDelete,
                         loading,
                         dateRange,
                         setDateRange,
                         handleSearch,
                         clearFilter,
                         handleFilter,
                         clearButtonEnable
                     }) => {

    // Updated rendering of cell content with `onCell`
    const handleColumnRender = (col) => {
        if (col.render) {
            // Keep custom render untouched
            return col;
        }

        return {
            ...col,
            render: (text, record) => {
                const value = record[col.dataIndex];
                return searchText ? (
                    <Highlighter
                        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={value ? value.toString() : ''}
                    />
                ) : value;
            },
        };
    };


    const handleClearSearch = () => {
        console.log('handleClearSearch');
        setSearchText('');  // Clear search text
        handleSearch();     // Reset the table data to show all records
    };

    return (
        <>
            {/* Layout for Search and Other Filters */}
            <Row justify="space-between" align="middle" style={{ marginBottom: '16px' }}>
                {/* Search Input on the left */}
                <Col>
                    <Input
                        placeholder="Search ..."
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                            handleSearch();  // Call search handler
                        }}
                        onClear={handleClearSearch}  // This will reset the search
                        style={{ width: 250 }}
                        allowClear
                    />
                </Col>

                {/* Filters and Actions on the right */}
                <Col>
                    <Space>
                        {/* Bulk delete button */}
                        {selectedRowKeys.length > 0 && (
                            <Popconfirm title="Delete selected items?" onConfirm={onBulkDelete}>
                                <Button danger icon={<DeleteOutlined />}>Delete Selected</Button>
                            </Popconfirm>
                        )}

                        {/* Filters Section */}
                        <Row gutter={[16, 16]}>
                            {filters && filters.map((filter, index) => (
                                <Col key={index}>
                                    {filter.type === 'select' && (
                                        <Select
                                            placeholder={filter.placeholder}
                                            value={filter.value}
                                            onChange={(value) => setFilters(filter.key, value)}
                                            style={{ width: 200 }}
                                        >
                                            {filter.options.map((option) => (
                                                <Option key={option.value} value={option.value}>
                                                    {option.label}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}

                                    {filter.type === 'dateRange' && (
                                        <DatePicker.RangePicker
                                            style={{ width: 300 }}
                                            onChange={(dates) => setDateRange(dates)}
                                            value={dateRange}
                                        />
                                    )}
                                </Col>
                            ))}
                            <Col>
                                <Button icon={<FilterOutlined />} onClick={handleFilter}>Apply Filters</Button>
                                {clearButtonEnable && (
                                    <Button style={{ marginLeft: '10px' }} icon={<ClearOutlined />} variant="outlined" color="danger" onClick={clearFilter}>Clear</Button>
                                )}

                            </Col>
                        </Row>
                    </Space>
                </Col>
            </Row>

            {/* Table Section */}
            <Table
                rowKey="id"
                columns={columns.map(handleColumnRender)}  // Apply the updated rendering function
                dataSource={data}
                loading={loading}
                rowSelection={{
                    selectedRowKeys,
                    onChange: onRowSelectionChange,
                }}
                pagination={{ pageSize: 10 }}
            />
        </>
    );
};

export default CustomTable;
