import React, { Component } from 'react';
import jexcel from 'jexcel-pro';
import "../../../node_modules/jexcel-pro/dist/jexcel.css";
import "../../../node_modules/jsuites/dist/jsuites.css";
import AuthenticationService from '../Common/AuthenticationService.js';
import i18n from '../../i18n';
import csvicon from '../../assets/img/csv.png';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {
    Badge,
    Button,
    ButtonDropdown,
    ButtonGroup,
    ButtonToolbar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,
    Widgets,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Progress,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    CardColumns,
    Table, FormGroup, Input, InputGroup, InputGroupAddon, Label, Form
} from 'reactstrap';
import Picker from 'react-month-picker'
import MonthBox from '../../CommonComponent/MonthBox.js';
import ProgramService from '../../api/ProgramService';
import getLabelText from '../../CommonComponent/getLabelText';
import { contrast } from "../../CommonComponent/JavascriptCommonFunctions";
import { jExcelLoadedFunctionOnlyHideRow, jExcelLoadedFunctionWithoutPagination } from '../../CommonComponent/JExcelCommonFunctions.js'
import AuthenticationServiceComponent from '../Common/AuthenticationServiceComponent';
import { JEXCEL_INTEGER_REGEX, JEXCEL_DECIMAL_LEAD_TIME, JEXCEL_DECIMAL_CATELOG_PRICE, JEXCEL_PRO_KEY, MONTHS_IN_FUTURE_FOR_AMC, MONTHS_IN_PAST_FOR_AMC, REPORT_DATEPICKER_START_MONTH, REPORT_DATEPICKER_END_MONTH, JEXCEL_PAGINATION_OPTION, JEXCEL_MONTH_PICKER_FORMAT, INDEXED_DB_NAME, INDEXED_DB_VERSION, SECRET_KEY } from '../../Constants.js';
import moment from "moment";
import { getDatabase } from "../../CommonComponent/IndexedDbFunctions";
import CryptoJS from 'crypto-js';



export default class StepThreeImportMapPlanningUnits extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lang: localStorage.getItem('lang'),
            loading: false,
            selSource: [],
            actualConsumptionData: [],
            stepOneData: [],
            datasetList: [],
            forecastProgramVersionId: '',
            forecastProgramId: '',
            startDate: '',
            stopDate: '',

        }

        this.buildJexcel = this.buildJexcel.bind(this);
        this.formSubmit = this.formSubmit.bind(this);

    }

    formSubmit() {
        confirmAlert({
            title: i18n.t('static.program.confirmsubmit'),
            message: "Selected rows will be imported. Note that imported data will override any existing consumption for those months, region & planning units.",
            buttons: [
                {
                    label: i18n.t('static.program.yes'),
                    onClick: () => {
                        var tableJson = this.el.getJson(null, false);
                        var programs = [];
                        var ImportListNotPink = [];
                        var ImportListPink = [];

                        let datasetList = this.props.items.datasetList
                        let forecastProgramVersionId = this.props.items.forecastProgramVersionId
                        let forecastProgramId = this.props.items.forecastProgramId
                        let selectedForecastProgramObj = datasetList.filter(c => c.programId == forecastProgramId && c.versionId == forecastProgramVersionId)[0];

                        var userBytes = CryptoJS.AES.decrypt(localStorage.getItem('curUser'), SECRET_KEY);
                        var userId = userBytes.toString(CryptoJS.enc.Utf8);
                        let decryptedCurUser = CryptoJS.AES.decrypt(localStorage.getItem('curUser').toString(), `${SECRET_KEY}`).toString(CryptoJS.enc.Utf8);
                        let decryptedUser = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("user-" + decryptedCurUser), `${SECRET_KEY}`).toString(CryptoJS.enc.Utf8));
                        let username = decryptedUser.username;

                        for (var i = 0; i < tableJson.length; i++) {
                            var map1 = new Map(Object.entries(tableJson[i]));

                            let selectedPlanningUnitObj = this.props.items.planningUnitList.filter(c => c.planningUnitId == map1.get("0"))[0];

                            if (map1.get("9") == 0 && map1.get("8") == true) { //not pink
                                let tempJson = {
                                    "forecastConsumptionId": '',
                                    "program": {
                                        "id": selectedForecastProgramObj.programId,
                                        "label": selectedForecastProgramObj.label,
                                        "code": selectedForecastProgramObj.programCode,
                                        "idString": "" + selectedForecastProgramObj.programId
                                    },
                                    "consumptionUnit": {
                                        "forecastConsumptionUnitId": '',
                                        "dataType": 1,
                                        "forecastingUnit": selectedPlanningUnitObj.forecastingUnit,
                                        "planningUnit": {
                                            "id": selectedPlanningUnitObj.planningUnitId,
                                            "label": selectedPlanningUnitObj.label,
                                            "multiplier": selectedPlanningUnitObj.multiplier,
                                            "idString": '' + selectedPlanningUnitObj.planningUnitId,
                                        },
                                        "otherUnit": null
                                    },
                                    "region": {
                                        "id": map1.get("10"),
                                        "label": null,
                                        "idString": '' + map1.get("10")
                                    },
                                    "month": map1.get("3"),
                                    // "actualConsumption": map1.get("4"),
                                    "actualConsumption": this.el.getValue(`E${parseInt(i) + 1}`, true).toString().replaceAll(",", ""),
                                    "reportingRate": null,
                                    "daysOfStockOut": null,
                                    "exclude": false,
                                    "versionId": selectedForecastProgramObj.versionId,
                                    "createdBy": {
                                        "userId": userId,
                                        "username": username
                                    },
                                    "createdDate": new Date().toISOString().slice(0, 10) + " 19:43:38"
                                }


                                ImportListNotPink.push(tempJson);
                            }

                            if (map1.get("9") == 1 && map1.get("8") == true) {
                                let tempJsonPink = {
                                    regionId: map1.get("10"),
                                    planningUnitId: map1.get("0"),
                                    month: map1.get("3"),
                                    // actualConsumption: map1.get("4"),
                                    actualConsumption: this.el.getValue(`E${parseInt(i) + 1}`, true).toString().replaceAll(",", ""),
                                }
                                ImportListPink.push(tempJsonPink);
                            }

                            // console.log("map1.get(3)---", map1.get("3"));
                            // console.log("map1.get(12)---", map1.get("12"));
                            // console.log("map1.get(7)---", map1.get("7"));
                            // console.log("map1.get(8)---", map1.get("8"));
                            // var notes = map1.get("4");
                            // var startDate = map1.get("7");
                            // var stopDate = map1.get("8");
                            // var id = map1.get("10");
                            // var noOfDaysInMonth = map1.get("12");
                            // console.log("start date ---", startDate);
                            // console.log("stop date ---", stopDate);
                            // console.log("noOfDaysInMonth ---", noOfDaysInMonth);

                        }

                        var program = (this.props.items.datasetList1.filter(x => x.programId == this.props.items.forecastProgramId && x.version == this.props.items.forecastProgramVersionId)[0]);
                        var databytes = CryptoJS.AES.decrypt(program.programData, SECRET_KEY);
                        var programData = JSON.parse(databytes.toString(CryptoJS.enc.Utf8));

                        // programData.currentVersion.forecastStartDate = startDate;
                        // programData.actionList = [1, 2]

                        console.log("Final-------------->", programData.consumptionList);
                        let originalConsumptionList = programData.consumptionList;
                        for (var i = 0; i < ImportListPink.length; i++) {
                            // let match = originalConsumptionList.filter(c => new Date(c.month).getTime() == new Date(papuList[j].month).getTime() && c.region.id == papuList[j].region.id && c.consumptionUnit.planningUnit.id == stepOneSelectedObject.forecastPlanningUnitId)
                            let index = originalConsumptionList.findIndex(c => new Date(c.month).getTime() == new Date(ImportListPink[i].month).getTime() && c.region.id == ImportListPink[i].regionId && c.consumptionUnit.planningUnit.id == ImportListPink[i].planningUnitId)

                            if (index != -1) {
                                let indexObj = originalConsumptionList[index];
                                indexObj.actualConsumption = ImportListPink[i].actualConsumption;
                                originalConsumptionList[index] = indexObj;
                            }
                        }

                        console.log("Final-------------->11", ImportListNotPink);
                        console.log("Final-------------->12", ImportListPink);
                        console.log("Final-------------->13", originalConsumptionList.concat(ImportListNotPink));
                        programData.consumptionList = originalConsumptionList.concat(ImportListNotPink);


                        programData = (CryptoJS.AES.encrypt(JSON.stringify(programData), SECRET_KEY)).toString();
                        program.programData = programData;
                        // var db1;
                        // getDatabase();
                        // var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
                        // openRequest.onerror = function (event) {
                        //     this.setState({
                        //         message: i18n.t('static.program.errortext'),
                        //         color: 'red'
                        //     })
                        //     this.hideFirstComponent()
                        // }.bind(this);
                        // openRequest.onsuccess = function (e) {
                        //     db1 = e.target.result;
                        //     var transaction = db1.transaction(['datasetData'], 'readwrite');
                        //     var programTransaction = transaction.objectStore('datasetData');
                        //     var programRequest = programTransaction.put(program);
                        //     programRequest.onerror = function (e) {

                        //     }.bind(this);
                        //     programRequest.onsuccess = function (e) {

                        //     }.bind(this);
                        // }.bind(this);
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
                                console.log("Data update success");
                                // this.props.history.push(`/dataSource/listDataSource/` + 'red/' + i18n.t('static.message.cancelled'))
                                this.props.history.push(`/importFromQATSupplyPlan/listImportFromQATSupplyPlan/` + 'green/' + i18n.t('static.mt.dataUpdateSuccess'))
                                // this.props.history.push('/importFromQATSupplyPlan/listImportFromQATSupplyPlan/' + 'green/' + i18n.t('static.mt.dataUpdateSuccess'));
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
                },
                {
                    label: i18n.t('static.program.no')
                }
            ]
        });

    }

    loaded = function (instance, cell, x, y, value) {
        jExcelLoadedFunctionWithoutPagination(instance);
        var asterisk = document.getElementsByClassName("resizable")[0];
        var tr = asterisk.firstChild;
        // tr.children[1].classList.add('AsteriskTheadtrTd');
        // tr.children[2].classList.add('AsteriskTheadtrTd');

        // var elInstance = instance.jexcel;
        // var json = elInstance.getJson();
        // // console.log("elInstance---->", elInstance);

        // var colArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
        // for (var j = 0; j < json.length; j++) {


        //     var rowData = elInstance.getRowData(j);
        //     // console.log("elInstance---->", elInstance);

        //     var id = rowData[9];
        //     console.log("elInstance---->", id);

        //     if (id == 1) {
        //         for (var i = 0; i < colArr.length; i++) {
        //             elInstance.setStyle(`${colArr[i]}${parseInt(j) + 1}`, 'background-color', 'transparent');
        //             elInstance.setStyle(`${colArr[i]}${parseInt(j) + 1}`, 'background-color', '#f48282');
        //             let textColor = contrast('#f48282');
        //             elInstance.setStyle(`${colArr[i]}${parseInt(j) + 1}`, 'color', textColor);
        //         }
        //     } else {
        //         for (var i = 0; i < colArr.length; i++) {
        //             elInstance.setStyle(`${colArr[i]}${parseInt(j) + 1}`, 'background-color', 'transparent');
        //         }
        //     }
        // }
    }

    componentDidMount() {

    }

    filterData() {
        // let tempList = [];
        // tempList.push({ id: 1, v1: 'Male Condom (Latex) Lubricated, No Logo, 53 mm, 3000 Pieces [4182]', v2: 'Male Condom (Latex) Lubricated, No Logo, 53 mm, 4320 Pieces [6357]', v3: 'National', v4: 'Jan-21', v5: '0.694444', v6: '4250', v7: '2951.39', v8: '2951.39', v9: true });
        // tempList.push({ id: 2, v1: 'Male Condom (Latex) Lubricated, No Logo, 53 mm, 3000 Pieces [4182]', v2: 'Male Condom (Latex) Lubricated, No Logo, 53 mm, 4320 Pieces [6357]', v3: 'National', v4: 'Feb-21', v5: '0.694444', v6: '4000', v7: '2777.78', v8: '3000.00', v9: true });
        // tempList.push({ id: 3, v1: 'Male Condom (Latex) Lubricated, No Logo, 53 mm, 3000 Pieces [4182]', v2: 'Male Condom (Latex) Lubricated, No Logo, 53 mm, 4320 Pieces [6357]', v3: 'National', v4: 'Mar-21', v5: '0.694444', v6: '3850', v7: '2673.61', v8: '3100.00', v9: true });
        // tempList.push({ id: 4, v1: 'Male Condom (Latex) Lubricated, No Logo, 53 mm, 3000 Pieces [4182]', v2: 'Male Condom (Latex) Lubricated, No Logo, 53 mm, 4320 Pieces [6357]', v3: 'National', v4: 'Apr-21', v5: '0.694444', v6: '4200', v7: '2916.67', v8: '', v9: true });
        // tempList.push({ id: 5, v1: 'Male Condom (Latex) Lubricated, No Logo, 53 mm, 3000 Pieces [4182]', v2: 'Male Condom (Latex) Lubricated, No Logo, 53 mm, 4320 Pieces [6357]', v3: 'National', v4: 'May-21', v5: '0.694444', v6: '4530', v7: '3145.83', v8: '', v9: true });
        // tempList.push({ id: 6, v1: 'Male Condom (Latex) Lubricated, No Logo, 53 mm, 3000 Pieces [4182]', v2: 'Male Condom (Latex) Lubricated, No Logo, 53 mm, 4320 Pieces [6357]', v3: 'National', v4: 'Jun-21', v5: '0.694444', v6: '4250', v7: '2951.39', v8: '', v9: true });
        // tempList.push({ id: 7, v1: 'Male Condom (Latex) Lubricated, No Logo, 53 mm, 3000 Pieces [4182]', v2: 'Male Condom (Latex) Lubricated, No Logo, 53 mm, 4320 Pieces [6357]', v3: 'National', v4: 'Jul-21', v5: '0.694444', v6: '4100', v7: '2847.22', v8: '', v9: true });
        // tempList.push({ id: 8, v1: 'Male Condom (Latex) Lubricated, No Logo, 53 mm, 3000 Pieces [4182]', v2: 'Male Condom (Latex) Lubricated, No Logo, 53 mm, 4320 Pieces [6357]', v3: 'National', v4: 'Aug-21', v5: '0.694444', v6: '3900', v7: '2708.33', v8: '', v9: true });

        // this.setState({
        //     selSource: tempList,
        //     loading: true
        // },
        //     () => {
        //         this.buildJexcel();
        //     })

        let forecastPlanningUnitList = this.props.items.stepOneData.filter(c => c.forecastPlanningUnitId != -1);
        let supplyPlanPlanningUnitId = forecastPlanningUnitList.map(ele => ele.supplyPlanPlanningUnitId);

        let regionList = this.props.items.stepTwoData.filter(c => c.isRegionInForecastProgram == 1 && c.importRegion == 1);
        let regionIds = regionList.map(ele => ele.supplyPlanRegionId);

        // let ActualConsumptionDataInput = { "programId": 2442, "versionId": 1, "planningUnitIds": ["1074", "1082", "2802"], "startDate": "2018-01-01", "stopDate": "2021-12-01", "regionIds": ["70", "73", "74"] }

        let ActualConsumptionDataInput = {
            programId: this.props.items.programId,
            versionId: this.props.items.versionId,
            planningUnitIds: supplyPlanPlanningUnitId,
            startDate: this.props.items.startDate,
            stopDate: this.props.items.stopDate,
            regionIds: regionIds
        }

        console.log("ActualConsumptionDataInput-------------->", ActualConsumptionDataInput);


        ProgramService.getActualConsumptionData(ActualConsumptionDataInput)
            .then(response => {
                if (response.status == 200) {
                    console.log("getActualConsumptionData------>", response.data);
                    this.setState({
                        actualConsumptionData: response.data,
                        selSource: response.data
                    }, () => {
                        this.buildJexcel();
                    })
                } else {
                    this.setState({
                        actualConsumptionData: []
                    });
                }
            }).catch(
                error => {
                    if (error.message === "Network Error") {
                        this.setState({
                            message: 'static.unkownError',
                            loading: false, color: 'red'
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
                                    loading: false, color: 'red'
                                });
                                break;
                            case 412:
                                this.setState({
                                    message: error.response.data.messageCode,
                                    loading: false, color: 'red'
                                });
                                break;
                            default:
                                this.setState({
                                    message: 'static.unkownError',
                                    loading: false, color: 'red'
                                });
                                break;
                        }
                    }
                }
            );


    }

    buildJexcel() {
        var papuList = this.state.selSource;
        var data = [];
        var papuDataArr = [];

        var count = 0;
        if (papuList.length != 0) {
            for (var j = 0; j < papuList.length; j++) {

                let stepOneSelectedObject = this.props.items.stepOneData.filter(c => c.supplyPlanPlanningUnitId == papuList[j].planningUnit.id)[0];
                // console.log("stepOneSelectedObject-------->1", this.props.items.stepOneData);
                // console.log("stepOneSelectedObject-------->2", papuList[j].planningUnit.id);
                // console.log("stepOneSelectedObject-------->3", stepOneSelectedObject);

                let selectedForecastProgram = this.props.items.datasetList.filter(c => c.programId == this.props.items.forecastProgramId && c.versionId == this.props.items.forecastProgramVersionId)[0];

                // console.log("selectedForecastProgram-------->4", selectedForecastProgram);

                let match = selectedForecastProgram.consumptionList.filter(c => new Date(c.month).getTime() == new Date(papuList[j].month).getTime() && c.region.id == papuList[j].region.id && c.consumptionUnit.planningUnit.id == stepOneSelectedObject.forecastPlanningUnitId)
                // let match = selectedForecastProgram.consumptionList.filter(c => new Date(c.month).getTime() == new Date(papuList[j].month).getTime() && c.region.id == papuList[j].region.id)

                data = [];
                data[0] = papuList[j].planningUnit.id
                data[1] = stepOneSelectedObject.forecastPlanningUnitId
                data[2] = getLabelText(papuList[j].region.label, this.state.lang)
                data[3] = papuList[j].month

                data[4] = papuList[j].actualConsumption
                data[5] = stepOneSelectedObject.multiplier
                data[6] = (stepOneSelectedObject.multiplier * papuList[j].actualConsumption).toFixed(6)
                data[7] = (match.length > 0 ? match[0].actualConsumption : '')
                data[8] = true
                data[9] = (match.length > 0 ? 1 : 0)
                data[10] = papuList[j].region.id

                papuDataArr[count] = data;
                count++;
            }
        }

        // if (papuDataArr.length == 0) {
        //     data = [];
        //     data[0] = 0;
        //     data[1] = "";
        //     data[2] = true
        //     data[3] = "";
        //     data[4] = "";
        //     data[5] = 1;
        //     data[6] = 1;
        //     papuDataArr[0] = data;
        // }

        this.el = jexcel(document.getElementById("mapPlanningUnit"), '');
        this.el.destroy();

        this.el = jexcel(document.getElementById("mapRegion"), '');
        this.el.destroy();

        this.el = jexcel(document.getElementById("mapImport"), '');
        this.el.destroy();

        var json = [];
        var data = papuDataArr;
        console.log("data.length---------->", data.length);

        let planningUnitListJexcel = this.props.items.planningUnitListJexcel
        planningUnitListJexcel.splice(0, 1);

        var options = {
            data: data,
            columnDrag: true,
            colWidths: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            columns: [

                {
                    title: 'Supply Plan Planning Unit',
                    type: 'dropdown',
                    source: planningUnitListJexcel,//A0
                    // readOnly: true
                },
                {
                    title: 'Forecasting planning Unit',
                    type: 'dropdown',
                    source: planningUnitListJexcel,//B1
                    // readOnly: true
                },
                {
                    title: 'Region',
                    type: 'text',
                    textEditor: true,
                    // readOnly: true//C2
                },
                {
                    title: 'Month',
                    type: 'calendar',
                    options: {
                        format: JEXCEL_MONTH_PICKER_FORMAT,
                        type: 'year-month-picker'
                    },
                    // readOnly: true//D3
                },
                {
                    title: 'Actual Consumption(Supply Plan Module)',
                    type: 'numeric',
                    mask: '#,##',
                    textEditor: true,
                    // readOnly: true//E4
                },
                {
                    title: 'Conversion Factor(Supply Plan to Forecast)',
                    type: 'text',
                    textEditor: true,
                    // readOnly: true//F5
                },
                {
                    title: 'Converted Actual Consumption(Supply Plan Module)',
                    type: 'numeric',
                    decimal: '.',
                    mask: '#,##.00',
                    textEditor: true,
                    // readOnly: true//G6
                },
                {
                    title: 'Current Actual Consumption(Forecast Module)',
                    type: 'numeric',
                    mask: '#,##',
                    textEditor: true,
                    // readOnly: true//H7
                },
                {
                    title: 'Import?',
                    type: 'checkbox'//I8
                },
                {
                    title: 'duplicate',
                    type: 'hidden'//J9
                },
                {
                    title: 'regionId',
                    type: 'hidden'//K10
                },


            ],
            // updateTable: function (el, cell, x, y, source, value, id) {
            //     console.log("INSIDE UPDATE TABLE");
            //     var elInstance = el.jexcel;
            //     var colArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
            //     var rowData = elInstance.getRowData(y);
            //     // console.log("elInstance---->", elInstance);
            //     var id = rowData[9];

            //     if (id == 1) {
            //         for (var i = 0; i < colArr.length; i++) {
            //             elInstance.setStyle(`${colArr[i]}${parseInt(y) + 1}`, 'background-color', 'transparent');
            //             elInstance.setStyle(`${colArr[i]}${parseInt(y) + 1}`, 'background-color', '#f48282');
            //             let textColor = contrast('#f48282');
            //             elInstance.setStyle(`${colArr[i]}${parseInt(y) + 1}`, 'color', textColor);
            //         }
            //     } else {
            //         for (var i = 0; i < colArr.length; i++) {
            //             elInstance.setStyle(`${colArr[i]}${parseInt(y) + 1}`, 'background-color', 'transparent');
            //         }
            //     }

            // }.bind(this),
            // editable: false,
            pagination: false,
            filters: true,
            search: true,
            columnSorting: true,
            tableOverflow: true,
            wordWrap: true,
            paginationOptions: JEXCEL_PAGINATION_OPTION,
            // position: 'top',
            allowInsertColumn: false,
            allowManualInsertColumn: false,
            // allowDeleteRow: true,
            // onchange: this.changed,
            // oneditionend: this.onedit,
            copyCompatibility: true,
            allowManualInsertRow: false,
            parseFormulas: true,
            // onpaste: this.onPaste,
            // oneditionend: this.oneditionend,
            text: {
                // showingPage: `${i18n.t('static.jexcel.showing')} {0} ${i18n.t('static.jexcel.to')} {1} ${i18n.t('static.jexcel.of')} {1}`,
                showingPage: `${i18n.t('static.jexcel.showing')} {0} ${i18n.t('static.jexcel.of')} {1} ${i18n.t('static.jexcel.pages')}`,
                show: '',
                entries: '',
            },
            onload: this.loaded,
            editable: true,
            license: JEXCEL_PRO_KEY,
            contextMenu: false
        };

        var languageEl = jexcel(document.getElementById("mapImport"), options);
        this.el = languageEl;
        this.setState({
            languageEl: languageEl, loading: false
        })
    }

    render() {
        const { rangeValue } = this.state
        return (
            <>
                <div className="Card-header-reporticon">
                    {/* <i className="icon-menu"></i><strong>{i18n.t('static.dashboard.globalconsumption')}</strong> */}
                    {this.state.selSource.length > 0 && <div className="card-header-actions">
                        <a className="card-header-action">
                            <img style={{ height: '25px', width: '25px', cursor: 'pointer' }} src={csvicon} title={i18n.t('static.report.exportCsv')} onClick={() => this.exportCSV()} />
                        </a>
                    </div>}
                </div>
                <AuthenticationServiceComponent history={this.props.history} />
                {/* <h4 className="red">{this.props.message}</h4> */}
                <ul className="legendcommitversion list-group">
                    <li><span className="legendcolor" style={{ backgroundColor: "yellow" }}></span><h5 className="red">Data already exists in Forecast Program</h5></li>
                </ul>
                <h5 className="red">All values below are in supply planning units.</h5>
                {/* <p><span className="legendcolor" style={{ backgroundColor: "yellow" }}></span> <span className="legendcommitversionText">abccsvsvsn vrsvw</span></p> */}
                <div className="table-responsive" style={{ display: this.state.loading ? "none" : "block" }} >

                    <div id="mapImport" className="jexcelremoveReadonlybackground">
                    </div>
                </div>
                <div style={{ display: this.state.loading ? "block" : "none" }}>
                    <div className="d-flex align-items-center justify-content-center" style={{ height: "500px" }} >
                        <div class="align-items-center">
                            <div ><h4> <strong>{i18n.t('static.loading.loading')}</strong></h4></div>

                            <div class="spinner-border blue ml-4" role="status">

                            </div>
                        </div>
                    </div>
                </div>
                <FormGroup>
                    {/* <Button color="info" size="md" className="float-right mr-1" type="submit" onClick={() => this.formSubmit()}>{i18n.t('static.common.next')} <i className="fa fa-angle-double-right"></i></Button> */}
                    <Button color="success" size="md" className="float-right mr-1" type="button" onClick={this.formSubmit}> <i className="fa fa-check"></i>Import</Button>
                    &nbsp;
                    {/* <Button color="info" size="md" className="float-right mr-1" type="button" onClick={this.props.previousToStepOne} > <i className="fa fa-angle-double-left"></i> {i18n.t('static.common.back')}</Button> */}
                    <Button color="info" size="md" className="float-left mr-1 px-4" type="button" onClick={this.props.previousToStepTwo} > <i className="fa fa-angle-double-left "></i>  {i18n.t('static.common.back')}</Button>
                    &nbsp;
                </FormGroup>
            </>
        );
    }

}