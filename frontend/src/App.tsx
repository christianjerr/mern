import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { getProducts } from "./features/product/productSlice";
import { ProductType } from "./types";
import NavigationBar from "./components/NavigationBar";
import DeleteModal from "./components/DeleteModal";
import { deleteProduct } from "./features/product/deleteProductSlice";
import ViewModal from "./components/ViewModal";
import { getIndividualProduct } from "./features/product/getIndividualProductSlice";
import CreationModal from "./components/CreationModal";
import EditModal from "./components/EditModal";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) => state.product);
  const individualProduct = useSelector(
    (state: RootState) => state.individualProduct
  );
  const [viewToggler, setviewToggler] = useState(false);
  const [creationToggler, setCreationToggler] = useState(false);
  const [editToggler, setEditToggler] = useState(false);
  const [deleteToggler, setIsDeleteToggler] = useState(false);
  const [deletionID, setDeletionID] = useState("");

  useEffect(() => {
    dispatch(getProducts({}));
  }, [dispatch]);

  const mediaCard = (data: ProductType) => {
    return (
      data.length >= 1 &&
      data.map((prod) => {
        return (
          <div style={{ flex: "flex: 0 0 33.3333%" }}>
            <Card sx={{ minWidth: 345, maxWidth: 345 }}>
              <div className="p-4 ">
                <div
                  className="cursor-pointer"
                  onClick={() => handleViewToggler(prod._id)}
                >
                  <CardMedia sx={{ height: 210 }} image={prod.image} />
                  <CardContent className="min-h-[150px]">
                    <Typography variant="inherit" gutterBottom>
                      {prod.name.toUpperCase()}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="inherit"
                      sx={{ color: "text.secondary" }}
                    >
                      {prod._id}
                    </Typography>
                    <Typography
                      variant="inherit"
                      sx={{ color: "text.secondary" }}
                    >
                      {`P. ${prod.price}.00`}
                    </Typography>
                  </CardContent>
                </div>
                <div>
                  <CardActions>
                    <Button
                      color="error"
                      size="small"
                      variant="contained"
                      onClick={() => handleDeleteBtn(prod._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleEditToggler(prod._id)}
                    >
                      Edit
                    </Button>
                  </CardActions>
                </div>
              </div>
            </Card>
          </div>
        );
      })
    );
  };

  const handleEditToggler = async (id: string) => {
    const { payload } = await dispatch(getIndividualProduct(id));

    if (payload) {
      setEditToggler(true);
    }
  };

  const handleViewToggler = async (id: string) => {
    const { payload } = await dispatch(getIndividualProduct(id));

    if (payload) {
      setviewToggler(true);
    }
  };

  const handleCloseViewToggler = () => {
    setviewToggler(false);
  };

  const handleDeleteBtn = (id: string) => {
    setIsDeleteToggler(true);
    setDeletionID(id);
  };

  const handleCancelClick = () => {
    setIsDeleteToggler(false);
  };

  const handleConfirmClick = () => {
    dispatch(deleteProduct(deletionID)).then(() => {
      setIsDeleteToggler(false);
      dispatch(getProducts({}));
      setDeletionID("");
    });
  };

  const handleCreateButtonClick = () => {
    setCreationToggler(true);
  };

  const handleCreationCancelClick = () => {
    setCreationToggler(false);
  };

  return (
    <>
      <NavigationBar handleCreateButtonClick={handleCreateButtonClick} />
      <div className="p-10">
        <div className="flex flex-wrap list-none pl-0 gap-5">
          {mediaCard(product.data)}
        </div>
        {deleteToggler && (
          <DeleteModal
            handleCancelClick={handleCancelClick}
            handleConfirmClick={handleConfirmClick}
          />
        )}
        {viewToggler && (
          <ViewModal
            handleCloseClick={handleCloseViewToggler}
            individualProduct={individualProduct.data}
          />
        )}
        {creationToggler && (
          <CreationModal handleCancelClick={handleCreationCancelClick} />
        )}
        {editToggler && (
          <EditModal
            handleCancelClick={() => setEditToggler(false)}
            individualProduct={individualProduct.data}
          />
        )}
      </div>
    </>
  );
}
export default App;
