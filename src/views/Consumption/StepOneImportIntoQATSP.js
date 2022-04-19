import CryptoJS from 'crypto-js';
import jexcel from 'jexcel-pro';
import moment from "moment";
import React, { Component } from 'react';
import Picker from 'react-month-picker';
import {
    Button, FormGroup, Input, InputGroup, Label
} from 'reactstrap';
import "../../../node_modules/jexcel-pro/dist/jexcel.css";
import "../../../node_modules/jsuites/dist/jsuites.css";
import PlanningUnitService from '../../api/PlanningUnitService';
import ProgramService from '../../api/ProgramService';
import TracerCategoryService from "../../api/TracerCategoryService";
import getLabelText from '../../CommonComponent/getLabelText';
import { getDatabase } from "../../CommonComponent/IndexedDbFunctions";
import { contrast } from "../../CommonComponent/JavascriptCommonFunctions";
import { jExcelLoadedFunction } from '../../CommonComponent/JExcelCommonFunctions.js';
import MonthBox from '../../CommonComponent/MonthBox.js';
import { FORECAST_DATEPICKER_START_MONTH, INDEXED_DB_NAME, INDEXED_DB_VERSION, JEXCEL_PAGINATION_OPTION, JEXCEL_PRO_KEY, SECRET_KEY } from '../../Constants.js';
import i18n from '../../i18n';
import AuthenticationServiceComponent from '../Common/AuthenticationServiceComponent';

const pickerLang = {
    months: [i18n.t('static.month.jan'), i18n.t('static.month.feb'), i18n.t('static.month.mar'), i18n.t('static.month.apr'), i18n.t('static.month.may'), i18n.t('static.month.jun'), i18n.t('static.month.jul'), i18n.t('static.month.aug'), i18n.t('static.month.sep'), i18n.t('static.month.oct'), i18n.t('static.month.nov'), i18n.t('static.month.dec')],
    from: 'From', to: 'To',
}

export default class StepOneImportMapPlanningUnits extends Component {
    constructor(props) {
        super(props);

        var dt = new Date();
        dt.setMonth(dt.getMonth() - FORECAST_DATEPICKER_START_MONTH);
        this.state = {
            mapPlanningUnitEl: '',
            lang: localStorage.getItem('lang'),
            rangeValue: { from: { year: dt.getFullYear(), month: dt.getMonth() + 1 }, to: { year: new Date().getFullYear(), month: new Date().getMonth() + 1 } },
            minDate: { year: new Date().getFullYear() - 10, month: new Date().getMonth() + 1 },
            maxDate: { year: new Date().getFullYear() + 10, month: new Date().getMonth() + 1 },
            selSource: [],
            programs: [],
            programId: '',
            versions: [],
            versionId: '',
            datasetList: [],
            datasetList1: [],
            forecastProgramId: '',
            programPlanningUnitList: [],
            tracerCategoryList: [],
            planningUnitList: [],
            planningUnitListJexcel: [],
            stepOneData: [],
            regionList: [],
            supplyPlanPlanningUnitIds: [],
            forecastPlanignUnitListForNotDuplicate: [],
            supplyPlanPlanignUnitListForNotDuplicate: [],
            programObj: []

        }
        this.changed = this.changed.bind(this);
        this.buildJexcel = this.buildJexcel.bind(this);
        this.checkValidation = this.checkValidation.bind(this);
        this.oneditionend = this.oneditionend.bind(this);
        this._handleClickRangeBox = this._handleClickRangeBox.bind(this)
        this.handleRangeChange = this.handleRangeChange.bind(this);
        this.handleRangeDissmis = this.handleRangeDissmis.bind(this);
        this.filterData = this.filterData.bind(this);
        this.getPrograms = this.getPrograms.bind(this);
        this.getProgramDetails = this.getProgramDetails.bind(this);
        this.setProgramId = this.setProgramId.bind(this);
        this.setVersionId = this.setVersionId.bind(this);
        this.setForecastProgramId = this.setForecastProgramId.bind(this);
        this.getDatasetList = this.getDatasetList.bind(this);
        this.getTracerCategoryList = this.getTracerCategoryList.bind(this);
        this.getPlanningUnitList = this.getPlanningUnitList.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.hideSecondComponent = this.hideSecondComponent.bind(this);

    }

    hideSecondComponent() {
        setTimeout(function () {
            document.getElementById('div12').style.display = 'none';
        }, 30000);
    }

    getPlanningUnitList(value) {
        if (value != 0) {
            localStorage.setItem("sesProgramId", value);
            var db1;
            var storeOS;
            var supplyPlanRegionList = [];
            getDatabase();
            var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
            openRequest.onerror = function (event) {
                this.setState({
                    message: i18n.t('static.program.errortext'),
                    color: '#BA0C2F'
                })
                this.hideFirstComponent()
            }.bind(this);
            openRequest.onsuccess = function (e) {
                db1 = e.target.result;
                var programDataTransaction = db1.transaction(['programData'], 'readwrite');
                var programDataOs = programDataTransaction.objectStore('programData');
                var programRequest = programDataOs.get(value != "" && value != undefined ? value : 0);
                programRequest.onerror = function (event) {
                    this.setState({
                        message: i18n.t('static.program.errortext'),
                        color: '#BA0C2F'
                    })
                    this.hideFirstComponent()
                }.bind(this);
                programRequest.onsuccess = function (e) {
                    var programDataBytes = CryptoJS.AES.decrypt(programRequest.result.programData.generalData, SECRET_KEY);
                    var programData = programDataBytes.toString(CryptoJS.enc.Utf8);
                    var programJson = JSON.parse(programData);
                    console.log("value--->", programJson)

                    for (var i = 0; i < programJson.regionList.length; i++) {
                        var regionJson = {
                            name: getLabelText(programJson.regionList[i].label, this.state.lang),
                            id: programJson.regionList[i].regionId,
                            label: programJson.regionList[i].label
                        }
                        supplyPlanRegionList.push(regionJson)

                    }

                    var planningunitTransaction = db1.transaction(['programPlanningUnit'], 'readwrite');
                    var planningunitOs = planningunitTransaction.objectStore('programPlanningUnit');
                    var planningunitRequest = planningunitOs.getAll();
                    var planningList = []
                    planningunitRequest.onerror = function (event) {
                        this.setState({
                            message: i18n.t('static.program.errortext'),
                            color: '#BA0C2F'
                        })
                        this.hideFirstComponent()
                    }.bind(this);
                    planningunitRequest.onsuccess = function (e) {
                        var myResult = [];
                        var programId = (value != "" && value != undefined ? value : 0).split("_")[0];
                        myResult = planningunitRequest.result.filter(c => c.program.id == programId && c.active == true);
                        console.log("myResult----programId-->", programId)
                        console.log("myResult----->", myResult)

                        let dupPlanningUnitObj = myResult.map(ele => ele.planningUnit);
                        console.log("dupPlanningUnitObj-------->2", dupPlanningUnitObj);

                        const ids = dupPlanningUnitObj.map(o => o.id)
                        const filtered = dupPlanningUnitObj.filter(({ id }, index) => !ids.includes(id, index + 1))
                        console.log("programJson1-------->2", filtered);

                        let tempList = [];
                        if (myResult.length > 0) {
                            for (var i = 0; i < myResult.length; i++) {
                                var paJson = {
                                    name: getLabelText(myResult[i].planningUnit.label, this.state.lang) + ' | ' + parseInt(myResult[i].planningUnit.id),
                                    id: parseInt(myResult[i].planningUnit.id),
                                    multiplier: myResult[i].multiplier,
                                    active: myResult[i].active,
                                    forecastingUnit: myResult[i].forecastingUnit
                                }
                                tempList[i] = paJson
                            }
                        }

                        tempList = tempList.sort(function (a, b) {
                            a = a.name.toLowerCase();
                            b = b.name.toLowerCase();
                            return a < b ? -1 : a > b ? 1 : 0;
                        })

                        tempList.unshift({
                            name: i18n.t('static.quantimed.doNotImport'),
                            id: -1,
                            multiplier: 1,
                            active: true,
                            forecastingUnit: []
                        });
                        console.log("tempList===>", tempList)

                        this.setState({
                            planningUnitList: myResult
                            // .sort(function (a, b) {
                            //     a = a.label.toLowerCase();
                            //     b = b.label.toLowerCase();
                            //     return a < b ? -1 : a > b ? 1 : 0;
                            // })
                            ,
                            // filteredForecastingUnit: filtered,
                            // supplyPlanPlanignUnitListForNotDuplicate: filtered,
                            planningUnitListAll: myResult,
                            generalProgramJson: programJson,
                            supplyPlanRegionList: supplyPlanRegionList.sort(function (a, b) {
                                a = a.name.toLowerCase();
                                b = b.name.toLowerCase();
                                return a < b ? -1 : a > b ? 1 : 0;
                            }), loading: false,
                            planningUnitListJexcel: tempList
                        }, () => {
                            this.filterData();
                        })

                    }.bind(this);
                }.bind(this)
            }.bind(this)
        } else {
            this.setState({
                planningUnitList: [],
                loading: false
            })
        }
    }

    getTracerCategoryList() {
        TracerCategoryService.getTracerCategoryListAll()
            .then(response => {
                console.log("response.data----", response.data);
                this.setState({
                    tracerCategoryList: response.data,
                },
                    () => {
                        this.getPlanningUnitList();
                    })
            }).catch(
                error => {
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

    changed = function (instance, cell, x, y, value) {
        this.props.removeMessageText && this.props.removeMessageText();
        if (x == 2) {
            let supplyPlanPlanningUnitId = this.el.getValueFromCoords(2, y);
            if (supplyPlanPlanningUnitId != -1 && supplyPlanPlanningUnitId != null && supplyPlanPlanningUnitId != '') {
                var selectedPlanningUnitObj = this.state.planningUnitList.filter(c => c.planningUnit.id == supplyPlanPlanningUnitId)[0];
                let multiplier = "";
                if (selectedPlanningUnitObj.forecastingUnit.id == this.el.getValueFromCoords(7, y)) {
                    multiplier = (this.el.getValueFromCoords(3, y) / selectedPlanningUnitObj.multiplier).toFixed(6)
                }
                // this.el.setValueFromCoords(6, y, ForecastPlanningUnitId, true);
                // this.el.setValueFromCoords(8, y, selectedPlanningUnitObj.multiplier, true);
                this.el.setValueFromCoords(3, y, multiplier, true);
                // this.el.setValueFromCoords(10, y, 0, true);
                // this.el.setValueFromCoords(11, y, selectedPlanningUnitObj.forecastingUnit.tracerCategory.id, true);
                // let match = this.state.forecastPlanignUnitListForNotDuplicate.filter(c => c.supplyPlanPlanningUnitId == this.el.getValueFromCoords(0, y))
                // if (match.length > 0) {
                //     let index = originalConsumptionList.findIndex(c => c.supplyPlanPlanningUnitId == this.el.getValueFromCoords(0, y))
                //     let tempObj = match[0].forecastPlanningUnitId = forecastPlanningUnitId;
                //     let forecastPlanignUnitListForNotDuplicate = this.state.forecastPlanignUnitListForNotDuplicate;
                //     forecastPlanignUnitListForNotDuplicate[index] = tempObj;
                //     this.setState({
                //         forecastPlanignUnitListForNotDuplicate: forecastPlanignUnitListForNotDuplicate
                //     })
                // } else {
                //     let forecastPlanignUnitListForNotDuplicate = [];
                //     forecastPlanignUnitListForNotDuplicate.push({
                //         supplyPlanPlanningUnitId: this.el.getValueFromCoords(0, y),
                //         forecastPlanningUnitId: forecastPlanningUnitId
                //     });
                //     this.setState({
                //         forecastPlanignUnitListForNotDuplicate: forecastPlanignUnitListForNotDuplicate
                //     })
                // }

                // let forecastPlanignUnitListForNotDuplicate = this.state.forecastPlanignUnitListForNotDuplicate;
                // forecastPlanignUnitListForNotDuplicate.push({
                //     supplyPlanPlanningUnitId: this.el.getValueFromCoords(1, y),
                //     forecastPlanningUnitId: this.el.getValueFromCoords(7, y)
                // })

                // const ids = forecastPlanignUnitListForNotDuplicate.map(o => o.supplyPlanPlanningUnitId)
                // const filtered = forecastPlanignUnitListForNotDuplicate.filter(({ supplyPlanPlanningUnitId }, index) => !ids.includes(supplyPlanPlanningUnitId, index + 1))
                // this.setState({
                //     forecastPlanignUnitListForNotDuplicate: filtered
                // })


            } else {
                // let SupplyPlanningUnitId = this.el.getValueFromCoords(1, y);
                // console.log("MYVALUE----------->1", SupplyPlanningUnitId);

                // let forecastPlanignUnitListForNotDuplicate = this.state.forecastPlanignUnitListForNotDuplicate;
                // console.log("MYVALUE----------->2", forecastPlanignUnitListForNotDuplicate);
                // let index = forecastPlanignUnitListForNotDuplicate.filter(c => c.supplyPlanPlanningUnitId == SupplyPlanningUnitId);
                // console.log("MYVALUE----------->3", index);
                // if (index.length > 0) {
                //     console.log("MYVALUE----------->41", forecastPlanignUnitListForNotDuplicate.filter(c => c.supplyPlanPlanningUnitId != SupplyPlanningUnitId));

                //     this.setState({
                //         forecastPlanignUnitListForNotDuplicate: forecastPlanignUnitListForNotDuplicate.filter(c => c.supplyPlanPlanningUnitId != SupplyPlanningUnitId)
                //     })
                // } else {
                //     console.log("MYVALUE----------->42", forecastPlanignUnitListForNotDuplicate);
                // }



                // let forecastPlanignUnitListForNotDuplicate = this.state.forecastPlanignUnitListForNotDuplicate;
                // let tempForecastPlanignUnitListForNotDuplicate = forecastPlanignUnitListForNotDuplicate;
                // console.log("MYVALUE----------->2", forecastPlanignUnitListForNotDuplicate);
                // for (var i = 0; i < forecastPlanignUnitListForNotDuplicate.length; i++) {

                //     const index = tempForecastPlanignUnitListForNotDuplicate.findIndex(c => c.supplyPlanPlanningUnitId == forecastPlanignUnitListForNotDuplicate[i].forecastPlanningUnitId);
                //     console.log("MYVALUE----------->3", index);
                //     if (index > 0) {
                //         const result = mylist.splice(index, 1);
                //     }

                // }


                // this.el.setValueFromCoords(6, y, '', true);
                // this.el.setValueFromCoords(8, y, '', true);
                this.el.setValueFromCoords(3, y, '', true);
                // this.el.setValueFromCoords(10, y, 0, true);
            }

            var budgetRegx = /^\S+(?: \S+)*$/;
            var col = ("C").concat(parseInt(y) + 1);
            if (value == "") {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setStyle(col, "background-color", "yellow");
                this.el.setComments(col, i18n.t('static.label.fieldRequired'));
            } else {
                if (!(budgetRegx.test(value))) {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.message.spacetext'));
                } else {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setComments(col, "");
                }
            }
        }


        //#Multiplier
        if (x == 3) {
            let supplyPlanUnitId = this.el.getValueFromCoords(2, y);
            var col = ("D").concat(parseInt(y) + 1);
            value = this.el.getValue(`D${parseInt(y) + 1}`, true).toString().replaceAll(",", "");
            // var reg = DECIMAL_NO_REGEX;
            var reg = /^\d{1,6}(\.\d{1,6})?$/;
            if (supplyPlanUnitId != -1) {
                if (value == "") {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.label.fieldRequired'));
                } else {
                    if (!(reg.test(value))) {
                        this.el.setStyle(col, "background-color", "transparent");
                        this.el.setStyle(col, "background-color", "yellow");
                        this.el.setComments(col, i18n.t('static.usagePeriod.conversionTOFUTest'));
                    } else {
                        if (isNaN(Number.parseInt(value)) || value <= 0) {
                            this.el.setStyle(col, "background-color", "transparent");
                            this.el.setStyle(col, "background-color", "yellow");
                            this.el.setComments(col, i18n.t('static.program.validvaluetext'));
                        } else {
                            this.el.setStyle(col, "background-color", "transparent");
                            this.el.setComments(col, "");
                        }
                    }
                }
            } else {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setComments(col, "");
            }

        }
        if (!this.state.isChanged1) {
            this.setState({
                isChanged1: true,
            });
        }
    }

    oneditionend = function (instance, cell, x, y, value) {
        var elInstance = instance.jexcel;
        var rowData = elInstance.getRowData(y);

    }

    loaded = function (instance, cell, x, y, value) {
        // jExcelLoadedFunctionWithoutPagination(instance);
        jExcelLoadedFunction(instance);
        var asterisk = document.getElementsByClassName("resizable")[0];
        var tr = asterisk.firstChild;
        // tr.children[1].classList.add('AsteriskTheadtrTd');
        // tr.children[2].classList.add('AsteriskTheadtrTd');
        // tr.children[3].classList.add('AsteriskTheadtrTd');
    }

    componentDidMount() {
        document.getElementById("stepOneBtn").disabled = true;
        this.getProgramDetails();
    }

    getDatasetList() {
        ProgramService.getDataSetList().then(response => {
            if (response.status == 200) {
                var responseData = response.data;
                var datasetList = [];
                for (var rd = 0; rd < responseData.length; rd++) {

                    // let dupPlanningUnitObj = responseData[rd].map(ele => ele.planningUnit);
                    // console.log("dupPlanningUnitObj-------->2", responseData[rd]);

                    // const ids = dupPlanningUnitObj.map(o => o.id)
                    // const filtered = dupPlanningUnitObj.filter(({ id }, index) => !ids.includes(id, index + 1))
                    // console.log("programJson1-------->2", filtered);


                    var json = {
                        programCode: responseData[rd].programCode,
                        programVersion: responseData[rd].version,
                        programId: responseData[rd].programId,
                        versionId: responseData[rd].version,
                        id: responseData[rd].id,
                        loading: false,
                        forecastStartDate: (responseData[rd].currentVersion.forecastStartDate ? moment(responseData[rd].currentVersion.forecastStartDate).format(`MMM-YYYY`) : ''),
                        forecastStopDate: (responseData[rd].currentVersion.forecastStopDate ? moment(responseData[rd].currentVersion.forecastStopDate).format(`MMM-YYYY`) : ''),
                        healthAreaList: responseData[rd].healthAreaList,
                        actualConsumptionList: responseData[rd].actualConsumptionList,
                        forecastRegionList: responseData[rd].regionList,
                        label: responseData[rd].label,
                        realmCountry: responseData[rd].realmCountry,
                        versionList: responseData[rd].versionList,
                        // filteredForecastingUnit: filtered,

                    }
                    datasetList.push(json);
                }
                // console.log("datasetList0--->", datasetList)
                this.setState({
                    datasetList: datasetList,
                    loading: false
                }, () => {
                    this.props.updateStepOneData("datasetList", datasetList);
                    this.props.updateStepOneData("loading", false);
                })
            } else {
                this.setState({
                    message: response.data.messageCode, loading: false
                }, () => {
                    this.hideSecondComponent();
                })
            }
        }).catch(
            error => {
                // this.getOfflineDatasetList();
            }
        );

    }


    getProgramDetails() {
        var db1;
        getDatabase();
        var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var transaction = db1.transaction(['programQPLDetails'], 'readwrite');
            var program = transaction.objectStore('programQPLDetails');
            var getRequest = program.getAll();
            var programs = [];

            getRequest.onerror = function (event) {
                // Handle errors!
            };
            getRequest.onsuccess = function (event) {
                var myResult = [];
                myResult = getRequest.result;
                console.log("DATASET----------->", myResult);
                // this.setState({
                //     programs: myResult
                // });


                var userBytes = CryptoJS.AES.decrypt(localStorage.getItem('curUser'), SECRET_KEY);
                var userId = userBytes.toString(CryptoJS.enc.Utf8);
                console.log("DATASET------userId----->", userId);

                var filteredGetRequestList = myResult.filter(c => c.userId == userId);

                for (var i = 0; i < filteredGetRequestList.length; i++) {
                    programs.push({
                        programCode: filteredGetRequestList[i].programCode,
                        programVersion: filteredGetRequestList[i].version,
                        programId: filteredGetRequestList[i].programId,
                        id: filteredGetRequestList[i].id,
                        loading: false,
                    });
                }
                console.log("DATASET-------->", programs);
                this.setState({
                    programs: programs,
                    loading: false
                }, () => {
                    this.getDatasetList();
                })
                this.props.updateStepOneData("programs", programs);
            }.bind(this);
        }.bind(this);
    }

    getPrograms(value) {
        if (value != 0) {
            var programId = value.split("_")[0];
            var db1;
            getDatabase();
            var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
            openRequest.onerror = function (event) {
                this.setState({
                    message: i18n.t('static.program.errortext'),
                    color: '#BA0C2F'
                })
                this.hideFirstComponent()
            }.bind(this);
            openRequest.onsuccess = function (e) {
                db1 = e.target.result;
                var programDataTransaction1 = db1.transaction(['program'], 'readwrite');
                var programDataOs1 = programDataTransaction1.objectStore('program');
                var programRequest1 = programDataOs1.get(programId != "" && programId != undefined ? Number(programId) : 0);
                programRequest1.onerror = function (event) {
                    this.setState({
                        message: i18n.t('static.program.errortext'),
                        color: '#BA0C2F'
                    })
                    this.hideFirstComponent()
                }.bind(this);
                programRequest1.onsuccess = function (e) {
                    var myResult = [];
                    myResult = programRequest1.result;
                    console.log("myResult--->", myResult)

                    this.setState({
                        programObj: myResult,
                        loading: false
                    })
                }.bind(this);
            }.bind(this)
        } else {
            this.setState({
                programObj: [],
                loading: false
            })
        }

    }

    handleRangeChange(value, text, listIndex) {
        //
    }
    handleRangeDissmis(value) {
        this.setState({ rangeValue: value })
        this.filterData();
    }

    _handleClickRangeBox(e) {
        this.refs.pickRange.show()
    }

    makeText = m => {
        if (m && m.year && m.month) return (pickerLang.months[m.month - 1] + '. ' + m.year)
        return '?'
    }

    filterData() {
        this.setState({
            loading: true
        })

        let programId = document.getElementById("programId").value;
        let versionId = document.getElementById("versionId").value;
        let forecastProgramId = document.getElementById("forecastProgramId").value;

        let startDate = this.state.rangeValue.from.year + '-' + this.state.rangeValue.from.month + '-01';
        let stopDate = this.state.rangeValue.to.year + '-' + this.state.rangeValue.to.month + '-' + new Date(this.state.rangeValue.to.year, this.state.rangeValue.to.month, 0).getDate();
        var programIdSplit = programId != 0 ? programId.split("_")[0] : 0;
        if (versionId != 0 && programIdSplit > 0 && forecastProgramId > 0) {
            let selectedSupplyPlanProgram = this.state.programObj;
            let selectedForecastProgram = this.state.datasetList.filter(c => c.programId == forecastProgramId && c.versionId == this.state.forecastProgramVersionId)[0];

            if (selectedSupplyPlanProgram.realmCountry.realmCountryId == selectedForecastProgram.realmCountry.realmCountryId) {
                // this.props.updateStepOneData("loading", true);
                this.props.updateStepOneData("programId", programId);
                this.props.updateStepOneData("versionId", versionId);
                this.props.updateStepOneData("forecastProgramId", forecastProgramId);
                this.props.updateStepOneData("startDate", startDate);
                this.props.updateStepOneData("stopDate", stopDate);


                document.getElementById("stepOneBtn").disabled = false;
                PlanningUnitService.getPlanningUnitListByProgramVersionIdForSelectedForecastMap(forecastProgramId, versionId)
                    .then(response => {
                        if (response.status == 200) {
                            this.setState({
                                programPlanningUnitList: response.data,
                                selSource: response.data,
                                message: ''
                            }, () => {
                                if (response.data.length == 0) {
                                    document.getElementById("stepOneBtn").disabled = true;
                                }
                                this.buildJexcel();
                                console.log("response.data,,,,", response.data)
                            })
                        } else {
                            this.setState({
                                programPlanningUnitList: []
                            });
                        }
                    }).catch(
                        error => {
                            if (error.message === "Network Error") {
                                this.setState({
                                    message: 'static.unkownError',
                                    loading: false, color: 'red'
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
                                            loading: false, color: 'red'
                                        });
                                        break;
                                    case 412:
                                        this.setState({
                                            message: error.response.data.messageCode,
                                            loading: false, color: 'red'
                                        });
                                        break;
                                    default:
                                        this.setState({
                                            message: 'static.unkownError',
                                            loading: false, color: 'red'
                                        });
                                        break;
                                }
                            }
                        }
                    );
            } else {
                this.setState({
                    message: i18n.t('static.importFromQATSupplyPlan.belongsSameCountry'),
                    color: 'red'
                },
                    () => {
                        // this.hideSecondComponent();
                    })
            }

        } else if (forecastProgramId == 0) {
            this.setState({
                programPlanningUnitList: [],
                selSource: [],
                message: i18n.t('static.importFromQATSupplyPlan.pleaseSelectForecastProgram'),
            })
            this.el = jexcel(document.getElementById("mapPlanningUnit"), '');
            this.el.destroy();
            document.getElementById("stepOneBtn").disabled = true;
        } else if (versionId == 0) {
            this.setState({
                programPlanningUnitList: [],
                selSource: [],
                message: i18n.t('static.importIntoQATSupplyPlan.pleaseSelectForecastProgramVersion'),
            })
            this.el = jexcel(document.getElementById("mapPlanningUnit"), '');
            this.el.destroy();
            document.getElementById("stepOneBtn").disabled = true;
        } else if (programId == 0) {
            this.setState({
                programPlanningUnitList: [],
                selSource: [],
                message: i18n.t('static.importFromQATSupplyPlan.selectSupplyPlanProgram'),
            })
            this.el = jexcel(document.getElementById("mapPlanningUnit"), '');
            this.el.destroy();
            document.getElementById("stepOneBtn").disabled = true;
        } else {
            this.setState({
                programPlanningUnitList: [],
                selSource: [],
                message: ''
            })
            this.el = jexcel(document.getElementById("mapPlanningUnit"), '');
            this.el.destroy();
            document.getElementById("stepOneBtn").disabled = true;
        }

    }

    buildJexcel() {
        // console.log("")
        var papuList = this.state.selSource;
        var data = [];
        var papuDataArr = [];
        var count = 0;
        if (papuList.length != 0) {
            for (var j = 0; j < papuList.length; j++) {

                let planningUnitObj = null;
                planningUnitObj = this.state.planningUnitList.filter(c => c.planningUnit.id == papuList[j].forecastingUnit.id)[0];
                data = [];
                data[0] = getLabelText(papuList[j].forecastingUnit.tracerCategory.label, this.state.lang)
                data[1] = getLabelText(papuList[j].label, this.state.lang) + ' | ' + papuList[j].id
                data[2] = planningUnitObj == null ? "" : planningUnitObj.planningUnit.id
                data[3] = planningUnitObj == null ? "" : papuList[j].multiplier
                data[4] = planningUnitObj == null ? "" : planningUnitObj.forecastingUnit.tracerCategory.id
                data[5] = papuList[j].forecastingUnit.tracerCategory.id
                data[6] = papuList[j].id

                // let selectedForecastProgram = this.state.datasetList.filter(c => c.programId == document.getElementById("forecastProgramId").value && c.versionId == this.state.forecastProgramVersionId)[0];
                // console.log("selectedForecastProgram--->", selectedForecastProgram)
                // let filteredForecastingUnit = selectedForecastProgram.filteredForecastingUnit;
                // let match = filteredForecastingUnit.filter(c => c.id == papuList[j].forecastingUnit.id);

                // let selectedForecastProgram = this.state.datasetList.filter(c => c.programId == document.getElementById("forecastProgramId").value)[0];
                // let filteredPlanningUnit = selectedForecastProgram.filteredPlanningUnit;
                // // console.log("filteredPlanningUnit---------->", filteredPlanningUnit);
                // let match = filteredPlanningUnit.filter(c => c.id == papuList[j].planningUnit.id);

                // if (match.length > 0) {
                //     data[6] = 1
                //     data[5] = getLabelText(papuList[j].planningUnit.label, this.state.lang) + ' | ' + papuList[j].planningUnit.id
                //     // data[8] = papuList[j].multiplier
                //     // data[9] = 1
                //     // data[10] = 1
                //     // data[11] = planningUnitObj.forecastingUnit.tracerCategory.id

                // forecastPlanignUnitListForNotDuplicate.push({
                //     supplyPlanPlanningUnitId: papuList[j].planningUnit.id,
                //     forecastPlanningUnitId: papuList[j].planningUnit.id
                // });
                // } else {
                //     data[6] = ''
                //     data[5] = ''
                //     // data[8] = ''
                //     // data[9] = ''
                //     // data[10] = ''
                //     // data[11] = ''
                // }
                // data[12] = planningUnitObj.forecastingUnit.forecastingUnitId

                papuDataArr[count] = data;
                count++;
                // }

            }
        }

        this.el = jexcel(document.getElementById("mapPlanningUnit"), '');
        this.el.destroy();

        this.el = jexcel(document.getElementById("mapRegion"), '');
        this.el.destroy();

        this.el = jexcel(document.getElementById("mapImport"), '');
        this.el.destroy();

        var json = [];
        var data = papuDataArr;

        var options = {
            data: data,
            columnDrag: true,
            colWidths: [50, 100, 100, 100, 100, 50],
            columns: [

                {
                    title: 'Forecast Tracer Category',
                    type: 'text',
                    readOnly: true//0 A
                },
                {
                    title: 'Forecast Planning Unit',
                    type: 'text',
                    readOnly: true//1 B
                },
                {
                    title: 'Supply Plan Planning Unit',
                    type: 'autocomplete',
                    source: this.state.planningUnitListJexcel,//2 C
                    // filter: this.filterPlanningUnitBasedOnTracerCategory
                },
                {
                    title: i18n.t('static.importFromQATSupplyPlan.conversionFactor'),
                    type: 'numeric',
                    decimal: '.',
                    // readOnly: true,
                    textEditor: true,//3 D
                },
                {
                    title: 'Id',
                    type: 'hidden',
                    // readOnly: true//4 E
                },
                {
                    title: 'Id',
                    type: 'hidden',
                    // readOnly: true//5 F
                },
                {
                    title: 'Forcast planning unit id',
                    type: 'hidden',
                    readOnly: true//6 G
                }


                // {
                //     title: 'Supply Plan Planning Unit Id',
                //     type: 'hidden',
                //     readOnly: true//0 A
                // },
                // {
                //     title: i18n.t('static.importFromQATSupplyPlan.supplyPlanPlanningUnit'),
                //     type: 'text',
                //     readOnly: true,//1 B
                // },
                // {
                //     title: 'multiplier',
                //     type: 'hidden',
                //     readOnly: true//2 C
                // },
                // {
                //     title: 'forecastingUnitId',
                //     type: 'hidden',
                //     readOnly: true//3 D
                // },
                // {
                //     title: 'tracerCategoryId',
                //     type: 'hidden',
                //     readOnly: true//4 E
                // },
                // {
                //     title: 'Forecast Planning Unit Id',
                //     type: 'hidden',
                //     readOnly: true//5 F
                // },
                // {
                //     title: i18n.t('static.importFromQATSupplyPlan.forecastPlanningUnit'),
                //     // readOnly: true,
                //     type: 'autocomplete',
                //     source: this.state.planningUnitListJexcel,
                //     filter: this.filterPlanningUnitBasedOnTracerCategory//6 G
                // },
                // {
                //     title: 'ForecastMultiplier',
                //     type: 'hidden',
                //     readOnly: true//7 H
                // },
                // {
                //     title: i18n.t('static.importFromQATSupplyPlan.conversionFactor'),
                //     type: 'numeric',
                //     decimal: '.',
                //     // readOnly: true,
                //     textEditor: true,//8 I
                // },
                // {
                //     title: 'Match',
                //     type: 'hidden',
                //     readOnly: true//9 J
                // },


            ],
            updateTable: function (el, cell, x, y, source, value, id) {
                if (y != null) {
                    var elInstance = el.jexcel;
                    //left align
                    elInstance.setStyle(`C${parseInt(y) + 1}`, 'text-align', 'left');
                    var rowData = elInstance.getRowData(y);


                    var match = rowData[6];
                    // console.log("addRowId------>", addRowId);
                    if (match == 1) {// grade out
                        var cell1 = elInstance.getCell(`D${parseInt(y) + 1}`)
                        cell1.classList.add('readonly');
                    } else {
                        var cell1 = elInstance.getCell(`D${parseInt(y) + 1}`)
                        cell1.classList.remove('readonly');
                    }

                    var doNotImport = rowData[2];
                    if (doNotImport == -1) {// grade out
                        // var cell1 = elInstance.getCell(`B${parseInt(y) + 1}`)
                        // cell1.classList.add('readonly');
                        // var cell1 = elInstance.getCell(`G${parseInt(y) + 1}`)
                        // cell1.classList.add('readonly');

                        elInstance.setStyle(`C${parseInt(y) + 1}`, 'background-color', 'transparent');
                        elInstance.setStyle(`C${parseInt(y) + 1}`, 'background-color', '#f48282');
                        let textColor = contrast('#f48282');
                        elInstance.setStyle(`C${parseInt(y) + 1}`, 'color', textColor);

                        var cell1 = elInstance.getCell(`D${parseInt(y) + 1}`)
                        cell1.classList.add('readonly');

                    } else {
                        // var cell1 = elInstance.getCell(`B${parseInt(y) + 1}`)
                        // cell1.classList.remove('readonly');
                        // var cell1 = elInstance.getCell(`G${parseInt(y) + 1}`)
                        // cell1.classList.remove('readonly');
                        // elInstance.setStyle(`G${parseInt(y) + 1}`, 'background-color', 'transparent');

                        // var cell1 = elInstance.getCell(`I${parseInt(y) + 1}`)
                        // cell1.classList.remove('readonly');
                    }


                }

            }.bind(this),
            // selectionCopy: false,
            // pagination: localStorage.getItem("sesRecordCount"),
            pagination: 5000000,
            filters: true,
            search: true,
            columnSorting: true,
            tableOverflow: true,
            wordWrap: true,
            paginationOptions: JEXCEL_PAGINATION_OPTION,
            position: 'top',
            allowInsertColumn: false,
            allowManualInsertColumn: false,
            // allowDeleteRow: true,
            onchange: this.changed,
            // oneditionend: this.onedit,
            copyCompatibility: true,
            allowManualInsertRow: false,
            parseFormulas: true,
            // onpaste: this.onPaste,
            // oneditionend: this.oneditionend,
            text: {
                showingPage: `${i18n.t('static.jexcel.showing')} {0} ${i18n.t('static.jexcel.of')} {1} ${i18n.t('static.jexcel.pages')}`,
                show: '',
                entries: '',
            },
            onload: this.loaded,
            editable: true,
            license: JEXCEL_PRO_KEY,
            // contextMenu: false
            contextMenu: function (obj, x, y, e) {
                return false;
            }.bind(this)
        };

        this.el = jexcel(document.getElementById("mapPlanningUnit"), options);
        this.setState({
            loading: false,
            // forecastPlanignUnitListForNotDuplicate: forecastPlanignUnitListForNotDuplicate
        })
        this.props.updateStepOneData("loading", false);
    }

    filterPlanningUnitBasedOnTracerCategory = function (instance, cell, c, r, source) {
        var mylist = [];
        var value = (instance.jexcel.getJson(null, false)[r])[5];

        var mylist = this.state.planningUnitListJexcel;
        console.log("mylist--------->100", mylist);
        // let filteredPlanningUnit = this.state.supplyPlanPlanignUnitListForNotDuplicate;

        // let mylistTemp = [];
        // mylistTemp.push(mylist[0]);
        // console.log("mylist--------->100", filteredPlanningUnit.length);

        // for (var i = 0; i < filteredPlanningUnit.length; i++) {
        //     mylistTemp.push(mylist.filter(c => c.id == filteredPlanningUnit[i].id)[0]);
        // }
        // console.log("mylist--------->101", filteredPlanningUnit);
        // console.log("mylist--------->102", mylistTemp);

        // mylist = mylistTemp;

        // console.log("mylist--------->1021", mylist);

        if (value > 0) {
            mylist = mylist.filter(c => (c.id == -1 ? c : c.forecastingUnit.tracerCategory.id == value && c.active.toString() == "true"));
        }

        // console.log("mylist--------->103", mylist);

        // let forecastPlanignUnitListForNotDuplicate = this.state.forecastPlanignUnitListForNotDuplicate;
        // console.log("mylist--------->104", forecastPlanignUnitListForNotDuplicate);
        // for (var i = 0; i < forecastPlanignUnitListForNotDuplicate.length; i++) {

        //     const index = mylist.findIndex(c => c.id == forecastPlanignUnitListForNotDuplicate[i].forecastPlanningUnitId);
        //     console.log("mylist--------->1041", index);
        //     if (index > 0) {
        //         const result = mylist.splice(index, 1);
        //     }

        // }


        // console.log("mylist--------->105", mylist);

        return mylist;

    }.bind(this)

    setProgramId(e) {
        var progId = e.target.value
        this.setState({
            programId: progId,
            // versionId: ''
        }, () => {
            this.getPrograms(progId)
            this.getPlanningUnitList(progId);
            // this.filterData();
        })

    }

    filterVersion = () => {
        // let programId = document.getElementById("programId").value;
        let forecastProgramId = this.state.forecastProgramId;
        if (forecastProgramId != 0) {
            const forecastProgram = this.state.datasetList.filter(c => c.programId == forecastProgramId)
            this.setState({
                versions: [],
            }, () => {
                this.setState({
                    selectedForecastProgram: forecastProgram,

                    versions: (forecastProgram[0].versionList.filter(function (x, i, a) {
                        return a.indexOf(x) === i;
                    })).reverse()
                }, () => { });
            });

        } else {

            this.setState({
                versions: [],

            }, () => { })

        }
    }

    setVersionId(event) {

        this.setState({
            versionId: event.target.value
        }, () => {
            this.filterData();
        })

    }

    setForecastProgramId(e) {
        var sel = document.getElementById("forecastProgramId");
        // var tempId = sel.options[sel.selectedIndex].text;
        // let forecastProgramVersionId = tempId.split('~')[1];
        console.log("forecastProgramVersionId-------->", e.target.value);

        let selectedForecastProgram = this.state.datasetList.filter(c => c.programId == e.target.value)[0]
        let startDateSplit = selectedForecastProgram.forecastStartDate.split('-');
        // let stopDateSplit = selectedForecastProgram.forecastStopDate.split('-');
        let forecastStopDate = new Date(selectedForecastProgram.forecastStopDate);
        forecastStopDate.setMonth(forecastStopDate.getMonth() - 1);

        this.setState({
            forecastProgramId: e.target.value,
            rangeValue: { from: { year: startDateSplit[1] - 3, month: new Date(selectedForecastProgram.forecastStartDate).getMonth() + 1 }, to: { year: forecastStopDate.getFullYear(), month: forecastStopDate.getMonth() + 1 } },
            // forecastProgramVersionId: forecastProgramVersionId,
            versionId: ''
        }, () => {
            // this.props.updateStepOneData("forecastProgramVersionId", forecastProgramVersionId);
            this.filterVersion();
            this.filterData();
        })
    }

    checkValidation = function () {
        var valid = true;
        var json = this.el.getJson(null, false);
        // console.log("json.length-------", json.length);
        for (var y = 0; y < json.length; y++) {
            var value = this.el.getValueFromCoords(2, y);
            // var tracerCategoryId = this.el.getValueFromCoords(5, y);
            // var selectedPUTracerCategoryId = this.el.getValueFromCoords(11, y);
            // console.log("tracerCategoryId==>", tracerCategoryId)
            // console.log("selectedPUTracerCategoryId==>", selectedPUTracerCategoryId)
            if (value != -1) {
                //ForecastPlanningUnit
                var budgetRegx = /^\S+(?: \S+)*$/;
                var col = ("C").concat(parseInt(y) + 1);
                var value = this.el.getValueFromCoords(2, y);
                console.log("value-----", value);
                if (value == "") {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.label.fieldRequired'));
                    valid = false;
                    // } else if (tracerCategoryId != selectedPUTracerCategoryId) {
                    //     this.el.setStyle(col, "background-color", "transparent");
                    //     this.el.setStyle(col, "background-color", "yellow");
                    //     this.el.setComments(col, i18n.t('static.common.tracerCategoryInvalidSelection'));
                    //     valid = false;
                } else if (!(budgetRegx.test(value))) {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.message.spacetext'));
                    valid = false;
                } else {
                    for (var i = (json.length - 1); i >= 0; i--) {
                        var map = new Map(Object.entries(json[i]));

                        var planningUnitValue = map.get("2");
                        if (planningUnitValue == value && y != i && i > y) {
                            this.el.setStyle(col, "background-color", "transparent");
                            this.el.setStyle(col, "background-color", "yellow");
                            this.el.setComments(col, i18n.t('static.message.planningUnitAlreadyExists'));
                            i = -1;
                            valid = false;
                        } else {
                            this.el.setStyle(col, "background-color", "transparent");
                            this.el.setComments(col, "");
                        }
                    }
                }

                // multiplier
                var col = ("D").concat(parseInt(y) + 1);
                var value = this.el.getValueFromCoords(3, y);
                var reg = /^\d{1,6}(\.\d{1,6})?$/;
                if (value == "") {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.label.fieldRequired'));
                    valid = false;
                } else {
                    if (!(reg.test(value))) {
                        this.el.setStyle(col, "background-color", "transparent");
                        this.el.setStyle(col, "background-color", "yellow");
                        this.el.setComments(col, i18n.t('static.usagePeriod.conversionFactorTestString'));
                    } else {
                        if (isNaN(Number.parseInt(value)) || value <= 0) {
                            this.el.setStyle(col, "background-color", "transparent");
                            this.el.setStyle(col, "background-color", "yellow");
                            this.el.setComments(col, i18n.t('static.program.validvaluetext'));
                        } else {
                            this.el.setStyle(col, "background-color", "transparent");
                            this.el.setComments(col, "");
                        }
                    }
                }

            }

        }
        return valid;
    }


    formSubmit = function () {
        var validation = this.checkValidation();
        // console.log("validation------->", validation)
        if (validation == true) {
            this.setState({ loading: true })
            var tableJson = this.el.getJson(null, false);
            // console.log("tableJson---", tableJson);
            let changedpapuList = [];
            let supplyPlanPlanningUnitIds = [];

            for (var i = 0; i < tableJson.length; i++) {
                var map1 = new Map(Object.entries(tableJson[i]));
                if (parseInt(map1.get("2")) != -1) {
                    let json = {
                        supplyPlanPlanningUnitId: parseInt(map1.get("2")),
                        forecastPlanningUnitId: parseInt(map1.get("6")),
                        multiplier: map1.get("3").toString().replace(/,/g, ""),
                        supplyPlanPlanningUnitDesc: this.state.planningUnitListJexcel.filter(c => c.id == parseInt(map1.get("2")))[0].name
                    }
                    supplyPlanPlanningUnitIds.push(json)
                }
            }
            // changedpapuList.push(supplyPlanPlanningUnitIds)

            let json = {
                supplyPlanRegionList: this.state.supplyPlanRegionList,
                forecastRegionList: this.state.datasetList.filter(c => c.programId == this.state.forecastProgramId)[0].forecastRegionList,
            }
            changedpapuList.push(json);

            this.setState({
                stepOneData: changedpapuList,
                regionList: changedpapuList,
                supplyPlanPlanningUnitIds: supplyPlanPlanningUnitIds

            }, () => {
                this.props.finishedStepOne();
            })

            this.props.updateStepOneData("stepOneData", changedpapuList);
            this.props.updateStepOneData("regionList", changedpapuList);
            this.props.updateStepOneData("supplyPlanPlanningUnitIds", supplyPlanPlanningUnitIds);

            console.log("FINAL SUBMIT changedpapuList---", changedpapuList);
        } else {
            console.log("Something went wrong");
        }
        // this.props.finishedStepOne();
    }

    render() {
        const { rangeValue } = this.state

        const { programs } = this.state;
        let programList = programs.length > 0
            && programs.map((item, i) => {
                return (
                    <option key={i} value={item.id}>
                        {item.programCode + ' v' + item.programVersion}
                    </option>
                )
            }, this);


        const { versions } = this.state;
        let versionList = versions.length > 0
            && versions.map((item, i) => {
                return (
                    <option key={i} value={item.versionId}>
                        {/* {item.versionId} */}
                        {((item.versionStatus.id == 2 && item.versionType.id == 2) ? item.versionId + '*' : item.versionId)} (Sept 8th 22)
                    </option>
                )
            }, this);


        const { datasetList } = this.state;
        let datasets = datasetList.length > 0
            && datasetList.map((item, i) => {
                return (
                    <option key={i} value={item.programId}>
                        {item.programCode}
                    </option>
                )
            }, this);

        return (
            <>
                <AuthenticationServiceComponent history={this.props.history} />
                <h5 className="red" id="div12">{this.state.message}</h5>

                <div style={{ display: this.props.items.loading ? "none" : "block" }} >
                    <div className="row ">
                        <FormGroup className="col-md-4">
                            {/* <Label htmlFor="appendedInputButton">{i18n.t('static.importFromQATSupplyPlan.supplyPlanProgram')}</Label> */}
                            <Label htmlFor="appendedInputButton">Forecast Program</Label>
                            <div className="controls ">
                                <InputGroup>
                                    <Input
                                        type="select"
                                        name="forecastProgramId"
                                        id="forecastProgramId"
                                        bsSize="sm"
                                        onChange={(e) => { this.setForecastProgramId(e); }}
                                        value={this.state.forecastProgramId}
                                    >
                                        <option value="0">{i18n.t('static.common.select')}</option>
                                        {datasets}
                                    </Input>

                                </InputGroup>
                            </div>
                        </FormGroup>

                        <FormGroup className="col-md-4">
                            {/* <Label htmlFor="appendedInputButton">{i18n.t('static.importFromQATSupplyPlan.supplyPlanVersion')}</Label> */}
                            <Label htmlFor="appendedInputButton">Forecast version</Label>
                            <div className="controls">
                                <InputGroup>
                                    <Input
                                        type="select"
                                        name="versionId"
                                        id="versionId"
                                        bsSize="sm"
                                        onChange={(e) => { this.setVersionId(e); }}
                                        value={this.state.versionId}
                                    >
                                        <option value="0">{i18n.t('static.common.select')}</option>
                                        {/* <option value="1">1</option> */}
                                        {versionList}
                                    </Input>

                                </InputGroup>
                            </div>
                        </FormGroup>

                        <FormGroup className="col-md-4">
                            {/* <Label htmlFor="appendedInputButton">{i18n.t('static.importFromQATSupplyPlan.forecastProgram')}</Label> */}
                            <Label htmlFor="appendedInputButton">Supply Plan Program</Label>
                            <div className="controls ">
                                <InputGroup>
                                    <Input
                                        type="select"
                                        name="programId"
                                        id="programId"
                                        bsSize="sm"
                                        onChange={(e) => { this.setProgramId(e); }}
                                        value={this.state.programId}
                                    >
                                        <option value="0">{i18n.t('static.common.select')}</option>
                                        {programList}

                                    </Input>

                                </InputGroup>
                            </div>
                        </FormGroup>
                        <FormGroup className="col-md-4">
                            <Label htmlFor="appendedInputButton">{i18n.t('static.importFromQATSupplyPlan.Range')}<span className="stock-box-icon fa fa-sort-desc"></span></Label>
                            <div className="controls  Regioncalender">

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
                    </div>

                </div>

                <div className="table-responsive" style={{ display: this.props.items.loading ? "none" : "block" }} >

                    <div id="mapPlanningUnit" style={{ marginTop: '-15px' }}>
                    </div>
                </div>
                <div style={{ display: this.props.items.loading ? "block" : "none" }}>
                    <div className="d-flex align-items-center justify-content-center" style={{ height: "500px" }} >
                        <div class="align-items-center">
                            <div ><h4> <strong>{i18n.t('static.loading.loading')}</strong></h4></div>

                            <div class="spinner-border blue ml-4" role="status">

                            </div>
                        </div>
                    </div>
                </div>
                <FormGroup>
                    <Button color="info" size="md" className="float-right mr-1" id="stepOneBtn" type="submit" onClick={() => this.formSubmit()} >{i18n.t('static.common.next')} <i className="fa fa-angle-double-right"></i></Button>
                </FormGroup>
            </>
        );
    }

}