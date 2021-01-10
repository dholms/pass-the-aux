import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import HelpButton from "./HelpButton";
import { withStyles, createStyles } from "@material-ui/core/styles";
import background from "../assets/background.jpg";

const styles = () => {
  return createStyles({
    main: {
      background: `url('${background}') no-repeat center center fixed`,
      backgroundSize: 'cover',
      // backgroundImage: `url('${background}')`,
      height: "100%",
      width: "100%",
    },
    header: {
      textAlign: "center",
      marginBottom: 64,
      fontSize: 128
    },
    container: {
      padding: 64,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: "white"
    },
    helpBtn: {
      position: "absolute",
      top: 16,
      right: 16,
      color: "white",
    },
  });
};

const AppStyle = ({ classes, children }: any) => {
  return (
    <div className={classes.main}>
      <Container className={classes.container}>
        <HelpButton classes={{ main: classes.helpBtn }} />
        <Typography variant="h1" className={classes.header}>
          Pass the Aux
        </Typography>
        {children}
      </Container>
    </div>
  );
};

export default withStyles(styles)(AppStyle);
