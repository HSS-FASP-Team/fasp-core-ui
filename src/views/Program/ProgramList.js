// import React, { Component } from "react";
// import { NavLink } from 'react-router-dom';
// import { Card, CardHeader, CardBody, FormGroup, Input, InputGroup, InputGroupAddon, Label, Button, Col } from 'reactstrap';
// import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
// import getLabelText from '../../CommonComponent/getLabelText';
// import programDate from './ProgramData';
// import ProgramService from "../../api/ProgramService";
// import AuthenticationService from '../Common/AuthenticationService.js';
// import i18n from '../../i18n';
// import CountryService from '../../api/CountryService.js';
// import BootstrapTable from 'react-bootstrap-table-next';
// import filterFactory, { textFilter, selectFilter, multiSelectFilter } from 'react-bootstrap-table2-filter';
// import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
// import paginationFactory from 'react-bootstrap-table2-paginator';
// import AuthenticationServiceComponent from '../Common/AuthenticationServiceComponent'

// const entityname = i18n.t('static.program.programMaster');
// export default class ProgramList extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       programlist: [],
//       lang: 'en',
//       message: '',
//       selProgram: [],
//       countryList: [],
//       lang: localStorage.getItem('lang'),
//       loading: true
//     }
//     this.editProgram = this.editProgram.bind(this);
//     this.addNewProgram = this.addNewProgram.bind(this);
//     this.buttonFormatter = this.buttonFormatter.bind(this);
//     this.addProductMapping = this.addProductMapping.bind(this);
//     this.filterData = this.filterData.bind(this);
//     this.formatLabel = this.formatLabel.bind(this);
//     this.hideFirstComponent = this.hideFirstComponent.bind(this);
//     this.hideSecondComponent = this.hideSecondComponent.bind(this);

//   }
//   hideFirstComponent() {
//     this.timeout = setTimeout(function () {
//       document.getElementById('div1').style.display = 'none';
//     }, 8000);
//   }
//   componentWillUnmount() {
//     clearTimeout(this.timeout);
//   }

//   hideSecondComponent() {
//     setTimeout(function () {
//       document.getElementById('div2').style.display = 'none';
//     }, 8000);
//   }


//   filterData() {
//     let countryId = document.getElementById("countryId").value;
//     if (countryId != 0) {
//       const selProgram = this.state.programList.filter(c => c.realmCountry.country.countryId == countryId)
//       this.setState({
//         selProgram: selProgram
//       });
//     } else {
//       this.setState({
//         selProgram: this.state.programList
//       });
//     }
//   }

//   editProgram(program) {
//     if (AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_EDIT_PROGRAM')) {
//       this.props.history.push({
//         pathname: `/program/editProgram/${program.programId}`,
//         // state: { program }
//       });
//     }
//   }
//   componentDidMount() {
//     console.log("props--------------------", this.props);
//     AuthenticationService.setupAxiosInterceptors();
//     this.hideFirstComponent();
//     ProgramService.getProgramList().then(response => {
//       if (response.status == 200) {
//         this.setState({
//           programList: response.data,
//           selProgram: response.data,
//           loading: false
//         })
//       } else {
//         this.setState({
//           message: response.data.messageCode
//         },
//           () => {
//             this.hideSecondComponent();
//           })
//       }
//     })

//     CountryService.getCountryListActive().then(response => {
//       if (response.status == 200) {
//         console.log("response--->", response.data);
//         this.setState({
//           countryList: response.data,
//         })
//       } else {
//         this.setState({ message: response.data.messageCode })
//       }
//     })

//   }

//   // showProgramLabel(cell, row) {
//   //   // console.log("========", cell);
//   //   return getLabelText(cell, this.state.lang);

//   // }
//   // showRealmLabel(cell, row) {
//   //   // console.log("========>",cell);
//   //   return getLabelText(cell.realm.label, this.state.lang);

//   // }
//   // showCountryLabel(cell, row) {
//   //   // console.log("========>",cell);
//   //   return getLabelText(cell.country.label, this.state.lang);

//   // }
//   // showOrganisationLabel(cell, row) {
//   //   // console.log("========>",cell);
//   //   return getLabelText(cell.label, this.state.lang);

//   // }
//   addNewProgram() {
//     this.props.history.push({
//       pathname: "/program/addProgram"
//     });
//   }
//   buttonFormatter(cell, row) {
//     // console.log("-----------", cell);
//     return <Button type="button" size="sm" color="success" onClick={(event) => this.addProductMapping(event, cell)} ><i className="fa fa-check"></i> Add</Button>;
//   }
//   addProductMapping(event, cell) {
//     if (AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_EDIT_PROGRAM')) {
//       event.stopPropagation();
//       this.props.history.push({
//         pathname: `/programProduct/addProgramProduct/${cell}`,
//       });
//     }
//   }

//   formatLabel(cell, row) {
//     return getLabelText(cell, this.state.lang);
//   }
//   render() {

//     const { SearchBar, ClearSearchButton } = Search;
//     const customTotal = (from, to, size) => (
//       <span className="react-bootstrap-table-pagination-total">
//         {i18n.t('static.common.result', { from, to, size })}
//       </span>
//     );
//     const { countryList } = this.state;
//     let countries = countryList.length > 0
//       && countryList.map((item, i) => {
//         return (
//           <option key={i} value={item.countryId}>
//             {getLabelText(item.label, this.state.lang)}
//           </option>
//         )
//       }, this);

//     const columns = [
//       {
//         dataField: 'label',
//         text: i18n.t('static.program.program'),
//         sort: true,
//         align: 'center',
//         headerAlign: 'center',
//         formatter: this.formatLabel
//       },
//       {
//         dataField: 'programCode',
//         text: i18n.t('static.program.programCode'),
//         sort: true,
//         align: 'center',
//         headerAlign: 'center',
//       },
//       {
//         dataField: 'realmCountry.realm.label',
//         text: i18n.t('static.program.realm'),
//         sort: true,
//         align: 'center',
//         headerAlign: 'center',
//         formatter: this.formatLabel
//       },
//       {
//         dataField: 'realmCountry.country.label',
//         text: i18n.t('static.program.realmcountry'),
//         sort: true,
//         align: 'center',
//         headerAlign: 'center',
//         formatter: this.formatLabel
//       },
//       {
//         dataField: 'organisation.label',
//         text: i18n.t('static.program.organisation'),
//         sort: true,
//         align: 'center',
//         headerAlign: 'center',
//         formatter: this.formatLabel
//       }
//       ,
//       {
//         dataField: 'programId',
//         text: i18n.t('static.program.mapPlanningUnit'),
//         sort: true,
//         align: 'center',
//         headerAlign: 'center',
//         formatter: this.buttonFormatter
//       }
//     ];
//     const options = {
//       hidePageListOnlyOnePage: true,
//       firstPageText: i18n.t('static.common.first'),
//       prePageText: i18n.t('static.common.back'),
//       nextPageText: i18n.t('static.common.next'),
//       lastPageText: i18n.t('static.common.last'),
//       nextPageTitle: i18n.t('static.common.firstPage'),
//       prePageTitle: i18n.t('static.common.prevPage'),
//       firstPageTitle: i18n.t('static.common.nextPage'),
//       lastPageTitle: i18n.t('static.common.lastPage'),
//       showTotal: true,
//       paginationTotalRenderer: customTotal,
//       disablePageTitle: true,
//       sizePerPageList: [{
//         text: '10', value: 10
//       }, {
//         text: '30', value: 30
//       }
//         ,
//       {
//         text: '50', value: 50
//       },
//       {
//         text: 'All', value: this.state.selProgram.length
//       }]
//     }
//     return (
//       <div className="animated">
//         <AuthenticationServiceComponent history={this.props.history} message={(message) => {
//           this.setState({ message: message })
//         }} />
//         <h5 className={this.props.match.params.color} id="div1">{i18n.t(this.props.match.params.message, { entityname })}</h5>
//         <h5 style={{ color: "red" }} id="div2">{i18n.t(this.state.message, { entityname })}</h5>
//         <Card style={{ display: this.state.loading ? "none" : "block" }}>
//           <div className="Card-header-addicon">
//             {/* <i className="icon-menu"></i><strong>{i18n.t('static.common.listEntity', { entityname })}</strong>{' '} */}
//             <div className="card-header-actions">
//               <div className="card-header-action">
//                 {AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_CREATE_A_PROGRAM') && <a href="javascript:void();" title={i18n.t('static.common.addEntity', { entityname })} onClick={this.addNewProgram}><i className="fa fa-plus-square"></i></a>}
//               </div>
//             </div>
//           </div>
//           <CardBody className="pb-lg-0">
//             <Col md="3 pl-0" >
//               <FormGroup className="Selectdiv">
//                 <Label htmlFor="appendedInputButton">{i18n.t('static.region.country')}</Label>

//                 <div className="controls SelectGo">
//                   <InputGroup>
//                     <Input
//                       type="select"
//                       name="countryId"
//                       id="countryId"
//                       bsSize="sm"
//                       onChange={this.filterData}
//                     >
//                       <option value="0">{i18n.t('static.common.all')}</option>
//                       {countries}
//                     </Input>
//                     {/* <InputGroupAddon addonType="append">
//                       <Button color="secondary Gobtn btn-sm" onClick={this.filterData}>{i18n.t('static.common.go')}</Button>
//                     </InputGroupAddon> */}
//                   </InputGroup>
//                 </div>
//               </FormGroup>
//             </Col>
//             {/* <BootstrapTable data={this.state.table} version="4" hover pagination search options={this.options}>
//               <TableHeaderColumn isKey dataField="programId" hidden >Program Id</TableHeaderColumn>
//               <TableHeaderColumn filterFormatted dataField="label" dataSort dataFormat={this.showProgramLabel} >{i18n.t('static.program.program')}</TableHeaderColumn>
//               <TableHeaderColumn filterFormatted dataField="realmCountry" dataSort dataFormat={this.showRealmLabel} >{i18n.t('static.program.realm')}</TableHeaderColumn>
//               <TableHeaderColumn filterFormatted dataField="realmCountry" dataSort dataFormat={this.showCountryLabel} >{i18n.t('static.program.realmcountry')}</TableHeaderColumn>
//               <TableHeaderColumn filterFormatted dataField="organisation" dataSort dataFormat={this.showOrganisationLabel} >{i18n.t('static.program.organisation')}</TableHeaderColumn>
//               <TableHeaderColumn dataField="airFreightPerc" dataSort >{i18n.t('static.program.airfreightperc')}</TableHeaderColumn>
//               <TableHeaderColumn dataField="seaFreightPerc" dataSort>{i18n.t('static.program.seafreightperc')}</TableHeaderColumn>
//               <TableHeaderColumn dataField="plannedToDraftLeadTime" dataSort>{i18n.t('static.program.draftleadtime')}</TableHeaderColumn>
//               <TableHeaderColumn dataField="draftToSubmittedLeadTime" dataSort>{i18n.t('static.program.drafttosubmitleadtime')}</TableHeaderColumn>
//               <TableHeaderColumn dataField="submittedToApprovedLeadTime" dataSort>{i18n.t('static.program.submittoapproveleadtime')}</TableHeaderColumn>
//               <TableHeaderColumn dataField="programId" dataFormat={this.buttonFormatter}>Map Product To Program</TableHeaderColumn>
//             </BootstrapTable> */}
//             <ToolkitProvider
//               keyField="programId"
//               data={this.state.selProgram}
//               columns={columns}
//               search={{ searchFormatted: true }}
//               hover
//               filter={filterFactory()}
//             >
//               {
//                 props => (
//                   <div className="TableCust">
//                     <div className="col-md-6 pr-0 offset-md-6 text-right mob-Left">
//                       <SearchBar {...props.searchProps} />
//                       <ClearSearchButton {...props.searchProps} />
//                     </div>
//                     <BootstrapTable hover striped noDataIndication={i18n.t('static.common.noData')} tabIndexCell
//                       pagination={paginationFactory(options)}
//                       rowEvents={{
//                         onClick: (e, row, rowIndex) => {
//                           this.editProgram(row);
//                         }
//                       }}
//                       {...props.baseProps}
//                     />
//                   </div>
//                 )
//               }
//             </ToolkitProvider>
//           </CardBody>
//         </Card>
//         <div style={{ display: this.state.loading ? "block" : "none" }}>
//           <div className="d-flex align-items-center justify-content-center" style={{ height: "500px" }} >
//             <div class="align-items-center">
//               <div ><h4> <strong>Loading...</strong></h4></div>

//               <div class="spinner-border blue ml-4" role="status">

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import { Card, CardHeader, CardBody, FormGroup, Input, InputGroup, InputGroupAddon, Label, Button, Col } from 'reactstrap';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import getLabelText from '../../CommonComponent/getLabelText';
import programDate from './ProgramData';
import ProgramService from "../../api/ProgramService";
import AuthenticationService from '../Common/AuthenticationService.js';
import i18n from '../../i18n';
import CountryService from '../../api/CountryService.js';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, selectFilter, multiSelectFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import AuthenticationServiceComponent from '../Common/AuthenticationServiceComponent';
import jexcel from 'jexcel';
import "../../../node_modules/jexcel/dist/jexcel.css";
import { jExcelLoadedFunction, jExcelLoadedFunctionOnlyHideRow } from '../../CommonComponent/JExcelCommonFunctions.js';

const entityname = i18n.t('static.program.programMaster');
export default class ProgramList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      programlist: [],
      lang: 'en',
      message: '',
      selProgram: [],
      countryList: [],
      lang: localStorage.getItem('lang'),
      loading: true
    }
    this.editProgram = this.editProgram.bind(this);
    this.addNewProgram = this.addNewProgram.bind(this);
    this.buttonFormatter = this.buttonFormatter.bind(this);
    this.addProductMapping = this.addProductMapping.bind(this);
    this.filterData = this.filterData.bind(this);
    this.formatLabel = this.formatLabel.bind(this);
    this.hideFirstComponent = this.hideFirstComponent.bind(this);
    this.hideSecondComponent = this.hideSecondComponent.bind(this);
    this.buildJExcel = this.buildJExcel.bind(this);

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
    let countryId = document.getElementById("countryId").value;
    if (countryId != 0) {
      const selProgram = this.state.programList.filter(c => c.realmCountry.country.countryId == countryId)
      this.setState({
        selProgram: selProgram
      }, () => {
        this.buildJExcel();
      });
    } else {
      this.setState({
        selProgram: this.state.programList
      }, () => {
        this.buildJExcel();
      });
    }
  }

  editProgram(program) {
    if (AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_EDIT_PROGRAM')) {
      this.props.history.push({
        pathname: `/program/editProgram/${program.programId}`,
        // state: { program }
      });
    }
  }

  buildJExcel() {
    let programList = this.state.selProgram;
    // console.log("programList---->", programList);
    let programArray = [];
    let count = 0;

    for (var j = 0; j < programList.length; j++) {
      data = [];
      data[0] = programList[j].programId
      data[1] = getLabelText(programList[j].label, this.state.lang)
      data[2] = programList[j].programCode;
      data[3] = getLabelText(programList[j].realmCountry.realm.label, this.state.lang)
      data[4] = getLabelText(programList[j].realmCountry.country.label, this.state.lang)
      data[5] = getLabelText(programList[j].organisation.label, this.state.lang)


      programArray[count] = data;
      count++;
    }
    if (programList.length == 0) {
      data = [];
      programArray[0] = data;
    }
    // console.log("programArray---->", programArray);
    this.el = jexcel(document.getElementById("tableDiv"), '');
    this.el.destroy();
    var json = [];
    var data = programArray;

    var options = {
      data: data,
      columnDrag: true,
      colWidths: [150, 150, 100],
      colHeaderClasses: ["Reqasterisk"],
      columns: [
        {
          title: 'programId',
          type: 'hidden',
        },
        {
          title: i18n.t('static.program.program'),
          type: 'text',
          readOnly: true
        },
        {
          title: i18n.t('static.program.programCode'),
          type: 'text',
          readOnly: true
        },
        {
          title: i18n.t('static.program.realm'),
          type: 'text',
          readOnly: true
        },
        {
          title: i18n.t('static.program.realmcountry'),
          type: 'text',
          readOnly: true
        },
        {
          title: i18n.t('static.program.organisation'),
          type: 'text',
          readOnly: true
        },

      ],
      text: {
        showingPage: `${i18n.t('static.jexcel.showing')} {0} ${i18n.t('static.jexcel.to')} {1} ${i18n.t('static.jexcel.of')} {1}`,
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
              title: i18n.t('static.program.mapPlanningUnit'),
              onclick: function () {
                // console.log("onclick------>", this.el.getValueFromCoords(0, y));
                if (AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_EDIT_PROGRAM')) {
                  this.props.history.push({
                    pathname: `/programProduct/addProgramProduct/${this.el.getValueFromCoords(0, y)}`,
                  });
                }

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
      languageEl: languageEl
    })
  }

  selected = function (instance, cell, x, y, value) {

    if (x == 0 && value != 0) {
      // console.log("HEADER SELECTION--------------------------");
    } else {
      // console.log("Original Value---->>>>>", this.el.getValueFromCoords(0, x));
      if (AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_EDIT_PROGRAM')) {
        this.props.history.push({
          pathname: `/program/editProgram/${this.el.getValueFromCoords(0, x)}`,
        });
      }
    }
  }.bind(this);

  loaded = function (instance, cell, x, y, value) {
    jExcelLoadedFunction(instance);
  }


  componentDidMount() {
    console.log("props--------------------", this.props);
    AuthenticationService.setupAxiosInterceptors();
    this.hideFirstComponent();
    ProgramService.getProgramList().then(response => {
      if (response.status == 200) {
        this.setState({
          programList: response.data,
          selProgram: response.data,
          loading: false
        },
          () => {
            this.buildJExcel();
          })
      } else {
        this.setState({
          message: response.data.messageCode
        },
          () => {
            this.hideSecondComponent();
          })
      }
    })

    CountryService.getCountryListActive().then(response => {
      if (response.status == 200) {
        console.log("response--->", response.data);
        this.setState({
          countryList: response.data,
        })
      } else {
        this.setState({ message: response.data.messageCode })
      }
    })

  }

  addNewProgram() {
    this.props.history.push({
      pathname: "/program/addProgram"
    });
  }
  buttonFormatter(cell, row) {
    // console.log("-----------", cell);
    return <Button type="button" size="sm" color="success" onClick={(event) => this.addProductMapping(event, cell)} ><i className="fa fa-check"></i> Add</Button>;
  }
  addProductMapping(event, cell) {
    if (AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_EDIT_PROGRAM')) {
      event.stopPropagation();
      this.props.history.push({
        pathname: `/programProduct/addProgramProduct/${cell}`,
      });
    }
  }

  formatLabel(cell, row) {
    return getLabelText(cell, this.state.lang);
  }
  render() {

    const { SearchBar, ClearSearchButton } = Search;
    const customTotal = (from, to, size) => (
      <span className="react-bootstrap-table-pagination-total">
        {i18n.t('static.common.result', { from, to, size })}
      </span>
    );
    const { countryList } = this.state;
    let countries = countryList.length > 0
      && countryList.map((item, i) => {
        return (
          <option key={i} value={item.countryId}>
            {getLabelText(item.label, this.state.lang)}
          </option>
        )
      }, this);

    return (
      <div className="animated">
        <AuthenticationServiceComponent history={this.props.history} message={(message) => {
          this.setState({ message: message })
        }} />
        <h5 className={this.props.match.params.color} id="div1">{i18n.t(this.props.match.params.message, { entityname })}</h5>
        <h5 style={{ color: "red" }} id="div2">{i18n.t(this.state.message, { entityname })}</h5>
        <Card style={{ display: this.state.loading ? "none" : "block" }}>
          <div className="Card-header-addicon">
            {/* <i className="icon-menu"></i><strong>{i18n.t('static.common.listEntity', { entityname })}</strong>{' '} */}
            <div className="card-header-actions">
              <div className="card-header-action">
                {AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_CREATE_A_PROGRAM') && <a href="javascript:void();" title={i18n.t('static.common.addEntity', { entityname })} onClick={this.addNewProgram}><i className="fa fa-plus-square"></i></a>}
              </div>
            </div>
          </div>
          <CardBody className="pb-lg-0">
            <Col md="3 pl-0" >
              <FormGroup className="Selectdiv">
                <Label htmlFor="appendedInputButton">{i18n.t('static.region.country')}</Label>

                <div className="controls SelectGo">
                  <InputGroup>
                    <Input
                      type="select"
                      name="countryId"
                      id="countryId"
                      bsSize="sm"
                      onChange={this.filterData}
                    >
                      <option value="0">{i18n.t('static.common.all')}</option>
                      {countries}
                    </Input>
                    {/* <InputGroupAddon addonType="append">
                      <Button color="secondary Gobtn btn-sm" onClick={this.filterData}>{i18n.t('static.common.go')}</Button>
                    </InputGroupAddon> */}
                  </InputGroup>
                </div>
              </FormGroup>
            </Col>
            <CardBody className=" pt-md-1 pb-md-1 table-responsive">
              {/* <div id="loader" className="center"></div> */}<div id="tableDiv" className="jexcelremoveReadonlybackground">
              </div>

            </CardBody>
          </CardBody>
        </Card>
        <div style={{ display: this.state.loading ? "block" : "none" }}>
          <div className="d-flex align-items-center justify-content-center" style={{ height: "500px" }} >
            <div class="align-items-center">
              <div ><h4> <strong>Loading...</strong></h4></div>

              <div class="spinner-border blue ml-4" role="status">

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}