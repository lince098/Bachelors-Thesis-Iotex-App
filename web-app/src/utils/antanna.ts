import Antenna from "iotex-antenna";
import { WsSignerPlugin } from "./ws-plugin";
import { utils } from "./index";
import { publicConfig } from "../configs/public";
import { IAccount } from "iotex-antenna/lib/account/account";
import { JsBridgeSignerMobile } from "./js-plugin";
//import { eventBus } from "./eventBus";

export class AntennaUtils {
  public static defaultContractOptions = {
    gasLimit: "20000000",
    gasPrice: "1000000000000",
  };
  public static antenna: Antenna | undefined = undefined;
  public static wsSigner: WsSignerPlugin | undefined = undefined;
  public static jsSigner: JsBridgeSignerMobile | undefined = undefined;
  private static _defaultAccount: IAccount;

  public static get account() {
    return this.antenna?.iotx?.accounts[0];
  }

  static getAntenna(): undefined | Antenna {
    if (this.antenna) {
      return this.antenna;
    }
    if (utils.env.isBrowser() && !utils.env.isIoPayMobile()) {
      this.wsSigner = new WsSignerPlugin({
        options: {
          packMessage: (data) => JSON.stringify(data),
          //@ts-ignore
          unpackMessage: (data) => JSON.parse(data),
          attachRequestId: (data, requestId) =>
            Object.assign({ reqId: requestId }, data),
          extractRequestId: (data) => data && data.reqId,
        },
      });

      const antenna = new Antenna(publicConfig.IOTEX_CORE_ENDPOPINT, {
        signer: this.wsSigner.start(),
      });
      //@ts-ignore
      this.antenna = antenna;
      return antenna;
    }
    if (utils.env.isIoPayMobile()) {
      this.jsSigner = new JsBridgeSignerMobile();
      const antenna = new Antenna(publicConfig.IOTEX_CORE_ENDPOPINT, {
        signer: this.jsSigner,
      });
      //@ts-ignore
      this.antenna = antenna;
      return antenna;
    }

    if (utils.env.isSSR()) {
      const antenna = new Antenna(publicConfig.IOTEX_CORE_ENDPOPINT);
      //@ts-ignore
      this.antenna = antenna;
      return antenna;
    }
  }

  static async getIoPayAddress(): Promise<string> {
    if (!AntennaUtils.antenna) {
      AntennaUtils.antenna = AntennaUtils.getAntenna();
    }
    if (utils.env.isIoPayMobile()) {
      //@ts-ignore
      const address = await AntennaUtils.jsSigner.getIoAddressFromIoPay();
      //@ts-ignore
      AntennaUtils.antenna.iotx.accounts[0] = await AntennaUtils.jsSigner.getAccount(
        address
      );
      return address;
    }
    if (utils.env.isBrowser()) {
      //@ts-ignore
      const accounts = await AntennaUtils.wsSigner.getAccounts();
      if (accounts[0]) {
        //@ts-ignore
        AntennaUtils.antenna.iotx.accounts[0] = await AntennaUtils.wsSigner.getAccount(
          accounts[0].address
        );
      }
      return (accounts && accounts[0] && accounts[0].address) || "";
    }
    return "";
  }

  static async getIotxBalance(address: string): Promise<number> {
    const antenna = AntennaUtils.getAntenna();
    //@ts-ignore
    const { accountMeta } = await antenna.iotx.getAccount({ address });
    // @ts-ignore
    return Number(fromRau(accountMeta.balance, "Iotx"));
  }

  static async signMessage(message: string): Promise<string> {
    const antenna = AntennaUtils.getAntenna();
    //@ts-ignore
    if (antenna.iotx.signer && antenna.iotx.signer.signMessage) {
      //@ts-ignore
      const signed = await antenna.iotx.signer.signMessage(message);
      if (typeof signed === "object") {
        return Buffer.from(signed).toString("hex");
      }
      return signed;
    }
    //@ts-ignore
    const account = antenna.iotx.accounts[0];
    const sig = account && (await account.sign(message));
    return (sig && sig.toString("hex")) || "";
  }
}
