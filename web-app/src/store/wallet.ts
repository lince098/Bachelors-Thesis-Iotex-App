import { makeObservable, observable, runInAction, action } from "mobx";
import remotedev from "mobx-remotedev";
import { utils } from "../utils/index";
import { AntennaUtils } from "../utils/antanna";
import { fromRau, toRau } from "iotex-antenna/lib/account/utils";
import { hasRol, Roles } from "../utils/PistaUtils";

@remotedev({ name: "wallet" })
export class WalletStore {
  account = {
    address: "",
    balance: "",
    gestor: false,
    admin: false,
  };

  isConnectWsError = false;
  constructor() {
    makeObservable(this, {
      account: observable,
      isConnectWsError: observable,
      initWS: action,
      init: action,
    });
  }

  async init() {
    this.initEvent();
    await this.initWS();
  }

  initEvent() {
    utils.eventBus
      .on("client.iopay.connected", () => {
        console.log("iopay-desktop connected.");
        this.isConnectWsError = false;
      })
      .on("client.iopay.close", () => {
        this.account = {
          address: "",
          balance: "",
          gestor: false,
          admin: false,
        };
      })
      .on("client.iopay.connectError", () => {
        this.account = {
          address: "",
          balance: "",
          gestor: false,
          admin: false,
        };
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
      console.log("Settimeout");

      return setTimeout(() => {
        this.initWS();
      }, 2000);
      // @ts-ignore
    }
    runInAction(() => {
      this.account.address = address;
    });
    this.loadAccount();
  }

  async loadAccount() {
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

    if (!err && data) {
      if (data?.accountMeta) {
        const { balance } = data?.accountMeta;
        runInAction(() => {
          this.account.balance = fromRau(balance, "iotx");
        });
      }
    }
    const [err1, data1] = await utils.helper.promise.runAsync(
      hasRol(Roles.ADMIN_ROLE, this.account.address)
    );

    if (err1 || !data1) {
      return setTimeout(() => {
        this.loadAccount();
      }, 2000);
    }

    runInAction(() => {
      this.account.admin = data1;
    });

    const [err2, data2] = await utils.helper.promise.runAsync(
      hasRol(Roles.GESTOR_ROLE, this.account.address)
    );

    if (err2 || !data2) {
      return setTimeout(() => {
        this.loadAccount();
      }, 2000);
    }
    
    runInAction(() => {
      this.account.gestor = data2;
    });
  }
}
