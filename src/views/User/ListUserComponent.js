
import React, { Component } from 'react';
import {
    Card, CardHeader, CardBody, FormGroup, Input, InputGroup, InputGroupAddon, Label, Button, Col
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, selectFilter, multiSelectFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator'
import i18n from '../../i18n'
import getLabelText from '../../CommonComponent/getLabelText'
import RealmService from "../../api/RealmService";
import UserService from "../../api/UserService";
import AuthenticationService from '../Common/AuthenticationService.js';
import moment from 'moment';
const entityname = i18n.t('static.user.user')
class ListUserComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            realms: [],
            userList: [],
            message: '',
            selUserList: [],
            lang: localStorage.getItem('lang')
        }
        this.editUser = this.editUser.bind(this);
        this.filterData = this.filterData.bind(this);
        this.addNewUser = this.addNewUser.bind(this);
        this.buttonFormatter = this.buttonFormatter.bind(this);
        this.addAccessControls = this.addAccessControls.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.formatLabel = this.formatLabel.bind(this);
    }
    formatDate(cell, row) {
        if (cell != null && cell != "") {
            var modifiedDate = moment(cell).format('MM-DD-YYYY');
            return modifiedDate;
        } else {
            return "";
        }
    }

    buttonFormatter(cell, row) {
        return <Button type="button" size="sm" color="success" onClick={(event) => this.addAccessControls(event, row)} ><i className="fa fa-check"></i>Add Access Control</Button>;
    }
    addAccessControls(event, row) {
        event.stopPropagation();
        if (AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_ACCESS_CONTROL')) {
            this.props.history.push({
                pathname: "/user/accessControl",
                state: {
                    user: row
                }

            })
        }
    }
    addNewUser() {
        this.props.history.push("/user/addUser");
    }
    filterData() {
        let realmId = document.getElementById("realmId").value;
        if (realmId != 0) {
            const selUserList = this.state.userList.filter(c => c.realm.realmId == realmId)
            this.setState({
                selUserList
            });
        } else {
            this.setState({
                selUserList: this.state.userList
            });
        }
    }
    editUser(user) {
        if (AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_EDIT_USER')) {
            this.props.history.push({
                pathname: `/user/editUser/${user.userId}`,
                // pathname: `/language/editLanguage/${language.languageId}`,
                // state: { user }
            });
        }
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

        UserService.getUserList()
            .then(response => {
                console.log(response.data)
                this.setState({
                    userList: response.data,
                    selUserList: response.data
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

    showRealmLabel(cell, row) {
        return cell.label.label_en;
    }

    showRoleLabel(cell, row) {
        return cell.label.label_en;
    }
    showLanguageLabel(cell, row) {
        return cell.languageName;
    }
    showStatus(cell, row) {
        if (cell) {
            return "Active";
        } else {
            return "Disabled";
        }
    }
    formatLabel(cell, row) {
        return getLabelText(cell, this.state.lang);
    }

    formatDate(cell, row) {
        if (cell != null && cell != "") {
            return moment(cell).format('MM-DD-YYYY hh:mm A');
        } else {
            return "";
        }
    }
    render() {
        const { realms } = this.state;
        let realmList = realms.length > 0
            && realms.map((item, i) => {
                return (
                    <option key={i} value={item.realmId}>
                        {getLabelText(item.label, this.state.lang)}
                    </option>
                )
            }, this);
        const { SearchBar, ClearSearchButton } = Search;
        const customTotal = (from, to, size) => (
            <span className="react-bootstrap-table-pagination-total">
                {i18n.t('static.common.result', { from, to, size })}
            </span>
        );

        const columns = [{
            dataField: 'realm.label',
            text: i18n.t('static.realm.realm'),
            sort: true,
            align: 'center',
            headerAlign: 'center',
            formatter: this.formatLabel
        }, {
            dataField: 'username',
            text: i18n.t('static.user.username'),
            sort: true,
            align: 'center',
            headerAlign: 'center'
        }, {
            dataField: 'phoneNumber',
            text: i18n.t('static.user.phoneNumber'),
            sort: true,
            align: 'center',
            headerAlign: 'center'
        }, {
            dataField: 'emailId',
            text: i18n.t('static.user.emailid'),
            sort: true,
            align: 'center',
            headerAlign: 'center'
        },
        {
            dataField: 'faildAttempts',
            text: i18n.t('static.user.failedAttempts'),
            sort: true,
            align: 'center',
            headerAlign: 'center'
        }, {
            dataField: 'lastLoginDate',
            text: i18n.t('static.user.lastLoginDate'),
            sort: true,
            align: 'center',
            headerAlign: 'center',
            formatter: (cellContent, row) => {
                return (
                    (row.lastLoginDate ? moment(row.lastLoginDate).format('MM-DD-YYYY hh:mm A') : null)
                );
            }
        }, {
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
        }, {
            dataField: 'userId',
            text: i18n.t('static.user.accessControlText'),
            align: 'center',
            headerAlign: 'center',
            formatter: (cellContent, row) => {
                return (<Button type="button" size="sm" color="success" title="Add Access Control" onClick={(event) => this.addAccessControls(event, row)} ><i className="fa fa-check"></i>{i18n.t('static.common.add')}</Button>
                )
            }
        }
        ];
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
                text: 'All', value: this.state.selUserList.length
            }]
        }
        return (
            <div className="animated">
                <h5>{i18n.t(this.props.match.params.message, { entityname })}</h5>
                <h5>{i18n.t(this.state.message, { entityname })}</h5>
                <Card>
                    <CardHeader className="mb-md-3 pb-lg-1">
                        <i className="icon-menu"></i><strong>{i18n.t('static.common.listEntity', { entityname })}</strong>{' '}
                        <div className="card-header-actions">
                            <div className="card-header-action">
                                {AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_ADD_USER') && <a href="javascript:void();" title={i18n.t('static.common.addEntity', { entityname })} onClick={this.addNewUser}><i className="fa fa-plus-square"></i></a>}
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className="pb-lg-0">
                        <Col md="3" className="pl-0">
                            <FormGroup className="Selectdiv">
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
                        <ToolkitProvider
                            keyField="userId"
                            data={this.state.selUserList}
                            columns={columns}
                            search={{ searchFormatted: true }}
                            hover
                            filter={filterFactory()}
                        >
                            {
                                props => (

                                    <div className="TableCust userAlignThtd">
                                        <div className="col-md-6 pr-0 offset-md-6 text-right mob-Left">
                                            <SearchBar {...props.searchProps} />
                                            <ClearSearchButton {...props.searchProps} />
                                        </div>
                                        <BootstrapTable striped hover noDataIndication={i18n.t('static.common.noData')} tabIndexCell
                                            pagination={paginationFactory(options)}
                                            rowEvents={{
                                                onClick: (e, row, rowIndex) => {
                                                    // row.lastLoginDate = moment(row.lastLoginDate).format('YYYY-MM-DD');
                                                    this.editUser(row);
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
export default ListUserComponent;
