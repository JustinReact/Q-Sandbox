import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { Introduction } from "./docs/default/getting-started/Introduction";
import { NewProject } from "./docs/default/getting-started/NewProject";
import { GlobalProvider } from "./docs/default/getting-started/GlobalProvider";


export function DocPage() {
  const { pageId } = useParams();
  console.log("pageId", pageId);

  switch (pageId) {
    case "getting-started-introduction":
      return <Introduction />;

    case "getting-started-starting-a-new-project":
      return <NewProject />;
    case "getting-started-globalprovider-config":
      return <GlobalProvider />;

    default:
      return <Typography color="error">Page "{pageId}" not found.</Typography>;
  }
}
