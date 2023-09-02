import { ButtonBase, Typography, styled } from "@mui/material";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import { useState } from "react";
import { blue, grey } from "@mui/material/colors";
import InventoryBox from "./InventoryBox";

export default function Inventory() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <ButtonBase
        sx={{
          backgroundColor: isOpen ? grey[800] : blue[800],
          p: 1,
          m: 2,
          borderRadius: 4,
          color: grey[100],
        }}
        onClick={() => setOpen((v) => !v)}
      >
        <BusinessCenterOutlinedIcon />
      </ButtonBase>
      {isOpen && <InventoryBox />}
    </>
  );
}
