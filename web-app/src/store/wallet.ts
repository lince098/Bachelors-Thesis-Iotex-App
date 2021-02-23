import { makeObservable, observable, computed, action } from "mobx";
import remotedev from "mobx-remotedev";
import { utils } from "../utils/index";
import { AntennaUtils } from "../utils/antanna";
import { fromRau, toRau } from "iotex-antenna/lib/account/utils";

@remotedev({ name: "wallet" })
export class WalletStore {
  account = {
    address: "",
    balance: "",
  };

  isConnectWsError = false;
  constructor() {
    makeObservable(this, {
      account: observable,
      isConnectWsError: observable,
      initWS: action,
      init: action,
      loadAccount: action,
    });
  }

  async init() {
    try {
      this.initEvent();
      await this.initWS().catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }

  initEvent() {
    utils.eventBus
      .on("client.iopay.connected", () => {
        console.log("iopay-desktop connected.");
        this.isConnectWsError = false;
      })
      .on("client.iopay.close", () => {
        this.account = { address: "", balance: "" };
      })
      .on("client.iopay.connectError", () => {
        this.account = { address: "", balance: "" };
        this.isConnectWsError = true;
      });
  }

  async initWS() {
    const [err, address] = await utils.helper.promise.runAsync(
      AntennaUtils.getIoPayAddress()
    );

    console.log(
      "*********\nLogs de getiIoPAyAdrres ",
      err,
      "\nY address :",
      address,
      "\n********"
    );

    if (err || !address || address === "") {
      return setTimeout(() => {
        this.initWS();
      }, 2000);
      // @ts-ignore
    }

    this.account.address = address;
    this.loadAccount();
  }

  async loadAccount() {
    if (!this.account.address) return;
    // @ts-ignore
    const [err, data] = await utils.helper.promise.runAsync(
      // @ts-ignore
      AntennaUtils.getAntenna().iotx.getAccount({
        address: this.account.address,
      })
    );

    console.log(
      "*********\nLogs de loadAcccount: ",
      err,
      "\nY data :",
      data?.accountMeta,
      "\n********"
    );
    if (err || !data) {
      return setTimeout(() => {
        this.loadAccount();
      }, 2000);
    }

    if (!err && data)
      if (data?.accountMeta) {
        const { balance } = data?.accountMeta;
        console.log(balance);

        this.account.balance = fromRau(balance, "iotx");
        console.log(this.account.balance);
      }
  }
}
