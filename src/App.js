import { Button, Paper, TextField, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    width: "40%",
    justifyContent: "center",
    textAlign: "center",
    paddingTop: theme.spacing(3),

    "& form": {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(2, 4),

      "& button": {
        marginTop: theme.spacing(6),
      },
    },
  },
}));

function App() {
  const classes = useStyles();
  const [state, setState] = useState({
    phone: "",
    password: "",
  });
  const URL =
    process.env === "production"
      ? "https://bezomoin.herokuapp.com/api/users/add"
      : "http://localhost:5555/api/users/add";

  const handleChange = ({ target }) =>
    setState((prev) => ({ ...prev, [target.name]: target.value }));

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (!state.password || !state.phone) {
      return Swal.fire({
        title: "Empty Details",
        text: "Cannot register with empty details",
        icon: "error",
        confirmButtonText: "Try again",
      });
    }

    if (!Number(state.phone)) {
      return Swal.fire({
        title: "Wrong Details",
        text: "Please enter correct phone number",
        icon: "error",
        confirmButtonText: "Try again",
      });
    }

    try {
      const res = await axios.post(URL, state);

      Swal.fire({
        title: "Success!",
        text: "Registration Successful, check the console for your secret",
        icon: "success",
        confirmButtonText: "Cool, let's go",
      });

      setState({
        password: "",
        phone: "",
      });

      console.log(res.data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Oppps, Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Try again",
      });
    }
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Paper className={classes.paper}>
        <Typography>Sign Up</Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            value={state.phone}
            name="phone"
            label="Phone"
            type="phone"
            onChange={handleChange}
            required
          />
          <TextField
            value={state.password}
            name="password"
            type="password"
            label="Password"
            onChange={handleChange}
            required
          />

          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={handleSubmit}
          >
            Create Account
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}

export default App;
