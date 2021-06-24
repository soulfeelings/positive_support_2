import React from "react";
import { useHistory } from "react-router";

function ProfileCheck(props) {
  const history = useHistory();
  history.push("/");

  return <div>ProfileChecking</div>;
}

export default ProfileCheck;
