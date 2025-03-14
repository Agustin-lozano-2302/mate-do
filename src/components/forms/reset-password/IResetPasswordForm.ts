import { IAlertaPopupProps } from "@/interface/Alert-Interface"

export interface IResetPasswordForm {
    setCustomAlert: React.Dispatch<React.SetStateAction<IAlertaPopupProps>>
    setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>
}
