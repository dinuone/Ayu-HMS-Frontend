import { Button, Col, Row } from 'antd';
import PropTypes from 'prop-types';

const VisitTypeSelector = ({ onSelect }) => (
    <Row gutter={16}>
        <Col span={24}>
            <h3 style={{ marginBottom: 24 }}>Select Visit Type</h3>
            <Row gutter={16}>
                <Col span={12}>
                    <Button variant="solid" color="orange" block size="large" onClick={() => onSelect('feelo')}>
                        Feelo App Visit
                    </Button>
                </Col>
                <Col span={12}>
                    <Button variant="solid" color="purple" block size="large" onClick={() => onSelect('normal')}>
                        Normal Visit
                    </Button>
                </Col>
            </Row>
        </Col>
    </Row>
);

VisitTypeSelector.propTypes = {
    onSelect: PropTypes.func.isRequired,
};

export default VisitTypeSelector;