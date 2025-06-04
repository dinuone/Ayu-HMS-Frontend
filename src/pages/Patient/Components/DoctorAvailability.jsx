import { Card, Col, Collapse, Row, Tag } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const { Panel } = Collapse;

const shiftColors = {
    'First Half': 'green',
    'Second Half': 'orange',
    'Full Day': 'blue',
};

const DoctorAvailability = ({ selectedDoctor }) => {
    if (!selectedDoctor) return null;

    return (
        <div style={{ marginBottom: 24 }}>
            <h4>Available Days by Shift</h4>
            <Collapse accordion>
                {['First Half', 'Second Half', 'Full Day'].map(shift => {
                    const days = selectedDoctor.available_days
                        .filter(d => d.shift === shift)
                        .map(d => d.day);

                    return (
                        <Panel
                            header={
                                <span>
                  <Tag color={shiftColors[shift]}>{shift}</Tag>
                </span>
                            }
                            key={shift}
                        >
                            {days.length > 0 ? (
                                <Row gutter={[12, 12]}>
                                    {days.map(day => (
                                        <Col key={day} span={4}>
                                            <Card
                                                hoverable
                                                bordered
                                                size="small"
                                                style={{
                                                    textAlign: 'center',
                                                    backgroundColor: '#e6f7ff',
                                                    borderColor: '#91d5ff',
                                                }}
                                            >
                                                <CalendarOutlined style={{ color: '#1890ff', marginBottom: 6 }} />
                                                <div style={{ fontWeight: 600 }}>{day}</div>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            ) : (
                                <div style={{ color: '#ff4d4f' }}>No available days for this shift</div>
                            )}
                        </Panel>
                    );
                })}
            </Collapse>
        </div>
    );
};

DoctorAvailability.propTypes = {
    selectedDoctor: PropTypes.object,
};

export default DoctorAvailability;