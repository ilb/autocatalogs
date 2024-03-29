import awilix from 'awilix';
import prisma from '../libs/prisma.mjs';
import container from './container.mjs';
import { Agent as BetterHttpsProxyAgent } from 'better-https-proxy-agent';
import {
  configureAgentConfig,
  configureCert,
  configureProxy,
  UriAccessorFactory,
  UriAgentFactory
} from '@ilb/uriaccessorjs';
import tls from "tls";
import fs from "fs";
import createDebug from "debug";

const { asValue, asClass } = awilix;
const debug = createDebug('autocatalogs');

export default class Application {
  constructor() {
    this.container = null;
  }
  /**
   * initialize application
   */

  configureCert(context) {
    const certfile = context['apps.autocatalogs.certfile'];
    const passphrase = context['apps.autocatalogs.cert_PASSWORD'];
    try {
      tls.createSecureContext({
        cert: fs.readFileSync(certfile),
        key: fs.readFileSync(certfile),
        passphrase
      });
      debug(`Certificate load OK`);
    } catch (error) {
      console.trace(error)
      throw new Error(`Unable to load certificate: ${error.message}`)
    }

    return configureCert(certfile, passphrase);
  }

  async createContainer() {
    this.container = awilix.createContainer();
    const uriAgentMap = new Map();

    let httpAgent;
    const proxy = process.env['internet.proxy.https_apps'];
    const proxyEnabled = JSON.parse(process.env['apps.autocatalogs.proxyEnabled']);
    const certConfig = this.configureCert(process.env);
    if (proxyEnabled) {
      httpAgent = new BetterHttpsProxyAgent({}, { ...certConfig, ...configureProxy(proxy) });
    } else {
      httpAgent = configureAgentConfig(certConfig);
    }

    uriAgentMap.set(process.env['apps.autocatalogs.avitocatalogs_url'], httpAgent);

    this.container.register({
      prisma: asValue(prisma),
      currentUser: asValue(process.env.USER),
      uriAccessorFileEnabled: asValue(true),
      uriAccessorFactory: asClass(UriAccessorFactory),
      uriAgentFactory: asClass(UriAgentFactory),
      uriAgentMap: asValue(uriAgentMap),
      avitoCatalogsUrl: asValue(process.env['apps.autocatalogs.avitocatalogs_url'])
    });

    const classes = {};

    for (const [key, value] of container) {
      classes[key] = asClass(value);
    }

    this.container.register(classes);
  }

  /**
   * create scope for http request
   * @param {*} req
   * @param res
   */
  async createScope(req, res) {
    if (this.container == null) {
      await this.createContainer();
    }

    return this.container.createScope();
  }

  /**
   * resolve bean by name
   * @param {*} name name of bean
   */
  resolve(name) {
    return this.container.resolve(name);
  }

  asArray(resolvers) {
    return {
      resolve: (container, opts) => resolvers.map((r) => container.build(r, opts))
    };
  }
}
