import { useFormik } from 'formik';
import * as Yup from 'yup'
import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupText, Row } from 'reactstrap'
import { useNavigate, useParams } from 'react-router-dom';

function AppointmentForm() {

    const [patients, setPatients] = useState(() => (
        JSON.parse(localStorage.getItem("_appointment")) || []
    ));
    const [editPatients, setEditPatients] = useState(null);
    const navigate = useNavigate();
    const params = useParams 
    ();

    const validationSchema = Yup.object({
        pname: Yup.string().required("Patient name is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        mono: Yup.string().matches(/^[0-9]{10}$/, "Mobile number must be 10 digits").required("Mobile number is required"),
        dname: Yup.string().required("Doctor name is required"),
        dept: Yup.string().required("Department is required"),
        appointmentDate: Yup.date().required("Appointment date is required"),
        appointmentTime: Yup.string().required("Appointment time is required"),
    });

    const formik = useFormik({
        initialValues: {
            pname: "",
            email: "",
            mono: "",
            dname: "",
            dept: "",
            appointmentDate: "",
            appointmentTime: "",
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            if (editPatients) {
                setPatients(
                    patients.map((patient) =>
                        patient.id === editPatients.id ? { ...values, id: editPatients.id, status: editPatients.status } : patient
                    )
                );
                setEditPatients(null);
            } else {
                setPatients([...patients, { ...values, id: Date.now(), status: "Pending" }]);
            }

            navigate('/');
            resetForm();
        }
    });

    return (
        <>
            <Container className='w-50'>
                <Card className='mt-3 py-4'>
                    <h2 className='text-center mb-3'>{editPatients ? "Update Appointment" : "Add Appointment"}</h2>

                    <Form className='w-75 m-auto' onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <InputGroup>
                                <InputGroupText>Patients Name</InputGroupText>
                                <Input
                                    type='text'
                                    id='pname'
                                    name='pname'
                                    value={formik.values.pname}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </InputGroup>
                            {formik.touched.pname && formik.errors.pname && (
                                <div className="text-danger small">{formik.errors.pname}</div>
                            )}
                        </FormGroup>

                        <FormGroup>
                            <InputGroup>
                                <InputGroupText>E-mail</InputGroupText>
                                <Input
                                    type='text'
                                    id='email'
                                    name='email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </InputGroup>
                            {formik.touched.email && formik.errors.email && (
                                <div className="text-danger small">{formik.errors.email}</div>
                            )}
                        </FormGroup>

                        <FormGroup>
                            <InputGroup>
                                <InputGroupText>Contact No.</InputGroupText>
                                <Input
                                    type='tel'
                                    id='mono'
                                    name='mono'
                                    value={formik.values.mono}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </InputGroup>
                            {formik.touched.mono && formik.errors.mono && (
                                <div className="text-danger small">{formik.errors.mono}</div>
                            )}
                        </FormGroup>

                        <FormGroup>
                            <InputGroup>
                                <InputGroupText>Doctor Name</InputGroupText>
                                <Input
                                    type='text'
                                    id='dname'
                                    name='dname'
                                    value={formik.values.dname}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </InputGroup>
                            {formik.touched.dname && formik.errors.dname && (
                                <div className="text-danger small">{formik.errors.dname}</div>
                            )}
                        </FormGroup>

                        <FormGroup>
                            <InputGroup>
                                <InputGroupText>Department</InputGroupText>
                                <Input
                                    type='select'
                                    id='dept'
                                    name='dept'
                                    value={formik.values.dept}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">Select Department</option>
                                    <option value="Cardiology">Cardiology</option>
                                    <option value="Urology">Urology</option>
                                    <option value="Surgory">Surgory</option>
                                </Input>
                            </InputGroup>
                            {formik.touched.dept && formik.errors.dept && (
                                <div className="text-danger small">{formik.errors.dept}</div>
                            )}
                        </FormGroup>

                        <FormGroup>
                            <InputGroup>
                                <InputGroupText>Appointment Date</InputGroupText>
                                <Input
                                    type='date'
                                    id='appointmentDate'
                                    name='appointmentDate'
                                    value={formik.values.appointmentDate}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </InputGroup>
                            {formik.touched.appointmentDate && formik.errors.appointmentDate && (
                                <div className="text-danger small">{formik.errors.appointmentDate}</div>
                            )}
                        </FormGroup>

                        <FormGroup>
                            <InputGroup>
                                <InputGroupText>Appointment Time</InputGroupText>
                                <Input
                                    type='time'
                                    id='appointmentTime'
                                    name='appointmentTime'
                                    value={formik.values.appointmentTime}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </InputGroup>
                            {formik.touched.appointmentTime && formik.errors.appointmentTime && (
                                <div className="text-danger small">{formik.errors.appointmentTime}</div>
                            )}
                        </FormGroup>

                        <Row>
                            <Col>
                                <Button type='submit' color='primary' className='w-100'>
                                    {editPatients ? "Update" : "Save"}
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    type='button'
                                    color='secondary'
                                    className='w-100'
                                    onClick={() => {
                                        navigate('/');
                                        formik.resetForm();
                                        setEditPatients(null);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Container>
        </>
    )
}

export default AppointmentForm
