export interface interfaces {}

export interface INoticeProps {
  type: "success" | "info" | "warning" | "error";
  message: string;
  description: string;
}
