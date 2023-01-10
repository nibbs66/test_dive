import puppeteer from 'puppeteer'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import app from "../../../lib/firebase";
const createPdf = async (req,res) => {
    const {
        method,
        query: {id},
    } = req;

    if(method === "POST"){
        const {saleId, invoicePage} = req.body

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const pdFName = 'web'+ saleId + new Date().getTime()
        const options ={
            path: `./invoice/${pdFName}.pdf`,
            format: 'A4'
        }
        await page.goto(process.env.PUBLIC_URL+`/admin/invoice/${invoicePage}`, { waitUntil: 'networkidle0' })
        const newPage =  await page.pdf(options)
        res.end(newPage)
        await browser.close();
    }


}
export default createPdf;
