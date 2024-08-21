import axios from 'axios';
import { parseStringPromise } from 'xml2js';

export default async function handler(req, res) {
    try {
        let data = [];
        const response = await axios.get('https://www.nasdaqtrader.com/rss.aspx?feed=tradehalts');
        const result = await parseStringPromise(response.data);
        const items = result.rss.channel[0].item || [];
        for (const item of items) {
            const reasonCode = item['ndaq:ReasonCode'] && item['ndaq:ReasonCode'][0];
            if (reasonCode && ["M", "LUDP"].includes(reasonCode)) {
                const obj = {};
                obj['reason_code'] = reasonCode;

                const symbol = item['ndaq:IssueSymbol'] ? item['ndaq:IssueSymbol'][0] : 'N/A';
                obj['symbol'] = symbol;

                const haltTime = item['ndaq:HaltTime'] ? item['ndaq:HaltTime'][0] : 'N/A';
                obj['halt_time'] = haltTime;

                const resumeTime = item['ndaq:ResumptionTradeTime'] ? item['ndaq:ResumptionTradeTime'][0] : 'N/A';
                obj['resume_time'] = resumeTime;

                const pubDate = item['pubDate'] ? item['pubDate'][0] : 'N/A';
                obj['pub_date'] = pubDate;
                data.push(obj);
            }
        }
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}