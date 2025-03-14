import { IAlertType } from "@/interface/Alert-Interface"
import { AlertCircle, CheckCircle, Info } from "lucide-react"


 export const AlertIcon = ({ type }: { type: IAlertType }) => {
    switch (type) {
      case "error":
        return <AlertCircle className="w-5 h-5" />
      case "warning":
        return <AlertCircle className="w-5 h-5" />
      case "success":
        return <CheckCircle className="w-5 h-5" />
      case "info":
        return <Info className="w-5 h-5" />
    }
  }