import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Snackbar,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { blueGrey } from "@mui/material/colors";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  fruitsState,
  fruitContainersState,
  settingsState,
  totalEarningsState,
  salesState,
} from "../AppState";
import SetupDialog from "./SetupDialog";
import { Fruit } from "../models";
import { ChangeEvent, useState } from "react";

const AppView = () => {
  const [selectedFruit, setSelectedFruit] = useState(Fruit.Orange);

  const [fruits, setFruits] = useRecoilState(fruitsState);
  const [sales, setSales] = useRecoilState(salesState);
  const [settings, setSettings] = useRecoilState(settingsState);

  const fruitContainers = useRecoilValue(fruitContainersState);
  const totalEarnings = useRecoilValue(totalEarningsState);

  const [showSnackbar, setShowSnackbar] = useState(false);

  const onAddFruitButtonClick = () => {
    if (fruits.length < settings.containers * settings.fruitsPerContainer)
      setFruits(fruits.concat(selectedFruit));
    else {
      setShowSnackbar(true);
    }
  };

  const onSellFruitButtonClick = () => {
    setSales(sales.concat(settings.pricePerFruit));
    setFruits(
      fruits
        .slice(0, fruits.indexOf(selectedFruit))
        .concat(fruits.slice(fruits.indexOf(selectedFruit) + 1))
    );
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSettings({ ...settings, pricePerFruit: Number.parseInt(value) });
  };

  const handleSelectedFruitChange = (e: SelectChangeEvent<Fruit>) => {
    setSelectedFruit(e.target.value as Fruit);
  };

  return (
    <>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message="Elements limit reached!"
      />

      <Grid container minHeight="100vh" sx={{ background: blueGrey[50] }}>
        <Container>
          <Grid
            container
            item
            alignItems="center"
            justifyContent="space-between"
            sx={{ py: 4 }}
          >
            <Typography fontSize="28px" fontWeight={600}>
              Fruti-shop
            </Typography>

            <Typography
              color="red"
              fontSize="18px"
              fontWeight={600}
            >{`$ ${totalEarnings}`}</Typography>
          </Grid>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Manage</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container item>
                <Grid container direction="column">
                  <FormControl sx={{ m: 1 }}>
                    <InputLabel htmlFor="price-input">Price</InputLabel>
                    <OutlinedInput
                      id="price-input"
                      name="price"
                      value={settings.pricePerFruit}
                      type="number"
                      onChange={handlePriceChange}
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      inputProps={{ min: 1 }}
                      label="Amount"
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1 }}>
                    <InputLabel htmlFor="fruit-select">Fruit</InputLabel>
                    <Select
                      id="fruit-select"
                      name="fruit"
                      placeholder="Fruit"
                      onChange={handleSelectedFruitChange}
                      value={selectedFruit}
                    >
                      <MenuItem value={Fruit.Apple}>Apple</MenuItem>
                      <MenuItem value={Fruit.Orange}>Orange</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid container justifyContent="center">
                  <Button
                    variant="contained"
                    sx={{ m: 1 }}
                    onClick={onAddFruitButtonClick}
                  >
                    Add
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ m: 1 }}
                    onClick={onSellFruitButtonClick}
                  >
                    Sell
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {settings.firstSetup && (
            <Grid
              container
              direction="row-reverse"
              justifyContent="center"
              spacing={4}
              sx={{ mt: 4 }}
            >
              {fruitContainers.map((g, i) => (
                <Grid item sx={{ minWidth: "200px" }}>
                  <Paper>
                    <Grid container direction="column">
                      <Typography
                        fontSize="18px"
                        fontWeight={600}
                        p={2}
                      >{`Container ${i + 1}`}</Typography>

                      <Grid container direction="column" sx={{ pb: 2 }}>
                        {g.map((f, j) => (
                          <Grid
                            container
                            item
                            sx={{ p: 1 }}
                            justifyContent="center"
                          >
                            <Chip
                              label={Fruit[f]}
                              color={f === Fruit.Apple ? "error" : "warning"}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Grid>

      <SetupDialog
        isOpen={!settings.firstSetup}
        onDismiss={() => setSettings({ ...settings, firstSetup: true })}
      />
    </>
  );
};

export default AppView;
