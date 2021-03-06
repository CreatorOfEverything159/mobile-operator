import React, {useContext, useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {Button, Col, Container, Form, Modal, Table} from 'react-bootstrap'
import {Context} from '../index'
import {allTariffs, createClient, findAllClients, getOneClient} from '../http/salesmanAPI'

const Salesman = observer(() => {
    const {currentClient} = useContext(Context)
    const {tariff} = useContext(Context)
    const [passport, setPassport] = useState('')
    const [fio, setFio] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [regPlace, setRegPlace] = useState('')

    const [findTariff, setFindTariff] = useState('')

    const [modalShow, setModalShow] = useState(false)
    const [modalClient, setModalClient] = useState({})
    const [modalSubscribers, setModalSubscribers] = useState([])

    useEffect(() => {
        getAllTariffs().then(data => {
            tariff.setTariffs(data)
        })
    })

    const getAllTariffs = async () => {
        try {
            return await allTariffs()
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const create = async () => {
        try {
            return await createClient(passport, fio, birthDate, regPlace)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const findAll = async (passport) => {
        try {
            return await findAllClients(passport)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const MyVerticallyCenteredModal = (props) => {
        const [fullName, setFullName] = useState(props.client.full_name)
        const [dateOfBirth, setDateOfBirth] = useState(`${props.client.date_of_birth}`.slice(0, 10))
        const [passport, setPassport] = useState(props.client.passport)
        const [account, setAccount] = useState('')
        // const [sms, setSms] = useState(props.client.sms)

        const accountGeneration = () => {
            let account = ''
            for (let i = 0; i < 20; i++) {
                account += Math.floor(Math.random() * 10)
            }
            return account
        }

        const change = async () => {
            try {
                // await changeTariff(props.tariff.name, tariffName, subscriptionFee, internetTraffic, minutes, sms)
                // getAllTariffs()
                //     .then(data => tariff.setTariffs(data))
            } catch (e) {
                alert(e.response.data.message)
            }
        }

        const setTable = () => {
            if (currentClient.subscribers.length) {
                currentClient.subscribers.map((sub, index) => {
                        return (
                            <tr key={sub.account}>
                                <td>{index + 1}</td>
                                <td>{sub.account}</td>
                                <td>{sub.balance}</td>
                                <td>{sub.tariffName}</td>
                                <td>
                                    <Button className="me-4" variant="outline-warning"
                                    >????????????????</Button>
                                    <Button variant="outline-danger">??????????????</Button>
                                </td>
                            </tr>
                        )
                    }
                )
            } else {
                return '?????? ??????????????????'
            }
        }

        return (
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        ?????????????????? ??????????????
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Col md={4} style={{padding: '5px'}}>
                            <Form.Group controlId="formClientPassport">
                                <Form.Text className="text-muted">
                                    ?????????? ?? ?????????? ????????????????
                                </Form.Text>
                                <Form.Control type="number" placeholder="?????????? ?? ?????????? ????????????????" value={passport}
                                              onChange={(e) => setPassport(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col md={12} style={{padding: '5px'}}>
                            <Form.Group controlId="formClientFullName">
                                <Form.Text className="text-muted">
                                    ??????
                                </Form.Text>
                                <Form.Control size="lg" type="text" value={fullName} placeholder="??????"
                                              onChange={(e) => setFullName(e.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col md={4} style={{padding: '5px'}}>
                            <Form.Group controlId="formClientBirth">
                                <Form.Text className="text-muted">
                                    ???????? ????????????????
                                </Form.Text>
                                <Form.Control type="date" placeholder="???????? ????????????????" value={dateOfBirth}
                                              onChange={(e) => setDateOfBirth(e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Form>
                    <hr/>
                    <h4>???????????????? ????????????????</h4>
                    <Form>
                        <Col md={12} style={{padding: '5px'}}>
                            <Form.Group controlId="formSubscriber">
                                <Form.Text className="text-muted">
                                    ??????????????
                                </Form.Text>
                                <Form.Control disabled type="number" placeholder="??????????????" value={account}
                                              onChange={(e) => setPassport(e.target.value)}/>
                            </Form.Group>
                            <Button style={{marginTop: 10}} variant="outline-success" onClick={() => {
                                setAccount(accountGeneration())
                            }}>?????????????????????????? ??????????????</Button>
                        </Col>
                        <Col md={12} style={{padding: '5px'}}>
                            <Form.Group controlId="formSubscriberTariff">
                                <Form.Text className="text-muted">
                                    ??????????
                                </Form.Text>
                                <Form.Select
                                    aria-label="Default select example"
                                >
                                    {
                                        tariff.tariffs.map((tariff) => {
                                            return (
                                                <option
                                                    value={tariff.name}>{tariff.name} (??????????: {tariff.subscription_fee},
                                                    ????????????????: {tariff.internet_traffic === '-1.00' ? '????????????????' : tariff.internet_traffic},
                                                    ????????????: {tariff.minutes === -1 ? '????????????????' : tariff.minutes},
                                                    ??????: {tariff.sms === -1 ? '????????????????' : tariff.sms})</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={4} style={{padding: '5px'}}>
                            <Form.Group controlId="formClientBirth">
                                <Form.Text className="text-muted">
                                    ???????? ????????????????
                                </Form.Text>
                                <Form.Control type="date" placeholder="???????? ????????????????" value={dateOfBirth}
                                              onChange={(e) => setDateOfBirth(e.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Form>
                    {
                        setTable()
                    }
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
                <h1 className="mt-4">???????????? ????????????????-????????????????????????</h1>
                <hr/>
            </Container>
            <Container>
                <h2 className="mt-4">???????????????? ????????????????????</h2>
                <Form className="d-flex align-items-end">
                    <Col md={2} style={{padding: '5px'}}>
                        <Form.Group controlId="formPassportFinder">
                            <Form.Text className="text-muted">
                                ?????????? ?? ?????????? ????????????????
                            </Form.Text>
                            <Form.Control
                                value={passport}
                                type="text"
                                placeholder="?????????? ?? ?????????? ????????????????"
                                onChange={e => {
                                    findAll(e.target.value).then(data => {
                                        console.log(data)
                                        currentClient.setClients(data)
                                    })
                                    setPassport(e.target.value)
                                }}/>
                        </Form.Group>
                    </Col>
                </Form>
                <Table className="mt-4" hover={true}>
                    <thead>
                    <tr>
                        <th>???????????????????? ????????????</th>
                        <th>??????</th>
                        <th>???????? ????????????????</th>
                        <th>?????????? ??????????????????????</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        currentClient.clients.length ?
                            currentClient.clients.map((client, index) => {
                                    return (
                                        <tr key={client.passport}>
                                            <td>{client.passport}</td>
                                            <td>{client.full_name}</td>
                                            <td>{new Date(client.date_of_birth).toLocaleDateString()}</td>
                                            <td>{client.reg}</td>
                                            <td>
                                                <Button
                                                    className="me-4"
                                                    variant="outline-warning"
                                                    onClick={() => {
                                                        setModalClient(currentClient.clients[0])
                                                        setModalShow(true)
                                                    }}
                                                >????????????????</Button>
                                            </td>
                                        </tr>
                                    )
                                }
                            )
                            : <tr>
                                <td>?????? ????????????????????</td>
                            </tr>
                    }
                    </tbody>
                </Table>
            </Container>
            <Container>
                <h2 className="mt-4">???????????????? ???????????? ??????????????</h2>
                <Form>
                    <Col md={2} style={{padding: '5px'}}>
                        <Form.Group controlId="formPassport">
                            <Form.Text className="text-muted">
                                ?????????? ?? ?????????? ????????????????
                            </Form.Text>
                            <Form.Control
                                type="number"
                                placeholder="?????????? ?? ?????????? ????????????????"
                                value={passport}
                                onChange={e => setPassport(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col md={6} style={{padding: '5px'}}>
                        <Form.Group controlId="formSubscriptionFee">
                            <Form.Text className="text-muted">
                                ??????
                            </Form.Text>
                            <Form.Control
                                type="text"
                                placeholder="??????"
                                value={fio}
                                onChange={e => setFio(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col md={2} style={{padding: '5px'}}>
                        <Form.Group controlId="formBirthData">
                            <Form.Text className="text-muted">
                                ???????? ????????????????
                            </Form.Text>
                            <Form.Control
                                value={birthDate}
                                type="date"
                                onChange={e => setBirthDate(e.target.value)}
                                placeholder="???????? ????????????????"/>
                        </Form.Group>
                    </Col>
                    <Col md={6} style={{padding: '5px'}}>
                        <Form.Group controlId="formRegPlace">
                            <Form.Text className="text-muted">
                                ?????????? ??????????????????????
                            </Form.Text>
                            <Form.Control
                                value={regPlace}
                                type="text"
                                onChange={e => setRegPlace(e.target.value)}
                                placeholder="?????????? ??????????????????????"/>
                        </Form.Group>
                    </Col>
                    <Col md={2} style={{padding: '5px'}}>
                        <Button
                            variant="outline-success"
                            onClick={() => {
                                create().then(data => {
                                    alert(data.message)
                                })
                            }}>????????????????</Button>
                    </Col>
                </Form>
            </Container>
            <MyVerticallyCenteredModal
                client={modalClient}
                show={modalShow}
                onHide={() => setModalShow(false)}/>
        </div>
    )
})

export default Salesman
