import { ErrorTypes } from "./enums";

const Errors = {
  [ErrorTypes.NOT_PLAYING]: "게임 플레이 중이 아닙니다.",
  [ErrorTypes.NOT_YOUR_TURN]: "당신의 차례가 아닙니다.",
  [ErrorTypes.ALREADY_PLAYING]: "이미 게임 플레이 중입니다.",
  [ErrorTypes.ALREADY_QUEUED]: "이미 대기열에 있습니다.",
  [ErrorTypes.ALREADY_CHECKED]: "이미 선택된 칸입니다.",
  [ErrorTypes.INCORRECT_FORMAT]: "잘못된 입력 형식입니다.",
  [ErrorTypes.NOT_IN_QUEUE]: "대기열에 없습니다.",
  [ErrorTypes.UNKNOWN]: "알 수 없는 오류가 발생했습니다.",
};

export default Errors;
