import { enterBoard } from "api/Board";
import { EnterBoardParams } from "models/Board.interface";

export async function func(lst: any) {
  console.log("test API");
  let i = 1;
  for (const elem of lst) {
    console.log("Test data", i++, " is....", elem);
    const results = await enterBoard(elem);
    console.log("Result is...", results);
  }
}

const data1: EnterBoardParams = {
  boardId: 8,
};

//무빙건으로 테스트 시 이건 FAIL이 떠야 정상
const data2: EnterBoardParams = {
  boardId: 9,
};

//무빙건으로 테스트 시 이건 FAIL이 떠야 정상
const data3: any = {};

const data4: any = {};

export let datas: Array<any> = [
  data1,
  data2,
  // data3,
  // data4,
  // data5,
];
