import React from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils'

const Menus = ({menu, masukKeranjang}) => {
  return (
    <Col md={4} xs={6} className='mb-4'>
    <Card className='shadow' style={{ height: '18rem' }} onClick={()=>masukKeranjang(menu)}>
      <Card.Img variant="top" src={"assets/images/"+menu.category.nama.toLowerCase()+"/"+menu.gambar} style={{ height: '9rem' }} />
      <Card.Body>
        <Card.Title style={{ height:'80px'}}>{menu.nama} <strong>({menu.kode})</strong></Card.Title>
        <Card.Text style={{ marginTop: '10px'}}>
         Rp. {numberWithCommas(menu.harga)}
        </Card.Text>
      </Card.Body>
    </Card>
    </Col>
  )
}

export default Menus
