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
import RealmService from '../../api/RealmService';
import getLabelText from '../../CommonComponent/getLabelText';
import PlanningUnitService from '../../api/PlanningUnitService';
import ProductService from '../../api/ProductService';
import Picker from 'react-month-picker'
import MonthBox from '../../CommonComponent/MonthBox.js'
import ProgramService from '../../api/ProgramService';
import CryptoJS from 'crypto-js'
import { SECRET_KEY } from '../../Constants.js'
import moment from "moment";
import { getDatabase } from "../../CommonComponent/IndexedDbFunctions";
import pdfIcon from '../../assets/img/pdf.png';
import { Online, Offline } from "react-detect-offline";
import csvicon from '../../assets/img/csv.png'
import { LOGO }  from '../../CommonComponent/Logo.js'
import jsPDF from "jspdf";
import "jspdf-autotable";
import RealmCountryService from '../../api/RealmCountryService';
import ReportService from '../../api/ReportService';
//import fs from 'fs'
const Widget04 = lazy(() => import('../Widgets/Widget04'));
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


const options = {
  title: {
    display: true,
    text: i18n.t('static.report.forecasterrorovertime')
  },
  scales: {
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: i18n.t('static.report.errorperc')
        },
        ticks: { yValueFormatString: "$#####%",
        beginAtZero:true,
        Max:900,
          callback: function (value) {
            return value+"%";
        }}
      }
    ]
  },
  tooltips: { mode: 'index',
    callbacks: {
      label: function (tooltipItems, data) {
      
          return tooltipItems.yLabel + "%";
       }
    },
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend:{
    display: true,
    position: 'bottom',
    labels: {
      usePointStyle: true,
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




class ForcastMatrixOverTime extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      matricsList: [],
      dropdownOpen: false,
      radioSelected: 2,
      productCategories: [],
      planningUnits: [],
      categories: [],
      countries:[],
      show: false,
      rangeValue: { from: { year: new Date().getFullYear() - 1, month: new Date().getMonth() + 1 }, to: { year: new Date().getFullYear(), month: new Date().getMonth() + 1 } },



    };
    this.getCountrylist = this.getCountrylist.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this._handleClickRangeBox = this._handleClickRangeBox.bind(this)
    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.handleRangeDissmis = this.handleRangeDissmis.bind(this);
    this.getPlanningUnit = this.getPlanningUnit.bind(this);
    this.getProductCategories = this.getProductCategories.bind(this)
    //this.pickRange = React.createRef()

  }


 
   makeText = m => {
    if (m && m.year && m.month) return (pickerLang.months[m.month - 1] + '. ' + m.year)
    return '?'
  }

  toggledata = () => this.setState((currentState) => ({show: !currentState.show}));

  exportCSV() {

    var csvRow = [];
    csvRow.push((i18n.t('static.report.dateRange')+' : '+this.makeText(this.state.rangeValue.from) + ' ~ ' + this.makeText(this.state.rangeValue.to)).replaceAll(' ','%20'))
    csvRow.push(i18n.t('static.dashboard.country')+' : '+ (document.getElementById("countryId").selectedOptions[0].text).replaceAll(' ','%20'))
    csvRow.push(i18n.t('static.planningunit.planningunit')+' : '+ ((document.getElementById("planningUnitId").selectedOptions[0].text).replaceAll(',','%20')).replaceAll(' ','%20'))
    csvRow.push('')
    csvRow.push('')
    var re;
    var A = [[(i18n.t('static.report.month')).replaceAll(' ','%20'), (i18n.t('static.report.forecastConsumption')).replaceAll(' ','%20'), (i18n.t('static.report.actualConsumption')).replaceAll(' ','%20'), (i18n.t('static.report.errorperc')).replaceAll(' ','%20'), (i18n.t('static.report.noofmonth')).replaceAll(' ','%20')]]
   
      re = this.state.matricsList
   

    for (var item = 0; item < re.length; item++) {
      A.push([re[item].ACTUAL_DATE, re[item].FORECASTED_CONSUMPTION, re[item].ACTUAL_CONSUMPTION, re[item].FORECAST_ERROR*100, re[item].MONTHS_COUNT])
    }
    for (var i = 0; i < A.length; i++) {
      csvRow.push(A[i].join(","))
    }
    var csvString = csvRow.join("%0A")
    var a = document.createElement("a")
    a.href = 'data:attachment/csv,' + csvString
    a.target = "_Blank"
    a.download = i18n.t('static.report.forecasterrorovertime') +this.makeText(this.state.rangeValue.from) + ' ~ ' + this.makeText(this.state.rangeValue.to) + ".csv"
    document.body.appendChild(a)
    a.click()
  }
  

  exportPDF = () => {
    const addFooters = doc => {
      const pageCount = doc.internal.getNumberOfPages()
    
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      for (var i = 1; i <= pageCount; i++) {
        doc.setPage(i)
      
        doc.setPage(i)
        doc.text('Page ' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width / 9, doc.internal.pageSize.height-30, {
        align: 'center'
        })
        doc.text('Quantification Analytics Tool', doc.internal.pageSize.width *6/ 7, doc.internal.pageSize.height-30, {
        align: 'center'
        })
      
        
      }
    }
    const addHeaders = doc => {
      const pageCount = doc.internal.getNumberOfPages()
    
      doc.setFont('helvetica', 'bold')
     
      for (var i = 1; i <= pageCount; i++) {
        doc.setFontSize(18)
        doc.setPage(i)
        
        doc.addImage(LOGO,'png', 0, 10,180,50,'','FAST');

        doc.setTextColor("#002f6c");
        doc.text(i18n.t('static.report.forecasterrorovertime'), doc.internal.pageSize.width / 2, 60, {
          align: 'center'
        })
        if(i==1){
          doc.setFontSize(12)
          doc.text(i18n.t('static.report.dateRange')+' : '+this.makeText(this.state.rangeValue.from) + ' ~ ' + this.makeText(this.state.rangeValue.to), doc.internal.pageSize.width / 8, 90, {
            align: 'left'
          })
          doc.text(i18n.t('static.dashboard.country')+' : '+ document.getElementById("countryId").selectedOptions[0].text, doc.internal.pageSize.width / 8, 110, {
            align: 'left'
          })
          doc.text(i18n.t('static.planningunit.planningunit')+' : '+ document.getElementById("planningUnitId").selectedOptions[0].text, doc.internal.pageSize.width / 8, 130, {
            align: 'left'
          })
        }
       
      }
    }
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const marginLeft = 10;
    const doc = new jsPDF(orientation, unit, size,true);

    doc.setFontSize(15);

    var canvas = document.getElementById("cool-canvas");
    //creates image
    
    var canvasImg = canvas.toDataURL("image/png",1.0);
    var width = doc.internal.pageSize.width;    
    var height = doc.internal.pageSize.height;
    var h1=50;
    var aspectwidth1= (width-h1);

    doc.addImage(canvasImg, 'png', 50, 130,aspectwidth1, height*3/4,'','FAST' );
    const headers =[ [   i18n.t('static.report.month'),
    i18n.t('static.report.forecastConsumption'),i18n.t('static.report.actualConsumption'),i18n.t('static.report.errorperc'),i18n.t('static.report.noofmonth')]];
    const data =   this.state.matricsList.map( elt =>[ elt.ACTUAL_DATE,elt.FORECASTED_CONSUMPTION,elt.ACTUAL_CONSUMPTION,elt.FORECAST_ERROR*100,elt.MONTHS_COUNT]);
    
    let content = {
    margin: {top: 80},
    startY:  height,
    head: headers,
    body: data,
    
  };
  
   
   
    //doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    addHeaders(doc)
    addFooters(doc)
    doc.save("report.pdf")
    //creates PDF from img
  /*  var doc = new jsPDF('landscape');
    doc.setFontSize(20);
    doc.text(15, 15, "Cool Chart");
    doc.save('canvas.pdf');*/
  }



  fetchData() {
   let countryId = document.getElementById("countryId").value;
   let productCategoryId = document.getElementById("productCategoryId").value;
    let planningUnitId = document.getElementById("planningUnitId").value;
    if(countryId>0 && planningUnitId>0){
      AuthenticationService.setupAxiosInterceptors();
      ReportService.getForecastMatricsOverTime(countryId,planningUnitId, this.state.rangeValue.from.year + '-' + this.state.rangeValue.from.month + '-01', this.state.rangeValue.to.year + '-' + this.state.rangeValue.to.month + '-' + new Date(this.state.rangeValue.to.year, this.state.rangeValue.to.month + 1, 0).getDate())
        .then(response => {
          console.log(JSON.stringify(response.data));
          this.setState({
            matricsList : response.data,
            message:''
          })
        }).catch(
          error => {
            this.setState({
              matricsList: []
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
        );}
        else if(countryId==0){
          this.setState({ message: i18n.t('static.program.validcountrytext') });
                  
        }else if(productCategoryId==0){
          this.setState({ message: i18n.t('static.common.selectProductCategory') });
      
        }else{
          this.setState({ message: i18n.t('static.procurementUnit.validPlanningUnitText') });
     
        }
     /*   this.setState({
          matricsList: [{ACTUAL_DATE:"2019-04",errorperc:30},{ACTUAL_DATE:"2019-05",errorperc:50},{ACTUAL_DATE:"2019-06",errorperc:40},]
        })*/
        console.log('matrix list updated'+this.state.matricsList )
     }

 
  getPlanningUnit() {
   
      AuthenticationService.setupAxiosInterceptors();
      let productCategoryId = document.getElementById("productCategoryId").value;
      PlanningUnitService.getPlanningUnitByProductCategoryId(productCategoryId).then(response => {
        console.log('**' + JSON.stringify(response.data))
        this.setState({
          planningUnits: response.data,
        })
      })
        .catch(
          error => {
            this.setState({
              planningUnits: [],
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
                  this.setState({ message: error.response.data.messageCode });
                  break;
                default:
                  this.setState({ message: 'static.unkownError' });
                  break;
              }
            }
          }
        );
  this.fetchData();
  }
  getProductCategories() {
    AuthenticationService.setupAxiosInterceptors();
    let realmId =AuthenticationService.getRealmId();
    ProductService.getProductCategoryList(realmId)
        .then(response => {
          console.log(JSON.stringify(response.data))
          this.setState({
            productCategories: response.data
          })
        }).catch(
          error => {
            this.setState({
              productCategories: []
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
                  this.setState({ message: i18n.t(error.response.data.messageCode, { entityname: i18n.t('static.dashboard.productcategory') }) });
                  break;
                default:
                  this.setState({ message: 'static.unkownError' });
                  break;
              }
            }
          }
        );
    
  }

  getCountrylist() {
   
      AuthenticationService.setupAxiosInterceptors();
      let realmId = AuthenticationService.getRealmId();
      RealmCountryService.getRealmCountryrealmIdById(realmId)
        .then(response => {
          this.setState({
            countries: response.data
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
                  this.setState({ message: i18n.t(error.response.data.messageCode, { entityname: i18n.t('static.dashboard.Country') }) });
                  break;
                default:
                  this.setState({ message: 'static.unkownError' });
                  break;
              }
            }
          }
        );
       
    }
  componentDidMount() {
    AuthenticationService.setupAxiosInterceptors();
    this.getCountrylist();
     this.getProductCategories() 
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
    this.setState({ rangeValue: value })
this.fetchData();
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
          <option key={i} value={item.planningUnitId}>
            {getLabelText(item.label, this.state.lang)}
          </option>
        )
      }, this);
    const { countries } = this.state;
   // console.log(JSON.stringify(countrys))
   let countryList = countries.length > 0 && countries.map((item, i) => {
     console.log(JSON.stringify(item))
    return(
      <option key={i} value={item.realmCountryId}>
      {getLabelText(item.country.label, this.state.lang)}
  </option>
    
    )
  }, this);
      const { productCategories } = this.state;
      let productCategoryList = productCategories.length > 0
          && productCategories.map((item, i) => {
              return (
                <option key={i} value={item.payload.productCategoryId} disabled= {item.payload.active?"":"disabled"}>
                {Array(item.level).fill('_ _ ').join('')+(getLabelText(item.payload.label, this.state.lang))}
              </option>
              )
          }, this);
         

    
    const  bar = {
    
        labels: this.state.matricsList.map((item, index) => (item.ACTUAL_DATE)),
        datasets: [
           {
            type: "line",
            label: i18n.t('static.report.forecasterrorovertime'),
            backgroundColor: 'transparent',
            borderColor: 'rgba(179,181,158,1)',
            lineTension:0,
            showActualPercentages: true,
            showInLegend: true,
            pointStyle: 'line',
            yValueFormatString: "$#####%",
            
            data: this.state.matricsList.map((item, index) => (item.FORECAST_ERROR*100))
          }
        ],



      
    }
    const pickerLang = {
      months: [i18n.t('static.month.jan'), i18n.t('static.month.feb'), i18n.t('static.month.mar'), i18n.t('static.month.apr'), i18n.t('static.month.may'), i18n.t('static.month.jun'), i18n.t('static.month.jul'), i18n.t('static.month.aug'), i18n.t('static.month.sep'), i18n.t('static.month.oct'), i18n.t('static.month.nov'), i18n.t('static.month.dec')],
      from: 'From', to: 'To',
    }
    const { rangeValue } = this.state

    const makeText = m => {
      if (m && m.year && m.month) return (pickerLang.months[m.month - 1] + '. ' + m.year)
      return '?'
    }
   

    return (
      <div className="animated fadeIn" >
        <h6 className="mt-success">{i18n.t(this.props.match.params.message)}</h6>
        <h5>{i18n.t(this.state.message)}</h5>
        <Row>
          <Col lg="12">
            <Card>
              <CardHeader>
                <i className="icon-menu"></i><strong>{i18n.t('static.report.forecasterrorovertime')}</strong>
                
                  {
                    this.state.matricsList.length > 0 &&
                    <div className="card-header-actions">
                      <a className="card-header-action">
                      <img style={{ height: '25px', width: '25px',cursor:'pointer' }} src={pdfIcon} title="Export PDF"  onClick={() => this.exportPDF()}/>
                      <img style={{ height: '25px', width: '25px',cursor:'pointer' }} src={csvicon} title={i18n.t('static.report.exportCsv')} onClick={() => this.exportCSV()} />
                      </a> </div>
                  }
              
                </CardHeader>
              <CardBody>
                <div className="TableCust" >
                  <div className="container">
                     <div ref={ref}>
                        <div className="col-md-12" >
                    <Form >
                      <Col>
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
                              <Label htmlFor="appendedInputButton">{i18n.t('static.dashboard.country')}</Label>
                              <div className="controls ">
                                <InputGroup>
                                  <Input
                                    type="select"
                                    name="countryId"
                                    id="countryId"
                                    bsSize="sm"
                                    onChange={this.fetchData}

                                  >
                                    <option value="0">{i18n.t('static.common.select')}</option>
                                    {countryList}
                                  </Input>

                                </InputGroup>
                              </div>
                            </FormGroup>
                            <FormGroup className="col-md-3">
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
                                                    <option value="0">{i18n.t('static.common.select')}</option>
                                                    {productCategoryList}
                                                </Input>

                                            </InputGroup>
                                        </div>

                            </FormGroup>
                            <FormGroup className="col-md-3">
                              <Label htmlFor="appendedInputButton">{i18n.t('static.planningunit.planningunit')}</Label>
                              <div className="controls">
                                <InputGroup>
                                  <Input
                                    type="select"
                                    name="planningUnitId"
                                    id="planningUnitId"
                                    bsSize="sm"
                                    onChange={this.fetchData}
                                  >
                                    <option value="0">{i18n.t('static.common.select')}</option>
                                    {planningUnitList}
                                  </Input>
                                  {/* <InputGroupAddon addonType="append">
                                    <Button color="secondary Gobtn btn-sm" onClick={this.fetchData}>{i18n.t('static.common.go')}</Button>
                                  </InputGroupAddon> */}
                                </InputGroup>
                              </div>
                            </FormGroup>
                           </div>
                      </Col>
                    </Form>
                    <div className="row">
                      <div className="col-md-12">
                    {
                        this.state.matricsList.length > 0
                        &&
                        <div className="col-md-12">
                          <div className="col-md-9">
                        <div   className="chart-wrapper chart-graph">
                          <Bar id="cool-canvas" data={bar} options={options} />
                         </div>
                         </div>
                        <div className="col-md-12">
                        <button className="mr-1 float-right btn btn-info btn-md showdatabtn" onClick={this.toggledata}>
                          {this.state.show ? 'Hide Data' : 'Show Data'}
                        </button>

                      </div> </div>}
                         </div>
                         </div>
                         <div className="row">
                    <div className="col-md-12">
                      {this.state.show && this.state.matricsList.length > 0 &&
                       <Table responsive className="table-striped table-hover table-bordered text-center mt-2">

                        <thead>
                          <tr>
                            <th className="text-center"> {i18n.t('static.report.month')} </th>
                            <th className="text-center"> {i18n.t('static.report.forecastConsumption')} </th>
                            <th className="text-center">{i18n.t('static.report.actualConsumption')}</th>
                            <th className="text-center">{i18n.t('static.report.errorperc')}</th>
                            <th className="text-center">{i18n.t('static.report.noofmonth')}</th>
                          </tr>
                        </thead>
                       
                          <tbody>
                            {
                              this.state.matricsList.length > 0
                              &&
                              this.state.matricsList.map((item, idx) =>

                                <tr id="addr0" key={idx} >
                                
                                  <td>{this.state.matricsList[idx].ACTUAL_DATE}</td>
                                  <td>

                                    {this.state.matricsList[idx].FORECASTED_CONSUMPTION}
                                  </td>
                                  <td>
                                    {this.state.matricsList[idx].ACTUAL_CONSUMPTION}
                                  </td>
                                  <td>
                                    {this.state.matricsList[idx].FORECAST_ERROR*100+'%'}
                                  </td>
                                  <td>
                                    {this.state.matricsList[idx].MONTHS_COUNT}
                                  </td></tr>)

                            }
                          </tbody>
                 </Table>}

                   </div>
                   </div>
</div>
                 
                  </div>
                  
                  </div>
              </div></CardBody>
            </Card>
          </Col>
        </Row>


      </div>
    );
  }
}

export default ForcastMatrixOverTime;
