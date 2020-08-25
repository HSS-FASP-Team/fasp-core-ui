
import React, { Component } from 'react';
import { Card, CardHeader, CardBody, FormGroup, Input, InputGroup, InputGroupAddon, Label, Button, Col } from 'reactstrap';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import i18n from '../../i18n'
import RealmService from "../../api/RealmService";
import TracerCategoryService from "../../api/TracerCategoryService";
import AuthenticationService from '../Common/AuthenticationService.js';
import getLabelText from '../../CommonComponent/getLabelText';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, selectFilter, multiSelectFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import AuthenticationServiceComponent from '../Common/AuthenticationServiceComponent'
import jexcel from 'jexcel';
import "../../../node_modules/jexcel/dist/jexcel.css";
import { jExcelLoadedFunction, jExcelLoadedFunctionOnlyHideRow } from '../../CommonComponent/JExcelCommonFunctions.js'
const entityname = i18n.t('static.tracercategory.tracercategory');
class ListTracerCategoryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            realms: [],
            tracerCategoryList: [],
            message: '',
            selTracerCategory: [],
            lang: localStorage.getItem('lang'),
            loading: true
        }
        this.editTracerCategory = this.editTracerCategory.bind(this);
        this.filterData = this.filterData.bind(this);
        this.addNewTracerCategory = this.addNewTracerCategory.bind(this);
        this.formatLabel = this.formatLabel.bind(this);
        this.hideFirstComponent = this.hideFirstComponent.bind(this);
        this.hideSecondComponent = this.hideSecondComponent.bind(this);
        this.buildJexcel = this.buildJexcel.bind(this);

    }
    buildJexcel() {
        let supplierList = this.state.selSource;
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
    addNewTracerCategory() {
        this.props.history.push("/tracerCategory/addTracerCategory");
    }
    filterData() {
        let realmId = document.getElementById("realmId").value;
        if (realmId != 0) {
            const selTracerCategory = this.state.tracerCategoryList.filter(c => c.realm.id == realmId)
            this.setState({
                selTracerCategory
            });
        } else {
            this.setState({
                selTracerCategory: this.state.tracerCategoryList
            });
        }
    }
    editTracerCategory(tracerCategory) {
        if (AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_MANAGE_TRACER_CATEGORY')) {
            this.props.history.push({
                pathname: `/tracerCategory/editTracerCategory/${tracerCategory.tracerCategoryId}`,
                // state: { tracerCategory }
            });
        }
    }
    selected = function (instance, cell, x, y, value) {
        if (x == 0 && value != 0) {
            // console.log("HEADER SELECTION--------------------------");
        } else {
            // console.log("Original Value---->>>>>", this.el.getValueFromCoords(0, x));
            if (AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_MANAGE_COUNTRY')) {
                this.props.history.push({
                    pathname: `/tracerCategory/editTracerCategory/${this.el.getValueFromCoords(0, x)}`,
                });
            }
        }
    }.bind(this);


    componentDidMount() {
        AuthenticationService.setupAxiosInterceptors();
        this.hideFirstComponent();
        RealmService.getRealmListAll()
            .then(response => {
                if (response.status == 200) {
                    this.setState({
                        realms: response.data, loading: false
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


        TracerCategoryService.getTracerCategoryListAll()
            .then(response => {
                this.setState({
                    tracerCategoryList: response.data,
                    selTracerCategory: response.data
                },
                    () => {

                        let tracerCategoryList = this.state.tracerCategoryList;
                        // console.log("tracerCategoryList---->", tracerCategoryList);
                        let tracerCategory = [];
                        let count = 0;

                        for (var j = 0; j < tracerCategoryList.length; j++) {
                            data = [];
                            data[0] = tracerCategoryList[j].tracerCategoryId
                            data[1] = getLabelText(tracerCategoryList[j].realm.label, this.state.lang)
                            data[2] = getLabelText(tracerCategoryList[j].label, this.state.lang)
                            data[3] = tracerCategoryList[j].active;
                            tracerCategory[count] = data;
                            count++;
                        }
                        // if (tracerCategoryList.length == 0) {
                        //     data = [];
                        //     tracerCategory[0] = data;
                        // }
                        // console.log("tracerCategory---->", tracerCategory);
                        this.el = jexcel(document.getElementById("tableDiv"), '');
                        this.el.destroy();
                        var json = [];
                        var data = tracerCategory;

                        var options = {
                            data: data,
                            columnDrag: true,
                            // colWidths: [150, 150, 100],
                            colHeaderClasses: ["Reqasterisk"],
                            columns: [
                                {
                                    title: 'tracerCategoryId',
                                    type: 'hidden',
                                    readOnly: true
                                },
                                {
                                    title: i18n.t('static.realm.realm'),
                                    type: 'text',
                                    readOnly: true
                                },
                                {
                                    title: i18n.t('static.tracercategory.tracercategory'),
                                    type: 'text',
                                    readOnly: true
                                },
                                {
                                    type: 'dropdown',
                                    title: i18n.t('static.common.status'),
                                    readOnly: true,
                                    source: [
                                        { id: true, name: i18n.t('static.common.active') },
                                        { id: false, name: i18n.t('static.common.disabled') }
                                    ]
                                },
                            ],
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
                            contextMenu: false
                        };
                        var tracerCategoryEl = jexcel(document.getElementById("tableDiv"), options);
                        this.el = tracerCategoryEl;
                        this.setState({
                            tracerCategoryEl: tracerCategoryEl, loading: false
                        })



                    })
            })

    }

    formatLabel(cell, row) {
        return getLabelText(cell, this.state.lang);
    }
    loaded = function (instance, cell, x, y, value) {
        jExcelLoadedFunction(instance);
    }
    render() {

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
                <AuthenticationServiceComponent history={this.props.history} message={(message) => {
                    this.setState({ message: message })
                }} />
                <h5 className={this.props.match.params.color} id="div1">{i18n.t(this.props.match.params.message, { entityname })}</h5>
                <h5 style={{ color: "red" }} id="div2">{i18n.t(this.state.message, { entityname })}</h5>
                <Card style={{ display: this.state.loading ? "none" : "block" }}>
                    <div className="Card-header-addicon">
                        {/* <i className="icon-menu"></i><strong>{i18n.t('static.dashboard.tracercategorylist')}</strong>{' '} */}
                        <div className="card-header-actions">
                            <div className="card-header-action">
                                {AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_MANAGE_TRACER_CATEGORY') && <a href="javascript:void();" title={i18n.t('static.common.addEntity', { entityname })} onClick={this.addNewTracerCategory}><i className="fa fa-plus-square"></i></a>}
                            </div>
                        </div>
                    </div>
                    <CardBody className="pb-lg-0">
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
                        </Col> <div id="tableDiv" className="jexcelremoveReadonlybackground"> </div>
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
        );
    }
}
export default ListTracerCategoryComponent;
