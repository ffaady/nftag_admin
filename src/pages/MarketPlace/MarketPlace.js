import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { post, get } from 'helpers/api_helper';
import { useHistory } from 'react-router-dom';
import MarketModal from './MarketModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const MarketPlace = () => {
  const history = useHistory();
  const [marketPlace, setMarketPlace] = useState({});
  const [showHid, setShowHide] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    getMarketPlace()
  }, []);

  const getMarketPlace = () => {
    post('GetAllMarketsPlace', null, { headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` } })
      .then((res) => {
        if (res.status == true) {
          let data = res.data.marketplace;
          data.forEach((e) => {
            e.edit = <button className="btn btn-danger" onClick={() => toggleModal(true, e)}>Edit</button>;
            e.view = <button className="btn btn-primary" onClick={() => gotoDetail(e)}>View</button>
            e.status = e.status == '1' ? 'Approved' : e.status == '2'? 'Pending' : 'Deactivated'
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
                label: "Market Name",
                field: "name",
                sort: "asc",
                width: 270,
              },

              {
                label: "Status",
                field: "status",
                sort: "asc",
                width: 270,
              },
              {
                label: "Edit",
                field: "edit",
                sort: "asc",
                width: 50
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
          setMarketPlace(tableData);
        }
      })
  }

  const gotoDetail = (e)=>{
    history.push('/collections/'+e.id);
  }

  const toggleModal = (sh = false, d = null) => {
    setModalData(d);
    setShowHide(sh);
  }
  // Modal Toggles ^ 
  const onToggle = (val, tval = null) => {
    setModalData(null);
    setShowHide(val);
    tval != null ? (showToast(tval), getMarketPlace()) : null;
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
          <title>Market Place</title>
        </MetaTags>

        <ToastContainer />
        <div className="container-fluid">
          <Row>
            <Col size={6}>
              <Breadcrumbs maintitle="NFTAG" title="Market Place" />
            </Col>

          </Row>

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <CardTitle className="h4">MarketPlace's List </CardTitle>
                  <MDBDataTable btn responsive striped bordered data={marketPlace} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        {showHid ? <MarketModal showHide={showHid} data={modalData} onToggle={onToggle} /> : ''}
      </div>
    </React.Fragment>
  )
}

export default MarketPlace;