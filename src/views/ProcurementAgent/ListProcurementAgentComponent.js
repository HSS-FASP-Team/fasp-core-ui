
import React, { Component } from 'react';
import { Card, CardHeader, CardBody, FormGroup, Input, InputGroup, InputGroupAddon, Label, Button, Col } from 'reactstrap';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import i18n from '../../i18n'
import RealmService from "../../api/RealmService";
import ProcurementAgentService from "../../api/ProcurementAgentService";
import AuthenticationService from '../Common/AuthenticationService.js';
import getLabelText from '../../CommonComponent/getLabelText';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, selectFilter, multiSelectFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator'

const entityname = i18n.t('static.procurementagent.procurementagent')
class ListProcurementAgentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            realms: [],
            procurementAgentList: [],
            message: '',
            selProcurementAgent: [],
            lang: localStorage.getItem('lang')
        }
        this.editProcurementAgent = this.editProcurementAgent.bind(this);
        this.filterData = this.filterData.bind(this);
        this.addNewProcurementAgent = this.addNewProcurementAgent.bind(this);
        this.formatLabel = this.formatLabel.bind(this);

    }
    addNewProcurementAgent() {
        this.props.history.push("/procurementAgent/addProcurementAgent");
    }
    filterData() {
        let realmId = document.getElementById("realmId").value;
        if (realmId != 0) {
            const selProcurementAgent = this.state.procurementAgentList.filter(c => c.realm.realmId == realmId)
            this.setState({
                selProcurementAgent
            });
        } else {
            this.setState({
                selProcurementAgent: this.state.procurementAgentList
            });
        }
    }
    editProcurementAgent(procurementAgent) {
        this.props.history.push({
            pathname: `/procurementAgent/editProcurementAgent/${procurementAgent.procurementAgentId}`,
            // state: { procurementAgent }
        });
    }

    componentDidMount() {
        AuthenticationService.setupAxiosInterceptors();
        RealmService.getRealmListAll()
            .then(response => {
                if (response.status == 200) {
                    this.setState({
                        realms: response.data
                    })
                } else {
                    this.setState({ message: response.data.messageCode })
                }
            }).catch(
                error => {
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

        ProcurementAgentService.getProcurementAgentListAll()
            .then(response => {
                this.setState({
                    procurementAgentList: response.data,
                    selProcurementAgent: response.data
                })
            }).catch(
                error => {
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

        const { realms } = this.state;
        let realmList = realms.length > 0
            && realms.map((item, i) => {
                return (
                    <option key={i} value={item.realmId}>
                        {getLabelText(item.label, this.state.lang)}
                    </option>
                )
            }, this);

        const columns = [
            {
                dataField: 'realm.label',
                text: i18n.t('static.realm.realm'),
                sort: true,
                align: 'center',
                headerAlign: 'center',
                formatter: this.formatLabel
            },
            {
                dataField: 'label',
                text: i18n.t('static.procurementagent.procurementagentname'),
                sort: true,
                align: 'center',
                headerAlign: 'center',
                formatter: this.formatLabel
            },
            {
                dataField: 'procurementAgentCode',
                text: i18n.t('static.procurementagent.procurementagentcode'),
                sort: true,
                align: 'center',
                headerAlign: 'center'
            },
            {
                dataField: 'submittedToApprovedLeadTime',
                text: i18n.t('static.procurementagent.procurementagentsubmittoapprovetime'),
                sort: true,
                align: 'center',
                headerAlign: 'center'
            },
            {
                dataField: 'active',
                text: i18n.t('static.common.status'),
                sort: true,
                align: 'center',
                headerAlign: 'center',
                formatter: (cellContent, row) => {
                    return (
                        (row.active ? i18n.t('static.common.active') : i18n.t('static.common.disabled'))
                    );
                }
            }];
        const options = {
            hidePageListOnlyOnePage: true,
            firstPageText: i18n.t('static.common.first'),
            prePageText: i18n.t('static.common.back'),
            nextPageText: i18n.t('static.common.next'),
            lastPageText: i18n.t('static.common.last'),
            nextPageTitle: i18n.t('static.common.firstPage'),
            prePageTitle: i18n.t('static.common.prevPage'),
            firstPageTitle: i18n.t('static.common.nextPage'),
            lastPageTitle: i18n.t('static.common.lastPage'),
            showTotal: true,
            paginationTotalRenderer: customTotal,
            disablePageTitle: true,
            sizePerPageList: [{
                text: '10', value: 10
            }, {
                text: '30', value: 30
            }
                ,
            {
                text: '50', value: 50
            },
            {
                text: 'All', value: this.state.selProcurementAgent.length
            }]
        }
        return (
            <div className="animated">
                <h5>{i18n.t(this.props.match.params.message)}</h5>
                <h5>{i18n.t(this.state.message,{entityname})}</h5>
                <Card>
                    <CardHeader>
                        <i className="icon-menu"></i><strong>{i18n.t('static.common.listEntity', { entityname })}</strong>{' '}
                        <div className="card-header-actions">
                            <div className="card-header-action">
                                <a href="javascript:void();" title={i18n.t('static.common.addEntity', { entityname })} onClick={this.addNewProcurementAgent}><i className="fa fa-plus-square"></i></a>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Col md="3 pl-0">
                            <FormGroup>
                                <Label htmlFor="appendedInputButton">{i18n.t('static.realm.realm')}</Label>
                                <div className="controls SelectGo">
                                    <InputGroup>
                                        <Input
                                            type="select"
                                            name="realmId"
                                            id="realmId"
                                            bsSize="sm"
                                        >
                                            <option value="0">{i18n.t('static.common.all')}</option>
                                            {realmList}
                                        </Input>
                                        <InputGroupAddon addonType="append">
                                            <Button color="secondary Gobtn btn-sm" onClick={this.filterData}>{i18n.t('static.common.go')}</Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </div>
                            </FormGroup>
                        </Col>
                        <ToolkitProvider
                            keyField="procurementAgentId"
                            data={this.state.selProcurementAgent}
                            columns={columns}
                            search={{ searchFormatted: true }}
                            hover
                            filter={filterFactory()}
                        >
                            {
                                props => (
                                    <div className="TableCust">
                                        <div className="col-md-6 pr-0 offset-md-6 text-right mob-Left">
                                            <SearchBar {...props.searchProps} />
                                            <ClearSearchButton {...props.searchProps} />
                                        </div>
                                        <BootstrapTable hover striped noDataIndication={i18n.t('static.common.noData')} tabIndexCell
                                            pagination={paginationFactory(options)}
                                            rowEvents={{
                                                onClick: (e, row, rowIndex) => {
                                                    this.editProcurementAgent(row);
                                                }
                                            }}
                                            {...props.baseProps}
                                        />
                                    </div>
                                )
                            }
                        </ToolkitProvider>
                    </CardBody>
                </Card>
            </div>
        );
    }
}
export default ListProcurementAgentComponent;
