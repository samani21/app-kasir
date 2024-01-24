import React, { Component } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import { API_URL } from '../utils/constant';
import { useNavigate } from 'react-router-dom';

const TotalBayar = ({ keranjangs }) => {
    const navigate = useNavigate();
    const totalBayar = keranjangs.reduce(function (result, item) {
        return result + item.total_harga;
    }, 0);
    // console.log(keranjangs.total_harag);

    const submitTotalBayar = ({ totalBayar }) => {
        console.log(totalBayar);
        const pesanan = {
            total_bayar: totalBayar,
            menus: keranjangs
        }
        console.log("sasa", pesanan)
        // navigate('/sukses', { totalBayar })
        axios.post("http://localhost:8000/pesanan/store", pesanan).then((res) => {
            navigate('/sukses')
        })
        axios
            .get("http://localhost:8000/keranjang")
            .then((res) => {
                const keranjangs = res.data;
                keranjangs.map(function (item) {
                    return axios
                        .delete("http://localhost:8000/keranjang/delete/" + item.id)
                        .then((res) => console.log(res))
                        .catch((error) => console.log(error))

                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <>
        {/* Web*/}
         <div className='fixed-bottom d-none d-md-block' >
            <Row>
                <Col md={{ span: 3, offset: 9 }} className='px-4'>
                    <h4>Total Harga :{" "} <strong className='float-right mr-2'>Rp. {numberWithCommas(totalBayar)}</strong></h4>
                    <Button variant='primary' onClick={() => submitTotalBayar({ totalBayar })}>
                        <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
                    </Button>
                </Col>
            </Row>
        </div>
        {/* Mobile */}
         <div className='d-sm-block d-md-none'>
            <Row>
                <Col md={{ span: 3, offset: 9 }} className='px-4'>
                    <h4>Total Harga :{" "} <strong className='float-right mr-2'>Rp. {numberWithCommas(totalBayar)}</strong></h4>
                    <Button variant='primary' onClick={() => submitTotalBayar({ totalBayar })}>
                        <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
                    </Button>
                </Col>
            </Row>
        </div>
        </>
       

    )
}

export default TotalBayar;

// export default class TotalBayar extends Component {
//     submitTotalBayar =(totalBayar)=>{
//         // const pesanan = {
//         //     total_bayar : totalBayar,
//         //     menus : this.props.keranjangs
//         // }

//         // axios.post(API_URL+"pesanans", pesanan).then((res)=>{
//         //     // this.props.history('sukses')
//         // })
//     }
//     render() {
//         const totalBayar = this.props.keranjangs.reduce(function (result, item) {
//             return result + item.total_harag;
//         }, 0);
//         console.log(totalBayar);
//         return (
//             <div className='fixed-bottom'>
//                 <Row>
//                     <Col md={{ span: 3, offset: 9 }} className='px-4'>
//                         <h4>Total Harga :{" "} <strong className='float-right mr-2'>Rp. {numberWithCommas(totalBayar)}</strong></h4>
//                         <Button variant='primary' onClick={() => this.submitTotalBayar(totalBayar)}>
//                             <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
//                         </Button>
//                     </Col>
//                 </Row>
//             </div>
//         )
//     }
// }
