import React, { Component } from 'react';
import UserService from "../../api/UserService.js";
import OrganisationTypeService from "../../api/OrganisationTypeService.js";
import AuthenticationService from '../Common/AuthenticationService.js';
import RealmService from '../../api/RealmService';
import getLabelText from '../../CommonComponent/getLabelText';
import { NavLink } from 'react-router-dom'
import { Col, Card, CardHeader, CardBody, FormGroup, Input, InputGroup, InputGroupAddon, Label, Button } from 'reactstrap';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import data from '../Tables/DataTable/_data';
import i18n from '../../i18n';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, selectFilter, multiSelectFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator'
import AuthenticationServiceComponent from '../Common/AuthenticationServiceComponent'
import jexcel from 'jspreadsheet';
import "../../../node_modules/jspreadsheet/dist/jspreadsheet.css";
import "../../../node_modules/jsuites/dist/jsuites.css";
import moment from 'moment';
import { jExcelLoadedFunction, jExcelLoadedFunctionOnlyHideRow } from '../../CommonComponent/JExcelCommonFunctions.js'
import { DATE_FORMAT_CAP, JEXCEL_PAGINATION_OPTION, JEXCEL_DATE_FORMAT_SM, JEXCEL_PRO_KEY, API_URL } from '../../Constants.js';
import { isSiteOnline } from '../../CommonComponent/JavascriptCommonFunctions.js';

const entityname = i18n.t('static.organisationType.organisationType');


export default class OrganisationTypeListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            realms: [],
            organisationsType: [],
            message: "",
            selSource: [],
            loading: true,
            lang: localStorage.getItem('lang')
        }
        this.editOrganisationType = this.editOrganisationType.bind(this);
        this.addOrganisationType = this.addOrganisationType.bind(this);
        this.filterData = this.filterData.bind(this);
        this.formatLabel = this.formatLabel.bind(this);
        this.hideFirstComponent = this.hideFirstComponent.bind(this);
        this.hideSecondComponent = this.hideSecondComponent.bind(this);
        this.buildJexcel = this.buildJexcel.bind(this);
    }
    hideFirstComponent() {
        this.timeout = setTimeout(function () {
            document.getElementById('div1').style.display = 'none';
        }, 30000);
    }
    componentWillUnmount() {
        clearTimeout(this.timeout);
    }


    hideSecondComponent() {
        setTimeout(function () {
            document.getElementById('div2').style.display = 'none';
        }, 30000);
    }
    filterData() {
        let realmId = document.getElementById("realmId").value;
        if (realmId != 0) {
            const selSource = this.state.organisationsType.filter(c => c.realm.id == realmId)
            this.setState({
                selSource
            },
                () => { this.buildJexcel() })
        } else {
            this.setState({
                selSource: this.state.organisationsType
            },
                () => { this.buildJexcel() })
        }
    }
    buildJexcel() {
        let organisationsType = this.state.selSource;
        // console.log("organisations---->", organisations);
        let organisationsTypeArray = [];
        let count = 0;

        for (var j = 0; j < organisationsType.length; j++) {
            data = [];
            data[0] = organisationsType[j].organisationTypeId
            data[1] = getLabelText(organisationsType[j].realm.label, this.state.lang)
            data[2] = getLabelText(organisationsType[j].label, this.state.lang)
            data[3] = organisationsType[j].lastModifiedBy.username;
            data[4] = (organisationsType[j].lastModifiedDate ? moment(organisationsType[j].lastModifiedDate).format(`YYYY-MM-DD`) : null)
            data[5] = organisationsType[j].active;

            organisationsTypeArray[count] = data;
            count++;
        }
        // if (organisations.length == 0) {
        //     data = [];
        //     organisationsArray[0] = data;
        // }
        // console.log("organisationsArray---->", organisationsArray);
        this.el = jexcel(document.getElementById("tableDiv"), '');
        // this.el.destroy();
        jexcel.destroy(document.getElementById("tableDiv"), true);
        var json = [];
        var data = organisationsTypeArray;

        var options = {
            data: data,
            columnDrag: true,
            // colWidths: [150, 150, 100],
            colHeaderClasses: ["Reqasterisk"],
            columns: [
                {
                    title: 'organisationsTypeId',
                    type: 'hidden',
                    // title: 'A',
                    // type: 'text',
                    // visible: false
                    // readOnly: true
                },
                {
                    title: i18n.t('static.realm.realm'),
                    type: (AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_SHOW_REALM_COLUMN') ? 'text' : 'hidden'),
                    // visible: (AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_SHOW_REALM_COLUMN') ? true : false),
                    // readOnly: true
                },
                {
                    title: i18n.t('static.organisationType.organisationTypeName'),
                    type: 'text',
                    // readOnly: true
                },
                {
                    title: i18n.t('static.common.lastModifiedBy'),
                    type: 'text',
                    // readOnly: true
                },
                {
                    title: i18n.t('static.common.lastModifiedDate'),
                    type: 'calendar',
                    options: { format: JEXCEL_DATE_FORMAT_SM },
                    // readOnly: true
                },
                {
                    type: 'dropdown',
                    title: i18n.t('static.common.status'),
                    // readOnly: true,
                    source: [
                        { id: true, name: i18n.t('static.common.active') },
                        { id: false, name: i18n.t('static.common.disabled') }
                    ]
                },
            ],
            // text: {
            //     showingPage: `${i18n.t('static.jexcel.showing')} {0} ${i18n.t('static.jexcel.of')} {1}  ${i18n.t('static.jexcel.pages')}`,
            //     show: '',
            //     entries: '',
            // },
            editable: false,
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
                return false;
            }.bind(this),
        };
        var organisationsTypeEl = jexcel(document.getElementById("tableDiv"), options);
        this.el = organisationsTypeEl;
        this.setState({
            organisationsTypeEl: organisationsTypeEl, loading: false
        })
    }

    componentDidMount() {
        // AuthenticationService.setupAxiosInterceptors();
        this.hideFirstComponent();
        RealmService.getRealmListAll()
            .then(response => {
                if (response.status == 200) {
                    var listArray = response.data;
                    listArray.sort((a, b) => {
                        var itemLabelA = getLabelText(a.label, this.state.lang).toUpperCase(); // ignore upper and lowercase
                        var itemLabelB = getLabelText(b.label, this.state.lang).toUpperCase(); // ignore upper and lowercase                   
                        return itemLabelA > itemLabelB ? 1 : -1;
                    });
                    this.setState({
                        realms: listArray
                    }, () => { })
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
                            // message: 'static.unkownError',
                            message: API_URL.includes("uat") ? i18n.t("static.common.uatNetworkErrorMessage") : (API_URL.includes("demo") ? i18n.t("static.common.demoNetworkErrorMessage") : i18n.t("static.common.prodNetworkErrorMessage")),
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

        OrganisationTypeService.getOrganisationTypeList()
            .then(response => {
                console.log("response------->", response);
                // this.setState({
                //     organisationsType: response.data,
                //     selSource: response.data
                // }, () => { this.buildJexcel() })
                if (response.status == 200) {
                    var listArray = response.data;
                    listArray.sort((a, b) => {
                        var itemLabelA = getLabelText(a.label, this.state.lang).toUpperCase(); // ignore upper and lowercase
                        var itemLabelB = getLabelText(b.label, this.state.lang).toUpperCase(); // ignore upper and lowercase                   
                        return itemLabelA > itemLabelB ? 1 : -1;
                    });
                    this.setState({
                        organisationsType: listArray,
                        selSource: listArray
                    }, () => { this.buildJexcel() })
                }
            }).catch(
                error => {
                    if (error.message === "Network Error") {
                        this.setState({
                            // message: 'static.unkownError',
                            message: API_URL.includes("uat") ? i18n.t("static.common.uatNetworkErrorMessage") : (API_URL.includes("demo") ? i18n.t("static.common.demoNetworkErrorMessage") : i18n.t("static.common.prodNetworkErrorMessage")),
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

    // render() {
    //     return (
    //         <div className="organisationList">
    //             <p>{this.props.match.params.message}</p>
    //             <h3>{this.state.message}</h3>
    //             <div>{labels.TITLE_ORGANISATION_LIST}</div>
    //             <button className="btn btn-add" type="button" style={{ marginLeft: '-736px' }} onClick={this.addOrganisation}>{labels.TITLE_ADD_ORGANISATION}</button><br /><br />
    //             <table border="1" align="center">
    //                 <thead>
    //                     <tr>
    //                         <th>Organisation Code</th>
    //                         <th>Organisation Name</th>
    //                         <th>Realm</th>
    //                         {/* <th>Country</th> */}
    //                         <th>Status</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {
    //                         this.state.organisations.map(organisation =>
    //                             <tr key={organisation.organisationId} onClick={() => this.editOrganisation(organisation)}>
    //                                 <td>{organisation.organisationCode}</td>
    //                                 <td>{organisation.label.label_en}</td>
    //                                 <td>{organisation.realm.label.label_en}</td>
    //                                 {/* <td>
    //                                     {
    //                                         organisation.realmCountryList.map(realmCountry => realmCountry.country.label.label_en)
    //                                     }
    //                                 </td> */}
    //                                 <td>{organisation.active.toString() === "true" ? "Active" : "Disabled"}</td>
    //                             </tr>)
    //                     }
    //                 </tbody>
    //             </table>
    //             <br />
    //         </div>
    //     );
    // }
    formatLabel(cell, row) {
        return getLabelText(cell, this.state.lang);
    }
    loaded = function (instance, cell, x, y, value) {
        jExcelLoadedFunction(instance);
    }

    render() {
        jexcel.setDictionary({
            Show: " ",
            entries: " ",
        });

        const { SearchBar, ClearSearchButton } = Search;
        const customTotal = (from, to, size) => (
            <span className="react-bootstrap-table-pagination-total">
                {i18n.t('static.common.result', { from, to, size })}
            </span>
        );

        const { realms } = this.state;
        let realmList = realms.length > 0
            && realms.map((item, i) => {
                return (
                    <option key={i} value={item.realmId}>
                        {getLabelText(item.label, this.state.lang)}
                    </option>
                )
            }, this);



        return (
            <div className="animated">
                <AuthenticationServiceComponent history={this.props.history} />
                <h5 className={this.props.match.params.color} id="div1">{i18n.t(this.props.match.params.message, { entityname })}</h5>
                <h5 className="red" id="div2">{i18n.t(this.state.message, { entityname })}</h5>
                <Card>
                    <div className="Card-header-addicon">
                        {/* <i className="icon-menu"></i><strong>{i18n.t('static.common.listEntity', { entityname })}</strong> */}
                        <div className="card-header-actions">
                            <div className="card-header-action">
                                {AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_ADD_ORGANIZATION_TYPE') && <a href="javascript:void();" title={i18n.t('static.common.addEntity', { entityname })} onClick={this.addOrganisationType}><i className="fa fa-plus-square"></i></a>}
                            </div>
                        </div>

                    </div>
                    <CardBody className="pb-lg-0">
                        {AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_SHOW_REALM_COLUMN') &&
                            <Col md="3 pl-0">
                                <FormGroup className="Selectdiv mt-md-2 mb-md-0">
                                    <Label htmlFor="appendedInputButton">{i18n.t('static.realm.realm')}</Label>
                                    <div className="controls SelectGo">
                                        <InputGroup>
                                            <Input
                                                type="select"
                                                name="realmId"
                                                id="realmId"
                                                bsSize="sm"
                                                onChange={this.filterData}
                                            >
                                                <option value="0">{i18n.t('static.common.all')}</option>
                                                {realmList}
                                            </Input>
                                            {/* <InputGroupAddon addonType="append">
                                            <Button color="secondary Gobtn btn-sm" onClick={this.filterData}>{i18n.t('static.common.go')}</Button>
                                        </InputGroupAddon> */}
                                        </InputGroup>
                                    </div>
                                </FormGroup>
                            </Col>
                        }
                        <div className='consumptionDataEntryTable'>
                            <div id="tableDiv" className={AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_EDIT_ORGANIZATION_TYPE') ? "jexcelremoveReadonlybackground RowClickable" : "jexcelremoveReadonlybackground"} style={{ display: this.state.loading ? "none" : "block" }}></div>
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
                    </CardBody>
                </Card>

            </div>
        );
    }



    editOrganisationType(organisationType) {
        if (AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_EDIT_ORGANIZATION_TYPE')) {
            this.props.history.push({
                pathname: `/organisationType/editOrganisationType/${organisationType.organisationTypeId}`,
                // state: { organisation: organisation }
            });
        }
    }
    selected = function (instance, cell, x, y, value, e) {
        if (e.buttons == 1) {

            if ((x == 0 && value != 0) || (y == 0)) {
                // console.log("HEADER SELECTION--------------------------");
            } else {
                if (this.state.selSource.length != 0) {
                    if (AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_EDIT_ORGANIZATION_TYPE')) {
                        this.props.history.push({
                            pathname: `/organisationType/editOrganisationType/${this.el.getValueFromCoords(0, x)}`,
                            // state: { role }
                        });
                    }
                }
            }
        }
    }.bind(this);

    addOrganisationType() {
        if (isSiteOnline()) {
            this.props.history.push(`/organisationType/addOrganisationType`);
        } else {
            alert("You must be Online.")
        }
    }

}