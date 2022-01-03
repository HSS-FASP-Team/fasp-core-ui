import React, { Component } from 'react';
import pdfIcon from '../../assets/img/pdf.png';
import { LOGO } from '../../CommonComponent/Logo.js'
import jsPDF from "jspdf";
import "jspdf-autotable";
import Picker from 'react-month-picker'
import i18n from '../../i18n'
import MonthBox from '../../CommonComponent/MonthBox.js'
import getLabelText from '../../CommonComponent/getLabelText';
import AuthenticationService from '../Common/AuthenticationService.js';
import {
    SECRET_KEY, DATE_FORMAT_CAP,
    MONTHS_IN_PAST_FOR_SUPPLY_PLAN,
    TOTAL_MONTHS_TO_DISPLAY_IN_SUPPLY_PLAN,
    PLUS_MINUS_MONTHS_FOR_AMC_IN_SUPPLY_PLAN, MONTHS_IN_PAST_FOR_AMC, MONTHS_IN_FUTURE_FOR_AMC, DEFAULT_MIN_MONTHS_OF_STOCK, CANCELLED_SHIPMENT_STATUS, PSM_PROCUREMENT_AGENT_ID, PLANNED_SHIPMENT_STATUS, DRAFT_SHIPMENT_STATUS, SUBMITTED_SHIPMENT_STATUS, APPROVED_SHIPMENT_STATUS, SHIPPED_SHIPMENT_STATUS, ARRIVED_SHIPMENT_STATUS, DELIVERED_SHIPMENT_STATUS, NO_OF_MONTHS_ON_LEFT_CLICKED, ON_HOLD_SHIPMENT_STATUS, NO_OF_MONTHS_ON_RIGHT_CLICKED, DEFAULT_MAX_MONTHS_OF_STOCK, ACTUAL_CONSUMPTION_DATA_SOURCE_TYPE, FORECASTED_CONSUMPTION_DATA_SOURCE_TYPE, INVENTORY_DATA_SOURCE_TYPE, SHIPMENT_DATA_SOURCE_TYPE, QAT_DATA_SOURCE_ID, FIRST_DATA_ENTRY_DATE, INDEXED_DB_NAME, INDEXED_DB_VERSION, JEXCEL_PAGINATION_OPTION, JEXCEL_PRO_KEY, JEXCEL_DATE_FORMAT_SM, DATE_FORMAT_CAP_WITHOUT_DATE,
    REPORT_DATEPICKER_START_MONTH, REPORT_DATEPICKER_END_MONTH,
    JEXCEL_INTEGER_REGEX, JEXCEL_DECIMAL_CATELOG_PRICE
} from '../../Constants.js';
import AuthenticationServiceComponent from '../Common/AuthenticationServiceComponent';
import moment from "moment";
import { getDatabase } from "../../CommonComponent/IndexedDbFunctions";
import CryptoJS from 'crypto-js';
import csvicon from '../../assets/img/csv.png'
import jexcel from 'jexcel-pro';
import "../../../node_modules/jexcel-pro/dist/jexcel.css";
import TracerCategoryService from '../../api/TracerCategoryService';
import ProcurementAgentService from "../../api/ProcurementAgentService";
import PlanningUnitService from '../../api/PlanningUnitService';
import "../../../node_modules/jsuites/dist/jsuites.css";
import { jExcelLoadedFunction, jExcelLoadedFunctionOnlyHideRow } from '../../CommonComponent/JExcelCommonFunctions.js'
import {
    Card,
    CardBody,
    // CardFooter,
    CardHeader,
    Col,
    Row,
    CardFooter,
    Table, FormGroup, Input, InputGroup, InputGroupAddon, Label, Form, Modal, ModalHeader, ModalFooter, ModalBody, Button
} from 'reactstrap';
import NumberFormat from 'react-number-format';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, selectFilter, multiSelectFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { isSiteOnline } from '../../CommonComponent/JavascriptCommonFunctions';

const ref = React.createRef();
const pickerLang = {
    months: [i18n.t('static.month.jan'), i18n.t('static.month.feb'), i18n.t('static.month.mar'), i18n.t('static.month.apr'), i18n.t('static.month.may'), i18n.t('static.month.jun'), i18n.t('static.month.jul'), i18n.t('static.month.aug'), i18n.t('static.month.sep'), i18n.t('static.month.oct'), i18n.t('static.month.nov'), i18n.t('static.month.dec')],
    from: 'From', to: 'To',
}
const months = [i18n.t('static.month.jan'), i18n.t('static.month.feb'), i18n.t('static.month.mar'), i18n.t('static.month.apr'), i18n.t('static.month.may'), i18n.t('static.month.jun'), i18n.t('static.month.jul'), i18n.t('static.month.aug'), i18n.t('static.month.sep'), i18n.t('static.month.oct'), i18n.t('static.month.nov'), i18n.t('static.month.dec')]
export default class PlanningUnitSetting extends Component {
    constructor(props) {
        super(props);

        var dt = new Date();
        dt.setMonth(dt.getMonth() - REPORT_DATEPICKER_START_MONTH);
        var dt1 = new Date();
        dt1.setMonth(dt1.getMonth() + REPORT_DATEPICKER_END_MONTH);
        this.state = {
            rangeValue: { from: { year: dt.getFullYear(), month: dt.getMonth() + 1 }, to: { year: dt1.getFullYear(), month: dt1.getMonth() + 1 } },
            minDate: { year: new Date().getFullYear() - 10, month: new Date().getMonth() + 1 },
            maxDate: { year: new Date().getFullYear() + 10, month: new Date().getMonth() + 1 },
            selsource: [],
            loading: true,
            datasetId: '',
            datasetList: [],
            datasetList1: [],
            startDateDisplay: '',
            endDateDisplay: '',
            beforeEndDateDisplay: '',
            allowAdd: false,
            allTracerCategoryList: [],
            allPlanningUnitList: [],
            originalPlanningUnitList: [],
            allProcurementAgentList: [],
            selectedForecastProgram: '',
            filterProcurementAgent: '',
            responsePa: [],
            forecastProgramId: '',
            forecastProgramVersionId: ''

        }
        this.changed = this.changed.bind(this);
        this.getDatasetList = this.getDatasetList.bind(this);
        this.filterData = this.filterData.bind(this);
        this.addRow = this.addRow.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.tracerCategoryList = this.tracerCategoryList.bind(this);
        this.planningUnitList = this.planningUnitList.bind(this);
        this.checkValidation = this.checkValidation.bind(this);
        this.procurementAgentList = this.procurementAgentList.bind(this);
        this.getPlanningUnitByTracerCategoryId = this.getPlanningUnitByTracerCategoryId.bind(this);
        this.getProcurementAgentPlanningUnitByPlanningUnitIds = this.getProcurementAgentPlanningUnitByPlanningUnitIds.bind(this);
        this.oneditionend = this.oneditionend.bind(this);
        this._handleClickRangeBox = this._handleClickRangeBox.bind(this)
        this.handleRangeChange = this.handleRangeChange.bind(this);
        this.handleRangeDissmis = this.handleRangeDissmis.bind(this);
        this.cancelClicked = this.cancelClicked.bind(this);
        this.hideSecondComponent = this.hideSecondComponent.bind(this);
        this.disablePUNode = this.disablePUNode.bind(this);
    }

    hideSecondComponent() {
        document.getElementById('div2').style.display = 'block';
        setTimeout(function () {
            document.getElementById('div2').style.display = 'none';
        }, 8000);
    }

    cancelClicked() {
        let id = AuthenticationService.displayDashboardBasedOnRole();
        this.props.history.push(`/ApplicationDashboard/` + `${id}` + '/red/' + i18n.t('static.message.cancelled'))
    }

    oneditionend = function (instance, cell, x, y, value) {
        var elInstance = instance.jexcel;
        var rowData = elInstance.getRowData(y);

        if (x == 8 && !isNaN(rowData[8]) && rowData[8].toString().indexOf('.') != -1) {
            // console.log("RESP---------", parseFloat(rowData[8]));
            elInstance.setValueFromCoords(8, y, parseFloat(rowData[8]), true);
        }
        elInstance.setValueFromCoords(10, y, 1, true);

    }

    checkValidation() {
        var valid = true;
        var json = this.el.getJson(null, false);
        console.log("json.length-------", json.length);
        for (var y = 0; y < json.length; y++) {
            var value = this.el.getValueFromCoords(10, y);
            if (parseInt(value) == 1) {

                //tracer category
                var col = ("A").concat(parseInt(y) + 1);
                var value = this.el.getValueFromCoords(0, y);
                console.log("value-----", value);
                if (value == "") {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.label.fieldRequired'));
                    valid = false;
                } else {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setComments(col, "");
                }

                //planning unit
                var col = ("B").concat(parseInt(y) + 1);
                var value = this.el.getValueFromCoords(1, y);
                console.log("value-----", value);
                if (value == "") {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.label.fieldRequired'));
                    valid = false;
                } else {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setComments(col, "");
                }

                var col = ("E").concat(parseInt(y) + 1);
                var value = this.el.getValue(`E${parseInt(y) + 1}`, true).toString().replaceAll(",", "");
                var reg = JEXCEL_INTEGER_REGEX;
                console.log("value------------->E", value);
                if (value == "") {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.label.fieldRequired'));
                    valid = false;
                } else {
                    if (isNaN(parseInt(value)) || !(reg.test(value))) {
                        this.el.setStyle(col, "background-color", "transparent");
                        this.el.setStyle(col, "background-color", "yellow");
                        this.el.setComments(col, i18n.t('static.message.invalidnumber'));
                        valid = false;
                    } else {
                        this.el.setStyle(col, "background-color", "transparent");
                        this.el.setComments(col, "");
                    }
                }

                var col = ("F").concat(parseInt(y) + 1);
                var value = this.el.getValue(`F${parseInt(y) + 1}`, true).toString().replaceAll(",", "");
                var reg = JEXCEL_INTEGER_REGEX;
                if (value == "") {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.label.fieldRequired'));
                    valid = false;
                } else {
                    if (isNaN(parseInt(value)) || !(reg.test(value))) {
                        this.el.setStyle(col, "background-color", "transparent");
                        this.el.setStyle(col, "background-color", "yellow");
                        this.el.setComments(col, i18n.t('static.message.invalidnumber'));
                        valid = false;
                    } else {
                        this.el.setStyle(col, "background-color", "transparent");
                        this.el.setComments(col, "");
                    }
                }

                var col = ("G").concat(parseInt(y) + 1);
                var value = this.el.getValue(`G${parseInt(y) + 1}`, true).toString().replaceAll(",", "");
                var reg = JEXCEL_INTEGER_REGEX;
                if (value == "") {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.label.fieldRequired'));
                    valid = false;
                } else {
                    if (isNaN(parseInt(value)) || !(reg.test(value))) {
                        this.el.setStyle(col, "background-color", "transparent");
                        this.el.setStyle(col, "background-color", "yellow");
                        this.el.setComments(col, i18n.t('static.message.invalidnumber'));
                        valid = false;
                    } else {
                        this.el.setStyle(col, "background-color", "transparent");
                        this.el.setComments(col, "");
                    }
                }

                //procurement agent
                var col = ("H").concat(parseInt(y) + 1);
                var value = this.el.getValueFromCoords(7, y);
                console.log("value-----", value);
                if (value == "") {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.label.fieldRequired'));
                    valid = false;
                } else {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setComments(col, "");
                }

                var col = ("I").concat(parseInt(y) + 1);
                var value = this.el.getValue(`I${parseInt(y) + 1}`, true).toString().replaceAll(",", "");
                var reg = JEXCEL_DECIMAL_CATELOG_PRICE;
                if (value == "") {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.label.fieldRequired'));
                    valid = false;
                } else {
                    // if (isNaN(Number.parseInt(value)) || value < 0 || !(reg.test(value))) {
                    if (!(reg.test(value))) {
                        this.el.setStyle(col, "background-color", "transparent");
                        this.el.setStyle(col, "background-color", "yellow");
                        this.el.setComments(col, i18n.t('static.message.invalidnumber'));
                        valid = false;
                    } else {
                        this.el.setStyle(col, "background-color", "transparent");
                        this.el.setComments(col, "");
                    }

                }




            }
        }
        return valid;
    }

    changed = function (instance, cell, x, y, value) {
        //Planning Unit
        if (x == 1 && value != null && value != '') {
            let planningUnitArray = [];
            var tableJson = this.el.getJson(null, false);
            for (var i = 0; i < tableJson.length; i++) {
                var map1 = new Map(Object.entries(tableJson[i]));
                planningUnitArray.push(map1.get("1"));
            }
            console.log("mylist--------->31", planningUnitArray);
            this.getProcurementAgentPlanningUnitByPlanningUnitIds(planningUnitArray);
        }

        if (x == 7) {
            if (value != -1 && value !== null && value !== '') {
                let planningUnitId = this.el.getValueFromCoords(1, y);
                // let planningUnitId = this.el.getValueFromCoords(7, y);
                let procurementAgentPlanningUnitList = this.state.responsePa;
                let tempPaList = procurementAgentPlanningUnitList[planningUnitId];
                console.log("mylist--------->1111", procurementAgentPlanningUnitList);
                console.log("mylist--------->1112", planningUnitId);

                let obj = tempPaList.filter(c => c.procurementAgent.id == value)[0];

                this.el.setValueFromCoords(8, y, obj.catalogPrice, true);
            } else {
                this.el.setValueFromCoords(8, y, '', true);
            }

        }

        if (x == 0) {
            this.el.setValueFromCoords(1, y, '', true);
            this.el.setValueFromCoords(7, y, '', true);
            this.el.setValueFromCoords(8, y, '', true);
        }
        if (x == 1) {
            this.el.setValueFromCoords(7, y, '', true);
            this.el.setValueFromCoords(8, y, '', true);
        }

        //tracerCategory
        if (x == 0) {
            var col = ("A").concat(parseInt(y) + 1);
            if (value == "") {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setStyle(col, "background-color", "yellow");
                this.el.setComments(col, i18n.t('static.label.fieldRequired'));
            } else {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setComments(col, "");
            }
        }

        //planning unit
        if (x == 1) {
            var col = ("B").concat(parseInt(y) + 1);
            if (value == "") {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setStyle(col, "background-color", "yellow");
                this.el.setComments(col, i18n.t('static.label.fieldRequired'));
            } else {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setComments(col, "");
            }
        }

        //stock
        if (x == 4) {
            var col = ("E").concat(parseInt(y) + 1);
            value = this.el.getValue(`E${parseInt(y) + 1}`, true).toString().replaceAll(",", "");
            // var reg = /^[0-9\b]+$/;
            var reg = JEXCEL_INTEGER_REGEX;
            if (value != "") {
                if (isNaN(parseInt(value)) || !(reg.test(value))) {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.message.invalidnumber'))
                } else {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setComments(col, "");
                }
            } else {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setStyle(col, "background-color", "yellow");
                this.el.setComments(col, i18n.t('static.label.fieldRequired'));
            }
        }

        //existing shipments
        if (x == 5) {
            var col = ("F").concat(parseInt(y) + 1);
            value = this.el.getValue(`F${parseInt(y) + 1}`, true).toString().replaceAll(",", "");
            // var reg = /^[0-9\b]+$/;
            var reg = JEXCEL_INTEGER_REGEX;
            if (value != "") {
                if (isNaN(parseInt(value)) || !(reg.test(value))) {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.message.invalidnumber'));
                } else {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setComments(col, "");
                }
            } else {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setStyle(col, "background-color", "yellow");
                this.el.setComments(col, i18n.t('static.label.fieldRequired'));
            }
        }

        //desired months of stock
        if (x == 6) {
            var col = ("G").concat(parseInt(y) + 1);
            value = this.el.getValue(`G${parseInt(y) + 1}`, true).toString().replaceAll(",", "");
            // var reg = /^[0-9\b]+$/;
            var reg = JEXCEL_INTEGER_REGEX;
            if (value != "") {
                if (isNaN(parseInt(value)) || !(reg.test(value))) {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.message.invalidnumber'));
                } else {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setComments(col, "");
                }
            } else {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setStyle(col, "background-color", "yellow");
                this.el.setComments(col, i18n.t('static.label.fieldRequired'));
            }
        }


        //procurement Agent
        if (x == 7) {
            var col = ("H").concat(parseInt(y) + 1);
            if (value == "") {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setStyle(col, "background-color", "yellow");
                this.el.setComments(col, i18n.t('static.label.fieldRequired'));
            } else {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setComments(col, "");
            }
        }


        //unit price
        if (x == 8) {
            var col = ("I").concat(parseInt(y) + 1);
            value = this.el.getValue(`I${parseInt(y) + 1}`, true).toString().replaceAll(",", "");
            // var reg = DECIMAL_NO_REGEX;
            var reg = JEXCEL_DECIMAL_CATELOG_PRICE;
            if (value == "") {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setStyle(col, "background-color", "yellow");
                this.el.setComments(col, i18n.t('static.label.fieldRequired'));
            } else {
                // if (isNaN(Number.parseInt(value)) || value < 0 || !(reg.test(value))) {
                if (!(reg.test(value))) {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.message.invalidnumber'));
                } else {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setComments(col, "");
                }

            }
        }

    }

    getPlanningUnitByTracerCategoryId(tracerCategoryId) {
        TracerCategoryService.getPlanningUnitByTracerCategoryId(tracerCategoryId)
            .then(response => {
                if (response.status == 200) {
                    return response.data;
                } else {
                    this.setState({
                        message: response.data.messageCode, loading: false
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

    getProcurementAgentPlanningUnitByPlanningUnitIds(planningUnitList) {
        PlanningUnitService.getProcurementAgentPlanningUnitByPlanningUnitIds(planningUnitList)
            .then(response => {
                if (response.status == 200) {
                    // console.log("planningUnitId------->2", response.data);
                    // var mylist = [];
                    // mylist[0] = {
                    //     name: 'Custom',
                    //     id: -1,
                    //     price: 0
                    // }

                    // let procurementAgentPlanningUnit = response.data;
                    // let loopvar = procurementAgentPlanningUnit[planningUnitList[0]]

                    // for (var i = 0; i < loopvar.length; i++) {
                    //     let obj = {
                    //         name: loopvar[i].procurementAgent.code,
                    //         id: loopvar[i].procurementAgent.id,
                    //         price: loopvar[i].catalogPrice,
                    //     }
                    //     mylist.push(obj);
                    // }
                    // console.log("planningUnitId------->3", mylist);
                    this.setState({
                        responsePa: response.data,
                    },
                        () => {
                            console.log("RESPO-------->", this.state.responsePa);
                            // this.buildJExcel();
                        })


                } else {
                    this.setState({
                        message: response.data.messageCode, loading: false
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

    tracerCategoryList() {
        TracerCategoryService.getTracerCategoryListAll()
            .then(response => {
                if (response.status == 200) {
                    console.log("List------->tr-original", response.data)
                    var listArray = response.data;
                    listArray.sort((a, b) => {
                        var itemLabelA = getLabelText(a.label, this.state.lang).toUpperCase(); // ignore upper and lowercase
                        var itemLabelB = getLabelText(b.label, this.state.lang).toUpperCase(); // ignore upper and lowercase                   
                        return itemLabelA > itemLabelB ? 1 : -1;
                    });

                    let tempList = [];

                    if (listArray.length > 0) {
                        for (var i = 0; i < listArray.length; i++) {
                            var paJson = {
                                name: getLabelText(listArray[i].label, this.state.lang),
                                id: parseInt(listArray[i].tracerCategoryId),
                                active: listArray[i].active,
                                healthArea: listArray[i].healthArea
                            }
                            tempList[i] = paJson
                        }
                    }

                    this.setState({
                        allTracerCategoryList: tempList,
                        // tracerCategoryList1: response.data
                        // loading: false
                    },
                        () => {
                            console.log("List------->tr", this.state.allTracerCategoryList)
                            this.procurementAgentList();
                        })
                } else {
                    this.setState({
                        message: response.data.messageCode, loading: false
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

    planningUnitList() {
        PlanningUnitService.getPlanningUnitByRealmId(AuthenticationService.getRealmId()).then(response => {
            console.log("RESP----->", response.data);

            var listArray = response.data;
            listArray.sort((a, b) => {
                var itemLabelA = getLabelText(a.label, this.state.lang).toUpperCase(); // ignore upper and lowercase
                var itemLabelB = getLabelText(b.label, this.state.lang).toUpperCase(); // ignore upper and lowercase                   
                return itemLabelA > itemLabelB ? 1 : -1;
            });

            let tempList = [];
            if (listArray.length > 0) {
                for (var i = 0; i < listArray.length; i++) {
                    var paJson = {
                        name: getLabelText(listArray[i].label, this.state.lang),
                        id: parseInt(listArray[i].planningUnitId),
                        active: listArray[i].active,
                        forecastingUnit: listArray[i].forecastingUnit,
                        label: listArray[i].label
                    }
                    tempList[i] = paJson
                }
            }
            this.setState({
                allPlanningUnitList: tempList,
                originalPlanningUnitList: response.data
            }, () => {
                console.log("List------->pu", this.state.allPlanningUnitList)
                this.tracerCategoryList();
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
    }

    procurementAgentList() {
        ProcurementAgentService.getProcurementAgentListAll()
            .then(response => {
                if (response.status == 200) {

                    var listArray = response.data;
                    listArray.sort((a, b) => {
                        var itemLabelA = getLabelText(a.label, this.state.lang).toUpperCase(); // ignore upper and lowercase
                        var itemLabelB = getLabelText(b.label, this.state.lang).toUpperCase(); // ignore upper and lowercase                   
                        return itemLabelA > itemLabelB ? 1 : -1;
                    });

                    let tempList = [];

                    if (listArray.length > 0) {
                        for (var i = 0; i < listArray.length; i++) {
                            var paJson = {
                                // name: getLabelText(listArray[i].label, this.state.lang),
                                name: listArray[i].procurementAgentCode,
                                id: parseInt(listArray[i].procurementAgentId),
                                active: listArray[i].active,
                                code: listArray[i].procurementAgentCode,
                                label: listArray[i].label
                            }
                            tempList[i] = paJson
                        }
                    }

                    tempList.unshift({
                        name: 'CUSTOM',
                        id: -1,
                        active: true,
                        code: 'CUSTOM',
                        label: {}
                    });


                    this.setState({
                        allProcurementAgentList: tempList,
                        loading: false
                    },
                        () => {
                            console.log("List------->pa", this.state.allProcurementAgentList)
                            // this.buildJExcel();
                        })
                } else {
                    this.setState({
                        message: response.data.messageCode, loading: false
                    },
                        () => {
                            this.hideSecondComponent();
                        })
                }

            })
            .catch(
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


    componentDidMount() {
        this.getDatasetList();
    }

    getDatasetList() {
        var db1;
        getDatabase();
        var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var transaction = db1.transaction(['datasetData'], 'readwrite');
            var program = transaction.objectStore('datasetData');
            var getRequest = program.getAll();
            var datasetList = [];
            var datasetList1 = [];

            getRequest.onerror = function (event) {
                // Handle errors!
            };
            getRequest.onsuccess = function (event) {
                var myResult = [];
                myResult = getRequest.result;

                var userBytes = CryptoJS.AES.decrypt(localStorage.getItem('curUser'), SECRET_KEY);
                var userId = userBytes.toString(CryptoJS.enc.Utf8);
                var filteredGetRequestList = myResult.filter(c => c.userId == userId);
                for (var i = 0; i < filteredGetRequestList.length; i++) {

                    var bytes = CryptoJS.AES.decrypt(myResult[i].programName, SECRET_KEY);
                    var programNameLabel = bytes.toString(CryptoJS.enc.Utf8);
                    var programDataBytes = CryptoJS.AES.decrypt(myResult[i].programData, SECRET_KEY);
                    var programData = programDataBytes.toString(CryptoJS.enc.Utf8);
                    var programJson1 = JSON.parse(programData);
                    console.log("programJson1-------->1", programJson1);

                    datasetList.push({
                        programCode: filteredGetRequestList[i].programCode,
                        programVersion: filteredGetRequestList[i].version,
                        programId: filteredGetRequestList[i].programId,
                        versionId: filteredGetRequestList[i].version,
                        id: filteredGetRequestList[i].id,
                        loading: false,
                        forecastStartDate: (programJson1.currentVersion.forecastStartDate ? moment(programJson1.currentVersion.forecastStartDate).format(`MMM-YYYY`) : ''),
                        forecastStopDate: (programJson1.currentVersion.forecastStopDate ? moment(programJson1.currentVersion.forecastStopDate).format(`MMM-YYYY`) : ''),
                        healthAreaList: programJson1.healthAreaList,
                        consumptionList: programJson1.consumptionList,
                        regionList: programJson1.regionList,
                        label: programJson1.label,
                        realmCountry: programJson1.realmCountry,
                        planningUnitList: programJson1.planningUnitList,
                        treeList: programJson1.treeList
                    });
                    datasetList1.push(filteredGetRequestList[i])
                    // }
                }
                console.log("DATASET-------->", datasetList);
                this.setState({
                    datasetList: datasetList,
                    datasetList1: datasetList1
                }, () => {
                    this.planningUnitList();
                })


            }.bind(this);
        }.bind(this);
    }

    setProgramId(event) {
        // console.log("PID----------------->", document.getElementById("forecastProgramId").value);
        var pID = document.getElementById("forecastProgramId").value;
        if (pID != 0) {
            var sel = document.getElementById("forecastProgramId");
            var tempId = sel.options[sel.selectedIndex].text;
            let forecastProgramVersionId = tempId.split('~')[1];
            let selectedForecastProgram = this.state.datasetList.filter(c => c.programId == pID && c.versionId == forecastProgramVersionId)[0]
            let startDateSplit = selectedForecastProgram.forecastStartDate.split('-');
            let stopDateSplit = selectedForecastProgram.forecastStopDate.split('-');

            let forecastStopDate = new Date(selectedForecastProgram.forecastStartDate);
            forecastStopDate.setMonth(forecastStopDate.getMonth() - 1);

            let d1 = new Date(startDateSplit[1] - 3 + '-' + (new Date(selectedForecastProgram.forecastStartDate).getMonth() + 1) + '-01 00:00:00');
            d1.setMonth(d1.getMonth() - 1);

            this.setState(
                {
                    datasetId: pID,
                    rangeValue: { from: { year: startDateSplit[1] - 3, month: new Date(selectedForecastProgram.forecastStartDate).getMonth() + 1 }, to: { year: forecastStopDate.getFullYear(), month: forecastStopDate.getMonth() + 1 } },
                    startDateDisplay: months[new Date(selectedForecastProgram.forecastStartDate).getMonth()] + ' ' + (startDateSplit[1] - 3),
                    endDateDisplay: months[(forecastStopDate.getMonth())] + ' ' + forecastStopDate.getFullYear(),
                    beforeEndDateDisplay: months[(d1.getMonth())] + ' ' + d1.getFullYear(),
                }, () => {
                    // console.log("d----------->0", d1);
                    // console.log("d----------->00", (d1.getMonth()));
                    // console.log("d----------->1", this.state.startDateDisplay);
                    // console.log("d----------->2", this.state.endDateDisplay);
                    // console.log("d----------->3", this.state.beforeEndDateDisplay);

                    this.filterData();
                })
        } else {
            var dt = new Date();
            dt.setMonth(dt.getMonth() - REPORT_DATEPICKER_START_MONTH);
            var dt1 = new Date();
            dt1.setMonth(dt1.getMonth() + REPORT_DATEPICKER_END_MONTH);
            this.setState(
                {
                    datasetId: 0,
                    rangeValue: { from: { year: dt.getFullYear(), month: dt.getMonth() + 1 }, to: { year: dt1.getFullYear(), month: dt1.getMonth() + 1 } },
                }, () => {
                    this.el = jexcel(document.getElementById("tableDiv"), '');
                    this.el.destroy();
                    this.filterData();
                })
        }

    }

    filterData() {

        let startDate = this.state.rangeValue.from.year + '-' + this.state.rangeValue.from.month + '-01';
        let stopDate = this.state.rangeValue.to.year + '-' + this.state.rangeValue.to.month + '-' + new Date(this.state.rangeValue.to.year, this.state.rangeValue.to.month, 0).getDate();
        var forecastProgramId = document.getElementById("forecastProgramId").value;
        console.log("forecastProgramId--------->", forecastProgramId);

        if (forecastProgramId > 0) {
            var sel = document.getElementById("forecastProgramId");
            var tempId = sel.options[sel.selectedIndex].text;
            let forecastProgramVersionId = tempId.split('~')[1];
            let selectedForecastProgram = this.state.datasetList.filter(c => c.programId == forecastProgramId && c.versionId == forecastProgramVersionId)[0];
            console.log("selectedForecastProgram---------->", selectedForecastProgram);
            this.setState(
                {
                    forecastProgramId: forecastProgramId,
                    forecastProgramVersionId: forecastProgramVersionId,
                    selsource: selectedForecastProgram.planningUnitList,
                    loading: true,
                    // selsource: [
                    //     {
                    //         "a1a": "ARVs",
                    //         "a2a": "Abacavir 300 mg Tablet, 60 Tablets",
                    //         "a3a": true,
                    //         "a4a": true,
                    //         "a5a": "11,199",
                    //         "a6a": "54,714",
                    //         "a7a": "5",
                    //         "a8a": "Custom",
                    //         "a9a": "1.06"
                    //     },
                    //     {
                    //         "a1a": "ARVs",
                    //         "a2a": "Lamivudine 10 mg/mL Solution, 100 mL",
                    //         "a3a": true,
                    //         "a4a": true,
                    //         "a5a": "10,938",
                    //         "a6a": "51,751",
                    //         "a7a": "5",
                    //         "a8a": "GHSC-PSM",
                    //         "a9a": "3.06"
                    //     },
                    //     {
                    //         "a1a": "Condoms",
                    //         "a2a": "Male Condom (Latex) Lubricated, No Logo, 49 mm, 1 Each",
                    //         "a3a": true,
                    //         "a4a": false,
                    //         "a5a": "19,352",
                    //         "a6a": "84,472",
                    //         "a7a": "5",
                    //         "a8a": "GHSC-PSM",
                    //         "a9a": "4.10"
                    //     },
                    //     {
                    //         "a1a": "Condoms",
                    //         "a2a": "Male Condom (Latex) Lubricated, Ultimate Blue, 53 mm, 4320 Pieces",
                    //         "a3a": true,
                    //         "a4a": true,
                    //         "a5a": "12,633",
                    //         "a6a": "83,678",
                    //         "a7a": "5",
                    //         "a8a": "UNFPA",
                    //         "a9a": "5.10"
                    //     }
                    // ],
                    selectedForecastProgram: selectedForecastProgram,
                }, () => {
                    // this.buildJExcel();
                    let planningUnitIds = this.state.selsource.map(ele => ele.planningUnit.id);
                    // console.log("selectedForecastProgram---------->11", planningUnitIds);
                    this.getProcurementAgentPlanningUnitByPlanningUnitIds(planningUnitIds);
                    this.buildJExcel();

                })
        } else {
            this.setState(
                {
                    allowAdd: false
                }, () => {

                })
        }
    }

    handleRangeChange(value, text, listIndex) {

    }
    handleRangeDissmis(value) {
        this.setState({ rangeValue: value }, () => {
            this.filterData();
        })

    }
    _handleClickRangeBox(e) {
        this.refs.pickRange.show()
    }

    makeText = m => {
        if (m && m.year && m.month) return (pickerLang.months[m.month - 1] + '. ' + m.year)
        return '?'
    }

    dateformatter = value => {
        var dt = new Date(value)
        return moment(dt).format('DD-MMM-YY');
    }
    formatter = value => {

        var cell1 = value
        cell1 += '';
        var x = cell1.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }


    buildJExcel() {
        let outPutList = this.state.selsource;
        // console.log("outPutList---->", outPutList);
        let outPutListArray = [];
        let count = 0;
        let indexVar = 0;

        for (var j = 0; j < outPutList.length; j++) {
            data = [];

            data[0] = outPutList[j].planningUnit.forecastingUnit.tracerCategory.id
            data[1] = outPutList[j].planningUnit.id
            data[2] = outPutList[j].consuptionForecast
            data[3] = outPutList[j].treeForecast;
            data[4] = outPutList[j].stock;
            data[5] = outPutList[j].existingShipments;
            data[6] = outPutList[j].monthsOfStock;
            data[7] = (outPutList[j].procurementAgent == null || outPutList[j].procurementAgent == undefined ? -1 : outPutList[j].procurementAgent.id);
            data[8] = outPutList[j].price;
            data[9] = outPutList[j].programPlanningUnitId;
            data[10] = 0;
            data[11] = 0;
            data[12] = outPutList[j].selectedForecastMap;
            data[13] = indexVar;
            data[14] = outPutList[j].treeForecast;

            // data[0] = outPutList[j].a1a;
            // data[1] = outPutList[j].a2a;
            // data[2] = outPutList[j].a3a;
            // data[3] = outPutList[j].a4a;
            // data[4] = outPutList[j].a5a;
            // data[5] = outPutList[j].a6a;
            // data[6] = outPutList[j].a7a;
            // data[7] = outPutList[j].a8a;
            // data[8] = outPutList[j].a9a;
            // data[9] = 0;
            // data[10] = 0;

            outPutListArray[count] = data;
            count++;
            indexVar++;
        }
        // if (costOfInventory.length == 0) {
        //     data = [];
        //     outPutListArray[0] = data;
        // }
        // console.log("outPutListArray---->", outPutListArray);
        this.el = jexcel(document.getElementById("tableDiv"), '');
        this.el.destroy();
        var json = [];
        var data = outPutListArray;

        var options = {
            data: data,
            columnDrag: true,
            colWidths: [100, 150, 60, 60, 60, 60, 60, 100, 60],
            colHeaderClasses: ["Reqasterisk"],
            columns: [
                {
                    title: 'Planning Unit Category',
                    type: 'autocomplete',
                    source: this.state.allTracerCategoryList,
                    filter: this.filterTracerCategoryByHealthArea
                    // readOnly: true// 0A
                },
                {
                    title: 'Planning Unit',
                    type: 'autocomplete',
                    source: this.state.allPlanningUnitList,
                    filter: this.filterPlanningUnitListByTracerCategoryId
                    // readOnly: true //1B
                },
                {
                    title: 'Consumption Forecast?',
                    type: 'checkbox',
                    // readOnly: true //2C
                },
                {
                    title: 'Tree Forecast?',
                    type: 'checkbox',
                    // readOnly: true //3D
                },
                {
                    title: 'Stock (end of ' + this.state.beforeEndDateDisplay + ')',
                    type: 'numeric',
                    textEditor: true,
                    decimal: '.',
                    mask: '#,##',
                    disabledMaskOnEdition: true
                    // readOnly: true //4E
                },
                {
                    title: 'Existing Shipments (' + this.state.startDateDisplay + ' - ' + this.state.endDateDisplay + ')',
                    type: 'numeric',
                    textEditor: true,
                    decimal: '.',
                    mask: '#,##',
                    disabledMaskOnEdition: true
                    // readOnly: true //5F
                },
                {
                    title: 'Desired Months of Stock (end of ' + this.state.endDateDisplay + ')',
                    type: 'numeric',
                    textEditor: true,
                    decimal: '.',
                    mask: '#,##',
                    disabledMaskOnEdition: true
                    // readOnly: true //6G
                },
                {
                    title: 'Price Type',
                    type: 'autocomplete',
                    source: this.state.allProcurementAgentList,
                    filter: this.filterProcurementAgentByPlanningUnit
                    // readOnly: true //7H
                },
                {
                    title: 'Unit Price',
                    type: 'numeric',
                    textEditor: true,
                    decimal: '.',
                    // mask: '#,##.00',
                    // disabledMaskOnEdition: true
                    // readOnly: true //8I
                },
                {
                    title: 'programPlanningUnitId',
                    type: 'hidden',
                    // readOnly: true //9J
                },
                {
                    title: 'isChange',
                    type: 'hidden',
                    // readOnly: true //10K
                },
                {
                    title: 'isNewRowAdded',
                    type: 'hidden',
                    // readOnly: true //11L
                },
                {
                    title: 'selected forecast map',
                    type: 'hidden',
                    // readOnly: true //12M
                },
                {
                    title: 'indexVar',
                    type: 'hidden',
                    // readOnly: true //13N
                },
                {
                    title: 'treeForecast',
                    type: 'hidden',
                    // readOnly: true //14O
                },
                //-----------------
                // {
                //     title: 'Planning Unit Category',
                //     type: 'text',
                //     readOnly: true
                // },
                // {
                //     title: 'Planning Unit',
                //     type: 'text',
                //     readOnly: true
                // },
                // {
                //     title: 'Consumption Forecast?',
                //     type: 'checkbox',
                //     // readOnly: true
                // },
                // {
                //     title: 'Tree Forecast?',
                //     type: 'checkbox',
                //     // readOnly: true
                // },
                // {
                //     title: 'Stock (end of Dec 2020)',
                //     type: 'text',
                //     // readOnly: true
                // },
                // {
                //     title: 'Existing Shipments (Jan 2021 - Dec 2023)',
                //     type: 'text',
                //     // readOnly: true
                // },
                // {
                //     title: 'Desired Months of Stock (end of Dec 2023)',
                //     type: 'text',
                //     // readOnly: true
                // },
                // {
                //     title: 'Price Type',
                //     type: 'text',
                //     // readOnly: true
                // },
                // {
                //     title: 'Unit Price',
                //     type: 'text',
                //     // readOnly: true
                // },
                // {
                //     title: 'Unit Price',
                //     type: 'hidden',
                //     // readOnly: true
                // },
                // {
                //     title: 'Unit Price',
                //     type: 'hidden',
                //     // readOnly: true
                // },
            ],
            updateTable: function (el, cell, x, y, source, value, id) {
                var elInstance = el.jexcel;
                var rowData = elInstance.getRowData(y);
                var programPlanningUnitId = rowData[11];
                if (programPlanningUnitId == 1) {
                    var cell = elInstance.getCell(`B${parseInt(y) + 1}`)
                    var cellA = elInstance.getCell(`A${parseInt(y) + 1}`)
                    cell.classList.remove('readonly');
                    cellA.classList.remove('readonly');
                } else {
                    var cell = elInstance.getCell(`B${parseInt(y) + 1}`)
                    var cellA = elInstance.getCell(`A${parseInt(y) + 1}`)
                    cell.classList.add('readonly');
                    cellA.classList.add('readonly');
                }

                var procurementAgentId = rowData[7];
                if (procurementAgentId == -1) {
                    var cell = elInstance.getCell(`I${parseInt(y) + 1}`)
                    cell.classList.remove('readonly');
                } else {
                    var cell = elInstance.getCell(`I${parseInt(y) + 1}`)
                    cell.classList.add('readonly');
                }

            },
            text: {
                showingPage: `${i18n.t('static.jexcel.showing')} {0} ${i18n.t('static.jexcel.of')} {1} ${i18n.t('static.jexcel.pages')}`,
                show: '',
                entries: '',
            },
            onload: this.loaded,
            pagination: localStorage.getItem("sesRecordCount"),
            search: true,
            columnSorting: true,
            tableOverflow: true,
            wordWrap: true,
            allowInsertColumn: false,
            allowManualInsertColumn: false,
            allowDeleteRow: false,
            // onselection: this.selected,
            onchange: this.changed,


            oneditionend: this.oneditionend,
            copyCompatibility: true,
            allowExport: false,
            paginationOptions: JEXCEL_PAGINATION_OPTION,
            position: 'top',
            filters: true,
            license: JEXCEL_PRO_KEY,
            contextMenu: function (obj, x, y, e) {
                return [];
            }.bind(this),
        };
        var languageEl = jexcel(document.getElementById("tableDiv"), options);
        this.el = languageEl;
        this.setState({
            languageEl: languageEl, loading: false, allowAdd: true
        })
    }

    filterProcurementAgentByPlanningUnit = function (instance, cell, c, r, source) {

        var mylist = [];
        let procurementAgentPlanningUnitList = this.state.responsePa;
        var planningUnitId = (instance.jexcel.getJson(null, false)[r])[1];
        console.log("ID------->", planningUnitId);

        if (planningUnitId !== '') {

            let tempPaList = procurementAgentPlanningUnitList[planningUnitId];
            let paList = tempPaList.map(template => {
                return {
                    name: template.procurementAgent.code,
                    id: template.procurementAgent.id,
                    price: template.catalogPrice
                };
            });

            paList.unshift({
                id: -1,
                name: 'CUSTOM',
                price: 0
            })

            // console.log("planningUnitId------->33", paList);

            return paList;
        } else {
            return [];
        }


    }.bind(this)



    filterPlanningUnitListByTracerCategoryId = function (instance, cell, c, r, source) {
        var mylist = [];
        var tracerCategoryId = (instance.jexcel.getJson(null, false)[r])[0];
        // let planningUnitId = this.getPlanningUnitByTracerCategoryId(tracerCategoryId);
        // let allPlanningUnitList = this.state.allPlanningUnitList;

        // for (var i = 0; i < planningUnitId.length; i++) {
        //     let list = allPlanningUnitList.filter(c => c.id == planningUnitId[i].id)[0];
        //     mylist.push(list);
        // }

        mylist = this.state.allPlanningUnitList.filter(c => c.forecastingUnit.tracerCategory.id == tracerCategoryId);

        console.log("mylist--------->32", mylist);
        return mylist;

    }.bind(this)

    filterTracerCategoryByHealthArea = function (instance, cell, c, r, source) {
        var mylist = [];
        let selectedForecastProgramHealthAreaList = this.state.selectedForecastProgram.healthAreaList;
        for (var i = 0; i < selectedForecastProgramHealthAreaList.length; i++) {
            let list = this.state.allTracerCategoryList.filter(c => c.healthArea.id == selectedForecastProgramHealthAreaList[i].id);
            // mylist.push(list);
            if (list.length != 0) {
                mylist = mylist.concat(list);
            }

        }
        console.log("mylist--------->32", mylist);
        return mylist;

    }.bind(this)

    loaded = function (instance, cell, x, y, value) {
        jExcelLoadedFunction(instance);
    }

    formSubmit = function () {
        var validation = this.checkValidation();
        console.log("validation------------>", validation);
        if (validation == true) {
            this.setState({
                loading: true
            })
            var tableJson = this.el.getJson(null, false);
            var programs = [];
            var count = 0;
            var planningUnitList = [];
            let indexVar = 0;

            console.log("Final-------------->00", this.state.datasetList);
            console.log("Final-------------->01", this.state.forecastProgramId);
            console.log("Final-------------->02", this.state.forecastProgramVersionId);

            var program = (this.state.datasetList1.filter(x => x.programId == this.state.forecastProgramId && x.version == this.state.forecastProgramVersionId)[0]);
            var databytes = CryptoJS.AES.decrypt(program.programData, SECRET_KEY);
            var programData = JSON.parse(databytes.toString(CryptoJS.enc.Utf8));
            console.log("Final-------------->2", programData.planningUnitList);

            let originalPlanningUnitList = programData.planningUnitList;

            let listOfDisablePuNode = [];


            for (var i = 0; i < tableJson.length; i++) {
                var map1 = new Map(Object.entries(tableJson[i]));

                // let planningUnitObj = this.state.allPlanningUnitList.filter(c => c.id == parseInt(map1.get("1")))[0];
                let planningUnitObj = this.state.originalPlanningUnitList.filter(c => c.planningUnitId == parseInt(map1.get("1")))[0];
                let procurementAgentObj = "";
                if (parseInt(map1.get("7")) === -1) {
                    procurementAgentObj = null
                } else {
                    procurementAgentObj = this.state.allProcurementAgentList.filter(c => c.id == parseInt(map1.get("7")))[0];
                }

                if (parseInt(map1.get("11")) == 1) {//new row added
                    let tempJson = {
                        "programPlanningUnitId": parseInt(map1.get("9")),
                        "planningUnit": {
                            "id": parseInt(map1.get("1")),
                            "label": planningUnitObj.label,
                            "unit": planningUnitObj.unit,
                            "multiplier": planningUnitObj.multiplier,
                            "forecastingUnit": {
                                "id": planningUnitObj.forecastingUnit.forecastingUnitId,
                                "label": planningUnitObj.forecastingUnit.label,
                                "unit": planningUnitObj.forecastingUnit.unit,
                                "tracerCategory": planningUnitObj.forecastingUnit.tracerCategory,
                                "idString": "" + planningUnitObj.forecastingUnit.forecastingUnitId
                            },
                            "idString": "" + parseInt(map1.get("1"))
                        },
                        "consuptionForecast": map1.get("2"),
                        "treeForecast": map1.get("3"),
                        "stock": map1.get("4"),
                        "existingShipments": map1.get("5"),
                        "monthsOfStock": map1.get("6"),
                        "procurementAgent": (procurementAgentObj == null ? null : {
                            "id": parseInt(map1.get("7")),
                            "label": procurementAgentObj.label,
                            "code": procurementAgentObj.code,
                            "idString": "" + parseInt(map1.get("7"))
                        }),
                        "price": this.el.getValue(`I${parseInt(i) + 1}`, true).toString().replaceAll(",", ""),
                        "higherThenConsumptionThreshold": null,
                        "lowerThenConsumptionThreshold": null,
                        "consumptionNotes": null,
                        "consumptionDataType": 2,
                        "otherUnit": null,
                        "selectedForecastMap": map1.get("12"),
                        "createdBy": null,
                        "createdDate": null
                    }
                    planningUnitList.push(tempJson);
                } else {

                    let planningUnitobj1 = originalPlanningUnitList[indexVar];
                    let tempJson = {
                        "programPlanningUnitId": parseInt(map1.get("9")),
                        "planningUnit": {
                            "id": parseInt(map1.get("1")),
                            "label": planningUnitObj.label,
                            "unit": planningUnitObj.unit,
                            "multiplier": planningUnitObj.multiplier,
                            "forecastingUnit": {
                                "id": planningUnitObj.forecastingUnit.forecastingUnitId,
                                "label": planningUnitObj.forecastingUnit.label,
                                "unit": planningUnitObj.forecastingUnit.unit,
                                "tracerCategory": planningUnitObj.forecastingUnit.tracerCategory,
                                "idString": "" + planningUnitObj.forecastingUnit.forecastingUnitId
                            },
                            "idString": "" + parseInt(map1.get("1"))
                        },
                        "consuptionForecast": map1.get("2"),
                        "treeForecast": map1.get("3"),
                        "stock": map1.get("4"),
                        "existingShipments": map1.get("5"),
                        "monthsOfStock": map1.get("6"),
                        "procurementAgent": (procurementAgentObj == null ? null : {
                            "id": parseInt(map1.get("7")),
                            "label": procurementAgentObj.label,
                            "code": procurementAgentObj.code,
                            "idString": "" + parseInt(map1.get("7"))
                        }),
                        "price": this.el.getValue(`I${parseInt(i) + 1}`, true).toString().replaceAll(",", ""),
                        "higherThenConsumptionThreshold": planningUnitobj1.higherThenConsumptionThreshold,
                        "lowerThenConsumptionThreshold": planningUnitobj1.lowerThenConsumptionThreshold,
                        "consumptionNotes": planningUnitobj1.consumptionNotes,
                        "consumptionDataType": planningUnitobj1.consumptionDataType,
                        "otherUnit": planningUnitobj1.otherUnit,
                        "selectedForecastMap": map1.get("12"),
                        "createdBy": planningUnitobj1.createdBy,
                        "createdDate": planningUnitobj1.createdDate
                    }
                    planningUnitList.push(tempJson);


                    indexVar = indexVar + 1;
                }


                // let tempJson = {
                //     "programPlanningUnitId": parseInt(map1.get("9")),
                //     "planningUnit": {
                //         "id": parseInt(map1.get("1")),
                //         "label": planningUnitObj.label,
                //         "forecastingUnit": {
                //             "id": planningUnitObj.forecastingUnit.forecastingUnitId,
                //             "label": planningUnitObj.forecastingUnit.label,
                //             "tracerCategory": {
                //                 "id": planningUnitObj.forecastingUnit.tracerCategory.id,
                //                 "label": planningUnitObj.forecastingUnit.tracerCategory.label,
                //                 "idString": planningUnitObj.forecastingUnit.tracerCategory.idString
                //             },
                //             "idString": "" + planningUnitObj.forecastingUnit.forecastingUnitId
                //         },
                //         "idString": "" + parseInt(map1.get("1"))
                //     },
                //     "consuptionForecast": map1.get("2"),
                //     "treeForecast": map1.get("3"),
                //     "stock": map1.get("4"),
                //     "existingShipments": map1.get("5"),
                //     "monthsOfStock": map1.get("6"),
                //     "procurementAgent": (procurementAgentObj == null ? null : {
                //         "id": parseInt(map1.get("7")),
                //         "label": procurementAgentObj.label,
                //         "code": procurementAgentObj.code,
                //         "idString": "" + parseInt(map1.get("7"))
                //     }),
                //     "price": this.el.getValue(`I${parseInt(i) + 1}`, true).toString().replaceAll(",", ""),
                //     "selectedForecastMap":map1.get("12")
                // }

                //logic for null PU Node
                if (map1.get("3") == false && map1.get("14") == true) {
                    listOfDisablePuNode.push(parseInt(map1.get("1")));
                }



            }

            console.log("Final-------------->1", planningUnitList);

            programData.planningUnitList = planningUnitList;


            programData = (CryptoJS.AES.encrypt(JSON.stringify(programData), SECRET_KEY)).toString();
            program.programData = programData;

            programs.push(program);

            console.log("programs to update---1", programs);

            var db1;
            getDatabase();
            var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
            openRequest.onerror = function (event) {
                this.setState({
                    message: i18n.t('static.program.errortext'),
                    color: 'red'
                })
                this.hideFirstComponent()
            }.bind(this);
            openRequest.onsuccess = function (e) {
                db1 = e.target.result;
                var transaction = db1.transaction(['datasetData'], 'readwrite');
                var programTransaction = transaction.objectStore('datasetData');
                programs.forEach(program => {
                    var programRequest = programTransaction.put(program);
                    console.log("---hurrey---");
                })
                transaction.oncomplete = function (event) {
                    // this.props.updateStepOneData("message", i18n.t('static.mt.dataUpdateSuccess'));
                    // this.props.updateStepOneData("color", "green");
                    // this.setState({
                    //     message: i18n.t('static.mt.dataUpdateSuccess'),
                    //     color: "green",
                    // }, () => {
                    //     this.props.hideSecondComponent();
                    //     this.props.finishedStepThree();
                    //     // this.buildJExcel();
                    // });

                    this.setState({
                        // loading: false,
                        message: i18n.t('static.mt.dataUpdateSuccess'),
                        color: "green",
                        // allowAdd: false
                    }, () => {
                        listOfDisablePuNode = [...new Set(listOfDisablePuNode)];
                        if (listOfDisablePuNode.length > 0) {
                            this.disablePUNode(listOfDisablePuNode);
                        }


                        this.hideSecondComponent();
                        // this.filterData();
                        // this.setProgramId();
                        this.getDatasetList();
                    });
                    console.log("Data update success1");
                    // alert("success");


                }.bind(this);
                transaction.onerror = function (event) {
                    this.setState({
                        loading: false,
                        // message: 'Error occured.',
                        color: "red",
                    }, () => {
                        this.hideSecondComponent();
                    });
                    console.log("Data update errr");
                }.bind(this);
            }.bind(this);



        }
    }

    disablePUNode(listOfDisablePuNode) {
        console.log("Test---------------->1", listOfDisablePuNode);
        // var program = (this.state.datasetList1.filter(x => x.programId == this.state.forecastProgramId && x.version == this.state.forecastProgramVersionId)[0]);
        let datasetList1 = this.state.datasetList1;
        for (var i = 0; i < datasetList1.length; i++) {
            var programs = [];
            var program = datasetList1[i];

            var databytes = CryptoJS.AES.decrypt(program.programData, SECRET_KEY);
            var programData = JSON.parse(databytes.toString(CryptoJS.enc.Utf8));

            let treeListForSelectedProgram = programData.treeList;

            for (var j = 0; j < listOfDisablePuNode.length; j++) {
                for (var k = 0; k < treeListForSelectedProgram.length; k++) {
                    let flatlist = treeListForSelectedProgram[k].tree.flatList;
                    let listContainNodeType5 = flatlist.filter(c => c.payload.nodeType.id == 5);
                    console.log("Test---------------->2", listContainNodeType5);
                    for (var l = 0; l < listContainNodeType5.length; l++) {
                        let nodeDataMap = listContainNodeType5[l].payload.nodeDataMap;
                        let nodeDataMapKeys = Object.keys(listContainNodeType5[l].payload.nodeDataMap);
                        console.log("Test---------------->3", nodeDataMap + ' ----- ' + nodeDataMapKeys);
                        for (var m = 0; m < nodeDataMapKeys.length; m++) {
                            let insideArrayOfNodeDataMap = nodeDataMap[nodeDataMapKeys[m]];
                            console.log("Test---------------->4", insideArrayOfNodeDataMap);
                            for (var n = 0; n < insideArrayOfNodeDataMap.length; n++) {
                                if (insideArrayOfNodeDataMap[n].puNode.planningUnit.id == parseInt(listOfDisablePuNode[j])) {
                                    console.log("Test---------------->5", insideArrayOfNodeDataMap[n]);
                                    console.log("Test---------------->6", insideArrayOfNodeDataMap[n].puNode.planningUnit.id);
                                    insideArrayOfNodeDataMap[n].puNode.planningUnit.id = null;
                                }
                            }
                        }
                    }
                }
            }
            console.log("Test---------------->7", treeListForSelectedProgram);

            programData.treeList = treeListForSelectedProgram;

            programData = (CryptoJS.AES.encrypt(JSON.stringify(programData), SECRET_KEY)).toString();
            program.programData = programData;

            programs.push(program);

            console.log("programs to update---", programs);

            var db1;
            getDatabase();
            var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
            openRequest.onerror = function (event) {
                this.setState({
                    message: i18n.t('static.program.errortext'),
                    color: 'red'
                })
                this.hideFirstComponent()
            }.bind(this);
            openRequest.onsuccess = function (e) {
                db1 = e.target.result;
                var transaction = db1.transaction(['datasetData'], 'readwrite');
                var programTransaction = transaction.objectStore('datasetData');
                programs.forEach(program => {
                    var programRequest = programTransaction.put(program);
                    console.log("---hurrey---");
                })
                transaction.oncomplete = function (event) {
                    // this.props.updateStepOneData("message", i18n.t('static.mt.dataUpdateSuccess'));
                    // this.props.updateStepOneData("color", "green");
                    // this.setState({
                    //     message: i18n.t('static.mt.dataUpdateSuccess'),
                    //     color: "green",
                    // }, () => {
                    //     this.props.hideSecondComponent();
                    //     this.props.finishedStepThree();
                    //     // this.buildJExcel();
                    // });

                    this.setState({
                        // loading: false,
                        // message: i18n.t('static.mt.dataUpdateSuccess'),
                        // color: "green",
                        // allowAdd: false
                    }, () => {
                        // this.hideSecondComponent();
                        // this.filterData();
                        // this.setProgramId();
                        // this.getDatasetList();
                    });
                    console.log("Data update success");
                    // alert("success");


                }.bind(this);
                transaction.onerror = function (event) {
                    this.setState({
                        loading: false,
                        // message: 'Error occured.',
                        color: "red",
                    }, () => {
                        this.hideSecondComponent();
                    });
                    console.log("Data update errr");
                }.bind(this);
            }.bind(this);
        }

    }

    addRow = function () {

        var json = this.el.getJson(null, false);
        var data = [];
        data[0] = "";
        data[1] = "";
        data[2] = true;
        data[3] = true;
        data[4] = "";
        data[5] = "";
        data[6] = "";
        data[7] = "";
        data[8] = "";
        data[9] = 0;
        data[10] = 1;
        data[11] = 1;
<<<<<<< HEAD
        data[12] = null;
        data[13] = -1;
        data[14] = true;
=======
        data[12] = {};
>>>>>>> devMod2Shrutika

        this.el.insertRow(
            data, 0, 1
        );
    };

    render() {

        const { SearchBar, ClearSearchButton } = Search;
        const customTotal = (from, to, size) => (
            <span className="react-bootstrap-table-pagination-total">
                {i18n.t('static.common.result', { from, to, size })}
            </span>
        );


        const { datasetList } = this.state;
        let datasets = datasetList.length > 0
            && datasetList.map((item, i) => {
                return (
                    <option key={i} value={item.programId}>
                        {item.programCode + '~' + item.versionId}
                    </option>
                )
            }, this);

        const { rangeValue } = this.state
        const makeText = m => {
            if (m && m.year && m.month) return (pickerLang.months[m.month - 1] + '. ' + m.year)
            return '?'
        }


        return (
            <div className="animated fadeIn" >

                <AuthenticationServiceComponent history={this.props.history} />
                {/* <h5 className="red">{i18n.t(this.state.message)}</h5> */}
                <h5 className={this.state.color} id="div2">{i18n.t(this.state.message)}</h5>
                <Card>
                    <div className="Card-header-reporticon">

                    </div>

                    <CardBody className="pb-lg-3 pt-lg-0">
                        <div className="TableCust" >
                            <div ref={ref}>

                                <Col md="12 pl-0">
                                    <div className="row">
                                        <FormGroup className="col-md-3">
                                            <Label htmlFor="appendedInputButton">{i18n.t('static.program.program')}</Label>
                                            <div className="controls ">
                                                <InputGroup>
                                                    <Input
                                                        type="select"
                                                        name="forecastProgramId"
                                                        id="forecastProgramId"
                                                        bsSize="sm"
                                                        onChange={(e) => { this.setProgramId(e); }}
                                                        value={this.state.datasetId}
                                                        disabled={this.state.loading}
                                                    >
                                                        <option value="0">{i18n.t('static.common.select')}</option>
                                                        {datasets}
                                                    </Input>

                                                </InputGroup>
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="col-md-3">
                                            <Label htmlFor="appendedInputButton">Forecast Period</Label>
                                            <div className="controls edit">

                                                <Picker
                                                    ref="pickRange"
                                                    years={{ min: this.state.minDate, max: this.state.maxDate }}
                                                    value={rangeValue}
                                                    lang={pickerLang}
                                                    // disable={true}
                                                    //theme="light"
                                                    onChange={this.handleRangeChange}
                                                    onDismiss={this.handleRangeDissmis}
                                                >
                                                    {/* <MonthBox value={this.makeText(rangeValue.from) + ' ~ ' + this.makeText(rangeValue.to)} onClick={this._handleClickRangeBox} /> */}
                                                    <MonthBox value={makeText(rangeValue.from) + ' ~ ' + makeText(rangeValue.to)} onClick={this._handleClickRangeBox} />
                                                </Picker>
                                            </div>

                                        </FormGroup>


                                    </div>
                                </Col>


                            </div>
                        </div>

                        <div className="" style={{ display: this.state.loading ? "none" : "block" }}>
                            <div id="tableDiv">
                            </div>
                        </div>
                        <div style={{ display: this.state.loading ? "block" : "none" }}>
                            <div className="d-flex align-items-center justify-content-center" style={{ height: "500px" }} >
                                <div class="align-items-center">
                                    <div ><h4> <strong>{i18n.t('static.common.loading')}</strong></h4></div>

                                    <div class="spinner-border blue ml-4" role="status">

                                    </div>
                                </div>
                            </div>
                        </div>

                    </CardBody>

                    {
                        this.state.allowAdd &&
                        <CardFooter>
                            {/* {AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_MANAGE_REALM_COUNTRY_PLANNING_UNIT') && */}
                            <FormGroup>
                                <Button type="button" size="md" color="danger" className="float-right mr-1" onClick={this.cancelClicked}><i className="fa fa-times"></i> {i18n.t('static.common.cancel')}</Button>
                                <Button type="submit" size="md" color="success" onClick={this.formSubmit} className="float-right mr-1" ><i className="fa fa-check"></i>{i18n.t('static.common.submit')}</Button>
                                <Button color="info" size="md" className="float-right mr-1" type="button" onClick={() => this.addRow()}> <i className="fa fa-plus"></i> {i18n.t('static.common.addRow')}</Button>
                                &nbsp;
                            </FormGroup>
                            {/* } */}
                        </CardFooter>
                    }

                </Card>
            </div>
        );
    }
}