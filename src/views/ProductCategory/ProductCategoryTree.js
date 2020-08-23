import React, { Component } from 'react';
import RealmService from '../../api/RealmService';
import AuthenticationService from '../Common/AuthenticationService.js';
import getLabelText from '../../CommonComponent/getLabelText';
import i18n from '../../i18n';
import {
    Row, Card, CardBody, CardHeader,
    Label, Input, FormGroup,
    CardFooter, Button, Col, FormFeedback, Form, InputGroupAddon, InputGroupText, FormText, InputGroup
} from 'reactstrap';
import ProductCategoryService from '../../api/PoroductCategoryService';
import SortableTree, {
    getFlatDataFromTree,
    getTreeFromFlatData,
    getNodeAtPath, addNodeUnderParent, removeNodeAtPath, changeNodeAtPath
} from "react-sortable-tree";
import 'react-sortable-tree/style.css';
import { node } from 'prop-types';
import * as Yup from 'yup';
import { Formik } from "formik";
import AuthenticationServiceComponent from '../Common/AuthenticationServiceComponent';

let initialValues = {
    productCategory: ''
}

const validationSchema = function (values, t) {
    console.log("made by us schema--->", values)
    return Yup.object().shape({
        productCategory: Yup.string()
            .required("Product Category Name Is Required.")

    })
}

const validate = (getValidationSchema) => {

    return (values) => {
        const validationSchema = getValidationSchema(values)
        try {
            validationSchema.validateSync(values, { abortEarly: false })
            return {}
        } catch (error) {
            return getErrorsFromValidationError(error)
        }
    }
}

const getErrorsFromValidationError = (validationError) => {
    const FIRST_ERROR = 0
    return validationError.inner.reduce((errors, error) => {
        return {
            ...errors,
            [error.path]: error.errors[FIRST_ERROR],
        }
    }, {})
}

export default class ProductCategoryTree extends Component {

    constructor(props) {
        super(props);
        this.state = {
            realmList: [],
            realmId: '',
            productCategoryList: [],
            treeData: '',
            nodename: '',
            maxId: 0,
            message: '',
            duplicate: 0


        }
        this.getProductCategoryListByRealmId = this.getProductCategoryListByRealmId.bind(this);
        this.dataChange = this.dataChange.bind(this);
        this.addNewNode = this.addNewNode.bind(this);
        this.nodeNameChange = this.nodeNameChange.bind(this);
        this.disableNode = this.disableNode.bind(this);
        this.enableNode = this.enableNode.bind(this);
        this.getSortedFaltTreeData = this.getSortedFaltTreeData.bind(this);
        this.reSetTree = this.reSetTree.bind(this);
        this.setTreeData = this.setTreeData.bind(this);
        this.hideSecondComponent = this.hideSecondComponent.bind(this);
    }

    setTreeData(treeData) {
        console.log("treeData----->", treeData);
    }
    hideSecondComponent() {
        document.getElementById('div2').style.display = 'block';
        setTimeout(function () {
            document.getElementById('div2').style.display = 'none';
        }, 8000);
    }

    componentDidMount() {
        AuthenticationService.setupAxiosInterceptors();
        RealmService.getRealmListAll()
            .then(response => {
                if (response.status == 200) {
                    this.setState({
                        realmList: response.data
                    })
                } else {
                    this.setState({
                        message: response.data.messageCode
                    })
                    this.hideSecondComponent();
                }
            }).catch(
                error => {
                    if (error.message === "Network Error") {
                        this.setState({ message: error.message });
                        this.hideSecondComponent();
                    } else {
                        switch (error.response.status) {
                            case 500:
                            case 401:
                            case 404:
                            case 406:
                            case 412:
                                this.setState({ message: error.response.data.messageCode });
                                this.hideSecondComponent();
                                break;
                            default:
                                this.setState({ message: 'static.unkownError' });
                                this.hideSecondComponent();
                                console.log("Error code unkown");
                                break;
                        }
                    }
                }
            );

    }
    dataChange(event) {
        if (event.target.name === "realmId") {
            this.state.realmId = event.target.value;
        }
    };
    nodeNameChange(event) {
        this.setState({ nodename: event.target.value });
    }
    getProductCategoryListByRealmId() {
        let realmId = document.getElementById("realmId").value;
        if (realmId == 0) {
            this.setState({
                message: i18n.t('static.common.realmtext'),
                color: 'red',
                productCategoryList: []
            });
            this.hideSecondComponent();
            document.getElementById("treeDiv").style.display = "none";

        } else {
            this.setState({
                message: '',
            });
            AuthenticationService.setupAxiosInterceptors();
            ProductCategoryService.getProductCategoryListByRealmId(this.state.realmId)
                .then(response => {
                    if (response.status == 200) {
                        this.setState({
                            productCategoryList: response.data
                        });

                        var treeData = getTreeFromFlatData({
                            flatData: this.state.productCategoryList.map(
                                node => ({ ...node, title: node.payload.label.label_en, name: node.payload.label.label_en, expanded: node.payload.expanded, isNew: false })),
                            getKey: node => node.id, // resolve a node's key
                            getParentKey: node => node.parentId, // resolve a node's parent's key
                            rootKey: null // The value of the parent key when there is no parent (i.e., at root level)
                        });

                        this.state.productCategoryList.map(item => {
                            if (item.id > this.state.maxId) {
                                this.setState({ maxId: item.id })
                            }

                        });
                        console.log("treeData------>", treeData);

                        this.setState({ treeData: treeData });
                        document.getElementById("treeDiv").style.display = "block";
                    } else {
                        this.setState({
                            message: response.data.messageCode
                        })
                        this.hideSecondComponent();
                    }
                }).catch(
                    error => {
                        if (error.message === "Network Error") {
                            this.setState({ message: error.message });
                            this.hideSecondComponent();
                        } else {
                            switch (error.response ? error.response.status : "") {
                                case 500:
                                case 401:
                                case 404:
                                case 406:
                                case 412:
                                    this.setState({ message: error.response.data.messageCode });
                                    this.hideSecondComponent();
                                    break;
                                default:
                                    this.setState({ message: 'static.unkownError' });
                                    this.hideSecondComponent();
                                    console.log("Error code unkown");
                                    break;
                            }
                        }
                    }
                );
        }


    }
    addNewNode() {
        let children = this.state.treeData[0].children;
        let duplicate = 0;
        console.log("children--------->", children);
        for (let i = 0; i < children.length; i++) {
            if (this.state.nodename.localeCompare(children[i].payload.label.label_en) == 0) {//same
                // console.log("Children Duplicate");
                duplicate = 1;
            }
        }
        if (duplicate == 0) {//not duplicate found

            let currentMaxId = this.state.maxId + 1;
            const addNode = {
                id: currentMaxId,
                parentId: 1,
                payload: {
                    active: true,
                    productCategoryId: 0,
                    realm: {
                        id: this.state.realmId
                    },
                    label: {
                        label_en: this.state.nodename
                    },
                    expanded: true
                },
                isNew: true
            };

            var newNode = addNodeUnderParent({
                treeData: this.state.treeData,
                parentKey: 1,
                newNode: { ...addNode, title: addNode.payload.label.label_en },
                getNodeKey: ({ node }) => node.id
            })
            this.setState({ treeData: newNode.treeData, maxId: currentMaxId, nodename: '' });
        } else {//duplicate found
            this.setState({
                message: 'Duplicate Product Category Name Found',
                color: 'red'
            })
            this.hideSecondComponent();
        }
        this.setState({
            duplicate: duplicate
        })

    }
    disableNode(rowInfo) {
        // console.log("disable node row info---->", rowInfo);
        const changeNode = {
            id: rowInfo.node.id,
            parentId: rowInfo.parentNode.id,
            payload: {
                label: {
                    label_en: rowInfo.node.payload.label.label_en
                },
                realm: {
                    id: this.state.realmId
                },
                active: false,
                expanded: rowInfo.node.payload.expanded,
                productCategoryId: rowInfo.node.payload.productCategoryId
            },
            expanded: rowInfo.node.payload.expanded,
            children: rowInfo.node.children,
            isNew: rowInfo.node.isNew
        };
        var disabledNode = changeNodeAtPath({
            treeData: this.state.treeData,
            path: rowInfo.path,
            newNode: { ...changeNode, title: changeNode.payload.label.label_en },
            getNodeKey: ({ node }) => node.id
        });
        this.setState({ treeData: disabledNode });
        // console.log("disabledNode--->", disabledNode);
        let disableChideNodes = getFlatDataFromTree({
            treeData: disabledNode,
            getNodeKey: ({ node }) => node.id,
            ignoreCollapsed: false
        });
        // console.log("before--->", disableChideNodes)
        var disabledChildNode = disabledNode;

        var currentDisabledNodeId = '';
        disableChideNodes.map(disableNodeInfo => {
            if (disableNodeInfo.parentNode != null && disableNodeInfo.parentNode.id == rowInfo.node.id) {
                const changeNode = {
                    id: disableNodeInfo.node.id,
                    payload: {
                        label: {
                            label_en: disableNodeInfo.node.payload.label.label_en
                        },
                        realm: {
                            id: this.state.realmId
                        },
                        active: false,
                        expanded: disableNodeInfo.node.payload.expanded,
                        productCategoryId: disableNodeInfo.node.payload.productCategoryId
                    },
                    expanded: disableNodeInfo.node.payload.expanded,
                    children: disableNodeInfo.node.children,
                    isNew: disableNodeInfo.node.isNew
                };

                disabledChildNode = changeNodeAtPath({
                    treeData: disabledChildNode,
                    path: disableNodeInfo.path,
                    newNode: { ...changeNode, title: changeNode.payload.label.label_en },
                    getNodeKey: ({ node }) => node.id
                });
                this.setState({ treeData: disabledChildNode });
                currentDisabledNodeId = disableNodeInfo.node.id;

                disableChideNodes.map(disableNodeInfo => {
                    if (disableNodeInfo.parentNode != null && disableNodeInfo.parentNode.id == currentDisabledNodeId) {
                        const changeNode = {
                            id: disableNodeInfo.node.id,
                            payload: {
                                label: {
                                    label_en: disableNodeInfo.node.payload.label.label_en
                                },
                                realm: {
                                    id: this.state.realmId
                                },
                                active: false,
                                expanded: disableNodeInfo.node.payload.expanded,
                                productCategoryId: disableNodeInfo.node.payload.productCategoryId
                            },
                            expanded: disableNodeInfo.node.payload.expanded,
                            children: disableNodeInfo.node.children,
                            isNew: disableNodeInfo.node.isNew
                        };
                        disabledChildNode = changeNodeAtPath({
                            treeData: disabledChildNode,
                            path: disableNodeInfo.path,
                            newNode: { ...changeNode, title: changeNode.payload.label.label_en },
                            getNodeKey: ({ node }) => node.id
                        });
                        this.setState({ treeData: disabledChildNode });
                        currentDisabledNodeId = disableNodeInfo.node.id;
                    }
                }
                )

            }

        }
        )
    }
    enableNode(rowInfo) {
        if (rowInfo.parentNode.payload.active == true) {
            const changeNode = {
                id: rowInfo.node.id,
                payload: {
                    label: {
                        label_en: rowInfo.node.payload.label.label_en
                    },
                    active: true,
                    expanded: rowInfo.node.expanded,
                    productCategoryId: rowInfo.node.payload.productCategoryId
                },
                expanded: rowInfo.node.expanded,
                children: rowInfo.node.children,
                isNew: rowInfo.node.isNew
            };
            var enabledNode = changeNodeAtPath({
                treeData: this.state.treeData,
                path: rowInfo.path,
                newNode: { ...changeNode, title: changeNode.payload.label.label_en },
                getNodeKey: ({ node }) => node.id
            });
            this.setState({ treeData: enabledNode, message: '' });
        } else {
            this.setState({ message: 'Sorry The Parent Is Disabled !' });
            this.hideSecondComponent();
        }

    }
    getSortedFaltTreeData() {
        let unsortedFlatTreeData = getFlatDataFromTree({
            treeData: this.state.treeData,
            getNodeKey: ({ node }) => node.id,
            ignoreCollapsed: false
        });
        var submitJson = []
        unsortedFlatTreeData.map(node => {
            var json = {
                "id": node.node.id,
                "parentId": node.parentNode == null ? null : node.parentNode.id,
                "payload": {
                    "active": node.node.payload.active,
                    "productCategoryId": node.node.payload.productCategoryId,
                    "realm": {
                        "id": this.state.realmId
                    },
                    "label": {
                        "label_en": node.node.payload.label.label_en
                    }
                }
            }
            submitJson.push(json);
        }
        )
        console.log("submit json---->", submitJson);
        console.log("submit json---->", JSON.stringify(submitJson));
        ProductCategoryService.addProductCategory(submitJson)
            .then(response => {
                if (response.status == 200) {
                    // console.log("success-------------------------.");
                    // this.props.history.push(`/dashboard/` + i18n.t('static.productCategory.success'))
                    // this.props.history.push(`/dashboard/` + 'green/' + i18n.t('static.productCategory.success'))
                    this.props.history.push(`/productCategory/productCategoryTree/` + 'green/' + i18n.t('static.productCategory.success'))
                    this.setState({
                        message: i18n.t('static.productCategory.success'),
                        color: 'green'
                    })
                    this.hideSecondComponent();
                } else {
                    this.setState({
                        message: response.data.messageCode
                    })
                    this.hideSecondComponent();
                }
            })
            .catch(
                error => {
                    if (error.message === "Network Error") {
                        this.setState({ message: error.message });
                        this.hideSecondComponent();
                    } else {
                        switch (error.response ? error.response.status : "") {
                            case 500:
                            case 401:
                            case 404:
                            case 406:
                            case 412:
                                this.setState({ message: error.response.data.messageCode });
                                this.hideSecondComponent();
                                break;
                            default:
                                this.setState({ message: 'static.unkownError' });
                                this.hideSecondComponent();
                                break;
                        }
                    }
                }
            );


    }
    reSetTree() {
        this.setState({ nodename: '' });
        this.getProductCategoryListByRealmId();
    }
    touchAll(errors) {
        this.validateForm(errors);
    }
    validateForm(errors) {
        this.findFirstError('productCategoryForm', (fieldName) => {
            return Boolean(errors[fieldName])
        })
    }
    findFirstError(formName, hasError) {
        const form = document.forms[formName]
        for (let i = 0; i < form.length; i++) {
            if (hasError(form[i].name)) {
                form[i].focus()
                break
            }
        }
    }
    render() {
        const { realmList } = this.state;
        let realms = realmList.length > 0
            && realmList.map((item, i) => {
                return (
                    <option key={i} value={item.realmId}>
                        {getLabelText(item.label, this.state.lang)}
                    </option>
                )
            }, this);

        return (
            <div className="animated fadeIn">
                <h5 id="div2" className={this.state.color}>{this.state.message}</h5>
                <Row>
                    <Col sm={12} md={12} style={{ flexBasis: 'auto' }}>
                        <Card className="mb-lg-0">
                            {/* <CardHeader className="pb-lg-1">
                                <strong>Product Category</strong>
                            </CardHeader> */}
                            <CardBody className="pb-lg-0 pt-lg-1">
                                <Col md="3 pl-0" >
                                    <FormGroup>
                                        <Label htmlFor="select">{i18n.t('static.program.realm')}</Label>
                                        <div className="controls ">
                                            <InputGroup>
                                                <Input
                                                    bsSize="sm"
                                                    onChange={(e) => { this.dataChange(e) }}
                                                    type="select" name="realmId" id="realmId"
                                                // onChange={this.getProductCategoryListByRealmId}
                                                >
                                                    <option value="0">{i18n.t('static.common.select')}</option>
                                                    {realms}
                                                </Input>
                                                <InputGroupAddon addonType="append">
                                                    <Button color="secondary Gobtn btn-sm" onClick={this.getProductCategoryListByRealmId}>{i18n.t('static.common.go')}</Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row id="treeDiv" style={{ display: "none" }}>
                    <Col sm={12} md={12} style={{ flexBasis: 'auto' }}>
                        <Card>
                            <CardBody>
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={initialValues}
                                    validate={validate(validationSchema)}
                                    onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
                                        this.addNewNode();
                                        if (this.state.duplicate == 1) {

                                        } else {
                                            resetForm({ productCategory: '' });
                                        }

                                    }}
                                    render={
                                        ({
                                            values,
                                            errors,
                                            touched,
                                            handleChange,
                                            handleBlur,
                                            handleSubmit,
                                            isSubmitting,
                                            isValid,
                                            setTouched,
                                            handleReset
                                        }) => (
                                                <Form onSubmit={handleSubmit} className="needs-validation" onReset={handleReset} noValidate name='productCategoryForm'>
                                                    <FormGroup>
                                                        {AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_MANAGE_PRODUCT_CATEGORY') &&
                                                            <Row>
                                                                <Col md={4} className="pr-lg-1">
                                                                    <Label for="product category">{i18n.t('static.productCategory.productCategoryName')}<span class="red Reqasterisk">*</span></Label>
                                                                    <Input
                                                                        type="text"
                                                                        value={this.state.nodename}
                                                                        bsSize="sm"
                                                                        valid={!errors.productCategory && this.state.nodename != ''}
                                                                        invalid={touched.productCategory && !!errors.productCategory}
                                                                        onChange={event => { handleChange(event); this.nodeNameChange(event) }}
                                                                        onBlur={handleBlur}
                                                                        name="productCategory" />
                                                                    <FormFeedback className="red">{errors.productCategory}</FormFeedback>
                                                                </Col>
                                                                <Col className="pl-lg-0" md={2} style={{ paddingTop: '27px' }}>
                                                                    <Button className="text-white" type="submit" size="sm" color="success" onClick={() => this.touchAll(errors)}><i className="fa fa-plus"></i> Add</Button>
                                                                </Col>
                                                            </Row>}
                                                    </FormGroup>
                                                    {AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_MANAGE_PRODUCT_CATEGORY') &&
                                                        // <CardFooter>
                                                        <FormGroup className="mr-4">
                                                            <Button type="reset" size="md" color="warning" className="float-right mr-1 text-white" onClick={this.reSetTree}><i className="fa fa-refresh"></i> {i18n.t('static.common.reset')}</Button>
                                                            <Button type="button" size="md" color="success" className="float-right mr-1" onClick={this.getSortedFaltTreeData}><i className="fa fa-check"></i>{i18n.t('static.common.submit')}</Button>
                                                        </ FormGroup>
                                                        // </CardFooter>
                                                    }
                                                </Form>
                                            )} />
                                <FormGroup>
                                    <Label for="product category">{i18n.t('static.productCategory.productCategoryTree')}</Label>
                                    <div style={{ height: 450 }}>
                                        <SortableTree
                                            getNodeKey={({ node }) => node.id}
                                            treeData={this.state.treeData}
                                            generateNodeProps={rowInfo => {
                                                // console.log(rowInfo);
                                                // if (rowInfo.node.payload.active == true && (rowInfo.parentNode != null && rowInfo.parentNode.id != 1)) {
                                                if (rowInfo.node.payload.active == true && (rowInfo.parentNode != null)) {
                                                    let nodeprops = {
                                                        buttons: [
                                                            <div>

                                                                <a style={{ color: 'red' }} href="javascript:void();" title="Disable Product Category" onClick={(event) => this.disableNode(rowInfo)} ><i className="fa fa-times"></i></a>
                                                            </div>,
                                                        ],
                                                        style: {
                                                            height: '35px'
                                                        }

                                                    }
                                                    return nodeprops;
                                                }
                                                // else if (rowInfo.node.payload.active == false && (rowInfo.parentNode != null && rowInfo.parentNode.id != 1)) {
                                                if (rowInfo.node.payload.active == false && (rowInfo.parentNode != null)) {
                                                    let nodeprops = {
                                                        buttons: [
                                                            <div>
                                                                <a style={{ color: '#4dbd74' }} href="javascript:void();" title="Enable Product Category" onClick={(event) => this.enableNode(rowInfo)}><i className="fa fa-check"></i></a>
                                                            </div>,
                                                        ],
                                                        style: {
                                                            height: '35px', color: '#ced5de'
                                                        }

                                                    }
                                                    return nodeprops;
                                                }
                                                // else if (rowInfo.node.isNew == false && (rowInfo.parentNode == null || rowInfo.parentNode.id == 1)) {
                                                else if (rowInfo.node.isNew == false && (rowInfo.parentNode == null)) {
                                                    let nodeprops = {
                                                        canDrag: false
                                                    }
                                                    return nodeprops;
                                                }
                                            }
                                            }
                                            onChange={treeData => this.setState({ treeData })}
                                        // onChange={treeData => this.setTreeData(treeData)}
                                        />

                                    </div>
                                </FormGroup>
                            </CardBody>
                            {/* {AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_MANAGE_PRODUCT_CATEGORY') &&
                                <CardFooter>
                                    <FormGroup>
                                        <Button type="reset" size="md" color="warning" className="float-right mr-1 text-white" onClick={this.reSetTree}><i className="fa fa-refresh"></i> {i18n.t('static.common.reset')}</Button>
                                        <Button type="button" size="md" color="success" className="float-right mr-1" onClick={this.getSortedFaltTreeData}><i className="fa fa-check"></i>{i18n.t('static.common.submit')}</Button>
                                    </ FormGroup>
                                </CardFooter>} */}
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}