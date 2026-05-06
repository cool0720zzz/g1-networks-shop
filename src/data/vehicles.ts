// V2: 차종 빠른 검색 위젯용 데이터 (Year/Make/Model)

export interface VehicleMake {
  id: string;
  name: string;
  models: VehicleModel[];
}

export interface VehicleModel {
  id: string;
  name: string;
  trims: string[]; // 모델 코드 + 연식
}

export const vehicleMakes: VehicleMake[] = [
  {
    id: "bmw",
    name: "BMW",
    models: [
      { id: "3-series", name: "3시리즈", trims: ["F30/F31/F34 (2012~2019)", "G20 (2019~)"] },
      { id: "5-series", name: "5시리즈", trims: ["G30/G31 (2017~)", "F10/F11 (2010~2016)"] },
      { id: "x3", name: "X3", trims: ["G01 (2018~)", "F25 (2010~2017)"] },
      { id: "x5", name: "X5", trims: ["G05 (2018~)", "F15 (2013~2018)"] },
      { id: "m3", name: "M3", trims: ["F80 (2014~2018)", "G80 (2020~)"] },
    ],
  },
  {
    id: "benz",
    name: "Mercedes-Benz",
    models: [
      { id: "c-class", name: "C-Class", trims: ["W205 (2014~2021)", "W206 (2021~)"] },
      { id: "e-class", name: "E-Class", trims: ["W213 (2016~)", "W212 (2009~2016)"] },
      { id: "s-class", name: "S-Class", trims: ["W223 (2020~)", "W222 (2013~2020)"] },
      { id: "glc", name: "GLC", trims: ["X253 (2015~)"] },
    ],
  },
  {
    id: "audi",
    name: "Audi",
    models: [
      { id: "a4", name: "A4", trims: ["B9 (2015~)", "B8 (2008~2015)"] },
      { id: "a6", name: "A6", trims: ["C8 (2018~)", "C7 (2011~2018)"] },
      { id: "q5", name: "Q5", trims: ["FY (2017~)"] },
    ],
  },
  {
    id: "vw",
    name: "Volkswagen",
    models: [
      { id: "golf", name: "Golf", trims: ["MK7 (2012~2020)", "MK8 (2020~)"] },
      { id: "tiguan", name: "Tiguan", trims: ["AD1 (2016~)"] },
    ],
  },
];
