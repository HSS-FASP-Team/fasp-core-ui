import React, { Component } from 'react';
import {
    Card, CardBody, CardHeader,
    Label, Input, FormGroup,
    CardFooter, Button, Col, Form
    , FormFeedback
} from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import '../Forms/ValidationForms/ValidationForms.css';
import 'react-select/dist/react-select.min.css';
import getLabelText from '../../CommonComponent/getLabelText.js';
import * as JsStoreFunction from "../../CommonComponent/JsStoreFunctions.js"
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';
import { SECRET_KEY, INDEXED_DB_VERSION, INDEXED_DB_NAME } from '../../Constants.js';
import JSZip from 'jszip';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import i18n from '../../i18n';
import { getDatabase } from '../../CommonComponent/IndexedDbFunctions';
import AuthenticationServiceComponent from '../Common/AuthenticationServiceComponent';
import bsCustomFileInput from 'bs-custom-file-input'
import AuthenticationService from '../Common/AuthenticationService';

const initialValues = {
    programId: ''
}

const validationSchema = function (values) {
    return Yup.object().shape({
        programId: Yup.string()
            .required(i18n.t('static.program.validselectprogramtext'))
    })
}

const validate = (getValidationSchema) => {
    return (values) => {
        const validationSchema = getValidationSchema(values)
        try {
            validationSchema.validateSync(values, { abortEarly: false })
            return {}
        } catch (error) {
            return getErrorsFromValidationError(error)
        }
    }
}

const getErrorsFromValidationError = (validationError) => {
    const FIRST_ERROR = 0
    return validationError.inner.reduce((errors, error) => {
        return {
            ...errors,
            [error.path]: error.errors[FIRST_ERROR],
        }
    }, {})
}


const entityname = i18n.t('static.dashboard.importprogram')
export default class ImportProgram extends Component {

    constructor(props) {
        super(props);
        this.state = {
            programList: [],
            message: '',
            loading: true,
        }
        this.formSubmit = this.formSubmit.bind(this)
        this.importFile = this.importFile.bind(this);
        this.cancelClicked = this.cancelClicked.bind(this);
        this.hideSecondComponent = this.hideSecondComponent.bind(this);
    }

    hideSecondComponent() {
        setTimeout(function () {
            document.getElementById('div2').style.display = 'none';
        }, 8000);
    }

    componentDidMount() {
        bsCustomFileInput.init()
        document.getElementById("programIdDiv").style.display = "none";
        document.getElementById("formSubmitButton").style.display = "none";
        document.getElementById("fileImportDiv").style.display = "block";
        document.getElementById("fileImportButton").style.display = "block";
        this.setState({ loading: false })
    }

    formSubmit() {
        this.setState({ loading: true })
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            if (document.querySelector('input[type=file]').files[0] == undefined) {
                this.setState({ loading: false })
                alert(i18n.t('static.program.selectfile'));
            } else {
                var file = document.querySelector('input[type=file]').files[0];
                var selectedPrgArr = this.state.programId;
                var db1;
                getDatabase();
                var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
                openRequest.onsuccess = function (e) {
                    console.log("in success");
                    db1 = e.target.result;
                    var transaction = db1.transaction(['programData'], 'readwrite');
                    var program = transaction.objectStore('programData');
                    var count = 0;
                    // console.log("ProgramListArray",programListArray)
                    var getRequest = program.getAll();
                    getRequest.onerror = function (event) {
                        // Handle errors!
                    };
                    getRequest.onsuccess = function (event) {
                        var myResult = [];
                        myResult = getRequest.result;
                        var programDataJson = this.state.programListArray;
                        console.log("program data json", programDataJson)
                        for (var i = 0; i < myResult.length; i++) {
                            for (var j = 0; j < programDataJson.length; j++) {
                                for (var k = 0; k < selectedPrgArr.length; k++) {
                                    console.log("1", programDataJson[j].filename);
                                    if (programDataJson[j].filename == selectedPrgArr[k].value) {
                                        var userBytes = CryptoJS.AES.decrypt(localStorage.getItem('curUser'), SECRET_KEY);
                                        var userId = userBytes.toString(CryptoJS.enc.Utf8);
                                        console.log("Id", myResult[i].id)
                                        console.log("Id from list", programDataJson[j].programId + "_v" + programDataJson[j].version + "_uId_" + userId)
                                        if (myResult[i].id == programDataJson[j].programId + "_v" + programDataJson[j].version + "_uId_" + userId) {
                                            count++;
                                        }
                                    }
                                }
                            }
                            console.log("count", count)
                        }
                        if (count == 0) {
                            JSZip.loadAsync(file).then(function (zip) {
                                Object.keys(zip.files).forEach(function (filename) {
                                    zip.files[filename].async('string').then(function (fileData) {
                                        for (var j = 0; j < selectedPrgArr.length; j++) {
                                            if (selectedPrgArr[j].value == filename) {
                                                db1 = e.target.result;
                                                var transaction2 = db1.transaction(['programData'], 'readwrite');
                                                var program2 = transaction2.objectStore('programData');
                                                var json = JSON.parse(fileData.split("@~-~@")[0]);
                                                var userBytes = CryptoJS.AES.decrypt(localStorage.getItem('curUser'), SECRET_KEY);
                                                var userId = userBytes.toString(CryptoJS.enc.Utf8);
                                                json.userId = userId;
                                                json.id = json.programId + "_v" + json.version + "_uId_" + userId
                                                var addProgramDataRequest = program2.put(json);
                                                addProgramDataRequest.onerror = function (event) {
                                                };

                                                // Adding data in downloaded program data

                                                var transaction3 = db1.transaction(['downloadedProgramData'], 'readwrite');
                                                var program3 = transaction3.objectStore('downloadedProgramData');
                                                var json1 = JSON.parse(fileData.split("@~-~@")[1]);
                                                var userBytes1 = CryptoJS.AES.decrypt(localStorage.getItem('curUser'), SECRET_KEY);
                                                var userId1 = userBytes1.toString(CryptoJS.enc.Utf8);
                                                json1.userId = userId1;
                                                json1.id = json1.programId + "_v" + json1.version + "_uId_" + userId1
                                                var addProgramDataRequest1 = program3.put(json1);
                                                addProgramDataRequest1.onerror = function (event) {
                                                };
                                            }

                                        }
                                    })
                                })
                            })
                            this.setState({
                                message: i18n.t('static.program.dataimportsuccess'),
                                loading: false
                            })
                            let id = AuthenticationService.displayDashboardBasedOnRole();
                            this.props.history.push(`/ApplicationDashboard/` + `${id}` + '/green/' + i18n.t('static.program.dataimportsuccess'))
                        } else {
                            confirmAlert({
                                title: i18n.t('static.program.confirmsubmit'),
                                message: i18n.t('static.program.programwithsameversion'),
                                buttons: [
                                    {
                                        label: i18n.t('static.program.yes'),
                                        onClick: () => {
                                            JSZip.loadAsync(file).then(function (zip) {
                                                Object.keys(zip.files).forEach(function (filename) {
                                                    zip.files[filename].async('string').then(function (fileData) {
                                                        for (var j = 0; j < selectedPrgArr.length; j++) {
                                                            if (selectedPrgArr[j].value == filename) {
                                                                db1 = e.target.result;
                                                                var transaction2 = db1.transaction(['programData'], 'readwrite');
                                                                var program2 = transaction2.objectStore('programData');
                                                                var json = JSON.parse(fileData.split("@~-~@")[0]);
                                                                var userBytes = CryptoJS.AES.decrypt(localStorage.getItem('curUser'), SECRET_KEY);
                                                                var userId = userBytes.toString(CryptoJS.enc.Utf8);
                                                                json.userId = userId;
                                                                json.id = json.programId + "_v" + json.version + "_uId_" + userId
                                                                var addProgramDataRequest = program2.put(json);
                                                                addProgramDataRequest.onerror = function (event) {
                                                                };

                                                                // Entry in downloaded program data
                                                                var transaction3 = db1.transaction(['downloadedProgramData'], 'readwrite');
                                                                var program3 = transaction3.objectStore('downloadedProgramData');
                                                                var json1 = JSON.parse(fileData.split("@~-~@")[1]);
                                                                var userBytes1 = CryptoJS.AES.decrypt(localStorage.getItem('curUser'), SECRET_KEY);
                                                                var userId1 = userBytes1.toString(CryptoJS.enc.Utf8);
                                                                json1.userId = userId1;
                                                                json1.id = json1.programId + "_v" + json1.version + "_uId_" + userId1
                                                                var addProgramDataRequest1 = program3.put(json1);
                                                                addProgramDataRequest1.onerror = function (event) {
                                                                };
                                                            }

                                                        }
                                                    })
                                                })
                                            })
                                            this.setState({
                                                message: i18n.t('static.program.dataimportsuccess'),
                                                loading: false
                                            })
                                            let id = AuthenticationService.displayDashboardBasedOnRole();
                                            this.props.history.push(`/ApplicationDashboard/` + `${id}` + '/green/' + i18n.t('static.program.dataimportsuccess'))
                                        }
                                    },
                                    {
                                        label: i18n.t('static.program.no'),
                                        onClick: () => {
                                            this.setState({
                                                message: i18n.t('static.program.actioncancelled'),
                                                loading: false
                                            })
                                            let id = AuthenticationService.displayDashboardBasedOnRole();
                                            this.props.history.push(`/ApplicationDashboard/` + `${id}` + '/red/' + i18n.t('static.program.actioncancelled'))
                                        }
                                    }
                                ]
                            });
                        }
                    }.bind(this)
                }.bind(this)

            }
        }

    }

    importFile() {
        this.setState({ loading: true })
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            if (document.querySelector('input[type=file]').files[0] == undefined) {
                alert(i18n.t('static.program.selectfile'));
            } else {
                var file = document.querySelector('input[type=file]').files[0];
                var fileName = file.name;
                var fileExtenstion = fileName.split(".");
                if (fileExtenstion[fileExtenstion.length - 1] == "zip") {
                    const lan = 'en'
                    JSZip.loadAsync(file).then(function (zip) {
                        var i = 0;
                        var fileName = []
                        var programListArray = []
                        var size = 0;
                        Object.keys(zip.files).forEach(function (filename) {
                            size++;
                        })
                        Object.keys(zip.files).forEach(function (filename) {
                            zip.files[filename].async('string').then(function (fileData) {

                                var programDataJson;
                                console.log("File Data", fileData.split("@~-~@")[0]);
                                try {
                                    programDataJson = JSON.parse(fileData.split("@~-~@")[0]);
                                }
                                catch (err) {
                                    this.setState({ message: i18n.t('static.program.zipfilereaderror'), loading: false },
                                        () => {
                                            this.hideSecondComponent();
                                        })


                                }
                                var bytes = CryptoJS.AES.decrypt(programDataJson.programData, SECRET_KEY);
                                var plaintext = bytes.toString(CryptoJS.enc.Utf8);
                                var programDataJsonDecrypted = JSON.parse(plaintext);
                                console.log("programDatajson", programDataJsonDecrypted.label);
                                console.log("displayName", getLabelText((programDataJsonDecrypted.label), lan));
                                console.log("filename", filename);
                                programDataJson.filename = filename;
                                fileName[i] = {
                                    value: filename, label: (getLabelText((programDataJsonDecrypted.label), lan)) + "~v" + programDataJsonDecrypted.requestedProgramVersion
                                }
                                programListArray[i] = programDataJson;
                                i++;
                                console.log("Program data list in import", programListArray)
                                if (i === size) {
                                    this.setState({
                                        programList: fileName,
                                        programListArray: programListArray,
                                        loading: false
                                    })
                                    console.log("programList", fileName)
                                    console.log("programDataArrayList after state set", programListArray)

                                    document.getElementById("programIdDiv").style.display = "block";
                                    document.getElementById("formSubmitButton").style.display = "block";
                                    document.getElementById("fileImportDiv").style.display = "none";
                                    document.getElementById("fileImportButton").style.display = "none";
                                }
                            }.bind(this))

                        }.bind(this))

                    }.bind(this))
                } else {
                    this.setState({ loading: false })
                    alert(i18n.t('static.program.selectzipfile'))
                }
            }

        }

    }


    touchAll(setTouched, errors) {
        setTouched({
            programId: true
        }
        )
        this.validateForm(errors)
    }

    validateForm(errors) {
        this.findFirstError('simpleForm', (fieldName) => {
            return Boolean(errors[fieldName])
        })
    }

    findFirstError(formName, hasError) {
        const form = document.forms[formName]
        for (let i = 0; i < form.length; i++) {
            if (hasError(form[i].name)) {
                form[i].focus()
                break
            }
        }
    }

    updateFieldData(value) {
        console.log("Value", value);
        // console.log(event.value)
        this.setState({ programId: value });
    }

    render() {
        return (
            <>
                <h5 style={{ color: "red" }} id="div2">
                    {i18n.t(this.state.message, { entityname })}</h5>
                <AuthenticationServiceComponent history={this.props.history} message={(message) => {
                    this.setState({ message: message })
                }} loading={(loading) => {
                    this.setState({ loading: loading })
                }} />
                <Card className="mt-2" style={{ display: this.state.loading ? "none" : "block" }}>
                    <Formik
                        initialValues={initialValues}
                        render={
                            ({
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                            }) => (
                                    <Form noValidate name='simpleForm'>
                                        {/* <CardHeader>
                                            <strong>{i18n.t('static.program.import')}</strong>
                                        </CardHeader> */}
                                        <CardBody className="pb-lg-2 pt-lg-2">
                                            <FormGroup id="fileImportDiv">
                                                <Col md="3">
                                                    <Label className="uploadfilelable" htmlFor="file-input">{i18n.t('static.program.fileinput')}</Label>
                                                </Col>
                                                <Col xs="12" md="4" className="custom-file">
                                                    {/* <Input type="file" id="file-input" name="file-input" /> */}
                                                    <Input type="file" className="custom-file-input" id="file-input" name="file-input" accept=".zip" />
                                                    <label className="custom-file-label" id="file-input">Choose file</label>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup id="programIdDiv" className="col-md-4">
                                                <Label htmlFor="select">{i18n.t('static.program.program')}</Label>
                                                <Select
                                                    bsSize="sm"
                                                    valid={!errors.programId}
                                                    invalid={touched.programId && !!errors.programId}
                                                    onChange={(e) => { handleChange(e); this.updateFieldData(e) }}
                                                    onBlur={handleBlur} name="programId" id="programId"
                                                    multi
                                                    options={this.state.programList}
                                                    value={this.state.programId}
                                                />
                                                <FormFeedback>{errors.programId}</FormFeedback>
                                            </FormGroup>
                                        </CardBody>
                                        <CardFooter>
                                            <FormGroup>

                                                <Button type="button" size="md" color="danger" className="float-right mr-1" onClick={this.cancelClicked}><i className="fa fa-times"></i> {i18n.t('static.common.cancel')}</Button>
                                                <Button type="reset" size="md" color="warning" className="float-right mr-1 text-white"><i className="fa fa-refresh"></i> {i18n.t('static.common.reset')}</Button>

                                                <Button type="button" id="fileImportButton" size="md" color="success" className="float-right mr-1" onClick={() => this.importFile()}><i className="fa fa-check"></i>{i18n.t('static.common.submit')}</Button>
                                                <Button type="button" id="formSubmitButton" size="md" color="success" className="float-right mr-1" onClick={() => this.formSubmit()}><i className="fa fa-check"></i>{i18n.t('static.common.submit')}</Button>
                                                &nbsp;
                                                </FormGroup>
                                        </CardFooter>
                                    </Form>
                                )} />
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

            </>
        )

    }

    cancelClicked() {
        let id = AuthenticationService.displayDashboardBasedOnRole();
        this.props.history.push(`/ApplicationDashboard/` + `${id}` + '/red/' + i18n.t('static.message.cancelled', { entityname }))
    }

}