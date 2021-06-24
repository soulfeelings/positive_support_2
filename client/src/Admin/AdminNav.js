import { Link } from "react-router-dom";
import { circlesStyles } from "../Circles/styles";
import React, { useEffect, useState } from "react";
import insertStyles from "../helpers/insertStyles";
function AdminNav() {
  const [styled, setStyled] = useState(false);
  useEffect(() => {
    setStyled(true);
    return insertStyles(circlesStyles);
  }, []);
  return (
    <div
      style={{ backgroundColor: "#2a2f4a" }}
      class="admin_header"
      id="header"
    >
      <Link to="/admin/circles">Круговороты</Link>
      <Link to="/admin/users">Пользователи</Link>
    </div>
  );
}

export default AdminNav;
