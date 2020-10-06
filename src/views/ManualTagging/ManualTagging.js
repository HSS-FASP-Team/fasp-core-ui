// import React, { Component } from 'react';
// import AuthenticationService from '../Common/AuthenticationService.js';
// import CountryService from '../../api/CountryService.js';
// import { NavLink } from 'react-router-dom'
// import { Card, CardHeader, CardBody, FormGroup, Input, InputGroup, InputGroupAddon, Label, Button, Col, Row, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
// import BootstrapTable from 'react-bootstrap-table-next';
// import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
// import getLabelText from '../../CommonComponent/getLabelText';
// import filterFactory, { textFilter, selectFilter, multiSelectFilter } from 'react-bootstrap-table2-filter';
// import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
// import paginationFactory from 'react-bootstrap-table2-paginator'
// import AuthenticationServiceComponent from '../Common/AuthenticationServiceComponent'
// import { DATE_FORMAT_CAP } from '../../Constants.js';
// import moment from 'moment';

// import i18n from '../../i18n';
// import { boolean } from 'yup';
// import ProgramService from '../../api/ProgramService.js';
// import ManualTaggingService from '../../api/ManualTaggingService.js';
// import PlanningUnitService from '../../api/PlanningUnitService.js';



// const entityname = i18n.t('static.dashboard.manualTagging');
// export default class ManualTagging extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             message: '',
//             outputList: [],
//             loading: true,
//             programs: [],
//             planningUnits: [],
//             outputListAfterSearch: [],
//             artmisList: [],
//             shipmentId: '',
//             reason: "1"
//         }
//         this.addNewCountry = this.addNewCountry.bind(this);
//         this.editCountry = this.editCountry.bind(this);
//         this.filterData = this.filterData.bind(this);
//         this.formatLabel = this.formatLabel.bind(this);
//         this.hideFirstComponent = this.hideFirstComponent.bind(this);
//         this.hideSecondComponent = this.hideSecondComponent.bind(this);
//         this.getPlanningUnitList = this.getPlanningUnitList.bind(this);
//         this.getOrderDetails = this.getOrderDetails.bind(this);
//         this.link = this.link.bind(this);
//         this.getProgramList = this.getProgramList.bind(this);
//     }
//     link() {
//         var orderNo = document.getElementById("orderNo").value;
//         var primeLineNo = document.getElementById("primeLineNo").value;

//         ManualTaggingService.linkShipmentWithARTMIS(orderNo, primeLineNo, this.state.shipmentId)
//             .then(response => {
//                 console.log("link response===", response);
//                 this.toggleLarge();
//                 this.filterData();
//             })
//     }
//     getOrderDetails() {
//         var programId = document.getElementById("programId").value;
//         var planningUnitId = document.getElementById("planningUnitId").value;
//         var orderNo = document.getElementById("orderNo").value;
//         var primeLineNo = document.getElementById("primeLineNo").value;
//         ManualTaggingService.getOrderDetailsByOrderNoAndPrimeLineNo(programId, planningUnitId, orderNo, primeLineNo)
//             .then(response => {
//                 console.log("artmis response===", response.data);
//                 var artmisList = [];
//                 artmisList.push(response.data);
//                 console.log("--------->>", response.data);
//                 // console.log("--------->",response.data[0].reason);
//                 this.setState({
//                     reason: response.data.reason,
//                     artmisList
//                 })
//             })
//     }
//     hideFirstComponent() {
//         this.timeout = setTimeout(function () {
//             document.getElementById('div1').style.display = 'none';
//         }, 8000);
//     }
//     componentWillUnmount() {
//         clearTimeout(this.timeout);
//     }

//     hideSecondComponent() {
//         setTimeout(function () {
//             document.getElementById('div2').style.display = 'none';
//         }, 8000);
//     }

//     filterData() {
//         var programId = document.getElementById("programId").value;
//         var planningUnitId = document.getElementById("planningUnitId").value;
//         ManualTaggingService.getShipmentListForManualTagging(programId, planningUnitId)
//             .then(response => {
//                 console.log("manual tagging response===", response);
//                 this.setState({
//                     outputList: response.data
//                 })
//             })
//     }


//     addNewCountry() {
//         if (navigator.onLine) {
//             this.props.history.push(`/country/addCountry`)
//         } else {
//             alert("You must be Online.")
//         }

//     }
//     editCountry(country) {
//         if (AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_MANAGE_COUNTRY')) {
//             console.log(country);
//             this.props.history.push({
//                 pathname: `/country/editCountry/${country.countryId}`,
//                 // state: { country: country }
//             });
//         }
//     }
//     getProgramList() {
//         ProgramService.getProgramList()
//             .then(response => {
//                 if (response.status == 200) {
//                     this.setState({
//                         programs: response.data
//                     })
//                 }
//                 else {

//                     this.setState({
//                         message: response.data.messageCode
//                     },
//                         () => {
//                             this.hideSecondComponent();
//                         })
//                 }
//             })
//     }
//     componentDidMount() {
//         this.hideFirstComponent();
//         this.getProgramList();
//         // .catch(
//         //     error => {
//         //         if (error.message === "Network Error") {
//         //             this.setState({ message: error.message });
//         //         } else {
//         //             switch (error.response ? error.response.status : "") {
//         //                 case 500:
//         //                 case 401:
//         //                 case 404:
//         //                 case 406:
//         //                 case 412:
//         //                     this.setState({ message: error.response.data.messageCode });
//         //                     break;
//         //                 default:
//         //                     this.setState({ message: 'static.unkownError' });
//         //                     break;
//         //             }
//         //         }
//         //     }
//         // );

//     }

//     getPlanningUnitList() {
//         var programId = document.getElementById("programId").value;
//         ProgramService.getProgramPlaningUnitListByProgramId(programId)
//             .then(response => {
//                 if (response.status == 200) {
//                     this.setState({
//                         planningUnits: response.data
//                     })
//                 }
//                 else {

//                     this.setState({
//                         message: response.data.messageCode
//                     },
//                         () => {
//                             this.hideSecondComponent();
//                         })
//                 }
//             })
//     }

//     formatLabel(cell, row) {
//         return getLabelText(cell, this.state.lang);
//     }

//     toggleLarge() {
//         this.setState({
//             artmisList: [],
//             reason : "1",
//             manualTag: !this.state.manualTag,
//         })
//     }

//     addCommas(cell, row) {
//         console.log("row---------->", row);
//         cell += '';
//         var x = cell.split('.');
//         var x1 = x[0];
//         var x2 = x.length > 1 ? '.' + x[1] : '';
//         var rgx = /(\d+)(\d{3})/;
//         while (rgx.test(x1)) {
//             x1 = x1.replace(rgx, '$1' + ',' + '$2');
//         }
//         return x1 + x2;
//     }

//     formatDate(cell, row) {
//         if (cell != null && cell != "") {
//             var modifiedDate = moment(cell).format(`${DATE_FORMAT_CAP}`);
//             return modifiedDate;
//         } else {
//             return "";
//         }
//     }

//     render() {
//         const { programs } = this.state;
//         let programList = programs.length > 0 && programs.map((item, i) => {
//             return (
//                 <option key={i} value={item.programId}>
//                     {getLabelText(item.label, this.state.lang)}
//                 </option>
//             )
//         }, this);

//         const { planningUnits } = this.state;
//         let planningUnitList = planningUnits.length > 0 && planningUnits.map((item, i) => {
//             return (
//                 <option key={i} value={item.planningUnit.id}>
//                     {getLabelText(item.planningUnit.label, this.state.lang)}
//                 </option>
//             )
//         }, this);

//         const { SearchBar, ClearSearchButton } = Search;
//         const customTotal = (from, to, size) => (
//             <span className="react-bootstrap-table-pagination-total">
//                 {i18n.t('static.common.result', { from, to, size })}
//             </span>
//         );

//         const columns = [
//             {
//                 dataField: 'shipmentId',
//                 text: 'Shipment Id',
//                 sort: true,
//                 align: 'center',
//                 headerAlign: 'center',
//             },
//             {
//                 dataField: 'shipmentTransId',
//                 hidden: true,
//             },
//             {
//                 dataField: 'expectedDeliveryDate',
//                 text: 'Expected Delivery Date',
//                 sort: true,
//                 align: 'center',
//                 headerAlign: 'center',
//                 formatter: this.formatDate
//             },
//             {
//                 dataField: 'shipmentStatus.label.label_en',
//                 text: 'Shipment Status',
//                 sort: true,
//                 align: 'center',
//                 headerAlign: 'center',
//                 // formatter: this.formatLabel
//             }, {
//                 dataField: 'procurementAgent.code',
//                 text: 'Procurement Agent',
//                 sort: true,
//                 align: 'center',
//                 headerAlign: 'center',
//                 // formatter: this.formatLabel
//             },
//             {
//                 dataField: 'budget.label.label_en',
//                 text: 'Budget',
//                 sort: true,
//                 align: 'center',
//                 headerAlign: 'center',
//                 // formatter: this.formatLabel
//             },
//             {
//                 dataField: 'shipmentQty',
//                 text: 'Shipment Quantity',
//                 sort: true,
//                 align: 'center',
//                 headerAlign: 'center',
//                 formatter: this.addCommas
//             },
//             {
//                 dataField: 'fundingSource.label.label_en',
//                 text: 'Funding Source',
//                 sort: true,
//                 align: 'center',
//                 headerAlign: 'center'
//             }
//         ];

//         const columns1 = [
//             {
//                 dataField: 'roNo',
//                 text: 'RO No.',
//                 sort: true,
//                 align: 'center',
//                 headerAlign: 'center'
//             },
//             {
//                 dataField: 'roPrimeLineNo',
//                 text: 'RO Prime Line No.',
//                 sort: true,
//                 align: 'center',
//                 headerAlign: 'center',
//                 // formatter: this.formatLabel
//             }, {
//                 dataField: 'orderType',
//                 text: 'Order Type',
//                 sort: true,
//                 align: 'center',
//                 headerAlign: 'center',
//                 // formatter: this.formatLabel
//             },
//             {
//                 dataField: 'planningUnitSkuCode',
//                 text: 'Planning Unit SKU Code',
//                 sort: true,
//                 align: 'center',
//                 headerAlign: 'center',
//                 // formatter: this.formatLabel
//             },
//             {
//                 dataField: 'procurementUnitSkuCode',
//                 text: 'Procurement Unit SKU Code',
//                 sort: true,
//                 align: 'center',
//                 headerAlign: 'center'
//             },
//             {
//                 dataField: 'quantity',
//                 text: 'Quantity',
//                 sort: true,
//                 align: 'center',
//                 headerAlign: 'center',
//                 formatter: this.addCommas
//             },
//             {
//                 dataField: 'currentEstimatedDeliveryDate',
//                 text: 'Current Estimated Delivery Date',
//                 sort: true,
//                 align: 'center',
//                 headerAlign: 'center',
//                 formatter: this.formatDate
//             },
//             {
//                 dataField: 'supplierName',
//                 text: 'Supplier Name',
//                 sort: true,
//                 align: 'center',
//                 headerAlign: 'center'
//             },
//             {
//                 dataField: 'price',
//                 text: 'Price',
//                 sort: true,
//                 align: 'center',
//                 headerAlign: 'center',
//                 formatter: this.addCommas
//             },
//             {
//                 dataField: 'shippingCost',
//                 text: 'Shipping Cost',
//                 sort: true,
//                 align: 'center',
//                 headerAlign: 'center',
//                 formatter: this.addCommas
//             },
//             {
//                 dataField: 'status',
//                 text: 'Status',
//                 sort: true,
//                 align: 'center',
//                 headerAlign: 'center'
//             }
//         ];
//         const options = {
//             hidePageListOnlyOnePage: true,
//             firstPageText: i18n.t('static.common.first'),
//             prePageText: i18n.t('static.common.back'),
//             nextPageText: i18n.t('static.common.next'),
//             lastPageText: i18n.t('static.common.last'),
//             nextPageTitle: i18n.t('static.common.firstPage'),
//             prePageTitle: i18n.t('static.common.prevPage'),
//             firstPageTitle: i18n.t('static.common.nextPage'),
//             lastPageTitle: i18n.t('static.common.lastPage'),
//             showTotal: true,
//             paginationTotalRenderer: customTotal,
//             disablePageTitle: true,
//             sizePerPageList: [{
//                 text: '10', value: 10
//             }, {
//                 text: '30', value: 30
//             }
//                 ,
//             {
//                 text: '50', value: 50
//             },
//             {
//                 text: 'All', value: this.state.outputList.length
//             }]
//         }
//         return (
//             <div className="animated">
//                 <AuthenticationServiceComponent history={this.props.history} message={(message) => {
//                     this.setState({ message: message })
//                 }} />
//                 <h5 className={this.props.match.params.color} id="div1">{i18n.t(this.props.match.params.message, { entityname })}</h5>
//                 <h5 style={{ color: "red" }} id="div2">{i18n.t(this.state.message, { entityname })}</h5>
//                 {/* <Card style={{ display: this.state.loading ? "none" : "block" }}> */}
//                 <Card >
//                     <CardBody className="">
//                         <Col md="12 pl-0">
//                             <div className="d-md-flex">
//                                 <FormGroup className="col-md-3 pl-0">
//                                     <Label htmlFor="appendedInputButton">{i18n.t('static.inventory.program')}</Label>
//                                     <div className="controls ">
//                                         <InputGroup>
//                                             <Input
//                                                 type="select"
//                                                 name="programId"
//                                                 id="programId"
//                                                 bsSize="sm"
//                                                 onChange={this.getPlanningUnitList}
//                                             >
//                                                 <option value="">{i18n.t('static.common.select')}</option>
//                                                 {programList}
//                                             </Input>
//                                         </InputGroup>
//                                     </div>
//                                 </FormGroup>
//                                 <FormGroup className="col-md-3">
//                                     <Label htmlFor="appendedInputButton">Planning Unit</Label>
//                                     <div className="controls ">
//                                         <InputGroup>
//                                             <Input
//                                                 type="select"
//                                                 name="planningUnitId"
//                                                 id="planningUnitId"
//                                                 bsSize="sm"
//                                                 onChange={this.filterData}
//                                             >
//                                                 <option value="">{i18n.t('static.common.select')}</option>
//                                                 {planningUnitList}

//                                             </Input>
//                                             {/* <InputGroupAddon addonType="append">
//                                                                         <Button color="secondary Gobtn btn-sm" onClick={this.formSubmit}>{i18n.t('static.common.go')}</Button>
//                                                                     </InputGroupAddon> */}
//                                         </InputGroup>
//                                     </div>
//                                 </FormGroup>
//                             </div>
//                         </Col>

//                         <ToolkitProvider
//                             keyField="countryId"
//                             data={this.state.outputList}
//                             columns={columns}
//                             search={{ searchFormatted: true }}
//                             hover
//                             filter={filterFactory()}
//                         >
//                             {
//                                 props => (
//                                     <div className="TableCust">
//                                         <div className="col-md-6 pr-0 offset-md-6 text-right mob-Left">
//                                             <SearchBar {...props.searchProps} />
//                                             <ClearSearchButton {...props.searchProps} />
//                                         </div>
//                                         <BootstrapTable hover striped noDataIndication={i18n.t('static.common.noData')} tabIndexCell
//                                             pagination={paginationFactory(options)}
//                                             rowEvents={{
//                                                 onClick: (e, row, rowIndex) => {

//                                                     var outputListAfterSearch = [];
//                                                     outputListAfterSearch.push(row);

//                                                     this.setState({
//                                                         shipmentId: row.shipmentId,
//                                                         outputListAfterSearch
//                                                     })
//                                                     this.toggleLarge();
//                                                 }
//                                             }}
//                                             {...props.baseProps}
//                                         />
//                                     </div>
//                                 )
//                             }
//                         </ToolkitProvider>

//                         {/* Consumption modal */}
//                         <Modal isOpen={this.state.manualTag}
//                             className={'modal-lg ' + this.props.className, "modalWidth"}>
//                             <ModalHeader toggle={() => this.toggleLarge()} className="modalHeaderSupplyPlan">
//                                 <strong>Search ERP Orders</strong>
//                             </ModalHeader>
//                             <ModalBody>
//                                 <Col md="12 pl-0">
//                                     <div className="d-md-flex">
//                                         <FormGroup className="col-md-3 pl-0">
//                                             <Label htmlFor="appendedInputButton">Order No</Label>
//                                             <div className="controls ">
//                                                 <InputGroup>
//                                                     <Input
//                                                         type="text"
//                                                         name="orderNo"
//                                                         id="orderNo"
//                                                         bsSize="sm"
//                                                     >
//                                                     </Input>
//                                                 </InputGroup>
//                                             </div>
//                                         </FormGroup>
//                                         <FormGroup className="col-md-3">
//                                             <Label htmlFor="appendedInputButton">Prime Line No</Label>
//                                             <div className="controls ">
//                                                 <InputGroup>
//                                                     <Input
//                                                         type="text"
//                                                         name="primeLineNo"
//                                                         id="primeLineNo"
//                                                         bsSize="sm"
//                                                     >
//                                                     </Input>
//                                                     <InputGroupAddon addonType="append">
//                                                         <Button color="secondary Gobtn btn-sm" onClick={this.getOrderDetails}>{i18n.t('static.common.go')}</Button>
//                                                     </InputGroupAddon>
//                                                 </InputGroup>
//                                             </div>
//                                         </FormGroup>
//                                     </div>
//                                 </Col>
//                                 <div>
//                                     <ToolkitProvider
//                                         keyField="optList"
//                                         data={this.state.artmisList}
//                                         columns={columns1}
//                                         search={{ searchFormatted: true }}
//                                         hover
//                                         filter={filterFactory()}
//                                     >
//                                         {
//                                             props => (
//                                                 <div className="TableCust">

//                                                     <BootstrapTable hover striped noDataIndication={i18n.t('static.common.noData')} tabIndexCell

//                                                         rowEvents={{
//                                                         }}
//                                                         {...props.baseProps}
//                                                     />
//                                                 </div>
//                                             )
//                                         }
//                                     </ToolkitProvider>
//                                 </div><br />
//                                 <div>
//                                     <ToolkitProvider
//                                         keyField="optList"
//                                         data={this.state.outputListAfterSearch}
//                                         columns={columns}
//                                         search={{ searchFormatted: true }}
//                                         hover
//                                         filter={filterFactory()}
//                                     >
//                                         {
//                                             props => (
//                                                 <div className="TableCust">
//                                                     {/* <div className="col-md-6 pr-0 offset-md-6 text-right mob-Left">
//                                                     <SearchBar {...props.searchProps} />
//                                                     <ClearSearchButton {...props.searchProps} />
//                                                 </div> */}
//                                                     <BootstrapTable hover striped noDataIndication={i18n.t('static.common.noData')} tabIndexCell
//                                                         // pagination={paginationFactory(options)}
//                                                         rowEvents={{
//                                                         }}
//                                                         {...props.baseProps}
//                                                     />
//                                                 </div>
//                                             )
//                                         }
//                                     </ToolkitProvider>
//                                 </div>
//                                 {this.state.reason != "" && this.state.reason != 1 &&  <div style={{color:'red'}}>Note : {this.state.reason}</div>}
//                             </ModalBody>
//                             <ModalFooter>
//                                 {this.state.reason == "" &&
//                                     <Button type="submit" size="md" color="success" className="submitBtn float-right mr-1" onClick={this.link}> <i className="fa fa-check"></i> Link</Button>
//                                 }
//                                 <Button size="md" color="danger" className="submitBtn float-right mr-1" onClick={() => this.toggleLarge()}> <i className="fa fa-times"></i> {i18n.t('static.common.cancel')}</Button>
//                             </ModalFooter>
//                         </Modal>
//                         {/* Consumption modal */}
//                     </CardBody>
//                 </Card>
//                 {/* <div style={{ display: this.state.loading ? "block" : "none" }}>
//                     <div className="d-flex align-items-center justify-content-center" style={{ height: "500px" }} >
//                         <div class="align-items-center">
//                             <div ><h4> <strong>Loading...</strong></h4></div>

//                             <div class="spinner-border blue ml-4" role="status">

//                             </div>
//                         </div>
//                     </div>
//                 </div> */}
//             </div>
//         );
//     }

// }

import React, { Component } from 'react';
import AuthenticationService from '../Common/AuthenticationService.js';
import CountryService from '../../api/CountryService.js';
import { NavLink } from 'react-router-dom'
import { Card, CardHeader, CardBody, FormGroup, Input, InputGroup, InputGroupAddon, Label, Button, Col, Row, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import getLabelText from '../../CommonComponent/getLabelText';
import filterFactory, { textFilter, selectFilter, multiSelectFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator'
import AuthenticationServiceComponent from '../Common/AuthenticationServiceComponent'
import { DATE_FORMAT_CAP } from '../../Constants.js';
import moment from 'moment';

import i18n from '../../i18n';
import { boolean } from 'yup';
import ProgramService from '../../api/ProgramService.js';
import ManualTaggingService from '../../api/ManualTaggingService.js';
import PlanningUnitService from '../../api/PlanningUnitService.js';
import jexcel from 'jexcel';
import "../../../node_modules/jexcel/dist/jexcel.css";
import { jExcelLoadedFunction, jExcelLoadedFunctionOnlyHideRow } from '../../CommonComponent/JExcelCommonFunctions.js'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css



const entityname = i18n.t('static.dashboard.manualTagging');
export default class ManualTagging extends Component {

    constructor(props) {
        super(props);
        this.state = {
            result: '',
            message: '',
            outputList: [],
            loading: true,
            programs: [],
            planningUnits: [],
            outputListAfterSearch: [],
            artmisList: [],
            shipmentId: '',
            reason: "1",
            haslinked: false
        }
        this.addNewCountry = this.addNewCountry.bind(this);
        this.editCountry = this.editCountry.bind(this);
        this.filterData = this.filterData.bind(this);
        this.formatLabel = this.formatLabel.bind(this);
        this.hideFirstComponent = this.hideFirstComponent.bind(this);
        this.hideSecondComponent = this.hideSecondComponent.bind(this);
        this.getPlanningUnitList = this.getPlanningUnitList.bind(this);
        this.getOrderDetails = this.getOrderDetails.bind(this);
        this.link = this.link.bind(this);
        this.getProgramList = this.getProgramList.bind(this);
        this.buildJExcel = this.buildJExcel.bind(this);
    }
    link() {
        var orderNo = document.getElementById("orderNo").value;
        var primeLineNo = document.getElementById("primeLineNo").value;
        this.setState({ loading: true })
        ManualTaggingService.linkShipmentWithARTMIS(orderNo, primeLineNo, this.state.shipmentId)
            .then(response => {
                this.setState({
                    message: i18n.t('static.shipment.linkingsuccess'),
                    color: 'green',
                    haslinked: true,
                    loading: false
                },
                    () => {
                        console.log(this.state.message, "success 1")
                        this.hideSecondComponent();
                        document.getElementById('div2').style.display = 'block';
                        this.toggleLarge();
                        this.filterData();
                    })

            }).catch(
                error => {
                    if (error.message === "Network Error") {
                        this.setState({
                            message: 'static.unkownError',
                            loading: false
                        });
                    } else {
                        switch (error.response ? error.response.status : "") {

                            case 401:
                                this.props.history.push(`/login/static.message.sessionExpired`)
                                break;
                            case 403:
                                this.props.history.push(`/accessDenied`)
                                break;
                            case 500:
                            case 404:
                            case 406:
                                this.setState({
                                    message: error.response.data.messageCode,
                                    loading: false
                                });
                                break;
                            case 412:
                                this.setState({
                                    message: error.response.data.messageCode,
                                    loading: false
                                });
                                break;
                            default:
                                this.setState({
                                    message: 'static.unkownError',
                                    loading: false
                                });
                                break;
                        }
                    }
                }
            );
    }
    getOrderDetails() {
        var programId = document.getElementById("programId").value;
        var planningUnitId = document.getElementById("planningUnitId").value;
        var orderNo = document.getElementById("orderNo").value;
        var primeLineNo = document.getElementById("primeLineNo").value;
        if (orderNo != "" && primeLineNo != "") {
            ManualTaggingService.getOrderDetailsByOrderNoAndPrimeLineNo(programId, planningUnitId, orderNo, primeLineNo)
                .then(response => {
                    console.log("artmis response===", response.data);
                    var artmisList = [];
                    artmisList.push(response.data);
                    console.log("--------->>", response.data);
                    // console.log("--------->",response.data[0].reason);
                    this.setState({
                        reason: response.data.reason,
                        artmisList,
                        result: ''
                    })
                }).catch(
                    error => {
                        if (error.message === "Network Error") {
                            this.setState({
                                message: 'static.unkownError',
                                loading: false
                            });
                        } else {
                            switch (error.response ? error.response.status : "") {

                                case 401:
                                    this.props.history.push(`/login/static.message.sessionExpired`)
                                    break;
                                case 403:
                                    this.props.history.push(`/accessDenied`)
                                    break;
                                case 500:
                                case 404:
                                case 406:
                                    this.setState({
                                        message: error.response.data.messageCode,
                                        loading: false
                                    });
                                    break;
                                case 412:
                                    this.setState({
                                        message: error.response.data.messageCode,
                                        loading: false
                                    });
                                    break;
                                default:
                                    this.setState({
                                        message: 'static.unkownError',
                                        loading: false
                                    });
                                    break;
                            }
                        }
                    }
                );
        } else {
            this.setState({
                artmisList: [],
                result: i18n.t('static.manualtagging.result')
            })
        }
    }
    hideFirstComponent() {
        this.timeout = setTimeout(function () {
            document.getElementById('div1').style.display = 'none';
        }, 8000);
    }
    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    hideSecondComponent() {

        setTimeout(function () {
            document.getElementById('div2').style.display = 'none';
        }, 8000);


    }

    filterData() {
        document.getElementById('div2').style.display = 'block';
        var programId = document.getElementById("programId").value;
        var planningUnitId = document.getElementById("planningUnitId").value;

        if (programId != -1 && planningUnitId != 0) {
            this.setState({ loading: true })
            if (this.state.haslinked) {
                this.setState({ haslinked: false })
            } else {
                this.setState({ message: '' })
            }

            console.log("1-programId------>", programId);
            ManualTaggingService.getShipmentListForManualTagging(programId, planningUnitId)
                .then(response => {
                    console.log("manual tagging response===", response);
                    this.setState({
                        outputList: response.data,
                        // message: ''
                    }, () => {
                        this.buildJExcel();
                    });
                }).catch(
                    error => {
                        if (error.message === "Network Error") {
                            this.setState({
                                message: 'static.unkownError',
                                loading: false
                            });
                        } else {
                            switch (error.response ? error.response.status : "") {

                                case 401:
                                    this.props.history.push(`/login/static.message.sessionExpired`)
                                    break;
                                case 403:
                                    this.props.history.push(`/accessDenied`)
                                    break;
                                case 500:
                                case 404:
                                case 406:
                                    this.setState({
                                        message: error.response.data.messageCode,
                                        loading: false
                                    });
                                    break;
                                case 412:
                                    this.setState({
                                        message: error.response.data.messageCode,
                                        loading: false
                                    });
                                    break;
                                default:
                                    this.setState({
                                        message: 'static.unkownError',
                                        loading: false
                                    });
                                    break;
                            }
                        }
                    }
                );
        } else if (programId == -1) {
            console.log("2-programId------>", programId);
            this.setState({
                outputList: [],
                message: i18n.t('static.program.validselectprogramtext'),
                color: 'red'
            }, () => {
                this.el = jexcel(document.getElementById("tableDiv"), '');
                this.el.destroy();
            });
        } else if (planningUnitId == 0) {
            console.log("3-programId------>", programId);
            this.setState({
                outputList: [],
                message: i18n.t('static.procurementUnit.validPlanningUnitText'),
                color: 'red'
            }, () => {
                this.el = jexcel(document.getElementById("tableDiv"), '');
                this.el.destroy();
            });
        }

    }


    addNewCountry() {
        if (navigator.onLine) {
            this.props.history.push(`/country/addCountry`)
        } else {
            alert("You must be Online.")
        }

    }
    editCountry(country) {
        if (AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_MANAGE_COUNTRY')) {
            console.log(country);
            this.props.history.push({
                pathname: `/country/editCountry/${country.countryId}`,
                // state: { country: country }
            });
        }
    }
    getProgramList() {
        ProgramService.getProgramList()
            .then(response => {
                if (response.status == 200) {
                    this.setState({
                        programs: response.data,
                        loading: false
                    })
                }
                else {

                    this.setState({
                        message: response.data.messageCode,
                        color: 'red',
                        loading: false
                    },
                        () => {
                            this.hideSecondComponent();
                        })
                }
            }).catch(
                error => {
                    if (error.message === "Network Error") {
                        this.setState({
                            message: 'static.unkownError',
                            loading: false
                        });
                    } else {
                        switch (error.response ? error.response.status : "") {

                            case 401:
                                this.props.history.push(`/login/static.message.sessionExpired`)
                                break;
                            case 403:
                                this.props.history.push(`/accessDenied`)
                                break;
                            case 500:
                            case 404:
                            case 406:
                                this.setState({
                                    message: error.response.data.messageCode,
                                    loading: false
                                });
                                break;
                            case 412:
                                this.setState({
                                    message: error.response.data.messageCode,
                                    loading: false
                                });
                                break;
                            default:
                                this.setState({
                                    message: 'static.unkownError',
                                    loading: false
                                });
                                break;
                        }
                    }
                }
            );
    }

    buildJExcel() {
        let manualTaggingList = this.state.outputList;
        console.log("manualTaggingList---->", manualTaggingList);
        let manualTaggingArray = [];
        let count = 0;

        for (var j = 0; j < manualTaggingList.length; j++) {
            data = [];
            data[0] = manualTaggingList[j].shipmentId;
            data[1] = manualTaggingList[j].shipmentTransId;
            data[2] = this.formatDate(manualTaggingList[j].expectedDeliveryDate);
            data[3] = getLabelText(manualTaggingList[j].shipmentStatus.label, this.state.lang)
            data[4] = manualTaggingList[j].procurementAgent.code;
            data[5] = getLabelText(manualTaggingList[j].budget.label, this.state.lang)
            data[6] = this.addCommas(manualTaggingList[j].shipmentQty);
            // data[7] = getLabelText(manualTaggingList[j].fundingSource.label, this.state.lang)
            data[7] = manualTaggingList[j].fundingSource.code

            manualTaggingArray[count] = data;
            count++;
        }
        // if (manualTaggingList.length == 0) {
        //     data = [];
        //     manualTaggingArray[0] = data;
        // }
        // console.log("manualTaggingArray---->", manualTaggingArray);
        this.el = jexcel(document.getElementById("tableDiv"), '');
        this.el.destroy();
        var json = [];
        var data = manualTaggingArray;

        var options = {
            data: data,
            columnDrag: true,
            colWidths: [30, 30, 50],
            colHeaderClasses: ["Reqasterisk"],
            columns: [
                {
                    title: i18n.t('static.commit.shipmentId'),
                    type: 'text',
                },
                {
                    title: "shipmentTransId",
                    type: 'hidden',
                },
                {
                    title: i18n.t('static.supplyPlan.expectedDeliveryDate'),
                    type: 'text',
                },
                {
                    title: i18n.t('static.supplyPlan.shipmentStatus'),
                    type: 'text',
                },
                {
                    title: i18n.t('static.report.procurementAgentName'),
                    type: 'text',
                },
                {
                    title: i18n.t('static.dashboard.budget'),
                    type: 'text',
                },
                {
                    title: i18n.t('static.supplyPlan.shipmentQty'),
                    type: 'text',
                },
                {
                    title: i18n.t('static.budget.fundingsource'),
                    type: 'text',
                },
            ],
            editable: false,
            text: {
                showingPage: `${i18n.t('static.jexcel.showing')} {0} ${i18n.t('static.jexcel.of')} {1}`,
                show: '',
                entries: '',
            },
            onload: this.loaded,
            pagination: 10,
            search: true,
            columnSorting: true,
            tableOverflow: true,
            wordWrap: true,
            allowInsertColumn: false,
            allowManualInsertColumn: false,
            allowDeleteRow: false,
            onselection: this.selected,


            oneditionend: this.onedit,
            copyCompatibility: true,
            allowExport: false,
            paginationOptions: [10, 25, 50],
            position: 'top',
            contextMenu: function (obj, x, y, e) {
                var items = [];
                if (y != null) {
                    if (obj.options.allowInsertRow == true) {
                        items.push({
                            title: i18n.t('static.dashboard.linkShipment'),
                            onclick: function () {
                                // console.log("onclick------>", this.el.getValueFromCoords(0, y));
                                var outputListAfterSearch = [];
                                let row = this.state.outputList.filter(c => (c.shipmentId == this.el.getValueFromCoords(0, y)))[0];
                                console.log("row-------------", row);
                                outputListAfterSearch.push(row);

                                this.setState({
                                    shipmentId: this.el.getValueFromCoords(0, y),
                                    outputListAfterSearch
                                })
                                this.toggleLarge();

                            }.bind(this)
                        });
                    }
                }

                return items;
            }.bind(this)
        };
        var languageEl = jexcel(document.getElementById("tableDiv"), options);
        this.el = languageEl;
        this.setState({
            languageEl: languageEl, loading: false
        })
    }

    loaded = function (instance, cell, x, y, value) {
        jExcelLoadedFunction(instance);
    }

    selected = function (instance, cell, x, y, value) {

        if ((x == 0 && value != 0) || (y == 0)) {
            // console.log("HEADER SELECTION--------------------------");
        } else {
            // console.log("Original Value---->>>>>", this.el.getValueFromCoords(0, x));
            // if (AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_MANAGE_LANGUAGE')) {
            //     this.props.history.push({
            //         pathname: `/language/editLanguage/${this.el.getValueFromCoords(0, x)}`,
            //     });
            // }
            var outputListAfterSearch = [];
            let row = this.state.outputList.filter(c => (c.shipmentId == this.el.getValueFromCoords(0, x)))[0];
            outputListAfterSearch.push(row);

            this.setState({
                shipmentId: this.el.getValueFromCoords(0, x),
                outputListAfterSearch
            })
            this.toggleLarge();
        }
    }.bind(this);


    componentDidMount() {
        this.hideFirstComponent();
        this.getProgramList();
        // .catch(
        //     error => {
        //         if (error.message === "Network Error") {
        //             this.setState({ message: error.message });
        //         } else {
        //             switch (error.response ? error.response.status : "") {
        //                 case 500:
        //                 case 401:
        //                 case 404:
        //                 case 406:
        //                 case 412:
        //                     this.setState({ message: error.response.data.messageCode });
        //                     break;
        //                 default:
        //                     this.setState({ message: 'static.unkownError' });
        //                     break;
        //             }
        //         }
        //     }
        // );

    }

    getPlanningUnitList() {
        var programId = document.getElementById("programId").value;
        if (programId != -1) {
            ProgramService.getProgramPlaningUnitListByProgramId(programId)
                .then(response => {
                    if (response.status == 200) {
                        this.setState({
                            planningUnits: response.data
                        })
                    }
                    else {

                        this.setState({
                            message: response.data.messageCode,
                            color: 'red'
                        },
                            () => {
                                this.hideSecondComponent();
                            })
                    }
                }).catch(
                    error => {
                        if (error.message === "Network Error") {
                            this.setState({
                                message: 'static.unkownError',
                                loading: false
                            });
                        } else {
                            switch (error.response ? error.response.status : "") {

                                case 401:
                                    this.props.history.push(`/login/static.message.sessionExpired`)
                                    break;
                                case 403:
                                    this.props.history.push(`/accessDenied`)
                                    break;
                                case 500:
                                case 404:
                                case 406:
                                    this.setState({
                                        message: error.response.data.messageCode,
                                        loading: false
                                    });
                                    break;
                                case 412:
                                    this.setState({
                                        message: error.response.data.messageCode,
                                        loading: false
                                    });
                                    break;
                                default:
                                    this.setState({
                                        message: 'static.unkownError',
                                        loading: false
                                    });
                                    break;
                            }
                        }
                    }
                );
        }
        this.filterData();

    }

    formatLabel(cell, row) {
        return getLabelText(cell, this.state.lang);
    }

    toggleLarge() {
        this.setState({
            artmisList: [],
            reason: "1",
            result: '',
            manualTag: !this.state.manualTag,
        })
    }

    addCommas(cell, row) {
        console.log("row---------->", row);
        cell += '';
        var x = cell.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

    formatDate(cell, row) {
        if (cell != null && cell != "") {
            var modifiedDate = moment(cell).format(`${DATE_FORMAT_CAP}`);
            return modifiedDate;
        } else {
            return "";
        }
    }

    render() {
        const { programs } = this.state;
        let programList = programs.length > 0 && programs.map((item, i) => {
            return (
                <option key={i} value={item.programId}>
                    {getLabelText(item.label, this.state.lang)}
                </option>
            )
        }, this);

        const { planningUnits } = this.state;
        let planningUnitList = planningUnits.length > 0 && planningUnits.map((item, i) => {
            return (
                <option key={i} value={item.planningUnit.id}>
                    {getLabelText(item.planningUnit.label, this.state.lang)}
                </option>
            )
        }, this);

        const { SearchBar, ClearSearchButton } = Search;
        const customTotal = (from, to, size) => (
            <span className="react-bootstrap-table-pagination-total">
                {i18n.t('static.common.result', { from, to, size })}
            </span>
        );

        const columns = [
            {
                dataField: 'shipmentId',
                text: i18n.t('static.commit.shipmentId'),
                sort: true,
                align: 'center',
                headerAlign: 'center',
            },
            {
                dataField: 'shipmentTransId',
                hidden: true,
            },
            {
                dataField: 'expectedDeliveryDate',
                text: i18n.t('static.supplyPlan.expectedDeliveryDate'),
                sort: true,
                align: 'center',
                headerAlign: 'center',
                formatter: this.formatDate
            },
            {
                dataField: 'shipmentStatus.label.label_en',
                text: i18n.t('static.supplyPlan.shipmentStatus'),
                sort: true,
                align: 'center',
                headerAlign: 'center',
                // formatter: this.formatLabel
            }, {
                dataField: 'procurementAgent.code',
                text: i18n.t('static.report.procurementAgentName'),
                sort: true,
                align: 'center',
                headerAlign: 'center',
                // formatter: this.formatLabel
            },
            {
                dataField: 'budget.label.label_en',
                text: i18n.t('static.budgetHead.budget'),
                sort: true,
                align: 'center',
                headerAlign: 'center',
                // formatter: this.formatLabel
            },
            {
                dataField: 'shipmentQty',
                text: i18n.t('static.supplyPlan.shipmentQty'),
                sort: true,
                align: 'center',
                headerAlign: 'center',
                formatter: this.addCommas
            },
            {
                dataField: 'fundingSource.code',
                text: i18n.t('static.fundingSourceHead.fundingSource'),
                sort: true,
                align: 'center',
                headerAlign: 'center'
            }
        ];

        const columns1 = [
            {
                dataField: 'roNo',
                text: i18n.t('static.manualTagging.RONO'),
                sort: true,
                align: 'center',
                headerAlign: 'center'
            },
            {
                dataField: 'roPrimeLineNo',
                text: i18n.t('static.manualTagging.ROPrimeline'),
                sort: true,
                align: 'center',
                headerAlign: 'center',
                // formatter: this.formatLabel
            }, {
                dataField: 'orderType',
                text: i18n.t('static.manualTagging.OrderType'),
                sort: true,
                align: 'center',
                headerAlign: 'center',
                // formatter: this.formatLabel
            },
            {
                dataField: 'planningUnitSkuCode',
                text: i18n.t('static.manualTagging.planningUnitSKUCode'),
                sort: true,
                align: 'center',
                headerAlign: 'center',
                // formatter: this.formatLabel
            },
            {
                dataField: 'procurementUnitSkuCode',
                text: i18n.t('static.manualTagging.procurementUnitSKUCode'),
                sort: true,
                align: 'center',
                headerAlign: 'center'
            },
            {
                dataField: 'quantity',
                text: i18n.t('static.shipment.qty'),
                sort: true,
                align: 'center',
                headerAlign: 'center',
                formatter: this.addCommas
            },
            {
                dataField: 'currentEstimatedDeliveryDate',
                text: i18n.t('static.manualTagging.currentEstimetedDeliveryDate'),
                sort: true,
                align: 'center',
                headerAlign: 'center',
                formatter: this.formatDate
            },
            {
                dataField: 'supplierName',
                text: i18n.t('static.supplier.supplierName'),
                sort: true,
                align: 'center',
                headerAlign: 'center'
            },
            {
                dataField: 'recipentCountry',
                text: i18n.t('static.manualTagging.receipentCountry'),
                sort: true,
                align: 'center',
                headerAlign: 'center'
            },
            {
                dataField: 'price',
                text: i18n.t('static.manualTagging.price'),
                sort: true,
                align: 'center',
                headerAlign: 'center',
                formatter: this.addCommas
            },
            {
                dataField: 'shippingCost',
                text: i18n.t('static.manualTagging.shippingCost'),
                sort: true,
                align: 'center',
                headerAlign: 'center',
                formatter: this.addCommas
            },
            {
                dataField: 'status',
                text: i18n.t('static.status.status'),
                sort: true,
                align: 'center',
                headerAlign: 'center'
            }
        ];
        const options = {
            hidePageListOnlyOnePage: true,
            firstPageText: i18n.t('static.common.first'),
            prePageText: i18n.t('static.common.back'),
            nextPageText: i18n.t('static.common.next'),
            lastPageText: i18n.t('static.common.last'),
            nextPageTitle: i18n.t('static.common.firstPage'),
            prePageTitle: i18n.t('static.common.prevPage'),
            firstPageTitle: i18n.t('static.common.nextPage'),
            lastPageTitle: i18n.t('static.common.lastPage'),
            showTotal: true,
            paginationTotalRenderer: customTotal,
            disablePageTitle: true,
            sizePerPageList: [{
                text: '10', value: 10
            }, {
                text: '30', value: 30
            }
                ,
            {
                text: '50', value: 50
            },
            {
                text: 'All', value: this.state.outputList.length
            }]
        }
        return (
            <div className="animated">
                <AuthenticationServiceComponent history={this.props.history} />
                <h5 className={this.props.match.params.color} id="div1">{i18n.t(this.props.match.params.message, { entityname })}</h5>
                <h5 className={this.state.color} id="div2">{i18n.t(this.state.message, { entityname })}</h5>
                {/* <Card style={{ display: this.state.loading ? "none" : "block" }}> */}
                <Card style={{ display: this.state.loading ? "none" : "block" }}>
                    <CardBody className="pb-lg-5">
                        <Col md="10 pl-0">
                            <div className="row">
                                <FormGroup className="col-md-4 ">
                                    <Label htmlFor="appendedInputButton">{i18n.t('static.inventory.program')}</Label>
                                    <div className="controls ">
                                        <InputGroup>
                                            <Input
                                                type="select"
                                                name="programId"
                                                id="programId"
                                                bsSize="sm"
                                                onChange={this.getPlanningUnitList}
                                            >
                                                <option value="-1">{i18n.t('static.common.select')}</option>
                                                {programList}
                                            </Input>
                                        </InputGroup>
                                    </div>
                                </FormGroup>
                                <FormGroup className="col-md-4">
                                    <Label htmlFor="appendedInputButton">{i18n.t('static.procurementUnit.planningUnit')}</Label>
                                    <div className="controls ">
                                        <InputGroup>
                                            <Input
                                                type="select"
                                                name="planningUnitId"
                                                id="planningUnitId"
                                                bsSize="sm"
                                                onChange={this.filterData}
                                            >
                                                <option value="0">{i18n.t('static.common.select')}</option>
                                                {planningUnitList}

                                            </Input>
                                            {/* <InputGroupAddon addonType="append">
                                                                        <Button color="secondary Gobtn btn-sm" onClick={this.formSubmit}>{i18n.t('static.common.go')}</Button>
                                                                    </InputGroupAddon> */}
                                        </InputGroup>
                                    </div>
                                </FormGroup>
                            </div>
                        </Col>

                        {/* <ToolkitProvider
                            keyField="countryId"
                            data={this.state.outputList}
                            columns={columns}
                            search={{ searchFormatted: true }}
                            hover
                            filter={filterFactory()}
                        >
                            {
                                props => (
                                    <div className="TableCust">
                                        <div className="col-md-6 pr-0 offset-md-6 text-right mob-Left">
                                            <SearchBar {...props.searchProps} />
                                            <ClearSearchButton {...props.searchProps} />
                                        </div>
                                        <BootstrapTable hover striped noDataIndication={i18n.t('static.common.noData')} tabIndexCell
                                            pagination={paginationFactory(options)}
                                            rowEvents={{
                                                onClick: (e, row, rowIndex) => {

                                                    var outputListAfterSearch = [];
                                                    outputListAfterSearch.push(row);

                                                    this.setState({
                                                        shipmentId: row.shipmentId,
                                                        outputListAfterSearch
                                                    })
                                                    this.toggleLarge();
                                                }
                                            }}
                                            {...props.baseProps}
                                        />
                                    </div>
                                )
                            }
                        </ToolkitProvider> */}
                        <div className="ReportSearchMarginTop">
                            <div id="tableDiv" className="jexcelremoveReadonlybackground">
                            </div>
                        </div>

                        {/* Consumption modal */}
                        <Modal isOpen={this.state.manualTag}
                            className={'modal-lg ' + this.props.className, "modalWidth"}>
                            <ModalHeader toggle={() => this.toggleLarge()} className="modalHeaderSupplyPlan">
                                <strong>{i18n.t('static.manualTagging.searchErpOrders')}</strong>
                            </ModalHeader>
                            <ModalBody>
                                <Col md="12 pl-0">
                                    <div className="d-md-flex">
                                        <FormGroup className="col-md-3 pl-0">
                                            <Label htmlFor="appendedInputButton">{i18n.t('static.supplyPlan.orderNo')}</Label>
                                            <div className="controls ">
                                                <InputGroup>
                                                    <Input
                                                        type="text"
                                                        name="orderNo"
                                                        id="orderNo"
                                                        bsSize="sm"
                                                    >
                                                    </Input>
                                                </InputGroup>
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="col-md-3">
                                            <Label htmlFor="appendedInputButton">{i18n.t('static.supplyPlan.primeLineNo')}</Label>
                                            <div className="controls ">
                                                <InputGroup>
                                                    <Input
                                                        type="text"
                                                        name="primeLineNo"
                                                        id="primeLineNo"
                                                        bsSize="sm"
                                                        onChange={this.getOrderDetails}
                                                    >
                                                    </Input>
                                                    {/* <InputGroupAddon addonType="append"> */}
                                                    {/* <Button color="secondary Gobtn btn-sm" onClick={this.getOrderDetails}>{i18n.t('static.common.go')}</Button> */}
                                                    {/* </InputGroupAddon> */}
                                                </InputGroup>
                                            </div>
                                        </FormGroup>
                                    </div>
                                </Col>
                                <div>
                                    <ToolkitProvider
                                        keyField="optList"
                                        data={this.state.artmisList}
                                        columns={columns1}
                                        search={{ searchFormatted: true }}
                                        hover
                                        filter={filterFactory()}
                                    >
                                        {
                                            props => (
                                                <div className="TableCust">

                                                    <BootstrapTable hover striped noDataIndication={i18n.t('static.common.noData')} tabIndexCell

                                                        rowEvents={{
                                                        }}
                                                        {...props.baseProps}
                                                    />
                                                </div>
                                            )
                                        }
                                    </ToolkitProvider>
                                </div><br />
                                <div>
                                    <ToolkitProvider
                                        keyField="optList"
                                        data={this.state.outputListAfterSearch}
                                        columns={columns}
                                        search={{ searchFormatted: true }}
                                        hover
                                        filter={filterFactory()}
                                    >
                                        {
                                            props => (
                                                <div className="TableCust">
                                                    {/* <div className="col-md-6 pr-0 offset-md-6 text-right mob-Left">
                                                    <SearchBar {...props.searchProps} />
                                                    <ClearSearchButton {...props.searchProps} />
                                                </div> */}
                                                    <BootstrapTable hover striped noDataIndication={i18n.t('static.common.noData')} tabIndexCell
                                                        // pagination={paginationFactory(options)}
                                                        rowEvents={{
                                                        }}
                                                        {...props.baseProps}
                                                    />
                                                </div>
                                            )
                                        }
                                    </ToolkitProvider>
                                </div>
                                {this.state.reason != "" && this.state.reason != 1 && <div style={{ color: 'red' }}>Note : {this.state.reason}</div>}
                                <div style={{ color: 'red' }} >
                                    {this.state.result}</div>
                            </ModalBody>
                            <ModalFooter>

                                {this.state.reason == "" &&
                                    <Button type="submit" size="md" color="success" className="submitBtn float-right mr-1" onClick={this.link}> <i className="fa fa-check"></i>{i18n.t('static.manualTagging.link')}</Button>
                                }
                                <Button size="md" color="danger" className="submitBtn float-right mr-1" onClick={() => this.toggleLarge()}> <i className="fa fa-times"></i> {i18n.t('static.common.cancel')}</Button>
                            </ModalFooter>
                        </Modal>
                        {/* Consumption modal */}
                    </CardBody>
                </Card>
                <div style={{ display: this.state.loading ? "block" : "none" }}>
                    <div className="d-flex align-items-center justify-content-center" style={{ height: "500px" }} >
                        <div class="align-items-center">
                            <div ><h4> <strong>{i18n.t('static.loading.loading')}</strong></h4></div>

                            <div class="spinner-border blue ml-4" role="status">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}