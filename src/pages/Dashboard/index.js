import React,{useState, useEffect} from "react"
import MetaTags from 'react-meta-tags';
import {
  Col,
  Container,
  Row,
  Card,
  CardBody
} from "reactstrap";
import { post } from "helpers/api_helper";

const Dashboard = () => {
  const [menu, setMenu] = useState(false)
  const [data, setData] = useState();

  const toggle = () => {
    setMenu(!menu)
  }


  useEffect(() => {
    getDashboardData();
  }, []);


  const getDashboardData = () => {
    post('Dashboard', null, { headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` } }).then((res)=>{
      if (res.status == true) {
        setData(res.data);
      }
    })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Dashboard </title>
        </MetaTags>
        <Container fluid>
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col md={8}>
                <h6 className="page-title">Dashboard</h6>
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item active">Welcome to NFTAG</li>
                </ol>
              </Col>
            </Row>
          </div>
        </Container>

        <Container fluid>
          <Row>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">

                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Total Users
                    </h5>
                    <h4 className="fw-medium font-size-24">
                      {data?.users}
                    </h4>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Total Markets
                    </h5>
                    <h4 className="fw-medium font-size-24">
                    {data?.markets}
                    </h4>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Total Collections
                    </h5>
                    <h4 className="fw-medium font-size-24">
                    {data?.collections}
                    </h4>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">

                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Total NFT's
                    </h5>
                    <h4 className="fw-medium font-size-24">
                    {data?.nft_assets}
                    </h4>
                  </div>
                </CardBody>
              </Card>
            </Col>

          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard