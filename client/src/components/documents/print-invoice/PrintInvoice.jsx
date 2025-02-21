import { useParams } from "react-router-dom"
import { useGetOneInvoice } from "../../../hooks/invoices-hooks/useOutInvoices"

export default function PrintInvoice() {
    const { invoiceId } = useParams();
    const invoice = useGetOneInvoice(invoiceId);

    if (!invoice || !invoice.client) {
        return <div>Loading...</div>
    }

    const totalPrice = invoice.products.map(product => Number(product.unitPrice) * Number(product.qty)).reduce((a, c) => a + c, 0);
    const dds = totalPrice * 0.2;

    setTimeout(()=>{
        window.print();
        window.history.go(-1);
    }, 500);

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
                            <span className="print-span-left">Пешо</span>
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
                            <span className="print-span-right">{invoice.client.nameOfClient}</span>
                        </div>
                        <div className="print-info">
                            <span className="print-span-left">Държава</span>
                            <span className="print-span-right">{invoice.client.country}</span>
                        </div>
                        <div className="print-info">
                            <span className="print-span-left">Гр./с.</span>
                            <span className="print-span-right">{invoice.client.city}</span>
                        </div>
                        <div className="print-info">
                            <span className="print-span-left">Адрес:</span>
                            <span className="print-span-right">{invoice.client.address}</span>
                        </div>
                        <div className="print-info">
                            <span className="print-span-left">Идент.N ДДС</span>
                            <span className="print-span-right">{invoice.client.identN}</span>
                        </div>
                        <div className="print-info">
                            <span className="print-span-left">ЕИК/ЕГН</span>
                            <span className="print-span-right">{invoice.client.eikEgn}</span>
                        </div>
                        <div className="print-info">
                            <span className="print-span-left">МОЛ</span>
                            <span className="print-span-right">{invoice.client.mol}</span>
                        </div>
                    </div>
                </div>

                <div className="invoice-payment-info">

                    <div className="print-invoice-content">
                        <h4>Информация за фактурата</h4>
                        <div className="print-info">
                            <span className="print-span-left">Фактура N</span>
                            <span className="print-span-right">{invoice.invoiceNumber}</span>
                        </div>
                        <div className="print-info">
                            <span className="print-span-left">Дата на фактурата</span>
                            <span className="print-span-right">{invoice.invoiceDate}</span>
                        </div>
                        <div className="print-info">
                            <span className="print-span-left">Срок на плащане</span>
                            <span className="print-span-right">{invoice.expireDate}</span>
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
                            <span className="print-span-right">{invoice.paymentType}</span>
                        </div>
                        {invoice.paymentType === 'Банков превод'
                            ?
                            <div className="print-info">
                                <span className="print-span-left">Банка</span>
                                <span className="print-span-right">{invoice.bankChoise}</span>
                            </div>
                            : null
                        }
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
                        {invoice.products.map((product, i) => {

                            const productTotal = Number(product.unitPrice) * Number(product.qty);
                            return (

                                <tr key={i + 1}>
                                    <td>{i + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.measure}</td>
                                    <td>{product.qty}</td>
                                    <td>{product.unitPrice}</td>
                                    <td>{product.to}</td>
                                    <td>{productTotal.toFixed(2)}</td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td colSpan={4} className="empty-print-td">Словом: Сто и двадесет лв деведест и шест стотинки</td>
                            <td colSpan={2}>Сума</td>
                            <td>{totalPrice.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan={4} className="empty-print-td"></td>
                            <td colSpan={2}>Данъчна основа</td>
                            <td>{totalPrice.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan={4} className="empty-print-td" ></td>
                            <td colSpan={2}>ДСС 20.00%</td>
                            <td>{dds.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td colSpan={4} className="empty-print-td"></td>
                            <td colSpan={2}>Общо с ДДС</td>
                            <td>{invoice.totalPrice.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}