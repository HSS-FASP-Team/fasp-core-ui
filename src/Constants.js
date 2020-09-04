// export const API_URL='https://fasp.altius.cc/FASP'
// export const API_URL='http://localhost:8080/FASP'
//export const API_URL = 'http://localhost:8081'
// export const API_URL = 'http://server6.altius.cc:8080/FASP'

export const API_URL = 'http://localhost:8084'
// export const API_URL='http://192.168.43.70:8080/FASP'
export const SECRET_KEY = 'afhghggrehreqiuhrjhjdbfjehgfuoerhfjhfyguayaegrf'
export const MONTHS_IN_PAST_FOR_SUPPLY_PLAN = 5;
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
export const NO_OF_MONTHS_ON_LEFT_CLICKED = 1
export const NO_OF_MONTHS_ON_RIGHT_CLICKED = 1
export const PENDING_APPROVAL_VERSION_STATUS = 1
export const ACTUAL_CONSUMPTION_DATA_SOURCE_TYPE = 1
export const FORECASTED_CONSUMPTION_DATA_SOURCE_TYPE = 2
export const INVENTORY_DATA_SOURCE_TYPE = 3
export const SHIPMENT_DATA_SOURCE_TYPE = 4
export const DATE_FORMAT_SM = "dd-MMM-yy"
export const DATE_FORMAT_CAP = "DD-MMM-YY"
export const DATE_PLACEHOLDER_TEXT = "dd-mmm-yy"
export const QAT_DATA_SOURCE_ID = 13
export const FIRST_DATA_ENTRY_DATE = '2017-01-01'
export const NOTES_FOR_QAT_ADJUSTMENTS = 'Adjustment calculated by the system due to an actual stock count'
export const TBD_PROCUREMENT_AGENT_ID = 11
export const TBD_FUNDING_SOURCE = 8
export const TOTAL_NO_OF_MASTERS_IN_SYNC = 30
export const QAT_REALM_COUNTRY_PLANNING_UNIT = 1
export const DECIMAL_NO_REGEX = /^\d+(\.\d{1,4})?$/
export const INTEGER_NO_REGEX = /^[0-9\b]+$/
export const LABEL_REGEX = /^([a-zA-Z]+\s)*[a-zA-Z]+$/
export const ALPHABETS_REGEX = /^[a-zA-Z]+$/
export const LABEL_WITH_SPECIAL_SYMBOL_REGEX = /^([a-zA-Z/]+\s)*[a-zA-Z/]+$/
export const UNIT_LABEL_REGEX = /^([a-zA-Z0-9/+-]+\s)*[a-zA-Z0-9/+-]+$/
export const NEGATIVE_INTEGER_NO_REGEX = /^[-+]?\d*$/
export const ALPHABET_NUMBER_REGEX = /^([a-zA-Z0-9])*[a-zA-Z0-9]+$/
export const BUDGET_NAME_REGEX = /^([a-zA-Z0-9,-]+\s)*[a-zA-Z0-9,-]+$/
export const SPACE_REGEX = /^[^\s]+(\s+[^\s]+)*$/
export const INDEXED_DB_NAME = "fasp"
export const INDEXED_DB_VERSION = 1
export const ACTUAL_CONSUMPTION_TYPE = 1;
export const FORCASTED_CONSUMPTION_TYPE = 2;
export const LATEST_VERSION_COLOUR="#e5edf5"
export const LOCAL_VERSION_COLOUR="#86cd99"
export const CONFLICTS_COLOUR="yellow"
export const JIRA_PROJECT_KEY="QAT"
export const JIRA_PROJECT_ISSUE_TYPE_BUG_REPORT="Report a bug"
export const JIRA_PROJECT_ISSUE_TYPE_EMAIL_REQUEST="Email request"
