export type IAlertType = "error" | "warning" | "success" | "info"

export interface IAlertaPopupProps {
  message: string
  type: IAlertType
  duration?: number
  onClose?: () => void
}