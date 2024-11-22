
export const categories = ['Payment', 'Account', 'Poll', 'List', 'Data', 'Chat', 'Group', 'AT', 'System', 'Other']

export const actions = {
  GET_USER_ACCOUNT: {
    category: "Account",
    isTx: false,
    requiresApproval: true,
    isGatewayDisabled: false,
    explanation: ""
  },
  DECRYPT_DATA: {
    category: "Data",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
    explaination: ""
  },
  SEND_COIN: {
    category: "Payment",
    isTx: true,
    requiresApproval: true,
    isGatewayDisabled: null,
    isGatewayDisabledExplanation: "Only QORT is permitted through gateways"
  },
  GET_LIST_ITEMS: {
    category: "List",
    isTx: false,
    requiresApproval: true,
    isGatewayDisabled: true,
  },
  ADD_LIST_ITEMS: {
    category: "List",
    isTx: false,
    requiresApproval: true,
    isGatewayDisabled: true,
  },
  DELETE_LIST_ITEM: {
    category: "List",
    isTx: false,
    requiresApproval: true,
    isGatewayDisabled: true,
  },
  VOTE_ON_POLL: {
    category: "Poll",
    isTx: true,
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  CREATE_POLL: {
    category: "Poll",
    isTx: true,
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  SEND_CHAT_MESSAGE: {
    category: "Chat",
    isTx: true,
    txType: 'Unconfirmed',
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  JOIN_GROUP: {
    category: "Group",
    isTx: true,
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  DEPLOY_AT: {
    category: "AT",
    isTx: true,
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  GET_USER_WALLET: {
    category: "Account",
    isTx: false,
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  GET_WALLET_BALANCE: {
    category: "Account",
    isTx: false,
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  GET_USER_WALLET_INFO: {
    category: "Account",
    isTx: false,
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  GET_CROSSCHAIN_SERVER_INFO: {
    category: "Payment",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  GET_TX_ACTIVITY_SUMMARY: {
    category: "Payment",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  GET_FOREIGN_FEE: {
    category: "Payment",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  UPDATE_FOREIGN_FEE: {
    category: "Payment",
    isTx: false,
    requiresApproval: false, // TODO
    isGatewayDisabled: true,
  },
  GET_SERVER_CONNECTION_HISTORY: {
    category: "Payment",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  SET_CURRENT_FOREIGN_SERVER: {
    category: "Payment",
    isTx: false,
    requiresApproval: false, // TODO
    isGatewayDisabled: true,
  },
  ADD_FOREIGN_SERVER: {
    category: "Payment",
    isTx: false,
    requiresApproval: false, // TODO
    isGatewayDisabled: true,
  },
  REMOVE_FOREIGN_SERVER: {
    category: "Payment",
    isTx: false,
    requiresApproval: false, // TODO
    isGatewayDisabled: true,
  },
  GET_DAY_SUMMARY: {
    category: "Payment",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  CREATE_TRADE_BUY_ORDER: {
    category: "Payment",
    isTx: true,
    requiresApproval: true, 
    isGatewayDisabled: false,
  },
  CREATE_TRADE_SELL_ORDER: {
    category: "Payment",
    isTx: true,
    requiresApproval: true, 
    isGatewayDisabled: true,
  },
  CANCEL_TRADE_SELL_ORDER: {
    category: "Payment",
    isTx: true,
    requiresApproval: true, 
    isGatewayDisabled: true,
  },
  IS_USING_GATEWAY: {
    category: "System",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  ADMIN_ACTION: {
    category: "System",
    isTx: false,
    requiresApproval: true,
    isGatewayDisabled: true,
  },
  SIGN_TRANSACTION: {
    category: "Other",
    isTx: true,
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  PUBLISH_MULTIPLE_QDN_RESOURCES: {
    category: "Data",
    isTx: true,
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  PUBLISH_QDN_RESOURCE: {
    category: "Data",
    isTx: true,
    requiresApproval: true,
    isGatewayDisabled: false,
  },
  ENCRYPT_DATA: {
    category: "Data",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
  SET_TAB: {
    category: "System",
    isTx: false,
    requiresApproval: false,
    isGatewayDisabled: false,
  },
};
