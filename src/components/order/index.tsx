import { Grid } from "@material-ui/core";
import OrderForm from "./OrderForm";

const index = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <OrderForm />
      </Grid>
    </Grid>
  );
};

export default index;
