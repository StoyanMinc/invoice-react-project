import { useParams } from "react-router-dom"
import { useGetOneInvoice } from "../../../hooks/invoices-hooks/useOutInvoices"

export default function PrintInvoice() {
    const { invoiceId } = useParams();
    const invoice = useGetOneInvoice(invoiceId);

    console.log(invoice);

    return (
        <div className="print">
            <div className="print-title">
                <h1>Invoice</h1>
                <h2>Original</h2>
            </div>

            <div className="print-logo">
                <span className="logo-span">LOGO</span>
            </div>

            <div className="print-invoice-info">
                <div className="supplier-recipient-info">
                    <div className="supplier-info">
                        <h4>Доставчик/изпълнител</h4>
                        <div className="print-info">
                            <span className="print-span-left">Име</span>
                            <span className="print-span-right">"Аксион Солюшънс" ЕООД</span>
                        </div>
                        <div className="print-info">
                            <span className="print-span-left">Държава</span>
                            <span className="print-span-right">България</span>
                        </div>
                        <div className="print-info">
                            <span className="print-span-left">Гр./с.</span>
                            <span className="print-span-right">Пловдив</span>
                        </div>
                        <div className="print-info">
                            <span className="print-span-left">Адрес:</span>
                            <span className="print-span-right">ж.к. Тракия бл. 193 тн тн тн</span>
                        </div>
                        <div className="print-info">
                            <span className="print-span-left">Идент.N ДДС</span>
                            <span className="print-span-right">BG1111111</span>
                        </div>
                        <div className="print-info">
                            <span className="print-span-left">ЕИК/ЕГН</span>
                            <span className="print-span-right">111111111</span>
                        </div>
                        <div className="print-info">
                            <span className="print-span-left">МОЛ</span>
                            <span className="print-span-right">Тодор Тодоров</span>
                        </div>
                    </div>

                    <div className="recipient-info">
                        <h4>Получател/възложител</h4>
                        <div className="print-info">
                            <span className="print-span-left">Име</span>
                            <span className="print-span-right">"Аки Транс" ЕООД</span>
                        </div>
                        <div className="print-info">
                            <span className="print-span-left">Държава</span>
                            <span className="print-span-right">Република България</span>
                        </div>
                        <div className="print-info">
                            <span className="print-span-left">Гр./с.</span>
                            <span className="print-span-right">Сърница</span>
                        </div>
                        <div className="print-info">
                            <span className="print-span-left">Адрес:</span>
                            <span className="print-span-right">м. Крушата</span>
                        </div>
                        <div className="print-info">
                            <span className="print-span-left">Идент.N ДДС</span>
                            <span className="print-span-right">BG1111111</span>
                        </div>
                        <div className="print-info">
                            <span className="print-span-left">ЕИК/ЕГН</span>
                            <span className="print-span-right">111111111</span>
                        </div>
                        <div className="print-info">
                            <span className="print-span-left">МОЛ</span>
                            <span className="print-span-right">Аки Трампов</span>
                        </div>
                    </div>
                </div>

                <div className="invoice-payment-info">

                    <div className="print-invoice-content">
                        <h4>Информация за фактурата</h4>
                        <div className="print-info">
                            <span className="print-span-left">Фактура N</span>
                            <span className="print-span-right">3000000001</span>
                        </div>
                        <div className="print-info">
                            <span className="print-span-left">Дата на фактурата</span>
                            <span className="print-span-right">01.01.2000</span>
                        </div>
                        <div className="print-info">
                            <span className="print-span-left">Срок на плащане</span>
                            <span className="print-span-right">16.01.2000</span>
                        </div>
                    </div>

                    <div className="print-payment-info">
                        <h4>Информация за плащането</h4>
                        <div className="print-info">
                            <span className="print-span-left">валута</span>
                            <span className="print-span-right">BGN</span>
                        </div>
                        <div className="print-info">
                            <span className="print-span-left">Начин на плащане</span>
                            <span className="print-span-right">ПО БАНКОВ ПЪТ</span>
                        </div>
                        <div className="print-info">
                            <span className="print-span-left">Банка</span>
                            <span className="print-span-right">ДСК</span>
                        </div>
                        <div className="print-info">
                            <span className="print-span-left">BIC</span>
                            <span className="print-span-right">STSAUb12</span>
                        </div>
                        <div className="print-info">
                            <span className="print-span-left">IBAN</span>
                            <span className="print-span-right">asdasdasdasd</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="print-table-contaier">
                <table className="print-table">
                    <thead>
                        <tr>
                            <th>N</th>
                            <th>Описание на стока / услуга</th>
                            <th>Мярка</th>
                            <th>К-во</th>
                            <th>Ед.цена</th>
                            <th>Т.О.(%)</th>
                            <th>Стойност</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Такса за редоставяне на ГПС услуга по Договор 111111</td>
                            <td>бр.</td>
                            <td>12</td>
                            <td>12.00</td>
                            <td>30.00</td>
                            <td>100.80</td>
                        </tr>
                        <tr>
                            <td colSpan={4} className="empty-print-td">Словом: Сто и двадесет лв деведест и шест стотинки</td>
                            <td colSpan={2}>Сума</td>
                            <td>ддс</td>
                        </tr>
                        <tr>
                            <td colSpan={4} className="empty-print-td"></td>
                            <td colSpan={2}>Данъчна основа</td>
                            <td>100.80</td>
                        </tr>
                        <tr>
                            <td colSpan={4} className="empty-print-td" ></td>
                            <td colSpan={2}>ДСС 20.00%</td>
                            <td>20.16</td>
                        </tr>
                        <tr>
                            <td colSpan={4} className="empty-print-td"></td>
                            <td colSpan={2}>Общо с ДДС</td>
                            <td>120.96</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}