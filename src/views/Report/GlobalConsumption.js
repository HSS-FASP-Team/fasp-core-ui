// import React, { Component, lazy, Suspense, DatePicker } from 'react';
// import { Bar, Line, Pie } from 'react-chartjs-2';
// import { Link } from 'react-router-dom';
// import {
//   Badge,
//   Button,
//   ButtonDropdown,
//   ButtonGroup,
//   ButtonToolbar,
//   Card,
//   CardBody,
//   // CardFooter,
//   CardHeader,
//   CardTitle,
//   Col,
//   Widgets,
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownToggle,
//   Progress,
//   Pagination,
//   PaginationItem,
//   PaginationLink,
//   Row,
//   CardColumns,
//   Table, FormGroup, Input, InputGroup, InputGroupAddon, Label, Form
// } from 'reactstrap';
// import Select from 'react-select';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// import paginationFactory from 'react-bootstrap-table2-paginator'
// import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
// import { getStyle, hexToRgba } from '@coreui/coreui-pro/dist/js/coreui-utilities'
// import i18n from '../../i18n'
// import Pdf from "react-to-pdf"
// import AuthenticationService from '../Common/AuthenticationService.js';
// import RealmService from '../../api/RealmService';
// import getLabelText from '../../CommonComponent/getLabelText';
// import PlanningUnitService from '../../api/PlanningUnitService';
// import ProductService from '../../api/ProductService';
// import Picker from 'react-month-picker'
// import MonthBox from '../../CommonComponent/MonthBox.js'
// import RealmCountryService from '../../api/RealmCountryService';
// import CryptoJS from 'crypto-js'
// import { SECRET_KEY } from '../../Constants.js'
// import moment from "moment";
// import { getDatabase } from "../../CommonComponent/IndexedDbFunctions";
// import pdfIcon from '../../assets/img/pdf.png';
// import csvicon from '../../assets/img/csv.png'
// import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
// import { LOGO } from '../../CommonComponent/Logo.js'
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import ReportService from '../../api/ReportService';
// import ProgramService from '../../api/ProgramService';
// import 'chartjs-plugin-annotation';
// // const { getToggledOptions } = utils;
// const Widget04 = lazy(() => import('../../views/Widgets/Widget04'));
// // const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));
// const ref = React.createRef();

// const brandPrimary = getStyle('--primary')
// const brandSuccess = getStyle('--success')
// const brandInfo = getStyle('--info')
// const brandWarning = getStyle('--warning')
// const brandDanger = getStyle('--danger')
// const pickerLang = {
//   months: [i18n.t('static.month.jan'), i18n.t('static.month.feb'), i18n.t('static.month.mar'), i18n.t('static.month.apr'), i18n.t('static.month.may'), i18n.t('static.month.jun'), i18n.t('static.month.jul'), i18n.t('static.month.aug'), i18n.t('static.month.sep'), i18n.t('static.month.oct'), i18n.t('static.month.nov'), i18n.t('static.month.dec')],
//   from: 'From', to: 'To',
// }
// let dendoLabels = [{ label: "Today", pointStyle: "triangle" }]
// const options = {
//   title: {
//     display: true,
//     // text: i18n.t('static.dashboard.globalconsumption'),
//     fontColor: 'black'
//   },
//   scales: {
//     yAxes: [{
//       scaleLabel: {
//         display: true,
//         labelString: 'Consumption Qty ( Million )',
//         fontColor: 'black'
//       },
//       stacked: true,
//       ticks: {
//         beginAtZero: true,
//         fontColor: 'black'
//       }
//     }],
//     xAxes: [{
//       ticks: {
//         fontColor: 'black',

//       }
//     }]
//   },
//   annotation: {
//     annotations: [{
//       type: 'triangle',
//       //  mode: 'vertical',
//       drawTime: 'beforeDatasetsDraw',
//       scaleID: 'x-axis-0',
//       value: 'Mar-2020',

//       backgroundColor: 'rgba(0, 255, 0, 0.1)'
//     }],

//   },
//   tooltips: {
//     enabled: false,
//     custom: CustomTooltips
//   },
//   maintainAspectRatio: false
//   ,
//   legend: {
//     display: true,
//     position: 'bottom',
//     labels: {
//       usePointStyle: true,
//       fontColor: 'black'
//     }
//   }
// }



// //Random Numbers
// function random(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// var elements = 27;
// var data1 = [];
// var data2 = [];
// var data3 = [];

// for (var i = 0; i <= elements; i++) {
//   data1.push(random(50, 200));
//   data2.push(random(80, 100));
//   data3.push(65);
// }



// class GlobalConsumption extends Component {
//   constructor(props) {
//     super(props);

//     this.toggledata = this.toggledata.bind(this);
//     this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

//     this.state = {
//       dropdownOpen: false,
//       radioSelected: 2,
//       lang: localStorage.getItem('lang'),
//       countrys: [],
//       planningUnits: [],
//       consumptions: [],
//       productCategories: [],
//       countryValues: [],
//       countryLabels: [],
//       planningUnitValues: [],
//       planningUnitLabels: [],
//       programValues: [],
//       programLabels: [],
//       programs: [],
//       message: '',
//       rangeValue: { from: { year: new Date().getFullYear() - 1, month: new Date().getMonth() + 1 }, to: { year: new Date().getFullYear(), month: new Date().getMonth() + 1 } },



//     };
//     this.getCountrys = this.getCountrys.bind(this);
//     this.filterData = this.filterData.bind(this);
//     this._handleClickRangeBox = this._handleClickRangeBox.bind(this)
//     this.handleRangeChange = this.handleRangeChange.bind(this);
//     this.handleRangeDissmis = this.handleRangeDissmis.bind(this);
//     this.getPlanningUnit = this.getPlanningUnit.bind(this);
//     this.getProductCategories = this.getProductCategories.bind(this)
//     this.getPrograms = this.getPrograms.bind(this)
//     this.handleChange = this.handleChange.bind(this)
//     this.getRandomColor = this.getRandomColor.bind(this)
//     this.handleChangeProgram = this.handleChangeProgram.bind(this)
//     this.handlePlanningUnitChange = this.handlePlanningUnitChange.bind(this)
//     this.hideDiv = this.hideDiv.bind(this)
//   }

//   makeText = m => {
//     if (m && m.year && m.month) return (pickerLang.months[m.month - 1] + '. ' + m.year)
//     return '?'
//   }

//   exportCSV() {

//     var csvRow = [];
//     csvRow.push((i18n.t('static.report.dateRange') + ' , ' + this.makeText(this.state.rangeValue.from) + ' ~ ' + this.makeText(this.state.rangeValue.to)).replaceAll(' ', '%20'))
//     this.state.countryLabels.map(ele =>
//       csvRow.push(i18n.t('static.dashboard.country') + ' , ' + ((ele.toString()).replaceAll(',', '%20')).replaceAll(' ', '%20')))
//     this.state.programLabels.map(ele =>
//       csvRow.push(i18n.t('static.program.program') + ' , ' + ((ele.toString()).replaceAll(',', '%20')).replaceAll(' ', '%20')))
//     csvRow.push((i18n.t('static.dashboard.productcategory')).replaceAll(' ', '%20') + ' , ' + ((document.getElementById("productCategoryId").selectedOptions[0].text).replaceAll(',', '%20')).replaceAll(' ', '%20'))
//     this.state.planningUnitLabels.map(ele =>
//       csvRow.push((i18n.t('static.planningunit.planningunit')).replaceAll(' ', '%20') + ' , ' + ((ele.toString()).replaceAll(',', '%20')).replaceAll(' ', '%20')))
//     csvRow.push('')
//     csvRow.push('')
//     csvRow.push((i18n.t('static.common.youdatastart')).replaceAll(' ', '%20'))
//     csvRow.push('')
//     var re;

//     var A = [[(i18n.t('static.dashboard.country')).replaceAll(' ', '%20'), (i18n.t('static.report.month')).replaceAll(' ', '%20'), (i18n.t('static.consumption.consumptionqty')).replaceAll(' ', '%20')]]

//     re = this.state.consumptions

//     for (var item = 0; item < re.length; item++) {
//       A.push([[getLabelText(re[item].realmCountry.label), re[item].consumptionDateString, re[item].planningUnitQty]])
//     }
//     for (var i = 0; i < A.length; i++) {
//       csvRow.push(A[i].join(","))
//     }
//     var csvString = csvRow.join("%0A")
//     var a = document.createElement("a")
//     a.href = 'data:attachment/csv,' + csvString
//     a.target = "_Blank"
//     a.download = i18n.t('static.dashboard.globalconsumption') + this.makeText(this.state.rangeValue.from) + ' ~ ' + this.makeText(this.state.rangeValue.to) + ".csv"
//     document.body.appendChild(a)
//     a.click()
//   }



//   formatter = value => {

//     var cell1 = value
//     cell1 += '';
//     var x = cell1.split('.');
//     var x1 = x[0];
//     var x2 = x.length > 1 ? '.' + x[1] : '';
//     var rgx = /(\d+)(\d{3})/;
//     while (rgx.test(x1)) {
//       x1 = x1.replace(rgx, '$1' + ',' + '$2');
//     }
//     return x1 + x2;
//   }



//   exportPDF = () => {
//     const addFooters = doc => {

//       const pageCount = doc.internal.getNumberOfPages()

//       doc.setFont('helvetica', 'bold')
//       doc.setFontSize(6)
//       for (var i = 1; i <= pageCount; i++) {
//         doc.setPage(i)

//         doc.setPage(i)
//         doc.text('Page ' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width / 9, doc.internal.pageSize.height - 30, {
//           align: 'center'
//         })
//         doc.text('Copyright © 2020 Quantification Analytics Tool', doc.internal.pageSize.width * 6 / 7, doc.internal.pageSize.height - 30, {
//           align: 'center'
//         })


//       }
//     }
//     const addHeaders = doc => {

//       const pageCount = doc.internal.getNumberOfPages()


//       //  var file = new File('QAT-logo.png','../../../assets/img/QAT-logo.png');
//       // var reader = new FileReader();

//       //var data='';
//       // Use fs.readFile() method to read the file 
//       //fs.readFile('../../assets/img/logo.svg', 'utf8', function(err, data){ 
//       //}); 
//       for (var i = 1; i <= pageCount; i++) {
//         doc.setFontSize(12)
//         doc.setFont('helvetica', 'bold')
//         doc.setPage(i)
//         doc.addImage(LOGO, 'png', 0, 10, 180, 50, 'FAST');
//         /*doc.addImage(data, 10, 30, {
//           align: 'justify'
//         });*/
//         doc.setTextColor("#002f6c");
//         doc.text(i18n.t('static.dashboard.globalconsumption'), doc.internal.pageSize.width / 2, 60, {
//           align: 'center'
//         })
//         if (i == 1) {
//           doc.setFont('helvetica', 'normal')
//           doc.setFontSize(8)
//           doc.text(i18n.t('static.report.dateRange') + ' : ' + this.makeText(this.state.rangeValue.from) + ' ~ ' + this.makeText(this.state.rangeValue.to), doc.internal.pageSize.width / 8, 90, {
//             align: 'left'
//           })
//           var planningText = doc.splitTextToSize(i18n.t('static.dashboard.country') + ' : ' + this.state.countryLabels.toString(), doc.internal.pageSize.width * 3 / 4);
//           doc.text(doc.internal.pageSize.width / 8, 110, planningText)

//           planningText = doc.splitTextToSize(i18n.t('static.program.program') + ' : ' + this.state.programLabels.toString(), doc.internal.pageSize.width * 3 / 4);

//           doc.text(doc.internal.pageSize.width / 8, 130, planningText)
//           doc.text(i18n.t('static.dashboard.productcategory') + ' : ' + document.getElementById("productCategoryId").selectedOptions[0].text, doc.internal.pageSize.width / 8, this.state.programLabels.size > 2 ? 170 : 150, {
//             align: 'left'
//           })
//           planningText = doc.splitTextToSize((i18n.t('static.planningunit.planningunit') + ' : ' + this.state.planningUnitLabels.join('; ')), doc.internal.pageSize.width * 3 / 4);

//           doc.text(doc.internal.pageSize.width / 8, this.state.programLabels.size > 2 ? 190 : 170, planningText)
//         }

//       }
//     }
//     const unit = "pt";
//     const size = "A4"; // Use A1, A2, A3 or A4
//     const orientation = "landscape"; // portrait or landscape

//     const marginLeft = 10;
//     const doc = new jsPDF(orientation, unit, size, true);

//     doc.setFontSize(10);

//     const title = "Consumption Report";
//     var canvas = document.getElementById("cool-canvas");
//     //creates image

//     var canvasImg = canvas.toDataURL("image/png", 1.0);
//     var width = doc.internal.pageSize.width;
//     var height = doc.internal.pageSize.height;
//     var h1 = 50;
//     var aspectwidth1 = (width - h1);

//     doc.addImage(canvasImg, 'png', 50, 220, 750, 260, 'CANVAS');

//     const headers = [[i18n.t('static.dashboard.country'), i18n.t('static.report.month'), i18n.t('static.consumption.consumptionqty')]]
//     const data = this.state.consumptions.map(elt => [getLabelText(elt.realmCountry.label, this.state.lang), elt.consumptionDateString, this.formatter(elt.planningUnitQty)]);

//     let content = {
//       margin: { top: 80 },
//       startY: height,
//       head: headers,
//       body: data,
//       styles: { lineWidth: 1, fontSize: 8, halign: 'center' }

//     };


//     //doc.text(title, marginLeft, 40);
//     doc.autoTable(content);
//     addHeaders(doc)
//     addFooters(doc)
//     doc.save("GlobalConsumption.pdf")
//     //creates PDF from img
//     /*  var doc = new jsPDF('landscape');
//       doc.setFontSize(20);
//       doc.text(15, 15, "Cool Chart");
//       doc.save('canvas.pdf');*/
//   }










//   handleChange(countrysId) {

//     this.setState({
//       countryValues: countrysId.map(ele => ele.value),
//       countryLabels: countrysId.map(ele => ele.label)
//     }, () => {

//       this.filterData(this.state.rangeValue)
//     })
//   }
//   handleChangeProgram(programIds) {

//     this.setState({
//       programValues: programIds.map(ele => ele.value),
//       programLabels: programIds.map(ele => ele.label)
//     }, () => {

//       this.filterData(this.state.rangeValue)
//     })

//   }

//   handlePlanningUnitChange(planningUnitIds) {

//     this.setState({
//       planningUnitValues: planningUnitIds.map(ele => ele.value),
//       planningUnitLabels: planningUnitIds.map(ele => ele.label)
//     }, () => {

//       this.filterData(this.state.rangeValue)
//     })
//   }

//   hideDiv() {
//     setTimeout(function () {
//       var theSelect = document.getElementById('planningUnitId').length;

//       // console.log("INHIDEDIV------------------------------------------------------", theSelect);

//     }, 9000);

//   }


//   filterData(rangeValue) {

//     setTimeout('', 10000);
//     let productCategoryId = document.getElementById("productCategoryId").value;
//     let CountryIds = this.state.countryValues;
//     let planningUnitIds = this.state.planningUnitValues;
//     let programIds = this.state.programValues;
//     let viewById = document.getElementById("viewById").value;
//     let startDate = rangeValue.from.year + '-' + rangeValue.from.month + '-01';
//     let stopDate = rangeValue.to.year + '-' + rangeValue.to.month + '-' + new Date(rangeValue.to.year, rangeValue.to.month, 0).getDate();
//     if (CountryIds.length > 0 && planningUnitIds.length > 0 && programIds.length > 0) {
//       let realmId = AuthenticationService.getRealmId();
//       var inputjson = {
//         "realmId": 1,
//         "realmCountryIds": CountryIds,
//         "programIds": programIds,
//         "planningUnitIds": planningUnitIds,
//         "startDate": startDate,
//         "stopDate": stopDate,
//         "reportView": viewById
//       }
//       console.log('inputJSON***' + inputjson)

//       ReportService.getGlobalConsumptiondata(inputjson)
//         .then(response => {
//           console.log("RESP---", response.data);
//           this.setState({
//             // consumptions: [

//             //   {
//             //     "realmCountry": {
//             //       "id": 2,
//             //       "label": {
//             //         "active": false,
//             //         "labelId": 343,
//             //         "label_en": "Kenya",
//             //         "label_sp": "",
//             //         "label_fr": "",
//             //         "label_pr": ""
//             //       },
//             //       "code": "KEN"
//             //     },
//             //     "consumptionDate": "2019-07-01",
//             //     "planningUnitQty": 40,
//             //     "forecastingUnitQty": 0,
//             //     "consumptionDateString": "Jul-2019"
//             //   },
//             //   {
//             //     "realmCountry": {
//             //       "id": 2,
//             //       "label": {
//             //         "active": false,
//             //         "labelId": 343,
//             //         "label_en": "Kenya",
//             //         "label_sp": "",
//             //         "label_fr": "",
//             //         "label_pr": ""
//             //       },
//             //       "code": "KEN"
//             //     },
//             //     "consumptionDate": "2019-08-01",
//             //     "planningUnitQty": 50,
//             //     "forecastingUnitQty": 0,
//             //     "consumptionDateString": "Aug-2019"
//             //   },
//             //   {
//             //     "realmCountry": {
//             //       "id": 2,
//             //       "label": {
//             //         "active": false,
//             //         "labelId": 343,
//             //         "label_en": "Malawi",
//             //         "label_sp": "",
//             //         "label_fr": "",
//             //         "label_pr": ""
//             //       },
//             //       "code": "MWI"
//             //     },
//             //     "consumptionDate": "2019-07-01",
//             //     "planningUnitQty": 10,
//             //     "forecastingUnitQty": 0,
//             //     "consumptionDateString": "Jul-2019"
//             //   },
//             //   {
//             //     "realmCountry": {
//             //       "id": 2,
//             //       "label": {
//             //         "active": false,
//             //         "labelId": 343,
//             //         "label_en": "Malawi",
//             //         "label_sp": "",
//             //         "label_fr": "",
//             //         "label_pr": ""
//             //       },
//             //       "code": "MWI"
//             //     },
//             //     "consumptionDate": "2019-08-01",
//             //     "planningUnitQty": 20,
//             //     "forecastingUnitQty": 0,
//             //     "consumptionDateString": "Aug-2019"
//             //   },
//             // ],
//             consumptions: response.data,
//             message: ''
//           })
//         }).catch(
//           error => {
//             this.setState({
//               consumptions: []
//             })

//             if (error.message === "Network Error") {
//               this.setState({ message: error.message });
//             } else {
//               switch (error.response ? error.response.status : "") {
//                 case 500:
//                 case 401:
//                 case 404:
//                 case 406:
//                 case 412:
//                   this.setState({ message: i18n.t(error.response.data.messageCode, { entityname: i18n.t('static.dashboard.Country') }) });
//                   break;
//                 default:
//                   this.setState({ message: 'static.unkownError' });
//                   break;
//               }
//             }
//           }
//         );
//     } else if (CountryIds.length == 0) {
//       this.setState({ message: i18n.t('static.program.validcountrytext'), consumptions: [] });

//     } else if (programIds.length == 0) {
//       this.setState({ message: i18n.t('static.common.selectProgram'), consumptions: [] });

//     } else if (productCategoryId == -1) {
//       this.setState({ message: i18n.t('static.common.selectProductCategory'), consumptions: [] });

//     } else {
//       this.setState({ message: i18n.t('static.procurementUnit.validPlanningUnitText'), consumptions: [] });

//     }
//   }

//   getCountrys() {
//     if (navigator.onLine) {
//       AuthenticationService.setupAxiosInterceptors();
//       let realmId = AuthenticationService.getRealmId();
//       RealmCountryService.getRealmCountryrealmIdById(realmId)
//         .then(response => {
//           this.setState({
//             countrys: response.data
//           })
//         }).catch(
//           error => {
//             this.setState({
//               countrys: []
//             })
//             if (error.message === "Network Error") {
//               this.setState({ message: error.message });
//             } else {
//               switch (error.response ? error.response.status : "") {
//                 case 500:
//                 case 401:
//                 case 404:
//                 case 406:
//                 case 412:
//                 default:
//                   this.setState({ message: i18n.t(error.response.data.messageCode, { entityname: i18n.t('static.dashboard.Country') }) });
//                   break;
//                   this.setState({ message: 'static.unkownError' });
//                   break;
//               }
//             }
//           }
//         );

//     } else {
//       const lan = 'en';
//       var db1;
//       getDatabase();
//       var openRequest = indexedDB.open('fasp', 1);
//       openRequest.onsuccess = function (e) {
//         db1 = e.target.result;
//         var transaction = db1.transaction(['CountryData'], 'readwrite');
//         var Country = transaction.objectStore('CountryData');
//         var getRequest = Country.getAll();
//         var proList = []
//         getRequest.onerror = function (event) {
//           // Handle errors!
//         };
//         getRequest.onsuccess = function (event) {
//           var myResult = [];
//           myResult = getRequest.result;
//           var userBytes = CryptoJS.AES.decrypt(localStorage.getItem('curUser'), SECRET_KEY);
//           var userId = userBytes.toString(CryptoJS.enc.Utf8);
//           for (var i = 0; i < myResult.length; i++) {
//             if (myResult[i].userId == userId) {
//               var bytes = CryptoJS.AES.decrypt(myResult[i].CountryName, SECRET_KEY);
//               var CountryNameLabel = bytes.toString(CryptoJS.enc.Utf8);
//               var CountryJson = {
//                 name: getLabelText(JSON.parse(CountryNameLabel), lan) + "~v" + myResult[i].version,
//                 id: myResult[i].id
//               }
//               proList[i] = CountryJson
//             }
//           }
//           this.setState({
//             countrys: proList
//           })

//         }.bind(this);

//       }

//     }


//   }
//   getPlanningUnit() {
//     if (navigator.onLine) {
//       console.log('changed')
//       let productCategoryId = document.getElementById("productCategoryId").value;
//       AuthenticationService.setupAxiosInterceptors();
//       if (productCategoryId != -1) {
//         PlanningUnitService.getPlanningUnitByProductCategoryId(productCategoryId).then(response => {
//           this.setState({
//             planningUnits: response.data,
//           })
//         })
//           .catch(
//             error => {
//               this.setState({
//                 planningUnits: [],
//               })
//               if (error.message === "Network Error") {
//                 this.setState({ message: error.message });
//               } else {
//                 switch (error.response ? error.response.status : "") {
//                   case 500:
//                   case 401:
//                   case 404:
//                   case 406:
//                   case 412:
//                     //  this.setState({ message: error.response.data.messageCode });
//                     break;
//                   default:
//                     this.setState({ message: 'static.unkownError' });
//                     break;
//                 }
//               }
//             }
//           );
//       }
//     } else {
//       const lan = 'en';
//       var db1;
//       var storeOS;
//       getDatabase();
//       var openRequest = indexedDB.open('fasp', 1);
//       openRequest.onsuccess = function (e) {
//         db1 = e.target.result;
//         var planningunitTransaction = db1.transaction(['CountryPlanningUnit'], 'readwrite');
//         var planningunitOs = planningunitTransaction.objectStore('CountryPlanningUnit');
//         var planningunitRequest = planningunitOs.getAll();
//         var planningList = []
//         planningunitRequest.onerror = function (event) {
//           // Handle errors!
//         };
//         planningunitRequest.onsuccess = function (e) {
//           var myResult = [];
//           myResult = planningunitRequest.result;
//           var CountryId = (document.getElementById("CountryId").value).split("_")[0];
//           var proList = []
//           for (var i = 0; i < myResult.length; i++) {
//             if (myResult[i].Country.id == CountryId) {
//               var productJson = {
//                 name: getLabelText(myResult[i].planningUnit.label, lan),
//                 id: myResult[i].planningUnit.id
//               }
//               proList[i] = productJson
//             }
//           }
//           this.setState({
//             planningUnitList: proList
//           })
//         }.bind(this);
//       }.bind(this)

//     }

//   }

//   getPrograms() {
//     AuthenticationService.setupAxiosInterceptors();
//     let realmId = AuthenticationService.getRealmId();
//     ProgramService.getProgramByRealmId(realmId)
//       .then(response => {
//         console.log(JSON.stringify(response.data))
//         this.setState({
//           programs: response.data
//         })
//       }).catch(
//         error => {
//           this.setState({
//             programs: []
//           })
//           if (error.message === "Network Error") {
//             this.setState({ message: error.message });
//           } else {
//             switch (error.response ? error.response.status : "") {
//               case 500:
//               case 401:
//               case 404:
//               case 406:
//               case 412:
//                 this.setState({ message: i18n.t(error.response.data.messageCode, { entityname: i18n.t('static.dashboard.program') }) });
//                 break;
//               default:
//                 this.setState({ message: 'static.unkownError' });
//                 break;
//             }
//           }
//         }
//       );
//   }

//   getProductCategories() {
//     AuthenticationService.setupAxiosInterceptors();
//     let realmId = AuthenticationService.getRealmId();
//     ProductService.getProductCategoryList(realmId)
//       .then(response => {
//         console.log(response.data)
//         this.setState({
//           productCategories: response.data
//         })
//       }).catch(
//         error => {
//           this.setState({
//             productCategories: []
//           })
//           if (error.message === "Network Error") {
//             this.setState({ message: error.message });
//           } else {
//             switch (error.response ? error.response.status : "") {
//               case 500:
//               case 401:
//               case 404:
//               case 406:
//               case 412:
//                 this.setState({ message: i18n.t(error.response.data.messageCode, { entityname: i18n.t('static.dashboard.productcategory') }) });
//                 break;
//               default:
//                 this.setState({ message: 'static.unkownError' });
//                 break;
//             }
//           }
//         }
//       );
//     this.getPlanningUnit();

//   }
//   componentDidMount() {
//     AuthenticationService.setupAxiosInterceptors();
//     this.getPrograms()
//     this.getCountrys();
//     this.getProductCategories()

//   }

//   toggledata = () => this.setState((currentState) => ({ show: !currentState.show }));

//   onRadioBtnClick(radioSelected) {
//     this.setState({
//       radioSelected: radioSelected,
//     });
//   }

//   show() {
//   }
//   handleRangeChange(value, text, listIndex) {
//     //
//   }
//   handleRangeDissmis(value) {
//     this.setState({ rangeValue: value })
//     this.filterData(value);
//   }

//   _handleClickRangeBox(e) {
//     this.refs.pickRange.show()
//   }
//   loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

//   getRandomColor() {
//     var letters = '0123456789ABCDEF'.split('');
//     var color = '#';
//     for (var i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   }
//   render() {
//     const { planningUnits } = this.state;
//     let planningUnitList = [];
//     planningUnitList = planningUnits.length > 0
//       && planningUnits.map((item, i) => {
//         return (

//           { label: getLabelText(item.label, this.state.lang), value: item.planningUnitId }

//         )
//       }, this);
//     const { programs } = this.state;
//     let programList = [];
//     programList = programs.length > 0
//       && programs.map((item, i) => {
//         return (

//           { label: getLabelText(item.label, this.state.lang), value: item.programId }

//         )
//       }, this);
//     const { countrys } = this.state;
//     // console.log(JSON.stringify(countrys))
//     let countryList = countrys.length > 0 && countrys.map((item, i) => {
//       // console.log(JSON.stringify(item))
//       return ({ label: getLabelText(item.country.label, this.state.lang), value: item.realmCountryId })
//     }, this);
//     const { productCategories } = this.state;
//     let productCategoryList = productCategories.length > 0
//       && productCategories.map((item, i) => {
//         return (
//           <option key={i} value={item.payload.productCategoryId}>
//             {getLabelText(item.payload.label, this.state.lang)}
//           </option>
//         )
//       }, this);

//     const backgroundColor = [
//       '#002f6c',
//       '#118b70',
//       '#EDB944',
//       '#20a8d8',
//       '#d1e3f5',
//     ]

//     let country = [...new Set(this.state.consumptions.map(ele => (getLabelText(ele.realmCountry.label, this.state.lang))))];
//     let localConsumptionList = this.state.consumptions;
//     let localCountryList = [];
//     for (var i = 0; i < country.length; i++) {
//       let countSum = 0;
//       for (var j = 0; j < localConsumptionList.length; j++) {
//         if (country[i].localeCompare(getLabelText(localConsumptionList[j].realmCountry.label, this.state.lang))) {
//           countSum = countSum + localConsumptionList[j].planningUnitQty;
//         }
//       }
//       let json = {
//         country: country[i],
//         sum: countSum
//       }
//       localCountryList.push(json);
//     }
//     // console.log("localCountryList BEFORE------", localCountryList);

//     // localCountryList = localCountryList.sort((a, b) => parseFloat(b.sum) - parseFloat(a.sum));
//     localCountryList = localCountryList.sort((a, b) => parseFloat(a.sum) - parseFloat(b.sum));
//     // console.log("localCountryList AFTER------", localCountryList);

//     let consumptiondata = [];
//     let data = [];
//     for (var i = 0; i < localCountryList.length; i++) {
//       data = this.state.consumptions.filter(c => localCountryList[i].country.localeCompare(getLabelText(c.realmCountry.label, this.state.lang)) == 0).map(ele => (ele.planningUnitQty))
//       console.log("CONSUMPTIONLIST(i)----->", i, "-------", data);
//       consumptiondata.push(data)
//     }

//     // let country = [...new Set(this.state.consumptions.map(ele => (getLabelText(ele.realmCountry.label, this.state.lang))))]
//     // console.log("COUNTRY SET-------", country);
//     // let consumptiondata = [];
//     // let data = [];
//     // for (var i = 0; i < country.length; i++) {
//     //   data = this.state.consumptions.filter(c => country[i].localeCompare(getLabelText(c.realmCountry.label, this.state.lang)) == 0).map(ele => (ele.planningUnitQty))
//     //   console.log("CONSUMPTIONLIST(i)----->",i,"-------", data);
//     //   consumptiondata.push(data)
//     // }

//     const bar = {

//       labels: [...new Set(this.state.consumptions.map(ele => (ele.consumptionDateString)))],
//       datasets: consumptiondata.map((item, index) => ({ stack: 1, label: country[index], data: item, backgroundColor: backgroundColor[index] }))

//       // datasets: [
//       //   {
//       //     label: 'Actual Consumption',
//       //     backgroundColor: '#86CD99',
//       //     borderColor: 'rgba(179,181,198,1)',
//       //     pointBackgroundColor: 'rgba(179,181,198,1)',
//       //     pointBorderColor: '#fff',
//       //     pointHoverBackgroundColor: '#fff',
//       //     pointHoverBorderColor: 'rgba(179,181,198,1)',
//       //     data: this.state.consumptions.map((item, index) => (item.planningUnitQty)),
//       //   }, {
//       //     type: "line",
//       //     lineTension: 0,
//       //     label: i18n.t('static.report.forecastConsumption'),
//       //     backgroundColor: 'transparent',
//       //     borderColor: '#000',
//       //     borderDash: [10, 10],
//       //     ticks: {
//       //       fontSize: 2,
//       //       fontColor: 'transparent',
//       //     },
//       //     showInLegend: true,
//       //     pointStyle: 'line',
//       //     pointBorderWidth: 5,
//       //     yValueFormatString: "$#,##0",
//       //     data: this.state.consumptions.map((item, index) => (item.forecastingUnitQty))
//       //   }
//       // ],

//     };
//     const pickerLang = {
//       months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//       from: 'From', to: 'To',
//     }
//     const { rangeValue } = this.state

//     const makeText = m => {
//       if (m && m.year && m.month) return (pickerLang.months[m.month - 1] + '. ' + m.year)
//       return '?'
//     }

//     return (
//       <div className="animated fadeIn" >
//         <h6 className="mt-success">{i18n.t(this.props.match.params.message)}</h6>
//         <h5 className="red">{i18n.t(this.state.message)}</h5>

//         <Card>
//         <div className="Card-header-reporticon">
//             {/* <i className="icon-menu"></i><strong>{i18n.t('static.dashboard.globalconsumption')}</strong> */}
//             {this.state.consumptions.length > 0 && <div className="card-header-actions">
//               <a className="card-header-action">
//                 <img style={{ height: '25px', width: '25px', cursor: 'pointer' }} src={pdfIcon} title="Export PDF" onClick={() => this.exportPDF()} />
//                 <img style={{ height: '25px', width: '25px', cursor: 'pointer' }} src={csvicon} title={i18n.t('static.report.exportCsv')} onClick={() => this.exportCSV()} />

//               </a>
//             </div>}
//           </div>

//           <CardBody className="pb-lg-2 pt-lg-0">

//             <div ref={ref}>

//               <Form >
//                 <Col md="12 pl-0">
//                   <div className="row">
//                     <FormGroup className="col-md-3">
//                       <Label htmlFor="appendedInputButton">{i18n.t('static.report.dateRange')}<span className="stock-box-icon  fa fa-sort-desc ml-1"></span></Label>
//                       <div className="controls edit">

//                         <Picker
//                           ref="pickRange"
//                           years={{ min: 2013 }}
//                           value={rangeValue}
//                           lang={pickerLang}
//                           //theme="light"
//                           onChange={this.handleRangeChange}
//                           onDismiss={this.handleRangeDissmis}
//                         >
//                           <MonthBox value={makeText(rangeValue.from) + ' ~ ' + makeText(rangeValue.to)} onClick={this._handleClickRangeBox} />
//                         </Picker>
//                       </div>

//                     </FormGroup>

//                     <FormGroup className="col-md-3">
//                       <Label htmlFor="countrysId">{i18n.t('static.program.realmcountry')}</Label>
//                       <span className="reportdown-box-icon  fa fa-sort-desc ml-1"></span>
//                       <InputGroup className="box">
//                         <div className="controls edit">
//                           <ReactMultiSelectCheckboxes

//                             bsSize="sm"
//                             name="countrysId"
//                             id="countrysId"
//                             onChange={(e) => { this.handleChange(e) }}
//                             options={countryList && countryList.length > 0 ? countryList : []}
//                           />
//                           {!!this.props.error &&
//                             this.props.touched && (
//                               <div style={{ color: 'red', marginTop: '.5rem' }}>{this.props.error}</div>
//                             )}
//                         </div>
//                       </InputGroup>
//                     </FormGroup>


//                     <FormGroup className="col-md-3">
//                       <Label htmlFor="programIds">{i18n.t('static.program.program')}</Label>
//                       <span className="reportdown-box-icon  fa fa-sort-desc ml-1"></span>
//                       <InputGroup className="box">
//                         <ReactMultiSelectCheckboxes

//                           bsSize="sm"
//                           name="programIds"
//                           id="programIds"
//                           onChange={(e) => { this.handleChangeProgram(e) }}
//                           options={programList && programList.length > 0 ? programList : []}
//                         />
//                         {!!this.props.error &&
//                           this.props.touched && (
//                             <div style={{ color: 'red', marginTop: '.5rem' }}>{this.props.error}</div>
//                           )}
//                       </InputGroup>
//                     </FormGroup>

//                     <FormGroup className="col-md-3">
//                       <Label htmlFor="appendedInputButton">{i18n.t('static.productcategory.productcategory')}</Label>
//                       <div className="controls ">
//                         <InputGroup>
//                           <Input
//                             type="select"
//                             name="productCategoryId"
//                             id="productCategoryId"
//                             bsSize="sm"
//                             onChange={this.getPlanningUnit}
//                           >
//                             <option value="-1">{i18n.t('static.common.select')}</option>
//                             {productCategories.length > 0
//                               && productCategories.map((item, i) => {
//                                 return (
//                                   <option key={i} value={item.payload.productCategoryId} disabled={item.payload.active ? "" : "disabled"}>
//                                     {Array(item.level).fill(' ').join('') + (getLabelText(item.payload.label, this.state.lang))}
//                                   </option>
//                                 )
//                               }, this)}
//                           </Input>
//                         </InputGroup>
//                       </div>
//                     </FormGroup>

//                     <FormGroup className="col-sm-3" id="hideDiv">
//                       <Label htmlFor="appendedInputButton">{i18n.t('static.planningunit.planningunit')}</Label>
//                       <span className="reportdown-box-icon  fa fa-sort-desc ml-1"></span>
//                       <div className="controls">
//                         <InputGroup className="box">
//                           <ReactMultiSelectCheckboxes
//                             // isLoading={true}
//                             name="planningUnitId"
//                             id="planningUnitId"
//                             bsSize="sm"
//                             onChange={(e) => { this.handlePlanningUnitChange(e) }}
//                             options={planningUnitList && planningUnitList.length > 0 ? planningUnitList : []}
//                           />
//                         </InputGroup>
//                       </div>
//                     </FormGroup>

//                     <FormGroup className="col-md-3">
//                       <Label htmlFor="appendedInputButton">{i18n.t('static.common.display')}</Label>
//                       <div className="controls">
//                         <InputGroup>
//                           <Input
//                             type="select"
//                             name="viewById"
//                             id="viewById"
//                             bsSize="sm"
//                             onChange={this.filterData}
//                           >
//                             <option value="1">{i18n.t('static.report.planningUnit')}</option>
//                             <option value="2">{i18n.t('static.dashboard.forecastingunit')}</option>
//                           </Input>
//                         </InputGroup>
//                       </div>
//                     </FormGroup>

//                   </div>
//                 </Col>
//               </Form>
//               <Col md="12 pl-0">
//                 <div className="globalviwe-scroll">
//                   <div className="row">

//                     {
//                       this.state.consumptions.length > 0
//                       &&
//                       <div className="col-md-12 p-0 grapg-margin " >
//                         <div className="offset-md-1 col-md-11">
//                           <div className="chart-wrapper chart-graph-report">
//                             <Bar id="cool-canvas" data={bar} options={options} />
//                           </div>
//                         </div>
//                         <div className="col-md-12">
//                           <button className="mr-1 float-right btn btn-info btn-md showdatabtn" onClick={this.toggledata}>
//                             {this.state.show ? 'Hide Data' : 'Show Data'}
//                           </button>

//                         </div>
//                       </div>}

//                   </div>
//                   <div className="row">
//                     <div className="col-md-12">
//                       {this.state.show && this.state.consumptions.length > 0 &&
//                         <div className="table-responsive ">

//                           <Table responsive className="table-striped  table-fixed table-hover table-bordered text-center mt-2">

//                             <thead>
//                               <tr>
//                                 <th className="text-center" style={{ width: '34%' }}> {i18n.t('static.dashboard.country')} </th>
//                                 <th className="text-center " style={{ width: '34%' }}> {i18n.t('static.report.month')} </th>
//                                 <th className="text-center" style={{ width: '34%' }}>Consumption Qty ( Million )</th>
//                               </tr>
//                             </thead>

//                             <tbody>
//                               {
//                                 this.state.consumptions.length > 0
//                                 &&
//                                 this.state.consumptions.map((item, idx) =>

//                                   <tr id="addr0" key={idx} >

//                                     <td>{getLabelText(this.state.consumptions[idx].realmCountry.label, this.state.lang)}</td>
//                                     <td>

//                                       {this.state.consumptions[idx].consumptionDateString}
//                                     </td>
//                                     <td >
//                                       {this.formatter(this.state.consumptions[idx].planningUnitQty)}
//                                     </td>
//                                   </tr>)

//                               }
//                             </tbody>
//                           </Table>

//                         </div>
//                       }

//                     </div>
//                   </div>
//                 </div>
//               </Col>

//             </div>

//           </CardBody>
//         </Card>

//       </div>
//     );
//   }
// }

// export default GlobalConsumption;

// --------------------------------------------------------------------------

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
import Select from 'react-select';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import paginationFactory from 'react-bootstrap-table2-paginator'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui-pro/dist/js/coreui-utilities'
import i18n from '../../i18n'
import Pdf from "react-to-pdf"
import AuthenticationService from '../Common/AuthenticationService.js';
import RealmService from '../../api/RealmService';
import getLabelText from '../../CommonComponent/getLabelText';
import PlanningUnitService from '../../api/PlanningUnitService';
import ProductService from '../../api/ProductService';
import Picker from 'react-month-picker'
import MonthBox from '../../CommonComponent/MonthBox.js'
import RealmCountryService from '../../api/RealmCountryService';
import CryptoJS from 'crypto-js'
import { SECRET_KEY } from '../../Constants.js'
import moment from "moment";
import { getDatabase } from "../../CommonComponent/IndexedDbFunctions";
import pdfIcon from '../../assets/img/pdf.png';
import csvicon from '../../assets/img/csv.png'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import { LOGO } from '../../CommonComponent/Logo.js'
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReportService from '../../api/ReportService';
import ProgramService from '../../api/ProgramService';
import 'chartjs-plugin-annotation';
import AuthenticationServiceComponent from '../Common/AuthenticationServiceComponent';
// const { getToggledOptions } = utils;
const Widget04 = lazy(() => import('../../views/Widgets/Widget04'));
// const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));
const ref = React.createRef();

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')
const pickerLang = {
  months: [i18n.t('static.month.jan'), i18n.t('static.month.feb'), i18n.t('static.month.mar'), i18n.t('static.month.apr'), i18n.t('static.month.may'), i18n.t('static.month.jun'), i18n.t('static.month.jul'), i18n.t('static.month.aug'), i18n.t('static.month.sep'), i18n.t('static.month.oct'), i18n.t('static.month.nov'), i18n.t('static.month.dec')],
  from: 'From', to: 'To',
}
let dendoLabels = [{ label: "Today", pointStyle: "triangle" }]
const options = {
  title: {
    display: true,
    // text: i18n.t('static.dashboard.globalconsumption'),
    fontColor: 'black'
  },
  scales: {
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Consumption Qty ( Million )',
        fontColor: 'black'
      },
      stacked: true,
      ticks: {
        beginAtZero: true,
        fontColor: 'black'
      }
    }],
    xAxes: [{
      ticks: {
        fontColor: 'black',

      }
    }]
  },
  annotation: {
    annotations: [{
      type: 'triangle',
      //  mode: 'vertical',
      drawTime: 'beforeDatasetsDraw',
      scaleID: 'x-axis-0',
      value: 'Mar-2020',

      backgroundColor: 'rgba(0, 255, 0, 0.1)'
    }],

  },
  tooltips: {
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



class GlobalConsumption extends Component {
  constructor(props) {
    super(props);

    this.toggledata = this.toggledata.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      lang: localStorage.getItem('lang'),
      countrys: [],
      planningUnits: [],
      consumptions: [],
      productCategories: [],
      countryValues: [],
      countryLabels: [],
      planningUnitValues: [],
      planningUnitLabels: [],
      programValues: [],
      programLabels: [],
      programs: [],
      realmList: [],
      message: '',
      rangeValue: { from: { year: new Date().getFullYear() - 1, month: new Date().getMonth() + 1 }, to: { year: new Date().getFullYear(), month: new Date().getMonth() + 1 } },



    };
    this.getCountrys = this.getCountrys.bind(this);
    this.filterData = this.filterData.bind(this);
    this._handleClickRangeBox = this._handleClickRangeBox.bind(this)
    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.handleRangeDissmis = this.handleRangeDissmis.bind(this);
    this.getPlanningUnit = this.getPlanningUnit.bind(this);
    // this.getProductCategories = this.getProductCategories.bind(this)
    this.getPrograms = this.getPrograms.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getRandomColor = this.getRandomColor.bind(this)
    this.handleChangeProgram = this.handleChangeProgram.bind(this)
    this.handlePlanningUnitChange = this.handlePlanningUnitChange.bind(this)
    this.hideDiv = this.hideDiv.bind(this)
    this.handleDisplayChange = this.handleDisplayChange.bind(this)

  }

  makeText = m => {
    if (m && m.year && m.month) return (pickerLang.months[m.month - 1] + '. ' + m.year)
    return '?'
  }

  exportCSV() {

    var csvRow = [];
    csvRow.push((i18n.t('static.report.dateRange') + ' , ' + this.makeText(this.state.rangeValue.from) + ' ~ ' + this.makeText(this.state.rangeValue.to)).replaceAll(' ', '%20'))
    this.state.countryLabels.map(ele =>
      csvRow.push(i18n.t('static.dashboard.country') + ' , ' + ((ele.toString()).replaceAll(',', '%20')).replaceAll(' ', '%20')))
    this.state.programLabels.map(ele =>
      csvRow.push(i18n.t('static.program.program') + ' , ' + ((ele.toString()).replaceAll(',', '%20')).replaceAll(' ', '%20')))
    // csvRow.push((i18n.t('static.dashboard.productcategory')).replaceAll(' ', '%20') + ' , ' + ((document.getElementById("productCategoryId").selectedOptions[0].text).replaceAll(',', '%20')).replaceAll(' ', '%20'))
    this.state.planningUnitLabels.map(ele =>
      csvRow.push((i18n.t('static.planningunit.planningunit')).replaceAll(' ', '%20') + ' , ' + ((ele.toString()).replaceAll(',', '%20')).replaceAll(' ', '%20')))
    csvRow.push('')
    csvRow.push('')
    csvRow.push((i18n.t('static.common.youdatastart')).replaceAll(' ', '%20'))
    csvRow.push('')
    var re;

    var A = [[(i18n.t('static.dashboard.country')).replaceAll(' ', '%20'), (i18n.t('static.report.month')).replaceAll(' ', '%20'), (i18n.t('static.consumption.consumptionqty')).replaceAll(' ', '%20')]]

    re = this.state.consumptions

    for (var item = 0; item < re.length; item++) {
      A.push([[getLabelText(re[item].realmCountry.label), re[item].consumptionDateString, re[item].planningUnitQty]])
    }
    for (var i = 0; i < A.length; i++) {
      csvRow.push(A[i].join(","))
    }
    var csvString = csvRow.join("%0A")
    var a = document.createElement("a")
    a.href = 'data:attachment/csv,' + csvString
    a.target = "_Blank"
    a.download = i18n.t('static.dashboard.globalconsumption') + this.makeText(this.state.rangeValue.from) + ' ~ ' + this.makeText(this.state.rangeValue.to) + ".csv"
    document.body.appendChild(a)
    a.click()
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



  exportPDF = () => {
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
        doc.text('Copyright © 2020 Quantification Analytics Tool', doc.internal.pageSize.width * 6 / 7, doc.internal.pageSize.height - 30, {
          align: 'center'
        })


      }
    }
    const addHeaders = doc => {

      const pageCount = doc.internal.getNumberOfPages()


      //  var file = new File('QAT-logo.png','../../../assets/img/QAT-logo.png');
      // var reader = new FileReader();

      //var data='';
      // Use fs.readFile() method to read the file 
      //fs.readFile('../../assets/img/logo.svg', 'utf8', function(err, data){ 
      //}); 
      for (var i = 1; i <= pageCount; i++) {
        doc.setFontSize(12)
        doc.setFont('helvetica', 'bold')
        doc.setPage(i)
        doc.addImage(LOGO, 'png', 0, 10, 180, 50, 'FAST');
        /*doc.addImage(data, 10, 30, {
          align: 'justify'
        });*/
        doc.setTextColor("#002f6c");
        doc.text(i18n.t('static.dashboard.globalconsumption'), doc.internal.pageSize.width / 2, 60, {
          align: 'center'
        })
        if (i == 1) {
          doc.setFont('helvetica', 'normal')
          doc.setFontSize(8)
          doc.text(i18n.t('static.report.dateRange') + ' : ' + this.makeText(this.state.rangeValue.from) + ' ~ ' + this.makeText(this.state.rangeValue.to), doc.internal.pageSize.width / 8, 90, {
            align: 'left'
          })
          var planningText = doc.splitTextToSize(i18n.t('static.dashboard.country') + ' : ' + this.state.countryLabels.toString(), doc.internal.pageSize.width * 3 / 4);
          doc.text(doc.internal.pageSize.width / 8, 110, planningText)

          planningText = doc.splitTextToSize(i18n.t('static.program.program') + ' : ' + this.state.programLabels.toString(), doc.internal.pageSize.width * 3 / 4);
          doc.text(doc.internal.pageSize.width / 8, 130, planningText)

          // doc.text(i18n.t('static.dashboard.productcategory') + ' : ' + document.getElementById("productCategoryId").selectedOptions[0].text, doc.internal.pageSize.width / 8, this.state.programLabels.size > 2 ? 170 : 150, {
          //   align: 'left'
          // })

          planningText = doc.splitTextToSize((i18n.t('static.planningunit.planningunit') + ' : ' + this.state.planningUnitLabels.join('; ')), doc.internal.pageSize.width * 3 / 4);
          doc.text(doc.internal.pageSize.width / 8, this.state.programLabels.size > 2 ? 190 : 150, planningText)
        }

      }
    }
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const marginLeft = 10;
    const doc = new jsPDF(orientation, unit, size, true);

    doc.setFontSize(10);

    const title = "Consumption Report";
    var canvas = document.getElementById("cool-canvas");
    //creates image

    var canvasImg = canvas.toDataURL("image/png", 1.0);
    var width = doc.internal.pageSize.width;
    var height = doc.internal.pageSize.height;
    var h1 = 50;
    var aspectwidth1 = (width - h1);

    doc.addImage(canvasImg, 'png', 50, 220, 750, 260, 'CANVAS');

    const headers = [[i18n.t('static.dashboard.country'), i18n.t('static.report.month'), i18n.t('static.consumption.consumptionqty')]]
    const data = this.state.consumptions.map(elt => [getLabelText(elt.realmCountry.label, this.state.lang), elt.consumptionDateString, this.formatter(elt.planningUnitQty)]);

    let content = {
      margin: { top: 80 },
      startY: height,
      head: headers,
      body: data,
      styles: { lineWidth: 1, fontSize: 8, halign: 'center' }

    };


    //doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    addHeaders(doc)
    addFooters(doc)
    doc.save("GlobalConsumption.pdf")
    //creates PDF from img
    /*  var doc = new jsPDF('landscape');
      doc.setFontSize(20);
      doc.text(15, 15, "Cool Chart");
      doc.save('canvas.pdf');*/
  }

  handleChange(countrysId) {

    this.setState({
      countryValues: countrysId.map(ele => ele.value),
      countryLabels: countrysId.map(ele => ele.label)
    }, () => {

      this.filterData(this.state.rangeValue)
    })
  }
  handleChangeProgram(programIds) {

    this.setState({
      programValues: programIds.map(ele => ele.value),
      programLabels: programIds.map(ele => ele.label)
    }, () => {

      this.filterData(this.state.rangeValue)
      this.getPlanningUnit();
    })

  }

  handlePlanningUnitChange(planningUnitIds) {

    this.setState({
      planningUnitValues: planningUnitIds.map(ele => ele.value),
      planningUnitLabels: planningUnitIds.map(ele => ele.label)
    }, () => {

      this.filterData(this.state.rangeValue)
    })
  }

  handleDisplayChange() {
    this.filterData(this.state.rangeValue)
  }

  hideDiv() {
    setTimeout(function () {
      var theSelect = document.getElementById('planningUnitId').length;

      // console.log("INHIDEDIV------------------------------------------------------", theSelect);

    }, 9000);

  }


  filterData(rangeValue) {

    setTimeout('', 10000);
    // let productCategoryId = document.getElementById("productCategoryId").value;
    let CountryIds = this.state.countryValues;
    let planningUnitIds = this.state.planningUnitValues;
    let programIds = this.state.programValues;
    let viewById = document.getElementById("viewById").value;
    let realmId = document.getElementById('realmId').value;
    console.log("realmId--------->", realmId);
    let startDate = rangeValue.from.year + '-' + rangeValue.from.month + '-01';
    let stopDate = rangeValue.to.year + '-' + rangeValue.to.month + '-' + new Date(rangeValue.to.year, rangeValue.to.month, 0).getDate();
    if (realmId > 0 && CountryIds.length > 0 && planningUnitIds.length > 0 && programIds.length > 0) {
      // let realmId = AuthenticationService.getRealmId();
      var inputjson = {
        "realmId": realmId,
        "realmCountryIds": CountryIds,
        "programIds": programIds,
        "planningUnitIds": planningUnitIds,
        "startDate": startDate,
        "stopDate": stopDate,
        "reportView": viewById
      }
      console.log('inputJSON***' + inputjson)

      ReportService.getGlobalConsumptiondata(inputjson)
        .then(response => {
          console.log("RESP--->", response.data);
          let tempConsumptionData = response.data;
          var consumptions = [];

          for (var i = 0; i < tempConsumptionData.length; i++) {
            let countryConsumption = Object.values(tempConsumptionData[i].countryConsumption);
            for (var j = 0; j < countryConsumption.length; j++) {
              let json = {
                "realmCountry": countryConsumption[j].country,
                "consumptionDate": tempConsumptionData[i].transDate,
                "planningUnitQty": countryConsumption[j].forecastedConsumption + countryConsumption[j].actualConsumption,
                "consumptionDateString": moment(tempConsumptionData[i].transDate, 'YYYY-MM-dd').format('MMM YYYY')
              }
              console.log("json--->", json);
              consumptions.push(json);
            }

          }

          console.log("consumptions--->", consumptions);

          this.setState({
            // consumptions: [

            //   {
            //     "realmCountry": {
            //       "id": 2,
            //       "label": {
            //         "active": false,
            //         "labelId": 343,
            //         "label_en": "Kenya",
            //         "label_sp": "",
            //         "label_fr": "",
            //         "label_pr": ""
            //       },
            //       "code": "KEN"
            //     },
            //     "consumptionDate": "2019-07-01",
            //     "planningUnitQty": 40,
            //     "forecastingUnitQty": 10,
            //     "consumptionDateString": "Jul-2019"
            //   },
            //   {
            //     "realmCountry": {
            //       "id": 2,
            //       "label": {
            //         "active": false,
            //         "labelId": 343,
            //         "label_en": "Kenya",
            //         "label_sp": "",
            //         "label_fr": "",
            //         "label_pr": ""
            //       },
            //       "code": "KEN"
            //     },
            //     "consumptionDate": "2019-08-01",
            //     "planningUnitQty": 50,
            //     "forecastingUnitQty": 0,
            //     "consumptionDateString": "Aug-2019"
            //   },
            //   {
            //     "realmCountry": {
            //       "id": 2,
            //       "label": {
            //         "active": false,
            //         "labelId": 343,
            //         "label_en": "Malawi",
            //         "label_sp": "",
            //         "label_fr": "",
            //         "label_pr": ""
            //       },
            //       "code": "MWI"
            //     },
            //     "consumptionDate": "2019-07-01",
            //     "planningUnitQty": 10,
            //     "forecastingUnitQty": 0,
            //     "consumptionDateString": "Jul-2019"
            //   },
            //   {
            //     "realmCountry": {
            //       "id": 2,
            //       "label": {
            //         "active": false,
            //         "labelId": 343,
            //         "label_en": "Malawi",
            //         "label_sp": "",
            //         "label_fr": "",
            //         "label_pr": ""
            //       },
            //       "code": "MWI"
            //     },
            //     "consumptionDate": "2019-08-01",
            //     "planningUnitQty": 20,
            //     "forecastingUnitQty": 0,
            //     "consumptionDateString": "Aug-2019"
            //   },
            // ],
            consumptions: consumptions,
            message: ''
          }, () => {

          });
        })
    } else if (realmId <= 0) {
      this.setState({ message: i18n.t('static.common.realmtext'), consumptions: [] });

    } else if (CountryIds.length == 0) {
      this.setState({ message: i18n.t('static.program.validcountrytext'), consumptions: [] });

    } else if (programIds.length == 0) {
      this.setState({ message: i18n.t('static.common.selectProgram'), consumptions: [] });

    } else {
      this.setState({ message: i18n.t('static.procurementUnit.validPlanningUnitText'), consumptions: [] });

    }
  }

  getCountrys() {
    if (navigator.onLine) {

      // let realmId = AuthenticationService.getRealmId();
      let realmId = document.getElementById('realmId').value
      RealmCountryService.getRealmCountryrealmIdById(realmId)
        .then(response => {
          this.setState({
            countrys: response.data
          })
        }).catch(
          error => {
            this.setState({
              countrys: []
            })
            if (error.message === "Network Error") {
              this.setState({ message: error.message });
            } else {
              switch (error.response ? error.response.status : "") {
                case 500:
                case 401:
                case 404:
                case 406:
                case 412:
                default:
                  this.setState({ message: i18n.t(error.response.data.messageCode, { entityname: i18n.t('static.dashboard.Country') }) });
                  break;
                  this.setState({ message: 'static.unkownError' });
                  break;
              }
            }
          }
        );

    } else {
      const lan = 'en';
      var db1;
      getDatabase();
      var openRequest = indexedDB.open('fasp', 1);
      openRequest.onsuccess = function (e) {
        db1 = e.target.result;
        var transaction = db1.transaction(['CountryData'], 'readwrite');
        var Country = transaction.objectStore('CountryData');
        var getRequest = Country.getAll();
        var proList = []
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
              var bytes = CryptoJS.AES.decrypt(myResult[i].CountryName, SECRET_KEY);
              var CountryNameLabel = bytes.toString(CryptoJS.enc.Utf8);
              var CountryJson = {
                name: getLabelText(JSON.parse(CountryNameLabel), lan) + "~v" + myResult[i].version,
                id: myResult[i].id
              }
              proList[i] = CountryJson
            }
          }
          this.setState({
            countrys: proList
          })

        }.bind(this);

      }

    }
    this.filterData(this.state.rangeValue);
  }

  getPlanningUnit() {
    if (navigator.onLine) {
      console.log('changed')

      // let productCategoryId = document.getElementById("productCategoryId").value;
      // if (productCategoryId != -1) {
      // PlanningUnitService.getPlanningUnitByProductCategoryId(productCategoryId).then(response => {
      //     this.setState({
      //       planningUnits: response.data,
      //     })
      //   })
      //     .catch(
      //       error => {
      //         this.setState({
      //           planningUnits: [],
      //         })
      //         if (error.message === "Network Error") {
      //           this.setState({ message: error.message });
      //         } else {
      //           switch (error.response ? error.response.status : "") {
      //             case 500:
      //             case 401:
      //             case 404:
      //             case 406:
      //             case 412:
      //               //  this.setState({ message: error.response.data.messageCode });
      //               break;
      //             default:
      //               this.setState({ message: 'static.unkownError' });
      //               break;
      //           }
      //         }
      //       }
      //     );
      // }
      let programValues = this.state.programValues;
      // console.log("programValues----->", programValues);
      if (programValues.length > 0) {
        PlanningUnitService.getPlanningUnitByProgramIds(programValues)
          .then(response => {
            console.log("getPlanningUnitByProgramIds---", response.data);
            this.setState({
              planningUnits: response.data,
            })
          })
      }

    } else {
      const lan = 'en';
      var db1;
      var storeOS;
      getDatabase();
      var openRequest = indexedDB.open('fasp', 1);
      openRequest.onsuccess = function (e) {
        db1 = e.target.result;
        var planningunitTransaction = db1.transaction(['CountryPlanningUnit'], 'readwrite');
        var planningunitOs = planningunitTransaction.objectStore('CountryPlanningUnit');
        var planningunitRequest = planningunitOs.getAll();
        var planningList = []
        planningunitRequest.onerror = function (event) {
          // Handle errors!
        };
        planningunitRequest.onsuccess = function (e) {
          var myResult = [];
          myResult = planningunitRequest.result;
          var CountryId = (document.getElementById("CountryId").value).split("_")[0];
          var proList = []
          for (var i = 0; i < myResult.length; i++) {
            if (myResult[i].Country.id == CountryId) {
              var productJson = {
                name: getLabelText(myResult[i].planningUnit.label, lan),
                id: myResult[i].planningUnit.id
              }
              proList[i] = productJson
            }
          }
          this.setState({
            planningUnitList: proList
          })
        }.bind(this);
      }.bind(this)

    }

  }

  getPrograms() {

    let realmId = AuthenticationService.getRealmId();
    ProgramService.getProgramByRealmId(realmId)
      .then(response => {
        console.log(JSON.stringify(response.data))
        this.setState({
          programs: response.data
        })
      }).catch(
        error => {
          this.setState({
            programs: []
          })
          if (error.message === "Network Error") {
            this.setState({ message: error.message });
          } else {
            switch (error.response ? error.response.status : "") {
              case 500:
              case 401:
              case 404:
              case 406:
              case 412:
                this.setState({ message: i18n.t(error.response.data.messageCode, { entityname: i18n.t('static.dashboard.program') }) });
                break;
              default:
                this.setState({ message: 'static.unkownError' });
                break;
            }
          }
        }
      );
  }

  // getProductCategories() {

  //   let realmId = AuthenticationService.getRealmId();
  //   ProductService.getProductCategoryList(realmId)
  //     .then(response => {
  //       console.log(response.data)
  //       this.setState({
  //         productCategories: response.data
  //       })
  //     }).catch(
  //       error => {
  //         this.setState({
  //           productCategories: []
  //         })
  //         if (error.message === "Network Error") {
  //           this.setState({ message: error.message });
  //         } else {
  //           switch (error.response ? error.response.status : "") {
  //             case 500:
  //             case 401:
  //             case 404:
  //             case 406:
  //             case 412:
  //               this.setState({ message: i18n.t(error.response.data.messageCode, { entityname: i18n.t('static.dashboard.productcategory') }) });
  //               break;
  //             default:
  //               this.setState({ message: 'static.unkownError' });
  //               break;
  //           }
  //         }
  //       }
  //     );
  //   this.getPlanningUnit();
  // }

  componentDidMount() {

    this.getPrograms()
    // this.getCountrys();
    this.getRelamList();
    // this.getProductCategories()
  }

  getRelamList = () => {
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
        }
      }).catch(
        error => {
          if (error.message === "Network Error") {
            this.setState({ message: error.message });
          } else {
            switch (error.response.status) {
              case 500:
              case 401:
              case 404:
              case 406:
              case 412:
                this.setState({ message: error.response.data.messageCode });
                break;
              default:
                this.setState({ message: 'static.unkownError' });
                console.log("Error code unkown");
                break;
            }
          }
        }
      );
  }

  toggledata = () => this.setState((currentState) => ({ show: !currentState.show }));

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  show() {
  }
  handleRangeChange(value, text, listIndex) {
    //
  }
  handleRangeDissmis(value) {
    this.setState({ rangeValue: value })
    this.filterData(value);
  }

  _handleClickRangeBox(e) {
    this.refs.pickRange.show()
  }
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  render() {
    const { planningUnits } = this.state;
    let planningUnitList = [];
    planningUnitList = planningUnits.length > 0
      && planningUnits.map((item, i) => {
        return (

          { label: getLabelText(item.label, this.state.lang), value: item.id }

        )
      }, this);
    const { programs } = this.state;
    let programList = [];
    programList = programs.length > 0
      && programs.map((item, i) => {
        return (

          { label: getLabelText(item.label, this.state.lang), value: item.programId }

        )
      }, this);

    const { countrys } = this.state;
    let countryList = countrys.length > 0 && countrys.map((item, i) => {
      return ({ label: getLabelText(item.country.label, this.state.lang), value: item.realmCountryId })
    }, this);

    const { realmList } = this.state;
    let realms = realmList.length > 0
      && realmList.map((item, i) => {
        return (
          <option key={i} value={item.realmId}>
            {getLabelText(item.label, this.state.lang)}
          </option>
        )
      }, this);

    // const { productCategories } = this.state;
    // let productCategoryList = productCategories.length > 0
    //   && productCategories.map((item, i) => {
    //     return (
    //       <option key={i} value={item.payload.productCategoryId}>
    //         {getLabelText(item.payload.label, this.state.lang)}
    //       </option>
    //     )
    //   }, this);

    const backgroundColor = [
      '#002f6c',
      '#118b70',
      '#EDB944',
      '#20a8d8',
      '#d1e3f5',
    ]

    // let country = [...new Set(this.state.consumptions.map(ele => (getLabelText(ele.realmCountry.label, this.state.lang))))];
    // let localConsumptionList = this.state.consumptions;
    // let localCountryList = [];
    // for (var i = 0; i < country.length; i++) {
    //   let countSum = 0;
    //   for (var j = 0; j < localConsumptionList.length; j++) {
    //     if (country[i].localeCompare(getLabelText(localConsumptionList[j].realmCountry.label, this.state.lang))) {
    //       countSum = countSum + localConsumptionList[j].planningUnitQty;
    //     }
    //   }
    //   let json = {
    //     country: country[i],
    //     sum: countSum
    //   }
    //   localCountryList.push(json);
    // }
    // // console.log("localCountryList BEFORE------", localCountryList);

    // // localCountryList = localCountryList.sort((a, b) => parseFloat(b.sum) - parseFloat(a.sum));
    // localCountryList = localCountryList.sort((a, b) => parseFloat(a.sum) - parseFloat(b.sum));
    // // console.log("localCountryList AFTER------", localCountryList);

    // let consumptiondata = [];
    // let data = [];
    // let dateArray = [...new Set(this.state.consumptions.map(ele => (ele.consumptionDateString)))]
    // for (var i = 0; i < localCountryList.length; i++) {
    //   data = this.state.consumptions.filter(c => localCountryList[i].country.localeCompare(getLabelText(c.realmCountry.label, this.state.lang)) == 0).map(ele => (ele.planningUnitQty))
    //   console.log("CONSUMPTIONLIST(i)----->", i, "-------", data);
    //   consumptiondata.push(data)
    // }

    let localCountryList = [...new Set(this.state.consumptions.map(ele => (getLabelText(ele.realmCountry.label, this.state.lang))))];

    let consumptionSummerydata = [];
    let data = [];
    var mainData = this.state.consumptions;
    mainData = mainData.sort(function (a, b) {
      return new Date(a.consumptionDate) - new Date(b.consumptionDate);
    });
    let dateArray = [...new Set(mainData.map(ele => (moment(ele.consumptionDate, 'YYYY-MM-dd').format('MM-YYYY'))))]

    for (var i = 0; i < localCountryList.length; i++) {//country
      let tempdata = [];
      for (var j = 0; j < dateArray.length; j++) {//date

        let result1 = mainData.filter(c => (localCountryList[i].localeCompare(getLabelText(c.realmCountry.label, this.state.lang))) == 0).map(ele => ele);

        let result = result1.filter(c => (moment(dateArray[j], 'MM-YYYY').isSame(moment(moment(c.consumptionDate, 'YYYY-MM-dd').format('MM-YYYY'), 'MM-YYYY'))) != 0).map(ele => ele);

        let hold = 0
        for (var k = 0; k < result.length; k++) {
          hold = result[k].planningUnitQty;
        }

        tempdata.push(hold);

      }

      consumptionSummerydata.push(tempdata);

    }
    console.log("consumptionSummerydata---", consumptionSummerydata);

    const bar = {
      labels: [...new Set(this.state.consumptions.map(ele => (ele.consumptionDateString)))],
      datasets: consumptionSummerydata.map((item, index) => ({ stack: 1, label: localCountryList[index], data: item, backgroundColor: backgroundColor[index] })),
    };

    // const bar = {

    //   labels: [...new Set(this.state.consumptions.map(ele => (ele.consumptionDateString)))],
    //   datasets: consumptiondata.map((item, index) => ({ stack: 1, label: country[index], data: item, backgroundColor: backgroundColor[index] }))

    // };
    const pickerLang = {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      from: 'From', to: 'To',
    }
    const { rangeValue } = this.state

    const makeText = m => {
      if (m && m.year && m.month) return (pickerLang.months[m.month - 1] + '. ' + m.year)
      return '?'
    }

    return (
      <div className="animated fadeIn" >
        <AuthenticationServiceComponent history={this.props.history} message={(message) => {
          this.setState({ message: message })
        }} />
        <h6 className="mt-success">{i18n.t(this.props.match.params.message)}</h6>
        <h5 className="red">{i18n.t(this.state.message)}</h5>

        <Card>
          <div className="Card-header-reporticon">
            {/* <i className="icon-menu"></i><strong>{i18n.t('static.dashboard.globalconsumption')}</strong> */}
            {this.state.consumptions.length > 0 && <div className="card-header-actions">
              <a className="card-header-action">
                <img style={{ height: '25px', width: '25px', cursor: 'pointer' }} src={pdfIcon} title="Export PDF" onClick={() => this.exportPDF()} />
                <img style={{ height: '25px', width: '25px', cursor: 'pointer' }} src={csvicon} title={i18n.t('static.report.exportCsv')} onClick={() => this.exportCSV()} />

              </a>
            </div>}
          </div>

          <CardBody className="pb-lg-2 pt-lg-0">

            <div ref={ref}>

              <Form >
                <Col md="12 pl-0">
                  <div className="row">
                    <FormGroup className="col-md-3">
                      <Label htmlFor="appendedInputButton">{i18n.t('static.report.dateRange')}<span className="stock-box-icon  fa fa-sort-desc ml-1"></span></Label>
                      <div className="controls edit">

                        <Picker
                          ref="pickRange"
                          years={{ min: 2013 }}
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
                      <Label htmlFor="select">{i18n.t('static.program.realm')}</Label>
                      <div className="controls ">
                        <InputGroup>
                          <Input
                            bsSize="sm"
                            // onChange={(e) => { this.dataChange(e) }}
                            type="select" name="realmId" id="realmId"
                            onChange={(e) => { this.getCountrys(); }}
                          >
                            <option value="">{i18n.t('static.common.select')}</option>
                            {realms}
                          </Input>

                        </InputGroup>
                      </div>
                    </FormGroup>

                    <FormGroup className="col-md-3">
                      <Label htmlFor="countrysId">{i18n.t('static.program.realmcountry')}</Label>
                      <span className="reportdown-box-icon  fa fa-sort-desc ml-1"></span>
                      <InputGroup className="box">
                        <div className="controls edit">
                          <ReactMultiSelectCheckboxes

                            bsSize="sm"
                            name="countrysId"
                            id="countrysId"
                            onChange={(e) => { this.handleChange(e) }}
                            options={countryList && countryList.length > 0 ? countryList : []}
                          />
                          {!!this.props.error &&
                            this.props.touched && (
                              <div style={{ color: 'red', marginTop: '.5rem' }}>{this.props.error}</div>
                            )}
                        </div>
                      </InputGroup>
                    </FormGroup>


                    <FormGroup className="col-md-3">
                      <Label htmlFor="programIds">{i18n.t('static.program.program')}</Label>
                      <span className="reportdown-box-icon  fa fa-sort-desc ml-1"></span>
                      <InputGroup className="box">
                        <ReactMultiSelectCheckboxes

                          bsSize="sm"
                          name="programIds"
                          id="programIds"
                          onChange={(e) => { this.handleChangeProgram(e) }}
                          options={programList && programList.length > 0 ? programList : []}
                        />
                        {!!this.props.error &&
                          this.props.touched && (
                            <div style={{ color: 'red', marginTop: '.5rem' }}>{this.props.error}</div>
                          )}
                      </InputGroup>
                    </FormGroup>

                    {/* <FormGroup className="col-md-3">
                      <Label htmlFor="appendedInputButton">{i18n.t('static.productcategory.productcategory')}</Label>
                      <div className="controls ">
                        <InputGroup>
                          <Input
                            type="select"
                            name="productCategoryId"
                            id="productCategoryId"
                            bsSize="sm"
                            onChange={this.getPlanningUnit}
                          >
                            <option value="-1">{i18n.t('static.common.select')}</option>
                            {productCategories.length > 0
                              && productCategories.map((item, i) => {
                                return (
                                  <option key={i} value={item.payload.productCategoryId} disabled={item.payload.active ? "" : "disabled"}>
                                    {Array(item.level).fill(' ').join('') + (getLabelText(item.payload.label, this.state.lang))}
                                  </option>
                                )
                              }, this)}
                          </Input>
                        </InputGroup>
                      </div>
                    </FormGroup> */}

                    <FormGroup className="col-sm-3" id="hideDiv">
                      <Label htmlFor="appendedInputButton">{i18n.t('static.planningunit.planningunit')}</Label>
                      <span className="reportdown-box-icon  fa fa-sort-desc ml-1"></span>
                      <div className="controls">
                        <InputGroup className="box">
                          <ReactMultiSelectCheckboxes
                            // isLoading={true}
                            name="planningUnitId"
                            id="planningUnitId"
                            bsSize="sm"
                            onChange={(e) => { this.handlePlanningUnitChange(e) }}
                            options={planningUnitList && planningUnitList.length > 0 ? planningUnitList : []}
                          />
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
                            onChange={this.handleDisplayChange}
                          >
                            <option value="1">{i18n.t('static.report.planningUnit')}</option>
                            <option value="2">{i18n.t('static.dashboard.forecastingunit')}</option>
                          </Input>
                        </InputGroup>
                      </div>
                    </FormGroup>

                  </div>
                </Col>
              </Form>
              <Col md="12 pl-0">
                <div className="globalviwe-scroll">
                  <div className="row">

                    {
                      this.state.consumptions.length > 0
                      &&
                      <div className="col-md-12 p-0 grapg-margin " >
                        <div className="offset-md-1 col-md-11">
                          <div className="chart-wrapper chart-graph-report">
                            <Bar id="cool-canvas" data={bar} options={options} />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <button className="mr-1 float-right btn btn-info btn-md showdatabtn" onClick={this.toggledata}>
                            {this.state.show ? 'Hide Data' : 'Show Data'}
                          </button>

                        </div>
                      </div>}

                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      {this.state.show && this.state.consumptions.length > 0 &&
                        <div className="table-responsive ">

                          <Table responsive className="table-striped  table-fixed table-hover table-bordered text-center mt-2">

                            <thead>
                              <tr>
                                <th className="text-center" style={{ width: '34%' }}> {i18n.t('static.dashboard.country')} </th>
                                <th className="text-center " style={{ width: '34%' }}> {i18n.t('static.report.month')} </th>
                                <th className="text-center" style={{ width: '34%' }}>Consumption Qty ( Million )</th>
                              </tr>
                            </thead>

                            <tbody>
                              {
                                this.state.consumptions.length > 0
                                &&
                                this.state.consumptions.map((item, idx) =>

                                  <tr id="addr0" key={idx} >

                                    <td>{getLabelText(this.state.consumptions[idx].realmCountry.label, this.state.lang)}</td>
                                    <td>

                                      {this.state.consumptions[idx].consumptionDateString}
                                    </td>
                                    <td >
                                      {this.formatter(this.state.consumptions[idx].planningUnitQty)}
                                    </td>
                                  </tr>)

                              }
                            </tbody>
                          </Table>

                        </div>
                      }

                    </div>
                  </div>
                </div>
              </Col>

            </div>

          </CardBody>
        </Card>

      </div>
    );
  }
}

export default GlobalConsumption;
