import {
  AppBar,
  Box,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { VOTE_ON_POLL } from "./actions/VOTE_ON_POLL";
import { CREATE_POLL } from "./actions/CREATE_POLL";
import { PUBLISH_QDN_RESOURCE } from "./actions/PUBLISH_QDN_RESOURCE";
import { PUBLISH_MULTIPLE_QDN_RESOURCES } from "./actions/PUBLISH_MULTIPLE_QDN_RESOURCES";
import { OPEN_NEW_TAB } from "./actions/OPEN_NEW_TAB";
import { SEND_COIN } from "./actions/SEND_COIN";
import { GET_WALLET_BALANCE } from "./actions/GET_WALLET_BALANCE";
import { GET_USER_ACCOUNT } from "./actions/GET_USER_ACCOUNT";
import { GET_USER_WALLET } from "./actions/GET_USER_WALLET";
import { GET_USER_WALLET_INFO } from "./actions/GET_USER_WALLET_INFO";
import { GET_LIST_ITEMS } from "./actions/GET_LIST_ITEMS";
import { ADD_LIST_ITEMS } from "./actions/ADD_LIST_ITEMS";
import { DELETE_LIST_ITEM } from "./actions/DELETE_LIST_ITEM";
import { IS_USING_PUBLIC_NODE } from "./actions/IS_USING_PUBLIC_NODE";
import { ADMIN_ACTION } from "./actions/ADMIN_ACTION";
import { SIGN_TRANSACTION } from "./actions/SIGN_TRANSACTION";
import { DEPLOY_AT } from "./actions/DEPLOY_AT";
import { JOIN_GROUP } from "./actions/JOIN_GROUP";
import { SEND_CHAT_MESSAGE } from "./actions/SEND_CHAT_MESSAGE";
import { ENCRYPT_DATA } from "./actions/ENCRYPT_DATA";
import { DECRYPT_DATA } from "./actions/DECRYPT_DATA";
import { GET_CROSSCHAIN_SERVER_INFO } from "./actions/GET_CROSSCHAIN_SERVER_INFO";
import { GET_TX_ACTIVITY_SUMMARY } from "./actions/GET_TX_ACTIVITY_SUMMARY";
import { GET_FOREIGN_FEE } from "./actions/GET_FOREIGN_FEE";
import { GET_SERVER_CONNECTION_HISTORY } from "./actions/GET_SERVER_CONNECTION_HISTORY";
import { GET_DAY_SUMMARY } from "./actions/GET_DAY_SUMMARY";
import { UPDATE_FOREIGN_FEE } from "./actions/UPDATE_FOREIGN_FEE";
import { SET_CURRENT_FOREIGN_SERVER } from "./actions/SET_CURRENT_FOREIGN_SERVER";
import { ADD_FOREIGN_SERVER } from "./actions/ADD_FOREIGN_SERVER";
import { REMOVE_FOREIGN_SERVER } from "./actions/REMOVE_FOREIGN_SERVER";
import { CREATE_TRADE_BUY_ORDER } from "./actions/CREATE_TRADE_BUY_ORDER";
import { CREATE_TRADE_SELL_ORDER } from "./actions/CREATE_TRADE_SELL_ORDER";
import { CANCEL_TRADE_SELL_ORDER } from "./actions/CANCEL_TRADE_SELL_ORDER";
import { ENCRYPT_QORTAL_GROUP_DATA } from "./actions/ENCRYPT_QORTAL_GROUP_DATA";
import { DECRYPT_QORTAL_GROUP_DATA } from "./actions/DECRYPT_QORTAL_GROUP_DATA";
import { ENCRYPT_DATA_WITH_SHARING_KEY } from "./actions/ENCRYPT_DATA_WITH_SHARING_KEY";
import { DECRYPT_DATA_WITH_SHARING_KEY } from "./actions/DECRYPT_DATA_WITH_SHARING_KEY";
import { CREATE_AND_COPY_EMBED_LINK } from "./actions/CREATE_AND_COPY_EMBED_LINK";
import { SHOW_ACTIONS } from "./actions/SHOW_ACTIONS";
import { GET_HOSTED_DATA } from "./actions/GET_HOSTED_DATA";
import { DELETE_HOSTED_DATA } from "./actions/DELETE_HOSTED_DATA";
import { GET_ACCOUNT_DATA } from "./actions/GET_ACCOUNT_DATA";
import { GET_ACCOUNT_NAMES } from "./actions/GET_ACCOUNT_NAMES";
import { SEARCH_NAMES } from "./actions/SEARCH_NAMES";
import { GET_NAME_DATA } from "./actions/GET_NAME_DATA";
import { GET_QDN_RESOURCE_URL } from "./actions/GET_QDN_RESOURCE_URL";
import { LINK_TO_QDN_RESOURCE } from "./actions/LINK_TO_QDN_RESOURCE";
import { LIST_QDN_RESOURCES } from "./actions/LIST_QDN_RESOURCES";
import { SEARCH_QDN_RESOURCES } from "./actions/SEARCH_QDN_RESOURCES";
import { FETCH_QDN_RESOURCE } from "./actions/FETCH_QDN_RESOURCE";
import { GET_QDN_RESOURCE_STATUS } from "./actions/GET_QDN_RESOURCE_STATUS";
import { GET_QDN_RESOURCE_PROPERTIES } from "./actions/GET_QDN_RESOURCE_PROPERTIES";
import { GET_QDN_RESOURCE_METADATA } from "./actions/GET_QDN_RESOURCE_METADATA";
import { GET_BALANCE } from "./actions/GET_BALANCE";
import { GET_PRICE } from "./actions/GET_PRICE";
import { LIST_GROUPS } from "./actions/LIST_GROUPS";
import { GET_AT } from "./actions/GET_AT";
import { GET_AT_DATA } from "./actions/GET_AT_DATA";
import { LIST_ATS } from "./actions/LIST_ATS";
import { FETCH_BLOCK } from "./actions/FETCH_BLOCK";
import { FETCH_BLOCK_RANGE } from "./actions/FETCH_BLOCK_RANGE";
import { SEARCH_TRANSACTIONS } from "./actions/SEARCH_TRANSACTIONS";
import { SEARCH_CHAT_MESSAGES } from "./actions/SEARCH_CHAT_MESSAGES";
import { TEST } from "./actions/TEST";
import { REGISTER_NAME } from "./actions/REGISTER_NAME";
import { UPDATE_NAME } from "./actions/UPDATE_NAME";
import { LEAVE_GROUP } from "./actions/LEAVE_GROUP";
import { INVITE_TO_GROUP } from "./actions/INVITE_TO_GROUP";
import { KICK_FROM_GROUP } from "./actions/KICK_FROM_GROUP";
import { BAN_FROM_GROUP } from "./actions/BAN_FROM_GROUP";
import { CANCEL_GROUP_BAN } from "./actions/CANCEL_GROUP_BAN";
import { ADD_GROUP_ADMIN } from "./actions/ADD_GROUP_ADMIN";
import { REMOVE_GROUP_ADMIN } from "./actions/REMOVE_GROUP_ADMIN";
import { CANCEL_GROUP_INVITE } from "./actions/CANCEL_GROUP_INVITE";
import { TEST2 } from "./actions/TEST2";
import { TEST3 } from "./actions/TEST3.jsx";
import { CREATE_GROUP } from "./actions/CREATE_GROUP.jsx";
import { TEST4 } from "./actions/TEST4.jsx";
import { TEST5 } from "./actions/TEST5.jsx";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ShowAction = ({ selectedAction, handleClose, myAddress }) => {
  const ActionComponent = useMemo(() => {
    switch (selectedAction?.action) {
      case "VOTE_ON_POLL":
        return VOTE_ON_POLL;
      case "CREATE_POLL":
        return CREATE_POLL;
      case "PUBLISH_QDN_RESOURCE":
        return PUBLISH_QDN_RESOURCE;
      case "PUBLISH_MULTIPLE_QDN_RESOURCES":
        return PUBLISH_MULTIPLE_QDN_RESOURCES;
      case "OPEN_NEW_TAB":
        return OPEN_NEW_TAB;
      case "SEND_COIN":
        return SEND_COIN;
      case "GET_WALLET_BALANCE":
        return GET_WALLET_BALANCE;
      case "GET_USER_ACCOUNT":
        return GET_USER_ACCOUNT;
      case "GET_USER_WALLET":
        return GET_USER_WALLET;
      case "GET_USER_WALLET_INFO":
        return GET_USER_WALLET_INFO;
      case "GET_LIST_ITEMS":
        return GET_LIST_ITEMS;
      case "ADD_LIST_ITEMS":
        return ADD_LIST_ITEMS;
      case "DELETE_LIST_ITEM":
        return DELETE_LIST_ITEM;
      case "IS_USING_PUBLIC_NODE":
        return IS_USING_PUBLIC_NODE;
      case "ADMIN_ACTION":
        return ADMIN_ACTION;
      case "SIGN_TRANSACTION":
        return SIGN_TRANSACTION;
      case "DEPLOY_AT":
        return DEPLOY_AT;
      case "JOIN_GROUP":
        return JOIN_GROUP;
      case "SEND_CHAT_MESSAGE":
        return SEND_CHAT_MESSAGE;
      case "ENCRYPT_DATA":
        return ENCRYPT_DATA;
      case "DECRYPT_DATA":
        return DECRYPT_DATA;
      case "GET_CROSSCHAIN_SERVER_INFO":
        return GET_CROSSCHAIN_SERVER_INFO;
      case "GET_TX_ACTIVITY_SUMMARY":
        return GET_TX_ACTIVITY_SUMMARY;
      case "GET_FOREIGN_FEE":
        return GET_FOREIGN_FEE;
      case "GET_SERVER_CONNECTION_HISTORY":
        return GET_SERVER_CONNECTION_HISTORY;
      case "GET_DAY_SUMMARY":
        return GET_DAY_SUMMARY;
      case "UPDATE_FOREIGN_FEE":
        return UPDATE_FOREIGN_FEE;
      case "SET_CURRENT_FOREIGN_SERVER":
        return SET_CURRENT_FOREIGN_SERVER;
      case "ADD_FOREIGN_SERVER":
        return ADD_FOREIGN_SERVER;
      case "REMOVE_FOREIGN_SERVER":
        return REMOVE_FOREIGN_SERVER;
      case "CREATE_TRADE_BUY_ORDER":
        return CREATE_TRADE_BUY_ORDER;
      case "CREATE_TRADE_SELL_ORDER":
        return CREATE_TRADE_SELL_ORDER;
      case "CANCEL_TRADE_SELL_ORDER":
        return CANCEL_TRADE_SELL_ORDER;
      case "ENCRYPT_QORTAL_GROUP_DATA":
        return ENCRYPT_QORTAL_GROUP_DATA;
      case "DECRYPT_QORTAL_GROUP_DATA":
        return DECRYPT_QORTAL_GROUP_DATA;
      case "ENCRYPT_DATA_WITH_SHARING_KEY":
        return ENCRYPT_DATA_WITH_SHARING_KEY;
      case "DECRYPT_DATA_WITH_SHARING_KEY":
        return DECRYPT_DATA_WITH_SHARING_KEY;
      case "CREATE_AND_COPY_EMBED_LINK":
        return CREATE_AND_COPY_EMBED_LINK;
      case "SHOW_ACTIONS":
        return SHOW_ACTIONS;
      case "GET_HOSTED_DATA":
        return GET_HOSTED_DATA;
      case "DELETE_HOSTED_DATA":
        return DELETE_HOSTED_DATA;
      case "GET_ACCOUNT_DATA":
        return GET_ACCOUNT_DATA;
      case "GET_ACCOUNT_NAMES":
        return GET_ACCOUNT_NAMES;
      case "SEARCH_NAMES":
        return SEARCH_NAMES;
      case "GET_NAME_DATA":
        return GET_NAME_DATA;
      case "GET_QDN_RESOURCE_URL":
        return GET_QDN_RESOURCE_URL;
      case "LINK_TO_QDN_RESOURCE":
        return LINK_TO_QDN_RESOURCE;
      case "LIST_QDN_RESOURCES":
        return LIST_QDN_RESOURCES;
      case "SEARCH_QDN_RESOURCES":
        return SEARCH_QDN_RESOURCES;
      case "FETCH_QDN_RESOURCE":
        return FETCH_QDN_RESOURCE;
      case "GET_QDN_RESOURCE_STATUS":
        return GET_QDN_RESOURCE_STATUS;
      case "GET_QDN_RESOURCE_PROPERTIES":
        return GET_QDN_RESOURCE_PROPERTIES;
      case "GET_QDN_RESOURCE_METADATA":
        return GET_QDN_RESOURCE_METADATA;
      case "GET_BALANCE":
        return GET_BALANCE;
      case "GET_PRICE":
        return GET_PRICE;
      case "LIST_GROUPS":
        return LIST_GROUPS;
      case "GET_AT":
        return GET_AT;
      case "GET_AT_DATA":
        return GET_AT_DATA;
      case "LIST_ATS":
        return LIST_ATS;
      case "FETCH_BLOCK":
        return FETCH_BLOCK;
      case "FETCH_BLOCK_RANGE":
        return FETCH_BLOCK_RANGE;
      case "SEARCH_TRANSACTIONS":
        return SEARCH_TRANSACTIONS;
      case "SEARCH_CHAT_MESSAGES":
        return SEARCH_CHAT_MESSAGES;
      case "REGISTER_NAME":
        return REGISTER_NAME;
      case "UPDATE_NAME":
        return UPDATE_NAME;
      case "LEAVE_GROUP":
        return LEAVE_GROUP;
      case "INVITE_TO_GROUP":
        return INVITE_TO_GROUP;
      case "KICK_FROM_GROUP":
        return KICK_FROM_GROUP;
      case "BAN_FROM_GROUP":
        return BAN_FROM_GROUP;
        case "CANCEL_GROUP_BAN":
          return CANCEL_GROUP_BAN;
      case "ADD_GROUP_ADMIN":
        return ADD_GROUP_ADMIN;
        case "REMOVE_GROUP_ADMIN":
          return REMOVE_GROUP_ADMIN;
          case "CANCEL_GROUP_INVITE":
            return CANCEL_GROUP_INVITE;
            case "CREATE_GROUP":
              return CREATE_GROUP;
            case "TEST2":
              return TEST2;
              case "TEST3":
                return TEST3;
                case "TEST4":
                  return TEST4;
                  case "TEST5":
                  return TEST5;
      case "TEST":
        return TEST;
      default:
        return EmptyActionComponent;
    }
  }, [selectedAction?.action]);

  if (!selectedAction) return null;
  return (
    <div>
      <Dialog
        fullScreen
        open={!!selectedAction}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {selectedAction?.action}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
          }}
        >
          <ActionComponent myAddress={myAddress} />
        </Box>
        {/* <LoadingSnackbar
          open={false}
          info={{
            message: "Loading member list with names... please wait.",
          }}
        /> */}
      </Dialog>
    </div>
  );
};

const EmptyActionComponent = () => {
  return null;
};
