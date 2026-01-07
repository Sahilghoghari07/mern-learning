import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table } from 'reactstrap'
import { useNavigate } from 'react-router-dom'

function AppointmentList() {

    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const data = () => JSON.parse(localStorage.getItem("_appointment")) || [];
        setPatients(data);
    }, []);

    useEffect(() => {
        localStorage.setItem("_appointment", JSON.stringify(patients));
    }, [patients]);

    const deleteAppointment = (id) => {
        setPatients(patients.filter((patient) => patient.id !== id));
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
            <Button color='primary' onClick={() => navigate("/add")}>
                Add Appointment
            </Button>

            <Table striped className='text-center mt-4'>
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
                    {patients.map((p, i) => (
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
                                            className='w-100'
                                            disabled={p.status === "Completed"}
                                            onClick={() => navigate(`/edit/${p.id}`)}
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            type='button'
                                            color='danger'
                                            size='sm'
                                            className='w-100 mt-2'
                                            onClick={() => deleteAppointment(p.id)}
                                        >
                                            Delete
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            type='button'
                                            color='info'
                                            size='sm'
                                            className='w-100'
                                            onClick={() => confirmAppointment(p.id)}
                                        >
                                            Confirm
                                        </Button>

                                        <Button
                                            type='button'
                                            color='success'
                                            size='sm'
                                            className='w-100 mt-2'
                                            onClick={() => completeAppointment(p.id)}
                                        >
                                            Completed
                                        </Button>
                                    </Col>
                                </Row>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default AppointmentList