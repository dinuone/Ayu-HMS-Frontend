import React, { memo } from 'react';
import {DatePicker, Input, Radio, Typography} from 'antd';
import ReactQuill from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css';

const { Title } = Typography;


const ObstetricHistory = memo(({data, onChange}) => {

    return (
        <>
            <Title level={5}>Obstetric History (Prasawa Ithihasa)</Title>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 200 }}>Number of Pregnancy</label>
                <Input
                    type="number"
                    value={data.numberOfPregnacy}
                    onChange={(e) => onChange('numberOfPregnacy', e.target.value)}
                    style={{ width: 100 }}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 200 }}>Labor</label>
                <Radio.Group
                    onChange={(e) => onChange('labour', e.target.value)}
                    value={data.labour}
                >
                    <Radio value="NVD">NVD</Radio>
                    <Radio value="Induced">Induced</Radio>
                    <Radio value="LSCS">LSCS</Radio>
                </Radio.Group>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 200 }}>Date of Delivery</label>
                <DatePicker
                    format="YYYY-MM-DD"
                    onChange={(value,dateString) => onChange('dateOfLastDelivery', dateString)}
                    style={{ width: 200 }}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 200 }}>Particulars of Deliveries</label>
                <Input
                    value={data.particularsOfDeliveries}
                    onChange={(e) => onChange('particularsOfDeliveries', e.target.value)}
                    style={{ width: 500 }}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 200 }}>History of Garbha Srava / Pata</label>
                <Input
                    value={data.historyOfGarbha}
                    onChange={(e) => onChange('historyOfGarbha', e.target.value)}
                    style={{ width: 500 }}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <label style={{ width: 200 }}>Mudha Garbha Ithihasaya</label>
                <Input
                    value={data.mudhaGarbhaIthihasaya}
                    onChange={(e) => onChange('mudhaGarbhaIthihasaya', e.target.value)}
                    style={{ width: 500 }}
                />
            </div>

            <label style={{ width: 150 }}>Contraceptive history</label>
            <ReactQuill
                theme="snow"
                value={data.contraceptiveHistory}
                onChange={(value) => onChange('contraceptiveHistory', value)}
            />


        </>
    );
});

export default ObstetricHistory;