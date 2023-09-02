import { useEffect, useMemo, useState } from "react";
import {
  ButtonBase,
  CircularProgress,
  Paper,
  paperClasses,
  styled,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import clsx from "clsx";
import { isOwnRing } from "~~/utils/mandala/utils";
import useEnvStore from "../utils/envStore";

const StyledBox = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  padding: theme.spacing(0.5),
  height: 332,
  width: "100%",
  "@supports (backdrop-filter: blur(3px)) or (-webkit-backdrop-filter: blur(3px))":
    {
      WebkitBackdropFilter: "blur(15px)",
      backdropFilter: "blur(15px)",
      backgroundColor: `${grey[900]}4D`,
      // border: `1px solid ${grey[900]}`,
    },
  [`& > div.${paperClasses.root}`]: {
    width: 100,
    height: 100,
    // backgroundColor: grey[900],
    margin: theme.spacing(0.5),
    "@supports (backdrop-filter: blur(3px)) or (-webkit-backdrop-filter: blur(3px))":
      {
        WebkitBackdropFilter: "blur(15px)",
        backdropFilter: "blur(15px)",
        // backgroundColor: `${grey[900]}99`,
        backgroundColor: "transparent",
        border: `1px solid ${grey[900]}`,
      },
    overflow: "hidden",
    [`& > div`]: {
      width: "100%",
      height: "100%",
    },
  },
  [`&.load`]: {
    justifyContent: "center",
    alignItems: "center",
  },
}));
function ItemMenu({ anchorEl, onClose: handleClose }) {
  const open = Boolean(anchorEl);

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem onClick={handleClose}>equip</MenuItem>
      {/* <MenuItem onClick={handleClose}>My account</MenuItem>
      <MenuItem onClick={handleClose}>Logout</MenuItem> */}
    </Menu>
  );
}
export default function InventoryBox() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [rawItems, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const items = useMemo(() => {
    if (rawItems.length >= 9) return rawItems;
    const minArray = new Array(9).fill(undefined);
    for (let i = 0; i < rawItems.length; i++) {
      minArray[i] = rawItems[i];
    }
    return minArray;
  }, [rawItems]);

  function handleClick(e) {
    setAnchorEl(e.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  useEffect(() => {
    async function checkRing() {
      if (isTransfer) return;
      setLoading(true);

      const hasRing = await isOwnRing(characterTBAArr);
      console.log(hasRing);

      if (hasRing) {
        setItems([
          {
            name: "The One Ring",
            description:
              "Three Rings for the Elven-kings under the sky,Seven for the Dwarf-lords in their halls of stone,Nine for Mortal Men doomed to die,One for the Dark Lord on his dark throneIn the Land of Mordor where the Shadows lie.   One Ring to rule them all, One Ring to find them,   One Ring to bring them all, and in the darkness bind themIn the Land of Mordor where the Shadows lie.",
            image:
              "https://nftstorage.link/ipfs/bafybeid6bnsatz56fkgb4hldqtrhw3hqs7niyp5uvqcbwx6u5pre5uwzze",
            glb: "https://nftstorage.link/ipfs/bafybeib4wicygqdinah6kwnur65q5muekzlj7i7rtif4hkfx7oce6bfu3u",
          },
        ]);
      } else {
        setItems([]);
      }
      setLoading(false);
    }

    checkRing();
  }, []);

  return (
    <StyledBox elevation={10} className={clsx(loading && "load")}>
      {!loading ? (
        items.map((_item, _idx) =>
          _item ? (
            <>
              <Paper component={ButtonBase} onClick={handleClick}>
                <div
                  style={{
                    backgroundImage: `url(${_item.image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Paper>
              <ItemMenu anchorEl={anchorEl} onClose={handleClose} />
            </>
          ) : (
            <Paper key={_idx} />
          )
        )
      ) : (
        <div>
          <CircularProgress />
        </div>
      )}
    </StyledBox>
  );
}
