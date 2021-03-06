import React, {useContext, useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {Button, Col, Container, Form, Modal, Table} from 'react-bootstrap'
import {Context} from '../index'
import {changeUser, deleteUser, findManagerAndSalesman, getAllManagerAndSalesman, getUser} from '../http/adminAPI'
import {registration} from '../http/userAPI'

const person = 'https://www.svgrepo.com/show/311063/person.svg'

const Admin = observer(() => {
    const {user} = useContext(Context)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [userType, setUserType] = useState(2)

    const [findLogin, setFindLogin] = useState('')
    const [findType, setFindType] = useState('')

    const [modalShow, setModalShow] = useState(false)
    const [modalUser, setModalUser] = useState({})

    useEffect(() => {
        getAllManagerAndSalesman()
            .then(data => user.setDownloadedUsers(data))
    }, [])

    const userRegistration = async () => {
        try {
            await registration(login, password, userType)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const find = async (findLogin, findType) => {
        try {
            return await findManagerAndSalesman(findLogin, findType)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const delUser = async (login) => {
        try {
            await deleteUser(login)
            getAllManagerAndSalesman()
                .then(data => {
                    return user.setDownloadedUsers(data)
                })
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const getOneUser = async (id) => {
        try {
            return await getUser(id)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const MyVerticallyCenteredModal = (props) => {
        const [login, setLogin] = useState(props.user.login)
        const [password, setPassword] = useState(props.user.password)
        const [userTypeId, setUserType] = useState(props.user.userTypeId)

        const change = async () => {
            try {
                await changeUser(props.user.login, login, password, userTypeId)
                getAllManagerAndSalesman()
                    .then(data => user.setDownloadedUsers(data))
            } catch (e) {
                alert(e.response.data.message)
            }
        }

        return (
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        ?????????????????? ???????????? ????????????????????????
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="">
                        <Col md={5} style={{padding: '5px'}}>
                            <Form.Group controlId="formRegistrationLogin">
                                <Form.Text className="text-muted">
                                    ?????????? ????????????????????????
                                </Form.Text>
                                <Form.Control size="lg" type="text" value={login}
                                              onChange={(e) => setLogin(e.target.value)} placeholder="??????????"/>
                            </Form.Group>
                        </Col>
                        <Col md={5} style={{padding: '5px'}}>
                            <Form.Group controlId="formRegistrationType">
                                <Form.Text className="text-muted">
                                    ?????????????????? ????????????????????????
                                </Form.Text>
                                <Form.Select aria-label="Default select example" value={userTypeId}
                                             onChange={(e) => setUserType(e.target.value)}>
                                    <option value="2">????????????????</option>
                                    <option value="3">????????????????-??????????????????????</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={5} style={{padding: '5px'}}>
                            <Form.Group controlId="formRegistrationPassword">
                                <Form.Text className="text-muted">
                                    ???????????? ????????????????????????
                                </Form.Text>
                                <Form.Control value={password} onChange={(e) => {
                                    setPassword(e.target.value)
                                }} type="text" placeholder="????????????"/>
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
                <h1 className="mt-4">???????????? ????????????????????????????</h1>
                <hr/>
            </Container>
            <Container>
                <h2 className="mt-4">?????????????? ????????????????????????</h2>
                <Form className="">
                    <Col md={5} style={{padding: '5px'}}>
                        <Form.Group controlId="formRegistrationType">
                            <Form.Text className="text-muted">
                                ?????????????????? ????????????????????????
                            </Form.Text>
                            <Form.Select
                                aria-label="Default select example"
                                value={userType}
                                onChange={e => setUserType(e.target.value)}
                            >
                                <option value="2">????????????????</option>
                                <option value="3">????????????????-??????????????????????</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={5} style={{padding: '5px'}}>
                        <Form.Group controlId="formRegistrationLogin">
                            <Form.Text className="text-muted">
                                ?????????? ????????????????????????
                            </Form.Text>
                            <Form.Control
                                value={login}
                                type="text"
                                onChange={e => setLogin(e.target.value)}
                                placeholder="??????????"/>
                        </Form.Group>
                    </Col>
                    <Col md={5} style={{padding: '5px'}}>
                        <Form.Group controlId="formRegistrationPassword">
                            <Form.Text className="text-muted">
                                ???????????? ????????????????????????
                            </Form.Text>
                            <Form.Control
                                value={password}
                                type="password"
                                onChange={e => setPassword(e.target.value)}
                                placeholder="????????????"/>
                        </Form.Group>
                    </Col>
                    <Col md={2} style={{padding: '5px'}}>
                        <Button
                            variant="outline-success"
                            type="submit"
                            onClick={userRegistration}>????????????????</Button>
                    </Col>
                </Form>
            </Container>
            <Container>
                <h2 className="mt-4">??????????</h2>
                <Form className="d-flex align-items-end">
                    <Col md={5} style={{padding: '5px'}}>
                        <Form.Group controlId="formLoginFinder">
                            <Form.Text className="text-muted">
                                ?????????????? ?????????? ????????????????????????
                            </Form.Text>
                            <Form.Control value={findLogin} type="text" placeholder="??????????" onChange={(e) => {
                                setFindLogin(e.target.value)
                                find(e.target.value, findType).then(data => user.setDownloadedUsers(data))
                            }}/>
                        </Form.Group>
                    </Col>
                    <Col md={5} style={{padding: '5px'}}>
                        <Form.Group controlId="formUserTypeIdFinder">
                            <Form.Text className="text-muted">
                                ?????????????????? ????????????????????????
                            </Form.Text>
                            <Form.Select value={findType} aria-label="Default select example" onChange={(e) => {
                                setFindType(e.target.value)
                                find(findLogin, e.target.value).then(data => user.setDownloadedUsers(data))
                            }}>
                                <option value="">??????</option>
                                <option value="2">????????????????</option>
                                <option value="3">????????????????-??????????????????????</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Form>
            </Container>
            <Container>
                <h2 className="mt-4">????????????????????????</h2>
                <Table className="mt-4" hover={true}>
                    <thead>
                    <tr>
                        <th>???</th>
                        <th>??????????</th>
                        <th></th>
                        <th>??????????????????</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        user.downloadedUsers.map((user, index) => {
                                return (
                                    <tr key={user.login}>
                                        <td>{index + 1}</td>
                                        <td>{user.login}</td>
                                        <td>{<img height={30} src={person}/>}</td>
                                        <td>{user.userTypeId === 2 ? '????????????????' : '????????????????-??????????????????????'}</td>
                                        <td>
                                            <Button className="me-4" variant="outline-warning" onClick={() => {
                                                getOneUser(user.login).then(data => {
                                                    setModalUser(data)
                                                    setModalShow(true)
                                                })
                                            }}>????????????????</Button>
                                            <Button variant="outline-danger" onClick={() => {
                                                delUser(user.login)
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
            <MyVerticallyCenteredModal user={modalUser} show={modalShow} onHide={() => setModalShow(false)} />
        </div>
    )
})

export default Admin
