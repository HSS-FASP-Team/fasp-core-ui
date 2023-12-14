import React, { Component } from 'react';
import { OrgDiagram } from 'basicprimitivesreact';
// import { PDFDocument } from 'pdfkit';
import "jspdf-autotable";
import cleanUp from '../../assets/img/calculator.png';
import AggregationNode from '../../assets/img/Aggregation-icon.png';
import { LOGO } from '../../CommonComponent/Logo.js';
import { LCA, Tree, Colors, PageFitMode, Enabled, OrientationType, LevelAnnotationConfig, AnnotationType, LineType, Thickness, TreeLevels } from 'basicprimitives';
import { DropTarget, DragSource } from 'react-dnd';
import i18n from '../../i18n'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Formik } from 'formik';
import * as Yup from 'yup'
import '../../views/Forms/ValidationForms/ValidationForms.css'
import { Row, Col, Card, CardFooter, Button, CardBody, Form, Modal, ModalBody, PopoverBody, Popover, ModalFooter, ModalHeader, FormGroup, Label, FormFeedback, Input, InputGroupAddon, Collapse, InputGroupText, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, ButtonDropdown, InputGroup } from 'reactstrap';
import Provider from '../../Samples/Provider'
import AuthenticationServiceComponent from '../Common/AuthenticationServiceComponent';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import getLabelText from '../../CommonComponent/getLabelText';
import moment from 'moment';
import Picker from 'react-month-picker';
import SelectSearch from 'react-select-search';
import MonthBox from '../../CommonComponent/MonthBox.js';
import { NUMBER_NODE_ID, JEXCEL_DECIMAL_CATELOG_PRICE_SHIPMENT, PERCENTAGE_NODE_ID, FU_NODE_ID, PU_NODE_ID, ROUNDING_NUMBER, INDEXED_DB_NAME, INDEXED_DB_VERSION, TREE_DIMENSION_ID, SECRET_KEY, JEXCEL_MONTH_PICKER_FORMAT, JEXCEL_PAGINATION_OPTION, JEXCEL_PRO_KEY, JEXCEL_DECIMAL_NO_REGEX_LONG, DATE_FORMAT_CAP_WITHOUT_DATE, JEXCEL_DECIMAL_MONTHLY_CHANGE_4_DECIMAL_POSITIVE, JEXCEL_DECIMAL_MONTHLY_CHANGE, DATE_FORMAT_CAP, TITLE_FONT, JEXCEL_DECIMAL_CATELOG_PRICE, JEXCEL_INTEGER_REGEX } from '../../Constants.js'
import { getDatabase } from "../../CommonComponent/IndexedDbFunctions";
import jexcel from 'jspreadsheet';
import "../../../node_modules/jspreadsheet/dist/jspreadsheet.css";
import "../../../node_modules/jsuites/dist/jsuites.css";
import { jExcelLoadedFunction, jExcelLoadedFunctionOnlyHideRow } from '../../CommonComponent/JExcelCommonFunctions.js'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import pdfIcon from '../../assets/img/pdf.png';
import CryptoJS from 'crypto-js'
import { MultiSelect } from 'react-multi-select-component';
import Draggable from 'react-draggable';
import { Bar } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { grey } from '@material-ui/core/colors';
import docicon from '../../assets/img/doc.png'
import { saveAs } from "file-saver";
import { convertInchesToTwip, Document, ImageRun, Packer, Paragraph, ShadingType, TextRun } from "docx";
import { calculateModelingData } from '../../views/DataSet/ModelingDataCalculation2';
import TreeExtrapolationComponent from '../../views/DataSet/TreeExtrapolationComponent';
import AuthenticationService from '../Common/AuthenticationService';
import SupplyPlanFormulas from "../SupplyPlan/SupplyPlanFormulas";
import classNames from 'classnames';
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';
import PDFDocument from 'pdfkit-nodejs-webpack';
import blobStream from 'blob-stream';
import OrgDiagramPdfkit from '../TreePDF/OrgDiagramPdfkit';
import Size from '../../../node_modules/basicprimitives/src/graphics/structs/Size';
import { Prompt } from 'react-router';
import { i } from 'mathjs';
import RotatedText from 'basicprimitivesreact/dist/umd/Templates/RotatedText';
import ModelingTransferScreenshot1 from '../../assets/img/ModelingTransferScreenshot1.jpg';
import ModelingTransferScreenshot2 from '../../assets/img/ModelingTransferScreenshot2.jpg';
import ModelingTransferScreenshot3 from '../../assets/img/ModelingTransferScreenshot3.jpg';
import ModelingTransferScreenshot4 from '../../assets/img/ModelingTransferScreenshot4.jpg';
import ModelingTransferScreenshot5 from '../../assets/img/ModelingTransferScreenshot5.jpg';
import ModelingTransferScreenshot6 from '../../assets/img/ModelingTransferScreenshot6.jpg';
import showguidanceBuildTreeEn from '../../../src/ShowGuidanceFiles/ManageTreeBuildTreesEn.html'
import showguidanceBuildTreeFr from '../../../src/ShowGuidanceFiles/ManageTreeBuildTreesFr.html'
import showguidanceBuildTreeSp from '../../../src/ShowGuidanceFiles/ManageTreeBuildTreesSp.html'
import showguidanceBuildTreePr from '../../../src/ShowGuidanceFiles/ManageTreeBuildTreesPr.html'
import showguidanceAddEditNodeDataEn from '../../../src/ShowGuidanceFiles/AddEditNodeDataEn.html'
import showguidanceAddEditNodeDataFr from '../../../src/ShowGuidanceFiles/AddEditNodeDataFr.html'
import showguidanceAddEditNodeDataSp from '../../../src/ShowGuidanceFiles/AddEditNodeDataSp.html'
import showguidanceAddEditNodeDataPr from '../../../src/ShowGuidanceFiles/AddEditNodeDataPr.html'
import showguidanceModelingTransferEn from '../../../src/ShowGuidanceFiles/BuildTreeModelingTransferEn.html'
import showguidanceModelingTransferFr from '../../../src/ShowGuidanceFiles/BuildTreeModelingTransferFr.html'
import showguidanceModelingTransferSp from '../../../src/ShowGuidanceFiles/BuildTreeModelingTransferSp.html'
import showguidanceModelingTransferPr from '../../../src/ShowGuidanceFiles/BuildTreeModelingTransferPr.html'
import ConsumptionInSupplyPlanComponent from '../SupplyPlan/ConsumptionInSupplyPlan';
import PlanningUnitService from '../../api/PlanningUnitService';
import { isSiteOnline } from '../../CommonComponent/JavascriptCommonFunctions';

// const ref = React.createRef();
const entityname = 'Tree';
const months = [i18n.t('static.month.jan'), i18n.t('static.month.feb'), i18n.t('static.month.mar'), i18n.t('static.month.apr'), i18n.t('static.month.may'), i18n.t('static.month.jun'), i18n.t('static.month.jul'), i18n.t('static.month.aug'), i18n.t('static.month.sep'), i18n.t('static.month.oct'), i18n.t('static.month.nov'), i18n.t('static.month.dec')]
const pickerLang = {
    months: [i18n.t('static.month.jan'), i18n.t('static.month.feb'), i18n.t('static.month.mar'), i18n.t('static.month.apr'), i18n.t('static.month.may'), i18n.t('static.month.jun'), i18n.t('static.month.jul'), i18n.t('static.month.aug'), i18n.t('static.month.sep'), i18n.t('static.month.oct'), i18n.t('static.month.nov'), i18n.t('static.month.dec')],
    from: 'From', to: 'To',
}

const ItemTypes = {
    NODE: i18n.t('static.tree.node')
}

let initialValues = {
    forecastMethodId: "",
    treeName: ""
}

let initialValuesNodeData = {
    nodeTypeId: "",
    nodeTitle: "",
    nodeUnitId: "",
    percentageOfParent: "",
    nodeValue: "",
    tracerCategoryId: "",
    usageTypeIdFU: "",
    lagInMonths: "",
    noOfPersons: "",
    forecastingUnitPerPersonsFC: "",
    forecastingUnitId: ""
}

const validationSchemaNodeData = function (values) {
    return Yup.object().shape({
        nodeTypeId: Yup.string()
            .required(i18n.t('static.validation.fieldRequired')),
        nodeTitle: Yup.string()
            .matches(/^\S+(?: \S+)*$/, i18n.t('static.validSpace.string'))
            .required(i18n.t('static.validation.fieldRequired')),
        nodeUnitId: Yup.string()
            .test('nodeUnitId', i18n.t('static.validation.fieldRequired'),
                function (value) {
                    // console.log("@@@",(parseInt(document.getElementById("nodeTypeId").value) == 3 || parseInt(document.getElementById("nodeTypeId").value) == 2) && document.getElementById("nodeUnitId").value == "");
                    if ((parseInt(document.getElementById("nodeTypeId").value) == 3 || parseInt(document.getElementById("nodeTypeId").value) == 2) && document.getElementById("nodeUnitId").value == "") {
                        return false;
                    } else {
                        return true;
                    }
                }),
        percentageOfParent: Yup.string()
            .test('percentageOfParent', i18n.t('static.tree.decimalValidation10&2'),
                function (value) {
                    var testNumber = document.getElementById("percentageOfParent").value != "" ? (/^\d{0,3}(\.\d{1,4})?$/).test(document.getElementById("percentageOfParent").value) : false;
                    // console.log(">>>>*", parseInt(document.getElementById("nodeTypeId").value) == 3 || parseInt(document.getElementById("nodeTypeId").value) == 4) && (document.getElementById("percentageOfParent").value == "" || testNumber == false);
                    if ((parseInt(document.getElementById("nodeTypeId").value) == 3 || parseInt(document.getElementById("nodeTypeId").value) == 4 || parseInt(document.getElementById("nodeTypeId").value) == 5) && (document.getElementById("percentageOfParent").value == "" || testNumber == false)) {
                        return false;
                    } else {
                        return true;
                    }
                }),
        nodeValue: Yup.string()
            .test('nodeValue', 'Please enter a valid number having less then 10 digits.',
                function (value) {
                    // console.log("*****", document.getElementById("nodeValue").value);
                    var testNumber = (/^(?!$)\d{0,10}(?:\.\d{1,8})?$/).test((document.getElementById("nodeValue").value).replaceAll(",", ""));
                    // console.log("*****", testNumber);
                    if ((parseInt(document.getElementById("nodeTypeId").value) == 3 || parseInt(document.getElementById("nodeTypeId").value) == 2) && (document.getElementById("nodeValue").value == "" || testNumber == false)) {
                        return false;
                    } else {
                        return true;
                    }
                }),
        // tracerCategoryId: Yup.string()
        //     .test('tracerCategoryId', i18n.t('static.validation.fieldRequired'),
        //         function (value) {
        //             if (parseInt(document.getElementById("nodeTypeId").value) == 4 && document.getElementById("tracerCategoryId").value == "") {
        //                 return false;
        //             } else {
        //                 return true;
        //             }
        //         }),
        needFUValidation: Yup.boolean(),
        forecastingUnitId: Yup.string()
            .when("needFUValidation", {
                is: val => {
                    return document.getElementById("needFUValidation").value === "true";

                },
                then: Yup.string()
                    .required('Please select forecasting unit')
                    .typeError('Please select forecasting unit'),
                otherwise: Yup.string().notRequired()
            }),

        planningUnitIdFUFlag: Yup.boolean(),
        planningUnitIdFU: Yup.string()
            .when("planningUnitIdFUFlag", {
                is: val => {
                    return parseInt(document.getElementById("nodeTypeId").value) == 4 && document.getElementById("planningUnitIdFUFlag").value === "true" && document.getElementById("planningUnitIdFU").value == "";

                },
                then: Yup.string()
                    .required('Please select planning unit')
                    .typeError('Please select planning unit'),
                otherwise: Yup.string().notRequired()
            }),
        // forecastingUnitId: Yup.string()
        //     .test('forecastingUnitId', 'Please select forecasting unit 1',
        //         function (value) {
        //             // console.log("showFUValidation 1--->", document.getElementById("showFUValidation").value);
        //             // console.log("showFUValidation 2--->", value);
        //             if ((parseInt(document.getElementById("nodeTypeId").value) == 4 && (document.getElementById("showFUValidation").value == true) && value == 'undefined')) {
        //                 // console.log("inside if validation")
        //                 return false;
        //             } else {
        //                 // console.log("inside else validation")
        //                 return true;
        //             }
        //         }).typeError('Please select forecasting unit'),
        usageTypeIdFU: Yup.string()
            .test('usageTypeIdFU', i18n.t('static.validation.fieldRequired'),
                function (value) {
                    if (parseInt(document.getElementById("nodeTypeId").value) == 4 && document.getElementById("usageTypeIdFU").value == "") {
                        return false;
                    } else {
                        return true;
                    }
                }),
        lagInMonths:
            Yup.string().test('lagInMonths', 'Please enter a valid number having less then equal to 3 digit.',
                function (value) {
                    // console.log("*****", document.getElementById("nodeValue").value);
                    var testNumber = (/^\d{0,3}?$/).test(document.getElementById("lagInMonths").value);
                    // console.log("*****", testNumber);
                    if ((parseInt(document.getElementById("nodeTypeId").value) == 4) && (document.getElementById("lagInMonths").value == "" || testNumber == false)) {
                        return false;
                    } else {
                        return true;
                    }
                }),

        noOfPersons:
            Yup.string().test('noOfPersons', 'Please enter a valid 10 digit number.',
                function (value) {
                    // console.log("*****", document.getElementById("nodeValue").value);
                    var testNumber = (/^\d{0,10}?$/).test((document.getElementById("noOfPersons").value).replaceAll(",", ""));
                    // console.log("*****", testNumber);
                    if ((parseInt(document.getElementById("nodeTypeId").value) == 4) && (document.getElementById("noOfPersons").value == "" || testNumber == false)) {
                        return false;
                    } else {
                        return true;
                    }
                }),

        forecastingUnitPerPersonsFC:
            Yup.string().test('forecastingUnitPerPersonsFC', i18n.t('static.tree.decimalValidation12&2'),
                function (value) {
                    // console.log("*****", document.getElementById("nodeValue").value);
                    var testNumber = (/^\d{0,12}(\.\d{1,4})?$/).test((document.getElementById("forecastingUnitPerPersonsFC").value).replaceAll(",", ""));
                    // console.log("*****", testNumber);
                    if ((parseInt(document.getElementById("nodeTypeId").value) == 4) && (document.getElementById("forecastingUnitPerPersonsFC").value == "" || testNumber == false)) {
                        return false;
                    } else {
                        return true;
                    }
                }),

        // .transform((currentValue, originalValue) => {
        //     return originalValue === '' ? null : currentValue;
        // })
        // .nullable()
        // .typeError('Must be a number'),
        usageFrequencyCon: Yup.string()
            .test('usageFrequencyCon', i18n.t('static.tree.decimalValidation12&2'),
                function (value) {
                    // console.log("@@@>1", (parseInt(document.getElementById("nodeTypeId").value) == 4));
                    // console.log("@@@>1", document.getElementById("usageTypeIdFU").value == 2);
                    // console.log("@@@>2", document.getElementById("usageFrequency").value == "");
                    var testNumber = (/^\d{0,12}(\.\d{1,4})?$/).test((document.getElementById("usageFrequencyCon").value).replaceAll(",", ""))
                    if (document.getElementById("usageTypeIdFU").value == 2 && (document.getElementById("usageFrequencyCon").value == "" || testNumber == false)) {
                        return false;
                    } else {
                        return true;
                    }
                }),
        usageFrequencyDis: Yup.string()
            .test('usageFrequencyDis', i18n.t('static.tree.decimalValidation12&2'),
                function (value) {
                    // console.log("@@@>1", document.getElementById("usageTypeIdFU").value == 1);
                    // console.log("@@@>2", (document.getElementById("oneTimeUsage").value == 'false' || document.getElementById("oneTimeUsage").value == false));
                    // console.log("@@@>3", (document.getElementById("usageFrequencyDis").value == "" || testNumber == false));
                    var testNumber = (/^\d{0,12}(\.\d{1,4})?$/).test((document.getElementById("usageFrequencyDis").value).replaceAll(",", ""))
                    // console.log("usageFrequencyDis testNumber---", testNumber)
                    if (document.getElementById("usageTypeIdFU").value == 1 && (document.getElementById("oneTimeUsage").value == 'false' || document.getElementById("oneTimeUsage").value == false) && (document.getElementById("usageFrequencyDis").value == "" || testNumber == false)) {
                        // console.log("usageFrequencyDis false");
                        return false;
                    } else {
                        // console.log("usageFrequencyDis true");
                        return true;
                    }
                }),
        usagePeriodIdCon: Yup.string()
            .test('usagePeriodIdCon', 'This field is required.',
                function (value) {
                    if (document.getElementById("usageTypeIdFU").value == 2 && document.getElementById("usagePeriodIdCon").value == "") {
                        return false;
                    } else {
                        return true;
                    }

                }),
        usagePeriodIdDis: Yup.string()
            .test('usagePeriodIdDis', 'This field is required.',
                function (value) {
                    // console.log("@@@>1", (parseInt(document.getElementById("nodeTypeId").value) == 4));
                    // console.log("@@@>1", document.getElementById("usageTypeIdFU").value == 2);
                    // console.log("@@@>2", document.getElementById("usageFrequency").value == "");
                    if (document.getElementById("usageTypeIdFU").value == 1 && (document.getElementById("oneTimeUsage").value == 'false' || document.getElementById("oneTimeUsage").value == false) && document.getElementById("usagePeriodIdDis").value == "") {
                        // console.log("usagePeriodIdDis false");
                        return false;
                    } else {
                        // console.log("usagePeriodIdDis true");
                        return true;
                    }

                }),

        oneTimeUsage: Yup.string()
            .test('oneTimeUsage', i18n.t('static.validation.fieldRequired'),
                function (value) {
                    if (document.getElementById("usageTypeIdFU").value == 1 && document.getElementById("oneTimeUsage").value == "") {
                        // console.log("oneTimeUsage false");
                        return false;
                    } else {
                        // console.log("oneTimeUsage true");
                        return true;
                    }
                }),
        repeatCount: Yup.string().test('repeatCount', i18n.t('static.tree.decimalValidation12&2'),
            function (value) {
                // console.log("one time usage--->>>", document.getElementById("oneTimeUsage").value);
                // console.log("final result---", (document.getElementById("usageTypeIdFU").value == 1 && document.getElementById("oneTimeUsage").value === "false" && (document.getElementById("repeatCount").value == "")))
                var testNumber = (/^\d{0,12}(\.\d{1,4})?$/).test((document.getElementById("repeatCount").value).replaceAll(",", ""));
                if (document.getElementById("usageTypeIdFU").value == 1 && (document.getElementById("oneTimeUsage").value === "false" || document.getElementById("oneTimeUsage").value === false) && (document.getElementById("repeatCount").value == "" || testNumber == false)) {
                    // if (document.getElementById("usageTypeIdFU").value == 1 && (document.getElementById("repeatCount").value == "")) {
                    // console.log("repeatCount false");
                    return false;
                } else {
                    // console.log("repeatCount true");
                    return true;
                }
            }),
        repeatUsagePeriodId: Yup.string().test('repeatUsagePeriodId', 'This field is required.',
            function (value) {
                // console.log("validate 1---", document.getElementById("repeatUsagePeriodId").value);
                // console.log("validate 2---", document.getElementById("usageTypeIdFU").value);
                // console.log("validate 3---", document.getElementById("oneTimeUsage").value);
                if (document.getElementById("usageTypeIdFU").value == 1 && (document.getElementById("oneTimeUsage").value == "false" || document.getElementById("oneTimeUsage").value == false) && (document.getElementById("repeatUsagePeriodId").value == "")) {
                    // console.log("validate 4---");
                    return false;
                } else {
                    // console.log("validate 5---");
                    return true;
                }
            }),
        planningUnitId: Yup.string()
            .test('planningUnitId', i18n.t('static.validation.fieldRequired'),
                function (value) {
                    if (parseInt(document.getElementById("nodeTypeId").value) == 5 && document.getElementById("planningUnitId").value == "") {
                        return false;
                    } else {
                        return true;
                    }
                }),

        refillMonths: Yup.string()
            .test('refillMonths', 'Please enter a valid number having less then 10 digits.',
                function (value) {
                    // var testNumber = document.getElementById("refillMonths").value != "" ? (/^\d{0,3}(\.\d{1,2})?$/).test(document.getElementById("refillMonths").value) : false;
                    if ((document.getElementById("nodeTypeId").value == 5)) {
                        var testNumber = (/^[1-9]\d*$/).test((document.getElementById("refillMonths").value).replaceAll(",", ""));
                        // console.log("refill months*****", testNumber);
                        if ((document.getElementById("nodeTypeId").value == 5 && document.getElementById("usageTypeIdPU").value == 2) && (document.getElementById("refillMonths").value == "" || testNumber == false)) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                }),
        // sharePlanningUnit: Yup.string()
        //     .test('sharePlanningUnit', i18n.t('static.validation.fieldRequired'),
        //         function (value) {
        //             if (document.getElementById("nodeTypeId").value == 5 && document.getElementById("usageTypeIdPU").value == 1 && document.getElementById("sharePlanningUnit").value == "") {
        //                 return false;
        //             } else {
        //                 return true;
        //             }
        //         }),
        puPerVisit: Yup.string()
            .test('puPerVisit', 'Please enter # of pu per visit.',
                function (value) {
                    // var testNumber = (/^[1-9]\d*$/).test((document.getElementById("puPerVisit").value));
                    if ((document.getElementById("nodeTypeId").value == 5)) {
                        var testNumber = (/^\d{0,12}(\.\d{1,8})?$/).test((document.getElementById("puPerVisit").value).replaceAll(",", ""));
                        if (document.getElementById("nodeTypeId").value == 5 && document.getElementById("puPerVisit").type != "hidden" && (document.getElementById("puPerVisit").value == "" || testNumber == false)) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                }),
    })
}

const validateNodeData = (getValidationSchema) => {
    return (values) => {
        const validationSchemaNodeData = getValidationSchema(values)
        try {
            validationSchemaNodeData.validateSync(values, { abortEarly: false })
            return {}
        } catch (error) {
            return getErrorsFromValidationErrorNodeData(error)
        }
    }
}

const getErrorsFromValidationErrorNodeData = (validationError) => {
    const FIRST_ERROR = 0
    return validationError.inner.reduce((errors, error) => {
        return {
            ...errors,
            [error.path]: error.errors[FIRST_ERROR],
        }
    }, {})
}

const validationSchema = function (values) {
    return Yup.object().shape({
        forecastMethodId: Yup.string()
            .required(i18n.t('static.validation.selectForecastMethod')),
        treeName: Yup.string()
            .matches(/^\S+(?: \S+)*$/, i18n.t('static.validSpace.string'))
            .required(i18n.t('static.validation.selectTreeName')),
        regionId: Yup.string()
            .required(i18n.t('static.common.regiontext')),

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

const validationSchemaScenario = function (values) {
    return Yup.object().shape({
        scenarioName: Yup.string()
            .matches(/^\S+(?: \S+)*$/, i18n.t('static.validSpace.string'))
            .required('Please enter scenario name.'),

    })
}

const validateScenario = (getValidationSchema) => {
    return (values) => {
        const validationSchemaScenario = getValidationSchema(values)
        try {
            validationSchemaScenario.validateSync(values, { abortEarly: false })
            return {}
        } catch (error) {
            return getErrorsFromValidationErrorScenario(error)
        }
    }
}

const getErrorsFromValidationErrorScenario = (validationError) => {
    const FIRST_ERROR = 0
    return validationError.inner.reduce((errors, error) => {
        return {
            ...errors,
            [error.path]: error.errors[FIRST_ERROR],
        }
    }, {})
}

// Branch Validation
const validationSchemaBranch = function (values) {
    return Yup.object().shape({
        branchTemplateId: Yup.string()
            .required('Please enter template.'),
    })
}
const validationSchemaLevel = function (values) {
    return Yup.object().shape({
        levelName: Yup.string()
            .matches(/^\S+(?: \S+)*$/, i18n.t('static.validSpace.string'))
            .required('Please enter level name.'),

    })
}

const validateBranch = (getValidationSchema) => {
    return (values) => {
        const validationSchemaBranch = getValidationSchema(values)
        try {
            validationSchemaBranch.validateSync(values, { abortEarly: false })
            return {}
        } catch (error) {
            return getErrorsFromValidationErrorBranch(error)
        }
    }
}
const validateLevel = (getValidationSchema) => {
    return (values) => {
        const validationSchemaLevel = getValidationSchema(values)
        try {
            validationSchemaLevel.validateSync(values, { abortEarly: false })
            return {}
        } catch (error) {
            return getErrorsFromValidationErrorLevel(error)
        }
    }
}

const getErrorsFromValidationErrorBranch = (validationError) => {
    const FIRST_ERROR = 0
    return validationError.inner.reduce((errors, error) => {
        return {
            ...errors,
            [error.path]: error.errors[FIRST_ERROR],
        }
    }, {})
}

const getErrorsFromValidationErrorLevel = (validationError) => {
    const FIRST_ERROR = 0
    return validationError.inner.reduce((errors, error) => {
        return {
            ...errors,
            [error.path]: error.errors[FIRST_ERROR],
        }
    }, {})
}

function addCommasWith8Decimals(cell1, row) {
    if (cell1 != null && cell1 != "") {
        cell1 += '';
        var x = cell1.replaceAll(",", "").split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1].slice(0, 8) : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
        // return cell1.toString().replaceAll(",", "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } else {
        return "";
    }
}

function addCommas(cell1, row) {

    if (cell1 != null && cell1 != "") {
        // console.log("Comma---Inside if");
        cell1 += '';
        // console.log("Comma---append blank");
        var x = cell1.replaceAll(",", "").split('.');
        // console.log("Comma---x---", x);
        var x1 = x[0];
        // console.log("Comma---x1---", x1);
        var x2 = x.length > 1 ? '.' + x[1].slice(0, 8) : '';
        // console.log("Comma---x2---", x2);
        var rgx = /(\d+)(\d{3})/;
        // console.log("Comma---reg");
        while (rgx.test(x1)) {
            // console.log("Comma---indide while");
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
            // console.log("Comma---x1 replace---", x1);
        }
        // console.log("Comma---x1+x2---", x1 + x2);
        return x1 + x2;
        // return cell1.toString().replaceAll(",", "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } else {
        // console.log("Comma---");
        return "";
    }
}

function addCommasNodeValue(cell1, row) {

    if (cell1 != null && cell1 !== "") {
        // console.log("Comma---Inside if");
        cell1 += '';
        // console.log("Comma---append blank");
        var x = cell1.replaceAll(",", "").split('.');
        // console.log("Comma---x---", x);
        var x1 = x[0];
        // console.log("Comma---x1---", x1);
        var x2 = x.length > 1 ? '.' + x[1].slice(0, 8) : '';
        // console.log("Comma---x2---", x2);
        var rgx = /(\d+)(\d{3})/;
        // console.log("Comma---reg");
        while (rgx.test(x1)) {
            // console.log("Comma---indide while");
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
            // console.log("Comma---x1 replace---", x1);
        }
        // console.log("Comma---x1+x2---", x1 + x2);
        return x1 + x2;
        // return cell1.toString().replaceAll(",", "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } else {
        // console.log("Comma---");
        return "";
    }
}


function addCommasTwoDecimal(cell1, row) {
    if (cell1 != null && cell1 != "") {
        cell1 += '';
        var x = cell1.replaceAll(",", "").split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1].slice(0, 2) : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
        // return cell1.toString().replaceAll(",", "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } else {
        return "";
    }
}

function addCommasThreeDecimal(cell1, row) {
    if (cell1 != null && cell1 != "") {
        cell1 += '';
        var x = cell1.replaceAll(",", "").split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1].slice(0, 3) : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
        // return cell1.toString().replaceAll(",", "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } else {
        return "";
    }
}

export default class BuildTree extends Component {
    constructor(props) {
        super(props);
        var curDate = moment(Date.now()).format("YYYY-MM-DD");

        this.pickAMonth3 = React.createRef()
        this.pickAMonth2 = React.createRef()
        this.pickAMonth1 = React.createRef()
        this.pickAMonth4 = React.createRef()
        this.pickAMonth5 = React.createRef()
        this.pickAMonth6 = React.createRef()
        this.state = {
            isBranchTemplateModalOpen: false,
            branchTemplateList: [],
            isValidError: '',
            isScenarioChanged: false,
            isTreeDataChanged: false,
            percentForOneMonth: '',
            popoverOpenStartValueModelingTool: false,
            showGuidanceModelingTransfer: false,
            showGuidanceModelingTransfer: false,
            showGuidanceNodeData: false,
            showGuidance: false,
            sameLevelNodeList1: [],
            nodeUnitListPlural: [],
            nodeTransferDataList: [],
            qatCalculatedPUPerVisit: "",
            isChanged: false,
            levelModal: false,
            dropdownOpen: new Array(19).fill(false),
            isSubmitClicked: false,
            popoverOpenHowManyPUperIntervalPer: false,
            popoverOpenWillClientsShareOnePU: false,
            popoverOpenConsumptionIntervalEveryXMonths: false,
            popoverOpenQATEstimateForInterval: false,
            popoverOpenNoOfPUUsage: false,
            popoverOpenConversionFactorFUPU: false,
            popoverOpenPlanningUnitNode: false,
            popoverOpenHashOfUMonth: false,
            popoverOpenForecastingUnitPU: false,
            popoverOpenTypeOfUsePU: false,
            popoverOpenSingleUse: false,
            popoverOpenLagInMonth: false,
            popoverOpenTypeOfUse: false,
            popoverOpenCopyFromTemplate: false,
            popoverOpentracercategoryModelingType: false,
            popoverOpenParentValue: false,
            popoverOpenPercentageOfParent: false,
            popoverOpenParent: false,
            popoverOpenCalculatedMonthOnMonthChnage: false,
            popoverOpenTargetChangeHash: false,
            popoverOpenTargetChangePercent: false,
            popoverOpenTargetEndingValue: false,
            popoverOpenMonth: false,
            popoverOpenFirstMonthOfTarget: false,
            popoverOpenYearsOfTarget: false,
            popoverOpenNodeValue: false,
            popoverOpenSenariotree: false,
            popoverOpenNodeType: false,
            popoverOpenNodeTitle: false,
            hideFUPUNode: false,
            hidePUNode: false,
            viewMonthlyData: true,
            showFUValidation: true,
            fuValues: [],
            fuLabels: [],
            forecastPeriod: '',
            maxNodeDataId: '',
            message1: '',
            updatedPlanningUnitList: [],
            fullPlanningUnitList: [],
            nodeId: '',
            nodeDataMomList: [],
            scenarioActionType: '',
            defYear1: { year: 2018, month: 4 },
            defYear2: { year: 2020, month: 9 },
            showDiv: false,
            showDiv1: false,
            orgCurrentItemConfig: {},
            treeTemplateObj: [],
            scalingMonth: { year: Number(moment(curDate).startOf('month').format("YYYY")), month: Number(moment(curDate).startOf('month').format("M")) },
            showModelingValidation: true,
            scenario: {
                id: '',
                label: {
                    label_en: ''
                },
                notes: ''
            },
            scenario1: {
                id: '',
                label: {
                    label_en: ''
                },
                notes: ''
            },
            manualChange: true,
            seasonality: true,
            programId: this.props.match.params.programId,
            showMomDataPercent: false,
            currentTargetChangePercentage: '',
            currentTargetChangeNumber: '',
            currentTargetChangePercentageEdit: false,
            currentTargetChangeNumberEdit: false,
            currentRowIndex: '',
            currentEndValue: '',
            currentTransferData: '',
            currentEndValueEdit: false,
            momListPer: [],
            modelingTypeList: [],
            showModelingJexcelNumber: false,
            filteredModelingType: [],
            minMonth: '',
            maxMonth: '',
            scalingList: [],
            modelingTypeList: [],
            sameLevelNodeList: [],
            scalingTotal: '',
            showMomData: false,
            showCalculatorFields: false,
            momElPer: '',
            momEl: '',
            modelingEl: '',
            modelingCalculatorEl: '',
            currentScenario: {
                dataValue: '',
                fuNode: {
                    forecastingUnit: {
                        label: {
                            label_en: ''
                        }
                    },
                    repeatUsagePeriod: {
                        usagePeriodId: ''
                    }
                },
                nodeDataExtrapolationOptionList: []
            },
            parentScenario: [],
            popoverOpen: false,
            regionValues: [],
            selectedScenario: '',
            selectedScenarioLabel: '',
            scenarioList: [],
            regionList: [],
            curTreeObj: {
                forecastMethod: { id: "" },
                label: { label_en: '' },
                notes: '',
                regionList: [],
                active: true
            },
            treeData: [],
            openAddScenarioModal: false,
            openTreeDataModal: false,
            unitList: [],
            autocompleteData: [],
            noOfFUPatient: '',
            nodeTypeFollowUpList: [],
            parentValue: '',
            calculatedDataValue: '',
            message: '',
            converionFactor: '',
            planningUnitList: [],
            noFURequired: '',
            usageTypeParent: '',
            usageTemplateList: [],
            usageTemplateListAll: [],
            usageTemplateId: '',
            usageText: '',
            noOfMonthsInUsagePeriod: '',
            tracerCategoryId: '',
            forecastingUnitList: [],
            usageTypeList: [],
            usagePeriodList: [],
            tracerCategoryList: [],
            addNodeFlag: false,
            level0: true,
            numberNode: false,
            singleValue2: { year: new Date().getFullYear(), month: new Date().getMonth() + 1 },
            minDateValue: { year: new Date().getFullYear() - 10, month: new Date().getMonth() + 1 },
            minDate: { year: new Date().getFullYear() - 10, month: new Date().getMonth() + 1 },
            maxDate: { year: new Date().getFullYear() + 10, month: new Date().getMonth() + 1 },
            treeTemplate: {
                treeTemplateId: 0,
                label: {
                    label_en: ""
                },
                forecastMethod: {
                    label: {
                        label_en: ""
                    }
                },
                active: true
                , flatList: []
            },
            forecastMethodList: [],
            nodeTypeList: [],
            nodeUnitList: [],
            modalOpen: false,
            title: '',
            cursorItem: 0,
            highlightItem: 0,
            items: [],
            currentItemConfig: {
                context: {
                    level: '',
                    payload: {
                        label: {

                        },
                        nodeType: {
                        },
                        nodeUnit: {

                        },
                        nodeDataMap: [
                            // [
                            //     {
                            //         dataValue: '',
                            //         notes: '',
                            //         fuNode: {
                            //             forecastingUnit: {
                            //                 id: '',
                            //                 label: {
                            //                     label_en: ""
                            //                 }
                            //             },
                            //             repeatUsagePeriod: {
                            //                 usagePeriodId: 0
                            //             }
                            //         },
                            //         puNode: {
                            //             planningUnit: {

                            //             },
                            //             refillMonths: ''
                            //         }
                            //     }
                            // ]
                        ]
                    }
                },
                parentItem: {
                    payload: {
                        nodeType: {
                            id: ''
                        },
                        label: {

                        },
                        nodeDataMap: [
                            [
                                {
                                    puNode: {
                                        planningUnit: {
                                            id: ''
                                        },
                                        refillMonths: ''
                                    }
                                }
                            ]
                        ]
                    }
                }
            },
            momList: [],
            activeTab1: new Array(3).fill('1'),
            tracerCategoryList: [],
            tracerCategoryList: [],
            forecastMethodList: [],
            unitOfDimensionIdFour: [],
            unitList: [],
            usagePeriodList: [],
            usageTypeList: [],
            usageTemplateList: [],
            forecastingUnitByTracerCategory: [],
            planningUnitByTracerCategory: [],
            datasetList: [],
            forecastStartDate: '',
            forecastStopDate: '',
            momListPerParent: [],
            parentNodeDataMap: [],
            modelinDataForScenario: [],
            dataSetObj: {
                programData: ''
            },
            loading: false,
            modelingJexcelLoader: false,
            momJexcelLoader: false,
            lastRowDeleted: false,
            showDate: false,
            modelingChanged: false,
            missingPUList: [],
            autoCalculate: localStorage.getItem('sesAutoCalculate') != "" && localStorage.getItem('sesAutoCalculate') != undefined ? (localStorage.getItem('sesAutoCalculate').toString() == "true" ? true : false) : true,
            hideActionButtons: false,
            toggleArray: [],
            programDataListForPuCheck: [],
            collapseState: false,
            programDataListForPuCheck: [],
            calculatedTotalForModelingCalculator: [],
            targetSelect: 0,
            firstMonthOfTarget: "",
            yearsOfTarget: "",
            actualOrTargetValueList: [],
            firstMonthOfTargetOriginal: "",
            yearsOfTargetOriginal: "",
            actualOrTargetValueListOriginal: [],
            modelingTypeOriginal: "",
            programDataListForPuCheck: [],
            toggleArray: [],
            collapseState: false,
            isCalculateClicked: 0,
            programDataListForPuCheck: [],
            planningUnitObjList: [],
            allProcurementAgentList: [],
            modelingTabChanged: false,
            modelingTabError: false,
            modelingChangedOrAdded: false,
            addNodeError: false
        }
        // this.showGuidanceNodaData = this.showGuidanceNodaData.bind(this);
        this.toggleStartValueModelingTool = this.toggleStartValueModelingTool.bind(this);
        this.getMomValueForDateRange = this.getMomValueForDateRange.bind(this);
        this.toggleDeropdownSetting = this.toggleDeropdownSetting.bind(this);
        // this.onClick1 = this.onClick1.bind(this);
        this.toggleHowManyPUperIntervalPer = this.toggleHowManyPUperIntervalPer.bind(this);
        this.toggleWillClientsShareOnePU = this.toggleWillClientsShareOnePU.bind(this);
        this.toggleConsumptionIntervalEveryXMonths = this.toggleConsumptionIntervalEveryXMonths.bind(this);
        this.toggleQATEstimateForInterval = this.toggleQATEstimateForInterval.bind(this);
        this.toggleNoOfPUUsage = this.toggleNoOfPUUsage.bind(this);
        this.toggleConversionFactorFUPU = this.toggleConversionFactorFUPU.bind(this);
        this.togglePlanningUnitNode = this.togglePlanningUnitNode.bind(this);
        this.toggleHashOfUMonth = this.toggleHashOfUMonth.bind(this);
        this.toggleForecastingUnitPU = this.toggleForecastingUnitPU.bind(this);
        this.toggleTypeOfUsePU = this.toggleTypeOfUsePU.bind(this);
        this.toggleSingleUse = this.toggleSingleUse.bind(this);
        this.toggleLagInMonth = this.toggleLagInMonth.bind(this);
        this.toggleTypeOfUse = this.toggleTypeOfUse.bind(this);
        this.toggleCopyFromTemplate = this.toggleCopyFromTemplate.bind(this);
        this.toggletracercategoryModelingType = this.toggletracercategoryModelingType.bind(this);
        this.toggleParentValue = this.toggleParentValue.bind(this);
        this.togglePercentageOfParent = this.togglePercentageOfParent.bind(this);
        this.toggleParent = this.toggleParent.bind(this);
        this.toggleCalculatedMonthOnMonthChnage = this.toggleCalculatedMonthOnMonthChnage.bind(this);
        this.toggleTargetChangeHash = this.toggleTargetChangeHash.bind(this);
        this.toggleTargetChangePercent = this.toggleTargetChangePercent.bind(this);
        this.toggleTargetEndingValue = this.toggleTargetEndingValue.bind(this);
        this.toggleMonth = this.toggleMonth.bind(this);
        this.toggleFirstMonthOfTarget = this.toggleFirstMonthOfTarget.bind(this);
        this.toggleYearsOfTarget = this.toggleYearsOfTarget.bind(this);
        this.toggleNodeValue = this.toggleNodeValue.bind(this);
        this.toggleNodeType = this.toggleNodeType.bind(this);
        this.toggleNodeTitle = this.toggleNodeTitle.bind(this);
        this.toggleSenariotree = this.toggleSenariotree.bind(this);
        this.onRemoveItem = this.onRemoveItem.bind(this);
        this.canDropItem = this.canDropItem.bind(this);
        this.onMoveItem = this.onMoveItem.bind(this);

        this.onAddButtonClick = this.onAddButtonClick.bind(this);
        this.onRemoveButtonClick = this.onRemoveButtonClick.bind(this);
        this.onHighlightChanged = this.onHighlightChanged.bind(this);
        this.onCursoChanged = this.onCursoChanged.bind(this);
        this.resetTree = this.resetTree.bind(this);

        this.dataChange = this.dataChange.bind(this);
        this.scenarioChange = this.scenarioChange.bind(this);
        this.updateNodeInfoInJson = this.updateNodeInfoInJson.bind(this);
        this.nodeTypeChange = this.nodeTypeChange.bind(this);
        this.addScenario = this.addScenario.bind(this);
        this.getNodeValue = this.getNodeValue.bind(this);
        this.getNotes = this.getNotes.bind(this);
        this.calculateNodeValue = this.calculateNodeValue.bind(this);
        this.hideTreeValidation = this.hideTreeValidation.bind(this);
        this.filterPlanningUnitNode = this.filterPlanningUnitNode.bind(this);
        this.filterPlanningUnitAndForecastingUnitNodes = this.filterPlanningUnitAndForecastingUnitNodes.bind(this);
        this.getForecastingUnitListByTracerCategoryId = this.getForecastingUnitListByTracerCategoryId.bind(this);
        this.getNoOfMonthsInUsagePeriod = this.getNoOfMonthsInUsagePeriod.bind(this);
        this.getNoFURequired = this.getNoFURequired.bind(this);
        this.getUsageText = this.getUsageText.bind(this);
        this.copyDataFromUsageTemplate = this.copyDataFromUsageTemplate.bind(this);
        this.getUsageTemplateList = this.getUsageTemplateList.bind(this);
        this.filterUsageTemplateList = this.filterUsageTemplateList.bind(this);
        this.getNodeUnitOfPrent = this.getNodeUnitOfPrent.bind(this);
        this.getNoOfFUPatient = this.getNoOfFUPatient.bind(this);
        this.getForecastingUnitUnitByFUId = this.getForecastingUnitUnitByFUId.bind(this);
        this.getPlanningUnitListByFUId = this.getPlanningUnitListByFUId.bind(this);
        this.cancelClicked = this.cancelClicked.bind(this);
        this.calculateValuesForAggregateNode = this.calculateValuesForAggregateNode.bind(this);
        this.duplicateNode = this.duplicateNode.bind(this);
        this.getNodeTyeList = this.getNodeTyeList.bind(this);
        this.getNodeTypeFollowUpList = this.getNodeTypeFollowUpList.bind(this);
        this.getConversionFactor = this.getConversionFactor.bind(this);
        this.getTracerCategoryList = this.getTracerCategoryList.bind(this);
        this.getForecastMethodList = this.getForecastMethodList.bind(this);
        this.getUnitListForDimensionIdFour = this.getUnitListForDimensionIdFour.bind(this);
        this.getUnitList = this.getUnitList.bind(this);
        this.getUsagePeriodList = this.getUsagePeriodList.bind(this);
        this.getUsageTypeList = this.getUsageTypeList.bind(this);
        this.getForecastingUnitListByTracerCategory = this.getForecastingUnitListByTracerCategory.bind(this);
        this.getScenarioList = this.getScenarioList.bind(this);
        this.getTreeList = this.getTreeList.bind(this);
        this.getTreeByTreeId = this.getTreeByTreeId.bind(this);
        this.getTreeTemplateById = this.getTreeTemplateById.bind(this);
        this.toggle = this.toggle.bind(this);
        this.getDatasetList = this.getDatasetList.bind(this);
        this.buildModelingJexcel = this.buildModelingJexcel.bind(this);
        this.setStartAndStopDateOfProgram = this.setStartAndStopDateOfProgram.bind(this);
        this.getModelingTypeList = this.getModelingTypeList.bind(this);
        this.getSameLevelNodeList = this.getSameLevelNodeList.bind(this);
        this.momCheckbox = this.momCheckbox.bind(this);
        this.extrapolate = this.extrapolate.bind(this);
        this.calculateScalingTotal = this.calculateScalingTotal.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.formSubmitLoader = this.formSubmitLoader.bind(this);
        this.checkValidation = this.checkValidation.bind(this);
        this.acceptValue = this.acceptValue.bind(this);
        this.calculateMomByEndValue = this.calculateMomByEndValue.bind(this);
        this.calculateMomByChangeInPercent = this.calculateMomByChangeInPercent.bind(this);
        this.calculateMomByChangeInNumber = this.calculateMomByChangeInNumber.bind(this);
        this.addRow = this.addRow.bind(this);
        this.showMomData = this.showMomData.bind(this);
        this.buildMomJexcelPercent = this.buildMomJexcelPercent.bind(this);
        this.buildMomJexcel = this.buildMomJexcel.bind(this);
        this.openScenarioModal = this.openScenarioModal.bind(this);
        this.getStartValueForMonth = this.getStartValueForMonth.bind(this);
        this.getRegionList = this.getRegionList.bind(this);
        this.updateMomDataInDataSet = this.updateMomDataInDataSet.bind(this);
        // this.updateMomDataPerInDataSet = this.updateMomDataPerInDataSet.bind(this);
        this.updateTreeData = this.updateTreeData.bind(this);
        this.updateState = this.updateState.bind(this);
        this.saveTreeData = this.saveTreeData.bind(this);
        this.calculateAfterDragDrop = this.calculateAfterDragDrop.bind(this);
        // this.treeCalculations = this.treeCalculations.bind(this);
        this.callAfterScenarioChange = this.callAfterScenarioChange.bind(this);
        this.filterScalingDataByMonth = this.filterScalingDataByMonth.bind(this);
        this.createOrUpdateTree = this.createOrUpdateTree.bind(this);
        this.treeDataChange = this.treeDataChange.bind(this);
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.resetNodeData = this.resetNodeData.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.fetchTracerCategoryList = this.fetchTracerCategoryList.bind(this);
        this.calculateMOMData = this.calculateMOMData.bind(this);
        this.changed1 = this.changed1.bind(this);
        this.hideSecondComponent = this.hideSecondComponent.bind(this);
        this.hideThirdComponent = this.hideThirdComponent.bind(this);
        this.getMaxNodeDataId = this.getMaxNodeDataId.bind(this);
        this.exportPDF = this.exportPDF.bind(this);
        this.updateExtrapolationData = this.updateExtrapolationData.bind(this);
        this.round = this.round.bind(this);
        this.calculatePUPerVisit = this.calculatePUPerVisit.bind(this);
        this.createPUNode = this.createPUNode.bind(this);
        this.levelClicked = this.levelClicked.bind(this);
        this.levelDeatilsSaved = this.levelDeatilsSaved.bind(this);
        this.qatCalculatedPUPerVisit = this.qatCalculatedPUPerVisit.bind(this);
        this.calculateParentValueFromMOM = this.calculateParentValueFromMOM.bind(this);
        this.getNodeTransferList = this.getNodeTransferList.bind(this);
        this.generateBranchFromTemplate = this.generateBranchFromTemplate.bind(this);
        this.buildMissingPUJexcel = this.buildMissingPUJexcel.bind(this);
        this.autoCalculate = this.autoCalculate.bind(this);
        this.toggleTooltipAuto = this.toggleTooltipAuto.bind(this);
        this.getPlanningUnitWithPricesByIds = this.getPlanningUnitWithPricesByIds.bind(this);
        this.changedMissingPU = this.changedMissingPU.bind(this);
        this.procurementAgentList = this.procurementAgentList.bind(this);
        this.saveMissingPUs = this.saveMissingPUs.bind(this);
        this.updateMissingPUs = this.updateMissingPUs.bind(this);
        this.checkValidationForMissingPUs = this.checkValidationForMissingPUs.bind(this);
        this.buildModelingCalculatorJexcel = this.buildModelingCalculatorJexcel.bind(this);
        this.loadedModelingCalculatorJexcel = this.loadedModelingCalculatorJexcel.bind(this);
        this.changeModelingCalculatorJexcel = this.changeModelingCalculatorJexcel.bind(this);
        this.changed3 = this.changed3.bind(this);
        this.resetModelingCalculatorData = this.resetModelingCalculatorData.bind(this);
        this.validFieldData = this.validFieldData.bind(this);
        this.acceptValue1 = this.acceptValue1.bind(this);
    }

    checkValidationForMissingPUs() {
        var valid = true;
        var json = this.el.getJson(null, false);
        // console.log("json.length-------", json);
        for (var y = 0; y < json.length; y++) {
            //tracer category
            var col = ("A").concat(parseInt(y) + 1);
            var value = this.el.getValueFromCoords(0, y);
            // console.log("value-----", value);
            if (value == "") {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setStyle(col, "background-color", "yellow");
                this.el.setComments(col, i18n.t('static.label.fieldRequired'));
                valid = false;
            } else {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setComments(col, "");
            }

            //planning unit
            var col = ("B").concat(parseInt(y) + 1);
            var value = this.el.getRowData(parseInt(y))[1];
            // console.log("value-----", value);
            if (value == "") {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setStyle(col, "background-color", "yellow");
                this.el.setComments(col, i18n.t('static.label.fieldRequired'));
                valid = false;
            } else {
                for (var i = (json.length - 1); i >= 0; i--) {
                    var map = new Map(Object.entries(json[i]));
                    var planningUnitValue = map.get("1");
                    if (planningUnitValue == value && y != i && i > y && map.get("16").toString() == "true" && json[y][16].toString() == "true") {
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
            //planningUnitSetting.stockEndOf
            var col = ("E").concat(parseInt(y) + 1);
            var value = this.el.getValue(`E${parseInt(y) + 1}`, true).toString().replaceAll(",", "");
            if (value == '' || value == null) {
                value = this.el.getValueFromCoords(4, y);
            }
            var reg = JEXCEL_INTEGER_REGEX;
            // console.log("value------------->E", value);
            if (value == "") {
            } else {
                if (isNaN(parseInt(value))) {//string value check
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.planningUnitSetting.stringNotAllowed'));
                    valid = false;
                } else if (!Number.isInteger(Number(value))) {//decimal value check
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.planningUnitSetting.decimalNotAllowed'));
                    valid = false;
                } else if (!(reg.test(value))) {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.planningUnitSetting.10digitWholeNumber'));
                    valid = false;
                } else {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setComments(col, "");
                }
            }
            // planningUnitSetting.existingShipments
            var col = ("F").concat(parseInt(y) + 1);
            var value = this.el.getValue(`F${parseInt(y) + 1}`, true).toString().replaceAll(",", "");
            if (value == '' || value == null) {
                value = this.el.getValueFromCoords(5, y);
            }
            var reg = JEXCEL_INTEGER_REGEX;
            if (value == "") {
            } else {
                if (isNaN(parseInt(value))) {//string value check
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.planningUnitSetting.stringNotAllowed'));
                    valid = false;
                } else if (!Number.isInteger(Number(value))) {//decimal value check
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.planningUnitSetting.decimalNotAllowed'));
                    valid = false;
                } else if (!(reg.test(value))) {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.planningUnitSetting.10digitWholeNumber'));
                    valid = false;
                } else {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setComments(col, "");
                }
            }

            var col = ("G").concat(parseInt(y) + 1);
            var value = this.el.getValue(`G${parseInt(y) + 1}`, true).toString().replaceAll(",", "");
            if (value == '' || value == null) {
                value = this.el.getValueFromCoords(6, y);
            }
            // var value = this.el.getValueFromCoords(6, y);
            var reg = JEXCEL_INTEGER_REGEX;
            if (value == "") {
            } else {
                if (isNaN(parseInt(value))) {//string value check
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.planningUnitSetting.stringNotAllowed'));
                    valid = false;
                } else if (!Number.isInteger(Number(value))) {//decimal value check
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.planningUnitSetting.decimalNotAllowed'));
                    valid = false;
                } else if (!(reg.test(value))) {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.planningUnitSetting.10digitWholeNumber'));
                    valid = false;
                } else if (parseInt(value) > 99) {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.planningUnitSetting.max99MonthAllowed'));
                    valid = false;
                } else {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setComments(col, "");
                }
            }
            var col = ("I").concat(parseInt(y) + 1);
            var value = this.el.getValue(`I${parseInt(y) + 1}`, true).toString().replaceAll(",", "");
            var reg = JEXCEL_DECIMAL_CATELOG_PRICE;
            if (value == "") {
            } else {
                if (isNaN(parseInt(value))) {//string value check
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.planningUnitSetting.stringNotAllowed'));
                    valid = false;
                } else if (Number(value) < 0) {//negative value check
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.planningUnitSetting.negativeValueNotAllowed'));
                    valid = false;
                } else if (!(reg.test(value))) {//regex check
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.planningUnitSetting.max10Digit4AfterDecimal'));
                    valid = false;
                } else {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setComments(col, "");
                }
            }
        }
        return valid;
    }

    saveMissingPUs() {
        var validation = this.checkValidationForMissingPUs();
        // console.log("validation",validation)
        var curDate = moment(new Date().toLocaleString("en-US", { timeZone: "America/New_York" })).format("YYYY-MM-DD HH:mm:ss");
        var curUser = AuthenticationService.getLoggedInUserId();
        // console.log("validation curDate",curDate)

        // console.log("validation curUser",curUser)

        let indexVar = 0;
        if (validation == true) {
            // console.log("validation Inside if loop ");

            var tableJson = this.el.getJson(null, false);
            var planningUnitList = [];
            var programs = [];
            var missingPUList = this.state.missingPUList;
            var updatedMissingPUList = [];
            var dataSetObj = this.state.dataSetObj;
            for (var i = 0; i < tableJson.length; i++) {
                if (tableJson[i][18].toString() == "true") {
                    // console.log("validation Inside for loop ");

                    var map1 = new Map(Object.entries(tableJson[i]));
                    // console.log("validation map1 ",map1);
                    let procurementAgentObj = "";
                    if (parseInt(map1.get("7")) === -1 || (map1.get("7")) == "") {
                        procurementAgentObj = null
                    } else {
                        procurementAgentObj = this.state.allProcurementAgentList.filter(c => c.id == parseInt(map1.get("7")))[0];
                    }
                    var planningUnitObj = this.state.planningUnitObjList.filter(c => c.planningUnitId == missingPUList[i].planningUnit.id)[0];
                    let tempJson = {
                        "programPlanningUnitId": map1.get("11"),
                        "planningUnit": {
                            "id": planningUnitObj.planningUnitId,
                            "label": planningUnitObj.label,
                            "unit": planningUnitObj.unit,
                            "multiplier": planningUnitObj.multiplier,
                            "forecastingUnit": {
                                "id": planningUnitObj.forecastingUnit.forecastingUnitId,
                                "label": planningUnitObj.forecastingUnit.label,
                                "unit": planningUnitObj.forecastingUnit.unit,
                                "productCategory": planningUnitObj.forecastingUnit.productCategory,
                                "tracerCategory": planningUnitObj.forecastingUnit.tracerCategory,
                                "idString": "" + planningUnitObj.forecastingUnit.forecastingUnitId
                            },
                            "idString": "" + planningUnitObj.planningUnitId
                        },
                        "consuptionForecast": map1.get("2"),
                        "treeForecast": map1.get("3"),
                        "stock": this.el.getValue(`E${parseInt(i) + 1}`, true).toString().replaceAll(",", ""),
                        "existingShipments": this.el.getValue(`F${parseInt(i) + 1}`, true).toString().replaceAll(",", ""),
                        "monthsOfStock": this.el.getValue(`G${parseInt(i) + 1}`, true).toString().replaceAll(",", ""),
                        "procurementAgent": (procurementAgentObj == null ? null : {
                            "id": parseInt(map1.get("7")),
                            "label": procurementAgentObj.label,
                            "code": procurementAgentObj.code,
                            "idString": "" + parseInt(map1.get("7"))
                        }),
                        "price": this.el.getValue(`I${parseInt(i) + 1}`, true).toString().replaceAll(",", ""),
                        "higherThenConsumptionThreshold": map1.get("12"),
                        "lowerThenConsumptionThreshold": map1.get("13"),
                        "planningUnitNotes": map1.get("9"),
                        "consumptionDataType": 2,
                        "otherUnit": map1.get("15") == "" ? null : map1.get("15"),
                        "selectedForecastMap": map1.get("14"),
                        "createdBy":map1.get("16")==""?{"userId": curUser}:map1.get("16"), 
                        "createdDate": map1.get("17") == "" ? curDate : map1.get("17"),
                        "active": true,
                    }
                    // console.log("validation tempJson ",tempJson);
                    planningUnitList.push(tempJson);
                } else {
                    updatedMissingPUList.push(missingPUList[i])
                }
            }
            // console.log("Updated Missing Pu List ",updatedMissingPUList)
            // console.log("validation planningUnitList ",planningUnitList);

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
                    myResult = getRequest.result;

                    var userBytes = CryptoJS.AES.decrypt(localStorage.getItem('curUser'), SECRET_KEY);
                    var userId = userBytes.toString(CryptoJS.enc.Utf8);
                    var filteredGetRequestList = myResult.filter(c => c.userId == userId);

                    var program = filteredGetRequestList.filter(x => x.id == this.state.dataSetObj.id)[0];
                    // console.log("program------",program);
                    var databytes = CryptoJS.AES.decrypt(program.programData, SECRET_KEY);
                    var programData = JSON.parse(databytes.toString(CryptoJS.enc.Utf8));
                    // console.log("programData------",programData);
                    var planningFullList = programData.planningUnitList;
                    // console.log("1Aug planningUnitList------",planningUnitList);
                    // console.log("1Aug programData------Before",programData.planningUnitList);

                    planningUnitList.forEach(p => {
                        indexVar = programData.planningUnitList.findIndex(c => c.planningUnit.id == p.planningUnit.id)

                        // console.log("1Aug indexVar------",indexVar);
                        if (indexVar != -1) {
                            planningFullList[indexVar] = p;
                        } else {
                            planningFullList = planningFullList.concat(p);
                        }
                        // console.log("1Aug planningFullList------1",planningFullList);
                    })
                    // console.log("1Aug planningFullList------",planningFullList);

                    programData.planningUnitList = planningFullList;
                    var programDataListForPuCheck = this.state.programDataListForPuCheck;
                    var indexForPuCheck = programDataListForPuCheck.findIndex(c => c.id == dataSetObj.id);
                    programDataListForPuCheck[indexForPuCheck].programData = programData;
                    dataSetObj.programData = programData;
                    // var datasetListJexcel=programData;
                    // console.log("1Aug programData------after",programData.planningUnitList);
                    // let downloadedProgramData = this.state.downloadedProgramData;
                    // console.log("DPD Test@123",downloadedProgramData);
                    // var index=downloadedProgramData.findIndex(c=>c.programId==programData.programId && c.currentVersion.versionId==programData.currentVersion.versionId);
                    // console.log("Index Test@123",index)
                    // downloadedProgramData[index]=programData;
                    programData = (CryptoJS.AES.encrypt(JSON.stringify(programData), SECRET_KEY)).toString();
                    program.programData = programData;
                    var transaction = db1.transaction(['datasetData'], 'readwrite');
                    var programTransaction = transaction.objectStore('datasetData');
                    // programs.forEach(program => {
                    programTransaction.put(program);
                    // })

                    transaction.oncomplete = function (event) {
                        db1 = e.target.result;
                        var id = this.state.dataSetObj.id;

                        var detailTransaction = db1.transaction(['datasetDetails'], 'readwrite');
                        var datasetDetailsTransaction = detailTransaction.objectStore('datasetDetails');
                        var datasetDetailsRequest = datasetDetailsTransaction.get(id);

                        datasetDetailsRequest.onsuccess = function (e) {
                            var datasetDetailsRequestJson = datasetDetailsRequest.result;
                            datasetDetailsRequestJson.changed = 1;
                            var datasetDetailsRequest1 = datasetDetailsTransaction.put(datasetDetailsRequestJson);
                            // console.log("Testing Final-------------->downloadedProgramData", downloadedProgramData);

                            datasetDetailsRequest1.onsuccess = function (event) {
                                this.setState({
                                    // message: i18n.t('static.mt.dataUpdateSuccess'),
                                    // color: "green",
                                    missingPUList: updatedMissingPUList,
                                    dataSetObj: dataSetObj,
                                    fullPlanningUnitList: planningFullList,
                                    programDataListForPuCheck: programDataListForPuCheck
                                    // downloadedProgramData:downloadedProgramData,
                                    // datasetListJexcel:datasetListJexcel
                                }, () => {
                                    this.hideThirdComponent()
                                    if (this.state.missingPUList.length > 0) {
                                        this.getMissingPuListBranchTemplate();
                                    }
                                });
                            }.bind(this)
                        }.bind(this)
                    }.bind(this);
                    transaction.onerror = function (event) {
                    }.bind(this);
                }.bind(this);
            }.bind(this);
        }
    }

    updateMissingPUs() {
        var validation = this.checkValidation();
        // console.log("validation",validation)
        var curDate = moment(new Date().toLocaleString("en-US", { timeZone: "America/New_York" })).format("YYYY-MM-DD HH:mm:ss");
        var curUser = AuthenticationService.getLoggedInUserId();
        // console.log("validation curDate",curDate)

        // console.log("validation curUser",curUser)

        let indexVar = 0;
        if (validation == true) {
            // console.log("validation Inside if loop ");
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
                    myResult = getRequest.result;
                    var dataSetObj = this.state.dataSetObj;
                    var userBytes = CryptoJS.AES.decrypt(localStorage.getItem('curUser'), SECRET_KEY);
                    var userId = userBytes.toString(CryptoJS.enc.Utf8);
                    var filteredGetRequestList = myResult.filter(c => c.userId == userId);

                    var program = filteredGetRequestList.filter(x => x.id == this.state.dataSetObj.id)[0];
                    // console.log("program------",program);
                    var databytes = CryptoJS.AES.decrypt(program.programData, SECRET_KEY);
                    var programData = JSON.parse(databytes.toString(CryptoJS.enc.Utf8));
                    // console.log("programData------",programData);
                    var planningFullList = programData.planningUnitList;
                    // console.log("1Aug planningUnitList------",planningUnitList);
                    // console.log("1Aug programData------Before",programData.planningUnitList);
                    var tableJson = this.el.getJson(null, false);
                    var updatedMissingPUList = [];
                    tableJson.forEach((p, index) => {
                        if (p[19].toString() == "true" && p[18].toString() == "true") {
                            indexVar = programData.planningUnitList.findIndex(c => c.planningUnit.id == this.state.missingPUList[index].planningUnit.id)

                            // console.log("1Aug indexVar------",indexVar);
                            if (indexVar != -1) {
                                let procurementAgentObj = "";
                                if (parseInt(p[7]) === -1 || (p[7]) == "") {
                                    procurementAgentObj = null
                                } else {
                                    procurementAgentObj = this.state.allProcurementAgentList.filter(c => c.id == parseInt(p[7]))[0];
                                }
                                planningFullList[indexVar].consuptionForecast = p[2];
                                planningFullList[indexVar].treeForecast = p[3];
                                planningFullList[indexVar].stock = this.el.getValue(`E${parseInt(index) + 1}`, true).toString().replaceAll(",", "");
                                planningFullList[indexVar].existingShipments = this.el.getValue(`F${parseInt(index) + 1}`, true).toString().replaceAll(",", "");
                                planningFullList[indexVar].monthsOfStock = this.el.getValue(`G${parseInt(index) + 1}`, true).toString().replaceAll(",", "");
                                planningFullList[indexVar].procurementAgent = (procurementAgentObj == null ? null : {
                                    "id": parseInt(p[7]),
                                    "label": procurementAgentObj.label,
                                    "code": procurementAgentObj.code,
                                    "idString": "" + parseInt(p[7])
                                });
                                planningFullList[indexVar].price = this.el.getValue(`I${parseInt(index) + 1}`, true).toString().replaceAll(",", "");
                                planningFullList[indexVar].planningUnitNotes = p[9];


                            }
                        } else {
                            updatedMissingPUList.push(this.state.missingPUList[index])
                        }
                        // console.log("1Aug planningFullList------1",planningFullList);
                    })
                    // console.log("1Aug planningFullList------",planningFullList);

                    programData.planningUnitList = planningFullList;
                    dataSetObj.programData = programData;
                    var programDataListForPuCheck = this.state.programDataListForPuCheck;
                    var indexForPuCheck = programDataListForPuCheck.findIndex(c => c.id == dataSetObj.id);
                    programDataListForPuCheck[indexForPuCheck].programData = programData;
                    var datasetListJexcel = programData;
                    // console.log("1Aug programData------after",programData.planningUnitList);
                    // let downloadedProgramData = this.state.downloadedProgramData;
                    // console.log("DPD Test@123",downloadedProgramData);
                    // var index=downloadedProgramData.findIndex(c=>c.programId==programData.programId && c.currentVersion.versionId==programData.currentVersion.versionId);
                    // console.log("Index Test@123",index)
                    // downloadedProgramData[index]=programData;
                    programData = (CryptoJS.AES.encrypt(JSON.stringify(programData), SECRET_KEY)).toString();
                    program.programData = programData;
                    var transaction = db1.transaction(['datasetData'], 'readwrite');
                    var programTransaction = transaction.objectStore('datasetData');
                    // programs.forEach(program => {
                    programTransaction.put(program);
                    // })

                    transaction.oncomplete = function (event) {
                        db1 = e.target.result;
                        var id = (this.state.datasetIdModal + "_uId_" + userId).replace("~", "_");

                        var detailTransaction = db1.transaction(['datasetDetails'], 'readwrite');
                        var datasetDetailsTransaction = detailTransaction.objectStore('datasetDetails');
                        var datasetDetailsRequest = datasetDetailsTransaction.get(id);

                        datasetDetailsRequest.onsuccess = function (e) {
                            var datasetDetailsRequestJson = datasetDetailsRequest.result;
                            datasetDetailsRequestJson.changed = 1;
                            var datasetDetailsRequest1 = datasetDetailsTransaction.put(datasetDetailsRequestJson);
                            // console.log("Testing Final-------------->downloadedProgramData", downloadedProgramData);

                            datasetDetailsRequest1.onsuccess = function (event) {
                                this.setState({
                                    // message: i18n.t('static.mt.dataUpdateSuccess'),
                                    color: "green",
                                    missingPUList: updatedMissingPUList,
                                    dataSetObj: dataSetObj,
                                    fullPlanningUnitList: planningFullList,
                                    programDataListForPuCheck: programDataListForPuCheck
                                    // downloadedProgramData:downloadedProgramData,
                                    // datasetListJexcel:datasetListJexcel
                                }, () => {
                                    this.hideThirdComponent()
                                    if (this.state.missingPUList.length > 0) {
                                        this.getMissingPuListBranchTemplate();
                                    }
                                });
                            }.bind(this)
                        }.bind(this)
                    }.bind(this);
                    transaction.onerror = function (event) {
                    }.bind(this);
                }.bind(this);
            }.bind(this);
        }
    }

    procurementAgentList() {
        const lan = 'en';
        var db1;
        var storeOS;
        getDatabase();
        var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var procurementAgentTransaction = db1.transaction(['procurementAgent'], 'readwrite');
            var procurementAgentOs = procurementAgentTransaction.objectStore('procurementAgent');
            var procurementAgentRequest = procurementAgentOs.getAll();
            var planningList = []
            procurementAgentRequest.onerror = function (event) {
                // Handle errors!
                this.setState({
                    message: 'unknown error occured', loading: false
                },
                    () => {
                        this.hideSecondComponent();
                    })
            };
            procurementAgentRequest.onsuccess = function (e) {
                var myResult = [];
                myResult = procurementAgentRequest.result;
                var listArray = myResult;
                listArray.sort((a, b) => {
                    var itemLabelA = (a.procurementAgentCode).toUpperCase(); // ignore upper and lowercase
                    var itemLabelB = (b.procurementAgentCode).toUpperCase(); // ignore upper and lowercase                   
                    return itemLabelA > itemLabelB ? 1 : -1;
                });

                let tempList = [];

                if (listArray.length > 0) {
                    for (var i = 0; i < listArray.length; i++) {
                        var paJson = {
                            name: listArray[i].procurementAgentCode,
                            id: parseInt(listArray[i].procurementAgentId),
                            active: listArray[i].active,
                            code: listArray[i].procurementAgentCode,
                            label: listArray[i].label
                        }
                        tempList[i] = paJson
                    }
                }

                tempList.unshift({
                    name: 'CUSTOM',
                    id: -1,
                    active: true,
                    code: 'CUSTOM',
                    label: {}
                });
                this.setState({
                    allProcurementAgentList: tempList,
                })
            }.bind(this);
        }.bind(this)
    }

    changedMissingPU = function (instance, cell, x, y, value) {
        // console.log("X Test@123",x)
        if (x == 18) {
            // console.log("Value Test@123",value)
            var colArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'];
            if (value.toString() == "false") {
                // console.log("In changed Test@123")
                this.el.setValueFromCoords(2, y, this.state.missingPUList[y].consuptionForecast, true);
                this.el.setValueFromCoords(3, y, this.state.missingPUList[y].treeForecast, true);
                this.el.setValueFromCoords(4, y, this.state.missingPUList[y].stock, true);
                this.el.setValueFromCoords(5, y, this.state.missingPUList[y].existingShipments, true);
                this.el.setValueFromCoords(6, y, this.state.missingPUList[y].monthsOfStock, true);
                this.el.setValueFromCoords(7, y, (this.state.missingPUList[y].price === "" || this.state.missingPUList[y].price == null || this.state.missingPUList[y].price == undefined) ? "" : (this.state.missingPUList[y].procurementAgent == null || this.state.missingPUList[y].procurementAgent == undefined ? -1 : this.state.missingPUList[y].procurementAgent.id), true);
                this.el.setValueFromCoords(8, y, this.state.missingPUList[y].price, true);
                this.el.setValueFromCoords(9, y, this.state.missingPUList[y].planningUnitNotes, true);
                this.el.setValueFromCoords(10, y, this.state.missingPUList[y].planningUnit.id, true);
                this.el.setValueFromCoords(11, y, this.state.missingPUList[y].programPlanningUnitId, true);
                this.el.setValueFromCoords(12, y, this.state.missingPUList[y].higherThenConsumptionThreshold, true);
                this.el.setValueFromCoords(13, y, this.state.missingPUList[y].lowerThenConsumptionThreshold, true);
                this.el.setValueFromCoords(14, y, this.state.missingPUList[y].selectedForecastMap, true);
                this.el.setValueFromCoords(15, y, this.state.missingPUList[y].otherUnit, true);
                this.el.setValueFromCoords(16, y, this.state.missingPUList[y].createdBy, true);
                this.el.setValueFromCoords(17, y, this.state.missingPUList[y].createdDate, true);
                for (var c = 0; c < colArr.length; c++) {
                    var cell = this.el.getCell((colArr[c]).concat(parseInt(y) + 1))
                    cell.classList.add('readonly');
                }
            } else {
                for (var c = 0; c < colArr.length; c++) {
                    var cell = this.el.getCell((colArr[c]).concat(parseInt(y) + 1))
                    cell.classList.remove('readonly');
                }
            }
        }
        if (x == 7) {
            if (value != -1 && value !== null && value !== '') {
                // console.log("Value--------------->IF");
                let planningUnitId = this.el.getValueFromCoords(10, y);

                let planningUnitObjList = this.state.planningUnitObjList;
                let tempPaList = planningUnitObjList.filter(c => c.planningUnitId == planningUnitId)[0];

                // console.log("mylist--------->1112", planningUnitId);

                if (tempPaList != undefined) {
                    let obj = tempPaList.procurementAgentPriceList.filter(c => c.id == value)[0];
                    // console.log("mylist--------->1113", obj);
                    if (typeof obj != 'undefined') {
                        this.el.setValueFromCoords(8, y, obj.price, true);
                    } else {
                        this.el.getValueFromCoords(8, y) != '' ? this.el.setValueFromCoords(8, y, '', true) : this.el.setValueFromCoords(8, y, '', true);
                    }
                }

            } else {
                // console.log("Value--------------->ELSE");
                this.el.setValueFromCoords(8, y, '', true);
            }

        }

        if (x == 0) {
            let q = '';
            q = (this.el.getValueFromCoords(1, y) != '' ? this.el.setValueFromCoords(1, y, '', true) : '');
            q = (this.el.getValueFromCoords(7, y) != '' ? this.el.setValueFromCoords(7, y, '', true) : '');
            q = (this.el.getValueFromCoords(8, y) != '' ? this.el.setValueFromCoords(8, y, '', true) : '');

            // this.el.setValueFromCoords(1, y, '', true);
            // this.el.setValueFromCoords(7, y, '', true);
            // this.el.setValueFromCoords(8, y, '', true);
        }
        if (x == 1) {
            let q = '';
            q = (this.el.getValueFromCoords(7, y) != '' ? this.el.setValueFromCoords(7, y, '', true) : '');
            q = (this.el.getValueFromCoords(8, y) != '' ? this.el.setValueFromCoords(8, y, '', true) : '');

            // this.el.setValueFromCoords(7, y, '', true);
            // this.el.setValueFromCoords(8, y, '', true);
        }

        //productCategory
        if (x == 0) {
            var col = ("A").concat(parseInt(y) + 1);
            if (value == "") {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setStyle(col, "background-color", "yellow");
                this.el.setComments(col, i18n.t('static.label.fieldRequired'));
            } else {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setComments(col, "");
            }
        }

        //planning unit
        if (x == 1) {
            var json = this.el.getJson(null, false);
            var col = ("B").concat(parseInt(y) + 1);
            if (value == "") {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setStyle(col, "background-color", "yellow");
                this.el.setComments(col, i18n.t('static.label.fieldRequired'));
            } else {
                // console.log("json.length", json.length);
                var jsonLength = parseInt(json.length) - 1;
                // console.log("jsonLength", jsonLength);
                for (var i = jsonLength; i >= 0; i--) {
                    // console.log("i=---------->", i, "y----------->", y);
                    var map = new Map(Object.entries(json[i]));
                    var planningUnitValue = map.get("1");
                    // console.log("Planning Unit value in change", map.get("1"));
                    // console.log("Value----->", value);
                    if (planningUnitValue == value && y != i) {
                        this.el.setStyle(col, "background-color", "transparent");
                        this.el.setStyle(col, "background-color", "yellow");
                        this.el.setComments(col, i18n.t('static.message.planningUnitAlreadyExists'));
                        // this.el.setValueFromCoords(10, y, 1, true);
                        i = -1;
                    } else {
                        this.el.setStyle(col, "background-color", "transparent");
                        this.el.setComments(col, "");
                        // this.el.setValueFromCoords(10, y, 1, true);
                    }
                }
            }
        }

        //stock
        if (x == 4) {
            var col = ("E").concat(parseInt(y) + 1);
            value = this.el.getValue(`E${parseInt(y) + 1}`, true).toString().replaceAll(",", "");
            // console.log("Stock------------------->1", value);
            if (value == '' || value == null) {
                value = this.el.getValueFromCoords(4, y);
            }
            // var reg = /^[0-9\b]+$/;
            // console.log("Stock------------------->2", value);

            var reg = JEXCEL_INTEGER_REGEX;
            if (value != "") {
                if (isNaN(parseInt(value))) {//string value check
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.planningUnitSetting.stringNotAllowed'))
                } else if (!Number.isInteger(Number(value))) {//decimal value check
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.planningUnitSetting.decimalNotAllowed'))
                } else if (!(reg.test(value))) {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.planningUnitSetting.10digitWholeNumber'))
                } else {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setComments(col, "");
                }
            } else {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setComments(col, "");

            }

        }

        //existing shipments
        if (x == 5) {
            var col = ("F").concat(parseInt(y) + 1);
            value = this.el.getValue(`F${parseInt(y) + 1}`, true).toString().replaceAll(",", "");
            if (value == '' || value == null) {
                value = this.el.getValueFromCoords(5, y);
            }
            // var reg = /^[0-9\b]+$/;
            var reg = JEXCEL_INTEGER_REGEX;
            if (value != "") {

                if (isNaN(parseInt(value))) {//string value check
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.planningUnitSetting.stringNotAllowed'))
                } else if (!Number.isInteger(Number(value))) {//decimal value check
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.planningUnitSetting.decimalNotAllowed'))
                } else if (!(reg.test(value))) {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.planningUnitSetting.10digitWholeNumber'))
                } else {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setComments(col, "");
                }
            } else {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setComments(col, "");
            }
        }

        //desired months of stock
        if (x == 6) {
            var col = ("G").concat(parseInt(y) + 1);
            value = this.el.getValue(`G${parseInt(y) + 1}`, true).toString().replaceAll(",", "");
            if (value == '' || value == null) {
                value = this.el.getValueFromCoords(6, y);
            }
            // var reg = /^[0-9\b]+$/;
            var reg = JEXCEL_INTEGER_REGEX;
            if (value != "") {
                if (isNaN(parseInt(value))) {//string value check
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.planningUnitSetting.stringNotAllowed'))
                } else if (!Number.isInteger(Number(value))) {//decimal value check
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.planningUnitSetting.decimalNotAllowed'))
                } else if (!(reg.test(value))) {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.planningUnitSetting.10digitWholeNumber'))
                } else if (parseInt(value) > 99) {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.planningUnitSetting.max99MonthAllowed'));
                } else {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setComments(col, "");
                }
            } else {
                this.el.setStyle(col, "background-color", "transparent");
                this.el.setComments(col, "");
            }
        }
        if (this.el.getValue(`I${parseInt(y) + 1}`, true).toString().replaceAll(",", "") > 0 && this.el.getValue(`H${parseInt(y) + 1}`, true) == "") {
            this.el.setValueFromCoords(7, y, -1, true);
        }


        //unit price
        if (x == 8) {
            var col = ("I").concat(parseInt(y) + 1);
            // this.el.setValueFromCoords(10, y, 1, true);
            value = this.el.getValue(`I${parseInt(y) + 1}`, true).toString().replaceAll(",", "");
            if (value == '' || value == null) {
                value = this.el.getValueFromCoords(8, y);
            }
            var reg = JEXCEL_DECIMAL_CATELOG_PRICE;
            if (value == "") {
            } else {
                if (isNaN(parseInt(value))) {//string value check
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.planningUnitSetting.stringNotAllowed'))
                } else if (Number(value) < 0) {//negative value check
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.planningUnitSetting.negativeValueNotAllowed'))
                } else if (!(reg.test(value))) {//regex check
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setStyle(col, "background-color", "yellow");
                    this.el.setComments(col, i18n.t('static.planningUnitSetting.max10Digit4AfterDecimal'))
                } else {
                    this.el.setStyle(col, "background-color", "transparent");
                    this.el.setComments(col, "");
                }
            }
        }
        // this.setState({
        //     isChanged1: true,
        // });

        // if (x == 11) {
        //     this.el.setStyle(`A${parseInt(y) + 1}`, 'text-align', 'left');
        //     this.el.setStyle(`B${parseInt(y) + 1}`, 'text-align', 'left');

        //     if (value == 1 || value == "") {
        //         var cell = this.el.getCell(("B").concat(parseInt(y) + 1))
        //         cell.classList.remove('readonly');
        //         var cell = this.el.getCell(("A").concat(parseInt(y) + 1))
        //         cell.classList.remove('readonly');
        //     } else {
        //         var cell = this.el.getCell(("B").concat(parseInt(y) + 1))
        //         cell.classList.add('readonly');
        //         var cell = this.el.getCell(("A").concat(parseInt(y) + 1))
        //         cell.classList.add('readonly');
        //     }
        // }
    }

    onchangepageMissingPU(el, pageNo, oldPageNo) {
        if (!localStorage.getItem('sessionType') === 'Online') {
            var elInstance = el;
            var json = elInstance.getJson(null, false);
            var colArr = ['C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'S'];
            var jsonLength = (pageNo + 1) * (document.getElementsByClassName("jss_pagination_dropdown")[0]).value;
            if (jsonLength == undefined) {
                jsonLength = 15
            }
            if (json.length < jsonLength) {
                jsonLength = json.length;
            }
            var start = pageNo * (document.getElementsByClassName("jss_pagination_dropdown")[0]).value;
            for (var y = start; y < jsonLength; y++) {
                var colArr = ['C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'S'];
                if (json[y][19].toString() == "true") {
                    for (var c = 0; c < colArr.length; c++) {
                        var cell = elInstance.getCell((colArr[c]).concat(parseInt(y) + 1))
                        cell.classList.remove('readonly');
                    }
                } else {
                    var cell = elInstance.getCell(("C").concat(parseInt(y) + 1))
                    cell.classList.add('readonly');
                    var cell = elInstance.getCell(("D").concat(parseInt(y) + 1))
                    cell.classList.add('readonly');
                    var cell = elInstance.getCell(("S").concat(parseInt(y) + 1))
                    cell.classList.add('readonly');
                    elInstance.setStyle(("C").concat(parseInt(y) + 1), "pointer-events", "");
                    elInstance.setStyle(("C").concat(parseInt(y) + 1), "pointer-events", "none");
                    elInstance.setStyle(("D").concat(parseInt(y) + 1), "pointer-events", "");
                    elInstance.setStyle(("D").concat(parseInt(y) + 1), "pointer-events", "none");
                    elInstance.setStyle(("S").concat(parseInt(y) + 1), "pointer-events", "");
                    elInstance.setStyle(("S").concat(parseInt(y) + 1), "pointer-events", "none");
                }
            }
        }
    }

    getPlanningUnitWithPricesByIds() {
        // console.log("semma----",this.state.missingPUList.map(ele => (ele.planningUnit.id).toString()));
        PlanningUnitService.getPlanningUnitWithPricesByIds(this.state.missingPUList.map(ele => (ele.planningUnit.id).toString()))
            .then(response => {
                // console.log("Output---",response.data)
                var listArray = response.data;
                this.setState({
                    planningUnitObjList: response.data
                });
            }).catch(
                error => {
                    if (error.message === "Network Error") {
                        this.setState({
                            message: 'static.unkownError',
                            loading: false
                        });
                    } else {
                        switch (error.response ? error.response.status : "") {

                            // case 401:
                            //     this.props.history.push(`/login/static.message.sessionExpired`)
                            //     break;
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

    buildMissingPUJexcel() {
        if (localStorage.getItem('sessionType') === 'Online') {
            this.getPlanningUnitWithPricesByIds();
        }
        var missingPUList = this.state.missingPUList;
        // console.log("missingPUList--->", missingPUList);
        var dataArray = [];
        let count = 0;
        let forecastStartDate = this.state.dataSetObj.programData.currentVersion.forecastStartDate;
        let forecastStopDate = this.state.dataSetObj.programData.currentVersion.forecastStopDate;
        let beforeEndDateDisplay = new Date(forecastStartDate);
        beforeEndDateDisplay.setMonth(beforeEndDateDisplay.getMonth() - 1);
        beforeEndDateDisplay = (!isNaN(beforeEndDateDisplay.getTime()) == false ? '' : months[new Date(beforeEndDateDisplay).getMonth()] + ' ' + new Date(beforeEndDateDisplay).getFullYear());
        var startDateDisplay = (forecastStartDate == '' ? '' : months[Number(moment(forecastStartDate).startOf('month').format("M")) - 1] + ' ' + Number(moment(forecastStartDate).startOf('month').format("YYYY")));
        var endDateDisplay = (forecastStopDate == '' ? '' : months[Number(moment(forecastStopDate).startOf('month').format("M")) - 1] + ' ' + Number(moment(forecastStopDate).startOf('month').format("YYYY")));
        if (missingPUList.length > 0) {
            for (var j = 0; j < missingPUList.length; j++) {
                // console.log("missingPUList--->missingPUList[j].treeForecast", missingPUList[j].treeForecast);
                data = [];
                // data[0] = missingPUList[j].month
                // data[1] = missingPUList[j].startValue
                data[0] = getLabelText(missingPUList[j].productCategory.label, this.state.lang)
                data[1] = getLabelText(missingPUList[j].planningUnit.label, this.state.lang) + " | " + missingPUList[j].planningUnit.id
                data[2] = missingPUList[j].consuptionForecast;
                data[3] = missingPUList[j].treeForecast;
                data[4] = missingPUList[j].stock;
                data[5] = missingPUList[j].existingShipments;
                data[6] = missingPUList[j].monthsOfStock;
                data[7] = (missingPUList[j].price === "" || missingPUList[j].price == null || missingPUList[j].price == undefined) ? "" : (missingPUList[j].procurementAgent == null || missingPUList[j].procurementAgent == undefined ? -1 : missingPUList[j].procurementAgent.id);
                data[8] = missingPUList[j].price;
                data[9] = missingPUList[j].planningUnitNotes;
                data[10] = missingPUList[j].planningUnit.id;
                data[11] = missingPUList[j].programPlanningUnitId;
                data[12] = missingPUList[j].higherThenConsumptionThreshold;
                data[13] = missingPUList[j].lowerThenConsumptionThreshold;
                data[14] = missingPUList[j].selectedForecastMap;
                data[15] = missingPUList[j].otherUnit;
                data[16] = missingPUList[j].createdBy;
                data[17] = missingPUList[j].createdDate;
                data[18] = true;
                data[19] = missingPUList[j].exists;
                dataArray[count] = data;
                count++;
            }
        }
        this.el = jexcel(document.getElementById("missingPUJexcel"), '');
        // this.el.destroy();
        jexcel.destroy(document.getElementById("missingPUJexcel"), true);
        var data = dataArray;
        // console.log("DataArray>>>", dataArray);

        var options = {
            data: data,
            columnDrag: true,
            colWidths: [20, 80, 60, 60, 60, 60, 60, 60, 60, 60],
            colHeaderClasses: ["Reqasterisk"],
            columns: [
                {
                    // 0A
                    title: i18n.t('static.productCategory.productCategory'),
                    type: 'test',
                    editable: false,
                    readOnly: true
                },
                {
                    // 1B
                    title: i18n.t('static.product.product'),
                    type: 'text',
                    editable: false,
                    readOnly: true
                },
                {
                    //2C
                    title: i18n.t('static.commitTree.consumptionForecast') + ' ?',
                    type: 'checkbox',
                    width: '150',
                    // editable: localStorage.getItem('sessionType') === 'Online' ? true : false,
                    // readOnly: localStorage.getItem('sessionType') === 'Online' ? false : true 
                },
                {
                    //3D
                    title: i18n.t('static.TreeForecast.TreeForecast') + ' ?',
                    type: 'checkbox',
                    width: '150',
                    // editable: localStorage.getItem('sessionType') === 'Online' ? true : false,
                    // readOnly: localStorage.getItem('sessionType') === 'Online' ? false : true
                },
                {
                    //4E
                    title: i18n.t('static.planningUnitSetting.stockEndOf') + ' ' + beforeEndDateDisplay + ')',
                    type: 'numeric',
                    textEditor: true,
                    mask: '#,##',
                    width: '150',
                    disabledMaskOnEdition: true,
                    editable: localStorage.getItem('sessionType') === 'Online' ? true : false,
                    readOnly: localStorage.getItem('sessionType') === 'Online' ? false : true
                },
                {
                    //5F
                    title: i18n.t('static.planningUnitSetting.existingShipments') + startDateDisplay + ' - ' + endDateDisplay + ')',
                    type: 'numeric',
                    textEditor: true,
                    mask: '#,##',
                    width: '150',
                    disabledMaskOnEdition: true,
                    editable: localStorage.getItem('sessionType') === 'Online' ? true : false,
                    readOnly: localStorage.getItem('sessionType') === 'Online' ? false : true
                },
                {
                    //6G
                    title: i18n.t('static.planningUnitSetting.desiredMonthsOfStock') + ' ' + endDateDisplay + ')',
                    type: 'numeric',
                    textEditor: true,
                    mask: '#,##',
                    disabledMaskOnEdition: true,
                    width: '150',
                    editable: localStorage.getItem('sessionType') === 'Online' ? true : false,
                    readOnly: localStorage.getItem('sessionType') === 'Online' ? false : true
                },
                {
                    //7H
                    title: i18n.t('static.forecastReport.priceType'),
                    type: 'autocomplete',
                    source: this.state.allProcurementAgentList,
                    width: '120',
                    editable: localStorage.getItem('sessionType') === 'Online' ? true : false,
                    readOnly: localStorage.getItem('sessionType') === 'Online' ? false : true
                },
                {
                    //8I
                    title: i18n.t('static.forecastReport.unitPrice'),
                    type: 'numeric',
                    textEditor: true,
                    decimal: '.',
                    mask: '#,##.00',
                    width: '120',
                    disabledMaskOnEdition: true,
                    editable: localStorage.getItem('sessionType') === 'Online' ? true : false,
                    readOnly: localStorage.getItem('sessionType') === 'Online' ? false : true
                },
                {
                    //9J
                    title: i18n.t('static.program.notes'),
                    type: 'text',
                    editable: localStorage.getItem('sessionType') === 'Online' ? true : false,
                    readOnly: localStorage.getItem('sessionType') === 'Online' ? false : true
                },
                {
                    title: 'planningUnitId',
                    type: 'hidden',
                    readOnly: true //10K
                },
                {
                    title: 'programPlanningUnitId',
                    type: 'hidden',
                    readOnly: true //11L
                },
                {
                    title: 'higherThenConsumptionThreshold',
                    type: 'hidden',
                    readOnly: true //12M
                },
                {
                    title: 'lowerThenConsumptionThreshold',
                    type: 'hidden',
                    readOnly: true //13N
                },
                {
                    title: 'selectedForecastMap',
                    type: 'hidden',
                    readOnly: true //14O
                },
                {
                    title: 'otherUnit',
                    type: 'hidden',
                    readOnly: true //15P
                },
                {
                    title: 'createdBy',
                    type: 'hidden',
                    readOnly: true //16P
                },
                {
                    title: 'createdDate',
                    type: 'hidden',
                    readOnly: true //17P
                },
                {
                    title: i18n.t("static.common.select"),
                    type: 'checkbox',
                    // readOnly: localStorage.getItem('sessionType') === 'Online' ? false : true
                },
                {
                    title: 'exists',
                    type: 'hidden',
                    readOnly: true
                }
            ],
            pagination: localStorage.getItem("sesRecordCount"),
            search: false,
            columnSorting: true,
            wordWrap: true,
            allowInsertColumn: false,
            allowManualInsertColumn: false,
            allowDeleteRow: false,
            copyCompatibility: true,
            allowExport: false,
            onchange: this.changedMissingPU,
            onload: this.loadedMissingPU,
            onchangepage: this.onchangepageMissingPU,
            paginationOptions: JEXCEL_PAGINATION_OPTION,
            position: 'top',
            filters: true,
            license: JEXCEL_PRO_KEY,
            contextMenu: function (obj, x, y, e) {
                return false;
            }.bind(this),

        };
        var missingPUJexcel = jexcel(document.getElementById("missingPUJexcel"), options);
        this.el = missingPUJexcel;
        this.setState({
            missingPUJexcel
        }
        );
    }

    loadedMissingPU = function (instance, cell, x, y, value) {
        // console.log("loaded 2---", document.getElementsByClassName('jexcel'));
        jExcelLoadedFunctionOnlyHideRow(instance, 1);
        // console.log("pp instance",instance)
        var asterisk = document.getElementsByClassName("jss")[0].firstChild.nextSibling;
        // console.log("pp asterisk",asterisk)

        var tr = asterisk.firstChild;
        tr.children[1].classList.add('AsteriskTheadtrTd');
        tr.children[2].classList.add('AsteriskTheadtrTd');
        tr.children[3].classList.add('AsteriskTheadtrTd');
        tr.children[4].classList.add('AsteriskTheadtrTd');

        tr.children[5].classList.add('InfoTr');
        tr.children[6].classList.add('InfoTr');
        tr.children[7].classList.add('InfoTr');
        tr.children[8].classList.add('InfoTr');

        tr.children[5].title = i18n.t('static.tooltip.Stock');
        tr.children[6].title = i18n.t('static.tooltip.ExistingShipments');
        tr.children[7].title = i18n.t('static.tooltip.DesiredMonthsofStock');
        tr.children[8].title = i18n.t('static.tooltip.PriceType');
        if (!localStorage.getItem('sessionType') === 'Online') {
            var elInstance = instance.worksheets[0];
            var json = elInstance.getJson(null, false);
            var jsonLength;

            if ((document.getElementsByClassName("jss_pagination_dropdown")[0] != undefined)) {
                jsonLength = 1 * (document.getElementsByClassName("jss_pagination_dropdown")[0]).value;
            }

            if (jsonLength == undefined) {
                jsonLength = 15
            }
            if (json.length < jsonLength) {
                jsonLength = json.length;
            }
            var colArr = ['C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'S'];
            for (var j = 0; j < jsonLength; j++) {
                if (json[j][19].toString() == "true") {
                    for (var c = 0; c < colArr.length; c++) {
                        var cell = elInstance.getCell((colArr[c]).concat(parseInt(j) + 1))
                        cell.classList.remove('readonly');
                    }
                } else {
                    var cell = elInstance.getCell(("C").concat(parseInt(j) + 1))
                    cell.classList.add('readonly');
                    var cell = elInstance.getCell(("D").concat(parseInt(j) + 1))
                    cell.classList.add('readonly');
                    var cell = elInstance.getCell(("S").concat(parseInt(j) + 1))
                    cell.classList.add('readonly');
                    elInstance.setStyle(("C").concat(parseInt(j) + 1), "pointer-events", "");
                    elInstance.setStyle(("C").concat(parseInt(j) + 1), "pointer-events", "none");
                    elInstance.setStyle(("D").concat(parseInt(j) + 1), "pointer-events", "");
                    elInstance.setStyle(("D").concat(parseInt(j) + 1), "pointer-events", "none");
                    elInstance.setStyle(("S").concat(parseInt(j) + 1), "pointer-events", "");
                    elInstance.setStyle(("S").concat(parseInt(j) + 1), "pointer-events", "none");
                }
            }
        }
    }

    getMissingPuListBranchTemplate() {
        if (this.state.branchTemplateId != "") {
            // console.log("In function Test@@@@@@@@@",this.state)
            var missingPUList = [];
            var json;
            var treeTemplate = this.state.branchTemplateList.filter(x => x.treeTemplateId == this.state.branchTemplateId)[0];
            // console.log("dataset Id template---", this.state.datasetIdModal);
            // if (1==1) {
            // var dataset = this.state.datasetList.filter(x => x.id == this.state.datasetIdModal)[0];
            // console.log("dataset---", dataset);
            // console.log("treeTemplate---", treeTemplate);
            var puNodeList = treeTemplate.flatList.filter(x => x.payload.nodeType.id == 5);
            // console.log("puNodeList---", puNodeList);
            // console.log("planningUnitIdListTemplate---", puNodeList.map((x) => x.payload.nodeDataMap[0][0].puNode.planningUnit.id).join(', '));
            var planningUnitList = this.state.fullPlanningUnitList;
            for (let i = 0; i < puNodeList.length; i++) {
                if (planningUnitList.filter(x => x.treeForecast == true && x.active == true && x.planningUnit.id == puNodeList[i].payload.nodeDataMap[0][0].puNode.planningUnit.id).length == 0) {
                    var parentNodeData = treeTemplate.flatList.filter(x => x.id == puNodeList[i].parent)[0];
                    // console.log("pu Id---", puNodeList[i].payload.nodeDataMap[0][0].puNode.planningUnit.id);
                    var productCategory = "";
                    productCategory = parentNodeData.payload.nodeDataMap[0][0].fuNode.forecastingUnit.productCategory;
                    if (productCategory == undefined) {
                        var forecastingUnit = this.state.forecastingUnitList.filter(c => c.forecastingUnitId == parentNodeData.payload.nodeDataMap[0][0].fuNode.forecastingUnit.id);
                        productCategory = forecastingUnit[0].productCategory;
                    }
                    let existingPU = planningUnitList.filter(x => x.planningUnit.id == puNodeList[i].payload.nodeDataMap[0][0].puNode.planningUnit.id);
                    if (existingPU.length > 0) {
                        json = {
                            productCategory: productCategory,
                            planningUnit: puNodeList[i].payload.nodeDataMap[0][0].puNode.planningUnit,
                            consuptionForecast: existingPU[0].consuptionForecast,
                            treeForecast: true,
                            stock: existingPU[0].stock,
                            existingShipments: existingPU[0].existingShipments,
                            monthsOfStock: existingPU[0].monthsOfStock,
                            procurementAgent: existingPU[0].procurementAgent,
                            price: existingPU[0].price,
                            higherThenConsumptionThreshold: existingPU[0].higherThenConsumptionThreshold,
                            lowerThenConsumptionThreshold: existingPU[0].lowerThenConsumptionThreshold,
                            planningUnitNotes: existingPU[0].planningUnitNotes,
                            consumptionDataType: existingPU[0].consumptionDataType,
                            otherUnit: existingPU[0].otherUnit,
                            selectedForecastMap: existingPU[0].selectedForecastMap,
                            programPlanningUnitId: existingPU[0].programPlanningUnitId,
                            createdBy: existingPU[0].createdBy,
                            createdDate: existingPU[0].createdDate,
                            exists: true
                        }
                        missingPUList.push(json);
                    } else {
                        json = {
                            productCategory: productCategory,
                            planningUnit: puNodeList[i].payload.nodeDataMap[0][0].puNode.planningUnit,
                            consuptionForecast: "",
                            treeForecast: true,
                            stock: "",
                            existingShipments: "",
                            monthsOfStock: "",
                            procurementAgent: "",
                            price: "",
                            higherThenConsumptionThreshold: "",
                            lowerThenConsumptionThreshold: "",
                            planningUnitNotes: "",
                            consumptionDataType: "",
                            otherUnit: "",
                            selectedForecastMap: {},
                            programPlanningUnitId: 0,
                            createdBy: null,
                            createdDate: null,
                            exists: false
                        };
                        missingPUList.push(json);
                    }
                }
            }
            // }
            // console.log("missingPUList---", missingPUList);
            if (missingPUList.length > 0) {
                missingPUList = missingPUList.filter((v, i, a) => a.findIndex(v2 => (v2.planningUnit.id === v.planningUnit.id)) === i)
            }
            this.setState({
                missingPUList
            }, () => {
                this.buildMissingPUJexcel();
            });
        } else {
            this.el = jexcel(document.getElementById("missingPUJexcel"), '');
            // this.el.destroy();
            jexcel.destroy(document.getElementById("missingPUJexcel"), true);
            this.setState({
                missingPUList: []
            })
        }
    }

    getMomValueForDateRange(startDate) {
        // console.log("***MOM startDate---", startDate);
        var startValue = 0;
        var items = this.state.items;
        var item = items.filter(x => x.id == this.state.currentItemConfig.context.id);
        if (item.length > 0) {
            var momList = item[0].payload.nodeDataMap[this.state.selectedScenario][0].nodeDataMomList;
            // console.log("***MOM momList---", momList);
            if (momList.length > 0) {
                // console.log("***MOM inside if---");
                var mom = momList.filter(x => moment(x.month).format("YYYY-MM-DD") == moment(startDate).format("YYYY-MM-DD"));
                // console.log("***MOM mom---", mom);
                if (mom.length > 0) {
                    // console.log("***MOM mom inside if---");
                    startValue = mom[0].startValue;
                    // console.log("***MOM startValue---", startValue);
                }
            }
            // console.log("***MOM startValue---", startValue);
        } else {
            startValue = this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].dataValue
        }
        return startValue;

    }
    calculateParentValueFromMOM(month) {
        var parentValue = 0;
        // console.log("***month----", month);
        var currentItemConfig = this.state.currentItemConfig;
        // console.log("***month cur item config----", currentItemConfig);
        if (currentItemConfig.context.payload.nodeType.id != 1 && currentItemConfig.context.payload.nodeType.id != 2) {
            var items = this.state.items;
            var parentItem = items.filter(x => x.id == currentItemConfig.context.parent);
            // console.log("***month parentItem----", parentItem);
            if (parentItem.length > 0) {
                // console.log("***month parentItem if----", parentItem);
                var nodeDataMomList = parentItem[0].payload.nodeDataMap[this.state.selectedScenario][0].nodeDataMomList;
                // console.log("***month nodeDataMomList----", nodeDataMomList);
                if (nodeDataMomList.length) {
                    // console.log("***month nodeDataMomList if----", nodeDataMomList);
                    var momDataForNode = nodeDataMomList.filter(x => moment(x.month).format("YYYY-MM-DD") == moment(month).format("YYYY-MM-DD"));
                    // console.log("***month momDataForNode----", momDataForNode);
                    if (momDataForNode.length > 0) {
                        // console.log("***month momDataForNode if----", momDataForNode);
                        if (currentItemConfig.context.payload.nodeType.id == 5) {
                            parentValue = momDataForNode[0].calculatedMmdValue;
                            // console.log("***month parentValue 1----", parentValue);
                        } else {
                            parentValue = momDataForNode[0].calculatedValue;
                            // console.log("***month parentValue 2----", parentValue);
                        }
                    }
                }
            }
            var percentageOfParent = currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].dataValue;
            // console.log("***month percentageOfParent---", percentageOfParent);
            // console.log("***month calculated value---", ((percentageOfParent * parentValue) / 100));
            currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].calculatedDataValue = ((percentageOfParent * parentValue) / 100).toString()
        }
        // console.log("***month parentValue before---", parentValue);
        this.setState({ parentValue, currentItemConfig, currentScenario: currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0] }, () => {
            // console.log("***month parentValue after---", this.state.parentValue);
        });
    }
    qatCalculatedPUPerVisit(type) {
        var currentItemConfig = this.state.currentItemConfig;
        var qatCalculatedPUPerVisit = "";
        var planningUnitList = this.state.planningUnitList;
        if (planningUnitList.length > 0 && currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].puNode.planningUnit.id != "") {
            if (planningUnitList.filter(x => x.id == currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].puNode.planningUnit.id).length > 0) {
                var pu = planningUnitList.filter(x => x.id == currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].puNode.planningUnit.id)[0];
                // console.log("pu qat cal 1---", pu.multiplier)
                // console.log("pu qat cal 2---", currentItemConfig.parentItem.payload.nodeDataMap[this.state.selectedScenario][0].fuNode.noOfForecastingUnitsPerPerson);
                // this.getNoOfMonthsInUsagePeriod();
                if (currentItemConfig.parentItem.payload.nodeDataMap[this.state.selectedScenario][0].fuNode.usageType.id == 2) {
                    var refillMonths = 1;
                    // console.log("refillMonths qat cal---", refillMonths)
                    // console.log("noOfmonths qat cal---", this.state.noOfMonthsInUsagePeriod);
                    // qatCalculatedPUPerVisit = this.round(parseFloat(((currentItemConfig.parentItem.payload.nodeDataMap[this.state.selectedScenario][0].fuNode.noOfForecastingUnitsPerPerson / this.state.noOfMonthsInUsagePeriod) * refillMonths) / pu.multiplier).toFixed(4));
                    qatCalculatedPUPerVisit = parseFloat(((currentItemConfig.parentItem.payload.nodeDataMap[this.state.selectedScenario][0].fuNode.noOfForecastingUnitsPerPerson / this.state.noOfMonthsInUsagePeriod) * refillMonths) / pu.multiplier).toFixed(8);
                } else {
                    // if (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].puNode.sharePlanningUnit == "true" || currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].puNode.sharePlanningUnit == true) {
                    //     qatCalculatedPUPerVisit = addCommas(this.state.noOfMonthsInUsagePeriod / pu.multiplier);
                    // } else {
                    //     qatCalculatedPUPerVisit = this.round(this.state.noOfMonthsInUsagePeriod / pu.multiplier);
                    // }
                    // if (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].puNode.sharePlanningUnit == "true" || currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].puNode.sharePlanningUnit == true) {
                    qatCalculatedPUPerVisit = parseFloat(this.state.noFURequired / pu.multiplier).toFixed(8);
                    // } else {
                    // qatCalculatedPUPerVisit = this.round(this.state.noOfMonthsInUsagePeriod / pu.multiplier);
                    // }
                }
                // console.log("inside qat cal val---", qatCalculatedPUPerVisit)

                if (type == 1) {
                    if (currentItemConfig.parentItem.payload.nodeDataMap[this.state.selectedScenario][0].fuNode.usageType.id == 2) {
                        currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].puNode.refillMonths = 1;
                    }
                    currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].puNode.puPerVisit = qatCalculatedPUPerVisit;
                }
                if (type == 2) {
                    currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].puNode.puPerVisit = qatCalculatedPUPerVisit;
                }
            }
        }
        this.setState({ qatCalculatedPUPerVisit });
    }
    levelClicked(data) {
        var name = "";
        var unit = "";
        var levelNo = "";
        if (data != "") {
            // console.log("Data@@@@###############", data.context.levels[0])
            var treeLevelList = this.state.curTreeObj.levelList != undefined ? this.state.curTreeObj.levelList : [];
            var levelListFiltered = treeLevelList.filter(c => c.levelNo == data.context.levels[0]);
            levelNo = data.context.levels[0]
            if (levelListFiltered.length > 0) {
                name = levelListFiltered[0].label.label_en;
                unit = levelListFiltered[0].unit != null && levelListFiltered[0].unit.id != null ? levelListFiltered[0].unit.id : "";
            }
            // console.log("Name@@@@###########", name);
            // console.log("Unit@@@@###########", unit);
        }
        this.setState({
            levelModal: !this.state.levelModal,
            levelName: name,
            levelNo: levelNo,
            levelUnit: unit
        })

    }

    levelNameChanged(e) {
        this.setState({
            levelName: e.target.value
        })
    }

    levelUnitChange(e) {
        var nodeUnitId = e.target.value;
        this.setState({
            levelUnit: e.target.value
        })
    }

    levelDeatilsSaved() {
        const { curTreeObj } = this.state;
        var treeLevelList = this.state.curTreeObj.levelList != undefined ? this.state.curTreeObj.levelList : [];
        var levelListFiltered = treeLevelList.findIndex(c => c.levelNo == this.state.levelNo);
        var items = this.state.items;
        if (levelListFiltered != -1) {
            if (this.state.levelName != "") {
                treeLevelList[levelListFiltered].label = {
                    label_en: this.state.levelName,
                    label_sp: "",
                    label_pr: "",
                    label_fr: ""
                };
                var label = {}
                var levelUnit = null;
                if (this.state.levelUnit != "" && this.state.levelUnit != null) {
                    label = this.state.nodeUnitList.filter(c => c.unitId == this.state.levelUnit)[0].label;
                    items.map((i, count) => {
                        if (i.level == this.state.levelNo && parseInt(i.payload.nodeType.id) <= 3) {
                            items[count].payload.nodeUnit = {
                                id: this.state.levelUnit,
                                label: label
                            }
                        }
                    })
                    levelUnit = {
                        id: this.state.levelUnit != "" && this.state.levelUnit != null ? parseInt(this.state.levelUnit) : null,
                        label: label
                    }
                }
                treeLevelList[levelListFiltered].unit = levelUnit
            } else {
                treeLevelList.splice(levelListFiltered, 1);
            }
        } else {
            if (this.state.levelName != "") {
                var label = {}
                var levelUnit = null;
                if (this.state.levelUnit != "" && this.state.levelUnit != null) {
                    label = this.state.nodeUnitList.filter(c => c.unitId == this.state.levelUnit)[0].label;
                    items.map((i, count) => {
                        if (i.level == this.state.levelNo && parseInt(i.payload.nodeType.id) <= 3) {
                            items[count].payload.nodeUnit = {
                                id: this.state.levelUnit,
                                label: label
                            }
                        }
                    })
                    levelUnit = {
                        id: this.state.levelUnit != "" && this.state.levelUnit != null ? parseInt(this.state.levelUnit) : null,
                        label: label
                    }
                }
                treeLevelList.push({
                    levelId: null,
                    levelNo: this.state.levelNo,
                    label: {
                        label_en: this.state.levelName,
                        label_sp: "",
                        label_pr: "",
                        label_fr: ""
                    },
                    unit: levelUnit
                })
            }
        }
        curTreeObj.levelList = treeLevelList;
        // console.log("Cur Tree Obj@@@@@", curTreeObj)
        this.setState({
            levelModal: false,
            curTreeObj,
        }, () => {
            this.saveTreeData(false, false)
            // console.log("final tab list---", this.state.items);
            // if (type == 1) {
            //     var maxNodeDataId = temNodeDataMap.length > 0 ? Math.max(...temNodeDataMap.map(o => o.nodeDataId)) : 0;
            //     // console.log("scenarioId---", scenarioId);
            //     for (var i = 0; i < items.length; i++) {
            //         maxNodeDataId = parseInt(maxNodeDataId) + 1;
            //         (items[i].payload.nodeDataMap[scenarioId])[0].nodeDataId = maxNodeDataId;
            //         // console.log("my node data id--->", (items[i].payload.nodeDataMap[scenarioId])[0].nodeDataId);
            //     }
            //     this.callAfterScenarioChange(scenarioId);
            //     this.updateTreeData();
            // }
        });
    }

    calculatePUPerVisit(isRefillMonth) {
        var currentScenario = this.state.currentScenario;
        var parentScenario = this.state.parentScenario;
        var currentItemConfig = this.state.currentItemConfig;
        var conversionFactor = this.state.conversionFactor;
        var puPerVisit = "";
        // console.log("PUPERVISIT conversionFactor---", conversionFactor);
        if (parentScenario.fuNode.usageType.id == 2) {
            var refillMonths = 1;
            // console.log("PUPERVISIT refillMonths---", refillMonths);
            // console.log("PUPERVISIT noOfForecastingUnitsPerPerson---", parentScenario.fuNode.noOfForecastingUnitsPerPerson);
            // console.log("PUPERVISIT noOfMonthsInUsagePeriod---", this.state.noOfMonthsInUsagePeriod);
            // puPerVisit = this.round(parseFloat(((parentScenario.fuNode.noOfForecastingUnitsPerPerson / this.state.noOfMonthsInUsagePeriod) * refillMonths) / conversionFactor).toFixed(4));
            puPerVisit = parseFloat(((parentScenario.fuNode.noOfForecastingUnitsPerPerson / this.state.noOfMonthsInUsagePeriod) * refillMonths) / conversionFactor).toFixed(8);
            // console.log("PUPERVISIT puPerVisit---", puPerVisit);
        } else if (parentScenario.fuNode.usageType.id == 1) {
            // if (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].puNode.sharePlanningUnit == "true" || currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].puNode.sharePlanningUnit == true) {
            puPerVisit = parseFloat(this.state.noFURequired / conversionFactor).toFixed(8);
            // } else {
            // puPerVisit = this.round(this.state.noOfMonthsInUsagePeriod / conversionFactor);
            // }
        }
        currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].puNode.puPerVisit = puPerVisit;
        if (!isRefillMonth) {
            currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].puNode.refillMonths = refillMonths;
        }
        currentScenario = currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0];
        this.setState({ currentItemConfig, currentScenario });
    }

    round(value) {
        // console.log("Round input value---", value);
        var result = (value - Math.floor(value)).toFixed(4);
        // console.log("Round result---", result);
        // console.log("Round condition---", `${ROUNDING_NUMBER}`);
        if (result > `${ROUNDING_NUMBER}`) {
            // console.log("Round ceiling---", Math.ceil(value));
            return Math.ceil(value);
        } else {
            // console.log("Round floor---", Math.floor(value));
            if (Math.floor(value) == 0) {
                return Math.ceil(value);
            } else {
                return Math.floor(value);
            }
        }
    }
    getMaxNodeDataId() {
        var maxNodeDataId = 0;
        // if (this.state.maxNodeDataId != "" && this.state.maxNodeDataId != 0) {
        //     maxNodeDataId = parseInt(this.state.maxNodeDataId + 1);
        //     // console.log("maxNodeDataId 1---", maxNodeDataId)
        //     this.setState({
        //         maxNodeDataId
        //     })
        // } else {
        var items = this.state.items;
        var nodeDataMap = [];
        var nodeDataMapIdArr = [];
        // console.log("items.length---", items)
        for (let i = 0; i < items.length; i++) {
            var scenarioList = this.state.scenarioList;
            // console.log("scenarioList length---", scenarioList.length);
            for (let j = 0; j < scenarioList.length; j++) {
                // console.log("array a---", i, "---", items[i]);
                if (items[i].payload.nodeDataMap.hasOwnProperty(scenarioList[j].id)) {
                    nodeDataMap.push(items[i].payload.nodeDataMap[scenarioList[j].id][0]);
                    nodeDataMapIdArr.push(items[i].payload.nodeDataMap[scenarioList[j].id][0].nodeDataId);
                }
            }
        }
        maxNodeDataId = nodeDataMap.length > 0 ? Math.max(...nodeDataMap.map(o => o.nodeDataId)) : 0;
        // console.log("nodeDataMap array---", nodeDataMap);
        // console.log("nodeDataMapIdArr---", nodeDataMapIdArr);
        // console.log("maxNodeDataId 2---", maxNodeDataId)
        maxNodeDataId = parseInt(maxNodeDataId + 1);
        // this.setState({
        //     maxNodeDataId
        // })
        // }
        return maxNodeDataId;
    }

    formSubmitLoader() {
        // console.log("node id cur node---", this.state.currentItemConfig.context.payload);
        // console.log("validate---", validateNodeData(validationSchemaNodeData));
        this.setState({
            modelingJexcelLoader: true
        }, () => {
            // alert("load 2")
            setTimeout(() => {
                // console.log("inside set timeout")
                this.formSubmit();

            }, 0);
        })
    }
    hideSecondComponent() {
        document.getElementById('div2').style.display = 'block';
        setTimeout(function () {
            document.getElementById('div2').style.display = 'none';
        }, 30000);
    }

    hideThirdComponent() {
        document.getElementById('div3').style.display = 'block';
        setTimeout(function () {
            document.getElementById('div3').style.display = 'none';
        }, 30000);
    }

    calculateMOMData(nodeId, type) {
        let { curTreeObj } = this.state;
        let { treeData } = this.state;
        let { dataSetObj } = this.state;
        var items = this.state.items;
        var programData = dataSetObj.programData;
        // console.log("program data>>> 1", programData);
        // console.log("program data treeData>>> 1.1", treeData);
        // console.log("program data curTreeObj>>> 1.1", curTreeObj);
        programData.treeList = treeData;
        // console.log("program data>>> 2", programData);
        // alert("27---")
        if (this.state.selectedScenario !== "") {
            curTreeObj.tree.flatList = items;
        }
        curTreeObj.scenarioList = this.state.scenarioList;
        var findTreeIndex = treeData.findIndex(n => n.treeId == curTreeObj.treeId);
        treeData[findTreeIndex] = curTreeObj;
        programData.treeList = treeData;
        dataSetObj.programData = programData;
        // console.log("dataSetDecrypt 2121>>>", dataSetObj);
        // console.log("Before modeling data calculation Test")
        calculateModelingData(dataSetObj, this, '', (nodeId != 0 ? nodeId : this.state.currentItemConfig.context.id), this.state.selectedScenario, type, this.state.treeId, false, false, this.state.autoCalculate);
        // }
    }
    fetchTracerCategoryList(programData) {
        // console.log("programData---%%%%%%%", programData);
        var planningUnitList = programData.planningUnitList.filter(x => x.treeForecast == true && x.active == true);
        var updatedPlanningUnitList = [];
        var fullPlanningUnitList = [];
        var forecastingUnitList = [];
        var tracerCategoryList = [];
        planningUnitList.map(item => {
            forecastingUnitList.push({
                label: item.planningUnit.forecastingUnit.label, id: item.planningUnit.forecastingUnit.id,
                unit: item.planningUnit.forecastingUnit.unit,
                tracerCategory: item.planningUnit.forecastingUnit.tracerCategory
            })
        })
        // console.log("forecastingUnitListNew---", forecastingUnitList);
        programData.planningUnitList.map(item => {
            fullPlanningUnitList.push(item)
        })
        planningUnitList.map(item => {
            updatedPlanningUnitList.push({
                label: item.planningUnit.label, id: item.planningUnit.id,
                unit: item.planningUnit.unit,
                forecastingUnit: item.planningUnit.forecastingUnit,
                multiplier: item.planningUnit.multiplier
            })
        })
        // console.log("updatedPlanningUnitList", updatedPlanningUnitList);
        planningUnitList.map(item => {
            tracerCategoryList.push({
                label: item.planningUnit.forecastingUnit.tracerCategory.label, tracerCategoryId: item.planningUnit.forecastingUnit.tracerCategory.id
            })
        })
        // console.log("duplicate tc list--->", tracerCategoryList);
        forecastingUnitList = [...new Map(forecastingUnitList.map(v => [v.id, v])).values()];
        // console.log("unique fu list--->", forecastingUnitList);
        tracerCategoryList = [...new Map(tracerCategoryList.map(v => [v.tracerCategoryId, v])).values()];
        // console.log("unique tc list--->", tracerCategoryList);
        var forecastingUnitListNew = JSON.parse(JSON.stringify(forecastingUnitList));
        let forecastingUnitMultiList = forecastingUnitListNew.length > 0
            && forecastingUnitListNew.map((item, i) => {
                return ({ value: item.id, label: getLabelText(item.label, this.state.lang) + " | " + item.id })

            }, this);
        this.setState({
            forecastingUnitMultiList,
            tracerCategoryList,
            forecastingUnitList,
            planningUnitList: updatedPlanningUnitList,
            updatedPlanningUnitList,
            fullPlanningUnitList: fullPlanningUnitList
        }, () => {
            if (forecastingUnitListNew.length > 0) {
                var fuIds = forecastingUnitListNew.map(x => x.id).join(", ");
                // console.log("fuIds---", fuIds)
                if (fuIds != "") {
                    var fuIdArray = fuIds.split(',').map(Number);
                    // console.log("fuIdArray---", fuIdArray);
                    this.getUsageTemplateList(fuIdArray);
                }
                // var result = array.filter(function(value) {
                //     return filterNumbers.indexOf(value) === -1;
                // });
            }
        });
    }

    alertfunction() {
        // console.log(">>>hi");
        // console.log(">>>", document.getElementById("usageFrequency").value)

    }

    resetNodeData() {
        // console.log("reset node data function called");
        const { orgCurrentItemConfig, currentItemConfig } = this.state;
        var nodeTypeId;
        var fuValues = [];
        if (currentItemConfig.context.level != 0 && currentItemConfig.parentItem.payload.nodeType.id == 4) {
            nodeTypeId = PU_NODE_ID;
            // console.log("reset node data function called 0.1---", currentItemConfig);
        } else {
            nodeTypeId = currentItemConfig.context.payload.nodeType.id;
        }
        // conso
        // console.log("reset node data function called 1---", currentItemConfig);
        currentItemConfig.context = JSON.parse(JSON.stringify(orgCurrentItemConfig));
        // currentScenario = JSON.parse(JSON.stringify((orgCurrentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0]));
        // console.log("============1============", orgCurrentItemConfig);
        if (nodeTypeId == 5) {
            // console.log("reset node data function called 2---", orgCurrentItemConfig);
            currentItemConfig.context.payload.nodeType.id = nodeTypeId;

            currentItemConfig.context.payload.nodeUnit.id = this.state.items.filter(x => x.id == currentItemConfig.parentItem.parent)[0].payload.nodeUnit.id;
            if (this.state.addNodeFlag) {
                var parentCalculatedDataValue = this.state.items.filter(x => x.id == currentItemConfig.context.parent)[0].payload.nodeDataMap[this.state.selectedScenario][0].calculatedDataValue;
                // console.log("parentCalculatedDataValue 1---", this.state.items.filter(x => x.id == currentItemConfig.context.parent)[0].payload.nodeDataMap[this.state.selectedScenario][0]);
                // console.log("parentCalculatedDataValue 2---", parentCalculatedDataValue);
                currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].dataValue = 100;
                currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].calculatedDataValue = ((100 * parentCalculatedDataValue) / 100).toString();
            }
            var planningUnit = this.state.updatedPlanningUnitList.filter(x => x.id == currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].puNode.planningUnit.id);
            var conversionFactor = planningUnit.length > 0 ? planningUnit[0].multiplier : "";
            // console.log("conversionFactor---", conversionFactor);
            this.setState({
                conversionFactor
            }, () => {
                this.getUsageText();
            });
        } else if (nodeTypeId == 4 && !this.state.addNodeFlag) {
            fuValues = { value: orgCurrentItemConfig.payload.nodeDataMap[this.state.selectedScenario][0].fuNode.forecastingUnit.id, label: getLabelText(orgCurrentItemConfig.payload.nodeDataMap[this.state.selectedScenario][0].fuNode.forecastingUnit.label, this.state.lang) + " | " + orgCurrentItemConfig.payload.nodeDataMap[this.state.selectedScenario][0].fuNode.forecastingUnit.id };
        }
        this.setState({
            currentItemConfig,
            currentScenario: (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0],
            usageTemplateId: "",
            fuValues: fuValues,
            usageText: ""
        }, () => {
            // console.log("reset node data function called 3---", this.state.currentScenario);
            if (nodeTypeId == 4) {
                this.getForecastingUnitListByTracerCategoryId(0, 0);
            }
            // console.log("currentItemConfig after---", this.state.orgCurrentItemConfig)
        });
    }

    callAfterScenarioChange(scenarioId) {
        // console.log("&&&&scenarioId---", scenarioId);
        let { curTreeObj } = this.state;
        // console.log("&&&&curTreeObj---", curTreeObj);
        var items = curTreeObj.tree.flatList;
        var scenarioId = scenarioId;
        // console.log("items***&---", items);
        for (let i = 0; i < items.length; i++) {
            // console.log("&&&&item---", items[i]);
            // console.log("my scenario---", scenarioId);
            // console.log("current item --->", items[i]);
            if (items[i].payload.nodeType.id == 1 || items[i].payload.nodeType.id == 2) {
                // console.log("my scenario---INSIDE IF items[i]", items[i]);
                // console.log("my scenario---INSIDE IF items[i].payload", items[i].payload);
                // console.log("my scenario---INSIDE IF items[i].payload.nodeDataMap", items[i].payload.nodeDataMap);
                // console.log("my scenario---INSIDE IF scenarioId", scenarioId);
                // console.log("my scenario---INSIDE IF (items[i].payload.nodeDataMap[scenarioId])", (items[i].payload.nodeDataMap[scenarioId]));
                // console.log("my scenario---INSIDE IF (items[i].payload.nodeDataMap[scenarioId])[0]", (items[i].payload.nodeDataMap[scenarioId])[0]);

                // console.log("my scenario---INSIDE IF (items[i].payload.nodeDataMap[scenarioId])[0].dataValue", (items[i].payload.nodeDataMap[scenarioId])[0].dataValue);
                (items[i].payload.nodeDataMap[scenarioId])[0].calculatedDataValue = (items[i].payload.nodeDataMap[scenarioId])[0].dataValue;
                // console.log("my scenario---INSIDE IF Conpleted", items[i]);

            } else {
                // console.log("my scenario---INSIDE ESLE");
                var findNodeIndex = items.findIndex(n => n.id == items[i].parent);
                var parentValue = (items[findNodeIndex].payload.nodeDataMap[scenarioId])[0].calculatedDataValue;
                // console.log("api parent value---", parentValue);
                // console.log("api parent value after---", items[i]);

                (items[i].payload.nodeDataMap[scenarioId])[0].calculatedDataValue = (parentValue * (items[i].payload.nodeDataMap[scenarioId])[0].dataValue) / 100;
            }
            // console.log("load---", items[i])
            // arr.push(items[i]);
        }
        var scenario = document.getElementById("scenarioId");
        var selectedText = scenario.options[scenario.selectedIndex].text;
        // console.log("scenarioId in separate function---", scenarioId);
        this.setState({
            items,
            selectedScenario: scenarioId,
            selectedScenarioLabel: selectedText,
            // currentScenario: (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0]

        }, () => {
            // console.log('month value --->', this.state.singleValue2)
            this.handleAMonthDissmis3(this.state.singleValue2, 0);
            // this.calculateValuesForAggregateNode(items);
        });
    }
    // onClick1 () {
    //     this.state({
    //         showDiv1:false,
    //     })
    //     alert('hiiiii')
    //     // console.log(

    //         "ShowDiv1",this.state.showDiv1
    //     )

    //     };
    toggleStartValueModelingTool() {
        this.setState({
            popoverOpenStartValueModelingTool: !this.state.popoverOpenStartValueModelingTool
        })
    }
    toggleShowGuidanceNodeData() {
        this.setState({
            showGuidanceNodeData: !this.state.showGuidanceNodeData
        })
    }
    toggleShowGuidanceModelingTransfer() {
        this.setState({
            showGuidanceModelingTransfer: !this.state.showGuidanceModelingTransfer
        })
    }
    toggleShowGuidance() {
        this.setState({
            showGuidance: !this.state.showGuidance
        })
    }
    toggleDeropdownSetting(i) {
        const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
        this.setState({
            dropdownOpen: newArray,
        });
    }
    toggleHowManyPUperIntervalPer() {
        this.setState({
            popoverOpenHowManyPUperIntervalPer: !this.state.popoverOpenHowManyPUperIntervalPer,
        });
    }
    toggleWillClientsShareOnePU() {
        this.setState({
            popoverOpenWillClientsShareOnePU: !this.state.popoverOpenWillClientsShareOnePU,
        });
    }
    toggleConsumptionIntervalEveryXMonths() {
        this.setState({
            popoverOpenConsumptionIntervalEveryXMonths: !this.state.popoverOpenConsumptionIntervalEveryXMonths,
        });
    }
    toggleQATEstimateForInterval() {
        this.setState({
            popoverOpenQATEstimateForInterval: !this.state.popoverOpenQATEstimateForInterval,
        });
    }
    toggleNoOfPUUsage() {
        this.setState({
            popoverOpenNoOfPUUsage: !this.state.popoverOpenNoOfPUUsage,
        });
    }
    toggleConversionFactorFUPU() {
        this.setState({
            popoverOpenConversionFactorFUPU: !this.state.popoverOpenConversionFactorFUPU,
        });
    }
    togglePlanningUnitNode() {
        this.setState({
            popoverOpenPlanningUnitNode: !this.state.popoverOpenPlanningUnitNode,
        });
    }
    toggleHashOfUMonth() {
        this.setState({
            popoverOpenHashOfUMonth: !this.state.popoverOpenHashOfUMonth,
        });
    }
    toggleForecastingUnitPU() {
        this.setState({
            popoverOpenForecastingUnitPU: !this.state.popoverOpenForecastingUnitPU,
        });
    }
    toggleTypeOfUsePU() {
        this.setState({
            popoverOpenTypeOfUsePU: !this.state.popoverOpenTypeOfUsePU,
        });
    }
    toggleSingleUse() {
        this.setState({
            popoverOpenSingleUse: !this.state.popoverOpenSingleUse,
        });
    }
    toggleLagInMonth() {
        this.setState({
            popoverOpenLagInMonth: !this.state.popoverOpenLagInMonth,
        });
    }
    toggleTypeOfUse() {
        this.setState({
            popoverOpenTypeOfUse: !this.state.popoverOpenTypeOfUse,
        });
    }
    toggleCopyFromTemplate() {
        this.setState({
            popoverOpenCopyFromTemplate: !this.state.popoverOpenCopyFromTemplate,
        });
    }
    toggletracercategoryModelingType() {
        this.setState({
            popoverOpentracercategoryModelingType: !this.state.popoverOpentracercategoryModelingType,
        });
    }
    toggleParentValue() {
        this.setState({
            popoverOpenParentValue: !this.state.popoverOpenParentValue,
        });
    }
    togglePercentageOfParent() {
        this.setState({
            popoverOpenPercentageOfParent: !this.state.popoverOpenPercentageOfParent,
        });
    }
    toggleParent() {
        this.setState({
            popoverOpenParent: !this.state.popoverOpenParent,
        });
    }
    toggleCalculatedMonthOnMonthChnage() {
        this.setState({
            popoverOpenCalculatedMonthOnMonthChnage: !this.state.popoverOpenCalculatedMonthOnMonthChnage,
        });
    }
    toggleTargetChangeHash() {
        this.setState({
            popoverOpenTargetChangeHash: !this.state.popoverOpenTargetChangeHash,
        });
    }
    toggleTargetChangePercent() {
        this.setState({
            popoverOpenTargetChangePercent: !this.state.popoverOpenTargetChangePercent,
        });
    }
    toggleTargetEndingValue() {
        this.setState({
            popoverOpenTargetEndingValue: !this.state.popoverOpenTargetEndingValue,
        });
    }

    toggleMonth() {
        this.setState({
            popoverOpenMonth: !this.state.popoverOpenMonth,
        });
    }
    toggleFirstMonthOfTarget() {
        this.setState({
            popoverOpenFirstMonthOfTarget: !this.state.popoverOpenFirstMonthOfTarget
        })
    }
    toggleYearsOfTarget() {
        this.setState({
            popoverOpenYearsOfTarget: !this.state.popoverOpenYearsOfTarget
        })
    }
    toggleNodeValue() {
        this.setState({
            popoverOpenNodeValue: !this.state.popoverOpenNodeValue,
        });
    }
    toggleNodeType() {
        this.setState({
            popoverOpenNodeType: !this.state.popoverOpenNodeType,
        });
    }
    toggleNodeTitle() {
        this.setState({
            popoverOpenNodeTitle: !this.state.popoverOpenNodeTitle,
        });
    }
    toggleSenariotree() {
        this.setState({
            popoverOpenSenariotree: !this.state.popoverOpenSenariotree,
        });
    }

    toggleTooltipAuto() {
        this.setState({
            popoverTooltipAuto: !this.state.popoverTooltipAuto,
        });
    }

    toggleCollapse() {
        var treeId = this.state.treeId;
        if (treeId != null && treeId != "") {
            this.setState({
                showDiv: !this.state.showDiv
            })
        } else {
            confirmAlert({
                message: "Please select a tree.",
                buttons: [
                    {
                        label: i18n.t('static.report.ok')
                    }
                ]
            });
        }
    }
    toggleDropdown() {
        this.setState({
            showDiv1: !this.state.showDiv1
        })
    }
    updateExtrapolationData(parameterName, value) {
        this.setState({
            [parameterName]: value
        });
    }
    updateState(parameterName, value) {
        // console.log("parameterName---", parameterName + " value---", value);
        // console.log("value---", value);
        this.setState({
            [parameterName]: value
        }, () => {
            var items = this.state.items;
            // console.log("items before update 1234567---", items);
            if (parameterName == 'currentItemConfig') {
                // console.log("node id for update state 1----", value.context.id);
                if (value.context.id == "" || value.context.id == null) {
                    this.onAddButtonClick(this.state.currentItemConfig, false, null);
                } else {
                    var findNodeIndex = items.findIndex(n => n.id == value.context.id);
                    // console.log("findNodeIndex1---", findNodeIndex);
                    items[findNodeIndex] = value.context;
                    // console.log("node id for update state 2----", value.context);
                    // console.log("node id for update state 3----", items);
                    this.setState({ items }, () => {
                        // console.log("node id for update state 4----", this.state.items);
                        this.saveTreeData(true, false);
                    })
                }
            }
            if (parameterName == 'nodeId' && (value != null && value != 0)) {
                var nodeDataMomList = this.state.nodeDataMomList;
                // console.log("nodeDataMomList---", nodeDataMomList);
                if (nodeDataMomList.length > 0) {
                    for (let i = 0; i < nodeDataMomList.length; i++) {
                        // console.log("nodeDataMomList[i]---", nodeDataMomList[i])
                        var nodeId = nodeDataMomList[i].nodeId;
                        var nodeDataMomListForNode = nodeDataMomList[i].nodeDataMomList;
                        // console.log("this.state.nodeDataMomList---", this.state.nodeDataMomList);
                        var node = items.filter(n => n.id == nodeId)[0];
                        // console.log("node---", node);
                        (node.payload.nodeDataMap[this.state.selectedScenario])[0].nodeDataMomList = nodeDataMomListForNode;
                        var findNodeIndex = items.findIndex(n => n.id == nodeId);
                        // console.log("findNodeIndex---", findNodeIndex);
                        items[findNodeIndex] = node;
                    }
                }
                // console.log("items---***", items);
                this.setState({ items })
            }
            // console.log("this.state.currentItemConfig.context.payload.extrapolation----", this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].extrapolation);
            // console.log("cureent cotext---", this.state.currentItemConfig.context);
            if (parameterName == 'type' && (value == 0 || value == 1) && (!this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].hasOwnProperty("extrapolation") || this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].extrapolation != undefined && this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].extrapolation != true && this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].extrapolation != "true")) {
                // if (parameterName == 'type' && (value == 0 || value == 1)) {
                // console.log(" type 0 or 1");
                if (this.state.currentItemConfig.context.payload.nodeType.id == 1 || this.state.currentItemConfig.context.payload.nodeType.id == 2) {
                    // console.log("mom list ret---", this.state.nodeDataMomList.filter(x => x.nodeId == this.state.currentItemConfig.context.id));
                    this.setState({ momList: this.state.nodeDataMomList.filter(x => x.nodeId == this.state.currentItemConfig.context.id)[0].nodeDataMomList }, () => {
                        // console.log("going to build mom jexcel");
                        if (this.state.modelingEl != null && this.state.modelingEl != undefined && this.state.modelingEl != "") {
                            this.filterScalingDataByMonth(this.state.scalingMonth.year + "-" + this.state.scalingMonth.month + "-01", this.state.nodeDataMomList.filter(x => x.nodeId == this.state.currentItemConfig.context.id)[0].nodeDataMomList);
                        }
                        if (value == 1 || (value == 0 && this.state.showMomData)) {
                            this.buildMomJexcel();
                        }
                    });
                } else {
                    // console.log("inside else---");
                    // console.log("this.state.currentItemConfig.context.id---", this.state.currentItemConfig.context.id);
                    this.setState({ momListPer: this.state.nodeDataMomList.filter(x => x.nodeId == this.state.currentItemConfig.context.id)[0].nodeDataMomList }, () => {
                        // console.log("going to build mom jexcel percent");
                        if (this.state.modelingEl != null && this.state.modelingEl != undefined && this.state.modelingEl != "") {
                            this.filterScalingDataByMonth(this.state.scalingMonth.year + "-" + this.state.scalingMonth.month + "-01", this.state.nodeDataMomList.filter(x => x.nodeId == this.state.currentItemConfig.context.id)[0].nodeDataMomList);
                        }
                        if (value == 1 || (value == 0 && this.state.showMomDataPercent)) {
                            this.buildMomJexcelPercent();
                        }
                    });
                }

            }
            if (parameterName == "nodeDataMomList") {
                this.saveTreeData(false, false);
            }
            // if (parameterName != 'currentItemConfig') {
            //     console.log("Hello Clicked")
            //     this.saveTreeData(false, false);
            // }
            // console.log("returmed list---", this.state.nodeDataMomList);

        })
    }

    calculateAfterDragDrop() {
        var items = this.state.curTreeObj.tree.flatList;
        // console.log("items>>>", items);
        for (let i = 0; i < items.length; i++) {
            var nodeDataModelingMap = this.state.modelinDataForScenario.filter(c => c.nodeDataId == items[i].payload.nodeDataMap[this.state.selectedScenario][0].nodeDataId);
            (items[i].payload.nodeDataMap[this.state.selectedScenario])[0].displayCalculatedDataValue = nodeDataModelingMap[0].calculatedValue;
            (items[i].payload.nodeDataMap[this.state.selectedScenario])[0].displayDataValue = nodeDataModelingMap[0].endValue;
        }
        this.setState({
            items,
        })
    }
    saveTreeData(flag, collapseFlag) {
        // console.log("saving tree data for calculation>>>");
        this.setState({ loading: collapseFlag ? false : true }, () => {
            var curTreeObj = this.state.curTreeObj;
            curTreeObj.generateMom = 0;
            let { treeData } = this.state;
            let { dataSetObj } = this.state;
            var items = this.state.items;
            // console.log("dataSetObj--->>>", dataSetObj)
            // console.log("treeData--->>>", treeData)
            // console.log("curTreeObj--->>>", curTreeObj)
            // console.log("tree items 1---", items);
            for (let i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.payload.nodeType.id == 4 || item.payload.nodeType.id == 5) {
                    item.isVisible = true;
                }
                // arr.push(item);
            }
            // console.log("tree items 2---", items);
            let tempProgram = JSON.parse(JSON.stringify(dataSetObj))
            // console.log("save tree data items>>>", items);
            // var databytes = CryptoJS.AES.decrypt(dataSetObj.programData, SECRET_KEY);
            // var programData = JSON.parse(databytes.toString(CryptoJS.enc.Utf8));
            var programData = tempProgram.programData;
            // console.log("save tree data items 1>>>", items);
            programData.treeList = treeData;
            // console.log("save tree data items 2>>>", items);
            // console.log("program data 3>>>", programData);

            curTreeObj.scenarioList = this.state.scenarioList;
            if (items.length > 0) {
                // console.log("inside if items > 0---", items);
                // console.log("inside if cu tree obj before---", curTreeObj);
                curTreeObj.tree.flatList = items;
                // console.log("inside if cu tree obj---", curTreeObj);
            }
            curTreeObj.lastModifiedDate = moment(new Date().toLocaleString("en-US", { timeZone: "America/New_York" })).format("YYYY-MM-DD HH:mm:ss");
            if (curTreeObj.lastModifiedBy != undefined) {
                curTreeObj.lastModifiedBy.userId = AuthenticationService.getLoggedInUserId();
            } else {
                curTreeObj.lastModifiedBy = {
                    "userId": AuthenticationService.getLoggedInUserId()
                }
            }
            // console.log("inside if cur tree obj out---", curTreeObj);
            var findTreeIndex = treeData.findIndex(n => n.treeId == curTreeObj.treeId);
            // console.log("cur tree findTreeIndex---", findTreeIndex);
            treeData[findTreeIndex] = curTreeObj;
            // console.log("treeData before saving---", treeData);

            // var databytes = CryptoJS.AES.decrypt(dataSetObj.programData, SECRET_KEY);
            // var programData = JSON.parse(databytes.toString(CryptoJS.enc.Utf8));
            programData.treeList = treeData;
            // console.log("dataSetDecrypt>>>", programData);


            programData = (CryptoJS.AES.encrypt(JSON.stringify(programData), SECRET_KEY)).toString();
            tempProgram.programData = programData;

            // console.log("encpyDataSet>>>", tempProgram)
            // store update object in indexdb
            var db1;
            getDatabase();
            var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
            openRequest.onerror = function (event) {
                this.setState({
                    message: i18n.t('static.program.errortext'),
                    color: 'red'
                })
                this.hideSecondComponent()
            }.bind(this);
            openRequest.onsuccess = function (e) {
                db1 = e.target.result;
                var transaction = db1.transaction(['datasetData'], 'readwrite');
                var programTransaction = transaction.objectStore('datasetData');
                // programs.forEach(program => {
                var programRequest = programTransaction.put(tempProgram);
                transaction.oncomplete = function (event) {
                    db1 = e.target.result;
                    var detailTransaction = db1.transaction(['datasetDetails'], 'readwrite');
                    var datasetDetailsTransaction = detailTransaction.objectStore('datasetDetails');
                    // console.log("this.props.match.params.programId---", this.state.programId);
                    var datasetDetailsRequest = datasetDetailsTransaction.get(this.state.programId);
                    // console.log("datasetDetailsRequest----", datasetDetailsRequest);
                    datasetDetailsRequest.onsuccess = function (e) {
                        // console.log("all good >>>>");
                        // console.log("Data update success");
                        var datasetDetailsRequestJson = datasetDetailsRequest.result;
                        datasetDetailsRequestJson.changed = 1;
                        var programQPLDetailsRequest1 = datasetDetailsTransaction.put(datasetDetailsRequestJson);
                        programQPLDetailsRequest1.onsuccess = function (event) {
                            this.setState({
                                loading: false,
                                message: i18n.t("static.mt.dataUpdateSuccess"),
                                color: "green",
                                isChanged: false,
                                isTreeDataChanged: false,
                                isScenarioChanged: false
                            }, () => {
                                for (let i = 0; i < items.length; i++) {
                                    var item = items[i];
                                    if (this.state.hideFUPUNode) {
                                        if (item.payload.nodeType.id == 4 || item.payload.nodeType.id == 5) {
                                            item.isVisible = false;
                                        }
                                    } else if (this.state.hidePUNode && item.payload.nodeType.id == 5) {
                                        item.isVisible = false;
                                    }
                                    // arr.push(item);
                                }
                                // console.log("hide fu pu---", this.state.hideFUPUNode);
                                // console.log("hide pu---", this.state.hidePUNode);
                                this.handleAMonthDissmis3(this.state.singleValue2, 0);
                                this.hideSecondComponent();
                                if (flag) {
                                    this.calculateMOMData(0, 2);
                                }
                            });
                            // console.log("Data update success");
                        }.bind(this)
                        programQPLDetailsRequest1.onerror = function (event) {
                            this.setState({
                                loading: false,
                                message: 'Error occured.',
                                color: "red",
                            });
                            // console.log("Data update success");
                        }.bind(this)

                    }.bind(this);
                    datasetDetailsRequest.onerror = function (event) {
                        this.setState({
                            loading: false,
                            message: 'Error occured.',
                            color: "red",
                        }, () => {
                            this.hideSecondComponent();
                        });
                        // console.log("Data update errr");
                    }.bind(this)


                }.bind(this);
                transaction.onerror = function (event) {
                    this.setState({
                        loading: false,
                        message: 'Error occured.',
                        color: "red",
                    }, () => {
                        this.hideSecondComponent();
                    });
                    // console.log("Data update errr");
                }.bind(this);
            }.bind(this);
        });

    }


    createOrUpdateTree() {
        if (this.state.treeId != null) {
            // console.log("inside if hurrey------------------");
            this.setState({
                showDiv: false
            })
        } else {
            const { treeData } = this.state;
            const { curTreeObj } = this.state;
            var maxTreeId = treeData.length > 0 ? Math.max(...treeData.map(o => o.treeId)) : 0;
            // console.log("tree data----", curTreeObj)
            // curTreeObj.treeId = parseInt(maxTreeId) + 1;
            var nodeDataMap = {};
            var tempArray = [];
            var tempJson = {
                nodeDataId: 1,
                notes: '',
                month: moment(this.state.forecastStartDate).startOf('month').format("YYYY-MM-DD"),
                dataValue: "",
                calculatedDataValue: '',
                displayDataValue: '',
                nodeDataModelingList: [],
                nodeDataOverrideList: [],
                nodeDataMomList: [],
                fuNode: {
                    noOfForecastingUnitsPerPerson: '',
                    usageFrequency: '',
                    forecastingUnit: {
                        label: {
                            label_en: ''
                        },
                        tracerCategory: {

                        },
                        unit: {
                            id: ''
                        }
                    },
                    usageType: {
                        id: ''
                    },
                    usagePeriod: {
                        usagePeriodId: ''
                    },
                    repeatUsagePeriod: {
                        usagePeriodId: ''
                    },
                    noOfPersons: ''
                },
                puNode: {
                    planningUnit: {
                        unit: {

                        }
                    },
                    refillMonths: ''
                }
            };
            tempArray.push(tempJson);
            nodeDataMap[1] = tempArray;
            var treeId = parseInt(maxTreeId) + 1;
            // console.log("region values---", this.state.regionValues);
            // console.log("curTreeObj.regionList---", curTreeObj.regionList);
            var tempTree = {
                treeId: treeId,
                active: curTreeObj.active,
                forecastMethod: curTreeObj.forecastMethod,
                label: curTreeObj.label,
                notes: curTreeObj.notes,
                regionList: curTreeObj.regionList,
                scenarioList: [{
                    id: 1,
                    label: {
                        label_en: i18n.t('static.realm.default')
                    },
                    active: true,
                    notes: ''
                }],
                tree: {
                    flatList: [{
                        id: 1,
                        level: 0,
                        parent: null,
                        sortOrder: "00",
                        payload: {
                            label: {
                                label_en: ''
                            },
                            nodeType: {
                                id: 2
                            },
                            nodeUnit: {
                                id: ''
                            },
                            extrapolation: false,
                            nodeDataMap: nodeDataMap
                        },
                        parentItem: {
                            payload: {
                                nodeUnit: {

                                }
                            }
                        }
                    }]
                }
            }
            treeData.push(tempTree);
            // console.log("create update tree object 1--->>>", tempTree);
            // console.log("create update tree object 2--->>>", treeData);
            this.setState({
                treeId,
                treeData,
                showDiv: false
            }, () => {
                // console.log("---------->>>>>>>>", this.state.regionValues);
                this.getTreeByTreeId(treeId);
                this.updateTreeData();
            })

        }
    }

    filterScalingDataByMonth(date, nodeDataMomListParam) {
        // console.log("date--->>>>>>>", date);
        var json = this.state.modelingEl.getJson(null, false);
        // console.log("modelingElData>>>", json);
        var scalingTotal = 0;
        var nodeDataMomList = nodeDataMomListParam != undefined ? nodeDataMomListParam : this.state.currentScenario.nodeDataMomList;
        for (var i = 0; i < json.length; i++) {
            var calculatedChangeForMonth = 0;
            var map1 = new Map(Object.entries(json[i]));
            var startDate = map1.get("1");
            var stopDate = map1.get("2");
            var modelingTypeId = map1.get("4");
            var dataValue = modelingTypeId == 2 ? map1.get("7") : map1.get("6");
            if (map1.get("5") == -1) {
                dataValue = 0 - dataValue
            }
            // console.log("startDate---", startDate);
            // console.log("stopDate---", stopDate);
            const result = moment(date).isBetween(startDate, stopDate, null, '[]');
            // console.log("result---", result);
            if (result) {
                var nodeValue = 0;
                let scalingDate = date;
                if (modelingTypeId == 3 && moment(startDate).format("YYYY-MM") <= moment(scalingDate).format("YYYY-MM") && moment(stopDate).format("YYYY-MM") >= moment(scalingDate).format("YYYY-MM")) {
                    var nodeDataMomListFilter = [];
                    if (map1.get("12") == 1) {
                        var nodeDataMomListOfTransferNode = (this.state.items.filter(c => map1.get("3") != "" ? (c.payload.nodeDataMap[this.state.selectedScenario])[0].nodeDataId == map1.get("3").split('_')[0] : (c.payload.nodeDataMap[this.state.selectedScenario])[0].nodeDataId == map1.get("3"))[0].payload.nodeDataMap[this.state.selectedScenario])[0].nodeDataMomList;
                        nodeDataMomListFilter = nodeDataMomListOfTransferNode.filter(c => moment(c.month).format("YYYY-MM") == moment(startDate).format("YYYY-MM"))
                    } else {
                        nodeDataMomListFilter = nodeDataMomList.filter(c => moment(c.month).format("YYYY-MM") == moment(startDate).format("YYYY-MM"))
                    }
                    if (nodeDataMomListFilter.length > 0) {
                        nodeValue = nodeDataMomListFilter[0].startValue;
                    }
                }
                if (modelingTypeId == 4 && moment(startDate).format("YYYY-MM") <= moment(scalingDate).format("YYYY-MM") && moment(stopDate).format("YYYY-MM") >= moment(scalingDate).format("YYYY-MM")) {
                    var nodeDataMomListFilter = [];
                    if (map1.get("12") == 1) {
                        var nodeDataMomListOfTransferNode = (this.state.items.filter(c => map1.get("3") != "" ? (c.payload.nodeDataMap[this.state.selectedScenario])[0].nodeDataId == map1.get("3").split('_')[0] : (c.payload.nodeDataMap[this.state.selectedScenario])[0].nodeDataId == map1.get("3"))[0].payload.nodeDataMap[this.state.selectedScenario])[0].nodeDataMomList;
                        nodeDataMomListFilter = nodeDataMomListOfTransferNode.filter(c => moment(c.month).format("YYYY-MM") == moment(scalingDate).format("YYYY-MM"))
                    } else {
                        nodeDataMomListFilter = nodeDataMomList.filter(c => moment(c.month).format("YYYY-MM") == moment(scalingDate).format("YYYY-MM"))
                    }
                    if (nodeDataMomListFilter.length > 0) {
                        nodeValue = nodeDataMomListFilter[0].startValue;
                    }
                }

                if (modelingTypeId == 2 || modelingTypeId == 5) {
                    calculatedChangeForMonth = parseFloat(dataValue).toFixed(4);
                } else if (modelingTypeId == 3 || modelingTypeId == 4) {
                    calculatedChangeForMonth = parseFloat((nodeValue * dataValue) / 100).toFixed(4);
                }
                // console.log("calculatedChangeForMonth---", calculatedChangeForMonth);
            }
            this.state.modelingEl.setValueFromCoords(9, i, calculatedChangeForMonth, true);
            // scalingTotal = parseFloat(scalingTotal) + parseFloat(calculatedChangeForMonth);
        }
        var scalingDifference = nodeDataMomList.filter(c => moment(c.month).format("YYYY-MM") == moment(date).format("YYYY-MM"));
        if (scalingDifference.length > 0) {
            scalingTotal += scalingDifference[0].difference;
        }
        this.setState({ scalingTotal });

    }

    // updateMomDataPerInDataSet() {
    //     var json = this.state.momElPer.getJson(null, false);
    //     // console.log("momData>>>", json);
    //     var overrideListArray = [];
    //     for (var i = 0; i < json.length; i++) {
    //         var map1 = new Map(Object.entries(json[i]));
    //         if (map1.get("3") != '') {
    //             var overrideData = {
    //                 month: map1.get("0"),
    //                 seasonalityPerc: 0,
    //                 manualChange: map1.get("3"),
    //                 nodeDataId: map1.get("7"),
    //                 active: true
    //             }
    //             // console.log("overrideData>>>", overrideData);
    //             overrideListArray.push(overrideData);
    //         }
    //     }
    //     // console.log("overRide data list>>>", overrideListArray);
    //     let { currentItemConfig } = this.state;
    //     let { curTreeObj } = this.state;
    //     let { treeData } = this.state;
    //     let { dataSetObj } = this.state;
    //     var items = this.state.items;
    //     (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].nodeDataOverrideList = overrideListArray;
    //     this.setState({ currentItemConfig }, () => {
    //         // console.log("currentIemConfigInUpdetMom>>>", currentItemConfig);
    //         var findNodeIndex = items.findIndex(n => n.id == currentItemConfig.context.id);
    //         items[findNodeIndex] = currentItemConfig.context;
    //         // console.log("items>>>", items);
    //         curTreeObj.tree.flatList = items;

    //         var findTreeIndex = treeData.findIndex(n => n.treeId == curTreeObj.treeId);
    //         treeData[findTreeIndex] = curTreeObj;

    //         // var databytes = CryptoJS.AES.decrypt(dataSetObj.programData, SECRET_KEY);
    //         // var programData = JSON.parse(databytes.toString(CryptoJS.enc.Utf8));
    //         var programData = dataSetObj.programData;
    //         programData.treeList = treeData;
    //         // console.log("dataSetDecrypt>>>", programData);


    //         programData = (CryptoJS.AES.encrypt(JSON.stringify(programData), SECRET_KEY)).toString();
    //         dataSetObj.programData = programData;

    //         // console.log("encpyDataSet>>>", dataSetObj)
    //         // store update object in indexdb
    //         var db1;
    //         getDatabase();
    //         var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
    //         openRequest.onerror = function (event) {
    //             this.setState({
    //                 message: i18n.t('static.program.errortext'),
    //                 color: '#BA0C2F'
    //             })
    //             this.hideFirstComponent()
    //         }.bind(this);
    //         openRequest.onsuccess = function (e) {
    //             db1 = e.target.result;
    //             var transaction = db1.transaction(['datasetData'], 'readwrite');
    //             var programTransaction = transaction.objectStore('datasetData');
    //             // programs.forEach(program => {
    //             var programRequest = programTransaction.put(dataSetObj);
    //             // console.log("---hurrey---");
    //             // })
    //             transaction.oncomplete = function (event) {
    //                 // console.log("all good >>>>");

    //                 // this.setState({
    //                 //     loading: false,
    //                 //     message: i18n.t('static.mt.dataUpdateSuccess'),
    //                 //     color: "green",
    //                 //     isChanged: false
    //                 // }, () => {
    //                 //     this.hideSecondComponent();
    //                 //     this.buildJExcel();
    //                 // });
    //                 // console.log("Data update success");
    //             }.bind(this);
    //             transaction.onerror = function (event) {
    //                 this.setState({
    //                     loading: false,
    //                     // message: 'Error occured.',
    //                     color: "#BA0C2F",
    //                 }, () => {
    //                     this.hideSecondComponent();
    //                 });
    //                 // console.log("Data update errr");
    //             }.bind(this);
    //         }.bind(this);
    //     });
    //     // nodeDataId,month,manualChangeValue,seconalityPer
    // }
    updateMomDataInDataSet() {
        this.setState({
            momJexcelLoader: true
        }, () => {
            setTimeout(() => {
                var nodeTypeId = this.state.currentItemConfig.context.payload.nodeType.id;
                var json = nodeTypeId == 2 ? this.state.momEl.getJson(null, false) : this.state.momElPer.getJson(null, false);
                // console.log("momData>>>", json);
                var overrideListArray = [];
                for (var i = 0; i < json.length; i++) {
                    var map1 = new Map(Object.entries(json[i]));
                    if (nodeTypeId == 2) {
                        if ((map1.get("4") != '' && map1.get("4") != 0.00) || (map1.get("5") != '' && map1.get("5") != 0.00)) {
                            var overrideData = {
                                month: map1.get("0"),
                                seasonalityPerc: map1.get("4").toString().replaceAll(",", "").split("%")[0],
                                manualChange: (map1.get("5") != '' && map1.get("5") != 0.00) ? map1.get("5").toString().replaceAll(",", "") : map1.get("5"),
                                nodeDataId: map1.get("7"),
                                active: true
                            }
                            // console.log("overrideData>>>", overrideData);
                            overrideListArray.push(overrideData);
                        }
                    } else if (nodeTypeId == 3 || nodeTypeId == 4 || nodeTypeId == 5) {
                        if (map1.get("3") != '' && map1.get("3") != 0.00) {
                            var overrideData = {
                                month: map1.get("0"),
                                seasonalityPerc: 0,
                                manualChange: map1.get("3").toString().replaceAll(",", "").split("%")[0],
                                nodeDataId: map1.get("7"),
                                active: true
                            }
                            // console.log("overrideData>>>", overrideData);
                            overrideListArray.push(overrideData);
                        }
                    }
                }
                // console.log("overRide data list>>>", overrideListArray);
                let { currentItemConfig } = this.state;
                let { curTreeObj } = this.state;
                let { treeData } = this.state;
                let { dataSetObj } = this.state;
                var dataSetObjCopy = JSON.parse(JSON.stringify(dataSetObj));
                var items = this.state.items;
                (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].nodeDataOverrideList = overrideListArray;
                this.setState({ currentItemConfig }, () => {
                    var findNodeIndex = items.findIndex(n => n.id == currentItemConfig.context.id);
                    items[findNodeIndex] = currentItemConfig.context;
                    // console.log("items>>>", items);
                    curTreeObj.tree.flatList = items;

                    var findTreeIndex = treeData.findIndex(n => n.treeId == curTreeObj.treeId);
                    treeData[findTreeIndex] = curTreeObj;

                    // var databytes = CryptoJS.AES.decrypt(dataSetObj.programData, SECRET_KEY);
                    // var programData = JSON.parse(databytes.toString(CryptoJS.enc.Utf8));
                    var programData = dataSetObjCopy.programData;
                    programData.treeList = treeData;
                    // programData = (CryptoJS.AES.encrypt(JSON.stringify(programData), SECRET_KEY)).toString();
                    // dataSetObjCopy.programData = programData;
                    // dataSetObj.programData = programData;
                    // console.log("dataSetDecrypt>>>", programData);
                    // console.log("Before modeling data calculation Test 1")
                    calculateModelingData(dataSetObjCopy, this, '', currentItemConfig.context.id, this.state.selectedScenario, 1, this.state.treeId, false, false, this.state.autoCalculate);
                    // store update object in indexdb
                    //     var db1;
                    //     getDatabase();
                    //     var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
                    //     openRequest.onerror = function (event) {
                    //         this.setState({
                    //             message: i18n.t('static.program.errortext'),
                    //             color: 'red'
                    //         })
                    //         this.hideFirstComponent()
                    //     }.bind(this);
                    //     openRequest.onsuccess = function (e) {
                    //         db1 = e.target.result;
                    //         var transaction = db1.transaction(['datasetData'], 'readwrite');
                    //         var programTransaction = transaction.objectStore('datasetData');
                    //         // programs.forEach(program => {
                    //         var programRequest = programTransaction.put(dataSetObjCopy);
                    //         // console.log("---hurrey---");
                    //         // })
                    //         transaction.oncomplete = function (event) {
                    //             // console.log("all good >>>>");

                    //             this.setState({
                    //                 momJexcelLoader: false
                    //             });
                    //             // console.log("Data update success");
                    //         }.bind(this);
                    //         transaction.onerror = function (event) {
                    //             this.setState({
                    //                 loading: false,
                    //                 message: 'Error occured.',
                    //                 color: "red",
                    //             }, () => {
                    //                 this.hideSecondComponent();
                    //             });
                    //             // console.log("Data update errr");
                    //         }.bind(this);
                    //     }.bind(this);
                });

            }, 0);
        });

    }
    getStartValueForMonth(dateValue) {
        // console.log("***", this.state.parentNodeDataMap);
    }
    openScenarioModal(type) {
        // console.log("type---------", type);
        var scenarioId = this.state.selectedScenario;
        this.setState({
            scenarioActionType: type,
            showDiv1: false

        })
        if (type != 3) {
            if (type == 2) {
                // console.log("edit scenario");
                if (scenarioId != "") {
                    // console.log("my scenarioId---", scenarioId);
                    var scenario = this.state.scenarioList.filter(x => x.id == scenarioId)[0];
                    // console.log("my scenario---", scenario);
                    this.setState({
                        scenario: JSON.parse(JSON.stringify(scenario)),
                        openAddScenarioModal: !this.state.openAddScenarioModal
                    })
                } else {
                    alert("Please select scenario first.")
                }
            } else {
                // console.log("add scenario");
                var scenario = {
                    label: {
                        label_en: ''
                    },
                    notes: ''
                }
                this.setState({
                    scenario,
                    openAddScenarioModal: !this.state.openAddScenarioModal
                })
            }

        } else {
            if (this.state.selectedScenario != "") {
                var scenarioList = this.state.scenarioList;
                var minScenarioId = Math.min(...scenarioList.map(o => o.id));
                // console.log("scenarioList.length------------>", scenarioList.length)
                // console.log("minScenarioId------------>", minScenarioId)
                // console.log("this.state.selectedScenario------------>", this.state.selectedScenario)
                // if (minScenarioId != this.state.selectedScenario) {
                if (scenarioList.length > 1) {
                    confirmAlert({
                        message: "Are you sure you want to delete this scenario.",
                        buttons: [
                            {
                                label: i18n.t('static.program.yes'),
                                onClick: () => {
                                    this.addScenario();
                                }
                            },
                            {
                                label: i18n.t('static.program.no')
                            }
                        ]
                    });
                } else {
                    confirmAlert({
                        message: "You must have at least one scenario.",
                        buttons: [
                            {
                                label: i18n.t('static.report.ok')
                            }
                        ]
                    });
                }
            } else {
                confirmAlert({
                    message: "Please select scenario first.",
                    buttons: [
                        {
                            label: i18n.t('static.report.ok')
                        }
                    ]
                });
            }
        }
    }
    buildMomJexcelPercent() {
        // var parentStartValue = this.state.parentScenario.calculatedDataValue;
        // console.log("parentStartValue---", parentStartValue)
        var momList = this.state.momListPer == undefined ? [] : this.state.momListPer;
        // console.log("momList percent node---", momList)
        var momListParent = this.state.momListPerParent == undefined ? [] : this.state.momListPerParent;
        // console.log("momListParent---", momListParent)
        var dataArray = [];
        let count = 0;
        var fuPerMonth, totalValue, usageFrequency, convertToMonth;
        var lagInMonths = 0;
        if (this.state.currentItemConfig.context.payload.nodeType.id == 4) {
            var noOfForecastingUnitsPerPerson = (this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.noOfForecastingUnitsPerPerson;
            if ((this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.usageType.id == 2 || ((this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.oneTimeUsage != "true" && (this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.oneTimeUsage != true)) {
                usageFrequency = (this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.usageFrequency;
                convertToMonth = (this.state.usagePeriodList.filter(c => c.usagePeriodId == (this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.usagePeriod.usagePeriodId))[0].convertToMonth;
            }
            if ((this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.usageType.id == 2) {
                fuPerMonth = ((noOfForecastingUnitsPerPerson / usageFrequency) * convertToMonth);
            } else {
                var noOfPersons = (this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.noOfPersons;
                if ((this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.oneTimeUsage == "true" || (this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.oneTimeUsage == true) {
                    fuPerMonth = noOfForecastingUnitsPerPerson / noOfPersons;
                } else {
                    fuPerMonth = ((noOfForecastingUnitsPerPerson / noOfPersons) * usageFrequency * convertToMonth);
                }
            }
            lagInMonths = (this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.lagInMonths;
        }
        var monthsPerVisit = 1;
        var patients = 0;
        var grandParentMomList = [];
        var noOfBottlesInOneVisit = 0;
        if (this.state.currentItemConfig.context.payload.nodeType.id == 5) {
            monthsPerVisit = (this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].puNode.refillMonths;
            var parent = (this.state.currentItemConfig.context.parent);
            var parentFiltered = (this.state.items.filter(c => c.id == parent))[0];

            var parentNodeNodeData = (parentFiltered.payload.nodeDataMap[this.state.selectedScenario])[0];
            lagInMonths = parentNodeNodeData.fuNode.lagInMonths;
            if (parentNodeNodeData.fuNode.usageType.id == 2) {
                var daysPerMonth = 365 / 12;

                var grandParent = parentFiltered.parent;
                var grandParentFiltered = (this.state.items.filter(c => c.id == grandParent))[0];
                var patients = 0;
                var grandParentNodeData = (grandParentFiltered.payload.nodeDataMap[this.state.selectedScenario])[0];
                grandParentMomList = grandParentNodeData.nodeDataMomList;
                // console.log("grandParentNodeData$$$%%%", grandParentNodeData)
                if (grandParentNodeData != undefined) {
                    var grandParentPrevMonthMMDValue = grandParentNodeData.nodeDataMomList.filter(c => moment(c.month).format("YYYY-MM") == moment(momList[0].month).subtract(1, 'months').format("YYYY-MM"));
                    if (grandParentPrevMonthMMDValue.length > 0) {
                        patients = grandParentPrevMonthMMDValue[0].calculatedValue;
                    } else {
                        var grandParentCurMonthMMDValue = grandParentNodeData.nodeDataMomList.filter(c => moment(c.month).format("YYYY-MM") == moment(momList[0].month).format("YYYY-MM"));
                        if (grandParentCurMonthMMDValue.length > 0) {
                            patients = grandParentCurMonthMMDValue[0].calculatedValue;
                        } else {
                            patients = 0;
                        }
                    }
                } else {
                    patients = 0;
                }
                // console.log("Patients@@@@@@@@@@@@@%%%%%%%%%%", patients)
                var noOfBottlesInOneVisit = (this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].puNode.puPerVisit;

            }
        }
        // console.log("Lag in months@@@", lagInMonths)
        for (var j = 0; j < momList.length; j++) {
            data = [];
            data[0] = momList[j].month
            data[1] = j == 0 ? parseFloat(momList[j].startValue).toFixed(4) : `=ROUND(IF(OR(K1==true,K1==1),E${parseInt(j)},J${parseInt(j)}),4)`
            data[2] = parseFloat(momList[j].difference).toFixed(4)
            data[3] = parseFloat(momList[j].manualChange).toFixed(2)
            data[4] = `=ROUND(IF(B${parseInt(j) + 1}+C${parseInt(j) + 1}+D${parseInt(j) + 1}<0,0,B${parseInt(j) + 1}+C${parseInt(j) + 1}+D${parseInt(j) + 1}),4)`
            // `=B${parseInt(j) + 1}+C${parseInt(j) + 1}+D${parseInt(j) + 1}`
            var momListParentForMonth = momListParent.filter(c => moment(c.month).format("YYYY-MM") == moment(momList[j].month).format("YYYY-MM"));
            data[5] = momListParentForMonth.length > 0 ? parseFloat(momListParentForMonth[0].calculatedValue).toFixed(2) : 0;
            data[6] = this.state.currentItemConfig.context.payload.nodeType.id != 5 ? `=ROUND((E${parseInt(j) + 1}*${momListParentForMonth.length > 0 ? parseFloat(momListParentForMonth[0].calculatedValue) : 0}/100)*L${parseInt(j) + 1},2)` : `=ROUND((E${parseInt(j) + 1}*${momListParentForMonth.length > 0 ? parseFloat(momListParentForMonth[0].calculatedValue) : 0}/100)/${(this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].puNode.planningUnit.multiplier},4)`;
            // data[6] = this.state.manualChange ? momList[j].calculatedValue : ((momListParent[j].manualChange > 0) ? momListParent[j].endValueWithManualChangeWMC : momListParent[j].calculatedValueWMC *  momList[j].endValueWithManualChangeWMC) / 100
            data[7] = this.state.currentScenario.nodeDataId
            data[8] = this.state.currentItemConfig.context.payload.nodeType.id == 4 || (this.state.currentItemConfig.context.payload.nodeType.id == 5 && parentNodeNodeData.fuNode.usageType.id == 2) ? j >= lagInMonths ? `=IF(P${parseInt(j) + 1 - lagInMonths}<0,0,P${parseInt(j) + 1 - lagInMonths})` : 0 : `=IF(P${parseInt(j) + 1}<0,0,P${parseInt(j) + 1})`;
            data[9] = `=ROUND(IF(B${parseInt(j) + 1}+C${parseInt(j) + 1}<0,0,B${parseInt(j) + 1}+C${parseInt(j) + 1}),4)`
            data[10] = this.state.currentScenario.manualChangesEffectFuture;
            data[11] = this.state.currentItemConfig.context.payload.nodeType.id == 4 ? ((this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.usageType.id == 2 ? Number(fuPerMonth).toFixed(4) : this.state.noFURequired) : 1;
            data[12] = `=FLOOR.MATH(${j}/${monthsPerVisit},1)`;
            if (this.state.currentItemConfig.context.payload.nodeType.id == 5 && parentNodeNodeData.fuNode.usageType.id == 2) {
                var dataValue = 0;
                var calculatedValueFromCurMonth = grandParentMomList.filter(c => moment(c.month).format("YYYY-MM") == moment(momList[j].month).format("YYYY-MM"));
                var calculatedValueFromPrevMonth = grandParentMomList.filter(c => moment(c.month).format("YYYY-MM") == moment(momList[j].month).subtract(1, 'months').format("YYYY-MM"));
                var calculatedValueForCurMonth = 0;
                var calculatedValueForPrevMonth = 0;
                if (calculatedValueFromCurMonth.length > 0) {
                    calculatedValueForCurMonth = calculatedValueFromCurMonth[0].calculatedValue;
                }
                if (calculatedValueFromPrevMonth.length > 0) {
                    calculatedValueForPrevMonth = calculatedValueFromPrevMonth[0].calculatedValue;
                }
                if (Math.floor(j / monthsPerVisit) == 0) {
                    dataValue = (patients / monthsPerVisit) + (j == 0 ? calculatedValueForCurMonth - patients : calculatedValueForCurMonth - calculatedValueForPrevMonth)
                } else {
                    dataValue = dataArray[j - monthsPerVisit][14] + (j == 0 ? calculatedValueForCurMonth - patients : calculatedValueForCurMonth - calculatedValueForPrevMonth)
                }
                data[13] = j == 0 ? calculatedValueForCurMonth - patients : calculatedValueForCurMonth - calculatedValueForPrevMonth;
                data[14] = dataValue;
            } else {
                data[13] = 0;
                data[14] = 0;
            }
            var nodeDataMomListPercForFU = [];
            var fuPercentage = 0;
            if (this.state.currentItemConfig.context.payload.nodeType.id == 5 && parentNodeNodeData.fuNode.usageType.id == 2) {
                if (parentNodeNodeData.nodeDataMomList != undefined) {
                    nodeDataMomListPercForFU = parentNodeNodeData.nodeDataMomList.filter(c => moment(c.month).format("YYYY-MM") == moment(momList[j].month).format("YYYY-MM"));
                    if (nodeDataMomListPercForFU.length > 0) {
                        fuPercentage = nodeDataMomListPercForFU[0].endValue;
                    }
                }
            }
            data[15] = this.state.currentItemConfig.context.payload.nodeType.id == 5 && parentNodeNodeData.fuNode.usageType.id == 2 ? `=(O${parseInt(j) + 1}*${noOfBottlesInOneVisit}*(E${parseInt(j) + 1}/100)*${fuPercentage}/100)` : this.state.currentItemConfig.context.payload.nodeType.id == 5 && parentNodeNodeData.fuNode.usageType.id == 1 ? `=(G${parseInt(j) + 1}/(${this.state.noFURequired / (this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].puNode.planningUnit.multiplier}))*${(this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].puNode.puPerVisit}` : `=G${parseInt(j) + 1}`;
            // `=ROUND(((E${parseInt(j) + 1}*F${parseInt(j) + 1})/100),0)`
            dataArray[count] = data;
            count++;
        }
        if (document.getElementById("momJexcelPer") != null) {
            this.el = jexcel(document.getElementById("momJexcelPer"), '');
        } else {
            this.el = "";
        }
        // this.el.destroy();
        if (document.getElementById("momJexcelPer") != null) {
            jexcel.destroy(document.getElementById("momJexcelPer"), true);
        }
        var data = dataArray;
        // console.log("DataArray>>>", dataArray);

        var options = {
            data: data,
            columnDrag: true,
            colWidths: [100, 120, 60, 80, 150, 100, 110, 100, 100],
            colHeaderClasses: ["Reqasterisk"],
            columns: [
                {
                    title: i18n.t('static.common.month'),
                    type: 'calendar',
                    options: { format: JEXCEL_MONTH_PICKER_FORMAT, type: 'year-month-picker' }, width: 100,
                    readOnly: true
                },
                {
                    title: i18n.t('static.tree.%of') + " " + getLabelText(this.state.currentItemConfig.parentItem.payload.label, this.state.lang) + " " + i18n.t('static.tree.monthStart'),
                    type: 'hidden',
                    mask: '#,##0.00', decimal: '.',
                    readOnly: true

                },
                {
                    title: i18n.t('static.tree.calculatedChange'),
                    type: 'numeric',
                    mask: '#,##0.00', decimal: '.',
                    readOnly: true
                },
                {
                    title: i18n.t('static.tree.manualChange'),
                    type: 'numeric',
                    disabledMaskOnEdition: true,
                    textEditor: true,
                    mask: '#,##0.00%', decimal: '.',
                    readOnly: AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_EDIT_TREE') ? false : true,

                },
                {
                    title: i18n.t('static.tree.%of') + " " + getLabelText(this.state.currentItemConfig.parentItem.payload.label, this.state.lang),
                    type: 'numeric',
                    mask: '#,##0.00', decimal: '.',
                    readOnly: true
                },
                {
                    title: getLabelText(this.state.currentItemConfig.parentItem.payload.label, this.state.lang),
                    type: 'numeric',
                    mask: '#,##0.00', decimal: '.',
                    readOnly: true

                },
                {
                    title: getLabelText(this.state.currentItemConfig.context.payload.label, this.state.lang) + " " + i18n.t('static.consumption.forcast'),
                    type: this.state.currentItemConfig.context.payload.nodeType.id == 4 || this.state.currentItemConfig.context.payload.nodeType.id == 5 ? 'hidden' : 'numeric',
                    mask: '#,##0.00', decimal: '.',
                    readOnly: true
                },
                {
                    title: 'Node data id',
                    type: 'hidden',

                },
                {
                    title: this.state.currentItemConfig.context.payload.nodeType.id == 4 || this.state.currentItemConfig.context.payload.nodeType.id == 5 ? getLabelText(this.state.currentItemConfig.context.payload.label, this.state.lang) + " " + i18n.t('static.consumption.forcast') : '# of PUs',
                    type: this.state.currentItemConfig.context.payload.nodeType.id == 5 || this.state.currentItemConfig.context.payload.nodeType.id == 4 ? 'numeric' : 'hidden',
                    mask: '#,##0.00', decimal: '.',
                    readOnly: true
                },
                {
                    title: 'Perc without manual change',
                    type: 'hidden',

                },
                {
                    title: 'Manual change',
                    type: 'hidden',

                },
                {
                    title: 'FU per month',
                    type: 'hidden',

                },
                {
                    title: 'Cycle',
                    type: 'hidden',

                },
                {
                    title: 'Diff',
                    type: 'hidden',

                },
                {
                    title: 'No of patients',
                    type: 'hidden',

                },
                {
                    title: 'Without Lag',
                    type: 'hidden',

                },

            ],
            // text: {
            //     // showingPage: `${i18n.t('static.jexcel.showing')} {0} ${i18n.t('static.jexcel.to')} {1} ${i18n.t('static.jexcel.of')} {1}`,
            //     showingPage: `${i18n.t('static.jexcel.showing')} {0} ${i18n.t('static.jexcel.of')} {1} ${i18n.t('static.jexcel.pages')}`,
            //     show: '',
            //     entries: '',
            // },
            editable: true,
            onload: this.loadedMomPer,
            pagination: localStorage.getItem("sesRecordCount"),
            search: true,
            columnSorting: true,
            // tableOverflow: true,
            wordWrap: true,
            allowInsertColumn: false,
            allowManualInsertColumn: false,
            allowDeleteRow: false,
            onchange: this.changed2,
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
        if (document.getElementById("momJexcelPer") != null) {
            var momElPer = jexcel(document.getElementById("momJexcelPer"), options);
            this.el = momElPer;
        } else {
            var momElPer = "";
        }
        this.setState({
            momElPer: momElPer
        }
        );
    };

    loadedMomPer = function (instance, cell, x, y, value) {
        jExcelLoadedFunction(instance, 1);
        if (instance.worksheets[0].getJson(null, false).length > 0) {
            var cell = instance.worksheets[0].getCell("D1");
            cell.classList.add('readonly');
        }
    }

    buildMomJexcel() {
        var momList = this.state.momList == undefined ? [] : this.state.momList;
        // console.log("momList--->", momList);
        var dataArray = [];
        let count = 0;
        for (var j = 0; j < momList.length; j++) {
            data = [];
            data[0] = momList[j].month
            data[1] = j == 0 ? parseFloat(momList[j].startValue).toFixed(2) : `=ROUND(IF(OR(I1==true,I1==1),G${parseInt(j)},D${parseInt(j)}),2)`
            data[2] = parseFloat(momList[j].difference).toFixed(2)
            data[3] = `=ROUND(IF(B${parseInt(j) + 1}+C${parseInt(j) + 1}<0,0,(B${parseInt(j) + 1}+C${parseInt(j) + 1})),2)`;
            data[4] = parseFloat(momList[j].seasonalityPerc).toFixed(2)
            data[5] = parseFloat(momList[j].manualChange).toFixed(2)
            data[6] = `=ROUND(D${parseInt(j) + 1}+(D${parseInt(j) + 1}*E${parseInt(j) + 1}/100)+F${parseInt(j) + 1},2)`
            data[7] = this.state.currentScenario.nodeDataId
            data[8] = this.state.currentScenario.manualChangesEffectFuture;
            dataArray[count] = data;
            count++;
        }
        if (document.getElementById("momJexcel") != null) {
            this.el = jexcel(document.getElementById("momJexcel"), '');
        } else {
            this.el = "";
        }
        // this.el.destroy();
        if (document.getElementById("momJexcel") != null) {
            jexcel.destroy(document.getElementById("momJexcel"), true);
        }

        var data = dataArray;
        // console.log("DataArray>>>", dataArray);

        var options = {
            data: data,
            columnDrag: true,
            colWidths: [50, 80, 80, 80, 80, 80, 80, 80, 80],
            colHeaderClasses: ["Reqasterisk"],
            columns: [
                {
                    // 0
                    title: i18n.t('static.common.month'),
                    type: 'calendar',
                    options: { format: JEXCEL_MONTH_PICKER_FORMAT, type: 'year-month-picker' }, width: 100,
                    readOnly: true
                },
                {
                    // 1
                    title: i18n.t('static.tree.monthStartNoSeasonality'),
                    type: 'hidden',
                    // title: 'A',
                    // type: 'text',
                    // visible: false,
                    mask: '#,##0.00', decimal: '.',
                    readOnly: true

                },
                {
                    // 2
                    title: i18n.t('static.tree.calculatedChange+-'),
                    type: 'numeric',
                    mask: '#,##0.00', decimal: '.',
                    readOnly: true
                },
                {
                    // 3
                    title: getLabelText(this.state.currentItemConfig.context.payload.label, this.state.lang) + " " + i18n.t('static.tree.monthlyEndNoSeasonality'),
                    type: this.state.seasonality == true ? 'numeric' : 'hidden',
                    mask: '#,##0.00', decimal: '.',
                    readOnly: true
                },
                {
                    // 4
                    title: i18n.t('static.tree.seasonalityIndex'),
                    type: this.state.seasonality == true ? 'numeric' : 'hidden',
                    // visible: this.state.seasonality == true ? true : false,
                    disabledMaskOnEdition: true,
                    textEditor: true,
                    mask: '#,##0.00%', decimal: '.',
                    readOnly: !this.state.aggregationNode ? true : false
                },
                {
                    // 5
                    title: i18n.t('static.tree.manualChange+-'),
                    type: this.state.seasonality == true ? 'numeric' : 'hidden',
                    // visible: this.state.seasonality == true ? true : false,
                    mask: '#,##0.00', decimal: '.',
                    readOnly: !this.state.aggregationNode ? true : false
                },
                {
                    title: getLabelText(this.state.currentItemConfig.context.payload.label, this.state.lang) + " " + i18n.t('static.consumption.forcast'),
                    type: 'numeric',
                    mask: '#,##0.00', decimal: '.',
                    readOnly: true
                },
                {
                    title: "Node data id",
                    type: 'hidden',
                    // title: 'A',
                    // type: 'text',
                    // visible: false
                },
                {
                    title: "Manual change Effect future month",
                    type: 'hidden',
                    // title: 'A',
                    // type: 'text',
                    // visible: false
                }


            ],
            // text: {
            //     // showingPage: `${i18n.t('static.jexcel.showing')} {0} ${i18n.t('static.jexcel.to')} {1} ${i18n.t('static.jexcel.of')} {1}`,
            //     showingPage: `${i18n.t('static.jexcel.showing')} {0} ${i18n.t('static.jexcel.of')} {1} ${i18n.t('static.jexcel.pages')}`,
            //     show: '',
            //     entries: '',
            // },
            editable: true,
            onload: this.loadedMom,
            pagination: localStorage.getItem("sesRecordCount"),
            search: true,
            columnSorting: true,
            // tableOverflow: true,
            wordWrap: true,
            allowInsertColumn: false,
            allowManualInsertColumn: false,
            allowDeleteRow: false,
            onchange: this.changed1,
            updateTable: function (el, cell, x, y, source, value, id) {
                // var elInstance = el.jexcel;
                // if (y != null) {
                //     // var rowData = elInstance.getRowData(y);
                //     // console.log("this.state.seasonality---", this.state.seasonality);
                //     if (!this.state.aggregationNode) {
                //         cell.classList.add('readonly');
                //         // $(cell).addClass('readonly');
                //     }
                //     else {
                //         cell.classList.remove('readonly');
                //         // $(cell).addClass('readonly');
                //     }
                // }
            }.bind(this),
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
        if (document.getElementById("momJexcel") != null) {
            var momEl = jexcel(document.getElementById("momJexcel"), options);
            this.el = momEl;
        } else {
            var momEl = "";
        }
        this.setState({
            momEl: momEl
        }
        );
    };

    // loadedMom = function (instance, cell, x, y, value) {
    //     jExcelLoadedFunction(instance, 1);
    //     if (instance.jexcel.getJson(null, false).length > 0) {
    //         var cell = instance.jexcel.getCell("E1");
    //         cell.classList.add('readonly');
    //         var cell = instance.jexcel.getCell("F1");
    //         cell.classList.add('readonly');
    //     }
    // }

    showMomData() {
        // console.log("show mom data---", this.state.currentScenario);
        var getMomDataForCurrentNode = this.state.items.filter(x => x.id == this.state.currentItemConfig.context.id).length > 0 ? this.state.items.filter(x => x.id == this.state.currentItemConfig.context.id)[0].payload.nodeDataMap[this.state.selectedScenario][0].nodeDataMomList : [];
        // console.log("getMomDataForCurrentNode>>>", getMomDataForCurrentNode);
        if (this.state.currentItemConfig.context.payload.nodeType.id > 2) {
            // console.log("mom list parent---", this.state.parentScenario);
            var getMomDataForCurrentNodeParent = this.state.items.filter(x => x.id == this.state.currentItemConfig.context.parent).length > 0 ? this.state.items.filter(x => x.id == this.state.currentItemConfig.context.parent)[0].payload.nodeDataMap[this.state.selectedScenario][0].nodeDataMomList : []
            // console.log("in if>>>>", getMomDataForCurrentNodeParent);

            this.setState({ showMomDataPercent: !this.state.showMomDataPercent, showMomData: false, momListPer: getMomDataForCurrentNode, momListPerParent: getMomDataForCurrentNodeParent }, () => {
                if (this.state.showMomDataPercent) {
                    // console.log("inside show mom data percent node");
                    this.setState({ viewMonthlyData: false }, () => {
                        this.buildMomJexcelPercent();
                    })
                } else {
                    this.setState({ viewMonthlyData: true });
                }
            });
        } else {
            // console.log("in else>>>>");
            this.setState({ showMomDataPercent: false, showMomData: !this.state.showMomData, momList: getMomDataForCurrentNode }, () => {
                if (this.state.showMomData) {
                    // console.log("inside show mom data number node---", this.state.momList);
                    this.setState({ viewMonthlyData: false }, () => {
                        this.buildMomJexcel();
                    })
                } else {
                    this.setState({ viewMonthlyData: true });
                }
            });
        }

    }
    setStartAndStopDateOfProgram(programId) {
        this.setState({
            scenarioList: []
        })
        // console.log("programId>>>", this.state.datasetList);
        var proList = [];
        var programDataListForPuCheck = [];
        localStorage.setItem("sesDatasetId", programId);
        if (programId != "") {
            var dataSetObj = JSON.parse(JSON.stringify(this.state.datasetList.filter(c => c.id == programId)[0]));;
            // console.log("dataSetObj>>>", dataSetObj);
            var datasetEnc = dataSetObj;
            var databytes = CryptoJS.AES.decrypt(dataSetObj.programData, SECRET_KEY);
            var programData = JSON.parse(databytes.toString(CryptoJS.enc.Utf8));
            programDataListForPuCheck.push({ "programData": programData, "id": dataSetObj.id });
            // console.log("programData---?????????", programData);
            dataSetObj.programData = programData;
            var treeList = programData.treeList;
            for (var k = 0; k < treeList.length; k++) {
                proList.push(treeList[k])
            }
            if (this.state.treeTemplateObj != null && this.state.treeTemplateObj != "") {
                proList.push(this.state.treeTemplateObj);
                // this.setState
            }
            //Display forecast period
            var forecastPeriod = moment(programData.currentVersion.forecastStartDate).format(`MMM-YYYY`) + " ~ " + moment(programData.currentVersion.forecastStopDate).format(`MMM-YYYY`);
            // console.log("forecastPeriod---", forecastPeriod);
            this.setState({
                forecastPeriod,
                dataSetObj,
                realmCountryId: programData.realmCountry.realmCountryId,
                treeData: proList,
                programDataListForPuCheck: programDataListForPuCheck,
                items: [],
                selectedScenario: '',
                programId,
                // singleValue2: { year: new Date(programData.currentVersion.forecastStartDate.replace(/-/g, '\/')).getFullYear(), month: new Date(Date.UTC(programData.currentVersion.forecastStartDate.replace(/-/g, '\/'))).getMonth() + 1 },
                singleValue2: { year: new Date(programData.currentVersion.forecastStartDate.replace(/-/g, '\/')).getFullYear(), month: new Date(programData.currentVersion.forecastStartDate.replace(/-/g, '\/')).getMonth() + 1 },
                // defYear1: { year: 2021, month: 1 },
                // defYear2: { year: 2021, month: 12 },
                forecastStartDate: programData.currentVersion.forecastStartDate,
                forecastStopDate: programData.currentVersion.forecastStopDate,
                minDate: { year: Number(moment(programData.currentVersion.forecastStartDate).startOf('month').format("YYYY")), month: Number(moment(programData.currentVersion.forecastStartDate).startOf('month').format("M")) },
                maxDate: { year: Number(moment(programData.currentVersion.forecastStopDate).startOf('month').format("YYYY")), month: Number(moment(programData.currentVersion.forecastStopDate).startOf('month').format("M")) },
                showDate: true
            }, () => {
                this.getDatasetList();
                // console.log("program id after update--->", this.state.programId);
                // console.log("program min date--->", this.state.minDate);
                // console.log("program max date--->", this.state.maxDate);
                this.fetchTracerCategoryList(programData);
                if (this.state.treeData.length == 1) {
                    var event = {
                        target: {
                            value: this.state.treeData[0].treeId,
                            name: "treeId"
                        }
                    }
                    this.dataChange(event)
                } else if (this.state.treeId != "" && this.state.treeData.filter(c => c.treeId == this.state.treeId).length > 0) {
                    var event = {
                        target: {
                            value: this.state.treeId,
                            name: "treeId"
                        }
                    }
                    this.dataChange(event)
                } else {
                    this.setState({
                        treeId: "",
                        scenarioId: ""
                    })
                }
                // if (proList.length == 1) {
                //     var treeId = proList[0].treeId;
                //     this.setState({
                //         treeId: treeId
                //     }, () => {
                //         this.getTreeByTreeId(treeId);
                //     })
                // }

                // this.getTreeList();
            });
        } else {
            this.setState({
                dataSetObj: [],
                realmCountryId: '',
                items: [],
                selectedScenario: '',
                programId,
                forecastPeriod: '',
                treeData: proList,
                programDataListForPuCheck: [],
                singleValue2: { year: new Date().getFullYear(), month: new Date().getMonth() + 1 }
            })
        }
        this.getRegionList();
    }
    extrapolate(e) {
        const { currentItemConfig } = this.state;
        var modelingFlag = false;
        var scalingList = this.state.currentScenario.nodeDataModelingList == undefined ? [] : this.state.currentScenario.nodeDataModelingList;
        if (scalingList.length > 0) {
            var scalingResult = scalingList.filter(x => x.transferNodeDataId != null && x.transferNodeDataId != "");
            if (scalingResult.length > 0) {
                modelingFlag = true;
            }
        }
        if (this.state.nodeTransferDataList.length == 0 && !modelingFlag) {
            currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].extrapolation = e.target.checked == true ? true : false;
            if (e.target.checked) {
                // console.log("extrapolate outside", currentItemConfig);
                if (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].calculatedDataValue == "" || currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].calculatedDataValue == null || currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].calculatedDataValue == "0") {
                    currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].calculatedDataValue = "0";
                    currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].dataValue = "0";
                    // console.log("extrapolate inside", currentItemConfig);
                }
            }
            // console.log("this.state.activeTab1---", currentItemConfig);

            this.setState({
                currentItemConfig,
                currentScenario: currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0],
                activeTab1: e.target.checked == true ? new Array(2).fill('3') : new Array(2).fill('2')
            }, () => {
                // console.log("extrapolate current item config---", this.state.currentItemConfig);
                // console.log("extrapolate current scenario---", this.state.currentScenario);
                if (this.state.activeTab1[0] == '3') {
                    if (this.state.modelingEl != "") {
                        // this.state.modelingEl.destroy();
                        jexcel.destroy(document.getElementById('modelingJexcel'), true);

                        if (this.state.momEl != "") {
                            // this.state.momEl.destroy();
                            jexcel.destroy(document.getElementById('momJexcel'), true);

                        }
                        else if (this.state.momElPer != "") {
                            // this.state.momElPer.destroy();
                            jexcel.destroy(document.getElementById('momJexcelPer'), true);

                        }
                    }

                    this.refs.extrapolationChild.getExtrapolationMethodList();
                } else {
                    // console.log("***>>>", this.state.currentItemConfig);
                    if (this.state.currentItemConfig.context.payload.nodeType.id != 1) {
                        var minMonth = this.state.forecastStartDate;
                        var maxMonth = this.state.forecastStopDate;
                        // console.log("minMonth---", minMonth);
                        // console.log("maxMonth---", maxMonth);
                        var modelingTypeList = this.state.modelingTypeList;
                        var arr = [];
                        if (this.state.currentItemConfig.context.payload.nodeType.id == 2) {
                            arr = modelingTypeList.filter(x => x.modelingTypeId != 1 && x.modelingTypeId != 5);
                        } else {
                            arr = modelingTypeList.filter(x => x.modelingTypeId == 5);
                        }
                        // console.log("arr---", arr);
                        var modelingTypeListNew = [];
                        for (var i = 0; i < arr.length; i++) {
                            // console.log("arr[i]---", arr[i]);
                            modelingTypeListNew[i] = { id: arr[i].modelingTypeId, name: getLabelText(arr[i].label, this.state.lang) }
                        }
                        this.setState({
                            showModelingJexcelNumber: true,
                            minMonth, maxMonth, filteredModelingType: modelingTypeListNew
                        }, () => {
                            this.buildModelingJexcel();
                        })

                    }
                    else {
                        this.setState({
                            showModelingJexcelNumber: true
                        }, () => {
                            this.buildModelingJexcel();
                        })
                    }
                    //  else if (this.state.currentItemConfig.context.payload.nodeType.id == 3) {
                    //     this.setState({ showModelingJexcelPercent: true }, () => {
                    //         this.buildModelingJexcelPercent()
                    //     })
                    // }
                }

            });
        }
        else if (modelingFlag) {
            currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].extrapolation = false;
            this.setState({
                currentItemConfig,
                currentScenario: currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0]
            }, () => {
                alert("Extrapolation not allowed on this node because this node is transfering data to some other node.To perform extrapolation please delete the transfer.");
            });
        } else if (this.state.nodeTransferDataList.length > 0) {
            currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].extrapolation = false;
            this.setState({
                currentItemConfig,
                currentScenario: currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0]
            }, () => {
                alert("Extrapolation not allowed on this node because some other node is transfering data to this node.");
            });

        }
    }
    momCheckbox(e, type) {
        var checked = e.target.checked;
        const { currentItemConfig } = this.state;

        if (e.target.name === "manualChange") {
            if (type == 1) {
                this.state.momEl.setValueFromCoords(8, 0, checked, true);
            } else {
                this.state.momElPer.setValueFromCoords(10, 0, checked, true);
            }
            (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].manualChangesEffectFuture = (e.target.checked == true ? true : false)
            var nodes = this.state.items;
            var findNodeIndex = nodes.findIndex(n => n.id == currentItemConfig.context.id);
            nodes[findNodeIndex] = currentItemConfig.context;
            this.setState({
                currentItemConfig,
                items: nodes,
                currentScenario: (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0]
            }, () => {
                //     this.calculateMOMData(0, 1);
                // console.log('manual change---', this.state.manualChange);
            });
        } else if (e.target.name === "seasonality") {
            this.setState({
                seasonality: e.target.checked == true ? true : false
            }, () => {
                if (this.state.momEl != "") {
                    this.buildMomJexcel();

                    //     if (checked) {
                    //         this.state.momEl.showColumn(3);
                    //         this.state.momEl.showColumn(4);
                    //         this.state.momEl.showColumn(5);
                    //     } else {
                    //         this.state.momEl.hideColumn(3);
                    //         this.state.momEl.hideColumn(4);
                    //         this.state.momEl.hideColumn(5);
                    //     }
                }
                // console.log('seasonality---', this.state.seasonality);
            });
        }
    }
    // updateState(parameterName, value) {
    //     this.setState({
    //         [parameterName]: value
    //     })
    // }
    formSubmit() {
        if (this.state.modelingJexcelLoader === true) {
            var validation = this.state.lastRowDeleted == true ? true : this.checkValidation();
            // console.log("validation---", validation);
            this.setState({ modelingTabError: !validation })
            if (this.state.lastRowDeleted == true || validation == true) {
                try {
                    // console.log("entry ---", this.state.isValidError, "===validation---", validation)

                    // console.log("entered if ---", new Date());
                    var tableJson = this.state.modelingEl.getJson(null, false);
                    // console.log("tableJson length---", tableJson.length);
                    var data = this.state.currentScenario.nodeDataModelingList;
                    var maxModelingId = data.length > 0 ? Math.max(...data.map(o => o.nodeDataModelingId)) : 0;
                    // console.log("maxModelingId---", maxModelingId);
                    var obj;
                    var dataArr = [];
                    var items = this.state.items;
                    var item = items.filter(x => x.id == this.state.currentItemConfig.context.id)[0];
                    const itemIndex1 = items.findIndex(o => o.id === this.state.currentItemConfig.context.id);
                    console.log("itemIndex1--->>>", itemIndex1);
                    // if (itemIndex1 != -1) {
                    for (var i = 0; i < tableJson.length; i++) {
                        var map1 = new Map(Object.entries(tableJson[i]));
                        // console.log("10 map---" + map1.get("10"));
                        if (parseInt(map1.get("12")) != 1) {
                            // console.log("10 map true---");

                            var parts1 = map1.get("1").split('-');
                            var startDate = parts1[0] + "-" + parts1[1] + "-01"
                            var parts2 = map1.get("2").split('-');
                            var stopDate = parts2[0] + "-" + parts2[1] + "-01"
                            startDate = moment(map1.get("1")).startOf('month').format("YYYY-MM-DD");
                            stopDate = moment(map1.get("2")).startOf('month').format("YYYY-MM-DD");
                            if (map1.get("10") != "" && map1.get("10") != 0) {
                                // console.log("inside 9 map true---");
                                const itemIndex = data.findIndex(o => o.nodeDataModelingId === map1.get("10"));
                                obj = data.filter(x => x.nodeDataModelingId == map1.get("10"))[0];
                                // console.log("obj--->>>>>", obj);
                                var transfer = map1[3] != "" ? map1.get("3").split('_')[0] : '';
                                // console.log("transfer---", transfer);
                                obj.transferNodeDataId = transfer;
                                obj.notes = map1.get("0");
                                obj.modelingType.id = map1.get("4");
                                obj.startDate = startDate;
                                obj.stopDate = stopDate;
                                obj.increaseDecrease = map1.get("5");
                                obj.dataValue = map1.get("4") == 2 ? map1.get("7").toString().replaceAll(",", "") : map1.get("6").toString().replaceAll(",", "").split("%")[0];
                                obj.nodeDataModelingId = map1.get("10")
                                obj.modelingSource = map1.get("14") == "" ? 0 : map1.get("14")
                                // data[itemIndex] = obj;
                                // dataArr.push(obj);
                            } else {
                                obj = {
                                    transferNodeDataId: map1[3] != "" ? map1.get("3").split('_')[0] : '',
                                    notes: map1.get("0"),
                                    modelingType: {
                                        id: map1.get("4")
                                    },
                                    startDate: startDate,
                                    stopDate: stopDate,
                                    increaseDecrease: map1.get("5"),
                                    dataValue: map1.get("4") == 2 ? map1.get("7").toString().replaceAll(",", "") : map1.get("6").toString().replaceAll(",", "").split("%")[0],
                                    nodeDataModelingId: parseInt(maxModelingId) + 1,
                                    modelingSource: map1.get("14") == "" ? 0 : map1.get("14")
                                }
                                maxModelingId++;
                            }
                            dataArr.push(obj);

                        }
                    }
                    // console.log("dataArr--->>>", dataArr);
                    if (itemIndex1 != -1) {
                        if (this.state.isValidError.toString() == "false") {
                            item.payload = this.state.currentItemConfig.context.payload;
                            (item.payload.nodeDataMap[this.state.selectedScenario])[0].nodeDataModelingList = dataArr;
                            (item.payload.nodeDataMap[this.state.selectedScenario])[0].annualTargetCalculator = {
                                firstMonthOfTarget: moment(moment(this.state.firstMonthOfTarget, "YYYY-MM-DD")).format("YYYY-MM"),
                                yearsOfTarget: this.state.yearsOfTarget,
                                actualOrTargetValueList: this.state.actualOrTargetValueList
                            };
                            // console.log("scalingList===>11", moment(moment(this.state.firstMonthOfTarget, "YYYY-MM-DD")).format("YYYY-MM"));

                            // }
                            if (this.state.lastRowDeleted == true) {
                                (item.payload.nodeDataMap[this.state.selectedScenario])[0].nodeDataModelingList = [];
                            }
                            // console.log("item---", item);

                            items[itemIndex1] = item;
                            // console.log("items---", items);

                            let { curTreeObj } = this.state;
                            let { treeData } = this.state;
                            let { dataSetObj } = this.state;
                            // console.log("save tree data items 1>>>", items);
                            curTreeObj.tree.flatList = items;
                            var findTreeIndex = treeData.findIndex(n => n.treeId == curTreeObj.treeId);
                            treeData[findTreeIndex] = curTreeObj;
                            var programData = dataSetObj.programData;
                            programData.treeList = treeData;
                            // console.log("dataSetDecrypt>>>", programData);
                            dataSetObj.programData = programData;

                            // console.log("encpyDataSet>>>", dataSetObj)
                            this.setState({
                                dataSetObj,
                                items,
                                scalingList: dataArr,
                                lastRowDeleted: false,
                                modelingChanged: false,
                                // openAddNodeModal: false,
                                activeTab1: new Array(2).fill('2'),
                                firstMonthOfTarget: "",
                                yearsOfTarget: "",
                                actualOrTargetValueList: []
                            }, () => {
                                // console.log("save tree data items 2>>>", this.state.items);
                                this.calculateMOMData(0, 0);
                            });
                        } else {
                            // console.log("inside else form submit");
                            this.setState({
                                modelingJexcelLoader: false
                            }, () => {
                                alert("Please fill all the required fields in Node Data Tab");
                            });

                        }
                    } else {
                        console.log("this.state.isValidError---", this.state.isValidError)
                        if ((this.state.isValidError.toString() == "false" || document.getElementById('isValidError').value.toString() == 'false') && !this.state.addNodeError) {
                            // console.log("inside if form submit");
                            this.onAddButtonClick(this.state.currentItemConfig, true, dataArr);
                        } else {
                            // console.log("inside else form submit");
                            this.setState({
                                modelingJexcelLoader: false
                            }, () => {
                                alert("Please fill all the required fields in Node Data Tab");
                            });

                        }
                    }
                    // } 
                    // else {
                    // this.setState({
                    //     modelingJexcelLoader: false
                    // }, () => {

                    // this.onAddButtonClick(this.state.currentItemConfig);
                    // setTimeout(() => {
                    // alert("You are creating a new node.Please submit the node data first and then apply modeling/transfer.");
                    // confirmAlert({
                    //     message: "You are creating a new node.Please submit the node data first and then apply modeling/transfer.",
                    //     buttons: [
                    //         {
                    //             label: i18n.t('static.report.ok')
                    //         }
                    //     ]
                    // });
                    // }, 0);
                    // });
                    // }
                } catch (err) {
                    // console.log("scaling err---", err);
                    localStorage.setItem("scalingErrorTree", err);
                }
            } else {
                this.setState({ modelingJexcelLoader: false })
            }
        }
        // })

    }
    checkValidation() {
        var valid = true;
        var json = this.state.modelingEl.getJson(null, false);
        for (var y = 0; y < json.length; y++) {
            var value = this.state.modelingEl.getValueFromCoords(11, y);
            if (parseInt(value) == 1) {

                //Transfer to node
                var col = ("D").concat(parseInt(y) + 1);
                var value = this.state.modelingEl.getValueFromCoords(3, y);
                var transferFlag = false;
                if (value != "") {
                    var items = this.state.items;
                    var transfer = value != "" ? value.split('_')[0] : '';
                    if (transfer != '') {
                        for (let i = 0; i < items.length; i++) {
                            var nodeDataId = items[i].payload.nodeDataMap[this.state.selectedScenario][0].nodeDataId;
                            // console.log("nodeDataId---", nodeDataId);
                            // console.log("extrapolation flag---", items[i].payload.nodeDataMap[this.state.selectedScenario]);
                            if (nodeDataId == transfer && items[i].payload.nodeDataMap[this.state.selectedScenario][0].extrapolation) {
                                transferFlag = true;
                                break;
                            }
                        }
                    }
                    // console.log("transferFlag---", transferFlag);
                    if (transferFlag) {
                        this.state.modelingEl.setStyle(col, "background-color", "transparent");
                        this.state.modelingEl.setStyle(col, "background-color", "yellow");
                        this.state.modelingEl.setComments(col, 'You can not transfer data to this node as it is an extrapolation node.');
                        valid = false;
                    } else {
                        this.state.modelingEl.setStyle(col, "background-color", "transparent");
                        this.state.modelingEl.setComments(col, "");
                    }
                } else {
                    this.state.modelingEl.setStyle(col, "background-color", "transparent");
                    this.state.modelingEl.setComments(col, "");
                }


                //Modeling type
                var col = ("E").concat(parseInt(y) + 1);
                var value = this.state.modelingEl.getValueFromCoords(4, y);
                if (value == "") {
                    this.state.modelingEl.setStyle(col, "background-color", "transparent");
                    this.state.modelingEl.setStyle(col, "background-color", "yellow");
                    this.state.modelingEl.setComments(col, i18n.t('static.label.fieldRequired'));
                    valid = false;
                } else {
                    this.state.modelingEl.setStyle(col, "background-color", "transparent");
                    this.state.modelingEl.setComments(col, "");
                }

                //+/-
                var col = ("F").concat(parseInt(y) + 1);
                var value = this.state.modelingEl.getValueFromCoords(5, y);
                if (value == "") {
                    this.state.modelingEl.setStyle(col, "background-color", "transparent");
                    this.state.modelingEl.setStyle(col, "background-color", "yellow");
                    this.state.modelingEl.setComments(col, i18n.t('static.label.fieldRequired'));
                    valid = false;
                } else {
                    this.state.modelingEl.setStyle(col, "background-color", "transparent");
                    this.state.modelingEl.setComments(col, "");
                }

                // Start date
                var col = ("B").concat(parseInt(y) + 1);
                var value = this.state.modelingEl.getValueFromCoords(1, y);
                if (value == "") {
                    this.state.modelingEl.setStyle(col, "background-color", "transparent");
                    this.state.modelingEl.setStyle(col, "background-color", "yellow");
                    this.state.modelingEl.setComments(col, i18n.t('static.label.fieldRequired'));
                    valid = false;
                } else {
                    this.state.modelingEl.setStyle(col, "background-color", "transparent");
                    this.state.modelingEl.setComments(col, "");
                }
                var startDate = this.state.modelingEl.getValue(`B${parseInt(y) + 1}`, true).toString().replaceAll(",", "");
                var stopDate = this.state.modelingEl.getValue(`C${parseInt(y) + 1}`, true).toString().replaceAll(",", "");

                // Stop date
                var col = ("C").concat(parseInt(y) + 1);
                var value = this.state.modelingEl.getValueFromCoords(2, y);
                var diff = moment(stopDate).diff(moment(startDate), 'months');
                if (value == "") {
                    this.state.modelingEl.setStyle(col, "background-color", "transparent");
                    this.state.modelingEl.setStyle(col, "background-color", "yellow");
                    this.state.modelingEl.setComments(col, i18n.t('static.label.fieldRequired'));
                    valid = false;
                }
                else if (diff <= 0) {
                    this.state.modelingEl.setStyle(col, "background-color", "transparent");
                    this.state.modelingEl.setStyle(col, "background-color", "yellow");
                    this.state.modelingEl.setComments(col, i18n.t('static.validation.pleaseEnterValidDate'));
                    valid = false;
                }
                else {
                    this.state.modelingEl.setStyle(col, "background-color", "transparent");
                    this.state.modelingEl.setComments(col, "");
                }

                var elInstance = this.state.modelingEl;
                // console.log("check validation elInstance---", elInstance)
                var rowData = elInstance.getRowData(y);
                // console.log("modelingTypeId-valid--", rowData[4])
                if (rowData[4] != "") {
                    var reg = JEXCEL_DECIMAL_NO_REGEX_LONG;

                    // Month change %
                    if (rowData[4] != 2) {
                        var col = ("G").concat(parseInt(y) + 1);
                        var value = this.state.modelingEl.getValueFromCoords(6, y);
                        if (value === "") {
                            this.state.modelingEl.setStyle(col, "background-color", "transparent");
                            this.state.modelingEl.setStyle(col, "background-color", "yellow");
                            this.state.modelingEl.setComments(col, i18n.t('static.label.fieldRequired'));
                            valid = false;
                        }
                        // else if (!(reg.test(value))) {
                        //     this.state.modelingEl.setStyle(col, "background-color", "transparent");
                        //     this.state.modelingEl.setStyle(col, "background-color", "yellow");
                        //     this.state.modelingEl.setComments(col, i18n.t('static.message.invalidnumber'));
                        //     valid = false;
                        // }
                        else {
                            this.state.modelingEl.setStyle(col, "background-color", "transparent");
                            this.state.modelingEl.setComments(col, "");
                        }
                    }

                    // Month change #
                    if (rowData[4] == 2) {
                        var col = ("H").concat(parseInt(y) + 1);
                        var value = this.state.modelingEl.getValueFromCoords(7, y);
                        if (value === "") {
                            this.state.modelingEl.setStyle(col, "background-color", "transparent");
                            this.state.modelingEl.setStyle(col, "background-color", "yellow");
                            this.state.modelingEl.setComments(col, i18n.t('static.label.fieldRequired'));
                            valid = false;
                        }
                        // else if (!(reg.test(value))) {
                        //     this.state.modelingEl.setStyle(col, "background-color", "transparent");
                        //     this.state.modelingEl.setStyle(col, "background-color", "yellow");
                        //     this.state.modelingEl.setComments(col, i18n.t('static.message.invalidnumber'));
                        //     valid = false;
                        // }
                        else {
                            this.state.modelingEl.setStyle(col, "background-color", "transparent");
                            this.state.modelingEl.setComments(col, "");
                        }
                    }

                }

            }
        }
        return valid;
    }
    calculateScalingTotal() {
        var scalingTotal = 0;
        var tableJson = this.state.modelingEl.getJson(null, false);
        for (var i = 0; i < tableJson.length; i++) {
            var map1 = new Map(Object.entries(tableJson[i]));
            if (map1.get("8") != "") {
                scalingTotal = scalingTotal + parseFloat(map1.get("8"));
                // console.log("map1.get(8)---", map1.get("8"));
            }
        }
        // console.log("scalingTotal---", scalingTotal);
        this.setState({
            scalingTotal
        }, () => {
            // this.filterScalingDataByMonth(this.state.scalingMonth);
        });
    }

    acceptValue1() {
        // console.log(">>>>", this.state.currentRowIndex);
        var elInstance = this.state.modelingEl;
        if (this.state.currentItemConfig.context.payload.nodeType.id > 2) {
            // Linear % point
            if (this.state.currentModelingType == 5) {

                elInstance.setValueFromCoords(4, this.state.currentRowIndex, 5, true);
                if (this.state.currentTransferData == "") {
                    elInstance.setValueFromCoords(5, this.state.currentRowIndex, parseFloat(this.state.currentCalculatedMomChange) < 0 ? -1 : 1, true);
                }
                elInstance.setValueFromCoords(1, this.state.currentRowIndex, this.state.currentCalculatorStartDate, true);
                elInstance.setValueFromCoords(2, this.state.currentRowIndex, this.state.currentCalculatorStopDate, true);
                elInstance.setValueFromCoords(6, this.state.currentRowIndex, isNaN(parseFloat(this.state.currentCalculatedMomChange)) ? "" : parseFloat(this.state.currentCalculatedMomChange) < 0 ? parseFloat(this.state.currentCalculatedMomChange * -1).toFixed(4) : parseFloat(this.state.currentCalculatedMomChange), true);
                elInstance.setValueFromCoords(7, this.state.currentRowIndex, '', true);
                elInstance.setValueFromCoords(9, this.state.currentRowIndex, isNaN(parseFloat(this.state.currentCalculatedMomChange).toFixed(4)) ? "" : parseFloat(this.state.currentCalculatedMomChange).toFixed(4), true);
                elInstance.setValueFromCoords(14, this.state.currentRowIndex, 0, true);
            }
        } else {
            // Linear #
            if (this.state.currentModelingType == 2) {
                elInstance.setValueFromCoords(4, this.state.currentRowIndex, this.state.currentModelingType, true);
                if (this.state.currentTransferData == "") {
                    elInstance.setValueFromCoords(5, this.state.currentRowIndex, parseFloat(this.state.currentTargetChangeNumber) < 0 ? -1 : 1, true);
                }
                var startDate = this.state.currentCalculatorStartDate;
                var endDate = this.state.currentCalculatorStopDate;
                var monthDifference = parseInt(moment(endDate).startOf('month').diff(startDate, 'months', true) + 1);
                elInstance.setValueFromCoords(1, this.state.currentRowIndex, this.state.currentCalculatorStartDate, true);
                elInstance.setValueFromCoords(2, this.state.currentRowIndex, this.state.currentCalculatorStopDate, true);
                elInstance.setValueFromCoords(6, this.state.currentRowIndex, '', true);
                elInstance.setValueFromCoords(7, this.state.currentRowIndex, isNaN(parseFloat((this.state.currentTargetChangeNumber).toString().replaceAll(",", ""))) ? "" : parseFloat((this.state.currentTargetChangeNumber).toString().replaceAll(",", "")) < 0 ? parseFloat(parseFloat((this.state.currentTargetChangeNumber).toString().replaceAll(",", "") / monthDifference).toFixed(4) * -1) : parseFloat(parseFloat((this.state.currentTargetChangeNumber).toString().replaceAll(",", "") / monthDifference).toFixed(4)), true);
                elInstance.setValueFromCoords(9, this.state.currentRowIndex, isNaN(parseFloat(this.state.currentCalculatedMomChange).toFixed(4)) ? "" : parseFloat(this.state.currentCalculatedMomChange).toFixed(4), true);
                elInstance.setValueFromCoords(14, this.state.currentRowIndex, 0, true);
            } else if (this.state.currentModelingType == 3) { //Linear %
                elInstance.setValueFromCoords(4, this.state.currentRowIndex, this.state.currentModelingType, true);
                if (this.state.currentTransferData == "") {
                    elInstance.setValueFromCoords(5, this.state.currentRowIndex, parseFloat(this.state.percentForOneMonth) < 0 ? -1 : 1, true);
                }
                elInstance.setValueFromCoords(1, this.state.currentRowIndex, this.state.currentCalculatorStartDate, true);
                elInstance.setValueFromCoords(2, this.state.currentRowIndex, this.state.currentCalculatorStopDate, true);
                elInstance.setValueFromCoords(6, this.state.currentRowIndex, !isFinite(this.state.percentForOneMonth) ? "" : parseFloat(this.state.percentForOneMonth) < 0 ? parseFloat(this.state.percentForOneMonth * -1).toFixed(4) : parseFloat(this.state.percentForOneMonth).toFixed(4), true);
                elInstance.setValueFromCoords(7, this.state.currentRowIndex, '', true);
                elInstance.setValueFromCoords(9, this.state.currentRowIndex, isNaN(parseFloat(this.state.currentCalculatedMomChange).toFixed(4)) ? "" : parseFloat(this.state.currentCalculatedMomChange).toFixed(4), true);
                elInstance.setValueFromCoords(14, this.state.currentRowIndex, 0, true);
            } else if (this.state.currentModelingType == 4) { // Exponential %
                elInstance.setValueFromCoords(4, this.state.currentRowIndex, this.state.currentModelingType, true);
                if (this.state.currentTransferData == "") {
                    elInstance.setValueFromCoords(5, this.state.currentRowIndex, parseFloat(this.state.percentForOneMonth) < 0 ? -1 : 1, true);
                }
                elInstance.setValueFromCoords(1, this.state.currentRowIndex, this.state.currentCalculatorStartDate, true);
                elInstance.setValueFromCoords(2, this.state.currentRowIndex, this.state.currentCalculatorStopDate, true);
                elInstance.setValueFromCoords(6, this.state.currentRowIndex, !isFinite(this.state.percentForOneMonth) ? "" : parseFloat(this.state.percentForOneMonth) < 0 ? parseFloat(this.state.percentForOneMonth * -1).toFixed(4) : parseFloat(this.state.percentForOneMonth).toFixed(4), true);
                elInstance.setValueFromCoords(7, this.state.currentRowIndex, '', true);
                elInstance.setValueFromCoords(9, this.state.currentRowIndex, isNaN(parseFloat(this.state.currentCalculatedMomChange).toFixed(4)) ? "" : parseFloat(this.state.currentCalculatedMomChange).toFixed(4), true);
                elInstance.setValueFromCoords(14, this.state.currentRowIndex, 0, true);
            }
        }
        this.setState({ showCalculatorFields: false });

    }

    acceptValue() {
        // var json = this.state.modelingEl.getJson(null, false);
        // var map1 = new Map(Object.entries(json[0]));
        if (!this.state.targetSelectDisable) {
            this.callJexcelBuildFuntion();
        } else {
            var cf = window.confirm(i18n.t("static.modelingCalculator.confirmAlert"));
            if (cf == true) {
                this.callJexcelBuildFuntion();
            } else {
                this.setState({
                    firstMonthOfTarget: "",
                    yearsOfTarget: "",
                    actualOrTargetValueList: []
                })
            }
        }
    }

    callJexcelBuildFuntion() {

        let { currentItemConfig } = this.state;
        var json = this.state.modelingCalculatorEl.getJson(null, false);
        var map1 = new Map(Object.entries(json[0]));
        (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].dataValue = map1.get("9").toString().replaceAll(",", "");
        (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].calculatedDataValue = map1.get("9").toString().replaceAll(",", "");
        var count = this.state.modelingEl.getData().length;
        for (var i = 0; i < count; i++) {
            this.state.modelingEl.deleteRow(i);
        }
        var dataArr = []
        const reversedList = [...json].reverse();
        for (var i = 0; i < reversedList.length - 1; i++) {
            var map = new Map(Object.entries(reversedList[i]));
            var map1 = new Map(Object.entries(reversedList[i + 1]));
            var data = []
            var stopDate = moment("01 " + map.get("8"), "DD MMM YYYY").format("YYYY-MM-DD");
            var data2 = (i == 0) ? moment(stopDate, "YYYY-MM-DD").subtract(6, "months").format("YYYY-MM-DD") : stopDate;
            data[0] = "Monthly change for " + map.get("7") + " - " + moment(data2).format("MMM YYYY") + ";\nConsiders: " + map.get("0") + " Entered Target = " + addCommas(map.get("1")) + "\nCalculated Target = " + addCommas(map.get("4"));
            data[1] = moment("01 " + map.get("7"), "DD MMM YYYY").format("YYYY-MM-DD");
            data[2] = data2;
            data[3] = '';
            data[4] = this.state.currentModelingType;
            data[5] = parseFloat(map.get("3")).toFixed(4) < 0 ? -1 : 1;
            data[6] = this.state.currentModelingType != 2 ? Math.abs(parseFloat(map.get("3")).toFixed(4)) : "";
            data[7] = this.state.currentModelingType == 2 ? Math.abs(parseFloat(map.get("3") * map1.get("9") / 100).toFixed(4)) : "";
            data[8] = cleanUp
            data[9] = '';
            data[10] = ''
            data[11] = ''
            data[12] = 0
            data[13] = {
                firstMonthOfTarget: moment(this.state.firstMonthOfTarget, "YYYY-MM-DD").format("YYYY-MM"),
                yearsOfTarget: this.state.yearsOfTarget,
                actualOrTargetValueList: this.state.actualOrTargetValueList
            }
            data[14] = this.state.targetSelect;// 0 for Manual or Old calculator method; 1 for Annual Target Calculator
            dataArr.push(map.get("1"))
            console.log("data====>", this.state.targetSelect)
            this.state.modelingEl.insertRow(
                data, 0, 1
            );
        }

        this.setState({
            currentItemConfig,
            currentScenario: (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0],
            isChanged: true,
            showCalculatorFields: false
        }, () => {
            // to save data in tab 1
            var json = {
                "year": map1.get("8").split(" ")[1],
                "month": moment(map1.get("8").split(" ")[0], "MMM").format("M")
            }
            document.getElementById("nodeValue").value = map1.get("9");
            this.handleAMonthDissmis1(json)
            this.handleAMonthChange1(map1.get("8").split(" ")[1], moment(map1.get("8").split(" ")[0], "MMM").format("M"))
        }
        );
    }
    calculateMomByEndValue(e) {
        this.setState({
            // currentEndValue: '',
            currentCalculatedMomChange: '',
            currentTargetChangeNumber: '',
            currentTargetChangePercentage: '',
            percentForOneMonth: ''
        });
        var startDate = this.state.currentCalculatorStartDate;
        var endDate = this.state.currentCalculatorStopDate;
        var monthDifference = parseInt(moment(endDate).startOf('month').diff(startDate, 'months', true) + 1);
        // console.log("month diff>>>", monthDifference);
        var momValue = '', percentForOneMonth = '';
        var currentEndValue = document.getElementById("currentEndValue").value;
        // console.log("currentEndValue---", currentEndValue);
        var getValue = currentEndValue.toString().replaceAll(",", "");
        // console.log("getValue---", getValue);
        if (this.state.currentModelingType == 2) {
            var momValue = ((parseFloat(getValue - this.state.currentCalculatorStartValue.toString().replaceAll(",", ""))) / monthDifference).toFixed(4);
        }
        if (this.state.currentModelingType == 3) {
            var momValue = ((parseFloat(getValue - this.state.currentCalculatorStartValue.toString().replaceAll(",", ""))) / monthDifference).toFixed(4);
        }
        if (this.state.currentModelingType == 4) {
            // var momValue = ((Math.pow(parseFloat(getValue / this.state.currentCalculatorStartValue), parseFloat(1 / monthDifference)) - 1) * 100).toFixed(4);
            var momValue = ((parseFloat(getValue - this.state.currentCalculatorStartValue.toString().replaceAll(",", ""))) / monthDifference).toFixed(4);
        }

        if (this.state.currentModelingType == 5) {
            var momValue = (parseFloat((getValue - this.state.currentCalculatorStartValue.toString().replaceAll(",", "")) / monthDifference)).toFixed(4);
        }
        // console.log("getmomValue>>>", momValue);
        var targetChangeNumber = '';
        var targetChangePer = '';
        var targetChangeNumberForPer = '';
        var targetChangePerForPer = '';
        var targetChangePerForExpoPer = '';
        if (this.state.currentItemConfig.context.payload.nodeType.id < 3) {
            targetChangeNumber = (parseFloat(getValue - this.state.currentCalculatorStartValue.toString().replaceAll(",", ""))).toFixed(4);
            targetChangePer = (parseFloat(targetChangeNumber / this.state.currentCalculatorStartValue.toString().replaceAll(",", "")) * 100).toFixed(4);
            targetChangeNumberForPer = (parseFloat(getValue - this.state.currentCalculatorStartValue.toString().replaceAll(",", "")) / monthDifference).toFixed(4);
            targetChangePerForPer = (parseFloat(targetChangeNumberForPer / this.state.currentCalculatorStartValue.toString().replaceAll(",", "")) * 100).toFixed(4);
            targetChangePerForExpoPer = ((Math.pow(parseFloat(getValue / this.state.currentCalculatorStartValue), parseFloat(1 / monthDifference)) - 1) * 100).toFixed(4)
            percentForOneMonth = this.state.currentModelingType == 4 ? targetChangePerForExpoPer : targetChangePerForPer;
        }
        this.setState({
            currentTargetChangeNumber: currentEndValue != '' ? targetChangeNumber : '',
            currentTargetChangePercentage: currentEndValue != '' ? targetChangePer : '',
            currentCalculatedMomChange: currentEndValue != '' ? momValue : '',
            percentForOneMonth
        });
    }
    calculateMomByChangeInPercent(e) {
        this.setState({
            currentEndValue: '',
            currentCalculatedMomChange: '',
            currentTargetChangeNumber: '',
            percentForOneMonth: ''
        });
        var startDate = this.state.currentCalculatorStartDate;
        var endDate = this.state.currentCalculatorStopDate;
        var monthDifference = parseInt(moment(endDate).diff(startDate, 'months', true) + 1);
        var currentTargetChangePercentage = document.getElementById("currentTargetChangePercentage").value;
        currentTargetChangePercentage = currentTargetChangePercentage != "" ? parseFloat(currentTargetChangePercentage) : ''
        // console.log("currentTargetChangePercentage---", parseFloat(currentTargetChangePercentage));
        var getValue = currentTargetChangePercentage != "" ? currentTargetChangePercentage.toString().replaceAll(",", "").match(/^-?\d+(?:\.\d{0,4})?/)[0] : "";
        // console.log("getValue---", getValue);
        var getEndValueFromPercentage = (this.state.currentCalculatorStartValue.toString().replaceAll(",", "") * getValue) / 100;

        // console.log("***-----------------1-", this.state.currentCalculatorStartValue.toString().replaceAll(",", ""));
        // console.log("***-----------------2-", getEndValueFromPercentage);
        var targetEndValue = (parseFloat(this.state.currentCalculatorStartValue.toString().replaceAll(",", "")) + parseFloat(getEndValueFromPercentage)).toFixed(4);

        var momValue = '', percentForOneMonth = '';
        if (this.state.currentModelingType == 2) {
            // var momValue = ((parseFloat(targetEndValue - this.state.currentCalculatorStartValue)) / monthDifference).toFixed(4);
            var momValue = ((parseFloat((this.state.currentCalculatorStartValue.toString().replaceAll(",", "") * getValue) / 100) / monthDifference)).toFixed(4);
            // percentForOneMonth = getValue / monthDifference;
        }
        if (this.state.currentModelingType == 3) {
            var momValue = ((parseFloat(((this.state.currentCalculatorStartValue.toString().replaceAll(",", "") * getValue) / 100) / monthDifference))).toFixed(4);
            percentForOneMonth = getValue / monthDifference;

        }
        if (this.state.currentModelingType == 4) {
            // var momValue = ((Math.pow(parseFloat(targetEndValue / this.state.currentCalculatorStartValue), parseFloat(1 / monthDifference)) - 1) * 100).toFixed(4);
            var momValue = (parseFloat(((this.state.currentCalculatorStartValue.toString().replaceAll(",", "") * getValue) / 100) / monthDifference)).toFixed(4);
            percentForOneMonth = getValue / monthDifference;

        }
        // console.log("percentForOneMonth---",percentForOneMonth);
        if (this.state.currentModelingType == 5) {
            var momValue = (parseFloat(getValue / monthDifference)).toFixed(4);
        }

        var targetChangeNumber = '';
        if (this.state.currentItemConfig.context.payload.nodeType.id < 3) {
            if (this.state.currentModelingType != 2) {
                targetChangeNumber = parseFloat(getEndValueFromPercentage / monthDifference).toFixed(4);
            } else {
                targetChangeNumber = parseFloat(targetEndValue - this.state.currentCalculatorStartValue.toString().replaceAll(",", "")).toFixed(4);
            }
        }

        this.setState({
            currentEndValue: (getValue != '' && this.state.currentModelingType != 3 && this.state.currentModelingType != 5) ? targetEndValue : '',
            currentCalculatedMomChange: getValue != '' ? momValue : '',
            currentTargetChangeNumber: getValue != '' ? targetChangeNumber : '',
            percentForOneMonth
        });
    }
    calculateMomByChangeInNumber(e) {
        this.setState({
            currentEndValue: '',
            currentCalculatedMomChange: '',
            currentTargetChangePercentage: '',
        });
        var monthDifference = parseInt(this.state.yearsOfTarget * 12);
        var currentTargetChangeNumber = document.getElementById("currentTargetChangeNumber").value;
        var getValue = currentTargetChangeNumber.toString().replaceAll(",", "");
        // var getEndValueFromNumber = parseFloat(this.state.currentCalculatorStartValue) + parseFloat(e.target.value);
        var targetEndValue = parseFloat(this.state.currentCalculatorStartValue.toString().replaceAll(",", "")) + parseFloat(getValue);

        var momValue = ''
        if (this.state.currentModelingType == 2) {
            // momValue = ((parseFloat(targetEndValue - this.state.currentCalculatorStartValue)) / monthDifference).toFixed(4);
            momValue = parseFloat(getValue / monthDifference).toFixed(4);
        }
        if (this.state.currentModelingType == 3) {
            // momValue = ((parseFloat(targetEndValue - this.state.currentCalculatorStartValue)) / monthDifference / this.state.currentCalculatorStartValue * 100).toFixed(4);
            momValue = parseFloat(getValue / monthDifference).toFixed(4);
        }
        if (this.state.currentModelingType == 4) {
            // momValue = ((Math.pow(parseFloat(targetEndValue / this.state.currentCalculatorStartValue), parseFloat(1 / monthDifference)) - 1) * 100).toFixed(4);
            momValue = parseFloat(getValue / monthDifference).toFixed(4);
        }
        var targetChangePer = '';
        if (this.state.currentItemConfig.context.payload.nodeType.id < 3) {
            targetChangePer = (parseFloat((targetEndValue - this.state.currentCalculatorStartValue.toString().replaceAll(",", "")) / this.state.currentCalculatorStartValue.toString().replaceAll(",", "")) * 100).toFixed(4);
        }
        this.setState({
            currentEndValue: getValue != '' ? targetEndValue.toFixed(4) : '',
            currentCalculatedMomChange: getValue != '' ? momValue : '',
            currentTargetChangePercentage: getValue != '' ? targetChangePer : ''
        });
    }


    getSameLevelNodeList(level, id, nodeTypeId, parent) {
        var sameLevelNodeList = [];
        var sameLevelNodeList1 = [];
        var arr = [];
        // console.log("same level---", level);
        // console.log("same id---", id);
        // console.log("same nodeTypeId---", nodeTypeId);
        // console.log("same parent---", parent);
        if (nodeTypeId == NUMBER_NODE_ID) {
            arr = this.state.items.filter(x => x.level == level && x.id != id && x.payload.nodeType.id == nodeTypeId);
        } else {
            arr = this.state.items.filter(x => x.level == level && x.id != id && (x.payload.nodeType.id == PERCENTAGE_NODE_ID || x.payload.nodeType.id == FU_NODE_ID || x.payload.nodeType.id == PU_NODE_ID) && x.parent == parent);
        }
        // console.log("arr---", arr);
        // var count = 0;
        for (var i = 0; i < arr.length; i++) {
            sameLevelNodeList.push({ id: arr[i].payload.nodeDataMap[this.state.selectedScenario][0].nodeDataId + "_T", name: "To " + getLabelText(arr[i].payload.label, this.state.lang) });
            sameLevelNodeList.push({ id: arr[i].payload.nodeDataMap[this.state.selectedScenario][0].nodeDataId + "_F", name: "From " + getLabelText(arr[i].payload.label, this.state.lang) });
            sameLevelNodeList1[i] = { id: arr[i].payload.nodeDataMap[this.state.selectedScenario][0].nodeDataId + "_T", name: "To " + getLabelText(arr[i].payload.label, this.state.lang) };
            // count++;
        }

        // console.log("sameLevelNodeList---", sameLevelNodeList);
        // console.log("sameLevelNodeList1---", sameLevelNodeList1);
        this.setState({
            sameLevelNodeList,
            sameLevelNodeList1
        });
    }
    getNodeTransferList(level, id, nodeTypeId, parent, nodeDataId) {
        // console.log("nodeDataId---", nodeDataId);
        var nodeTransferDataList = [];
        var arr = [];
        if (nodeTypeId == NUMBER_NODE_ID) {
            arr = this.state.items.filter(x => x.level == level && x.id != id && x.payload.nodeType.id == nodeTypeId);
        } else {
            arr = this.state.items.filter(x => x.level == level && x.id != id && (x.payload.nodeType.id == PERCENTAGE_NODE_ID || x.payload.nodeType.id == FU_NODE_ID || x.payload.nodeType.id == PU_NODE_ID) && x.parent == parent);
        }
        // console.log("arr---", arr);
        for (let i = 0; i < arr.length; i++) {
            var nodeDataModelingList = arr[i].payload.nodeDataMap[this.state.selectedScenario][0].nodeDataModelingList;
            // console.log("nodeDataModelingList---", nodeDataModelingList);
            if (nodeDataModelingList != undefined && nodeDataModelingList != null) {
                var transferList = nodeDataModelingList.filter(x => x.transferNodeDataId == nodeDataId);
                // console.log("transferList---", transferList);
                if (transferList.length > 0) {
                    var tempTransferList = JSON.parse(JSON.stringify(transferList));
                    // console.log("transferList.length > 0---", transferList.length);
                    if (transferList.length == 1) {
                        // console.log("transferList.length == 1---", transferList.length);
                        tempTransferList[0].transferNodeDataId = arr[i].payload.nodeDataMap[this.state.selectedScenario][0].nodeDataId;
                        nodeTransferDataList.push(tempTransferList[0]);
                    } else {
                        // console.log("transferList.length > 1---", transferList.length);
                        for (let j = 0; j < transferList.length; j++) {
                            tempTransferList[j].transferNodeDataId = arr[i].payload.nodeDataMap[this.state.selectedScenario][0].nodeDataId;
                            nodeTransferDataList.push(tempTransferList[j]);
                        }
                    }

                }
                // console.log("nodeTransferDataList---", nodeTransferDataList);
            }
        }
        // console.log("nodeTransferDataList final---", nodeTransferDataList);
        this.setState({
            nodeTransferDataList
        });

    }
    getRegionList() {
        var db1;
        getDatabase();
        var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var transaction = db1.transaction(['region'], 'readwrite');
            var program = transaction.objectStore('region');
            var getRequest = program.getAll();

            getRequest.onerror = function (event) {
                // Handle errors!
            };
            getRequest.onsuccess = function (event) {
                var myResult = [];
                myResult = getRequest.result;
                var regionList = [];
                if (this.state.realmCountryId != null && this.state.realmCountryId != "") {
                    regionList = myResult.filter(x => x.realmCountry.realmCountryId == this.state.realmCountryId);
                    // console.log("filter if regionList---", regionList);
                }
                else {
                    // regionList = myResult;
                    this.setState({
                        regionValues: []
                    });
                    // console.log("filter else regionList---", regionList);
                }
                var regionMultiList = []
                regionList.map(c => {
                    regionMultiList.push({ label: getLabelText(c.label, this.state.lang), value: c.regionId })
                })
                this.setState({
                    regionList,
                    regionMultiList
                });
                for (var i = 0; i < myResult.length; i++) {
                    // console.log("myResult--->", myResult[i])

                }

            }.bind(this);
        }.bind(this);
    }

    getModelingTypeList() {
        var db1;
        getDatabase();
        var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var transaction = db1.transaction(['modelingType'], 'readwrite');
            var program = transaction.objectStore('modelingType');
            var getRequest = program.getAll();

            getRequest.onerror = function (event) {
                // Handle errors!
            };
            getRequest.onsuccess = function (event) {
                var myResult = [];
                myResult = getRequest.result;
                this.setState({
                    modelingTypeList: myResult
                });
                // for (var i = 0; i < myResult.length; i++) {
                //     // console.log("datasetList--->", myResult[i])

                // }

            }.bind(this);
        }.bind(this);
    }
    buildModelingJexcel() {
        var scalingList = this.state.currentScenario.nodeDataModelingList == undefined ? [] : this.state.currentScenario.nodeDataModelingList;
        var nodeTransferDataList = this.state.nodeTransferDataList;
        var dataArray = [];
        let count = 0;
        if (scalingList.length == 0) {
            data = [];
            data[0] = ''
            data[1] = moment(this.state.currentScenario.month).startOf('month').add(1, 'months').format("YYYY-MM-DD")
            data[2] = this.state.maxMonth
            data[3] = ''
            data[4] = this.state.currentItemConfig.context.payload.nodeType.id == PERCENTAGE_NODE_ID || this.state.currentItemConfig.context.payload.nodeType.id == FU_NODE_ID || this.state.currentItemConfig.context.payload.nodeType.id == PU_NODE_ID ? 5 : '';
            data[5] = ''
            data[6] = ''
            data[7] = ''
            data[8] = cleanUp
            data[9] = ''
            data[10] = ''
            data[11] = ''
            data[12] = 0
            data[13] = {
                firstMonthOfTarget: "",
                yearsOfTarget: "",
                actualOrTargetValueList: []
            }
            data[14] = ""
            dataArray[count] = data;
            count++;
        }
        var scalingTotal = 0;
        if (scalingList.length > 0) {
            for (var j = 0; j < scalingList.length; j++) {
                data = [];
                data[0] = scalingList[j].notes
                data[1] = scalingList[j].startDate
                data[2] = scalingList[j].stopDate
                data[3] = scalingList[j].transferNodeDataId + "_T"
                data[4] = scalingList[j].modelingType.id
                data[5] = scalingList[j].increaseDecrease
                data[6] = scalingList[j].modelingType.id != 2 ? parseFloat(scalingList[j].dataValue).toFixed(4) : ''
                data[7] = scalingList[j].modelingType.id == 2 ? scalingList[j].dataValue : ''
                data[8] = cleanUp

                var nodeValue = this.state.currentScenario.calculatedDataValue;
                var calculatedChangeForMonth;
                if (scalingList[j].modelingType.id == 2 || scalingList[j].modelingType.id == 5) {
                    calculatedChangeForMonth = scalingList[j].dataValue;
                } else if (scalingList[j].modelingType.id == 3 || scalingList[j].modelingType.id == 4) {
                    calculatedChangeForMonth = (nodeValue * scalingList[j].dataValue) / 100;
                }
                data[9] = calculatedChangeForMonth
                data[10] = scalingList[j].nodeDataModelingId
                data[11] = 0
                data[12] = 0
                data[13] = {
                    firstMonthOfTarget: this.state.currentScenario.annualTargetCalculator == undefined ? this.state.firstMonthOfTarget : moment(moment(this.state.currentScenario.annualTargetCalculator.firstMonthOfTarget, "YYYY-MM")).format("YYYY-MM-DD"),
                    yearsOfTarget: this.state.currentScenario.annualTargetCalculator == undefined ? this.state.yearsOfTarget : this.state.currentScenario.annualTargetCalculator.yearsOfTarget,
                    actualOrTargetValueList: this.state.currentScenario.annualTargetCalculator == undefined ? this.state.actualOrTargetValueList : this.state.currentScenario.annualTargetCalculator.actualOrTargetValueList
                }
                data[14] = scalingList[j].modelingSource
                scalingTotal = parseFloat(scalingTotal) + parseFloat(calculatedChangeForMonth);
                dataArray[count] = data;
                count++;
            }
        }
        for (var j = 0; j < nodeTransferDataList.length; j++) {
            data = [];
            data[0] = nodeTransferDataList[j].notes
            data[1] = nodeTransferDataList[j].startDate
            data[2] = nodeTransferDataList[j].stopDate
            data[3] = nodeTransferDataList[j].transferNodeDataId + "_F"
            // console.log("modeling type---", scalingList[j].modelingType.id);
            data[4] = nodeTransferDataList[j].modelingType.id
            data[5] = 1
            data[6] = nodeTransferDataList[j].modelingType.id != 2 ? parseFloat(nodeTransferDataList[j].dataValue).toFixed(4) : ''
            data[7] = nodeTransferDataList[j].modelingType.id == 2 ? (nodeTransferDataList[j].dataValue) : ''
            data[8] = ""
            var nodeValue = (this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].calculatedDataValue;
            var calculatedChangeForMonth;
            if (nodeTransferDataList[j].modelingType.id == 2 || nodeTransferDataList[j].modelingType.id == 5) {
                calculatedChangeForMonth = nodeTransferDataList[j].dataValue;
            } else if (nodeTransferDataList[j].modelingType.id == 3 || nodeTransferDataList[j].modelingType.id == 4) {
                calculatedChangeForMonth = (nodeValue * (nodeTransferDataList[j].dataValue)) / 100;
            }
            data[9] = calculatedChangeForMonth
            data[10] = nodeTransferDataList[j].nodeDataModelingId
            data[11] = 0
            data[12] = 1
            data[13] = ""
            data[14] = ""

            scalingTotal = parseFloat(scalingTotal) + parseFloat(calculatedChangeForMonth);
            dataArray[count] = data;
            count++;
        }
        this.setState({ scalingTotal }, () => {
        });
        // this.el = jexcel(document.getElementById("modelingJexcel"), '');
        // this.el.destroy();
        jexcel.destroy(document.getElementById("modelingJexcel"), true);

        var data = dataArray;

        var options = {
            data: data,
            columnDrag: true,
            colWidths: [90, 160, 80, 80, 90, 90, 90, 90, 90],
            colHeaderClasses: ["Reqasterisk"],
            columns: [
                {
                    title: i18n.t('static.common.description'),
                    type: 'text',
                    width: '130'

                },
                {
                    title: i18n.t('static.common.startdate'),
                    type: 'calendar',
                    options: { format: JEXCEL_MONTH_PICKER_FORMAT, type: 'year-month-picker', validRange: [moment(this.state.currentScenario.month).startOf('month').add(1, 'months').format("YYYY-MM-DD"), this.state.maxMonth] }, width: 100
                },
                {
                    title: i18n.t('static.common.stopdate'),
                    type: 'calendar',
                    options: { format: JEXCEL_MONTH_PICKER_FORMAT, type: 'year-month-picker', validRange: [moment(this.state.currentScenario.month).startOf('month').add(1, 'months').format("YYYY-MM-DD"), this.state.maxMonth] }, width: 100
                },
                {
                    title: i18n.t('static.tree.transferToNode'),
                    type: 'dropdown',
                    width: '130',
                    source: this.state.sameLevelNodeList,
                    filter: this.filterSameLeveleUnitList,
                },

                {
                    title: i18n.t('static.tree.modelingType'),
                    type: 'dropdown',
                    source: this.state.filteredModelingType
                },
                {
                    title: '+/-',
                    type: 'dropdown',
                    source: [
                        { id: 1, name: "Increase" },
                        { id: -1, name: "Decrease" }
                    ]
                },
                {
                    title: i18n.t('static.tree.monthlyChange%'),
                    type: 'numeric',
                    textEditor: true,
                    decimal: '.',
                    mask: '#,##0.0000%',
                    disabledMaskOnEdition: true
                },
                {
                    title: i18n.t('static.tree.MonthlyChange#'),
                    type: this.state.currentItemConfig.context.payload.nodeType.id == 2 ? 'numeric' : 'hidden',
                    // visible: this.state.currentItemConfig.context.payload.nodeType.id == 2 ? true : false,
                    mask: '#,##0.0000', decimal: '.',
                    textEditor: true,
                    disabledMaskOnEdition: true
                },
                {
                    title: i18n.t('static.tree.modelingCalculater'),
                    type: 'image',
                    readOnly: true
                },
                {
                    title: i18n.t('static.tree.calculatedChangeForMonthTree') + " " + moment(this.state.currentScenario.month.replace(/-/g, '\/')).format('MMM. YYYY'),
                    type: 'numeric',
                    mask: '#,##0.0000',
                    decimal: '.',
                    textEditor: true,
                    disabledMaskOnEdition: true,
                    width: '130',
                    readOnly: true

                },
                {
                    title: 'nodeDataModelingId',
                    type: 'hidden'
                },
                {
                    title: 'isChanged',
                    type: 'hidden'
                },
                {
                    title: 'isTransfer',
                    type: 'hidden'
                },
                {
                    title: 'modelingCalculator',
                    type: 'hidden'
                },
                {
                    title: 'modelingSource',
                    type: 'hidden'
                }

            ],
            editable: true,
            onload: this.loaded,
            pagination: localStorage.getItem("sesRecordCount"),
            search: true,
            columnSorting: true,
            wordWrap: true,
            allowInsertColumn: false,
            allowManualInsertColumn: false,
            allowDeleteRow: true,
            onchange: this.changed,
            updateTable: function (el, cell, x, y, source, value, id) {
                var elInstance = el;
                if (y != null) {
                    var rowData = elInstance.getRowData(y);
                    // console.log("my row data---",rowData);
                    if (rowData[4] != "") {
                        if (rowData[4] == 2) {
                            var cell = elInstance.getCell(("H").concat(parseInt(y) + 1))
                            cell.classList.remove('readonly');
                            cell = elInstance.getCell(("G").concat(parseInt(y) + 1))
                            cell.classList.add('readonly');
                            // elInstance.hideIndex(6);
                        } else {
                            var cell = elInstance.getCell(("H").concat(parseInt(y) + 1))
                            cell.classList.add('readonly');
                            cell = elInstance.getCell(("G").concat(parseInt(y) + 1))
                            cell.classList.remove('readonly');
                            // elInstance.showIndex(6);
                        }
                    } else {
                        var cell = elInstance.getCell(("H").concat(parseInt(y) + 1))
                        cell.classList.add('readonly');
                        cell = elInstance.getCell(("G").concat(parseInt(y) + 1))
                        cell.classList.add('readonly');
                    }

                    if (rowData[12] != "") {
                        var cell = elInstance.getCell(("A").concat(parseInt(y) + 1))
                        cell.classList.add('readonly');
                        var cell = elInstance.getCell(("B").concat(parseInt(y) + 1))
                        cell.classList.add('readonly');
                        var cell = elInstance.getCell(("C").concat(parseInt(y) + 1))
                        cell.classList.add('readonly');
                        var cell = elInstance.getCell(("D").concat(parseInt(y) + 1))
                        cell.classList.add('readonly');
                        var cell = elInstance.getCell(("E").concat(parseInt(y) + 1))
                        cell.classList.add('readonly');
                        var cell = elInstance.getCell(("F").concat(parseInt(y) + 1))
                        cell.classList.add('readonly');
                        var cell = elInstance.getCell(("G").concat(parseInt(y) + 1))
                        cell.classList.add('readonly');
                        var cell = elInstance.getCell(("H").concat(parseInt(y) + 1))
                        cell.classList.add('readonly');
                    }
                    // console.log("rowData table---", rowData)
                    if ((rowData[3] != "" && rowData[3] != "_T" && rowData[3] != "null_T") || rowData[12] == 1) {
                        var cell = elInstance.getCell(("F").concat(parseInt(y) + 1))
                        cell.classList.add('readonly');
                    }
                    else {
                        var cell = elInstance.getCell(("F").concat(parseInt(y) + 1))
                        cell.classList.remove('readonly');
                    }

                }
            }.bind(this),
            onselection: this.selected,
            copyCompatibility: true,
            allowExport: false,
            paginationOptions: JEXCEL_PAGINATION_OPTION,
            position: 'top',
            filters: true,
            license: JEXCEL_PRO_KEY,
            contextMenu: function (obj, x, y, e) {
                var items = [];
                if (y == null) {
                    // Sorting
                } else {
                    // at start
                    if (obj.options.allowInsertRow == true) {
                        items.push({
                            title: "Insert Row",
                            onclick: function () {
                                var data = [];
                                data[0] = ''
                                data[1] = moment(this.state.currentScenario.month).startOf('month').add(1, 'months').format("YYYY-MM-DD")
                                data[2] = this.state.maxMonth
                                data[3] = ''
                                data[4] = this.state.currentItemConfig.context.payload.nodeType.id == PERCENTAGE_NODE_ID || this.state.currentItemConfig.context.payload.nodeType.id == FU_NODE_ID || this.state.currentItemConfig.context.payload.nodeType.id == PU_NODE_ID ? 5 : '';
                                data[5] = ''
                                data[6] = ''
                                data[7] = ''
                                data[8] = cleanUp
                                data[9] = ''
                                data[10] = ''
                                data[11] = ''
                                data[12] = 0
                                data[13] = {
                                    firstMonthOfTarget: "",
                                    yearsOfTarget: "",
                                    actualOrTargetValueList: []
                                }
                                data[14] = ""
                                obj.insertRow(data, 0, 1);
                            }.bind(this)
                        });
                    }
                    // Delete a row
                    if (obj.options.allowDeleteRow == true) {
                        if (obj.getRowData(y)[12] == 0) {
                            items.push({
                                title: i18n.t("static.common.deleterow"),
                                onclick: function () {
                                    if (obj.getJson(null, false).length == 1) {
                                        var data = [];
                                        data[0] = ''
                                        data[1] = moment(this.state.currentScenario.month).startOf('month').add(1, 'months').format("YYYY-MM-DD")
                                        data[2] = this.state.maxMonth
                                        data[3] = ''
                                        data[4] = this.state.currentItemConfig.context.payload.nodeType.id == PERCENTAGE_NODE_ID || this.state.currentItemConfig.context.payload.nodeType.id == FU_NODE_ID || this.state.currentItemConfig.context.payload.nodeType.id == PU_NODE_ID ? 5 : '';
                                        data[5] = ''
                                        data[6] = ''
                                        data[7] = ''
                                        data[8] = cleanUp
                                        data[9] = ''
                                        data[10] = ''
                                        data[11] = ''
                                        data[12] = 0
                                        data[13] = {
                                            firstMonthOfTarget: "",
                                            yearsOfTarget: "",
                                            actualOrTargetValueList: []
                                        }
                                        data[14] = ""
                                        obj.insertRow(data, 0, 1);
                                        obj.deleteRow(parseInt(y) + 1);
                                        var col = ("C").concat(parseInt(0) + 1);
                                        obj.setStyle(col, "background-color", "transparent");
                                        obj.setComments(col, "");
                                        var col = ("F").concat(parseInt(0) + 1);
                                        obj.setStyle(col, "background-color", "transparent");
                                        obj.setComments(col, "");
                                        this.setState({
                                            lastRowDeleted: true,
                                            scalingTotal: ""
                                        })
                                    } else {
                                        obj.deleteRow(parseInt(y));
                                    }


                                }.bind(this)
                            });
                        }
                    }
                }
                return items;
            }.bind(this)

        };
        var modelingEl = jexcel(document.getElementById("modelingJexcel"), options);
        this.el = modelingEl;
        this.setState({
            modelingEl: modelingEl
        }, () => {
            var scalingMonth = { year: new Date(this.state.currentScenario.month.replace(/-/g, '\/')).getFullYear(), month: ("0" + (new Date(this.state.currentScenario.month.replace(/-/g, '\/')).getMonth() + 1)).slice(-2) };
            this.filterScalingDataByMonth(scalingMonth.year + "-" + scalingMonth.month + "-01");
        }
        );
    }

    loaded = function (instance, cell, x, y, value) {
        jExcelLoadedFunction(instance);
        // var asterisk = document.getElementsByClassName("resizable")[0];
        var asterisk = document.getElementsByClassName("jss")[0].firstChild.nextSibling;
        var tr = asterisk.firstChild;
        tr.children[4].classList.add('InfoTr');
        tr.children[5].classList.add('InfoTr');
        tr.children[9].classList.add('InfoTr');
        tr.children[10].classList.add('InfoTr');

        tr.children[4].title = i18n.t('static.tooltip.Transfercloumn');
        tr.children[5].title = i18n.t('static.tooltip.ModelingType');
        tr.children[9].title = i18n.t('static.tooltip.ModelingCalculator');
        tr.children[10].title = i18n.t('static.tooltip.CalculatorChangeforMonth');

    }

    filterSameLeveleUnitList = function (instance, cell, c, r, source) {
        var sameLevelNodeList = this.state.sameLevelNodeList1;
        // console.log("mylist--------->32", sameLevelNodeList);
        return sameLevelNodeList;

    }.bind(this)
    selected = function (instance, cell, x, y, value, e) {
        if (e.buttons == 1) {

            if (y == 8 && AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_EDIT_TREE') && this.props.match.params.isLocal != 2) {
                var elInstance = this.state.modelingEl;
                var rowData = elInstance.getRowData(x);
                if (rowData[4] != "" && rowData[4] != null && rowData[1] != "" && rowData[1] != null && rowData[2] != "" && rowData[2] != null) {
                    this.setState({
                        currentRowIndex: '',
                        currentTransferData: '',
                        currentModelingType: '',
                        currentCalculatorStartDate: '',
                        currentCalculatorStopDate: '',
                        currentCalculatorStartValue: '',
                        firstMonthOfTarget: "",
                        yearsOfTarget: "",
                        actualOrTargetValueList: []
                    }, () => {
                        console.log("x row data===>", rowData[1]);
                        var startValue = this.getMomValueForDateRange(rowData[1]);
                        var targetYears = ((moment(rowData[2]).diff(moment(rowData[1]), 'years') + 1) + 1) < 3 ? 3 : ((moment(rowData[2]).diff(moment(rowData[1]), 'years') + 1) + 1);
                        // console.log("***MOM final start value---", startValue)
                        this.setState({
                            currentRowIndex: x,
                            showCalculatorFields: this.state.aggregationNode ? !this.state.showCalculatorFields : false,
                            currentModelingType: rowData[4],
                            modelingTypeOriginal: rowData[4],
                            currentTransferData: rowData[3],
                            currentCalculatorStartDate: (rowData[13].firstMonthOfTarget == "" || rowData[13].firstMonthOfTarget == "Invalid date") && (this.state.firstMonthOfTarget == "Invalid date" || this.state.firstMonthOfTarget == "") ? rowData[1] : (rowData[13].firstMonthOfTarget != "" ? rowData[13].firstMonthOfTarget : this.state.firstMonthOfTarget),
                            currentCalculatorStopDate: rowData[2],
                            currentCalculatorStartValue: startValue,
                            currentCalculatedMomChange: '',
                            currentTargetChangeNumber: '',
                            currentTargetChangeNumberEdit: false,
                            currentTargetChangePercentage: '',
                            currentTargetChangePercentageEdit: false,
                            currentEndValue: '',
                            currentEndValueEdit: false,
                            actualOrTargetValueList: rowData[13].actualOrTargetValueList.length != 0 && this.state.actualOrTargetValueList.length == 0 ? rowData[13].actualOrTargetValueList : this.state.actualOrTargetValueList,
                            yearsOfTarget: rowData[13].yearsOfTarget == "" && this.state.yearsOfTarget == "" ? targetYears : (rowData[13].yearsOfTarget != "" ? rowData[13].yearsOfTarget : this.state.yearsOfTarget),
                            firstMonthOfTarget: (rowData[13].firstMonthOfTarget == "" || rowData[13].firstMonthOfTarget == "Invalid date") && (this.state.firstMonthOfTarget == "Invalid date" || this.state.firstMonthOfTarget == "") ? rowData[1] : (rowData[13].firstMonthOfTarget != "" ? rowData[13].firstMonthOfTarget : this.state.firstMonthOfTarget),
                            actualOrTargetValueListOriginal: rowData[13].actualOrTargetValueList.length != 0 && this.state.actualOrTargetValueList.length == 0 ? rowData[13].actualOrTargetValueList : this.state.actualOrTargetValueList,
                            yearsOfTargetOriginal: rowData[13].yearsOfTarget == "" && this.state.yearsOfTarget == "" ? targetYears : (rowData[13].yearsOfTarget != "" ? rowData[13].yearsOfTarget : this.state.yearsOfTarget),
                            firstMonthOfTargetOriginal: rowData[13].firstMonthOfTarget == "" && this.state.firstMonthOfTarget == "" ? rowData[1] : (rowData[13].firstMonthOfTarget != "" ? rowData[13].firstMonthOfTarget : this.state.firstMonthOfTarget),
                            targetSelect: rowData[14],
                            targetSelectDisable: true,
                            isCalculateClicked: 0
                        }, () => {
                            // this.calculateMOMData(0, 3);
                            console.log("showCalculatorFields===", rowData[13])
                            if (this.state.showCalculatorFields) {
                                this.buildModelingCalculatorJexcel();
                            }
                        });
                    })

                } else if (rowData[4] == "" || rowData[4] == null) {
                    if (this.state.aggregationNode) {
                        this.setState({
                            currentRowIndex: '',
                            currentTransferData: '',
                            currentModelingType: '',
                            currentCalculatorStartDate: '',
                            currentCalculatorStopDate: '',
                            currentCalculatorStartValue: '',
                            firstMonthOfTarget: "",
                            yearsOfTarget: "",
                            actualOrTargetValueList: []
                        }, () => {
                            // console.log("x row data===>", this.el.getRowData(x));
                            var startValue = this.getMomValueForDateRange(rowData[1]);
                            var targetYears = (Number(moment(rowData[2]).diff(moment(rowData[1]), 'years') + 1) + 1) < 3 ? 3 : (Number(moment(rowData[2]).diff(moment(rowData[1]), 'years') + 1) + 1)
                            // console.log("***MOM final start value--->>>", (Number(moment(rowData[2]).diff(moment(rowData[1]), 'years') + 1) + 1))
                            this.setState({
                                currentRowIndex: x,
                                showCalculatorFields: this.state.aggregationNode ? !this.state.showCalculatorFields : false,
                                currentModelingType: 2,
                                modelingTypeOriginal: 2,
                                currentTransferData: rowData[3],
                                currentCalculatorStartDate: rowData[1],
                                currentCalculatorStopDate: rowData[2],
                                currentCalculatorStartValue: startValue,
                                currentCalculatedMomChange: '',
                                currentTargetChangeNumber: '',
                                currentTargetChangeNumberEdit: false,
                                currentTargetChangePercentage: '',
                                currentTargetChangePercentageEdit: false,
                                currentEndValue: '',
                                currentEndValueEdit: false,
                                actualOrTargetValueList: this.state.actualOrTargetValueList,
                                yearsOfTarget: targetYears,
                                firstMonthOfTarget: rowData[1],
                                actualOrTargetValueListOriginal: this.state.actualOrTargetValueList,
                                yearsOfTargetOriginal: targetYears,
                                firstMonthOfTargetOriginal: rowData[1],
                                modelingSource: rowData[14],
                                targetSelectDisable: false,
                                isCalculateClicked: 0
                            }, () => {
                                if (this.state.showCalculatorFields) {
                                    this.buildModelingCalculatorJexcel();
                                }
                            });
                        })
                    } else {
                        alert(i18n.t('static.tree.pleaseSelectNodeType'));
                    }
                }
                else if (rowData[1] == "" || rowData[1] == null) {
                    alert("Please select start date before proceeding.");
                }
                else if (rowData[2] == "" || rowData[2] == null) {
                    alert("Please select end date before proceeding.");
                }
            }
        }
    }.bind(this)

    resetModelingCalculatorData = function (instance, cell, x, y, value) {
        this.setState({
            firstMonthOfTarget: this.state.firstMonthOfTargetOriginal,
            yearsOfTarget: this.state.yearsOfTargetOriginal,
            actualOrTargetValueList: this.state.actualOrTargetValueListOriginal,
            currentModelingType: this.state.modelingTypeOriginal,
            isCalculateClicked: 0
        }, () => {
            this.buildModelingCalculatorJexcel();
        })
    }.bind(this);

    changed1 = function (instance, cell, x, y, value) {
        if (this.state.isChanged != true) {
            this.setState({ isChanged: true });
        }
        // 4 & 5
        // this.setState({
        //     momJexcelLoader: true
        // }, () => {
        //     setTimeout(() => {
        //         // console.log("hi anchal")
        //         var json = this.state.momEl.getJson(null, false);
        //         // console.log("momData>>>", json);
        //         var overrideListArray = [];
        //         for (var i = 0; i < json.length; i++) {
        //             var map1 = new Map(Object.entries(json[i]));
        //             if ((map1.get("4") != '' && map1.get("4") != 0.00) || (map1.get("5") != '' && map1.get("5") != 0.00)) {
        //                 var overrideData = {
        //                     month: map1.get("0"),
        //                     seasonalityPerc: map1.get("4").toString().replaceAll(",", "").split("%")[0],
        //                     manualChange: (map1.get("5") != '' && map1.get("5") != 0.00) ? (map1.get("5")).replaceAll(",", "") : map1.get("5"),
        //                     nodeDataId: map1.get("7"),
        //                     active: true
        //                 }
        //                 // console.log("overrideData>>>", overrideData);
        //                 overrideListArray.push(overrideData);
        //             }
        //         }
        //         // console.log("overRide data list>>>", overrideListArray);
        //         let { currentItemConfig } = this.state;
        //         let { curTreeObj } = this.state;
        //         let { treeData } = this.state;
        //         let { dataSetObj } = this.state;
        //         var items = this.state.items;
        //         (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].nodeDataOverrideList = overrideListArray;
        //         this.setState({ currentItemConfig }, () => {
        //             // console.log("currentIemConfigInUpdetMom>>>", currentItemConfig);
        //             var findNodeIndex = items.findIndex(n => n.id == currentItemConfig.context.id);
        //             items[findNodeIndex] = currentItemConfig.context;
        //             // console.log("items>>>", items);
        //             curTreeObj.tree.flatList = items;

        //             var findTreeIndex = treeData.findIndex(n => n.treeId == curTreeObj.treeId);
        //             treeData[findTreeIndex] = curTreeObj;

        //             // var databytes = CryptoJS.AES.decrypt(dataSetObj.programData, SECRET_KEY);
        //             // var programData = JSON.parse(databytes.toString(CryptoJS.enc.Utf8));
        //             var programData = dataSetObj.programData;
        //             programData.treeList = treeData;
        //             // dataSetObj.programData = programData;
        //             // console.log("dataSetDecrypt>>>", programData);
        //             // calculateModelingData(dataSetObj, this, '', currentItemConfig.context.id, this.state.selectedScenario, 1, this.state.treeId, false);
        //         });
        //     }, 0);
        // })

    }.bind(this);
    changed2 = function (instance, cell, x, y, value) {
        if (this.state.isChanged != true) {
            this.setState({ isChanged: true });
        }
        // this.setState({
        //     momJexcelLoader: true
        // }, () => {
        //     setTimeout(() => {
        //         var json = this.state.momElPer.getJson(null, false);
        //         // console.log("momData>>>", json);
        //         var overrideListArray = [];
        //         for (var i = 0; i < json.length; i++) {
        //             var map1 = new Map(Object.entries(json[i]));
        //             if (map1.get("3") != '' && map1.get("3") != 0.00) {
        //                 var overrideData = {
        //                     month: map1.get("0"),
        //                     seasonalityPerc: 0,
        //                     manualChange: map1.get("3").toString().replaceAll(",", "").split("%")[0],
        //                     nodeDataId: map1.get("7"),
        //                     active: true
        //                 }
        //                 // console.log("overrideData>>>", overrideData);
        //                 overrideListArray.push(overrideData);
        //             }
        //         }
        //         // console.log("overRide data list>>>", overrideListArray);
        //         let { currentItemConfig } = this.state;
        //         let { curTreeObj } = this.state;
        //         let { treeData } = this.state;
        //         let { dataSetObj } = this.state;
        //         var items = this.state.items;
        //         (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].nodeDataOverrideList = overrideListArray;
        //         this.setState({ currentItemConfig }, () => {
        //             // console.log("currentIemConfigInUpdetMom>>>", currentItemConfig);
        //             var findNodeIndex = items.findIndex(n => n.id == currentItemConfig.context.id);
        //             items[findNodeIndex] = currentItemConfig.context;
        //             // console.log("items>>>", items);
        //             curTreeObj.tree.flatList = items;

        //             var findTreeIndex = treeData.findIndex(n => n.treeId == curTreeObj.treeId);
        //             treeData[findTreeIndex] = curTreeObj;
        //             // console.log("treeData---", treeData);
        //             // console.log("dataSetObj---", dataSetObj);
        //             var programData = dataSetObj.programData;
        //             // console.log("dataSetDecrypt>>>1", programData);
        //             programData.treeList = treeData;
        //             // console.log("dataSetDecrypt>>>2", programData);


        //             //  programData = (CryptoJS.AES.encrypt(JSON.stringify(programData), SECRET_KEY)).toString();
        //             //  dataSetObj.programData = programData;

        //             // console.log("encpyDataSet>>>", dataSetObj)
        //             calculateModelingData(dataSetObj, this, '', currentItemConfig.context.id, this.state.selectedScenario, 1, this.state.treeId, false);
        //         });
        //     }, 0);
        // })
    }.bind(this);
    changed = function (instance, cell, x, y, value) {
        this.setState({
            modelingChangedOrAdded: true
        })

        // instance.jexcel
        if (x != 9 && x != 11 && this.state.modelingChanged == false) {
            this.setState({
                modelingChanged: true
            })
        }
        if (this.state.lastRowDeleted != false) {
            this.setState({
                lastRowDeleted: false
            })
        }
        //Modeling type
        if (x == 4) {
            instance.setStyle(("G").concat(parseInt(y) + 1), "background-color", "transparent");
            instance.setComments(("G").concat(parseInt(y) + 1), "");
            instance.setStyle(("H").concat(parseInt(y) + 1), "background-color", "transparent");
            instance.setComments(("H").concat(parseInt(y) + 1), "");
            var col = ("E").concat(parseInt(y) + 1);
            if (value == "") {
                instance.setStyle(col, "background-color", "transparent");
                instance.setStyle(col, "background-color", "yellow");
                instance.setComments(col, i18n.t('static.label.fieldRequired'));
                this.state.modelingEl.setValueFromCoords(6, y, "", true);
                this.state.modelingEl.setValueFromCoords(7, y, "", true);
                // this.state.modelingEl.setValueFromCoords(8, y, '', true);
            } else {
                if (value == 2) {
                    this.state.modelingEl.setValueFromCoords(6, y, "", true);
                    // this.state.modelingEl.setValueFromCoords(8, y, '', true);
                }
                else if (value == 3 || value == 4 || value == 5) {
                    this.state.modelingEl.setValueFromCoords(7, y, "", true);
                    // this.state.modelingEl.setValueFromCoords(8, y, '', true);
                }

                instance.setStyle(col, "background-color", "transparent");
                instance.setComments(col, "");
            }
        }

        // Transfer to/from node
        if (x == 3) {
            var col = ("D").concat(parseInt(y) + 1);
            var transferFlag = false;
            if (value != "") {
                this.state.modelingEl.setValueFromCoords(5, y, -1, true);
                var items = this.state.items;
                var transfer = value != "" ? value.split('_')[0] : '';
                if (transfer != '') {
                    for (let i = 0; i < items.length; i++) {
                        var nodeDataId = items[i].payload.nodeDataMap[this.state.selectedScenario][0].nodeDataId;
                        if (nodeDataId == transfer && items[i].payload.nodeDataMap[this.state.selectedScenario][0].extrapolation) {
                            transferFlag = true;
                            break;
                        }
                    }
                }
                if (transferFlag) {
                    instance.setStyle(col, "background-color", "transparent");
                    instance.setStyle(col, "background-color", "yellow");
                    instance.setComments(col, 'You can not transfer data to this node as it is an extrapolation node.');
                } else {
                    instance.setStyle(col, "background-color", "transparent");
                    instance.setComments(col, "");
                }
            }
            else {
                this.state.modelingEl.setValueFromCoords(5, y, "", true);
                instance.setStyle(col, "background-color", "transparent");
                instance.setComments(col, "");
            }
        }
        //+/-
        if (x == 5) {
            var col = ("F").concat(parseInt(y) + 1);
            // var value = this.el.getValueFromCoords(5, y);
            if (value == "") {
                instance.setStyle(col, "background-color", "transparent");
                instance.setStyle(col, "background-color", "yellow");
                instance.setComments(col, i18n.t('static.label.fieldRequired'));
            } else {
                instance.setStyle(col, "background-color", "transparent");
                instance.setComments(col, "");
            }
        }
        var startDate = instance.getValue(`B${parseInt(y) + 1}`, true).toString().replaceAll(",", "");
        var stopDate = instance.getValue(`C${parseInt(y) + 1}`, true).toString().replaceAll(",", "");

        // Start date
        if (x == 1) {
            var col = ("B").concat(parseInt(y) + 1);
            var diff1 = moment(stopDate).diff(moment(startDate), 'months');
            if (value == "") {
                instance.setStyle(col, "background-color", "transparent");
                instance.setStyle(col, "background-color", "yellow");
                instance.setComments(col, i18n.t('static.label.fieldRequired'));
            } else {
                instance.setStyle(col, "background-color", "transparent");
                instance.setComments(col, "");
                var col1 = ("C").concat(parseInt(y) + 1)
                if (diff1 <= 0) {
                    instance.setStyle(col1, "background-color", "transparent");
                    instance.setStyle(col1, "background-color", "yellow");
                    instance.setComments(col1, 'Please enter valid date');
                } else {
                    instance.setStyle(col1, "background-color", "transparent");
                    instance.setComments(col1, "");
                }
            }
            // this.state.modelingEl.setValueFromCoords(4, y, '', true);
        }

        // Stop date
        if (x == 2) {
            var col = ("C").concat(parseInt(y) + 1);
            var diff = moment(stopDate).diff(moment(startDate), 'months');
            if (value == "") {
                instance.setStyle(col, "background-color", "transparent");
                instance.setStyle(col, "background-color", "yellow");
                instance.setComments(col, i18n.t('static.label.fieldRequired'));
            }
            else if (diff <= 0) {
                instance.setStyle(col, "background-color", "transparent");
                instance.setStyle(col, "background-color", "yellow");
                instance.setComments(col, 'Please enter valid date');
            }
            else {
                instance.setStyle(col, "background-color", "transparent");
                instance.setComments(col, "");
            }
        }
        var elInstance = this.state.modelingEl;
        var rowData = elInstance.getRowData(y);
        // console.log("modelingTypeId-3--", rowData[4])
        if (rowData[4] != "") {
            var reg = JEXCEL_DECIMAL_MONTHLY_CHANGE_4_DECIMAL_POSITIVE;
            var monthDifference = moment(stopDate).diff(startDate, 'months', true);
            var nodeValue = this.state.currentScenario.calculatedDataValue;
            var calculatedChangeForMonth;
            // Monthly change %
            if (x == 6 && rowData[4] != 2) {
                instance.setStyle(("H").concat(parseInt(y) + 1), "background-color", "transparent");
                instance.setComments(("H").concat(parseInt(y) + 1), "");
                var col = ("G").concat(parseInt(y) + 1);
                value = value.toString().replaceAll(",", "").split("%")[0];
                if (value == "") {
                    instance.setStyle(col, "background-color", "transparent");
                    instance.setStyle(col, "background-color", "yellow");
                    instance.setComments(col, i18n.t('static.label.fieldRequired'));
                }
                // else if (!(reg.test(value))) {
                //     instance.setStyle(col, "background-color", "transparent");
                //     instance.setStyle(col, "background-color", "yellow");
                //     instance.setComments(col, i18n.t('static.message.invalidnumber'));
                // }
                else {
                    instance.setStyle(col, "background-color", "transparent");
                    instance.setComments(col, "");
                    if (rowData[4] != 5) {
                        calculatedChangeForMonth = parseFloat((nodeValue * value) / 100).toFixed(4);
                    } else {
                        calculatedChangeForMonth = parseFloat(value).toFixed(4);
                    }
                    // this.state.modelingEl.setValueFromCoords(8, y, calculatedChangeForMonth, true);
                }
            }
            if (x == 4 && rowData[4] != 2 && rowData[6] != "") {
                instance.setStyle(("H").concat(parseInt(y) + 1), "background-color", "transparent");
                instance.setComments(("H").concat(parseInt(y) + 1), "");
                instance.setStyle(col, "background-color", "transparent");
                instance.setComments(col, "");
                if (rowData[4] != 5) {
                    calculatedChangeForMonth = parseFloat((nodeValue * rowData[5]) / 100).toFixed(4);
                } else {
                    calculatedChangeForMonth = parseFloat(rowData[5]).toFixed();
                }
                // this.state.modelingEl.setValueFromCoords(8, y, calculatedChangeForMonth, true);
            }
            // Monthly change #
            if (x == 7 && rowData[4] == 2) {
                instance.setStyle(("G").concat(parseInt(y) + 1), "background-color", "transparent");
                instance.setComments(("G").concat(parseInt(y) + 1), "");
                var col = ("H").concat(parseInt(y) + 1);
                var reg = JEXCEL_DECIMAL_MONTHLY_CHANGE_4_DECIMAL_POSITIVE;
                // console.log("value monthly change #---", value);
                value = value.toString().replaceAll(",", "");
                if (value == "") {
                    instance.setStyle(col, "background-color", "transparent");
                    instance.setStyle(col, "background-color", "yellow");
                    instance.setComments(col, i18n.t('static.label.fieldRequired'));
                }
                // else if (!(reg.test(value))) {
                //     instance.setStyle(col, "background-color", "transparent");
                //     instance.setStyle(col, "background-color", "yellow");
                //     instance.setComments(col, i18n.t('static.message.invalidnumber'));
                // }
                else {
                    instance.setStyle(col, "background-color", "transparent");
                    instance.setComments(col, "");
                    // this.state.modelingEl.setValueFromCoords(8, y, value, true);
                }
            }
        }
        if (x != 11 && x != 9) {
            instance.setValueFromCoords(11, y, 1, true);
            this.setState({ isChanged: true });
        }
        if(!this.state.modelingTabChanged){
            this.setState({
                modelingTabChanged: true
            })
        }
        // this.calculateScalingTotal();
    }.bind(this);
    loadedMom = function (instance, cell, x, y, value) {
        jExcelLoadedFunction(instance, 1);
        if (instance.worksheets[0].getJson(null, false).length > 0) {
            var cell = instance.worksheets[0].getCell("E1");
            cell.classList.add('readonly');
            var cell = instance.worksheets[0].getCell("F1");
            cell.classList.add('readonly');
        }
    }

    addRow = function () {
        if (this.state.modelingChanged == false) {
            this.setState({
                modelingChanged: true
            })
        }
        var elInstance = this.state.modelingEl;
        var data = [];
        data[0] = ''
        data[1] = moment(this.state.currentScenario.month).startOf('month').add(1, 'months').format("YYYY-MM-DD")
        data[2] = this.state.maxMonth
        data[3] = ''
        data[4] = this.state.currentItemConfig.context.payload.nodeType.id == PERCENTAGE_NODE_ID || this.state.currentItemConfig.context.payload.nodeType.id == FU_NODE_ID || this.state.currentItemConfig.context.payload.nodeType.id == PU_NODE_ID ? 5 : '';
        data[5] = ''
        data[6] = ''
        data[7] = ''
        data[8] = cleanUp
        data[9] = ''
        data[10] = ''
        data[11] = 1
        data[12] = 0
        data[13] = {
            firstMonthOfTarget: "",
            yearsOfTarget: "",
            actualOrTargetValueList: []
        }
        data[14] = ""
        elInstance.insertRow(
            data, 0, 1
        );
    };

    getPayloadData(itemConfig, type) {
        // console.log("inside get payload");
        var data = [];
        data = itemConfig.payload.nodeDataMap;
        // console.log("itemConfig---", data);
        // console.log("data---", data);
        var scenarioId = document.getElementById('scenarioId').value;
        // this.state.selectedScenario;
        if (data != null && data[scenarioId] != null && (data[scenarioId])[0] != null) {
            if (type == 4 || type == 5 || type == 6) {
                var result = false;
                // console.log("type 4---", itemConfig.payload.label.label_en, " data----", itemConfig)
                if (itemConfig.payload.nodeDataMap[this.state.selectedScenario][0].nodeDataModelingList.length > 0) {
                    var nodeDataModelingList = itemConfig.payload.nodeDataMap[this.state.selectedScenario][0].nodeDataModelingList;
                    if (type == 4) {
                        if (nodeDataModelingList.filter(x => x.increaseDecrease == 1).length > 0) {
                            result = true;
                        } else {
                            var arr = [];
                            if (itemConfig.payload.nodeType.id == NUMBER_NODE_ID) {
                                arr = this.state.items.filter(x => x.level == itemConfig.level && x.id != itemConfig.id && x.payload.nodeType.id == itemConfig.payload.nodeType.id);
                            } else {
                                arr = this.state.items.filter(x => x.level == itemConfig.level && x.id != itemConfig.id && (x.payload.nodeType.id == PERCENTAGE_NODE_ID || x.payload.nodeType.id == FU_NODE_ID || x.payload.nodeType.id == PU_NODE_ID) && x.parent == itemConfig.parent);
                            }
                            if (arr.length > 0) {
                                for (var i = 0; i <= arr.length; i++) {
                                    if (arr[i] != null) {
                                        // console.log("arr[i]---", arr[i], " ", itemConfig.payload.label.label_en)
                                        var nodeDataModelingList = arr[i].payload.nodeDataMap[this.state.selectedScenario][0].nodeDataModelingList;
                                        if (nodeDataModelingList.length > 0) {
                                            // console.log("current node data id---", itemConfig.payload.nodeDataMap[this.state.selectedScenario][0].nodeDataId);
                                            var nodedata = nodeDataModelingList.filter(x => x.transferNodeDataId == itemConfig.payload.nodeDataMap[this.state.selectedScenario][0].nodeDataId)[0];
                                            // console.log("nodedata---", nodedata);
                                            if (nodedata != null && nodedata != "") {
                                                // console.log("nodedata inside if---", itemConfig.payload.label.label_en);
                                                result = true;
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        }

                    } if (type == 6) {
                        // console.log("nodeDataModelingList 6---", nodeDataModelingList, " name", itemConfig.payload.label.label_en);
                        if (nodeDataModelingList.filter(x => x.increaseDecrease == -1).length > 0) {
                            result = true;
                        }

                    }
                    else if (type == 5) {
                        var filteredData = nodeDataModelingList.filter(x => x.transferNodeDataId != null && x.transferNodeDataId != "" && x.transferNodeDataId > 0);
                        if (filteredData.length > 0) {
                            result = true;
                        } else {
                            var arr = [];
                            if (itemConfig.payload.nodeType.id == NUMBER_NODE_ID) {
                                arr = this.state.items.filter(x => x.level == itemConfig.level && x.id != itemConfig.id && x.payload.nodeType.id == itemConfig.payload.nodeType.id);
                            } else {
                                arr = this.state.items.filter(x => x.level == itemConfig.level && x.id != itemConfig.id && (x.payload.nodeType.id == PERCENTAGE_NODE_ID || x.payload.nodeType.id == FU_NODE_ID || x.payload.nodeType.id == PU_NODE_ID) && x.parent == itemConfig.parent);
                            }
                            if (arr.length > 0) {
                                for (var i = 0; i <= arr.length; i++) {
                                    if (arr[i] != null) {
                                        // console.log("arr[i]---", arr[i], " ", itemConfig.payload.label.label_en)
                                        var nodeDataModelingList = arr[i].payload.nodeDataMap[this.state.selectedScenario][0].nodeDataModelingList;
                                        if (nodeDataModelingList.length > 0) {
                                            // console.log("current node data id---", itemConfig.payload.nodeDataMap[this.state.selectedScenario][0].nodeDataId);
                                            var nodedata = nodeDataModelingList.filter(x => x.transferNodeDataId == itemConfig.payload.nodeDataMap[this.state.selectedScenario][0].nodeDataId)[0];
                                            // console.log("nodedata---", nodedata);
                                            if (nodedata != null && nodedata != "") {
                                                // console.log("nodedata inside if---", itemConfig.payload.label.label_en);
                                                result = true;
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (type == 4 || type == 5) {
                        var arr = [];
                        if (itemConfig.payload.nodeType.id == NUMBER_NODE_ID) {
                            arr = this.state.items.filter(x => x.level == itemConfig.level && x.id != itemConfig.id && x.payload.nodeType.id == itemConfig.payload.nodeType.id);
                        } else {
                            arr = this.state.items.filter(x => x.level == itemConfig.level && x.id != itemConfig.id && (x.payload.nodeType.id == PERCENTAGE_NODE_ID || x.payload.nodeType.id == FU_NODE_ID || x.payload.nodeType.id == PU_NODE_ID) && x.parent == itemConfig.parent);
                        }
                        if (arr.length > 0) {
                            for (var i = 0; i <= arr.length; i++) {
                                if (arr[i] != null) {
                                    // console.log("arr[i]---", type, " ", arr[i], " ", itemConfig.payload.label.label_en)
                                    var nodeDataModelingList = arr[i].payload.nodeDataMap[this.state.selectedScenario][0].nodeDataModelingList;
                                    // console.log("nodeDataModelingList---", type, " ", nodeDataModelingList, " ", itemConfig.payload.label.label_en)
                                    if (nodeDataModelingList.length > 0) {
                                        var nodedata = nodeDataModelingList.filter(x => x.transferNodeDataId == itemConfig.payload.nodeDataMap[this.state.selectedScenario][0].nodeDataId)[0];
                                        // console.log("nodedata---", type, " ", nodedata, " ", itemConfig.payload.label.label_en)
                                        if (nodedata != null && nodedata != "") {
                                            // console.log("nodedata result---", type, " ", itemConfig.payload.label.label_en)
                                            result = true;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return result;
            }
            else {
                if (itemConfig.payload.nodeType.id == 1 || itemConfig.payload.nodeType.id == 2) {
                    if (type == 1) {
                        return addCommasTwoDecimal(Number((itemConfig.payload.nodeDataMap[scenarioId])[0].displayDataValue).toFixed(2));
                    } else if (type == 3) {
                        // console.log("get payload 2");
                        var childList = this.state.items.filter(c => c.parent == itemConfig.id && (c.payload.nodeType.id == 3 || c.payload.nodeType.id == 4 || c.payload.nodeType.id == 5));
                        // console.log("Child List+++", childList);
                        if (childList.length > 0) {
                            var sum = 0;
                            childList.map(c => {
                                sum += Number((c.payload.nodeDataMap[scenarioId])[0].displayDataValue)
                            })
                            return sum.toFixed(2);
                        } else {
                            // console.log("get payload 3");
                            return "";
                        }
                    } else {
                        // console.log("get payload 4");
                        return "";
                    }
                } else {
                    if (type == 1) {
                        // console.log("get payload 5", (itemConfig.payload.nodeDataMap[scenarioId])[0].fuNode);
                        if (itemConfig.payload.nodeType.id == 4) {
                            var usageType = (itemConfig.payload.nodeDataMap[scenarioId])[0].fuNode.usageType.id;
                            var val = (itemConfig.payload.nodeDataMap[scenarioId])[0].fuPerMonth;
                            var val1 = "/" + 'Month';
                            var val2 = ", ";
                            if (usageType == 1) {
                                var usagePeriodId;
                                var usageTypeId;
                                var usageFrequency;
                                var nodeTypeId = itemConfig.payload.nodeType.id;
                                var scenarioId = this.state.selectedScenario;
                                var repeatUsagePeriodId;
                                var oneTimeUsage;
                                if (nodeTypeId == 5) {
                                } else {
                                    usageTypeId = (itemConfig.payload.nodeDataMap[scenarioId])[0].fuNode.usageType.id;
                                    // console.log("usageTypeId 4---", usageTypeId);
                                    if (usageTypeId == 1) {
                                        oneTimeUsage = (itemConfig.payload.nodeDataMap[scenarioId])[0].fuNode.oneTimeUsage;
                                    }
                                    if (usageTypeId == 2 || (oneTimeUsage != null && oneTimeUsage !== "" && oneTimeUsage.toString() == "false")) {
                                        usagePeriodId = (itemConfig.payload.nodeDataMap[scenarioId])[0].fuNode.usagePeriod.usagePeriodId;
                                        // console.log("usagePeriodId 4---", usagePeriodId);
                                    }
                                    usageFrequency = (itemConfig.payload.nodeDataMap[scenarioId])[0].fuNode.usageFrequency != null ? (itemConfig.payload.nodeDataMap[scenarioId])[0].fuNode.usageFrequency.toString().replaceAll(",", "") : "";
                                    // console.log("usageFrequency 4---", usageFrequency);

                                }
                                // console.log("usagePeriodId dis---", usagePeriodId);
                                var noOfMonthsInUsagePeriod = 0;
                                if ((usagePeriodId != null && usagePeriodId != "") && (usageTypeId == 2 || (oneTimeUsage == "false" || oneTimeUsage == false))) {
                                    // console.log("inside if no fu");
                                    var convertToMonth = (this.state.usagePeriodList.filter(c => c.usagePeriodId == usagePeriodId))[0].convertToMonth;
                                    // console.log("convertToMonth dis---", convertToMonth);
                                    // console.log("repeat count---", (itemConfig.payload.nodeDataMap[scenarioId])[0].fuNode.repeatCount);

                                    if (usageTypeId == 2) {
                                        var div = (convertToMonth * usageFrequency);
                                        // console.log("duv---", div);
                                        if (div != 0) {
                                            noOfMonthsInUsagePeriod = usageFrequency / convertToMonth;
                                            // console.log("noOfMonthsInUsagePeriod---", noOfMonthsInUsagePeriod);
                                        }
                                    } else {
                                        // var noOfFUPatient = this.state.noOfFUPatient;
                                        var noOfFUPatient;
                                        if (itemConfig.payload.nodeType.id == 4) {
                                            noOfFUPatient = (itemConfig.payload.nodeDataMap[scenarioId])[0].fuNode.noOfForecastingUnitsPerPerson.toString().replaceAll(",", "") / (itemConfig.payload.nodeDataMap[scenarioId])[0].fuNode.noOfPersons.toString().replaceAll(",", "");
                                        } else {
                                            // console.log("--->>>>>>>>>>>>>>>>>>>>>>>>>>", (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode);
                                            noOfFUPatient = (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode.noOfForecastingUnitsPerPerson.toString().replaceAll(",", "") / (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode.noOfPersons.toString().replaceAll(",", "");
                                        }
                                        // console.log("no of fu patient---", noOfFUPatient);
                                        noOfMonthsInUsagePeriod = convertToMonth * usageFrequency * noOfFUPatient;
                                        // console.log("noOfMonthsInUsagePeriod---", noOfMonthsInUsagePeriod);
                                    }

                                    // console.log("repeat count a---", (itemConfig.payload.nodeDataMap[scenarioId])[0].fuNode.repeatCount);
                                    // console.log("convert to month a---", convertToMonth);
                                    // console.log("noOfMonthsInUsagePeriod a---", noOfMonthsInUsagePeriod);
                                    if (oneTimeUsage != "true" && oneTimeUsage != true && usageTypeId == 1) {
                                        // console.log("(this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode---", (itemConfig.payload.nodeDataMap[scenarioId])[0].fuNode);
                                        repeatUsagePeriodId = (itemConfig.payload.nodeDataMap[scenarioId])[0].fuNode.repeatUsagePeriod.usagePeriodId;
                                        // console.log("repeatUsagePeriodId for calc---", repeatUsagePeriodId);
                                        if (repeatUsagePeriodId != "") {
                                            convertToMonth = (this.state.usagePeriodList.filter(c => c.usagePeriodId == repeatUsagePeriodId))[0].convertToMonth;
                                        } else {
                                            convertToMonth = 0;
                                        }
                                    }
                                    var noFURequired = oneTimeUsage != "true" && oneTimeUsage != true ? (((itemConfig.payload.nodeDataMap[scenarioId])[0].fuNode.repeatCount != null ? ((itemConfig.payload.nodeDataMap[scenarioId])[0].fuNode.repeatCount).toString().replaceAll(",", "") : (itemConfig.payload.nodeDataMap[scenarioId])[0].fuNode.repeatCount) / convertToMonth) * noOfMonthsInUsagePeriod : noOfFUPatient;
                                    val = noFURequired;
                                    val1 = ""
                                    val2 = " * "
                                    // console.log("noFURequired---", noFURequired);

                                } else if (usageTypeId == 1 && oneTimeUsage != null && (oneTimeUsage == "true" || oneTimeUsage == true)) {
                                    // console.log("inside else if no fu");
                                    if (itemConfig.payload.nodeType.id == 4) {
                                        noFURequired = (itemConfig.payload.nodeDataMap[scenarioId])[0].fuNode.noOfForecastingUnitsPerPerson.toString().replaceAll(",", "");
                                        val = noFURequired;
                                        val1 = "";
                                        val2 = " * "
                                    } else {
                                        // console.log("--->>>>>>>>>>>>>>>>>>>>>>>>>>", (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode);
                                        noFURequired = (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode.noOfForecastingUnitsPerPerson.toString().replaceAll(",", "");
                                        val = noFURequired;
                                        val1 = "";
                                        val2 = " * "
                                    }
                                    // noOfMonthsInUsagePeriod = noOfFUPatient;
                                }

                            }
                            return addCommasTwoDecimal(Number((itemConfig.payload.nodeDataMap[scenarioId])[0].displayDataValue).toFixed(2)) + "% of parent" + val2 + (val < 0.01 ? addCommasThreeDecimal(Number(val).toFixed(3)) : addCommasTwoDecimal(Number(val).toFixed(2))) + val1;

                        } else if (itemConfig.payload.nodeType.id == 5) {
                            // console.log("payload get puNode---", (itemConfig.payload.nodeDataMap[scenarioId])[0]);
                            return addCommasTwoDecimal(Number((itemConfig.payload.nodeDataMap[scenarioId])[0].displayDataValue).toFixed(2)) + "% of parent, conversion = " + (itemConfig.payload.nodeDataMap[scenarioId])[0].puNode.planningUnit.multiplier;
                        } else {
                            return addCommasTwoDecimal(Number((itemConfig.payload.nodeDataMap[scenarioId])[0].displayDataValue).toFixed(2)) + "% of parent";
                        }

                    } else if (type == 3) {
                        // console.log("get payload 6");
                        var childList = this.state.items.filter(c => c.parent == itemConfig.id && (c.payload.nodeType.id == 3 || c.payload.nodeType.id == 4 || c.payload.nodeType.id == 5));
                        // console.log("Child List my+++", childList);
                        if (childList.length > 0) {
                            var sum = 0;
                            childList.map(c => {
                                // console.log("childList 2---", childList);
                                // console.log("child scenarioId 2---",(c.payload.nodeDataMap[scenarioId])[0] != null);
                                // console.log("child 2---", c.payload.label.label_en, "map---", c.payload);
                                sum += Number(c.payload.nodeDataMap.hasOwnProperty(scenarioId) ? (c.payload.nodeDataMap[scenarioId])[0].displayDataValue : 0)
                            })
                            return sum.toFixed(2);
                        } else {
                            // console.log("get payload 7");
                            return "";
                        }
                    } else {
                        // console.log("get payload 8");
                        return "= " + ((itemConfig.payload.nodeDataMap[scenarioId])[0].displayCalculatedDataValue != null ? addCommasTwoDecimal(Number((itemConfig.payload.nodeDataMap[scenarioId])[0].displayCalculatedDataValue).toFixed(2)) : "");
                    }
                }
            }
        } else {
            // console.log("get payload 1111");
            return "";
        }
    }

    exportDoc() {
        // console.log("This.state.items +++", this.state.items);
        var item1 = this.state.items;
        var sortOrderArray = [...new Set(item1.map(ele => (ele.sortOrder)))];
        var sortedArray = sortOrderArray.sort();
        var items = [];
        for (var i = 0; i < sortedArray.length; i++) {
            items.push(item1.filter(c => c.sortOrder == sortedArray[i])[0]);
        }
        // console.log("Items+++", items);
        var dataArray = [];
        dataArray.push(new Paragraph({
            children: [new TextRun({ "text": "Tree Validation", bold: true, size: 30 })],
            spacing: {
                after: 150,
            },
        }));
        dataArray.push(new Paragraph({
        }));

        dataArray.push(new Paragraph({
            children: [new TextRun({ "text": i18n.t('static.supplyPlan.runDate') + " : ", bold: true }), new TextRun({ "text": moment(new Date()).format(`${DATE_FORMAT_CAP}`) })],
            spacing: {
                after: 150,
            },
        }));
        dataArray.push(new Paragraph({
            children: [new TextRun({ "text": i18n.t('static.supplyPlan.runTime') + " : ", bold: true }), new TextRun({ "text": moment(new Date()).format('hh:mm A') })],
            spacing: {
                after: 150,
            },
        }));
        dataArray.push(new Paragraph({
            children: [new TextRun({ "text": i18n.t('static.user.user') + " : ", bold: true }), new TextRun({ "text": AuthenticationService.getLoggedInUsername() })],
            spacing: {
                after: 150,
            },
        }));

        dataArray.push(new Paragraph({
            children: [new TextRun({ "text": i18n.t('static.consumption.program') + " : ", bold: true }), new TextRun({ "text": document.getElementById("datasetId").selectedOptions[0].text })],
            spacing: {
                after: 150,
            },
        }));
        dataArray.push(new Paragraph({
            children: [new TextRun({ "text": i18n.t('static.forecastMethod.tree') + " : ", bold: true }), new TextRun({ "text": document.getElementById("treeId").selectedOptions[0].text })],
            spacing: {
                after: 150,
            },
        }));
        dataArray.push(new Paragraph({
            children: [new TextRun({ "text": i18n.t('static.whatIf.scenario') + " : ", bold: true }), new TextRun({ "text": document.getElementById("scenarioId").selectedOptions[0].text })],
            spacing: {
                after: 150,
            },
        }));
        dataArray.push(new Paragraph({
            children: [new TextRun({ "text": i18n.t('static.supplyPlan.date') + " : ", bold: true }), new TextRun({ "text": this.makeText(this.state.singleValue2) })],
            spacing: {
                after: 150,
            },
        }));
        dataArray.push(new Paragraph({
        }));

        for (var i = 0; i < items.length; i++) {
            var row = "";
            var row1 = "";
            var level = items[i].level;
            for (var j = 1; j <= level; j++) {
                // row = row.concat("\t");
            }
            if (items[i].payload.nodeType.id == 1 || items[i].payload.nodeType.id == 2) {
                row = row.concat(addCommas(this.getPayloadData(items[i], 1)))
                row1 = row1.concat(" ").concat(items[i].payload.label.label_en)
            } else {
                row = row.concat(this.getPayloadData(items[i], 1)).concat(" ").concat(this.getPayloadData(items[i], 2))
                row1 = row1.concat(" ").concat(items[i].payload.label.label_en)
            }
            dataArray.push(new Paragraph({
                children: [new TextRun({ "text": row, bold: true }), new TextRun({ "text": row1 })],
                spacing: {
                    after: 150,
                },
                indent: { left: convertInchesToTwip(0.5 * level) },
            }));
            if (i != 0) {
                var filteredList = this.state.items.filter(c => c.sortOrder > items[i].sortOrder && c.parent == items[i].parent);
                if (filteredList.length == 0) {
                    var dataFilter = this.state.items.filter(c => c.level == items[i].level);
                    var total = 0;
                    dataFilter.filter(c => c.parent == items[i].parent).map(item => {
                        total += Number((item.payload.nodeDataMap[this.state.selectedScenario])[0].dataValue)
                    })
                    var parentName = this.state.items.filter(c => c.id == items[i].parent)[0].payload.label.label_en;
                    var row = "";
                    var row1 = "";
                    var row3 = "";
                    var row4 = parentName;
                    for (var j = 1; j <= items[i].level; j++) {
                        // row3 = row3.concat("\t");
                    }
                    if (items[i].payload.nodeType.id == 1 || items[i].payload.nodeType.id == 2) {
                        row = row.concat("NA ")
                        row1 = row1.concat(" Subtotal")
                    } else {
                        row = row.concat(total).concat("% ")
                        row1 = row1.concat(" Subtotal")
                    }
                    if (items[i].payload.nodeType.id != 1 && items[i].payload.nodeType.id != 2) {
                        dataArray.push(new Paragraph({
                            children: [new TextRun({ "text": row3 }), new TextRun({ "text": row, bold: true }), new TextRun({ "text": row4 }), new TextRun({ "text": row1 })],
                            spacing: {
                                after: 150,
                            },
                            shading: {
                                type: ShadingType.CLEAR,
                                fill: "cfcdc9"
                            },
                            style: row != "NA " ? total != 100 ? "aside" : "" : "",
                            indent: { left: convertInchesToTwip(0.5 * items[i].level) },
                        }))
                    }
                }
            }
        }
        const doc = new Document({
            sections: [
                {
                    children: dataArray
                }
            ],
            styles: {
                paragraphStyles: [
                    {
                        id: "aside",
                        name: "aside",
                        run: {
                            color: "BA0C2F",
                        },
                    },
                ]
            }
        });

        Packer.toBlob(doc).then(blob => {
            saveAs(blob, this.state.dataSetObj.programData.programCode + "-" + i18n.t("static.supplyPlan.v") + this.state.dataSetObj.programData.currentVersion.versionId + "-" + i18n.t('static.common.managetree') + "-" + "TreeValidation" + "-" + document.getElementById("treeId").selectedOptions[0].text + "-" + document.getElementById("scenarioId").selectedOptions[0].text + ".docx");
        });
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen,
        });
    }

    getDatasetList() {
        // console.log("get dataset list program id---", this.state.programId);
        this.setState({ loading: true });
        var db1;
        getDatabase();
        var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var transaction, program;
            if (this.props.match.params.isLocal == 2) {
                transaction = db1.transaction(['datasetDataServer'], 'readwrite');
                program = transaction.objectStore('datasetDataServer');
            } else {
                transaction = db1.transaction(['datasetData'], 'readwrite');
                program = transaction.objectStore('datasetData');
            }
            var getRequest = program.getAll();

            getRequest.onerror = function (event) {
                // Handle errors!
            };
            getRequest.onsuccess = function (event) {
                var myResult = [];
                myResult = getRequest.result;
                // console.log("length---", this.state.programId != null ? "hi" : "hello");
                this.setState({
                    datasetList: myResult,
                    programId: this.state.programId != null ? this.state.programId : (myResult.length == 1 ? myResult[0].id : "")
                }, () => {
                    // console.log("my datasetList --->", this.state.datasetList);
                    // console.log("my datasetList program--->", this.state.programId);
                    var dataSetObj = this.state.datasetList.filter(c => c.id == this.state.programId)[0];
                    // console.log("dataSetObj---", dataSetObj);
                    if (dataSetObj != null) {
                        var dataEnc = JSON.parse(JSON.stringify(dataSetObj));

                        var databytes = CryptoJS.AES.decrypt(dataSetObj.programData, SECRET_KEY);
                        // console.log("decryptedDataset---", databytes);
                        var programData = JSON.parse(databytes.toString(CryptoJS.enc.Utf8));
                        dataEnc.programData = programData;
                        var minDate = { year: Number(moment(programData.currentVersion.forecastStartDate).startOf('month').format("YYYY")), month: Number(moment(programData.currentVersion.forecastStartDate).startOf('month').format("M")) };
                        var maxDate = { year: Number(moment(programData.currentVersion.forecastStopDate).startOf('month').format("YYYY")), month: Number(moment(programData.currentVersion.forecastStopDate).startOf('month').format("M")) };
                        var forecastPeriod = moment(programData.currentVersion.forecastStartDate).format(`MMM-YYYY`) + " ~ " + moment(programData.currentVersion.forecastStopDate).format(`MMM-YYYY`);
                        // console.log("forecastPeriod 1---", forecastPeriod);
                        // console.log("dataSetObj.programData***>>>", dataEnc);
                        this.setState({
                            dataSetObj: dataEnc, minDate, maxDate,
                            forecastStartDate: programData.currentVersion.forecastStartDate,
                            forecastStopDate: programData.currentVersion.forecastStopDate, forecastPeriod,
                            singleValue2: { year: new Date(programData.currentVersion.forecastStartDate.replace(/-/g, '\/')).getFullYear(), month: new Date(programData.currentVersion.forecastStartDate.replace(/-/g, '\/')).getMonth() + 1 },
                            showDate: true
                        }, () => {
                            this.fetchTracerCategoryList(programData);
                            var tree = programData.treeList.filter(c => c.treeId == this.state.treeId)[0];
                            if (tree != null && tree.generateMom == 1) {
                                // console.log("Inside generate MOM if condition");
                                this.calculateMOMData(0, 2);
                            } else {
                                this.setState({ loading: false })
                            }
                        });
                    } else {
                        this.setState({ loading: false })
                    }






                });
                // for (var i = 0; i < myResult.length; i++) {
                //     // console.log("datasetList--->", myResult[i])

                // }

            }.bind(this);
        }.bind(this);
    }

    exportPDF = () => {
        let treeLevel = this.state.items.length;
        var treeLevelItems = [];
        var treeLevels = this.state.curTreeObj.forecastMethod.id != "" && this.state.curTreeObj.levelList != undefined ? this.state.curTreeObj.levelList : [];
        for (var i = 0; i <= treeLevel; i++) {
            var treeLevelFiltered = treeLevels.filter(c => c.levelNo == i);
            if (i == 0) {
                treeLevelItems.push({
                    annotationType: AnnotationType.Level,
                    levels: [0],
                    title: treeLevelFiltered.length > 0 ? getLabelText(treeLevelFiltered[0].label, this.state.lang) : "Level 0",
                    titleColor: "#002f6c",
                    fontWeight: "bold",
                    transForm: 'rotate(270deg)',
                    offset: new Thickness(0, 0, 0, -1),
                    lineWidth: new Thickness(0, 0, 0, 0),
                    opacity: 0,
                    borderColor: Colors.Gray,
                    // fillColor: "#f5f5f5",
                    lineType: LineType.Dotted
                });
            }
            else if (i % 2 == 0) {
                treeLevelItems.push(new LevelAnnotationConfig({
                    levels: [i],
                    title: treeLevelFiltered.length > 0 ? getLabelText(treeLevelFiltered[0].label, this.state.lang) : "Level " + i,
                    titleColor: "#002f6c",
                    fontWeight: "bold",
                    transForm: 'rotate(270deg)',
                    offset: new Thickness(0, 0, 0, -1),
                    lineWidth: new Thickness(0, 0, 0, 0),
                    opacity: 0,
                    borderColor: Colors.Gray,
                    // fillColor: "#f5f5f5",
                    lineType: LineType.Solid
                })
                );
            }
            else {
                treeLevelItems.push(new LevelAnnotationConfig({
                    levels: [i],
                    title: treeLevelFiltered.length > 0 ? getLabelText(treeLevelFiltered[0].label, this.state.lang) : "Level " + i,
                    titleColor: "#002f6c",
                    fontWeight: "bold",
                    transForm: 'rotate(270deg)',
                    offset: new Thickness(0, 0, 0, -1),
                    lineWidth: new Thickness(0, 0, 0, 0),
                    opacity: 0.08,
                    borderColor: Colors.Gray,
                    // fillColor: "#f5f5f5",
                    lineType: LineType.Dotted
                }));
            }
            // console.log("level json***", treeLevelItems);
        }

        var templates = [
            {
                itemSize: new Size(200, 110)
            }
        ]
        var items1 = this.state.items;
        var newItems = [];
        for (var i = 0; i < items1.length; i++) {
            var e = items1[i];
            e.scenarioId = this.state.selectedScenario
            e.showModelingValidation = this.state.showModelingValidation
            // console.log("1------------------->>>>", this.getPayloadData(items1[i], 4))
            // console.log("2------------------->>>>", this.getPayloadData(items1[i], 3))
            e.result = this.getPayloadData(items1[i], 4)//Up
            e.result1 = this.getPayloadData(items1[i], 6)//Down
            e.result2 = this.getPayloadData(items1[i], 5)//Link
            var text = this.getPayloadData(items1[i], 3)
            e.text = text;
            delete e.templateName;
            newItems.push(e)
        }
        // console.log("newItems---", newItems);
        var sampleChart = new OrgDiagramPdfkit({
            ...this.state,
            pageFitMode: PageFitMode.Enabled,
            hasSelectorCheckbox: Enabled.False,
            hasButtons: Enabled.True,
            buttonsPanelSize: 40,
            orientationType: OrientationType.Top,
            defaultTemplateName: "ContactTemplate",
            linesColor: Colors.Black,
            annotations: treeLevelItems,
            items: newItems,
            templates: (templates || [])
        });
        var sample3size = sampleChart.getSize();
        var doc = new PDFDocument({ size: 'B0' });
        var stream = doc.pipe(blobStream());

        var legalSize = { width: 2834.65, height: 4008.19 }
        var scale = Math.min(legalSize.width / (sample3size.width + 300), legalSize.height / (sample3size.height + 300))
        doc.scale(scale);
        doc
            .fillColor('#002f6c')
            .fontSize(20)
            .font('Helvetica')
            .text('Tree PDF', doc.page.width / 2, 20);

        doc
            .fillColor('#002f6c')
            .fontSize(12)
            .font('Helvetica')
            .text(i18n.t('static.supplyPlan.runDate') + " " + moment(new Date()).format(`${DATE_FORMAT_CAP}`), 30, 40);

        doc
            .fillColor('#002f6c')
            .fontSize(12)
            .font('Helvetica')
            .text(i18n.t('static.supplyPlan.runTime') + " " + moment(new Date()).format('hh:mm A'), 30, 55);

        doc
            .fillColor('#002f6c')
            .fontSize(12)
            .font('Helvetica')
            .text(i18n.t('static.user.user') + ': ' + AuthenticationService.getLoggedInUsername(), 30, 70);

        doc
            .fillColor('#002f6c')
            .fontSize(12)
            .font('Helvetica')
            .text(getLabelText(this.state.dataSetObj.programData.label, this.state.lang), 30, 85, {
                width: 780,
            });

        doc
            .fillColor('#002f6c')
            .fontSize(12)
            .font('Helvetica')
            .text(i18n.t('static.consumption.program') + ': ' + document.getElementById("datasetId").selectedOptions[0].text, 30, 100);

        doc
            .fillColor('#002f6c')
            .fontSize(12)
            .font('Helvetica')
            .text(i18n.t('static.forecastMethod.tree') + ': ' + document.getElementById("treeId").selectedOptions[0].text, 30, 115);

        doc
            .fillColor('#002f6c')
            .fontSize(12)
            .font('Helvetica')
            .text(i18n.t('static.whatIf.scenario') + ': ' + document.getElementById("scenarioId").selectedOptions[0].text, 30, 130);
        doc
            .fillColor('#002f6c')
            .fontSize(12)
            .font('Helvetica')
            .text(i18n.t('static.tree.displayDate') + "(" + i18n.t('static.consumption.forcast') + ": " + this.state.forecastPeriod + ")" + ': ' + this.makeText(this.state.singleValue2), 30, 145);


        sampleChart.draw(doc, 60, 180);

        doc.restore();

        doc.end();

        if (typeof stream !== 'undefined') {
            // var nodeUnit = document.getElementById("nodeUnitId");
            // var selectedText = nodeUnit.options[nodeUnit.selectedIndex].text;
            stream.on('finish', function () {
                var string = stream.toBlob('application/pdf');
                window.saveAs(string, this.state.dataSetObj.programData.programCode + "-" + i18n.t("static.supplyPlan.v") + this.state.dataSetObj.programData.currentVersion.versionId + "-" + i18n.t('static.common.managetree') + "-" + document.getElementById("treeId").selectedOptions[0].text + "-" + document.getElementById("scenarioId").selectedOptions[0].text + ".pdf");
            }.bind(this));
        } else {
            alert('Error: Failed to create file stream.');
        }
        newItems = [];
        for (var i = 0; i < items1.length; i++) {
            var e = items1[i];
            e.scenarioId = this.state.selectedScenario
            e.showModelingValidation = this.state.showModelingValidation
            // console.log("1------------------->>>>", this.getPayloadData(items1[i], 4))
            // console.log("2------------------->>>>", this.getPayloadData(items1[i], 3))
            e.result = this.getPayloadData(items1[i], 4)//Up
            e.result1 = this.getPayloadData(items1[i], 6)//Down
            e.result2 = this.getPayloadData(items1[i], 5)//Link
            var text = this.getPayloadData(items1[i], 3)
            e.text = text;
            if (items1[i].expanded)
                e.templateName = "contactTemplateMin";
            else
                e.templateName = "contactTemplate";
            newItems.push(e)
        }

    }
    handleRegionChange = (regionIds) => {
        // console.log("regionIds---", regionIds);
        const { curTreeObj } = this.state;

        this.setState({
            regionValues: regionIds.map(ele => ele),
            regionLabels: regionIds.map(ele => ele.label),
            isTreeDataChanged: true
        }, () => {
            // console.log("regionValues---", this.state.regionValues);
            // console.log("regionLabels---", this.state.regionLabels);
            // if ((this.state.regionValues).length > 0) {
            var regionList = [];
            var regions = this.state.regionValues;
            // console.log("regions---", regions)
            for (let i = 0; i < regions.length; i++) {
                var json = {
                    id: regions[i].value,
                    label: {
                        label_en: regions[i].label
                    }
                }
                regionList.push(json);
            }
            // console.log("final regionList---", regionList);
            curTreeObj.regionList = regionList;
            this.setState({ curTreeObj });
            // }
        })
    }

    handleFUChange = (regionIds) => {
        // console.log("regionIds---", regionIds);
        const { currentItemConfig } = this.state;

        this.setState({
            fuValues: regionIds != null ? regionIds : "",
            isChanged: true
            // fuLabels: regionIds != null ? regionIds.label : ""
        }, () => {
            if (regionIds != null) {
                currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].fuNode.forecastingUnit.id = regionIds.value;
                currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].fuNode.forecastingUnit.label.label_en = regionIds.label.split("|")[0];
                if (currentItemConfig.context.payload.label.label_en == "" || currentItemConfig.context.payload.label.label_en == null) {
                    currentItemConfig.context.payload.label.label_en = (regionIds.label.split("|")[0]).trim();
                }
                // var filteredPlanningUnitList = this.state.planningUnitList.filter(x => x.forecastingUnit.id == regionIds.value);
                this.setState({ showFUValidation: false }, () => {
                    this.getForecastingUnitUnitByFUId(regionIds.value);
                    this.getPlanningUnitListByFUId(regionIds.value);
                    this.filterUsageTemplateList(0, regionIds.value);
                });
            } else {
                currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].fuNode.forecastingUnit.id = "";
                currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].fuNode.forecastingUnit.label.label_en = "";
                this.setState({ showFUValidation: true, planningUnitList: [] }, () => {
                    this.filterUsageTemplateList(0, 0);
                });
            }

            this.setState({ currentItemConfig });
        })
    }
    getTreeTemplateById(treeTemplateId) {
        var db1;
        getDatabase();
        var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var transaction = db1.transaction(['treeTemplate'], 'readwrite');
            var program = transaction.objectStore('treeTemplate');
            var getRequest = program.getAll();

            getRequest.onerror = function (event) {
                // Handle errors!
            };
            getRequest.onsuccess = function (event) {
                var myResult = [];
                myResult = getRequest.result;
                // console.log("tree template myresult---", myResult)
                const { treeData } = this.state;
                var treeTemplate = myResult.filter(x => x.treeTemplateId == treeTemplateId)[0];
                // console.log("matched tree template---", treeTemplate);
                // var tempArray = [];
                // var tempJson = treeTemplate.payload.nodeDataMap[0][0];
                // tempArray.push(tempJson);
                // nodeDataMap[1] = tempArray;
                var flatList = treeTemplate.flatList;
                for (let i = 0; i < flatList.length; i++) {
                    var nodeDataMap = {};
                    var tempArray = [];
                    // var nodeDataMap[1] = flatList.payload.nodeDataMap[0][0];
                    // console.log("flatList[i]---", flatList[i]);
                    var tempJson = flatList[i].payload.nodeDataMap[0][0];
                    tempArray.push(tempJson);
                    nodeDataMap[1] = tempArray;
                    flatList[i].payload.nodeDataMap = nodeDataMap;
                }
                // console.log("flat list--->", flatList);
                var maxTreeId = treeData.length > 0 ? Math.max(...treeData.map(o => o.treeId)) : 0;
                var treeId = parseInt(maxTreeId) + 1;
                var tempTree = {
                    treeId: treeId,
                    active: treeTemplate.active,
                    forecastMethod: treeTemplate.forecastMethod,
                    label: treeTemplate.label,
                    notes: treeTemplate.notes,
                    regionList: [],
                    scenarioList: [{
                        id: 1,
                        label: {
                            label_en: i18n.t('static.realm.default')
                        },
                        active: true,
                        notes: ''
                    }],
                    tree: {
                        flatList: flatList
                    }
                }
                treeData.push(tempTree);
                // console.log("tempTree template---", tempTree);
                this.setState({
                    treeData,
                    treeId,
                    treeTemplateObj: tempTree
                }, () => {
                    this.getTreeByTreeId(treeId);
                    // this.updateTreeData(moment(new Date()).format("YYYY-MM-DD"));
                    // console.log("tree template obj---", this.state.treeData)

                });
                // for (var i = 0; i < myResult.length; i++) {
                //     // console.log("treeTemplateList--->", myResult[i])

                // }

            }.bind(this);
        }.bind(this);
    }

    getTreeByTreeId(treeId) {
        // console.log("treeId---", treeId)
        if (treeId != "" && treeId != null && treeId != 0) {
            // console.log("tree data---", this.state.treeData);
            var curTreeObj = this.state.treeData.filter(x => x.treeId == treeId)[0];
            // console.log("curTreeObj---", curTreeObj)
            var regionValues = (curTreeObj.regionList) != null && (curTreeObj.regionList).map((item, i) => {
                return ({ label: getLabelText(item.label, this.state.lang), value: item.id })

            }, this);
            // console.log("regionValues--->>>>", regionValues);
            var tempToggleObject = [];
            if (curTreeObj.tree.flatList.length > 0) {
                tempToggleObject = curTreeObj.tree.flatList.filter(item =>
                    (item.payload.collapsed == true)
                );
            }
            let tempToggleList = tempToggleObject.map(item => item.id);

            var curTreeObj1 = curTreeObj.tree.flatList.map(item => {
                if (tempToggleList.includes(item.id))
                    return { ...item, templateName: "contactTemplateMin", expanded: true }
                return { ...item, templateName: "contactTemplate", expanded: false }
            })
            if (Array.from(new Set(tempToggleList)).length + 1 >= curTreeObj.tree.flatList.length) {
                var parentNode = curTreeObj.tree.flatList.filter(item =>
                    (item.parent == null)
                );
                tempToggleList.push(parentNode[0].id)
                this.setState({ collapseState: true })
            } else {
                this.setState({ collapseState: false })
            }
            this.setState({ toggleArray: tempToggleList });
            curTreeObj.tree.flatList = curTreeObj1;

            this.setState({
                curTreeObj,
                scenarioList: curTreeObj.scenarioList.filter(x => x.active == true),
                regionValues
                // selectedScenario:0
            }, () => {
                if (curTreeObj.scenarioList.length == 1) {
                    var scenarioId = curTreeObj.scenarioList[0].id;
                    var selectedText = curTreeObj.scenarioList[0].label.label_en;
                    this.setState({
                        selectedScenario: scenarioId,
                        selectedScenarioLabel: selectedText,
                        currentScenario: []
                    }, () => {
                        // console.log("@@@---", this.state.selectedScenario);
                        this.callAfterScenarioChange(scenarioId);
                    });
                } else if (this.props.match.params.scenarioId != null && this.props.match.params.scenarioId != "") {
                    var scenarioId = this.props.match.params.scenarioId;
                    var selectedText = curTreeObj.scenarioList.filter(x => x.id == scenarioId)[0].label.label_en;
                    this.setState({
                        selectedScenario: scenarioId,
                        selectedScenarioLabel: selectedText,
                        currentScenario: []
                    }, () => {
                        // console.log("@@@---", this.state.selectedScenario);
                        this.callAfterScenarioChange(scenarioId);
                    });
                }
                // console.log("my items--->", this.state.items);
            });
        } else {
            this.setState({
                curTreeObj: {
                    forecastMethod: { id: "" },
                    label: { label_en: '' },
                    notes: '',
                    regionList: [],
                    active: true
                },
                scenarioList: [],
                // regionList: [],
                items: [],
                selectedScenario: ''
            });
        }
    }

    getScenarioList() {

    }

    getTreeList() {
        var proList = [];
        var db1;
        getDatabase();
        var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var transaction, program;
            // console.log("isLocal---", this.props.match.params);
            if (this.props.match.params.isLocal == 2) {
                transaction = db1.transaction(['datasetDataServer'], 'readwrite');
                program = transaction.objectStore('datasetDataServer');
            } else {
                transaction = db1.transaction(['datasetData'], 'readwrite');
                program = transaction.objectStore('datasetData');
            }
            var getRequest = program.getAll();

            getRequest.onerror = function (event) {
                // Handle errors!
            };
            getRequest.onsuccess = function (event) {
                var myResult = [];
                myResult = getRequest.result;
                var userBytes = CryptoJS.AES.decrypt(localStorage.getItem('curUser'), SECRET_KEY);
                var userId = userBytes.toString(CryptoJS.enc.Utf8);
                // console.log("userId---", userId);
                // console.log("myResult.length---", myResult.length);
                var realmCountryId = "";
                var programDataListForPuCheck = [];
                if (this.state.programId != null && this.state.programId != "") {
                    // console.log("inside if condition-------------------->", this.state.programId);
                    var dataSetObj = myResult.filter(c => c.id == this.state.programId)[0];
                    // console.log("dataSetObj tree>>>", dataSetObj);
                    var databytes = CryptoJS.AES.decrypt(dataSetObj.programData, SECRET_KEY);
                    var programData = JSON.parse(databytes.toString(CryptoJS.enc.Utf8));
                    programDataListForPuCheck.push({ "programData": programData, "id": dataSetObj.id });
                    realmCountryId = programData.realmCountry.realmCountryId;
                    var treeList = programData.treeList;
                    for (var k = 0; k < treeList.length; k++) {
                        proList.push(treeList[k])
                    }
                    this.setState({
                        singleValue2: { year: new Date(programData.currentVersion.forecastStartDate.replace(/-/g, '\/')).getFullYear(), month: new Date(programData.currentVersion.forecastStartDate.replace(/-/g, '\/')).getMonth() + 1 }
                    })
                } else {
                    // console.log("inside else condition-------------------->");
                    for (var i = 0; i < myResult.length; i++) {
                        // console.log("inside for---", myResult[i]);
                        if (myResult[i].userId == userId) {
                            // console.log("inside if---");
                            var databytes = CryptoJS.AES.decrypt(myResult[i].programData, SECRET_KEY);
                            var programData = JSON.parse(databytes.toString(CryptoJS.enc.Utf8));
                            programDataListForPuCheck.push({ "programData": programData, "id": myResult[i].id });
                            // console.log("programData--->>>>>>>>>>>>>>>>>>>>>>", programData);
                            var treeList = programData.treeList;
                            for (var k = 0; k < treeList.length; k++) {
                                proList.push(treeList[k])
                            }
                        }
                    }
                }
                // console.log("pro list---", proList);
                var tempToggleObject = [];
                if (proList.length > 0) {
                    tempToggleObject = proList[0].tree.flatList.filter(item =>
                        (item.payload.collapsed == true)
                    );
                }
                let tempToggleList = tempToggleObject.map(item => item.id);
                if (proList.length > 0) {
                    proList.sort((a, b) => {
                        var itemLabelA = getLabelText(a.label, this.state.lang).toUpperCase(); // ignore upper and lowercase
                        var itemLabelB = getLabelText(b.label, this.state.lang).toUpperCase(); // ignore upper and lowercase                   
                        return itemLabelA > itemLabelB ? 1 : -1;
                    });
                }
                let proList1 = [];
                if (proList.length > 0) {
                    proList1 = proList[0].tree.flatList.map(item => {
                        if (tempToggleList.includes(item.id))
                            return { ...item, templateName: "contactTemplateMin", expanded: true }
                        return { ...item, templateName: "contactTemplate" }
                    })
                    proList[0].tree.flatList = proList1;
                }
                this.setState({
                    realmCountryId,
                    treeData: proList,
                    toggleArray: tempToggleList,
                    programDataListForPuCheck: programDataListForPuCheck
                }, () => {
                    // console.log("tree data --->", this.state.treeData);
                    if (this.state.treeId != "" && this.state.treeId != 0) {
                        this.getTreeByTreeId(this.state.treeId);
                    }
                    this.getTreeTemplateById(this.props.match.params.templateId);
                });

            }.bind(this);
        }.bind(this);
    }
    getConversionFactor(planningUnitId) {
        // console.log("planningUnitId cf ---", planningUnitId);
        var pu = (this.state.updatedPlanningUnitList.filter(c => c.planningUnitId == planningUnitId))[0];
        // console.log("pu---", pu)
        // (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].puNode.planningUnit.id = event.target.value;
        this.setState({
            conversionFactor: pu.multiplier
        });
    }

    getNodeTypeFollowUpList(nodeTypeId) {
        // console.log("get node type follow up list---", nodeTypeId);
        var nodeType;
        var nodeTypeList = [];
        if (nodeTypeId != 0) {
            nodeType = this.state.nodeTypeList.filter(c => c.id == nodeTypeId)[0];
            // console.log("node type obj--->", nodeType);
            for (let i = 0; i < nodeType.allowedChildList.length; i++) {
                // console.log("allowed value---", nodeType.allowedChildList[i]);
                var obj = this.state.nodeTypeList.filter(c => c.id == nodeType.allowedChildList[i])[0];
                nodeTypeList.push(obj);
            }
            // if (nodeTypeList.length == 1) {
            //     this.state.currentItemConfig.context.payload.nodeType.id=nodeTypeList.
            // }
            // console.log("final nodeTypeList if---", nodeTypeList);
        } else {
            nodeType = this.state.nodeTypeList.filter(c => c.id == 1)[0];
            nodeTypeList.push(nodeType);
            nodeType = this.state.nodeTypeList.filter(c => c.id == 2)[0];
            nodeTypeList.push(nodeType);
            // console.log("final nodeTypeList else---", nodeTypeList);
        }
        this.setState({
            nodeTypeFollowUpList: nodeTypeList
        }, () => {
            if (nodeTypeList.length == 1) {
                const currentItemConfig = this.state.currentItemConfig;
                currentItemConfig.context.payload.nodeType.id = nodeTypeList[0].id;
                this.setState({
                    currentItemConfig: currentItemConfig
                }, () => {
                    this.nodeTypeChange(nodeTypeList[0].id);
                    if (nodeTypeList[0].id == 5) {
                        this.getNoOfMonthsInUsagePeriod();
                        this.getNoFURequired();
                    }
                })
            } else {
                // const currentItemConfig = this.state.currentItemConfig;
                // currentItemConfig.context.payload.nodeType.id = "";

                // this.setState({
                //     currentItemConfig: currentItemConfig

                // }, () => {

                // })
            }
        });
    }

    getNodeTyeList() {
        var db1;
        getDatabase();
        var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var transaction = db1.transaction(['nodeType'], 'readwrite');
            var program = transaction.objectStore('nodeType');
            var getRequest = program.getAll();

            getRequest.onerror = function (event) {
                // Handle errors!
            };
            getRequest.onsuccess = function (event) {
                var myResult = [];
                myResult = getRequest.result;
                this.setState({
                    nodeTypeList: myResult
                });
                for (var i = 0; i < myResult.length; i++) {
                    // console.log("node type--->", myResult[i])

                }

            }.bind(this);
        }.bind(this);
    }

    duplicateNode(itemConfig) {
        // console.log("duplicate node called 1---", this.state.currentItemConfig);
        // console.log("duplicate node called 2---", itemConfig);
        var items1 = this.state.items;
        const { items } = this.state;
        var maxNodeDataId = this.getMaxNodeDataId();
        // console.log("initial maxNodeDataId---", maxNodeDataId);
        var childList = items1.filter(x => x.sortOrder.startsWith(itemConfig.sortOrder));
        var childListArr = [];
        var json;
        var sortOrder = itemConfig.sortOrder;
        // console.log("childList---", childList);
        var scenarioList = this.state.scenarioList;
        var childListBasedOnScenarion = [];
        for (let i = 0; i < childList.length; i++) {
            var child = JSON.parse(JSON.stringify(childList[i]));
            // console.log("child before---", child);
            var maxNodeId = items.length > 0 ? Math.max(...items.map(o => o.id)) : 0;
            // console.log("maxNodeId---", maxNodeId);
            var nodeId = parseInt(maxNodeId + 1);
            // console.log("nodeId---", nodeId);
            if (sortOrder == child.sortOrder) {
                child.payload.nodeId = nodeId;
                child.id = nodeId;
                var parentSortOrder = items.filter(c => c.id == itemConfig.parent)[0].sortOrder;
                var childList1 = items.filter(c => c.parent == itemConfig.parent);
                var maxSortOrder = childList1.length > 0 ? Math.max(...childList1.map(o => o.sortOrder.replace(parentSortOrder + '.', ''))) : 0;
                // console.log("max sort order2---", maxSortOrder);
                child.sortOrder = parentSortOrder.concat(".").concat(("0" + (Number(maxSortOrder) + 1)).slice(-2));
                json = {
                    oldId: itemConfig.id,
                    newId: nodeId,
                    oldSortOrder: itemConfig.sortOrder,
                    newSortOrder: child.sortOrder
                }
                childListArr.push(json);
            } else {
                // console.log("childListArr---", childListArr + " child.parent---", child.parent);
                var parentNode = childListArr.filter(x => x.oldId == child.parent)[0];
                // console.log("parentNode---", parentNode)
                child.payload.nodeId = nodeId;
                var oldId = child.id;
                var oldSortOrder = child.sortOrder;
                child.id = nodeId;
                child.parent = parentNode.newId;
                child.payload.parentNodeId = child.parent;
                var parentSortOrder = parentNode.newSortOrder;
                var childList1 = items.filter(c => c.parent == parentNode.newId);
                var maxSortOrder = childList1.length > 0 ? Math.max(...childList1.map(o => o.sortOrder.replace(parentSortOrder + '.', ''))) : 0;
                // console.log("max sort order3---", maxSortOrder);
                child.sortOrder = parentSortOrder.concat(".").concat(("0" + (Number(maxSortOrder) + 1)).slice(-2));
                json = {
                    oldId: oldId,
                    newId: nodeId,
                    oldSortOrder: oldSortOrder,
                    newSortOrder: child.sortOrder
                }
                childListArr.push(json);
            }
            if (scenarioList.length > 0) {
                for (let i = 0; i < scenarioList.length; i++) {
                    childListBasedOnScenarion.push({
                        oldId: (child.payload.nodeDataMap[scenarioList[i].id])[0].nodeDataId,
                        newId: maxNodeDataId
                    });
                    (child.payload.nodeDataMap[scenarioList[i].id])[0].nodeDataId = maxNodeDataId;
                    maxNodeDataId++;
                }
            }
            // console.log("child after---", child);
            items.push(child);
            // childList.push(immidiateChilds[i]);
        }

        childListArr.map(item => {
            var indexItems = items.findIndex(i => i.id == item.newId);
            if (indexItems != -1) {
                for (let i = 0; i < scenarioList.length; i++) {
                    var nodeDataModelingList = (items[indexItems].payload.nodeDataMap[scenarioList[i].id])[0].nodeDataModelingList;
                    if (nodeDataModelingList.length > 0) {
                        nodeDataModelingList.map((item1, c) => {
                            var newTransferId = childListBasedOnScenarion.filter(c => c.oldId == item1.transferNodeDataId);
                            item1.transferNodeDataId = newTransferId[0].newId;
                        })
                    }
                }
            }
        })

        // console.log("duplicate button clicked value after update---", items);
        this.setState({
            // items: [...items, newItem],
            items,
            cursorItem: nodeId
        }, () => {
            // console.log("on add items-------", this.state.items);
            this.calculateMOMData(0, 2);
        });
    }
    cancelClicked() {
        this.props.history.push(`/dataset/listTree/`)
    }


    getPlanningUnitListByFUId(forecastingUnitId) {
        // console.log("forecastingUnitId--->>>>>>>&&&>", forecastingUnitId);
        // console.log("pl unit---", this.state.updatedPlanningUnitList);
        var planningUnitList = this.state.updatedPlanningUnitList.filter(x => x.forecastingUnit.id == forecastingUnitId);
        this.setState({
            planningUnitList,
            tempPlanningUnitId: planningUnitList.length == 1 ? planningUnitList[0].id : "",
        }, () => {
            // console.log("filtered planning unit list---", this.state.planningUnitList);
            // console.log("filtered planning unit list tempPlanningUnitId---", this.state.tempPlanningUnitId);
            if (this.state.planningUnitList.length == 1) {
                var { currentItemConfig } = this.state;
                // console.log("pl 1---", this.state.planningUnitList);
                // console.log("currentItemConfig pl 1---", currentItemConfig);
                if ((currentItemConfig.context.payload.nodeType.id == 4 && this.state.addNodeFlag) || (currentItemConfig.context.payload.nodeType.id == 5 && this.state.addNodeFlag)) {
                    currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].puNode.planningUnit.id = this.state.planningUnitList[0].id;
                    // console.log("pl 2---");
                    currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].puNode.planningUnit.label = this.state.planningUnitList[0].label;
                    // console.log("pl 3---");
                    currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].puNode.planningUnit.multiplier = this.state.planningUnitList[0].multiplier;
                    // console.log("pl 4---");
                    currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].puNode.planningUnit.unit.id = this.state.planningUnitList[0].unit.id;
                    // console.log("pl 5---");
                    currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].displayCalculatedDataValue = currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].calculatedDataValue;
                    if (this.state.addNodeFlag && currentItemConfig.context.payload.nodeType.id == 5) {
                        // console.log("pl 6---");
                        currentItemConfig.context.payload.label = JSON.parse(JSON.stringify(this.state.planningUnitList[0].label));
                    }
                    // console.log("pl 7---");
                    this.setState({
                        conversionFactor: this.state.planningUnitList[0].multiplier,
                        currentItemConfig,
                        currentScenario: currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0]
                    }, () => {
                        if (this.state.addNodeFlag && currentItemConfig.context.payload.nodeType.id == 5) {
                            this.qatCalculatedPUPerVisit(1);
                        }
                    });
                }
            }
            if (this.state.currentItemConfig.context.payload.nodeType.id == 5 && this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario].puNode != null) {
                // console.log("test---", this.state.currentItemConfig.context.payload);
                // (this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].puNode.planningUnit.id
                var conversionFactor = this.state.updatedPlanningUnitList.filter(x => x.id == this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].puNode.planningUnit.id)[0].multiplier;
                // console.log("conversionFactor---", conversionFactor);
                this.setState({
                    conversionFactor
                }, () => {
                    this.getUsageText();
                });
            }
            // else if (type == 1) {
            //     if (this.state.planningUnitList.length == 1) {
            //         // console.log("node data pu---", this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario]);
            //         var pu = (this.state.planningUnitList)[0];
            //         // console.log("node data pu list---", pu);
            //         var puNode = {
            //             planningUnit: {
            //                 id: pu.id,
            //                 unit: {
            //                     id: pu.unit.id
            //                 },
            //                 multiplier: pu.multiplier,
            //                 refillMonths : ''
            //             }
            //         }
            //         this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario].puNode = puNode;
            //         // console.log("final node data---",this.state.currentItemConfig.context.payload)
            //     }
            // }
        });

    }

    getForecastingUnitUnitByFUId(forecastingUnitId) {
        // console.log("forecastingUnitId---", forecastingUnitId);
        // console.log("%%%this.state.forecastingUnitList---", this.state.forecastingUnitList);
        const { currentItemConfig } = this.state;
        var forecastingUnit = (this.state.forecastingUnitList.filter(c => c.id == forecastingUnitId));
        if (forecastingUnit.length > 0) {
            // console.log("forecastingUnit---", forecastingUnit);
            (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.forecastingUnit.unit.id = forecastingUnit[0].unit.id;
            // console.log("currentItemConfig---", currentItemConfig);
            // console.log("state items---", this.state.items);
        }
        this.setState({
            currentItemConfig
        });
    }

    getNoOfFUPatient() {
        var scenarioId = this.state.selectedScenario;
        var noOfFUPatient;
        if (this.state.currentItemConfig.context.payload.nodeType.id == 4) {
            noOfFUPatient = (this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.noOfForecastingUnitsPerPerson / (this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.noOfPersons;
        } else {
            // console.log("--->>>>>>>>>>>>>>>>>>>>>>>>>>", (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode);
            noOfFUPatient = (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode.noOfForecastingUnitsPerPerson / (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode.noOfPersons;
        }
        // console.log("noOfFUPatient---", noOfFUPatient);
        this.setState({
            noOfFUPatient
        }, () => {
            // console.log("state update fu--->", this.state.noOfFUPatient)
        })
    }
    getNodeUnitOfPrent() {
        var id;
        id = this.state.currentItemConfig.parentItem.payload.nodeUnit.id;
        this.setState({
            usageTypeParent: id
        }, () => {
            // console.log("parent unit id===", this.state.usageTypeParent);
        });
    }

    copyDataFromUsageTemplate(event) {
        var usageTemplate = (this.state.usageTemplateList.filter(c => c.usageTemplateId == event.target.value))[0];
        // console.log("usageTemplate---", usageTemplate);
        const { currentItemConfig } = this.state;
        (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.lagInMonths = usageTemplate.lagInMonths;
        (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.noOfPersons = usageTemplate.noOfPatients;
        (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.noOfForecastingUnitsPerPerson = usageTemplate.noOfForecastingUnits;
        (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.usageFrequency = usageTemplate.usageFrequencyCount;
        (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.usagePeriod.usagePeriodId = usageTemplate.usageFrequencyUsagePeriod != null ? usageTemplate.usageFrequencyUsagePeriod.usagePeriodId : '';
        (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.forecastingUnit.unit.id = usageTemplate.forecastingUnit.unit.id;
        (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.forecastingUnit.id = usageTemplate.forecastingUnit.id;
        (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.forecastingUnit.label.label_en = usageTemplate.forecastingUnit.label.label_en;
        (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.usageType.id = usageTemplate.usageType.id;
        (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.forecastingUnit.tracerCategory.id = usageTemplate.tracerCategory.id;
        currentItemConfig.context.payload.label = usageTemplate.forecastingUnit.label;
        // for (var i = 0; i < newResult.length; i++) {
        // var autocompleteData = [{ value: usageTemplate.forecastingUnit.id, label: usageTemplate.forecastingUnit.id + "|" + getLabelText(usageTemplate.forecastingUnit.label, this.state.lang) }]
        // }


        if ((currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.usageType.id == 1) {
            (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.oneTimeUsage = usageTemplate.oneTimeUsage;
            (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.repeatCount = usageTemplate.repeatCount;
            if (!usageTemplate.oneTimeUsage) {
                (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.repeatUsagePeriod.usagePeriodId = usageTemplate.repeatUsagePeriod != null ? usageTemplate.repeatUsagePeriod.usagePeriodId : '';
            }
        }
        this.setState({
            currentItemConfig,
            currentScenario: (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0],
            fuValues: { value: usageTemplate.forecastingUnit.id, label: getLabelText(usageTemplate.forecastingUnit.label, this.state.lang) + " | " + usageTemplate.forecastingUnit.id },
        }, () => {
            // console.log("copy from template---", this.state.currentScenario);
            this.getForecastingUnitListByTracerCategoryId(0, usageTemplate.forecastingUnit.id);
            this.getNoOfMonthsInUsagePeriod();
            this.getNoFURequired();
            this.getNoOfFUPatient();
            this.getUsageText();
        });

    }
    getNoFURequired() {
        var usagePeriodId;
        var usageTypeId;
        var usageFrequency;
        var nodeTypeId = this.state.currentItemConfig.context.payload.nodeType.id;
        var scenarioId = this.state.selectedScenario;
        var repeatUsagePeriodId;
        var oneTimeUsage;
        // console.log("2023 error---", this.state.currentItemConfig.context);
        if (nodeTypeId == 5) {
            usageTypeId = (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode.usageType.id;
            // console.log("usageTypeId 5---", usageTypeId);
            usagePeriodId = (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode.usagePeriod != null ? (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode.usagePeriod.usagePeriodId : "";
            // console.log("usagePeriodId 5---", usagePeriodId);
            usageFrequency = (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode.usageFrequency != null ? (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode.usageFrequency.toString().replaceAll(",", "") : "";
            // console.log("usageFrequency 5---", usageFrequency);
            if (usageTypeId == 1) {
                oneTimeUsage = (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode.oneTimeUsage;
            }
        } else {
            usageTypeId = (this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.usageType.id;
            // console.log("usageTypeId 4---", usageTypeId);
            if (usageTypeId == 1) {
                oneTimeUsage = (this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.oneTimeUsage;
            }
            if (usageTypeId == 2 || (oneTimeUsage != null && oneTimeUsage !== "" && oneTimeUsage.toString() == "false")) {
                usagePeriodId = (this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.usagePeriod.usagePeriodId;
                // console.log("usagePeriodId 4---", usagePeriodId);
            }
            usageFrequency = (this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.usageFrequency != null ? (this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.usageFrequency.toString().replaceAll(",", "") : "";
            // console.log("usageFrequency 4---", usageFrequency);

        }
        // console.log("usagePeriodId dis---", usagePeriodId);
        var noOfMonthsInUsagePeriod = 0;
        if ((usagePeriodId != null && usagePeriodId != "") && (usageTypeId == 2 || (oneTimeUsage == "false" || oneTimeUsage == false))) {
            // console.log("inside if no fu");
            var convertToMonth = (this.state.usagePeriodList.filter(c => c.usagePeriodId == usagePeriodId))[0].convertToMonth;
            // console.log("convertToMonth dis---", convertToMonth);
            // console.log("repeat count---", (this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.repeatCount);
            // console.log("no of month dis---", this.getNoOfMonthsInUsagePeriod());

            if (usageTypeId == 2) {
                var div = (convertToMonth * usageFrequency);
                // console.log("duv---", div);
                if (div != 0) {
                    noOfMonthsInUsagePeriod = usageFrequency / convertToMonth;
                    // console.log("noOfMonthsInUsagePeriod---", noOfMonthsInUsagePeriod);
                }
            } else {
                // var noOfFUPatient = this.state.noOfFUPatient;
                var noOfFUPatient;
                if (this.state.currentItemConfig.context.payload.nodeType.id == 4) {
                    noOfFUPatient = (this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.noOfForecastingUnitsPerPerson.toString().replaceAll(",", "") / (this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.noOfPersons.toString().replaceAll(",", "");
                } else {
                    // console.log("--->>>>>>>>>>>>>>>>>>>>>>>>>>", (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode);
                    noOfFUPatient = (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode.noOfForecastingUnitsPerPerson.toString().replaceAll(",", "") / (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode.noOfPersons.toString().replaceAll(",", "");
                }
                // console.log("no of fu patient---", noOfFUPatient);
                noOfMonthsInUsagePeriod = convertToMonth * usageFrequency * noOfFUPatient;
                // console.log("noOfMonthsInUsagePeriod---", noOfMonthsInUsagePeriod);
            }

            // console.log("repeat count a---", (this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.repeatCount);
            // console.log("convert to month a---", convertToMonth);
            // console.log("noOfMonthsInUsagePeriod a---", noOfMonthsInUsagePeriod);
            if (oneTimeUsage != "true" && oneTimeUsage != true && usageTypeId == 1) {
                // console.log("(this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode---", (this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode);
                if (this.state.currentItemConfig.context.payload.nodeType.id == 4) {
                    repeatUsagePeriodId = (this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.repeatUsagePeriod.usagePeriodId;
                } else {
                    repeatUsagePeriodId = (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode.repeatUsagePeriod.usagePeriodId;
                }
                // console.log("repeatUsagePeriodId for calc---", repeatUsagePeriodId);
                if (repeatUsagePeriodId != "") {
                    convertToMonth = (this.state.usagePeriodList.filter(c => c.usagePeriodId == repeatUsagePeriodId))[0].convertToMonth;
                } else {
                    convertToMonth = 0;
                }
            }
            if (this.state.currentItemConfig.context.payload.nodeType.id == 4) {
                var noFURequired = oneTimeUsage != "true" && oneTimeUsage != true ? (((this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.repeatCount != null ? ((this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.repeatCount).toString().replaceAll(",", "") : (this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.repeatCount) / convertToMonth) * noOfMonthsInUsagePeriod : noOfFUPatient;
            } else {
                var noFURequired = oneTimeUsage != "true" && oneTimeUsage != true ? (((this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode.repeatCount != null ? ((this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode.repeatCount).toString().replaceAll(",", "") : (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode.repeatCount) / convertToMonth) * noOfMonthsInUsagePeriod : noOfFUPatient;
            }
            // console.log("noFURequired---", noFURequired);

        } else if (usageTypeId == 1 && oneTimeUsage != null && (oneTimeUsage == "true" || oneTimeUsage == true)) {
            // console.log("inside else if no fu");
            if (this.state.currentItemConfig.context.payload.nodeType.id == 4) {
                noFURequired = (this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.noOfForecastingUnitsPerPerson.toString().replaceAll(",", "") / (this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.noOfPersons.toString().replaceAll(",", "");
            } else {
                // console.log("--->>>>>>>>>>>>>>>>>>>>>>>>>>", (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode);
                noFURequired = (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode.noOfForecastingUnitsPerPerson.toString().replaceAll(",", "") / (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode.noOfPersons.toString().replaceAll(",", "");
            }
            // noOfMonthsInUsagePeriod = noOfFUPatient;
        }
        // console.log("noFURequired---", noFURequired);
        // console.log("noFURequired---", (noFURequired != "" && noFURequired != 0 ? "Round" : "Zero"));
        this.setState({
            noFURequired: (noFURequired != "" && noFURequired != 0 ? noFURequired : 0)
        }, () => {
            // console.log("after update noFURequired---", this.state.noFURequired);
        });
    }

    getNoOfMonthsInUsagePeriod() {
        var usagePeriodId;
        var usageTypeId;
        var usageFrequency;
        var nodeTypeId = this.state.currentItemConfig.context.payload.nodeType.id;
        var scenarioId = this.state.selectedScenario;
        var oneTimeUsage;
        if (nodeTypeId == 5) {
            usageTypeId = (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode.usageType.id;
            // console.log("usageTypeId---", usageTypeId);
            if (usageTypeId == 1) {
                oneTimeUsage = (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode.oneTimeUsage;
            }

            if (usageTypeId == 2 || (usageTypeId == 1 && oneTimeUsage != null && oneTimeUsage != "true" && oneTimeUsage != true)) {
                usagePeriodId = (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode.usagePeriod.usagePeriodId;
                // console.log("usagePeriodId---", usagePeriodId);
                usageFrequency = (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode.usageFrequency != null ? (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode.usageFrequency.toString().replaceAll(",", "") : "";
                // console.log("usageFrequency---", usageFrequency);
            }


        } else {
            usageTypeId = (this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.usageType.id;
            // console.log("usageTypeId---", usageTypeId);
            if (usageTypeId == 1) {
                oneTimeUsage = (this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.oneTimeUsage;
            }
            if (usageTypeId == 2 || (usageTypeId == 1 && oneTimeUsage != null && oneTimeUsage != "true" && oneTimeUsage != true)) {
                usagePeriodId = (this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.usagePeriod.usagePeriodId;
                // console.log("usagePeriodId---", usagePeriodId);
                usageFrequency = (this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.usageFrequency != null ? (this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.usageFrequency.toString().replaceAll(",", "") : "";
                // console.log("usageFrequency---", usageFrequency);
            }

        }
        var noOfMonthsInUsagePeriod = 0;
        if (usagePeriodId != null && usagePeriodId != "") {
            var convertToMonth = (this.state.usagePeriodList.filter(c => c.usagePeriodId == usagePeriodId))[0].convertToMonth;
            // console.log("convertToMonth---", convertToMonth);
            // console.log("usageFrequency---", usageFrequency);
            if (usageTypeId == 2) {
                var div = (convertToMonth * usageFrequency);
                // console.log("duv---", div);
                if (div != 0) {
                    // noOfMonthsInUsagePeriod = 1 / (convertToMonth * usageFrequency);
                    noOfMonthsInUsagePeriod = usageFrequency / convertToMonth;
                    // console.log("noOfMonthsInUsagePeriod continous---", noOfMonthsInUsagePeriod);
                }
            } else {
                // var noOfFUPatient = this.state.noOfFUPatient;
                var noOfFUPatient;
                if (this.state.currentItemConfig.context.payload.nodeType.id == 4) {
                    // console.log("no of persons---", (this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.noOfPersons);
                    // console.log("no of noOfForecastingUnitsPerPerson---", (this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.noOfForecastingUnitsPerPerson);
                    noOfFUPatient = (this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.noOfForecastingUnitsPerPerson.toString().replaceAll(",", "") / (this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.noOfPersons.toString().replaceAll(",", "");
                    // console.log("noOfFUPatient---", noOfFUPatient);
                } else {
                    // console.log("--->>>>>>>>>>>>>>>>>>>>>>>>>>", (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode);
                    noOfFUPatient = (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode.noOfForecastingUnitsPerPerson.toString().replaceAll(",", "") / (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode.noOfPersons.toString().replaceAll(",", "");
                }
                // console.log("no of fu patient---", noOfFUPatient);
                noOfMonthsInUsagePeriod = oneTimeUsage != "true" ? convertToMonth * usageFrequency * noOfFUPatient : noOfFUPatient;
                // console.log("noOfMonthsInUsagePeriod---", noOfMonthsInUsagePeriod);
            }
        } else if (usageTypeId == 1 && oneTimeUsage != null && (oneTimeUsage == "true" || oneTimeUsage == true)) {
            if (this.state.currentItemConfig.context.payload.nodeType.id == 4) {
                noOfFUPatient = (this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.noOfForecastingUnitsPerPerson.toString().replaceAll(",", "") / (this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.noOfPersons.toString().replaceAll(",", "");
            } else {
                // console.log("--->>>>>>>>>>>>>>>>>>>>>>>>>>", (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode);
                noOfFUPatient = (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode.noOfForecastingUnitsPerPerson.toString().replaceAll(",", "") / (this.state.currentItemConfig.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode.noOfPersons.toString().replaceAll(",", "");
            }
            noOfMonthsInUsagePeriod = noOfFUPatient;
        }
        this.setState({
            noOfMonthsInUsagePeriod: noOfMonthsInUsagePeriod
        }, () => {
            // console.log("noOfMonthsInUsagePeriod--->>>>", this.state.noOfMonthsInUsagePeriod);
        });
    }
    getUsageText() {
        try {
            var usageText = '';
            var noOfPersons = '';
            var noOfForecastingUnitsPerPerson = '';
            var usageFrequency = '';
            var selectedText = "";
            var selectedText1 = "";
            var selectedText2 = "";
            if (this.state.currentItemConfig.context.payload.nodeType.id == 4) {
                noOfPersons = this.state.currentScenario.fuNode.noOfPersons.toString().replaceAll(",", "");
                noOfForecastingUnitsPerPerson = this.state.currentScenario.fuNode.noOfForecastingUnitsPerPerson.toString().replaceAll(",", "");
                usageFrequency = this.state.currentScenario.fuNode.usageFrequency != null ? this.state.currentScenario.fuNode.usageFrequency.toString().replaceAll(",", "") : "";

                if (this.state.addNodeFlag) {
                    // var usageTypeParent = document.getElementById("usageTypeParent");
                    selectedText = this.state.nodeUnitList.filter(c => c.unitId == this.state.currentItemConfig.parentItem.payload.nodeUnit.id)[0].label.label_en
                } else {
                    // take everything from object
                    // console.log(">>>>", this.state.currentItemConfig);
                    // selectedText = this.state.currentItemConfig.parentItem.payload.nodeUnit.label.label_en;
                    selectedText = this.state.nodeUnitList.filter(c => c.unitId == this.state.currentItemConfig.parentItem.payload.nodeUnit.id)[0].label.label_en;
                }

                if (this.state.addNodeFlag) {
                    var forecastingUnitUnit = document.getElementById("forecastingUnitUnit");
                    selectedText1 = forecastingUnitUnit.options[forecastingUnitUnit.selectedIndex].text;
                } else {
                    selectedText1 = this.state.unitList.filter(c => c.unitId == this.state.currentScenario.fuNode.forecastingUnit.unit.id)[0].label.label_en;
                }




                if (this.state.currentScenario.fuNode.usageType.id == 2 || (this.state.currentScenario.fuNode.oneTimeUsage != "true" && this.state.currentScenario.fuNode.oneTimeUsage != true)) {
                    // console.log("this.state.currentScenario.fuNode---", this.state.currentScenario.fuNode);
                    // if (this.state.addNodeFlag) {
                    selectedText2 = this.state.usagePeriodList.filter(c => c.usagePeriodId == this.state.currentScenario.fuNode.usagePeriod.usagePeriodId)[0].label.label_en;
                    // }
                }
            }
            // FU
            if (this.state.currentItemConfig.context.payload.nodeType.id == 4) {
                // console.log("selectedText---", selectedText)
                if (this.state.currentScenario.fuNode.usageType.id == 1) {
                    // console.log("selected text 3 1---", this.state.currentScenario.fuNode.oneTimeUsage != "true" && this.state.currentScenario.fuNode.oneTimeUsage != true);
                    if (this.state.currentScenario.fuNode.oneTimeUsage != "true" && this.state.currentScenario.fuNode.oneTimeUsage != true) {
                        // console.log("selected text 3 2---", this.state.currentScenario.fuNode.repeatUsagePeriod.usagePeriodId);
                        var selectedText3 = this.state.usagePeriodList.filter(c => c.usagePeriodId == this.state.currentScenario.fuNode.repeatUsagePeriod.usagePeriodId)[0].label.label_en;

                        usageText = i18n.t('static.usageTemplate.every') + " " + addCommas(noOfPersons) + " " + selectedText.trim() + "" + i18n.t('static.usageTemplate.requires') + " " + addCommas(noOfForecastingUnitsPerPerson) + " " + selectedText1.trim() + "(s), " + " " + addCommas(usageFrequency) + " " + i18n.t('static.tree.timesPer') + " " + selectedText2.trim() + " " + i18n.t('static.tree.for') + " " + (this.state.currentScenario.fuNode.repeatCount != null ? this.state.currentScenario.fuNode.repeatCount : '') + " " + selectedText3.trim();
                    } else {
                        // console.log("selected text 3 1---");
                        usageText = i18n.t('static.usageTemplate.every') + " " + addCommas(noOfPersons) + " " + selectedText.trim() + "" + i18n.t('static.usageTemplate.requires') + " " + addCommas(noOfForecastingUnitsPerPerson) + " " + selectedText1.trim() + "(s)";
                    }
                } else {
                    usageText = i18n.t('static.usageTemplate.every') + " " + addCommas(noOfPersons) + " " + selectedText.trim() + "" + i18n.t('static.usageTemplate.requires') + " " + addCommas(noOfForecastingUnitsPerPerson) + " " + selectedText1.trim() + "(s) " + i18n.t('static.usageTemplate.every') + " " + addCommas(usageFrequency) + " " + selectedText2.trim() + " indefinitely";
                }
            } else {
                //PU
                // console.log("pu>>>", this.state.currentItemConfig);
                // console.log("puList>>>", this.state.currentItemConfig.parentItem.parent);
                if (this.state.currentScenario.puNode.planningUnit.id != null && this.state.currentScenario.puNode.planningUnit.id != "") {
                    var nodeUnitTxt = this.state.nodeUnitListPlural.filter(c => c.unitId == this.state.items.filter(x => x.id == this.state.currentItemConfig.parentItem.parent)[0].payload.nodeUnit.id)[0].label.label_en;
                    if (this.state.addNodeFlag) {
                        var planningUnitId = document.getElementById("planningUnitId");
                        var planningUnit = planningUnitId.options[planningUnitId.selectedIndex].text;
                    } else {
                        var planningUnit = this.state.updatedPlanningUnitList.filter(c => c.id == this.state.currentScenario.puNode.planningUnit.id)[0].label.label_en;
                    }
                    if ((this.state.currentItemConfig.parentItem.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.usageType.id == 1) {
                        var sharePu;
                        // if (this.state.currentScenario.puNode.sharePlanningUnit != "true") {
                            sharePu = (this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].puNode.puPerVisit;
                        // } else {
                            // sharePu = (this.state.noOfMonthsInUsagePeriod / this.state.conversionFactor);
                        // }

                        // } else {
                        //     sharePu = this.round((this.state.noOfMonthsInUsagePeriod / this.state.conversionFactor));
                        // }
                        // console.log("sharePu---===>", sharePu);
                        usageText = i18n.t('static.tree.forEach') + " " + nodeUnitTxt.trim() + " " + i18n.t('static.tree.weNeed') + " " + addCommasWith8Decimals(sharePu) + " " + planningUnit;
                    } else {

                        var puPerInterval = (this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].puNode.puPerVisit;
                        // console.log("puPerInterval---==>", puPerInterval);
                        usageText = i18n.t('static.tree.forEach') + " " + nodeUnitTxt.trim() + " " + i18n.t('static.tree.weNeed') + " " + addCommasWith8Decimals(puPerInterval) + " " + planningUnit + " " + i18n.t('static.usageTemplate.every') + " " + this.state.currentScenario.puNode.refillMonths + " " + i18n.t('static.report.month');
                    }
                } else {
                    usageText = "";
                }
            }
        } catch (err) {
            // console.log("Error occured while building usage text---", err);
        }
        finally {
            this.setState({
                usageText
            }, () => {
                // console.log("usage text---", this.state.usageText);
            });
        }

    }
    getForecastingUnitListByTracerCategoryId(type, isUsageTemplate) {
        var scenarioId = this.state.selectedScenario;
        // console.log("my tracer category---", this.state.currentItemConfig.context.payload.nodeDataMap[scenarioId][0])
        // console.log("this.state.currentScenario---", this.state.currentScenario.fuNode.forecastingUnit.tracerCategory.id);
        var tracerCategoryId = this.state.currentScenario.fuNode.forecastingUnit.tracerCategory.id;
        // console.log("my tracerCategoryId for test1---", tracerCategoryId)
        var forecastingUnitList = this.state.forecastingUnitList;
        // console.log("my tracerCategoryId for test2---", forecastingUnitList)
        var filteredForecastingUnitList = tracerCategoryId != "" && tracerCategoryId != undefined ? this.state.forecastingUnitList.filter(x => x.tracerCategory.id == tracerCategoryId) : forecastingUnitList;
        // console.log("my tracerCategoryId for test3---", filteredForecastingUnitList)
        // var autocompleteData = [];
        // for (var i = 0; i < forecastingUnitList.length; i++) {
        //     autocompleteData[i] = { value: forecastingUnitList[i].id, label: forecastingUnitList[i].id + "|" + getLabelText(forecastingUnitList[i].label, this.state.lang) }
        // }

        let forecastingUnitMultiList = filteredForecastingUnitList.length > 0
            && filteredForecastingUnitList.map((item, i) => {
                return ({ value: item.id, label: getLabelText(item.label, this.state.lang) + " | " + item.id })

            }, this);

        // Check fu values
        var result = tracerCategoryId == "" || tracerCategoryId == undefined ? [] :
            (this.state.currentScenario.fuNode.forecastingUnit.id != undefined &&
                this.state.currentScenario.fuNode.forecastingUnit.id != "" &&
                filteredForecastingUnitList.filter(x => x.id == this.state.currentScenario.fuNode.forecastingUnit.id).length > 0 ?
                { value: this.state.currentScenario.fuNode.forecastingUnit.id, label: getLabelText(this.state.currentScenario.fuNode.forecastingUnit.label, this.state.lang) + " | " + this.state.currentScenario.fuNode.forecastingUnit.id }
                : []);

        // console.log("tracer category result---", result);
        this.setState({
            forecastingUnitMultiList,
            fuValues: tracerCategoryId == undefined ? [] : (this.state.currentScenario.fuNode.forecastingUnit.id != undefined && this.state.currentScenario.fuNode.forecastingUnit.id != "" && filteredForecastingUnitList.filter(x => x.id == this.state.currentScenario.fuNode.forecastingUnit.id).length > 0 ? { value: this.state.currentScenario.fuNode.forecastingUnit.id, label: getLabelText(this.state.currentScenario.fuNode.forecastingUnit.label, this.state.lang) + " | " + this.state.currentScenario.fuNode.forecastingUnit.id } : []),
            tempPlanningUnitId: tracerCategoryId == "" || tracerCategoryId == undefined ? '' : this.state.tempPlanningUnitId,
            planningUnitList: tracerCategoryId == "" || tracerCategoryId == undefined ? [] : this.state.planningUnitList
        }, () => {
            // console.log("my autocomplete data fuValues 1---", filteredForecastingUnitList);
            // console.log("my autocomplete data fuValues 2---", this.state.fuValues);
            if (filteredForecastingUnitList.length == 1) {
                // console.log("fu list 1---", forecastingUnitList[0]);
                const currentItemConfig = this.state.currentItemConfig;
                (currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.forecastingUnit.id = filteredForecastingUnitList[0].id;
                (currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.forecastingUnit.label = filteredForecastingUnitList[0].label;
                (currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.forecastingUnit.tracerCategory.id = filteredForecastingUnitList[0].tracerCategory.id;
                (currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.forecastingUnit.unit.id = filteredForecastingUnitList[0].unit.id;

                // var filteredPlanningUnitList = this.state.planningUnitList.filter(x => x.forecastingUnit.id == filteredForecastingUnitList[0].id);
                this.setState({
                    currentItemConfig: currentItemConfig,
                    currentScenario: (currentItemConfig.context.payload.nodeDataMap[scenarioId])[0]
                }, () => {
                    if (type == 0) {
                        // console.log("my take 1---", filteredForecastingUnitList[0]);
                        var fuValues = { value: filteredForecastingUnitList[0].id, label: getLabelText(filteredForecastingUnitList[0].label, this.state.lang) + " | " + filteredForecastingUnitList[0].id };
                        // console.log("before cur item config fuValues--- ", this.state.fuValues);
                        // console.log("before 2--- ", fuValues);
                        // (currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.forecastingUnit.unit.id = forecastingUnit[0].unit.id;
                        this.setState({
                            fuValues
                        }, () => {
                            // console.log("aftercur item config fuValues--- ", this.state.fuValues);
                        });
                    } else {
                        // console.log("type 0 in else");
                    }

                    this.getForecastingUnitUnitByFUId(this.state.fuValues.value);
                    this.getPlanningUnitListByFUId(filteredForecastingUnitList[0].id);
                })
            } else if (this.state.addNodeFlag) {
                if (isUsageTemplate > 0) {
                    this.getPlanningUnitListByFUId(isUsageTemplate);
                } else {
                    if (this.state.currentScenario.fuNode.forecastingUnit.id != undefined && this.state.currentScenario.fuNode.forecastingUnit.id != "") {
                        if (this.state.forecastingUnitMultiList.filter(c => c.value == this.state.currentScenario.fuNode.forecastingUnit.id).length != 0) {
                            this.getPlanningUnitListByFUId(this.state.currentScenario.fuNode.forecastingUnit.id);
                        } else {
                            this.setState({ planningUnitList: [] });
                        }
                    }
                }
            }

        });

    }
    hideTreeValidation(e) {
        this.setState({
            showModelingValidation: e.target.checked == true ? false : true
        })
    }

    autoCalculate(e) {
        // console.log("Inside function test", e.target.checked)
        var val = (e.target.checked);
        // console.log("val test", val)
        var prevVal = this.state.autoCalculate;
        // console.log("prev val test", prevVal)
        localStorage.setItem('sesAutoCalculate', val)
        this.setState({
            autoCalculate: val
        }, () => {
            if (val == true && prevVal == false) {
                this.setState({
                    loading: true
                })
                this.calculateMOMData(0, 2);
            }
        })
    }

    recalculate(nodeId, type) {
        this.setState({
            loading: true
        })
        let { curTreeObj } = this.state;
        let { treeData } = this.state;
        let { dataSetObj } = this.state;
        var items = this.state.items;
        var programData = dataSetObj.programData;
        // console.log("program data>>> 1", programData);
        // console.log("program data treeData>>> 1.1", treeData);
        // console.log("program data curTreeObj>>> 1.1", curTreeObj);
        programData.treeList = treeData;
        // console.log("program data>>> 2", programData);
        // alert("27---")

        curTreeObj.tree.flatList = items;
        curTreeObj.scenarioList = this.state.scenarioList;
        var findTreeIndex = treeData.findIndex(n => n.treeId == curTreeObj.treeId);
        treeData[findTreeIndex] = curTreeObj;
        programData.treeList = treeData;
        dataSetObj.programData = programData;
        // console.log("dataSetDecrypt 2121>>>", dataSetObj);
        // console.log("Before modeling data calculation Test")
        calculateModelingData(dataSetObj, this, '', (nodeId != 0 ? nodeId : this.state.currentItemConfig.context.id), this.state.selectedScenario, type, this.state.treeId, false, false, true);
        // }
    }

    hideActionButtons(e) {
        this.setState({
            hideActionButtons: e.target.checked
        })
    }

    filterPlanningUnitNode(e) {
        // console.log(">>>", e.target.checked);
        var itemsList = this.state.items;
        var arr = [];
        for (let i = 0; i < itemsList.length; i++) {
            var item = itemsList[i];
            // if (this.state.hideFUPUNode) {
            if (item.payload.nodeType.id == 5) {
                if (this.state.hideFUPUNode) {
                    item.isVisible = false;
                } else {
                    if (e.target.checked == true) {
                        item.isVisible = false;
                    } else {
                        item.isVisible = true;
                    }
                }

            }
            // }
            arr.push(item);
        }
        this.setState({
            items: arr,
            hidePUNode: e.target.checked
        });
    }
    filterPlanningUnitAndForecastingUnitNodes(e) {
        // console.log(">>>", e.target.checked);
        var itemsList = this.state.items;
        var arr = [];
        for (let i = 0; i < itemsList.length; i++) {
            var item = itemsList[i];
            if (item.payload.nodeType.id == 5 || item.payload.nodeType.id == 4) {
                if (e.target.checked == true) {
                    item.isVisible = false;
                } else {

                    item.isVisible = item.payload.nodeType.id == 4 ? true : (item.payload.nodeType.id == 5 && this.state.hidePUNode ? false : true);
                }
            }
            arr.push(item);
        }
        this.setState({
            items: arr,
            hideFUPUNode: e.target.checked
        });
    }

    expandCollapse(e) {
        var updatedItems = this.state.items;
        var tempToggleArray = this.state.toggleArray;
        if (e.target.checked) {
            this.setState({ collapseState: true })
            updatedItems = updatedItems.map(item => {
                tempToggleArray.push(item.id);
                if (item.parent != null) {
                    return { ...item, templateName: "contactTemplateMin", expanded: true, payload: { ...item.payload, collapsed: true } };
                }
                return item;
            });
            this.setState({ toggleArray: tempToggleArray })
        } else {
            this.setState({ collapseState: false })
            updatedItems = updatedItems.map(item => {
                tempToggleArray = tempToggleArray.filter((e) => e != item.id)
                return { ...item, templateName: "contactTemplate", expanded: false, payload: { ...item.payload, collapsed: false } };
            });
            this.setState({ toggleArray: tempToggleArray })
        }
        this.setState({ items: updatedItems }, () => { this.saveTreeData(false, true) })
    }

    touchAllScenario(setTouched, errors) {
        setTouched({
            scenarioName: true
        }
        )
        this.validateFormScenario(errors)
    }

    touchAllBranch(setTouched, errors) {
        setTouched({
            branchTemplateId: true
        }
        )
        this.validateFormBranch(errors)
    }

    validateFormScenario(errors) {
        this.findFirstErrorScenario('userForm', (fieldName) => {
            return Boolean(errors[fieldName])
        })
    }
    findFirstErrorScenario(formName, hasError) {
        const form = document.forms[formName]
        for (let i = 0; i < form.length; i++) {
            if (hasError(form[i].name)) {
                form[i].focus()
                break
            }
        }
    }


    validateFormBranch(errors) {
        this.findFirstErrorBranch('userForm', (fieldName) => {
            return Boolean(errors[fieldName])
        })
    }
    findFirstErrorBranch(formName, hasError) {
        const form = document.forms[formName]
        for (let i = 0; i < form.length; i++) {
            if (hasError(form[i].name)) {
                form[i].focus()
                break
            }
        }
    }
    touchAllLevel(setTouched, errors) {
        setTouched({
            levelName: true
        }
        )
        this.validateFormLevel(errors)
    }

    validateFormLevel(errors) {
        this.findFirstErrorLevel('levelForm', (fieldName) => {
            return Boolean(errors[fieldName])
        })
    }
    findFirstErrorLevel(formName, hasError) {
        const form = document.forms[formName]
        for (let i = 0; i < form.length; i++) {
            if (hasError(form[i].name)) {
                form[i].focus()
                break
            }
        }
    }

    touchAll(setTouched, errors) {
        setTouched({
            forecastMethodId: true,
            treeName: true,
            regionId: true
        }
        )
        this.validateForm(errors)
    }


    validateForm(errors) {
        this.findFirstError('userForm', (fieldName) => {
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
    touchAllNodeData(setTouched, errors) {
        // console.log("Inside>>>>> touchAllNodeData")
        setTouched({
            nodeTypeId: true,
            nodeTitle: true,
            nodeUnitId: true,
            percentageOfParent: true,
            nodeValue: true,
            tracerCategoryId: true,
            usageTypeIdFU: true,
            lagInMonths: true,
            noOfPersons: true,
            forecastingUnitPerPersonsFC: true,
            usageFrequencyCon: true,
            usageFrequencyDis: true,
            oneTimeUsage: true,
            // repeatCount: true,
            // repeatUsagePeriodId: true,
            planningUnitId: true,
            refillMonths: true,
            sharePlanningUnit: true,
            forecastingUnitId: true,
            usagePeriodIdCon: true,
            usagePeriodIdDis: true,
            puPerVisit: true,
            planningUnitIdFU: true
            // usagePeriodId:true
        }
        )
        this.validateFormNodeData(errors)
    }
    validateFormNodeData(errors) {
        // console.log("Inside>>>>> validateFormNodeData")
        this.findFirstErrorNodeData('nodeDataForm', (fieldName) => {
            // console.log("Inside>>>>> Boolean(errors[fieldName])  ", Boolean(errors[fieldName]))
            return Boolean(errors[fieldName])
        })
    }
    findFirstErrorNodeData(formName, hasError) {
        // console.log("Inside>>>>> findFirstErrorNodeData>>> formName", formName, " hasError>>>>", hasError)

        const form = document.forms[formName]
        for (let i = 0; i < form.length; i++) {
            // console.log("Inside>>>>> form[i].name", form[i].name)
            if (hasError(form[i].name)) {

                // console.log("Inside>>>>> hasError(form[i].name)", hasError(form[i].name))
                form[i].focus()
                break
            }
        }
    }

    getNodeValue(nodeTypeId) {
        // console.log("get node value---------------------");
        if (nodeTypeId == 2 && this.state.currentItemConfig.context.payload.nodeDataMap != null && this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario] != null && this.state.currentScenario != null) {
            return this.state.currentScenario.dataValue;
        }
        // else {
        //     var nodeValue = (this.state.currentScenario.dataValue * (this.state.currentItemConfig.parentItem.payload.nodeDataMap[this.state.selectedScenario])[0].dataValue) / 100;
        //     return nodeValue;
        // }
    }

    getNotes() {
        return this.state.currentScenario.notes;
    }
    calculateNodeValue() {

    }

    getTracerCategoryList() {
        const lan = 'en';
        var db1;
        var storeOS;
        getDatabase();
        var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var planningunitTransaction = db1.transaction(['tracerCategory'], 'readwrite');
            var planningunitOs = planningunitTransaction.objectStore('tracerCategory');
            var planningunitRequest = planningunitOs.getAll();
            var planningList = []
            planningunitRequest.onerror = function (event) {
                // Handle errors!
            };
            planningunitRequest.onsuccess = function (e) {
                var myResult = [];
                myResult = planningunitRequest.result;
                var proList = []
                // console.log("myResult===============", myResult)
                this.setState({
                    tracerCategoryList: myResult
                }, () => {

                })
            }.bind(this);
        }.bind(this)
    }

    getForecastMethodList() {
        const lan = 'en';
        var db1;
        var storeOS;
        getDatabase();
        var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var planningunitTransaction = db1.transaction(['forecastMethod'], 'readwrite');
            var planningunitOs = planningunitTransaction.objectStore('forecastMethod');
            var planningunitRequest = planningunitOs.getAll();
            var planningList = []
            planningunitRequest.onerror = function (event) {
                // Handle errors!
            };
            planningunitRequest.onsuccess = function (e) {
                var myResult = [];
                myResult = planningunitRequest.result;
                // console.log("myResult===============2", myResult)
                this.setState({
                    forecastMethodList: myResult.filter(x => x.forecastMethodTypeId == 1)
                }, () => {

                })
            }.bind(this);
        }.bind(this)
    }

    getUnitListForDimensionIdFour() {
        const lan = 'en';
        var db1;
        var storeOS;
        getDatabase();
        var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var planningunitTransaction = db1.transaction(['unit'], 'readwrite');
            var planningunitOs = planningunitTransaction.objectStore('unit');
            var planningunitRequest = planningunitOs.getAll();
            var planningList = []
            planningunitRequest.onerror = function (event) {
                // Handle errors!
            };
            planningunitRequest.onsuccess = function (e) {
                var myResult = [];
                myResult = planningunitRequest.result;
                var proList = []
                // console.log("myResult===============3", myResult)
                for (var i = 0; i < myResult.length; i++) {
                    if (myResult[i].dimension.id == 4) {
                        proList[i] = myResult[i]
                    }
                }
                this.setState({
                    unitOfDimensionIdFour: proList[0]
                }, () => {

                })
            }.bind(this);
        }.bind(this)
    }

    getUnitList() {
        const lan = 'en';
        var db1;
        var storeOS;
        getDatabase();
        var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var planningunitTransaction = db1.transaction(['unit'], 'readwrite');
            var planningunitOs = planningunitTransaction.objectStore('unit');
            var planningunitRequest = planningunitOs.getAll();
            var planningList = []
            planningunitRequest.onerror = function (event) {
                // Handle errors!
            };
            planningunitRequest.onsuccess = function (e) {
                var myResult = [];
                myResult = planningunitRequest.result;
                var proList = []
                // console.log("myResult===============4", myResult)

                this.setState({
                    unitList: myResult,
                    nodeUnitList: myResult.filter(x => x.dimension.id == TREE_DIMENSION_ID && x.active == true)
                }, () => {
                    var nodeUnitListPlural = [];
                    // console.log("this.state.nodeUnitList---", this.state.nodeUnitList);
                    for (let i = 0; i < this.state.nodeUnitList.length; i++) {
                        // console.log("inside for---")
                        var nodeUnit = JSON.parse(JSON.stringify(this.state.nodeUnitList[i]));
                        // console.log("nodeUnit---", nodeUnit)
                        nodeUnit.label.label_en = nodeUnit.label.label_en + "(s)";
                        nodeUnitListPlural.push(nodeUnit);
                    }
                    // console.log("nodeUnitListPlural---", nodeUnitListPlural)
                    this.setState({ nodeUnitListPlural })
                })
            }.bind(this);
        }.bind(this)
    }


    getBranchTemplateList(itemConfig) {
        var nodeTypeId = itemConfig.payload.nodeType.id;
        const lan = 'en';
        var db1;
        var storeOS;
        getDatabase();
        var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var planningunitTransaction = db1.transaction(['treeTemplate'], 'readwrite');
            var planningunitOs = planningunitTransaction.objectStore('treeTemplate');
            var planningunitRequest = planningunitOs.getAll();
            var planningList = []
            planningunitRequest.onerror = function (event) {
                // Handle errors!
            };
            planningunitRequest.onsuccess = function (e) {
                var myResult = [];
                myResult = planningunitRequest.result;
                var nodeTypeList = [];
                var nodeType = this.state.nodeTypeList.filter(c => c.id == nodeTypeId)[0];
                var possibleNodeTypes = "";
                for (let i = 0; i < nodeType.allowedChildList.length; i++) {
                    // console.log("Branch allowed value---", nodeType.allowedChildList[i]);
                    var obj = this.state.nodeTypeList.filter(c => c.id == nodeType.allowedChildList[i])[0];
                    if (i != nodeType.allowedChildList.length - 1) {
                        possibleNodeTypes += (getLabelText(obj.label, this.state.lang) + " " + i18n.t('static.tree.node')) + " " + i18n.t('static.common.and') + " ";
                    } else {
                        possibleNodeTypes += (getLabelText(obj.label, this.state.lang) + " " + i18n.t('static.tree.node'));
                    }
                    nodeTypeList.push(nodeType.allowedChildList[i]);
                }
                // console.log("Branch nodeType list---", nodeTypeList);
                var fullBranchTemplateList = myResult.filter(x => x.active == true);
                var branchTemplateList = [];
                // console.log("Branch branchTemplateList---", fullBranchTemplateList);
                for (let i = 0; i < fullBranchTemplateList.length; i++) {
                    var flatList = fullBranchTemplateList[i].flatList;
                    // console.log("Branch flatList---", flatList);
                    var node = flatList.filter(x => x.level == 0)[0];
                    // console.log("Branch node---", node);
                    var result = nodeTypeList.indexOf(node.payload.nodeType.id) != -1;
                    // console.log("Branch template result---", result);
                    if (result) {
                        branchTemplateList.push(fullBranchTemplateList[i]);
                    }
                }
                this.setState({
                    fullBranchTemplateList,
                    branchTemplateList: branchTemplateList.sort(function (a, b) {
                        a = getLabelText(a.label, this.state.lang).toLowerCase();
                        b = getLabelText(b.label, this.state.lang).toLowerCase();
                        return a < b ? -1 : a > b ? 1 : 0;
                    }.bind(this)),
                    isBranchTemplateModalOpen: true,
                    parentNodeIdForBranch: itemConfig.id,
                    nodeTypeParentNode: getLabelText(nodeType.label, this.state.lang),
                    possibleNodeTypes: possibleNodeTypes
                }, () => {

                })
            }.bind(this);
        }.bind(this)
    }

    generateBranchFromTemplate(treeTemplateId) {
        var items = this.state.items;
        var parentItem = JSON.parse(JSON.stringify(this.state.items.filter(x => x.id == this.state.parentNodeIdForBranch)[0]));
        var curMonth = moment(this.state.forecastStartDate).format('YYYY-MM-DD');
        var branchTemplate = this.state.branchTemplateList.filter(x => x.treeTemplateId == treeTemplateId)[0];
        var flatList = JSON.parse(JSON.stringify(branchTemplate.flatList));
        var nodeDataMap = {};
        var tempArray = [];
        var tempJson = {};
        var tempTree = {};
        var maxNodeDataId = this.getMaxNodeDataId();
        var maxNodeId = items.length > 0 ? Math.max(...items.map(o => o.id)) : 0;
        // console.log("Branch initial maxNodeDataId---", maxNodeDataId);
        var scenarioList = this.state.scenarioList;
        var nodeArr = [];
        var json;
        // for (let i = 0; i < flatList.length; i++) {

        // }
        var parentLevel = parentItem.level;
        for (let i = 0; i < flatList.length; i++) {
            nodeDataMap = {};
            tempArray = [];

            if (flatList[i].level == 0) {
                flatList[i].parent = this.state.parentNodeIdForBranch;
                flatList[i].payload.parentNodeId = flatList[i].parent;
                // console.log("Branch parent ===", this.state.parentNodeIdForBranch);
            }
            var nodeId = parseInt(maxNodeId + 1);
            maxNodeId++;
            // console.log("Branch node id---", nodeId);
            // console.log("Branch parent---", flatList[i].parent);
            // console.log("Branch node arr---", nodeArr);
            var nodeData = nodeArr.length > 0 && flatList[i].level != 0 ? nodeArr.filter(x => x.oldId == flatList[i].parent)[0] : 0;
            // console.log("Branch node data---", nodeData);

            json = {
                oldId: flatList[i].id,
                newId: nodeId
            }
            nodeArr.push(json);

            flatList[i].id = nodeId;
            flatList[i].payload.nodeId = nodeId;


            if (flatList[i].level != 0) {
                flatList[i].parent = nodeData.newId;
                flatList[i].payload.parentNodeId = flatList[i].parent;
            }

            // console.log("Branch parent filter 1 ===", flatList[i].parent);
            // console.log("Branch parent filter  2 ===", items.filter(c => c.id == flatList[i].parent));
            var parentSortOrder = items.filter(c => c.id == flatList[i].parent)[0].sortOrder;
            var childList1 = items.filter(c => c.parent == flatList[i].parent);
            var maxSortOrder = childList1.length > 0 ? Math.max(...childList1.map(o => o.sortOrder.replace(parentSortOrder + '.', ''))) : 0;
            flatList[i].sortOrder = parentSortOrder.concat(".").concat(("0" + (Number(maxSortOrder) + 1)).slice(-2));

            if (flatList[i].payload.nodeDataMap[0][0].nodeDataModelingList.length > 0) {
                for (let j = 0; j < flatList[i].payload.nodeDataMap[0][0].nodeDataModelingList.length; j++) {
                    var modeling = (flatList[i].payload.nodeDataMap[0][0].nodeDataModelingList)[j];
                    var startMonthNoModeling = modeling.startDateNo < 0 ? modeling.startDateNo : parseInt(modeling.startDateNo - 1);
                    // console.log("startMonthNoModeling---", startMonthNoModeling);
                    modeling.startDate = moment(curMonth).startOf('month').add(startMonthNoModeling, 'months').format("YYYY-MM-DD");
                    var stopMonthNoModeling = modeling.stopDateNo < 0 ? modeling.stopDateNo : parseInt(modeling.stopDateNo - 1)
                    // console.log("stopMonthNoModeling---", stopMonthNoModeling);
                    modeling.stopDate = moment(curMonth).startOf('month').add(stopMonthNoModeling, 'months').format("YYYY-MM-DD");


                    // console.log("modeling---", modeling);
                    (flatList[i].payload.nodeDataMap[0][0].nodeDataModelingList)[j] = modeling;
                }
            }
            // console.log("flatList[i]---", flatList[i]);
            tempJson = flatList[i].payload.nodeDataMap[0][0];
            if (flatList[i].payload.nodeType.id != 1) {
                // console.log("month from tree template---", flatList[i].payload.nodeDataMap[0][0].monthNo + " cur month---", curMonth + " final result---", moment(curMonth).startOf('month').add(flatList[i].payload.nodeDataMap[0][0].monthNo, 'months').format("YYYY-MM-DD"))
                var monthNo = flatList[i].payload.nodeDataMap[0][0].monthNo < 0 ? flatList[i].payload.nodeDataMap[0][0].monthNo : parseInt(flatList[i].payload.nodeDataMap[0][0].monthNo - 1)
                tempJson.month = moment(curMonth).startOf('month').add(monthNo, 'months').format("YYYY-MM-DD");
            }
            tempArray.push(tempJson);
            if (scenarioList.length > 0) {
                for (let i = 0; i < scenarioList.length; i++) {
                    nodeDataMap[scenarioList[i].id] = tempArray;
                    nodeDataMap[scenarioList[i].id][0].nodeDataId = maxNodeDataId;
                    // console.log("Branch nodeDataMap---", nodeDataMap);
                    maxNodeDataId++;
                }
            }
            flatList[i].payload.nodeDataMap = nodeDataMap;
            items.push(JSON.parse(JSON.stringify(flatList[i])));
            // flatList[i].level = parseInt(parentLevel + 1);
            // parentLevel++;
            var findNodeIndex = items.findIndex(n => n.id == flatList[i].id);
            items[findNodeIndex].level = parseInt(parentLevel + 1);
            parentLevel++;
        }
        // console.log("Branch flatList---", flatList);
        // items.push(...flatList);
        this.setState({
            items,
            isBranchTemplateModalOpen: false,
            branchTemplateId: "",
            missingPUList: []
        }, () => {
            // console.log("Branch items---", this.state.items);
            this.calculateMOMData(0, 2);
        });
    }

    getUsagePeriodList() {
        const lan = 'en';
        var db1;
        var storeOS;
        getDatabase();
        var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var planningunitTransaction = db1.transaction(['usagePeriod'], 'readwrite');
            var planningunitOs = planningunitTransaction.objectStore('usagePeriod');
            var planningunitRequest = planningunitOs.getAll();
            var planningList = []
            planningunitRequest.onerror = function (event) {
                // Handle errors!
            };
            planningunitRequest.onsuccess = function (e) {
                var myResult = [];
                myResult = planningunitRequest.result;
                var proList = []
                // console.log("myResult===============5", myResult)

                this.setState({
                    usagePeriodList: myResult
                }, () => {

                })
            }.bind(this);
        }.bind(this)
    }

    getUsageTypeList() {
        const lan = 'en';
        var db1;
        var storeOS;
        getDatabase();
        var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var planningunitTransaction = db1.transaction(['usageType'], 'readwrite');
            var planningunitOs = planningunitTransaction.objectStore('usageType');
            var planningunitRequest = planningunitOs.getAll();
            var planningList = []
            planningunitRequest.onerror = function (event) {
                // Handle errors!
            };
            planningunitRequest.onsuccess = function (e) {
                var myResult = [];
                myResult = planningunitRequest.result;
                var proList = []
                // console.log("myResult===============6", myResult)

                this.setState({
                    usageTypeList: myResult
                }, () => {

                })
            }.bind(this);
        }.bind(this)
    }

    filterUsageTemplateList(tracerCategoryId, forecastingUnitId) {
        var usageTemplateList = [];
        // console.log("usage template tc---", tracerCategoryId)
        // console.log("usage template list all---", this.state.usageTemplateListAll)
        if (forecastingUnitId > 0) {
            usageTemplateList = this.state.usageTemplateListAll.filter(c => c.forecastingUnit.id == forecastingUnitId);
        }
        else if (tracerCategoryId != "" && tracerCategoryId != null) {
            // console.log("usage template if")
            usageTemplateList = this.state.usageTemplateListAll.filter(c => c.tracerCategory.id == tracerCategoryId);
        } else {
            // console.log("usage template else")
            usageTemplateList = this.state.usageTemplateListAll;
        }
        this.setState({
            usageTemplateList
        }, () => {
            // console.log("usageTemplateList after filter---", this.state.usageTemplateList);
        });
    }

    getUsageTemplateList(fuIdArray) {
        // console.log("tracerCategoryId---", tracerCategoryId);
        const lan = 'en';
        var db1;
        var storeOS;
        getDatabase();
        var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var planningunitTransaction = db1.transaction(['usageTemplate'], 'readwrite');
            var planningunitOs = planningunitTransaction.objectStore('usageTemplate');
            var planningunitRequest = planningunitOs.getAll();
            planningunitRequest.onerror = function (event) {
                // Handle errors!
            };
            planningunitRequest.onsuccess = function (e) {
                var myResult = [];
                myResult = planningunitRequest.result;
                myResult.sort((a, b) => {
                    var itemLabelA = getLabelText(a.label, this.state.lang).toUpperCase(); // ignore upper and lowercase
                    var itemLabelB = getLabelText(b.label, this.state.lang).toUpperCase(); // ignore upper and lowercase                   
                    return itemLabelA > itemLabelB ? 1 : -1;
                });
                // console.log("myResult===============6", myResult);
                // console.log("fuIdArray---", fuIdArray);
                var usageTemplateListAll = myResult.filter(el => fuIdArray.indexOf(el.forecastingUnit.id) != -1 && el.active && (el.program == null || el.program.id == this.state.programId.split("_")[0]));
                // console.log("before usageTemplateList All===============>", usageTemplateListAll)
                // console.log("before1 usageTemplateList All===============>", myResult.filter(el => el.forecastingUnit.id == 2665))
                // console.log("before2 usageTemplateList All===============>", myResult.filter(el => el.forecastingUnit.id == 915))
                this.setState({
                    usageTemplateListAll
                }, () => {
                    // console.log("after usageTemplateList All===============>", this.state.usageTemplateListAll)
                })
            }.bind(this);
        }.bind(this)
    }

    getForecastingUnitListByTracerCategory(tracerCategoryId) {
        const lan = 'en';
        var db1;
        var storeOS;
        getDatabase();
        var openRequest = indexedDB.open(INDEXED_DB_NAME, INDEXED_DB_VERSION);
        openRequest.onsuccess = function (e) {
            db1 = e.target.result;
            var planningunitTransaction = db1.transaction(['forecastingUnit'], 'readwrite');
            var planningunitOs = planningunitTransaction.objectStore('forecastingUnit');
            var planningunitRequest = planningunitOs.getAll();
            var planningList = []
            planningunitRequest.onerror = function (event) {
                // Handle errors!
            };
            planningunitRequest.onsuccess = function (e) {
                var myResult = [];
                myResult = planningunitRequest.result;
                var proList = []
                // console.log("myResult===============123", myResult)
                for (var i = 0; i < myResult.length; i++) {
                    if (myResult[i].tracerCategory.id == tracerCategoryId) {
                        proList[i] = myResult[i]
                    }
                }
                // console.log("myResult===============123", proList)

                this.setState({
                    forecastingUnitByTracerCategory: proList
                }, () => {

                })
            }.bind(this);
        }.bind(this)
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
        window.onbeforeunload = null;
    }

    componentDidUpdate = () => {
        if (this.state.isChanged == true || this.state.isTreeDataChanged == true || this.state.isScenarioChanged == true) {
            window.onbeforeunload = () => true
        } else {
            window.onbeforeunload = undefined
        }
    }


    componentDidMount() {
        this.setState({
            treeId: this.props.match.params.treeId,
            templateId: this.props.match.params.templateId
        }, () => {
            // console.log("on mount ---", this.state.programId);
            this.getUsagePeriodList();
            this.getTreeList();
            this.getForecastMethodList();
            this.getUnitListForDimensionIdFour();
            this.getUnitList();
            this.getUsageTypeList();
            // this.getUsageTemplateList();
            this.getNodeTyeList();
            this.getDatasetList();
            this.getModelingTypeList();
            this.getRegionList();
            this.procurementAgentList();
            // this.getBranchTemplateList();
            // if (this.props.match.params.scenarioId != null && this.props.match.params.scenarioId != "") {
            //     this.callAfterScenarioChange(this.props.match.params.scenarioId);
            // }
        })
    }
    addScenario() {
        const { scenario, curTreeObj } = this.state;
        var scenarioList = this.state.scenarioList;
        var type = this.state.scenarioActionType;
        var items = curTreeObj.tree.flatList;
        var scenarioId;
        var temNodeDataMap = [];
        var result = scenarioList.filter(x => x.label.label_en.trim() == scenario.label.label_en.trim());
        if ((type == 1 && result.length == 0) || (type == 2 && ((result.length == 1 && scenario.id == result[0].id) || result.length == 0)) || type == 3) {
            if (type == 1) {
                var maxScenarioId = Math.max(...scenarioList.map(o => o.id));
                var minScenarioId = Math.min(...scenarioList.map(o => o.id));
                scenarioId = parseInt(maxScenarioId) + 1;
                var newTabObject = {
                    id: scenarioId,
                    label: {
                        label_en: scenario.label.label_en
                    },
                    notes: scenario.notes,
                    active: true
                };
                // console.log("tab data---", newTabObject);
                scenarioList = [...scenarioList, newTabObject];
                // console.log("tabList---", tabList1)
                if (this.state.treeId != "") {
                    if (this.state.scenarioList.length > 1) {

                    }

                    // console.log("***>minScenarioId---", items);
                    var tArr = [];
                    for (var i = 0; i < items.length; i++) {
                        for (let j = 0; j < scenarioList.length; j++) {
                            if (items[i].payload.nodeDataMap.hasOwnProperty(scenarioList[j].id)) {
                                temNodeDataMap.push(items[i].payload.nodeDataMap[scenarioList[j].id][0]);
                                tArr.push(items[i].payload.nodeDataMap[scenarioList[j].id][0].nodeDataId);
                            }
                        }
                        var tempArray = [];
                        var nodeDataMap = {};
                        // tempArray = items[i].payload.nodeDataMap;
                        tempArray.push(JSON.parse(JSON.stringify((items[i].payload.nodeDataMap[minScenarioId])[0])));
                        nodeDataMap = items[i].payload.nodeDataMap;
                        nodeDataMap[scenarioId] = tempArray;
                        // var nodeDataId = this.getMaxNodeDataId(items);
                        // console.log("nodeDataId---", nodeDataId);
                        nodeDataMap[scenarioId][0].nodeDataId = "";
                        items[i].payload.nodeDataMap = nodeDataMap;
                    }
                    // console.log("items-----------%%%%%%", items);
                    // console.log("tArr---", tArr);

                }
            } else if (type == 2 || type == 3) {
                scenarioId = this.state.selectedScenario;
                var scenario1 = scenarioList.filter(x => x.id == scenarioId)[0];
                var findNodeIndex = scenarioList.findIndex(n => n.id == scenarioId);
                if (type == 2) {
                    // console.log("this.state.scenario---", this.state.scenario);
                    scenarioList[findNodeIndex] = this.state.scenario;
                    // console.log("my scenarioList---", scenarioList);
                } else if (type == 3) {
                    items = [];
                    scenarioId = '';
                    scenario1.active = false;
                    scenarioList[findNodeIndex] = scenario1;
                }


            }

            curTreeObj.scenarioList = scenarioList;
            this.setState({
                showDiv1: false,
                curTreeObj,
                items,
                selectedScenario: scenarioId,
                scenarioList: scenarioList.filter(x => x.active == true),
                openAddScenarioModal: false,
                isScenarioChanged: true
            }, () => {
                // console.log("final tab list---", this.state.items);
                if (type == 1) {
                    var maxNodeDataId = temNodeDataMap.length > 0 ? Math.max(...temNodeDataMap.map(o => o.nodeDataId)) : 0;
                    // console.log("scenarioId---", scenarioId);
                    for (var i = 0; i < items.length; i++) {
                        maxNodeDataId = parseInt(maxNodeDataId) + 1;
                        (items[i].payload.nodeDataMap[scenarioId])[0].nodeDataId = maxNodeDataId;
                        // console.log("my node data id--->", (items[i].payload.nodeDataMap[scenarioId])[0].nodeDataId);
                    }
                    this.callAfterScenarioChange(scenarioId);
                    // this.updateTreeData();
                }
                this.saveTreeData(false, false);
            });
        } else {
            alert(i18n.t('static.tree.duplicateScenarioName'));
        }
    }
    nodeTypeChange(value) {
        var nodeTypeId = value;
        // console.log("node type value---", nodeTypeId)
        var { currentItemConfig } = this.state;
        if (nodeTypeId == 1) {
            this.setState({
                numberNode: false,
                aggregationNode: false
            });
        } else if (nodeTypeId == 2) {
            // Number node
            // console.log("case 2")
            this.setState({
                numberNode: false,
                aggregationNode: true
            });
        }
        else if (nodeTypeId == 3) {
            // Percentage node
            this.setState({
                numberNode: true,
                aggregationNode: true

            });
        }
        else if (nodeTypeId == 4) {
            // Forecasting unit node
            if (currentItemConfig.context.payload.label.label_en == "" || currentItemConfig.context.payload.label.label_en == null) {
                if (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].fuNode != null && currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].fuNode != "" && currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].fuNode != undefined && currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].fuNode.forecastingUnit != null && currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].fuNode.forecastingUnit != "" && currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].fuNode.forecastingUnit != undefined && (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.forecastingUnit.id != "" && (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.forecastingUnit.id != null && (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.forecastingUnit.id != undefined) {
                    currentItemConfig.context.payload.label.label_en = getLabelText((currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.forecastingUnit.label, this.state.lang).trim();
                }
            }
            if (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].fuNode == null || currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].fuNode == "" || currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].fuNode == undefined) {
                currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].fuNode = {
                    oneTimeUsage: "false",
                    lagInMonths: 0,
                    forecastingUnit: {
                        tracerCategory: {

                        },
                        unit: {
                            id: ""
                        },
                        label: {
                            label_en: ""
                        }
                    },
                    usageType: {

                    },
                    usagePeriod: {
                        usagePeriodId: 1
                    },
                    repeatCount: '',
                    repeatUsagePeriod: {
                        usagePeriodId: 1
                    }
                }

                currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].puNode = {
                    planningUnit: {
                        id: '',
                        unit: {
                            id: ""
                        },
                        multiplier: ''
                    },
                    refillMonths: '',
                    sharePlanningUnit: "false"
                }
            }
            this.setState({
                numberNode: true,
                aggregationNode: true,
                showFUValidation: true
            }, () => {
                this.getNodeUnitOfPrent();
            });
        }

        // console.log("inside node type change---", (nodeTypeId == 3 || nodeTypeId == 4 || nodeTypeId == 5) && this.state.addNodeFlag && currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].dataValue == "");
        if ((nodeTypeId == 3 || nodeTypeId == 4 || nodeTypeId == 5) && this.state.addNodeFlag && currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].dataValue == "") {
            currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].dataValue = 100;
            // currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].calculatedDataValue = ((100 * currentItemConfig.parentItem.payload.nodeDataMap[this.state.selectedScenario][0].calculatedDataValue) / 100).toString()
            this.setState({ currentItemConfig, currentScenario: currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0] }, () => {
                this.calculateParentValueFromMOM(currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].month);
            })
        }
        if (this.state.addNodeFlag) {
            this.getSameLevelNodeList(parseInt(currentItemConfig.context.level + 1), 0, nodeTypeId, currentItemConfig.context.parent);
            // this.getNodeTransferList(currentItemConfig.context.level, 0, currentItemConfig.context.payload.nodeType.id, currentItemConfig.context.parent, 0);
        }
    }

    toggleModal(tabPane, tab) {
        const newArray = this.state.activeTab1.slice()
        newArray[tabPane] = tab
        this.setState({
            activeTab1: newArray,
            showCalculatorFields: false
        }, () => {

            var isValid = document.getElementById('isValidError').value;
            // console.log("isValid 1---", isValid);
            this.setState({ isValidError: isValid });

            if (this.state.currentItemConfig.context.payload.nodeType.id == 1) {
                if (tab == 2) {
                    this.showMomData();
                }
            }
            if (tab == 3) {
                // this.refs.extrapolationChild.buildJexcel();
                if (this.state.modelingEl != "") {
                    // this.state.modelingEl.destroy();
                    jexcel.destroy(document.getElementById('modelingJexcel'), true);

                    if (this.state.momEl != "") {
                        // this.state.momEl.destroy();
                        if (document.getElementById('momJexcel') != null) {
                            jexcel.destroy(document.getElementById('momJexcel'), true);
                        }

                    }
                    else if (this.state.momElPer != "") {
                        // this.state.momElPer.destroy();
                        jexcel.destroy(document.getElementById('momJexcelPer'), true);
                    }
                }


                this.refs.extrapolationChild.getExtrapolationMethodList();
            }
            if (tab == 2) {
                // console.log("***$$$$ ", document.getElementById('isValidError').value);
                if (this.state.currentItemConfig.context.payload.nodeType.id != 1) {
                    var curDate = (moment(Date.now()).utcOffset('-0500').format('YYYY-MM-DD'));
                    var month = this.state.currentScenario.month;

                    var minMonth = this.state.forecastStartDate;
                    var maxMonth = this.state.forecastStopDate;
                    // console.log("minMonth---", minMonth);
                    // console.log("maxMonth---", maxMonth);
                    var modelingTypeList = this.state.modelingTypeList;
                    var arr = [];
                    if (this.state.currentItemConfig.context.payload.nodeType.id == 2) {
                        arr = modelingTypeList.filter(x => x.modelingTypeId != 1 && x.modelingTypeId != 5);
                    } else {
                        arr = modelingTypeList.filter(x => x.modelingTypeId == 5);
                    }
                    // console.log("arr---", arr);
                    var modelingTypeListNew = [];
                    for (var i = 0; i < arr.length; i++) {
                        // console.log("arr[i]---", arr[i]);
                        modelingTypeListNew[i] = { id: arr[i].modelingTypeId, name: getLabelText(arr[i].label, this.state.lang) }
                    }
                    this.setState({
                        showModelingJexcelNumber: true,
                        minMonth, maxMonth, filteredModelingType: modelingTypeListNew,
                        scalingMonth: {
                            year: Number(new Date(this.state.currentScenario.month.replace(/-/g, '\/')).getFullYear()), month: Number(("0" + (new Date(this.state.currentScenario.month.replace(/-/g, '\/')).getMonth() + 1)).slice(-2))
                        },
                    }, () => {
                        if(!this.state.modelingTabChanged)
                            this.buildModelingJexcel();
                    })

                }
                else {
                    this.setState({
                        showModelingJexcelNumber: true,
                        scalingMonth: {
                            year: Number(new Date(this.state.currentScenario.month.replace(/-/g, '\/')).getFullYear()), month: Number(("0" + (new Date(this.state.currentScenario.month.replace(/-/g, '\/')).getMonth() + 1)).slice(-2))
                        },
                    }, () => {
                        if(!this.state.modelingTabChanged)
                            this.buildModelingJexcel();
                    })
                }
                // console.log("get label method---",this.state.modelingEl.getLabel('3'))
                //  else if (this.state.currentItemConfig.context.payload.nodeType.id == 3) {
                //     this.setState({ showModelingJexcelPercent: true }, () => {
                //         this.buildModelingJexcelPercent()
                //     })
                // }
            }
        });
    }

    resetTree() {
        this.componentDidMount();
        // this.setState({ items: TreeData.demographic_scenario_two });
    }
    scenarioChange(event) {
        // console.log("event---", event);
        const { scenario } = this.state;
        if (event.target.name === "scenarioName") {
            scenario.label.label_en = event.target.value;
        }
        if (event.target.name === "scenarioDesc") {
            scenario.notes = event.target.value;
        }
        // scenario.id = 1;
        this.setState({
            idScenarioChanged: true,
            scenario
        });
    }
    treeDataChange(event) {
        // console.log("event---", event);
        let { curTreeObj } = this.state;
        if (event.target.name === "treeName") {
            var label = {
                label_en: event.target.value
            }
            curTreeObj.label = label;

        }
        if (event.target.name == "active") {
            curTreeObj.active = event.target.id === "active11" ? false : true;
        }

        if (event.target.name === "forecastMethodId") {
            // console.log("event.target.value----", this.state.forecastMethodList);
            // console.log("forecast method---", this.state.forecastMethodList.filter(x => x.forecastMethodId == event.target.value)[0].label.label_en)
            // var forecastMethodId = event.target.value;
            var forecastMethod = {
                id: event.target.value,
                label: {
                    label_en: event.target.value != "" ? this.state.forecastMethodList.filter(x => x.forecastMethodId == event.target.value)[0].label.label_en : ''
                }
            };
            curTreeObj.forecastMethod = forecastMethod;
            // console.log("immidiate tree--->", curTreeObj);
        }

        if (event.target.name === "treeNotes") {
            curTreeObj.notes = event.target.value;
        }


        this.setState({ curTreeObj, isTreeDataChanged: true }, () => {
            // console.log("curTreeObj---", curTreeObj);
        });

    }
    dataChange(event) {
        // alert("hi");
        var flag = false;
        // console.log("event---", event);
        let { curTreeObj } = this.state;
        let { currentItemConfig } = this.state;
        let { treeTemplate } = this.state;
        var scenarioId = this.state.selectedScenario;
        this.setState({ addNodeError: false })
        if (event.target.name === "branchTemplateId") {
            this.setState({ branchTemplateId: event.target.value }, () => {
                // console.log("In data change Test@@@@@@@")
                this.getMissingPuListBranchTemplate();
            });
        }
        if (event.target.name === "currentEndValue") {

            this.setState({
                currentEndValue: event.target.value,
                currentEndValueEdit: false,
                currentTargetChangePercentageEdit: event.target.value != '' ? true : false,
                currentTargetChangeNumberEdit: event.target.value != '' ? true : false
            });
        }

        if (event.target.name === "currentTargetChangePercentage") {
            this.setState({
                currentTargetChangePercentage: event.target.value,
                currentEndValueEdit: event.target.value != '' ? true : false,
                currentTargetChangePercentageEdit: false,
                currentTargetChangeNumberEdit: event.target.value != '' ? true : false
            });
        }
        if (event.target.name === "currentTargetChangeNumber") {
            this.setState({
                currentTargetChangeNumber: event.target.value,
                currentEndValueEdit: event.target.value != '' ? true : false,
                currentTargetChangePercentageEdit: event.target.value != '' ? true : false,
                currentTargetChangeNumberEdit: false
            });
        }


        if (event.target.name == "treeId") {
            var treeId = 0;
            // console.log("data change---", event.target.value);
            if (event.target.value != null) {
                treeId = event.target.value;
                this.setState({
                    treeId,
                    items: [],
                    selectedScenario: '',
                    selectedScenarioLabel: '',
                    currentScenario: []
                });
            }
            this.getTreeByTreeId(treeId);

        }

        if (event.target.name == "scenarioId") {
            // console.log("scenario id---", event.target.value)

            if (event.target.value != "") {
                // console.log("scenario if----------")
                var scenarioId = event.target.value;
                var scenario = document.getElementById("scenarioId");
                var selectedText = scenario.options[scenario.selectedIndex].text;
                // console.log("Seema scenarioId", scenarioId)
                // console.log("Seema selectedText", selectedText)
                // console.log("Seema selected", document.getElementById("scenarioId"))

                this.setState({
                    selectedScenario: scenarioId,
                    selectedScenarioLabel: selectedText,
                    currentScenario: []
                }, () => {
                    // console.log("after state update scenario if---", this.state.selectedScenario);
                    this.callAfterScenarioChange(scenarioId);
                });
            } else {
                // console.log("scenario else----------")
                this.setState({
                    items: [],
                    selectedScenario: '',
                    selectedScenarioLabel: '',
                    currentScenario: []
                }, () => {
                    // console.log("after state update scenario else---", this.state.selectedScenario);
                });
            }
            // curTreeObj.treeId = event.target.value;
            // this.getTreeByTreeId(event.target.value);
        }


        if (event.target.name == "modelingType") {
            console.log("event.target.id", event.target.value)
            if (event.target.value == "active1") {
                this.setState({ currentModelingType: 4, targetSelectDisable: true })
            }
            else if (event.target.value == "active2") {
                this.setState({ currentModelingType: 3, targetSelectDisable: true })
            }
            else if (event.target.value == "active3") {
                this.setState({ currentModelingType: 2, targetSelectDisable: false })
            }
            else {
                this.setState({ currentModelingType: 5, targetSelectDisable: true })
            }
            if (!this.state.currentTargetChangeNumberEdit && this.state.currentModelingType != 2) {
                // console.log("inside if calculator radio button");
                this.setState({
                    currentTargetChangePercentageEdit: false,
                    currentEndValueEdit: false
                });
            }
            this.setState({ isCalculateClicked: 1 })
            // this.buildModelingCalculatorJexcel();
        }

        if (event.target.name === "targetSelect") {
            this.setState({
                targetSelect: event.target.value == "target1" ? 1 : 0
            });
        }

        if (event.target.name === "targetYears") {
            this.setState({
                yearsOfTarget: event.target.value,
                isCalculateClicked: 1
            }, () => {
                this.buildModelingCalculatorJexcel();
            });
        }

        if (event.target.name === "sharePlanningUnit") {
            // console.log("event.target.name", event.target.value);
            (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].puNode.sharePlanningUnit = event.target.id === "sharePlanningUnitFalse" ? false : true;
            this.qatCalculatedPUPerVisit(2);
            this.getUsageText();
        }
        if (event.target.name === "refillMonths") {
            (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].puNode.refillMonths = event.target.value;
            flag = true;
            // this.getUsageText();
        }

        if (event.target.name === "puPerVisit") {
            (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].puNode.puPerVisit = event.target.value;
            // console.log("event.target.value pu per visit---", event.target.value);
            this.getUsageText();
        }


        // if (event.target.name === "forecastMethodId") {
        //     treeTemplatee.forecastMethod.id = event.target.value;
        // }

        if (event.target.name === "usageTemplateId") {
            this.setState({
                usageTemplateId: event.target.value
            });
        }

        if (event.target.name === "nodeTitle") {
            // console.log("before change node title---", currentItemConfig);
            currentItemConfig.context.payload.label.label_en = event.target.value;
        }
        if (event.target.name === "nodeTypeId") {
            currentItemConfig.context.payload.nodeType.id = event.target.value;
            if (event.target.value == 5) {
                this.getNoOfMonthsInUsagePeriod();
                this.getNoFURequired();
            }
        }
        if (event.target.name === "nodeUnitId") {
            currentItemConfig.context.payload.nodeUnit.id = event.target.value;
            var nodeUnit = document.getElementById("nodeUnitId");
            var selectedText = nodeUnit.options[nodeUnit.selectedIndex].text;
            var label = {
                label_en: selectedText,
                label_fr: '',
                label_sp: '',
                label_pr: ''
            }
            // console.log("node unit label---", label);
            currentItemConfig.context.payload.nodeUnit.label = label;
            // console.log("after node unit label---", currentItemConfig);

        }
        if (event.target.name === "percentageOfParent") {

            // console.log("event.target.value---", (event.target.value).replaceAll(",", ""));
            var value = (event.target.value).replaceAll(",", "");
            (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].dataValue = value;
            this.state.currentScenario.dataValue = value;
            // console.log("currentItemConfig.context.payload after$$$", currentItemConfig.context.payload);
            // console.log("current scenario$$$", this.state.currentScenario);
            this.calculateParentValueFromMOM((currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].month);
        }
        if (event.target.name === "nodeValue") {
            // console.log("$$$$-----==>", (event.target.value).replaceAll(",", ""));
            (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].dataValue = (event.target.value).replaceAll(",", "");
            (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].calculatedDataValue = (event.target.value).replaceAll(",", "");
        }
        if (event.target.name === "notes") {
            (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].notes = event.target.value;
            this.getNotes();
        }

        if (event.target.name === "tracerCategoryId") {
            // console.log("currentItemConfig before tc---", currentItemConfig);
            var fuNode = (currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode;

            currentItemConfig.context.payload.nodeDataMap[scenarioId][0].fuNode.forecastingUnit.tracerCategory.id = event.target.value;
            this.filterUsageTemplateList(event.target.value, 0);
        }

        if (event.target.name === "noOfPersons") {
            (currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.noOfPersons = (event.target.value).replaceAll(",", "");
            this.getNoOfMonthsInUsagePeriod();
            this.getNoFURequired();
            this.getUsageText();
        }

        if (event.target.name === "lagInMonths") {
            (currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.lagInMonths = event.target.value;
        }



        if (event.target.name === "forecastingUnitPerPersonsFC") {
            (currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.noOfForecastingUnitsPerPerson = (event.target.value).replaceAll(",", "");
            if (currentItemConfig.context.payload.nodeType.id == 4 && (currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.usageType.id == 1) {
                this.getNoOfFUPatient();
            }
            this.getNoOfMonthsInUsagePeriod();
            this.getNoFURequired();
            this.getUsageText();
        }

        if (event.target.name === "oneTimeUsage") {
            (currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.oneTimeUsage = event.target.value;
            this.getNoOfMonthsInUsagePeriod();
            this.getNoFURequired();
            this.getUsageText();

        }

        if (event.target.name === "repeatUsagePeriodId") {
            var fuNode = (currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode;
            var repeatUsagePeriod = document.getElementById("repeatUsagePeriodId");
            var selectedText = repeatUsagePeriod.options[repeatUsagePeriod.selectedIndex].text;

            var repeatUsagePeriod = {
                usagePeriodId: event.target.value,
                label: {
                    label_en: selectedText
                }
            }
            fuNode.repeatUsagePeriod = repeatUsagePeriod;
            (currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode = fuNode;
            this.getNoOfMonthsInUsagePeriod();
            this.getNoFURequired();
            this.getUsageText();
        }

        if (event.target.name === "repeatCount") {
            (currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.repeatCount = (event.target.value).replaceAll(",", "");
            this.getNoOfMonthsInUsagePeriod();
            this.getNoFURequired();
            this.getUsageText();
        }

        if (event.target.name === "usageFrequencyCon" || event.target.name === "usageFrequencyDis") {
            (currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.usageFrequency = (event.target.value).replaceAll(",", "");
            this.getNoOfMonthsInUsagePeriod();
            this.getNoFURequired();
            this.getUsageText();
        }

        if (event.target.name === "usagePeriodIdCon" || event.target.name === "usagePeriodIdDis") {
            var fuNode = (currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode;
            var usagePeriod = event.target.name === "usagePeriodIdCon" ? document.getElementById("usagePeriodIdCon") : document.getElementById("usagePeriodIdDis");
            var selectedText = usagePeriod.options[usagePeriod.selectedIndex].text;
            // console.log("selectedText usage period---", selectedText);
            var usagePeriod = {
                usagePeriodId: event.target.value,
                label: {
                    label_en: selectedText
                }
            }
            fuNode.usagePeriod = usagePeriod;
            (currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode = fuNode;
            this.getNoOfMonthsInUsagePeriod();
            this.getNoFURequired();
            this.getUsageText();
        }
        if (event.target.name === "usageTypeIdFU") {
            if (event.target.value == 2 && currentItemConfig.context.payload.nodeType.id == 4) {
                (currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode.noOfPersons = 1;
            }
            var fuNode = (currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode;
            var usageTypeIdFU = document.getElementById("usageTypeIdFU");
            var selectedText = usageTypeIdFU.options[usageTypeIdFU.selectedIndex].text;
            // console.log("selectedText usage type---", selectedText);

            var usageType = {
                id: event.target.value,
                label: {
                    label_en: selectedText
                }
            }
            fuNode.usageType = usageType;
            (currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].fuNode = fuNode;
            // console.log("currentItemConfig for repeat---", currentItemConfig);
        }


        if (event.target.name === "planningUnitIdFU") {
            this.setState({ tempPlanningUnitId: event.target.value });
        }

        if (event.target.name === "planningUnitId") {
            if (event.target.value != "") {
                var pu = (this.state.planningUnitList.filter(c => c.id == event.target.value))[0];
                (currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].puNode.planningUnit.unit.id = pu.unit.id;
                (currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].puNode.planningUnit.id = event.target.value;
                (currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].puNode.planningUnit.multiplier = pu.multiplier;
                (currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].isPUMappingCorrect = 1;
                currentItemConfig.context.payload.label = JSON.parse(JSON.stringify(pu.label));
            } else {
                (currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].puNode.planningUnit.unit.id = '';
                (currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].puNode.planningUnit.id = '';
                (currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].puNode.planningUnit.multiplier = '';
                (currentItemConfig.context.payload.nodeDataMap[scenarioId])[0].isPUMappingCorrect = 0;
                var label = {
                    label_en: '',
                    label_fr: '',
                    label_sp: '',
                    label_pr: ''
                }
                currentItemConfig.context.payload.label = JSON.parse(JSON.stringify(label));
            }
            this.setState({
                conversionFactor: event.target.value != "" && pu != "" ? pu.multiplier : ''
            }, () => {
                flag = true;
                this.qatCalculatedPUPerVisit(0);
            });
        }

        // console.log("anchal 1---", currentItemConfig)
        // console.log("anchal 2---", this.state.selectedScenario)

        // console.log("Seema currentItemConfig", currentItemConfig)
        // console.log("Seema [this.state.selectedScenario]", [this.state.selectedScenario])
        // console.log("Seema currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario]", currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])
        if (event.target.name != "treeId") {
            this.setState({
                currentItemConfig,
                currentScenario: (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0],
                isChanged: true
            }, () => {
                // console.log("after state update---", this.state.currentItemConfig);
                // console.log("after state update current scenario---", this.state.currentScenario);
                if (flag) {
                    if (event.target.name === "planningUnitId") {
                        this.calculatePUPerVisit(false);
                    } else if (event.target.name === "refillMonths") {
                        this.calculatePUPerVisit(true);
                        this.qatCalculatedPUPerVisit(0);
                        this.getUsageText();
                    } else { }
                }
            });
        }
    }
    createPUNode(itemConfig, parent) {
        // console.log("create PU node---", itemConfig);
        const { items } = this.state;
        var maxNodeId = items.length > 0 ? Math.max(...items.map(o => o.id)) : 0;
        var nodeId = parseInt(maxNodeId + 1);
        var newItem = itemConfig.context;
        newItem.parent = parent;
        newItem.id = nodeId;
        const { curTreeObj } = this.state;
        var treeLevelList = curTreeObj.levelList != undefined ? curTreeObj.levelList : [];
        var levelListFiltered = treeLevelList.findIndex(c => c.levelNo == parseInt(itemConfig.context.level + 1));
        if (levelListFiltered == -1) {
            var label = {}
            var unitId = this.state.currentItemConfig.context.payload.nodeType.id == 4 ? this.state.currentItemConfig.parentItem.payload.nodeUnit.id : this.state.currentItemConfig.context.payload.nodeUnit.id;
            if (unitId != "" && unitId != null) {
                label = this.state.nodeUnitList.filter(c => c.unitId == unitId)[0].label;
            }
            treeLevelList.push({
                levelId: null,
                levelNo: parseInt(itemConfig.context.level + 1),
                label: {
                    label_en: "Level" + " " + parseInt(itemConfig.context.level + 1),
                    label_sp: "",
                    label_pr: "",
                    label_fr: ""
                },
                unit: {
                    id: unitId != "" && unitId != null ? parseInt(unitId) : null,
                    label: label
                }
            })
        }
        curTreeObj.levelList = treeLevelList;
        newItem.level = parseInt(itemConfig.context.level + 1);
        newItem.payload.nodeId = nodeId;
        var pu = this.state.planningUnitList.filter(x => x.id == this.state.tempPlanningUnitId)[0];
        newItem.payload.label = pu.label;
        newItem.payload.nodeType.id = 5;
        // newItem.isVisible = this.state.hideFUPUNode || this.state.hidePUNode ? false : true;
        // var parentSortOrder = items.filter(c => c.id == parent)[0].sortOrder;
        // var childList = items.filter(c => c.parent == parent);
        newItem.sortOrder = itemConfig.context.sortOrder.concat(".").concat(("01").slice(-2));
        // console.log("pu node month---", (newItem.payload.nodeDataMap[this.state.selectedScenario])[0].month);
        (newItem.payload.nodeDataMap[this.state.selectedScenario])[0].nodeDataId = this.getMaxNodeDataId();
        (newItem.payload.nodeDataMap[this.state.selectedScenario])[0].dataValue = 100;
        (newItem.payload.nodeDataMap[this.state.selectedScenario])[0].displayDataValue = (newItem.payload.nodeDataMap[this.state.selectedScenario])[0].dataValue;
        (newItem.payload.nodeDataMap[this.state.selectedScenario])[0].displayCalculatedDataValue = (newItem.payload.nodeDataMap[this.state.selectedScenario])[0].calculatedDataValue;
        // (newItem.payload.nodeDataMap[this.state.selectedScenario])[0].month = moment((newItem.payload.nodeDataMap[this.state.selectedScenario])[0].month).startOf('month').format("YYYY-MM-DD")
        (newItem.payload.nodeDataMap[this.state.selectedScenario])[0].puNode.planningUnit.id = this.state.tempPlanningUnitId;
        (newItem.payload.nodeDataMap[this.state.selectedScenario])[0].puNode.planningUnit.label = pu.label;
        try {
            var puPerVisit = "";
            if (itemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].fuNode.usageType.id == 2) {
                var refillMonths = 1;
                (newItem.payload.nodeDataMap[this.state.selectedScenario])[0].puNode.refillMonths = refillMonths;
                // console.log("AUTO refillMonths---", refillMonths);
                // console.log("AUTO 1 noOfMonthsInUsagePeriod---", this.state.noOfMonthsInUsagePeriod);
                puPerVisit = parseFloat(((itemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].fuNode.noOfForecastingUnitsPerPerson / this.state.noOfMonthsInUsagePeriod) * refillMonths) / pu.multiplier).toFixed(8);
            } else {
                // console.log("AUTO 2 noOfMonthsInUsagePeriod---", this.state.noOfMonthsInUsagePeriod);
                puPerVisit = parseFloat(this.state.noFURequired / pu.multiplier).toFixed(8);
            }

            // console.log("AUTO puPerVisit---", puPerVisit);
            (newItem.payload.nodeDataMap[this.state.selectedScenario])[0].puNode.puPerVisit = puPerVisit;
        } catch (err) {
            (newItem.payload.nodeDataMap[this.state.selectedScenario])[0].puNode.refillMonths = 1;
            (newItem.payload.nodeDataMap[this.state.selectedScenario])[0].puNode.puPerVisit = "";
        }


        (newItem.payload.nodeDataMap[this.state.selectedScenario])[0].puNode.sharePlanningUnit = true;
        (newItem.payload.nodeDataMap[this.state.selectedScenario])[0].puNode.planningUnit.multiplier = pu.multiplier;
        // if (itemConfig.context.payload.nodeType.id == 4) {
        //     (newItem.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.forecastingUnit.label.label_en = (itemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.forecastingUnit.label.label_en;
        // }
        var scenarioList = this.state.scenarioList.filter(x => x.id != this.state.selectedScenario);
        if (scenarioList.length > 0) {
            for (let i = 0; i < scenarioList.length; i++) {
                var tempArray = [];
                var nodeDataMap = {};
                tempArray.push(JSON.parse(JSON.stringify((newItem.payload.nodeDataMap[this.state.selectedScenario])[0])));
                // console.log("tempArray---", tempArray);
                nodeDataMap = newItem.payload.nodeDataMap;
                tempArray[0].nodeDataId = this.getMaxNodeDataId();
                nodeDataMap[scenarioList[i].id] = tempArray;
                // nodeDataMap[scenarioList[i].id][0].nodeDataId = scenarioList[i].id;
                newItem.payload.nodeDataMap = nodeDataMap;
                // (newItem.payload.nodeDataMap[scenarioList[i].id])[0] = (newItem.payload.nodeDataMap[this.state.selectedScenario]);
            }
        }
        // console.log("pu node add button clicked value after update---", newItem);
        // console.log("pu node add button clicked value after update---", newItem.payload.nodeDataMap.length);

        this.setState({
            items: [...items, newItem],
            cursorItem: nodeId,
            converionFactor: pu.multiplier,
            curTreeObj
        }, () => {

            // console.log("on add items-------", this.state.items);
            if (!itemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].extrapolation) {
                this.calculateMOMData(newItem.id, 0);
            } else {
                this.setState({
                    loading: false
                })
            }
            // this.calculateValuesForAggregateNode(this.state.items);
        });
    }
    onAddButtonClick(itemConfig, addNode, data) {
        // console.log("add button clicked---", itemConfig);
        const { items } = this.state;
        var maxNodeId = items.length > 0 ? Math.max(...items.map(o => o.id)) : 0;
        var nodeId = parseInt(maxNodeId + 1);
        // setTimeout(() => {
        var newItem = itemConfig.context;
        newItem.parent = itemConfig.context.parent;
        newItem.id = nodeId;
        const { curTreeObj } = this.state;
        var treeLevelList = curTreeObj.levelList != undefined ? curTreeObj.levelList : [];
        var levelListFiltered = treeLevelList.findIndex(c => c.levelNo == parseInt(itemConfig.context.level + 1));
        if (levelListFiltered == -1) {
            var label = {}
            var unitId = this.state.currentItemConfig.context.payload.nodeType.id == 4 ? this.state.currentItemConfig.parentItem.payload.nodeUnit.id : this.state.currentItemConfig.context.payload.nodeUnit.id;
            if (unitId != "" && unitId != null) {
                label = this.state.nodeUnitList.filter(c => c.unitId == unitId)[0].label;
            }
            treeLevelList.push({
                levelId: null,
                levelNo: parseInt(itemConfig.context.level + 1),
                label: {
                    label_en: "Level" + " " + parseInt(itemConfig.context.level + 1),
                    label_sp: "",
                    label_pr: "",
                    label_fr: ""
                },
                unit: {
                    id: unitId != "" && unitId != null ? parseInt(unitId) : null,
                    label: label
                }
            })
        }
        curTreeObj.levelList = treeLevelList;
        newItem.level = parseInt(itemConfig.context.level + 1);
        newItem.payload.nodeId = nodeId;

        var parentSortOrder = items.filter(c => c.id == itemConfig.context.parent)[0].sortOrder;
        var childList = items.filter(c => c.parent == itemConfig.context.parent);
        var maxSortOrder = childList.length > 0 ? Math.max(...childList.map(o => o.sortOrder.replace(parentSortOrder + '.', ''))) : 0;
        // console.log("max sort order1---", maxSortOrder);
        // newItem.sortOrder = parentSortOrder.concat(".").concat(("0" + (Number(childList.length) + 1)).slice(-2));
        newItem.sortOrder = parentSortOrder.concat(".").concat(("0" + (Number(maxSortOrder) + 1)).slice(-2));
        var maxNodeDataId = this.getMaxNodeDataId();
        (newItem.payload.nodeDataMap[this.state.selectedScenario])[0].nodeDataId = maxNodeDataId;
        (newItem.payload.nodeDataMap[this.state.selectedScenario])[0].displayDataValue = (newItem.payload.nodeDataMap[this.state.selectedScenario])[0].dataValue;
        (newItem.payload.nodeDataMap[this.state.selectedScenario])[0].displayCalculatedDataValue = (newItem.payload.nodeDataMap[this.state.selectedScenario])[0].calculatedDataValue;
        (newItem.payload.nodeDataMap[this.state.selectedScenario])[0].month = moment((newItem.payload.nodeDataMap[this.state.selectedScenario])[0].month).startOf('month').format("YYYY-MM-DD")
        if (addNode) {
            (newItem.payload.nodeDataMap[this.state.selectedScenario])[0].nodeDataModelingList = data;
            (newItem.payload.nodeDataMap[this.state.selectedScenario])[0].annualTargetCalculator = {
                firstMonthOfTarget: moment(moment(this.state.firstMonthOfTarget, "YYYY-MM-DD")).format("YYYY-MM"),
                yearsOfTarget: this.state.yearsOfTarget,
                actualOrTargetValueList: this.state.actualOrTargetValueList
            };
            console.log("scalingList===>4", moment(moment(this.state.firstMonthOfTarget, "YYYY-MM-DD")).format("YYYY-MM"))

        }
        if (itemConfig.context.payload.nodeType.id == 4) {
            var tracerCategoryId = newItem.payload.nodeDataMap[this.state.selectedScenario][0].fuNode.forecastingUnit.tracerCategory.id;
            // console.log("add tracerCategoryId---", tracerCategoryId);
            if (tracerCategoryId == "" || tracerCategoryId == undefined || tracerCategoryId == null) {
                // console.log("add inside if");
                var fu = this.state.forecastingUnitList.filter(x => x.id == newItem.payload.nodeDataMap[this.state.selectedScenario][0].fuNode.forecastingUnit.id);
                // console.log("add fu---", fu);
                if (fu.length > 0) {
                    // console.log("add fu[0]---", fu[0]);
                    (newItem.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.forecastingUnit.tracerCategory.id = fu[0].tracerCategory.id;
                }

            }
            (newItem.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.forecastingUnit.label.label_en = (itemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.forecastingUnit.label.label_en;
        }
        var scenarioList = this.state.scenarioList.filter(x => x.id != this.state.selectedScenario);
        if (scenarioList.length > 0) {
            for (let i = 0; i < scenarioList.length; i++) {
                if (scenarioList[i].id != this.state.selectedScenario) {
                    var tempArray = [];
                    var nodeDataMap = {};
                    tempArray.push(JSON.parse(JSON.stringify((newItem.payload.nodeDataMap[this.state.selectedScenario])[0])));
                    // console.log("tempArray---", tempArray);
                    nodeDataMap = newItem.payload.nodeDataMap;
                    tempArray[0].nodeDataId = parseInt(maxNodeDataId + 1);
                    nodeDataMap[scenarioList[i].id] = tempArray;
                    // nodeDataMap[scenarioList[i].id][0].nodeDataId = scenarioList[i].id;
                    newItem.payload.nodeDataMap = nodeDataMap;
                    // (newItem.payload.nodeDataMap[scenarioList[i].id])[0] = (newItem.payload.nodeDataMap[this.state.selectedScenario]);
                }
            }
        }
        // console.log("add button clicked value after update---", newItem);
        // console.log("add button clicked value after update---", newItem.payload.nodeDataMap.length);
        this.setState({
            items: [...items, newItem],
            cursorItem: nodeId,
            isSubmitClicked: false,
            curTreeObj
        }, () => {

            // console.log("on add items-------", this.state.items);
            if (itemConfig.context.payload.nodeType.id == 4) {
                this.createPUNode(JSON.parse(JSON.stringify(itemConfig)), nodeId);
            } else {
                // if (!itemConfig.context.payload.extrapolation) {
                this.calculateMOMData(newItem.id, 0);
                // }
                //  else {
                //     this.setState({
                //         loading: false
                //     })
                // }
            }
            // this.calculateValuesForAggregateNode(this.state.items);
        });
        // }, 0);

    }

    calculateValuesForAggregateNode(items) {
        // console.log("start>>>", Date.now());
        // console.log("start aggregation node>>>", items);
        var getAllAggregationNode = items.filter(c => c.payload.nodeType.id == 1).sort(function (a, b) {
            a = a.id;
            b = b.id;
            return a > b ? -1 : a < b ? 1 : 0;
        }.bind(this));

        // console.log("getAllAggregationNode--->", getAllAggregationNode);
        for (var i = 0; i < getAllAggregationNode.length; i++) {
            // console.log("getAllAggregationNode[i].id---", getAllAggregationNode[i].id);
            var getChildAggregationNode = items.filter(c => c.parent == getAllAggregationNode[i].id && (c.payload.nodeType.id == 1 || c.payload.nodeType.id == 2))
            // console.log(">>>", getChildAggregationNode);
            if (getChildAggregationNode.length > 0) {
                var value = 0;
                for (var m = 0; m < getChildAggregationNode.length; m++) {
                    // console.log("getChildAggregationNode[m]---", getChildAggregationNode[m].payload.nodeDataMap[this.state.selectedScenario][0]);
                    var value2 = getChildAggregationNode[m].payload.nodeDataMap[this.state.selectedScenario][0].dataValue != "" ? parseInt(getChildAggregationNode[m].payload.nodeDataMap[this.state.selectedScenario][0].dataValue) : 0;
                    // console.log("value2---", value2);
                    value = value + parseInt(value2);
                    // console.log("value---", value);
                }

                var findNodeIndex = items.findIndex(n => n.id == getAllAggregationNode[i].id);
                items[findNodeIndex].payload.nodeDataMap[this.state.selectedScenario][0].dataValue = value;
                items[findNodeIndex].payload.nodeDataMap[this.state.selectedScenario][0].calculatedDataValue = value;

                items[findNodeIndex].payload.nodeDataMap[this.state.selectedScenario][0].displayDataValue = value;
                items[findNodeIndex].payload.nodeDataMap[this.state.selectedScenario][0].displayCalculatedDataValue = value;

                this.setState({
                    items: items,
                    // openAddNodeModal: false,
                }, () => {
                    // console.log("updated tree data>>>", this.state);
                });
            } else {
                var findNodeIndex = items.findIndex(n => n.id == getAllAggregationNode[i].id);
                items[findNodeIndex].payload.nodeDataMap[this.state.selectedScenario][0].dataValue = "";
                items[findNodeIndex].payload.nodeDataMap[this.state.selectedScenario][0].calculatedDataValue = "";

                items[findNodeIndex].payload.nodeDataMap[this.state.selectedScenario][0].displayDataValue = "";
                items[findNodeIndex].payload.nodeDataMap[this.state.selectedScenario][0].displayCalculatedDataValue = "";

                this.setState({
                    items: items,
                    // openAddNodeModal: false,
                }, () => {
                    // console.log("updated tree data>>>", this.state);
                });
            }
        }
        // console.log("end>>>", Date.now());
    }
    onRemoveButtonClick(itemConfig) {
        var { items } = this.state;
        // console.log("delete items---", items)
        // let uniqueChars = [...new Set(items)];
        const ids = items.map(o => o.id)
        const filtered = items.filter(({ id }, index) => !ids.includes(id, index + 1))
        // console.log("delete unique items---", filtered)
        items = filtered;
        // console.log("delete id---", itemConfig.id)
        // console.log("delete items count---", items.filter(x => x.id == itemConfig.id))
        this.setState(this.getDeletedItems(items, [itemConfig.id]), () => {
            setTimeout(() => {
                // console.log("delete result---", this.getDeletedItems(items, [itemConfig.id]))
                this.calculateMOMData(0, 2);
            }, 0);
        });
    }
    onMoveItem(parentid, itemid) {
        // console.log("on move item called");
        const { items } = this.state;
        // console.log("move item items---", items);
        // console.log("move item parentid---", parentid);
        // console.log("move item itemid---", itemid);
        this.setState({
            cursorItem: itemid,
            items: (items.map(item => {
                if (item.id === itemid) {
                    return {
                        ...item,
                        parent: parentid
                    }
                }
                return item;
            }))
        })
    }
    canDropItem(parentid, itemid) {
        const { items } = this.state;
        const tree = this.getTree(items);
        let result = parentid !== itemid;
        tree.loopParents(this, parentid, function (id, node) {
            if (id === itemid) {
                result = false;
                return true;
            }
        });
        return result;
    }
    onRemoveItem(id) {
        const { items } = this.state;

        this.setState(this.getDeletedItems(items, [id]));
    }
    getDeletedItems(items = [], deletedItems = []) {
        // console.log("delete tree deletedItems---", deletedItems)
        // console.log("delete tree before---", items)
        // console.log("delete tree before 1---", items.filter(x => x.id == 10))
        const tree = this.getTree(items);
        // console.log("delete tree---", tree)
        const hash = deletedItems.reduce((agg, itemid) => {
            // console.log("delete itemId---", itemid)
            agg.add(itemid.toString());
            return agg;
        }, new Set());
        // console.log("delete hash---", hash)
        const cursorParent = this.getDeletedItemsParent(tree, deletedItems, hash);
        // console.log("delete cursorParent---", cursorParent)
        const result = [];
        tree.loopLevels(this, (nodeid, node) => {
            // console.log("delete nodeid---", nodeid)
            // console.log("delete node---", node)
            if (hash.has(nodeid.toString())) {
                // console.log("delete inside if")
                return tree.SKIP;
            }
            result.push(node);
        });
        // console.log("delete result---", result)
        return {
            items: result,
            cursorItem: cursorParent
        };
    }
    getDeletedItemsParent(tree, deletedItems, deletedHash) {
        let result = null;
        const lca = LCA(tree);
        result = deletedItems.reduce((agg, itemid) => {
            if (agg == null) {
                agg = itemid;
            } else {
                agg = lca.getLowestCommonAncestor(agg, itemid);
            }
            return agg;
        }, null);

        if (deletedHash.has(result.toString())) {
            result = tree.parentid(result);
        }
        return result;
    }

    getTree(items = []) {
        const tree = Tree();

        for (let index = 0; index < items.length; index += 1) {
            const item = items[index];
            tree.add(item.parent, item.id, item);
        }

        return tree;
    }

    onHighlightChanged(event, data) {
        const { context: item } = data;
        const { config } = this.state;
        // console.log("my notes---", item.title);
        // console.log("data2---", item.id);
        // item.id

        // <Popover placement="top" isOpen={this.state.popoverOpenMa} target="Popover1" trigger="hover" toggle={() => this.toggle('popoverOpenMa', !this.state.popoverOpenMa)}>
        //                                                             <PopoverBody>{i18n.t('static.tooltip.MovingAverages')}</PopoverBody>
        //                                                         </Popover>
        if (item != null) {

            this.setState({
                title: item.title,
                config: {
                    ...config,
                    // highlightItem: item.id,
                    // cursorItem: item.id
                },
                highlightItem: item.id,
                cursorItem: item.id
            }, () => {
                // console.log("highlighted item---", this.state)
            })
        }
    };


    onCursoChanged(event, data) {
        const { context: item } = data;
        if (item != null) {
            this.setState({
                viewMonthlyData: true,
                usageTemplateId: '',
                sameLevelNodeList: [],
                showCalculatorFields: false,
                showMomData: false,
                showMomDataPercent: false,
                addNodeFlag: false,
                openAddNodeModal: data.context.templateName ? data.context.templateName == "contactTemplateMin" ? false : true : true,
                modelingChangedOrAdded: false,
                orgCurrentItemConfig: JSON.parse(JSON.stringify(data.context)),
                currentItemConfig: JSON.parse(JSON.stringify(data)),
                level0: (data.context.level == 0 ? false : true),
                numberNode: (data.context.payload.nodeType.id == 1 || data.context.payload.nodeType.id == 2 ? false : true),
                aggregationNode: (data.context.payload.nodeType.id == 1 ? false : true),
                currentScenario: (data.context.payload.nodeDataMap[this.state.selectedScenario])[0],
                highlightItem: item.id,
                cursorItem: item.id,
                parentScenario: data.context.level == 0 ? [] : (data.parentItem.payload.nodeDataMap[this.state.selectedScenario])[0],
                modelingEl: "",
                modelingTabChanged: false
            }, () => {
                try {
                    jexcel.destroy(document.getElementById('modelingJexcel'), true);
                } catch (err) {    
                }
                if(data.context.templateName ? data.context.templateName == "contactTemplateMin" ? true : false : false){
                    var itemConfig = data.context;
                    var items = this.state.items;
                    var updatedItems = items;
                    // this.setState(prevState => ({
                    //     toggleArray: [...prevState.toggleArray, itemConfig.id]
                    // }))
                    if (this.state.toggleArray.includes(itemConfig.id)) {

                        var parentId = itemConfig.payload.parentNodeId != undefined ? itemConfig.payload.parentNodeId : itemConfig.parent;
                        var parentNode = items.filter(e => e.id == parentId);

                        var tempToggleArray = this.state.toggleArray.filter((e) => e != itemConfig.id)
                        if (parentNode[0].templateName ? parentNode[0].templateName == "contactTemplateMin" ? false : true : true) {
                            tempToggleArray = tempToggleArray.filter((e) => e != parentId)
                        }
                        updatedItems = updatedItems.map(item => {
                            if (item.sortOrder.toString().startsWith(itemConfig.sortOrder.toString())) {
                                tempToggleArray = tempToggleArray.filter((e) => e != item.id)
                                return { ...item, templateName: "contactTemplate", expanded: false, payload: { ...item.payload, collapsed: false } };
                            }
                            return item;
                        });
                        this.setState({ toggleArray: tempToggleArray })
                    } else {
                        var tempToggleArray = this.state.toggleArray;
                        tempToggleArray.push(itemConfig.id);
                        updatedItems = updatedItems.map(item => {
                            if (item.sortOrder.toString().startsWith(itemConfig.sortOrder.toString())) {
                                tempToggleArray.push(item.id);
                                return { ...item, templateName: "contactTemplateMin", expanded: true, payload: { ...item.payload, collapsed: true } };
                            }
                            return item;
                        });
                        this.setState({ toggleArray: tempToggleArray })
                    }
                    this.setState({ collapseState: false })
                    this.setState({ items: updatedItems }, () => { this.saveTreeData(false, true) })
                }
                // console.log("555>>>", this.state.items);
                // const ids = this.state.items.map(o => o.id)
                // const filtered = this.state.items.filter(({ id }, index) => !ids.includes(id, index + 1))
                // console.log("edit unique items---", filtered)
                var scenarioId = this.state.selectedScenario;
                // console.log("cursor change current item config---", this.state.currentScenario);
                if (data.context.level != 0) {
                    this.calculateParentValueFromMOM(data.context.payload.nodeDataMap[this.state.selectedScenario][0].month);
                    // this.setState({
                    //     parentValue: this.state.parentScenario.calculatedDataValue
                    // });
                }
                this.getNodeTypeFollowUpList(data.context.level == 0 ? 0 : data.parentItem.payload.nodeType.id);
                if (data.context.payload.nodeType.id == 4) {
                    // console.log("on curso tracer category---", (data.context.payload.nodeDataMap[scenarioId])[0].fuNode.forecastingUnit.tracerCategory.id);
                    // console.log("on curso tracer category list---", this.state.tracerCategoryList);
                    this.setState({
                        fuValues: { value: this.state.currentScenario.fuNode.forecastingUnit.id, label: getLabelText(this.state.currentScenario.fuNode.forecastingUnit.label, this.state.lang) + " | " + this.state.currentScenario.fuNode.forecastingUnit.id }
                    });
                    this.getForecastingUnitListByTracerCategoryId(1, 0);
                    this.getNodeUnitOfPrent();
                    this.getNoOfFUPatient();
                    this.getNoOfMonthsInUsagePeriod();
                    this.getNoFURequired();
                    this.filterUsageTemplateList(this.state.currentScenario.fuNode.forecastingUnit.tracerCategory.id, 0);
                    this.getUsageText();
                    this.state.currentItemConfig.context.payload.nodeUnit.id = this.state.currentItemConfig.parentItem.payload.nodeUnit.id;
                } else if (data.context.payload.nodeType.id == 5) {
                    this.getPlanningUnitListByFUId((data.parentItem.payload.nodeDataMap[scenarioId])[0].fuNode.forecastingUnit.id);
                    this.getNoOfMonthsInUsagePeriod();
                    this.getNoFURequired();
                    this.state.currentItemConfig.context.payload.nodeUnit.id = this.state.items.filter(x => x.id == this.state.currentItemConfig.parentItem.parent)[0].payload.nodeUnit.id;
                    var planningUnit = this.state.updatedPlanningUnitList.filter(x => x.id == this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].puNode.planningUnit.id);
                    var conversionFactor = planningUnit.length > 0 ? planningUnit[0].multiplier : "";
                    // console.log("conversionFactor---", conversionFactor);
                    this.setState({
                        conversionFactor
                    }, () => {
                        if (this.state.currentItemConfig.parentItem.payload.nodeDataMap[this.state.selectedScenario][0].fuNode.usageType.id == 2) {
                            if (this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].puNode.refillMonths != "" && this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].puNode.refillMonths != null && this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].puNode.refillMonths != undefined && this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].puNode.refillMonths != 1) {
                                this.calculatePUPerVisit(false)
                            }
                        }
                        this.qatCalculatedPUPerVisit(0);
                        this.getUsageText();
                    });
                }

                if (data.context.payload.nodeType.id != 1) {
                    this.getSameLevelNodeList(data.context.level, data.context.id, data.context.payload.nodeType.id, data.context.parent);
                    this.getNodeTransferList(data.context.level, data.context.id, data.context.payload.nodeType.id, data.context.parent, data.context.payload.nodeDataMap[this.state.selectedScenario][0].nodeDataId);
                }
                // this.setState({

                // })
            })
        }
    };

    updateNodeInfoInJson(currentItemConfig) {
        // console.log("update tree node called 1------------", currentItemConfig);
        // console.log("update tree node called 2------------", this.state.currentItemConfig);
        var nodes = this.state.items;
        // console.log("update tree node called 3------------", nodes);
        if (currentItemConfig.context.level == 0 && currentItemConfig.context.newTree) {
            currentItemConfig.context.newTree = false;
        }
        if (currentItemConfig.context.payload.nodeType.id == 4) {
            var tracerCategoryId = currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].fuNode.forecastingUnit.tracerCategory.id;
            // console.log("edit tracerCategoryId---", tracerCategoryId);
            if (tracerCategoryId == "" || tracerCategoryId == undefined || tracerCategoryId == null) {
                // console.log("edit inside if");
                var fu = this.state.forecastingUnitList.filter(x => x.id == currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].fuNode.forecastingUnit.id);
                // console.log("edit fu---", fu);
                if (fu.length > 0) {
                    // console.log("edit fu[0]---", fu[0]);
                    (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.forecastingUnit.tracerCategory.id = fu[0].tracerCategory.id;
                }

            }
        }
        var findNodeIndex = nodes.findIndex(n => n.id == currentItemConfig.context.id);
        // console.log("findNodeIndex---", findNodeIndex);
        nodes[findNodeIndex] = currentItemConfig.context;
        if (currentItemConfig.context.payload.nodeType.id == 4) {
            var puNodes = nodes.filter(c => c.parent == currentItemConfig.context.id);
            for (var puN = 0; puN < puNodes.length; puN++) {
                var refillMonths = "";
                var puPerVisit = "";
                if (puNodes[puN].payload.nodeDataMap[this.state.selectedScenario][0].puNode != null) {
                    var pu = puNodes[puN].payload.nodeDataMap[this.state.selectedScenario][0].puNode.planningUnit;
                    var findNodeIndexPu = nodes.findIndex(n => n.id == puNodes[puN].id);
                    var puNode = nodes[findNodeIndexPu].payload.nodeDataMap[this.state.selectedScenario][0].puNode;
                    if (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].fuNode.usageType.id == 2) {
                        var refillMonths = 1;
                        // console.log("AUTO refillMonths---", refillMonths);
                        // console.log("AUTO 1 noOfMonthsInUsagePeriod---", this.state.noOfMonthsInUsagePeriod);
                        puPerVisit = parseFloat(((currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].fuNode.noOfForecastingUnitsPerPerson / this.state.noOfMonthsInUsagePeriod) * refillMonths) / pu.multiplier).toFixed(8);
                        puNode.refillMonths = refillMonths;
                        puNode.puPerVisit = puPerVisit;
                    } else {
                        // console.log("AUTO 2 noOfMonthsInUsagePeriod---", this.state.noOfMonthsInUsagePeriod);
                        puPerVisit = parseFloat(this.state.noFURequired / pu.multiplier).toFixed(8);
                        puNode.puPerVisit = puPerVisit;
                    }

                    nodes[findNodeIndexPu].payload.nodeDataMap[this.state.selectedScenario][0].puNode = puNode;
                }
            }
        }
        const { curTreeObj } = this.state;

        var treeLevelList = curTreeObj.levelList;
        if (currentItemConfig.context.level == 0 && treeLevelList != undefined) {
            var levelListFiltered = treeLevelList.findIndex(c => c.levelNo == parseInt(currentItemConfig.context.level));
            if (levelListFiltered != -1) {
                var unitId = currentItemConfig.context.payload.nodeType.id == 4 ? currentItemConfig.parentItem.payload.nodeUnit.id : currentItemConfig.context.payload.nodeUnit.id;
                var label = {}
                if (unitId != "" && unitId != null) {
                    label = this.state.nodeUnitList.filter(c => c.unitId == unitId)[0].label;
                }
                treeLevelList[levelListFiltered].unit = {
                    id: unitId != "" && unitId != null ? parseInt(unitId) : null,
                    label: label
                }

            }
            curTreeObj.levelList = treeLevelList;
        }

        // console.log("nodes---", nodes);
        this.setState({
            items: nodes,
            isSubmitClicked: false,
            curTreeObj
        }, () => {
            // console.log("updated tree data+++", this.state);
            // this.calculateValuesForAggregateNode(this.state.items);
            // if (!currentItemConfig.context.payload.extrapolation) {
            this.calculateMOMData(0, 0);
            // } 
            // else {
            //     this.setState({
            //         loading: false
            //     })
            // }
            // console.log("returmed list---", this.state.nodeDataMomList);
            // this.updateTreeData();
        });

    }

    buildModelingCalculatorJexcel() {
        jexcel.destroy(document.getElementById("modelingCalculatorJexcel"), true);

        var dataArray = [];
        var actualOrTargetValueList = this.state.actualOrTargetValueList;
        let count = this.state.yearsOfTarget;

        for (var j = 0; j <= count; j++) {
            let startdate = moment(moment(this.state.currentCalculatorStartDate, "YYYY-MM-DD").subtract(1, "years").add(j, "years")).format("MMM YYYY")
            let stopDate = moment(moment(startdate, "MMM YYYY").add(11, "months")).format("MMM YYYY");
            let modifyStartDate = moment(startdate, "MMM YYYY").subtract(7, "months").format("MMM YYYY");
            let modifyStartDate1 = moment(modifyStartDate, "MMM YYYY").add(1, "months").format("MMM YYYY");
            let modifyStopDate1 = moment(modifyStartDate1, "MMM YYYY").add(11, "months").format("MMM YYYY");
            var data = [];
            data[0] = startdate + " - " + stopDate//year
            data[1] = actualOrTargetValueList.length > 0 ? actualOrTargetValueList[j] : ""//Actual / Target
            data[7] = j == 0 ? "" : modifyStartDate1
            data[8] = j == count ? stopDate : modifyStopDate1
            dataArray[j] = data;
        }
        var data = dataArray;
        var options = {
            data: data,
            columnDrag: true,
            colWidths: [90, 160, 80, 80, 90, 90, 80, 80, 90, 90],
            colHeaderClasses: ["Reqasterisk"],
            columns: [
                {
                    title: i18n.t('static.common.year'),
                    type: 'text',
                    width: '130',
                    readOnly: true
                },//A0
                {
                    title: i18n.t('static.tree.actualOrTarget'),
                    type: 'numeric',
                    textEditor: true,
                    mask: '#,##0',
                    tooltip: i18n.t('static.tooltip.actualOrTarget')
                },//B1
                {
                    title: i18n.t('static.tree.annualChangePer'),
                    type: 'numeric',
                    textEditor: true,
                    decimal: '.',
                    mask: '#,##0.00%',
                    disabledMaskOnEdition: false,
                    readOnly: true
                },//C2
                {
                    title: 'Monthly Change Percentage',
                    type: 'hidden',
                    decimal: '.',
                    mask: '#,##0.0000%',
                    readOnly: true
                },//D3
                {
                    title: i18n.t('static.tree.calculatedTotal'),
                    type: 'numeric',
                    textEditor: true,
                    decimal: '.',
                    mask: '#,##0',
                    disabledMaskOnEdition: true,
                    readOnly: true
                },//E4

                {
                    title: i18n.t('static.tree.differenceTargetVsCalculatedNumber'),
                    type: 'numeric',
                    textEditor: true,
                    decimal: '.',
                    mask: '#,##0',
                    disabledMaskOnEdition: true,
                    readOnly: true
                },//F5
                {
                    title: i18n.t('static.tree.differenceTargetVsCalculatedPer'),
                    type: 'numeric',
                    textEditor: true,
                    decimal: '.',
                    mask: '#,##0.00%',
                    disabledMaskOnEdition: true,
                    readOnly: true
                },//G6,
                {
                    title: "Updated Start Date",
                    type: 'hidden'
                },//H7
                {
                    title: "Updated Stop Date",
                    type: 'hidden'
                },//I8
                {
                    title: "Calculated numbers (for Altius to check against when coding)",
                    decimal: '.',
                    mask: '#,##0.0000',
                    type: 'hidden'
                }//J9

            ],
            editable: true,
            onload: this.loadedModelingCalculatorJexcel,
            onchange: this.changeModelingCalculatorJexcel,
            // pagination: localStorage.getItem("sesRecordCount"),
            search: false,
            columnSorting: false,
            wordWrap: true,
            allowInsertColumn: false,
            allowManualInsertColumn: false,
            allowDeleteRow: true,
            copyCompatibility: true,
            allowExport: false,
            // paginationOptions: JEXCEL_PAGINATION_OPTION,
            position: 'top',
            filters: false,
            license: JEXCEL_PRO_KEY,
            contextMenu: function (obj, x, y, e) {
                return false;
            }.bind(this)

        };
        var modelingCalculatorEl = jexcel(document.getElementById("modelingCalculatorJexcel"), options);
        this.el = modelingCalculatorEl;
        this.setState({
            modelingCalculatorEl: modelingCalculatorEl,
        }, () => {
            var scalingMonth = { year: new Date(this.state.currentScenario.month.replace(/-/g, '\/')).getFullYear(), month: ("0" + (new Date(this.state.currentScenario.month.replace(/-/g, '\/')).getMonth() + 1)).slice(-2) };
            this.filterScalingDataByMonth(scalingMonth.year + "-" + scalingMonth.month + "-01");
            if (this.state.actualOrTargetValueList.length > 0) {
                this.changed3(this.state.isCalculateClicked);
            }
        });
    }

    validFieldData() {
        var json = this.state.modelingCalculatorEl.getJson(null, false);
        var valid = true;
        for (var j = 0; j < json.length; j++) {
            var col = ("B").concat(parseInt(j) + 1);
            var value = this.state.modelingCalculatorEl.getValueFromCoords(1, j);
            console.log("value", value);

            if (value === "") {
                this.state.modelingCalculatorEl.setStyle(col, "background-color", "transparent");
                this.state.modelingCalculatorEl.setStyle(col, "background-color", "yellow");
                this.state.modelingCalculatorEl.setComments(col, "Please provide data for all years. If actuals are unknown, please provide the best estimate or use year 1 target. If future targets are not known, please provide the best estimate or repeat the last target.");
                valid = false;
            } else if (value == 0) {
                this.state.modelingCalculatorEl.setStyle(col, "background-color", "transparent");
                this.state.modelingCalculatorEl.setStyle(col, "background-color", "yellow");
                this.state.modelingCalculatorEl.setComments(col, "Actual/Target value cannot be 0");
                valid = false;
            } else {
                this.state.modelingCalculatorEl.setStyle(col, "background-color", "transparent");
                this.state.modelingCalculatorEl.setComments(col, "");
            }
        }
        return valid;
    }

    changed3(isCalculateClicked) {

        var elInstance = this.state.modelingCalculatorEl;
        var validation = this.validFieldData();

        if (validation) {
            this.setState({ isCalculateClicked: isCalculateClicked })
            var dataArray = [];
            var dataArrayTotal = [];
            let modelingType = document.getElementById("modelingType").value;
            var calculatedTotal = 0;
            var calculatedTotal1 = 0;
            var dataArr = elInstance.records;
            for (var j = 0; j < dataArr.length; j++) {
                console.log("validd--->>", dataArr[j])

                var monthlyChange = "";
                var rowData = dataArr[j];
                if (j == 0) {
                    elInstance.setValueFromCoords(9, j, parseFloat(rowData[1].v / 12), true);
                }
                if (j > 0) {
                    var rowData1 = dataArr[j - 1];
                    elInstance.setValueFromCoords(2, j, rowData[1].v == "" ? '' : parseFloat(((rowData[1].v - rowData1[1].v) / rowData1[1].v) * 100), true);
                    if (modelingType == "active1") {
                        monthlyChange = parseFloat((Math.pow(rowData[1].v / rowData1[1].v, (1 / 12)) - 1) * 100);
                    } else {
                        monthlyChange = parseFloat(((rowData[1].v - rowData1[1].v) / rowData1[1].v) / 12 * 100);
                    }
                    elInstance.setValueFromCoords(3, j, monthlyChange, true);

                    var start = moment(moment(rowData[7].v, 'MMM YYYY'))
                    var stop = moment(moment(rowData[8].v, 'MMM YYYY'))
                    var count = 1;
                    var calculatedTotal = parseFloat(rowData1[9].v);
                    var calculatedTotal1 = parseFloat(rowData1[9].v);
                    var arr = [];

                    while (start.isSameOrBefore(stop)) {
                        if (modelingType == "active1") {
                            calculatedTotal = parseFloat(calculatedTotal * (1 + monthlyChange / 100));
                        } else {
                            if (count <= 12) {
                                var a = parseFloat(1 + ((monthlyChange / 100) * count));
                                calculatedTotal1 = parseFloat(calculatedTotal * a);
                                console.log("aaaaaaaa", a, "====", calculatedTotal, "====", count, "==calculatedTotal1=", calculatedTotal1)

                            }
                        }

                        var programJson = {
                            date: moment(start.format('MMM YYYY')).format("YYYY"),
                            calculatedTotal: modelingType == "active1" ? calculatedTotal : calculatedTotal1,
                            startDate: moment(moment(rowData[0].v.split("-")[0], 'MMM YYYY')),
                            stopDate: moment(moment(rowData[0].v.split("-")[1], 'MMM YYYY'))
                        }
                        arr.push(programJson)
                        dataArrayTotal.push(programJson);
                        start.add(1, 'months');
                        count++;
                    }
                    console.log("aaa1", arr)
                    elInstance.setValueFromCoords(9, j, modelingType == "active1" ? calculatedTotal : arr[arr.length - 1].calculatedTotal, true);
                }
                dataArray[j] = rowData[1].v;
            }
            if (dataArrayTotal.length > 0) {
                const arraySum = dataArrayTotal.map(c => c.date)
                const arraySum1 = arraySum.filter((value, index, array) => array.indexOf(value) === index);
                for (var i = 1; i <= arraySum1.length; i++) {
                    var abc = Math.round(dataArrayTotal.filter(c => c.date == arraySum1[i]).map(c => Number(c.calculatedTotal))
                        .reduce((accumulator, currentItem) => accumulator + currentItem, 0));
                    elInstance.setValueFromCoords(4, i, abc, true);
                    var value = elInstance.getValueFromCoords(1, i);
                    elInstance.setValueFromCoords(5, i, abc != 0 ? (abc - value) : 0, true);
                    elInstance.setValueFromCoords(6, i, abc != 0 ? (abc - value) / value * 100 : 0, true);
                }
                this.setState({
                    actualOrTargetValueList: dataArray
                });
            }
        }
    }

    loadedModelingCalculatorJexcel = function (instance, cell, x, y, source, value, id) {
        jExcelLoadedFunctionOnlyHideRow(instance);
        var elInstance = instance.worksheets[0];
        elInstance.setValueFromCoords(2, 0, "", true)
        elInstance.setValueFromCoords(3, 0, "", true)
        elInstance.setValueFromCoords(4, 0, "", true)
        elInstance.setValueFromCoords(5, 0, "", true)
        elInstance.setValueFromCoords(6, 0, "", true)
        elInstance.setValueFromCoords(7, 0, "", true)

        var asterisk = document.getElementsByClassName("jss")[1].firstChild.nextSibling;
        var tr = asterisk.firstChild;

        tr.children[3].title = i18n.t('static.tooltip.annualChangePer');
        tr.children[5].title = i18n.t('static.tooltip.calculatedTotal');
        tr.children[6].title = i18n.t('static.tooltip.diffTargetVsCalculatedNo');
        tr.children[7].title = i18n.t('static.tooltip.diffTargetVsCalculatedPer');

        tr.children[2].classList.add('InfoTrAsteriskTheadtrTdImage');
        tr.children[3].classList.add('InfoTr');
        tr.children[5].classList.add('InfoTr');
        tr.children[6].classList.add('InfoTr');
        tr.children[7].classList.add('InfoTr');

        var cell = elInstance.getCell("C1");
        cell.classList.add('shipmentEntryDoNotInclude');
        var cell = elInstance.getCell("E1");
        cell.classList.add('shipmentEntryDoNotInclude');
        var cell = elInstance.getCell("F1");
        cell.classList.add('shipmentEntryDoNotInclude');
        var cell = elInstance.getCell("G1");
        cell.classList.add('shipmentEntryDoNotInclude');

    }
    changeModelingCalculatorJexcel = function (instance, cell, x, y, value) {

        if (x == 1) {
            if (this.state.isCalculateClicked != 1) {
                this.setState({ isCalculateClicked: 1 });
            }
        }
    }

    tabPane1() {
        var chartOptions = {
            title: {
                display: true,
                text: this.state.showMomData ? this.state.dataSetObj.programData.programCode + "~" + i18n.t("static.supplyPlan.v") + this.state.dataSetObj.programData.currentVersion.versionId + " - " + document.getElementById("treeId").selectedOptions[0].text + " - " + document.getElementById("scenarioId").selectedOptions[0].text + " - " + getLabelText(this.state.currentItemConfig.context.payload.label, this.state.lang) : ""
            },
            scales: {
                yAxes: [
                    {
                        id: 'A',
                        scaleLabel: {
                            display: true,
                            labelString: this.state.currentItemConfig.context.payload.nodeUnit.label != null && this.state.currentItemConfig.context.payload.nodeType.id != 1 ? getLabelText(this.state.currentItemConfig.context.payload.nodeUnit.label, this.state.lang) : '',
                            fontColor: 'black'
                        },
                        stacked: false,
                        ticks: {
                            beginAtZero: true,
                            fontColor: 'black',
                            // stepSize: 100000,
                            callback: function (value) {
                                var cell1 = value
                                cell1 += '';
                                var x = cell1.split('.');
                                var x1 = x[0];
                                var x2 = x.length > 1 ? '.' + x[1] : '';
                                var rgx = /(\d+)(\d{3})/;
                                while (rgx.test(x1)) {
                                    x1 = x1.replace(rgx, '$1' + ',' + '$2');
                                }
                                // console.log("chart value---", x1 + x2);
                                return x1 + x2;

                            }
                        },
                        gridLines: {
                            drawBorder: true, lineWidth: 1
                        },
                        position: 'left',
                        // scaleSteps : 100000
                    }
                ],
                xAxes: [{
                    ticks: {
                        fontColor: 'black'
                    },
                    gridLines: {
                        drawBorder: true, lineWidth: 0
                    }
                }]
            },
            tooltips: {
                enabled: false,
                custom: CustomTooltips,
                callbacks: {
                    label: function (tooltipItem, data) {
                        // console.log("tooltipItem---", tooltipItem);
                        // console.log("tooltipItem data---", data);
                        // if (tooltipItem.datasetIndex == 1) {
                        let label = data.labels[tooltipItem.index];
                        let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];

                        var cell1 = value
                        cell1 += '';
                        var x = cell1.split('.');
                        var x1 = x[0];
                        var x2 = x.length > 1 ? '.' + x[1] : '';
                        var x3 = x.length > 1 ? parseFloat(x1 + x2).toFixed(2) : x1 + x2;
                        var rgx = /(\d+)(\d{3})/;
                        // console.log("tooltip data---",x1 + x2+" changed value---",x2);
                        // while (rgx.test(x1)) {
                        //     x1 = x1.replace(rgx, '$1' + ',' + '$2');
                        // }

                        return data.datasets[tooltipItem.datasetIndex].label + ' : ' + addCommas(x3);
                        // } else {
                        // let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        // return data.datasets[tooltipItem.datasetIndex].label + ' : ' + value + " %";
                        // }
                    }
                }

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


        let bar = {}
        var momList = this.state.momList == undefined ? [] : this.state.momList;
        if (momList.length > 0) {
            var datasetsArr = [];
            datasetsArr.push(
                {
                    label: getLabelText(this.state.currentItemConfig.context.payload.label, this.state.lang) + " (Month end forecast)",
                    type: 'line',
                    stack: 3,
                    yAxisID: 'A',
                    backgroundColor: 'transparent',
                    borderColor: '#002F6C',
                    borderStyle: 'dotted',
                    ticks: {
                        fontSize: 2,
                        fontColor: 'transparent',
                    },
                    lineTension: 0,
                    pointStyle: 'line',
                    pointRadius: 0,
                    pointHoverBackgroundColor: 'transparent',
                    pointHoverBorderColor: 'transparent',
                    // pointHoverBorderWidth: 2,
                    // pointRadius: 1,
                    pointHitRadius: 5,
                    showInLegend: false,
                    data: this.state.momList.map((item, index) => (item.endValue > 0 ? item.endValue : null))
                }
            )

            bar = {
                labels: [...new Set(this.state.momList.map(ele => (moment(ele.month).format(DATE_FORMAT_CAP_WITHOUT_DATE))))],
                datasets: datasetsArr

            };
        }
        // console.log("this.state.currentItemConfig.context.payload.nodeUnit@@@@####", this.state.currentItemConfig.context.payload.nodeUnit);
        var chartOptions1 = {
            title: {
                display: true,
                text: this.state.showMomDataPercent ? this.state.dataSetObj.programData.programCode + "~" + i18n.t("static.supplyPlan.v") + this.state.dataSetObj.programData.currentVersion.versionId + " - " + document.getElementById("treeId").selectedOptions[0].text + " - " + document.getElementById("scenarioId").selectedOptions[0].text + " - " + getLabelText(this.state.currentItemConfig.context.payload.label, this.state.lang) : ""
            },
            scales: {
                yAxes: [
                    {
                        id: 'A',
                        scaleLabel: {
                            display: true,
                            // labelString: this.state.currentItemConfig.context.payload.nodeUnit.label != null ? this.state.currentItemConfig.context.payload.nodeType.id > 3 ? getLabelText(this.state.currentItemConfig.parentItem.payload.nodeUnit.label, this.state.lang) : getLabelText(this.state.currentItemConfig.context.payload.nodeUnit.label, this.state.lang) : '',
                            // labelString: this.state.currentItemConfig.context.payload.nodeUnit.label != null ? this.state.currentItemConfig.context.payload.nodeType.id > 3 ? getLabelText(this.state.currentItemConfig.parentItem.payload.nodeUnit.label, this.state.lang) : getLabelText(this.state.currentItemConfig.context.payload.nodeUnit.label, this.state.lang) : '',
                            labelString: this.state.currentItemConfig.context.payload.nodeType.id > 2 ?
                                this.state.currentItemConfig.context.payload.nodeUnit.id != "" ?
                                    this.state.currentItemConfig.context.payload.nodeType.id == 4 ? this.state.currentScenario.fuNode != null && this.state.currentScenario.fuNode.forecastingUnit != null && this.state.currentScenario.fuNode.forecastingUnit.unit.id != "" ? getLabelText(this.state.unitList.filter(c => c.unitId == this.state.currentScenario.fuNode.forecastingUnit.unit.id)[0].label, this.state.lang) : ""
                                        : this.state.currentItemConfig.context.payload.nodeType.id == 5 ? this.state.currentScenario.puNode.planningUnit.unit.id != "" ? getLabelText(this.state.unitList.filter(c => c.unitId == this.state.currentScenario.puNode.planningUnit.unit.id)[0].label, this.state.lang) : ""
                                            : getLabelText(this.state.nodeUnitList.filter(c => c.unitId == this.state.currentItemConfig.context.payload.nodeUnit.id)[0].label, this.state.lang)
                                    : ""
                                : "",
                            // labelString: "",
                            fontColor: 'black'
                        },
                        stacked: false,
                        ticks: {
                            beginAtZero: true,
                            fontColor: 'black',
                            // stepSize: 100000,
                            callback: function (value) {
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
                        },
                        gridLines: {
                            drawBorder: true, lineWidth: 1
                        },
                        position: 'left',
                        // scaleSteps : 100000
                    },
                    {
                        id: 'B',
                        scaleLabel: {
                            display: true,
                            labelString: "% of " + (this.state.currentItemConfig.context.payload.nodeType.id > 2 ? getLabelText(this.state.currentItemConfig.parentItem.payload.label, this.state.lang) : ""),
                            fontColor: 'black'
                        },
                        stacked: false,
                        ticks: {
                            beginAtZero: true,
                            fontColor: 'black',
                            callback: function (value) {
                                var cell1 = value + " %";
                                return cell1;

                            },
                            min: 0,
                            // max: 100
                        },
                        gridLines: {
                            drawBorder: true, lineWidth: 0
                        },
                        position: 'right',
                    }
                ],
                xAxes: [{
                    ticks: {
                        fontColor: 'black'
                    },
                    gridLines: {
                        drawBorder: true, lineWidth: 0
                    }
                }]
            },
            tooltips: {
                enabled: false,
                custom: CustomTooltips,
                callbacks: {
                    label: function (tooltipItem, data) {
                        // console.log("tooltipItem---", tooltipItem);
                        // console.log("tooltipItem data---", data);
                        if (tooltipItem.datasetIndex == 1) {
                            let label = data.labels[tooltipItem.index];
                            let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];

                            var cell1 = value
                            cell1 += '';
                            var x = cell1.split('.');
                            var x1 = x[0];
                            var x2 = x.length > 1 ? '.' + x[1] : '';
                            var x3 = x.length > 1 ? parseFloat(x1 + x2).toFixed(2) : x1 + x2;
                            var rgx = /(\d+)(\d{3})/;
                            // while (rgx.test(x1)) {
                            //     x1 = x1.replace(rgx, '$1' + ',' + '$2');
                            // }
                            return data.datasets[tooltipItem.datasetIndex].label + ' : ' + addCommas(x3);
                        } else {
                            let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            return data.datasets[tooltipItem.datasetIndex].label + ' : ' + addCommas(parseFloat(value).toFixed(2)) + " %";
                        }
                    }
                }

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


        let bar1 = {}
        if (this.state.momListPer != null && this.state.momListPer.length > 0 && this.state.momElPer != '') {
            // console.log("this.state.momElPer.getValue(`G${parseInt(index) + 1}`, true))", this.state.momElPer.getValue(`G${parseInt(2) + 1}`, true))
            var datasetsArr = [];

            datasetsArr.push(
                {
                    label: '% ' + (this.state.currentItemConfig.parentItem != null ? getLabelText(this.state.currentItemConfig.parentItem.payload.label, this.state.lang) : '') + ' (Month End)',
                    type: 'line',
                    stack: 3,
                    yAxisID: 'A',
                    backgroundColor: 'transparent',
                    borderColor: '#002F6C',
                    borderStyle: 'dotted',
                    ticks: {
                        fontSize: 2,
                        fontColor: 'transparent',
                    },
                    lineTension: 0,
                    pointStyle: 'line',
                    pointRadius: 0,
                    pointHoverBackgroundColor: 'transparent',
                    pointHoverBorderColor: 'transparent',
                    // pointHoverBorderWidth: 2,
                    // pointRadius: 1,
                    pointHitRadius: 5,
                    showInLegend: false,
                    yAxisID: 'B',
                    data: (this.state.momElPer).getJson(null, false).map((item, index) => (this.state.momElPer.getValue(`E${parseInt(index) + 1}`, true))),
                    // data: (this.state.momElPer).getJson(null, false).map((item, index) => (item[4], true)),
                }
            )

            datasetsArr.push({
                label: getLabelText(this.state.currentItemConfig.context.payload.label, this.state.lang),
                stack: 1,
                yAxisID: 'A',
                backgroundColor: '#BA0C2F',
                borderColor: grey,
                pointBackgroundColor: grey,
                pointBorderColor: '#fff',
                // pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: grey,
                pointHoverBackgroundColor: 'transparent',
                pointHoverBorderColor: 'transparent',
                // pointHoverBorderWidth: 2,
                // pointRadius: 1,
                pointHitRadius: 5,
                data: (this.state.momElPer).getJson(null, false).map((item, index) => (this.state.currentItemConfig.context.payload.nodeType.id > 3 ? this.state.momElPer.getValue(`I${parseInt(index) + 1}`, true).toString().replaceAll("\,", "") : this.state.momElPer.getValue(`G${parseInt(index) + 1}`, true).toString().replaceAll("\,", ""))),
            }
            )


            bar1 = {
                labels: [...new Set(this.state.momListPer.map(ele => (moment(ele.month).format(DATE_FORMAT_CAP_WITHOUT_DATE))))],
                datasets: datasetsArr

            };
        }
        return (
            <>
                <TabPane tabId="1">
                    <Formik
                        enableReinitialize={true}
                        // initialValues={initialValuesNodeData}
                        // validateOnChange={true}
                        initialValues={{
                            nodeTitle: this.state.currentItemConfig.context.payload.label.label_en,
                            nodeTypeId: this.state.currentItemConfig.context.payload.nodeType.id,
                            nodeUnitId: this.state.currentItemConfig.context.payload.nodeUnit.id != null ? this.state.currentItemConfig.context.payload.nodeUnit.id : "",
                            forecastingUnitId: this.state.fuValues,
                            tempPlanningUnitId: this.state.tempPlanningUnitId,
                            nodeValue: this.state.numberNode ? this.state.currentScenario.calculatedDataValue == 0 ? "0" : addCommas(this.state.currentScenario.calculatedDataValue) : addCommas(this.state.currentScenario.dataValue),
                            // showFUValidation : true
                            percentageOfParent: this.state.currentScenario.dataValue,
                            usageTypeIdFU: "",
                            lagInMonths: "",
                            noOfPersons: "",
                            forecastingUnitPerPersonsFC: "",
                            repeatCount: "",
                            usageFrequencyCon: "",
                            usageFrequencyDis: "",
                            oneTimeUsage: "",
                            planningUnitId: this.state.currentItemConfig.context.payload.nodeType.id == 5 ? (this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].puNode.planningUnit.id : ""
                        }}
                        validate={validateNodeData(validationSchemaNodeData)}
                        onSubmit={(values, { setSubmitting, setErrors }) => {
                            // console.log("Inside>>>>>   all ok>>>", this.state.currentItemConfig);
                            this.formSubmitLoader();
                            if(this.state.lastRowDeleted == true ? true : this.state.modelingTabChanged ? this.checkValidation() : true){
                                if (!this.state.isSubmitClicked) {
                                    // console.log("Inside>>>>> !this.state.isSubmitClicked", !this.state.isSubmitClicked);
                                    
                                    this.setState({ loading: true, openAddNodeModal: false, isSubmitClicked: true }, () => {
                                        setTimeout(() => {
                                            // console.log("inside set timeout on submit")
                                            // console.log("Inside>>>>> this.state.addNodeFlag>>>", this.state.addNodeFlag);

                                            if (this.state.addNodeFlag) {
                                                this.onAddButtonClick(this.state.currentItemConfig, false, null)
                                            } else {
                                                this.updateNodeInfoInJson(this.state.currentItemConfig)
                                            }
                                            this.setState({
                                                cursorItem: 0,
                                                highlightItem: 0,
                                                activeTab1: new Array(1).fill('1')
                                            })
                                        }, 0);
                                    })
                                    this.setState({ modelingTabChanged: false })
                                }
                            }else{
                                this.setState({ activeTab1: new Array(1).fill('2') })
                            }

                        }}
                        render={
                            ({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                                isValid,
                                setTouched,
                                handleReset,
                                setFieldValue,
                                setFieldTouched
                            }) => (
                                <Form className="needs-validation" onSubmit={handleSubmit} onReset={handleReset} noValidate name='nodeDataForm' autocomplete="off">
                                    <div className="row pt-lg-0" style={{ float: 'right', marginTop: '-42px' }}>
                                        <div className="row pl-lg-0 pr-lg-3">
                                            {/* <SupplyPlanFormulas ref="formulaeChild" /> */}
                                            <a className="">
                                                <span style={{ cursor: 'pointer', color: '20a8d8' }} onClick={() => { this.toggleShowGuidanceNodeData() }} ><small className="supplyplanformulas">{i18n.t('static.common.showGuidance')}</small></span>

                                            </a>
                                        </div>
                                    </div>
                                    {(this.state.currentItemConfig.context.payload.nodeType.id != 5) &&
                                        <>

                                            <div>
                                                <Popover placement="top" isOpen={this.state.popoverOpenSenariotree} target="Popover1" trigger="hover" toggle={this.toggleSenariotree}>
                                                    <PopoverBody>{i18n.t('static.tooltip.scenario')}</PopoverBody>
                                                </Popover>
                                            </div>
                                            <div className="row">
                                                <FormGroup className="col-md-6">
                                                    <Label htmlFor="currencyId">{i18n.t('static.whatIf.scenario')} <i class="fa fa-info-circle icons pl-lg-2" id="Popover1" onClick={this.toggleSenariotree} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                    <Input type="text"
                                                        name="scenarioTxt"
                                                        bsSize="sm"
                                                        readOnly={true}
                                                        value={this.state.selectedScenarioLabel}
                                                    ></Input>
                                                </FormGroup>

                                                {this.state.level0 &&
                                                    <>
                                                        <div>
                                                            <Popover placement="top" isOpen={this.state.popoverOpenParent} target="Popover2" trigger="hover" toggle={this.toggleParent}>
                                                                <PopoverBody>{i18n.t('static.tooltip.Parent')}</PopoverBody>
                                                            </Popover>
                                                        </div>
                                                        <FormGroup className="col-md-6">
                                                            {/* <Label htmlFor="currencyId">{i18n.t('static.tree.parent')} </Label> */}
                                                            <Label htmlFor="currencyId">{i18n.t('static.tree.parent')} <i class="fa fa-info-circle icons pl-lg-2" id="Popover2" onClick={this.toggleParent} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                            <Input type="text"
                                                                name="parent"
                                                                bsSize="sm"
                                                                readOnly={true}
                                                                value={this.state.currentItemConfig.context.level != 0
                                                                    && this.state.addNodeFlag !== "true"
                                                                    ? this.state.currentItemConfig.parentItem.payload.label.label_en
                                                                    : this.state.currentItemConfig.parentItem.payload.label.label_en}
                                                            ></Input>
                                                        </FormGroup>
                                                    </>}

                                                <div>
                                                    <Popover placement="top" isOpen={this.state.popoverOpenNodeTitle} target="Popover3" trigger="hover" toggle={this.toggleNodeTitle}>
                                                        <PopoverBody>{i18n.t('static.tooltip.NodeTitle')}</PopoverBody>
                                                    </Popover>
                                                </div>
                                                <FormGroup className="col-md-6">
                                                    <Label htmlFor="currencyId">{i18n.t('static.tree.nodeTitle')}<span class="red Reqasterisk">*</span> <i class="fa fa-info-circle icons pl-lg-2" id="Popover3" onClick={this.toggleNodeTitle} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                    <Input type="text"
                                                        id="nodeTitle"
                                                        name="nodeTitle"
                                                        bsSize="sm"
                                                        valid={!errors.nodeTitle && this.state.currentItemConfig.context.payload.label.label_en != ''}
                                                        invalid={touched.nodeTitle && !!errors.nodeTitle}
                                                        onBlur={handleBlur}
                                                        onChange={(e) => { handleChange(e); this.dataChange(e) }}
                                                        value={this.state.currentItemConfig.context.payload.label.label_en}>
                                                    </Input>
                                                    <FormFeedback className="red">{errors.nodeTitle}</FormFeedback>
                                                </FormGroup>
                                                <div>
                                                    <Popover placement="top" isOpen={this.state.popoverOpenNodeType} target="Popover4" trigger="hover" toggle={this.toggleNodeType}>
                                                        <PopoverBody>{i18n.t('static.tooltip.NodeType')}</PopoverBody>
                                                    </Popover>
                                                </div>
                                                <Input
                                                    type="hidden"
                                                    name="isValidError"
                                                    id="isValidError"
                                                    value={JSON.stringify(errors) != '{}'}
                                                />
                                                {/* {errors} */}
                                                <FormGroup className={"col-md-6"}>
                                                    <Label htmlFor="currencyId">{i18n.t('static.tree.nodeType')}<span class="red Reqasterisk">*</span> <i class="fa fa-info-circle icons pl-lg-2" id="Popover4" onClick={this.toggleNodeType} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                    <Input
                                                        type="select"
                                                        id="nodeTypeId"
                                                        name="nodeTypeId"
                                                        bsSize="sm"
                                                        valid={!errors.nodeTypeId && this.state.currentItemConfig.context.payload.nodeType.id != ''}
                                                        invalid={touched.nodeTypeId && !!errors.nodeTypeId}
                                                        onBlur={handleBlur}
                                                        onChange={(e) => { handleChange(e); this.nodeTypeChange(e.target.value); this.dataChange(e) }}
                                                        required
                                                        value={this.state.currentItemConfig.context.payload.nodeType.id}
                                                    >
                                                        <option value="">{i18n.t('static.common.select')}</option>
                                                        {this.state.nodeTypeFollowUpList.length > 0
                                                            && this.state.nodeTypeFollowUpList.map((item, i) => {
                                                                return (
                                                                    <option key={i} value={item.id}>
                                                                        {getLabelText(item.label, this.state.lang)}
                                                                    </option>
                                                                )
                                                            }, this)}
                                                    </Input>
                                                    <FormFeedback className="red">{errors.nodeTypeId}</FormFeedback>
                                                </FormGroup>
                                                {/* <FormGroup style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 2 ? "block" : "none" }}>
                                            <div style={{ marginLeft: '34px', marginTop: '8px' }}>
                                                <Input
                                                    className="form-check-input checkboxMargin"
                                                    type="checkbox"
                                                    id="extrapolate"
                                                    name="extrapolate"
                                                    // checked={true}
                                                    checked={this.state.currentItemConfig.context.payload.extrapolation}
                                                    onClick={(e) => { this.extrapolate(e); }}
                                                />
                                                <Label
                                                    className="form-check-label"
                                                    check htmlFor="inline-radio2" style={{ fontSize: '12px' }}>
                                                    <b>{'Extrapolate'}</b>
                                                </Label>
                                            </div>
                                        </FormGroup> */}

                                                {/* {this.state.aggregationNode && */}

                                                <FormGroup className="col-md-6" style={{ display: this.state.aggregationNode && this.state.currentItemConfig.context.payload.nodeType.id < 4 ? 'block' : 'none' }}>
                                                    <Label htmlFor="currencyId">{i18n.t('static.tree.nodeUnit')}<span class="red Reqasterisk">*</span></Label>
                                                    <Input
                                                        type="select"
                                                        id="nodeUnitId"
                                                        name="nodeUnitId"
                                                        bsSize="sm"
                                                        valid={!errors.nodeUnitId && this.state.currentItemConfig.context.payload.nodeUnit.id != ''}
                                                        invalid={touched.nodeUnitId && !!errors.nodeUnitId}
                                                        onBlur={handleBlur}
                                                        onChange={(e) => { handleChange(e); this.dataChange(e) }}
                                                        required
                                                        disabled={this.state.currentItemConfig.context.payload.nodeType.id > 3 ? true : false}
                                                        value={this.state.currentItemConfig.context.payload.nodeType.id == 4 ? this.state.currentItemConfig.parentItem.payload.nodeUnit.id : this.state.currentItemConfig.context.payload.nodeUnit.id}
                                                    >
                                                        <option value="">{i18n.t('static.common.select')}</option>
                                                        {this.state.nodeUnitList.length > 0
                                                            && this.state.nodeUnitList.map((item, i) => {
                                                                return (
                                                                    <option key={i} value={item.unitId}>
                                                                        {getLabelText(item.label, this.state.lang)}
                                                                    </option>
                                                                )
                                                            }, this)}
                                                    </Input>
                                                    <FormFeedback className="red">{errors.nodeUnitId}</FormFeedback>
                                                </FormGroup>

                                                {/* } */}
                                                {/* {this.state.currentItemConfig.context.payload.nodeType.id != 1 && */}
                                                <FormGroup className="col-md-6" style={{ display: this.state.aggregationNode ? 'block' : 'none' }}>
                                                    <Label htmlFor="currencyId">{i18n.t('static.common.month')}<span class="red Reqasterisk">*</span></Label>
                                                    <div className="controls edit">
                                                        <Picker
                                                            id="month"
                                                            name="month"
                                                            ref={this.pickAMonth1}
                                                            years={{ min: this.state.minDateValue, max: this.state.maxDate }}
                                                            // year: new Date(this.state.currentScenario.month).getFullYear(), month: ("0" + (new Date(this.state.currentScenario.month).getMonth() + 1)).slice(-2)
                                                            value={{
                                                                year: new Date(this.state.currentScenario.month.replace(/-/g, '\/')).getFullYear(), month: ("0" + (new Date(this.state.currentScenario.month.replace(/-/g, '\/')).getMonth() + 1)).slice(-2)
                                                            }}
                                                            lang={pickerLang.months}
                                                            // theme="dark"

                                                            onChange={this.handleAMonthChange1}
                                                            onDismiss={this.handleAMonthDissmis1}
                                                        >
                                                            <MonthBox value={this.makeText({ year: new Date(this.state.currentScenario.month.replace(/-/g, '\/')).getFullYear(), month: ("0" + (new Date(this.state.currentScenario.month.replace(/-/g, '\/')).getMonth() + 1)).slice(-2) })}
                                                                onClick={this.handleClickMonthBox1} />
                                                        </Picker>
                                                    </div>
                                                </FormGroup>
                                                {/* } */}


                                                {/* {this.state.numberNode && */}
                                                {/* <> */}
                                                <div>
                                                    <Popover placement="top" isOpen={this.state.popoverOpenPercentageOfParent} target="Popover5" trigger="hover" toggle={this.togglePercentageOfParent}>
                                                        <PopoverBody>{i18n.t('static.tooltip.PercentageOfParent')}</PopoverBody>
                                                    </Popover>
                                                </div>
                                                <FormGroup className="col-md-6" style={{ display: this.state.numberNode ? 'block' : 'none' }}>
                                                    <Label htmlFor="currencyId">{i18n.t('static.tree.percentageOfParent')}<span class="red Reqasterisk">*</span> <i class="fa fa-info-circle icons pl-lg-2" id="Popover5" onClick={this.togglePercentageOfParent} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                    <InputGroup>
                                                        <Input type="number"
                                                            id="percentageOfParent"
                                                            name="percentageOfParent"
                                                            bsSize="sm"
                                                            valid={!errors.percentageOfParent && this.state.currentScenario.dataValue != ''}
                                                            invalid={touched.percentageOfParent && !!errors.percentageOfParent}
                                                            onBlur={handleBlur}
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                                this.dataChange(e)
                                                            }}
                                                            // step={.01}
                                                            value={this.state.currentScenario.dataValue}></Input>
                                                        <InputGroupAddon addonType="append">
                                                            <InputGroupText><i class="fa fa-percent icons" data-toggle="collapse" aria-expanded="false"></i></InputGroupText>
                                                        </InputGroupAddon>
                                                        <FormFeedback className="red">{errors.percentageOfParent}</FormFeedback>
                                                    </InputGroup>
                                                </FormGroup>
                                                <div>
                                                    <Popover placement="top" isOpen={this.state.popoverOpenParentValue} target="Popover6" trigger="hover" toggle={this.toggleParentValue}>
                                                        <PopoverBody>{i18n.t('static.tooltip.ParentValue')}</PopoverBody>
                                                    </Popover>
                                                </div>
                                                <FormGroup className="col-md-6" style={{ display: this.state.numberNode ? 'block' : 'none' }}>
                                                    <Label htmlFor="currencyId">{i18n.t('static.tree.parentValue')} {i18n.t('static.common.for')} {moment(this.state.currentScenario.month).format(`MMM-YYYY`)} <i class="fa fa-info-circle icons pl-lg-2" id="Popover6" onClick={this.toggleParentValue} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                    <Input type="text"
                                                        id="parentValue"
                                                        name="parentValue"
                                                        bsSize="sm"
                                                        readOnly={true}
                                                        onChange={(e) => { this.dataChange(e) }}
                                                        // value={this.state.addNodeFlag != "true" ? addCommas(this.state.parentScenario.calculatedDataValue) : addCommas(this.state.parentValue)}
                                                        value={addCommas(this.state.parentValue.toString())}
                                                    ></Input>
                                                </FormGroup>
                                                {/* </> */}

                                                {/* } */}
                                                {/* {this.state.aggregationNode && */}
                                                <div>
                                                    <Popover placement="top" isOpen={this.state.popoverOpenNodeValue} target="Popover7" trigger="hover" toggle={this.toggleNodeValue}>
                                                        <PopoverBody>{this.state.numberNode ? i18n.t('static.tooltip.NodeValue') : i18n.t('static.tooltip.NumberNodeValue')}</PopoverBody>
                                                    </Popover>
                                                </div>
                                                <FormGroup className="col-md-6" style={{ display: this.state.aggregationNode ? 'block' : 'none' }}>
                                                    {(this.state.currentItemConfig.context.payload.nodeType.id < 4) &&
                                                        <Label htmlFor="currencyId">{i18n.t('static.tree.nodeValue')}{this.state.numberNode}<span class="red Reqasterisk">*</span> <i class="fa fa-info-circle icons pl-lg-2" id="Popover7" onClick={this.toggleNodeValue} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>}
                                                    {(this.state.currentItemConfig.context.payload.nodeType.id >= 4) &&
                                                        <Label htmlFor="currencyId"> {this.state.currentScenario.dataValue} % of {i18n.t('static.tree.parentValue')} {i18n.t('static.common.for')} {moment(this.state.currentScenario.month).format(`MMM-YYYY`)} {this.state.numberNode}<span class="red Reqasterisk">*</span> <i class="fa fa-info-circle icons pl-lg-2" id="Popover7" onClick={this.toggleNodeValue} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>}

                                                    <Input type="text"
                                                        id="nodeValue"
                                                        name="nodeValue"
                                                        bsSize="sm"
                                                        valid={!errors.nodeValue && (this.state.currentItemConfig.context.payload.nodeType.id != 1 && this.state.currentItemConfig.context.payload.nodeType.id != 2) ? addCommas(this.state.currentScenario.calculatedDataValue) : addCommas(this.state.currentScenario.dataValue) != ''}
                                                        invalid={touched.nodeValue && !!errors.nodeValue}
                                                        onBlur={handleBlur}
                                                        readOnly={this.state.numberNode || this.state.currentScenario.extrapolation ? true : false}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            this.dataChange(e)
                                                        }}
                                                        // step={.01}
                                                        // value={this.getNodeValue(this.state.currentItemConfig.context.payload.nodeType.id)}
                                                        value={this.state.numberNode ? this.state.currentScenario.calculatedDataValue == 0 ? "0" : addCommasNodeValue(this.state.currentScenario.calculatedDataValue) : addCommasNodeValue(this.state.currentScenario.dataValue)}
                                                    ></Input>
                                                    <FormFeedback className="red">{errors.nodeValue}</FormFeedback>
                                                </FormGroup>
                                                {/* } */}

                                                <FormGroup className="col-md-6">
                                                    <Label htmlFor="currencyId">{i18n.t('static.ManageTree.Notes')}</Label>
                                                    <Input type="textarea"
                                                        id="notes"
                                                        name="notes"
                                                        onChange={(e) => { this.dataChange(e) }}
                                                        // value={this.getNotes}
                                                        value={this.state.currentScenario.notes}
                                                    ></Input>
                                                </FormGroup>
                                            </div>
                                        </>}
                                    {/* Planning unit start */}
                                    <div>
                                        <div className="row">
                                            {(this.state.currentItemConfig.context.payload.nodeType.id == 5) &&
                                                <>
                                                    <div className="row pl-lg-3 pr-lg-3">
                                                        {this.state.level0 &&
                                                            <>
                                                                <div>
                                                                    <Popover placement="top" isOpen={this.state.popoverOpenParent} target="Popover2" trigger="hover" toggle={this.toggleParent}>
                                                                        <PopoverBody>{i18n.t('static.tooltip.Parent')}</PopoverBody>
                                                                    </Popover>
                                                                </div>
                                                                <FormGroup className="col-md-4">
                                                                    <Label htmlFor="currencyId">{i18n.t('static.tree.parent')} <i class="fa fa-info-circle icons pl-lg-2" id="Popover2" onClick={this.toggleParent} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                                    <Input type="text"
                                                                        name="parent"
                                                                        bsSize="sm"
                                                                        readOnly={true}
                                                                        value={this.state.currentItemConfig.context.level != 0
                                                                            && this.state.addNodeFlag !== "true"
                                                                            ? this.state.currentItemConfig.parentItem.payload.label.label_en
                                                                            : this.state.currentItemConfig.parentItem.payload.label.label_en}
                                                                    ></Input>
                                                                </FormGroup>
                                                            </>}
                                                        <div>
                                                            <Popover placement="top" isOpen={this.state.popoverOpenNodeTitle} target="Popover3" trigger="hover" toggle={this.toggleNodeTitle}>
                                                                <PopoverBody>{i18n.t('static.tooltip.NodeTitle')}</PopoverBody>
                                                            </Popover>
                                                        </div>
                                                        <FormGroup className="col-md-4">
                                                            <Label htmlFor="currencyId">{i18n.t('static.tree.nodeTitle')}<span class="red Reqasterisk">*</span> <i class="fa fa-info-circle icons pl-lg-2" id="Popover3" onClick={this.toggleNodeTitle} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                            <Input type="text"
                                                                id="nodeTitle"
                                                                name="nodeTitle"
                                                                bsSize="sm"
                                                                valid={!errors.nodeTitle && this.state.currentItemConfig.context.payload.label.label_en != ''}
                                                                invalid={touched.nodeTitle && !!errors.nodeTitle}
                                                                onBlur={handleBlur}
                                                                onChange={(e) => { handleChange(e); this.dataChange(e) }}
                                                                value={this.state.currentItemConfig.context.payload.label.label_en}>
                                                            </Input>
                                                            <FormFeedback className="red">{errors.nodeTitle}</FormFeedback>
                                                        </FormGroup>
                                                        <div>
                                                            <Popover placement="top" isOpen={this.state.popoverOpenNodeType} target="Popover4" trigger="hover" toggle={this.toggleNodeType}>
                                                                <PopoverBody>{i18n.t('static.tooltip.NodeType')}</PopoverBody>
                                                            </Popover>
                                                        </div>
                                                        <Input
                                                            type="hidden"
                                                            name="isValidError"
                                                            id="isValidError"
                                                            value={JSON.stringify(errors) != '{}'}
                                                        />
                                                        {/* {errors} */}
                                                        <FormGroup className={"col-md-4"}>
                                                            <Label htmlFor="currencyId">{i18n.t('static.tree.nodeType')}<span class="red Reqasterisk">*</span> <i class="fa fa-info-circle icons pl-lg-2" id="Popover4" onClick={this.toggleNodeType} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                            <Input
                                                                type="select"
                                                                id="nodeTypeId"
                                                                name="nodeTypeId"
                                                                bsSize="sm"
                                                                valid={!errors.nodeTypeId && this.state.currentItemConfig.context.payload.nodeType.id != ''}
                                                                invalid={touched.nodeTypeId && !!errors.nodeTypeId}
                                                                onBlur={handleBlur}
                                                                onChange={(e) => { handleChange(e); this.nodeTypeChange(e.target.value); this.dataChange(e) }}
                                                                required
                                                                value={this.state.currentItemConfig.context.payload.nodeType.id}
                                                            >
                                                                <option value="">{i18n.t('static.common.select')}</option>
                                                                {this.state.nodeTypeFollowUpList.length > 0
                                                                    && this.state.nodeTypeFollowUpList.map((item, i) => {
                                                                        return (
                                                                            <option key={i} value={item.id}>
                                                                                {getLabelText(item.label, this.state.lang)}
                                                                            </option>
                                                                        )
                                                                    }, this)}
                                                            </Input>
                                                            <FormFeedback className="red">{errors.nodeTypeId}</FormFeedback>
                                                        </FormGroup>
                                                        <FormGroup className="col-md-4" style={{ display: this.state.aggregationNode ? 'block' : 'none' }}>
                                                            <Label htmlFor="currencyId">Month for data start <span class="red Reqasterisk">*</span></Label>
                                                            <div className="controls edit">
                                                                <Picker
                                                                    id="month"
                                                                    name="month"
                                                                    ref={this.pickAMonth1}
                                                                    years={{ min: this.state.minDateValue, max: this.state.maxDate }}
                                                                    // year: new Date(this.state.currentScenario.month).getFullYear(), month: ("0" + (new Date(this.state.currentScenario.month).getMonth() + 1)).slice(-2)
                                                                    value={{
                                                                        year: new Date(this.state.currentScenario.month.replace(/-/g, '\/')).getFullYear(), month: ("0" + (new Date(this.state.currentScenario.month.replace(/-/g, '\/')).getMonth() + 1)).slice(-2)
                                                                    }}
                                                                    lang={pickerLang.months}
                                                                    // theme="dark"

                                                                    onChange={this.handleAMonthChange1}
                                                                    onDismiss={this.handleAMonthDissmis1}
                                                                >
                                                                    <MonthBox value={this.makeText({ year: new Date(this.state.currentScenario.month.replace(/-/g, '\/')).getFullYear(), month: ("0" + (new Date(this.state.currentScenario.month.replace(/-/g, '\/')).getMonth() + 1)).slice(-2) })}
                                                                        onClick={this.handleClickMonthBox1} />
                                                                </Picker>
                                                            </div>
                                                        </FormGroup>
                                                        <div>
                                                            <Popover placement="top" isOpen={this.state.popoverOpenParentValue} target="Popover6" trigger="hover" toggle={this.toggleParentValue}>
                                                                <PopoverBody>{i18n.t('static.tooltip.ParentValue')}</PopoverBody>
                                                            </Popover>
                                                        </div>
                                                        <FormGroup className="col-md-4" style={{ display: this.state.numberNode ? 'block' : 'none' }}>
                                                            <Label htmlFor="currencyId">{i18n.t('static.tree.parentValue')} in {moment(this.state.currentScenario.month).format(`MMM-YYYY`)} <i class="fa fa-info-circle icons pl-lg-2" id="Popover6" onClick={this.toggleParentValue} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                            <Input type="text"
                                                                id="parentValue"
                                                                name="parentValue"
                                                                bsSize="sm"
                                                                readOnly={true}
                                                                onChange={(e) => { this.dataChange(e) }}
                                                                // value={this.state.addNodeFlag != "true" ? addCommas(this.state.parentScenario.calculatedDataValue) : addCommas(this.state.parentValue)}
                                                                value={addCommas(this.state.parentValue.toString()) + " " + this.state.nodeUnitList.filter(c => c.unitId == this.state.currentItemConfig.context.payload.nodeUnit.id)[0].label.label_en
                                                                }
                                                            ></Input>
                                                        </FormGroup>

                                                        <FormGroup className="col-md-4">
                                                            <Label htmlFor="currencyId">{i18n.t('static.common.note')}</Label>
                                                            <Input type="textarea"
                                                                id="notes"
                                                                name="notes"
                                                                style={{ height: "100px" }}
                                                                onChange={(e) => { this.dataChange(e) }}
                                                                // value={this.getNotes}
                                                                value={this.state.currentScenario.notes}
                                                            ></Input>
                                                        </FormGroup>
                                                        <div>
                                                            <Popover placement="top" isOpen={this.state.popoverOpenPercentageOfParent} target="Popover5" trigger="hover" toggle={this.togglePercentageOfParent}>
                                                                <PopoverBody>{i18n.t('static.tooltip.PercentageOfParent')}</PopoverBody>
                                                            </Popover>
                                                        </div>

                                                        <FormGroup className="col-md-4 PUNodemarginTop" style={{ display: this.state.numberNode ? 'block' : 'none' }}>
                                                            <Label htmlFor="currencyId">{i18n.t('static.tree.percentageOfParent')}<span class="red Reqasterisk">*</span> <i class="fa fa-info-circle icons pl-lg-2" id="Popover5" onClick={this.togglePercentageOfParent} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                            <InputGroup>
                                                                <Input type="number"
                                                                    id="percentageOfParent"
                                                                    name="percentageOfParent"
                                                                    bsSize="sm"
                                                                    valid={!errors.percentageOfParent && this.state.currentScenario.dataValue != ''}
                                                                    invalid={touched.percentageOfParent && !!errors.percentageOfParent}
                                                                    onBlur={handleBlur}
                                                                    onChange={(e) => {
                                                                        handleChange(e);
                                                                        this.dataChange(e)
                                                                    }}
                                                                    // step={.01}
                                                                    value={this.state.currentScenario.dataValue}></Input>
                                                                <InputGroupAddon addonType="append">
                                                                    <InputGroupText><i class="fa fa-percent icons" data-toggle="collapse" aria-expanded="false"></i></InputGroupText>
                                                                </InputGroupAddon>
                                                                <FormFeedback className="red">{errors.percentageOfParent}</FormFeedback>
                                                            </InputGroup>
                                                        </FormGroup>
                                                        <div>
                                                            <Popover placement="top" isOpen={this.state.popoverOpenNodeValue} target="Popover7" trigger="hover" toggle={this.toggleNodeValue}>
                                                                <PopoverBody>{this.state.numberNode ? i18n.t('static.tooltip.NodeValue') : i18n.t('static.tooltip.NumberNodeValue')}</PopoverBody>
                                                            </Popover>
                                                        </div>
                                                        <FormGroup className="col-md-4 PUNodemarginTop" style={{ display: this.state.aggregationNode ? 'block' : 'none' }}>
                                                            <Label htmlFor="currencyId">{i18n.t('static.tree.nodeValue')}{this.state.numberNode}<span class="red Reqasterisk">*</span> <i class="fa fa-info-circle icons pl-lg-2" id="Popover7" onClick={this.toggleNodeValue} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                            <Input type="text"
                                                                id="nodeValue"
                                                                name="nodeValue"
                                                                bsSize="sm"
                                                                valid={!errors.nodeValue && (this.state.currentItemConfig.context.payload.nodeType.id != 1 && this.state.currentItemConfig.context.payload.nodeType.id != 2) ? addCommas(this.state.currentScenario.displayCalculatedDataValue) : addCommas(this.state.currentScenario.dataValue) != ''}
                                                                invalid={touched.nodeValue && !!errors.nodeValue}
                                                                onBlur={handleBlur}
                                                                readOnly={this.state.numberNode || this.state.currentScenario.extrapolation ? true : false}
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                    this.dataChange(e)
                                                                }}
                                                                value={(this.state.numberNode ? this.state.currentScenario.displayCalculatedDataValue == 0 ? "0" : addCommasNodeValue(this.state.currentScenario.displayCalculatedDataValue) : addCommasNodeValue(this.state.currentScenario.dataValue)) + " " + this.state.nodeUnitList.filter(c => c.unitId == this.state.currentItemConfig.context.payload.nodeUnit.id)[0].label.label_en}
                                                            ></Input>
                                                            <FormFeedback className="red">{errors.nodeValue}</FormFeedback>
                                                        </FormGroup>
                                                    </div>
                                                    <div>
                                                        <Popover placement="top" isOpen={this.state.popoverOpenTypeOfUsePU} target="Popover8" trigger="hover" toggle={this.toggleTypeOfUsePU}>
                                                            <PopoverBody>{i18n.t('static.tooltip.TypeOfUsePU')}</PopoverBody>
                                                        </Popover>
                                                    </div>
                                                    {/* <FormGroup className="col-md-2">
                                                        <Label htmlFor="currencyId">{i18n.t('static.common.typeofuse')} <i class="fa fa-info-circle icons pl-lg-2" id="Popover8" onClick={this.toggleTypeOfUsePU} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                    </FormGroup> */}
                                                    <FormGroup className="col-md-2">
                                                        <Label htmlFor="currencyId">{i18n.t('static.common.typeofuse')} <i class="fa fa-info-circle icons pl-lg-2" id="Popover8" onClick={this.toggleTypeOfUsePU} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                        <Input
                                                            type="select"
                                                            id="usageTypeIdPU"
                                                            name="usageTypeIdPU"
                                                            bsSize="sm"
                                                            onChange={(e) => { this.dataChange(e) }}
                                                            required
                                                            disabled={true}
                                                            value={this.state.parentScenario.fuNode.usageType.id}
                                                        >
                                                            <option value="">{i18n.t('static.common.select')}</option>
                                                            {this.state.usageTypeList.length > 0
                                                                && this.state.usageTypeList.map((item, i) => {
                                                                    return (
                                                                        <option key={i} value={item.id}>
                                                                            {getLabelText(item.label, this.state.lang)}
                                                                        </option>
                                                                    )
                                                                }, this)}
                                                        </Input>
                                                    </FormGroup>
                                                    <div>
                                                        <Popover placement="top" isOpen={this.state.popoverOpenForecastingUnitPU} target="Popover9" trigger="hover" toggle={this.toggleForecastingUnitPU}>
                                                            <PopoverBody>{i18n.t('static.tooltip.TypeOfUsePU')}</PopoverBody>
                                                        </Popover>
                                                    </div>
                                                    {/* <FormGroup className="col-md-2">
                                                        <Label htmlFor="currencyId">{i18n.t('static.product.unit1')} <i class="fa fa-info-circle icons pl-lg-2" id="Popover9" onClick={this.toggleForecastingUnitPU} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>

                                                    </FormGroup> */}
                                                    <FormGroup className="col-md-7">
                                                        <Label htmlFor="currencyId">{i18n.t('static.product.unit1')} <i class="fa fa-info-circle icons pl-lg-2" id="Popover9" onClick={this.toggleForecastingUnitPU} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                        <Input type="text"
                                                            id="forecastingUnitPU"
                                                            name="forecastingUnitPU"
                                                            bsSize="sm"
                                                            readOnly={true}
                                                            value={this.state.parentScenario.fuNode.forecastingUnit.label.label_en + " | " + this.state.parentScenario.fuNode.forecastingUnit.id}>

                                                        </Input>
                                                    </FormGroup>
                                                    <div>
                                                        <Popover placement="top" isOpen={this.state.popoverOpenHashOfUMonth} target="Popover11" trigger="hover" toggle={this.toggleHashOfUMonth}>
                                                            <PopoverBody>{i18n.t('static.tooltip.TypeOfUsePU')}</PopoverBody>
                                                        </Popover>
                                                    </div>
                                                    {/* <FormGroup className="col-md-2">
                                                        <Label htmlFor="currencyId">{this.state.parentScenario.fuNode.usageType.id == 2 ? "# of FU / month / " : "# of FU / usage / "}{this.state.nodeUnitList.filter(c => c.unitId == this.state.currentItemConfig.context.payload.nodeUnit.id)[0].label.label_en} <i class="fa fa-info-circle icons pl-lg-2" id="Popover11" onClick={this.toggleHashOfUMonth} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                    </FormGroup> */}
                                                    <FormGroup className="col-md-3">
                                                        <Label htmlFor="currencyId">{this.state.parentScenario.fuNode.usageType.id == 2 ? "# of FU / month / " : "# of FU / "}{this.state.nodeUnitList.filter(c => c.unitId == this.state.currentItemConfig.context.payload.nodeUnit.id)[0].label.label_en} <i class="fa fa-info-circle icons pl-lg-2" id="Popover11" onClick={this.toggleHashOfUMonth} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                        <div className='d-flex'>
                                                            <Input type="text"
                                                                id="forecastingUnitPU"
                                                                name="forecastingUnitPU"
                                                                bsSize="sm"
                                                                readOnly={true}
                                                                className="mr-2"
                                                                value={addCommas(this.state.parentScenario.fuNode.usageType.id == 2 ? Number(this.state.parentScenario.fuNode.noOfForecastingUnitsPerPerson / this.state.noOfMonthsInUsagePeriod).toFixed(4) : this.state.noFURequired)}>

                                                            </Input>
                                                            {/* </FormGroup>
                                                    <FormGroup className="col-md-2" style={{ marginTop: "25px" }}> */}
                                                            <Input type="select"
                                                                id="forecastingUnitUnitPU"
                                                                name="forecastingUnitUnitPU"
                                                                bsSize="sm"
                                                                disabled="true"
                                                                onChange={(e) => { this.dataChange(e) }}
                                                                value={this.state.parentScenario.fuNode.forecastingUnit.unit.id}>

                                                                <option value=""></option>
                                                                {this.state.nodeUnitList.length > 0
                                                                    && this.state.unitList.map((item, i) => {
                                                                        return (
                                                                            <option key={i} value={item.unitId}>
                                                                                {getLabelText(item.label, this.state.lang)}
                                                                            </option>
                                                                        )
                                                                    }, this)}
                                                            </Input>
                                                        </div>
                                                    </FormGroup>
                                                </>
                                            }
                                            {(this.state.currentItemConfig.context.payload.nodeType.id == 5) &&
                                                <>
                                                    <div>
                                                        <Popover placement="top" isOpen={this.state.popoverOpenConversionFactorFUPU} target="Popover13" trigger="hover" toggle={this.toggleConversionFactorFUPU}>
                                                            <PopoverBody>{i18n.t('static.tooltip.Conversionfactor')}</PopoverBody>
                                                        </Popover>
                                                    </div>
                                                    {/* <FormGroup className="col-md-2">
                                                        <Label htmlFor="currencyId">{i18n.t('static.conversion.ConversionFactorFUPU')} <i class="fa fa-info-circle icons pl-lg-2" id="Popover13" onClick={this.toggleConversionFactorFUPU} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                    </FormGroup> */}
                                                    <FormGroup className="col-md-2">
                                                        <Label htmlFor="currencyId">{i18n.t('static.tree.conversionFUPU')} <i class="fa fa-info-circle icons pl-lg-2" id="Popover13" onClick={this.toggleConversionFactorFUPU} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                        <Input type="text"
                                                            id="conversionFactor"
                                                            name="conversionFactor"
                                                            bsSize="sm"
                                                            readOnly={true}
                                                            value={addCommas(this.state.conversionFactor)}>

                                                        </Input>
                                                    </FormGroup>

                                                    <div>
                                                        <Popover placement="top" isOpen={this.state.popoverOpenPlanningUnitNode} target="Popover12" trigger="hover" toggle={this.togglePlanningUnitNode}>
                                                            <PopoverBody>{i18n.t('static.tooltip.planningUnitNode')}</PopoverBody>
                                                        </Popover>
                                                    </div>
                                                    <FormGroup className="col-md-7" style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 5 ? 'block' : 'none' }}>
                                                        <Label htmlFor="currencyId">{i18n.t('static.product.product')}<span class="red Reqasterisk">*</span> <i class="fa fa-info-circle icons pl-lg-2" id="Popover12" onClick={this.togglePlanningUnitNode} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                        <Input type="select"
                                                            id="planningUnitId"
                                                            name="planningUnitId"
                                                            bsSize="sm"
                                                            className={this.state.currentScenario.isPUMappingCorrect == 0 ? "redPU" : ""}
                                                            valid={!errors.planningUnitId && this.state.currentItemConfig.context.payload.nodeType.id == 5 ? this.state.currentScenario.puNode.planningUnit.id != '' : !errors.planningUnitId}
                                                            invalid={touched.planningUnitId && !!errors.planningUnitId}
                                                            onBlur={handleBlur}
                                                            onChange={(e) => { handleChange(e); this.dataChange(e) }}
                                                            value={this.state.currentItemConfig.context.payload.nodeType.id == 5 ? this.state.currentScenario.puNode.planningUnit.id : ""}>

                                                            <option value="" className="black">{i18n.t('static.common.select')}</option>
                                                            {this.state.planningUnitList.length > 0
                                                                && this.state.planningUnitList.map((item, i) => {
                                                                    return (
                                                                        <option key={i} value={item.id} className="black">
                                                                            {getLabelText(item.label, this.state.lang) + " | " + item.id}
                                                                        </option>
                                                                    )
                                                                }, this)}
                                                        </Input>
                                                        <FormFeedback className="red">{errors.planningUnitId}</FormFeedback>
                                                    </FormGroup>
                                                    <div>
                                                        <Popover placement="top" isOpen={this.state.popoverOpenNoOfPUUsage} target="Popover14" trigger="hover" toggle={this.toggleNoOfPUUsage}>
                                                            <PopoverBody>{i18n.t('static.tooltip.NoOfPUUsage')}</PopoverBody>
                                                        </Popover>
                                                    </div>
                                                    <FormGroup className="col-md-3">
                                                        <Label htmlFor="currencyId">{this.state.parentScenario.fuNode.usageType.id == 2 ? "# of PU / month / " : "# of PU /  "}{this.state.nodeUnitList.filter(c => c.unitId == this.state.currentItemConfig.context.payload.nodeUnit.id)[0].label.label_en} <i class="fa fa-info-circle icons pl-lg-2" id="Popover14" onClick={this.toggleNoOfPUUsage} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                        <div className='d-flex'>
                                                            <Input type="text"
                                                                id="noOfPUUsage"
                                                                name="noOfPUUsage"
                                                                bsSize="sm"
                                                                className="mr-2"
                                                                readOnly={true}
                                                                value={addCommasWith8Decimals(this.state.parentScenario.fuNode.usageType.id == 2 ? parseFloat((this.state.parentScenario.fuNode.noOfForecastingUnitsPerPerson / this.state.noOfMonthsInUsagePeriod) / this.state.conversionFactor).toFixed(8) : (this.state.noFURequired / this.state.conversionFactor))}>

                                                            </Input>
                                                            {/* </FormGroup>
                                                    <FormGroup className="col-md-2" style={{ marginTop: "25px" }}> */}
                                                            <Input type="select"
                                                                id="planningUnitUnitPU"
                                                                name="planningUnitUnitPU"
                                                                bsSize="sm"
                                                                disabled="true"
                                                                onChange={(e) => { this.dataChange(e) }}
                                                                value={this.state.planningUnitList.filter(c => c.id == this.state.currentScenario.puNode.planningUnit.id).length > 0 ? this.state.planningUnitList.filter(c => c.id == this.state.currentScenario.puNode.planningUnit.id)[0].unit.id : ""}>

                                                                <option value=""></option>
                                                                {this.state.unitList.length > 0
                                                                    && this.state.unitList.map((item, i) => {
                                                                        return (
                                                                            <option key={i} value={item.unitId}>
                                                                                {getLabelText(item.label, this.state.lang)}
                                                                            </option>
                                                                        )
                                                                    }, this)}
                                                            </Input>
                                                        </div>
                                                    </FormGroup>

                                                    {this.state.parentScenario.fuNode.usageType.id == 2 &&
                                                        <>
                                                            <div style={{ display: "none" }}>
                                                                <div>
                                                                    <Popover placement="top" isOpen={this.state.popoverOpenQATEstimateForInterval} target="Popover15" trigger="hover" toggle={this.toggleQATEstimateForInterval}>
                                                                        <PopoverBody>{i18n.t('static.tooltip.QATEstimateForInterval')}</PopoverBody>
                                                                    </Popover>
                                                                </div>
                                                                <FormGroup className="col-md-6">
                                                                    <Label htmlFor="currencyId">Consumption Interval (Reference)<i class="fa fa-info-circle icons pl-lg-2" id="Popover15" onClick={this.toggleQATEstimateForInterval} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                                    <Input type="text"
                                                                        id="interval"
                                                                        name="interval"
                                                                        bsSize="sm"
                                                                        readOnly={true}
                                                                        value={addCommas(this.round(this.state.conversionFactor / (this.state.parentScenario.fuNode.noOfForecastingUnitsPerPerson / this.state.noOfMonthsInUsagePeriod)))}>
                                                                        {/* value={addCommas(this.state.currentItemConfig.context.payload.nodeType.id == 5 && this.state.parentScenario.fuNode.usageType.id == 2 ? this.state.currentScenario.puNode.refillMonths : "")}> */}
                                                                    </Input>
                                                                </FormGroup>
                                                            </div>
                                                            <FormGroup className="col-md-6">
                                                                <Label htmlFor="currencyId"># PU / Interval / {this.state.currentItemConfig.parentItem != null && this.state.currentItemConfig.parentItem.parent != null && this.state.unitList.filter(c => c.unitId == this.state.items.filter(x => x.id == this.state.currentItemConfig.parentItem.parent)[0].payload.nodeUnit.id).length > 0 && this.state.unitList.filter(c => c.unitId == this.state.items.filter(x => x.id == this.state.currentItemConfig.parentItem.parent)[0].payload.nodeUnit.id)[0].label.label_en} (Reference)</Label>
                                                                <Input type="text"
                                                                    id="puPerVisitQATCalculated"
                                                                    name="puPerVisitQATCalculated"
                                                                    readOnly={true}
                                                                    bsSize="sm"
                                                                    value={addCommasWith8Decimals(this.state.qatCalculatedPUPerVisit)}
                                                                // value={this.state.currentItemConfig.parentItem != null && this.state.parentScenario.fuNode != null ? (this.state.currentScenario.puNode.sharePlanningUnit == "false" || this.state.currentScenario.puNode.sharePlanningUnit == false || this.state.parentScenario.fuNode.usageType.id == 2) ? addCommas(this.state.currentScenario.puNode.puPerVisit) : addCommas(this.state.noOfMonthsInUsagePeriod / this.state.conversionFactor) : ""}
                                                                >
                                                                </Input>
                                                            </FormGroup>
                                                            <div style={{ display: "none" }}>
                                                                <div>
                                                                    <Popover placement="top" isOpen={this.state.popoverOpenConsumptionIntervalEveryXMonths} target="Popover16" trigger="hover" toggle={this.toggleConsumptionIntervalEveryXMonths}>
                                                                        <PopoverBody>{i18n.t('static.tooltip.ConsumptionIntervalEveryXMonths')}</PopoverBody>
                                                                    </Popover>
                                                                </div>

                                                                <FormGroup className="col-md-6">
                                                                    <Label htmlFor="currencyId">{i18n.t('static.tree.consumptionIntervalEveryXMonths')}<span class="red Reqasterisk">*</span> <i class="fa fa-info-circle icons pl-lg-2" id="Popover16" onClick={this.toggleConsumptionIntervalEveryXMonths} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                                    <Input type="text"
                                                                        id="refillMonths"
                                                                        name="refillMonths"
                                                                        valid={!errors.refillMonths && this.state.currentItemConfig.context.payload.nodeType.id == 5 && this.state.parentScenario.fuNode.usageType.id == 2 ? this.state.currentScenario.puNode.refillMonths != '' : !errors.refillMonths}
                                                                        invalid={touched.refillMonths && !!errors.refillMonths}
                                                                        onBlur={handleBlur}
                                                                        onChange={(e) => {
                                                                            handleChange(e);
                                                                            this.dataChange(e)
                                                                        }}
                                                                        bsSize="sm"
                                                                        value={addCommas(this.state.currentItemConfig.context.payload.nodeType.id == 5 && this.state.parentScenario.fuNode.usageType.id == 2 ? this.state.currentScenario.puNode.refillMonths : "")}>

                                                                    </Input>
                                                                    <FormFeedback className="red">{errors.refillMonths}</FormFeedback>
                                                                </FormGroup>
                                                            </div>
                                                            <FormGroup className="col-md-6">
                                                                <Label htmlFor="currencyId">{this.state.currentItemConfig.parentItem != null && this.state.parentScenario.fuNode != null && this.state.parentScenario.fuNode.usageType.id == 2 ? "# PU / Interval / " : "# PU / "}{this.state.currentItemConfig.parentItem != null && this.state.currentItemConfig.parentItem.parent != null && this.state.unitList.filter(c => c.unitId == this.state.items.filter(x => x.id == this.state.currentItemConfig.parentItem.parent)[0].payload.nodeUnit.id).length > 0 && this.state.unitList.filter(c => c.unitId == this.state.items.filter(x => x.id == this.state.currentItemConfig.parentItem.parent)[0].payload.nodeUnit.id)[0].label.label_en}(s)</Label>
                                                                <Input type="text"
                                                                    id="puPerVisit"
                                                                    name="puPerVisit"
                                                                    readOnly={this.state.parentScenario.fuNode != null && (this.state.currentScenario.puNode.sharePlanningUnit == "false" || this.state.currentScenario.puNode.sharePlanningUnit == false || this.state.parentScenario.fuNode.usageType.id == 2) ? false : true}
                                                                    bsSize="sm"
                                                                    valid={!errors.puPerVisit && this.state.currentItemConfig.context.payload.nodeType.id == 5 ? this.state.currentScenario.puNode.puPerVisit != '' : !errors.puPerVisit}
                                                                    invalid={touched.puPerVisit && !!errors.puPerVisit}
                                                                    onBlur={handleBlur}
                                                                    onChange={(e) => {
                                                                        handleChange(e);
                                                                        this.dataChange(e)
                                                                    }}
                                                                    value={this.state.currentItemConfig.parentItem != null
                                                                        && this.state.parentScenario.fuNode != null ?
                                                                        (this.state.currentScenario.puNode.sharePlanningUnit == "false" || this.state.currentScenario.puNode.sharePlanningUnit == false || this.state.parentScenario.fuNode.usageType.id == 2) ?
                                                                            addCommasWith8Decimals(this.state.currentScenario.puNode.puPerVisit) : addCommasWith8Decimals(this.state.noFURequired / this.state.conversionFactor) : ""}
                                                                // value={addCommas(this.state.parentScenario.fuNode.usageType.id == 2 ? (((this.state.parentScenario.fuNode.noOfForecastingUnitsPerPerson /
                                                                //     this.state.noOfMonthsInUsagePeriod) / this.state.conversionFactor) * this.state.currentScenario.puNode.refillMonths) : (this.state.currentScenario.puNode.sharePlanningUnit == "true" || this.state.currentScenario.puNode.sharePlanningUnit == true ? (this.state.noOfMonthsInUsagePeriod / this.state.conversionFactor) : Math.round((this.state.noOfMonthsInUsagePeriod / this.state.conversionFactor))))}
                                                                >

                                                                </Input>
                                                                <FormFeedback className="red">{errors.puPerVisit}</FormFeedback>
                                                            </FormGroup>
                                                        </>}
                                                    {this.state.parentScenario.fuNode.usageType.id == 1 &&
                                                        <>
                                                            <div>
                                                                <Popover placement="top" isOpen={this.state.popoverOpenWillClientsShareOnePU} target="Popover17" trigger="hover" toggle={this.toggleWillClientsShareOnePU}>
                                                                    <PopoverBody>{i18n.t('static.tooltip.willClientsShareOnePU')}</PopoverBody>
                                                                </Popover>
                                                            </div>
                                                            <Input type="hidden" id="refillMonths" />
                                                            <FormGroup className="col-md-6" style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 5 && this.state.parentScenario.fuNode.usageType.id == 1 ? 'block' : 'none' }}>
                                                                <Label htmlFor="currencyId">{i18n.t('static.tree.willClientsShareOnePU?')}<span class="red Reqasterisk">*</span> <i class="fa fa-info-circle icons pl-lg-2" id="Popover17" onClick={this.toggleWillClientsShareOnePU} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                                {/* <Input type="select"
                                                                    id="sharePlanningUnit"
                                                                    name="sharePlanningUnit"
                                                                    bsSize="sm"
                                                                    valid={!errors.sharePlanningUnit && this.state.currentItemConfig.context.payload.nodeType.id == 5 ? this.state.currentScenario.puNode.sharePlanningUnit != '' : !errors.sharePlanningUnit}
                                                                    invalid={touched.sharePlanningUnit && !!errors.sharePlanningUnit}
                                                                    onBlur={handleBlur}
                                                                    onChange={(e) => {
                                                                        handleChange(e);
                                                                        this.dataChange(e)
                                                                    }}
                                                                    value={this.state.currentItemConfig.context.payload.nodeType.id == 5 ? this.state.currentScenario.puNode.sharePlanningUnit : ""}>

                                                                    <option value="">{i18n.t('static.common.select')}</option>
                                                                    <option value="true">{i18n.t('static.realm.yes')}</option>
                                                                    <option value="false">{i18n.t('static.program.no')}</option>

                                                                </Input> */}
                                                                <FormGroup check inline>
                                                                    <Input
                                                                        className="form-check-input"
                                                                        type="radio"
                                                                        id="sharePlanningUnitTrue"
                                                                        name="sharePlanningUnit"
                                                                        value={true}
                                                                        checked={this.state.currentScenario.puNode.sharePlanningUnit == true || this.state.currentScenario.puNode.sharePlanningUnit == "true"}
                                                                        onChange={(e) => {
                                                                            this.dataChange(e)
                                                                        }}

                                                                    />
                                                                    <Label
                                                                        className="form-check-label"
                                                                        check htmlFor="inline-radio1">
                                                                        {i18n.t('static.realm.yes')}
                                                                    </Label>
                                                                </FormGroup>
                                                                <FormGroup check inline>
                                                                    <Input
                                                                        className="form-check-input"
                                                                        type="radio"
                                                                        id="sharePlanningUnitFalse"
                                                                        name="sharePlanningUnit"
                                                                        value={false}
                                                                        checked={this.state.currentScenario.puNode.sharePlanningUnit == false || this.state.currentScenario.puNode.sharePlanningUnit == "false"}
                                                                        onChange={(e) => {
                                                                            this.dataChange(e)
                                                                        }}
                                                                    />
                                                                    <Label
                                                                        className="form-check-label"
                                                                        check htmlFor="inline-radio2">
                                                                        {i18n.t('static.program.no')}
                                                                    </Label>
                                                                </FormGroup>
                                                                <FormFeedback className="red">{errors.sharePlanningUnit}</FormFeedback>
                                                            </FormGroup>
                                                            <FormGroup className="col-md-6"></FormGroup>
                                                            <FormGroup className="col-md-6">
                                                                <Label htmlFor="currencyId"># PU / {this.state.currentItemConfig.parentItem != null && this.state.currentItemConfig.parentItem.parent != null && this.state.unitList.filter(c => c.unitId == this.state.items.filter(x => x.id == this.state.currentItemConfig.parentItem.parent)[0].payload.nodeUnit.id).length > 0 && this.state.unitList.filter(c => c.unitId == this.state.items.filter(x => x.id == this.state.currentItemConfig.parentItem.parent)[0].payload.nodeUnit.id)[0].label.label_en}(s) (Calculated)</Label>
                                                                <Input type="text"
                                                                    id="puPerVisitQATCalculated"
                                                                    name="puPerVisitQATCalculated"
                                                                    readOnly={true}
                                                                    bsSize="sm"
                                                                    value={addCommasWith8Decimals(this.state.qatCalculatedPUPerVisit)}
                                                                // value={this.state.currentItemConfig.parentItem != null && this.state.parentScenario.fuNode != null ? (this.state.currentScenario.puNode.sharePlanningUnit == "false" || this.state.currentScenario.puNode.sharePlanningUnit == false || this.state.parentScenario.fuNode.usageType.id == 2) ? addCommas(this.state.currentScenario.puNode.puPerVisit) : addCommas(this.state.noOfMonthsInUsagePeriod / this.state.conversionFactor) : ""}
                                                                >
                                                                </Input>
                                                            </FormGroup>
                                                            <FormGroup className="col-md-6"></FormGroup>
                                                            {this.state.parentScenario.fuNode != null && (this.state.currentScenario.puNode.sharePlanningUnit == "false" || this.state.currentScenario.puNode.sharePlanningUnit == false || this.state.parentScenario.fuNode.usageType.id == 2) &&
                                                                <FormGroup className="col-md-6">
                                                                    <Label htmlFor="currencyId">{this.state.currentItemConfig.parentItem != null && this.state.parentScenario.fuNode != null && this.state.parentScenario.fuNode.usageType.id == 2 ? "# PU / Interval / " : "# PU / "}{this.state.currentItemConfig.parentItem != null && this.state.currentItemConfig.parentItem.parent != null && this.state.unitList.filter(c => c.unitId == this.state.items.filter(x => x.id == this.state.currentItemConfig.parentItem.parent)[0].payload.nodeUnit.id).length > 0 && this.state.unitList.filter(c => c.unitId == this.state.items.filter(x => x.id == this.state.currentItemConfig.parentItem.parent)[0].payload.nodeUnit.id)[0].label.label_en}(s)</Label>
                                                                    <Input type="text"
                                                                        id="puPerVisit"
                                                                        name="puPerVisit"
                                                                        readOnly={this.state.parentScenario.fuNode != null && (this.state.currentScenario.puNode.sharePlanningUnit == "false" || this.state.currentScenario.puNode.sharePlanningUnit == false || this.state.parentScenario.fuNode.usageType.id == 2) ? false : true}
                                                                        bsSize="sm"
                                                                        valid={!errors.puPerVisit && this.state.currentItemConfig.context.payload.nodeType.id == 5 ? this.state.currentScenario.puNode.puPerVisit != '' : !errors.puPerVisit}
                                                                        invalid={touched.puPerVisit && !!errors.puPerVisit}
                                                                        onBlur={handleBlur}
                                                                        onChange={(e) => {
                                                                            handleChange(e);
                                                                            this.dataChange(e)
                                                                        }}
                                                                        value={this.state.currentItemConfig.parentItem != null
                                                                            && this.state.parentScenario.fuNode != null ?
                                                                            (this.state.currentScenario.puNode.sharePlanningUnit == "false" || this.state.currentScenario.puNode.sharePlanningUnit == false || this.state.parentScenario.fuNode.usageType.id == 2) ?
                                                                                addCommasWith8Decimals(this.state.currentScenario.puNode.puPerVisit) : addCommasWith8Decimals(this.state.noFURequired / this.state.conversionFactor) : ""}
                                                                    // value={addCommas(this.state.parentScenario.fuNode.usageType.id == 2 ? (((this.state.parentScenario.fuNode.noOfForecastingUnitsPerPerson /
                                                                    //     this.state.noOfMonthsInUsagePeriod) / this.state.conversionFactor) * this.state.currentScenario.puNode.refillMonths) : (this.state.currentScenario.puNode.sharePlanningUnit == "true" || this.state.currentScenario.puNode.sharePlanningUnit == true ? (this.state.noOfMonthsInUsagePeriod / this.state.conversionFactor) : Math.round((this.state.noOfMonthsInUsagePeriod / this.state.conversionFactor))))}
                                                                    >

                                                                    </Input>
                                                                    <FormFeedback className="red">{errors.puPerVisit}</FormFeedback>
                                                                </FormGroup>}
                                                            {!(this.state.parentScenario.fuNode != null && (this.state.currentScenario.puNode.sharePlanningUnit == "false" || this.state.currentScenario.puNode.sharePlanningUnit == false || this.state.parentScenario.fuNode.usageType.id == 2)) &&
                                                                <Input type="hidden" id="puPerVisit" />
                                                            }

                                                        </>}
                                                </>}
                                        </div>
                                    </div>
                                    {/* Plannign unit end */}
                                    {/* {(this.state.currentItemConfig.context.payload.nodeType.id == 4) && */}
                                    <div>
                                        <div className="row">
                                            <div>
                                                <Popover placement="top" isOpen={this.state.popoverOpentracercategoryModelingType} target="Popover18" trigger="hover" toggle={this.toggletracercategoryModelingType}>
                                                    <PopoverBody>{i18n.t('static.tooltip.tracercategoryModelingType')}</PopoverBody>
                                                </Popover>
                                            </div>
                                            <FormGroup className="col-md-6" style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 4 ? 'block' : 'none' }}>
                                                <Label htmlFor="currencyId">{i18n.t('static.tracercategory.tracercategory')} <i class="fa fa-info-circle icons pl-lg-2" id="Popover18" onClick={this.toggletracercategoryModelingType} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                <Input
                                                    type="select"
                                                    id="tracerCategoryId"
                                                    name="tracerCategoryId"
                                                    bsSize="sm"
                                                    // valid={!errors.tracerCategoryId && this.state.currentItemConfig.context.payload.nodeType.id == 4 ? this.state.currentScenario.fuNode.forecastingUnit.tracerCategory.id != '' : !errors.tracerCategoryId}
                                                    // invalid={touched.tracerCategoryId && !!errors.tracerCategoryId}
                                                    onBlur={handleBlur}
                                                    onChange={(e) => {
                                                        this.dataChange(e); this.getForecastingUnitListByTracerCategoryId(0, 0)
                                                    }}
                                                    required
                                                    value={this.state.currentItemConfig.context.payload.nodeType.id == 4 ? this.state.currentScenario.fuNode.forecastingUnit.tracerCategory.id : ""}
                                                >
                                                    <option value="">{i18n.t('static.common.all')}</option>
                                                    {this.state.tracerCategoryList.length > 0
                                                        && this.state.tracerCategoryList.map((item, i) => {
                                                            return (
                                                                <option key={i} value={item.tracerCategoryId}>
                                                                    {getLabelText(item.label, this.state.lang)}
                                                                </option>
                                                            )
                                                        }, this)}
                                                </Input>
                                                <FormFeedback className="red">{errors.tracerCategoryId}</FormFeedback>
                                            </FormGroup>
                                            <div>
                                                <Popover placement="top" isOpen={this.state.popoverOpenCopyFromTemplate} target="Popover19" trigger="hover" toggle={this.toggleCopyFromTemplate}>
                                                    <PopoverBody>{i18n.t('static.tooltip.CopyFromTemplate')}</PopoverBody>
                                                </Popover>
                                            </div>
                                            <FormGroup className="col-md-6" style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 4 ? 'block' : 'none' }}>
                                                <Label htmlFor="currencyId">{i18n.t('static.tree.copyFromTemplate')} <i class="fa fa-info-circle icons pl-lg-2" id="Popover19" onClick={this.toggleCopyFromTemplate} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                <Input
                                                    type="select"
                                                    name="usageTemplateId"
                                                    id="usageTemplateId"
                                                    bsSize="sm"
                                                    // valid={!errors.usageTemplateId && this.state.usageTemplateId != ''}
                                                    // invalid={touched.usageTemplateId && !!errors.usageTemplateId}
                                                    onBlur={handleBlur}
                                                    onChange={(e) => { this.dataChange(e); this.copyDataFromUsageTemplate(e) }}
                                                    required
                                                    value={this.state.usageTemplateId}
                                                >
                                                    <option value="">{i18n.t('static.common.selecttemplate')}</option>
                                                    {this.state.usageTemplateList.length > 0
                                                        && this.state.usageTemplateList.map((item, i) => {
                                                            return (
                                                                <option key={i} value={item.usageTemplateId}>
                                                                    {getLabelText(item.label, this.state.lang)}
                                                                </option>
                                                            )
                                                        }, this)}
                                                </Input>
                                                {/* <FormFeedback className="red">{errors.usageTemplateId}</FormFeedback> */}
                                            </FormGroup>
                                            <Input
                                                type="hidden"
                                                name="showFUValidation"
                                                id="showFUValidation"
                                                value={this.state.showFUValidation}
                                            />
                                            <Input
                                                type="hidden"
                                                name="needFUValidation"
                                                id="needFUValidation"
                                                value={(this.state.currentItemConfig.context.payload.nodeType.id != 4 ? false : true)}
                                            />
                                            <FormGroup className="col-md-12" style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 4 ? 'block' : 'none' }}>
                                                <Label htmlFor="currencyId">{i18n.t('static.product.unit1')}<span class="red Reqasterisk">*</span></Label>
                                                <div className="controls ">
                                                    {/* <InMultiputGroup> */}
                                                    <Select
                                                        // className={classNames('form-control', 'd-block', 'w-100', 'bg-light',
                                                        //     { 'is-valid': !errors.forecastingUnitId },
                                                        //     { 'is-invalid': (touched.forecastingUnitId && !!errors.forecastingUnitId) }
                                                        // )}
                                                        className={classNames('form-control', 'd-block', 'w-100', 'bg-light',
                                                            { 'is-valid': !errors.forecastingUnitId && this.state.fuValues != '' },
                                                            { 'is-invalid': (touched.forecastingUnitId && !!errors.forecastingUnitId && (this.state.currentItemConfig.context.payload.nodeType.id != 4 ? false : true) || !!errors.forecastingUnitId) }
                                                        )}
                                                        id="forecastingUnitId"
                                                        name="forecastingUnitId"
                                                        bsSize="sm"
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            setFieldValue("forecastingUnitId", e);
                                                            this.handleFUChange(e);
                                                        }}
                                                        onBlur={() => setFieldTouched("forecastingUnitId", true)}
                                                        // multi
                                                        options={this.state.forecastingUnitMultiList}
                                                        value={this.state.fuValues}
                                                    />
                                                    <FormFeedback>{errors.forecastingUnitId}</FormFeedback>
                                                </div><br />
                                            </FormGroup>
                                            <Input type="hidden"
                                                id="planningUnitIdFUFlag"
                                                name="planningUnitIdFUFlag"
                                                value={this.state.addNodeFlag}
                                            />
                                            <FormGroup className="col-md-12" style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 4 && this.state.addNodeFlag == true ? 'block' : 'none' }}>
                                                <Label htmlFor="currencyId">{i18n.t('static.product.product')}<span class="red Reqasterisk">*</span></Label>
                                                <div className="controls ">
                                                    {/* <InMultiputGroup> */}
                                                    <Input type="select"
                                                        id="planningUnitIdFU"
                                                        name="planningUnitIdFU"
                                                        bsSize="sm"
                                                        valid={!errors.planningUnitIdFU && this.state.tempPlanningUnitId != ""}
                                                        invalid={touched.planningUnitIdFU && !!errors.planningUnitIdFU}
                                                        onBlur={handleBlur}
                                                        onChange={(e) => { handleChange(e); this.dataChange(e) }}
                                                        value={this.state.tempPlanningUnitId}
                                                    >

                                                        <option value="">{i18n.t('static.common.select')}</option>
                                                        {this.state.planningUnitList.length > 0
                                                            && this.state.planningUnitList.map((item, i) => {
                                                                return (
                                                                    <option key={i} value={item.id}>
                                                                        {getLabelText(item.label, this.state.lang) + " | " + item.id}
                                                                    </option>
                                                                )
                                                            }, this)}
                                                    </Input>
                                                    <FormFeedback>{errors.planningUnitIdFU}</FormFeedback>
                                                </div><br />
                                            </FormGroup>
                                            <div>
                                                <Popover placement="top" isOpen={this.state.popoverOpenTypeOfUse} target="Popover21" trigger="hover" toggle={this.toggleTypeOfUse}>
                                                    <PopoverBody>{i18n.t('static.tooltip.TypeOfUse')}</PopoverBody>
                                                </Popover>
                                            </div>
                                            <FormGroup className="col-md-6" style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 4 ? 'block' : 'none' }}>
                                                <Label htmlFor="currencyId">{i18n.t('static.common.typeofuse')}<span class="red Reqasterisk">*</span> <i class="fa fa-info-circle icons pl-lg-2" id="Popover21" onClick={this.toggleTypeOfUse} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                <Input
                                                    type="select"
                                                    id="usageTypeIdFU"
                                                    name="usageTypeIdFU"
                                                    bsSize="sm"
                                                    valid={!errors.usageTypeIdFU && this.state.currentItemConfig.context.payload.nodeType.id == 4 ? this.state.currentScenario.fuNode.usageType.id != '' : !errors.usageTypeIdFU}
                                                    invalid={touched.usageTypeIdFU && !!errors.usageTypeIdFU}
                                                    onBlur={handleBlur}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        this.dataChange(e)
                                                    }}
                                                    required
                                                    value={this.state.currentItemConfig.context.payload.nodeType.id == 4 ? this.state.currentScenario.fuNode.usageType.id : ""}
                                                >
                                                    <option value="">{i18n.t('static.common.select')}</option>
                                                    {this.state.usageTypeList.length > 0
                                                        && this.state.usageTypeList.map((item, i) => {
                                                            return (
                                                                <option key={i} value={item.id}>
                                                                    {getLabelText(item.label, this.state.lang)}
                                                                </option>
                                                            )
                                                        }, this)}
                                                </Input>
                                                <FormFeedback className="red">{errors.usageTypeIdFU}</FormFeedback>
                                            </FormGroup>
                                            <div>
                                                <Popover placement="top" isOpen={this.state.popoverOpenLagInMonth} target="Popover22" trigger="hover" toggle={this.toggleLagInMonth}>
                                                    <PopoverBody>{i18n.t('static.tooltip.LagInMonthFUNode')}</PopoverBody>
                                                </Popover>
                                            </div>
                                            <FormGroup className="col-md-6" style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 4 ? 'block' : 'none' }}>
                                                <Label htmlFor="currencyId">{i18n.t('static.tree.lagInMonth0Immediate')}<span class="red Reqasterisk">*</span>  <i class="fa fa-info-circle icons pl-lg-2" id="Popover22" onClick={this.toggleLagInMonth} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                <Input type="number"
                                                    id="lagInMonths"
                                                    name="lagInMonths"
                                                    bsSize="sm"
                                                    valid={!errors.lagInMonths && this.state.currentItemConfig.context.payload.nodeType.id == 4 ? this.state.currentScenario.fuNode.lagInMonths != '' : !errors.lagInMonths}
                                                    invalid={touched.lagInMonths && !!errors.lagInMonths}
                                                    onBlur={handleBlur}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        this.dataChange(e)
                                                    }}
                                                    value={this.state.currentItemConfig.context.payload.nodeType.id == 4 ? this.state.currentScenario.fuNode.lagInMonths : ""}
                                                ></Input>
                                                <FormFeedback className="red">{errors.lagInMonths}</FormFeedback>
                                            </FormGroup>
                                        </div>
                                        <div className="row">

                                            <FormGroup className="col-md-2" style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 4 ? 'block' : 'none' }}>
                                                <Label htmlFor="currencyId">{i18n.t('static.usageTemplate.every')}<span class="red Reqasterisk">*</span></Label>

                                            </FormGroup>
                                            <FormGroup className="col-md-5" style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 4 ? 'block' : 'none' }} >
                                                <Input type="text"
                                                    id="noOfPersons"
                                                    name="noOfPersons"
                                                    bsSize="sm"
                                                    valid={!errors.noOfPersons && this.state.currentItemConfig.context.payload.nodeType.id == 4 ? this.state.currentScenario.fuNode.noOfPersons != '' : !errors.noOfPersons}
                                                    invalid={touched.noOfPersons && !!errors.noOfPersons}
                                                    onBlur={handleBlur}
                                                    readOnly={this.state.currentItemConfig.context.payload.nodeType.id == 4 && this.state.currentScenario.fuNode.usageType.id == 2 ? true : false}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        this.dataChange(e)
                                                    }}
                                                    value={addCommas(this.state.currentItemConfig.context.payload.nodeType.id == 4 ? this.state.currentScenario.fuNode.noOfPersons : "")}>

                                                </Input>
                                                <FormFeedback className="red">{errors.noOfPersons}</FormFeedback>
                                            </FormGroup>
                                            <FormGroup className="col-md-5" style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 4 ? 'block' : 'none' }}>
                                                <Input type="select"
                                                    id="usageTypeParent"
                                                    name="usageTypeParent"
                                                    bsSize="sm"
                                                    disabled={true}
                                                    value={this.state.usageTypeParent}>

                                                    <option value=""></option>
                                                    {this.state.nodeUnitListPlural.length > 0
                                                        && this.state.nodeUnitListPlural.map((item, i) => {
                                                            return (
                                                                <option key={i} value={item.unitId}>
                                                                    {getLabelText(item.label, this.state.lang)}
                                                                </option>
                                                            )
                                                        }, this)}
                                                </Input>
                                            </FormGroup>
                                            <FormGroup className="col-md-2" style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 4 ? 'block' : 'none' }}>
                                                <Label htmlFor="currencyId">{i18n.t('static.tree.requires')}<span class="red Reqasterisk">*</span></Label>
                                            </FormGroup>
                                            <FormGroup className="col-md-5" style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 4 ? 'block' : 'none' }}>
                                                <Input type="text"
                                                    id="forecastingUnitPerPersonsFC"
                                                    name="forecastingUnitPerPersonsFC"
                                                    bsSize="sm"
                                                    valid={!errors.forecastingUnitPerPersonsFC && this.state.currentItemConfig.context.payload.nodeType.id == 4 ? this.state.currentScenario.fuNode.noOfForecastingUnitsPerPerson != '' : !errors.forecastingUnitPerPersonsFC}
                                                    invalid={touched.forecastingUnitPerPersonsFC && !!errors.forecastingUnitPerPersonsFC}
                                                    onBlur={handleBlur}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        this.dataChange(e)
                                                    }}
                                                    value={addCommas(this.state.currentItemConfig.context.payload.nodeType.id == 4 ? this.state.currentScenario.fuNode.noOfForecastingUnitsPerPerson : "")}>

                                                </Input>
                                                <FormFeedback className="red">{errors.forecastingUnitPerPersonsFC}</FormFeedback>
                                            </FormGroup>
                                            <FormGroup className="col-md-5" style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 4 ? 'block' : 'none' }}>
                                                <Input type="select"
                                                    id="forecastingUnitUnit"
                                                    name="forecastingUnitUnit"
                                                    bsSize="sm"
                                                    disabled="true"
                                                    onChange={(e) => { this.dataChange(e) }}
                                                    value={this.state.currentItemConfig.context.payload.nodeType.id == 4 ? this.state.currentScenario.fuNode.forecastingUnit.unit.id : ""}>

                                                    <option value=""></option>
                                                    {this.state.unitList.length > 0
                                                        && this.state.unitList.map((item, i) => {
                                                            return (
                                                                <option key={i} value={item.unitId}>
                                                                    {getLabelText(item.label, this.state.lang)}
                                                                </option>
                                                            )
                                                        }, this)}
                                                </Input>
                                            </FormGroup>
                                            {/* {(this.state.currentItemConfig.context.payload.nodeDataMap != "" && this.state.currentScenario.fuNode.usageType.id == 1) && */}
                                            <>
                                                <div>
                                                    <Popover placement="top" isOpen={this.state.popoverOpenSingleUse} target="Popover23" trigger="hover" toggle={this.toggleSingleUse}>
                                                        <PopoverBody>{i18n.t('static.tooltip.SingleUse')}</PopoverBody>
                                                    </Popover>
                                                </div>
                                                <FormGroup className="col-md-2" style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 4 && this.state.currentItemConfig.context.payload.nodeDataMap != "" && this.state.currentScenario.fuNode.usageType.id == 1 ? 'block' : 'none' }}>
                                                    <Label htmlFor="currencyId">{i18n.t('static.tree.singleUse')}<span class="red Reqasterisk">*</span>  <i class="fa fa-info-circle icons pl-lg-2" id="Popover23" onClick={this.toggleSingleUse} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                </FormGroup>
                                                <FormGroup className="col-md-10" style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 4 && this.state.currentItemConfig.context.payload.nodeDataMap != "" && this.state.currentScenario.fuNode.usageType.id == 1 ? 'block' : 'none' }}>
                                                    <Input type="select"
                                                        id="oneTimeUsage"
                                                        name="oneTimeUsage"
                                                        bsSize="sm"
                                                        valid={!errors.oneTimeUsage && this.state.currentItemConfig.context.payload.nodeType.id == 4 && this.state.currentItemConfig.context.payload.nodeDataMap != "" && this.state.currentScenario.fuNode.usageType.id == 1 ? this.state.currentScenario.fuNode.oneTimeUsage != '' : !errors.oneTimeUsage}
                                                        invalid={touched.oneTimeUsage && !!errors.oneTimeUsage}
                                                        onBlur={handleBlur}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            this.dataChange(e)
                                                        }}
                                                        value={this.state.currentItemConfig.context.payload.nodeType.id == 4 && this.state.currentItemConfig.context.payload.nodeDataMap != "" && this.state.currentScenario.fuNode.usageType.id == 1 ? this.state.currentScenario.fuNode.oneTimeUsage : ""}>

                                                        <option value="">{i18n.t('static.common.select')}</option>
                                                        <option value="true">{i18n.t('static.realm.yes')}</option>
                                                        <option value="false">{i18n.t('static.program.no')}</option>

                                                    </Input>
                                                    <FormFeedback className="red">{errors.oneTimeUsage}</FormFeedback>
                                                </FormGroup>
                                                {/* <FormGroup className="col-md-5"></FormGroup> */}
                                                {/* {this.state.currentScenario.fuNode.oneTimeUsage != "true" && */}
                                                <>
                                                    <FormGroup className="col-md-2" style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 4 && this.state.currentItemConfig.context.payload.nodeDataMap != "" && this.state.currentScenario.fuNode.usageType.id == 1 && this.state.currentScenario.fuNode.oneTimeUsage != "true" && this.state.currentScenario.fuNode.oneTimeUsage != true ? 'block' : 'none' }}></FormGroup>
                                                    <FormGroup className="col-md-4" style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 4 && this.state.currentItemConfig.context.payload.nodeDataMap != "" && this.state.currentScenario.fuNode.usageType.id == 1 && this.state.currentScenario.fuNode.oneTimeUsage != "true" && this.state.currentScenario.fuNode.oneTimeUsage != true ? 'block' : 'none' }}>
                                                        <Input type="text"
                                                            id="usageFrequencyDis"
                                                            name="usageFrequencyDis"
                                                            bsSize="sm"
                                                            valid={!errors.usageFrequencyDis && (this.state.currentItemConfig.context.payload.nodeType.id == 4 ? this.state.currentScenario.fuNode.usageFrequency != "" : false)}
                                                            invalid={touched.usageFrequencyDis && !!errors.usageFrequencyDis}
                                                            onBlur={handleBlur}
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                                this.dataChange(e)
                                                            }}
                                                            value={this.state.currentItemConfig.context.payload.nodeType.id == 4 && this.state.currentItemConfig.context.payload.nodeDataMap != "" && this.state.currentScenario.fuNode.usageType.id == 1 && this.state.currentScenario.fuNode.oneTimeUsage != "true" ? addCommas(this.state.currentScenario.fuNode.usageFrequency) : ""}></Input>
                                                        <FormFeedback className="red">{errors.usageFrequencyDis}</FormFeedback>
                                                    </FormGroup>
                                                    <FormGroup className="col-md-2" style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 4 && this.state.currentItemConfig.context.payload.nodeDataMap != "" && this.state.currentScenario.fuNode.usageType.id == 1 && this.state.currentScenario.fuNode.oneTimeUsage != "true" && this.state.currentScenario.fuNode.oneTimeUsage != true ? 'block' : 'none' }}>
                                                        <Input type="text"
                                                            name="timesPer"
                                                            bsSize="sm"
                                                            readOnly={true}
                                                            value={i18n.t('static.tree.timesPer')}></Input>
                                                    </FormGroup>
                                                    <FormGroup className="col-md-4" style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 4 && this.state.currentItemConfig.context.payload.nodeDataMap != "" && this.state.currentScenario.fuNode.usageType.id == 1 && this.state.currentScenario.fuNode.oneTimeUsage != "true" && this.state.currentScenario.fuNode.oneTimeUsage != true ? 'block' : 'none' }}>
                                                        <Input
                                                            type="select"
                                                            id="usagePeriodIdDis"
                                                            name="usagePeriodIdDis"
                                                            bsSize="sm"
                                                            valid={!errors.usagePeriodIdDis && (this.state.currentItemConfig.context.payload.nodeType.id == 4 ? this.state.currentScenario.fuNode.usagePeriod != null && this.state.currentScenario.fuNode.usagePeriod.usagePeriodId != "" : false)}
                                                            invalid={touched.usagePeriodIdDis && !!errors.usagePeriodIdDis}
                                                            onBlur={handleBlur}
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                                this.dataChange(e)
                                                            }}
                                                            required
                                                            value={this.state.currentItemConfig.context.payload.nodeType.id == 4 && this.state.currentItemConfig.context.payload.nodeDataMap != "" && this.state.currentScenario.fuNode.usageType.id == 1 && this.state.currentScenario.fuNode.oneTimeUsage != "true" ? this.state.currentScenario.fuNode.usagePeriod != null && this.state.currentScenario.fuNode.usagePeriod != null ? this.state.currentScenario.fuNode.usagePeriod.usagePeriodId : "" : ""}
                                                        >
                                                            <option value="">{i18n.t('static.common.select')}</option>
                                                            {this.state.usagePeriodList.length > 0
                                                                && this.state.usagePeriodList.map((item, i) => {
                                                                    return (
                                                                        <option key={i} value={item.usagePeriodId}>
                                                                            {getLabelText(item.label, this.state.lang)}
                                                                        </option>
                                                                    )
                                                                }, this)}
                                                        </Input>
                                                        <FormFeedback className="red">{errors.usagePeriodIdDis}</FormFeedback>
                                                    </FormGroup>
                                                    <FormGroup className="col-md-2" style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 4 && this.state.currentItemConfig.context.payload.nodeDataMap != "" && this.state.currentScenario.fuNode.usageType.id == 1 && this.state.currentScenario.fuNode.oneTimeUsage != "true" && this.state.currentScenario.fuNode.oneTimeUsage != true ? 'block' : 'none' }}>
                                                        <Label htmlFor="currencyId">for<span class="red Reqasterisk">*</span></Label>
                                                    </FormGroup>
                                                    <FormGroup className="col-md-5" style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 4 && this.state.currentItemConfig.context.payload.nodeDataMap != "" && this.state.currentScenario.fuNode.usageType.id == 1 && this.state.currentScenario.fuNode.oneTimeUsage != "true" && this.state.currentScenario.fuNode.oneTimeUsage != true ? 'block' : 'none' }}>
                                                        <Input type="text"
                                                            id="repeatCount"
                                                            name="repeatCount"
                                                            bsSize="sm"
                                                            valid={!errors.repeatCount && this.state.currentItemConfig.context.payload.nodeType.id == 4 && this.state.currentItemConfig.context.payload.nodeDataMap != "" && this.state.currentScenario.fuNode.usageType.id == 1 && this.state.currentScenario.fuNode.oneTimeUsage != "true" ? this.state.currentScenario.fuNode.repeatCount != '' : !errors.repeatCount}
                                                            invalid={touched.repeatCount && !!errors.repeatCount}
                                                            onBlur={handleBlur}
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                                this.dataChange(e)
                                                            }}
                                                            value={addCommas(this.state.currentItemConfig.context.payload.nodeType.id == 4 && this.state.currentItemConfig.context.payload.nodeDataMap != "" && this.state.currentScenario.fuNode.usageType.id == 1 && this.state.currentScenario.fuNode.oneTimeUsage != "true" ? this.state.currentScenario.fuNode.repeatCount : "")}>
                                                        </Input>
                                                        <FormFeedback className="red">{errors.repeatCount}</FormFeedback>
                                                    </FormGroup>
                                                    <FormGroup className="col-md-5" style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 4 && this.state.currentItemConfig.context.payload.nodeDataMap != "" && this.state.currentScenario.fuNode.usageType.id == 1 && this.state.currentScenario.fuNode.oneTimeUsage != "true" && this.state.currentScenario.fuNode.oneTimeUsage != true ? 'block' : 'none' }}>
                                                        <Input type="select"
                                                            id="repeatUsagePeriodId"
                                                            name="repeatUsagePeriodId"
                                                            bsSize="sm"
                                                            valid={!errors.repeatUsagePeriodId && this.state.currentItemConfig.context.payload.nodeType.id == 4 && this.state.currentItemConfig.context.payload.nodeDataMap != "" && this.state.currentScenario.fuNode.usageType.id == 1 && (this.state.currentScenario.fuNode.oneTimeUsage == "false" || this.state.currentScenario.fuNode.oneTimeUsage == false) ? (this.state.currentScenario.fuNode.repeatUsagePeriod != '' && this.state.currentScenario.fuNode.repeatUsagePeriod != null && this.state.currentScenario.fuNode.repeatUsagePeriod.usagePeriodId != undefined && this.state.currentScenario.fuNode.repeatUsagePeriod.usagePeriodId != null && this.state.currentScenario.fuNode.repeatUsagePeriod.usagePeriodId != '') : !errors.repeatUsagePeriodId}
                                                            invalid={touched.repeatUsagePeriodId && !!errors.repeatUsagePeriodId}
                                                            onBlur={handleBlur}
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                                this.dataChange(e)
                                                            }}
                                                            value={this.state.currentItemConfig.context.payload.nodeType.id == 4 && this.state.currentItemConfig.context.payload.nodeDataMap != "" && this.state.currentScenario.fuNode.usageType.id == 1 && this.state.currentScenario.fuNode.oneTimeUsage != "true" && this.state.currentScenario.fuNode.repeatUsagePeriod != null ? this.state.currentScenario.fuNode.repeatUsagePeriod.usagePeriodId : ''}>

                                                            <option value="">{i18n.t('static.common.select')}</option>
                                                            {this.state.usagePeriodList.length > 0
                                                                && this.state.usagePeriodList.map((item, i) => {
                                                                    return (
                                                                        <option key={i} value={item.usagePeriodId}>
                                                                            {getLabelText(item.label, this.state.lang)}
                                                                        </option>
                                                                    )
                                                                }, this)}
                                                        </Input>
                                                        <FormFeedback className="red">{errors.repeatUsagePeriodId}</FormFeedback>
                                                    </FormGroup></>

                                                {/* // } */}
                                            </>
                                            {/* // } */}



                                            {/* {(this.state.currentItemConfig.context.payload.nodeDataMap != "" && this.state.currentScenario.fuNode.usageType.id == 2) && */}
                                            <>

                                                <FormGroup className="col-md-2" style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 4 && this.state.currentItemConfig.context.payload.nodeDataMap != "" && this.state.currentScenario.fuNode.usageType.id == 2 ? 'block' : 'none' }}>
                                                    <Label htmlFor="currencyId">{i18n.t('static.usageTemplate.every')}<span class="red Reqasterisk">*</span></Label>
                                                </FormGroup>
                                                <FormGroup className="col-md-5" style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 4 && this.state.currentItemConfig.context.payload.nodeDataMap != "" && this.state.currentScenario.fuNode.usageType.id == 2 ? 'block' : 'none' }}>
                                                    <Input type="text"
                                                        id="usageFrequencyCon"
                                                        name="usageFrequencyCon"
                                                        bsSize="sm"
                                                        valid={!errors.usageFrequencyCon && (this.state.currentItemConfig.context.payload.nodeType.id == 4 ? this.state.currentScenario.fuNode.usageFrequency != "" : false)}
                                                        invalid={touched.usageFrequencyCon && !!errors.usageFrequencyCon}
                                                        onBlur={handleBlur}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            this.dataChange(e)
                                                        }}
                                                        value={this.state.currentItemConfig.context.payload.nodeType.id == 4 && this.state.currentItemConfig.context.payload.nodeDataMap != "" && this.state.currentScenario.fuNode.usageType.id == 2 ? addCommas(this.state.currentScenario.fuNode.usageFrequency) : ""}></Input>
                                                    <FormFeedback className="red">{errors.usageFrequencyCon}</FormFeedback>
                                                </FormGroup>
                                                <FormGroup className="col-md-5" style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 4 && this.state.currentItemConfig.context.payload.nodeDataMap != "" && this.state.currentScenario.fuNode.usageType.id == 2 ? 'block' : 'none' }}>
                                                    <Input
                                                        type="select"
                                                        id="usagePeriodIdCon"
                                                        name="usagePeriodIdCon"
                                                        bsSize="sm"
                                                        valid={!errors.usagePeriodIdCon && (this.state.currentItemConfig.context.payload.nodeType.id == 4 ? this.state.currentScenario.fuNode.usagePeriod != null && this.state.currentScenario.fuNode.usagePeriod.usagePeriodId != "" : false)}
                                                        invalid={touched.usagePeriodIdCon && !!errors.usagePeriodIdCon}
                                                        onBlur={handleBlur}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            this.dataChange(e)
                                                        }}
                                                        required
                                                        value={this.state.currentItemConfig.context.payload.nodeType.id == 4 && this.state.currentItemConfig.context.payload.nodeDataMap != "" && this.state.currentScenario.fuNode.usageType.id == 2 ? this.state.currentScenario.fuNode.usagePeriod != null ? this.state.currentScenario.fuNode.usagePeriod.usagePeriodId : "" : ""}>
                                                        <option value="">{i18n.t('static.common.select')}</option>
                                                        {this.state.usagePeriodList.length > 0
                                                            && this.state.usagePeriodList.map((item, i) => {
                                                                return (
                                                                    <option key={i} value={item.usagePeriodId}>
                                                                        {getLabelText(item.label, this.state.lang)}
                                                                    </option>
                                                                )
                                                            }, this)}
                                                    </Input>
                                                    <FormFeedback className="red">{errors.usagePeriodIdCon}</FormFeedback>
                                                </FormGroup>
                                            </>

                                            <div className="pl-lg-3 pr-lg-3" style={{ clear: 'both', width: '100%' }}>
                                                {(this.state.currentItemConfig.context.payload.nodeType.id == 4 && this.state.currentItemConfig.context.payload.nodeDataMap != "" && this.state.currentScenario.fuNode.usageType.id == 2) &&
                                                    <table className="table table-bordered">
                                                        <tr>
                                                            <td style={{ width: '50%' }}>{i18n.t('static.tree.#OfFURequiredForPeriod')}</td>
                                                            <td style={{ width: '50%' }}>{addCommas(this.state.currentScenario.fuNode.noOfForecastingUnitsPerPerson)}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ width: '50%' }}>{i18n.t('static.tree.#OfMonthsInPeriod')}</td>
                                                            <td style={{ width: '50%' }}>{addCommas(this.state.noOfMonthsInUsagePeriod)}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ width: '50%' }}>{i18n.t('static.tree.#OfFU/month/')} {this.state.nodeUnitList.filter(c => c.unitId == this.state.usageTypeParent)[0].label.label_en}</td>
                                                            {this.state.currentScenario.fuNode.usagePeriod != null && this.state.currentScenario.fuNode.usagePeriod.usagePeriodId != "" &&
                                                                <td style={{ width: '50%' }}>{addCommas((this.state.currentScenario.fuNode.noOfForecastingUnitsPerPerson / this.state.currentScenario.fuNode.usageFrequency) * (this.state.usagePeriodList.filter(c => c.usagePeriodId == this.state.currentScenario.fuNode.usagePeriod.usagePeriodId))[0].convertToMonth)}</td>}
                                                            {this.state.currentScenario.fuNode.usagePeriod != null && this.state.currentScenario.fuNode.usagePeriod.usagePeriodId == "" &&
                                                                <td style={{ width: '50%' }}></td>
                                                            }
                                                        </tr>
                                                    </table>}
                                                {(this.state.currentItemConfig.context.payload.nodeType.id == 4 && this.state.currentItemConfig.context.payload.nodeDataMap != "" && this.state.currentScenario.fuNode.usageType.id == 1) &&
                                                    <table className="table table-bordered">
                                                        <tr>
                                                            <td style={{ width: '50%' }}>{i18n.t('static.tree.#OfFU/')} {this.state.nodeUnitList.filter(c => c.unitId == this.state.usageTypeParent)[0].label.label_en}{"/ Time"}</td>
                                                            <td style={{ width: '50%' }}>{addCommas(this.state.noOfFUPatient)}</td>
                                                        </tr>
                                                        {/* <tr>
                                                            <td style={{ width: '50%' }}>{i18n.t('static.tree.#OfFU/month/')} {this.state.nodeUnitList.filter(c => c.unitId == this.state.usageTypeParent)[0].label.label_en}</td>
                                                            <td style={{ width: '50%' }}>{addCommas(this.state.noOfMonthsInUsagePeriod)}</td>
                                                        </tr> */}
                                                        <tr>
                                                            <td style={{ width: '50%' }}>{i18n.t('static.tree.#OfFURequiredForPeriodPerPatient') + " " + this.state.nodeUnitList.filter(c => c.unitId == this.state.usageTypeParent)[0].label.label_en}</td>
                                                            <td style={{ width: '50%' }}>{addCommas(this.state.noFURequired)}</td>
                                                        </tr>
                                                    </table>}
                                            </div>

                                        </div>
                                    </div>

                                    {/* } */}
                                    {(this.state.currentItemConfig.context.payload.nodeType.id == 4 || this.state.currentItemConfig.context.payload.nodeType.id == 5) &&
                                        <div className="col-md-12 pt-2 pl-2 pb-lg-3"><b>{this.state.usageText}</b></div>
                                    }
                                    {/* disabled={!isValid} */}
                                    <FormGroup className="pb-lg-3">
                                        {/* <Button size="md" color="danger" className="submitBtn float-right mr-1" onClick={() => this.setState({ openAddNodeModal: false, cursorItem: 0, highlightItem: 0 })}> <i className="fa fa-times"></i> {i18n.t('static.common.cancel')}</Button> */}
                                        <Button size="md" color="danger" className="submitBtn float-right mr-1" onClick={() => {
                                            if (this.state.isChanged == true || this.state.isTreeDataChanged == true || this.state.isScenarioChanged == true) {
                                                var cf = window.confirm(i18n.t("static.dataentry.confirmmsg"));
                                                if (cf == true) {
                                                    this.setState({
                                                        openAddNodeModal: false, cursorItem: 0, isChanged: false,
                                                        highlightItem: 0, activeTab1: new Array(3).fill('1')
                                                    })
                                                } else {

                                                }
                                            } else {
                                                this.setState({
                                                    openAddNodeModal: false, cursorItem: 0, isChanged: false,
                                                    highlightItem: 0, activeTab1: new Array(3).fill('1')
                                                })
                                            }
                                        }}> <i className="fa fa-times"></i> {i18n.t('static.common.cancel')}</Button>
                                        {(AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_EDIT_TREE') && this.props.match.params.isLocal != 2) && <><Button type="button" size="md" color="warning" className="float-right mr-1" onClick={() => { this.resetNodeData(); this.nodeTypeChange(this.state.currentItemConfig.context.payload.nodeType.id) }} ><i className="fa fa-refresh"></i> {i18n.t('static.common.reset')}</Button>
                                            <Button type="submit" color="success" className="mr-1 float-right" size="md" onClick={() => this.touchAllNodeData(setTouched, errors)} ><i className="fa fa-check"></i>{i18n.t('static.common.update')}</Button></>}
                                    </FormGroup>
                                </Form>
                            )} />
                </TabPane>
                <TabPane tabId="2">
                    {/* <Formik
                        enableReinitialize={true}
                        // initialValues={initialValuesNodeData}
                        // validateOnChange={true}
                        initialValues={{
                            nodeTitle: this.state.currentItemConfig.context.payload.label.label_en,
                            nodeTypeId: this.state.currentItemConfig.context.payload.nodeType.id,
                            nodeUnitId: this.state.currentItemConfig.context.payload.nodeUnit.id,
                            forecastingUnitId: this.state.fuValues,
                            // showFUValidation : true
                            // percentageOfParent: (this.state.currentItemConfig.context.payload.nodeDataMap[1])[0].dataValue
                        }}
                        validate={validateNodeData(validationSchemaNodeData)}
                        onSubmit={(values, { setSubmitting, setErrors }) => {
                            // console.log("all ok>>>", this.state.currentItemConfig);
                            this.setState({ loading: true, openAddNodeModal: false }, () => {
                                setTimeout(() => {
                                    // console.log("inside set timeout on submit")
                                    if (this.state.addNodeFlag) {
                                        this.onAddButtonClick(this.state.currentItemConfig)
                                    } else {
                                        this.updateNodeInfoInJson(this.state.currentItemConfig)
                                    }
                                    this.setState({
                                        cursorItem: 0,
                                        highlightItem: 0
                                    })
                                }, 0);
                            })


                        }}
                        render={
                            ({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                                isValid,
                                setTouched,
                                handleReset,
                                setFieldValue,
                                setFieldTouched
                            }) => (
                                <Form className="needs-validation" onSubmit={handleSubmit} onReset={handleReset} noValidate name='nodeDataForm' autocomplete="off"> */}
                    <div className="row pt-lg-0" style={{ float: 'right', marginTop: '-42px' }}>
                        <div className="row pl-lg-0 pr-lg-3">
                            {/* <SupplyPlanFormulas ref="formulaeChild" /> */}
                            <a className="">
                                <span style={{ cursor: 'pointer', color: '20a8d8' }} onClick={() => { this.toggleShowGuidanceModelingTransfer() }}><small className="supplyplanformulas">{i18n.t('static.common.showGuidance')}</small></span>

                            </a>
                        </div>
                    </div>
                    <div className="row pl-lg-2 pr-lg-2">
                        <div style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 1 ? "none" : "block" }}>
                            <div className="row pl-lg-2 pr-lg-2">
                                <div>
                                    <Popover placement="top" isOpen={this.state.popoverOpenMonth} target="Popover24" trigger="hover" toggle={this.toggleMonth}>
                                        <PopoverBody>{i18n.t('static.tooltip.ModelingTransferMonth')}</PopoverBody>
                                    </Popover>
                                </div>
                                {/* <div className='row'> */}
                                <FormGroup className="col-md-2 pt-lg-1">
                                    <Label htmlFor="">{i18n.t('static.common.month')}<span class="red Reqasterisk">*</span> <i class="fa fa-info-circle icons pl-lg-2" id="Popover24" onClick={this.toggleMonth} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                </FormGroup>
                                <FormGroup className="col-md-8 pl-lg-0 ModTransferMonthPickerWidth">
                                    <Picker
                                        ref={this.pickAMonth2}
                                        years={{ min: this.state.minDate, max: this.state.maxDate }}
                                        value={this.state.scalingMonth}
                                        key={JSON.stringify(this.state.scalingMonth)}
                                        lang={pickerLang.months}
                                        onChange={this.handleAMonthChange2}
                                        onDismiss={this.handleAMonthDissmis2}
                                    >
                                        <MonthBox value={this.makeText(this.state.scalingMonth)}
                                            onClick={this.handleClickMonthBox2} />
                                    </Picker>
                                </FormGroup>
                                {/* </div> */}
                            </div>
                        </div>
                        <div className="col-md-12">
                            {this.state.showModelingJexcelNumber &&
                                <div style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 1 ? "none" : "block" }}>
                                    <span>{i18n.t('static.modelingTable.note')}</span>
                                    <div className="calculatorimg calculatorTable consumptionDataEntryTable">
                                        <div id="modelingJexcel" className={"RowClickable ScalingTable"} style={{ display: this.state.modelingJexcelLoader ? "none" : "block" }}>
                                        </div>
                                        <div style={{ display: this.state.modelingJexcelLoader ? "block" : "none" }}>
                                            <div className="d-flex align-items-center justify-content-center" style={{ height: "500px" }} >
                                                <div class="align-items-center">
                                                    <div ><h4> <strong>{i18n.t('static.common.loading')}</strong></h4></div>

                                                    <div class="spinner-border blue ml-4" role="status">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ 'float': 'right', 'fontSize': '18px' }}><b>{i18n.t('static.supplyPlan.total')}: {this.state.scalingTotal !== "" && addCommas(parseFloat(this.state.scalingTotal).toFixed(4))}</b></div><br /><br />

                                </div>
                            }
                            <div>{this.state.currentItemConfig.context.payload.nodeType.id != 1 && <Button color="info" size="md" className="float-right mr-1" type="button" onClick={() => this.showMomData()}><i className={this.state.viewMonthlyData ? "fa fa-eye" : "fa fa-eye-slash"} style={{ color: '#fff' }}></i> {this.state.viewMonthlyData ? i18n.t('static.tree.viewMonthlyData') : i18n.t('static.tree.hideMonthlyData')}</Button>}
                                {this.state.aggregationNode && AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_EDIT_TREE') && this.props.match.params.isLocal != 2 && <><Button color="success" size="md" className="float-right mr-1" type="button" onClick={(e) => this.formSubmitLoader(e)}> <i className="fa fa-check"></i>{i18n.t('static.common.update')}</Button>
                                    <Button color="info" size="md" className="float-right mr-1" type="button" onClick={() => this.addRow()}> <i className="fa fa-plus"></i> {i18n.t('static.common.addRow')}</Button></>}
                            </div>
                        </div>
                        {this.state.showCalculatorFields &&
                            <div className="col-md-12 pl-lg-0 pr-lg-0 pt-lg-3">
                                <fieldset style={{ width: '100%' }} className="scheduler-border">
                                    <legend className="scheduler-border">{i18n.t('static.tree.modelingCalculaterTool')}</legend>
                                    <div className="row">
                                        <FormGroup className="col-md-6" >
                                            <div className="check inline  pl-lg-1 pt-lg-2">
                                                {this.state.currentItemConfig.context.payload.nodeType.id == 2 && <div className="col-md-12 form-group">
                                                    <Label htmlFor="select">{i18n.t('static.modelingType.modelingType')}</Label>
                                                    <Input
                                                        // valid={!errors.modelingType}
                                                        // invalid={touched.modelingType && !!errors.modelingType}
                                                        onChange={(e) => { this.dataChange(e); }}
                                                        bsSize="sm"
                                                        className="col-md-6"
                                                        // onBlur={handleBlur}
                                                        type="select" name="modelingType" id="modelingType">
                                                        {this.state.currentItemConfig.context.payload.nodeType.id == 2 && <option value="active1" selected={this.state.currentModelingType == 4 ? true : false}>{"Exponential (%)"}</option>}
                                                        {this.state.currentItemConfig.context.payload.nodeType.id == 2 && <option value="active2" selected={(this.state.currentItemConfig.context.payload.nodeType.id > 2 || this.state.currentModelingType == 3) ? true : false}>{'Linear (%)'}</option>}
                                                        {this.state.currentItemConfig.context.payload.nodeType.id == 2 && <option value="active3" selected={this.state.currentModelingType == 2 ? true : false}>{'Linear (#)'}</option>}
                                                        {this.state.currentItemConfig.context.payload.nodeType.id > 2 && <option value="active4" selected={this.state.currentModelingType == 5 ? true : false}>{'Linear (% point)'}</option>}
                                                    </Input>
                                                    {/* <FormFeedback className="red">{errors.modelingType}</FormFeedback> */}

                                                </div>}
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="col-md-6" >
                                            <div className="check inline  pl-lg-1 pt-lg-2">
                                                {this.state.currentItemConfig.context.payload.nodeType.id == 2 && <div className="col-md-12 form-group">
                                                    <Label htmlFor="select">Target</Label>

                                                    <Input
                                                        onChange={(e) => { this.dataChange(e); }}
                                                        bsSize="sm"
                                                        className="col-md-6"
                                                        disabled={(this.state.currentModelingType == 2 || this.state.currentModelingType == 3 || this.state.currentModelingType == 4) ? false : this.state.targetSelectDisable}
                                                        type="select" name="targetSelect" id="targetSelect">
                                                        <option value="target1" selected={this.state.targetSelect == 1 ? true : false}>{'Annual Target'}</option>
                                                        <option value="target2" selected={this.state.targetSelect == 0 ? true : false}>{'Ending Value Target / Change'}</option>
                                                    </Input>
                                                </div>}
                                            </div>
                                        </FormGroup>
                                    </div>
                                    <div style={{ display: this.state.targetSelect == 1 ? 'block' : 'none' }}>
                                        <div className="row">
                                            <FormGroup className="col-md-12">
                                                <Label htmlFor="currencyId">{i18n.t('static.tree.annualTargetLabel')}</Label>
                                            </FormGroup>
                                            <div>
                                                <Popover placement="top" isOpen={this.state.popoverOpenFirstMonthOfTarget} target="Popover29" trigger="hover" toggle={this.toggleFirstMonthOfTarget}>
                                                    <PopoverBody>{i18n.t('static.tooltip.FirstMonthOfTarget')}</PopoverBody>
                                                </Popover>
                                            </div>
                                            <FormGroup className="col-md-6">
                                                <Label htmlFor="currencyId">{i18n.t('static.tree.firstMonthOfTarget')}<span class="red Reqasterisk">*</span> <i class="fa fa-info-circle icons pl-lg-2" id="Popover29" onClick={this.toggleFirstMonthOfTarget} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                <Picker
                                                    ref={this.pickAMonth4}
                                                    years={{ min: this.state.minDateValue, max: this.state.maxDate }}
                                                    value={{ year: new Date(this.state.currentCalculatorStartDate.replace(/-/g, '\/')).getFullYear(), month: ("0" + (new Date(this.state.currentCalculatorStartDate.replace(/-/g, '\/')).getMonth() + 1)).slice(-2) }}
                                                    lang={pickerLang.months}
                                                    onChange={this.handleAMonthChange4}
                                                    // onDismiss={this.handleAMonthDissmis4}
                                                    id="firstMonthOfTarget"
                                                    name="firstMonthOfTarget"

                                                >
                                                    <MonthBox value={this.makeText({ year: new Date(this.state.currentCalculatorStartDate.replace(/-/g, '\/')).getFullYear(), month: ("0" + (new Date(this.state.currentCalculatorStartDate.replace(/-/g, '\/')).getMonth() + 1)).slice(-2) })} onClick={this.handleClickMonthBox4} />
                                                </Picker>
                                            </FormGroup>
                                            <div>
                                                <Popover placement="top" isOpen={this.state.popoverOpenYearsOfTarget} target="Popover28" trigger="hover" toggle={this.toggleYearsOfTarget}>
                                                    <PopoverBody>{i18n.t('static.tooltip.yearsOfTarget')}</PopoverBody>
                                                </Popover>
                                            </div>
                                            <FormGroup className="col-md-6">
                                                <Label htmlFor="currencyId">{i18n.t('static.tree.targetYears')}<span class="red Reqasterisk">*</span> <i class="fa fa-info-circle icons pl-lg-2" id="Popover28" onClick={this.toggleYearsOfTarget} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                <Input type="select"
                                                    id="targetYears"
                                                    name="targetYears"
                                                    bsSize="sm"
                                                    required
                                                    onChange={(e) => { this.dataChange(e) }}
                                                    value={this.state.yearsOfTarget}>
                                                    <option key={3} value={3}>3</option>
                                                    <option key={4} value={4}>4</option>
                                                    <option key={5} value={5}>5</option>
                                                    <option key={6} value={6}>6</option>
                                                    <option key={7} value={7}>7</option>
                                                    <option key={8} value={8}>8</option>
                                                    <option key={9} value={9}>9</option>
                                                    <option key={10} value={10}>10</option>
                                                </Input>
                                            </FormGroup>
                                            <FormGroup className="col-md-12 pl-lg-0 pr-lg-0">
                                                <div className="calculatorimg calculatorTable consumptionDataEntryTable">
                                                    <div id="modelingCalculatorJexcel" className={"RowClickable ScalingTable TableWidth100"} >
                                                    </div>
                                                </div>
                                                <Button type="button" size="md" color="danger" className="float-right mr-1" onClick={() => {
                                                    this.setState({
                                                        showCalculatorFields: false
                                                    });
                                                }}><i className="fa fa-times"></i> {i18n.t('static.common.close')}</Button>
                                                {this.state.isCalculateClicked != 2 && <Button type="button" size="md" color="warning" className="float-right mr-1" onClick={() => this.resetModelingCalculatorData()} ><i className="fa fa-refresh"></i> {i18n.t('static.common.reset')}</Button>}
                                                {this.state.isCalculateClicked == 2 && <Button type="button" size="md" color="success" className="float-right mr-1" onClick={this.acceptValue}><i className="fa fa-check"></i> {i18n.t('static.common.accept')}</Button>}
                                                {this.state.isCalculateClicked == 1 && <Button type="button" size="md" color="success" className="float-right mr-1" onClick={() => { this.changed3(2); }}><i className="fa fa-check"></i> {i18n.t('static.qpl.calculate')}</Button>}
                                            </FormGroup>
                                        </div>
                                    </div>
                                    <div className='col-md-12' style={{ display: this.state.targetSelect != 1 ? 'block' : 'none' }}>
                                        <div className="row">
                                            <FormGroup className="col-md-6">
                                                <Label htmlFor="currencyId">{i18n.t('static.common.startdate')}<span class="red Reqasterisk">*</span></Label>
                                                <Picker
                                                    ref={this.pickAMonth6}
                                                    years={{ min: this.state.minDate, max: this.state.maxDate }}
                                                    value={{ year: new Date(this.state.currentCalculatorStartDate.replace(/-/g, '\/')).getFullYear(), month: ("0" + (new Date(this.state.currentCalculatorStartDate.replace(/-/g, '\/')).getMonth() + 1)).slice(-2) }}
                                                    lang={pickerLang.months}
                                                    onChange={this.handleAMonthChange5}
                                                // onDismiss={this.handleAMonthDissmis5}
                                                >
                                                    <MonthBox value={this.makeText({ year: new Date(this.state.currentCalculatorStartDate.replace(/-/g, '\/')).getFullYear(), month: ("0" + (new Date(this.state.currentCalculatorStartDate.replace(/-/g, '\/')).getMonth() + 1)).slice(-2) })} onClick={this.handleClickMonthBox5} />
                                                </Picker>
                                            </FormGroup>
                                            <FormGroup className="col-md-6">
                                                <Label htmlFor="currencyId">{i18n.t('static.tree.targetDate')}<span class="red Reqasterisk">*</span></Label>
                                                <Picker
                                                    ref={this.pickAMonth5}
                                                    years={{ min: this.state.minDate, max: this.state.maxDate }}
                                                    value={{ year: new Date(this.state.currentCalculatorStopDate.replace(/-/g, '\/')).getFullYear(), month: ("0" + (new Date(this.state.currentCalculatorStopDate.replace(/-/g, '\/')).getMonth() + 1)).slice(-2) }}
                                                    lang={pickerLang.months}
                                                    onChange={this.handleAMonthChange5}
                                                    onDismiss={this.handleAMonthDissmis5}
                                                >
                                                    <MonthBox value={this.makeText({ year: new Date(this.state.currentCalculatorStopDate.replace(/-/g, '\/')).getFullYear(), month: ("0" + (new Date(this.state.currentCalculatorStopDate.replace(/-/g, '\/')).getMonth() + 1)).slice(-2) })} onClick={this.handleClickMonthBox5} />
                                                </Picker>
                                            </FormGroup>
                                            {this.state.currentItemConfig.context.payload.nodeType.id <= 2 &&
                                                <>
                                                    <div>
                                                        <Popover placement="top" isOpen={this.state.popoverOpenStartValueModelingTool} target="Popover53" trigger="hover" toggle={this.toggleStartValueModelingTool}>
                                                            <PopoverBody>{i18n.t('static.tooltip.StartValueModelingTool')}</PopoverBody>
                                                        </Popover>
                                                    </div>
                                                    <FormGroup className="col-md-6">
                                                        <Label htmlFor="currencyId">{i18n.t('static.tree.startValue')}<span class="red Reqasterisk">*</span> <i class="fa fa-info-circle icons pl-lg-2" id="Popover53" onClick={this.toggleStartValueModelingTool} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                        <Input type="text"
                                                            id="startValue"
                                                            name="startValue"
                                                            bsSize="sm"
                                                            readOnly={true}
                                                            value={addCommas(this.state.currentCalculatorStartValue)}

                                                        >
                                                        </Input>
                                                        {/* <FormFeedback className="red">{errors.nodeTitle}</FormFeedback> */}
                                                    </FormGroup>
                                                </>
                                            }
                                            {this.state.currentItemConfig.context.payload.nodeType.id > 2 && <FormGroup className="col-md-6">
                                                <Label htmlFor="currencyId">{i18n.t('static.tree.StartPercentage')}<span class="red Reqasterisk">*</span></Label>
                                                <Input type="text"
                                                    id="startPercentage"
                                                    name="startPercentage"
                                                    bsSize="sm"
                                                    readOnly={true}
                                                    value={this.state.currentCalculatorStartValue}

                                                >
                                                </Input>
                                                {/* <FormFeedback className="red">{errors.nodeTitle}</FormFeedback> */}
                                            </FormGroup>
                                            }
                                            <div>
                                                <Popover placement="top" isOpen={this.state.popoverOpenTargetEndingValue} target="Popover25" trigger="hover" toggle={this.toggleTargetEndingValue}>
                                                    <PopoverBody>{i18n.t('static.tooltip.TargetEndingValue')}</PopoverBody>
                                                </Popover>
                                            </div>
                                            <FormGroup className="col-md-5">
                                                <Label htmlFor="currencyId">{i18n.t('static.tree.targetEnding')} {this.state.currentItemConfig.context.payload.nodeType.id == 2 ? 'value' : '%'}<span class="red Reqasterisk">*</span> <i class="fa fa-info-circle icons pl-lg-2" id="Popover25" onClick={this.toggleTargetEndingValue} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                <Input type="text"
                                                    id="currentEndValue"
                                                    name="currentEndValue"
                                                    bsSize="sm"
                                                    onChange={(e) => { this.dataChange(e); this.calculateMomByEndValue(e) }}
                                                    value={addCommas(this.state.currentEndValue)}
                                                    readOnly={this.state.currentEndValueEdit}
                                                >
                                                </Input>

                                                {/* <FormFeedback className="red">{errors.nodeTitle}</FormFeedback> */}
                                            </FormGroup>
                                            <FormGroup className="col-md-1 mt-lg-4">
                                                <Label htmlFor="currencyId">{i18n.t('static.tree.or')}</Label>
                                            </FormGroup>
                                            <div>
                                                <Popover placement="top" isOpen={this.state.popoverOpenTargetChangePercent} target="Popover26" trigger="hover" toggle={this.toggleTargetChangePercent}>
                                                    <PopoverBody>{i18n.t('static.tooltip.TargetChangePercent')}</PopoverBody>
                                                </Popover>
                                            </div>
                                            <input type="hidden" id="percentForOneMonth" name="percentForOneMonth" value={this.state.percentForOneMonth} />
                                            <FormGroup className="col-md-5">
                                                <Label htmlFor="currencyId">
                                                    {this.state.currentItemConfig.context.payload.nodeType.id > 2 ? 'Change (% points)' : 'Target change (%)'}
                                                    <span class="red Reqasterisk">*</span> <i class="fa fa-info-circle icons pl-lg-2" id="Popover26" onClick={this.toggleTargetChangePercent} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                <Input type="text"
                                                    id="currentTargetChangePercentage"
                                                    name="currentTargetChangePercentage"
                                                    bsSize="sm"
                                                    onChange={(e) => { this.dataChange(e); this.calculateMomByChangeInPercent(e) }}
                                                    value={addCommas(this.state.currentTargetChangePercentage)}
                                                    readOnly={this.state.currentTargetChangePercentageEdit}

                                                >
                                                </Input>
                                                {/* <FormFeedback className="red">{errors.nodeTitle}</FormFeedback> */}
                                            </FormGroup>
                                            {this.state.currentModelingType != 3 && this.state.currentModelingType != 4 && this.state.currentModelingType != 5 && <FormGroup className="col-md-1 mt-lg-4">
                                                <Label htmlFor="currencyId">or</Label>
                                            </FormGroup>
                                            }
                                            {/* {this.state.currentItemConfig.context.payload.nodeType.id != 3  */}
                                            {this.state.currentModelingType != 3 && this.state.currentModelingType != 4 && this.state.currentModelingType != 5 && <FormGroup className="col-md-6">
                                                <Label htmlFor="currencyId">{i18n.t('static.tree.Change(#)')}<span class="red Reqasterisk">*</span></Label>
                                                <Input type="text"
                                                    id="currentTargetChangeNumber"
                                                    name="currentTargetChangeNumber"
                                                    bsSize="sm"
                                                    onChange={(e) => { this.dataChange(e); this.calculateMomByChangeInNumber(e) }}
                                                    value={addCommas(this.state.currentTargetChangeNumber)}
                                                    readOnly={this.state.currentTargetChangeNumberEdit}
                                                >
                                                </Input>
                                                {/* <FormFeedback className="red">{errors.nodeTitle}</FormFeedback> */}
                                            </FormGroup>
                                            }
                                        </div>
                                        <div className="row col-md-12 pl-lg-0">
                                            <div>
                                                <Popover placement="top" isOpen={this.state.popoverOpenCalculatedMonthOnMonthChnage} target="Popover27" trigger="hover" toggle={this.toggleCalculatedMonthOnMonthChnage}>
                                                    <PopoverBody>{i18n.t('static.tooltip.CalculatedMonthOnMonthChnage')}</PopoverBody>
                                                </Popover>
                                            </div>
                                            <FormGroup className="col-md-6">
                                                <Label htmlFor="currencyId">{i18n.t('static.tree.CalculatedMonth-on-MonthChange')}<span class="red Reqasterisk">*</span> <i class="fa fa-info-circle icons pl-lg-2" id="Popover27" onClick={this.toggleCalculatedMonthOnMonthChnage} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></Label>
                                                <Input type="text"
                                                    id="calculatedMomChange"
                                                    name="calculatedMomChange"
                                                    bsSize="sm"
                                                    readOnly={true}
                                                    value={addCommas(this.state.currentCalculatedMomChange)}>
                                                </Input>
                                                {/* <FormFeedback className="red">{errors.nodeTitle}</FormFeedback> */}
                                            </FormGroup>
                                            {/* <FormGroup className="col-md-6" >
                                                    <div className="check inline  pl-lg-1 pt-lg-2">
                                                        {this.state.currentItemConfig.context.payload.nodeType.id == 2 && <div className="col-md-12 form-group">
                                                            <Input
                                                                className="form-check-input checkboxMargin"
                                                                type="radio"
                                                                id="active1"
                                                                name="modelingType"
                                                                checked={this.state.currentModelingType == 4 ? true : false}
                                                                onChange={(e) => { this.dataChange(e) }}
                                                            // onClick={(e) => { this.filterPlanningUnitNode(e); }}
                                                            />
                                                            <Label
                                                                className="form-check-label"
                                                                check htmlFor="inline-radio2" style={{ fontSize: '12px' }}>
                                                                <b>{'Exponential (%)'}</b>
                                                            </Label>
                                                        </div>}
                                                        {this.state.currentItemConfig.context.payload.nodeType.id == 2 && <div className="col-md-12 form-group">
                                                            <Input
                                                                className="form-check-input Radioactive checkboxMargin"
                                                                type="radio"
                                                                id="active2"
                                                                name="modelingType"
                                                                checked={(this.state.currentItemConfig.context.payload.nodeType.id > 2 || this.state.currentModelingType == 3) ? true : false}
                                                                onChange={(e) => { this.dataChange(e) }}
                                                            // onClick={(e) => { this.filterPlanningUnitAndForecastingUnitNodes(e) }}
                                                            />
                                                            <Label
                                                                className="form-check-label"
                                                                check htmlFor="inline-radio2" style={{ fontSize: '12px' }}>
                                                                <b>{'Linear (%)'}</b>
                                                            </Label>
                                                        </div>
                                                        }
                                                        {this.state.currentItemConfig.context.payload.nodeType.id == 2 && <div className="col-md-12 form-group">
                                                            <Input
                                                                className="form-check-input checkboxMargin"
                                                                type="radio"
                                                                id="active3"
                                                                name="modelingType"
                                                                checked={this.state.currentModelingType == 2 ? true : false}
                                                                onChange={(e) => { this.dataChange(e) }}
                                                            // onClick={(e) => { this.filterPlanningUnitAndForecastingUnitNodes(e) }}
                                                            />
                                                            <Label
                                                                className="form-check-label"
                                                                check htmlFor="inline-radio2" style={{ fontSize: '12px' }}>
                                                                <b>{'Linear (#)'}</b>
                                                            </Label>
                                                        </div>}
                                                        {this.state.currentItemConfig.context.payload.nodeType.id > 2 && <div className="col-md-12 form-group">
                                                            <Input
                                                                className="form-check-input checkboxMargin"
                                                                type="radio"
                                                                id="active4"
                                                                name="modelingType"
                                                                checked={this.state.currentModelingType == 5 ? true : false}
                                                                onChange={(e) => { this.dataChange(e) }}
                                                            // onClick={(e) => { this.filterPlanningUnitAndForecastingUnitNodes(e) }}
                                                            />
                                                            <Label
                                                                className="form-check-label"
                                                                check htmlFor="inline-radio2" style={{ fontSize: '12px' }}>
                                                                <b>{'Linear (% point)'}</b>
                                                            </Label>
                                                        </div>}
                                                    </div>
                                                </FormGroup>
                                                <FormGroup className="col-md-6">
                                                </FormGroup> */}
                                        </div>
                                        <FormGroup className="col-md-12">
                                            <Button type="button" size="md" color="danger" className="float-right mr-1" onClick={() => {
                                                this.setState({
                                                    showCalculatorFields: false
                                                });
                                            }}><i className="fa fa-times"></i> {i18n.t('static.common.close')}</Button>
                                            <Button type="button" size="md" color="success" className="float-right mr-1" onClick={this.acceptValue1}><i className="fa fa-check"></i> {i18n.t('static.common.accept')}</Button>

                                        </FormGroup>
                                    </div>
                                    {/* </div> */}
                                </fieldset>
                            </div>
                        }

                    </div >
                    {
                        this.state.showMomData &&
                        <div className="row pl-lg-2 pr-lg-2">
                            <fieldset style={{ width: '100%' }} className="scheduler-border">
                                <legend className="scheduler-border">{i18n.t('static.tree.monthlyData')}:</legend>
                                {/* <div className="row pl-lg-2 pr-lg-2"> */}
                                <div className="col-md-12 pl-lg-0 pr-lg-0 pt-lg-3">
                                    <div className="col-md-6">
                                        {/* <Button type="button" size="md" color="info" className="float-left mr-1" onClick={this.resetTree}>{'Show/hide data'}</Button> */}
                                    </div>
                                    <div className="row pl-lg-0 pt-lg-3">
                                        <div className="col-md-12 chart-wrapper chart-graph-report pl-0 ml-0">
                                            <Bar id="cool-canvas" data={bar} options={chartOptions} />
                                            <div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 float-right">
                                    {/* <div className="col-md-12"> */}
                                    <FormGroup className="float-right" >
                                        <div className="check inline  pl-lg-1 pt-lg-0">

                                            <div style={{ display: this.state.aggregationNode ? 'block' : 'none' }}>
                                                <Input
                                                    className="form-check-input checkboxMargin"
                                                    type="checkbox"
                                                    id="manualChange"
                                                    name="manualChange"
                                                    // checked={true}
                                                    checked={this.state.currentScenario.manualChangesEffectFuture}
                                                    onClick={(e) => { this.momCheckbox(e, 1); }}
                                                />
                                                <Label
                                                    className="form-check-label"
                                                    check htmlFor="inline-radio2" style={{ fontSize: '12px' }}>
                                                    <b>{'Manual Change affects future month'}</b>
                                                </Label>
                                            </div>
                                            <div>
                                                <Input
                                                    className="form-check-input checkboxMargin"
                                                    type="checkbox"
                                                    id="seasonality"
                                                    name="seasonality"
                                                    // checked={true}
                                                    checked={this.state.seasonality}
                                                    onClick={(e) => { this.momCheckbox(e) }}
                                                />
                                                <Label
                                                    className="form-check-label"
                                                    check htmlFor="inline-radio2" style={{ fontSize: '12px' }}>
                                                    <b>{'Show Seasonality & manual change'}</b>
                                                </Label>
                                            </div>
                                        </div>
                                    </FormGroup>
                                    {/* </div> */}
                                </div>

                                {/* <div className='row'> */}
                                <div className="col-md-12 pl-lg-0 pr-lg-0 modelingTransferTable" style={{ display: 'inline-block' }}>
                                    <div id="momJexcel" className="RowClickable consumptionDataEntryTable" style={{ display: this.state.momJexcelLoader ? "none" : "block" }}>
                                    </div>
                                </div>
                                {/* </div> */}
                                <div style={{ display: this.state.momJexcelLoader ? "block" : "none" }}>
                                    <div className="d-flex align-items-center justify-content-center" style={{ height: "500px" }} >
                                        <div class="align-items-center">
                                            <div ><h4> <strong>{i18n.t('static.common.loading')}</strong></h4></div>

                                            <div class="spinner-border blue ml-4" role="status">

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12 pr-lg-0">
                                    <Button type="button" size="md" color="danger" className="float-right mr-1" onClick={() => {
                                        this.setState({ showMomData: false,isChanged: false,viewMonthlyData: true })
                                    }}><i className="fa fa-times"></i> {'Close'}</Button>
                                    {AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_EDIT_TREE') && this.props.match.params.isLocal != 2 && this.state.currentItemConfig.context.payload.nodeType.id != 1 &&
                                        <Button type="button" size="md" color="success" className="float-right mr-1" onClick={(e) => this.updateMomDataInDataSet(e)}><i className="fa fa-check"></i> {i18n.t('static.common.update')}</Button>}

                                </div>
                                {/* </div> */}


                            </fieldset>
                        </div>
                    }
                    {
                        this.state.showMomDataPercent &&
                        <div className="row pl-lg-2 pr-lg-2">
                            <fieldset style={{ width: '100%' }} className="scheduler-border">
                                <legend className="scheduler-border">{i18n.t('static.tree.monthlyData')}:</legend>
                                {/* <div className="row pl-lg-2 pr-lg-2"> */}
                                <div className="col-md-12 pl-lg-0 pr-lg-0 pt-lg-3">
                                    <div className="col-md-6">
                                        {/* <Button type="button" size="md" color="info" className="float-left mr-1" onClick={this.resetTree}>{'Show/hide data'}</Button> */}
                                    </div>
                                    <div className="row pl-lg-0 pt-lg-3">
                                        <div className="col-md-12 chart-wrapper chart-graph-report pl-0 ml-0">
                                            <Bar id="cool-canvas" data={bar1} options={chartOptions1} />
                                            <div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 float-right">
                                        <FormGroup className="float-right" >
                                            <div className="check inline  pl-lg-1 pt-lg-0">
                                                <div>
                                                    <Input
                                                        className="form-check-input checkboxMargin"
                                                        type="checkbox"
                                                        id="manualChange"
                                                        name="manualChange"
                                                        // checked={true}
                                                        checked={this.state.currentScenario.manualChangesEffectFuture}
                                                        onClick={(e) => { this.momCheckbox(e, 2); }}
                                                    />
                                                    <Label
                                                        className="form-check-label"
                                                        check htmlFor="inline-radio2" style={{ fontSize: '12px' }}>
                                                        <b>{'Manual Change affects future month'}</b>
                                                    </Label>
                                                </div>
                                            </div>
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="pt-lg-2 pl-lg-0"><i>{i18n.t('static.tree.tableDisplays')} <b>{
                                    this.state.currentItemConfig.context.payload.nodeType.id > 2 ?
                                        this.state.currentItemConfig.context.payload.nodeUnit.id != "" ?
                                            this.state.currentItemConfig.context.payload.nodeType.id == 4 ? this.state.currentScenario.fuNode.forecastingUnit.unit.id != "" ? getLabelText(this.state.unitList.filter(c => c.unitId == this.state.currentScenario.fuNode.forecastingUnit.unit.id)[0].label, this.state.lang) : ""
                                                : this.state.currentItemConfig.context.payload.nodeType.id == 5 ? this.state.currentScenario.puNode.planningUnit.unit.id != "" ? getLabelText(this.state.unitList.filter(c => c.unitId == this.state.currentScenario.puNode.planningUnit.unit.id)[0].label, this.state.lang) : ""
                                                    : getLabelText(this.state.nodeUnitList.filter(c => c.unitId == this.state.currentItemConfig.context.payload.nodeUnit.id)[0].label, this.state.lang)
                                            : ""
                                        : ""}</b> {i18n.t('static.tree.forNode')} <b>{this.state.currentItemConfig.context.payload.label != null ? getLabelText(this.state.currentItemConfig.context.payload.label, this.state.lang) : ''}</b> {i18n.t('static.tree.asA%OfParent')} <b>{this.state.currentItemConfig.parentItem.payload.label != null ? getLabelText(this.state.currentItemConfig.parentItem.payload.label, this.state.lang) : ''}</b></i></div>
                                {/* <div className="pt-lg-2 pl-lg-0"><i>Table displays <b>{getLabelText(this.state.currentItemConfig.context.payload.nodeUnit.label, this.state.lang)}</b></div> */}
                                <div className="col-md-12 pl-lg-0 pr-lg-0 consumptionDataEntryTable" style={{ display: 'inline-block' }}>
                                    <div id="momJexcelPer" className={"RowClickable perNodeData FiltermomjexcelPer"} style={{ display: this.state.momJexcelLoader ? "none" : "block" }}>
                                    </div>
                                </div>
                                <div style={{ display: this.state.momJexcelLoader ? "block" : "none" }}>
                                    <div className="d-flex align-items-center justify-content-center" style={{ height: "500px" }} >
                                        <div class="align-items-center">
                                            <div ><h4> <strong>{i18n.t('static.common.loading')}</strong></h4></div>

                                            <div class="spinner-border blue ml-4" role="status">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 pr-lg-0">
                                    <Button type="button" size="md" color="danger" className="float-right mr-1" onClick={() => {
                                        if (this.state.isChanged == true) {
                                            var cf = window.confirm(i18n.t("static.dataentry.confirmmsg"));
                                            if (cf == true) {
                                                this.setState({
                                                    isChanged: false,
                                                    viewMonthlyData: true,
                                                    showMomDataPercent: false
                                                })
                                            } else {

                                            }
                                        } else {
                                            this.setState({
                                                isChanged: false,
                                                viewMonthlyData: true,
                                                showMomDataPercent: false
                                            })
                                        }
                                    }}><i className="fa fa-times"></i> {'Close'}</Button>
                                    {AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_EDIT_TREE') && this.props.match.params.isLocal != 2 &&
                                        <Button type="button" size="md" color="success" className="float-right mr-1" onClick={(e) => this.updateMomDataInDataSet(e)}><i className="fa fa-check"></i> {i18n.t('static.common.update')}</Button>}

                                </div>
                                {/* </div> */}


                            </fieldset>
                        </div>
                    }
                    {/* <Button type="submit" color="success" className="mr-1 float-right" size="md" onClick={() => this.touchAllNodeData(setTouched, errors)}><i className="fa fa-check"></i>{i18n.t('static.common.update')}</Button> */}
                    {/* </Form> */}
                    {/* )} /> */}
                </TabPane >
                <TabPane tabId="3">
                    {/* <ConsumptionInSupplyPlanComponent ref="consumptionChild" items={this.state} toggleLarge={this.toggleLarge} updateState={this.updateState} formSubmit={this.formSubmit} hideSecondComponent={this.hideSecondComponent} hideFirstComponent={this.hideFirstComponent} hideThirdComponent={this.hideThirdComponent} consumptionPage="consumptionDataEntry" useLocalData={1} /> */}
                    {/* {this.state.currentItemConfig.context.payload.extrapolation && */}
                    <TreeExtrapolationComponent ref="extrapolationChild" items={this.state} updateState={this.updateState} />
                    {/* } */}
                </TabPane>

            </>
        );
    }
    makeText = m => {
        if (m && m.year && m.month) return (pickerLang.months[m.month - 1] + '. ' + m.year)
        return '?'
    }

    handleAMonthChange1 = (year, month) => {
        // console.log("value>>>", year);
        // console.log("text>>>", (this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0])
        var month = parseInt(month) < 10 ? "0" + month : month
        var date = year + "-" + month + "-" + "01"
        let { currentItemConfig } = this.state;
        var updatedMonth = date;
        var nodeDataMap = (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0];
        // console.log("nodeDataMap---", nodeDataMap)
        nodeDataMap.month = updatedMonth;
        (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0] = nodeDataMap;
        this.setState({ currentItemConfig, currentScenario: nodeDataMap }, () => {
            // console.log("after state update---", this.state.currentItemConfig);
        });
        //
        //
    }

    handleAMonthDissmis1 = (value) => {
        // console.log("dismiss>>", value);
        let month = value.year + '-' + value.month + '-01';
        // this.setState({ singleValue2: value, }, () => {
        // this.fetchData();
        // })
        this.calculateParentValueFromMOM(month);

    }

    handleClickMonthBox1 = (e) => {
        this.pickAMonth1.current.show()
    }

    handleClickMonthBox2 = (e) => {
        this.pickAMonth2.current.show()
    }
    handleAMonthChange2 = (year, month) => {

        //
        //
    }
    handleAMonthDissmis2 = (value) => {
        // console.log("Value@@@@@@@@###################", value);
        let startDate = value.year + '-' + value.month + '-01';
        if (!this.state.modelingChanged) {
            this.filterScalingDataByMonth(moment(startDate).format("YYYY-MM-DD"));
        }
        // let { currentItemConfig } = this.state;
        // (currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario])[0].month = date;
        if (this.state.modelingEl != "") {
            // console.log("this.state.modelingEl---", event.target.value)
            this.state.modelingEl.setHeader(9, i18n.t('static.tree.calculatedChangeForMonthTree') + " " + moment(startDate).format('MMM.YYYY'));
        }
        this.setState({ scalingMonth: value }, () => {
            // console.log("after state update---", this.state.currentItemConfig);
        });
        // console.log("dismiss>>", value);
        // this.setState({ singleValue2: value, }, () => {
        // this.fetchData();
        // })

    }


    handleAMonthChange3 = (year, month) => {
        // console.log("text>>>", year, " and ", month)
        // alert("hi");
    }

    handleAMonthDissmis3 = (value, type) => {
        // console.log("value--->", value);
        // console.log("type--->>>", type);
        var date = value.year + "-" + value.month + "-" + "01"
        // console.log("dismiss>>", value);
        // console.log("forecastStartDate>>", this.state.forecastStartDate);
        // console.log("forecastStopDate>>", moment(date).isBetween(this.state.forecastStartDate, this.state.forecastStopDate));
        this.updateTreeData(date);
        if (moment(date).format("YYYY-MM") >= moment(this.state.forecastStartDate).format("YYYY-MM") && moment(date).format("YYYY-MM") <= moment(this.state.forecastStopDate).format("YYYY-MM")) {
            this.setState({ singleValue2: value, }, () => {


            })
        } else {
            if (type == 1) {
                alert("Please select date within forecast range");
            }
        }
    }

    handleClickMonthBox3 = (e) => {
        this.pickAMonth3.current.show()
    }

    handleClickMonthBox4 = (e) => {
        this.pickAMonth4.current.show()
    }
    handleAMonthChange4 = (year, month) => {
        console.log("value>>>", year);
        console.log("value>>>", month)
        var date = year + "-" + month + "-01";
        var currentCalculatorStartValue = this.getMomValueForDateRange(date);
        // console.log("currentCalculatorStartValue---", currentCalculatorStartValue);
        // console.log("month change currentEndValueEdit---", this.state.currentEndValueEdit);
        // console.log("month change currentTargetChangePercentageEdit---", this.state.currentTargetChangePercentageEdit);
        // console.log("month change currentTargetChangeNumberEdit---", this.state.currentTargetChangeNumberEdit);
        this.setState({
            currentCalculatorStartDate: date, currentCalculatorStartValue,
            firstMonthOfTarget: date,
            // yearsOfTarget: "",
            actualOrTargetValueList: [],
            isCalculateClicked: 1
        }, () => {
            this.buildModelingCalculatorJexcel();

            if (!this.state.currentEndValueEdit && !this.state.currentTargetChangePercentageEdit && !this.state.currentTargetChangeNumberEdit) {
                // console.log("Inside if modeling calculator");
            } else {
                // console.log("Inside else modeling calculator");
                if (!this.state.currentEndValueEdit) {
                    this.calculateMomByEndValue();
                } else if (!this.state.currentTargetChangePercentageEdit) {
                    this.calculateMomByChangeInPercent();
                } else if (!this.state.currentTargetChangeNumberEdit) {
                    this.calculateMomByChangeInNumber();
                }
            }
        });

    }
    handleAMonthChange5 = (year, month) => {
        // console.log("value>>>", year);
        // console.log("text>>>", month)
        var date = year + "-" + month + "-01";
        var currentCalculatorStartValue = this.getMomValueForDateRange(date);
        console.log("currentCalculatorStartValue---", currentCalculatorStartValue);
        console.log("month change currentEndValueEdit---", this.state.currentEndValueEdit);
        console.log("month change currentTargetChangePercentageEdit---", this.state.currentTargetChangePercentageEdit);
        console.log("month change currentTargetChangeNumberEdit---", this.state.currentTargetChangeNumberEdit);

        this.setState({ currentCalculatorStartDate: date, currentCalculatorStartValue }, () => {
            if (!this.state.currentEndValueEdit && !this.state.currentTargetChangePercentageEdit && !this.state.currentTargetChangeNumberEdit) {
                // console.log("Inside if modeling calculator");
            } else {
                // console.log("Inside else modeling calculator");
                if (!this.state.currentEndValueEdit) {
                    this.calculateMomByEndValue();
                } else if (!this.state.currentTargetChangePercentageEdit) {
                    this.calculateMomByChangeInPercent();
                } else if (!this.state.currentTargetChangeNumberEdit) {
                    this.calculateMomByChangeInNumber();
                }
            }
        });

    }

    updateTreeData(date) {
        var items = this.state.items;
        // console.log("items>>>", items);
        for (let i = 0; i < items.length; i++) {
            // console.log("items[i]---", items[i]);
            if (items[i].payload.nodeDataMap[this.state.selectedScenario][0].nodeDataMomList != null) {
                // console.log("before filter mom---", items[i].payload.nodeDataMap[this.state.selectedScenario][0].nodeDataMomList);
                // console.log("before filter date---", moment(date).format('YYYY-MM'));
                var nodeDataModelingMap = items[i].payload.nodeDataMap[this.state.selectedScenario][0].nodeDataMomList.filter(x => moment(x.month).format('YYYY-MM') == moment(date).format('YYYY-MM'));
                // console.log("nodeDataModelingMap>>>", nodeDataModelingMap);
                if (nodeDataModelingMap.length > 0) {
                    // console.log("get payload 13");
                    if (nodeDataModelingMap[0].calculatedValue != null && nodeDataModelingMap[0].endValue != null) {
                        // console.log("nodeDataModelingMap[0]----", nodeDataModelingMap[0]);
                        if (items[i].payload.nodeType.id == 5) {
                            // console.log("my console---", nodeDataModelingMap[0]);
                            (items[i].payload.nodeDataMap[this.state.selectedScenario])[0].displayCalculatedDataValue = nodeDataModelingMap[0].calculatedMmdValue != null ? nodeDataModelingMap[0].calculatedMmdValue.toString() : '';
                        } else {
                            (items[i].payload.nodeDataMap[this.state.selectedScenario])[0].displayCalculatedDataValue = nodeDataModelingMap[0].calculatedValue.toString();
                        }
                        (items[i].payload.nodeDataMap[this.state.selectedScenario])[0].displayDataValue = nodeDataModelingMap[0].endValue.toString();
                    } else {
                        // console.log("get payload 14");
                        (items[i].payload.nodeDataMap[this.state.selectedScenario])[0].displayCalculatedDataValue = "0";
                        (items[i].payload.nodeDataMap[this.state.selectedScenario])[0].displayDataValue = "0";
                    }
                } else {
                    (items[i].payload.nodeDataMap[this.state.selectedScenario])[0].displayCalculatedDataValue = "0";
                    (items[i].payload.nodeDataMap[this.state.selectedScenario])[0].displayDataValue = "0";
                }
            } else {
                (items[i].payload.nodeDataMap[this.state.selectedScenario])[0].displayCalculatedDataValue = "0";
                (items[i].payload.nodeDataMap[this.state.selectedScenario])[0].displayDataValue = "0";
            }
            //
            if (items[i].payload.nodeType.id == 4) {
                var fuPerMonth, totalValue, usageFrequency, convertToMonth;
                var noOfForecastingUnitsPerPerson = (items[i].payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.noOfForecastingUnitsPerPerson;
                if ((items[i].payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.usageType.id == 2 || ((items[i].payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.oneTimeUsage != "true" && (items[i].payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.oneTimeUsage != true)) {
                    usageFrequency = (items[i].payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.usageFrequency;
                    var usagePeriodConvertToMonth = convertToMonth = (this.state.usagePeriodList.filter(c => c.usagePeriodId == (items[i].payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.usagePeriod.usagePeriodId));
                    convertToMonth = usagePeriodConvertToMonth.length > 0 ? usagePeriodConvertToMonth[0].convertToMonth : '';
                    // convertToMonth = (this.state.usagePeriodList.filter(c => c.usagePeriodId == (items[i].payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.usagePeriod.usagePeriodId))[0].convertToMonth;
                }
                if ((items[i].payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.usageType.id == 2) {
                    fuPerMonth = ((noOfForecastingUnitsPerPerson / usageFrequency) * convertToMonth);
                    totalValue = fuPerMonth * (items[i].payload.nodeDataMap[this.state.selectedScenario])[0].displayCalculatedDataValue;

                } else {
                    var noOfPersons = (items[i].payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.noOfPersons;
                    if ((items[i].payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.oneTimeUsage == "true" || (items[i].payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.oneTimeUsage == true) {
                        fuPerMonth = noOfForecastingUnitsPerPerson / noOfPersons;
                        totalValue = fuPerMonth * (items[i].payload.nodeDataMap[this.state.selectedScenario])[0].displayCalculatedDataValue;
                    } else {
                        fuPerMonth = ((noOfForecastingUnitsPerPerson / noOfPersons) * usageFrequency * convertToMonth);
                        totalValue = fuPerMonth * (items[i].payload.nodeDataMap[this.state.selectedScenario])[0].displayCalculatedDataValue;
                    }
                }
                // console.log("fuPerMonth without round---", fuPerMonth);
                // console.log("fuPerMonth with round---", Math.round(fuPerMonth));
                // (items[i].payload.nodeDataMap[this.state.selectedScenario])[0].displayCalculatedDataValue = Math.round(totalValue);
                (items[i].payload.nodeDataMap[this.state.selectedScenario])[0].fuPerMonth = fuPerMonth;
            }
            if (items[i].payload.nodeType.id == 5) {
                var findNodeIndexFU = items.findIndex(n => n.id == items[i].parent);
                var forecastingUnitId = (items[findNodeIndexFU].payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.forecastingUnit.id;
                var planningUnitId = (items[i].payload.nodeDataMap[this.state.selectedScenario])[0].puNode.planningUnit.id;
                var planningUnitList = [];
                if (this.state.programId != null && this.state.programId != "") {
                    planningUnitList = this.state.programDataListForPuCheck.filter(c => c.id == this.state.programId)[0].programData.planningUnitList;
                    var planningUnitListFilter = planningUnitList.filter(c => c.planningUnit.id == planningUnitId);
                    if (planningUnitListFilter.length > 0 && planningUnitListFilter[0].planningUnit.forecastingUnit.id == forecastingUnitId) {
                        (items[i].payload.nodeDataMap[this.state.selectedScenario])[0].isPUMappingCorrect = 1
                    } else {
                        (items[i].payload.nodeDataMap[this.state.selectedScenario])[0].isPUMappingCorrect = 0
                    }
                }
            }
            // else if (items[i].payload.nodeType.id == 5) {
            //     var item = items.filter(x => x.id == items[i].parent)[0];
            //     (items[i].payload.nodeDataMap[this.state.selectedScenario])[0].displayCalculatedDataValue = Math.round(((item.payload.nodeDataMap[this.state.selectedScenario])[0].displayCalculatedDataValue * (items[i].payload.nodeDataMap[this.state.selectedScenario])[0].dataValue) / 100);
            // }
        }
        this.setState({
            items
        }, () => {
            // console.log("final updated items---", this.state.items);
            // this.calculateValuesForAggregateNode(this.state.items);
        })
    }




    render() {
        jexcel.setDictionary({
            Show: " ",
            entries: " ",
        });

        const { datasetList } = this.state;
        const { items } = this.state;
        let datasets = datasetList.length > 0
            && datasetList.map((item, i) => {
                return (
                    <option key={i} value={item.id}>
                        {item.programCode + "~v" + item.version}
                    </option>
                )
            }, this);
        const Node = ({ itemConfig, isDragging, connectDragSource, canDrop, isOver, connectDropTarget }) => {
            const opacity = isDragging ? 0.4 : 1
            let itemTitleColor = Colors.RoyalBlue;
            if (isOver) {
                if (canDrop) {
                    itemTitleColor = "green";
                } else {
                    itemTitleColor = "#BA0C2F";
                }
            }

            return connectDropTarget(connectDragSource(
                // <div className="ContactTemplate" style={{ opacity, backgroundColor: Colors.White, borderColor: Colors.Black }}>
                (itemConfig.expanded ?
                    <div style={{ background: itemConfig.payload.nodeType.id == 5 || itemConfig.payload.nodeType.id == 4 ? "#002F6C" : "#a7c6ed", width: "8px", height: "8px", borderRadius: "8px" }}>
                    </div>
                    :
                    <div className={itemConfig.payload.nodeDataMap[this.state.selectedScenario] != undefined && itemConfig.payload.nodeDataMap[this.state.selectedScenario][0].isPUMappingCorrect == 0 ? "ContactTemplate boxContactTemplate contactTemplateBorderRed" : "ContactTemplate boxContactTemplate"} title={itemConfig.payload.nodeDataMap[this.state.selectedScenario] != undefined ? itemConfig.payload.nodeDataMap[this.state.selectedScenario][0].notes : ''}>
                        <div className={itemConfig.payload.nodeType.id == 5
                            || itemConfig.payload.nodeType.id == 4 ? (itemConfig.payload.label.label_en.length <= 20 ? "ContactTitleBackground TemplateTitleBgblueSingle" : "ContactTitleBackground TemplateTitleBgblue") :
                            (itemConfig.payload.label.label_en.length <= 20 ? "ContactTitleBackground TemplateTitleBgSingle" : "ContactTitleBackground TemplateTitleBg")}
                        >
                            <div className={itemConfig.payload.nodeType.id == 5 ||
                                itemConfig.payload.nodeType.id == 4 ? "ContactTitle TitleColorWhite" :
                                "ContactTitle TitleColor"}>
                                {/* <div title={itemConfig.payload.label.label_en} style={{ fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '128px', float: 'left', fontWeight: 'bold', }}>
                                {itemConfig.payload.label.label_en}</div> */}
                                <div title={itemConfig.payload.label.label_en} className="NodeTitletext">
                                    {itemConfig.payload.label.label_en}</div>
                                <div style={{ float: 'right' }}>
                                    {(itemConfig.payload.nodeType.id != 1 && itemConfig.payload.nodeDataMap[this.state.selectedScenario] != undefined && itemConfig.payload.nodeType.id == 2 && itemConfig.payload.nodeDataMap[this.state.selectedScenario][0].extrapolation == true) && <i class="fa fa-line-chart" style={{ fontSize: '11px', color: (itemConfig.payload.nodeType.id == 4 || itemConfig.payload.nodeType.id == 5 ? '#fff' : '#002f6c') }}></i>}
                                    {(itemConfig.payload.nodeType.id != 1 && itemConfig.payload.nodeDataMap[this.state.selectedScenario] != undefined && itemConfig.payload.nodeDataMap[this.state.selectedScenario][0].extrapolation != true) && this.getPayloadData(itemConfig, 4) == true && <i class="fa fa-long-arrow-up" style={{ fontSize: '11px', color: (itemConfig.payload.nodeType.id == 4 || itemConfig.payload.nodeType.id == 5 ? '#fff' : '#002f6c') }}></i>}
                                    {(itemConfig.payload.nodeType.id != 1 && itemConfig.payload.nodeDataMap[this.state.selectedScenario] != undefined && itemConfig.payload.nodeDataMap[this.state.selectedScenario][0].extrapolation != true) && this.getPayloadData(itemConfig, 6) == true && <i class="fa fa-long-arrow-down" style={{ fontSize: '11px', color: (itemConfig.payload.nodeType.id == 4 || itemConfig.payload.nodeType.id == 5 ? '#fff' : '#002f6c') }}></i>}
                                    {(itemConfig.payload.nodeType.id != 1 && itemConfig.payload.nodeDataMap[this.state.selectedScenario] != undefined && itemConfig.payload.nodeDataMap[this.state.selectedScenario][0].extrapolation != true) && this.getPayloadData(itemConfig, 5) == true && <i class="fa fa-link" style={{ fontSize: '11px', color: (itemConfig.payload.nodeType.id == 4 || itemConfig.payload.nodeType.id == 5 ? '#fff' : '#002f6c') }}></i>}
                                    <b style={{ color: '#212721', float: 'right' }}>
                                        {(itemConfig.payload.nodeDataMap[this.state.selectedScenario] != undefined && itemConfig.payload.nodeType.id == 4) ? itemConfig.payload.nodeDataMap[this.state.selectedScenario][0].fuNode.usageType.id == 2 ? <b style={{ fontSize: '14px', color: '#fff' }}>c </b> : <b style={{ fontSize: '14px', color: '#fff' }}>d </b> : ""}
                                        {itemConfig.payload.nodeType.id == 2 ?
                                            <i class="fa fa-hashtag" style={{ fontSize: '11px', color: '#002f6c' }}></i> :
                                            (itemConfig.payload.nodeType.id == 3 ?
                                                <i class="fa fa-percent " style={{ fontSize: '11px', color: '#002f6c' }} ></i> :
                                                (itemConfig.payload.nodeType.id == 4 ?
                                                    <i class="fa fa-cube" style={{ fontSize: '11px', color: '#fff' }} ></i> :
                                                    (itemConfig.payload.nodeType.id == 5 ?
                                                        <i class="fa fa-cubes" style={{ fontSize: '11px', color: '#fff' }} ></i> :
                                                        (itemConfig.payload.nodeType.id == 1 ?
                                                            // <i class="fa fa-plus" style={{ fontSize: '11px', color: '#002f6c' }} ></i> : ""))))}</b>
                                                            <i><img src={AggregationNode} className="AggregationNodeSize" /></i> : ""))))}</b>

                                </div>
                            </div>
                        </div>
                        <div className="ContactPhone ContactPhoneValue">
                            <span style={{ textAlign: 'center', fontWeight: '500' }}>{this.getPayloadData(itemConfig, 1)}</span>
                            <div style={{ overflow: 'inherit', fontStyle: 'italic' }}><p className="" style={{ textAlign: 'center' }}>{this.getPayloadData(itemConfig, 2)}</p></div>
                            {this.state.showModelingValidation && <div className="treeValidation"><span style={{ textAlign: 'center', fontWeight: '500' }}>{this.getPayloadData(itemConfig, 3) != "" ? i18n.t('static.ManageTree.SumofChildren') + ": " : ""}</span><span className={this.getPayloadData(itemConfig, 3) != 100 ? "treeValidationRed" : ""}>{this.getPayloadData(itemConfig, 3) != "" ? this.getPayloadData(itemConfig, 3) + "%" : ""}</span></div>}
                        </div>
                    </div>)
            ))
        }

        const HighlightNode = ({ itemConfig }) => {
            let itemTitleColor = Colors.RoyalBlue;


            return (
                // <div className="ContactTemplate" style={{ opacity, backgroundColor: Colors.White, borderColor: Colors.Black }}>

                <div className="ContactTemplate boxContactTemplate" title={itemConfig.payload.nodeDataMap[this.state.selectedScenario] != undefined ? itemConfig.payload.nodeDataMap[this.state.selectedScenario][0].notes : ''} style={{ height: "88px", width: "200px", zIndex: "1" }}>
                    <div className={itemConfig.payload.nodeType.id == 5
                        || itemConfig.payload.nodeType.id == 4 ? (itemConfig.payload.label.label_en.length <= 20 ? "ContactTitleBackground TemplateTitleBgblueSingle" : "ContactTitleBackground TemplateTitleBgblue") :
                        (itemConfig.payload.label.label_en.length <= 20 ? "ContactTitleBackground TemplateTitleBgSingle" : "ContactTitleBackground TemplateTitleBg")}
                    >
                        <div className={itemConfig.payload.nodeType.id == 5 ||
                            itemConfig.payload.nodeType.id == 4 ? "ContactTitle TitleColorWhite" :
                            "ContactTitle TitleColor"}>
                            {/* <div title={itemConfig.payload.label.label_en} style={{ fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '128px', float: 'left', fontWeight: 'bold', }}>
                                {itemConfig.payload.label.label_en}</div> */}
                            <div title={itemConfig.payload.label.label_en} className="NodeTitletext">
                                {itemConfig.payload.label.label_en}</div>
                            <div style={{ float: 'right' }}>
                                {(itemConfig.payload.nodeType.id != 1 && itemConfig.payload.nodeDataMap[this.state.selectedScenario] != undefined && itemConfig.payload.nodeType.id == 2 && itemConfig.payload.nodeDataMap[this.state.selectedScenario][0].extrapolation == true) && <i class="fa fa-line-chart" style={{ fontSize: '11px', color: (itemConfig.payload.nodeType.id == 4 || itemConfig.payload.nodeType.id == 5 ? '#fff' : '#002f6c') }}></i>}
                                {(itemConfig.payload.nodeType.id != 1 && itemConfig.payload.nodeDataMap[this.state.selectedScenario] != undefined && itemConfig.payload.nodeDataMap[this.state.selectedScenario][0].extrapolation != true) && this.getPayloadData(itemConfig, 4) == true && <i class="fa fa-long-arrow-up" style={{ fontSize: '11px', color: (itemConfig.payload.nodeType.id == 4 || itemConfig.payload.nodeType.id == 5 ? '#fff' : '#002f6c') }}></i>}
                                {(itemConfig.payload.nodeType.id != 1 && itemConfig.payload.nodeDataMap[this.state.selectedScenario] != undefined && itemConfig.payload.nodeDataMap[this.state.selectedScenario][0].extrapolation != true) && this.getPayloadData(itemConfig, 6) == true && <i class="fa fa-long-arrow-down" style={{ fontSize: '11px', color: (itemConfig.payload.nodeType.id == 4 || itemConfig.payload.nodeType.id == 5 ? '#fff' : '#002f6c') }}></i>}
                                {(itemConfig.payload.nodeType.id != 1 && itemConfig.payload.nodeDataMap[this.state.selectedScenario] != undefined && itemConfig.payload.nodeDataMap[this.state.selectedScenario][0].extrapolation != true) && this.getPayloadData(itemConfig, 5) == true && <i class="fa fa-link" style={{ fontSize: '11px', color: (itemConfig.payload.nodeType.id == 4 || itemConfig.payload.nodeType.id == 5 ? '#fff' : '#002f6c') }}></i>}
                                <b style={{ color: '#212721', float: 'right' }}>
                                    {(itemConfig.payload.nodeDataMap[this.state.selectedScenario] != undefined && itemConfig.payload.nodeType.id == 4) ? itemConfig.payload.nodeDataMap[this.state.selectedScenario][0].fuNode.usageType.id == 2 ? <b style={{ fontSize: '14px', color: '#fff' }}>c </b> : <b style={{ fontSize: '14px', color: '#fff' }}>d </b> : ""}
                                    {itemConfig.payload.nodeType.id == 2 ?
                                        <i class="fa fa-hashtag" style={{ fontSize: '11px', color: '#002f6c' }}></i> :
                                        (itemConfig.payload.nodeType.id == 3 ?
                                            <i class="fa fa-percent " style={{ fontSize: '11px', color: '#002f6c' }} ></i> :
                                            (itemConfig.payload.nodeType.id == 4 ?
                                                <i class="fa fa-cube" style={{ fontSize: '11px', color: '#fff' }} ></i> :
                                                (itemConfig.payload.nodeType.id == 5 ?
                                                    <i class="fa fa-cubes" style={{ fontSize: '11px', color: '#fff' }} ></i> :
                                                    (itemConfig.payload.nodeType.id == 1 ?
                                                        // <i class="fa fa-plus" style={{ fontSize: '11px', color: '#002f6c' }} ></i> : ""))))}</b>
                                                        <i><img src={AggregationNode} className="AggregationNodeSize" /></i> : ""))))}</b>

                            </div>
                        </div>
                    </div>
                    <div className="ContactPhone ContactPhoneValue">
                        <span style={{ textAlign: 'center', fontWeight: '500' }}>{this.getPayloadData(itemConfig, 1)}</span>
                        <div style={{ overflow: 'inherit', fontStyle: 'italic' }}><p className="" style={{ textAlign: 'center' }}>{this.getPayloadData(itemConfig, 2)}</p></div>
                        {this.state.showModelingValidation && <div className="treeValidation"><span style={{ textAlign: 'center', fontWeight: '500' }}>{this.getPayloadData(itemConfig, 3) != "" ? i18n.t('static.ManageTree.SumofChildren') + ": " : ""}</span><span className={this.getPayloadData(itemConfig, 3) != 100 ? "treeValidationRed" : ""}>{this.getPayloadData(itemConfig, 3) != "" ? this.getPayloadData(itemConfig, 3) + "%" : ""}</span></div>}
                    </div>
                </div>
            )
        }



        const NodeDragSource = DragSource(
            ItemTypes.NODE,
            {
                beginDrag: ({ itemConfig }) => ({ id: itemConfig.id }),
                endDrag(props, monitor) {
                    // const { onMoveItem } = props;
                    // const item = monitor.getItem()
                    // const dropResult = monitor.getDropResult()
                    // if (dropResult) {
                    // onMoveItem(dropResult.id, item.id);
                    // treeCalculator(items);
                    // *****************
                    // console.log("anchal***************************************");
                    // this.createOrUpdateTree();
                    // }
                },
            },
            (connect, monitor) => ({
                connectDragSource: connect.dragSource(),
                isDragging: monitor.isDragging(),
            }),
        )(Node);
        const NodeDragDropSource = DropTarget(
            ItemTypes.NODE,
            {
                // drop: ({ itemConfig }) => ({ id: itemConfig.id }),
                // canDrop: ({ canDropItem, itemConfig }, monitor) => {
                //     const { id } = monitor.getItem();
                //     return canDropItem(itemConfig.id, id);
                // },
            },
            (connect, monitor) => ({
                connectDropTarget: connect.dropTarget(),
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
        )(NodeDragSource);

        const { singleValue2 } = this.state
        const { forecastMethodList } = this.state;
        let forecastMethods = forecastMethodList.length > 0
            && forecastMethodList.map((item, i) => {
                return (
                    <option key={i} value={item.forecastMethodId}>
                        {getLabelText(item.label, this.state.lang)}
                    </option>
                )
            }, this);

        const { treeData } = this.state;
        // console.log("treeData--->", treeData)
        let treeList = treeData.length > 0
            && treeData.map((item, i) => {
                return (
                    <option key={i} value={item.treeId}>
                        {getLabelText(item.label, this.state.lang)}
                    </option>
                )
            }, this);
        const { scenarioList } = this.state;
        let scenarios = scenarioList.length > 0
            && scenarioList.map((item, i) => {
                return (
                    <option key={i} value={item.id}>
                        {getLabelText(item.label, this.state.lang)}
                    </option>
                )
            }, this);
        // console.log("scenarios--->", scenarios)
        const { regionList } = this.state;
        let regionMultiList = regionList.length > 0
            && regionList.map((item, i) => {
                return ({ value: item.regionId, label: getLabelText(item.label, this.state.lang) })

            }, this);

        // const { forecastingUnitList } = this.state;
        // let forecastingUnitMultiList = forecastingUnitList.length > 0
        //     && forecastingUnitList.map((item, i) => {
        //         return ({ value: item.id, label: getLabelText(item.label, this.state.lang) })

        //     }, this);
        // console.log("forecastingUnitMultiList---", forecastingUnitMultiList);

        // regionMultiList = Array.from(regionMultiList);
        let treeLevel = this.state.items.length;
        const treeLevelItems = []
        var treeLevels = this.state.curTreeObj.forecastMethod.id != "" && this.state.curTreeObj.levelList != undefined ? this.state.curTreeObj.levelList : [];
        for (var i = 0; i <= treeLevel; i++) {
            var treeLevelFiltered = treeLevels.filter(c => c.levelNo == i);
            if (i == 0) {
                treeLevelItems.push({
                    annotationType: AnnotationType.Level,
                    levels: [0],
                    title: treeLevelFiltered.length > 0 ? getLabelText(treeLevelFiltered[0].label, this.state.lang) : "Level 0",
                    titleColor: "#002f6c",
                    fontWeight: "bold",
                    transForm: 'rotate(270deg)',
                    offset: new Thickness(0, 0, 0, -1),
                    lineWidth: new Thickness(0, 0, 0, 0),
                    opacity: 0,
                    borderColor: Colors.Gray,
                    // fillColor: "#f5f5f5",
                    lineType: LineType.Dotted
                });
            }
            else if (i % 2 == 0) {
                treeLevelItems.push(new LevelAnnotationConfig({
                    levels: [i],
                    title: treeLevelFiltered.length > 0 ? getLabelText(treeLevelFiltered[0].label, this.state.lang) : "Level " + i,
                    titleColor: "#002f6c",
                    fontWeight: "bold",
                    transForm: 'rotate(270deg)',
                    offset: new Thickness(0, 0, 0, -1),
                    lineWidth: new Thickness(0, 0, 0, 0),
                    opacity: 0,
                    borderColor: Colors.Gray,
                    // fillColor: "#f5f5f5",
                    lineType: LineType.Solid
                })
                );
            }
            else {
                treeLevelItems.push(new LevelAnnotationConfig({
                    levels: [i],
                    title: treeLevelFiltered.length > 0 ? getLabelText(treeLevelFiltered[0].label, this.state.lang) : "Level " + i,
                    titleColor: "#002f6c",
                    fontWeight: "bold",
                    transForm: 'rotate(270deg)',
                    offset: new Thickness(0, 0, 0, -1),
                    lineWidth: new Thickness(0, 0, 0, 0),
                    opacity: 0.08,
                    borderColor: Colors.Gray,
                    // fillColor: "#f5f5f5",
                    lineType: LineType.Dotted
                }));
            }
            // console.log("level json***", treeLevelItems);
        }

        const config = {
            ...this.state,
            // pageFitMode: PageFitMode.Enabled,
            pageFitMode: PageFitMode.None,
            // highlightItem: 0,
            hasSelectorCheckbox: Enabled.False,
            // hasButtons: Enabled.True,
            buttonsPanelSize: 40,
            orientationType: OrientationType.Top,
            defaultTemplateName: "contactTemplate",
            linesColor: Colors.Black,
            annotations: treeLevelItems,
            onLevelTitleRender: ((data) => {
                var { context, width, height } = data;
                var { title, titleColor } = context;
                var style = {
                    position: "absolute",
                    fontSize: "12px",
                    fontFamily: "Trebuchet MS, Tahoma, Verdana, Arial, sans-serif",
                    WebkitTapHighlightColor: "rgba(0,0,0,0)",
                    WebkitUserSelect: "none",
                    WebkitTouchCallout: "none",
                    KhtmlUserSelect: "none",
                    MozUserSelect: "none",
                    msUserSelect: "none",
                    userSelect: "none",
                    boxSizing: "content-box",

                    MozBorderRadius: "4px",
                    WebkitBorderRadius: "4px",
                    KhtmlBorderRadius: "4px",
                    BorderRadius: "4px",

                    background: "royalblue",
                    borderWidth: 0,
                    color: "white",
                    padding: 0,
                    width: "100%",
                    height: "100%",
                    left: "-1px",
                    top: "-1px"
                }
                return <div style={{ ...style, background: titleColor }} onClick={(event) => {
                    event.stopPropagation();
                    //   // console.log("Data@@@1111----------->",data)
                    //   alert(`User clicked on level title ${title}`)
                    this.levelClicked(data)
                }}>
                    <RotatedText
                        width={width}
                        height={height}
                        orientation={'RotateRight'}
                        horizontalAlignment={'center'}
                        verticalAlignment={'middle'}
                    >{title}</RotatedText>
                </div>
            }),

            // itemTitleFirstFontColor: Colors.White,
            templates: [{
                hasButtons: Enabled.True,
                name: "contactTemplate",
                itemSize: { width: 200, height: 100 },
                minimizedItemSize: { width: 2, height: 2 },
                highlightPadding: { left: 1, top: 1, right: 1, bottom: 1 },
                highlightBorderWidth: 1,
                cursorBorderWidth: 2,
                onCursorRender: ({ context: itemConfig }) => {
                    return <div className="CursorFrame">
                    </div>;
                },
                onHighlightRender: ({ context: itemConfig }) => {
                    return
                    //     <div className="HighlightFrame HighlightFrameTooltip">
                    //     <div className="HighlightBadgePlaceholder">
                    //       <div className="HighlightBadge HighlightBadgeBox">
                    //          <p className='HighlightBadgeText'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                    //       </div>
                    //     </div>
                    //   </div>;
                },

                onItemRender: ({ context: itemConfig }) => {
                    return <NodeDragDropSource
                        itemConfig={itemConfig}
                        onRemoveItem={this.onRemoveItem}
                    // canDropItem={this.canDropItem}
                    // onMoveItem={this.onMoveItem}
                    />;
                },

                onButtonsRender: (({ context: itemConfig }) => {
                    return <>
                        {itemConfig.parent != null &&

                            <>
                                {!this.state.hideActionButtons && AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_EDIT_TREE') && this.props.match.params.isLocal != 2 &&

                                    <button key="2" type="button" className="StyledButton TreeIconStyle TreeIconStyleCopyPaddingTop" style={{ background: 'none' }}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            this.duplicateNode(JSON.parse(JSON.stringify(itemConfig)));
                                        }}>
                                        <i class="fa fa-clone" aria-hidden="true"></i>
                                    </button>
                                }
                                {!this.state.hideActionButtons && AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_EDIT_TREE') && this.props.match.params.isLocal != 2 &&
                                    <button key="3" type="button" className="StyledButton TreeIconStyle TreeIconStyleDeletePaddingTop" style={{ background: 'none' }}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            confirmAlert({
                                                message: "Are you sure you want to delete this node.",
                                                buttons: [
                                                    {
                                                        label: i18n.t('static.program.yes'),
                                                        onClick: () => {
                                                            // console.log("delete itemConfig---", itemConfig);
                                                            this.onRemoveButtonClick(itemConfig);
                                                        }
                                                    },
                                                    {
                                                        label: i18n.t('static.program.no')
                                                    }
                                                ]
                                            });
                                        }}>
                                        {/* <FontAwesomeIcon icon={faTrash} /> */}
                                        <i class="fa fa-trash-o" aria-hidden="true" style={{ fontSize: '16px' }}></i>
                                    </button>}

                            </>}
                        {!this.state.hideActionButtons && parseInt(itemConfig.payload.nodeType.id) != 5 && AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_EDIT_TREE') && this.props.match.params.isLocal != 2 &&

                            <button key="4" type="button" className="StyledButton TreeIconStyle TreeIconStyleCopyPaddingTop" style={{ background: 'none' }}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    this.getBranchTemplateList(itemConfig);
                                    // this.duplicateNode(JSON.parse(JSON.stringify(itemConfig)));
                                }}>
                                <i class="fa fa-sitemap" aria-hidden="true"></i>
                            </button>
                        }
                        {!this.state.hideActionButtons && parseInt(itemConfig.payload.nodeType.id) != 5 && AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_EDIT_TREE') && this.props.match.params.isLocal != 2 &&
                            <button key="1" type="button" className="StyledButton TreeIconStyle TreeIconStylePlusPaddingTop" style={{ background: 'none' }}
                                onClick={(event) => {
                                    this.setState({
                                        modelingEl: "",
                                        modelingTabChanged: false
                                    }, () => {
                                        try {
                                            jexcel.destroy(document.getElementById('modelingJexcel'), true);
                                        } catch (err) {    
                                        }
                                    })
                                    // console.log("add button called---------");
                                    event.stopPropagation();
                                    // console.log("add node----", itemConfig);
                                    if (itemConfig.level == 0 && itemConfig.newTree) {
                                        alert("Please update the details of the current node.");
                                    } else {
                                        var nodeDataMap = {};
                                        var tempArray = [];
                                        var tempJson = {
                                            notes: '',
                                            month: moment(this.state.forecastStartDate).startOf('month').subtract(1, 'months').format("YYYY-MM-DD"),
                                            dataValue: "",
                                            calculatedDataValue: "",
                                            nodeDataModelingList: [],
                                            nodeDataOverrideList: [],
                                            nodeDataMomList: [],
                                            fuNode: {
                                                oneTimeUsage: "false",
                                                lagInMonths: 0,
                                                noOfForecastingUnitsPerPerson: '',
                                                usageFrequency: '',
                                                forecastingUnit: {
                                                    label: {
                                                        label_en: ''
                                                    },
                                                    tracerCategory: {

                                                    },
                                                    unit: {
                                                        id: ''
                                                    }
                                                },
                                                usageType: {
                                                    id: ''
                                                },
                                                usagePeriod: {
                                                    usagePeriodId: 1
                                                },
                                                repeatUsagePeriod: {
                                                    usagePeriodId: 1
                                                },
                                                noOfPersons: ''
                                            },
                                            puNode: {
                                                planningUnit: {
                                                    id: '',
                                                    unit: {
                                                        id: ''
                                                    },
                                                    multiplier: ''
                                                },
                                                refillMonths: '',
                                                sharePlanningUnit: "true"
                                            }
                                        };
                                        tempArray.push(tempJson);
                                        nodeDataMap[this.state.selectedScenario] = tempArray;
                                        // console.log("itemConfig.level@@@@@@@@@@@@#################@@@@@@@@@@@@", itemConfig.level);
                                        var getLevelUnit = this.state.curTreeObj.levelList != undefined ? this.state.curTreeObj.levelList.filter(c => c.levelNo == itemConfig.level + 1) : [];
                                        var levelUnitId = ""
                                        if (getLevelUnit.length > 0) {
                                            levelUnitId = getLevelUnit[0].unit != null && getLevelUnit[0].unit.id != null ? getLevelUnit[0].unit.id : "";
                                        }
                                        // console.log("level unit id on add button click---", levelUnitId);
                                        // tempArray.push(nodeDataMap);
                                        this.setState({
                                            addNodeError: true,
                                            isValidError: true,
                                            showMomDataPercent: false,
                                            showMomData: false,
                                            viewMonthlyData: true,
                                            tempPlanningUnitId: '',
                                            parentValue: "",
                                            fuValues: [],
                                            fuLabels: [],
                                            // showFUValidation : true,
                                            usageTemplateId: '',
                                            conversionFactor: '',
                                            parentScenario: itemConfig.level != 0 ? itemConfig.payload.nodeDataMap[this.state.selectedScenario][0] : {},
                                            usageText: '',
                                            currentScenario: {
                                                notes: '',
                                                extrapolation: false,
                                                dataValue: '',
                                                month: moment(this.state.forecastStartDate).startOf('month').format("YYYY-MM-DD"),
                                                fuNode: {
                                                    noOfForecastingUnitsPerPerson: '',
                                                    usageFrequency: '',
                                                    nodeDataModelingList: [],
                                                    nodeDataOverrideList: [],
                                                    nodeDataMomList: [],
                                                    forecastingUnit: {
                                                        label: {
                                                            label_en: ''
                                                        },
                                                        tracerCategory: {

                                                        },
                                                        unit: {
                                                            id: ''
                                                        }
                                                    },
                                                    usageType: {
                                                        id: ''
                                                    },
                                                    usagePeriod: {
                                                        usagePeriodId: ''
                                                    },
                                                    repeatUsagePeriod: {
                                                        usagePeriodId: ''
                                                    },
                                                    noOfPersons: ''
                                                },
                                                puNode: {
                                                    planningUnit: {
                                                        id: '',
                                                        unit: {

                                                        },
                                                        multiplier: ''
                                                    },
                                                    refillMonths: ''
                                                },
                                                nodeDataExtrapolationOptionList: []
                                            },
                                            level0: true,
                                            numberNode: (itemConfig.payload.nodeType.id == 1 || itemConfig.payload.nodeType.id == 2 ? false : true),
                                            aggregationNode: (itemConfig.payload.nodeType.id == 1 ? false : true),
                                            addNodeFlag: true,
                                            openAddNodeModal: true,
                                            modelingChangedOrAdded: false,
                                            currentItemConfig: {
                                                context: {
                                                    isVisible: '',
                                                    level: itemConfig.level,
                                                    parent: itemConfig.id,
                                                    payload: {
                                                        nodeId: '',
                                                        label: {
                                                            label_en: ''
                                                        },
                                                        nodeType: {
                                                            id: ''
                                                        },
                                                        nodeUnit: {
                                                            id: levelUnitId
                                                        },
                                                        nodeDataMap: nodeDataMap
                                                    }
                                                },
                                                parentItem: {
                                                    parent: itemConfig.parent,
                                                    payload: {
                                                        nodeType: {
                                                            id: itemConfig.payload.nodeType.id
                                                        },
                                                        label: {
                                                            label_en: itemConfig.payload.label.label_en
                                                        },
                                                        nodeUnit: {
                                                            id: itemConfig.payload.nodeUnit.id,
                                                            label: itemConfig.payload.nodeUnit.label
                                                        },
                                                        nodeDataMap: itemConfig.payload.nodeDataMap
                                                    }
                                                }

                                            }
                                        }, () => {
                                            // console.log("add click config---", this.state.currentItemConfig);
                                            // console.log("add click nodeflag---", this.state.addNodeFlag);
                                            // console.log("add click number node flag---", this.state.numberNode);
                                            this.setState({
                                                orgCurrentItemConfig: JSON.parse(JSON.stringify(this.state.currentItemConfig.context))
                                                // parentValue: itemConfig.payload.nodeDataMap[this.state.selectedScenario][0].calculatedDataValue
                                            }, () => {
                                                this.getNodeTypeFollowUpList(itemConfig.payload.nodeType.id);
                                                this.calculateParentValueFromMOM(this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].month);
                                            });

                                            if (itemConfig.payload.nodeType.id == 2 || itemConfig.payload.nodeType.id == 3) {
                                                var tracerCategoryId = "";
                                                if (this.state.tracerCategoryList.length == 1) {
                                                    this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0].fuNode.forecastingUnit.tracerCategory.id = this.state.tracerCategoryList[0].tracerCategoryId;
                                                    this.state.currentScenario = this.state.currentItemConfig.context.payload.nodeDataMap[this.state.selectedScenario][0];
                                                    tracerCategoryId = this.state.tracerCategoryList[0].tracerCategoryId;

                                                }
                                                this.filterUsageTemplateList(tracerCategoryId);
                                                this.getForecastingUnitListByTracerCategoryId(0, 0);
                                            }
                                            else if (itemConfig.payload.nodeType.id == 4) {
                                                this.getNoOfFUPatient();
                                                setTimeout(() => {
                                                    this.getNoOfMonthsInUsagePeriod();
                                                    this.getPlanningUnitListByFUId((itemConfig.payload.nodeDataMap[this.state.selectedScenario])[0].fuNode.forecastingUnit.id);
                                                }, 0);
                                                this.state.currentItemConfig.context.payload.nodeUnit.id = this.state.items.filter(x => x.id == itemConfig.parent)[0].payload.nodeUnit.id;
                                            } else {

                                            }
                                        });
                                        // this.onAddButtonClick(itemConfig);
                                    }
                                }}>
                                {/* <FontAwesomeIcon icon={faPlus} /> */}
                                <i class="fa fa-plus" aria-hidden="true"></i>
                            </button>}
                        {!this.state.hideActionButtons && AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_EDIT_TREE') &&
                            <button key="5" type="button" className="StyledButton TreeIconStyle TreeIconStyleCopyPaddingTop" style={{ background: 'none' }}
                                onClick={(event) => {

                                    var items = this.state.items;
                                    event.stopPropagation();
                                    var updatedItems = items;
                                    // this.setState(prevState => ({
                                    //     toggleArray: [...prevState.toggleArray, itemConfig.id]
                                    // }))
                                    if (this.state.toggleArray.includes(itemConfig.id)) {
                                        var tempToggleArray = this.state.toggleArray.filter((e) => e != itemConfig.id)
                                        updatedItems = updatedItems.map(item => {
                                            if (item.sortOrder.toString().startsWith(itemConfig.sortOrder.toString()) && item.sortOrder.toString() != itemConfig.sortOrder.toString()) {
                                                tempToggleArray = tempToggleArray.filter((e) => e != item.id)
                                                return { ...item, templateName: "contactTemplate", expanded: false, payload: { ...item.payload, collapsed: false } };
                                            }
                                            return item;
                                        });
                                        if (Array.from(new Set(tempToggleArray)).length >= items.length) {
                                            this.setState({ collapseState: true })
                                        } else {
                                            this.setState({ collapseState: false })
                                        }
                                        this.setState({ toggleArray: tempToggleArray })
                                    } else {
                                        var parentId = itemConfig.payload.parentNodeId;
                                        var parentNode = items.filter(e => e.id == parentId);
                                        var tempToggleArray = this.state.toggleArray;
                                        tempToggleArray.push(itemConfig.id);
                                        if (parentId) {
                                            if (parentNode[0].payload.parentNodeId == null) {
                                                tempToggleArray.push(itemConfig.payload.parentNodeId);
                                            }
                                        }
                                        updatedItems = updatedItems.map(item => {
                                            if (item.sortOrder.toString().startsWith(itemConfig.sortOrder.toString()) && item.parent != null) {
                                                tempToggleArray.push(item.id);
                                                return { ...item, templateName: "contactTemplateMin", expanded: true, payload: { ...item.payload, collapsed: true } };
                                            }
                                            return item;
                                        });
                                        if (Array.from(new Set(tempToggleArray)).length >= items.length) {
                                            this.setState({ collapseState: true })
                                        } else {
                                            this.setState({ collapseState: false })
                                        }
                                        this.setState({ toggleArray: tempToggleArray })
                                    }

                                    this.setState({ items: updatedItems }, () => { this.saveTreeData(false, true) })

                                }}>
                                {this.state.toggleArray.includes(itemConfig.id) ? <i class="fa fa-caret-square-o-left" aria-hidden="true"></i> : <i class="fa fa-caret-square-o-down" aria-hidden="true"></i>}
                            </button>
                        }

                    </>
                }),
            },
            {
                name: "contactTemplateMin",
                itemSize: { width: 8, height: 8 },
                minimizedItemSize: { width: 2, height: 2 },
                onItemRender: ({ context: itemConfig }) => {
                    return <NodeDragDropSource
                        itemConfig={itemConfig}
                        onRemoveItem={this.onRemoveItem}
                    // canDropItem={this.canDropItem}
                    // onMoveItem={this.onMoveItem}
                    />;
                },
                onHighlightRender: ({ context: itemConfig }) => {
                    return <HighlightNode
                        itemConfig={itemConfig}
                        onRemoveItem={this.onRemoveItem}
                    />;
                },
            }]
        }
        return <div className="">
            <Prompt
                when={this.state.isChanged == true || this.state.isTreeDataChanged == true || this.state.isScenarioChanged == true}
                message={i18n.t("static.dataentry.confirmmsg")}
            />
            <AuthenticationServiceComponent history={this.props.history} />

            <h5 className={this.state.color} id="div2">
                {i18n.t(this.state.message, { entityname })}</h5>
            <Row>
                <Col sm={12} md={12} style={{ flexBasis: 'auto' }}>
                    <Card className="mb-lg-0">

                        <div className="pb-lg-0">
                            <div className="Card-header-reporticon pb-1">
                                <span className="compareAndSelect-larrow"> <i className="cui-arrow-left icons " > </i></span>
                                <span className="compareAndSelect-rarrow"> <i className="cui-arrow-right icons " > </i></span>
                                <span className="compareAndSelect-larrowText" style={{ cursor: 'pointer' }} onClick={this.cancelClicked}> {i18n.t('static.common.backTo')} <small className="supplyplanformulas">{i18n.t('static.listTree.manageTreeTreeList')}</small></span>
                                <span className="compareAndSelect-rarrowText"> {i18n.t('static.common.continueTo')}  <a href="/#/validation/productValidation" className="supplyplanformulas">{i18n.t('static.dashboard.productValidation')}</a> {i18n.t('static.tree.or')} <a href="/#/validation/modelingValidation" className="supplyplanformulas">{i18n.t('static.dashboard.modelingValidation')}</a> </span>
                            </div>
                            {/* <div className="card-header-actions">
                                <div className="card-header-action pr-4 pt-lg-0">

                                    <Col md="12 pl-0">
                                        <div className="d-md-flex">
                                            <a className="pr-lg-0 pt-lg-1 compareAndSelect-larrowText">
                                                <span style={{ cursor: 'pointer' }} onClick={this.cancelClicked}><i className="fa fa-long-arrow-left" style={{ color: '#20a8d8', fontSize: '13px' }}></i> <small className="supplyplanformulas">{'Return To List'}</small></span>
                                            </a>
                                             <FormGroup className="tab-ml-1 mt-md-0 mb-md-0 ">

                                                <a className="pr-lg-1" href="javascript:void();" title={i18n.t('static.common.addEntity')} onClick={() => {
                                                    this.setState({
                                                        openTreeDataModal: true
                                                    })
                                                }}><i className="fa fa-cog"></i></a>
                                                <img style={{ height: '25px', width: '25px', cursor: 'pointer', marginTop: '-10px' }} src={pdfIcon} title={i18n.t('static.report.exportPdf')}
                                                    onClick={() => this.exportPDF()}
                                                />
                                                {this.state.selectedScenario > 0 && <img style={{ height: '25px', width: '25px', cursor: 'pointer', marginTop: '-10px' }} src={docicon} title={i18n.t('static.report.exportCsv')} onClick={() => this.exportDoc()} />}
                                            </FormGroup> 

                                        </div>
                                    </Col>
                                </div>
                            </div>  */}
                            {/* <div className="row"> */}
                            {/* <div className="col-md-12 pl-lg-0"> */}
                            {/* <div className='col-md-4 pt-lg-0'>
                                        <a className="pr-lg-0 pt-lg-1 float-left">
                                            <span style={{ cursor: 'pointer' }} onClick={this.cancelClicked}><i className="cui-arrow-left icons" style={{ color: '#002F6C', fontSize: '13px' }}></i> <small className="supplyplanformulas">{'Return To List'}</small></span>
                                        </a>
                                    </div> */}
                            {/* <div className="col-md-6">
                                        <span className="pr-lg-0 pt-lg-0 float-right">
                                            <h5 style={{ color: '#BA0C2F' }}>{i18n.t('static.tree.pleaseSaveAndDoARecalculateAfterDragAndDrop.')}</h5>
                                        </span>
                                    </div> */}

                            {/* </div> */}
                            {/* </div> */}
                            {/* <div className="row">
                                <div className="col-md-12 pl-lg-3">
                                    <div className="col-md-12">
                                        <span className="pr-lg-0 pt-lg-0 float-left">
                                            <h5 style={{ color: '#BA0C2F' }}>{i18n.t('static.tree.pleaseSaveAndDoARecalculateAfterDragAndDrop.')}</h5>
                                        </span>
                                    </div>

                                </div>
                            </div> */}
                        </div>
                        <div className="row pt-lg-0 pr-lg-4">
                            <div className="col-md-12">
                                <a style={{ float: 'right' }}>
                                    <span style={{ cursor: 'pointer' }} onClick={() => { this.toggleShowGuidance() }}><small className="supplyplanformulas">{i18n.t('static.common.showGuidance')}</small></span>
                                </a>
                            </div>
                        </div>
                        <CardBody className="pt-lg-1 pl-lg-0 pr-lg-0">
                            <div className="container-fluid pl-lg-3 pr-lg-3">
                                <>
                                    <Form>
                                        <CardBody className="pt-0 pb-0" style={{ display: this.state.loading ? "none" : "block" }}>
                                            <div className="col-md-12 pl-lg-0">
                                                <Row>
                                                    <FormGroup className="col-md-3 pl-lg-0">
                                                        <Label htmlFor="currencyId">{i18n.t('static.consumption.program')}<span class="red Reqasterisk">*</span></Label>
                                                        <InputGroup>
                                                            <Input
                                                                type="select"
                                                                name="datasetId"
                                                                id="datasetId"
                                                                bsSize="sm"
                                                                value={this.state.programId}
                                                                onChange={(e) => { this.setStartAndStopDateOfProgram(e.target.value) }}
                                                            >
                                                                <option value="">{i18n.t('static.mt.selectProgram')}</option>
                                                                {datasets}
                                                            </Input>

                                                        </InputGroup>

                                                    </FormGroup>
                                                    <FormGroup className="col-md-3 pl-lg-0" style={{ marginBottom: '0px' }}>
                                                        <Label htmlFor="languageId">{i18n.t('static.forecastMethod.tree')}</Label>
                                                        <InputGroup>
                                                            <Input
                                                                type="select"
                                                                name="treeId"
                                                                id="treeId"
                                                                bsSize="sm"
                                                                required
                                                                value={this.state.treeId}
                                                                onChange={(e) => { this.dataChange(e) }}

                                                            >
                                                                <option value="">{i18n.t('static.common.select')}</option>
                                                                {treeList}
                                                            </Input>
                                                            <InputGroupAddon addonType="append" onClick={this.toggleCollapse}>
                                                                <InputGroupText><i class="fa fa-cog icons" data-toggle="collapse" aria-expanded="false" style={{ cursor: 'pointer' }}></i></InputGroupText>

                                                            </InputGroupAddon>
                                                        </InputGroup>
                                                        {/* <FormFeedback>{errors.languageId}</FormFeedback> */}
                                                    </FormGroup>
                                                    <FormGroup className="col-md-3 pl-lg-0">
                                                        <Label htmlFor="languageId">{i18n.t('static.whatIf.scenario')}</Label>

                                                        <InputGroup>
                                                            <Input
                                                                type="select"
                                                                name="scenarioId"
                                                                id="scenarioId"
                                                                bsSize="sm"
                                                                onChange={(e) => { this.dataChange(e) }}
                                                                required
                                                                value={this.state.selectedScenario}
                                                            >
                                                                <option value="">{i18n.t('static.common.select')}</option>
                                                                {scenarios}
                                                            </Input>

                                                            {AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_EDIT_TREE') && this.props.match.params.isLocal != 2 &&
                                                                <InputGroupAddon addonType="append" onClick={this.toggleDropdown}>
                                                                    {/* <InputGroupText><i class="fa fa-plus icons" aria-hidden="true" data-toggle="tooltip" data-html="true" data-placement="bottom" onClick={this.openScenarioModal} title=""></i></InputGroupText> */}
                                                                    <InputGroupText className='SettingIcon'>
                                                                        <ButtonDropdown isOpen={this.state.dropdownOpen[0]} toggle={() => { this.toggleDeropdownSetting(0); }}>
                                                                            <DropdownToggle>
                                                                                <i class="fa fa-cog icons" data-bind="label" id="searchLabel" title=""></i>
                                                                            </DropdownToggle>
                                                                            <DropdownMenu right className="MarginLeftDropdown">
                                                                                <DropdownItem onClick={() => { this.openScenarioModal(1) }}>Add Scenario</DropdownItem>
                                                                                <DropdownItem onClick={() => { this.openScenarioModal(2) }}>Edit Scenario</DropdownItem>
                                                                                <DropdownItem onClick={() => { this.openScenarioModal(3) }}>Delete Scenario</DropdownItem>
                                                                            </DropdownMenu>
                                                                        </ButtonDropdown>
                                                                    </InputGroupText>

                                                                </InputGroupAddon>}
                                                        </InputGroup>

                                                        {/* <div class="list-group DropdownScenario MarginLeftDropdown" style={{ display: this.state.showDiv1 ? 'block' : 'none' }}>
                                                            <p class="list-group-item list-group-item-action" onClick={() => { this.openScenarioModal(1) }}>Add Scenario</p>
                                                            <p class="list-group-item list-group-item-action" onClick={() => { this.openScenarioModal(2) }}>Edit Scenario</p>
                                                            <p class="list-group-item list-group-item-action" onClick={() => { this.openScenarioModal(3) }}>Delete Scenario</p>
                                                           

                                                        </div> */}

                                                        {/* <FormFeedback>{errors.languageId}</FormFeedback> */}
                                                    </FormGroup>

                                                    {this.state.showDate && <FormGroup className="col-md-3 pl-lg-0">
                                                        <Label htmlFor="languageId">
                                                            {/* {i18n.t('static.supplyPlan.date')}  */}
                                                            {i18n.t('static.tree.displayDate')} <i>({i18n.t('static.consumption.forcast')}: {this.state.forecastPeriod})</i></Label>
                                                        <div className="controls edit">
                                                            <Picker
                                                                ref={this.pickAMonth3}
                                                                id="monthPicker"
                                                                name="monthPicker"
                                                                years={{ min: this.state.minDate, max: this.state.maxDate }}
                                                                value={this.state.singleValue2}
                                                                key={JSON.stringify(this.state.singleValue2)}
                                                                lang={pickerLang.months}
                                                                // theme="dark"
                                                                onChange={this.handleAMonthChange3}
                                                                onDismiss={(e) => this.handleAMonthDissmis3(e, 1)}
                                                            >
                                                                <MonthBox value={this.makeText(singleValue2)} onClick={(e) => { this.handleClickMonthBox3(e) }} />
                                                            </Picker>

                                                            {/* <Picker

                                                                            id="month"
                                                                            name="month"
                                                                            ref={this.pickAMonth1}
                                                                            years={{ min: this.state.minDate, max: this.state.maxDate }}
                                                                            value={{
                                                                                year:
                                                                                    new Date(this.state.currentScenario.month).getFullYear(), month: ("0" + (new Date(this.state.currentScenario.month).getMonth() + 1)).slice(-2)
                                                                            }}
                                                                            lang={pickerLang.months}
                                                                            // theme="dark"
                                                                            onChange={this.handleAMonthChange1}
                                                                            onDismiss={this.handleAMonthDissmis1}
                                                                        >
                                                                            <MonthBox value={this.makeText({ year: new Date(this.state.currentScenario.month).getFullYear(), month: ("0" + (new Date(this.state.currentScenario.month).getMonth() + 1)).slice(-2) })}
                                                                                onClick={this.handleClickMonthBox1} />
                                                                        </Picker> */}
                                                        </div>
                                                    </FormGroup>}
                                                    {/* 
                                                    <FormGroup className="col-md-2" >
                                                        <div className="check inline  pl-lg-1 pt-lg-0">
                                                            <div>
                                                                <Input
                                                                    className="form-check-input checkboxMargin"
                                                                    type="checkbox"
                                                                    id="active6"
                                                                    name="active6"
                                                                    // checked={false}
                                                                    onClick={(e) => { this.filterPlanningUnitNode(e); }}
                                                                />
                                                                <Label
                                                                    className="form-check-label"
                                                                    check htmlFor="inline-radio2" style={{ fontSize: '12px' }}>
                                                                    <b>{'Hide Planning Unit'}</b>
                                                                </Label>
                                                            </div>
                                                        </div>
                                                    </FormGroup>
                                                    <FormGroup className="col-md-3" style={{ marginLeft: '-2%' }}>
                                                        <div className="check inline  pl-lg-0 pt-lg-0">
                                                            <div>
                                                                <Input
                                                                    className="form-check-input checkboxMargin"
                                                                    type="checkbox"
                                                                    id="active7"
                                                                    name="active7"
                                                                    // checked={false}
                                                                    onClick={(e) => { this.filterPlanningUnitAndForecastingUnitNodes(e) }}
                                                                />
                                                                <Label
                                                                    className="form-check-label"
                                                                    check htmlFor="inline-radio2" style={{ fontSize: '12px' }}>
                                                                    <b>{'Hide Forecasting Unit & Planning Unit'}</b>
                                                                </Label>
                                                            </div>
                                                        </div>
                                                    </FormGroup>
                                                    <FormGroup className="col-md-6" >
                                                        <div className="check inline  pl-lg-0 pt-lg-0">
                                                            <div>
                                                                <Input
                                                                    className="form-check-input checkboxMargin"
                                                                    type="checkbox"
                                                                    id="active7"
                                                                    name="active7"
                                                                    // checked={false}
                                                                    onClick={(e) => { this.hideTreeValidation(e); }}
                                                                />
                                                                <Label
                                                                    className="form-check-label"
                                                                    check htmlFor="inline-radio2" style={{ fontSize: '12px' }}>
                                                                    <b>{'Hide Tree Validation'}</b>
                                                                </Label>
                                                            </div>
                                                        </div>
                                                    </FormGroup> */}

                                                </Row>
                                            </div>

                                        </CardBody>
                                        {/* <div className="col-md-12 collapse-bg pl-lg-2 pr-lg-2 pt-lg-2 MarginBottomTree" style={{ display: this.state.showDiv ? 'block' : 'none' }} > */}
                                        <div className="col-md-12 collapse-bg pl-lg-2 pr-lg-2 pt-lg-2 MarginBottomTree" style={{ display: this.state.showDiv ? 'block' : 'none' }}>
                                            <Formik
                                                enableReinitialize={true}
                                                initialValues={{
                                                    forecastMethodId: this.state.curTreeObj.forecastMethod.id,
                                                    treeName: this.state.curTreeObj.label.label_en,
                                                    regionArray: this.state.regionList,
                                                    regionId: this.state.regionValues,
                                                }}
                                                validate={validate(validationSchema)}
                                                onSubmit={(values, { setSubmitting, setErrors }) => {
                                                    this.saveTreeData(false, false);
                                                    // this.createOrUpdateTree();
                                                }}
                                                render={
                                                    ({
                                                        values,
                                                        errors,
                                                        touched,
                                                        handleChange,
                                                        handleBlur,
                                                        handleSubmit,
                                                        isSubmitting,
                                                        isValid,
                                                        setTouched,
                                                        handleReset,
                                                        setFieldValue,
                                                        setFieldTouched
                                                    }) => (
                                                        <Form onSubmit={handleSubmit} onReset={handleReset} noValidate name='userForm' autocomplete="off">
                                                            {/* <div className='col-md-12 pt-lg-2 pb-lg-0 pr-lg-0'>
                                                                <button className="mr-1 mb-0 float-right btn btn-info btn-md showdatabtn" onClick={this.toggleCollapse}>
                                                                {this.state.showDiv ? i18n.t('static.common.hideData') : i18n.t('static.common.showData')}
                                                                </button>
                                                            </div> */}
                                                            <Row style={{ display: 'inline-flex' }}>
                                                                <FormGroup className="col-md-4">
                                                                    <Label htmlFor="currencyId">{i18n.t('static.forecastMethod.forecastMethod')}<span class="red Reqasterisk">*</span></Label>
                                                                    <Input
                                                                        type="select"
                                                                        name="forecastMethodId"
                                                                        id="forecastMethodId"
                                                                        bsSize="sm"
                                                                        valid={!errors.forecastMethodId && this.state.curTreeObj.forecastMethod != null ? this.state.curTreeObj.forecastMethod.id : '' != ''}
                                                                        invalid={touched.forecastMethodId && !!errors.forecastMethodId}
                                                                        onBlur={handleBlur}
                                                                        onChange={(e) => { handleChange(e); this.treeDataChange(e) }}
                                                                        required
                                                                        value={this.state.curTreeObj.forecastMethod != null ? this.state.curTreeObj.forecastMethod.id : ''}
                                                                    >
                                                                        <option value="">{i18n.t('static.common.forecastmethod')}</option>
                                                                        {forecastMethods}
                                                                    </Input>
                                                                    <FormFeedback>{errors.forecastMethodId}</FormFeedback>
                                                                </FormGroup>
                                                                <FormGroup className="col-md-4">
                                                                    <Label htmlFor="currencyId">{i18n.t('static.common.treeName')}<span class="red Reqasterisk">*</span></Label>
                                                                    <Input type="text"
                                                                        id="treeName"
                                                                        name="treeName"
                                                                        bsSize="sm"
                                                                        valid={!errors.treeName && this.state.curTreeObj.label != null ? this.state.curTreeObj.label.label_en : '' != ''}
                                                                        invalid={touched.treeName && !!errors.treeName}
                                                                        onBlur={handleBlur}
                                                                        onChange={(e) => { handleChange(e); this.treeDataChange(e) }}
                                                                        value={this.state.curTreeObj.label != null ? this.state.curTreeObj.label.label_en : ''}
                                                                    ></Input>
                                                                    <FormFeedback>{errors.treeName}</FormFeedback>
                                                                </FormGroup>
                                                                <FormGroup className="col-md-4">
                                                                    <Label htmlFor="currencyId">{i18n.t('static.region.region')}<span class="red Reqasterisk">*</span></Label>
                                                                    <div className="controls ">
                                                                        {/* <InMultiputGroup> */}
                                                                        <Select
                                                                            className={classNames('form-control', 'd-block', 'w-100', 'bg-light',
                                                                                { 'is-valid': !errors.regionId },
                                                                                { 'is-invalid': (touched.regionId && !!errors.regionId || this.state.regionValues.length == 0) }
                                                                            )}
                                                                            bsSize="sm"
                                                                            onChange={(e) => {
                                                                                handleChange(e);
                                                                                setFieldValue("regionId", e);
                                                                                this.handleRegionChange(e);
                                                                            }}
                                                                            onBlur={() => setFieldTouched("regionId", true)}
                                                                            multi
                                                                            options={this.state.regionMultiList}
                                                                            value={this.state.regionValues}
                                                                        />
                                                                        <FormFeedback>{errors.regionId}</FormFeedback>
                                                                        {/* <MultiSelect
                                                                            // type="select"
                                                                            name="regionId"
                                                                            id="regionId"
                                                                            bsSize="sm"
                                                                            value={this.state.regionValues}
                                                                            onChange={(e) => { this.handleRegionChange(e) }}
                                                                            options={regionMultiList && regionMultiList.length > 0 ? regionMultiList : []}
                                                                            labelledBy={i18n.t('static.common.regiontext')}
                                                                        /> */}
                                                                    </div>
                                                                </FormGroup>
                                                                <FormGroup className="col-md-5">
                                                                    <Label htmlFor="currencyId">{i18n.t('static.common.note')}</Label>
                                                                    <Input type="textarea"
                                                                        id="treeNotes"
                                                                        name="treeNotes"
                                                                        onChange={(e) => { this.treeDataChange(e) }}
                                                                        value={this.state.curTreeObj.notes != "" ? this.state.curTreeObj.notes : ''}
                                                                    ></Input>
                                                                </FormGroup>
                                                                <FormGroup className="col-md-4 pt-lg-4">
                                                                    <Label className="P-absltRadio">{i18n.t('static.common.status')}</Label>
                                                                    <FormGroup check inline>
                                                                        <Input
                                                                            className="form-check-input"
                                                                            type="radio"
                                                                            id="active10"
                                                                            name="active"
                                                                            value={true}
                                                                            checked={this.state.curTreeObj.active === true}
                                                                            onChange={(e) => { this.treeDataChange(e) }}
                                                                        />
                                                                        <Label
                                                                            className="form-check-label"
                                                                            check htmlFor="inline-radio1">
                                                                            {i18n.t('static.common.active')}
                                                                        </Label>
                                                                    </FormGroup>
                                                                    <FormGroup check inline>
                                                                        <Input
                                                                            className="form-check-input"
                                                                            type="radio"
                                                                            id="active11"
                                                                            name="active"
                                                                            value={false}
                                                                            checked={this.state.curTreeObj.active === false}
                                                                            onChange={(e) => { this.treeDataChange(e) }}
                                                                        />
                                                                        <Label
                                                                            className="form-check-label"
                                                                            check htmlFor="inline-radio2">
                                                                            {i18n.t('static.common.disabled')}
                                                                        </Label>
                                                                    </FormGroup>
                                                                </FormGroup>
                                                                <FormGroup className="col-md-3 pt-lg-4">

                                                                    {/* <Button size="md" color="danger" className="submitBtn float-right mr-1" onClick={() => this.setState({ showDiv: false })}> <i className="fa fa-times"></i> {i18n.t('static.common.cancel')}</Button> */}
                                                                    {AuthenticationService.getLoggedInUserRoleBusinessFunctionArray().includes('ROLE_BF_EDIT_TREE') && this.props.match.params.isLocal != 2 && this.state.isTreeDataChanged && <Button type="submit" size="md" onClick={() => this.touchAll(setTouched, errors)} color="success" className="submitBtn float-right mr-1"> <i className="fa fa-check"></i>{i18n.t('static.common.update')}</Button>}
                                                                </FormGroup>
                                                            </Row>
                                                        </Form>
                                                    )} />
                                        </div>


                                        <div className="row ml-lg-1 pb-lg-2">
                                            <FormGroup className="col-md-2" >
                                                <div className="check inline  pl-lg-1 pt-lg-0">
                                                    <div>
                                                        <Input
                                                            className="form-check-input checkboxMargin"
                                                            type="checkbox"
                                                            id="active6"
                                                            name="active6"
                                                            // checked={false}
                                                            onClick={(e) => { this.filterPlanningUnitNode(e); }}
                                                        />
                                                        <Label
                                                            className="form-check-label"
                                                            check htmlFor="inline-radio2" style={{ fontSize: '12px' }}>
                                                            <b>{i18n.t('static.tree.hidePlanningUnit')}</b>
                                                        </Label>
                                                    </div>
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="col-md-3" style={{ marginLeft: '-2%' }}>
                                                <div className="check inline  pl-lg-0 pt-lg-0">
                                                    <div>
                                                        <Input
                                                            className="form-check-input checkboxMargin"
                                                            type="checkbox"
                                                            id="active7"
                                                            name="active7"
                                                            // checked={false}
                                                            onClick={(e) => { this.filterPlanningUnitAndForecastingUnitNodes(e) }}
                                                        />
                                                        <Label
                                                            className="form-check-label"
                                                            check htmlFor="inline-radio2" style={{ fontSize: '12px' }}>
                                                            <b>{i18n.t('static.tree.hideFUAndPU')}</b>
                                                        </Label>
                                                    </div>
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="col-md-2" >
                                                <div className="check inline  pl-lg-0 pt-lg-0">
                                                    <div>
                                                        <Input
                                                            className="form-check-input checkboxMargin"
                                                            type="checkbox"
                                                            id="active7"
                                                            name="active7"
                                                            // checked={false}
                                                            onClick={(e) => { this.hideTreeValidation(e); }}
                                                        />
                                                        <Label
                                                            className="form-check-label"
                                                            check htmlFor="inline-radio2" style={{ fontSize: '12px' }}>
                                                            <b>{i18n.t('static.tree.hideTreeValidation')}</b>
                                                        </Label>
                                                    </div>
                                                </div>
                                            </FormGroup>
                                            <div>
                                                <Popover placement="top" isOpen={this.state.popoverTooltipAuto} target="PopoverAuto" trigger="hover" toggle={this.toggleTooltipAuto}>
                                                    <PopoverBody>{i18n.t('static.tooltip.autoCalculate')}</PopoverBody>
                                                </Popover>
                                            </div>
                                            <FormGroup className="col-md-2" >
                                                <div className="check inline  pl-lg-0 pt-lg-0">
                                                    <div>
                                                        <Input
                                                            className="form-check-input checkboxMargin"
                                                            type="checkbox"
                                                            id="active8"
                                                            name="active8"
                                                            checked={this.state.autoCalculate}
                                                            onClick={(e) => { this.autoCalculate(e); }}
                                                        />
                                                        <Label
                                                            className="form-check-label"
                                                            check htmlFor="inline-radio2" style={{ fontSize: '12px' }}>
                                                            <b>{i18n.t('static.tree.autoCalculate')}</b><i class="fa fa-info-circle icons pl-lg-2" id="PopoverAuto" onClick={this.toggleTooltipAuto} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i>
                                                        </Label>
                                                    </div>
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="col-md-2" >
                                                <div className="check inline  pl-lg-0 pt-lg-0">
                                                    <div>
                                                        <Input
                                                            className="form-check-input checkboxMargin"
                                                            type="checkbox"
                                                            id="active9"
                                                            name="active9"
                                                            checked={this.state.collapseState}
                                                            onClick={(e) => { this.expandCollapse(e); }}
                                                        />
                                                        <Label
                                                            className="form-check-label"
                                                            check htmlFor="inline-radio2" style={{ fontSize: '12px' }}>
                                                            <b>{i18n.t('static.tree.collapseTree')}</b>
                                                        </Label>
                                                    </div>
                                                </div>
                                            </FormGroup>
                                            {/* <FormGroup className="col-md-2" >
                                                <div className="check inline  pl-lg-0 pt-lg-0">
                                                    <div>
                                                        <Input
                                                            className="form-check-input checkboxMargin"
                                                            type="checkbox"
                                                            id="hideButtons"
                                                            name="hideButtons"
                                                            checked={this.state.hideActionButtons}
                                                            // checked={false}
                                                            onClick={(e) => { this.hideActionButtons(e); }}
                                                        />
                                                        <Label
                                                            className="form-check-label"
                                                            check htmlFor="inline-radio2" style={{ fontSize: '12px' }}>
                                                            <b>{i18n.t('static.tree.hideActionButtons')}</b>
                                                        </Label>
                                                    </div>
                                                </div>
                                            </FormGroup> */}

                                        </div>

                                        <div className="pb-lg-0" style={{ marginTop: '-2%' }}>
                                            <div className="card-header-actions">
                                                <div className="card-header-action pr-0 pt-lg-0">

                                                    <Col md="12 pl-0">
                                                        <div className="d-md-flex">
                                                            {/* <a className="pr-lg-0 pt-lg-1">
                                                                <span style={{ cursor: 'pointer' }} onClick={this.cancelClicked}><i className="fa fa-long-arrow-left" style={{ color: '#20a8d8', fontSize: '13px' }}></i> <small className="supplyplanformulas">{'Return To List'}</small></span>
                                                            </a> */}
                                                            <FormGroup className="tab-ml-1 mt-md-0 mb-md-0 ">

                                                                {/* <a className="pr-lg-1" href="javascript:void();" title={i18n.t('static.common.addEntity')} onClick={() => {
                                                                                this.setState({
                                                                                    openTreeDataModal: true
                                                                                })
                                                                            }}><i className="fa fa-cog"></i></a> */}
                                                                {this.state.selectedScenario > 0 && <a style={{ marginRight: '7px' }} href="javascript:void();" title={i18n.t('static.qpl.recalculate')} onClick={() => this.recalculate(0, 2)}><i className="fa fa-refresh"></i></a>}
                                                                {this.state.selectedScenario > 0 && <img style={{ height: '25px', width: '25px', cursor: 'pointer', marginTop: '-10px' }} src={pdfIcon} title={i18n.t('static.report.exportPdf')}
                                                                    onClick={() => this.exportPDF()}
                                                                />}
                                                                {this.state.selectedScenario > 0 && <img style={{ height: '25px', width: '25px', cursor: 'pointer', marginTop: '-10px' }} src={docicon} title={i18n.t('static.report.exportWordDoc')} onClick={() => this.exportDoc()} />}
                                                            </FormGroup>

                                                        </div>
                                                    </Col>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ display: !this.state.loading ? "block" : "none" }} class="sample">
                                            {/* <h5 style={{ color: '#BA0C2F' }}>Please save and do a recalculate after drag and drop.</h5> */}
                                            <Provider>
                                                <div className="placeholder TreeTemplateHeight" style={{ clear: 'both', marginTop: '25px', border: '1px solid #a7c6ed' }} >
                                                    {/* <OrgDiagram centerOnCursor={true} config={config} onHighlightChanged={this.onHighlightChanged} /> */}
                                                    {/* <OrgDiagram centerOnCursor={true} config={config} onCursorChanged={this.onCursoChanged} onHighlightChanged={this.onHighlightChanged}/> */}
                                                    <OrgDiagram centerOnCursor={true} config={config} onCursorChanged={this.onCursoChanged} />
                                                </div>
                                            </Provider>
                                        </div>
                                        <div style={{ display: this.state.loading ? "block" : "none" }}>
                                            <div className="d-flex align-items-center justify-content-center" style={{ height: "500px" }} >
                                                <div class="align-items-center">
                                                    <div ><h4> <strong>{i18n.t('static.common.loading')}</strong></h4></div>

                                                    <div class="spinner-border blue ml-4" role="status">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <CardFooter style={{ backgroundColor: 'transparent', borderTop: '0px solid #c8ced3', display: this.state.selectedScenario != '' ? "block" : "none" }}> */}
                                        {/* <div class="row"> */}
                                        {/* <div className="col-md-6 pl-lg-0"> <h5 style={{ color: '#BA0C2F' }}>{i18n.t('static.tree.pleaseSaveAndDoARecalculateAfterDragAndDrop.')}</h5></div> */}
                                        {/* <div className="col-md-6 pl-lg-0"> </div> */}
                                        {/* <div className="col-md-6 pr-lg-0"> <Button type="button" size="md" color="info" className="float-right mr-1" onClick={() => this.callAfterScenarioChange(this.state.selectedScenario)}><i className="fa fa-calculator"></i> {i18n.t('static.tree.calculated')}</Button> */}
                                        {/* <Button type="button" size="md" color="warning" className="float-right mr-1" onClick={this.resetTree}><i className="fa fa-refresh"></i> {i18n.t('static.common.reset')}</Button> */}
                                        {/* <Button type="button" color="success" className="mr-1 float-right" size="md" onClick={() => this.saveTreeData()}><i className="fa fa-check"> </i>{i18n.t('static.pipeline.save')}</Button> */}
                                        {/* </div> */}
                                        {/* </div> */}
                                        {/* </CardFooter> */}
                                    </Form>

                                </>

                            </div>
                        </CardBody>

                    </Card></Col></Row>

            {/* Branch Template Start */}
            <Modal isOpen={this.state.isBranchTemplateModalOpen}
                className={'modal-lg modalWidth ' + this.props.className}>
                <ModalHeader>
                    <strong>{i18n.t('static.dataset.BranchTreeTemplate')}</strong>
                    <Button size="md" onClick={() => { this.setState({ isBranchTemplateModalOpen: false, branchTemplateId: "", missingPUList: [] }) }} color="danger" style={{ paddingTop: '0px', paddingBottom: '0px', paddingLeft: '3px', paddingRight: '3px' }} className="submitBtn float-right mr-1"> <i className="fa fa-times"></i></Button>
                </ModalHeader>
                <ModalBody className='pb-lg-0'>
                    {/* <h6 className="red" id="div3"></h6> */}
                    <Col sm={12} style={{ flexBasis: 'auto' }}>
                        {/* <Card> */}
                        <Formik
                            initialValues={{
                                branchTemplateId: this.state.branchTemplateId
                            }}
                            validate={validate(validationSchemaBranch)}
                            onSubmit={(values, { setSubmitting, setErrors }) => {
                                this.generateBranchFromTemplate(this.state.branchTemplateId);
                            }}


                            render={
                                ({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isSubmitting,
                                    isValid,
                                    setTouched,
                                    handleReset,
                                    setFieldValue,
                                    setFieldTouched
                                }) => (
                                    <Form onSubmit={handleSubmit} onReset={handleReset} noValidate name='modalForm' autocomplete="off">
                                        {/* <CardBody> */}
                                        <div className="col-md-12">

                                            <div>
                                                <div className='row'>
                                                    <FormGroup className="col-md-12">
                                                        {/* <Label htmlFor="appendedInputButton">{i18n.t('static.dataset.BranchTreeTemplate')}<span className="red Reqasterisk">*</span></Label><br/> */}
                                                        <p>{i18n.t('static.tree.branchTemplateNotes1') + " "}<b>{this.state.nodeTypeParentNode}</b>{" " + i18n.t('static.tree.branchTemplateNotes2')}{" "}<b>{this.state.possibleNodeTypes.toString()}</b>{" " + i18n.t('static.tree.branchTemplateNotes3')}<a href="/#/dataset/listTreeTemplate">{" " + i18n.t('static.dataset.TreeTemplate')}</a>{" " + i18n.t('static.tree.branchTemplateNotes4')}</p>
                                                        <div className="controls">

                                                            <Input
                                                                type="select"
                                                                name="branchTemplateId"
                                                                id="branchTemplateId"
                                                                bsSize="sm"
                                                                valid={!errors.branchTemplateId && this.state.branchTemplateId != null ? this.state.branchTemplateId : '' != ''}
                                                                invalid={touched.branchTemplateId && !!errors.branchTemplateId}
                                                                onBlur={handleBlur}
                                                                onChange={(e) => { handleChange(e); this.dataChange(e) }}
                                                                value={this.state.branchTemplateId}
                                                            >
                                                                <option value="">{i18n.t('static.dataset.selectBranchTreeTemplate')}</option>
                                                                {this.state.branchTemplateList.length > 0
                                                                    && this.state.branchTemplateList.map((item, i) => {
                                                                        return (
                                                                            <option key={i} value={item.treeTemplateId}>
                                                                                {getLabelText(item.label, this.state.lang)}
                                                                            </option>
                                                                        )
                                                                    }, this)}
                                                            </Input>
                                                            <FormFeedback>{errors.branchTemplateId}</FormFeedback>
                                                        </div>

                                                    </FormGroup>


                                                    <div className="col-md-12 pl-lg-0 pr-lg-0" style={{ display: 'inline-block' }}>
                                                        <div style={{ display: this.state.missingPUList.length > 0 ? 'block' : 'none' }}><div><b>{i18n.t('static.listTree.missingPlanningUnits')} : (<a href="/#/planningUnitSetting/listPlanningUnitSetting" className="supplyplanformulas">{i18n.t('static.Update.PlanningUnits')}</a>)</b></div><br />
                                                            <div id="missingPUJexcel" className="RowClickable">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {(!localStorage.getItem('sessionType') === 'Online' && this.state.missingPUList.length > 0) && <strong>{i18n.t("static.tree.youMustBeOnlineToCreatePU")}</strong>}
                                                </div>
                                                <h5 className="green" style={{ display: "none" }} id="div3">
                                                    {localStorage.getItem('sessionType') === 'Online' && this.state.missingPUList.length > 0 && i18n.t("static.tree.addSuccessMessageSelected")}
                                                    {localStorage.getItem('sessionType') === 'Online' && this.state.missingPUList.length == 0 && i18n.t("static.tree.addSuccessMessageAll")}
                                                    {!localStorage.getItem('sessionType') === 'Online' && this.state.missingPUList.length > 0 && i18n.t("static.tree.updateSuccessMessageSelected")}
                                                    {!localStorage.getItem('sessionType') === 'Online' && this.state.missingPUList.length == 0 && i18n.t("static.tree.updateSuccessMessageAll")}
                                                </h5>
                                            </div>
                                            <FormGroup className="col-md-12 float-right pt-lg-4 pr-lg-0">
                                                <Button type="button" color="danger" className="mr-1 float-right" size="md" onClick={() => { this.setState({ isBranchTemplateModalOpen: false, branchTemplateId: "", missingPUList: [] }) }}><i className="fa fa-times"></i> {i18n.t('static.common.cancel')}</Button>
                                                {this.state.missingPUList.length == 0 && <Button type="submit" color="success" className="mr-1 float-right" size="md" onClick={() => this.touchAllBranch(setTouched, errors)}><i className="fa fa-check"></i>{i18n.t("static.tree.addBranch")}</Button>}
                                                {this.state.missingPUList.length > 0 && <Button type="submit" color="success" className="mr-1 float-right" size="md" onClick={() => this.touchAllBranch(setTouched, errors)}><i className="fa fa-check"></i>{i18n.t("static.tree.addBranchWithoutPU")}</Button>}
                                                {localStorage.getItem('sessionType') === 'Online' && this.state.missingPUList.length > 0 && <Button type="button" color="success" className="mr-1 float-right" size="md" onClick={() => this.saveMissingPUs()}><i className="fa fa-check"></i>{i18n.t("static.tree.addAbovePUs")}</Button>}
                                                {!localStorage.getItem('sessionType') === 'Online' && this.state.missingPUList.length > 0 && <Button type="button" color="success" className="mr-1 float-right" size="md" onClick={() => this.updateMissingPUs()}><i className="fa fa-check"></i>{i18n.t("static.tree.updateSelectedPU")}</Button>}
                                                {this.state.missingPUList.length == 0 && (this.state.branchTemplateId != "" && this.state.branchTemplateId != 0 && this.state.branchTemplateId != undefined) && <strong>{i18n.t("static.tree.allTemplatePUAreInProgram")}</strong>}
                                                &nbsp;
                                            </FormGroup>
                                        </div>
                                    </Form>

                                )} />

                        {/* </Card> */}
                    </Col>
                    <br />
                </ModalBody>
            </Modal>

            {/* Branch Template end */}
            <Modal isOpen={this.state.showGuidanceModelingTransfer}
                className={'modal-lg ' + this.props.className} >
                <ModalHeader toggle={() => this.toggleShowGuidanceModelingTransfer()} className="ModalHead modal-info-Headher">
                    <strong className="TextWhite">{i18n.t('static.common.showGuidance')}</strong>
                </ModalHeader>
                <div>
                    <ModalBody className="ModalBodyPadding">
                        <div dangerouslySetInnerHTML={{
                            __html: localStorage.getItem('lang') == 'en' ?
                                showguidanceModelingTransferEn :
                                localStorage.getItem('lang') == 'fr' ?
                                    showguidanceModelingTransferFr :
                                    localStorage.getItem('lang') == 'sp' ?
                                        showguidanceModelingTransferSp :
                                        showguidanceModelingTransferPr
                        }} />
                        {/* <div>
                            <h3 className='ShowGuidanceHeading'>{i18n.t('static.ModelingTransfer.ModelingTransfer')} </h3>
                        </div>
                        <p>
                            <p style={{ fontSize: '14px' }}><span className="UnderLineText">{i18n.t('static.listTree.purpose')} :</span>{i18n.t('static.ModelingTransfer.NodeChange')} </p>
                        </p>

                        <p>
                            <p style={{ fontSize: '14px' }}><span className="UnderLineText">{i18n.t('static.ModelingTransfer.UsingThisTab')} :</span>
                                <br></br>{i18n.t('static.ModelingTransfer.ModelingTypes')}: </p>
                        </p>

                        <p>

                            <div className='pl-lg-4 pr-lg-4'>
                                <table className="table table-bordered ">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '130px' }}>{i18n.t('static.ModelingTransfer.ModelingType')}</th>
                                            <th># {i18n.t('static.ModelingTransfer.NodeCalculation')}</th>
                                            <th>% {i18n.t('static.ModelingTransfer.NodeCalculation')}</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{i18n.t('static.ModelingTransfer.Linear')} (#)</td>
                                            <td>+/- {i18n.t('static.ModelingTransfer.StaticNumber')}</td>
                                            <td>{i18n.t('static.ModelingTransfer.NA')}</td>

                                        </tr>
                                        <tr>
                                            <td>{i18n.t('static.ModelingTransfer.Linear')} (%)</td>
                                            <td>+/- {i18n.t('static.ModelingTransfer.PercentageMonth')}</td>
                                            <td>{i18n.t('static.ModelingTransfer.NA')}</td>

                                        </tr>
                                        <tr>
                                            <td>{i18n.t('static.ModelingTransfer.Exponential')} (%)</td>
                                            <td>+/- {i18n.t('static.ModelingTransfer.RollingPercentage')}</td>
                                            <td>{i18n.t('static.ModelingTransfer.NA')}</td>

                                        </tr>
                                        <tr>
                                            <td>{i18n.t('static.ModelingTransfer.Linear')} (% point)</td>
                                            <td>{i18n.t('static.ModelingTransfer.NA')}</td>
                                            <td>+/- {i18n.t('static.ModelingTransfer.StaticEachMonth')}</td>

                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </p>

                        <p><b><i class="fa fa-calculator" aria-hidden="true"></i></b> {i18n.t('static.ModelingTransfer.CalculatorTool')}<br>
                        </br>Additionally, by clicking on “Show Monthly Data,” users can see how their modelling and transfer inputs have affected the monthly data in both a graphical and tabular form. In the tabular data, users may add a manual change for a specific month or input a seasonality index percentage (only available for # nodes), as needed. If a user checks “Manual Change affects future month,” the manual amount added to the end of the month will carry over to the beginning of the next month. If neither of these fields are relevant, users can uncheck “Show (seasonality &) manual change” to hide these columns.
                        </p>

                        <p><span style={{ fontSize: '14px' }} className="UnderLineText">{i18n.t('static.ModelingTransfer.RulesTransfer')}:</span>
                            <ul>

                                <li>{i18n.t('static.ModelingTransfer.NumberNode')}</li>
                                <li>Percentage nodes can only transfer to other percentage nodes and must belong to the same parent. </li>
                                <li>The order of operations for calculating a transfer occurs from the left to the right in the forecast tree. A transfer cannot be made from right to left, thus a user should be careful when designing their tree and determining where each node should be placed. </li>
                                <li>Transfers are always negative from the source node and positive to the destination node. </li>
                                <li>Extrapolation is not allowed on a node that also has a transfer, whether that be to/from another node. </li>
                                
                            </ul>
                        </p>
                        <p><span style={{ fontSize: '14px' }} className="UnderLineText">{i18n.t('static.ModelingTransfer.Examples')} :</span>
                            <ul>
                                <li><b>{i18n.t('static.ModelingTransfer.SimpleGrowth')}</b> {i18n.t('static.ModelingTransfer.PopulationGrowth')}
                                    <br></br>
                                    <span><img className="formula-img-mr img-fluid mb-lg-0 mt-lg-0" src={ModelingTransferScreenshot1} style={{ border: '1px solid #fff' }} /></span>
                                </li>
                                <li><b>{i18n.t('static.ModelingTransfer.SimpleLoss')}</b> {i18n.t('static.ModelingTransfer.AttritionHash')}
                                    <br></br>
                                    <span><img className="formula-img-mr img-fluid mb-lg-0 mt-lg-0" src={ModelingTransferScreenshot2} style={{ border: '1px solid #fff' }} /></span>
                                </li>
                                <li><b>{i18n.t('static.ModelingTransfer.SimpleGrowth')}</b> {i18n.t('static.ModelingTransfer.PopulationPercentage')}
                                    <br></br>
                                    <span><img className="formula-img-mr img-fluid mb-lg-0 mt-lg-0" src={ModelingTransferScreenshot3} style={{ border: '1px solid #fff' }} /></span>
                                </li>
                                <li><b>{i18n.t('static.ModelingTransfer.SimpleGrowth')}</b> {i18n.t('static.ModelingTransfer.SimpleGrowthExponential')}

                                    <span><img className="formula-img-mr img-fluid mb-lg-0 mt-lg-0 ml-lg-2" src={ModelingTransferScreenshot4} style={{ border: '1px solid #fff' }} /></span>
                                    <ul>
                                        <li>{i18n.t('static.ModelingTransfer.calculatesJanMonth')} </li>
                                        <li>{i18n.t('static.ModelingTransfer.calculatesFebMonth')} </li>
                                        <li>{i18n.t('static.ModelingTransfer.calculatesMarMonth')}  </li>
                                    </ul>

                                </li>
                                <br></br>
                                <li><b>{i18n.t('static.ModelingTransfer.MultiYearLoss')}</b> - {i18n.t('static.ModelingTransfer.MultiYearLossText')}
                                    <br></br>
                                    <span><img className="formula-img-mr img-fluid mb-lg-0 mt-lg-0 ml-lg-2" src={ModelingTransferScreenshot5} style={{ border: '1px solid #fff' }} /></span>
                                </li>
                                <li><b>{i18n.t('static.ManageTree.Transfer')}</b> - {i18n.t('static.ModelingTransfer.TransferText')}
                                    <br></br>
                                    <span><img className="formula-img-mr img-fluid mb-lg-0 mt-lg-0" src={ModelingTransferScreenshot6} style={{ border: '1px solid #fff' }} /></span>
                                </li>
                            </ul>
                        </p> */}

                    </ModalBody>
                </div>
            </Modal>
            <Modal isOpen={this.state.showGuidanceNodeData}
                className={'modal-lg ' + this.props.className} >
                <ModalHeader toggle={() => this.toggleShowGuidanceNodeData()} className="ModalHead modal-info-Headher">
                    <strong className="TextWhite">{i18n.t('static.common.showGuidance')}</strong>
                </ModalHeader>
                <div>
                    <ModalBody className="ModalBodyPadding">
                        <div dangerouslySetInnerHTML={{
                            __html: localStorage.getItem('lang') == 'en' ?
                                showguidanceAddEditNodeDataEn :
                                localStorage.getItem('lang') == 'fr' ?
                                    showguidanceAddEditNodeDataFr :
                                    localStorage.getItem('lang') == 'sp' ?
                                        showguidanceAddEditNodeDataSp :
                                        showguidanceAddEditNodeDataPr
                        }} />
                        {/* <ModalBody>
                        <div>
                            <h3 className='ShowGuidanceHeading'>{i18n.t('static.NodeData.AddEditNode')}</h3>
                        </div>
                        <p>
                            <p style={{ fontSize: '14px' }}><span className="UnderLineText">{i18n.t('static.listTree.purpose')} :</span>{i18n.t('static.NodeData.TypeOfNode')}</p>
                        </p>

                        <p>
                            <p style={{ fontSize: '14px', fontWeight: 'bold' }}><span className="">{i18n.t('static.ManageTree.NodeType')}:</span></p>
                            <div className='pl-lg-4 pr-lg-4'>
                                <table className="table table-bordered ">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '130px' }}>{i18n.t('static.ManageTree.NodeType')}</th>
                                            <th>{i18n.t('static.ManageTree.Value')}</th>
                                            <th>{i18n.t('static.ManageTree.PotentialChildren')}</th>
                                            <th>{i18n.t('static.ManageTree.AdvancedFunctionality')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className='BgLightBlue'><b>{i18n.t('static.ManageTree.Aggregation')} ∑</b></td>
                                            <td>{i18n.t('static.ManageTree.SumofChildren')}</td>
                                            <td><b style={{ color: '#002f6c' }}>∑</b> {i18n.t('static.ManageTree.orNumber')}</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td className='BgLightBlue'><b>{i18n.t('static.ManageTree.NumberHash')} #</b></td>
                                            <td>{i18n.t('static.ManageTree.DefinedNode')}</td>
                                            <td>% or <b style={{ background: '#fff', color: '#002f6c', padding: '3px' }}><i class="fa fa-cube" aria-hidden="true"></i></b></td>
                                            <td><i class="fa fa-exchange fa-rotate-90" aria-hidden="true"></i>,<i className='fa fa-link'></i>, <i className='fa fa-line-chart'></i></td>
                                        </tr>
                                        <tr>
                                            <td className='BgLightBlue'><b>{i18n.t('static.ManageTree.Percentage')} %</b></td>
                                            <td>{i18n.t('static.ManageTree.DefinedPercentageParent')}</td>
                                            <td>% or <b style={{ background: '#fff', color: '#002f6c', padding: '3px' }}><i class="fa fa-cube" aria-hidden="true"></i></b></td>
                                            <td><i class="fa fa-exchange fa-rotate-90" aria-hidden="true"></i>,<i className='fa fa-link'></i></td>
                                        </tr>
                                        <tr>
                                            <td className='BgDarkBlue'><b>{i18n.t('static.ManageTree.ForecastingUnit')} <i class="fa fa-cube" aria-hidden="true"></i></b></td>
                                            <td>{i18n.t('static.ManageTree.DefinedAsPercentage')}</td>
                                            <td><b style={{ background: '#fff', color: '#002f6c', padding: '3px' }}><i class="fa fa-cubes" aria-hidden="true"></i></b></td>
                                            <td><i class="fa fa-exchange fa-rotate-90" aria-hidden="true"></i>,<i className='fa fa-link'></i></td>
                                        </tr>
                                        <tr>
                                            <td className='BgDarkBlue'><b>{i18n.t('static.ManageTree.PlanningUnit')} <i class="fa fa-cubes" aria-hidden="true"></i></b></td>
                                            <td>{i18n.t('static.ManageTree.PlanningUnitParameters')}</td>
                                            <td>-</td>
                                            <td><i class="fa fa-exchange fa-rotate-90" aria-hidden="true"></i>,<i className='fa fa-link'></i></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </p>

                        <p><span style={{ fontSize: '14px', fontWeight: 'bold' }}>{i18n.t('static.ManageTree.ChangesOverTime')}</span><br></br>
                            {i18n.t('static.NodeData.TreeStructure')}:
                            <ul>
                                <li><b>{i18n.t('static.NodeData.ModelingTransferTab')}</b> </li>
                                <ul>
                                    <li><b><i class="fa fa-exchange fa-rotate-90" aria-hidden="true"></i> {i18n.t('static.ManageTree.Modeling')}:</b> {i18n.t('static.ManageTree.RateOfChange')}</li>
                                    <li><b><i className='fa fa-link'></i> {i18n.t('static.ManageTree.Transfer')}:</b> {i18n.t('static.NodeData.AllowsUsersTransfer')} </li>
                                </ul>
                                <li><b>{i18n.t('static.NodeData.ExtrapolationTab')}</b> {i18n.t('static.NodeData.NumberNodes')}</li>
                                <ul>
                                    <li><b><i className='fa fa-line-chart'></i> {i18n.t('static.ManageTree.Extrapolation')}:</b> {i18n.t('static.NodeData.ExtrapolationData')}</li>
                                </ul>
                            </ul>
                            <p>{i18n.t('static.NodeData.NoChange')}</p>
                        </p>

                        <p><span style={{ fontSize: '14px', fontWeight: 'bold' }}>{i18n.t('static.ManageTree.UsingScenarios')} :</span>
                            {i18n.t('static.NodeData.ScenariosSameTree')}
                            <div className='pl-lg-4 pr-lg-4 pt-lg-4'>
                                <table className="table table-bordered ">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '130px' }}>{i18n.t('static.ManageTree.FixedScenarios')}</th>
                                            <th style={{ width: '230px' }}>{i18n.t('static.ManageTree.UniqueScenario')}</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{i18n.t('static.ManageTree.TreeStructure')}</td>
                                            <td>{i18n.t('static.ManageTree.NodeValue')}</td>


                                        </tr>
                                        <tr>
                                            <td>{i18n.t('static.ManageTree.NodeTitle')}</td>
                                            <td>{i18n.t('static.ManageTree.Month')}</td>


                                        </tr>
                                        <tr>
                                            <td>{i18n.t('static.ManageTree.NodeType')}</td>
                                            <td>{i18n.t('static.ManageTree.Notes')}</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>{i18n.t('static.ManageTree.Mte')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </p>
                        <p><span style={{ fontSize: '14px' }} classNames="UnderLineText"><b>{i18n.t('static.NodeData.TipsUseCases')}:</b></span>
                            <ul>
                                <li><b> {i18n.t('static.NodeData.ForecastingNodeType')} :</b> {i18n.t('static.NodeData.SelectDiscrete')}</li>
                                <li><b> {i18n.t('static.NodeData.DelayedPhased')}</b> {i18n.t('static.NodeData.ProductConsumption')} <b> {i18n.t('static.ManageTree.ForecastingUnit')} </b>{i18n.t('static.NodeData.NodeUse')} <b>{i18n.t('static.NodeData.Lag')}</b> {i18n.t('static.NodeData.indicateDelay')}.
                                    <ul>
                                        <li>{i18n.t('static.NodeData.ForExampleProduct')}  </li>
                                        <li>{i18n.t('static.NodeData.ProductSwitches')}</li>
                                    </ul>
                                </li>
                                <li><b> {i18n.t('static.NodeData.MultiMonth')}</b> {i18n.t('static.NodeData.ProductActually')} <b>{i18n.t('static.NodeData.PlanningUnitNode')}</b>, {i18n.t('static.NodeData.Usethe')} <b>{i18n.t('static.NodeData.ConsumptionInterval')}</b> {i18n.t('static.NodeData.FieldIndicate')}</li>
                                <li><b>{i18n.t('static.NodeData.RepeatingForecasting')}</b> {i18n.t('static.NodeData.multipleForecasting')} <a href='/#/usageTemplate/listUsageTemplate' target="_blank" style={{ textDecoration: 'underline' }}>{i18n.t('static.usageTemplate.usageTemplate')} </a>{i18n.t('static.NodeData.CommonUsages')} </li>
                            </ul>
                        </p> */}

                    </ModalBody>
                </div>
            </Modal>
            <Modal isOpen={this.state.showGuidance}
                className={'modal-lg ' + this.props.className} >
                <ModalHeader toggle={() => this.toggleShowGuidance()} className="ModalHead modal-info-Headher">
                    <strong className="TextWhite">{i18n.t('static.common.showGuidance')}</strong>
                </ModalHeader>
                <div>
                    <ModalBody className="ModalBodyPadding">
                        <div dangerouslySetInnerHTML={{
                            __html: localStorage.getItem('lang') == 'en' ?
                                showguidanceBuildTreeEn :
                                localStorage.getItem('lang') == 'fr' ?
                                    showguidanceBuildTreeFr :
                                    localStorage.getItem('lang') == 'sp' ?
                                        showguidanceBuildTreeSp :
                                        showguidanceBuildTreePr
                        }} />
                        {/* <div>
                            <h3 className='ShowGuidanceHeading'>{i18n.t('static.ManageTree.BuildTree')}</h3>
                        </div>
                        <p>
                            <p style={{ fontSize: '14px' }}><span className="UnderLineText">{i18n.t('static.listTree.purpose')} :</span>{i18n.t('static.ManageTree.EnableUsersManage')}</p>
                        </p>
                        <p>
                            <p style={{ fontSize: '14px' }}><span className="UnderLineText">{i18n.t('static.listTree.useThisScreen')} :</span><br></br>
                                <span style={{ fontWeight: 'bold' }}>{i18n.t('static.ManageTree.ManageTheTree')}:</span> {i18n.t('static.ManageTree.ClickOnGearIcon')} <i class="fa fa-cog" aria-hidden="true"></i> {i18n.t('static.ManageTree.ShowHideForecastMethod')}
                            </p>
                            <p><span style={{ fontWeight: 'bold', fontSize: '14px' }}>{i18n.t('static.ManageTree.BuildingTheTree')}:</span>{i18n.t('static.ManageTree.ForecastTreeBuilt')}  </p>
                        </p>
                        <p>
                            <p style={{ fontSize: '14px', fontWeight: 'bold' }}><span className="">{i18n.t('static.ManageTree.NodeAction')} :</span></p>

                            <ul className='pl-lg-4'>
                                <li><i class="fa fa-trash-o" aria-hidden="true" style={{ color: '#002f6c' }}></i> {i18n.t('static.ManageTree.Delete')} </li>
                                <li><i class="fa fa-clone" aria-hidden="true" style={{ color: '#002f6c' }}></i> {i18n.t('static.ManageTree.Duplicate')} </li>
                                <li><i class="fa fa-plus-square-o" aria-hidden="true" style={{ color: '#002f6c' }}></i> {i18n.t('static.ManageTree.Add')}</li>

                            </ul>

                        </p>
                        <p>
                            <p style={{ fontSize: '14px', fontWeight: 'bold' }}><span className="">{i18n.t('static.ManageTree.NodeType')}  :</span></p>
                            <div className='pl-lg-4 pr-lg-4'>
                                <table className="table table-bordered ">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '130px' }}>{i18n.t('static.ManageTree.NodeType')}</th>
                                            <th>{i18n.t('static.ManageTree.Value')} </th>
                                            <th>{i18n.t('static.ManageTree.PotentialChildren')}</th>
                                            <th>{i18n.t('static.ManageTree.AdvancedFunctionality')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className='BgLightBlue'><b>{i18n.t('static.ManageTree.Aggregation')} ∑</b></td>
                                            <td>{i18n.t('static.ManageTree.SumofChildren')}</td>
                                            <td><b style={{ color: '#002f6c' }}>∑</b> {i18n.t('static.ManageTree.orNumber')}</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td className='BgLightBlue'><b>{i18n.t('static.ManageTree.NumberHash')} #</b></td>
                                            <td>{i18n.t('static.ManageTree.DefinedNode')}</td>
                                            <td>% or <b style={{ background: '#fff', color: '#002f6c', padding: '3px' }}><i class="fa fa-cube" aria-hidden="true"></i></b></td>
                                            <td><i class="fa fa-exchange fa-rotate-90" aria-hidden="true"></i>,<i className='fa fa-link'></i>, <i className='fa fa-line-chart'></i></td>
                                        </tr>
                                        <tr>
                                            <td className='BgLightBlue'><b>{i18n.t('static.ManageTree.Percentage')} %</b></td>
                                            <td>{i18n.t('static.ManageTree.DefinedPercentageParent')}</td>
                                            <td>% or <b style={{ background: '#fff', color: '#002f6c', padding: '3px' }}><i class="fa fa-cube" aria-hidden="true"></i></b></td>
                                            <td><i class="fa fa-exchange fa-rotate-90" aria-hidden="true"></i>,<i className='fa fa-link'></i></td>
                                        </tr>
                                        <tr>
                                            <td className='BgDarkBlue'><b>{i18n.t('static.ManageTree.ForecastingUnit')} <i class="fa fa-cube" aria-hidden="true"></i></b></td>
                                            <td>{i18n.t('static.ManageTree.DefinedAsPercentage')}</td>
                                            <td><b style={{ background: '#fff', color: '#002f6c', padding: '3px' }}><i class="fa fa-cubes" aria-hidden="true"></i></b></td>
                                            <td><i class="fa fa-exchange fa-rotate-90" aria-hidden="true"></i>,<i className='fa fa-link'></i></td>
                                        </tr>
                                        <tr>
                                            <td className='BgDarkBlue'><b>{i18n.t('static.ManageTree.PlanningUnit')} <i class="fa fa-cubes" aria-hidden="true"></i></b></td>
                                            <td>{i18n.t('static.ManageTree.PlanningUnitParameters')}</td>
                                            <td>-</td>
                                            <td><i class="fa fa-exchange fa-rotate-90" aria-hidden="true"></i>,<i className='fa fa-link'></i></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </p>

                        <p><span style={{ fontSize: '14px', fontWeight: 'bold' }}>{i18n.t('static.ManageTree.ChangesOverTime')}</span><br></br>
                            {i18n.t('static.ManageTree.TreeStructure')} :
                            <ul>
                                <li><b><i class="fa fa-exchange fa-rotate-90" aria-hidden="true"></i> {i18n.t('static.ManageTree.Modeling')}:</b> {i18n.t('static.ManageTree.RateOfChange')}</li>
                                <li><b><i className='fa fa-link'></i> {i18n.t('static.ManageTree.Transfer')}:</b> {i18n.t('static.ManageTree.AllowsUsersTransfer')}</li>
                                <li><b><i className='fa fa-line-chart'></i> {i18n.t('static.ManageTree.Extrapolation')}:</b> {i18n.t('static.ManageTree.AllowsExtrapolation')}</li>
                            </ul>
                        </p>

                        <p><span style={{ fontSize: '14px', fontWeight: 'bold' }}>{i18n.t('static.ManageTree.UsingScenarios')} :</span><br></br>
                            {i18n.t('static.ManageTree.ScenariosModel')} <i class="fa fa-cog" aria-hidden="true"></i> {i18n.t('static.ManageTree.IconScenario')}.
                            <div className='pl-lg-4 pr-lg-4 pt-lg-4'>
                                <table className="table table-bordered ">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '130px' }}>{i18n.t('static.ManageTree.FixedScenarios')}</th>
                                            <th style={{ width: '230px' }}>{i18n.t('static.ManageTree.UniqueScenario')}</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{i18n.t('static.ManageTree.TreeStructure')}</td>
                                            <td>{i18n.t('static.ManageTree.NodeValue')}</td>


                                        </tr>
                                        <tr>
                                            <td>{i18n.t('static.ManageTree.NodeTitle')}</td>
                                            <td>{i18n.t('static.ManageTree.Month')}</td>


                                        </tr>
                                        <tr>
                                            <td>{i18n.t('static.ManageTree.NodeType')}</td>
                                            <td>{i18n.t('static.ManageTree.Notes')}</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>{i18n.t('static.ManageTree.Mte')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </p> */}

                    </ModalBody>
                </div>
            </Modal>

            {/* tree fields Modal start------------------- */}
            <Draggable handle=".modal-title">
                <Modal isOpen={this.state.openTreeDataModal}
                    className={'modal-md '} >
                    <ModalHeader className="modalHeaderSupplyPlan hideCross">
                        <strong>{i18n.t('static.tree.Add/EditTreeData')}</strong>
                        <Button size="md" onClick={() => this.setState({ openTreeDataModal: false })} color="danger" style={{ paddingTop: '0px', paddingBottom: '0px', paddingLeft: '3px', paddingRight: '3px' }} className="submitBtn float-right mr-1"> <i className="fa fa-times"></i></Button>
                    </ModalHeader>
                    <ModalBody>
                        {/* <FormGroup className="col-md-12">
                            <Label htmlFor="currencyId">Program<span class="red Reqasterisk">*</span></Label>
                            <InputGroup>
                                <Input
                                    type="select"
                                    name="datasetId"
                                    id="datasetId"
                                    bsSize="sm"
                                    value={this.state.programId}
                                    onChange={(e) => { this.setStartAndStopDateOfProgram(e.target.value) }}
                                >
                                    <option value="">{i18n.t('static.common.pleaseSelect')}</option>
                                    {datasets}
                                </Input>
                            </InputGroup>

                        </FormGroup> */}
                        <FormGroup className="col-md-12">
                            <Label htmlFor="currencyId">{i18n.t('static.forecastMethod.forecastMethod')}<span class="red Reqasterisk">*</span></Label>
                            <Input
                                type="select"
                                name="forecastMethodId1"
                                id="forecastMethodId1"
                                bsSize="sm"
                                onChange={(e) => { this.treeDataChange(e) }}
                                required
                                value={this.state.curTreeObj.forecastMethod != null ? this.state.curTreeObj.forecastMethod.id : ''}
                            >
                                <option value="-1">{i18n.t('static.common.forecastmethod')}</option>
                                {forecastMethods}
                            </Input>
                        </FormGroup>
                        <FormGroup className="col-md-12">
                            <Label htmlFor="currencyId">{i18n.t('static.common.treeName')}<span class="red Reqasterisk">*</span></Label>
                            <Input type="text"
                                id="treeName"
                                name="treeName"
                                bsSize="sm"
                                onChange={(e) => { this.treeDataChange(e) }}
                                value={this.state.curTreeObj.label != null ? this.state.curTreeObj.label.label_en : ''}
                            ></Input>
                        </FormGroup>
                        <FormGroup className="col-md-12">
                            <Label htmlFor="currencyId">{i18n.t('static.region.region')}<span class="red Reqasterisk">*</span></Label>
                            <div className="controls ">
                                {/* <InMultiputGroup> */}
                                <MultiSelect
                                    // type="select"
                                    name="regionId2"
                                    id="regionId2"
                                    bsSize="sm"
                                    value={this.state.regionValues}
                                    onChange={(e) => { this.handleRegionChange(e) }}
                                    options={regionMultiList && regionMultiList.length > 0 ? regionMultiList : []}
                                    labelledBy={i18n.t('static.common.regiontext')}
                                />
                            </div>
                        </FormGroup>
                        <FormGroup className="col-md-12">
                            <Label htmlFor="currencyId">{i18n.t('static.common.note')}</Label>
                            <Input type="textarea"
                                id="treeNotes"
                                name="treeNotes"
                                onChange={(e) => { this.treeDataChange(e) }}
                                value={this.state.curTreeObj.notes != "" ? this.state.curTreeObj.notes : ''}
                            ></Input>
                        </FormGroup>
                        <FormGroup className="col-md-12">
                            <Label className="P-absltRadio">{i18n.t('static.common.status')}</Label>
                            <FormGroup check inline>
                                <Input
                                    className="form-check-input"
                                    type="radio"
                                    id="active10"
                                    name="active"
                                    value={true}
                                    checked={this.state.curTreeObj.active === true}
                                    onChange={(e) => { this.treeDataChange(e) }}
                                />
                                <Label
                                    className="form-check-label"
                                    check htmlFor="inline-radio1">
                                    {i18n.t('static.common.active')}
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Input
                                    className="form-check-input"
                                    type="radio"
                                    id="active11"
                                    name="active"
                                    value={false}
                                    checked={this.state.curTreeObj.active === false}
                                    onChange={(e) => { this.treeDataChange(e) }}
                                />
                                <Label
                                    className="form-check-label"
                                    check htmlFor="inline-radio2">
                                    {i18n.t('static.common.disabled')}
                                </Label>
                            </FormGroup>
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" size="md" onClick={(e) => { this.createOrUpdateTree() }} color="success" className="submitBtn float-right mr-1"> <i className="fa fa-check"></i>{i18n.t('static.common.update')}</Button>
                        <Button size="md" color="danger" className="submitBtn float-right mr-1" onClick={() => this.setState({ openTreeDataModal: false })}> <i className="fa fa-times"></i> {i18n.t('static.common.cancel')}</Button>
                    </ModalFooter>
                </Modal>
            </Draggable>
            {/* Scenario Modal start------------------- */}
            <Draggable handle=".modal-title">
                <Modal isOpen={this.state.openAddScenarioModal}
                    className={'modal-md '} >
                    <ModalHeader className="modalHeaderSupplyPlan hideCross">
                        {this.state.scenarioActionType == 1 && <strong>{i18n.t("static.tree.addScenario")}</strong>}
                        {this.state.scenarioActionType == 2 && <strong>{i18n.t("static.tree.editScenario")}</strong>}
                        <Button size="md" onClick={this.openScenarioModal} color="danger" style={{ paddingTop: '0px', paddingBottom: '0px', paddingLeft: '3px', paddingRight: '3px' }} className="submitBtn float-right mr-1"> <i className="fa fa-times"></i></Button>
                    </ModalHeader>
                    <ModalBody>
                        {/* Validation start */}
                        <Formik
                            enableReinitialize={true}
                            initialValues={{
                                scenarioName: this.state.scenario.label.label_en
                            }}
                            validate={validate(validationSchemaScenario)}
                            onSubmit={(values, { setSubmitting, setErrors }) => {
                                this.addScenario();
                            }}
                            render={
                                ({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isSubmitting,
                                    isValid,
                                    setTouched,
                                    handleReset,
                                    setFieldValue,
                                    setFieldTouched
                                }) => (
                                    <Form onSubmit={handleSubmit} onReset={handleReset} noValidate name='userForm' autocomplete="off">
                                        <FormGroup>
                                            <Label htmlFor="currencyId">{i18n.t('static.tree.scenarioName')}<span class="red Reqasterisk">*</span></Label>
                                            <Input type="text"
                                                id="scenarioName"
                                                name="scenarioName"
                                                valid={!errors.scenarioName && this.state.scenario.label.label_en != null ? this.state.scenario.label.label_en : '' != ''}
                                                invalid={touched.scenarioName && !!errors.scenarioName}
                                                onBlur={handleBlur}
                                                onChange={(e) => { handleChange(e); this.scenarioChange(e) }}
                                                value={this.state.scenario.label.label_en}
                                            ></Input>
                                            <FormFeedback>{errors.scenarioName}</FormFeedback>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="currencyId">{i18n.t('static.common.note')}</Label>
                                            <Input type="text"
                                                id="scenarioDesc"
                                                name="scenarioDesc"
                                                onChange={(e) => { this.scenarioChange(e) }}
                                                value={this.state.scenario.notes}
                                            ></Input>
                                        </FormGroup>
                                        <FormGroup className="col-md-6 pt-lg-4 float-right">
                                            <Button size="md" color="danger" className="submitBtn float-right mr-1" onClick={this.openScenarioModal}> <i className="fa fa-times"></i> {i18n.t('static.common.cancel')}</Button>
                                            <Button type="submit" size="md" onClick={() => this.touchAllScenario(setTouched, errors)} color="success" className="submitBtn float-right mr-1"> <i className="fa fa-check"></i> {i18n.t('static.common.submit')}</Button>
                                        </FormGroup>
                                    </Form>
                                )} />
                    </ModalBody>
                    {/* <ModalFooter> */}
                    {/* <Button type="submit" size="md" onClick={this.addScenario} color="success" className="submitBtn float-right mr-1"> <i className="fa fa-check"></i>{i18n.t('static.common.submit')}</Button>
                        <Button size="md" color="danger" className="submitBtn float-right mr-1" onClick={this.openScenarioModal}> <i className="fa fa-times"></i> {i18n.t('static.common.cancel')}</Button> */}
                    {/* </ModalFooter> */}
                </Modal>
            </Draggable>
            {/* Modal end------------------------ */}
            {/* Modal start------------------- */}
            {/* <Draggable handle=".modal-title"> */}
            <Modal isOpen={this.state.openAddNodeModal}
                className={'modal-xl '} >
                <ModalHeader className="modalHeaderSupplyPlan hideCross">
                    <strong>{i18n.t('static.tree.Add/EditNode')}</strong>
                    {<div className="HeaderNodeText"> {
                        <>
                            <Popover placement="top" isOpen={this.state.popoverOpenSenariotree} target="Popover1" trigger="hover" toggle={this.toggleSenariotree}>
                                <PopoverBody>{i18n.t('static.tooltip.scenario')}</PopoverBody>
                            </Popover>
                            <span htmlFor="currencyId">{i18n.t('static.whatIf.scenario')} <i class="fa fa-info-circle icons pl-lg-2" id="Popover1" onClick={this.toggleSenariotree} aria-hidden="true" style={{ color: '#002f6c', cursor: 'pointer' }}></i></span>
                            <b className="supplyplanformulas ScalingheadTitle">{this.state.selectedScenarioLabel}</b>
                        </>
                    }</div>}

                    {<div className="HeaderNodeText"> {
                        this.state.currentItemConfig.context.payload.nodeType.id == 2 ? <i class="fa fa-hashtag" style={{ fontSize: '11px', color: '#20a8d8' }}></i> :
                            (this.state.currentItemConfig.context.payload.nodeType.id == 3 ? <i class="fa fa-percent " style={{ fontSize: '11px', color: '#20a8d8' }} ></i> :
                                (this.state.currentItemConfig.context.payload.nodeType.id == 4 ? <i class="fa fa-cube" style={{ fontSize: '11px', color: '#20a8d8' }} ></i> :
                                    (this.state.currentItemConfig.context.payload.nodeType.id == 5 ? <i class="fa fa-cubes" style={{ fontSize: '11px', color: '#20a8d8' }} ></i> :
                                        (this.state.currentItemConfig.context.payload.nodeType.id == 1 ? <i><img src={AggregationNode} className="AggregationNodeSize" /></i> : "")
                                    )))}
                        <b className="supplyplanformulas ScalingheadTitle">{this.state.currentItemConfig.context.payload.label.label_en}</b></div>}
                    <Button size="md" onClick={() => {
                        if (this.state.isChanged == true || this.state.isTreeDataChanged == true || this.state.isScenarioChanged == true) {
                            var cf = window.confirm(i18n.t("static.dataentry.confirmmsg"));
                            if (cf == true) {
                                this.setState({
                                    openAddNodeModal: false, cursorItem: 0, isChanged: false,
                                    highlightItem: 0, activeTab1: new Array(3).fill('1'),
                                    modelingTabChanged: false
                                })
                            } else {

                            }
                        } else {
                            this.setState({
                                openAddNodeModal: false, cursorItem: 0, isChanged: false,
                                highlightItem: 0, activeTab1: new Array(3).fill('1'),
                                modelingTabChanged: false
                            })
                        }

                    }

                    }
                        color="danger" style={{ paddingTop: '0px', paddingBottom: '0px', paddingLeft: '3px', paddingRight: '3px' }}
                        className="submitBtn float-right mr-1"> <i className="fa fa-times"></i></Button>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col xs="12" md="12" className="mb-4">

                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        active={this.state.activeTab1[0] === '1'}
                                        onClick={() => { this.toggleModal(0, '1'); }}
                                    >
                                        {i18n.t('static.tree.nodeData')}
                                    </NavLink>
                                </NavItem>
                                <NavItem style={{ display: !this.state.currentScenario.extrapolation || this.state.currentItemConfig.context.payload.nodeType.id != 2 ? 'block' : 'none' }}>
                                    {/* {this.state.currentItemConfig.context.payload.extrapolation == false || this.state.currentItemConfig.context.payload.nodeType.id != 2 && */}
                                    {/* <NavItem> */}
                                    <NavLink
                                        active={this.state.activeTab1[0] === '2'}
                                        onClick={() => { this.toggleModal(0, '2'); }}
                                    >
                                        {i18n.t('static.tree.Modeling/Transfer')}
                                    </NavLink>
                                </NavItem>
                                {/* } */}

                                <NavItem style={{ display: this.state.currentScenario.extrapolation && this.state.currentItemConfig.context.payload.nodeType.id == 2 ? 'block' : 'none' }}>
                                    <NavLink
                                        active={this.state.activeTab1[0] === '3'}
                                        onClick={() => { this.toggleModal(0, '3'); }}
                                    >
                                        {/* {i18n.t('static.tree.extrapolation')} */}
                                        Extrapolation
                                    </NavLink>
                                </NavItem>

                                <div style={{ display: this.state.currentItemConfig.context.payload.nodeType.id == 2 ? "block" : "none" }}>
                                    <div style={{ marginLeft: '34px', marginTop: '8px' }}>
                                        <Input
                                            className="form-check-input checkboxMargin"
                                            type="checkbox"
                                            id="extrapolate"
                                            name="extrapolate"
                                            // checked={true}
                                            checked={this.state.currentScenario.extrapolation}
                                            onClick={(e) => { this.extrapolate(e); }}
                                        />
                                        <Label
                                            className="form-check-label"
                                            check htmlFor="inline-radio2" style={{ fontSize: '12px' }}>
                                            <b>{i18n.t('static.tree.extrapolate')}</b>
                                        </Label>
                                    </div>
                                </div>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab1[0]}>
                                {this.tabPane1()}
                            </TabContent>
                        </Col>
                    </Row>

                </ModalBody>
                <ModalFooter>
                    {/* <Button size="md" onClick={(e) => {
                        this.state.addNodeFlag ? this.onAddButtonClick(this.state.currentItemConfig) : this.updateNodeInfoInJson(this.state.currentItemConfig)
                    }} color="success" className="submitBtn float-right mr-1" type="button"> <i className="fa fa-check"></i>Submit</Button>
                    <Button size="md" color="danger" className="submitBtn float-right mr-1" onClick={() => this.setState({ openAddNodeModal: false })}> <i className="fa fa-times"></i> {i18n.t('static.common.cancel')}</Button> */}
                </ModalFooter>
            </Modal>
            {/* </Draggable > */}
            {/* Scenario Modal end------------------------ */}
            {/* Modal for level */}
            <Modal isOpen={this.state.levelModal}
                className={'modal-md'}>
                {/* Validation start */}
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        levelName: this.state.levelName
                    }}
                    validate={validate(validationSchemaLevel)}
                    onSubmit={(values, { setSubmitting, setErrors }) => {
                        this.levelDeatilsSaved()
                    }}
                    render={
                        ({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            isValid,
                            setTouched,
                            handleReset,
                            setFieldValue,
                            setFieldTouched
                        }) => (
                            <Form onSubmit={handleSubmit} onReset={handleReset} noValidate name='levelForm' autocomplete="off">
                                <ModalHeader toggle={() => this.levelClicked("")} className="modalHeader">
                                    <strong>{i18n.t('static.tree.levelDetails')}</strong>
                                </ModalHeader>
                                <ModalBody>

                                    <FormGroup>
                                        <Label htmlFor="currencyId">{i18n.t('static.tree.levelName')}<span class="red Reqasterisk">*</span></Label>
                                        <Input type="text"
                                            id="levelName"
                                            name="levelName"
                                            required
                                            valid={!errors.levelName && this.state.levelName != null ? this.state.levelName : '' != ''}
                                            invalid={touched.levelName && !!errors.levelName}
                                            onBlur={handleBlur}
                                            onChange={(e) => { this.levelNameChanged(e); handleChange(e); }}
                                            value={this.state.levelName}
                                        ></Input>
                                        <FormFeedback>{errors.levelName}</FormFeedback>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label htmlFor="currencyId">{i18n.t('static.tree.nodeUnit')}</Label>
                                        <Input
                                            type="select"
                                            id="levelUnit"
                                            name="levelUnit"
                                            bsSize="sm"
                                            onChange={(e) => { this.levelUnitChange(e) }}
                                            value={this.state.levelUnit}
                                        >
                                            <option value="">{i18n.t('static.common.select')}</option>
                                            {this.state.nodeUnitList.length > 0
                                                && this.state.nodeUnitList.map((item, i) => {
                                                    return (
                                                        <option key={i} value={item.unitId}>
                                                            {getLabelText(item.label, this.state.lang)}
                                                        </option>
                                                    )
                                                }, this)}
                                        </Input>
                                    </FormGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <div className="mr-0">
                                        <Button type="submit" size="md" color="success" className="submitBtn float-right" onClick={() => this.touchAllLevel(setTouched, errors)}> <i className="fa fa-check"></i> {i18n.t('static.common.submit')}</Button>
                                    </div>
                                    <Button size="md" color="danger" className="submitBtn float-right mr-1" onClick={() => this.levelClicked("")}> <i className="fa fa-times"></i> {i18n.t('static.common.cancel')}</Button>
                                </ModalFooter>
                            </Form>
                        )} />
            </Modal>

        </div >
    }
}