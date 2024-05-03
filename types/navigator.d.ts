type RootStackParamList = {
  Home: undefined;
  TrainList: {
    from: import("korail-ts").Station;
    to: import("korail-ts").Station;
  };
  Setting: undefined;
};
