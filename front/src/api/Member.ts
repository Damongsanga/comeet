import {
  MemberQuery,
  MemberUpdateParams,
  NicknameCheckParams,
  EmailCheckParams,
} from "models/Member.interface";
import { localAxios } from "./http-commons";
import { SignupQuery } from "models/Login.interface";
import { makeQuerystring } from "utils/ApiUtil";

export const handleMember = async (memberId: string): Promise<MemberQuery> => {
  console.log(memberId);
  const response = await localAxios.get(`/member/${memberId}`);
  return response.data;
};

export const handleSignup = async (req: SignupQuery): Promise<SignupQuery> => {
  console.log(req);
  const response = await localAxios.post("/member", req);
  return response.data;
};

// 멤버 수정
export const updateMember = async (params: MemberUpdateParams) => {
  const url = `member`;
  const response = await localAxios.patch(url, params);

  console.log(response.data);
};

//닉네임 중복 검사
export const doubleCheckNicname = async (
  params: NicknameCheckParams
): Promise<boolean> => {
  const { nickname } = params;
  const url = `member/check${makeQuerystring({ nickname })}`;

  const response = await localAxios.get(url);
  console.log(response.data);
  return response.data;
};

//아이디 중복 검사
export const doubleCheckMemberId = async (
  memberId: string
): Promise<boolean> => {
  const url = `member/check${makeQuerystring({ memberId })}`;

  console.log(memberId);
  const response = await localAxios.get(url);
  return response.data;
};

//이메일 중복 검사
export const doubleCheckEmail = async (params: EmailCheckParams) => {
  const { email } = params;
  const url = `member/check${makeQuerystring({ email })}`;

  const response = await localAxios.get(url);
  return response.data;
};

//멤버 삭제
export const deleteMember = async () => {
  await localAxios.delete(`member`);
};
