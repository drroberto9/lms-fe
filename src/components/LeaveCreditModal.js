import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

const LeaveCreditModal = ({ open, setOpen, data }) => {
  const handleClose = () => setOpen(false);
  console.log(data);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {data?.first_name} {data?.last_name}
          </Typography>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {data?.leave_credits.map((credit, index) => {
              return (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {credit.type}: {credit.leave_credit}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default LeaveCreditModal;
