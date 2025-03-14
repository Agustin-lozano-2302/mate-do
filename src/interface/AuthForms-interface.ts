import { IAlertaPopupProps } from "@/interface/Alert-Interface"

export interface IAuthForm {
    setCustomAlert: React.Dispatch<React.SetStateAction<IAlertaPopupProps>>
    setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>
}
