import { useCallback, useEffect, useState } from "react";
import { MenuItem, Select, Tooltip, useTheme } from "@mui/material";
import "./App.css";
import QSandboxLogo from "./assets/images/QSandboxLogo.png";
import InfoIcon from "@mui/icons-material/Info";
import { categories } from "./constants";
import { ShowCategories } from "./ShowCategories";
import { ShowAction } from "./ShowAction";
import { DarkModeIcon, LightModeIcon, LogoContainer, ThemeSelectRow } from "./components/Common-styles";
import { themeAtom } from "./atoms/global";
import { useRecoilState } from "recoil";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [selectedAction , setSelectedAction] = useState(null)
  const [myAddress, setMyaddress] = useState('')
    const [_, setTheme] = useRecoilState(themeAtom)
    const theme = useTheme();

  const askForAccountInformation = useCallback(async () => {
    try {
      const account = await qortalRequest({
        action: "GET_USER_ACCOUNT",
      });
      if(account?.address){
        setMyaddress(account.address)
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(()=> {
    askForAccountInformation()
  }, [askForAccountInformation])
  const handleClose = useCallback(()=> {
    setSelectedAction(null)
  }, [])

  return (
    <div className="container">
      <div className="flex-row">
        <Tooltip className="tooltip" title="Thanks for using Q-Sandbox! Please contact A-Test or Bester by Q-Mail if something does not seem to not work as expected. Thanks and happy coding!" arrow placement="bottom">
          <InfoIcon className="info-icon" />
        </Tooltip>
        <ThemeSelectRow>
        {theme.palette.mode === "dark" ? (
          <LightModeIcon
            onClickFunc={() => setTheme("light")}
            color={theme.palette.text.primary}
            height="22"
            width="22"
          />
        ) : (
          <DarkModeIcon
            onClickFunc={() => setTheme("dark")}
            color={theme.palette.text.primary}
            height="22"
            width="22"
          />
        )}
        
      </ThemeSelectRow>
        <div className="logo-container">
          <img className="logo" src={QSandboxLogo} alt="q-sandbox-logo" />
        </div>
      </div>
      <Select
            size="small"
            labelId="label-select-category"
            id="id-select-category"
            value={selectedCategory}
            displayEmpty
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={{
              width: '150px'
            }}
          >
            <MenuItem value={0}>
              <em>All</em>
            </MenuItem>
            {categories?.map((category) => {
              return (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              );
            })}
          </Select>
        
        <ShowCategories selectedCategory={selectedCategory} setSelectedAction={setSelectedAction}  />
        <ShowAction myAddress={myAddress} selectedAction={selectedAction} handleClose={handleClose} />
    
    </div>
  );
}

export default App;
