
import React, { Component, lazy, Suspense, DatePicker } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  // CardFooter,
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
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui-pro/dist/js/coreui-utilities'
import i18n from '../../i18n'
import Pdf from "react-to-pdf"
import AuthenticationService from '../Common/AuthenticationService.js';
import AuthenticationServiceComponent from '../Common/AuthenticationServiceComponent';
import RealmService from '../../api/RealmService';
import getLabelText from '../../CommonComponent/getLabelText';
import PlanningUnitService from '../../api/PlanningUnitService';
import ProductService from '../../api/ProductService';
import Picker from 'react-month-picker'
import MonthBox from '../../CommonComponent/MonthBox.js'
import ProgramService from '../../api/ProgramService';
import CryptoJS from 'crypto-js'
import { SECRET_KEY, FIRST_DATA_ENTRY_DATE, INDEXED_DB_NAME, INDEXED_DB_VERSION } from '../../Constants.js'
import moment from "moment";
import { getDatabase } from "../../CommonComponent/IndexedDbFunctions";
import pdfIcon from '../../assets/img/pdf.png';
import actualIcon from '../../assets/img/actual.png';
import csvicon from '../../assets/img/csv.png'
import jsPDF from "jspdf";
import "jspdf-autotable";
import { LOGO } from '../../CommonComponent/Logo.js';
import ReportService from '../../api/ReportService'
import SupplyPlanFormulas from '../SupplyPlan/SupplyPlanFormulas';
import { isSiteOnline } from '../../CommonComponent/JavascriptCommonFunctions';
export const DEFAULT_MIN_MONTHS_OF_STOCK = 3
export const DEFAULT_MAX_MONTHS_OF_STOCK = 18

const entityname1 = i18n.t('static.dashboard.stockstatus')

const Widget04 = lazy(() => import('../../views/Widgets/Widget04'));
// const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));
const ref = React.createRef();

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')





//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}
const pickerLang = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  from: 'From', to: 'To',
}



class StockStatus extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    var dt = new Date();
    dt.setMonth(dt.getMonth() - 10);
    this.state = {
      loading: true,
      dropdownOpen: false,
      radioSelected: 2,
      realms: [],
      programs: [],
      planningUnits: [],
      stockStatusList: [],
      versions: [],
      show: false,
      rangeValue: { from: { year: dt.getFullYear(), month: dt.getMonth() }, to: { year: new Date().getFullYear(), month: new Date().getMonth() + 1 } },
      minDate: { year: new Date().getFullYear() - 10, month: new Date().getMonth() + 2 },
      maxDate: { year: new Date().getFullYear() + 10, month: new Date().getMonth() },
      programId: '',
      versionId: '',
      planningUnitLabel: ''
    };
    this.filterData = this.filterData.bind(this);
    this._handleClickRangeBox = this._handleClickRangeBox.bind(this)
    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.handleRangeDissmis = this.handleRangeDissmis.bind(this);
    this.programChange = this.programChange.bind(this);
    this.versionChange = this.versionChange.bind(this);

  }

  programChange(event) {
    this.setState({
      programId: event.target.value,
      versionId: ''
    }, () => {
      console.log("ProgramId-------->1", this.state.programId);
      localStorage.setItem("sesVersionIdReport", '');
      this.filterVersion();
    })
  }

  versionChange(event) {
    // this.setState({
    //   versionId: event.target.value
    // })
    if (this.state.versionId != '' || this.state.versionId != undefined) {
      this.setState({
        versionId: event.target.value
      }, () => {
        localStorage.setItem("sesVersionIdReport", this.state.versionId);
        this.filterData();
      })
    } else {
      this.setState({
        versionId: event.target.value
      }, () => {
        this.getPlanningUnit();
      })
    }
  }

  toggledata = () => this.setState((currentState) => ({ show: !currentState.show }));

  roundN = num => {
    if (num !== '') {
      return Number(Math.round(num * Math.pow(10, 1)) / Math.pow(10, 1)).toFixed(1);
    } else {
      return ''
    }
  }
  formatAmc = value => {
    return Number(Math.round(value * Math.pow(10, 0)) / Math.pow(10, 0));
  }

  formatter = value => {
    if (value != null) {
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
    else {
      return ''
    }
  }
  makeText = m => {
    if (m && m.year && m.month) return (pickerLang.months[m.month - 1] + '. ' + m.year)
    return '?'
  }
  dateFormatter = value => {
    return moment(value).format('MMM YY')
  }

  addDoubleQuoteToRowContent = (arr) => {
    return arr.map(ele => '"' + ele + '"')
  }

  rowtextFormatClassName = (row) => {
    return 'textcolor-purple';
  }

  exportCSV() {

    var csvRow = [];
    csvRow.push('"' + (i18n.t('static.report.dateRange') + ' : ' + this.makeText(this.state.rangeValue.from) + ' ~ ' + this.makeText(this.state.rangeValue.to)).replaceAll(' ', '%20') + '"')
    csvRow.push('')
    csvRow.push('"' + (i18n.t('static.program.program') + ' : ' + document.getElementById("programId").selectedOptions[0].text).replaceAll(' ', '%20') + '"')
    csvRow.push('')
    csvRow.push('"' + (i18n.t('static.report.version') + ' : ' + document.getElementById("versionId").selectedOptions[0].text).replaceAll(' ', '%20') + '"')
    csvRow.push('')
    csvRow.push('"' + (i18n.t('static.planningunit.planningunit') + ' : ' + document.getElementById("planningUnitId").selectedOptions[0].text).replaceAll(' ', '%20') + '"')
    csvRow.push('')
    csvRow.push('')
    csvRow.push('')
    csvRow.push('"' + (i18n.t('static.common.youdatastart')).replaceAll(' ', '%20') + '"')
    csvRow.push('')


    const headers = [this.addDoubleQuoteToRowContent([i18n.t('static.common.month').replaceAll(' ', '%20'),
    i18n.t('static.supplyPlan.openingBalance').replaceAll(' ', '%20'),
    i18n.t('static.report.forecasted').replaceAll(' ', '%20'),
    i18n.t('static.report.actual').replaceAll(' ', '%20'),
    i18n.t('static.shipment.qty').replaceAll(' ', '%20'),
    (i18n.t('static.shipment.qty') + " | " + i18n.t('static.budget.fundingsource') + " | " + i18n.t('static.supplyPlan.shipmentStatus')).replaceAll(' ', '%20') + " | " + (i18n.t('static.report.procurementAgentName')),
    i18n.t('static.report.adjustmentQty').replaceAll(' ', '%20'),
    i18n.t('static.supplyPlan.endingBalance').replaceAll(' ', '%20'),
    i18n.t('static.report.amc').replaceAll(' ', '%20'),
    i18n.t('static.report.mos').replaceAll(' ', '%20'),
    i18n.t('static.report.minmonth').replaceAll(' ', '%20'),
    i18n.t('static.report.maxmonth').replaceAll(' ', '%20')])];

    var A = headers
    var re;
    this.state.stockStatusList.map(ele => A.push(this.addDoubleQuoteToRowContent([this.dateFormatter(ele.dt).replaceAll(' ', '%20'), ele.openingBalance, ele.forecastedConsumptionQty, ele.actualConsumptionQty, ele.shipmentQty,
    (ele.shipmentInfo.map(item => {
      return (
        item.shipmentQty + " | " + item.fundingSource.code + " | " + getLabelText(item.shipmentStatus.label, this.state.lang) + " | " + item.procurementAgent.code
      )
    }).join(' \n')).replaceAll(' ', '%20')
      , ele.adjustment == null ? '' : ele.adjustment, ele.closingBalance, this.formatAmc(ele.amc), ele.mos != null ? this.roundN(ele.mos) : i18n.t("static.supplyPlanFormula.na"), this.roundN(ele.minMos), this.roundN(ele.maxMos)])));

    /*for(var item=0;item<re.length;item++){
      A.push([re[item].consumption_date,re[item].forcast,re[item].Actual])
    } */
    for (var i = 0; i < A.length; i++) {
      console.log(A[i])
      csvRow.push(A[i].join(","))

    }

    var csvString = csvRow.join("%0A")
    console.log('csvString' + csvString)
    var a = document.createElement("a")
    a.href = 'data:attachment/csv,' + csvString
    a.target = "_Blank"
    a.download = i18n.t('static.dashboard.stockstatus') + "-" + this.state.rangeValue.from.year + this.state.rangeValue.from.month + i18n.t('static.report.consumptionTo') + this.state.rangeValue.to.year + this.state.rangeValue.to.month + ".csv"
    document.body.appendChild(a)
    a.click()
  }

  exportPDF = (columns) => {
    const addFooters = doc => {
      const pageCount = doc.internal.getNumberOfPages()
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(6)
      for (var i = 1; i <= pageCount; i++) {
        doc.setPage(i)

        doc.setPage(i)
        doc.text('Page ' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width / 9, doc.internal.pageSize.height - 30, {
          align: 'center'
        })
        doc.text('Copyright © 2020 ' + i18n.t('static.footer'), doc.internal.pageSize.width * 6 / 7, doc.internal.pageSize.height - 30, {
          align: 'center'
        })
      }
    }
    const addHeaders = doc => {
      const pageCount = doc.internal.getNumberOfPages()
      for (var i = 1; i <= pageCount; i++) {
        doc.setFontSize(12)
        doc.setFont('helvetica', 'bold')
        doc.setPage(i)
        doc.addImage(LOGO, 'png', 0, 10, 180, 50, 'FAST');
        /*doc.addImage(data, 10, 30, {
          align: 'justify'
        });*/
        doc.setTextColor("#002f6c");
        doc.text(i18n.t('static.dashboard.stockstatus'), doc.internal.pageSize.width / 2, 60, {
          align: 'center'
        })
        if (i == 1) {
          doc.setFontSize(8)
          doc.setFont('helvetica', 'normal')
          doc.text(i18n.t('static.report.dateRange') + ' : ' + this.makeText(this.state.rangeValue.from) + ' ~ ' + this.makeText(this.state.rangeValue.to), doc.internal.pageSize.width / 8, 90, {
            align: 'left'
          })
          doc.text(i18n.t('static.program.program') + ' : ' + document.getElementById("programId").selectedOptions[0].text, doc.internal.pageSize.width / 8, 110, {
            align: 'left'
          })
          doc.text(i18n.t('static.report.version') + ' : ' + document.getElementById("versionId").selectedOptions[0].text, doc.internal.pageSize.width / 8, 130, {
            align: 'left'
          })
          doc.text(i18n.t('static.planningunit.planningunit') + ' : ' + document.getElementById("planningUnitId").selectedOptions[0].text, doc.internal.pageSize.width / 8, 150, {
            align: 'left'
          })

        }

      }
    }

    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape
    const marginLeft = 10;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(8);
    var canvas = document.getElementById("cool-canvas");
    //creates image

    var canvasImg = canvas.toDataURL("image/png", 1.0);
    var width = doc.internal.pageSize.width;
    var height = doc.internal.pageSize.height;
    var h1 = 50;
    var aspectwidth1 = (width - h1);

    doc.addImage(canvasImg, 'png', 50, 220, 750, 260, 'CANVAS');

    const header = [[i18n.t('static.common.month'),
    i18n.t('static.supplyPlan.openingBalance'),
    i18n.t('static.report.forecasted'),
    i18n.t('static.report.actual'),
    i18n.t('static.shipment.qty'),
    (i18n.t('static.shipment.qty') + " | " + i18n.t('static.budget.fundingsource') + " | " + i18n.t('static.supplyPlan.shipmentStatus') + " | " + (i18n.t('static.report.procurementAgentName'))),
    i18n.t('static.report.adjustmentQty'),
    i18n.t('static.supplyPlan.endingBalance'),
    i18n.t('static.report.amc'),
    i18n.t('static.report.mos'),
    i18n.t('static.report.minmonth'),
    i18n.t('static.report.maxmonth')]];

    let data =
      this.state.stockStatusList.map(ele => [this.dateFormatter(ele.dt), this.formatter(ele.openingBalance), this.formatter(ele.forecastedConsumptionQty), this.formatter(ele.actualConsumptionQty), this.formatter(ele.shipmentQty),
      ele.shipmentInfo.map(item => {
        return (
          item.shipmentQty + " | " + item.fundingSource.code + " | " + getLabelText(item.shipmentStatus.label, this.state.lang) + " | " + item.procurementAgent.code)
      }).join(' \n')
        , this.formatter(ele.adjustment), this.formatter(ele.closingBalance), this.formatter(this.formatAmc(ele.amc)), ele.mos != null ? this.formatter(this.roundN(ele.mos)) : i18n.t("static.supplyPlanFormula.na"), this.formatter(this.roundN(ele.minMos)), this.formatter(this.roundN(ele.maxMos))]);

    let content = {
      margin: { top: 80, bottom: 50 },
      startY: height,
      head: header,
      body: data,
      styles: { lineWidth: 1, fontSize: 8, cellWidth: 55, halign: 'center' },
      columnStyles: {
        5: { cellWidth: 156.89 },
      }
    };
    doc.autoTable(content);
    addHeaders(doc)
    addFooters(doc)
    doc.save(i18n.t('static.dashboard.stockstatus') + ".pdf")
  }


  filterData() {
    let programId = document.getElementById("programId").value;
    let planningUnitId = document.getElementById("planningUnitId").value;
    let versionId = document.getElementById("versionId").value;
    let startDate = moment(new Date(this.state.rangeValue.from.year + '-' + this.state.rangeValue.from.month + '-01'));
    let endDate = moment(new Date(this.state.rangeValue.to.year + '-' + this.state.rangeValue.to.month + '-' + new Date(this.state.rangeValue.to.year, this.state.rangeValue.to.month + 1, 0).getDate()));

    if (programId != 0 && versionId != 0 && planningUnitId != 0) {
      if (versionId.includes('Local')) {

        // let startDate = moment(new Date(this.state.rangeValue.from.year + '-' + this.state.rangeValue.from.month + '-01'));
        //let endDate =moment(new Date( this.state.rangeValue.to.year + '-' + this.state.rangeValue.to.month + '-' + new Date(this.state.rangeValue.to.year, this.state.rangeValue.to.month + 1, 0).getDate()));

        this.setState({ loading: true })
        var db1;
        getDatabase();
        var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
        openRequest.onerror = function (event) {
          this.setState({
            message: i18n.t('static.program.errortext'),
            loading: false
          })
        }.bind(this);
        openRequest.onsuccess = function (e) {
          db1 = e.target.result;

          var transaction = db1.transaction(['programData'], 'readwrite');
          var programTransaction = transaction.objectStore('programData');
          var version = (versionId.split('(')[0]).trim()
          var userBytes = CryptoJS.AES.decrypt(localStorage.getItem('curUser'), SECRET_KEY);
          var userId = userBytes.toString(CryptoJS.enc.Utf8);
          var program = `${programId}_v${version}_uId_${userId}`
          var data = [];
          var programRequest = programTransaction.get(program);

          programRequest.onerror = function (event) {
            this.setState({
              loading: false
            })
          }.bind(this);
          programRequest.onsuccess = function (event) {

            var programDataBytes = CryptoJS.AES.decrypt(programRequest.result.programData, SECRET_KEY);
            var programData = programDataBytes.toString(CryptoJS.enc.Utf8);
            var programJson = JSON.parse(programData);
            var pu = (this.state.planningUnits.filter(c => c.planningUnit.id == planningUnitId))[0]



            var realmTransaction = db1.transaction(['realm'], 'readwrite');
            var realmOs = realmTransaction.objectStore('realm');
            var realmRequest = realmOs.get(programJson.realmCountry.realm.realmId);
            realmRequest.onerror = function (event) {
              this.setState({
                loading: false,
              })
              this.hideFirstComponent()
            }.bind(this);
            realmRequest.onsuccess = function (event) {
              var maxForMonths = 0;
              var realm = realmRequest.result;
              var DEFAULT_MIN_MONTHS_OF_STOCK = realm.minMosMinGaurdrail;
              var DEFAULT_MIN_MAX_MONTHS_OF_STOCK = realm.minMosMaxGaurdrail;
              if (DEFAULT_MIN_MONTHS_OF_STOCK > pu.minMonthsOfStock) {
                maxForMonths = DEFAULT_MIN_MONTHS_OF_STOCK
              } else {
                maxForMonths = pu.minMonthsOfStock
              }
              var minStockMoS = parseInt(maxForMonths);

              // Calculations for Max Stock
              var minForMonths = 0;
              var DEFAULT_MAX_MONTHS_OF_STOCK = realm.maxMosMaxGaurdrail;
              if (DEFAULT_MAX_MONTHS_OF_STOCK < (maxForMonths + pu.reorderFrequencyInMonths)) {
                minForMonths = DEFAULT_MAX_MONTHS_OF_STOCK
              } else {
                minForMonths = (maxForMonths + pu.reorderFrequencyInMonths);
              }
              var maxStockMoS = parseInt(minForMonths);
              if (maxStockMoS < DEFAULT_MIN_MAX_MONTHS_OF_STOCK) {
                maxStockMoS = DEFAULT_MIN_MAX_MONTHS_OF_STOCK;
              }




              var shipmentList = (programJson.shipmentList).filter(c => (c.active == true || c.active == "true") && c.planningUnit.id == planningUnitId && c.shipmentStatus.id != 8 && c.accountFlag == true);
              var consumptionList = (programJson.consumptionList).filter(c => (c.active == true || c.active == "true") && c.planningUnit.id == planningUnitId);
              var monthstartfrom = this.state.rangeValue.from.month
              for (var from = this.state.rangeValue.from.year, to = this.state.rangeValue.to.year; from <= to; from++) {
                var monthlydata = [];
                console.log(programJson)
                for (var month = monthstartfrom; month <= 12; month++) {
                  var dtstr = from + "-" + String(month).padStart(2, '0') + "-01"
                  var enddtStr = from + "-" + String(month).padStart(2, '0') + '-' + new Date(from, month, 0).getDate()
                  console.log(dtstr, ' ', enddtStr)
                  var dt = dtstr
                  var list = programJson.supplyPlan.filter(c => c.planningUnitId == planningUnitId && c.transDate == dt)
                  console.log(list)
                  if (list.length > 0) {
                    var shiplist = shipmentList.filter(c => c.receivedDate == null || c.receivedDate == "" ? (c.expectedDeliveryDate >= dt && c.expectedDeliveryDate <= enddtStr) : (c.receivedDate >= dt && c.receivedDate <= enddtStr))
                    var totalShipmentQty = 0;
                    shiplist.map(elt => {
                      totalShipmentQty = totalShipmentQty + Number(elt.shipmentQty)
                    })
                    var conList = consumptionList.filter(c => c.actualFlag == false && (c.consumptionDate >= dt && c.consumptionDate <= enddtStr))
                    var totalforecastConsumption = null;
                    conList.map(elt => {
                      totalforecastConsumption = (totalforecastConsumption == null) ? elt.consumptionQty : totalforecastConsumption + elt.consumptionQty
                    })

                    var conListAct = consumptionList.filter(c => c.actualFlag == true && (c.consumptionDate >= dt && c.consumptionDate <= enddtStr))
                    var totalActualConsumption = null;
                    conListAct.map(elt => {
                      totalActualConsumption = (totalActualConsumption == null) ? elt.consumptionQty : totalActualConsumption + elt.consumptionQty
                    })
                    console.log(conList)
                    console.log(totalforecastConsumption)
                    var json = {
                      dt: new Date(from, month - 1),
                      forecastedConsumptionQty: totalforecastConsumption,
                      actualConsumptionQty: totalActualConsumption,
                      actualConsumption: list[0].actualFlag,
                      finalConsumptionQty: list[0].consumptionQty,
                      shipmentQty: totalShipmentQty,
                      shipmentInfo: shiplist,
                      adjustment: list[0].adjustmentQty,
                      closingBalance: list[0].closingBalance,
                      openingBalance: list[0].openingBalance,
                      mos: list[0].mos,
                      amc: list[0].amc,
                      minMos: minStockMoS,
                      maxMos: maxStockMoS
                    }
                  } else {
                    var json = {
                      dt: new Date(from, month - 1),
                      consumptionQty: 0,
                      actualConsumption: false,
                      shipmentQty: 0,
                      shipmentInfo: [],
                      adjustment: 0,
                      closingBalance: 0,
                      openingBalance: '',
                      mos: '',
                      amc: '',
                      minMos: minStockMoS,
                      maxMos: maxStockMoS
                    }
                  }
                  data.push(json)
                  console.log(json)
                  if (month == this.state.rangeValue.to.month && from == to) {
                    this.setState({
                      stockStatusList: data,
                      message: '', loading: false
                    })

                    return;
                  }
                  this.setState({
                    loading: false,
                    planningUnitLabel: document.getElementById("planningUnitId").selectedOptions[0].text
                  })

                }
                monthstartfrom = 1

              }

            }.bind(this)

          }.bind(this)
        }.bind(this)















      } else {
        this.setState({ loading: true })
        var inputjson = {
          "programId": programId,
          "versionId": versionId,
          "startDate": startDate.startOf('month').format('YYYY-MM-DD'),
          "stopDate": this.state.rangeValue.to.year + '-' + this.state.rangeValue.to.month + '-' + new Date(this.state.rangeValue.to.year, this.state.rangeValue.to.month, 0).getDate(),
          "planningUnitId": planningUnitId,

        }
        /*        this.setState({
                  stockStatusList: [{
                    dt: 'Jan 20', consumptionQty: 17475, actual: true, shipmentQty: 0, shipmentInfo: [
                    ], adjustmentQty: -10122, closingBalance: 27203, mos: 1.28, minMos: 1.2, maxMos: 2.5
                  },
                  {
                    dt: 'Feb 20', consumptionQty: 25135, actual: false, shipmentQty: 0, shipmentInfo: [], adjustmentQty: 3999
                    , closingBalance: 6067, mos: 1.21, minMos: 1.0, maxMos: 1.5
                  },
                  {
                    dt: 'Mar 20', consumptionQty: 49880, actual: true, shipmentQty: 78900, shipmentInfo: [
                      { shipmentQty: 78900, fundingSource: { id: 1, label: { label_en: 'PEPFAR' } }, shipmentStatus: { id: 1, label: { label_en: 'Delivered' } } }
                    ], adjustmentQty: 105, closingBalance: 36137, mos: 1.34, minMos: 1.0, maxMos: 2.0
                  }
                    , { dt: 'Apr 20', consumptionQty: 25177, actual: false, shipmentQty: 0, shipmentInfo: [], adjustmentQty: -135, closingBalance: 10960, mos: 0.54, minMos: 0.5, maxMos: 2.5 },
                  { dt: 'May 20', consumptionQty: 16750, actual: false, shipmentQty: 0, shipmentInfo: [], adjustmentQty: -579, closingBalance: 0, mos: 1.2, minMos: 1.0, maxMos: 1.5 },
                  {
                    dt: 'Jun 20', consumptionQty: 14000, actual: false, shipmentQty: 40000, shipmentInfo: [
                      { shipmentQty: 40000, fundingSource: { id: 1, label: { label_en: 'PEPFAR' } }, shipmentStatus: { id: 1, label: { label_en: 'Planned' } } }
        
                    ], adjustmentQty: 0, closingBalance: 26000, mos: 2.1, minMos: 2.0, maxMos: 3.5
                  }
                  ]
                })*/
        // AuthenticationService.setupAxiosInterceptors();
        ReportService.getStockStatusData(inputjson)
          .then(response => {
            console.log(JSON.stringify(response.data));
            this.setState({
              stockStatusList: response.data,
              message: '', loading: false,
              planningUnitLabel: document.getElementById("planningUnitId").selectedOptions[0].text
            })
          }).catch(
            error => {
              this.setState({
                stockStatusList: [], loading: false
              })
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
        // .catch(
        //   error => {
        //     this.setState({
        //       stockStatusList: [], loading: false
        //     })

        //     if (error.message === "Network Error") {
        //       this.setState({ message: error.message, loading: false });
        //     } else {
        //       switch (error.response ? error.response.status : "") {
        //         case 500:
        //         case 401:
        //         case 404:
        //         case 406:
        //         case 412:
        //           this.setState({ loading: false, message: i18n.t(error.response.data.messageCode, { entityname: i18n.t('static.dashboard.program') }) });
        //           break;
        //         default:
        //           this.setState({ loading: false, message: 'static.unkownError' });
        //           break;
        //       }
        //     }
        //   }
        // );
      }
    } else if (programId == 0) {
      this.setState({ message: i18n.t('static.common.selectProgram'), stockStatusList: [] });

    } else if (versionId == 0) {
      this.setState({ message: i18n.t('static.program.validversion'), stockStatusList: [] });

    } else {
      this.setState({ message: i18n.t('static.procurementUnit.validPlanningUnitText'), stockStatusList: [], planningUnitLabel: '' });

    }
  }

  getPrograms = () => {
    if (isSiteOnline()) {
      // AuthenticationService.setupAxiosInterceptors();
      ProgramService.getProgramList()
        .then(response => {
          console.log(JSON.stringify(response.data))
          this.setState({
            programs: response.data, message: '',
            loading: false
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
      // .catch(
      //   error => {
      //     this.setState({
      //       programs: [], loading: false
      //     }, () => { this.consolidatedProgramList() })
      //     if (error.message === "Network Error") {
      //       this.setState({ message: error.message, loading: false });
      //     } else {
      //       switch (error.response ? error.response.status : "") {
      //         case 500:
      //         case 401:
      //         case 404:
      //         case 406:
      //         case 412:
      //           this.setState({ loading: false, message: i18n.t(error.response.data.messageCode, { entityname: i18n.t('static.dashboard.program') }) });
      //           break;
      //         default:
      //           this.setState({ loading: false, message: 'static.unkownError' });
      //           break;
      //       }
      //     }
      //   }
      // );

    } else {
      console.log('offline')
      this.setState({ loading: false })
      this.consolidatedProgramList()
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
      var transaction = db1.transaction(['programData'], 'readwrite');
      var program = transaction.objectStore('programData');
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
              }
            }
            if (f == 0) {
              proList.push(programData)
            }
          }


        }
        var lang = this.state.lang;
        if (proList.length == 1) {
          console.log("*****1");
          this.setState({
            programs: proList.sort(function (a, b) {
              a = getLabelText(a.label, lang).toLowerCase();
              b = getLabelText(b.label, lang).toLowerCase();
              return a < b ? -1 : a > b ? 1 : 0;
            }),
            programId: proList[0].programId
          }, () => {
            this.filterVersion();
          })
        } else if (localStorage.getItem("sesProgramIdReport") != '' && localStorage.getItem("sesProgramIdReport") != undefined) {
          //from session
          console.log("*****2");
          this.setState({
            programs: proList.sort(function (a, b) {
              a = getLabelText(a.label, lang).toLowerCase();
              b = getLabelText(b.label, lang).toLowerCase();
              return a < b ? -1 : a > b ? 1 : 0;
            }),
            programId: localStorage.getItem("sesProgramIdReport")
          }, () => {
            this.filterVersion();
          })
        } else {
          console.log("*****3");
          this.setState({
            programs: proList.sort(function (a, b) {
              a = getLabelText(a.label, lang).toLowerCase();
              b = getLabelText(b.label, lang).toLowerCase();
              return a < b ? -1 : a > b ? 1 : 0;
            })
          })
        }


      }.bind(this);

    }.bind(this);


  }


  filterVersion = () => {
    console.log("ProgramId-------->2", this.state.programId);
    // let programId = document.getElementById("programId").value;
    let programId = this.state.programId;
    if (programId != 0) {

      localStorage.setItem("sesProgramIdReport", programId);
      const program = this.state.programs.filter(c => c.programId == programId)
      console.log(program)
      if (program.length == 1) {
        if (isSiteOnline()) {
          this.setState({
            versions: []
          }, () => {
            this.setState({
              versions: program[0].versionList.filter(function (x, i, a) {
                return a.indexOf(x) === i;
              })
            }, () => { this.consolidatedVersionList(programId) });
          });


        } else {
          this.setState({
            versions: []
          }, () => { this.consolidatedVersionList(programId) })
        }
      } else {

        this.setState({
          versions: []
        })

      }
    } else {
      this.setState({
        versions: []
      })
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
      var transaction = db1.transaction(['programData'], 'readwrite');
      var program = transaction.objectStore('programData');
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

        console.log(verList);
        let versionList = verList.filter(function (x, i, a) {
          return a.indexOf(x) === i;
        });
        versionList.reverse();

        if (verList.length == 1) {
          this.setState({
            versions: versionList,
            versionId: verList[0].versionId
          }, () => {
            this.getPlanningUnit();
          })
        } else if (localStorage.getItem("sesVersionIdReport") != '' && localStorage.getItem("sesVersionIdReport") != undefined) {
          // this.setState({
          //   versions: versionList,
          //   versionId: localStorage.getItem("sesVersionIdReport")
          // }, () => {
          //   this.getPlanningUnit();
          // })

          let versionVar = versionList.filter(c => c.versionId == localStorage.getItem("sesVersionIdReport"));
          if (versionVar.length != 0) {
            this.setState({
              versions: versionList,
              versionId: localStorage.getItem("sesVersionIdReport")
            }, () => {
              this.getPlanningUnit();
            })
          } else {
            this.setState({
              versions: versionList,
              versionId: versionList[0].versionId
            }, () => {
              this.getPlanningUnit();
            })
          }

        } else {
          this.setState({
            versions: versionList,
            versionId: versionList[0].versionId
          }, () => {
            this.getPlanningUnit();
          })
        }


      }.bind(this);



    }.bind(this)


  }

  getPlanningUnit = () => {
    let programId = document.getElementById("programId").value;
    let versionId = document.getElementById("versionId").value;
    console.log("VERSION-------->", versionId);
    this.setState({
      planningUnits: []
    }, () => {

      if (versionId == 0) {
        this.setState({ message: i18n.t('static.program.validversion'), stockStatusList: [] });
      } else {
        localStorage.setItem("sesVersionIdReport", versionId);
        if (versionId.includes('Local')) {
          const lan = 'en';
          var db1;
          var storeOS;
          getDatabase();
          var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
          openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var planningunitTransaction = db1.transaction(['programPlanningUnit'], 'readwrite');
            var planningunitOs = planningunitTransaction.objectStore('programPlanningUnit');
            var planningunitRequest = planningunitOs.getAll();
            var planningList = []
            planningunitRequest.onerror = function (event) {
              // Handle errors!
            };
            planningunitRequest.onsuccess = function (e) {
              var myResult = [];
              myResult = planningunitRequest.result;
              var programId = (document.getElementById("programId").value).split("_")[0];
              var proList = []
              console.log(myResult)
              for (var i = 0; i < myResult.length; i++) {
                if (myResult[i].program.id == programId && myResult[i].active == true) {

                  proList[i] = myResult[i]
                }
              }
              var lang = this.state.lang;
              this.setState({
                planningUnits: proList.sort(function (a, b) {
                  a = getLabelText(a.planningUnit.label, lang).toLowerCase();
                  b = getLabelText(b.planningUnit.label, lang).toLowerCase();
                  return a < b ? -1 : a > b ? 1 : 0;
                }), message: ''
              }, () => {
                this.filterData();
              })
            }.bind(this);
          }.bind(this)


        }
        else {
          // AuthenticationService.setupAxiosInterceptors();

          ProgramService.getActiveProgramPlaningUnitListByProgramId(programId).then(response => {
            console.log('**' + JSON.stringify(response.data))
            this.setState({
              planningUnits: response.data, message: ''
            }, () => {
              this.filterData();
            })
          }).catch(
            error => {
              this.setState({
                planningUnits: [],
              })
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
                      message: i18n.t(error.response.data.messageCode, { entityname: i18n.t('static.planningunit.planningunit') }),
                      loading: false
                    });
                    break;
                  case 412:
                    this.setState({
                      message: i18n.t(error.response.data.messageCode, { entityname: i18n.t('static.planningunit.planningunit') }),
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
          // .catch(
          //   error => {
          //     this.setState({
          //       planningUnits: [],
          //     })
          //     if (error.message === "Network Error") {
          //       this.setState({ message: error.message });
          //     } else {
          //       switch (error.response ? error.response.status : "") {
          //         case 500:
          //         case 401:
          //         case 404:
          //         case 406:
          //         case 412:
          //           this.setState({ message: i18n.t(error.response.data.messageCode, { entityname: i18n.t('static.planningunit.planningunit') }) });
          //           break;
          //         default:
          //           this.setState({ message: 'static.unkownError' });
          //           break;
          //       }
          //     }
          //   }
          // );
        }
      }
    });

  }

  componentDidMount() {

    this.getPrograms();
    // setTimeout(function () { //Start the timer
    //   // this.setState({render: true}) //After 1 second, set render to true
    //   this.setState({ loading: false })
    // }.bind(this), 500)

  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  show() {
    /* if (!this.state.showed) {
         setTimeout(() => {this.state.closeable = true}, 250)
         this.setState({ showed: true })
     }*/
  }
  handleRangeChange(value, text, listIndex) {
    //
  }
  handleRangeDissmis(value) {
    this.setState({ rangeValue: value }, () => { this.filterData() })

  }

  _handleClickRangeBox(e) {
    this.refs.pickRange.show()
  }
  loading = () => <div className="animated fadeIn pt-1 text-center">{i18n.t('static.common.loading')}</div>

  render() {

    const { planningUnits } = this.state;
    let planningUnitList = planningUnits.length > 0
      && planningUnits.map((item, i) => {
        return (
          <option key={i} value={item.planningUnit.id}>
            {getLabelText(item.planningUnit.label, this.state.lang)}
          </option>
        )
      }, this);
    const { programs } = this.state;
    let programList = programs.length > 0
      && programs.map((item, i) => {
        return (
          <option key={i} value={item.programId}>
            {getLabelText(item.label, this.state.lang)}
          </option>
        )
      }, this);
    const { versions } = this.state;
    let versionList = versions.length > 0
      && versions.map((item, i) => {
        return (
          <option key={i} value={item.versionId}>
            {item.versionId}
          </option>
        )
      }, this);


    const options = {
      title: {
        display: true,
        text: this.state.planningUnitLabel != "" && this.state.planningUnitLabel != undefined && this.state.planningUnitLabel != null ? entityname1 + " - " + this.state.planningUnitLabel : entityname1
      },
      scales: {
        yAxes: [{
          id: 'A',
          position: 'left',
          scaleLabel: {
            labelString: i18n.t('static.shipment.qty'),
            display: true,
            fontSize: "12",
            fontColor: 'black'
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

          }, gridLines: {
            color: 'rgba(171,171,171,1)',
            lineWidth: 0
          }

        }, {
          id: 'B',
          position: 'right',
          scaleLabel: {
            labelString: i18n.t('static.supplyPlan.monthsOfStock'),
            fontColor: 'black',
            display: true,

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

          },
          gridLines: {
            color: 'rgba(171,171,171,1)',
            lineWidth: 0
          }
        }],
        xAxes: [{

          scaleLabel: {
            display: true,
            labelString: i18n.t('static.common.month'),
            fontColor: 'black',
            fontStyle: "normal",
            fontSize: "12"
          },
          ticks: {
            fontColor: 'black',
            fontStyle: "normal",
            fontSize: "12"
          },
          gridLines: {
            color: 'rgba(171,171,171,1)',
            lineWidth: 0
          }
        }]
      },

      tooltips: {
        enabled: false,
        custom: CustomTooltips,
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
        }
      },
      maintainAspectRatio: false,
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          fontColor: 'black'
        }
      }
    }


    const bar = {

      labels: this.state.stockStatusList.map((item, index) => (this.dateFormatter(item.dt))),
      datasets: [
        {
          label: i18n.t('static.supplyPlan.delivered'),
          yAxisID: 'A',
          stack: 1,
          backgroundColor: '#002f6c',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: this.state.stockStatusList.map((item, index) => {
            let count = 0;
            (item.shipmentInfo.map((ele, index) => {

              ele.shipmentStatus.id == 7 ? count = count + Number(ele.shipmentQty) : count = count
            }))
            return count
          })
        },
        {
          label: i18n.t('static.supplyPlan.shipped'),
          yAxisID: 'A',
          stack: 1,
          backgroundColor: '#006789',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: this.state.stockStatusList.map((item, index) => {
            let count = 0;
            (item.shipmentInfo.map((ele, index) => {
              (ele.shipmentStatus.id == 5 || ele.shipmentStatus.id == 6) ? count = count + Number(ele.shipmentQty) : count = count
            }))
            return count
          })
        },

        {
          label: i18n.t('static.supplyPlan.ordered'),
          yAxisID: 'A',
          stack: 1,
          backgroundColor: '#205493',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: this.state.stockStatusList.map((item, index) => {
            let count = 0;
            (item.shipmentInfo.map((ele, index) => {
              (ele.shipmentStatus.id == 3 || ele.shipmentStatus.id == 4) ? count = count + Number(ele.shipmentQty) : count = count
            }))
            return count
          })
        },
        {
          label: i18n.t('static.supplyPlan.planned'),
          backgroundColor: '#a7c6ed',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          yAxisID: 'A',
          stack: 1,
          data: this.state.stockStatusList.map((item, index) => {
            let count = 0;
            (item.shipmentInfo.map((ele, index) => {
              (ele.shipmentStatus.id == 1 || ele.shipmentStatus.id == 2 || ele.shipmentStatus.id == 9) ? count = count + Number(ele.shipmentQty) : count = count
            }))
            return count
          })
        },
        {
          type: "line",
          yAxisID: 'B',
          label: i18n.t('static.report.minmonth'),
          backgroundColor: 'rgba(255,193,8,0.2)',
          borderColor: '#59cacc',
          borderStyle: 'dotted',
          borderDash: [10, 10],
          fill: '+1',
          backgroundColor: 'transparent',
          ticks: {
            fontSize: 2,
            fontColor: 'transparent',
          },
          showInLegend: true,
          pointStyle: 'line',
          yValueFormatString: "$#,##0",
          lineTension: 0,
          data: this.state.stockStatusList.map((item, index) => (item.minMos))
        }
        , {
          type: "line",
          yAxisID: 'B',
          label: i18n.t('static.report.maxmonth'),
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: '#59cacc',
          borderStyle: 'dotted',
          backgroundColor: 'transparent',
          borderDash: [10, 10],
          fill: true,
          ticks: {
            fontSize: 2,
            fontColor: 'transparent',
          },
          lineTension: 0,
          pointStyle: 'line',
          showInLegend: true,
          yValueFormatString: "$#,##0",
          data: this.state.stockStatusList.map((item, index) => (item.maxMos))
        }
        , {
          type: "line",
          yAxisID: 'B',
          label: i18n.t('static.report.mos'),
          borderColor: '#118b70',
          backgroundColor: 'transparent',
          ticks: {
            fontSize: 2,
            fontColor: 'transparent',
          },
          lineTension: 0,
          showInLegend: true,
          pointStyle: 'line',
          yValueFormatString: "$#,##0",
          data: this.state.stockStatusList.map((item, index) => (item.mos != null ? this.roundN(item.mos) : item.mos))
        }
        , {
          type: "line",
          yAxisID: 'A',
          label: i18n.t('static.supplyPlan.consumption'),
          backgroundColor: 'transparent',
          borderColor: '#ba0c2f',
          ticks: {
            fontSize: 2,
            fontColor: 'transparent',
          },
          lineTension: 0,
          showInLegend: true,
          pointStyle: 'line',
          yValueFormatString: "$#,##0",
          data: this.state.stockStatusList.map((item, index) => (item.finalConsumptionQty))
        },
        {
          label: i18n.t('static.report.stock'),
          yAxisID: 'A',
          type: 'line',
          borderColor: '#cfcdc9',
          ticks: {
            fontSize: 2,
            fontColor: 'transparent',
          },
          lineTension: 0,
          pointStyle: 'line',
          showInLegend: true,
          data: this.state.stockStatusList.map((item, index) => (item.closingBalance))
        }

      ],

    };


    const { rangeValue } = this.state



    return (
      <div className="animated fadeIn" >
        <AuthenticationServiceComponent history={this.props.history} />
        <h6 className="mt-success">{i18n.t(this.props.match.params.message)}</h6>
        <h5 className="red">{i18n.t(this.state.message)}</h5>
        <SupplyPlanFormulas ref="formulaeChild" />
        <Card style={{ display: this.state.loading ? "none" : "block" }}>
          <div className="Card-header-reporticon pb-2">
            {/* <i className="icon-menu"></i><strong>Stock Status Report</strong> */}
            <div className="card-header-actions">
              <a className="card-header-action">
                <span style={{ cursor: 'pointer' }} onClick={() => { this.refs.formulaeChild.toggleStockStatus() }}><small className="supplyplanformulas">{i18n.t('static.supplyplan.supplyplanformula')}</small></span>
              </a>
              <a className="card-header-action">
                {/* <span style={{cursor: 'pointer'}} onClick={() => { this.refs.formulaeChild.toggleStockStatus() }}><small className="supplyplanformulas">{i18n.t('static.supplyplan.supplyplanformula')}</small></span> */}
                {this.state.stockStatusList.length > 0 && <div className="card-header-actions">
                  <img style={{ height: '25px', width: '25px', cursor: 'Pointer' }} src={pdfIcon} title={i18n.t('static.report.exportPdf')} onClick={() => this.exportPDF()} />
                  <img style={{ height: '25px', width: '25px', cursor: 'Pointer' }} src={csvicon} title={i18n.t('static.report.exportCsv')} onClick={() => this.exportCSV()} />
                </div>}
              </a>
            </div>
          </div>
          <CardBody className="pb-lg-2  CardBodyTop">
            <div className="TableCust" >
              <div ref={ref}>

                <Form >
                  <div className=" pl-0">
                    <div className="row">
                      <FormGroup className="col-md-3">
                        <Label htmlFor="appendedInputButton">{i18n.t('static.report.dateRange')}</Label>
                        <div className="controls  edit">

                          <Picker
                            ref="pickRange"
                            years={{ min: this.state.minDate, max: this.state.maxDate }}
                            value={rangeValue}
                            lang={pickerLang}
                            //theme="light"
                            onChange={this.handleRangeChange}
                            onDismiss={this.handleRangeDissmis}
                          >
                            <MonthBox value={this.makeText(rangeValue.from) + ' ~ ' + this.makeText(rangeValue.to)} onClick={this._handleClickRangeBox} />
                          </Picker>
                        </div>

                      </FormGroup>

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
                              // onChange={(e) => { this.programChange(e); this.filterVersion(e) }}
                              onChange={(e) => { this.programChange(e); }}
                              value={this.state.programId}
                            >
                              <option value="0">{i18n.t('static.common.select')}</option>
                              {programList}
                            </Input>

                          </InputGroup>
                        </div>
                      </FormGroup>

                      <FormGroup className="col-md-3">
                        <Label htmlFor="appendedInputButton">{i18n.t('static.report.version')}</Label>
                        <div className="controls">
                          <InputGroup>
                            <Input
                              type="select"
                              name="versionId"
                              id="versionId"
                              bsSize="sm"
                              // onChange={(e) => { this.getPlanningUnit(); }}
                              // onChange={(e) => { this.versionChange(e); this.getPlanningUnit(e) }}
                              onChange={(e) => { this.versionChange(e); }}
                              value={this.state.versionId}
                            >
                              <option value="0">{i18n.t('static.common.select')}</option>
                              {versionList}
                            </Input>

                          </InputGroup>
                        </div>
                      </FormGroup>

                      <FormGroup className="col-md-3">
                        <Label htmlFor="appendedInputButton">{i18n.t('static.planningunit.planningunit')}</Label>
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
                                  <Button color="secondary Gobtn btn-sm" onClick={this.filterData}>{i18n.t('static.common.go')}</Button>
                                </InputGroupAddon> */}
                          </InputGroup>
                        </div>
                      </FormGroup>
                    </div>
                  </div>
                </Form>
                <Col md="12 pl-0" style={{ display: this.state.loading ? "none" : "block" }} >
                  <div className="row">
                    {
                      this.state.stockStatusList.length > 0
                      &&
                      <div className="col-md-12 p-0">
                        <div className="col-md-12">
                          <div className="chart-wrapper chart-graph-report">
                            <Bar id="cool-canvas" data={bar} options={options} />

                          </div>
                        </div>
                        <div className="col-md-12">
                          <button className="mr-1 mt-1 mb-2 float-right btn btn-info btn-md showdatabtn" onClick={this.toggledata}>
                            {this.state.show ? i18n.t('static.common.hideData') : i18n.t('static.common.showData')}
                          </button>

                        </div>
                      </div>}


                  </div>



                  {this.state.show && this.state.stockStatusList.length > 0 && <Table responsive className="table-striped table-hover table-bordered text-center mt-2">

                    <thead>
                      <tr><th rowSpan="2" style={{ width: "200px" }}>{i18n.t('static.common.month')}</th>  <th className="text-center" colSpan="1"> {i18n.t('static.report.stock')} </th> <th className="text-center" colSpan="2"> {i18n.t('static.supplyPlan.consumption')} </th> <th className="text-center" colSpan="2"> {i18n.t('static.shipment.shipment')} </th> <th className="text-center" colSpan="6"> {i18n.t('static.report.stock')} </th> </tr><tr>
                        <th className="text-center" style={{ width: "200px" }}>{i18n.t('static.supplyPlan.openingBalance')}</th>
                        <th className="text-center" style={{ width: "200px" }}>{i18n.t('static.report.forecasted')}</th>
                        <th className="text-center" style={{ width: "200px" }}> {i18n.t('static.report.actual')} </th>
                        <th className="text-center" style={{ width: "200px" }}>{i18n.t('static.report.qty')}</th>
                        <th className="text-center" style={{ width: "600px" }}>{i18n.t('static.report.qty') + " | " + (i18n.t('static.budget.fundingsource') + " | " + i18n.t('static.supplyPlan.shipmentStatus') + " | " + (i18n.t('static.report.procurementAgentName')))}</th>
                        <th className="text-center" style={{ width: "200px" }}>{i18n.t('static.report.adjustmentQty')}</th>
                        <th className="text-center" style={{ width: "200px" }}>{i18n.t('static.supplyPlan.endingBalance')}</th>
                        <th className="text-center" style={{ width: "200px" }}>{i18n.t('static.report.amc')}</th>
                        <th className="text-center" style={{ width: "200px" }}>{i18n.t('static.report.mos')}</th>
                        <th className="text-center" style={{ width: "200px" }}>{i18n.t('static.report.minmonth')}</th>
                        <th className="text-center" style={{ width: "200px" }}>{i18n.t('static.report.maxmonth')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.stockStatusList.length > 0
                        &&
                        this.state.stockStatusList.map((item, idx) =>

                          <tr id="addr0" key={idx} >
                            <td>
                              {this.dateFormatter(this.state.stockStatusList[idx].dt)}
                            </td>
                            <td>
                              {this.formatter(this.state.stockStatusList[idx].openingBalance)}
                            </td>

                            <td className={this.rowtextFormatClassName(this.state.stockStatusList[idx])}>
                              {this.formatter(this.state.stockStatusList[idx].forecastedConsumptionQty)}
                            </td> <td>

                              {this.formatter(this.state.stockStatusList[idx].actualConsumptionQty)}
                            </td>
                            <td>
                              {this.formatter(this.state.stockStatusList[idx].shipmentQty)}
                            </td>
                            <td align="center"><table >
                              {this.state.stockStatusList[idx].shipmentInfo.map((item, index) => {
                                return (<tr  ><td padding="0">{this.formatter(item.shipmentQty) + `   |    ${item.fundingSource.code}    |    ${item.shipmentStatus.label.label_en}   |    ${item.procurementAgent.code}`}</td></tr>)
                                //return (<tr><td>{item.shipmentQty}</td><td>{item.fundingSource.label.label_en}</td><td>{item.shipmentStatus.label.label_en}</td></tr>)
                              })}</table>
                            </td>

                            <td>
                              {this.formatter(this.state.stockStatusList[idx].adjustment)}
                            </td>
                            <td>
                              {this.formatter(this.state.stockStatusList[idx].closingBalance)}
                            </td>
                            <td>
                              {this.formatter(this.formatAmc(this.state.stockStatusList[idx].amc))}
                            </td>
                            <td>
                              {this.state.stockStatusList[idx].mos != null ? this.roundN(this.state.stockStatusList[idx].mos) : i18n.t("static.supplyPlanFormula.na")}
                            </td>
                            <td>
                              {this.roundN(this.state.stockStatusList[idx].minMos)}
                            </td>
                            <td>
                              {this.roundN(this.state.stockStatusList[idx].maxMos)}
                            </td>

                          </tr>)

                      }
                    </tbody>

                  </Table>}
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
              </div></div>



          </CardBody>
        </Card>
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
    );
  }
}

export default StockStatus;

