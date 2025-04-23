import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";


@Injectable()
export class IpInfoService {

  private logger = new Logger(IpInfoService.name)

  private url;
  private token;

  constructor() {
    // this.url = this.config.get("IP_INFO_URL")
    // this.token = this.config.get("IP_INFO_TOKEN")
  }

  public async getIpInfo(ip: string) {
    // try {
    //   const { data } = await axios.get(`${this.url}/${ip}?token=${this.token}`);
    //   return data
    // } catch (error: any) {
    //   this.logger.error(error);
    //   return null;
    // }
  }

}