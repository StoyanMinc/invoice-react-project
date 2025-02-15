import { outInvoicecService } from "../../api/invoice-api"
import { useGetLatestOutInvoices } from "../../hooks/invoices-hooks/useOutInvoices";

export default function Home() {

    const lastOutInvoices = useGetLatestOutInvoices();
    const totalInvoicesPrice = lastOutInvoices.map(i => i.totalPrice).reduce((a,c )=> a+c,0);

    return (
        <section className="home-section">
            <div className="invoices-container">
                <div className="invoice-container">
                    <div className="title">
                        <h3>Входни фактури</h3>
                        <i className="arrow-icon green-arrow"></i>
                    </div>
                    <p><span>0</span>лв</p>
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
                    <p><span>3210</span>лв</p>
                </div>
                <div className="invoice-container">
                    <h3>Задължения към дост</h3>
                    <p><span>625</span>лв</p>
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
                                    <td>{i.client}</td>
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
                            <tr>
                                <td>05.02.2025</td>
                                <td>Офис Консумативи ООД</td>
                                <td>54.74в</td>
                                <td><span className="table-paid-info paid">платена</span></td>
                            </tr>
                            <tr>
                                <td>06.02.2025</td>
                                <td>АСБИС България ЕООД</td>
                                <td>170.81лв</td>
                                <td><span className="table-paid-info paid">платена</span></td>
                            </tr>
                            <tr>
                                <td>06.02.2025</td>
                                <td>ТМТ Елком ООД</td>
                                <td>0лв</td>
                                <td><span className="table-paid-info paid">платена</span></td>
                            </tr>
                            <tr>
                                <td>31.01.2025</td>
                                <td>Девин ЕАД</td>
                                <td>47.50лв</td>
                                <td><span className="table-paid-info paid">платена</span></td>
                            </tr>
                            <tr>
                                <td>30.01.2025</td>
                                <td>Еконт Експрес ООД</td>
                                <td>6.25</td>
                                <td><span className="table-paid-info paid">платена</span></td>
                            </tr>
                            <tr>
                                <td>28.01.2025</td>
                                <td>"Стопчето" ООД</td>
                                <td>46.99лв</td>
                                <td><span className="table-paid-info paid">платена</span></td>
                            </tr>
                            <tr>
                                <td>27.01.2025</td>
                                <td>Еконт Експрес</td>
                                <td>5.32лв</td>
                                <td><span className="table-paid-info paid">платена</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </section>


    )
}