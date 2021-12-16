import React, { Component, lazy } from 'react';
import { Bar } from 'react-chartjs-2';
import { MultiSelect } from "react-multi-select-component";
import {
    Card,
    CardBody,
    Col,
    Table, FormGroup, Input, InputGroup, Label, Form
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import i18n from '../../i18n'
import AuthenticationService from '../Common/AuthenticationService.js';
import RealmService from '../../api/RealmService';
import getLabelText from '../../CommonComponent/getLabelText';
import PlanningUnitService from '../../api/PlanningUnitService';
import ProductService from '../../api/ProductService';
import Picker from 'react-month-picker'
import MonthBox from '../../CommonComponent/MonthBox.js'
import ProgramService from '../../api/ProgramService';
import CryptoJS from 'crypto-js'
import { SECRET_KEY, INDEXED_DB_VERSION, INDEXED_DB_NAME, polling, DATE_FORMAT_CAP_WITHOUT_DATE } from '../../Constants.js'
import moment from "moment";
import { getDatabase } from "../../CommonComponent/IndexedDbFunctions";
import pdfIcon from '../../assets/img/pdf.png';
import csvicon from '../../assets/img/csv.png'
import { LOGO } from '../../CommonComponent/Logo.js'
import jsPDF from "jspdf";
import "jspdf-autotable";
import AuthenticationServiceComponent from '../Common/AuthenticationServiceComponent';
import { isSiteOnline } from '../../CommonComponent/JavascriptCommonFunctions';
import NumberFormat from 'react-number-format';
const ref = React.createRef();
const pickerLang = {
    months: [i18n.t('static.month.jan'), i18n.t('static.month.feb'), i18n.t('static.month.mar'), i18n.t('static.month.apr'), i18n.t('static.month.may'), i18n.t('static.month.jun'), i18n.t('static.month.jul'), i18n.t('static.month.aug'), i18n.t('static.month.sep'), i18n.t('static.month.oct'), i18n.t('static.month.nov'), i18n.t('static.month.dec')],
    from: 'From', to: 'To',
}


class ForecastOutput extends Component {
    constructor(props) {
        super(props);
        var dt = new Date();
        dt.setMonth(dt.getMonth() - 10);
        this.state = {
            programs: [],
            versions: [],
            show: false,
            message: '',
            rangeValue: { from: { year: dt.getFullYear(), month: dt.getMonth() + 1 }, to: { year: new Date().getFullYear(), month: new Date().getMonth() + 1 } },
            minDate: { year: new Date().getFullYear() - 10, month: new Date().getMonth() + 1 },
            maxDate: { year: new Date().getFullYear() + 10, month: new Date().getMonth() + 1 },
            loading: false,
            programId: '',
            versionId: '',
            viewById: 1,
            equivalencyUnitId: "",
            monthArrayList: [],
            yaxisEquUnit: 2,
            xaxis: 2,
            consumptionData: [],
            forecastPeriod: '',
            planningUnits: [],
            planningUnitValues: [],
            planningUnitLabels: [],
            forecastingUnits: [],
            forecastingUnitValues: [],
            forecastingUnitLabels: [],
            downloadedProgramData: [],
            equivalencyUnitList: [],
            programEquivalencyUnitList: [],
            equivalencyUnitLabel: '',
            // consumptionDataAll: [
            //     { planningUnit: { id: 1, label: "abacavir-lamivudine 600+300mg/Tablet Tablet (PO), bottle of 30" }, scenario: { id: 3, label: "C. Consumption Low" }, display: true, color: "#ba0c2f", consumptionList: [{ consumptionDate: "2021-01-01", consumptionQty: 36577 }, { consumptionDate: "2021-02-01", consumptionQty: 36805 }, { consumptionDate: "2021-03-01", consumptionQty: 37039 }, { consumptionDate: "2021-04-01", consumptionQty: 37273 }, { consumptionDate: "2021-05-01", consumptionQty: 37507 }, { consumptionDate: "2021-06-01", consumptionQty: 37741 }, { consumptionDate: "2021-07-01", consumptionQty: 37982 }, { consumptionDate: "2021-08-01", consumptionQty: 38223 }, { consumptionDate: "2021-09-01", consumptionQty: 38464 }, { consumptionDate: "2021-10-01", consumptionQty: 38705 }, { consumptionDate: "2021-11-01", consumptionQty: 38953 }, { consumptionDate: "2021-12-01", consumptionQty: 39200 }] },
            //     { planningUnit: { id: 2, label: "dolutegravir-lamivudine-tenofovir 50+300+300mg/Tablet Tablet (PO) - bottle of 30" }, scenario: { id: 1, label: "A. Consumption High" }, color: "#0067b9", display: true, consumptionList: [{ consumptionDate: "2021-01-01", consumptionQty: 29927 }, { consumptionDate: "2021-02-01", consumptionQty: 30113 }, { consumptionDate: "2021-03-01", consumptionQty: 30305 }, { consumptionDate: "2021-04-01", consumptionQty: 30496 }, { consumptionDate: "2021-05-01", consumptionQty: 30688 }, { consumptionDate: "2021-06-01", consumptionQty: 30879 }, { consumptionDate: "2021-07-01", consumptionQty: 31077 }, { consumptionDate: "2021-08-01", consumptionQty: 31274 }, { consumptionDate: "2021-09-01", consumptionQty: 31471 }, { consumptionDate: "2021-10-01", consumptionQty: 31668 }, { consumptionDate: "2021-11-01", consumptionQty: 31870 }, { consumptionDate: "2021-12-01", consumptionQty: 32073 }] },
            //     { planningUnit: { id: 3, label: "dolutegravir-lamivudine-tenofovir 50+300+300mg/Tablet Tablet (PO) - bottle of 90" }, scenario: { id: 3, label: "C. Consumption Low" }, color: "#118b70", display: true, consumptionList: [{ consumptionDate: "2021-01-01", consumptionQty: 32920 }, { consumptionDate: "2021-02-01", consumptionQty: 33124 }, { consumptionDate: "2021-03-01", consumptionQty: 33336 }, { consumptionDate: "2021-04-01", consumptionQty: 33546 }, { consumptionDate: "2021-05-01", consumptionQty: 33757 }, { consumptionDate: "2021-06-01", consumptionQty: 33967 }, { consumptionDate: "2021-07-01", consumptionQty: 34185 }, { consumptionDate: "2021-08-01", consumptionQty: 34401 }, { consumptionDate: "2021-09-01", consumptionQty: 34618 }, { consumptionDate: "2021-10-01", consumptionQty: 34835 }, { consumptionDate: "2021-11-01", consumptionQty: 35057 }, { consumptionDate: "2021-12-01", consumptionQty: 35280 }] }
            // ],


        };
        this.getPrograms = this.getPrograms.bind(this);
        this.filterData = this.filterData.bind(this);
        this._handleClickRangeBox = this._handleClickRangeBox.bind(this)
        this.handleRangeChange = this.handleRangeChange.bind(this);
        this.handleRangeDissmis = this.handleRangeDissmis.bind(this);
        this.setViewById = this.setViewById.bind(this);
        // this.getProductCategories = this.getProductCategories.bind(this);
        //this.pickRange = React.createRef()
        this.setProgramId = this.setProgramId.bind(this);
        this.setVersionId = this.setVersionId.bind(this);
        // this.setVersionId = this.setVersionId.bind(this);
        this.setForecastingUnit = this.setForecastingUnit.bind(this);
        this.yAxisChange = this.yAxisChange.bind(this);
        this.xAxisChange = this.xAxisChange.bind(this);
        this.getEquivalencyUnitData = this.getEquivalencyUnitData.bind(this);

    }

    planningUnitCheckedChanged(id) {
        var consumptionData = this.state.consumptionData;
        var index = this.state.consumptionData.findIndex(c => c.objUnit.id == id);
        consumptionData[index].display = !consumptionData[index].display;
        this.setState({
            consumptionData
        })
    }

    getEquivalencyUnitData() {
        let programId = document.getElementById("programId").value;
        let versionId = document.getElementById("versionId").value;
        this.setState({
            planningUnits: [],
            planningUnitValues: [],
            planningUnitLabels: [],

            forecastingUnits: [],
            forecastingUnitValues: [],
            forecastingUnitLabels: [],
        }, () => {
            if (programId > 0 && versionId != 0) {
                if (versionId.includes('Local')) {

                    const lan = 'en';
                    var db1;
                    var storeOS;
                    getDatabase();
                    var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
                    openRequest.onsuccess = function (e) {
                        db1 = e.target.result;
                        var planningunitTransaction = db1.transaction(['equivalencyUnit'], 'readwrite');
                        var planningunitOs = planningunitTransaction.objectStore('equivalencyUnit');
                        var planningunitRequest = planningunitOs.getAll();
                        var planningList = []
                        planningunitRequest.onerror = function (event) {
                            // Handle errors!
                        };
                        planningunitRequest.onsuccess = function (e) {
                            var myResult = [];
                            myResult = planningunitRequest.result;
                            // var programId = (document.getElementById("programId").value).split("_")[0];
                            var filteredEquList = []
                            console.log("EquivalencyUnitList---------->", myResult);
                            for (var i = 0; i < myResult.length; i++) {
                                if (myResult[i].program != null) {
                                    if (myResult[i].program.id == programId && myResult[i].active == true) {
                                        filteredEquList.push(myResult[i]);
                                    }
                                }
                            }
                            console.log("EquivalencyUnitList---------->1", filteredEquList);

                            let duplicateEquiUnit = filteredEquList.map(c => c.equivalencyUnit);
                            const ids = duplicateEquiUnit.map(o => o.equivalencyUnitId)
                            const filteredEQUnit = duplicateEquiUnit.filter(({ equivalencyUnitId }, index) => !ids.includes(equivalencyUnitId, index + 1))

                            console.log("EquivalencyUnitList---------->2", filteredEQUnit);

                            var lang = this.state.lang;
                            this.setState({
                                equivalencyUnitList: filteredEQUnit.sort(function (a, b) {
                                    a = getLabelText(a.label, lang).toLowerCase();
                                    b = getLabelText(b.label, lang).toLowerCase();
                                    return a < b ? -1 : a > b ? 1 : 0;
                                }),
                                programEquivalencyUnitList: filteredEquList,
                            }, () => {
                                this.filterData();
                            })
                        }.bind(this);
                    }.bind(this)

                } else {//api call

                }
            }




        })
    }

    yAxisChange(e) {
        var yaxisEquUnit = e.target.value;
        console.log("e.target.value+++", e.target.value)
        this.setState({
            yaxisEquUnit: yaxisEquUnit
        }, () => {
            if (yaxisEquUnit == 1) {
                document.getElementById("equivalencyUnitDiv").style.display = "block";
                this.getEquivalencyUnitData();

            } else {
                document.getElementById("equivalencyUnitDiv").style.display = "none";
                this.filterData();
            }
        })
    }

    xAxisChange(e) {
        var xaxisEquUnit = e.target.value;
        console.log("e.target.value+++", e.target.value)
        this.setState({
            xaxis: xaxisEquUnit
        }, () => {
            this.filterData();
        })
    }


    setForecastingUnit = (event) => {
        console.log('***', event)
        var forecastingUnitIds = event
        forecastingUnitIds = forecastingUnitIds.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value);
        })
        this.setState({
            forecastingUnitValues: forecastingUnitIds.map(ele => ele),
            forecastingUnitLabels: forecastingUnitIds.map(ele => ele.label)
        }, () => {

            this.filterData()
        })
    }


    makeText = m => {
        if (m && m.year && m.month) return (pickerLang.months[m.month - 1] + '. ' + m.year)
        return '?'
    }

    toggledata = () => this.setState((currentState) => ({ show: !currentState.show }));

    exportCSV() {
    }


    exportPDF = () => {
    }

    filterData() {
        let planningUnitIds = this.state.planningUnitValues.map(ele => (ele.value).toString())
        let forecastingUnitIds = this.state.forecastingUnitValues.map(ele => (ele.value).toString())
        let programId = document.getElementById("programId").value;
        let versionId = document.getElementById("versionId").value;
        let startDate = this.state.rangeValue.from.year + '-' + this.state.rangeValue.from.month + '-01';
        let endDate = this.state.rangeValue.to.year + '-' + this.state.rangeValue.to.month + '-' + new Date(this.state.rangeValue.to.year, this.state.rangeValue.to.month, 0).getDate();
        let viewById = document.getElementById("viewById").value;
        let yaxisEquUnitId = document.getElementById("yaxisEquUnit").value;
        let equivalencyUnitId = document.getElementById("equivalencyUnitId").value;
        let xaxisId = document.getElementById("xaxis").value;

        if (versionId != 0 && programId > 0 && (viewById == 1 ? planningUnitIds.length > 0 : forecastingUnitIds.length > 0) && (yaxisEquUnitId == 1 ? equivalencyUnitId > 0 : true)) {
            if (versionId.includes('Local')) {

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
                        // console.log("DATASET----------->", myResult);
                        // this.setState({
                        //     datasetList: myResult
                        // });


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
                            // let dupForecastingUnitObj = programJson1.consumptionList.map(ele => ele.consumptionUnit.forecastingUnit);
                            // const ids = dupForecastingUnitObj.map(o => o.id)
                            // const filtered = dupForecastingUnitObj.filter(({ id }, index) => !ids.includes(id, index + 1))
                            // console.log("programJson1-------->2", filtered);

                            // let dupPlanningUnitObjwithNull = programJson1.consumptionList.map(ele => ele.consumptionUnit.planningUnit);
                            // let dupPlanningUnitObj = dupPlanningUnitObjwithNull.filter(c => c != null);
                            // const idsPU = dupPlanningUnitObj.map(o => o.id)
                            // const filteredPU = dupPlanningUnitObj.filter(({ id }, index) => !idsPU.includes(id, index + 1))

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
                                actualConsumptionList: programJson1.actualConsumptionList,
                                consumptionExtrapolation: programJson1.consumptionExtrapolation,
                                treeList: programJson1.treeList,
                                planningUnitList: programJson1.planningUnitList,
                                // filteredForecastingUnit: filtered,
                                // filteredPlanningUnit: filteredPU,
                                regionList: programJson1.regionList,
                                label: programJson1.label,
                                realmCountry: programJson1.realmCountry,
                            });
                            datasetList1.push(filteredGetRequestList[i])
                            // }
                        }
                        console.log("DATASET-------->", datasetList);
                        this.setState({
                            datasetList: datasetList,
                            datasetList1: datasetList1
                        }, () => {
                            let filteredProgram = this.state.datasetList.filter(c => c.programId == programId && c.versionId == (versionId.split('(')[0]).trim())[0];

                            var monthArrayList = [];
                            let cursorDate = startDate;
                            for (var i = 0; moment(cursorDate).format("YYYY-MM") <= moment(endDate).format("YYYY-MM"); i++) {
                                var dt = moment(startDate).add(i, 'months').format("YYYY-MM-DD");
                                cursorDate = moment(cursorDate).add(1, 'months').format("YYYY-MM-DD");
                                monthArrayList.push(dt);
                            }

                            let consumptionData = [];

                            if (viewById == 1) {//planning unit id
                                console.log("Test------------>1", filteredProgram);
                                let planningUnitList = filteredProgram.planningUnitList;
                                let selectedPlanningUnit = this.state.planningUnitValues;
                                let treeList = filteredProgram.treeList;
                                let consumptionExtrapolation = filteredProgram.consumptionExtrapolation;

                                for (let i = 0; i < selectedPlanningUnit.length; i++) {
                                    let nodeDataMomList = [];
                                    console.log("-----------------------------------------------", selectedPlanningUnit[i].value + '----' + selectedPlanningUnit[i].label);
                                    let planningUniObj = planningUnitList.filter(c => c.planningUnit.id == selectedPlanningUnit[i].value)[0];
                                    let selectedForecastMap = planningUniObj.selectedForecastMap;
                                    console.log("Test------------>2", selectedForecastMap);
                                    console.log("Test------------>3", Object.keys(selectedForecastMap)[0]);
                                    console.log("Test------------>4", (selectedForecastMap[Object.keys(selectedForecastMap)[0]]));

                                    let selectedForecastMapObjIn = (selectedForecastMap[Object.keys(selectedForecastMap)[0]]);

                                    let scenarioId = selectedForecastMapObjIn.scenarioId;
                                    let consumptionExtrapolationId = selectedForecastMapObjIn.consumptionExtrapolationId;

                                    if (scenarioId != null) {//scenarioId
                                        // console.log("Test------------>IF");

                                        for (let j = 0; j < treeList.length; j++) {
                                            let filteredScenario = treeList[j].scenarioList.filter(c => c.id == scenarioId);
                                            if (filteredScenario.length > 0) {
                                                let flatlist = treeList[j].tree.flatList;

                                                let listContainNodeType5 = flatlist.filter(c => c.payload.nodeType.id == 5);

                                                console.log("Test------------>5", listContainNodeType5);
                                                console.log("Test------------>6", listContainNodeType5[0].payload);
                                                console.log("Test------------>7", (listContainNodeType5[0].payload.nodeDataMap[scenarioId]));
                                                // console.log("Test------------>8", filteredPUNode);
                                                let match = 0;
                                                for (let k = 0; k < listContainNodeType5.length; k++) {
                                                    let arrayOfNodeDataMap = (listContainNodeType5[k].payload.nodeDataMap[scenarioId]).filter(c => c.puNode.planningUnit.id == selectedPlanningUnit[i].value)
                                                    console.log("Test------------>7.1", arrayOfNodeDataMap);

                                                    if (arrayOfNodeDataMap.length > 0) {
                                                        console.log("Test------------>8", arrayOfNodeDataMap[0].nodeDataMomList);
                                                        nodeDataMomList = arrayOfNodeDataMap[0].nodeDataMomList;
                                                        let consumptionList = nodeDataMomList.map(m => {
                                                            return {
                                                                consumptionDate: m.month,
                                                                consumptionQty: (m.calculatedValue).toFixed(2)
                                                            }
                                                        });
                                                        let jsonTemp = { objUnit: planningUniObj.planningUnit, scenario: { id: 1, label: treeList[j].label.label_en + filteredScenario[0].label.label_en }, display: true, color: "#ba0c2f", consumptionList: consumptionList }
                                                        consumptionData.push(jsonTemp);
                                                        match = 0;
                                                        break;
                                                    } else {
                                                        // let jsonTemp = { objUnit: planningUniObj.planningUnit, scenario: filteredScenario[0], display: true, color: "#ba0c2f", consumptionList: [] }
                                                        // consumptionData.push(jsonTemp);
                                                        match = 1;
                                                    }
                                                }

                                                if (match == 1) {
                                                    let jsonTemp = { objUnit: planningUniObj.planningUnit, scenario: { id: 1, label: treeList[j].label.label_en + filteredScenario[0].label.label_en }, display: true, color: "#ba0c2f", consumptionList: [] }
                                                    consumptionData.push(jsonTemp);
                                                }

                                                // let nodeDataMomList = listContainNodeType5.payload.nodeDataMap[scenarioId].filter(c => c.puNode.planningUnit.id == selectedPlanningUnit[i].value)[0].nodeDataMomList;

                                                // break;
                                            }
                                        }

                                    } else {//consumptionExtrapolationId
                                        // console.log("Test------------>ELSE");
                                        let consumptionExtrapolationObj = consumptionExtrapolation.filter(c => c.consumptionExtrapolationId == consumptionExtrapolationId);
                                        if (consumptionExtrapolationObj.length > 0) {
                                            let consumptionList = consumptionExtrapolationObj[0].extrapolationDataList.map(m => {
                                                return {
                                                    consumptionDate: m.month,
                                                    consumptionQty: m.amount
                                                }
                                            });
                                            let jsonTemp = { objUnit: planningUniObj.planningUnit, scenario: { id: 1, label: "" }, display: true, color: "#ba0c2f", consumptionList: consumptionList }
                                            consumptionData.push(jsonTemp);

                                        } else {
                                            let jsonTemp = { objUnit: planningUniObj.planningUnit, scenario: { id: 1, label: "" }, display: true, color: "#ba0c2f", consumptionList: [] }
                                            consumptionData.push(jsonTemp);
                                        }
                                    }
                                }
                            } else {//forecasting unit id
                                console.log("TestFU------------>1", filteredProgram);
                                let planningUnitList = filteredProgram.planningUnitList;
                                let selectedForecastingUnit = this.state.forecastingUnitValues;
                                let treeList = filteredProgram.treeList;
                                let consumptionExtrapolation = filteredProgram.consumptionExtrapolation;

                                for (let i = 0; i < selectedForecastingUnit.length; i++) {
                                    let nodeDataMomList = [];
                                    console.log("-----------------------------------------------", selectedForecastingUnit[i].value + '----' + selectedForecastingUnit[i].label);
                                    let forecastingUniObj = planningUnitList.filter(c => c.planningUnit.forecastingUnit.id == selectedForecastingUnit[i].value);


                                    for (let l = 0; l < forecastingUniObj.length; l++) {

                                        let selectedForecastMap = forecastingUniObj[l].selectedForecastMap;
                                        console.log("TestFU------------>2", selectedForecastMap);
                                        console.log("TestFU------------>3", Object.keys(selectedForecastMap)[0]);
                                        console.log("TestFU------------>4", (selectedForecastMap[Object.keys(selectedForecastMap)[0]]));

                                        let selectedForecastMapObjIn = (selectedForecastMap[Object.keys(selectedForecastMap)[0]]);

                                        let scenarioId = selectedForecastMapObjIn.scenarioId;
                                        let consumptionExtrapolationId = selectedForecastMapObjIn.consumptionExtrapolationId;

                                        if (scenarioId != null) {//scenarioId
                                            // console.log("Test------------>IF");

                                            for (let j = 0; j < treeList.length; j++) {
                                                let filteredScenario = treeList[j].scenarioList.filter(c => c.id == scenarioId);
                                                if (filteredScenario.length > 0) {
                                                    let flatlist = treeList[j].tree.flatList;

                                                    let listContainNodeType4 = flatlist.filter(c => c.payload.nodeType.id == 4);

                                                    console.log("TestFU------------>5", listContainNodeType4);
                                                    console.log("TestFU------------>6", listContainNodeType4[0].payload);
                                                    console.log("TestFU------------>7", (listContainNodeType4[0].payload.nodeDataMap[scenarioId]));
                                                    // console.log("TestFU------------>8", filteredPUNode);
                                                    let match = 0;
                                                    for (let k = 0; k < listContainNodeType4.length; k++) {
                                                        let arrayOfNodeDataMap = (listContainNodeType4[k].payload.nodeDataMap[scenarioId]).filter(c => c.fuNode.forecastingUnit.id == selectedForecastingUnit[i].value)
                                                        console.log("TestFU------------>7.1", arrayOfNodeDataMap);

                                                        if (arrayOfNodeDataMap.length > 0) {
                                                            console.log("TestFU------------>8", arrayOfNodeDataMap[0].nodeDataMomList);
                                                            nodeDataMomList = arrayOfNodeDataMap[0].nodeDataMomList;
                                                            let consumptionList = nodeDataMomList.map(m => {
                                                                return {
                                                                    consumptionDate: m.month,
                                                                    consumptionQty: (m.calculatedValue * forecastingUniObj[l].planningUnit.multiplier).toFixed(2)
                                                                }
                                                            });
                                                            // let jsonTemp = { objUnit: forecastingUniObj[l].planningUnit.forecastingUnit, scenario: { id: 1, label: treeList[j].label.label_en + filteredScenario[0].label.label_en }, display: true, color: "#ba0c2f", consumptionList: consumptionList }
                                                            let jsonTemp = { objUnit: { id: forecastingUniObj[l].planningUnit.id, label: forecastingUniObj[l].planningUnit.forecastingUnit.label }, scenario: { id: 1, label: treeList[j].label.label_en + filteredScenario[0].label.label_en }, display: true, color: "#ba0c2f", consumptionList: consumptionList }
                                                            consumptionData.push(jsonTemp);
                                                            match = 0;
                                                            break;
                                                        } else {
                                                            // let jsonTemp = { objUnit: forecastingUniObj[l].planningUnit.forecastingUnit, scenario: filteredScenario[0], display: true, color: "#ba0c2f", consumptionList: [] }
                                                            // consumptionData.push(jsonTemp);
                                                            match = 1;
                                                        }
                                                    }

                                                    if (match == 1) {
                                                        // let jsonTemp = { objUnit: forecastingUniObj[l].planningUnit.forecastingUnit, scenario: { id: 1, label: treeList[j].label.label_en + filteredScenario[0].label.label_en }, display: true, color: "#ba0c2f", consumptionList: [] }
                                                        let jsonTemp = { objUnit: { id: forecastingUniObj[l].planningUnit.id, label: forecastingUniObj[l].planningUnit.forecastingUnit.label }, scenario: { id: 1, label: treeList[j].label.label_en + filteredScenario[0].label.label_en }, display: true, color: "#ba0c2f", consumptionList: [] }
                                                        consumptionData.push(jsonTemp);
                                                    }

                                                    // let nodeDataMomList = listContainNodeType4.payload.nodeDataMap[scenarioId].filter(c => c.puNode.planningUnit.id == selectedForecastingUnit[i].value)[0].nodeDataMomList;

                                                    // break;
                                                }
                                            }

                                        } else {//consumptionExtrapolationId
                                            // console.log("Test------------>ELSE");
                                            let consumptionExtrapolationObj = consumptionExtrapolation.filter(c => c.consumptionExtrapolationId == consumptionExtrapolationId);
                                            if (consumptionExtrapolationObj.length > 0) {
                                                let consumptionList = consumptionExtrapolationObj[0].extrapolationDataList.map(m => {
                                                    return {
                                                        consumptionDate: m.month,
                                                        consumptionQty: m.amount
                                                    }
                                                });
                                                // let jsonTemp = { objUnit: forecastingUniObj[l].planningUnit.forecastingUnit, scenario: { id: 1, label: "" }, display: true, color: "#ba0c2f", consumptionList: consumptionList }
                                                let jsonTemp = { objUnit: { id: forecastingUniObj[l].planningUnit.id, label: forecastingUniObj[l].planningUnit.forecastingUnit.label }, scenario: { id: 1, label: "" }, display: true, color: "#ba0c2f", consumptionList: consumptionList }
                                                consumptionData.push(jsonTemp);

                                            } else {
                                                // let jsonTemp = { objUnit: forecastingUniObj[l].planningUnit.forecastingUnit, scenario: { id: 1, label: "" }, display: true, color: "#ba0c2f", consumptionList: [] }
                                                let jsonTemp = { objUnit: { id: forecastingUniObj[l].planningUnit.id, label: forecastingUniObj[l].planningUnit.forecastingUnit.label }, scenario: { id: 1, label: "" }, display: true, color: "#ba0c2f", consumptionList: [] }
                                                consumptionData.push(jsonTemp);
                                            }
                                        }


                                    }//end of forecastingUniObj L

                                }
                            }

                            console.log("TestFU------------>9", consumptionData);
                            // logic for add same date data
                            // let resultTrue = Object.values(tempConsumptionListData.reduce((a, { consumptionDate, consumptionQty }) => {
                            //     if (!a[consumptionDate])
                            //         a[consumptionDate] = Object.assign({}, { consumptionDate, consumptionQty });
                            //     else
                            //         a[consumptionDate].consumptionQty += consumptionQty;
                            //     return a;
                            // }, {}));
                            // this.setState({
                            //     consumptionData: consumptionData,
                            //     monthArrayList: monthArrayList
                            // })

                            if (this.state.xaxis == 2) {
                                this.setState({
                                    consumptionData: consumptionData,
                                    monthArrayList: monthArrayList
                                })
                            } else {
                                let min = moment(startDate).format("YYYY");
                                let max = moment(endDate).format("YYYY");
                                let years = [];
                                for (var i = min; i <= max; i++) {
                                    years.push("" + i)
                                }

                                for (let i = 0; i < consumptionData.length; i++) {

                                    let tempConsumptionListData = consumptionData[i].consumptionList.map(m => {
                                        return {
                                            consumptionDate: moment(m.consumptionDate).format("YYYY"),
                                            consumptionQty: m.consumptionQty
                                        }
                                    });
                                    console.log("consumptionData------------------->33", tempConsumptionListData);
                                    //logic for add same date data                            
                                    let resultTrue = Object.values(tempConsumptionListData.reduce((a, { consumptionDate, consumptionQty }) => {
                                        if (!a[consumptionDate])
                                            a[consumptionDate] = Object.assign({}, { consumptionDate, consumptionQty });
                                        else
                                            // a[consumptionDate].consumptionQty += consumptionQty;
                                            a[consumptionDate].consumptionQty = parseFloat(a[consumptionDate].consumptionQty) + parseFloat(consumptionQty);
                                        return a;
                                    }, {}));

                                    console.log("consumptionData------------------->3", resultTrue);

                                    let result = resultTrue.map(m => {
                                        return {
                                            consumptionDate: m.consumptionDate,
                                            consumptionQty: parseFloat(m.consumptionQty).toFixed(2)
                                        }
                                    });

                                    console.log("consumptionData------------------->4", result);

                                    consumptionData[i].consumptionList = result;

                                }
                                console.log("consumptionData------------------->3", years);
                                console.log("consumptionData------------------->4", consumptionData);
                                this.setState({
                                    consumptionData: consumptionData,
                                    monthArrayList: years
                                })

                            }










                            // if (viewById == 1) {//planning unit id
                            //     // console.log("planningUnitValues---------->", this.state.planningUnitValues);{label: "Dolutegravir/Lamivudine/Tenofovir DF 50/300/300 mg Tablet, 30 Tablets", value: 2733}
                            //     let planningUnit = this.state.planningUnitValues;

                            //     for (let i = 0; i < planningUnit.length; i++) {

                            //         let filteredData = filteredProgram.consumptionList.filter(c => c.consumptionUnit.planningUnit.id == planningUnit[i].value);
                            //         console.log("Test------------------->1", filteredData);

                            //         let consumptionList = filteredData.map(m => {
                            //             return {
                            //                 consumptionDate: m.month,
                            //                 consumptionQty: m.actualConsumption
                            //             }
                            //         });

                            //         let jsonTemp = { objUnit: this.state.planningUnits.filter(c => c.id == planningUnit[i].value)[0], scenario: { id: 3, label: "C. Consumption Low" }, display: true, color: "#ba0c2f", consumptionList: consumptionList }
                            //         consumptionData.push(jsonTemp);
                            //     }
                            // } else {//forecasting unit id

                            //     let forecastingUnit = this.state.forecastingUnitValues;
                            //     console.log("forecastingUnitVal----------->", forecastingUnit);
                            //     for (let i = 0; i < forecastingUnit.length; i++) {

                            //         let filteredData = filteredProgram.consumptionList.filter(c => c.consumptionUnit.forecastingUnit.id == forecastingUnit[i].value);
                            //         console.log("Test------------------->2", filteredData);

                            //         let consumptionList = filteredData.map(m => {
                            //             return {
                            //                 consumptionDate: m.month,
                            //                 consumptionQty: m.actualConsumption * m.consumptionUnit.planningUnit.multiplier,
                            //                 multiplier: m.consumptionUnit.planningUnit.multiplier
                            //             }
                            //         });
                            //         console.log("Test------------------->3", consumptionList);

                            //         let jsonTemp = { objUnit: this.state.forecastingUnits.filter(c => c.id == forecastingUnit[i].value)[0], scenario: { id: 3, label: "C. Consumption Low" }, display: true, color: "#ba0c2f", consumptionList: consumptionList }
                            //         consumptionData.push(jsonTemp);
                            //     }

                            // }

                            // console.log("consumptionData------------------->11", monthArrayList);
                            // console.log("consumptionData------------------->22", consumptionData);

                            // if (this.state.xaxis == 2) {
                            //     this.setState({
                            //         consumptionData: consumptionData,
                            //         monthArrayList: monthArrayList
                            //     })
                            // } else {
                            //     let min = moment(startDate).format("YYYY");
                            //     let max = moment(endDate).format("YYYY");
                            //     let years = [];
                            //     for (var i = min; i <= max; i++) {
                            //         years.push("" + i)
                            //     }

                            //     for (let i = 0; i < consumptionData.length; i++) {

                            //         let tempConsumptionListData = consumptionData[i].consumptionList.map(m => {
                            //             return {
                            //                 consumptionDate: moment(m.consumptionDate).format("YYYY"),
                            //                 consumptionQty: m.consumptionQty
                            //             }
                            //         });
                            //         // console.log("consumptionData------------------->33", tempConsumptionListData);
                            //         //logic for add same date data                            
                            //         let resultTrue = Object.values(tempConsumptionListData.reduce((a, { consumptionDate, consumptionQty }) => {
                            //             if (!a[consumptionDate])
                            //                 a[consumptionDate] = Object.assign({}, { consumptionDate, consumptionQty });
                            //             else
                            //                 a[consumptionDate].consumptionQty += consumptionQty;
                            //             return a;
                            //         }, {}));

                            //         // console.log("consumptionData------------------->3", resultTrue);
                            //         consumptionData[i].consumptionList = resultTrue;

                            //     }
                            //     console.log("consumptionData------------------->3", years);
                            //     console.log("consumptionData------------------->4", consumptionData);
                            //     this.setState({
                            //         consumptionData: consumptionData,
                            //         monthArrayList: years
                            //     })

                            // }

                        })


                    }.bind(this);
                }.bind(this);

            } else {//api call



            }


        } else {//validation message

        }

    }


    getPrograms() {
        // this.setState({ programs: [{ label: "FASPonia MOH 1", programId: 1 }], loading: false });

        if (isSiteOnline()) {
            // AuthenticationService.setupAxiosInterceptors();
            ProgramService.getDataSetListAll()
                .then(response => {
                    this.setState({
                        programs: response.data
                    }, () => { this.consolidatedProgramList() })
                }).catch(
                    error => {
                        this.setState({
                            programs: [], loading: false
                        }, () => { this.consolidatedProgramList() })
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
                                        message: i18n.t(error.response.data.messageCode, { entityname: i18n.t('static.dashboard.program') }),
                                        loading: false
                                    });
                                    break;
                                case 412:
                                    this.setState({
                                        message: i18n.t(error.response.data.messageCode, { entityname: i18n.t('static.dashboard.program') }),
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
            console.log('offline')
            this.consolidatedProgramList()
            this.setState({ loading: false })
        }


    }

    consolidatedProgramList = () => {
        const lan = 'en';
        const { programs } = this.state
        var proList = programs;

        var db1;
        getDatabase();
        var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var transaction = db1.transaction(['datasetData'], 'readwrite');
            var program = transaction.objectStore('datasetData');
            var getRequest = program.getAll();

            getRequest.onerror = function (event) {
                // Handle errors!
            };
            getRequest.onsuccess = function (event) {
                var myResult = [];
                myResult = getRequest.result;
                var userBytes = CryptoJS.AES.decrypt(localStorage.getItem('curUser'), SECRET_KEY);
                var userId = userBytes.toString(CryptoJS.enc.Utf8);
                let downloadedProgramData = [];
                for (var i = 0; i < myResult.length; i++) {
                    if (myResult[i].userId == userId) {
                        var bytes = CryptoJS.AES.decrypt(myResult[i].programName, SECRET_KEY);
                        var programNameLabel = bytes.toString(CryptoJS.enc.Utf8);
                        var databytes = CryptoJS.AES.decrypt(myResult[i].programData, SECRET_KEY);
                        var programData = JSON.parse(databytes.toString(CryptoJS.enc.Utf8))
                        console.log(programNameLabel)

                        var f = 0
                        for (var k = 0; k < this.state.programs.length; k++) {
                            if (this.state.programs[k].programId == programData.programId) {
                                f = 1;
                                console.log('already exist')
                                console.log("programJson1-------->1", programData);
                            }
                        }
                        if (f == 0) {
                            proList.push(programData)
                        }
                        downloadedProgramData.push(programData);
                    }


                }
                var lang = this.state.lang;

                this.setState({
                    programs: proList.sort(function (a, b) {
                        a = getLabelText(a.label, lang).toLowerCase();
                        b = getLabelText(b.label, lang).toLowerCase();
                        return a < b ? -1 : a > b ? 1 : 0;
                    }),
                    downloadedProgramData: downloadedProgramData
                }, () => {
                    console.log("programs------------------>", this.state.programs);
                })


            }.bind(this);

        }.bind(this);


    }

    componentDidMount() {
        this.getPrograms();
        document.getElementById("forecastingUnitDiv").style.display = "none";
    }

    setProgramId(event) {
        this.setState({
            programId: event.target.value,
            versionId: ''
        }, () => {
            // localStorage.setItem("sesVersionIdReport", '');
            this.filterData();
            this.getVersionIds();
        })
    }

    // setVersionId(event) {
    //     this.setState({
    //         versionId: event.target.value,
    //     }, () => {
    //         // localStorage.setItem("sesVersionIdReport", '');
    //         // this.filterVersion();
    //     })
    // }

    getForecastingUnit = () => {

    }

    getPlanningUnitForecastingUnit = () => {


        let programId = document.getElementById("programId").value;
        let versionId = document.getElementById("versionId").value;

        // let programId = this.state.programId;
        // let versionId = this.state.versionId;

        if (programId != -1 && versionId != -1) {

            this.setState({
                planningUnits: [],
                planningUnitValues: [],
                planningUnitLabels: []
            }, () => {

                if (versionId == -1) {
                    this.setState({ message: i18n.t('static.program.validversion'), matricsList: [] });
                } else {
                    // localStorage.setItem("sesVersionIdReport", versionId);
                    if (versionId.includes('Local')) {
                        let programData = this.state.downloadedProgramData.filter(c => c.programId == programId && c.currentVersion.versionId == (versionId.split('(')[0]).trim())[0];
                        console.log("programData---------->", programData);
                        let forecastingUnitListTemp = [];
                        let planningUnitList = programData.planningUnitList.map(o => o.planningUnit)

                        for (var i = 0; i < planningUnitList.length; i++) {
                            forecastingUnitListTemp.push(planningUnitList[i].forecastingUnit);
                        }
                        // console.log("PlanningUnitList----------------->1", planningUnitList);
                        // console.log("PlanningUnitList----------------->2", forecastingUnitListTemp);

                        const ids = forecastingUnitListTemp.map(o => o.id);
                        const forecastingUnitList = forecastingUnitListTemp.filter(({ id }, index) => !ids.includes(id, index + 1));
                        // console.log("PlanningUnitList----------------->3", filtered);

                        // let dupForecastingUnitObj = programData.consumptionList.map(ele => ele.consumptionUnit.forecastingUnit);
                        // const ids = dupForecastingUnitObj.map(o => o.id)
                        // const filtered = dupForecastingUnitObj.filter(({ id }, index) => !ids.includes(id, index + 1))
                        // // console.log("programData-------->2", filtered);

                        // let dupPlanningUnitObjwithNull = programData.consumptionList.map(ele => ele.consumptionUnit.planningUnit);
                        // let dupPlanningUnitObj = dupPlanningUnitObjwithNull.filter(c => c != null);
                        // const idsPU = dupPlanningUnitObj.map(o => o.id)
                        // const filteredPU = dupPlanningUnitObj.filter(({ id }, index) => !idsPU.includes(id, index + 1))

                        let equivalencyUnitId = document.getElementById("equivalencyUnitId").value;
                        if (equivalencyUnitId != -1) {
                            let filteredProgramEQList = this.state.programEquivalencyUnitList.filter(c => c.equivalencyUnit.equivalencyUnitId == equivalencyUnitId);
                            let newPlanningUnitList = [];
                            let newForecastingUnitList = [];
                            for (var i = 0; i < forecastingUnitList.length; i++) {
                                let temp = filteredProgramEQList.filter(c => c.forecastingUnit.id == forecastingUnitList[i].id);
                                if (temp.length > 0) {
                                    newForecastingUnitList.push(forecastingUnitList[i]);
                                }
                            }

                            for (var i = 0; i < planningUnitList.length; i++) {
                                let temp = filteredProgramEQList.filter(c => c.forecastingUnit.id == planningUnitList[i].forecastingUnit.id);
                                if (temp.length > 0) {
                                    newPlanningUnitList.push(planningUnitList[i]);
                                }
                            }

                            var equivalencyUnitt = document.getElementById("equivalencyUnitId");
                            var selectedText = equivalencyUnitt.options[equivalencyUnitt.selectedIndex].text;

                            this.setState({
                                planningUnits: newPlanningUnitList,
                                forecastingUnits: newForecastingUnitList,
                                equivalencyUnitLabel: selectedText
                            }, () => {
                                this.filterData();
                            })
                        } else {
                            this.setState({
                                planningUnits: planningUnitList,
                                forecastingUnits: forecastingUnitList,
                                equivalencyUnitLabel: ''
                                // planningUnits: filteredPU,
                                // forecastingUnits: filtered
                            }, () => {
                                this.filterData();
                            })
                        }



                    }
                    else {

                        // ProgramService.getActiveProgramPlaningUnitListByProgramId(programId).then(response => {
                        //     console.log('**' + JSON.stringify(response.data))
                        //     var listArray = response.data;
                        //     listArray.sort((a, b) => {
                        //         var itemLabelA = getLabelText(a.planningUnit.label, this.state.lang).toUpperCase(); // ignore upper and lowercase
                        //         var itemLabelB = getLabelText(b.planningUnit.label, this.state.lang).toUpperCase(); // ignore upper and lowercase                   
                        //         return itemLabelA > itemLabelB ? 1 : -1;
                        //     });
                        //     this.setState({
                        //         planningUnits: listArray,
                        //         message: ''
                        //     }, () => {
                        //         this.filterData();
                        //     })
                        // }).catch(
                        //     error => {
                        //         this.setState({
                        //             planningUnits: [],
                        //         })
                        //         if (error.message === "Network Error") {
                        //             this.setState({
                        //                 message: 'static.unkownError',
                        //                 loading: false
                        //             });
                        //         } else {
                        //             switch (error.response ? error.response.status : "") {

                        //                 case 401:
                        //                     this.props.history.push(`/login/static.message.sessionExpired`)
                        //                     break;
                        //                 case 403:
                        //                     this.props.history.push(`/accessDenied`)
                        //                     break;
                        //                 case 500:
                        //                 case 404:
                        //                 case 406:
                        //                     this.setState({
                        //                         message: i18n.t(error.response.data.messageCode, { entityname: i18n.t('static.planningunit.planningunit') }),
                        //                         loading: false
                        //                     });
                        //                     break;
                        //                 case 412:
                        //                     this.setState({
                        //                         message: i18n.t(error.response.data.messageCode, { entityname: i18n.t('static.planningunit.planningunit') }),
                        //                         loading: false
                        //                     });
                        //                     break;
                        //                 default:
                        //                     this.setState({
                        //                         message: 'static.unkownError',
                        //                         loading: false
                        //                     });
                        //                     break;
                        //             }
                        //         }
                        //     }
                        // );
                    }
                }
            });
        }

    }


    setVersionId(event) {



        var versionId = (event.target.value.split('(')[0]).trim();
        // var version = (versionId.split('(')[0]).trim()
        var programId = this.state.programId;

        if (programId != -1 && versionId != -1) {
            let selectedForecastProgram = this.state.programs.filter(c => c.programId == programId && c.currentVersion.versionId == versionId)[0]

            let d1 = new Date(selectedForecastProgram.currentVersion.forecastStartDate);
            let d2 = new Date(selectedForecastProgram.currentVersion.forecastStopDate);
            var month = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ]

            let startDateSplit = ((month[d1.getMonth()] + '-' + d1.getFullYear())).split('-');
            let stopDateSplit = ((month[d2.getMonth()] + '-' + d2.getFullYear())).split('-');

            let forecastStopDate = new Date((month[d1.getMonth()] + '-' + d1.getFullYear()));
            forecastStopDate.setMonth(forecastStopDate.getMonth() - 1);
            this.setState({
                forecastPeriod: (month[new Date((month[d1.getMonth()] + '-' + d1.getFullYear())).getMonth()]) + ' ' + (startDateSplit[1] - 3) + ' ~ ' + month[forecastStopDate.getMonth()] + ' ' + forecastStopDate.getFullYear(),
            }, () => {

            })
        } else {
            this.setState({
                forecastPeriod: '',
            }, () => {

            })
        }


        var viewById = document.getElementById("viewById").value;
        if (versionId != '' || versionId != undefined) {
            this.setState({
                versionId: event.target.value
            }, () => {
                // localStorage.setItem("sesVersionIdReport", this.state.versionId);
                // (viewById == 1 ? this.getPlanningUnitForecastingUnit() : this.getForecastingUnit());
                this.getPlanningUnitForecastingUnit()

            })
        } else {
            this.setState({
                versionId: event.target.value
            }, () => {
                // (viewById == 1 ? this.getPlanningUnitForecastingUnit() : this.getForecastingUnit());
                this.getPlanningUnitForecastingUnit()
            })
        }


    }

    getVersionIds() {
        // var versionListAll = this.state.versionListAll;
        // var planningUnitListAll = this.state.planningUnitListAll;
        // var reportPeriod = [{ programId: 1, startDate: '2020-09-01', endDate: '2021-08-30' }, { programId: 2, startDate: '2020-07-01', endDate: '2021-06-30' }, { programId: 3, startDate: '2020-11-01', endDate: '2021-10-30' }];
        // var startDate = reportPeriod.filter(c => c.programId == this.state.programId)[0].startDate;
        // var endDate = reportPeriod.filter(c => c.programId == this.state.programId)[0].endDate;

        // var rangeValue = { from: { year: new Date(startDate).getFullYear(), month: new Date(startDate).getMonth() + 1 }, to: { year: new Date(endDate).getFullYear(), month: new Date(endDate).getMonth() + 1 } }
        // let stopDate = endDate;
        // var monthArrayList = [];
        // let cursorDate = startDate;
        // for (var i = 0; moment(cursorDate).format("YYYY-MM") <= moment(stopDate).format("YYYY-MM"); i++) {
        //     var dt = moment(startDate).add(i, 'months').format("YYYY-MM-DD");
        //     cursorDate = moment(cursorDate).add(1, 'months').format("YYYY-MM-DD");
        //     monthArrayList.push(dt);
        // }
        // var planningUnitList = [];
        // var planningUnitListFiltered = planningUnitListAll.filter(c => c.program.programId == this.state.programId);
        // planningUnitListFiltered.map(item => {
        //     planningUnitList.push({
        //         label: item.label, value: item.planningUnitId
        //     })
        // })

        // // var scenarioList = [{ scenarioId: 1, label: "A. Consumption High", checked: true, color: "#4f81bd" }, { scenarioId: 2, label: "B. Consumption Med", checked: true, color: "#f79646" }, { scenarioId: 3, label: "C. Consumption Low", checked: true, color: "#000000" }, { scenarioId: 4, label: "D. Morbidity - assumption Y", checked: true, color: "#ff0000" }, { scenarioId: 5, label: "E. Demographic", checked: true, color: "#604a7b" }]
        // this.setState({ versions: versionListAll.filter(c => c.program.programId == this.state.programId), loading: false, planningUnits: planningUnitList, rangeValue: rangeValue, monthArrayList: monthArrayList });


        let programId = this.state.programId;
        if (programId != 0) {

            const program = this.state.programs.filter(c => c.programId == programId)
            console.log(program)
            if (program.length == 1) {
                if (isSiteOnline()) {
                    this.setState({
                        versions: [],
                    }, () => {
                        this.setState({
                            versions: program[0].versionList.filter(function (x, i, a) {
                                return a.indexOf(x) === i;
                            })
                        }, () => { this.consolidatedVersionList(programId) });
                    });


                } else {
                    this.setState({
                        versions: [],

                    }, () => {
                        this.consolidatedVersionList(programId)
                    })
                }
            } else {

                this.setState({
                    versions: [],

                }, () => { })

            }
        } else {
            this.setState({
                versions: [],

            }, () => { })
        }
    }

    consolidatedVersionList = (programId) => {
        const lan = 'en';
        const { versions } = this.state
        var verList = versions;

        var db1;
        getDatabase();
        var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var transaction = db1.transaction(['datasetData'], 'readwrite');
            var program = transaction.objectStore('datasetData');
            var getRequest = program.getAll();

            getRequest.onerror = function (event) {
                // Handle errors!
            };
            getRequest.onsuccess = function (event) {
                var myResult = [];
                myResult = getRequest.result;
                var userBytes = CryptoJS.AES.decrypt(localStorage.getItem('curUser'), SECRET_KEY);
                var userId = userBytes.toString(CryptoJS.enc.Utf8);
                for (var i = 0; i < myResult.length; i++) {
                    if (myResult[i].userId == userId && myResult[i].programId == programId) {
                        var bytes = CryptoJS.AES.decrypt(myResult[i].programName, SECRET_KEY);
                        var programNameLabel = bytes.toString(CryptoJS.enc.Utf8);
                        var databytes = CryptoJS.AES.decrypt(myResult[i].programData, SECRET_KEY);
                        var programData = databytes.toString(CryptoJS.enc.Utf8)
                        var version = JSON.parse(programData).currentVersion

                        version.versionId = `${version.versionId} (Local)`
                        verList.push(version)

                    }


                }

                console.log(verList)
                let versionList = verList.filter(function (x, i, a) {
                    return a.indexOf(x) === i;
                })
                versionList.reverse();
                this.setState({
                    versions: versionList,
                    // versionId: versionList[0].versionId
                }, () => {
                    this.filterData();
                    // this.getPlanningUnit();
                })


            }.bind(this);



        }.bind(this)


    }

    show() {

    }
    handleRangeChange(value, text, listIndex) {

    }
    handleRangeDissmis(value) {
        let startDate = value.from.year + '-' + value.from.month + '-01';
        let stopDate = value.to.year + '-' + value.to.month + '-' + new Date(value.to.year, value.to.month, 0).getDate();
        var monthArrayList = [];
        let cursorDate = value.from.year + '-' + value.from.month + '-01';
        for (var i = 0; moment(cursorDate).format("YYYY-MM") <= moment(stopDate).format("YYYY-MM"); i++) {
            var dt = moment(startDate).add(i, 'months').format("YYYY-MM-DD");
            cursorDate = moment(cursorDate).add(1, 'months').format("YYYY-MM-DD");
            monthArrayList.push(dt);
        }
        this.setState({ rangeValue: value, monthArrayList: monthArrayList }, () => {
            this.filterData();
        })

    }

    _handleClickRangeBox(e) {
        this.refs.pickRange.show()
    }
    loading = () => <div className="animated fadeIn pt-1 text-center">{i18n.t('static.common.loading')}</div>

    dateFormatterLanguage = value => {
        if (moment(value).format('MM') === '01') {
            return (i18n.t('static.month.jan') + ' ' + moment(value).format('YY'))
        } else if (moment(value).format('MM') === '02') {
            return (i18n.t('static.month.feb') + ' ' + moment(value).format('YY'))
        } else if (moment(value).format('MM') === '03') {
            return (i18n.t('static.month.mar') + ' ' + moment(value).format('YY'))
        } else if (moment(value).format('MM') === '04') {
            return (i18n.t('static.month.apr') + ' ' + moment(value).format('YY'))
        } else if (moment(value).format('MM') === '05') {
            return (i18n.t('static.month.may') + ' ' + moment(value).format('YY'))
        } else if (moment(value).format('MM') === '06') {
            return (i18n.t('static.month.jun') + ' ' + moment(value).format('YY'))
        } else if (moment(value).format('MM') === '07') {
            return (i18n.t('static.month.jul') + ' ' + moment(value).format('YY'))
        } else if (moment(value).format('MM') === '08') {
            return (i18n.t('static.month.aug') + ' ' + moment(value).format('YY'))
        } else if (moment(value).format('MM') === '09') {
            return (i18n.t('static.month.sep') + ' ' + moment(value).format('YY'))
        } else if (moment(value).format('MM') === '10') {
            return (i18n.t('static.month.oct') + ' ' + moment(value).format('YY'))
        } else if (moment(value).format('MM') === '11') {
            return (i18n.t('static.month.nov') + ' ' + moment(value).format('YY'))
        } else {
            return (i18n.t('static.month.dec') + ' ' + moment(value).format('YY'))
        }
    }

    setViewById(e) {
        console.log("e.targetvakue+++", e.target.value)
        var viewById = e.target.value;
        this.setState({
            viewById: viewById,
            planningUnitValues: [],
            planningUnitLabels: [],
            forecastingUnitValues: [],
            forecastingUnitLabels: [],
        }, () => {
            if (viewById == 2) {
                document.getElementById("planningUnitDiv").style.display = "none";
                document.getElementById("forecastingUnitDiv").style.display = "block";
                this.filterData();
            } else if (viewById == 1) {
                document.getElementById("planningUnitDiv").style.display = "block";
                document.getElementById("forecastingUnitDiv").style.display = "none";
                this.filterData();
            }
        })
    }

    handlePlanningUnitChange = (event) => {
        console.log('***', event)
        var planningUnitIds = event
        planningUnitIds = planningUnitIds.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value);
        })
        this.setState({
            planningUnitValues: planningUnitIds.map(ele => ele),
            planningUnitLabels: planningUnitIds.map(ele => ele.label)
        }, () => {

            this.filterData()
        })

    }

    getIndexAsKey = (d) => { return d.key };

    render() {

        const backgroundColor = [
            '#002F6C', '#BA0C2F', '#212721', '#0067B9', '#A7C6ED',
            '#205493', '#651D32', '#6C6463', '#BC8985', '#cfcdc9',
            '#49A4A1', '#118B70', '#EDB944', '#F48521', '#ED5626',
            '#002F6C', '#BA0C2F', '#212721', '#0067B9', '#A7C6ED',
            '#205493', '#651D32', '#6C6463', '#BC8985', '#cfcdc9',
            '#49A4A1', '#118B70', '#EDB944', '#F48521', '#ED5626',
            '#002F6C', '#BA0C2F', '#212721', '#0067B9', '#A7C6ED',
        ]

        var chartOptions = {
            title: {
                display: true,
                text: (this.state.yaxisEquUnit == 1 ? this.state.equivalencyUnitLabel : 'Monthly Forecast ' + (this.state.viewById == 1 ? '(Planning Unit)' : '(Forecasting Unit)'))
            },
            scales: {
                yAxes: [
                    {
                        id: 'A',
                        scaleLabel: {
                            display: true,
                            labelString: (this.state.yaxisEquUnit == 1 ? this.state.equivalencyUnitLabel : (this.state.viewById == 1 ? 'Planning Unit' : 'Forecasting Unit')),
                            fontColor: 'black'
                        },
                        stacked: (this.state.yaxisEquUnit == 1 ? true : false),
                        // stacked: true,//stacked
                        ticks: {
                            beginAtZero: true,
                            fontColor: 'black',
                            callback: function (value) {
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
                        },
                        gridLines: {
                            drawBorder: true, lineWidth: 0
                        },
                        position: 'left',
                    }
                ],
                xAxes: [{
                    ticks: {
                        fontColor: 'black'
                    },
                    gridLines: {
                        drawBorder: true, lineWidth: 0
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {

                        let label = data.labels[tooltipItem.index];
                        let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];

                        var cell1 = value
                        cell1 += '';
                        var x = cell1.split('.');
                        var x1 = x[0];
                        var x2 = x.length > 1 ? '.' + x[1] : '';
                        var rgx = /(\d+)(\d{3})/;
                        while (rgx.test(x1)) {
                            x1 = x1.replace(rgx, '$1' + ',' + '$2');
                        }
                        return data.datasets[tooltipItem.datasetIndex].label + ' : ' + x1 + x2;
                    }
                },
                // callbacks: {
                //     label: function (tooltipItems, data) {
                //         if (tooltipItems.datasetIndex == 0) {
                //             var details = this.state.expiredStockArr[tooltipItems.index].details;
                //             var infoToShow = [];
                //             details.map(c => {
                //                 infoToShow.push(c.batchNo + " - " + c.expiredQty.toLocaleString());
                //             });
                //             return (infoToShow.join(' | '));
                //         } else {
                //             return (tooltipItems.yLabel.toLocaleString());
                //         }
                //     }.bind(this)
                // },
                enabled: false,
                custom: CustomTooltips
            },
            maintainAspectRatio: false
            ,
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    fontColor: 'black'
                }
            }
        }


        let bar = {}
        if (this.state.consumptionData.length > 0 && this.state.monthArrayList.length > 0 && this.state.xaxis == 2) {
            var datasetsArr = [];
            this.state.consumptionData.filter(c => c.display == true).map((item, index) => {
                {
                    var consumptionValue = [];
                    this.state.monthArrayList.map(item1 => {
                        {
                            var value = item.consumptionList.filter(c => moment(c.consumptionDate).format("YYYY-MM") == moment(item1).format("YYYY-MM"));
                            if (value.length > 0) {
                                consumptionValue.push(value[0].consumptionQty)
                            } else {
                                consumptionValue.push("");
                            }
                        }
                    })
                    datasetsArr.push(
                        {
                            label: item.objUnit.label.label_en,
                            id: item.objUnit.id,
                            type: 'line',
                            stack: 3,
                            yAxisID: 'A',
                            // backgroundColor: 'transparent',
                            backgroundColor: (this.state.yaxisEquUnit == 1 ? backgroundColor[index] : 'transparent'),
                            // backgroundColor: item.color,//stacked
                            borderColor: backgroundColor[index],
                            borderStyle: 'dotted',
                            ticks: {
                                fontSize: 2,
                                fontColor: 'transparent',
                            },
                            lineTension: 0,
                            pointStyle: 'line',
                            pointRadius: 0,
                            showInLegend: true,
                            data: consumptionValue
                        }
                    )

                }
            })

            bar = {

                labels: [...new Set(this.state.monthArrayList.map(ele => (moment(ele).format(DATE_FORMAT_CAP_WITHOUT_DATE))))],
                datasets: datasetsArr

            };
        } else if (this.state.consumptionData.length > 0 && this.state.monthArrayList.length > 0 && this.state.xaxis == 1) {
            var datasetsArr = [];
            this.state.consumptionData.filter(c => c.display == true).map((item, index) => {
                {
                    var consumptionValue = [];
                    this.state.monthArrayList.map(item1 => {
                        {
                            var value = item.consumptionList.filter(c => moment(c.consumptionDate).format("YYYY") == moment(item1).format("YYYY"));
                            if (value.length > 0) {
                                consumptionValue.push(value[0].consumptionQty)
                            } else {
                                consumptionValue.push("");
                            }
                        }
                    })
                    datasetsArr.push(
                        {
                            label: item.objUnit.label.label_en,
                            type: 'line',
                            stack: 3,
                            yAxisID: 'A',
                            // backgroundColor: 'transparent',
                            backgroundColor: (this.state.yaxisEquUnit == 1 ? backgroundColor[index] : 'transparent'),
                            // backgroundColor: item.color,//stacked
                            borderColor: backgroundColor[index],
                            borderStyle: 'dotted',
                            ticks: {
                                fontSize: 2,
                                fontColor: 'transparent',
                            },
                            lineTension: 0,
                            pointStyle: 'line',
                            pointRadius: 0,
                            showInLegend: true,
                            data: consumptionValue
                        }
                    )

                }
            })

            bar = {

                labels: [...new Set(this.state.monthArrayList.map(ele => (moment(ele).format("YYYY"))))],
                datasets: datasetsArr

            };
        }

        const { planningUnits } = this.state;
        let planningUnitList = planningUnits.length > 0
            && planningUnits.map((item, i) => {
                return ({ label: getLabelText(item.label, this.state.lang), value: item.id })

            }, this);

        const { forecastingUnits } = this.state;
        let forecastingUnitList = forecastingUnits.length > 0
            && forecastingUnits.map((item, i) => {
                return ({ label: getLabelText(item.label, this.state.lang), value: item.id })

            }, this);


        const { programs } = this.state;
        let programList = programs.length > 0
            && programs.map((item, i) => {
                return (
                    <option key={i} value={item.programId}>
                        {item.label.label_en}
                    </option>
                )
            }, this);

        const { versions } = this.state;
        let versionList = versions.length > 0
            && versions.map((item, i) => {
                return (
                    <option key={i} value={item.versionId}>
                        {/* {item.versionId} */}
                        {((item.versionStatus.id == 2 && item.versionType.id == 2) ? item.versionId + '*' : item.versionId)}
                    </option>
                )
            }, this);


        const { equivalencyUnitList } = this.state;
        let equivalencyUnitList1 = equivalencyUnitList.length > 0
            && equivalencyUnitList.map((item, i) => {
                return (
                    <option key={i} value={item.equivalencyUnitId}>
                        {item.label.label_en}
                    </option>
                )
            }, this);

        const pickerLang = {
            months: [i18n.t('static.month.jan'), i18n.t('static.month.feb'), i18n.t('static.month.mar'), i18n.t('static.month.apr'), i18n.t('static.month.may'), i18n.t('static.month.jun'), i18n.t('static.month.jul'), i18n.t('static.month.aug'), i18n.t('static.month.sep'), i18n.t('static.month.oct'), i18n.t('static.month.nov'), i18n.t('static.month.dec')],
            from: 'From', to: 'To',
        }
        const { rangeValue } = this.state
        const checkOnline = localStorage.getItem('sessionType');

        const makeText = m => {
            if (m && m.year && m.month) return (pickerLang.months[m.month - 1] + '. ' + m.year)
            return '?'
        }

        return (
            <div className="animated fadeIn" >
                <AuthenticationServiceComponent history={this.props.history} />
                <h6 className="mt-success">{i18n.t(this.props.match.params.message)}</h6>
                <h5 className="red">{i18n.t(this.state.message)}</h5>

                <Card>
                    <div className="Card-header-reporticon pb-2">
                        {checkOnline === 'Online' &&
                            this.state.consumptionData.length > 0 &&
                            <div className="card-header-actions">
                                <a className="card-header-action">

                                    <img style={{ height: '25px', width: '25px', cursor: 'pointer' }} src={pdfIcon} title="Export PDF" onClick={() => this.exportPDF()} />


                                </a>
                                <img style={{ height: '25px', width: '25px', cursor: 'pointer' }} src={csvicon} title={i18n.t('static.report.exportCsv')} onClick={() => this.exportCSV()} />
                            </div>
                        }
                        {checkOnline === 'Offline' &&
                            this.state.offlineConsumptionList.length > 0 &&
                            <div className="card-header-actions">
                                <a className="card-header-action">

                                    <img style={{ height: '25px', width: '25px', cursor: 'pointer' }} src={pdfIcon} title={i18n.t('static.report.exportPdf')} onClick={() => this.exportPDF()} />

                                </a>
                                <img style={{ height: '25px', width: '25px', cursor: 'pointer' }} src={csvicon} title={i18n.t('static.report.exportCsv')} onClick={() => this.exportCSV()} />
                            </div>
                        }
                    </div>
                    <CardBody className="pb-lg-2 pt-lg-0 ">
                        <div>
                            <div ref={ref}>
                                <Form >
                                    <div className="pl-0">
                                        <div className="row">
                                            <FormGroup className="col-md-3">
                                                <Label htmlFor="appendedInputButton">{i18n.t('static.program.program')}</Label>
                                                <div className="controls ">
                                                    <InputGroup>
                                                        <Input
                                                            type="select"
                                                            name="programId"
                                                            id="programId"
                                                            bsSize="sm"
                                                            // onChange={this.filterVersion}
                                                            onChange={(e) => { this.setProgramId(e); }}
                                                            value={this.state.programId}

                                                        >
                                                            <option value="-1">{i18n.t('static.common.select')}</option>
                                                            {programList}
                                                        </Input>

                                                    </InputGroup>
                                                </div>
                                            </FormGroup>

                                            <FormGroup className="col-md-3">
                                                <Label htmlFor="appendedInputButton">{i18n.t('static.report.version')}</Label>
                                                <div className="controls ">
                                                    <InputGroup>
                                                        <Input
                                                            type="select"
                                                            name="versionId"
                                                            id="versionId"
                                                            bsSize="sm"
                                                            // onChange={this.filterVersion}
                                                            onChange={(e) => { this.setVersionId(e); }}
                                                            value={this.state.versionId}

                                                        >
                                                            <option value="-1">{i18n.t('static.common.select')}</option>
                                                            {versionList}
                                                        </Input>

                                                    </InputGroup>
                                                </div>
                                            </FormGroup>

                                            <FormGroup className="col-md-3">
                                                <Label htmlFor="appendedInputButton">Forecast Period</Label>
                                                <div className="controls ">
                                                    <InputGroup>
                                                        <Input
                                                            type="text"
                                                            name="forecastPeriod"
                                                            id="forecastPeriod"
                                                            value={this.state.forecastPeriod}
                                                            bsSize="sm"
                                                            disabled={true}

                                                        >
                                                        </Input>

                                                    </InputGroup>
                                                </div>
                                            </FormGroup>

                                            <FormGroup className="col-md-3">
                                                <Label htmlFor="appendedInputButton">{i18n.t('static.report.dateRange')}<span className="stock-box-icon fa fa-sort-desc ml-1"></span></Label>
                                                <div className="controls edit">

                                                    <Picker
                                                        ref="pickRange"
                                                        years={{ min: this.state.minDate, max: this.state.maxDate }}
                                                        value={rangeValue}
                                                        lang={pickerLang}
                                                        //theme="light"
                                                        onChange={this.handleRangeChange}
                                                        onDismiss={this.handleRangeDissmis}
                                                    >
                                                        <MonthBox value={makeText(rangeValue.from) + ' ~ ' + makeText(rangeValue.to)} onClick={this._handleClickRangeBox} />
                                                    </Picker>
                                                </div>
                                            </FormGroup>


                                            <FormGroup className="col-md-3">
                                                <Label htmlFor="appendedInputButton">{i18n.t('static.report.yaxisEquUnit')}</Label>
                                                <div className="controls ">
                                                    <InputGroup>
                                                        <Input
                                                            type="select"
                                                            name="yaxisEquUnit"
                                                            id="yaxisEquUnit"
                                                            bsSize="sm"
                                                            value={this.state.yaxisEquUnit}
                                                            // onChange={this.filterData}
                                                            onChange={(e) => { this.yAxisChange(e); }}
                                                        >
                                                            <option value="1">{i18n.t('static.program.yes')}</option>
                                                            <option value="2">{i18n.t('static.program.no')}</option>
                                                        </Input>

                                                    </InputGroup>
                                                </div>
                                            </FormGroup>

                                            <FormGroup className="col-md-3" id="equivalencyUnitDiv" style={{ display: "none" }}>
                                                <Label htmlFor="appendedInputButton">Equivalency Unit</Label>
                                                <div className="controls">
                                                    <InputGroup>
                                                        <Input
                                                            type="select"
                                                            name="equivalencyUnitId"
                                                            id="equivalencyUnitId"
                                                            // value={this.state.equivalencyUnitId}
                                                            onChange={this.getPlanningUnitForecastingUnit}
                                                            bsSize="sm"
                                                        >
                                                            <option value="-1">{i18n.t('static.common.select')}</option>
                                                            {equivalencyUnitList1}
                                                        </Input>

                                                    </InputGroup>
                                                </div>
                                            </FormGroup>

                                            <FormGroup className="col-md-3">
                                                <Label htmlFor="appendedInputButton">{i18n.t('static.common.display')}</Label>
                                                <div className="controls">
                                                    <InputGroup>
                                                        <Input
                                                            type="select"
                                                            name="viewById"
                                                            id="viewById"
                                                            bsSize="sm"
                                                            // value={this.state.viewById}
                                                            onChange={this.setViewById}
                                                        >
                                                            <option value="1">{i18n.t('static.report.planningUnit')}</option>
                                                            <option value="2">{i18n.t('static.dashboard.forecastingunit')}</option>
                                                        </Input>
                                                    </InputGroup>
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="col-md-3" id="forecastingUnitDiv">
                                                <Label htmlFor="appendedInputButton">{i18n.t('static.product.unit1')}</Label>
                                                <span className="reportdown-box-icon  fa fa-sort-desc ml-1"></span>
                                                <div className="controls ">
                                                    {/* <InputGroup className="box"> */}
                                                    <MultiSelect
                                                        name="foreccastingUnitId"
                                                        id="forecastingUnitId"
                                                        onChange={(e) => this.setForecastingUnit(e)}
                                                        options={forecastingUnitList && forecastingUnitList.length > 0 ? forecastingUnitList : []}
                                                        value={this.state.forecastingUnitValues}
                                                        labelledBy={i18n.t('static.common.select')}
                                                        disabled={this.state.loading}
                                                    />

                                                </div>
                                            </FormGroup>

                                            <FormGroup className="col-md-3" id="planningUnitDiv">
                                                <Label htmlFor="appendedInputButton">{i18n.t('static.report.planningUnit')}</Label>
                                                <span className="reportdown-box-icon  fa fa-sort-desc ml-1"></span>
                                                <div className="controls ">
                                                    {/* <InputGroup className="box"> */}
                                                    <MultiSelect
                                                        name="planningUnitId"
                                                        id="planningUnitId"
                                                        options={planningUnitList && planningUnitList.length > 0 ? planningUnitList : []}
                                                        value={this.state.planningUnitValues}
                                                        onChange={(e) => { this.handlePlanningUnitChange(e) }}
                                                        labelledBy={i18n.t('static.common.select')}
                                                        disabled={this.state.loading}
                                                    />

                                                </div>
                                            </FormGroup>

                                            <FormGroup className="col-md-3">
                                                <Label htmlFor="appendedInputButton">X-axis Aggregate By Year</Label>
                                                <div className="controls ">
                                                    <InputGroup>
                                                        <Input
                                                            type="select"
                                                            name="xaxis"
                                                            id="xaxis"
                                                            bsSize="sm"
                                                            value={this.state.xaxis}
                                                            onChange={(e) => { this.xAxisChange(e); }}
                                                        // onChange={this.filterData}
                                                        >
                                                            <option value="1">{i18n.t('static.program.yes')}</option>
                                                            <option value="2">{i18n.t('static.program.no')}</option>
                                                        </Input>

                                                    </InputGroup>
                                                </div>
                                            </FormGroup>
                                        </div>
                                    </div>
                                </Form>
                                <br></br>

                                <br></br>
                                <Col md="12 pl-0" style={{ display: this.state.loading ? "none" : "block" }}>
                                    <div className="row">
                                        {this.state.consumptionData.length > 0
                                            &&
                                            <div className="col-md-12 p-0">
                                                <div className="col-md-12">
                                                    <div className="chart-wrapper chart-graph-report pl-5 ml-3" style={{ marginLeft: '50px' }}>
                                                        <Bar id="cool-canvas" data={bar} options={chartOptions}
                                                        // datasetKeyProvider={this.getIndexAsKey}
                                                        />
                                                        <div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <button className="mr-1 mb-2 float-right btn btn-info btn-md showdatabtn" onClick={this.toggledata}>
                                                        {this.state.show ? i18n.t('static.common.hideData') : i18n.t('static.common.showData')}
                                                    </button>

                                                </div>
                                            </div>
                                        }




                                    </div>



                                    <div className="row">
                                        <div className="col-md-12 pl-0 pr-0">
                                            {this.state.show &&
                                                <div className="table-scroll">
                                                    <div className="table-wrap table-responsive">
                                                        <Table className="table-bordered text-center mt-2 overflowhide main-table " bordered size="sm" options={this.options}>
                                                            <thead>
                                                                <tr>
                                                                    <th>Display?</th>
                                                                    <th>{this.state.viewById == 1 ? 'Planning Unit' : 'Forecasting Unit'}</th>
                                                                    <th>Tree Name + Scenario / Consumption Extrapolation</th>
                                                                    {this.state.xaxis == 2 && this.state.monthArrayList.map(item => (
                                                                        <th>{moment(item).format(DATE_FORMAT_CAP_WITHOUT_DATE)}</th>
                                                                    ))}
                                                                    {this.state.xaxis == 1 && this.state.monthArrayList.map(item => (
                                                                        <th>{moment(item).format("YYYY")}</th>
                                                                    ))}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {this.state.xaxis == 2 && this.state.consumptionData.map(item => (
                                                                    <tr>
                                                                        <td align="center"><input type="checkbox" id={"planningUnitCheckbox" + item.objUnit.id} checked={item.display} onChange={() => this.planningUnitCheckedChanged(item.objUnit.id)} /></td>
                                                                        <td>{item.objUnit.label.label_en}</td>
                                                                        <td>{item.scenario.label}</td>
                                                                        {this.state.monthArrayList.map(item1 => (
                                                                            <td>{item.consumptionList.filter(c => moment(c.consumptionDate).format("YYYY-MM") == moment(item1).format("YYYY-MM")).length > 0 ? <NumberFormat displayType={'text'} thousandSeparator={true} value={item.consumptionList.filter(c => moment(c.consumptionDate).format("YYYY-MM") == moment(item1).format("YYYY-MM"))[0].consumptionQty} /> : ""}</td>
                                                                        ))}
                                                                    </tr>
                                                                ))}

                                                                {this.state.xaxis == 1 && this.state.consumptionData.map(item => (
                                                                    <tr>
                                                                        <td align="center"><input type="checkbox" id={"planningUnitCheckbox" + item.objUnit.id} checked={item.display} onChange={() => this.planningUnitCheckedChanged(item.objUnit.id)} /></td>
                                                                        <td>{item.objUnit.label.label_en}</td>
                                                                        <td>{item.scenario.label}</td>
                                                                        {this.state.monthArrayList.map(item1 => (
                                                                            <td>{item.consumptionList.filter(c => moment(c.consumptionDate).format("YYYY") == moment(item1).format("YYYY")).length > 0 ? <NumberFormat displayType={'text'} thousandSeparator={true} value={item.consumptionList.filter(c => moment(c.consumptionDate).format("YYYY") == moment(item1).format("YYYY"))[0].consumptionQty} /> : ""}</td>
                                                                        ))}
                                                                    </tr>
                                                                ))}

                                                            </tbody>

                                                        </Table>

                                                    </div>
                                                </div>}
                                        </div>
                                    </div>

                                </Col>
                                <div style={{ display: this.state.loading ? "block" : "none" }}>
                                    <div className="d-flex align-items-center justify-content-center" style={{ height: "500px" }} >
                                        <div class="align-items-center">
                                            <div ><h4> <strong>{i18n.t('static.common.loading')}</strong></h4></div>

                                            <div class="spinner-border blue ml-4" role="status">

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div >
        );
    }
}

export default ForecastOutput;