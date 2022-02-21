import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import { MDBDataTable } from "mdbreact"
import { Row, Container, Col, Card, CardBody } from "reactstrap"
import { post, get } from 'helpers/api_helper';
import { AvForm, AvField } from "availity-reactstrap-validation"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./profile.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UsersProfile = ({ match }) => {

  const [userData, setUserData] = useState({ tasks: [] });

  useEffect(() => {
    getUsers(match.params.id);
  }, []);

  const getUsers = (id) => {
    post('GetUserDetailsById/' + id, null, { headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` } })
      .then((res) => {
        console.log(res)
        if (res.status == true) {
          setUserData(res.data.user);
        }
      })
  }

  const handleValidSubmit = async (e, v) => {
    let obj = { ...v, id: userData.user_id };
    let res = await post('UpdateUserForWeb', obj, { headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` } });
    if (res.status == true) {
      showToast(res.message);
    }
  }

  const showToast = (m) => {
    toast.success(m, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
    );
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>User Profile </title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs maintitle="NFTAG" title="User Profile" />

          <Container fluid>
            <ToastContainer />
            <Row>
              <Col md={12}>
                <Card>
                  <CardBody>
                    {/* <div className="text-center">
                      <img
                        src={userData.user_image}
                        alt=""
                        className="avatar-lg rounded-circle img-thumbnail"
                      />
                    </div> */}
                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(e, v)
                      }}
                    >
                      <div className="mb-3">
                        <AvField
                          name="full_name"
                          label="Full Name"
                          value={userData.full_name}
                          className="form-control"
                          placeholder="Full Name"
                          type="text"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <AvField
                          name="username"
                          label="Username"
                          value={userData.username}
                          className="form-control"
                          placeholder="User Name"
                          type="text"
                          readOnly
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <AvField
                          name="email"
                          label="Email"
                          value={userData.email}
                          className="form-control"
                          placeholder="Email"
                          type="email"
                          readOnly
                          required
                        />
                      </div>

                      {/* <div className="mb-3">
                        <AvField
                          name="phone_number"
                          label="Phone Number"
                          value={userData.phone_number}
                          className="form-control"
                          placeholder="Phone Number"
                          type="number"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <AvField
                          name="date_of_birth"
                          label="Date of Birth"
                          value={userData.date_of_birth}
                          className="form-control"
                          placeholder="Date Of Birth"
                          type="date"
                          required
                        />
                      </div> */}

                      <Col sm={6} className="text-end">
                        <button
                          className="btn btn-primary w-md waves-effect waves-light"
                          type="submit"
                        >
                          Update
                        </button>
                      </Col>

                    </AvForm>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>

        </div>
      </div>
    </React.Fragment>
  )
}

export default UsersProfile;
