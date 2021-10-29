import React, { Component } from "react";
import { Card, CardBody, CardFooter, FormGroup, Input, InputGroup, Label, Button } from 'reactstrap';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import getLabelText from '../../CommonComponent/getLabelText';
import AuthenticationService from '../Common/AuthenticationService.js';
import i18n from '../../i18n';
import AuthenticationServiceComponent from '../Common/AuthenticationServiceComponent';
import jexcel from 'jexcel-pro';
import "../../../node_modules/jexcel-pro/dist/jexcel.css";
import "../../../node_modules/jsuites/dist/jsuites.css";
import { getDatabase } from "../../CommonComponent/IndexedDbFunctions";
import { jExcelLoadedFunction } from '../../CommonComponent/JExcelCommonFunctions.js';
import { INDEXED_DB_NAME, INDEXED_DB_VERSION, SECRET_KEY, JEXCEL_MONTH_PICKER_FORMAT, JEXCEL_PAGINATION_OPTION, JEXCEL_DATE_FORMAT_SM, JEXCEL_PRO_KEY } from "../../Constants";
import MultiSelect from 'react-multi-select-component';
import CryptoJS from 'crypto-js';

const entityname = i18n.t('static.versionSettings.versionSettings');
export default class VersionSettingsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isChanged: false,
            uniquePrograms: [],
            programValues: [],
            programLabels: [],
            datasetList: [],
            message: '',
            lang: localStorage.getItem('lang'),
            loading: true,
            versionTypeList: [{
                versionTypeId: 1,
                label: {
                    label_en: 'Draft'
                }
            }, {
                versionTypeId: 2,
                label: {
                    label_en: 'Final'
                }
            }],
            versionSettingsList: []
        }
        this.hideFirstComponent = this.hideFirstComponent.bind(this);
        this.hideSecondComponent = this.hideSecondComponent.bind(this);
        this.buildJExcel = this.buildJExcel.bind(this);
        this.getDatasetList = this.getDatasetList.bind(this);
        this.getVersionTypeList = this.getVersionTypeList.bind(this);
        this.getDatasetById = this.getDatasetById.bind(this);
        this.cancelClicked = this.cancelClicked.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.checkValidation = this.checkValidation.bind(this);
    }
    cancelClicked() {
        let id = AuthenticationService.displayDashboardBasedOnRole();
        this.props.history.push(`/ApplicationDashboard/` + `${id}` + '/red/' + i18n.t('static.message.cancelled', { entityname }))
    }
    checkValidation() {
        var valid = true;
        var json = this.el.getJson(null, false);
        for (var y = 0; y < json.length; y++) {
            var value = this.el.getValueFromCoords(11, y);
            if (parseInt(value) == 1) {
                //Start date
                var col = ("H").concat(parseInt(y) + 1);
                var value = this.el.getValueFromCoords(7, y);
                if (value == "") {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.label.fieldRequired'));
                    valid = false;
                } else {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setComments(col, "");
                }

                //End date
                var col = ("I").concat(parseInt(y) + 1);
                var value = this.el.getValueFromCoords(8, y);
                if (value == "") {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.label.fieldRequired'));
                    valid = false;
                } else {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setComments(col, "");
                }
            }
        }
        return valid;
    }

    changed = function (instance, cell, x, y, value) {

        //Start date
        if (x == 7) {
            var col = ("H").concat(parseInt(y) + 1);
            if (value == "") {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setStyle(col, "background-color", "yellow");
                this.el.setComments(col, i18n.t('static.label.fieldRequired'));
            } else {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setComments(col, "");
            }
        }

        //End date
        if (x == 8) {
            var col = ("I").concat(parseInt(y) + 1);
            if (value == "") {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setStyle(col, "background-color", "yellow");
                this.el.setComments(col, i18n.t('static.label.fieldRequired'));
            } else {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setComments(col, "");
            }
        }


        if (x != 11) {
            this.el.setValueFromCoords(11, y, 1, true);
            this.setState({
                isChanged: true
            })
        }



    }.bind(this);
    // -----end of changed function

    formSubmit = function () {
        var validation = this.checkValidation();
        if (validation == true) {
            this.setState({
                loading: true
            })
            var tableJson = this.el.getJson(null, false);
            var programs = [];
            var count = 0;
            for (var i = 0; i < tableJson.length; i++) {
                var map1 = new Map(Object.entries(tableJson[i]));
                console.log("11 map---" + map1.get("11"))
                if (parseInt(map1.get("11")) === 1) {
                    console.log("map1.get(10)---", map1.get("10"));
                    console.log("map1.get(7)---", map1.get("7"));
                    console.log("map1.get(8)---", map1.get("8"));
                    var notes = map1.get("4");
                    var startDate = map1.get("7");
                    var stopDate = map1.get("8");
                    var id = map1.get("10");
                    console.log("start date ---", startDate);
                    console.log("stop date ---", stopDate);
                    var program = (this.state.datasetList.filter(x => x.id == id)[0]);
                    var databytes = CryptoJS.AES.decrypt(program.programData, SECRET_KEY);
                    var programData = JSON.parse(databytes.toString(CryptoJS.enc.Utf8));
                    programData.currentVersion.forecastStartDate = startDate;
                    programData.currentVersion.forecastStopDate = stopDate;
                    programData.currentVersion.notes = notes;
                    programData = (CryptoJS.AES.encrypt(JSON.stringify(programData), SECRET_KEY)).toString();
                    program.programData = programData;
                    // var db1;
                    // getDatabase();
                    // var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
                    // openRequest.onerror = function (event) {
                    //     this.setState({
                    //         message: i18n.t('static.program.errortext'),
                    //         color: 'red'
                    //     })
                    //     this.hideFirstComponent()
                    // }.bind(this);
                    // openRequest.onsuccess = function (e) {
                    //     db1 = e.target.result;
                    //     var transaction = db1.transaction(['datasetData'], 'readwrite');
                    //     var programTransaction = transaction.objectStore('datasetData');
                    //     var programRequest = programTransaction.put(program);
                    //     programRequest.onerror = function (e) {

                    //     }.bind(this);
                    //     programRequest.onsuccess = function (e) {

                    //     }.bind(this);
                    // }.bind(this);
                    programs.push(program);
                    count++;
                }
            }
            console.log("programs to update---", programs);
            if (count > 0) {
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
                    var transaction = db1.transaction(['datasetData'], 'readwrite');
                    var programTransaction = transaction.objectStore('datasetData');
                    programs.forEach(program => {
                        var programRequest = programTransaction.put(program);
                        console.log("---hurrey---");
                    })
                    transaction.oncomplete = function (event) {
                        this.setState({
                            loading: false,
                            message: i18n.t('static.mt.dataUpdateSuccess'),
                            color: "green",
                            isChanged: false
                        }, () => {
                            this.hideSecondComponent();
                            this.buildJExcel();
                        });
                        console.log("Data update success");
                    }.bind(this);
                    transaction.onerror = function (event) {
                        this.setState({
                            loading: false,
                            // message: 'Error occured.',
                            color: "red",
                        }, () => {
                            this.hideSecondComponent();
                        });
                        console.log("Data update errr");
                    }.bind(this);
                }.bind(this);
            }
        }
    }

    getDatasetById(datasetIds) {
        var versionSettingsList = [];
        this.state.uniquePrograms.map(dataset => {
            if (datasetIds.includes(dataset.programId)) {
                versionSettingsList.push(dataset);
            }
        })
        this.setState({ versionSettingsList }, () => { this.buildJExcel() });
    }
    getVersionTypeList() {
        var db1;
        getDatabase();
        var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var transaction = db1.transaction(['versionType'], 'readwrite');
            var program = transaction.objectStore('versionType');
            var getRequest = program.getAll();

            getRequest.onerror = function (event) {
                // Handle errors!
            };
            getRequest.onsuccess = function (event) {
                var myResult = [];
                myResult = getRequest.result;
                console.log("myResult version type---", myResult)
                this.setState({
                    versionTypeList: myResult
                });
                for (var i = 0; i < myResult.length; i++) {
                    console.log("version type--->", myResult[i])

                }

            }.bind(this);
        }.bind(this);
    }

    getDatasetList() {
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
                var proList = [];
                myResult = getRequest.result;
                var userBytes = CryptoJS.AES.decrypt(localStorage.getItem('curUser'), SECRET_KEY);
                var userId = userBytes.toString(CryptoJS.enc.Utf8);
                for (var i = 0; i < myResult.length; i++) {
                    if (myResult[i].userId == userId) {
                        // var obj = myResult[i];
                        // var databytes = CryptoJS.AES.decrypt(myResult[i].programData, SECRET_KEY);
                        // var programData = JSON.parse(databytes.toString(CryptoJS.enc.Utf8));
                        // obj.programData = programData;
                        proList.push(myResult[i])
                    }
                }
                console.log("proList---", proList);
                this.setState({
                    datasetList: proList,
                    uniquePrograms: proList.filter((v, i, a) => a.findIndex(t => (t.programId === v.programId)) === i),
                    loading: false

                });
            }.bind(this);
        }.bind(this);
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

    oneditionend = function (instance, cell, x, y, value) {
        var elInstance = instance.jexcel;
        elInstance.setValueFromCoords(11, y, 1, true);
    }

    buildJExcel() {
        let versionSettingsList = this.state.versionSettingsList;
        let versionSettingsArray = [];
        let count = 0;
        var downloadedDataset = this.state.datasetList;
        for (var j = 0; j < downloadedDataset.length; j++) {
            var bytes = CryptoJS.AES.decrypt(downloadedDataset[j].programData, SECRET_KEY);
            var pd = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            data = [];
            data[0] = downloadedDataset[j].programId
            data[1] = downloadedDataset[j].programCode
            data[2] = downloadedDataset[j].version + "(Local)"
            data[3] = ''
            data[4] = pd.currentVersion.notes
            data[5] = ''
            data[6] = ''
            data[7] = pd.currentVersion.forecastStartDate
            // data[8] = "2024-12-30 00:00:00"
            var parts = pd.currentVersion.forecastStopDate.split('-');
            data[8] = parts[0] + "-" + parts[1] + "-01 00:00:00"
            // 1-Local 0-Live
            data[9] = 1
            data[10] = downloadedDataset[j].id
            data[11] = 0
            versionSettingsArray[count] = data;
            count++;

        }
        var versionTypeId = document.getElementById('versionTypeId').value;
        for (var j = 0; j < versionSettingsList.length; j++) {
            var databytes = CryptoJS.AES.decrypt(versionSettingsList[j].programData, SECRET_KEY);
            var programData = JSON.parse(databytes.toString(CryptoJS.enc.Utf8));
            var versionList = programData.versionList;
            for (var k = 0; k < versionList.length; k++) {

                data = [];
                data[0] = versionSettingsList[j].programId
                data[1] = versionSettingsList[j].programCode
                data[2] = versionList[k].versionId
                data[3] = getLabelText(versionList[k].versionType.label, this.state.lang);
                data[4] = versionList[k].notes
                data[5] = versionList[k].createdDate
                data[6] = versionList[k].createdBy.username
                data[7] = versionList[k].forecastStartDate
                data[8] = versionList[k].forecastStopDate
                data[9] = 0
                data[10] = versionList[k].versionId
                data[11] = 0
                if (versionTypeId != "") {
                    if (versionList[k].versionType.id == versionTypeId) {
                        versionSettingsArray[count] = data;
                        count++;
                    }
                } else {
                    versionSettingsArray[count] = data;
                    count++;
                }
            }
        }
        this.el = jexcel(document.getElementById("tableDiv"), '');
        this.el.destroy();
        var json = [];
        var data = versionSettingsArray;

        var options = {
            data: data,
            columnDrag: true,
            colWidths: [100, 100, 50, 50, 200, 100, 100, 100, 100],
            colHeaderClasses: ["Reqasterisk"],
            columns: [
                {
                    title: 'programId',
                    type: 'hidden',
                },
                {
                    title: i18n.t('static.dashboard.programheader'),
                    type: 'text',
                    readOnly: true
                },
                {
                    title: i18n.t('static.report.version'),
                    type: 'text',
                    readOnly: true
                },
                {
                    title: i18n.t('static.report.versiontype'),
                    type: 'text',
                    readOnly: true
                },
                {
                    title: i18n.t('static.program.programDiscription'),
                    type: 'text'
                },
                {
                    title: i18n.t('static.program.dateCommitted'),
                    readOnly: true,
                    type: 'calendar',
                    options: {
                        format: JEXCEL_DATE_FORMAT_SM
                    }


                },
                {
                    title: i18n.t('static.program.commitedbyUser'),
                    type: 'text',
                    readOnly: true
                },
                {
                    title: i18n.t('static.program.forecastStart'),
                    type: 'calendar',
                    options: {
                        format: JEXCEL_MONTH_PICKER_FORMAT, type: 'year-month-picker'
                    }
                },
                {
                    title: i18n.t('static.program.forecastEnd'),
                    type: 'calendar',
                    options: {
                        format: JEXCEL_MONTH_PICKER_FORMAT, type: 'year-month-picker'
                    }
                },
                {
                    title: 'isLocal',
                    type: 'hidden',
                },
                {
                    title: 'versionId',
                    type: 'hidden',
                },
                {
                    title: 'isChanged',
                    type: 'hidden',
                },

            ],
            text: {
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
            updateTable: function (el, cell, x, y, source, value, id) {
                var elInstance = el.jexcel;
                if (y != null) {
                    var rowData = elInstance.getRowData(y);
                    if (rowData[9] == 1) {
                        var cell = elInstance.getCell(("E").concat(parseInt(y) + 1))
                        cell.classList.remove('readonly');
                        cell = elInstance.getCell(("H").concat(parseInt(y) + 1))
                        cell.classList.remove('readonly');
                        cell = elInstance.getCell(("I").concat(parseInt(y) + 1))
                        cell.classList.remove('readonly');
                    }
                    else {
                        var cell = elInstance.getCell(("E").concat(parseInt(y) + 1))
                        cell.classList.add('readonly');
                        cell = elInstance.getCell(("H").concat(parseInt(y) + 1))
                        cell.classList.add('readonly');
                        cell = elInstance.getCell(("I").concat(parseInt(y) + 1))
                        cell.classList.add('readonly');
                    }
                }
            }.bind(this),
            onchange: this.changed,
            oneditionend: this.oneditionend,
            copyCompatibility: true,
            allowExport: false,
            paginationOptions: JEXCEL_PAGINATION_OPTION,
            position: 'top',
            filters: true,
            license: JEXCEL_PRO_KEY,


        };
        var languageEl = jexcel(document.getElementById("tableDiv"), options);
        this.el = languageEl;
        this.setState({
            languageEl: languageEl, loading: false
        })
    }

    selected = function (instance, cell, x, y, value) {
        if ((x == 0 && value != 0) || (y == 0)) {
            // console.log("HEADER SELECTION--------------------------");
        } else {
        }
    }.bind(this);

    loaded = function (instance, cell, x, y, value) {
        jExcelLoadedFunction(instance);
    }


    componentDidMount() {
        // this.getVersionTypeList();
        this.getDatasetList();
    }

    handleChangeProgram(programIds) {
        programIds = programIds.sort(function (a, b) {
            return parseInt(a.value) - parseInt(b.value);
        })
        this.setState({
            programValues: programIds.map(ele => ele),
            programLabels: programIds.map(ele => ele.label)
        }, () => {
            var programIds = this.state.programValues.map(x => x.value).join(", ");
            console.log("program values ---", programIds);
            programIds = Array.from(new Set(programIds.split(','))).toString();
            this.getDatasetById(programIds);
            // this.filterData()
            //   this.filterTracerCategory(programIds);

        })

    }

    render() {

        const { uniquePrograms } = this.state;
        let programMultiList = uniquePrograms.length > 0
            && uniquePrograms.map((item, i) => {
                return ({ label: item.programCode, value: item.programId })

            }, this);

        programMultiList = Array.from(programMultiList);

        const { versionTypeList } = this.state;
        let versionTypes = versionTypeList.length > 0
            && versionTypeList.map((item, i) => {
                return (
                    <option key={i} value={item.versionTypeId}>
                        {getLabelText(item.label, this.state.lang)}
                    </option>
                )
            }, this);



        return (
            <div className="animated">
                <AuthenticationServiceComponent history={this.props.history} />
                <h5 className={this.props.match.params.color} id="div1">{i18n.t(this.props.match.params.message, { entityname })}</h5>
                <h5 className={this.state.color} id="div2">{i18n.t(this.state.message, { entityname })}</h5>
                <Card>

                    <CardBody className="pb-lg-2 pt-lg-0">

                        <div className="pl-0">
                            <div className="row">
                                <FormGroup className="col-md-3">
                                    <Label htmlFor="appendedInputButton">{i18n.t('static.dashboard.programheader')}</Label>
                                    <div className="controls ">
                                        {/* <InMultiputGroup> */}
                                        <MultiSelect
                                            name="datasetId"
                                            id="datasetId"
                                            bsSize="sm"
                                            value={this.state.programValues}
                                            onChange={(e) => { this.handleChangeProgram(e) }}
                                            options={programMultiList && programMultiList.length > 0 ? programMultiList : []}
                                            labelledBy={i18n.t('static.common.pleaseSelect')}
                                        />
                                    </div>
                                </FormGroup>
                                <FormGroup className="col-md-6">
                                    <Label htmlFor="appendedInputButton">{i18n.t('static.report.versiontype')}</Label>
                                    <div className="controls SelectGo">
                                        <InputGroup>
                                            <Input
                                                type="select"
                                                name="versionTypeId"
                                                id="versionTypeId"
                                                bsSize="sm"
                                                onChange={(e) => { this.buildJExcel() }}
                                            >
                                                <option value="">{i18n.t('static.common.all')}</option>
                                                {versionTypes}

                                            </Input>
                                        </InputGroup>
                                    </div>
                                </FormGroup>
                            </div>
                        </div>

                        {/* <div id="loader" className="center"></div> */}
                        <div id="tableDiv" className={"RemoveStriped"} style={{ display: this.state.loading ? "none" : "block" }}>
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
                    <CardFooter>
                        {/* {AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_MANAGE_REALM_COUNTRY_PLANNING_UNIT') && */}
                        <FormGroup>
                            <Button type="button" size="md" color="danger" className="float-right mr-1" onClick={this.cancelClicked}><i className="fa fa-times"></i> {i18n.t('static.common.cancel')}</Button>
                            {this.state.isChanged && <Button type="submit" size="md" color="success" onClick={this.formSubmit} className="float-right mr-1" ><i className="fa fa-check"></i>{i18n.t('static.common.submit')}</Button>}
                            &nbsp;
                        </FormGroup>
                        {/* } */}
                    </CardFooter>
                </Card>

            </div>
        )
    }
}