import { Route, Switch } from "react-router";
import AdminPage from "./Admin/AdminPage";
import Circles from "./Circles/Circles";
import OneCircle from "./OneCircle/OneCircle";
import Profile from "./Profile/Profile";
import ProfileCheck from "./Profile/ProfileCheck";

function Routes () {
  return (
    <Switch>              
      <Route path="/" children={<Circles />} exact />
      <Route path="/circle/:circleId" children={<OneCircle />} />

      <Route path="/profile" children={<Profile />} exact />
      <Route path="/profile/:secretId" children={<ProfileCheck />} />

      <Route path="/admin" children={<AdminPage />}  />
    </Switch>
  );
}

export default Routes
