import React, { Component, useState } from "react";
import { Badge, Card, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import TotalBayar from "./TotalBayar";
import ModalKeranjangs from "./ModalKeranjangs";
import axios from "axios";
import { API_URL } from "../utils/constant";
import swal from "sweetalert";

const Hasil = ({ keranjangs, getListKeranjang }) => {
    const [showModal, setShowModal] = useState(false);
    const [keranjangDetail, setKeranjangDetail] = useState(null);
    const [jumlah, setJumlah] = useState(false);
    const [keterangan, setKeterangan] = useState('');
    const [totalHarga, setTotalHarga] = useState(0);
  
    const handleShow = (menuKeranjang) => {
      console.log(menuKeranjang);
      setShowModal(true);
      setKeranjangDetail(menuKeranjang);
      setJumlah(menuKeranjang.jumlah);
      setKeterangan(menuKeranjang.keterangan);
      setTotalHarga(menuKeranjang.total_harga);
    };
  
    const handleClose = () => {
      setJumlah(false);
    };
  
    const tambah = () => {
      setJumlah(jumlah + 1);
      setTotalHarga(keranjangDetail.product.harga * (jumlah + 1));
    };
  
    const kurang = () => {
      if (jumlah !== 1) {
        setJumlah(jumlah - 1);
        setTotalHarga(keranjangDetail.product.harga * (jumlah - 1));
      }
    };
  
    const changeHandler = (event) => {
      setKeterangan(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      handleClose();
      const data = {
        jumlah: jumlah,
        total_harga: totalHarga,
        product: keranjangDetail.product,
        keterangan: keterangan,
      };
  console.log('sasa',keranjangDetail.id)
      axios.put("http://localhost:8000/keranjang/update_detail/" + keranjangDetail.id, data)
        .then((res) => {
          getListKeranjang();
          swal({
            title: "Update pesanan!",
            text: "Success Update Pesanan" + data.product.nama,
            icon: "success",
            button: false,
            timer: 1500,
          });
        })
        .catch(error => {
          console.log(error);
        });
    };
  
    const hapusPesanan = (id) => {
      handleClose();
      axios.delete("http://localhost:8000/keranjang/delete/" + id)
        .then((res) => {
          getListKeranjang();
          swal({
            title: "Hapus pesanan!",
            text: "Success Hapus Pesanan" + keranjangDetail.product.nama,
            icon: "error",
            button: false,
            timer: 1500,
          });
        })
        .catch(error => {
          console.log(error);
        });
    };
  
    return (
      <Col md={3} col="2" style={{marginTop: '8px'}}>
        <Row style={{marginTop: '10px'}}>
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        </Row>
        <Row>
        {keranjangs.length !== 0 && (
          <Card className="overflow-auto hasil">
            <ListGroup variant="flush">
              {keranjangs.map((menuKeranjang) => (
                <ListGroup.Item key={menuKeranjang.id} onClick={() => handleShow(menuKeranjang)}>
                  <Row>
                    <Col xs={2}>
                      <h4>
                        <Badge pill variant="success">
                          {menuKeranjang.jumlah}
                        </Badge>
                      </h4>
                    </Col>
                    <Col>
                      <h5>{menuKeranjang.product.nama}</h5>
                      <p>Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>
                    </Col>
                    <Col>
                      <strong className="float-right">Rp. {numberWithCommas(menuKeranjang.total_harga)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <ModalKeranjangs
              handleClose={handleClose}
              keranjangDetail={keranjangDetail}
              jumlah={jumlah}
              keterangan={keterangan}
              totalHarga={totalHarga}
              tambah={tambah}
              kurang={kurang}
              changeHandler={changeHandler}
              handleSubmit={handleSubmit}
              hapusPesanan={hapusPesanan}
            />
          </Card>
        )}
        </Row>
        <Row>
          
        <TotalBayar keranjangs={keranjangs} />
        </Row>
      </Col>
    );
  };

export default Hasil;