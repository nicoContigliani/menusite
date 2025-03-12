import { paymentsLevelsCero } from "./paymentsLevelCero/paymentsLevelsCero";

export const paymentLevelContext = (key: string, value: string) => {
    switch (key) {
        case "paymentLevel0":
            return paymentsLevelsCero()

        default:
            break;
    }
}