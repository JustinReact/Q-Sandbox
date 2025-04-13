import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Introduction } from './docs/default/getting-started/Introduction';
import { NewProject } from './docs/default/getting-started/NewProject';
// import { Installation } from './docs/framework/Installation';
// import { Routing } from './docs/framework/Routing';
// import { FrameworkIntro } from './docs/framework/Intro';

export function DocPage() {
  const { pageId } = useParams();
  console.log('pageId', pageId)

  switch (pageId) {
    case 'getting-started-introduction':
      return <Introduction />;

    case 'getting-started-starting-a-new-project':
      return <NewProject />;

    // case 'routing':
    //   return <Routing />;

    // 🔁 Add more cases here
    // case 'data-loading':
    //   return <DataLoading />;

    default:
      return (
        <Typography color="error">
          Page "{pageId}" not found.
        </Typography>
      );
  }
}
