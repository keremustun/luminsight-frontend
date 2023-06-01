// import { chromium } from 'playwright';

// export class PdfService {
//   async generatePDF(element) {
//     const browser = await chromium.launch();
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     await page.setViewportSize({
//       width: 1080,
//       height: 1920,
//     });

//     const resumeElement = element.outerHTML;
//     await page.setContent(resumeElement);
//     await page.pdf({ path: 'resume.pdf', format: 'a4' });

//     await browser.close();
//   }
// }
