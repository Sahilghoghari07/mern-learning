import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Row,
  Table
} from 'reactstrap';

export default function App() {

  const [patients, setPatients] = useState(() => (
    JSON.parse(localStorage.getItem("_appointment")) || []
  ));
  const [editPatients, setEditPatients] = useState(null);

  useEffect(() => {
    localStorage.setItem("_appointment", JSON.stringify(patients));
  }, [patients]);

  

  const editAppointment = (id) => {
    let data = patients.find((patient) => patient.id === id);
    setEditPatients(data);
    formik.setValues({
      pname: data.pname,
      email: data.email,
      mono: data.mono,
      dname: data.dname,
      dept: data.dept,
      appointmentDate: data.appointmentDate,
      appointmentTime: data.appointmentTime,
      status: data.status,
    });
  }

  

  return (
    <>
      

      
    </>
  )
}