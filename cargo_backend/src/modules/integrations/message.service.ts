import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";


@Injectable()
export class MessageService {
  private loggger = new Logger(MessageService.name)

  constructor(private readonly config: ConfigService) { }

  public async sendMessage(phone: string, message: string) {
    this.loggger.log("phone: " + phone + " message: " + message)
    let mobile = phone
    if (mobile.startsWith("+976")) {
      mobile = mobile.replace("+976", "");
    }
    await this.callProSend(mobile, message)
  }

  private async callProSend(phone: string, message: string) {
    try {
      const url = `${this.config.get("CALLPRO_API_URL")}?from=${this.config.get("CALLPRO_API_PHONE")}&to=${phone}&text=${message}`
      const { data } = await axios.get(url,{
        headers: {
          'x-api-key': `${this.config.get("CALLPRO_API_KEY")}`
        }
      });
      this.loggger.log("call pro message send:", data)
    } catch (error: any) {
      this.loggger.error(JSON.stringify(error))
    }
  }
}