import React, { memo } from 'react';
import {Checkbox, Input, Radio, Typography} from 'antd';
import ReactQuill from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css';

const { Title } = Typography;

const addictionOptions = ['Smoke', 'Alcohol', 'Betel chewing', 'Other'];

const PersonalHistory = memo(({data, onChange, otherComplaintDetail, onDetailChange}) => {

    const showOtherInput = data?.addiction.option.includes('Other');

    return (
        <>
            <Title level={5}>Personal History</Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ width: 150 }}>Dietary Habits</label>
                    <Radio.Group
                        value={data.dietaryHabits.option}
                        onChange={(e) => onChange('dietaryHabits','option', e.target.value)}
                    >
                        <Radio value="Vegetarian">Vegetarian</Radio>
                        <Radio value="Non Vegetarian">Non Vegetarian</Radio>
                    </Radio.Group>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ width: 150 }}>Meals</label>
                    <Input
                        placeholder="e.g., 3 meals per day"
                        value={data.dietaryHabits.meals}
                        onChange={(e) => onChange('dietaryHabits','meals', e.target.value)}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ width: 150 }}>Water Intake</label>
                    <Input
                        placeholder="e.g., 2 liters/day"
                        value={data.dietaryHabits.waterIntake}
                        onChange={(e) => onChange('dietaryHabits','waterIntake', e.target.value)}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ width: 150 }}>Other</label>
                    <Input
                        placeholder="Specify if any"
                        value={data.dietaryHabits.other}
                        onChange={(e) => onChange('dietaryHabits','other', e.target.value)}
                    />
                </div>
            </div>


            <label style={{ width: 150 }}>Sleep Patterns</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ width: 150 }}>Day</label>
                    <Input
                        value={data.sleepPatterns.day}
                        onChange={(e) => onChange('sleepPatterns','day', e.target.value)}
                        style={{width:500}}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ width: 150 }}>Night</label>
                    <Input
                        value={data.sleepPatterns.night}
                        onChange={(e) => onChange('sleepPatterns','night', e.target.value)}
                        style={{width:500}}
                    />
                </div>
            </div>



            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ width: 150 }}>Addiction</label>
                    <Checkbox.Group
                        options={addictionOptions}
                        value={data.addiction.option}
                        onChange={(checkedValues) => onChange('addiction','option', checkedValues)}
                    />
                </div>

                {showOtherInput && (
                    <>
                        <Input
                            placeholder="Enter details"
                            value={otherComplaintDetail}
                            onChange={(e) => onDetailChange('addiction','other', e.target.value)}
                        />
                    </>
                )}

            </div>



        </>
    );
});

export default PersonalHistory;