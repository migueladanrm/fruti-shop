import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  DialogActions,
  Button,
} from "@mui/material";
import { ChangeEvent } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { fruitsState, settingsState } from "../AppState";
import { Fruit } from "../models";

const SetupDialog = (props: { isOpen: boolean; onDismiss: () => void }) => {
  const [settings, setSettings] = useRecoilState(settingsState);
  const setFruits = useSetRecoilState(fruitsState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const setup = () => {
    const { fruitsPerContainer, containers } = settings;
    setFruits(Array(containers * fruitsPerContainer).fill(Fruit.Orange));
    setSettings({ ...settings, firstSetup: true });
  };

  return (
    <Dialog fullWidth open={props.isOpen} maxWidth="sm">
      <DialogTitle>Setup Fruit Shop</DialogTitle>
      <DialogContent>
        <Grid container direction="column">
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="number-of-containers">
              Number of Containers
            </InputLabel>
            <OutlinedInput
              id="number-of-containers"
              name="containers"
              type="number"
              onChange={handleChange}
              value={settings.containers}
              endAdornment={
                <InputAdornment position="start">containers</InputAdornment>
              }
              inputProps={{
                min: 1,
              }}
            />
          </FormControl>

          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="fruits-per-container">
              Fruits per Container
            </InputLabel>
            <OutlinedInput
              id="fruits-per-container"
              name="fruitsPerContainer"
              type="number"
              value={settings.fruitsPerContainer}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="start">fruits</InputAdornment>
              }
              inputProps={{
                min: 1,
              }}
            />
          </FormControl>

          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="price-per-fruit">Price per Orange</InputLabel>
            <OutlinedInput
              id="price-per-fruit"
              name="pricePerFruit"
              type="number"
              value={settings.pricePerFruit}
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              inputProps={{
                min: 1,
              }}
            />
            <FormHelperText>
              All containers will be filled with oranges at start.
            </FormHelperText>
          </FormControl>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={setup}>Start</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SetupDialog;
