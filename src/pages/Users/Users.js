import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap"
import { post, get } from 'helpers/api_helper';
import { useHistory } from 'react-router-dom';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./users.scss"

const Users = () => {
  const history = useHistory();
  const [userList, setUserData] = useState({});

  useEffect(() => {
    getUsers()
  }, []);

  const getUsers = () => {
    post('GetAllUsers', null, { headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` } })
      .then((res) => {
        if (res.status == true) {
          let data = res.data.users;
          data.forEach((e)=>{
            e.clickEvent = () => rowClick(e);
          })
          let tableData = {
            columns: [
              {
                label: "Name",
                field: "full_name",
                sort: "asc",
                width: 150,
              },
              {
                label: "Email",
                field: "email",
                sort: "asc",
                width: 270,
              },
              // {
              //   label: "Phone Number",
              //   field: "phone_number",
              //   sort: "asc",
              //   width: 200,
              // },
              {
                label: "User Name",
                field: "username",
                sort: "asc",
                width: 100,
              },
              // {
              //   label: "Date of birth",
              //   field: "date_of_birth",
              //   sort: "asc",
              //   width: 150,
              // }
            ],
            rows: data,
          }
          setUserData(tableData);
        }
      })
  }

  const rowClick = (e)=>{
    history.push('/user/'+e.user_id);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Users </title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs maintitle="GIG-Economy" title="Users"  />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">User's List </CardTitle>
                  <MDBDataTable responsive striped bordered data={userList} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Users;
