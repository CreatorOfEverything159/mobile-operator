import React, {useContext, useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {Button, Col, Container, Form, Modal, Table} from 'react-bootstrap'
import {Context} from '../index'
import {changeTariff, createTariff, deleteTariff, findTariffs, getAllTariffs, getTariff} from '../http/tariffAPI'

const Manager = observer(() => {
    const {tariff} = useContext(Context)
    const [tariffName, setTariffName] = useState('')
    const [subscriptionFee, setSubscriptionFee] = useState(300)
    const [internetTraffic, setInternetTraffic] = useState(5)
    const [minutes, setMinutes] = useState(200)
    const [sms, setSms] = useState(100)

    const [findTariff, setFindTariff] = useState('')

    const [modalShow, setModalShow] = useState(false)
    const [modalTariff, setModalTariff] = useState({})

    useEffect(() => {
        getAllTariffs().then(data => tariff.setTariffs(data))
    }, [])

    const create = async () => {
        try {
            await createTariff(tariffName, subscriptionFee, internetTraffic, minutes, sms)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const find = async (tariffName) => {
        try {
            return await findTariffs(tariffName)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const delTariff = async (name) => {
        try {
            await deleteTariff(name)
            getAllTariffs().then(data => tariff.setTariffs(data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const getOneTariff = async (name) => {
        try {
            return await getTariff(name)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const MyVerticallyCenteredModal = (props) => {
        const [tariffName, setTariffName] = useState(props.tariff.name)
        const [subscriptionFee, setSubscriptionFee] = useState(props.tariff.subscription_fee)
        const [internetTraffic, setInternetTraffic] = useState(props.tariff.internet_traffic)
        const [minutes, setMinutes] = useState(props.tariff.minutes)
        const [sms, setSms] = useState(props.tariff.sms)

        const change = async () => {
            try {
                await changeTariff(props.tariff.name, tariffName, subscriptionFee, internetTraffic, minutes, sms)
                getAllTariffs()
                    .then(data => tariff.setTariffs(data))
            } catch (e) {
                alert(e.response.data.message)
            }
        }

        return (
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        ?????????????????? ????????????
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="">
                        <Col md={4} style={{padding: '5px'}}>
                            <Form.Group controlId="formUpdateTariffName">
                                <Form.Text className="text-muted">
                                    ???????????????? ????????????
                                </Form.Text>
                                <Form.Control size="lg" type="text" value={tariffName} placeholder="???????????????? ????????????"
                                              onChange={(e) => setTariffName(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col md={2} style={{padding: '5px'}}>
                            <Form.Group controlId="formUpdateTariffSubscriptionFee">
                                <Form.Text className="text-muted">
                                    ?????????????????????? ??????????
                                </Form.Text>
                                <Form.Control type="number" placeholder="?????????????????????? ??????????" value={subscriptionFee}
                                              onChange={(e) => setSubscriptionFee(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col md={2} style={{padding: '5px'}}>
                            <Form.Group controlId="formUpdateTariffInternetTraffic">
                                <Form.Text className="text-muted">
                                    ???????????????? ??????????????
                                </Form.Text>
                                <Form.Control type="number" placeholder="???????????????? ??????????????" value={internetTraffic}
                                              onChange={(e) => setInternetTraffic(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col md={2} style={{padding: '5px'}}>
                            <Form.Group controlId="formUpdateTariffMinutes">
                                <Form.Text className="text-muted">
                                    ????????????
                                </Form.Text>
                                <Form.Control type="number" placeholder="????????????" value={minutes}
                                              onChange={(e) => setMinutes(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col md={2} style={{padding: '5px'}}>
                            <Form.Group controlId="formUpdateTariffMinutes">
                                <Form.Text className="text-muted">
                                    SMS
                                </Form.Text>
                                <Form.Control type="number" placeholder="SMS" value={sms}
                                              onChange={(e) => setSms(e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {
                        change().then(data => {
                            props.onHide()
                        })
                    }}>?????????????????? ??????????????????</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <div>
            <Container style={{marginTop: 30}}>
                <h1 className="mt-4">???????????? ??????????????????</h1>
                <hr/>
            </Container>
            <Container>
                <h2 className="mt-4">?????????????? ??????????</h2>
                <Form className="">
                    <div className="d-flex justify-content-around align-items-end">
                        <Col md={4} style={{padding: '5px'}}>
                            <Form.Group controlId="formTariffName">
                                <Form.Text className="text-muted">
                                    ???????????????? ????????????
                                </Form.Text>
                                <Form.Control aria-label="Default select example" placeholder="???????????????? ????????????"
                                              value={tariffName}
                                              onChange={e => setTariffName(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col md={2} style={{padding: '5px'}}>
                            <Form.Group controlId="formSubscriptionFee">
                                <Form.Text className="text-muted">
                                    ?????????????????????? ??????????
                                </Form.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="?????????????????????? ??????????"
                                    value={subscriptionFee}
                                    onChange={e => setSubscriptionFee(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col md={2} style={{padding: '5px'}}>
                            <Form.Group controlId="formInternetTraffic">
                                <Form.Text className="text-muted">
                                    ???????????????? ??????????????
                                </Form.Text>
                                <Form.Control
                                    value={internetTraffic}
                                    type="number"
                                    onChange={e => setInternetTraffic(e.target.value)}
                                    placeholder="???????????????? ??????????????"/>
                            </Form.Group>
                        </Col>
                        <Col md={2} style={{padding: '5px'}}>
                            <Form.Group controlId="formMinutes">
                                <Form.Text className="text-muted">
                                    ????????????
                                </Form.Text>
                                <Form.Control
                                    value={minutes}
                                    type="number"
                                    onChange={e => setMinutes(e.target.value)}
                                    placeholder="????????????"/>
                            </Form.Group>
                        </Col>
                        <Col md={2} style={{padding: '5px'}}>
                            <Form.Group controlId="formSMS">
                                <Form.Text className="text-muted">
                                    SMS
                                </Form.Text>
                                <Form.Control
                                    value={sms}
                                    type="number"
                                    onChange={e => setSms(e.target.value)}
                                    placeholder="SMS"/>
                            </Form.Group>
                        </Col>
                    </div>
                    <Col md={2} style={{padding: '5px'}}>
                        <Button
                            variant="outline-success"
                            type="submit"
                            onClick={create}>????????????????</Button>
                    </Col>
                </Form>
            </Container>
            <Container>
                <h2 className="mt-4">??????????</h2>
                <Form className="d-flex align-items-end">
                    <Col md={5} style={{padding: '5px'}}>
                        <Form.Group controlId="formTariffFinder">
                            <Form.Text className="text-muted">
                                ?????????????? ???????????????? ????????????
                            </Form.Text>
                            <Form.Control value={findTariff} type="text" placeholder="?????????? ????????????" onChange={(e) => {
                                setFindTariff(e.target.value)
                                find(e.target.value).then(data => tariff.setTariffs(data))
                            }}/>
                        </Form.Group>
                    </Col>
                </Form>
            </Container>
            <Container>
                <h2 className="mt-4">????????????</h2>
                <Table className="mt-4" hover={true}>
                    <thead>
                    <tr>
                        <th>???</th>
                        <th>???????????????? ????????????</th>
                        <th>?????????????????????? ??????????</th>
                        <th>???????????????? ??????????????</th>
                        <th>????????????</th>
                        <th>SMS</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        tariff.tariffs.map((tariff, index) => {
                                return (
                                    <tr key={tariff.name}>
                                        <td>{index + 1}</td>
                                        <td>{tariff.name}</td>
                                        <td>{tariff.subscription_fee}</td>
                                        <td>{tariff.internet_traffic === '-1.00' ? '????????????????' : tariff.internet_traffic}</td>
                                        <td>{tariff.minutes === -1 ? '????????????????' : tariff.minutes}</td>
                                        <td>{tariff.sms === -1 ? '????????????????' : tariff.sms}</td>
                                        <td>
                                            <Button className="me-4" variant="outline-warning" onClick={() => {
                                                getOneTariff(tariff.name).then(data => {
                                                    setModalTariff(data)
                                                    setModalShow(true)
                                                })
                                            }}>????????????????</Button>
                                            <Button variant="outline-danger" onClick={() => {
                                                delTariff(tariff.name)
                                            }}>??????????????</Button>
                                        </td>
                                    </tr>
                                )
                            }
                        )
                    }
                    </tbody>
                </Table>
            </Container>
            <MyVerticallyCenteredModal tariff={modalTariff} show={modalShow} onHide={() => setModalShow(false)}/>
        </div>
    )
})

export default Manager
