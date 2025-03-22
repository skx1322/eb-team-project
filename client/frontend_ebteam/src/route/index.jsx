import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import EbGuide from "../page/EbGuide.jsx";
import About from "../page/About.jsx";
import Home from "../page/Home.jsx";
import MSTeam from "../page/MSTeam.jsx";
import Developer from "../page/Developer.jsx";
import AssignmentGuide from "../page/Subpage/AssignmentGuide.jsx"
import MSTeamGuide from "../page/Subpage/MSTeamGuide.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "developer",
        element: <Developer />,
      },
      {
        path: "ebguide",
        element: <EbGuide />,
      },
      {
        path: "msteam",
        element: <MSTeam />,
      },
      {
        path: "ebguide/assignment-guide",
        element: <AssignmentGuide />,
      },
      {
        path: "msteam/msteam-guide",
        element: <MSTeamGuide />,
      },
    ],
  },
]);

export default router;
