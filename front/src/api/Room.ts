import {
  CreateRoomParams,
  DeleteRoomParams,
  EnterRoomParams,
  LeaveRoomParams,
  ModifyRoomParams,
  PermitJoinRoomParams,
  SearchRoomParams,
  WithdrawRoomParams,
} from "models/Room.interface";
import { localAxios } from "./http-commons";
import { makeQuerystring } from "utils/ApiUtil";

export const createRoom = async (params: CreateRoomParams) => {
  const url = `room`;
  const response = await localAxios.post(url, params);
  return response.data;
};

export const modifyRoom = async (params: ModifyRoomParams) => {
  const { roomId } = params;
  const url = `room/${roomId}`;
  //roomId가 같이 바디에 들어가도 문제가 안 생긴다
  const response = await localAxios.patch(url, params);

  return response.data;
};

export const searchRoom = async (params: SearchRoomParams) => {
  const url = `room${makeQuerystring(params)}`;
  const response = await localAxios.get(url);
  return response.data;
};

export const deleteRoom = async (params: DeleteRoomParams) => {
  const { roomId } = params;
  const url = `room/${roomId}`;
  const response = await localAxios.delete(url);

  return response.data;
};

export const permitJoinRoom = async (params: PermitJoinRoomParams) => {
  const { roomId, memberId } = params;
  const url = `room/join/${roomId}`;
  const body = { memberId };
  const response = await localAxios.post(url, body);

  return response.data;
};

export const withdrawRoom = async (params: WithdrawRoomParams) => {
  const { roomId } = params;
  const url = `room/join/${roomId}`;
  const response = await localAxios.delete(url);

  return response.data;
};

export const enterRoom = async (params: EnterRoomParams) => {
  const { roomId } = params;
  const url = `room/${roomId}/enter`;
  const response = await localAxios.post(url, params);

  return response.data;
};

export const leaveRoom = async (params: LeaveRoomParams) => {
  const { roomId } = params;
  const url = `room/${roomId}/enter`;
  //이거 잘되는지 확인 필요
  const response = await localAxios.delete(url, { data: params });
  return response.data;
};
