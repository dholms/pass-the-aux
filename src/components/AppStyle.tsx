import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import HelpButton from "./HelpButton";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import background from "../assets/background.jpg";

const styles = (theme: Theme) => {
  const white = "rgba(250, 250, 250, 0.93)";
  return createStyles({
    main: {
      backgroundImage: `url('${background}')`,
      height: "100%",
      width: "100%",
      padding: 64,
    },
    header: {
      textAlign: "center",
      marginBottom: 32,
    },
    container: {
      padding: 64,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: white,
      boxShadow: `0 0 8px 16px ${white}`,
    },
    helpBtn: {
      position: "absolute",
      top: 16,
      right: 16,
      color: white,
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
