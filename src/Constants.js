// export const API_URL='https://fasp.altius.cc/FASP'
// export const API_URL='https://api-mod2.altius.cc'
export const API_URL = 'http://localhost:8084'
// export const API_URL = 'http://server6.altius.cc:8080/FASP'

// export const API_URL = 'https://uat-api.quantificationanalytics.org'
// export const API_URL = 'https://api.quantificationanalytics.org'
// export const API_URL = 'https://demo-api.quantificationanalytics.org'


// export const API_URL='http://192.168.43.70:8080/FASP'

export const JIRA_SUBJECT_PREFIX_UAT = 'UAT - '
export const JIRA_SUBJECT_PREFIX_DEMO = 'DEMO - '

export const SECRET_KEY = 'afhghggrehreqiuhrjhjdbfjehgfuoerhfjhfyguayaegrf'
export const MONTHS_IN_PAST_FOR_SUPPLY_PLAN = 3;
export const TOTAL_MONTHS_TO_DISPLAY_IN_SUPPLY_PLAN = 18
export const PLUS_MINUS_MONTHS_FOR_AMC_IN_SUPPLY_PLAN = 12
export const MONTHS_IN_PAST_FOR_AMC = 3
export const MONTHS_IN_FUTURE_FOR_AMC = 3
export const DEFAULT_MIN_MONTHS_OF_STOCK = 3
export const DEFAULT_MAX_MONTHS_OF_STOCK = 18
export const CANCELLED_SHIPMENT_STATUS = 8
export const PSM_PROCUREMENT_AGENT_ID = 1
export const PLANNED_SHIPMENT_STATUS = 1
export const DRAFT_SHIPMENT_STATUS = 2
export const SUBMITTED_SHIPMENT_STATUS = 3
export const APPROVED_SHIPMENT_STATUS = 4
export const SHIPPED_SHIPMENT_STATUS = 5
export const ARRIVED_SHIPMENT_STATUS = 6
export const DELIVERED_SHIPMENT_STATUS = 7
export const ON_HOLD_SHIPMENT_STATUS = 9
export const NO_OF_MONTHS_ON_LEFT_CLICKED = 3
export const NO_OF_MONTHS_ON_RIGHT_CLICKED = 3
export const NO_OF_MONTHS_ON_LEFT_CLICKED_REGION = 3
export const NO_OF_MONTHS_ON_RIGHT_CLICKED_REGION = 3
export const PENDING_APPROVAL_VERSION_STATUS = 1
export const ACTUAL_CONSUMPTION_DATA_SOURCE_TYPE = 1
export const FORECASTED_CONSUMPTION_DATA_SOURCE_TYPE = 2
export const INVENTORY_DATA_SOURCE_TYPE = 3
export const SHIPMENT_DATA_SOURCE_TYPE = 4
export const STRING_TO_DATE_FORMAT = "MM-DD-YYYY"
export const DATE_FORMAT_SM = "dd-MMM-yy"
export const DATE_FORMAT_CAP = "DD-MMM-YY"
export const DATE_FORMAT_CAP_WITHOUT_DATE = "MMM-YY"
export const DATE_PLACEHOLDER_TEXT = "dd-mmm-yy"
export const QAT_DATA_SOURCE_ID = 13
export const FIRST_DATA_ENTRY_DATE = '2017-01-01'
export const NOTES_FOR_QAT_ADJUSTMENTS = 'Adjustment calculated by the system due to an actual stock count'
export const TBD_PROCUREMENT_AGENT_ID = 11
export const TBD_FUNDING_SOURCE = 8
export const TOTAL_NO_OF_MASTERS_IN_SYNC = 44
export const QAT_REALM_COUNTRY_PLANNING_UNIT = 1
export const DECIMAL_NO_REGEX = /^\d+(\.\d{1,4})?$/
export const INTEGER_NO_REGEX = /^[0-9\b]+$/
export const LABEL_REGEX = /^([a-zA-Z]+\s)*[a-zA-Z]+$/
export const ALPHABETS_REGEX = /^[a-zA-Z]+$/
export const LABEL_WITH_SPECIAL_SYMBOL_REGEX = /^([a-zA-Z/]+\s)*[a-zA-Z/]+$/
export const BATCH_NO_REGEX = /^[ A-Za-z0-9/-]*$/
// export const UNIT_LABEL_REGEX = /^([a-zA-Z0-9/+-]+\s)*[a-zA-Z0-9/+-]+$/
export const UNIT_LABEL_REGEX = /^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+$/
export const NEGATIVE_INTEGER_NO_REGEX = /^[-+]?\d*$/
export const ALPHABET_NUMBER_REGEX = /^([a-zA-Z0-9])*[a-zA-Z0-9]+$/
export const BUDGET_NAME_REGEX = /^([a-zA-Z0-9,-]+\s)*[a-zA-Z0-9,-]+$/
export const SPACE_REGEX = /^[^\s]+(\s+[^\s]+)*$/
export const PERCENTAGE_REGEX = /^0?[0-9]?[0-9]$|^(100)$/
export const NO_DECIMAL_PERCENTAGE_REGEX = /^[0-9\b]+$/
export const INDEXED_DB_NAME = "fasp"
export const INDEXED_DB_VERSION = 7
export const ACTUAL_CONSUMPTION_TYPE = 1;
export const FORCASTED_CONSUMPTION_TYPE = 2;
export const LATEST_VERSION_COLOUR = "#e5edf5"
export const LOCAL_VERSION_COLOUR = "#86cd99"
export const CONFLICTS_COLOUR = "yellow"
export const JIRA_PROJECT_KEY = "QAT"
export const JIRA_PROJECT_ISSUE_TYPE_BUG_REPORT = "Report a bug"
export const JIRA_PROJECT_ISSUE_TYPE_EMAIL_REQUEST = "Email request"
export const JIRA_PROJECT_ISSUE_TYPE_ADD_UPDATE_USER = "Add / Update User"
export const JIRA_PROJECT_ISSUE_TYPE_ADD_UPDATE_MASTER_DATA = "Add / Update Master Data"
export const JEXCEL_DATE_FORMAT = "DD-MON-YY"
export const JEXCEL_DATE_FORMAT_SM = "DD-Mon-YY"
export const JEXCEL_DATE_FORMAT_WITHOUT_DATE = "MON-YY"
export const APP_VERSION_REACT = "[7922]"
export const BATCH_PREFIX = "QAT"
export const NONE_SELECTED_DATA_SOURCE_ID = 17
export const JEXCEL_PAGINATION_OPTION = [15, 25, 50, 5000000]
export const JEXCEL_DEFAULT_PAGINATION = 15
export const JEXCEL_INTEGER_REGEX = /^[0-9]{0,10}$/
export const JEXCEL_INTEGER_REGEX_LONG = /^[0-9]{0,15}$/
export const JEXCEL_NEGATIVE_INTEGER_NO_REGEX = /^[-+]?\d{0,10}$/
export const JEXCEL_NEGATIVE_INTEGER_NO_REGEX_LONG = /^[-+]?\d{0,15}$/
export const JEXCEL_DECIMAL_NO_REGEX = /^\d{0,10}(\.\d{1,2})?$/
export const JEXCEL_DECIMAL_NO_REGEX_NEW = /^\d{0,10}(\.\d{1,6})?$/
export const JEXCEL_DECIMAL_NO_REGEX_LONG = /^\d{0,15}(\.\d{1,2})?$/
export const JEXCEL_DECIMAL_NO_REGEX_LONG_4_DECIMAL = /^\d{0,15}(\.\d{1,4})?$/
export const JEXCEL_DECIMAL_NO_REGEX_LONG_2_DECIMAL = /^\d{0,10}(\.\d{1,2})?$/
export const JEXCEL_DECIMAL_CATELOG_PRICE = /^\d{0,10}(\.\d{1,4})?$/
export const JEXCEL_DECIMAL_MONTHLY_CHANGE = /^.?\d{0,10}(\.\d{1,2})?$/
export const JEXCEL_DECIMAL_MONTHLY_CHANGE_4_DECIMAL = /^.?\d{0,10}(\.\d{1,4})?$/
export const JEXCEL_DECIMAL_MONTHLY_CHANGE_4_DECIMAL_POSITIVE = /^\d{0,10}(\.\d{1,4})?$/
export const JEXCEL_DECIMAL_CATELOG_PRICE_SHIPMENT = /^\d{0,10}(\.\d{1,2})?$/
export const JEXCEL_DECIMAL_LEAD_TIME = /^\d{0,2}(\.\d{1,2})?$/
export const QUANTIMED_DATA_SOURCE_ID = 18
export const ACTUAL_CONSUMPTION_MONTHS_IN_PAST = 6
export const ACTUAL_CONSUMPTION_MONTHS_IN_PAST_FOR_QPL = 12
export const INVENTORY_MONTHS_IN_PAST_FOR_QPL = 12
export const FORECASTED_CONSUMPTION_MONTHS_IN_PAST = 4
export const INVENTORY_MONTHS_IN_PAST = 6
export const USD_CURRENCY_ID = 1
export const QAT_HELPDESK_CUSTOMER_PORTAL_URL = 'https://qathelpdesk.atlassian.net/servicedesk/customer/portals'
export const JEXCEL_MONTH_PICKER_FORMAT = "Mon-YYYY"
export const FINAL_VERSION_TYPE = 2;
export const OPEN_PROBLEM_STATUS_ID = 1
export const JEXCEL_PRO_KEY = "ZDUwNjRmMTA3YTQ4MDc2MWQyODU2YjhhNDFmYzc3MDQzY2Q3ZWU2Nzg0ZWI4MjU1Y2Q4NGM3OWU2NWM4YmVlNTM3MzQ1NTQ2MWU5NzE3MWM3MjJmZjUxODYzMDNkMmNlYTM5MDYxMDNlYTQ2NzI3MTQwYzdkYWJlNzg1OTkyZmMsZXlKdVlXMWxJam9pUVd4MGFYVnpJRU4xYzNSdmJXVnlJRk5sY25acFkyVnpJRkIyZENCTWRHUWlMQ0prWVhSbElqb3hOalkyTmpVeU5EQXdMQ0prYjIxaGFXNGlPbHNpYkc5allXeG9iM04wSWl3aWNYVmhiblJwWm1sallYUnBiMjVoYm1Gc2VYUnBZM011YjNKbklpd2lZV3gwYVhWekxtTmpJaXdpYlc5a01pNWhiSFJwZFhNdVkyTWlMQ0pzYjJOaGJHaHZjM1FpWFN3aWNHeGhiaUk2SWpNaUxDSnpZMjl3WlNJNld5SjJOeUlzSW5ZNElsMTk="
export const SPECIAL_CHARECTER_WITHOUT_NUM = /^([^0-9\s])+$/
export const SPECIAL_CHARECTER_WITH_NUM = /^([^\s])+$/
export const SPECIAL_CHARECTER_WITH_NUM_NODOUBLESPACE = /^(?!.*\s\s)\S(.*\S)?$/
export const PLANNED_TO_SUBMITTED = 1
export const SUBMITTED_TO_APPROVED = 1
export const APPROVED_TO_SHIPPED = 1
export const SHIPPED_TO_ARRIVED_AIR = 1
export const SHIPPED_TO_ARRIVED_SEA = 1
export const ARRIVED_TO_RECEIVED = 1
export const JEXCEL_DECIMAL_NO_REGEX_FOR_MULTIPLIER = /^\d{0,10}(\.\d{1,6})?$/
export const JEXCEL_INTEGER_REGEX_FOR_DATA_ENTRY = /^[0-9]{0,15}$/
export const JEXCEL_NEGATIVE_INTEGER_NO_REGEX_FOR_DATA_ENTRY = /^[-+]?\d{0,15}$/
export const JEXCEL_DECIMAL_NO_REGEX_FOR_DATA_ENTRY = /^\d{0,15}(\.\d{1,2})?$/
export const ASSIGNEE_ID_FOR_BUG_ISSUE = "5f1af96c4be9da001d844be3"
export const ASSIGNEE_ID_FOR_NON_BUG_ISSUE = "5e95b3262b755a0c091b38a1"
export const ASSIGNEE_ID_FOR_CHANGE_REQUEST = "5f1af96c4be9da001d844be3"
export const JIRA_PROJECT_ISSUE_TYPE_CHANGE_REQUEST = 'Change Request'
export const JEXCEL_PIPELINE_CONVERSION_FACTOR = /^\d{0,10}(\.\d{1,6})?$/
export const FORECASTED_CONSUMPTION_MODIFIED = 1;
export const ACTUAL_CONSUMPTION_MODIFIED = 2;
export const INVENTORY_MODIFIED = 3;
export const ADJUSTMENT_MODIFIED = 4;
export const SHIPMENT_MODIFIED = 5;
export const polling = { url: API_URL }
export const APPLICATION_STATUS_URL = API_URL + "/actuator/health"
export const PROBLEM_STATUS_IN_COMPLIANCE = 4
export const MAX_PROGRAM_CODE_LENGTH = 50;
export const TREE_DIMENSION_ID = 5;
export const REPORT_DATEPICKER_START_MONTH = 6;
export const REPORT_DATEPICKER_END_MONTH = 12;
export const ROUNDING_NUMBER = 0.15;
export const ALPHA_BETA_GAMMA_VALUE = /^(?:(?:[0])(?:\.\d{1,2})?|1(?:\.0\d{0,1})?)$/
export const SEASONALITY_REGEX = /^(?:[1-9]|[1][0-9]|2[0-4])$/
export const TITLE_FONT = 13
export const NUMBER_NODE_ID = 2;
export const PERCENTAGE_NODE_ID = 3;
export const FU_NODE_ID = 4;
export const PU_NODE_ID = 5;
export const POSITIVE_WHOLE_NUMBER = /^[1-9]\d*$/
export const MIN_DATE_RESTRICTION_IN_DATA_ENTRY = '1990-01-01';
export const MAX_DATE_RESTRICTION_IN_DATA_ENTRY = 200;
export const FORECAST_DATEPICKER_START_MONTH = 3;
export const QAT_DATASOURCE_ID = 31;
export const FORECAST_DATEPICKER_MONTH_DIFF = 6;
export const SHIPMENT_ID_ARR_MANUAL_TAGGING=["3","4","5","6","7","9"]
