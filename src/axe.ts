import { AxePuppeteer } from 'axe-puppeteer';
import * as puppeteer from 'puppeteer';
import { Url } from './entities/url.entity';

export async function axeEngine(url: Url) {
  const nodeArray = [];

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setBypassCSP(true);

  await page.goto(url.name);

  const results = await new AxePuppeteer(page).analyze();

  const violations = results.violations.map(item => {
    item.nodes.forEach(nodeItem => {
      nodeArray.push({
        ruleId: item.id,
        html: nodeItem.html,
      });
    });

    return {
      id: item.id,
      impact: item.impact,
      tags: item.tags,
      description: item.description,
      help: item.help,
      helpUrl: item.helpUrl,
    };
  });

  await page.close();
  await browser.close();

  return {
    url: url,
    timestamp: results.timestamp,
    violatedRules: violations,
    node: nodeArray,
  };
}
