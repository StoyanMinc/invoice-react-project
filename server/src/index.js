import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import createHTML from 'create-html';
import handlebars from 'handlebars';
import puppeteer from 'puppeteer';
import nodemailer from 'nodemailer'

import router from './router.js';
import { automaticInvoiceService } from './services/automatic-invoice-service.js';
import { invoiceService } from './services/invoice-service.js';
import calculateExpireDate from './utils/calculateExpireDate.js';

// Ensure uploads directory exists
const uploadDir = path.join(import.meta.dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

const app = express();

try {
    await mongoose.connect('mongodb://localhost:27017/axion-angular-app');
    console.log('DB connected!');

} catch (error) {
    console.log(error.message);
}

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(router);
app.use('/uploads', express.static(uploadDir));

setInterval(async () => {

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;

    const currentDay = String(today.getDate());

    try {
        const automaticInvoices = await automaticInvoiceService.getAllInvoices();
        const automaticInvoiceToSend = automaticInvoices.filter(invoice => invoice.dateOfAutomatization === currentDay);

        if (automaticInvoiceToSend.length === 0) {
            return;
        }
        if (automaticInvoiceToSend.length > 0) {
            automaticInvoiceToSend.forEach(async (invoice) => {
                const { mol, totalPrice } = invoice;
                console.log("[AUTOMATIC INVOICING] Checking for automatic invoices...")
                var matchingInvoices = await invoiceService.getReleasedInvoices(formattedDate, mol, totalPrice);
                console.log("[AUTOMATIC INVOICES] Already found invoice, skipping creating...")
                if (matchingInvoices.length > 0) {
                } else {
                    console.log("[AUTOMATIC INVOICES] No invoice found, creating invoice...")
                    var lastInvoice = await invoiceService.getLastInvoice('фактура');
                    if (lastInvoice.length === 0) {
                        lastInvoice = [{ 'invoiceNumber': '300000001' }];
                    }

                    const newInvoiceNumber = lastInvoice[0].invoiceNumber + 1;
                    const expireDate = calculateExpireDate(formattedDate, invoice.paymentTerm);
                    const requestData = {
                        mol: invoice.mol,
                        documentType: 'фактура',
                        invoiceNumber: newInvoiceNumber,
                        invoiceDate: formattedDate,
                        expireDate: expireDate,
                        paymentTerm: invoice.paymentTerm,
                        paymentType: invoice.paymentType,
                        bankChoise: invoice.bankChoise,
                        totalPrice: invoice.totalPrice,
                        paymentStatus: 0,
                        products: invoice.products,
                        client: invoice.client
                    }

                    let products_html = '<table width="100%" cellpadding="0" cellspacing="0" border="1px"> <thead> <tr> <th width="5%">№</th> <th width="40%">Описание на стока / услугата</th> <th width="10%">Мярка</th> <th width="15%">Количество</th> <th  width="10%">Ед.цена</th> <th  width="10%">Т.О.%</th> <th  width="10%">Стойност</th> </tr></thead>';
                    let total_without_vat = 0.0;
                    let total_vat = 0.0;
                    let total_with_vat = 0.0;
                    let counter = 0;
                    for (var pi = 0; pi < invoice.products.length; pi++) {
                        let product = invoice.products[pi];
                        counter += 1;
                        products_html += '<tr> <td width="5%">' + counter + '</td><td width="40%">' + product.name + '</td><td width="10%">' + product.measure + '</td><td width="10%">' + product.qty + '</td><td width="10%">' + parseFloat(product.unitPrice).toFixed(2) + '</td><td width="10%">0.00</td><td width="10%">' + parseFloat(product.qty * product.unitPrice).toFixed(2) + '</td></tr>';
                        total_without_vat = total_without_vat + (product[2] * product[3]);
                        total_vat = total_vat + ((product[2] * product[3]) * 0.2);
                        total_with_vat = total_with_vat + ((product[2] * product[3]) * 1.2);
                    }
                    products_html += "</table>";

                    var invoice_html = createHTML({
                        title: "example",
                        css: "main.css",
                        head: '<link href="https://fonts.googleapis.com/css?family=Exo+2:400,600&display=swap" rel="stylesheet"><link href="main.css" rel="stylesheet"> <style>html, body { font-family: "Exo 2", sans-serif; } .header{float:left; width:calc(100% - 120px); height:150px; margin-left:60px; margin-top:70px;}.header .info{float:left; width:200px;}.header .info span:first-child{float:left; font-size:32px; font-weight:bold; text-transform:uppercase; width:100%;}.header .info span:nth-child(2){float:left; font-size:24px; width:100%; font-weight:bold; text-transform:uppercase;}.header .logo{float:right; width: 220px; height: 68.5px; background-image:url(logo.svg); background-size:100% 100%; background-position:center; background-repeat:no-repeat;}.first-row{float:left; width:calc(100% - 120px); margin-left:60px; margin-top:30px;}.first-row > div{float:left; width:50%;}.row-title{float:left; width:100%; font-size:16px; font-weight:bold; margin-bottom:5px;}.input-row{float:left; width:100%; margin-top:8px;}.input-row .label{float:left; width:40%; font-size:12px;}.input-row .value{float:left; width:60%; font-size:12px; font-weight:bold;}table{float:left; width:calc(100% - 120px); margin-left:60px; margin-top:40px; border-collapse:collapse; font-size:12px;}table td{text-align:center;}table td, table th{height:30px;}.signatures{position:absolute; bottom:30px; left:60px; width:calc(100% - 120px);}.signatures > div:first-child{float:left;}.signatures > div:nth-child(2){float:right;}.signatures > div > span{float:left; font-size:16px; font-weight:bold;}.signatures > div > div{position:relative; float:left; width:200px; height:1px; background:black; margin-top: 25px; margin-left: 20px;}.signatures > div > div > span{position: absolute; width: 100%; text-align: center; font-size: 12px;}</style>',
                        body: '<div class="header"> <div class="info"> <span>ФАКТУРА</span> <span id="original">КОПИЕ</span> </div> <img class="logo" height="85px" width="220px" />  </div> <div class="first-row"> <div class="left"> <span class="row-title">Доставчик/изпълнител</span> <div class="input-row"> <span class="label">Име</span> <span class="value">"Хай Тек Електроника" ЕООД</span> </div><div class="input-row"> <span class="label">Държава</span> <span class="value">България</span> </div><div class="input-row"> <span class="label">Гр./с.</span> <span class="value">Пловдив</span> </div><div class="input-row"> <span class="label">Адрес</span> <span class="value">ж.к "Тракия" бл.193, вх.в, ет.2, офис 4</span> </div><div class="input-row"> <span class="label">Идент.№ ДДС</span> <span class="value">BG115752903</span> </div><div class="input-row"> <span class="label">ЕИК/ЕГН</span> <span class="value">115752903</span> </div><div class="input-row"> <span class="label">МОЛ</span> <span class="value">Тодор Тодоров</span> </div></div> <div class="left"> <span class="row-title">Получател/възложител</span> <div class="input-row"> <span class="label">Име</span> <span class="value">' + invoice.client.nameOfClient + '</span> </div><div class="input-row"> <span class="label">Държава</span> <span class="value">Република България</span> </div><div class="input-row"> <span class="label">Гр./с.</span> <span class="value">' + invoice.client.city + '</span> </div><div class="input-row"> <span class="label">Адрес</span> <span class="value">' + invoice.client.address + '</span> </div><div class="input-row"> <span class="label">Идент.№ ДДС</span> <span class="value">BG' + invoice.client.identN + '</span> </div><div class="input-row"> <span class="label">ЕИК/ЕГН</span> <span class="value">' + invoice.client.eikEgn + '</span> </div><div class="input-row"> <span class="label">МОЛ</span> <span class="value">' + invoice.client.mol + '</span> </div></div></div>     <div class="first-row"> <div class="left"> <span class="row-title">Информация за фактурата</span> <div class="input-row"> <span class="label">Фактура №</span> <span class="value">' + newInvoiceNumber + '</span> </div><div class="input-row"> <span class="label">Дата на фактурата</span> <span class="value">' + formattedDate + '</span> </div><div class="input-row"> <span class="label">Срок за плащане</span> <span class="value">' + expireDate + '</span> </div></div><div class="left"> <span class="row-title">Инфорамция за плащането</span> <div class="input-row"> <span class="label">Валута</span> <span class="value">BGN</span> </div><div class="input-row"> <span class="label">Начин на плащане</span> <span class="value">' + invoice.paymentType + '</span> </div><div class="input-row"> <span class="label">Банка</span> <span class="value">DSK</span> </div><div class="input-row"> <span class="label">BIC</span> <span class="value">BGSS12312312</span> </div><div class="input-row"> <span class="label">IBAN</span> <span class="value">BG12312312313123</span> </div></div></div>' + products_html + ' <div class="signatures"> <div> <span>Получател</span> <div class="field"> <span>подпис и печат</span> </div></div><div> <span>Съставил</span> <div class="field"> <span>подпис и печат</span> </div></div></div>'
                    })

                    const clientEmail = requestData.client.email;
                    fs.writeFile('invoice.html', invoice_html, function async(err) {
                        if (err) console.log(err)
                        processInvoice(newInvoiceNumber, clientEmail);
                    })
                    await invoiceService.createInvoice(requestData);
                    console.log("No invoice created already");
                }
            });
        }

    } catch (error) {
        console.log(error.message)
    }
}, 5000);

async function processInvoice(invoice_num, clientEmail) {
    var dataBinding = {}

    var templateHtml = fs.readFileSync(path.join(process.cwd(), 'invoice.html'), 'utf8');
    var template = handlebars.compile(templateHtml);
    var finalHtml = template(dataBinding);
    var options = {
        format: 'A4',
        headerTemplate: "<p></p>",
        footerTemplate: "<p></p>",
        displayHeaderFooter: false,
        margin: {
            top: "20px",
            bottom: "20px"
        },
        printBackground: true,
        path: './invoice' + invoice_num + '.pdf'
    }

    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: true
    });
    const page = await browser.newPage();
    await page.goto(`data: text/html,${finalHtml}`, {
        waitUntil: 'networkidle2'
    });
    await page.pdf(options);
    await browser.close();

    let transport = nodemailer.createTransport({
        host: 'hitech-bg.com',
        port: 587,
        secure: false,
        ignoreTLS: true,
        auth: {
            user: 'office@hitech-bg.com',
            pass: 'H1272334te4'
        }
    });

    const message = {
        from: 'office@hitech-bg.com', // Sender address
        to: clientEmail,         // List of recipients
        subject: 'Издадена Фактура №' + invoice_num, // Subject line
        html: '<span style="margin-top:10px;float:left;width:400px;margin-right:calc(100% - 400px);">Това е автоматично съобщение изпратено от Автоматичната система за таксуване на Хай Тек Електорника ЕООД.</span> <span style="margin-top:10px;float:left;width:400px;margin-right:calc(100% - 400px);">За допълнителни информация, може да се свържете с нас на <a href="mailto:office@hitech-bg.com">office@hitech-bg.com или +359 65 23 34</span></br></br> <span style="margin-top:10px;float:left;width:400px;margin-right:calc(100% - 400px);">Благодарим ви, че сте наши клиенти!</span> </br></br> <span style="margin-top:20px;float:left;width:400px;margin-right:calc(100% - 400px);">Поздрави</span></br><span style="float:left;width:400px;margin-right:calc(100% - 400px);font-weight:bold;">Екипът на Хай Тек Електроника ЕООД</span>',
        attachments: [
            {   // file on disk as an attachment
                filename: 'invoice' + invoice_num + ".pdf",
                path: './invoice' + invoice_num + '.pdf'
                // path: './invoices/invoice' + invoice + '.pdf' // stream this file
            }
        ]
    };

    transport.sendMail(message, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });

}

app.listen(5001, () => console.log('Server is listening on port http://localhost:5001'));