import React, { useState } from 'react'
import { Button, Col, Container, Row, Table } from 'reactstrap'

function AppointmentList() {

    const [patients, setPatients] = useState(() => (
        JSON.parse(localStorage.getItem("_appointment")) || []
    ));

    const editAppointment = (id) => {
        console.log('dfg');
    }

    const deleteAppointment = (id) => {
        setPatients(
            patients.filter((patient) => patient.id !== id)
        );
    }

    const confirmAppointment = (id) => {
        setPatients(
            patients.map((patient) => patient.id === id ? { ...patient, status: "Confirmed" } : patient)
        );
    }

    const completeAppointment = (id) => {
        setPatients(
            patients.map((patient) => patient.id === id ? { ...patient, status: "Completed" } : patient)
        );
    }

    return (
        <Container fluid className='my-4'>
            <Table striped className='text-center'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Patients Name</th>
                        <th>Email</th>
                        <th>Mobile Number</th>
                        <th>Doctor Name</th>
                        <th>Department</th>
                        <th>Appointment Date</th>
                        <th>Appointment Time</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        patients.map((p, i) => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.pname}</td>
                                <td>{p.email}</td>
                                <td>{p.mono}</td>
                                <td>{p.dname}</td>
                                <td>{p.dept}</td>
                                <td>{p.appointmentDate}</td>
                                <td>{p.appointmentTime}</td>
                                <td>
                                    <span className={
                                        p.status === "Pending" ? "text-warning" : p.status === "Confirmed" ? "text-info" : "text-success"}
                                    >
                                        {p.status}
                                    </span>
                                </td>
                                <td>
                                    <Row>
                                        <Col>
                                            <Button
                                                type='button'
                                                color='warning'
                                                size='sm'
                                                className='ms-1'
                                                disabled={p.status === "Completed"}
                                                onClick={() => editAppointment(p.id)}
                                            >
                                                Edit
                                            </Button>

                                            <Button
                                                type='button'
                                                color='danger'
                                                size='sm'
                                                className='ms-1'
                                                onClick={() => deleteAppointment(p.id)}
                                            >
                                                Delete
                                            </Button>

                                            <Button
                                                type='button'
                                                color='info'
                                                size='sm'
                                                className='ms-1'
                                                onClick={() => confirmAppointment(p.id)}
                                            >
                                                Confirm
                                            </Button>

                                            <Button
                                                type='button'
                                                color='success'
                                                size='sm'
                                                className='ms-1'
                                                onClick={() => completeAppointment(p.id)}
                                            >
                                                Completed
                                            </Button>
                                        </Col>
                                    </Row>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Container>
    )
}

export default AppointmentList
