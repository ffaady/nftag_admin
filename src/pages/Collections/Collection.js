import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { post, get } from 'helpers/api_helper';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const Collections = ({ match }) => {
  const history = useHistory();
  const [collections, setCollections] = useState({});

  useEffect(() => {
    getCollections(match.params.id)
  }, []);

  const getCollections = (id) => {
    post('GetAllCollectionsForWeb', {market_id: id}, { headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` } })
      .then((res) => {
          console.log(res)
        if (res.status == true) {
          let data = res.data.collections;
          data.forEach((e) => {
            e.view = <button className="btn btn-primary" onClick={() => goToAssets(e)}>View</button>
          })
          let tableData = {
            columns: [
              {
                label: "ID",
                field: "id",
                sort: "asc",
                width: 50,
              },
              {
                label: "Collection Name",
                field: "name",
                sort: "asc",
                width: 270,
              },

              {
                label: "Market Name",
                field: "market_name",
                sort: "asc",
                width: 270,
              },
              {
                label: "View",
                field: "view",
                sort: "asc",
                width: 50
            }

            ],
            rows: data,
          }
          setCollections(tableData);
        }
      })
  }

  const goToAssets = (e)=>{
    history.push('/assets/'+e.id);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Collections</title>
        </MetaTags>

        <ToastContainer />
        <div className="container-fluid">
          <Row>
            <Col size={6}>
              <Breadcrumbs maintitle="NFTAG" title="Collections" />
            </Col>

          </Row>

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">Collections's List </CardTitle>
                  <MDBDataTable btn responsive striped bordered data={collections} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Collections;