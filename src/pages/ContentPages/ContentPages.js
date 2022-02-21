import React, { useEffect, useState, useRef } from "react"
import MetaTags from 'react-meta-tags';
import {
    Form, Card, CardBody, Col, Row, CardTitle, CardSubtitle, Container, Label, Input
} from "reactstrap"
import { post, get } from 'helpers/api_helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';


import { Editor } from '@tinymce/tinymce-react';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const ContentPages = ({ match }) => {
    const history = useHistory();
    const editorRef = useRef(null);
    const [editorState, setEditorState] = useState('<p>Write Something</p>');
    const [slug, setSlug] = useState({});
    const [page_name, setPageName] = useState('');
    const [pageId, setPageId] = useState('');

    useEffect(() => {
        setSlug(match);
        match.params.slug != 'addnew' ? getPageContent(match.params.slug) : null;
    }, []);

    useEffect(() => {
        return history.listen((location) => {
            let a = JSON.parse(JSON.stringify(location)).pathname.split('/');
            if (a[1] === 'ContentPages' && a[2] === 'addnew') {
                setEditorState('<p>Write Something</p>');
                setPageName('');
                setPageId('');
            } else {
                getPageContent(a[2]);
            }
        })
    }, [history])


    const getPageContent = (slug) => {
        post('GetPagedetailsBySlug', { page: slug }, { headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` } })
            .then((res) => {
                if (res.status == true) {
                    setEditorState(res.data.page_content);
                    setPageName(res.data.page_name);
                    setPageId(res.data.id);
                }
            })
    }

    const submitNow = () => {
        let content;
        if (editorRef.current) {
            content = editorRef.current.getContent()
        }
        let a = {
            page_content: content,
            id: pageId,
            page_name: page_name
        };

        if (page_name == '') {
            showToastErr('Please Enter Page Name')
            return;
        }

        post('CreateContentPage', a, { headers: { "Authorization": `Bearer ${localStorage.getItem('access_token')}` } })
            .then((res) => {
                if (res.status == true) {
                    showToast(res.data.message);
                }
            })
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

    const showToastErr = (m) => {
        toast.error(m, {
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
                    <title>{slug?.params?.slug.toUpperCase()}</title>
                </MetaTags>
                <ToastContainer />
                <div className="container-fluid">
                    <Breadcrumbs maintitle="GIG-Economy" title="Terms & Conditions" />

                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <CardSubtitle className="mb-3">
                                        Write or Update Your {page_name}
                                    </CardSubtitle>

                                    <p>
                                        <Label for="exampleEmail"> Page Title:</Label>
                                        <Input type="text" name="page_title" value={page_name} onChange={(t) => setPageName(t.target.value)} />
                                    </p>
                                    <Editor
                                        onInit={(evt, editor) => editorRef.current = editor}
                                        initialValue={editorState}
                                        apiKey="g667v1p49tz7m7x0u9tsn7jo0gi1ngv1oc6c1nj2tqbldjdc"
                                        init={{
                                            height: 500,
                                            menubar: false,
                                            plugins: [
                                                'advlist autolink lists link image charmap print preview anchor',
                                                'searchreplace visualblocks code fullscreen',
                                                'insertdatetime media table paste code help wordcount'
                                            ],
                                            toolbar: 'undo redo | formatselect | ' +
                                                'bold italic backcolor | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'removeformat | help',
                                            content_style: 'body { fontFamily:Helvetica,Arial,sans-serif; fontSize:14px }'

                                        }}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <div style={{ 'textAlign': 'right' }}>
                        <button className="btn btn-danger" onClick={() => submitNow()}>Submit</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ContentPages;
