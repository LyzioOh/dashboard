import * as React from 'react'

import {useState }from 'react';
import {Card} from "antd"

import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    Checkbox,
    TreeSelect,
    Switch,
} from 'antd';

import { zonedTimeToUtc } from 'date-fns-tz'

import {add} from 'date-fns';

import 'antd/dist/antd.css';
import createMeeting from '../utils/CreateMeeting';

import { message } from 'antd';


const coeff = 1000 * 60 * 60 * 24;
const floorDay = (date: any) => new Date(Math.floor(date.getTime() / coeff) * coeff)



const GetOut = (props:any) => {

    const startEventsSaved: any = []

    const [eventsSaved, setEventsSaved] = useState(startEventsSaved)


    const onFinish = async (values: any) => {

        const dateString = values.date.toISOString().substring(0, 10)

        const date = zonedTimeToUtc(dateString, 'Europe/Paris')


        const payload = {
            title: `🎉 : ${values.title}`,
            start_time: add(date, { hours: values.hour }).toISOString(),
            end_time: add(date, { hours: values.hour + 3 }).toISOString(),
            description: "",
            calendar_id: "e1nhn29cc39upr74135bid670s@group.calendar.google.com",
        }

        const result = await createMeeting(payload).then((response) => {

            message.success(`Event saved: 🎉 `, 3)
            const newEventSaved = [...eventsSaved, { title: `🎉 : ${values.title}`, url: response.data.url}]
            setEventsSaved(newEventSaved)
            return response.data
        }
        ).catch(response => {

            message.error(`Error: 🎉 : ${values.title} Not Saved `)            
            return response.data
        }
        )

        console.log(result)
    };


    
    return(
        <Card title="Time to party 🎉" style={{ width: 450 }}>

            <Form
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Party"
                    name="title"
                    rules={[{ required: true, message: 'Party Should Get a name  🎉' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item 
                    name="date"
                    label="Date">
                    <DatePicker />
                </Form.Item>

                <Form.Item label="Hour" name="hour">
                    <Radio.Group>
                        <Radio.Button value={18}>6:00 PM</Radio.Button>
                        <Radio.Button value={20}>8:00 PM</Radio.Button>
                        <Radio.Button value={22}>10:00 PM</Radio.Button>
                    </Radio.Group>
                </Form.Item>


                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

            {eventsSaved.map((event: any) => (
            <a href={event.url}
                
                >
                {event.title}

                </a>
            ))}


        </Card>
    )
}

export default GetOut