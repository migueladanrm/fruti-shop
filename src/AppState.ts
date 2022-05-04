import { atom, selector } from "recoil";
import { Fruit } from "./models";

const fruitsState = atom<Fruit[]>({
  key: "fruits",
  default: [],
});

const salesState = atom<number[]>({
  key: "sales",
  default: [],
});

const settingsState = atom({
  key: "settings",
  default: {
    firstSetup: false,
    containers: 3,
    fruitsPerContainer: 6,
    pricePerFruit: 1,
    selectedFruit: Fruit.Orange,
  },
});

const fruitContainersState = selector({
  key: "fruit-containers",
  get: ({ get }) => {
    const settings = get(settingsState);
    const fruits = get(fruitsState);
    return Array<Fruit[]>(settings.containers)
      .fill([])
      .map((g, i) =>
        g.concat(
          fruits.slice(
            i * settings.fruitsPerContainer,
            i * settings.fruitsPerContainer + settings.fruitsPerContainer
          )
        )
      );
  },
});

const totalEarningsState = selector({
  key: "total-earnings",
  get: ({ get }) => get(salesState).reduce((a, b) => a + b, 0),
});

export {
  fruitContainersState,
  fruitsState,
  salesState,
  settingsState,
  totalEarningsState,
};
