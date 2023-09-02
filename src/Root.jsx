import { useEffect, useState } from "react";
import BiconomyButton from "./BiconomyButton";
import { Typography, styled } from "@mui/material";
// import { motion as m } from "framer-motion";
// import { DragDropContext } from "react-beautiful-dnd";

import { useMandalaStore } from "~~/utils/mandalaStore";
import useEnvStore from "~~/utils/store/envStore";
import GameCanvas from "./GameCanvas";

const StyledDiv = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  // position: "absolute",
  // top: 64,
}));

// const DragDropContext = dynamic(
//   () =>
//     import("react-beautiful-dnd").then(mod => {
//       return mod.DragDropContext;
//     }),
//   { ssr: false },
// );

export default function Root() {
  const isLogin = useMandalaStore((state) => state.biconomySmartAccount);

  return isLogin ? (
    <>
      <GameCanvas />
      <div style={{ position: "absolute", right: 0, top: 0, zIndex: 9999 }}>
        <BiconomyButton />
      </div>
    </>
  ) : (
    <StyledDiv>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h1" layout layoutId="title">
          Sample Game
        </Typography>
        <Typography variant="h5">
          Mandala - The Ultimate Web3 Gaming Inventory
        </Typography>
        <BiconomyButton />
      </div>
    </StyledDiv>
  );
}
