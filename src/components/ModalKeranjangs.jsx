import React from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

const ModalKeranjangs = ({ hapusPesanan,showModal, handleClose, keranjangDetail, jumlah,keterangan,tambah,kurang,handleSubmit,changeHandler,totalHarga }) => {
    if (keranjangDetail) {
        console.log(handleClose)
        return (
            <Modal show={jumlah} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{keranjangDetail.product.nama} <strong>(Rp. {numberWithCommas(keranjangDetail.product.harga)})</strong></Modal.Title>
                </Modal.Header>
                <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Total Harga</Form.Label>
                        <strong><p>(Rp. {totalHarga})</p></strong>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Jumlah :</Form.Label>
                        <br />
                        <Button variant='primary' size="sm" onClick={() => kurang()}>
                            <FontAwesomeIcon icon={faMinus} />
                        </Button>
                        <strong> {jumlah} </strong>
                        <Button variant='primary' size="sm" onClick={() => tambah()}>
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>keterangan :</Form.Label>
                        <Form.Control as="textarea"  rows={3} name='keterangan' placeholder='Contoh : pede, nasi setengah' value={keterangan} onChange={(event) =>changeHandler(event)}/>
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Simpan
                    </Button>
                </Form>
                </Container>
                <Modal.Footer>
                    <Button variant='danger' onClick={()=>hapusPesanan(keranjangDetail.id)}>
                        <FontAwesomeIcon icon={faTrash}/> Hapus Pesanan
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    } else {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>KOSONG</Modal.Title>
                </Modal.Header>
                <Modal.Body>KOSONG</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ModalKeranjangs
