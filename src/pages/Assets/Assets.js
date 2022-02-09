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

const Assets = ({ match }) => {
  const history = useHistory();
  const [assets, setAssets] = useState({});

  useEffect(() => {
    getAssets(match.params.id)
  }, []);

  const getAssets = (id) => {
    post('GetAllNFTS', { collection_id: id }, { headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` } })
      .then((res) => {
        console.log(res)
        if (res.status == true) {
          let data = res.data.assets;
          data.forEach((e) => {
            e.image = <img src={e.image} style={{ 'width': '100px', 'height': '100px', 'object-fit': 'contain' }} />;
            e.link = <button className="btn btn-primary" onClick={() => openLink(e.market_link)}>View</button>
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
                label: "Asset",
                field: "image",
                sort: "asc",
                width: 270,
              },
              {
                label: "Asset's Name",
                field: "name",
                sort: "asc",
                width: 270,
              },
              {
                label: "Open Link",
                field: "link",
                sort: "asc",
                width: 270,
              },
            ],
            rows: data,
          }
          setAssets(tableData);
        }
      })
  }

  const openLink = (link) => {
    window.open(link, '_blank').focus();
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Assets</title>
        </MetaTags>

        <ToastContainer />
        <div className="container-fluid">
          <Row>
            <Col size={6}>
              <Breadcrumbs maintitle="NFTAG" title="Assets" />
            </Col>

          </Row>

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">Asset's List </CardTitle>
                  <MDBDataTable btn responsive striped bordered data={assets} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Assets;