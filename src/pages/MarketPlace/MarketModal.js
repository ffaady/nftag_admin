import React, { useState, useEffect } from 'react';
import { MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { post } from 'helpers/api_helper';
import "./market.scss";

const CategoryModal = ({ showHide, data, onToggle }) => {

    const [basicModal, setBasicModal] = useState(false);
    const [market, setMarket] = useState({});

    const toggleShow = (m = null) => {
        setBasicModal(showHide)
        onToggle(false, m);
    };

    useEffect(() => {
        if (data != null) {
            console.log(data);
            setMarket(data);
        }
        setBasicModal(true)
    }, []);

    const handleSubmit = (errors, values) => {
        let a = {
            name: values.name,
            status: values.status == 'Active' ? 1 : values.status == 'Deactived' ? 2 : 3,
            id: market.id,
        };

        post('UpdateMarket', a, { headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` } })
            .then((res) => {
                console.log(res)
                if (res.status == true) {
                    toggleShow(res.message);
                }
            })

    }

    return (
        <MDBModal isOpen={basicModal} toggle={() => toggleShow()} size="lg">
            <AvForm
                className="form-horizontal"
                onValidSubmit={(e, v) => {
                    handleSubmit(e, v)
                }}
                model={market}
            >
                <MDBModalHeader
                    className="text-center"
                    titleClass="w-100 font-weight-bold"
                    toggle={() => toggleShow()}
                >
                    Edit Market
                </MDBModalHeader>
                <MDBModalBody>
                    <Row>
                        <Col size={12}>
                            <Card>
                                <CardBody>

                                    <div className="mb-3">
                                        <AvField
                                            name="name"
                                            label="Market Name"
                                            value={market.name}
                                            className="form-control"
                                            placeholder="Market Name"
                                            type="text"
                                            required
                                        />
                                    </div>

                                    <AvField type="select" name="status" label="Market Status">
                                        <option>Active</option>
                                        <option>Deactived</option>
                                        <option>Delete</option>
                                    </AvField>


                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </MDBModalBody>
                <MDBModalFooter className="justify-content-right">
                    <button className="btn btn-primary" type="submit">Save</button>
                </MDBModalFooter>
            </AvForm>
        </MDBModal>
    )
}
export default CategoryModal;