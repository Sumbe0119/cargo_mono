import * as fs from 'fs'
import {
  Controller,
  Get,
  HostParam,
  Logger,
  Next,
  Req,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import { Organization } from '../organization/entities/organization.entity';
import { OrganizationService } from '../organization/organization.service';
import { CommonState } from 'src/common/enum';

@Controller({ host: [':account.mybox.mn', 'mybox.mn', 'localhost'] })
export class BotController {
  private readonly logger = new Logger(BotController.name);

  constructor(
    private readonly config: ConfigService,
    private readonly organizationService: OrganizationService,
  ) {}

    private getFrontManifest() {
    const FRONT_MANIFEST_FILE_PATH = this.config.get('FRONT_MANIFEST_FILE_PATH')

    const manifestContent = fs.readFileSync(FRONT_MANIFEST_FILE_PATH, 'utf8')
    const manifest = JSON.parse(manifestContent)

    return manifest
    }
  
  @Get('*')
  async index(
    @HostParam('account') account: string,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    this.logger.log(`Incoming request for host: ${account}, path: ${req.path}`);
    if (req.path === '/graphql') {
      return next();
    }
    let org: Organization | null = null;
    try {
      console.info('account==>', account);
      if (account) {
        org = await this.organizationService.getOne({
          slug: account,
          state: CommonState.ACTIVE,
        });
        console.info("🚀 ~ BotController ~ org:", org)
      }
      // const manifest = this.getFrontManifest();
      // const index = manifest['index.html'];

    const manifest = this.getFrontManifest()
    const index = manifest['index.html']
    return res.render('index', {
      jsFile: '/' + index.file,
      cssFile: '/' + index.css,
      org: org ? JSON.stringify(org) : 'null',
    })
    } catch (error) {
      this.logger.error(
        `Error processing request: ${error.message}`,
        error.stack,
      );
      return res.status(500).send('Internal Server Error');
    }
  }
}
