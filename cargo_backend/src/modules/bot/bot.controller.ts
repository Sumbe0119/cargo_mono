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

@Controller({ host: [':account.mybox.mn', ':mybox.mn', 'localhost'] })
export class BotController {
  private readonly logger = new Logger(BotController.name);

  constructor(
    private readonly config: ConfigService,
    private readonly organizationService: OrganizationService,
  ) {}

  @Get('*')
  async index(
    @HostParam('account') account: string,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    this.logger.log(`Incoming request for host: ${account}, path: ${req.path}`);

    // Skip for GraphQL requests
    if (req.path === '/graphql') {
      return next();
    }

    let org: Organization | null = null;

    try {
      if (account) {
        org = await this.organizationService.getOne({
          slug: account,
          state: CommonState.ACTIVE,
        });
      }

      const manifest = this.getFrontManifest();
      const index = manifest['index.html'];

      if (!index) {
        this.logger.error('Frontend manifest not found or invalid');
        return res.status(500).send('Frontend resources not available');
      }

      return res.render('index', {
        jsFile: '/' + index.file,
        cssFile: '/' + index.css,
        org: org ? JSON.stringify(org) : 'null',
      });
    } catch (error) {
      this.logger.error(
        `Error processing request: ${error.message}`,
        error.stack,
      );
      return res.status(500).send('Internal Server Error');
    }
  }

  private getFrontManifest(): any {
    try {
      // Implementation of your manifest retrieval
      // Example: return require('path/to/manifest.json');
      return {}; // Replace with actual implementation
    } catch (error) {
      this.logger.error('Failed to load frontend manifest', error);
      throw new Error('Frontend manifest unavailable');
    }
  }
}
