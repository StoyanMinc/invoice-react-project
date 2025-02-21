import { useGetLastIncomeInvoices } from "../../hooks/invoices-hooks/useIncomingInvoices";
import { useGetLatestOutInvoices } from "../../hooks/invoices-hooks/useOutInvoices";

export default function Home() {

    const lastOutInvoices = useGetLatestOutInvoices();
    const totalInvoicesPrice = lastOutInvoices.map(i => i.totalPrice).reduce((a, c) => a + c, 0);

    const lastIncomeInvoices = useGetLastIncomeInvoices();

    const totalIncomeInvoicesPrice = lastIncomeInvoices.map(i => {
        return i.currency === 'euro'
        ? i.sumForPay * 1.95
        : i.sumForPay
    }).reduce((a,c) => a + c, 0);

    return (
        <section className="home-section">
            <div className="invoices-container">
                <div className="invoice-container">
                    <div className="title">
                        <h3>Входни фактури</h3>
                        <i className="arrow-icon green-arrow"></i>
                    </div>
                    <p>{totalIncomeInvoicesPrice.toFixed(2)}лв</p>
                </div>
                <div className="invoice-container">
                    <div className="title">
                        <h3>Изходни фактури</h3>
                        <i className="arrow-icon red-arrow"></i>
                    </div>
                    <p>{totalInvoicesPrice.toFixed(2)}лв</p>
                </div>
                <div className="invoice-container">
                    <h3>Задължения към нас</h3>
                    <p>0лв</p>
                </div>
                <div className="invoice-container">
                    <h3>Задължения към дост</h3>
                    <p>625лв</p>
                </div>
                <div className="invoice-container">
                    <h3>Наличност в банка</h3>
                    <p><span>------</span>лв</p>
                </div>
            </div>

            <div className="tables-container">
                <div className="left-table">
                    <h4>Последни {lastOutInvoices.length} изходящи фактури</h4>
                    <table>
                        <thead>
                            <tr>
                                <td>Дата на фактура</td>
                                <td>Клиент</td>
                                <td>Стойност</td>
                                <td>Статус</td>
                            </tr>
                        </thead>
                        <tbody>

                            {lastOutInvoices.map(i =>
                                <tr key={i._id}>
                                    <td>{i.invoiceDate}</td>
                                    <td>{i.client.nameOfClient}</td>
                                    <td>{i.totalPrice.toFixed(2)}лв</td>
                                    <td className="td-paid" ><span className=" table-paid-info unpaid">чака плащане</span></td>
                                </tr>
                            )}



                        </tbody>
                    </table>
                </div>

                <div className="right-table">
                    <h4>Последни 10 входящи фактури</h4>
                    <table>
                        <thead>
                            <tr>
                                <td>Дата на фактура</td>
                                <td>Доставчик</td>
                                <td>Стойност</td>
                                <td>Статус</td>
                            </tr>
                        </thead>
                        <tbody>
                            {lastIncomeInvoices.map(i =>
                                <tr key={i._id}>
                                    <td>{i.invoiceDate}</td>
                                    <td>{i.supplier}</td>
                                    <td>{i.sumForPay}лв</td>
                                    <td><span className="table-paid-info paid">платена</span></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </section>


    )
}