import React from "react";
import ReactDOM from 'react-dom';
import {
    Card, CardBody,
    Label, Input, FormGroup,
    CardFooter, Button, Col, Form, InputGroup, Modal, ModalHeader, ModalFooter, ModalBody, Row, Table
} from 'reactstrap';
import { getDatabase } from "../../CommonComponent/IndexedDbFunctions";
import { INDEXED_DB_NAME, INDEXED_DB_VERSION, JEXCEL_PAGINATION_OPTION, SECRET_KEY } from "../../Constants";
import i18n from '../../i18n';
import CryptoJS from 'crypto-js'
import getLabelText from "../../CommonComponent/getLabelText";
import jexcel from 'jexcel-pro';
import { DATE_FORMAT_CAP, JEXCEL_DATE_FORMAT_SM, JEXCEL_PRO_KEY } from '../../Constants.js';
import { jExcelLoadedFunction, jExcelLoadedFunctionOnlyHideRow } from '../../CommonComponent/JExcelCommonFunctions.js';
import csvicon from '../../assets/img/csv.png';
import { Bar, Line, Pie } from 'react-chartjs-2';
import moment from "moment"
import Picker from 'react-month-picker'
import MonthBox from '../../CommonComponent/MonthBox.js'

export default class ExtrapolateDataComponent extends React.Component {
    constructor(props) {
        super(props);
        this.options = props.options;
        var startDate = moment(Date.now()).subtract(6, 'months').startOf('month').format("YYYY-MM-DD");
        var endDate = moment(Date.now()).add(18, 'months').startOf('month').format("YYYY-MM-DD")
        this.state = {
            forecastProgramId: -1,
            forecastProgramList: [],
            planningUnitId: -1,
            planningUnitList: [],
            regionId: -1,
            regionList: [],
            lang: localStorage.getItem("lang"),
            movingAvgId: false,
            semiAvgId: false,
            linearRegressionId: false,
            showAdvanceId: false,
            dataList: [{ 'months': 'Jan-20', 'actuals': '155', 'tesLcb': '155', 'tesM': '155', 'tesUcb': '155', 'arimaForecast': '155', 'linearRegression': '211', 'semiAveragesForecast': '277', 'movingAverages': '' }, { 'months': 'Feb-20', 'actuals': '180', 'tesLcb': '180', 'tesM': '180', 'tesUcb': '180', 'arimaForecast': '180', 'linearRegression': '225', 'semiAveragesForecast': '283', 'movingAverages': '155' }, { 'months': 'Mar-20', 'actuals': '260', 'tesLcb': '260', 'tesM': '260', 'tesUcb': '260', 'arimaForecast': '260', 'linearRegression': '240', 'semiAveragesForecast': '288', 'movingAverages': '168' }, { 'months': 'Apr-20', 'actuals': '560', 'tesLcb': '560', 'tesM': '560', 'tesUcb': '560', 'arimaForecast': '560', 'linearRegression': '254', 'semiAveragesForecast': '294', 'movingAverages': '198' }, { 'months': 'May-20', 'actuals': '160', 'tesLcb': '160', 'tesM': '160', 'tesUcb': '160', 'arimaForecast': '160', 'linearRegression': '268', 'semiAveragesForecast': '299', 'movingAverages': '289' }, { 'months': 'Jun-20', 'actuals': '185', 'tesLcb': '185', 'tesM': '185', 'tesUcb': '185', 'arimaForecast': '185', 'linearRegression': '282', 'semiAveragesForecast': '304', 'movingAverages': '263' }, { 'months': 'Jul-20', 'actuals': '270', 'tesLcb': '270', 'tesM': '270', 'tesUcb': '270', 'arimaForecast': '270', 'linearRegression': '297', 'semiAveragesForecast': '310', 'movingAverages': '269' }, { 'months': 'Aug-20', 'actuals': '600', 'tesLcb': '600', 'tesM': '600', 'tesUcb': '600', 'arimaForecast': '600', 'linearRegression': '311', 'semiAveragesForecast': '315', 'movingAverages': '287' }, { 'months': 'Sep-20', 'actuals': '165', 'tesLcb': '165', 'tesM': '165', 'tesUcb': '165', 'arimaForecast': '165', 'linearRegression': '325', 'semiAveragesForecast': '321', 'movingAverages': '355' }, { 'months': 'Oct-20', 'actuals': '190', 'tesLcb': '190', 'tesM': '190', 'tesUcb': '190', 'arimaForecast': '190', 'linearRegression': '339', 'semiAveragesForecast': '326', 'movingAverages': '276' }, { 'months': 'Nov-20', 'actuals': '280', 'tesLcb': '280', 'tesM': '280', 'tesUcb': '280', 'arimaForecast': '280', 'linearRegression': '354', 'semiAveragesForecast': '332', 'movingAverages': '282' }, { 'months': 'Dec-20', 'actuals': '635', 'tesLcb': '635', 'tesM': '635', 'tesUcb': '635', 'arimaForecast': '635', 'linearRegression': '368', 'semiAveragesForecast': '337', 'movingAverages': '301' }, { 'months': 'Jan-21', 'actuals': '172', 'tesLcb': '172', 'tesM': '172', 'tesUcb': '172', 'arimaForecast': '172', 'linearRegression': '382', 'semiAveragesForecast': '342', 'movingAverages': '374' }, { 'months': 'Feb-21', 'actuals': '226', 'tesLcb': '226', 'tesM': '226', 'tesUcb': '226', 'arimaForecast': '226', 'linearRegression': '396', 'semiAveragesForecast': '348', 'movingAverages': '288' }, { 'months': 'Mar-21', 'actuals': '329', 'tesLcb': '329', 'tesM': '329', 'tesUcb': '329', 'arimaForecast': '329', 'linearRegression': '411', 'semiAveragesForecast': '353', 'movingAverages': '301' }, { 'months': 'Apr-21', 'actuals': '721', 'tesLcb': '721', 'tesM': '721', 'tesUcb': '721', 'arimaForecast': '721', 'linearRegression': '425', 'semiAveragesForecast': '359', 'movingAverages': '328' }, { 'months': 'May-21', 'actuals': '', 'tesLcb': '332', 'tesM': '', 'tesUcb': '', 'arimaForecast': '363', 'linearRegression': '439', 'semiAveragesForecast': '364', 'movingAverages': '417' }, { 'months': 'Jun-21', 'actuals': '', 'tesLcb': '619', 'tesM': '', 'tesUcb': '', 'arimaForecast': '362', 'linearRegression': '453', 'semiAveragesForecast': '370', 'movingAverages': '373' }, { 'months': 'Jul-21', 'actuals': '', 'tesLcb': '575', 'tesM': '', 'tesUcb': '', 'arimaForecast': '361', 'linearRegression': '468', 'semiAveragesForecast': '375', 'movingAverages': '413' }, { 'months': 'Aug-21', 'actuals': '', 'tesLcb': '280', 'tesM': '', 'tesUcb': '', 'arimaForecast': '360', 'linearRegression': '482', 'semiAveragesForecast': '381', 'movingAverages': '451' }, { 'months': 'Sep-21', 'actuals': '', 'tesLcb': '389', 'tesM': '', 'tesUcb': '', 'arimaForecast': '359', 'linearRegression': '496', 'semiAveragesForecast': '386', 'movingAverages': '475' }, { 'months': 'Oct-21', 'actuals': '', 'tesLcb': '540', 'tesM': '', 'tesUcb': '', 'arimaForecast': '358', 'linearRegression': '510', 'semiAveragesForecast': '391', 'movingAverages': '426' }, { 'months': 'Nov-21', 'actuals': '', 'tesLcb': '359', 'tesM': '', 'tesUcb': '', 'arimaForecast': '358', 'linearRegression': '525', 'semiAveragesForecast': '397', 'movingAverages': '427' }, { 'months': 'Dec-21', 'actuals': '', 'tesLcb': '834', 'tesM': '', 'tesUcb': '', 'arimaForecast': '357', 'linearRegression': '539', 'semiAveragesForecast': '402', 'movingAverages': '438' }, { 'months': 'Jan-22', 'actuals': '', 'tesLcb': '437', 'tesM': '', 'tesUcb': '', 'arimaForecast': '357', 'linearRegression': '553', 'semiAveragesForecast': '408', 'movingAverages': '443' }, { 'months': 'Feb-22', 'actuals': '', 'tesLcb': '756', 'tesM': '', 'tesUcb': '', 'arimaForecast': '356', 'linearRegression': '567', 'semiAveragesForecast': '413', 'movingAverages': '442' }],
            rangeValue: { from: { year: new Date(startDate).getFullYear(), month: new Date(startDate).getMonth() + 1 }, to: { year: new Date(endDate).getFullYear(), month: new Date(endDate).getMonth() + 1 } },
            rangeValue1: { from: { year: new Date(startDate).getFullYear(), month: new Date(startDate).getMonth() + 1 }, to: { year: new Date(endDate).getFullYear(), month: new Date(endDate).getMonth() + 1 } },
            minDate: { year: new Date().getFullYear() - 10, month: new Date().getMonth() + 1 },
            maxDate: { year: new Date().getFullYear() + 10, month: new Date().getMonth() + 1 },
        }
        this._handleClickRangeBox = this._handleClickRangeBox.bind(this)
        this.handleRangeDissmis = this.handleRangeDissmis.bind(this);
        this.pickRange = React.createRef();

        this._handleClickRangeBox1 = this._handleClickRangeBox1.bind(this)

        this.handleRangeDissmis1 = this.handleRangeDissmis1.bind(this);
        this.pickRange1 = React.createRef();
    }
    componentDidMount = function () {
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
            var programDataTransaction = db1.transaction(['datasetData'], 'readwrite');
            var programDataOs = programDataTransaction.objectStore('datasetData');
            var programRequest = programDataOs.getAll();
            programRequest.onerror = function (event) {
                this.setState({
                    message: i18n.t('static.program.errortext'),
                    color: 'red'
                })
                this.hideFirstComponent()
            }.bind(this);
            programRequest.onsuccess = function (e) {
                var forecastProgramList = [];
                var myResult = programRequest.result;
                for (var i = 0; i < myResult.length; i++) {
                    var datasetDataBytes = CryptoJS.AES.decrypt(myResult[i].programData, SECRET_KEY);
                    var datasetData = datasetDataBytes.toString(CryptoJS.enc.Utf8);
                    var datasetJson = JSON.parse(datasetData);
                    var forecastProgramJson = {
                        name: datasetJson.programCode,
                        id: myResult[i].id,
                        regionList: datasetJson.regionList
                    }
                    forecastProgramList.push(forecastProgramJson)
                }
                this.setState({
                    forecastProgramList: forecastProgramList
                })
            }.bind(this)
        }.bind(this)

        this.buildJxl();
    }

    handleRangeDissmis(value) {
        this.setState({ rangeValue: value })
    }
    handleRangeDissmis1(value) {
        this.setState({ rangeValue: value })
    }

    buildJxl() {
        let dataList = this.state.dataList;
        // console.log("langaugeList---->", langaugeList);
        let dataArray = [];
        var data = [];

        for (var j = 0; j < dataList.length; j++) {
            data = [];
            data[0] = dataList[j].months
            data[1] = dataList[j].actuals;
            data[2] = dataList[j].tesLcb;
            data[3] = dataList[j].tesM;
            data[4] = dataList[j].tesUcb;
            data[5] = dataList[j].arimaForecast
            data[6] = dataList[j].linearRegression;
            data[7] = dataList[j].semiAveragesForecast;
            data[8] = dataList[j].movingAverages;

            dataArray.push(data);
        }
        this.el = jexcel(document.getElementById("tableDiv"), '');
        this.el.destroy();

        var options = {
            data: dataArray,
            columnDrag: true,
            // colWidths: [0, 150, 150, 150, 100, 100, 100],
            columns: [
                {
                    title: 'Months',
                    type: 'text'
                },
                {
                    title: 'Actuals',
                    type: 'number'
                },
                {
                    title: 'TES (Lower Confidence Bound)',
                    type: 'number'
                },
                {
                    title: 'TES (Medium)',
                    type: 'number'
                },
                {
                    title: 'TES (Upper Confidence Bound)',
                    type: 'number'
                },
                {
                    title: 'ARIMA Forecast',
                    type: 'number'
                },
                {
                    title: 'Linear Regression',
                    type: 'number'
                },
                {
                    title: 'Semi-Averages Forecast',
                    type: 'number'
                },
                {
                    title: 'Moving Averages',
                    type: 'number'
                }
            ],
            text: {
                // showingPage: `${i18n.t('static.jexcel.showing')} {0} ${i18n.t('static.jexcel.to')} {1} ${i18n.t('static.jexcel.of')} {1} ${i18n.t('static.jexcel.pages')}`,
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
            onselection: this.selected,
            oneditionend: this.onedit,
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
        var dataEl = jexcel(document.getElementById("tableDiv"), options);
        this.el = dataEl;
    }

    loaded = function (instance, cell, x, y, value) {
        jExcelLoadedFunction(instance);
    }
    getPlanningUnitList(e) {
        var forecastProgramId = e.target.value;
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
            var programDataTransaction = db1.transaction(['planningUnit'], 'readwrite');
            var programDataOs = programDataTransaction.objectStore('planningUnit');
            var programRequest = programDataOs.getAll();
            programRequest.onerror = function (event) {
                this.setState({
                    message: i18n.t('static.program.errortext'),
                    color: 'red'
                })
                this.hideFirstComponent()
            }.bind(this);
            programRequest.onsuccess = function (e) {
                var planningUnitList = [];
                var myResult = programRequest.result;
                var forecastProgramListFilter = this.state.forecastProgramList.filter(c => c.id == forecastProgramId)[0]
                var regionList = forecastProgramListFilter.regionList;
                for (var i = 0; i < myResult.length; i++) {
                    var planningUnitDataJson = {
                        name: getLabelText(myResult[i].label, this.state.lang),
                        id: myResult[i].planningUnitId
                    }
                    planningUnitList.push(planningUnitDataJson)
                }
                this.setState({
                    planningUnitList: planningUnitList,
                    forecastProgramId: forecastProgramId,
                    regionList: regionList
                })
            }.bind(this)
        }.bind(this)
    }

    setPlanningUnitId(e) {
        var planningUnitId = e.target.value;
        this.setState({
            planningUnitId: planningUnitId
        })
    }

    setRegionId(e) {
        var regionId = e.target.value;
        this.setState({
            regionId: regionId
        })
    }

    setMovingAvgId(e) {
        var movingAvgId = e.target.checked;
        this.setState({
            movingAvgId: movingAvgId
        })
    }
    // setSemiAvgId(e) {
    //     var semiAvgId = e.target.checked;
    //     this.setState({
    //         semiAvgId: semiAvgId
    //     })
    // }
    // setLinearRegressionId(e) {
    //     var linearRegressionId = e.target.checked;
    //     this.setState({
    //         linearRegressionId: linearRegressionId
    //     })
    // }
    setSmoothingId(e) {
        var smoothingId = e.target.checked;
        this.setState({
            smoothingId: smoothingId
        })
    }
    setArimaId(e) {
        var arimaId = e.target.checked;
        this.setState({
            arimaId: arimaId
        })
    }
    setShowAdvanceId(e) {
        var showAdvanceId = e.target.checked;
        this.setState({
            showAdvanceId: showAdvanceId
        })
    }

    render() {
        const pickerLang = {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            from: 'From', to: 'To',
        }
        const { rangeValue } = this.state
        const { rangeValue1 } = this.state

        const makeText = m => {
            if (m && m.year && m.month) return (pickerLang.months[m.month - 1] + '. ' + m.year)
            return '?'
        }

        const { forecastProgramList } = this.state;
        let forecastPrograms = forecastProgramList.length > 0 && forecastProgramList.map((item, i) => {
            return (
                <option key={i} value={item.id}>
                    {item.name}
                </option>
            )
        }, this);
        const { planningUnitList } = this.state;
        let planningUnits = planningUnitList.length > 0 && planningUnitList.map((item, i) => {
            return (
                <option key={i} value={item.id}>
                    {item.name}
                </option>
            )
        }, this);
        const { regionList } = this.state;
        let regions = regionList.length > 0 && regionList.map((item, i) => {
            return (
                <option key={i} value={item.regionId}>
                    {getLabelText(item.label, this.state.lang)}
                </option>
            )
        }, this);

        const options = {
            title: {
                display: false,
            },

            scales: {

                yAxes: [{
                    scaleLabel: {
                        display: false
                    },
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
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: 'black'
                    }
                }]
            },

            // tooltips: {
            //   enabled: false,
            //   custom: CustomTooltips,
            //   callbacks: {
            //     label: function (tooltipItem, data) {

            //       let label = data.labels[tooltipItem.index];
            //       let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];

            //       var cell1 = value
            //       cell1 += '';
            //       var x = cell1.split('.');
            //       var x1 = x[0];
            //       var x2 = x.length > 1 ? '.' + x[1] : '';
            //       var rgx = /(\d+)(\d{3})/;
            //       while (rgx.test(x1)) {
            //         x1 = x1.replace(rgx, '$1' + ',' + '$2');
            //       }
            //       return data.datasets[tooltipItem.datasetIndex].label + ' : ' + x1 + x2;
            //     }
            //   }

            // },

            maintainAspectRatio: false,
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    fontColor: "black"
                }
            }
        }


        let bar = "";
        bar = {
            labels: this.state.dataList.map((item, index) => (item.months)),
            datasets: [
                {
                    type: "line",
                    lineTension: 0,
                    label: 'Actuals',
                    backgroundColor: 'transparent',
                    borderColor: '#808080',
                    ticks: {
                        fontSize: 2,
                        fontColor: 'transparent',
                    },
                    showInLegend: true,
                    pointStyle: 'line',
                    pointBorderWidth: 5,
                    yValueFormatString: "###,###,###,###",
                    data: this.state.dataList.map((item, index) => (item.actuals > 0 ? item.actuals : null))
                },
                {
                    type: "line",
                    lineTension: 0,
                    label: 'TES (Lower Confidence Bound)',
                    backgroundColor: 'transparent',
                    borderColor: '#000080',
                    ticks: {
                        fontSize: 2,
                        fontColor: 'transparent',
                    },
                    showInLegend: true,
                    pointStyle: 'line',
                    pointBorderWidth: 5,
                    yValueFormatString: "###,###,###,###",
                    data: this.state.dataList.map((item, index) => (item.tesLcb > 0 ? item.tesLcb : null))
                },
                {
                    type: "line",
                    lineTension: 0,
                    label: 'ARIMA Forecast',
                    backgroundColor: 'transparent',
                    borderColor: '#800000',
                    ticks: {
                        fontSize: 2,
                        fontColor: 'transparent',
                    },
                    showInLegend: true,
                    pointStyle: 'line',
                    pointBorderWidth: 5,
                    yValueFormatString: "###,###,###,###",
                    data: this.state.dataList.map((item, index) => (item.arimaForecast > 0 ? item.arimaForecast : null))
                },
                {
                    type: "line",
                    lineTension: 0,
                    label: 'Linear Regression',
                    backgroundColor: 'transparent',
                    borderColor: '#006400',
                    ticks: {
                        fontSize: 2,
                        fontColor: 'transparent',
                    },
                    showInLegend: true,
                    pointStyle: 'line',
                    pointBorderWidth: 5,
                    yValueFormatString: "###,###,###,###",
                    data: this.state.dataList.map((item, index) => (item.linearRegression > 0 ? item.linearRegression : null))
                },
                {
                    type: "line",
                    lineTension: 0,
                    label: 'Semi-Averages Forecast',
                    backgroundColor: 'transparent',
                    borderColor: '#BCDCB5',
                    ticks: {
                        fontSize: 2,
                        fontColor: 'transparent',
                    },
                    showInLegend: true,
                    pointStyle: 'line',
                    pointBorderWidth: 5,
                    yValueFormatString: "###,###,###,###",
                    data: this.state.dataList.map((item, index) => (item.semiAveragesForecast > 0 ? item.semiAveragesForecast : null))
                },
                {
                    type: "line",
                    lineTension: 0,
                    label: 'Moving Averages',
                    backgroundColor: 'transparent',
                    borderColor: '#9ACB8F',
                    ticks: {
                        fontSize: 2,
                        fontColor: 'transparent',
                    },
                    showInLegend: true,
                    pointStyle: 'line',
                    pointBorderWidth: 5,
                    yValueFormatString: "###,###,###,###",
                    data: this.state.dataList.map((item, index) => (item.movingAverages > 0 ? item.movingAverages : null))
                }
            ]
        }

        return (
            <div className="animated fadeIn">
                <Card>
                    <div className="Card-header-reporticon pb-2">
                        <div className="card-header-actions">
                            <img style={{ height: '25px', width: '25px', cursor: 'pointer' }} src={csvicon} title={i18n.t('static.report.exportCsv')} onClick={() => this.exportCSV()} />
                        </div>
                    </div>
                    <CardBody className="pb-lg-5 pt-lg-0">
                        <Form name='simpleForm'>
                            <div className=" pl-0">
                                <div className="row">
                                    <FormGroup className="col-md-3 ">
                                        <Label htmlFor="appendedInputButton">Forecast Program</Label>
                                        <div className="controls ">
                                            <Input
                                                type="select"
                                                name="forecastProgramId"
                                                id="forecastProgramId"
                                                bsSize="sm"
                                                value={this.state.forecastProgramId}
                                                onChange={(e) => { this.getPlanningUnitList(e) }}
                                            >
                                                <option value="">{i18n.t('static.common.all')}</option>
                                                {forecastPrograms}
                                            </Input>
                                        </div>
                                    </FormGroup>
                                    <FormGroup className="col-md-3 ">
                                        <Label htmlFor="appendedInputButton">Planning Unit</Label>
                                        <div className="controls ">
                                            <Input
                                                type="select"
                                                name="planningUnitId"
                                                id="planningUnitId"
                                                bsSize="sm"
                                                value={this.state.planningUnitId}
                                                onChange={(e) => { this.setPlanningUnitId(e); }}
                                            >
                                                <option value="">{i18n.t('static.common.all')}</option>
                                                {planningUnits}
                                            </Input>
                                        </div>
                                    </FormGroup>
                                    <FormGroup className="col-md-3 ">
                                        <Label htmlFor="appendedInputButton">Region</Label>
                                        <div className="controls ">
                                            <Input
                                                type="select"
                                                name="regionId"
                                                id="regionId"
                                                bsSize="sm"
                                                value={this.state.regionId}
                                                onChange={(e) => { this.setRegionId(e); }}
                                            >
                                                <option value="">{i18n.t('static.common.all')}</option>
                                                {regions}
                                            </Input>
                                        </div>
                                    </FormGroup>
                                    <FormGroup className="col-md-3">
                                        <Label htmlFor="appendedInputButton">Existing Forecast Period<span className="stock-box-icon  fa fa-sort-desc ml-1"></span></Label>
                                        <div className="controls edit">

                                            <Picker
                                                years={{ min: this.state.minDate, max: this.state.maxDate }}
                                                ref={this.pickRange}
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
                                        <Label htmlFor="appendedInputButton">Extrapolate Forecast Period<span className="stock-box-icon  fa fa-sort-desc ml-1"></span></Label>
                                        <div className="controls edit">

                                            <Picker
                                                years={{ min: this.state.minDate, max: this.state.maxDate }}
                                                ref={this.pickRange1}
                                                value={rangeValue1}
                                                lang={pickerLang}
                                                //theme="light"
                                                onChange={this.handleRangeChange1}
                                                onDismiss={this.handleRangeDissmis1}
                                            >
                                                <MonthBox value={makeText(rangeValue1.from) + ' ~ ' + makeText(rangeValue1.to)} onClick={this._handleClickRangeBox1} />
                                            </Picker>
                                        </div>
                                    </FormGroup>
                                </div>
                                <div className="row">
                                    <Label htmlFor="appendedInputButton">Select the Extrapolation methods to be used</Label>
                                </div>
                                <div className="row">
                                    <FormGroup className="col-md-12 ">
                                        <div className="check inline  pl-lg-3 pt-lg-3">
                                            <div>
                                                <Input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="movingAvgId"
                                                    name="movingAvgId"
                                                    checked={this.state.movingAvgId}
                                                    onClick={(e) => { this.setMovingAvgId(e); }}
                                                />
                                                <Label
                                                    className="form-check-label"
                                                    check htmlFor="inline-radio2" style={{ fontSize: '12px' }}>
                                                    <b>Moving Averages</b>
                                                </Label>
                                            </div>
                                            {this.state.movingAvgId &&
                                                <div className="col-md-3">
                                                    <Label htmlFor="appendedInputButton"># of Months</Label>
                                                    <Input
                                                        className="controls"
                                                        type="text"
                                                        id="noOfMonthsId"
                                                        name="noOfMonthsId"
                                                    />
                                                </div>
                                            }
                                            <div>
                                                <Input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="semiAvgId"
                                                    name="semiAvgId"
                                                // checked={this.state.semiAvgId}
                                                // onClick={(e) => { this.setSemiAvgId(e); }}
                                                />
                                                <Label
                                                    className="form-check-label"
                                                    check htmlFor="inline-radio2" style={{ fontSize: '12px' }}>
                                                    <b>Semi-Averages</b>
                                                </Label>
                                            </div>
                                            <div>
                                                <Input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="linearRegressionId"
                                                    name="linearRegressionId"
                                                // checked={this.state.linearRegressionId}
                                                // onClick={(e) => { this.setLinearRegressionId(e); }}
                                                />
                                                <Label
                                                    className="form-check-label"
                                                    check htmlFor="inline-radio2" style={{ fontSize: '12px' }}>
                                                    <b>Linear Regression</b>
                                                </Label>
                                            </div>
                                            <div>
                                                <Input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="smoothingId"
                                                    name="smoothingId"
                                                    checked={this.state.smoothingId}
                                                    onClick={(e) => { this.setSmoothingId(e); }}
                                                />
                                                <Label
                                                    className="form-check-label"
                                                    check htmlFor="inline-radio2" style={{ fontSize: '12px' }}>
                                                    <b>Triple-Exponential Smoothing (Holts-Winters)</b>
                                                </Label>
                                            </div>
                                            {this.state.smoothingId &&
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <Label htmlFor="appendedInputButton">Confidence level</Label>
                                                        <Input
                                                            className="controls"
                                                            type="text"
                                                            id="confidenceLevelId"
                                                            name="confidenceLevelId"
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Label htmlFor="appendedInputButton">Seasonality</Label>
                                                        <Input
                                                            className="controls"
                                                            type="text"
                                                            id="seasonalityId"
                                                            name="seasonalityId"
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="showAdvanceId"
                                                            name="showAdvanceId"
                                                            checked={this.state.showAdvanceId}
                                                            onClick={(e) => { this.setShowAdvanceId(e); }}
                                                        />
                                                        <Label
                                                            className="form-check-label"
                                                            check htmlFor="inline-radio2" style={{ fontSize: '12px' }}>
                                                            Show Advance
                                                        </Label>
                                                    </div>
                                                </div>
                                            }
                                            {this.state.showAdvanceId && this.state.smoothingId &&
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <Label htmlFor="appendedInputButton">Alpha</Label>
                                                        <Input
                                                            className="controls"
                                                            type="text"
                                                            id="alphaId"
                                                            name="alphaId"
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Label htmlFor="appendedInputButton">Beta</Label>
                                                        <Input
                                                            className="controls"
                                                            type="text"
                                                            id="betaId"
                                                            name="betaId"
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Label htmlFor="appendedInputButton">Gamma</Label>
                                                        <Input
                                                            className="controls"
                                                            type="text"
                                                            id="gammaId"
                                                            name="gammaId"
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Label htmlFor="appendedInputButton">Phi</Label>
                                                        <Input
                                                            className="controls"
                                                            type="text"
                                                            id="phiId"
                                                            name="phiId"
                                                        />
                                                    </div>
                                                </div>
                                            }
                                            <div>
                                                <Input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="arimaId"
                                                    name="arimaId"
                                                    checked={this.state.arimaId}
                                                    onClick={(e) => { this.setArimaId(e); }}
                                                />
                                                <Label
                                                    className="form-check-label"
                                                    check htmlFor="inline-radio2" style={{ fontSize: '12px' }}>
                                                    <b>ARIMA (Autoregressive Integrated Moving Average)</b>
                                                </Label>
                                            </div>
                                            {this.state.arimaId &&
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <Label htmlFor="appendedInputButton">p</Label>
                                                        <Input
                                                            className="controls"
                                                            type="text"
                                                            id="pId"
                                                            name="pId"
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Label htmlFor="appendedInputButton">d</Label>
                                                        <Input
                                                            className="controls"
                                                            type="text"
                                                            id="dId"
                                                            name="dId"
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Label htmlFor="appendedInputButton">q</Label>
                                                        <Input
                                                            className="controls"
                                                            type="text"
                                                            id="qId"
                                                            name="qId"
                                                        />
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </FormGroup>
                                </div>
                            </div>
                        </Form>
                        <div id="tableDiv"></div>
                        <div className="table-scroll">
                            <div className="table-wrap table-responsive">
                                <Table className="table-bordered text-center mt-2 overflowhide main-table " bordered size="sm" >
                                    <tbody>
                                        <tr>
                                            <td width="230px">RMSE</td>
                                            <td width="110px"></td>
                                            <td width="110px"></td>
                                            <td width="110px"></td>
                                            <td width="110px"></td>
                                            <td>176.258641</td>
                                            <td>180.873394</td>
                                            <td>199.896015</td>
                                        </tr>
                                        <tr>
                                            <td>MAPE</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>0.506034</td>
                                            <td>0.531222</td>
                                            <td>0.506926</td>
                                        </tr>
                                        <tr>
                                            <td>MSE</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>31067.108640</td>
                                            <td>32715.184570</td>
                                            <td>39958.416892</td>
                                        </tr>
                                        <tr>
                                            <td>wape?</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>R^2?</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>

                        {/* Graph */}
                        <div className="col-md-12">
                            <div className="chart-wrapper chart-graph-report pl-5 ml-3" style={{ marginLeft: '50px' }}>
                                <Bar id="cool-canvas" data={bar} options={options} />
                                <div>

                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        )
    }

    _handleClickRangeBox(e) {
        this.pickRange.current.show()
    }
    _handleClickRangeBox1(e) {
        this.pickRange1.current.show()
    }
}