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
import { IS_USING_GATEWAY } from "./actions/IS_USING_GATEWAY";
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
      case "IS_USING_GATEWAY":
        return IS_USING_GATEWAY;
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
        return GET_CROSSCHAIN_SERVER_INFO
      case "GET_TX_ACTIVITY_SUMMARY":
        return GET_TX_ACTIVITY_SUMMARY;
      case "GET_FOREIGN_FEE":
        return GET_FOREIGN_FEE;
      case "GET_SERVER_CONNECTION_HISTORY":
        return GET_SERVER_CONNECTION_HISTORY
      case "GET_DAY_SUMMARY":
        return GET_DAY_SUMMARY;
      case "UPDATE_FOREIGN_FEE":
        return UPDATE_FOREIGN_FEE
      case "SET_CURRENT_FOREIGN_SERVER":
        return SET_CURRENT_FOREIGN_SERVER;
      case "ADD_FOREIGN_SERVER": 
        return ADD_FOREIGN_SERVER;
      case "REMOVE_FOREIGN_SERVER":
        return REMOVE_FOREIGN_SERVER;
      case "CREATE_TRADE_BUY_ORDER":
        return CREATE_TRADE_BUY_ORDER;
      case "CREATE_TRADE_SELL_ORDER":
        return CREATE_TRADE_SELL_ORDER
      case "CANCEL_TRADE_SELL_ORDER":
        return CANCEL_TRADE_SELL_ORDER
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
