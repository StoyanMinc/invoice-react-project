import { invoiceService } from "../../api/invoice-api"

export default function Home() {

    const getInvoices = async () => {
        const data = await invoiceService.getAllInvoices();
        console.log(data);
    }

    getInvoices();
    
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
                    <p><span>0</span>лв</p>
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
                    <h4>Последни 10 изходящи фактури</h4>
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
                            <tr>
                                <td>06.02.2025</td>
                                <td>"Кристал Лес - 92"ЕООД</td>
                                <td>16.80лв</td>
                                <td className="td-paid" ><span className=" table-paid-info unpaid">чака плащане</span></td>
                            </tr>
                            <tr>
                                <td>05.02.2025</td>
                                <td>Алириза Алиризов Кордов</td>
                                <td>120.96</td>
                                <td><span className="table-paid-info paid">платена</span></td>
                            </tr>
                            <tr>
                                <td>05.02.2025</td>
                                <td>Семко Милев Милев</td>
                                <td>262.92</td>
                                <td><span className="table-paid-info paid">платена</span></td>
                            </tr>
                            <tr>
                                <td>03.02.2025</td>
                                <td>"ГЕЛЕВ-ЕВГ"ЕООД</td>
                                <td>2040.00</td>
                                <td><span className=" table-paid-info unpaid">чака плащане</span></td>
                            </tr>
                            <tr>
                                <td>03.02.2025</td>
                                <td>"ЕМ ТИ ЕМ груп 76"ЕООД</td>
                                <td>132.96</td>
                                <td><span className="table-paid-info paid">платена</span></td>
                            </tr>
                            <tr>
                                <td>03.02.2025</td>
                                <td>"СЕВДАЛИНА" ЕООД</td>
                                <td>241.93</td>
                                <td ><span className="table-paid-info paid">платена</span></td>
                            </tr>
                            <tr>
                                <td>03.02.2025</td>
                                <td>Хасан Али Хърьов</td>
                                <td>120.96</td>
                                <td><span className="table-paid-info paid">платена</span></td>
                            </tr>
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