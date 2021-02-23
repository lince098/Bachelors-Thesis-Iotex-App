import { AntennaUtils } from "./antanna";
import { eventBus } from "./eventBus";
import { rootStore } from "../store/store";

export const hooks = {
  async waitAccount() {
    return new Promise((res, rej) => {
      //@ts-ignore
      if (AntennaUtils.getAntenna().iotx.accounts[0]) {
        res(true);
      } else {
        eventBus.once("client.wallet.onAccount", () => {
          res(true);
        });
      }
    });
  },
  async waitIotxBalance() {
    return new Promise((res, rej) => {
      if (rootStore.wallet.account.balance) {
        res(true)
      } else {
        eventBus.once("client.wallet.iotx.onBalance", () => {
          res(true);
        });
      }
    });
  },
};
