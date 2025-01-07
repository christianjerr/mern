import * as React from "react";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { getProducts } from "../features/product/productSlice";
import { InvidualProductType } from "../types";
import { editProduct } from "../features/product/editProductSlice";

type Props = {
  handleCancelClick: () => void;
  individualProduct: InvidualProductType;
};

const EditModal = (props: Props) => {
  const { handleCancelClick, individualProduct } = props;
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = React.useState({
    name: individualProduct.name,
    price: String(individualProduct.price),
    image: individualProduct.image,
  });
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ref: string
  ) => {
    setFormData({ ...formData, [ref]: e.target.value });
  };

  const handleFormCreate = () => {
    if (formData.name && formData.price && formData.image) {
      dispatch(
        editProduct({ id: individualProduct._id, payload: formData })
      ).then(() => dispatch(getProducts({})));
      handleCancelClick();
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={true}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 400 }}>
          <div className="pb-3">
            <Box
              component="form"
              sx={{ "& > :not(style)": { my: 1 } }}
              noValidate
              autoComplete="off"
            >
              <Typography
                variant="inherit"
                gutterBottom
                sx={{ color: "text.secondary" }}
              >
                EDIT PRODUCT
              </Typography>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Enter product name"
                variant="outlined"
                value={formData.name}
                onChange={(e) => handleFormChange(e, "name")}
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="Enter product price"
                variant="outlined"
                value={formData.price}
                onChange={(e) => handleFormChange(e, "price")}
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="Enter product image"
                variant="outlined"
                value={formData.image}
                onChange={(e) => handleFormChange(e, "image")}
              />
            </Box>
          </div>
          <CardActions>
            <Button size="small" variant="contained" onClick={handleFormCreate}>
              SUBMIT
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
          </CardActions>
        </ModalContent>
      </Modal>
    </div>
  );
};

const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "base-Backdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);

export default EditModal;
