import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

  type  alertProps = {
    title: string
    description: string
  }

  export const AlertMessage = ({title="Error", description}: alertProps)=> {
    return (
      <Alert variant="destructive">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          {description}
        </AlertDescription>
      </Alert>
    )
  }